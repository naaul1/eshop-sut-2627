# Usability Session - Flow B Admin

Tài liệu này tóm tắt kết quả đánh giá độ tiện dụng cho luồng Flow B trong phân hệ Web Admin EShop.

## 1. Task scenario

Kịch bản giao cho người tham gia:
Quản trị viên tạo sản phẩm mới tên 'Bình giữ nhiệt', giá 250000 đ thuộc danh mục 'Phụ kiện'.
Sau đó, sửa giá sản phẩm thành 220000 đ.
Tiếp theo, đưa dữ liệu từ file products.csv trên Desktop vào hệ thống qua chức năng import.
Cuối cùng, chuyển về Dashboard đọc số doanh thu và tổng số đơn hàng.
Người tham gia thực hiện theo phương pháp suy nghĩ thành lời (think-aloud).

## 2. Observation notes

Kiểm thử được thực hiện với 1 người thử nghiệm pilot và 7 người tham gia chính thức (P01 đến P07).
Các điểm ghi nhận chính:
- Thao tác thêm sản phẩm thành công nhưng không có phản hồi trực quan, khiến 5 người dùng bấm lặp lại.
- Thao tác sửa sản phẩm gây lỗi nghiêm trọng: toàn bộ sản phẩm trong bảng bị đổi theo tên món vừa sửa (7 người đều ghi nhận).
- Chức năng import CSV chạy nhanh nhưng người dùng thường nhầm việc chọn file là đã hoàn thành lưu dữ liệu.
- Màn hình Dashboard đọc được số liệu nhanh chóng, tuy nhiên số doanh thu bị nhân đôi khiến người dùng nghi ngờ độ chính xác.

## 3. SUS responses

Thang đo SUS gồm 10 nhận định chuẩn tiếng Việt, tính điểm theo công thức chuẩn thang 100.
Kết quả chi tiết của 7 người tham gia:

| Người tham gia | Vai trò | Điểm SUS | Đánh giá |
| --- | --- | --- | --- |
| P01 | Quản lý kho | 62.5 | Trung bình |
| P02 | Kế toán | 55.0 | Dưới trung bình |
| P03 | Bán online | 65.0 | Trung bình |
| P04 | Thu ngân | 50.0 | Kém |
| P05 | Văn phòng | 57.5 | Dưới trung bình |
| P06 | Chủ shop | 62.5 | Trung bình |
| P07 | CSKH | 55.0 | Dưới trung bình |
| **Trung bình** | **Toàn đoàn** | **58.2** | **Dưới trung bình** |

Điểm trung bình 58.2 cho thấy hệ thống cần cải thiện nhiều về mặt trải nghiệm và độ tin cậy.

## 4. Severity-ranked findings

Các phát hiện được xếp hạng theo mức độ nghiêm trọng từ cao xuống thấp:

| Mã | Nội dung phát hiện | Phân loại | Mức độ | Số người gặp |
| --- | --- | --- | --- | --- |
| UF-02 | Tên toàn bộ sản phẩm bị đổi khi sửa một món (BUG-12) | Lỗi chức năng | Critical | 7/7 |
| UF-05 | Doanh thu Dashboard sai lệch và nhãn tiếng Anh (BUG-04) | Lỗi chức năng | Critical | 3/7 |
| UF-01 | Thiếu phản hồi thông báo khi lưu sản phẩm mới | Thiết kế UI | Major | 5/7 |
| UF-04 | Nút bấm import CSV dễ bị bỏ sót sau khi chọn tệp | Tương tác | Major | 4/7 |
| UF-06 | Thanh bên không đổi URL, tải lại trang mất dữ liệu | Điều hướng | Major | 2/7 |
| UF-03 | Form tạo sửa sản phẩm thiếu nhãn trường và dấu sao | Thiết kế UI | Minor | 6/7 |
