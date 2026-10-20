# Test case Boundary Value Analysis - FR-03

## 1. Giả định và câu hỏi xác nhận

- Mã yêu cầu là `FR-03`; OTP được xử lý như chuỗi chữ số để giữ được số 0 ở đầu.
- Biên xác định được: OTP có đúng 6 chữ số; mật khẩu có tối thiểu 8 ký tự; mỗi nhóm chữ hoa, chữ thường, chữ số và ký tự đặc biệt có tối thiểu 1 ký tự.
- Với độ dài OTP, kiểm thử trước biên, tại biên và sau biên là 5, 6 và 7 chữ số.
- Với độ dài mật khẩu, kiểm thử trước biên, tại biên và sau biên là 7, 8 và 9 ký tự.
- Với các nhóm ký tự bắt buộc, kiểm thử số lượng 0, 1 và 2 ký tự trong nhóm; các điều kiện khác được giữ hợp lệ.
- Spec không nêu thời lượng, đơn vị độ chính xác hoặc timezone của hạn OTP; chưa tạo mốc BVA cho thời hạn.
- Spec không nêu mã lỗi/thông báo lỗi cụ thể; cột mã lỗi dùng `—` và kết quả mong đợi yêu cầu xác nhận khi bị từ chối.
- Null, giá trị thiếu, chuỗi rỗng và whitespace-only là các case dữ liệu đặc thù, nhưng không phải biên số/độ dài đã định nghĩa; chỉ đưa vào coverage cần bổ sung nếu hệ thống phân biệt được.

## 2. Bảng biến và miền

| Tên biến | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ | Các biên cần kiểm thử |
|---|---|---|---|---|
| Email yêu cầu OTP | Chuỗi email | Email hợp lệ và đã đăng ký | Sai format, chưa đăng ký, rỗng/null/thiếu | Spec không nêu cận độ dài; kiểm tra format/trạng thái, không suy diễn biên độ dài |
| OTP | Chuỗi chữ số | Đúng 6 chữ số, gắn đúng email, còn hiệu lực | 5 hoặc 7 chữ số; ký tự không phải số; sai email; hết hạn/đã dùng | Độ dài 5, 6, 7; thời hạn chưa đủ dữ liệu để lập biên |
| Mật khẩu mới | Chuỗi | Độ dài từ 8 ký tự; có hoa, thường, số, đặc biệt thuộc `@ $ ! % * ? &` | Độ dài 7; thiếu một nhóm bắt buộc | Độ dài 7, 8, 9; số lượng mỗi nhóm 0, 1, 2 |
| Xác nhận mật khẩu mới | Chuỗi | Trùng chính xác mật khẩu mới | Khác mật khẩu mới, rỗng/null/thiếu | Điểm chuyển đổi bằng/khác chuỗi; spec không có cận độ dài riêng |
| Email gắn với OTP | Chuỗi | Trùng email bước 1 | Khác email bước 1 | Điểm chuyển đổi trùng/khác; không có biên số học |
| Chỉ báo bước | Enum UI | `Bước 1 / 2`, `Bước 2 / 2` | Thiếu hoặc sai tổng số bước | Hai giá trị hợp lệ được nêu trong spec; không suy diễn thứ tự ngoài 2 bước |
| Nút quay lại đăng nhập | Thao tác UI | Hiển thị và điều hướng về đăng nhập | Thiếu hoặc điều hướng sai | Điểm chuyển đổi có/không có thao tác |

## 3. Chiến lược kết hợp

Dùng `one-factor-at-a-time`. Giá trị chuẩn: email `test@eshop.com` đã đăng ký; OTP hợp lệ 6 chữ số `482731`; email bước 2 trùng email bước 1; mật khẩu chuẩn `Aa1!xyza`; xác nhận trùng; đang ở đúng bước. Mỗi case chỉ thay một biến hoặc một số lượng tại biên, để cô lập nguyên nhân. Các case ký tự đặc biệt là coverage charset bổ sung cho điều kiện mật khẩu, không phải exhaustive test.

## 4. Bảng test case

