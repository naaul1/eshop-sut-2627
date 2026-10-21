# Test case Domain Testing - FR-17

## 1. Giả định và câu hỏi mở

- Phạm vi chỉ là client web admin: đăng nhập/ủy quyền hiển thị màn coupon, nhập form, xem danh sách và thao tác xóa qua giao diện.
- Giá trị chuẩn: admin hợp lệ; mã `WEB10`; `type = percent`; `discount_value = 10`; `min_order_amount = 200000`; `expired_at = 2099-12-31`; `max_uses_per_user = 1`.
- Frontend tự chuyển `code` thành chữ hoa khi nhập; test chuẩn hóa được thực hiện trên UI, không suy diễn quy tắc backend khác.
- `required` của HTML được xem là validation phía client; thông báo cụ thể của trình duyệt có thể khác theo browser.
- Vì người dùng yêu cầu chỉ test trên client web admin, không tạo case trực tiếp sửa `is_active`, kiểm tra schema DB, gọi API bằng payload sai kiểu, hoặc xác minh transaction/backend ngoài hành vi quan sát được trên UI.
- Spec chưa quy định độ dài/charset của `code`, giới hạn trên của các số, giới hạn phần trăm, timezone/format ngoài input `date`, thông báo lỗi, hoặc có/không có chức năng sửa mã. Các lớp phụ thuộc chúng được đánh dấu chưa đủ thông tin hoặc không đưa vào test client.

### Câu hỏi cần xác nhận

1. `code` có giới hạn độ dài, charset hoặc cho phép khoảng trắng/Unicode không?
2. `discount_value` có giới hạn nghiệp vụ riêng theo `type` (ví dụ percent không vượt 100) không?
3. `expired_at` có được phép là ngày trong quá khứ không, hay phải sau ngày hiện tại?
4. Khi trùng `code`, UI phải hiển thị thông báo/mã lỗi cụ thể nào?
5. FR-17 nói “Thêm / Xem / Xóa”; có cần kiểm thử chỉnh sửa không?
6. Có yêu cầu phân trang, thứ tự hoặc định dạng hiển thị danh sách coupon không?

## 2. Bảng biến

| Tên biến | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ |
|---|---|---|---|
| Quyền truy cập admin | Phiên đăng nhập/UI state | Admin đăng nhập hợp lệ và thấy màn “Mã Giảm Giá” | Chưa đăng nhập; user không phải admin; token phiên không hợp lệ/hết hạn |
| `code` | Chuỗi | Không rỗng, nhập trên form; sau khi nhập UI chuẩn hóa thành chữ hoa; chưa tồn tại khi tạo | Rỗng/thiếu; chỉ whitespace; mã đã tồn tại; kiểu/charset/độ dài ngoài quy định chưa đặc tả |
| `type` | Enum select | `percent`; `fixed` | Không có lựa chọn khác trên UI; giá trị thiếu/chọn mặc định chưa xác định ngoài select |
| `discount_value` | Số trên input number | Số dương (`> 0`) | Rỗng; 0; số âm; sai định dạng số; giới hạn trên chưa đặc tả |
| `expired_at` | Ngày trên input date | Có ngày được nhập | Rỗng/thiếu; ngày quá khứ nếu nghiệp vụ cấm (chưa được đặc tả); format ngoài control UI không áp dụng |
| `min_order_amount` | Số tiền trên input number | Số `>= 0`, UI mặc định 0 | Rỗng nếu field bị bỏ trống và backend không nhận mặc định; số âm; sai định dạng số; giới hạn trên/độ chính xác chưa đặc tả |
| `max_uses_per_user` | Số lần trên input number | Số nguyên `>= 1`; UI đặt `min="1"` | Rỗng; 0; số âm; số thực/chuỗi sai kiểu nếu UI cho nhập; giới hạn trên chưa đặc tả |
| Xem danh sách coupon | Dữ liệu hiển thị | Coupon đã tạo xuất hiện với mã, loại, giá trị, ngưỡng, hạn, giới hạn/người | Không tải được danh sách; coupon không hiển thị hoặc hiển thị sai trường |
| Xóa coupon | Thao tác và trạng thái | Nút Xóa loại bỏ coupon khỏi danh sách sau thao tác thành công | Không có nút; xóa không thành công nhưng UI báo thành công; coupon vẫn còn sau refresh |

## 3. Chiến lược kết hợp

