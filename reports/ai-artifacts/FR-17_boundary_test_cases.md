# Test case Boundary Value Analysis - FR-17

## 1. Giả định và câu hỏi xác nhận

- Mã yêu cầu: `FR-17`; phạm vi chỉ là client web admin: đăng nhập, mở màn coupon, nhập form, xem danh sách và xóa coupon.
- Giá trị chuẩn: admin hợp lệ; `code = WEBBVA`; `type = percent`; `discount_value = 10`; `min_order_amount = 200000`; `expired_at = 2099-12-31`; `max_uses_per_user = 1`.
- Với các trường số, dùng bước 1 và số nguyên để tạo giá trị trước/tại/sau cận. Đây là giả định kiểm thử tạm thời vì spec không nêu `step`, độ chính xác hoặc đơn vị nhỏ nhất.
- `discount_value` được hiểu là miền mở `> 0`; cận đại diện là `0`, `1`, `2`. `min_order_amount` là `>= 0`; cận là `-1`, `0`, `1`. `max_uses_per_user` là `>= 1`; cận là `0`, `1`, `2`.
- Input `type="date"` chỉ xác nhận có/không có giá trị trên client. Spec không quy định ngày quá khứ có hợp lệ hay không, nên không tự kết luận cận thời gian.
- `code` không có giới hạn độ dài, charset hoặc format; không thể sinh BVA độ dài/charset mà không bịa quy tắc.
- `required` và `min="1"` được kiểm tra qua hành vi trình duyệt/UI; thông báo cụ thể và mã lỗi chưa được đặc tả.
- Không kiểm thử trực tiếp DB/API, `is_active`, kiểu JSON, transaction, timezone nội bộ hoặc các quy tắc backend không quan sát được từ client.

### Câu hỏi cần xác nhận

1. Đơn vị nhỏ nhất và `step` của `discount_value`, `min_order_amount`, `max_uses_per_user` là gì? Có cho phép số thực không?
2. `discount_value` có giới hạn trên hoặc giới hạn riêng cho `percent` (ví dụ không vượt 100) không?
3. `expired_at` có được phép là ngày quá khứ không? Nếu không, timezone và cận thời gian là gì?
4. `code` có giới hạn độ dài, charset, Unicode, khoảng trắng hoặc quy tắc phân biệt hoa/thường không?
5. Khi nhập giá trị không hợp lệ hoặc mã trùng, thông báo/mã lỗi nào được kỳ vọng?
6. Có yêu cầu test sửa coupon không? FR-17 hiện chỉ nêu Thêm/Xem/Xóa.

## 2. Bảng biến và miền

| Tên biến | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ | Các biên cần kiểm thử |
|---|---|---|---|---|
| Quyền truy cập admin | Phiên/UI state | Admin đăng nhập hợp lệ, mở được màn coupon | Chưa đăng nhập; user không phải admin; phiên/token không hợp lệ | Chuyển trạng thái được cấp/không được cấp quyền |
| `code` | Chuỗi | Không rỗng; mã chưa tồn tại; UI chuyển input thành chữ hoa | Rỗng; mã trùng; whitespace/độ dài/charset chưa có cận trong spec | Cận rỗng và duy nhất; không có cận độ dài |
| `type` | Enum | `percent`; `fixed` | Giá trị ngoài enum không tạo được qua select chuẩn; rỗng/thiếu chưa có thao tác UI tương ứng | Từng phần tử enum; không có thứ tự để lập min/max |
| `discount_value` | Số | Số dương, `> 0` | `<= 0`; rỗng; độ chính xác/giới hạn trên chưa rõ | Theo giả định bước 1: `0`, `1`, `2` |
| `expired_at` | Ngày từ input date | Có ngày được chọn | Rỗng; ngày quá khứ chưa rõ là hợp lệ hay không | Cận rỗng/có giá trị; cận thời gian bị chặn |
| `min_order_amount` | Số tiền | `>= 0` | `< 0`; rỗng/step/độ chính xác chưa rõ | Theo giả định bước 1: `-1`, `0`, `1` |
| `max_uses_per_user` | Số lần | `>= 1` | `< 1`; rỗng; số thực/giới hạn trên chưa rõ | Theo giả định bước 1: `0`, `1`, `2` |
| Danh sách coupon | Dữ liệu UI | Coupon tạo thành công xuất hiện với các trường tương ứng | Không tải/không hiển thị/sai trường | Trạng thái trước và sau Create/Refresh |
| Xóa coupon | Thao tác UI | Nút Xóa loại bỏ coupon khỏi danh sách | Không có nút; xóa thất bại nhưng UI vẫn hiển thị thành công; coupon quay lại sau refresh | Trạng thái tồn tại trước/sau thao tác |

