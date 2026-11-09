# GUI Checklist — Đăng ký, Đăng nhập và Quên mật khẩu

## 1. Phạm vi & giả định

- Phạm vi gồm ba luồng giao diện theo FR-01, FR-02 và FR-03 trong `README.md`: Đăng ký, Đăng nhập, Quên mật khẩu (hai bước).
- Checklist tập trung vào giao diện, tương tác, điều hướng và phản hồi/trạng thái; không thay thế kiểm thử domain, hiệu năng, bảo mật hoặc usability với người dùng thật.
- Các tiêu chí chưa được quy định cụ thể trong đặc tả được đánh giá theo tính nhất quán giữa các màn hình và WCAG AA cho tương phản chữ thường (4.5:1).
- Cột **Kết quả** để trống cho người kiểm thử điền `Pass` hoặc `Fail`.

## 2. Ma trận phủ

| Màn hình | General UI | Forms | Navigation | Feedback/state |
|---|---|---|---|---|
| Đăng ký | Áp dụng | Áp dụng | Áp dụng | Áp dụng |
| Đăng nhập | Áp dụng | Áp dụng | Áp dụng | Áp dụng |
| Quên mật khẩu — Bước 1 lấy OTP | Áp dụng | Áp dụng | Áp dụng | Áp dụng |
| Quên mật khẩu — Bước 2 đặt lại mật khẩu | Áp dụng | Áp dụng | Áp dụng | Áp dụng |

## 3. Checklist — General UI standards

| ID | Thành phần | Item kiểm tra | Tiêu chí Pass | Ưu tiên | Kết quả | Ghi chú |
|---|---|---|---|---|---|---|
| UI-01 | Chung | Tiêu đề màn hình Đăng ký, Đăng nhập và Quên mật khẩu hiển thị rõ | Tiêu đề đúng tên luồng, không bị cắt hoặc tràn | Trung bình | | |
| UI-02 | Chung | Bố cục form ba màn hình căn chỉnh nhất quán | Container, lề và khoảng cách giữa các khối tương đương nhau | Trung bình | | |
| UI-03 | Chung | Font chữ tiếng Việt hiển thị đúng | Có dấu và ký tự Unicode không bị lỗi font hoặc thay thế ký tự | Trung bình | | |
| UI-04 | Chung | Màu chữ và nền của form đủ tương phản | Chữ thường đạt tối thiểu WCAG AA 4.5:1 | Cao | | |
| UI-05 | Chung | Thành phần lỗi không chỉ dùng màu để truyền đạt | Lỗi có nội dung chữ và/hoặc biểu tượng, không chỉ đổi màu đỏ | Cao | | |
| UI-06 | Chung | Nút chính và nút phụ có kiểu hiển thị phân biệt | Nút gửi nổi bật hơn liên kết quay lại/hủy và nhất quán giữa các màn hình | Trung bình | | |
| UI-07 | Chung | Form không tạo thanh cuộn ngang | Ở desktop, tablet và mobile không có nội dung bị đẩy ra ngoài viewport | Cao | | |
| UI-08 | Chung | Giao diện thích ứng khi xoay mobile và thu phóng 200% | Nội dung vẫn đọc được, không chồng lấn và control vẫn thao tác được | Cao | | |
| UI-09 | Chung | Vùng bấm của nút và liên kết đủ lớn trên mobile | Vùng tương tác xấp xỉ tối thiểu 44x44 px hoặc theo design system | Trung bình | | |
| UI-10 | Chung | Focus bàn phím nhìn thấy rõ | Mọi input, nút và liên kết có focus indicator không bị che | Cao | | |
| UI-11 | Chung | Label, placeholder và thuật ngữ nhất quán | Dùng thống nhất các tên “Email”, “Mật khẩu”, “Xác nhận mật khẩu”, “Đăng nhập” | Trung bình | | |
| UI-12 | Chung | Không còn placeholder nội dung hoặc lỗi chính tả | Không hiển thị “Lorem ipsum”, “TODO” hay câu chữ chưa dịch | Thấp | | |
| UI-13 | Form Quên mật khẩu | Chỉ báo bước được trình bày dễ nhận biết | Bước 1/2 và Bước 2/2 hiển thị đúng trạng thái hiện tại | Cao | | |
| UI-14 | Form mật khẩu | Ký tự mật khẩu được che theo mặc định | Nội dung mật khẩu không hiển thị dạng văn bản thường khi nhập | Cao | | |

