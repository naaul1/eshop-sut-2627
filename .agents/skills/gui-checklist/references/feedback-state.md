# Feedback / state

Hệ thống có cho người dùng biết chuyện gì đang xảy ra sau mỗi thao tác, và mọi trạng thái của dữ liệu và thành phần có được thiết kế không. Đây là aspect dễ bị bỏ sót nhất vì spec thường chỉ mô tả "đường đi đẹp" (happy path). Với mỗi màn hình có dữ liệu hoặc thao tác, hãy tự hỏi: lúc đang tải thì sao, không có dữ liệu thì sao, lỗi thì sao, thành công thì sao.

## Trạng thái dữ liệu của màn hình
- **Loading:** có chỉ báo (spinner, skeleton, progress) khi tải; không để màn hình trắng hoặc giật layout khi dữ liệu về
- **Empty:** khi không có dữ liệu (danh sách rỗng, tìm không ra) hiển thị thông điệp rõ và gợi ý bước tiếp theo, không để vùng trống khó hiểu
- **Error:** lỗi mạng, lỗi máy chủ, hết phiên hiển thị thông báo dễ hiểu và có cách thử lại
- **Partial/ít dữ liệu và rất nhiều dữ liệu:** một bản ghi, hàng nghìn bản ghi, văn bản rất dài vẫn hiển thị hợp lý
- **Offline/mạng chậm:** hành vi đúng spec, không mất dữ liệu người dùng đã nhập

## Phản hồi sau thao tác
- Thao tác thành công có xác nhận (toast, thông báo, chuyển màn hình) và đúng câu chữ
- Thao tác thất bại báo rõ lý do ở mức người dùng hiểu và không làm mất dữ liệu
- Thao tác chạy lâu có tiến độ hoặc trạng thái "đang xử lý", và người dùng không bấm lặp được ngoài ý muốn
- Thông báo (toast/snackbar) tự ẩn hoặc đóng được; không che thành phần quan trọng; nhiều thông báo cùng lúc xếp đúng
- Hành động nguy hiểm hoặc không hoàn tác (xóa, hủy đơn) có hộp thoại xác nhận nêu rõ hậu quả, nút xác nhận và nút hủy phân biệt rõ

## Trạng thái của thành phần tương tác
- Các trạng thái default, hover, focus, active/pressed, disabled, selected hiển thị khác nhau và đúng design
- Disabled trông khác hẳn trạng thái bình thường và không phản hồi khi bấm; (nếu spec yêu cầu) có tooltip giải thích vì sao bị khóa
- Trạng thái chọn (checkbox, toggle, tab, hàng trong bảng) hiển thị rõ và giữ đúng khi dữ liệu thay đổi
- Chỉ báo số lượng, huy hiệu (badge), trạng thái (Đang xử lý, Hoàn tất) khớp với dữ liệu thực

## Cập nhật trạng thái theo thời gian
- Dữ liệu cập nhật sau thao tác (thêm, sửa, xóa) được phản ánh ngay trên màn hình mà không cần tải lại, hoặc theo đúng spec
- Cập nhật thời gian thực (nếu có) không làm nhảy vị trí cuộn hay mất focus
- Hết phiên, mất quyền truy cập giữa chừng hiển thị phản hồi rõ ràng

## Ví dụ item
- FB-xx | Danh sách đơn hàng | Khi chưa có đơn nào hiện thông điệp "Chưa có đơn hàng" kèm nút điều hướng đi mua | Có thông điệp và nút, không để vùng trống
- FB-xx | Nút Xóa món | Bấm Xóa hiện hộp thoại xác nhận nêu tên món; Hủy giữ nguyên dữ liệu | Hộp thoại đúng nội dung, Hủy không xóa