Dùng `one-factor-at-a-time`. Giữ phiên admin và các trường còn lại ở giá trị chuẩn hợp lệ; mỗi test case chỉ thay một biến hoặc một lớp tương đương. Dùng các mã riêng cho từng test để tránh ảnh hưởng bởi ràng buộc duy nhất, ngoại trừ các case duplicate cố ý. Không dùng pairwise vì yêu cầu tập trung vào từng validation và thao tác CRUD trên client.

## 4. Bảng test case

| ID | Biến | Lớp tương đương | Giá trị test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Mã lỗi | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| TC-FR17-01 | Quyền truy cập admin | Admin hợp lệ | Đăng nhập bằng tài khoản admin, mở “Mã Giảm Giá” | Accepted; hiển thị form tạo và danh sách coupon | Chưa thực thi | NOT RUN | — | Giá trị chuẩn |
| TC-FR17-02 | Quyền truy cập admin | Chưa đăng nhập | Mở client admin khi chưa có phiên | Rejected/không cho sử dụng màn quản trị; hành vi/thông báo cụ thể cần xác nhận | Chưa thực thi | NOT RUN | — | Chỉ quan sát UI |
| TC-FR17-03 | Quyền truy cập admin | User không phải admin | Đăng nhập user thường rồi truy cập màn coupon | Rejected; không được cấp quyền quản trị | Chưa thực thi | NOT RUN | — | Không gọi API trực tiếp |
| TC-FR17-04 | `code` | Chuỗi hợp lệ, chưa tồn tại | Nhập `web10`, các trường còn lại hợp lệ, bấm “Tạo mã” | Accepted nếu các điều kiện khác hợp lệ; UI gửi/hiển thị mã `WEB10` | Chưa thực thi | NOT RUN | — | Bao phủ auto-uppercase |
| TC-FR17-05 | `code` | Chuỗi rỗng | Để trống mã, bấm “Tạo mã” | Rejected bởi validation bắt buộc; cần xác nhận thông báo trình duyệt/UI | Chưa thực thi | NOT RUN | — | `required` trên input |
| TC-FR17-06 | `code` | Whitespace-only | Nhập `"   "` và gửi form | Chưa thể kết luận vì spec/UI không quy định trim; cần xác nhận hành vi | Chưa thực thi | BLOCKED | — | Không tự coi là rỗng |
| TC-FR17-07 | `code` | Mã đã tồn tại | Tạo `WEB10` lần hai | Rejected vì `code` phải duy nhất; UI phải hiển thị lỗi | Chưa thực thi | NOT RUN | — | Cần giữ coupon `WEB10` từ TC-FR17-04 |
| TC-FR17-08 | `type` | Enum `percent` | Chọn “Phần trăm (%)”, các trường hợp lệ | Accepted; danh sách hiển thị loại phần trăm | Chưa thực thi | NOT RUN | — | Giá trị select hợp lệ |
| TC-FR17-09 | `type` | Enum `fixed` | Chọn “Số tiền cố định”, các trường hợp hợp lệ | Accepted; danh sách hiển thị loại cố định | Chưa thực thi | NOT RUN | — | Dùng mã riêng |
| TC-FR17-10 | `discount_value` | Số dương | Nhập `10` với type percent | Accepted về điều kiện dương | Chưa thực thi | NOT RUN | — | Giá trị chuẩn |
| TC-FR17-11 | `discount_value` | Rỗng | Xóa giá trị rồi gửi | Rejected bởi `required` hoặc validation; cần xác nhận thông báo | Chưa thực thi | NOT RUN | — |  |
| TC-FR17-12 | `discount_value` | Bằng 0 | Nhập `0` | Rejected vì phải dương; nếu UI không chặn thì cần ghi nhận lỗi hiển thị/server qua UI | Chưa thực thi | NOT RUN | — | Không gọi API trực tiếp |
| TC-FR17-13 | `discount_value` | Âm | Nhập `-10` | Rejected vì phải dương; cần xác nhận thông báo | Chưa thực thi | NOT RUN | — |  |
| TC-FR17-14 | `min_order_amount` | Bằng 0 | Giữ giá trị mặc định `0` | Accepted vì điều kiện `>= 0` | Chưa thực thi | NOT RUN | — | Giá trị mặc định của UI |
| TC-FR17-15 | `min_order_amount` | Số dương | Nhập `200000` | Accepted vì thỏa `>= 0` | Chưa thực thi | NOT RUN | — |  |
| TC-FR17-16 | `min_order_amount` | Âm | Nhập `-1` | Rejected vì không thỏa `>= 0`; cần xác nhận UI/browser validation | Chưa thực thi | NOT RUN | — |  |
| TC-FR17-17 | `expired_at` | Có ngày hợp lệ | Chọn `2099-12-31` | Accepted về trường bắt buộc; coupon được tạo nếu điều kiện khác hợp lệ | Chưa thực thi | NOT RUN | — | Không suy diễn ngày tương lai là bắt buộc |
| TC-FR17-18 | `expired_at` | Rỗng | Xóa ngày rồi gửi | Rejected bởi `required`; cần xác nhận thông báo | Chưa thực thi | NOT RUN | — |  |
| TC-FR17-19 | `max_uses_per_user` | Số nguyên bằng 1 | Giữ giá trị mặc định `1` | Accepted vì `>= 1` | Chưa thực thi | NOT RUN | — |  |
| TC-FR17-20 | `max_uses_per_user` | Số nguyên lớn hơn 1 | Nhập `2` | Accepted vì `>= 1` | Chưa thực thi | NOT RUN | — |  |
| TC-FR17-21 | `max_uses_per_user` | Bằng 0 | Nhập `0` | Rejected vì không thỏa `>= 1`; input có `min="1"` | Chưa thực thi | NOT RUN | — |  |
| TC-FR17-22 | `max_uses_per_user` | Số âm | Nhập `-1` | Rejected vì không thỏa `>= 1` | Chưa thực thi | NOT RUN | — |  |
| TC-FR17-23 | `max_uses_per_user` | Rỗng | Xóa giá trị rồi gửi | Chưa thể kết luận: UI không đặt `required`, backend/default có thể xử lý khác; cần xác nhận | Chưa thực thi | BLOCKED | — | Chỉ test được qua UI |
| TC-FR17-24 | Tạo coupon | Payload UI hợp lệ với `percent` | `WEBPCT`, `percent`, `10`, `0`, `2099-12-31`, `1` | Coupon được tạo; form reset; coupon xuất hiện trong danh sách | Chưa thực thi | NOT RUN | — | Bao phủ Create |
| TC-FR17-25 | Tạo coupon | Payload UI hợp lệ với `fixed` | `WEBFIX`, `fixed`, `50000`, `200000`, `2099-12-31`, `1` | Coupon được tạo; loại và giá trị hiển thị đúng | Chưa thực thi | NOT RUN | — | Bao phủ nhánh fixed |
| TC-FR17-26 | Xem coupon | Coupon tồn tại | Mở tab coupon sau khi tạo hoặc tải lại trang | Danh sách hiển thị code, type, discount value, min order, expiry, max uses | Chưa thực thi | NOT RUN | — | Bao phủ Read |
| TC-FR17-27 | Xóa coupon | Coupon tồn tại và có nút Xóa | Bấm “Xóa” trên `WEBFIX` | Coupon bị xóa và không còn trong danh sách sau refresh | Chưa thực thi | NOT RUN | — | Bao phủ Delete |
| TC-FR17-28 | Xóa coupon | Coupon không còn tồn tại | Refresh sau TC-FR17-27, quan sát danh sách | Coupon đã xóa không xuất hiện lại | Chưa thực thi | NOT RUN | — | Kiểm tra trạng thái hiển thị |