## 4. Checklist — Forms

| ID | Thành phần | Item kiểm tra | Tiêu chí Pass | Ưu tiên | Kết quả | Ghi chú |
|---|---|---|---|---|---|---|
| FRM-01 | Đăng ký — Họ Tên | Label gắn đúng với field Họ Tên | Bấm label đưa focus vào đúng input | Trung bình | | |
| FRM-02 | Đăng ký — Email | Field Email dùng control phù hợp | Có label rõ và input hỗ trợ kiểu email/autofill email | Cao | | |
| FRM-03 | Đăng ký — Mật khẩu | Gợi ý điều kiện mật khẩu hiển thị trước khi gửi | Nêu tối thiểu 8 ký tự, chữ hoa, chữ thường, chữ số và ký tự đặc biệt | Cao | | |
| FRM-04 | Đăng ký — Xác nhận mật khẩu | Field xác nhận được đặt gần Mật khẩu | Người dùng dễ nhận biết đây là field đối chiếu mật khẩu | Cao | | |
| FRM-05 | Đăng ký — bắt buộc | Field bắt buộc được đánh dấu thống nhất | Họ Tên, Email, Mật khẩu và Xác nhận mật khẩu đều có dấu hiệu bắt buộc | Cao | | |
| FRM-06 | Đăng ký — lỗi | Lỗi từng field hiển thị gần field liên quan | Vị trí lỗi không làm người dùng nhầm với lỗi của field khác | Cao | | |
| FRM-07 | Đăng ký — nhiều lỗi | Khi gửi form có nhiều lỗi, người dùng thấy được tất cả hoặc lỗi đầu tiên được focus | Không phải cuộn tìm lỗi mà không có chỉ dẫn | Cao | | |
| FRM-08 | Đăng ký — submit | Nút Đăng ký có nhãn đúng hành động | Nhãn rõ ràng, không dùng nhãn mơ hồ như “Gửi” | Trung bình | | |
| FRM-09 | Đăng ký — submit | Bấm Đăng ký nhiều lần không tạo nhiều yêu cầu | Nút bị khóa hoặc hiển thị đang xử lý sau lần bấm đầu | Cao | | |
| FRM-10 | Đăng nhập — Email | Label và input Email hiển thị đúng | Input dùng kiểu email và hỗ trợ bàn phím email trên mobile | Cao | | |
| FRM-11 | Đăng nhập — Mật khẩu | Label, che ký tự và control mật khẩu hiển thị đúng | Field nhận mật khẩu và không lộ ký tự khi nhập | Cao | | |
| FRM-12 | Đăng nhập — submit | Enter tại field Mật khẩu gửi form như nút Đăng nhập | Chỉ gửi một lần và không mất dữ liệu đã nhập ngoài yêu cầu bảo mật | Cao | | |
| FRM-13 | Đăng nhập — lỗi | Lỗi đăng nhập hiển thị ở vị trí dễ thấy | Nội dung không làm lộ chi tiết nguyên nhân hoặc thông tin nhạy cảm | Cao | | |
| FRM-14 | Quên mật khẩu B1 — Email | Label và input Email hiển thị đúng | Người dùng biết email nào cần nhập và control hỗ trợ autofill | Cao | | |
| FRM-15 | Quên mật khẩu B1 — submit | Nút gửi yêu cầu OTP có nhãn rõ | Nút thể hiện đúng hành động lấy/gửi mã OTP | Cao | | |
| FRM-16 | Quên mật khẩu B1 — OTP | Mã OTP hiển thị trên màn hình demo theo đặc tả | Mã có đúng 6 chữ số và nằm trong vùng thông tin dễ nhận biết | Cao | | |
| FRM-17 | Quên mật khẩu B2 — OTP | Field OTP có label và cách nhập phù hợp | Người dùng biết nhập OTP cho email đã yêu cầu | Cao | | |
| FRM-18 | Quên mật khẩu B2 — mật khẩu mới | Gợi ý điều kiện Mật khẩu mới hiển thị | Gợi ý nhất quán với điều kiện mật khẩu ở Đăng ký | Cao | | |
| FRM-19 | Quên mật khẩu B2 — xác nhận | Field Xác nhận mật khẩu mới hiển thị và được gắn đúng label | Label không bị nhầm với mật khẩu cũ hoặc OTP | Cao | | |
| FRM-20 | Quên mật khẩu B2 — lỗi | Lỗi OTP hoặc mật khẩu nằm gần phần nhập tương ứng | Câu chữ chỉ rõ cách sửa và không dùng mã lỗi kỹ thuật | Cao | | |
| FRM-21 | Chung — Tab | Thứ tự Tab đi theo thứ tự hiển thị | Focus lần lượt qua các field, nút chính và liên kết quay lại | Cao | | |
| FRM-22 | Chung — paste/autofill | Paste và autofill không phá vỡ layout hoặc xóa dữ liệu hợp lệ | Giá trị được điền vào đúng field và vẫn nhìn thấy trạng thái hợp lệ | Trung bình | | |

