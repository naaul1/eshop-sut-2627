#!/usr/bin/env bash
#
# seed-orders.sh — Tạo 5 đơn hàng mẫu cho EShop Admin (HW03, mục 1.3 của docs/plan.md).
#
# Kết quả mong đợi trên database sạch:
#   #1 delivered 500.000 ₫   #2 pending 300.000 ₫   #3 confirmed 400.000 ₫
#   #4 shipping  600.000 ₫   #5 canceled 200.000 ₫
#   Tổng số đơn = 5, doanh thu delivered (API) = 500.000 ₫
#
# Đơn #3 mang địa chỉ "123 Đường <b>Test</b>, Quận 1": payload HTML cố ý cho
# BUG-01 (GUI-042, SEC-04). Cột Địa chỉ ở màn Đơn hàng admin render HTML thay
# vì escape, nên chữ Test hiện đậm và thẻ <b> biến mất. Không dùng onerror/alert
# trong seed để hộp thoại alert không nổ lại mỗi lần reload màn Đơn hàng và
# không phá ảnh minh chứng của các mục checklist khác trên cùng màn hình.
#
# Script chỉ gọi API, không sửa code và không sửa database trực tiếp.
# Dữ liệu sẽ mất khi restart backend (database.js drop + seed lại mỗi lần chạy server.js).

set -euo pipefail

API_URL="${API_URL:-http://localhost:3000/api}"
USER_EMAIL="${USER_EMAIL:-test@eshop.com}"
USER_PASSWORD="${USER_PASSWORD:-Test1234!}"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@eshop.com}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-Admin123!}"

FORCE=0
RESP_STATUS=""
RESP_BODY=""
LOGIN_TOKEN=""

