#!/usr/bin/env bash
#
# run_script.sh - run the whole EShop web stack in a single terminal.
#
# Starts and multiplexes the logs of:
#   backend  -> http://localhost:3000   (Express + SQLite API)
#   web      -> http://localhost:5173   (customer storefront, Vite)
#   admin    -> http://localhost:5174   (admin dashboard, Vite)
#
# Press Ctrl+C once to stop every server started by this script.
#
# Usage:
#   ./run_script.sh                # start all servers (no npm install)
#   ./run_script.sh --install      # run npm install for any service missing node_modules
#   ./run_script.sh --reset-db     # re-seed the SQLite database before starting
#   ./run_script.sh --kill         # free ports 3000/5173/5174 before starting
#   ./run_script.sh -h | --help
#
set -uo pipefail

# Job control: every background job gets its own process group, so killing the
# group also stops npm/vite/node children (not just the outer shell).
set -m

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
WEB_DIR="$ROOT_DIR/frontend-web"
ADMIN_DIR="$ROOT_DIR/frontend-admin"

BACKEND_PORT=3000
WEB_PORT=5173
ADMIN_PORT=5174

INSTALL_DEPS=0
RESET_DB=0
KILL_PORTS=0

if [ -t 1 ] && [ -z "${NO_COLOR:-}" ]; then
  BOLD=$'\033[1m'
  DIM=$'\033[2m'
  RED=$'\033[31m'
  GREEN=$'\033[32m'
  YELLOW=$'\033[33m'
  BLUE=$'\033[34m'
  MAGENTA=$'\033[35m'
  RESET=$'\033[0m'
else
  BOLD='' DIM='' RED='' GREEN='' YELLOW='' BLUE='' MAGENTA='' RESET=''
fi

info()  { printf '%s==>%s %s\n' "$BLUE" "$RESET" "$*"; }
warn()  { printf '%s[!]%s %s\n' "$YELLOW" "$RESET" "$*" >&2; }
error() { printf '%s[x]%s %s\n' "$RED" "$RESET" "$*" >&2; }
die()   { error "$*"; exit 1; }

usage() {
  awk 'NR > 2 && /^#/ { sub(/^# ?/, ""); print; next } NR > 2 { exit }' "${BASH_SOURCE[0]}"
}

# --- process management -----------------------------------------------------

PIDS=()   # pid of the log-prefixing reader of each service
PGIDS=()  # process group that holds the service and all its children
NAMES=()
CLEANED=0

start_service() {
  local name="$1" dir="$2" color="$3"
  shift 3

  local prefix
  prefix=$(printf '%s[%-7s]%s ' "$color" "$name" "$RESET")

  # Prefix every log line; the read loop also keeps output line-buffered so
  # logs from the three servers interleave cleanly.
  (
    cd -- "$dir" || exit 1
    exec "$@"
  ) </dev/null 2>&1 | while IFS= read -r line; do
    printf '%s%s\n' "$prefix" "$line"
  done &

  local pid=$!
  local pgid
  pgid=$(ps -o pgid= -p "$pid" 2>/dev/null | tr -d '[:space:]')

  PIDS+=("$pid")
  PGIDS+=("${pgid:-$pid}")
  NAMES+=("$name")
}

cleanup() {
  local code=${1:-0}
  if [ "$CLEANED" -eq 1 ]; then
    exit "$code"
  fi
  CLEANED=1
  trap - INT TERM EXIT

  printf '\n%s==>%s Stopping servers...\n' "$BLUE" "$RESET"

  local i
  for i in "${!PIDS[@]}"; do
    if [ -n "${PGIDS[$i]}" ] && [ "${PGIDS[$i]}" != "$$" ]; then
      kill -TERM -- "-${PGIDS[$i]}" 2>/dev/null ||
        kill -TERM "${PIDS[$i]}" 2>/dev/null || true
    else
      kill -TERM "${PIDS[$i]}" 2>/dev/null || true
    fi
  done

  # Give them a moment to exit gracefully, then force anything left over.
  local attempt alive
  for ((attempt = 0; attempt < 30; attempt++)); do
    alive=0
    for i in "${!PIDS[@]}"; do
      if kill -0 "${PIDS[$i]}" 2>/dev/null; then
        alive=1
      fi
    done
    [ "$alive" -eq 0 ] && break
    sleep 0.1
  done

  for i in "${!PIDS[@]}"; do
    kill -KILL -- "-${PGIDS[$i]}" 2>/dev/null || true
    kill -KILL "${PIDS[$i]}" 2>/dev/null || true
  done
  wait 2>/dev/null || true

  printf '%s==>%s All servers stopped.\n' "$BLUE" "$RESET"
  exit "$code"
}

# --- environment ------------------------------------------------------------

port_in_use() {
  local port="$1"
  # Vite 8 binds to IPv6 localhost (::1) only, the backend to 0.0.0.0.
  ( exec 3<>"/dev/tcp/127.0.0.1/${port}" ) >/dev/null 2>&1 && return 0
  ( exec 3<>"/dev/tcp/::1/${port}" ) >/dev/null 2>&1 && return 0
  return 1
}

free_port() {
  local port="$1" pids attempt

  if command -v lsof >/dev/null 2>&1; then
    pids=$(lsof -ti "tcp:${port}" -sTCP:LISTEN 2>/dev/null || true)
    if [ -n "$pids" ]; then
      # shellcheck disable=SC2086
      kill -TERM $pids 2>/dev/null || true
    fi
  elif command -v fuser >/dev/null 2>&1; then
    fuser -k -TERM "${port}/tcp" >/dev/null 2>&1 || true
  fi

  for ((attempt = 0; attempt < 30; attempt++)); do
    port_in_use "$port" || return 0
    sleep 0.1
  done
  return 1
}

