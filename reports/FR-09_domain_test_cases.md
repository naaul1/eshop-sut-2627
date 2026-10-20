# Test case Domain Testing - FR-09

## 1. Giả định và câu hỏi mở

- Các test gọi `POST /api/apply-coupon` theo body được nêu trong `api_specification.md`: `code`, `total_amount`, `user_id`; trạng thái JWT được thiết lập ở header.
- Giá trị chuẩn: mã `SAVE10` đang hoạt động, `expired_at = 2099-12-31`, `type = percent`, `discount_value = 10`, `min_order_amount = 300000`, `max_uses_per_user = 1`; `total_amount = 500000`; user hợp lệ đã dùng mã 0 lần.
- Với mã `BIGBUY`, giá trị chuẩn là `type = fixed`, `discount_value = 50000`, `min_order_amount = 500000`, `max_uses_per_user = 1`.
- `C2` được hiểu đúng theo đặc tả: ngày hiện tại phải **trước** `expired_at`; trường hợp cùng ngày/giờ được tách riêng vì không thỏa điều kiện “trước”.
- `null`, giá trị thiếu, chuỗi rỗng và whitespace-only được xem là các lớp riêng ở mức request nếu API có thể nhận diện riêng.
- Spec không quy định mã lỗi hoặc thông báo cụ thể; expected result chỉ ghi accepted/rejected và điều kiện nghiệp vụ.
- Spec không quy định mã có phân biệt hoa/thường hay tự trim khoảng trắng. Cần xác nhận hành vi mong muốn trước khi hoàn tất các test về chuẩn hóa.
- Spec không quy định định dạng chính xác của `expired_at`, timezone, quy tắc làm tròn tiền, hay giới hạn hợp lệ của `discount_value`; các lớp phụ thuộc các quy tắc này cần xác nhận.
- API body có `user_id`, trong khi C4 yêu cầu JWT hợp lệ. Cần xác nhận `user_id` có phải trùng subject trong JWT hay chỉ là giá trị truy vấn lịch sử sử dụng.

## 2. Bảng biến

| Tên biến | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ |
|---|---|---|---|
| `code` / mã coupon | Chuỗi | Mã tồn tại trong CSDL và `is_active = 1`; chuỗi chuẩn theo mã đã cấp | Không tồn tại; tồn tại nhưng `is_active != 1`; sai kiểu; rỗng; whitespace-only; `null`/thiếu |
| Trạng thái `expired_at` | Ngày/giờ lưu trong coupon | Thời điểm hiện tại trước `expired_at` | Hiện tại bằng hoặc sau `expired_at`; định dạng không hợp lệ, thiếu, `null`, timezone không rõ (chưa có luật xử lý) |
| `total_amount` | Số tiền | Số hợp lệ và thỏa `total_amount >= min_order_amount` | Số hợp lệ nhưng thấp hơn ngưỡng; sai kiểu; rỗng; whitespace-only; `null`/thiếu; số âm/0 |
| JWT Token | Chuỗi header Authorization | JWT hợp lệ và xác thực thành công | Thiếu; sai scheme/cấu trúc; chữ ký không hợp lệ; đã hết hạn; `null`/rỗng (nếu header nhận được) |
| `user_id` | Số nguyên trong JSON body | User hợp lệ, theo quan hệ với JWT nếu hệ thống yêu cầu | Sai kiểu; rỗng; `null`/thiếu; user không tồn tại; không khớp JWT |
| Số lần user đã dùng mã | Số nguyên do hệ thống lưu | `used_count < max_uses_per_user` | `used_count = max_uses_per_user`; `used_count > max_uses_per_user` |
| `min_order_amount` | Số tiền lưu trong coupon | Giá trị số dùng được để so sánh với `total_amount` | Sai kiểu; rỗng; `null`/thiếu; đơn vị/độ chính xác không tương thích (chưa được đặc tả) |
| Kết quả giảm giá | JSON chứa số tiền | `discount_amount` và `final_amount` theo công thức đã nêu | Thiếu field; kiểu không phải số; làm tròn/độ chính xác khác kỳ vọng (quy tắc chưa được đặc tả) |