usage() {
  cat <<'EOF'
Cách dùng: scripts/seed-orders.sh [--force] [--api-url URL]

Tạo 5 đơn hàng ở 5 trạng thái khác nhau (1 delivered để Dashboard có doanh thu).
Script cần database sạch để kết quả đúng 5 đơn / 500.000 ₫.

Tùy chọn:
  --force          Vẫn thêm 5 đơn dù database đã có đơn hàng.
                   Khi đó Dashboard sẽ không còn đúng 5 đơn / 500.000 ₫.
  --api-url URL    Đổi địa chỉ API (mặc định http://localhost:3000/api).
  -h, --help       In hướng dẫn này.

Biến môi trường (không bắt buộc):
  API_URL, USER_EMAIL, USER_PASSWORD, ADMIN_EMAIL, ADMIN_PASSWORD

Ví dụ:
  # 1. Restart backend để reset database
  cd backend && node server.js
  # 2. Terminal khác, tại thư mục gốc repo:
  ./scripts/seed-orders.sh
EOF
}

fail() {
  printf '[LOI] %s\n' "$1" >&2
  exit 1
}

format_vnd() {
  local number="$1" result=""
  while [[ ${#number} -gt 3 ]]; do
    result=".${number: -3}${result}"
    number="${number:0:${#number}-3}"
  done
  printf '%s%s' "$number" "$result"
}

json_get() {
  local json="$1" path="$2"
  printf '%s' "$json" | node -e '
    let input = "";
    process.stdin.on("data", (chunk) => (input += chunk));
    process.stdin.on("end", () => {
      try {
        const value = process.argv[1]
          .split(".")
          .reduce((acc, key) => (acc == null ? acc : acc[key]), JSON.parse(input));
        process.stdout.write(value == null ? "" : String(value));
      } catch (error) {
        process.stdout.write("");
      }
    });
  ' "$path"
}

# In ra "<so_don> <doanh_thu_delivered>" từ JSON của /admin/orders.
json_summary() {
  printf '%s' "$1" | node -e '
    let input = "";
    process.stdin.on("data", (chunk) => (input += chunk));
    process.stdin.on("end", () => {
      let orders = [];
      try {
        orders = JSON.parse(input);
      } catch (error) {
        orders = [];
      }
      if (!Array.isArray(orders)) orders = [];
      const revenue = orders
        .filter((order) => order.status === "delivered")
        .reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0);
      process.stdout.write(orders.length + " " + revenue);
    });
  '
}

request() {
  local method="$1" path="$2" token="$3" data="$4"
  local args=(-sS -X "$method" "$API_URL$path" -H "Content-Type: application/json" --max-time 15)
  [[ -n "$token" ]] && args+=(-H "Authorization: Bearer $token")
  [[ -n "$data" ]] && args+=(-d "$data")
  curl "${args[@]}" -w $'\n%{http_code}'
}

api_call() {
  local method="$1" path="$2" token="$3" data="$4" raw=""
  if ! raw=$(request "$method" "$path" "$token" "$data"); then
    fail "Không gọi được API $method $API_URL$path. Backend đã chạy chưa? (cd backend && node server.js)"
  fi
  RESP_STATUS="${raw##*$'\n'}"
  RESP_BODY="${raw%$'\n'*}"
}

login() {
  local email="$1" password="$2" label="$3"
  api_call POST "/login" "" "{\"email\":\"$email\",\"password\":\"$password\"}"
  if [[ "$RESP_STATUS" != "200" ]]; then
    fail "Đăng nhập $label thất bại (HTTP $RESP_STATUS): $RESP_BODY"
  fi
  LOGIN_TOKEN="$(json_get "$RESP_BODY" token)"
  [[ -n "$LOGIN_TOKEN" ]] || fail "Đăng nhập $label không trả về token: $RESP_BODY"
}

set_status() {
  local order_id="$1" status="$2"
  api_call PUT "/admin/orders/$order_id/status" "$ADMIN_TOKEN" "{\"status\":\"$status\"}"
  if [[ "$RESP_STATUS" != "200" ]]; then
    fail "Không đổi được đơn #$order_id sang '$status' (HTTP $RESP_STATUS): $RESP_BODY"
  fi
  printf '  #%s -> %s\n' "$order_id" "$status"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --force)
      FORCE=1
      shift
      ;;
    --api-url)
      [[ $# -ge 2 ]] || fail "--api-url cần một giá trị."
      API_URL="$2"
      shift 2
      ;;
    -h | --help)
      usage
      exit 0
      ;;
    *)
      printf 'Tham số không hợp lệ: %s\n\n' "$1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

command -v curl >/dev/null 2>&1 || fail "Không tìm thấy curl. Cài curl rồi chạy lại."
command -v node >/dev/null 2>&1 || fail "Không tìm thấy node. Cài Node.js rồi chạy lại."

printf '[1/4] Đăng nhập user và admin (%s)...\n' "$API_URL"
login "$USER_EMAIL" "$USER_PASSWORD" "user"
USER_TOKEN="$LOGIN_TOKEN"
login "$ADMIN_EMAIL" "$ADMIN_PASSWORD" "admin"
ADMIN_TOKEN="$LOGIN_TOKEN"

printf '[2/4] Kiểm tra đơn hàng hiện có...\n'
api_call GET "/admin/orders" "$ADMIN_TOKEN" ""
[[ "$RESP_STATUS" == "200" ]] || fail "Không đọc được danh sách đơn (HTTP $RESP_STATUS): $RESP_BODY"
read -r BASELINE_COUNT BASELINE_REVENUE <<<"$(json_summary "$RESP_BODY")"

if [[ "$BASELINE_COUNT" -gt 0 && "$FORCE" -ne 1 ]]; then
  cat >&2 <<EOF
[LOI] Database đang có $BASELINE_COUNT đơn hàng, không phải database sạch.
      Script cần database sạch để Dashboard ra đúng 5 đơn / 500.000 ₫.

      Cách 1 (khuyến nghị): tắt backend (Ctrl+C), chạy lại "node server.js" để reset
                           database, rồi chạy lại script này.
      Cách 2: chạy "./scripts/seed-orders.sh --force" để thêm 5 đơn nữa.
              Khi đó Dashboard sẽ không còn đúng 5 đơn / 500.000 ₫.
EOF
  exit 1
fi

if [[ "$BASELINE_COUNT" -gt 0 ]]; then
  printf '  [CANH BAO] Đã có %s đơn từ trước, sẽ thêm 5 đơn nữa (--force).\n' "$BASELINE_COUNT"
else
  printf '  Database sạch, bắt đầu tạo đơn.\n'
fi

printf '[3/4] Tạo 5 đơn hàng...\n'
AMOUNTS=(500000 300000 400000 600000 200000)
# Đơn thứ 3 (chỉ số 2) mang payload HTML cho BUG-01, các đơn còn lại dùng địa chỉ thường.
ADDRESSES=(
  "123 Đường Test, Quận 1"
  "123 Đường Test, Quận 1"
  "123 Đường <b>Test</b>, Quận 1"
  "123 Đường Test, Quận 1"
  "123 Đường Test, Quận 1"
)
[[ ${#AMOUNTS[@]} -eq ${#ADDRESSES[@]} ]] ||
  fail "AMOUNTS và ADDRESSES phải cùng số phần tử."
ORDER_IDS=()
for i in "${!AMOUNTS[@]}"; do
  amount="${AMOUNTS[$i]}"
  api_call POST "/checkout" "$USER_TOKEN" \
    "{\"total_amount\":$amount,\"shipping_address\":\"${ADDRESSES[$i]}\"}"
  [[ "$RESP_STATUS" == "200" ]] || fail "Tạo đơn $amount ₫ thất bại (HTTP $RESP_STATUS): $RESP_BODY"
  order_id="$(json_get "$RESP_BODY" orderId)"
  [[ "$order_id" =~ ^[0-9]+$ ]] || fail "Checkout không trả về orderId hợp lệ: $RESP_BODY"
  ORDER_IDS+=("$order_id")
  printf '  Đơn #%s: %s ₫ (pending) - %s\n' "$order_id" "$(format_vnd "$amount")" "${ADDRESSES[$i]}"
done

printf '[4/4] Chuyển trạng thái...\n'
set_status "${ORDER_IDS[0]}" confirmed
set_status "${ORDER_IDS[0]}" shipping
set_status "${ORDER_IDS[0]}" delivered
set_status "${ORDER_IDS[2]}" confirmed
set_status "${ORDER_IDS[3]}" confirmed
set_status "${ORDER_IDS[3]}" shipping
set_status "${ORDER_IDS[4]}" canceled
printf '  #%s giữ nguyên pending\n' "${ORDER_IDS[1]}"

EXPECTED_STATUSES=(delivered pending confirmed shipping canceled)
for i in "${!ORDER_IDS[@]}"; do
  api_call GET "/orders/${ORDER_IDS[$i]}" "" ""
  [[ "$RESP_STATUS" == "200" ]] || fail "Không đọc được đơn #${ORDER_IDS[$i]} (HTTP $RESP_STATUS): $RESP_BODY"
  actual_status="$(json_get "$RESP_BODY" status)"
  if [[ "$actual_status" != "${EXPECTED_STATUSES[$i]}" ]]; then
    fail "Đơn #${ORDER_IDS[$i]} đang là '$actual_status', mong đợi '${EXPECTED_STATUSES[$i]}'."
  fi
done

api_call GET "/admin/orders" "$ADMIN_TOKEN" ""
[[ "$RESP_STATUS" == "200" ]] || fail "Không đọc được danh sách đơn (HTTP $RESP_STATUS): $RESP_BODY"
read -r FINAL_COUNT FINAL_REVENUE <<<"$(json_summary "$RESP_BODY")"

EXPECTED_COUNT=$((BASELINE_COUNT + 5))
EXPECTED_REVENUE=$((BASELINE_REVENUE + 500000))
if [[ "$FINAL_COUNT" -ne "$EXPECTED_COUNT" || "$FINAL_REVENUE" -ne "$EXPECTED_REVENUE" ]]; then
  fail "Kiểm tra thất bại: mong đợi $EXPECTED_COUNT đơn / $(format_vnd "$EXPECTED_REVENUE") ₫, nhưng API trả về $FINAL_COUNT đơn / $(format_vnd "$FINAL_REVENUE") ₫."
fi

printf '\nKết quả (đọc từ API /admin/orders):\n'
for i in "${!ORDER_IDS[@]}"; do
  printf '  #%-4s %-10s %s ₫\n' "${ORDER_IDS[$i]}" "${EXPECTED_STATUSES[$i]}" "$(format_vnd "${AMOUNTS[$i]}")"
done
printf '  Tổng số đơn: %s\n' "$FINAL_COUNT"
printf '  Doanh thu delivered: %s ₫\n' "$(format_vnd "$FINAL_REVENUE")"

if [[ "$FINAL_REVENUE" -gt 0 ]]; then
  printf '\n[!] Dashboard sẽ hiển thị %s ₫ (gấp đôi doanh thu delivered) do bug nhân đôi\n' "$(format_vnd $((FINAL_REVENUE * 2)))"
  printf '    ở frontend-admin/src/App.jsx (total_amount * 2). Đây là bug của SUT:\n'
  printf '    ghi lại vào báo cáo, KHÔNG sửa code.\n'
fi

printf '\n[OK] Seed xong. Dữ liệu sẽ mất khi restart backend.\n'