## 3. Chiến lược kết hợp

Dùng `one-factor-at-a-time`. Giữ admin session và các trường còn lại ở giá trị chuẩn hợp lệ; mỗi case chỉ thay một biến hoặc một trạng thái. Dùng mã riêng cho các case tạo coupon để không gây nhiễu bởi ràng buộc duy nhất, ngoại trừ case kiểm tra mã trùng. Không dùng pairwise vì mục tiêu là cô lập từng cận và từng thao tác CRUD trên client.

## 4. Bảng test case

| ID | Biến | Lớp tương đương | Giá trị test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Mã lỗi | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| TCB-FR17-01 | Quyền truy cập admin | Admin hợp lệ | Đăng nhập admin và mở “Mã Giảm Giá” | Accepted; hiển thị form và danh sách coupon | Chưa thực thi | NOT RUN | — | Giá trị chuẩn |
| TCB-FR17-02 | Quyền truy cập admin | Chưa đăng nhập | Mở client admin khi không có phiên | Rejected/không cho thao tác quản trị; thông báo cụ thể cần xác nhận | Chưa thực thi | NOT RUN | — | Client UI |
| TCB-FR17-03 | Quyền truy cập admin | User không phải admin | Đăng nhập user thường rồi mở màn coupon | Rejected; không được cấp màn quản trị | Chưa thực thi | NOT RUN | — | Không gọi API trực tiếp |
| TCB-FR17-04 | `code` | Giá trị không rỗng, chưa trùng | Nhập `webbva`, các trường còn lại chuẩn, gửi form | Accepted nếu backend chấp nhận; UI gửi/hiển thị `WEBBVA` | Chưa thực thi | NOT RUN | — | Kiểm tra uppercase |
| TCB-FR17-05 | `code` | Cận rỗng | Để trống `code`, gửi form | Bị từ chối bởi validation bắt buộc; mã/thông báo cần xác nhận | Chưa thực thi | NOT RUN | — | Input có `required` |
| TCB-FR17-06 | `code` | Mã trùng | Tạo `WEBBVA` lần thứ hai | Bị từ chối vì `code` phải duy nhất; UI hiển thị lỗi | Chưa thực thi | NOT RUN | — | Cần giữ coupon từ TCB-FR17-04 |
| TCB-FR17-07 | `code` | Whitespace/độ dài/charset chưa rõ | `" WEBBVA "`; mã rỗng Unicode; chuỗi rất dài | Chưa thể kết luận accepted/rejected; cần xác nhận quy tắc | Chưa thực thi | BLOCKED | — | Không tự chọn cận chưa đặc tả |
| TCB-FR17-08 | `type` | Enum `percent` | Chọn `Phần trăm (%)` | Accepted về enum; form cho gửi coupon | Chưa thực thi | NOT RUN | — | Phần tử enum hợp lệ |
| TCB-FR17-09 | `type` | Enum `fixed` | Chọn `Số tiền cố định (₫)` | Accepted về enum; form cho gửi coupon | Chưa thực thi | NOT RUN | — | Phần tử enum hợp lệ |
| TCB-FR17-10 | `type` | Ngoài enum | Thử nhập/chọn giá trị không có trong select | Không thể tạo giá trị qua UI chuẩn; cần API/DOM tampering ngoài phạm vi | Chưa thực thi | BLOCKED | — | Select chỉ có 2 option |
| TCB-FR17-11 | `discount_value` | Ngay dưới cận dương | Nhập `0` | Bị từ chối vì `discount_value` phải dương; mã/thông báo cần xác nhận | Chưa thực thi | NOT RUN | — | Giả định bước 1 |
| TCB-FR17-12 | `discount_value` | Tại cận dương nhỏ nhất | Nhập `1` | Được chấp nhận về điều kiện `> 0` nếu các trường khác hợp lệ | Chưa thực thi | NOT RUN | — | Giả định bước 1 |
| TCB-FR17-13 | `discount_value` | Ngay trên cận dương | Nhập `2` | Được chấp nhận về điều kiện `> 0` nếu các trường khác hợp lệ | Chưa thực thi | NOT RUN | — | Giả định bước 1 |
| TCB-FR17-14 | `discount_value` | Rỗng | Xóa giá trị rồi gửi form | Bị từ chối bởi `required` hoặc validation; mã/thông báo cần xác nhận | Chưa thực thi | NOT RUN | — | Input có `required` |
| TCB-FR17-15 | `discount_value` | Số thực gần cận | Nhập `0.1` và `1.1` | Chưa thể kết luận vì `step`/độ chính xác chưa đặc tả | Chưa thực thi | BLOCKED | — | Không tự suy diễn precision |
| TCB-FR17-16 | `min_order_amount` | Ngay dưới cận 0 | Nhập `-1` | Bị từ chối vì phải `>= 0`; mã/thông báo cần xác nhận | Chưa thực thi | NOT RUN | — | Giả định bước 1 |
| TCB-FR17-17 | `min_order_amount` | Tại cận 0 | Nhập `0` hoặc giữ mặc định `0` | Được chấp nhận về điều kiện `>= 0` | Chưa thực thi | NOT RUN | — | UI mặc định 0 |
| TCB-FR17-18 | `min_order_amount` | Ngay trên cận 0 | Nhập `1` | Được chấp nhận về điều kiện `>= 0` | Chưa thực thi | NOT RUN | — | Giả định bước 1 |
| TCB-FR17-19 | `min_order_amount` | Rỗng | Xóa giá trị và gửi | Chưa thể kết luận vì field không có `required`; cần xác nhận backend/default | Chưa thực thi | BLOCKED | — | Chỉ quan sát UI |
| TCB-FR17-20 | `min_order_amount` | Số thực gần cận | Nhập `0.1` | Chưa thể kết luận vì step/độ chính xác chưa đặc tả | Chưa thực thi | BLOCKED | — | Không tự suy diễn precision |
| TCB-FR17-21 | `max_uses_per_user` | Ngay dưới cận 1 | Nhập `0` | Bị từ chối vì phải `>= 1`; input có `min="1"` | Chưa thực thi | NOT RUN | — | Giả định số nguyên |
| TCB-FR17-22 | `max_uses_per_user` | Tại cận 1 | Giữ mặc định `1` | Được chấp nhận về điều kiện `>= 1` | Chưa thực thi | NOT RUN | — | Giá trị chuẩn |
| TCB-FR17-23 | `max_uses_per_user` | Ngay trên cận 1 | Nhập `2` | Được chấp nhận về điều kiện `>= 1` | Chưa thực thi | NOT RUN | — | Giả định số nguyên |
| TCB-FR17-24 | `max_uses_per_user` | Rỗng | Xóa giá trị và gửi | Chưa thể kết luận vì UI không đặt `required`; cần xác nhận backend/default | Chưa thực thi | BLOCKED | — | `min` không xử lý thiếu field |
| TCB-FR17-25 | `max_uses_per_user` | Số thực gần cận | Nhập `1.5` | Chưa thể kết luận vì integer/step chưa được đặc tả | Chưa thực thi | BLOCKED | — | Không tự suy diễn kiểu lưu |
| TCB-FR17-26 | `expired_at` | Có ngày | Chọn `2099-12-31` | Được chấp nhận về điều kiện bắt buộc nếu các trường khác hợp lệ | Chưa thực thi | NOT RUN | — | Input `date` hợp lệ |
| TCB-FR17-27 | `expired_at` | Rỗng | Xóa ngày và gửi | Bị từ chối bởi `required`; mã/thông báo cần xác nhận | Chưa thực thi | NOT RUN | — |  |
| TCB-FR17-28 | `expired_at` | Ngày quá khứ | Chọn `2020-01-01` | Chưa thể kết luận vì spec không nói ngày quá khứ bị cấm | Chưa thực thi | BLOCKED | — | Không biến thành luật mới |
| TCB-FR17-29 | Create | Payload UI hợp lệ, `percent` | `WEBPCT`, `percent`, `1`, `0`, `2099-12-31`, `1` | Coupon được tạo; form reset; coupon xuất hiện trong danh sách | Chưa thực thi | NOT RUN | — | Bao phủ Create và các cận hợp lệ |
| TCB-FR17-30 | Create | Payload UI hợp lệ, `fixed` | `WEBFIX`, `fixed`, `1`, `1`, `2099-12-31`, `2` | Coupon được tạo; loại và giá trị hiển thị đúng | Chưa thực thi | NOT RUN | — | Bao phủ nhánh fixed |
| TCB-FR17-31 | Read | Coupon tồn tại | Mở tab coupon sau Create hoặc refresh | Hiển thị code, type, value, min order, expiry, max uses | Chưa thực thi | NOT RUN | — | Bao phủ Xem |
| TCB-FR17-32 | Delete | Coupon tồn tại | Bấm “Xóa” trên `WEBFIX` | Coupon bị xóa và không còn trong danh sách sau refresh | Chưa thực thi | NOT RUN | — | Bao phủ Xóa |
| TCB-FR17-33 | Delete | Coupon đã bị xóa | Refresh danh sách sau TCB-FR17-32 | `WEBFIX` không xuất hiện lại | Chưa thực thi | NOT RUN | — | Kiểm tra trạng thái sau xóa |

