# Test case Boundary Value Analysis - FR-09

## 1. Giả định và câu hỏi xác nhận

- Mã yêu cầu là `FR-09`; endpoint mục tiêu là `POST /api/apply-coupon`.
- Giá trị chuẩn: `SAVE10`, user hợp lệ với JWT hợp lệ, `total_amount = 500000`, `used_count = 0`, coupon `is_active = 1`, `expired_at` còn hiệu lực.
- README chỉ nêu tiền theo VND và các giá trị mẫu là số nguyên; các case quanh ngưỡng dùng bước 1 VND như một **giả định tạm thời**. Nếu hệ thống cho phép đơn vị nhỏ hơn đồng hoặc số thực, cần sinh lại các case lân cận.
- Độ chính xác thời gian, timezone và format đầy đủ của `expired_at` chưa được đặc tả. Các case trước/tại/sau thời điểm hết hạn được mô tả theo quan hệ thời gian và đánh dấu `BLOCKED` khi cần giá trị timestamp thực thi.
- `null`, thiếu field, chuỗi rỗng và whitespace-only được tách riêng ở mức request nếu API phân biệt được; spec chưa quy định mã lỗi.
- `max_uses_per_user` và `discount_value` không có cận min/max tổng quát; không tự tạo BVA cho các cận chưa được nêu.
- Không có kết quả runtime nào được suy diễn; tất cả case đều `NOT RUN`, hoặc `BLOCKED` nếu thiếu thông tin để tạo dữ liệu thực thi.

### Câu hỏi cần xác nhận

1. Đơn vị nhỏ nhất và độ chính xác của các trường tiền là 1 VND hay có số thực?
2. `expired_at` dùng timezone/offset và độ chính xác nào? “Ngay trước/tại/ngay sau” được tính theo giây, mili-giây hay ngày?
3. `user_id` có bắt buộc trùng subject trong JWT không?
4. Có giới hạn cho `discount_value`, ví dụ phần trăm trong khoảng 0–100, và có chặn `final_amount` âm không?
5. Mã lỗi/thông báo lỗi kỳ vọng cho từng điều kiện bị từ chối là gì?

## 2. Bảng biến và miền

| Tên biến | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ | Các biên cần kiểm thử |
|---|---|---|---|---|
| `is_active` | Boolean/bit | `1` | `0`; giá trị khác kiểu chưa có luật | Điểm chuyển `0/1` |
| `expired_at` so với hiện tại | Ngày/giờ | Hiện tại **trước** `expired_at` | Hiện tại bằng hoặc sau `expired_at` | Ngay trước, tại, ngay sau hạn; đơn vị thời gian chưa rõ |
| `total_amount` so với `min_order_amount` | Số tiền VND | `total_amount >= min_order_amount` | `total_amount < min_order_amount` | `min-1`, `min`, `min+1` theo giả định bước 1 VND |
| `used_count` so với `max_uses_per_user` | Số nguyên đếm lượt | `used_count < max_uses_per_user` | `used_count = max_uses_per_user`; `used_count > max_uses_per_user` | Với max = 1: `0`, `1`, `2` |
| `type` | Enum | `percent`; `fixed` | Ngoài enum, sai kiểu, rỗng/null/thiếu | Từng phần tử enum; không có thứ tự nên không gọi đầu/cuối là biên |
| `code` | Chuỗi | Mã tồn tại và `is_active = 1` | Không tồn tại, inactive, rỗng/null/thiếu | Chỉ có biên trạng thái tồn tại/hoạt động; độ dài/charset chưa nêu |
| `discount_value` | Số | Giá trị dùng theo công thức `percent` hoặc `fixed` | Sai kiểu/null/thiếu; cận số chưa nêu | Không thể lập min/max BVA do spec thiếu cận |
| JWT Token | Chuỗi header | JWT hợp lệ | Thiếu, sai, hết hạn | Chuyển trạng thái hợp lệ/không hợp lệ; không có độ dài/token boundary |

## 3. Chiến lược kết hợp

Dùng `one-factor-at-a-time`. Giữ các biến còn lại ở giá trị chuẩn hợp lệ và chỉ thay một biến tại mỗi case. Với ngưỡng `total_amount`, dùng `SAVE10` (`min_order_amount = 300000`) và giả định bước 1 VND để kiểm tra trước/tại/sau biên. Với số lượt, dùng `SAVE10` (`max_uses_per_user = 1`) để kiểm tra `0/1/2`. Không dùng exhaustive hoặc pairwise.

