# Ghi chú phiên thử nghiệm Pilot (P00)

Tài liệu này ghi lại diễn biến và kết quả của phiên thử nghiệm ban đầu trước khi chạy chính thức.

## 1. Thông tin phiên

- Người tham gia: Lê Minh Trí (P00).
- Thời gian: 09:00 ngày 10/11/2026.
- Thời lượng: 14 phút.
- Trình duyệt: Google Chrome trên máy tính cá nhân.

## 2. Diễn biến thao tác

- 00:00 - Bắt đầu giới thiệu và đọc kịch bản.
- 01:30 - Người tham gia tìm thấy mục Sản phẩm trên thanh điều hướng bên trái.
- 03:15 - Điền form thêm mới 'Bình giữ nhiệt', giá 250000 đ, chọn danh mục Phụ kiện. Bấm 'Lưu sản phẩm'. Form tự xóa trắng nhưng không có dòng thông báo thành công. Người tham gia ngập ngừng nhìn xuống bảng dưới mới thấy sản phẩm đã vào danh sách.
- 05:40 - Bấm nút 'Sửa' ở dòng sản phẩm vừa tạo. Đổi giá thành 220000 đ rồi bấm 'Lưu sản phẩm'. Hệ thống bật popup 'Cập nhật thành công!'. Tuy nhiên, ngay sau đó toàn bộ tên các sản phẩm khác trong bảng đều bị đổi thành 'Bình giữ nhiệt'. Người tham gia hốt hoảng hỏi có phải vừa làm hỏng dữ liệu không.
- 08:20 - Chuyển sang phần Import CSV. Người tham gia chọn file products.csv ngoài Desktop. Bảng xem trước hiện ra 2 dòng. Người tham gia bấm tiếp nút 'Import 2 sản phẩm'. Hệ thống báo thành công màu xanh.
- 10:10 - Chuyển về mục Dashboard. Người tham gia đọc doanh thu là 1000000 đ và tổng số đơn là 5. Người tham gia thắc mắc vì sao doanh thu lại gấp đôi số tiền của đơn hàng hoàn tất.
- 12:00 - Kết thúc thao tác, chuyển sang điền phiếu SUS và trả lời câu hỏi mở.

## 3. Kết quả đánh giá và điều chỉnh

- Điểm SUS của phiên pilot: 57.5 điểm (mức trung bình thấp).
- Vấn đề kịch bản: Cần nhắc người tham gia bình tĩnh nói to suy nghĩ, đồng thời người điều hành giữ thái độ trung lập khi hệ thống xuất hiện lỗi giao diện.
- Vấn đề dữ liệu: File products.csv phải đặt sẵn ngoài Desktop và backend cần được chạy lại lệnh khởi tạo dữ liệu trước mỗi phiên.
