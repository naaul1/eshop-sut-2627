# Test case Domain Testing - FR-03

## 1. Giả định và câu hỏi mở

- Email chưa đăng ký được xem là không hợp lệ cho bước lấy OTP; spec không quy định mã lỗi cụ thể.
- `null` và giá trị thiếu được kiểm thử ở mức API/request; giao diện có thể không tạo được hai dạng này riêng biệt.
- OTP hết hạn và OTP đã dùng được đưa vào vì SEC-07 quy định OTP phải có thời hạn và vô hiệu hóa sau khi dùng; thời lượng hết hạn chưa được đặc tả.
- Bước 2 sử dụng email đã yêu cầu OTP trong cùng luồng; việc đổi email được kiểm thử như một vi phạm ràng buộc gắn OTP.
- Không suy diễn thông báo lỗi, thời lượng hết hạn, cơ chế gửi email hay cách hiển thị OTP ngoài yêu cầu hiển thị trực tiếp trong demo.

## 2. Bảng biến

| Tên biến | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ |
|---|---|---|---|
| Email yêu cầu OTP | Chuỗi | Email hợp lệ, đã đăng ký | Sai format; rỗng; whitespace-only; null/thiếu; email hợp lệ nhưng chưa đăng ký |
| OTP | Chuỗi chữ số | Đúng 6 chữ số, do hệ thống sinh cho email đã yêu cầu | Khác 6 chữ số; chứa ký tự không phải số; rỗng; whitespace-only; null/thiếu; hết hạn/đã dùng |
| Email gắn với OTP | Chuỗi | Trùng email đã dùng ở bước 1 | Khác email đã dùng ở bước 1 |
| Mật khẩu mới | Chuỗi | Tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số và ít nhất một ký tự trong `@ $ ! % * ? &` | Rỗng; whitespace-only; null/thiếu; ngắn hơn 8 ký tự; thiếu chữ hoa; thiếu chữ thường; thiếu chữ số; thiếu ký tự đặc biệt hợp lệ; chỉ dùng ký tự đặc biệt không thuộc tập cho phép |
| Xác nhận mật khẩu mới | Chuỗi | Trùng chính xác mật khẩu mới | Khác mật khẩu mới; rỗng; whitespace-only; null/thiếu |
| Chỉ báo bước | Trạng thái UI | Hiển thị đúng bước 1/2 ở từng bước | Thiếu chỉ báo; hiển thị sai bước hoặc sai tổng số bước |
| Nút quay lại đăng nhập | Trạng thái UI / thao tác | Hiển thị và điều hướng về trang đăng nhập | Không hiển thị hoặc không điều hướng đúng |

## 3. Chiến lược kết hợp

Dùng `one-factor-at-a-time`. Giá trị chuẩn: email `test@eshop.com` đã đăng ký; OTP là mã 6 chữ số do hệ thống sinh cho email đó; mật khẩu mới `NewPass1!`; xác nhận trùng mật khẩu; đang ở đúng bước tương ứng. Mỗi test case chỉ thay một biến hoặc một lớp tương đương để kết quả quy về nguyên nhân rõ ràng. Riêng ràng buộc email-OTP và trạng thái OTP hết hạn/đã dùng là các điều kiện nghiệp vụ độc lập nên có test riêng.

## 4. Bảng test case

