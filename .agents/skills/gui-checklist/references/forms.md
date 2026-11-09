# Forms

Tập trung vào cách form *trông và hành xử* với người dùng. Việc chọn giá trị hợp lệ/không hợp lệ cho từng field (phân vùng tương đương, giá trị biên) thuộc skill domain-testing; ở đây chỉ kiểm tra thông báo lỗi hiển thị thế nào, ở đâu, lúc nào.

## Nhãn, placeholder, gợi ý
- Mỗi field có label rõ ràng, gắn đúng với field (bấm vào label thì focus vào field)
- Placeholder không thay thế label; không biến mất làm người dùng quên field cần nhập gì
- Field bắt buộc/tùy chọn được đánh dấu thống nhất
- Gợi ý định dạng hoặc ràng buộc (ví dụ yêu cầu mật khẩu) hiển thị trước khi người dùng nhập sai

## Loại control
- Dùng đúng loại control cho dữ liệu: checkbox cho nhiều lựa chọn, radio cho một lựa chọn, dropdown/date picker khi hợp lý
- Bàn phím trên mobile phù hợp loại dữ liệu (số, email, điện thoại)
- Field mật khẩu che ký tự và có nút hiện/ẩn nếu design có
- Giá trị mặc định (nếu có) đúng spec; dropdown có lựa chọn "chưa chọn" rõ ràng

## Tương tác bàn phím và focus
- Thứ tự Tab đi theo thứ tự hiển thị trực quan
- Focus ban đầu đặt đúng chỗ (thường là field đầu tiên) nếu design yêu cầu
- Nhấn Enter ở field cuối gửi form như nhấn nút gửi
- Hỗ trợ dán (paste), tự động điền (autofill) của trình duyệt hoạt động bình thường

## Hiển thị lỗi validation
- Thông báo lỗi nằm gần field liên quan, màu/icon nhất quán
- Thời điểm hiện lỗi đúng spec (khi rời field, khi gửi, hoặc khi gõ) và nhất quán giữa các field
- Câu chữ lỗi cụ thể, nói rõ cách sửa, không dùng mã lỗi kỹ thuật
- Khi có nhiều lỗi, người dùng thấy được tất cả hoặc được đưa focus tới lỗi đầu tiên
- Lỗi biến mất khi người dùng sửa đúng
- Dữ liệu đã nhập ở các field khác được giữ nguyên sau khi lỗi (trừ trường hợp bảo mật như mật khẩu theo spec)

## Nút gửi và hủy
- Nút gửi có nhãn rõ hành động; trạng thái bật/tắt đúng spec (disabled khi thiếu dữ liệu hay luôn bật rồi báo lỗi)
- Bấm gửi nhiều lần liên tiếp không tạo trùng bản ghi (nút bị khóa hoặc có chỉ báo đang xử lý)
- Nút Hủy/Quay lại có, và có cảnh báo nếu đã nhập dữ liệu mà chưa lưu (nếu spec yêu cầu)
- Nút chính và nút phụ phân biệt được bằng kiểu hiển thị

## Form nhiều bước
- Có chỉ báo tiến độ (bước hiện tại / tổng số bước)
- Quay lại bước trước giữ nguyên dữ liệu đã nhập
- Bước cuối cho xem lại/xác nhận trước khi gửi nếu spec yêu cầu

## Ví dụ item
- FRM-xx | Trường Email | Thông báo lỗi định dạng hiện ngay dưới field, chữ đỏ kèm icon | Đúng vị trí, nhất quán với các field khác
- FRM-xx | Nút Đăng ký | Bấm hai lần liên tiếp chỉ gửi một yêu cầu | Nút bị khóa hoặc hiện trạng thái đang xử lý sau lần bấm đầu