## 5. Checklist — Navigation

| ID | Thành phần | Item kiểm tra | Tiêu chí Pass | Ưu tiên | Kết quả | Ghi chú |
|---|---|---|---|---|---|---|
| NAV-01 | Đăng ký | Liên kết chuyển tới Đăng ký từ màn hình xác thực hoạt động | Bấm liên kết mở đúng màn hình Đăng ký | Cao | | |
| NAV-02 | Đăng nhập | Liên kết chuyển tới Đăng nhập từ các màn hình xác thực hoạt động | Bấm liên kết mở đúng màn hình Đăng nhập | Cao | | |
| NAV-03 | Đăng nhập | Liên kết Quên mật khẩu mở đúng Bước 1 | Không mở nhầm Đăng ký hoặc trang trắng | Cao | | |
| NAV-04 | Quên mật khẩu B1 | Nút Quay lại đăng nhập đưa về Đăng nhập | Điều hướng đúng và không tạo màn hình trung gian không mong muốn | Cao | | |
| NAV-05 | Quên mật khẩu B2 | Luồng từ Bước 1 sang Bước 2 diễn ra sau yêu cầu OTP | Bước hiện tại đổi đúng và chỉ báo bước được cập nhật | Cao | | |
| NAV-06 | Quên mật khẩu B2 | Quay lại Bước 1 giữ email đã nhập nếu đặc tả cho phép | Email không bị mất ngoài hành vi được quy định | Trung bình | | |
| NAV-07 | Đăng ký | Sau đăng ký thành công chuyển tới Đăng nhập | Không chuyển tới màn hình sai hoặc giữ người dùng ở form thành công | Cao | | |
| NAV-08 | Đăng nhập | Sau đăng nhập thành công chuyển tới màn hình đích theo luồng ứng dụng | Không hiển thị form Đăng nhập lại khi xác thực thành công | Cao | | |
| NAV-09 | Chung | Nút Back của trình duyệt không làm kẹt trong luồng xác thực | Quay lại đúng màn hình trước và không gây submit lại ngoài ý muốn | Cao | | |
| NAV-10 | Chung | Refresh giữ đúng màn hình hoặc trạng thái theo thiết kế | Không hiển thị trang trắng; nếu mất trạng thái thì có hướng dẫn rõ | Cao | | |
| NAV-11 | Chung | Deep link trực tiếp tới màn hình xác thực hoạt động | URL mở đúng màn hình và không trả lỗi 404 | Trung bình | | |
| NAV-12 | Bàn phím | Các liên kết và nút điều hướng thao tác được bằng Tab và Enter | Không có control điều hướng chỉ dùng được bằng chuột | Cao | | |

## 6. Checklist — Feedback / state

