# Navigation

Người dùng có biết mình đang ở đâu, đi tới đâu được và quay lại thế nào không. Lỗi điều hướng thường làm người dùng kẹt hoặc mất dữ liệu, nên nhiều item ở đây nên để ưu tiên Cao.

## Menu và cấu trúc điều hướng
- Menu chính, header, footer có đủ mục theo spec và đặt đúng vị trí
- Mỗi mục menu, nút, liên kết dẫn tới đúng đích
- Mục/trang hiện tại được đánh dấu (active state) và đúng với trang đang xem
- Menu con (dropdown, accordion) mở/đóng đúng, đóng khi bấm ra ngoài hoặc chọn mục khác
- Trên mobile, menu thu gọn (hamburger) mở/đóng đúng và không che nội dung

## Liên kết và nút điều hướng
- Không có liên kết hỏng (404) hoặc nút không có tác dụng
- Liên kết ra ngoài hệ thống mở theo spec (tab mới hay cùng tab) và nhất quán
- Breadcrumb (nếu có) đúng phân cấp và bấm được ở các cấp trên
- Logo dẫn về trang chủ nếu đó là quy ước của sản phẩm

## Quay lại, tiến tới, tải lại
- Nút Back/Forward của trình duyệt đưa về đúng màn hình trước, không thoát khỏi luồng bất ngờ
- Tải lại trang (refresh) giữ đúng màn hình và trạng thái theo spec
- Mở trực tiếp URL của một màn hình sâu (deep link) hoạt động; nếu chưa đăng nhập thì chuyển tới đăng nhập rồi quay về đúng đích
- Sau khi hoàn thành hành động (đăng nhập, đăng xuất, lưu), người dùng được chuyển tới đúng màn hình

## Modal, dialog, panel
- Modal đóng được bằng nút đóng, phím Esc và bấm nền (nếu spec cho phép)
- Khi modal mở, focus nằm trong modal và nội dung phía sau không thao tác được
- Đóng modal đưa focus về thành phần đã mở nó

## Cuộn, phân trang, tab
- Phân trang/cuộn vô hạn: chuyển trang đúng, giữ vị trí khi quay lại từ trang chi tiết
- Tab/segmented control chuyển nội dung đúng, giữ trạng thái tab khi quay lại nếu spec yêu cầu
- Header dính (sticky), nút lên đầu trang hoạt động và không che nội dung

## Rời màn hình khi đang làm dở
- Có cảnh báo khi rời trang hoặc đóng tab lúc có dữ liệu chưa lưu (nếu spec yêu cầu)
- Phiên hết hạn đưa người dùng về đăng nhập với thông báo rõ, không để trang trắng
- Trang lỗi (404, 403, 500) có đường quay về trang chính

## Bàn phím
- Mọi thành phần điều hướng dùng được bằng bàn phím (Tab, Enter, Esc, phím mũi tên trong menu nếu có)
- Có liên kết "bỏ qua tới nội dung chính" nếu design/spec yêu cầu

## Ví dụ item
- NAV-xx | Mục menu "Đơn hàng" | Bấm vào chuyển tới trang Đơn hàng và mục menu được đánh dấu active | Đúng trang, active state hiển thị
- NAV-xx | Trang chi tiết đơn | Bấm Back của trình duyệt quay về danh sách đơn, giữ nguyên bộ lọc đang áp dụng | Danh sách vẫn ở trạng thái lọc cũ