## 3. Chiến lược kết hợp

Dùng `one-factor-at-a-time`. Giữ các điều kiện còn lại ở giá trị chuẩn và thay một biến hoặc một lớp tương đương trong mỗi test case. Cách này giúp quy kết việc accepted/rejected về đúng một điều kiện trong C1-C5, đồng thời dùng hai mã mẫu để bao phủ cả hai nhánh công thức. Các test về dữ liệu coupon lưu trong CSDL và trạng thái sử dụng được chuẩn bị trước khi gọi API.

## 4. Bảng test case

| ID | Biến | Lớp tương đương | Giá trị test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Mã lỗi | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| TC-FR09-01 | `code` | Mã tồn tại và đang hoạt động | `SAVE10` | Accepted; tiếp tục kiểm tra C2-C5 và tính giảm giá | Chưa thực thi | Not run | Chưa đặc tả | Giá trị chuẩn |
| TC-FR09-02 | `code` | Mã không tồn tại | `NOTFOUND` | Rejected vì không thỏa C1 | Chưa thực thi | Not run | Chưa đặc tả | Các biến khác hợp lệ |
| TC-FR09-03 | `code` | Mã tồn tại nhưng không hoạt động | Mã `SAVE10` với `is_active = 0` | Rejected vì không thỏa C1 | Chưa thực thi | Not run | Chưa đặc tả | Chuẩn bị dữ liệu DB riêng |
| TC-FR09-04 | `code` | Sai kiểu dữ liệu | `code: 123` | Rejected; cần xác nhận thông báo/mã lỗi | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-05 | `code` | Chuỗi rỗng | `code: ""` | Rejected; cần xác nhận thông báo/mã lỗi | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-06 | `code` | Whitespace-only | `code: "   "` | Rejected; cần xác nhận thông báo/mã lỗi | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-07 | `code` | `null` hoặc thiếu field | `code: null`; chạy thêm request bỏ `code` | Rejected; cần xác nhận thông báo/mã lỗi | Chưa thực thi | Not run | Chưa đặc tả | Hai request nếu API phân biệt |
| TC-FR09-08 | `code` | Khác hoa/thường hoặc có khoảng trắng đầu/cuối | `save10` hoặc `" SAVE10 "` | Chưa thể kết luận accepted/rejected; cần xác nhận quy tắc chuẩn hóa | Chưa thực thi | Blocked | Chưa đặc tả | Không tự suy diễn |
| TC-FR09-09 | `expired_at` | Hiện tại trước hạn | `SAVE10`, hiện tại giả lập trước `2099-12-31` | Accepted về C2; tiếp tục kiểm tra điều kiện khác | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-10 | `expired_at` | Hiện tại đúng thời điểm hết hạn | `expired_at` bằng thời điểm hiện tại | Rejected vì C2 yêu cầu hiện tại phải trước hạn | Chưa thực thi | Not run | Chưa đặc tả | Dùng cùng timezone đã xác nhận |
| TC-FR09-11 | `expired_at` | Đã hết hạn | Mã `EXPIRED`, hiện tại sau `2020-01-01` | Rejected vì không thỏa C2 | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-12 | `expired_at` | Định dạng/giá trị lưu không hợp lệ | `expired_at = "not-a-date"` | Chưa thể kết luận xử lý; cần xác nhận quy tắc dữ liệu lỗi | Chưa thực thi | Blocked | Chưa đặc tả | Kiểm thử chất lượng dữ liệu |
| TC-FR09-13 | `total_amount` | Đủ ngưỡng và là số nguyên | `SAVE10`, `total_amount = 500000` | Accepted nếu C1, C2, C4, C5 đạt; `discount_amount = 50000`, `final_amount = 450000` | Chưa thực thi | Not run | Chưa đặc tả | Bao phủ công thức percent |
| TC-FR09-14 | `total_amount` | Đúng ngưỡng `>= min_order_amount` | `SAVE10`, `total_amount = 300000` | Accepted về C3; `discount_amount = 30000`, `final_amount = 270000` | Chưa thực thi | Not run | Chưa đặc tả | Điều kiện `>=` được nêu rõ |
| TC-FR09-15 | `total_amount` | Thấp hơn ngưỡng | `SAVE10`, `total_amount = 299999` | Rejected vì không thỏa C3 | Chưa thực thi | Not run | Chưa đặc tả | Đại diện miền dưới ngưỡng, không phải phân tích biên |
| TC-FR09-16 | `total_amount` | Sai kiểu dữ liệu | `total_amount: "500000"` | Rejected; cần xác nhận thông báo/mã lỗi | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-17 | `total_amount` | Rỗng, whitespace-only, `null` hoặc thiếu | Chạy riêng từng payload tương ứng | Rejected; cần xác nhận thông báo/mã lỗi | Chưa thực thi | Not run | Chưa đặc tả | Các dạng thiếu dữ liệu là các lớp request riêng |
| TC-FR09-18 | JWT Token | JWT hợp lệ | Header `Authorization: Bearer <JWT hợp lệ>` | Accepted về C4; tiếp tục kiểm tra các điều kiện khác | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-19 | JWT Token | Thiếu token | Không gửi `Authorization` | Rejected vì không thỏa C4 | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-20 | JWT Token | Token sai cấu trúc hoặc chữ ký không hợp lệ | `Bearer abc.invalid` | Rejected vì JWT không hợp lệ | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-21 | JWT Token | Token đã hết hạn | JWT có `exp` đã qua | Rejected vì JWT không hợp lệ | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-22 | `user_id` | User hợp lệ | `user_id = 1` với user tồn tại | Accepted nếu quan hệ với JWT hợp lệ theo thiết kế | Chưa thực thi | Not run | Chưa đặc tả | README/API có body field nhưng C4 chỉ nêu JWT |
| TC-FR09-23 | `user_id` | Sai kiểu, rỗng, `null` hoặc thiếu | Chạy riêng từng payload tương ứng | Rejected; cần xác nhận field này bắt buộc và mã lỗi | Chưa thực thi | Blocked | Chưa đặc tả | Chỉ hoàn tất sau khi xác nhận vai trò `user_id` |
| TC-FR09-24 | `user_id` | User không tồn tại hoặc không khớp JWT | `user_id = 999999` hoặc user khác subject JWT | Chưa thể kết luận; cần xác nhận có kiểm tra khớp hay không | Chưa thực thi | Blocked | Chưa đặc tả | Ràng buộc liên biến chưa nêu |
| TC-FR09-25 | Số lần đã dùng | `used_count < max_uses_per_user` | User dùng `SAVE10` 0 lần, max = 1 | Accepted về C5 | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-26 | Số lần đã dùng | `used_count = max_uses_per_user` | User đã dùng `SAVE10` 1 lần, max = 1 | Rejected vì đã dùng hết lượt | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-27 | Số lần đã dùng | `used_count > max_uses_per_user` | Dữ liệu user đã dùng 2 lần, max = 1 | Rejected vì không thỏa C5 | Chưa thực thi | Not run | Chưa đặc tả | Kiểm thử dữ liệu trạng thái |
| TC-FR09-28 | `type` | Enum `percent` | `SAVE10`, `type = percent`, value = 10 | Accepted; `discount_amount = total × 10 / 100` | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-29 | `type` | Enum `fixed` | `BIGBUY`, `type = fixed`, value = 50000, total = 600000 | Accepted; `discount_amount = 50000`, `final_amount = 550000` | Chưa thực thi | Not run | Chưa đặc tả | Bao phủ công thức fixed |
| TC-FR09-30 | `type` | Ngoài enum, sai kiểu, rỗng, `null` hoặc thiếu | `type = "amount"`; chạy riêng các dạng còn lại | Rejected hoặc không thể tính; cần xác nhận mã lỗi | Chưa thực thi | Not run | Chưa đặc tả | Dữ liệu coupon không hợp lệ |
| TC-FR09-31 | `discount_value` | Số hợp lệ theo `percent` | `discount_value = 10` | Tính theo `total × discount_value / 100` | Chưa thực thi | Not run | Chưa đặc tả | Giới hạn phần trăm chưa được nêu |
| TC-FR09-32 | `discount_value` | Số hợp lệ theo `fixed` | `discount_value = 50000` | Tính `discount_amount = discount_value` | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-33 | `discount_value` | Sai kiểu, rỗng, `null` hoặc thiếu | `discount_value = "10"` hoặc từng dạng thiếu | Rejected hoặc không thể tính; cần xác nhận mã lỗi | Chưa thực thi | Not run | Chưa đặc tả |  |
| TC-FR09-34 | Kết quả giảm giá | JSON và công thức đúng | `SAVE10`, total = 500000 | Response có `discount_amount = 50000`, `final_amount = 450000` | Chưa thực thi | Not run | Chưa đặc tả | Kiểm tra output theo spec |
| TC-FR09-35 | Kết quả giảm giá | JSON/công thức fixed đúng | `BIGBUY`, total = 600000 | Response có `discount_amount = 50000`, `final_amount = 550000` | Chưa thực thi | Not run | Chưa đặc tả | Kiểm tra output theo spec |
| TC-FR09-36 | Kết quả giảm giá | Làm tròn/độ chính xác chưa xác định | `percent` tạo kết quả thập phân theo công thức | Chưa thể kết luận biểu diễn/làm tròn; cần xác nhận đơn vị tiền và rounding | Chưa thực thi | Blocked | Chưa đặc tả | Không tự bịa quy tắc |

