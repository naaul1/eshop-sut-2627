# Phân tích kết quả đánh giá Usability - Flow B

Tài liệu này tổng hợp và phân tích các phát hiện từ 7 phiên kiểm thử thực tế của luồng Flow B trong hệ thống EShop Admin.

## 1. Đánh giá tổng quan điểm SUS

Điểm SUS trung bình của hệ thống đạt 58.2 trên 100 điểm.
Mức điểm này nằm dưới mức trung bình chuẩn ngành (68 điểm), tương đương xếp loại D.
Điểm số phản ánh người dùng gặp nhiều trở ngại trong quá trình thao tác độc lập.
Điểm cao nhất là 65.0 (P03, người có kinh nghiệm sàn thương mại điện tử).
Điểm thấp nhất là 50.0 (P04, người dùng phổ thông ít thao tác trên web quản trị).

## 2. Phân loại phát hiện theo mức độ nghiêm trọng

Các phát hiện được mã hóa từ UF-01 đến UF-06.
Mức độ nghiêm trọng chia thành: Blocker, Critical, Major, Minor.

| Mã | Nội dung phát hiện | Phân loại | Mức độ | Số người |
| --- | --- | --- | --- | --- |
| UF-01 | Thiếu phản hồi khi lưu sản phẩm mới | Thiết kế UI | Major | 5/7 |
| UF-02 | Tên toàn bộ sản phẩm bị đổi khi sửa một món | Lỗi chức năng | Critical | 7/7 |
| UF-03 | Form thiếu nhãn và dấu sao bắt buộc | Thiết kế UI | Minor | 6/7 |
| UF-04 | Nút bấm import CSV dễ bị bỏ sót sau khi chọn tệp | Tương tác | Major | 4/7 |
| UF-05 | Doanh thu Dashboard sai lệch và nhãn tiếng Anh | Lỗi chức năng | Critical | 3/7 |
| UF-06 | Thanh bên không đổi URL, tải lại trang mất dữ liệu | Điều hướng | Major | 2/7 |

## 3. Chi tiết các phát hiện chính

### UF-01: Thiếu thông báo khi thêm mới sản phẩm
- Mô tả: Khi bấm 'Lưu sản phẩm', form tự xóa trắng để sẵn sàng cho lần nhập sau nhưng không hiện dòng chữ báo thành công.
- Hậu quả: 5 trên 7 người tham gia tưởng rằng bấm trượt hoặc hệ thống chưa nhận lệnh, dẫn đến bấm lưu lặp lại hoặc phải cuộn trang kiểm tra.
- Đề xuất: Thêm thanh thông báo màu xanh báo lưu thành công trên góc màn hình trong 3 giây.

### UF-02: Đổi tên hàng loạt khi sửa một sản phẩm (BUG-12)
- Mô tả: Khi sửa một sản phẩm và bấm lưu, hàm cập nhật trên giao diện gán nhầm tên sản phẩm vừa sửa cho tất cả sản phẩm đang có trong bảng.
- Hậu quả: Toàn bộ 7 người tham gia đều thấy hoang mang và mất niềm tin vào tính an toàn của phần mềm.
- Đề xuất: Sửa logic cập nhật state của danh sách sản phẩm, chỉ cập nhật dòng có mã ID tương ứng.

### UF-03: Form sản phẩm thiếu nhãn trường
- Mô tả: Các ô nhập chỉ có dòng chữ chìm (placeholder). Khi người dùng bắt đầu gõ thì chữ chìm biến mất.
- Hậu quả: Người dùng không nhớ ô đó dùng nhập thông tin gì nếu dừng lại suy nghĩ giữa chừng. Thiếu dấu sao đỏ khiến người dùng không biết ô nào bắt buộc.
- Đề xuất: Thêm thẻ nhãn cố định phía trên mỗi ô nhập và đánh dấu sao đỏ cho ô Tên sản phẩm.

### UF-04: Quy trình Import CSV gây hiểu lầm
- Mô tả: Sau khi chọn file CSV, hệ thống mới hiện bảng xem trước và nút 'Import sản phẩm' nằm ngang hàng với ô chọn file.
- Hậu quả: 4 người tham gia ngỡ rằng chọn file xong là dữ liệu đã vào máy chủ, dẫn đến bỏ sót bước bấm nút import.
- Đề xuất: Bố trí nút import nổi bật ở phía dưới bảng xem trước dữ liệu để dẫn dắt hành động tự nhiên hơn.

### UF-05: Sai lệch số liệu doanh thu trên Dashboard
- Mô tả: Dashboard cộng dồn hai lần số tiền của đơn hàng hoàn tất, làm doanh thu hiển thị 1000000 đ thay vì 500000 đ. Nhãn hiển thị lẫn tiếng Anh 'Delivered'.
- Hậu quả: Người làm kế toán và quản lý nghi ngờ tính xác thực của toàn bộ hệ thống báo cáo.
- Đề xuất: Tính đúng doanh thu từ các đơn có trạng thái delivered và dịch nhãn sang tiếng Việt.

### UF-06: Điều hướng thanh bên không đổi đường dẫn URL
- Mô tả: Chuyển đổi giữa các mục quản lý chỉ đổi trạng thái giao diện trong mã nguồn React, đường dẫn trình duyệt giữ nguyên ở trang chủ.
- Hậu quả: Khi người dùng bấm nút quay lại (Back) của trình duyệt hoặc tải lại trang (F5), hệ thống tự động nhảy về Dashboard làm mất công đoạn đang làm dở.
- Đề xuất: Dùng thư viện định tuyến để mỗi màn hình có đường dẫn riêng biệt.

## 4. Trả lời các câu hỏi mục tiêu ban đầu

1. Về khả năng tìm kiếm và thao tác: Người dùng tìm được mục Sản phẩm trong vòng 1 đến 2 phút, nhưng thanh bên cần thêm biểu tượng trực quan hơn.
2. Về phản hồi và thông báo: Phản hồi của hệ thống chưa nhất quán, thiếu thông báo ở bước thêm mới và gây hoảng loạn ở bước sửa giá.
3. Về tính năng import CSV: Tính năng hoạt động tốt về mặt kỹ thuật, xử lý nhanh file mẫu nhưng luồng bấm nút cần rõ ràng hơn.
4. Về Dashboard và độ tin cậy: Số liệu sai lệch làm giảm sút sự tin tưởng của người dùng có nghiệp vụ kế toán và tài chính.