| ID | Biến | Lớp tương đương | Giá trị test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Mã lỗi | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| TC-FR03-01 | OTP | Trước biên độ dài hợp lệ | `48273` (5 chữ số) | Bị từ chối; mã/thông báo lỗi cần xác nhận. | Chưa thực thi | NOT RUN | — | Giữ email đúng và còn hiệu lực. |
| TC-FR03-02 | OTP | Tại biên độ dài hợp lệ | `482731` (6 chữ số) | Được chấp nhận nếu gắn đúng email và còn hiệu lực. | Chưa thực thi | NOT RUN | — | Biên độ dài chính xác theo FR-03. |
| TC-FR03-03 | OTP | Sau biên độ dài hợp lệ | `4827310` (7 chữ số) | Bị từ chối; mã/thông báo lỗi cần xác nhận. | Chưa thực thi | NOT RUN | — | Giữ các điều kiện khác hợp lệ. |
| TC-FR03-04 | OTP | Đúng độ dài nhưng sai kiểu ký tự | `48A731` | Bị từ chối; mã/thông báo lỗi cần xác nhận. | Chưa thực thi | NOT RUN | — | Charset không phải chữ số. |
| TC-FR03-05 | OTP | Đúng độ dài và có số 0 đầu | `012345` | Được chấp nhận nếu do hệ thống sinh và gắn đúng email. | Chưa thực thi | NOT RUN | — | Kiểm tra xử lý OTP dạng chuỗi. |
| TC-FR03-06 | Email gắn với OTP | Điểm chuyển đổi: trùng email | Bước 1 và 2 dùng `test@eshop.com` | Được chấp nhận khi OTP hợp lệ; cho phép đặt lại mật khẩu. | Chưa thực thi | NOT RUN | — | Email đã đăng ký. |
| TC-FR03-07 | Email gắn với OTP | Điểm chuyển đổi: khác email | Bước 1 `test@eshop.com`, bước 2 `other@eshop.com` | Bị từ chối; OTP không được dùng cho email khác. | Chưa thực thi | NOT RUN | — | Ràng buộc liên kết OTP-email. |
| TC-FR03-08 | Mật khẩu mới | Trước biên độ dài tối thiểu | `Aa1!xyz` (7 ký tự) | Bị từ chối vì chưa đạt tối thiểu 8 ký tự. | Chưa thực thi | NOT RUN | — | Các nhóm ký tự đều có ít nhất 1. |
| TC-FR03-09 | Mật khẩu mới | Tại biên độ dài tối thiểu | `Aa1!xyza` (8 ký tự) | Được chấp nhận nếu OTP hợp lệ và xác nhận khớp. | Chưa thực thi | NOT RUN | — | Các nhóm ký tự đều có ít nhất 1. |
| TC-FR03-10 | Mật khẩu mới | Sau biên độ dài tối thiểu | `Aa1!xyzab` (9 ký tự) | Được chấp nhận nếu OTP hợp lệ và xác nhận khớp. | Chưa thực thi | NOT RUN | — | Các nhóm ký tự đều có ít nhất 1. |
| TC-FR03-11 | Mật khẩu mới | Trước biên số chữ hoa bắt buộc | `aa1!xyza` (0 chữ hoa) | Bị từ chối vì thiếu chữ hoa. | Chưa thực thi | NOT RUN | — | Độ dài 8; nhóm khác hợp lệ. |
| TC-FR03-12 | Mật khẩu mới | Tại biên số chữ hoa bắt buộc | `Aa1!xyza` (1 chữ hoa) | Được chấp nhận nếu các điều kiện khác hợp lệ. | Chưa thực thi | NOT RUN | — | |
| TC-FR03-13 | Mật khẩu mới | Sau biên số chữ hoa bắt buộc | `AB1!xyza` (2 chữ hoa) | Được chấp nhận nếu các điều kiện khác hợp lệ. | Chưa thực thi | NOT RUN | — | |
| TC-FR03-14 | Mật khẩu mới | Trước biên số chữ thường bắt buộc | `AA1!XYZ2` (0 chữ thường) | Bị từ chối vì thiếu chữ thường. | Chưa thực thi | NOT RUN | — | Độ dài 8; nhóm khác hợp lệ. |
| TC-FR03-15 | Mật khẩu mới | Tại biên số chữ thường bắt buộc | `AA1!XYZa` (1 chữ thường) | Được chấp nhận nếu các điều kiện khác hợp lệ. | Chưa thực thi | NOT RUN | — | |
| TC-FR03-16 | Mật khẩu mới | Sau biên số chữ thường bắt buộc | `Aa1!xyza` (4 chữ thường) | Được chấp nhận nếu các điều kiện khác hợp lệ. | Chưa thực thi | NOT RUN | — | Đại diện miền từ 2 ký tự trở lên. |
| TC-FR03-17 | Mật khẩu mới | Trước biên số chữ số bắt buộc | `Aa!!xyza` (0 chữ số) | Bị từ chối vì thiếu chữ số. | Chưa thực thi | NOT RUN | — | Độ dài 8; nhóm khác hợp lệ. |
| TC-FR03-18 | Mật khẩu mới | Tại biên số chữ số bắt buộc | `Aa1!xyza` (1 chữ số) | Được chấp nhận nếu các điều kiện khác hợp lệ. | Chưa thực thi | NOT RUN | — | |
| TC-FR03-19 | Mật khẩu mới | Sau biên số chữ số bắt buộc | `Aa12!xyz` (2 chữ số) | Được chấp nhận nếu các điều kiện khác hợp lệ. | Chưa thực thi | NOT RUN | — | |
| TC-FR03-20 | Mật khẩu mới | Trước biên số ký tự đặc biệt bắt buộc | `Aa1xyzab` (0 ký tự đặc biệt) | Bị từ chối vì thiếu ký tự đặc biệt hợp lệ. | Chưa thực thi | NOT RUN | — | Độ dài 8; nhóm khác hợp lệ. |
| TC-FR03-21 | Mật khẩu mới | Tại biên số ký tự đặc biệt bắt buộc | `Aa1!xyza` (1 ký tự đặc biệt) | Được chấp nhận nếu các điều kiện khác hợp lệ. | Chưa thực thi | NOT RUN | — | |
| TC-FR03-22 | Mật khẩu mới | Sau biên số ký tự đặc biệt bắt buộc | `Aa1!!xyz` (2 ký tự đặc biệt) | Được chấp nhận nếu các điều kiện khác hợp lệ. | Chưa thực thi | NOT RUN | — | |
| TC-FR03-23 | Mật khẩu mới | Charset ký tự đặc biệt được phép | `Aa1@xyza` | Được chấp nhận nếu các điều kiện khác hợp lệ. | Chưa thực thi | NOT RUN | — | Đại diện tập `@ $ ! % * ? &`; cần chạy thêm từng phần tử nếu yêu cầu bao phủ đầy đủ charset. |
| TC-FR03-24 | Mật khẩu mới | Charset ký tự đặc biệt ngoài tập | `Aa1#xyza` | Bị từ chối vì `#` không thuộc tập ký tự đặc biệt được nêu. | Chưa thực thi | NOT RUN | — | |
| TC-FR03-25 | Xác nhận mật khẩu mới | Điểm chuyển đổi: trùng | `Aa1!xyza` / `Aa1!xyza` | Được chấp nhận nếu OTP và mật khẩu hợp lệ. | Chưa thực thi | NOT RUN | — | Hai trường giống hệt nhau. |
| TC-FR03-26 | Xác nhận mật khẩu mới | Điểm chuyển đổi: khác | `Aa1!xyza` / `Aa1!xyzb` | Bị từ chối vì hai trường mật khẩu không khớp. | Chưa thực thi | NOT RUN | — | Chỉ thay một ký tự xác nhận. |
| TC-FR03-27 | Chỉ báo bước | Giá trị hợp lệ bước 1 | Hiển thị `Bước 1 / 2` | Giao diện phải hiển thị đúng chỉ báo bước 1/2. | Chưa thực thi | NOT RUN | — | |
| TC-FR03-28 | Chỉ báo bước | Giá trị hợp lệ bước 2 | Hiển thị `Bước 2 / 2` | Giao diện phải hiển thị đúng chỉ báo bước 2/2. | Chưa thực thi | NOT RUN | — | |
| TC-FR03-29 | Nút quay lại đăng nhập | Điểm chuyển đổi thao tác | Bấm `Quay lại đăng nhập` | Điều hướng về trang đăng nhập. | Chưa thực thi | NOT RUN | — | |