## 4. Bảng test case

| ID | Biến | Lớp tương đương | Giá trị test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Mã lỗi | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| TCB-FR09-01 | `is_active` | Inactive | Coupon tồn tại, `is_active = 0` | Bị từ chối vì không thỏa C1; mã/thông báo lỗi cần xác nhận | Chưa thực thi | NOT RUN | — | Biên phía không hợp lệ |
| TCB-FR09-02 | `is_active` | Active | Coupon tồn tại, `is_active = 1` | Được chấp nhận về C1 và tiếp tục kiểm tra C2-C5 | Chưa thực thi | NOT RUN | — | Biên phía hợp lệ |
| TCB-FR09-03 | `expired_at` | Ngay trước hạn | `now = expired_at - Δt` | Được chấp nhận về C2; Δt theo độ chính xác hệ thống | Chưa thực thi | BLOCKED | — | Cần xác nhận Δt/timezone |
| TCB-FR09-04 | `expired_at` | Đúng thời điểm hết hạn | `now = expired_at` | Bị từ chối vì yêu cầu hiện tại phải trước `expired_at` | Chưa thực thi | BLOCKED | — | Cần xác nhận độ chính xác/timezone |
| TCB-FR09-05 | `expired_at` | Ngay sau hạn | `now = expired_at + Δt` | Bị từ chối vì không còn hạn C2 | Chưa thực thi | BLOCKED | — | Cần xác nhận Δt/timezone |
| TCB-FR09-06 | `total_amount` | Dưới ngưỡng ngay trước cận | `299999` với `min_order_amount = 300000` | Bị từ chối vì không thỏa C3 | Chưa thực thi | NOT RUN | — | Giả định bước 1 VND |
| TCB-FR09-07 | `total_amount` | Tại ngưỡng | `300000` với `min_order_amount = 300000` | Được chấp nhận về C3 vì điều kiện là `>=` | Chưa thực thi | NOT RUN | — | Giả định bước 1 VND |
| TCB-FR09-08 | `total_amount` | Trên ngưỡng ngay sau cận | `300001` với `min_order_amount = 300000` | Được chấp nhận về C3 | Chưa thực thi | NOT RUN | — | Giả định bước 1 VND |
| TCB-FR09-09 | `total_amount` | Dưới ngưỡng của `BIGBUY` | `499999` với `min_order_amount = 500000` | Bị từ chối vì không thỏa C3 | Chưa thực thi | NOT RUN | — | Giả định bước 1 VND |
| TCB-FR09-10 | `total_amount` | Tại ngưỡng của `BIGBUY` | `500000` với `min_order_amount = 500000` | Được chấp nhận về C3 | Chưa thực thi | NOT RUN | — | Giả định bước 1 VND |
| TCB-FR09-11 | `total_amount` | Trên ngưỡng của `BIGBUY` | `500001` với `min_order_amount = 500000` | Được chấp nhận về C3 | Chưa thực thi | NOT RUN | — | Giả định bước 1 VND |
| TCB-FR09-12 | `used_count` | Chưa dùng hết lượt | `used_count = 0`, `max_uses_per_user = 1` | Được chấp nhận về C5 vì `0 < 1` | Chưa thực thi | NOT RUN | — | Biên hợp lệ thấp hơn cận |
| TCB-FR09-13 | `used_count` | Đúng số lượt tối đa | `used_count = 1`, `max_uses_per_user = 1` | Bị từ chối vì điều kiện yêu cầu `< max_uses_per_user` | Chưa thực thi | NOT RUN | — | Điểm chuyển miền |
| TCB-FR09-14 | `used_count` | Vượt số lượt tối đa | `used_count = 2`, `max_uses_per_user = 1` | Bị từ chối vì đã vượt giới hạn lượt dùng | Chưa thực thi | NOT RUN | — | Biên phía không hợp lệ |
| TCB-FR09-15 | `type` | Enum `percent` | Coupon `SAVE10`, `type = "percent"` | Tính `discount_amount = total × discount_value / 100` | Chưa thực thi | NOT RUN | — | Giá trị enum hợp lệ |
| TCB-FR09-16 | `type` | Enum `fixed` | Coupon `BIGBUY`, `type = "fixed"` | Tính `discount_amount = discount_value` | Chưa thực thi | NOT RUN | — | Giá trị enum hợp lệ |
| TCB-FR09-17 | `type` | Ngoài enum | `type = "amount"` | Bị từ chối hoặc không thể tính; mã/thông báo lỗi cần xác nhận | Chưa thực thi | NOT RUN | — | Đại diện miền ngoài enum |
| TCB-FR09-18 | `type` | Null/thiếu | `type = null`; chạy riêng request thiếu field | Bị từ chối hoặc không thể tính; mã/thông báo lỗi cần xác nhận | Chưa thực thi | NOT RUN | — | Hai dạng request riêng nếu phân biệt |
| TCB-FR09-19 | `code` | Không tồn tại | `code = "NOTFOUND"` | Bị từ chối vì không thỏa C1; mã/thông báo lỗi cần xác nhận | Chưa thực thi | NOT RUN | — | Trạng thái thực thể coupon |
| TCB-FR09-20 | `code` | Rỗng/thiếu | `code = ""`; chạy riêng request thiếu field | Bị từ chối; mã/thông báo lỗi cần xác nhận | Chưa thực thi | NOT RUN | — | Không có giới hạn độ dài để lập BVA |
| TCB-FR09-21 | JWT Token | Token hợp lệ | JWT hợp lệ, chưa hết hạn | Được chấp nhận về C4 | Chưa thực thi | NOT RUN | — | Giá trị chuẩn |
| TCB-FR09-22 | JWT Token | Token thiếu | Không gửi `Authorization` | Bị từ chối vì không thỏa C4; mã/thông báo lỗi cần xác nhận | Chưa thực thi | NOT RUN | — | Biên trạng thái xác thực |
| TCB-FR09-23 | JWT Token | Token không hợp lệ/hết hạn | JWT sai chữ ký hoặc `exp` đã qua | Bị từ chối vì JWT không hợp lệ; mã/thông báo lỗi cần xác nhận | Chưa thực thi | NOT RUN | — | Hai biến thể cùng miền xử lý kỳ vọng |
| TCB-FR09-24 | `discount_value` | Cận chưa được đặc tả | Giá trị ngay trước/tại/sau cận min hoặc max | Chưa thể sinh case BVA; cần xác nhận cận và độ chính xác | Chưa thực thi | BLOCKED | — | Không tự suy diễn cận phần trăm/số tiền |
| TCB-FR09-25 | `total_amount` | Sai độ chính xác/step chưa rõ | Giá trị thực quanh `300000` nếu tiền cho phép số lẻ | Chưa thể sinh giá trị trước/tại/sau; cần xác nhận step | Chưa thực thi | BLOCKED | — | Không dùng giá trị tùy ý |
| TCB-FR09-26 | `expired_at` | Format/timezone chưa rõ | Timestamp có offset khác hoặc format khác spec | Chưa thể kết luận accepted/rejected; cần xác nhận format/timezone | Chưa thực thi | BLOCKED | — | Không có luật chuẩn hóa trong spec |