## 5. Coverage và câu hỏi xác nhận

- C1 được bao phủ bởi `TC-FR09-01` đến `TC-FR09-08`: tồn tại/hoạt động, không tồn tại, inactive, sai kiểu, rỗng, whitespace-only, null/thiếu và chuẩn hóa chưa rõ.
- C2 được bao phủ bởi `TC-FR09-09` đến `TC-FR09-12`: còn hạn, đúng thời điểm hết hạn, hết hạn và dữ liệu ngày không hợp lệ.
- C3 được bao phủ bởi `TC-FR09-13` đến `TC-FR09-17`: số hợp lệ, đủ ngưỡng, dưới ngưỡng và các dạng input không hợp lệ.
- C4 được bao phủ bởi `TC-FR09-18` đến `TC-FR09-21`: JWT hợp lệ, thiếu, sai cấu trúc/chữ ký và hết hạn.
- C5 được bao phủ bởi `TC-FR09-25` đến `TC-FR09-27`: chưa dùng hết, dùng đủ và vượt số lượt.
- Công thức và enum được bao phủ bởi `TC-FR09-28` đến `TC-FR09-36`, gồm cả hai loại coupon và output JSON.
- Chưa thể hoàn tất các lớp `code` khác hoa/thường/có khoảng trắng, định dạng/timezone `expired_at`, số 0/âm/decimal của tiền, vai trò `user_id`, giới hạn `discount_value`, rounding và mã lỗi vì spec chưa quy định.

### Câu hỏi cần xác nhận

1. Mã coupon có phân biệt hoa/thường không? Có tự trim khoảng trắng đầu/cuối không?
2. `expired_at` dùng format và timezone nào? Tại đúng thời điểm hết hạn có bị từ chối như điều kiện “trước” không?
3. `total_amount`, `discount_value`, `min_order_amount` có bắt buộc số nguyên không? Có cho phép 0, số âm, số thực và đơn vị nhỏ hơn đồng không?
4. Có giới hạn `discount_value` cho `percent` (ví dụ không vượt 100) hoặc quy tắc không để `final_amount` âm không?
5. API có bắt buộc `user_id` không? Có phải trùng user ID trong JWT không, hay server phải lấy user từ JWT và bỏ qua giá trị client gửi?
6. Khi coupon không hợp lệ, JWT không hợp lệ hoặc body sai kiểu, mã lỗi/thông báo nào được kỳ vọng?
7. Kết quả tiền được làm tròn theo đơn vị nào và response bắt buộc chính xác những field nào ngoài `discount_amount`, `final_amount`?
