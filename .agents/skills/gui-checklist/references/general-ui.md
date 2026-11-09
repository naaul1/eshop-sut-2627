# General UI standards

Những gì áp dụng cho mọi màn hình bất kể chức năng: giao diện có nhất quán, đọc được và không vỡ không. Mỗi nhóm dưới đây là gợi ý để sinh item; chọn nhóm phù hợp với màn hình đang xét.

## Bố cục và căn chỉnh
- Căn lề, khoảng cách (padding/margin) giữa các thành phần cùng loại bằng nhau
- Thứ tự và vị trí khối nội dung đúng design; không chồng lấn, không bị cắt
- Thành phần chính nằm trong vùng nhìn thấy đầu tiên (above the fold) nếu design yêu cầu
- Không xuất hiện thanh cuộn ngang ngoài ý muốn

## Kiểu chữ
- Font, cỡ chữ, độ đậm theo cấp bậc (tiêu đề, nội dung, chú thích) đúng design
- Cùng cấp bậc thì cùng style trên mọi màn hình
- Dòng dài xuống dòng hợp lý, không bị tràn khỏi khung

## Màu sắc và tương phản
- Màu chữ/nền, màu nút, màu liên kết đúng bảng màu của design
- Tương phản chữ và nền đủ đọc (tham chiếu WCAG AA: 4.5:1 cho chữ thường)
- Thông tin không chỉ truyền đạt bằng màu (ví dụ lỗi có cả icon hoặc chữ, không chỉ chuyển đỏ)

## Icon và hình ảnh
- Icon đúng nghĩa, cùng bộ, cùng kích thước ở những chỗ tương đương
- Hình ảnh không méo, không mờ, giữ tỉ lệ; có ảnh thay thế khi tải lỗi
- Ảnh có nội dung ý nghĩa có văn bản thay thế (alt)

## Nhất quán
- Cùng một loại thành phần (nút chính, nút phụ, input, dropdown) trông và hành xử giống nhau trên mọi màn hình
- Thuật ngữ và nhãn thống nhất (không lúc "Đăng xuất", lúc "Thoát")
- Định dạng ngày, giờ, số, tiền tệ thống nhất

## Responsive và môi trường hiển thị
- Hiển thị đúng ở các kích thước màn hình mục tiêu (desktop, tablet, mobile) và khi xoay màn hình
- Không vỡ layout khi thu phóng trình duyệt (ví dụ 200%)
- Chạy đúng trên các trình duyệt/thiết bị trong phạm vi hỗ trợ của spec

## Nội dung hiển thị
- Văn bản dài: cắt bớt (ellipsis) hoặc xuống dòng theo design, không phá layout
- Tiếng Việt có dấu và ký tự Unicode hiển thị đúng, không lỗi font
- Chính tả, ngữ pháp, không còn chữ placeholder kiểu "Lorem ipsum" hay "TODO"
- Nội dung đa ngôn ngữ (nếu có) không bị tràn khi chuỗi dài hơn

## Khả năng tiếp cận cơ bản (mức nhìn thấy được)
- Vùng bấm đủ lớn trên mobile (tham chiếu khoảng 44x44 px)
- Chỉ báo focus bàn phím nhìn thấy rõ trên mọi thành phần tương tác
- Tiêu đề trang/khối có phân cấp hợp lý

## Ví dụ item
- UI-xx | Tiêu đề trang | Cỡ chữ và độ đậm giống tiêu đề ở các màn hình khác | Nhất quán với các trang còn lại
- UI-xx | Danh sách món | Tên món dài hơn 2 dòng bị cắt bằng dấu ba chấm, không đẩy lệch giá | Layout giữ nguyên