## 5. Coverage

- `is_active` chuyển giữa `0` và `1`: `TCB-FR09-01` đến `TCB-FR09-02`.
- `expired_at` trước/tại/sau hạn: `TCB-FR09-03` đến `TCB-FR09-05`; bị chặn bởi Δt, độ chính xác và timezone chưa rõ.
- Ngưỡng `SAVE10` (`300000`): `TCB-FR09-06` đến `TCB-FR09-08`.
- Ngưỡng `BIGBUY` (`500000`): `TCB-FR09-09` đến `TCB-FR09-11`.
- `used_count < max_uses_per_user` với `max = 1`: `TCB-FR09-12` đến `TCB-FR09-14`.
- Enum `type`: `TCB-FR09-15` đến `TCB-FR09-18`; enum không có thứ tự nên không áp dụng min/max theo thứ tự.
- Trạng thái `code`: `TCB-FR09-19` đến `TCB-FR09-20`; spec không có cận độ dài/charset để lập BVA chuỗi.
- JWT: `TCB-FR09-21` đến `TCB-FR09-23`; spec không có cận độ dài token.
- Chưa thể kiểm thử các cận của `discount_value`, tiền số thực/step khác 1 VND, format/timezone `expired_at`: `TCB-FR09-24` đến `TCB-FR09-26`.
- Không tạo BVA cho `user_id` vì FR-09 không nêu cận số hoặc quy tắc liên kết cụ thể ngoài yêu cầu JWT hợp lệ.