| ID | Thành phần | Item kiểm tra | Tiêu chí Pass | Ưu tiên | Kết quả | Ghi chú |
|---|---|---|---|---|---|---|
| FB-01 | Chung | Khi gửi form hiển thị trạng thái đang xử lý | Có spinner, progress hoặc trạng thái tương đương; không để người dùng đoán hệ thống có nhận thao tác | Cao | | |
| FB-02 | Chung | Nút gửi bị vô hiệu hóa hoặc chặn bấm lặp trong lúc xử lý | Không tạo nhiều request do bấm liên tiếp | Cao | | |
| FB-03 | Chung | Lỗi mạng/máy chủ có thông báo dễ hiểu | Có hướng dẫn thử lại và không để màn hình trắng | Cao | | |
| FB-04 | Chung | Dữ liệu hợp lệ đã nhập được giữ lại sau lỗi | Email/Họ Tên vẫn còn; mật khẩu chỉ bị xóa nếu có yêu cầu bảo mật rõ ràng | Cao | | |
| FB-05 | Đăng ký | Đăng ký thành công có phản hồi xác nhận | Có thông báo hoặc chuyển màn hình theo FR-01, không tạo cảm giác submit thất bại | Cao | | |
| FB-06 | Đăng ký | Email đã tồn tại có phản hồi phù hợp | Thông báo nằm trong vùng form và hướng dẫn người dùng xử lý tiếp | Cao | | |
| FB-07 | Đăng nhập | Sai thông tin đăng nhập có trạng thái lỗi rõ ràng | Thông báo phù hợp, không để lộ chi tiết nguyên nhân | Cao | | |
| FB-08 | Đăng nhập | Đạt ngưỡng khóa tạm thời hiển thị phản hồi khóa | Thông báo phù hợp và thể hiện thời gian khóa 30 giây nếu UI có hiển thị bộ đếm | Cao | | |
| FB-09 | Đăng nhập | Trong thời gian khóa, form phản hồi đúng trạng thái không khả dụng | Người dùng không thể gửi lặp vô ích hoặc được hướng dẫn chờ rõ ràng | Cao | | |
| FB-10 | Đăng nhập | Đăng nhập thành công có phản hồi và chuyển trang | Không hiển thị spinner vô hạn hoặc thông báo lỗi sau khi thành công | Cao | | |
| FB-11 | Quên mật khẩu B1 | Khi lấy OTP thành công hiển thị mã theo môi trường demo | Mã 6 chữ số được hiển thị rõ, không bị che bởi toast hoặc layout | Cao | | |
| FB-12 | Quên mật khẩu B1 | Email chưa đăng ký có phản hồi theo thiết kế | Thông báo dễ hiểu và không làm vỡ form; không lộ chi tiết ngoài quy định | Cao | | |
| FB-13 | Quên mật khẩu B2 | OTP sai/hết hạn có trạng thái lỗi | Lỗi gần field OTP, có hướng dẫn thao tác tiếp theo và không xóa toàn bộ form ngoài yêu cầu | Cao | | |
| FB-14 | Quên mật khẩu B2 | Mật khẩu không đạt điều kiện hoặc không khớp có lỗi cụ thể | Lỗi chỉ ra cách sửa và biến mất sau khi dữ liệu đúng | Cao | | |
| FB-15 | Quên mật khẩu B2 | Đặt lại mật khẩu thành công có xác nhận | Có thông báo hoặc chuyển tới Đăng nhập theo thiết kế | Cao | | |
| FB-16 | Chung | Trạng thái hover, focus, active và disabled phân biệt rõ | Mỗi trạng thái nhìn thấy được, không chỉ thay đổi màu khó nhận biết | Trung bình | | |
| FB-17 | Chung | Toast/snackbar không che nút hoặc thông báo lỗi quan trọng | Thông báo tự ẩn hoặc đóng được và không che nội dung cần thao tác | Trung bình | | |
| FB-18 | Chung | Khi hết phiên hoặc truy cập không hợp lệ, có đường quay lại Đăng nhập | Không để trang trắng hoặc trạng thái không thể khôi phục | Cao | | |

## 7. Tổng kết bao phủ

- General UI standards: **14 item** (`UI-01`–`UI-14`).
- Forms: **22 item** (`FRM-01`–`FRM-22`).
- Navigation: **12 item** (`NAV-01`–`NAV-12`).
- Feedback/state: **18 item** (`FB-01`–`FB-18`).
- Tổng cộng: **66 item**, đều có cột Kết quả để ghi Pass/Fail.
- Không có aspect nào là N/A; cả ba luồng và hai bước Quên mật khẩu đều có đủ bốn aspect.

## 8. Giả định / câu hỏi mở

1. Chưa có design system hoặc Figma nên màu, cỡ chữ, khoảng cách và breakpoint cụ thể cần đối chiếu với bản thiết kế khi có.
2. Đặc tả chỉ nêu OTP hiển thị trực tiếp trong môi trường demo; cần xác nhận vị trí, thời hạn OTP và nút gửi lại nếu sản phẩm có hỗ trợ.
3. Cần xác nhận màn hình đích sau đăng nhập thành công và hành vi giữ dữ liệu khi quay lại từ Bước 2 về Bước 1.
4. Cần xác nhận có hỗ trợ nút hiện/ẩn mật khẩu, cảnh báo rời trang khi form chưa hoàn tất và toast/snackbar hay không.