## 5. Coverage

- Quyền admin: `TCB-FR17-01` đến `TCB-FR17-03`.
- `code`: cận rỗng `TCB-FR17-05`, cận duy nhất `TCB-FR17-06`; cận độ dài/charset/whitespace chưa có trong spec và bị chặn ở `TCB-FR17-07`.
- `type`: hai giá trị hợp lệ `TCB-FR17-08` và `TCB-FR17-09`; giá trị ngoài enum không tạo được qua select, ghi nhận ở `TCB-FR17-10`.
- `discount_value > 0`: trước/tại/sau cận theo giả định bước 1 ở `TCB-FR17-11` đến `TCB-FR17-13`; rỗng ở `TCB-FR17-14`; số thực bị chặn ở `TCB-FR17-15`.
- `min_order_amount >= 0`: trước/tại/sau cận ở `TCB-FR17-16` đến `TCB-FR17-18`; rỗng và số thực bị chặn ở `TCB-FR17-19` đến `TCB-FR17-20`.
- `max_uses_per_user >= 1`: trước/tại/sau cận ở `TCB-FR17-21` đến `TCB-FR17-23`; rỗng và số thực bị chặn ở `TCB-FR17-24` đến `TCB-FR17-25`.
- `expired_at`: cận có giá trị/rỗng ở `TCB-FR17-26` đến `TCB-FR17-27`; cận ngày quá khứ bị chặn ở `TCB-FR17-28`.
- CRUD trên client: Create `TCB-FR17-29` đến `TCB-FR17-30`, Read `TCB-FR17-31`, Delete `TCB-FR17-32` đến `TCB-FR17-33`.
- Chưa thể kiểm thử các cận trên, số thực chính xác, timezone, charset/độ dài mã và giới hạn phần trăm vì spec chưa cung cấp.