| ID | Biến | Lớp tương đương | Giá trị test | Kết quả mong đợi |
|---|---|---|---|---|
| DT-001 | Email yêu cầu OTP | Email hợp lệ và đã đăng ký | `test@eshop.com` | Accepted; hệ thống sinh OTP 6 chữ số và chuyển sang bước 2 hoặc hiển thị mã theo demo. |
| DT-002 | Email yêu cầu OTP | Sai format email | `test@` | Rejected; cần xác nhận thông báo lỗi. |
| DT-003 | Email yêu cầu OTP | Chuỗi rỗng | `""` | Rejected; cần xác nhận thông báo lỗi. |
| DT-004 | Email yêu cầu OTP | Whitespace-only | `"   "` | Rejected; cần xác nhận thông báo lỗi. |
| DT-005 | Email yêu cầu OTP | Null/giá trị thiếu | `null` hoặc bỏ field | Rejected; cần xác nhận mã lỗi/thông báo. |
| DT-006 | Email yêu cầu OTP | Email hợp lệ nhưng chưa đăng ký | `unknown@example.com` | Rejected vì FR-03 yêu cầu email đã đăng ký; thông báo cụ thể chưa được đặc tả. |
| DT-007 | OTP | Đúng 6 chữ số | `482731` | Accepted khi gắn với đúng email và còn hiệu lực. |
| DT-008 | OTP | Ít hơn 6 chữ số | `48273` | Rejected; cần xác nhận thông báo lỗi. |
| DT-009 | OTP | Nhiều hơn 6 chữ số | `4827310` | Rejected; cần xác nhận thông báo lỗi. |
| DT-010 | OTP | Chứa ký tự không phải số | `48A731` | Rejected; cần xác nhận thông báo lỗi. |
| DT-011 | OTP | Chuỗi rỗng | `""` | Rejected; cần xác nhận thông báo lỗi. |
| DT-012 | OTP | Whitespace-only | `"      "` | Rejected; cần xác nhận thông báo lỗi. |
| DT-013 | OTP | Null/giá trị thiếu | `null` hoặc bỏ field | Rejected; cần xác nhận mã lỗi/thông báo. |
| DT-014 | Email gắn với OTP | Trùng email đã yêu cầu | Bước 1 và bước 2 đều dùng `test@eshop.com` | Accepted nếu OTP hợp lệ; cho phép đặt lại mật khẩu. |
| DT-015 | Email gắn với OTP | Khác email đã yêu cầu | Bước 1 `test@eshop.com`, bước 2 `other@eshop.com` | Rejected; OTP không được dùng cho email khác. |
| DT-016 | OTP | Hết thời hạn | OTP hợp lệ nhưng quá thời hạn do hệ thống quy định | Rejected; OTP phải có thời hạn theo SEC-07; thời lượng cụ thể cần xác nhận. |
| DT-017 | OTP | Đã sử dụng | Dùng lại OTP sau lần đặt lại thành công | Rejected; OTP phải bị vô hiệu hóa sau khi dùng theo SEC-07. |
| DT-018 | Mật khẩu mới | Đủ mọi điều kiện FR-01 | `NewPass1!` | Accepted nếu OTP hợp lệ và xác nhận khớp. |
| DT-019 | Mật khẩu mới | Chuỗi rỗng | `""` | Rejected; cần xác nhận thông báo lỗi. |
| DT-020 | Mật khẩu mới | Whitespace-only | `"        "` | Rejected; không thỏa điều kiện mật khẩu mạnh; cần xác nhận thông báo. |
| DT-021 | Mật khẩu mới | Null/giá trị thiếu | `null` hoặc bỏ field | Rejected; cần xác nhận mã lỗi/thông báo. |
| DT-022 | Mật khẩu mới | Thiếu chữ hoa | `newpass1!` | Rejected vì thiếu ít nhất 1 chữ hoa. |
| DT-023 | Mật khẩu mới | Thiếu chữ thường | `NEWPASS1!` | Rejected vì thiếu ít nhất 1 chữ thường. |
| DT-024 | Mật khẩu mới | Thiếu chữ số | `NewPass!!` | Rejected vì thiếu ít nhất 1 chữ số. |
| DT-025 | Mật khẩu mới | Thiếu ký tự đặc biệt hợp lệ | `NewPass12` | Rejected vì thiếu ký tự trong tập `@ $ ! % * ? &`. |
| DT-026 | Mật khẩu mới | Ký tự đặc biệt ngoài tập cho phép | `NewPass1#` | Rejected vì không có ký tự đặc biệt thuộc tập được quy định. |
| DT-027 | Mật khẩu mới | Ngắn hơn 8 ký tự | `Aa1!xyz` | Rejected vì không đạt tối thiểu 8 ký tự. |
| DT-028 | Xác nhận mật khẩu mới | Trùng chính xác mật khẩu mới | Mật khẩu mới `NewPass1!`, xác nhận `NewPass1!` | Accepted nếu các điều kiện khác hợp lệ. |
| DT-029 | Xác nhận mật khẩu mới | Không trùng mật khẩu mới | Mật khẩu mới `NewPass1!`, xác nhận `NewPass2!` | Rejected vì hai trường không khớp. |
| DT-030 | Xác nhận mật khẩu mới | Chuỗi rỗng | `""` | Rejected vì thiếu xác nhận; cần xác nhận thông báo lỗi. |
| DT-031 | Xác nhận mật khẩu mới | Whitespace-only | `"        "` | Rejected vì không khớp mật khẩu mới; cần xác nhận thông báo. |
| DT-032 | Xác nhận mật khẩu mới | Null/giá trị thiếu | `null` hoặc bỏ field | Rejected; cần xác nhận mã lỗi/thông báo. |
| DT-033 | Chỉ báo bước | Bước 1 hiển thị đúng | Hiển thị `Bước 1 / 2` ở form nhập email | UI accepted; chỉ báo phải hiện rõ bước hiện tại. |
| DT-034 | Chỉ báo bước | Bước 2 hiển thị đúng | Hiển thị `Bước 2 / 2` ở form nhập OTP/mật khẩu | UI accepted; chỉ báo phải hiện rõ bước hiện tại. |
| DT-035 | Chỉ báo bước | Thiếu hoặc sai chỉ báo | Không có chỉ báo, hoặc `Bước 1 / 3` | UI rejected; không tuân thủ yêu cầu Step Indicator. |
| DT-036 | Nút quay lại đăng nhập | Hiển thị và điều hướng đúng | Bấm `Quay lại đăng nhập` ở luồng quên mật khẩu | Điều hướng về trang đăng nhập. |
| DT-037 | Nút quay lại đăng nhập | Không hiển thị/điều hướng sai | Nút vắng mặt hoặc bấm không về trang đăng nhập | UI rejected; cần xác định lỗi giao diện. |

## 5. Coverage và câu hỏi xác nhận

- Đã có đại diện cho mọi lớp xác định được trong bảng biến, gồm chuỗi rỗng, whitespace-only, null/thiếu, format, độ dài, ký tự đặc biệt, trạng thái UI và ràng buộc email-OTP.
- Chưa thể xác định giá trị cụ thể cho thời lượng OTP, mã lỗi/thông báo lỗi, và hành vi chính xác sau khi gửi email vì spec không nêu.
- Cần xác nhận: email chưa đăng ký có trả cùng thông báo chung với email sai format hay không; OTP hết hạn sau bao lâu; API phân biệt null với field bị thiếu như thế nào; mật khẩu Unicode có được chấp nhận ngoài các điều kiện FR-01 hay không.