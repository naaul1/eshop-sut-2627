#!/usr/bin/env bash
# Chạy đồng thời backend + frontend-web + frontend-admin trên cùng một terminal.
# Nhấn Ctrl+C để dừng cả ba server.

set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NAMES=()
PIDS=()
STOPPING=0

die() {
  echo "Lỗi: $*" >&2
  exit 1
}

# Cài dependencies nếu thiếu (bản clone mới chưa có node_modules).
ensure_deps() {
  local dir="$1"
  if [ ! -d "$ROOT_DIR/$dir/node_modules" ]; then
    echo "[$dir] chưa có node_modules, đang chạy npm install..."
    ( cd "$ROOT_DIR/$dir" && npm install ) || die "npm install thất bại trong $dir"
  fi
}

start() {
  local name="$1" dir="$2"
  shift 2
  ( cd "$ROOT_DIR/$dir" && exec "$@" ) &
  NAMES+=("$name")
  PIDS+=("$!")
  echo "[$name] đã khởi động (PID $!)"
}

cleanup() {
  trap - INT TERM EXIT
  STOPPING=1
  echo
  echo "Đang dừng các server..."
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null
  done
  wait 2>/dev/null
  echo "Đã dừng tất cả."
}

trap cleanup INT TERM EXIT

command -v node >/dev/null 2>&1 || die "không tìm thấy node trong PATH"
command -v npm >/dev/null 2>&1 || die "không tìm thấy npm trong PATH"

ensure_deps backend
ensure_deps frontend-web
ensure_deps frontend-admin

start backend backend node server.js
start web frontend-web npm run dev
start admin frontend-admin npm run dev

echo
echo "Backend: http://localhost:3000"
echo "Web:     http://localhost:5173"
echo "Admin:   http://localhost:5174"
echo "Nhấn Ctrl+C để dừng tất cả."
echo

# Nếu một server thoát (crash), tắt luôn các server còn lại.
# Vòng lặp thay cho "wait -n" để chạy được cả trên bash 3.2 của macOS.
while [ "$STOPPING" -eq 0 ]; do
  for i in "${!PIDS[@]}"; do
    if ! kill -0 "${PIDS[$i]}" 2>/dev/null; then
      echo "[${NAMES[$i]}] đã dừng, đang tắt các server còn lại..."
      exit 1
    fi
  done
  sleep 2
done

exit 130