# 0 = ready, 2 = service died while starting, 1 = timed out
wait_for_port() {
  local port="$1" pid="$2" timeout="${3:-45}" ticks
  ticks=$((timeout * 4))
  while [ "$ticks" -gt 0 ]; do
    port_in_use "$port" && return 0
    kill -0 "$pid" 2>/dev/null || return 2
    sleep 0.25
    ticks=$((ticks - 1))
  done
  return 1
}

ensure_deps() {
  local dir
  for dir in "$BACKEND_DIR" "$WEB_DIR" "$ADMIN_DIR"; do
    [ -d "$dir/node_modules" ] && continue
    if [ "$INSTALL_DEPS" -eq 0 ]; then
      die "Missing $dir/node_modules. Run 'npm install' there, or pass --install."
    fi
    info "Installing dependencies in ${dir#"$ROOT_DIR"/} (first run only)..."
    ( cd -- "$dir" && npm install ) || die "npm install failed in $dir"
  done
}

ensure_database() {
  if [ "$RESET_DB" -eq 1 ] || [ ! -f "$BACKEND_DIR/database.sqlite" ]; then
    info "Seeding SQLite database..."
    ( cd -- "$BACKEND_DIR" && node database.js ) || die "Database seeding failed."
  fi
}

# --- main -------------------------------------------------------------------

parse_args() {
  while [ $# -gt 0 ]; do
    case "$1" in
      -h | --help) usage; exit 0 ;;
      --no-install) INSTALL_DEPS=0 ;;
      --install) INSTALL_DEPS=1 ;;
      --reset-db) RESET_DB=1 ;;
      --kill) KILL_PORTS=1 ;;
      *) die "Unknown option: $1 (see --help)" ;;
    esac
    shift
  done
}

check_layout() {
  local dir
  for dir in "$BACKEND_DIR" "$WEB_DIR" "$ADMIN_DIR"; do
    [ -d "$dir" ] || die "Cannot find ${dir}. Run this script from the repo root."
  done
  command -v node >/dev/null 2>&1 || die "node is not installed."
  command -v npm >/dev/null 2>&1 || die "npm is not installed."
}

check_ports() {
  local entry port label busy=0
  for entry in "${BACKEND_PORT}:backend" "${WEB_PORT}:web" "${ADMIN_PORT}:admin"; do
    port=${entry%%:*}
    label=${entry#*:}
    if port_in_use "$port"; then
      error "Port ${port} (${label}) is already in use."
      busy=1
    fi
  done
  if [ "$busy" -eq 1 ]; then
    die "Stop the process above or re-run with --kill to free the ports."
  fi
}

print_banner() {
  printf '\n%s%s EShop web stack is up%s\n' "$BOLD" "$GREEN" "$RESET"
  printf '  %sbackend%s  http://localhost:%s\n' "$DIM" "$RESET" "$BACKEND_PORT"
  printf '  %sweb%s      http://localhost:%s\n' "$DIM" "$RESET" "$WEB_PORT"
  printf '  %sadmin%s    http://localhost:%s\n' "$DIM" "$RESET" "$ADMIN_PORT"
  printf '\n  Default accounts: admin@eshop.com / Admin123!   test@eshop.com / Test1234!\n'
  printf '  %sPress Ctrl+C to stop all servers.%s\n\n' "$DIM" "$RESET"
}

monitor_services() {
  local i
  while :; do
    for i in "${!PIDS[@]}"; do
      if ! kill -0 "${PIDS[$i]}" 2>/dev/null; then
        die "${NAMES[$i]} stopped unexpectedly."
      fi
    done
    sleep 1
  done
}

main() {
  parse_args "$@"
  check_layout
  ensure_deps
  ensure_database

  if [ "$KILL_PORTS" -eq 1 ]; then
    local entry port label
    for entry in "${BACKEND_PORT}:backend" "${WEB_PORT}:web" "${ADMIN_PORT}:admin"; do
      port=${entry%%:*}
      label=${entry#*:}
      if port_in_use "$port"; then
        info "Freeing port ${port} (${label})..."
        free_port "$port" || die "Could not free port ${port}."
      fi
    done
  fi

  check_ports

  trap 'cleanup 130' INT
  trap 'cleanup 143' TERM
  trap 'cleanup $?' EXIT

  info "Starting backend  (port ${BACKEND_PORT})..."
  start_service backend "$BACKEND_DIR" "$GREEN" node server.js

  info "Starting web      (port ${WEB_PORT})..."
  start_service web "$WEB_DIR" "$BLUE" npm run dev

  info "Starting admin    (port ${ADMIN_PORT})..."
  start_service admin "$ADMIN_DIR" "$MAGENTA" npm run dev

  wait_for_port "$BACKEND_PORT" "${PIDS[0]}"
  local status=$?
  [ "$status" -eq 2 ] && die "backend exited before becoming ready."
  [ "$status" -eq 0 ] && info "Backend ready."

  wait_for_port "$WEB_PORT" "${PIDS[1]}"
  status=$?
  [ "$status" -eq 2 ] && die "web exited before becoming ready."
  [ "$status" -eq 0 ] && info "Web ready."

  wait_for_port "$ADMIN_PORT" "${PIDS[2]}"
  status=$?
  [ "$status" -eq 2 ] && die "admin exited before becoming ready."
  [ "$status" -eq 0 ] && info "Admin ready."

  print_banner
  monitor_services
}

main "$@"