## 5. Coverage và câu hỏi xác nhận

- Quyền admin: `TC-FR17-01` đến `TC-FR17-03`.
- `code`: `TC-FR17-04` đến `TC-FR17-07`; lớp whitespace-only bị chặn do thiếu quy tắc trim.
- `type`: `TC-FR17-08` và `TC-FR17-09`, bao phủ cả hai giá trị enum trên select.
- `discount_value`: `TC-FR17-10` đến `TC-FR17-13`; chưa có giới hạn trên hoặc quy tắc percent-specific.
- `min_order_amount`: `TC-FR17-14` đến `TC-FR17-16`, bao phủ `0`, số dương và âm.
- `expired_at`: `TC-FR17-17` và `TC-FR17-18`; chưa kiểm thử ngày quá khứ vì spec không nói cấm.
- `max_uses_per_user`: `TC-FR17-19` đến `TC-FR17-23`, gồm `1`, lớn hơn 1, 0, âm và rỗng.
- CRUD client: Create `TC-FR17-24` đến `TC-FR17-25`, Read `TC-FR17-26`, Delete `TC-FR17-27` đến `TC-FR17-28`.
- Ngoài phạm vi client: kiểm tra trực tiếp DB/schema, payload sai kiểu bằng API, `is_active`, transaction, timezone nội bộ và tính duy nhất ngoài luồng UI.