## 5. Coverage

- Biên OTP: trước/tại/sau độ dài 6 chữ số được bao phủ bởi `TC-FR03-01` đến `TC-FR03-03`; kiểu ký tự và số 0 đầu bởi `TC-FR03-04` và `TC-FR03-05`.
- Biên liên kết OTP-email: trùng/khác được bao phủ bởi `TC-FR03-06` và `TC-FR03-07`.
- Biên độ dài mật khẩu 8 ký tự: `TC-FR03-08` đến `TC-FR03-10`.
- Biên số lượng chữ hoa, chữ thường, chữ số và ký tự đặc biệt: lần lượt `TC-FR03-11` đến `TC-FR03-22`.
- Charset đặc biệt được minh họa bởi `TC-FR03-23` và `TC-FR03-24`; chưa exhaustive từng ký tự `@ $ ! % * ? &`.
- Biên xác nhận mật khẩu, chỉ báo bước và nút quay lại được bao phủ bởi `TC-FR03-25` đến `TC-FR03-29`.
- Chưa thể lập BVA cho thời hạn OTP vì thiếu thời lượng, đơn vị và timezone. Chưa có biên độ dài email vì spec không nêu cận.
- Cần xác nhận: thời hạn OTP là bao lâu và tính theo timezone nào; null/thiếu có cùng xử lý không; có cần test từng ký tự đặc biệt được phép không; hệ thống có cho phép Unicode trong mật khẩu không.