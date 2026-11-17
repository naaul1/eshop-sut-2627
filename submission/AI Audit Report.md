## Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)

CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)

CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0

## AI Audit Report — Mẫu 5 mục cho mỗi Artifact

Phụ lục bắt buộc đính kèm cho mọi bài tập có dùng AI (HW#01–HW#06, Seminar).

Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm.

## 1. Thông tin Sinh viên

| Mục | Giá trị |
| --- | --- |
| Họ tên sinh viên (in hoa): | NGUYỄN THIỆN NHÂN |
| MSSV: | 23120064 |
| Lớp / Khoá: | 23CTT1 |
| Mã bài tập (ví dụ HW#00, HW#02): | HW#04 |
| Ngày làm bài: | 16/11/2026 |
| Công cụ AI đã dùng: | COPILOT |
| Công cụ AI đã dùng: | [ X] Có [ ] Không |

## 2. Hướng dẫn (đọc trước khi điền)

- Thêm 1 hàng cho m×i artifact AI sinh (test case, script, checklist, OpenAPI spec, JMeter plan…).

- Dán nguyên vn prompt  KHÔNG paraphrase.

- Dán nguyên v-n output AI (ho·c kèm screenshot có chú thích trong báo cáo).

- G¯n nhãn: VALID / INVALID / INCOMPLETE.

- Lý do ph£i d«n chi¿u slide, måc ISTQB, ho·c RFC kù thu­t.

- HiÃn thË b£n sía vÛi ph§n thay Õi °ãc tô sáng.

- Hàng m«u in nghiêng - thay tr°Ûc khi nÙp.

## 3. Bảng Audit — 1 hàng / artifact

| (1) Prompt + Công cụ | (2) Output AI | (3) Verdict | (4) Lý do (ISTQB) | (5) Bản SV sửa |
| --- | --- | --- | --- | --- |
| Mẫu (italic) — thay trước khi nộp: |   |   |   |   |
| Tool: Copilot. Thời gian: 21:13 16/11/2026 Prompt: " Tôi đang làm HW04 Automation Testing cho dự án EShop trong | FR-01 — Đăng ký tài khoản Đặc tả: bắt buộc có họ tên, email hợp lệ và duy |   | VALID Sinh test case rất chuẩn, độ phủ tốt |   |


| workspace này. Hãy đọc yêu cầu trong README.md và hướng dẫn liên quan trong docs/Task_Assign ment.md, cùng với test và source hiện có. Tôi chọn FR-01 (đăng ký), FR-07 (giỏ hàng), FR-15 (quản lý sản phẩm Admin). Ở bước này CHƯA sửa hoặc tạo file. Với từng FR: 1. Tóm tắt yêu cầu cần kiểm thử, phân biệt rõ yêu cầu đặc tả với hành vi SUT hiện tại. 2. Đề xuất ít nhất 12 test case gồm happy path, negative và boundary case. 3. Nêu bước chuẩn bị dữ liệu, bước thao tác, kết quả mong đợi, và cách tránh để lại dữ liệu bẩn. 4. Chỉ ra các locator có thể dùng dựa trên source thật; đừng đoán selector. 5. Nêu các trường hợp chưa đủ căn cứ để kết luận expected result. Trả kết quả thành ba bảng riêng trong một markdown mới. Không tự ý đổi yêu cầu đặc tả để test dễ pass." | nhất, mật khẩu tối thiểu 8 ký tự gồm chữ hoa, chữ thường, số và ít nhất một ký tự đặc biệt trong @$!%*?&; có xác nhận mật khẩu và từ chối nếu hai mật khẩu khác nhau; đăng ký thành công chuyển đến đăng nhập. SUT hiện tại: form trong Register.jsx chỉ có Họ Tên, Email, Mật khẩu; Email là type="text" và không có ô xác nhận. Validator hiện tại đòi khoảng trắng, nhưng character class lại không cho ký tự đặc biệt theo yêu cầu. Backend trong server.js không validate email/mật khẩu; schema trong database.js không đặt unique constraint cho email. Vì vậy, nhiều test âm có khả năng tạo tài khoản sai đặc tả nếu chúng lọt qua UI. ID / loại | Chuẩn bị và thao tác | Kết quả mong đợi theo đặc tả | Dọn dữ liệu | Locator dựa trê |
| --- | --- | --- | --- | --- | --- |


|   | REG-01 Happy path REG-02 Negative — email trùng REG-03 Negative — thiếu @ lệ. REG-04 Negative — thiếu domain REG-05 Negative — thiếu họ tên REG-06 Negative — thiếu email | Mở /register; nhập tên hợp lệ, email unique có suffix ngẫu nhiên, mật khẩu Abcdef1!; submit. Tạo trước một tài khoản test qua API; dùng chính email đó đăng ký trên UI. Nhập email như userexample.com; các trường còn lại hợp Nhập user@; các trường còn lại hợp lệ. Để trống họ tên, nhập email unique và mật khẩu hợp lệ; submit. Để trống email; điền tên và mật khẩu hợp lệ; submit. | Đăng ký thành công, chuyển đến /login; tài khoản có thể đăng nhập bằng thông tin vừa đăng ký. Từ chối đăng ký; không tạo thêm tài test duy khoản cùng email. Từ chối email không đúng định dạng; không tạo tài khoản. Từ chối email không hợp lệ. Không đăng ký được; họ tên là bắt buộc. Không đăng ký được; email là bắt buộc. | Xóa đúng tài khoản test theo email/ID nút sau khi kiểm tra; không dùng email seed. Xóa tất cả bản ghi khớp email nút Đăng Ký; nội nhất sau khi kiểm chữ. tra. Kiểm tra và Email là form xóa tài khoản nếu nút Đăng Ký. SUT lỡ tạo. Như REG- 03. Đăng Ký. Nếu request vẫn được gửi và tạo user, xóa Ký. user test theo email. Xác minh không có record mới; nếu Đăng Ký. có, dò theo tên test duy nhất rồi dọn cẩn | form input.nth( getByRole('but {name:'Đăng Ký nhận URL /login Cùng ba input the qua getByText(. nhưng không cố đ input.nth(1); sub form input.nth( form input.nth( thứ hai và thứ ba; form input.nth( |
| --- | --- | --- | --- | --- | --- |


|   | REG-07 Negative — thiếu mật khẩu unique; submit. REG-08 Boundary — 7 ký tự REG-09 Boundary — đúng 8 ký tự submit. REG-10 Negative — thiếu chữ hoa REG-11 Negative — thiếu chữ thường REG-12 Negative — thiếu chữ số REG-13 Negative — thiếu ký tự đặc biệt được phép REG-14 Positive — các ký tự đặc biệt | Để trống mật khẩu; điền tên và email Dùng mật khẩu dài 7 ký tự, có đủ các nhóm ký tự còn lại, ví dụ Abcde1!; submit. Dùng mật khẩu Abcdef1! (đúng 8 ký tự); email unique; Dùng mật khẩu đủ dài nhưng không có chữ hoa, ví dụ abcdef1!. Dùng mật khẩu đủ dài nhưng không có chữ thường, ví dụ ABCDEF1!. Dùng mật khẩu đủ dài nhưng không có số, ví dụ Abcdefg!. Dùng mật khẩu đủ dài có hoa/thường/số nhưng không có ký tự đặc biệt, ví dụ Abcdefg1. Data-driven với từng ký tự trong @$!%*?&; mỗi giá trị tạo một mật | Không đăng ký được; mật khẩu là bắt buộc. Từ chối vì ngắn hơn 8 ký tự. Chấp nhận mật khẩu đúng biên và chuyển đến đăng nhập. Từ chối mật khẩu. Từ chối mật khẩu. Từ chối mật khẩu. Từ chối mật khẩu. Mỗi mật khẩu thỏa cấu trúc đều được | thận. Xác minh không phát sinh user; nếu có, dọn Đăng Ký. đúng bản ghi test. Xác minh không tạo tài khoản; nếu có, dọn. Xóa tài khoản test sau khi kiểm tra. Xác minh không tạo tài khoản; nếu có, dọn. Như REG- 10. Như REG- 10. Như REG- 10. Mỗi lần dùng email unique; | form input.nth( Input thứ ba và nú Ký; lỗi hiện được r bằng một div, khô selector ổn định k form input.nth( Đăng Ký; URL /l Input thứ ba; nút Input thứ ba; nút Input thứ ba; nút Input thứ ba; nút Input thứ ba; nút |
| --- | --- | --- | --- | --- | --- |


|   | hợp lệ REG-15 Negative — khoảng trắng không thay cho ký tự đặc biệt REG-16 UI/spec gap — xác nhận mật khẩu REG-17 UI conformance — loại email Chưa đủ căn cứ để kết luận: đặc tả không cho biết chính xác thông báo lỗi hoặc HTTP status cho từng lỗi; quy tắc phân biệt email trùng khi khác hoa/thường hoặc có khoảng trắng; giới hạn độ dài tên và hỗ trợ Unicode; cũng không nói rõ các ký tự ngoài danh sách đặc biệt có được phép nếu mật khẩu vẫn chứa ít nhất một ký tự trong danh sách. | khẩu đủ 8 ký tự và có hoa/thường/số. Dùng Abcdef1 ký tự nhưng không có ký tự đặc biệt thuộc danh sách; submit. Mở trang và kiểm tra có trường xác nhận; nếu có, nhập mật khẩu khác với trường mật khẩu rồi submit. Mở form và kiểm tra trường Email có type="email". | chấp nhận. Từ chối vì khoảng , đủ 8 trắng không đáp ứng điều kiện ký tự đặc biệt đã liệt kê. Đặc tả yêu cầu trường này phải tồn tại và từ chối mật khẩu không khớp. Phải dùng type="email"; trình duyệt có validate định dạng HTML5. | xóa đúng các user tạo được. Xác minh không tạo tài khoản; nếu có, dọn. Nếu hệ thống vẫn tạo account, dọn user test. Không tạo dữ liệu. | Input thứ ba; nút Không có locator source hiện tại: Register.jsx kh render trường xác không nên tự đặt cho phần tử chưa form input.nth( thuộc tính type. |
| --- | --- | --- | --- | --- | --- |


|   | Không suy diễn các quy tắc này thành expected result. Trường xác nhận hiện không có nên REG-16 chưa thể thao tác end-to-end trên SUT. FR-07 — Giỏ hàng Đặc tả: giỏ hàng có các cột Sản phẩm, Đơn giá, Số lượng với nút +/-, Thành tiền, Thao tác; cùng sản phẩm phải gộp thành một dòng; xóa cần dialog xác nhận; có nút “Tiếp tục mua sắm”; nhãn tổng là “Tổng cộng”; giỏ trống có hình minh họa và thông báo. SUT hiện tại: Cart.jsx hiển thị cột “Giá”, số lượng dạng text, nút “Xóa” xóa ngay, nhãn “Tổng tạm tính”, link “← Mua tiếp” và empty state chỉ có chữ. CartContext.jsx luôn thêm dòng mới nên không gộp sản phẩm. Giỏ chỉ nằm trong React memory; |   |   |   |
| --- | --- | --- | --- | --- |


|   | theo Task_Assignment .md, không reload hoặc điều hướng bằng page.goto() sau khi đã thêm sản phẩm. Dùng đúng tên từ seed trong database.js: ví dụ “iPhone 15 Pro Max”, “Tai nghe AirPods Pro 2”. Tên trong bảng dữ liệu của Task_Assignment có chỗ viết khác với seed. Chuẩn bị ID / loại và thao tác Context mới, vào CART-01 trang chủ Empty rồi dùng state link Giỏ hàng. CART-02 sản phẩm Cấu trúc từ trang bảng chủ rồi mở giỏ. CART-03 Từ catalog Happy thêm một path — iPhone, một sản bấm link phẩm Giỏ hàng. | Kết quả mong đợi theo đặc tả Có thông báo giỏ trống và icon/hình minh họa. Thêm một Có đủ cột Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác. Một dòng sản phẩm, số lượng 1. CART-04 Từ catalog Chỉ một dòng Đóng | Dọn dữ liệu Đóng context sau test; không có dữ liệu backend. Context mới cho mỗi test. Đóng context sau test. | Locator dựa trên source getByRole('heading',{name:'Giỏ bạn đang trống'}); ảnh/icon hiện ch locator ứng với SUT. page.locator('table thead th'); trong Cart component. Card: main .grid > .bg-white lọc th nút Thêm vào giỏ; link getByRole('link',{name:/Giỏ hàn dòng table tbody tr. Như CART-03; xác minh dòng bằng tab |   |
| --- | --- | --- | --- | --- | --- |


|   | Gộp sản thêm phẩm cùng trùng iPhone hai lần, mở giỏ trong cùng context. Thêm một CART-05 iPhone và Hai sản một phẩm khác AirPods nhau từ catalog, mở giỏ. Thêm CART-06 iPhone, Đơn giá và rồi mở thành tiền giỏ. CART-07 Thêm Boundary iPhone; — tăng số tại giỏ lượng bấm +. Thêm CART-08 iPhone; Boundary thử giảm — không số lượng giảm dưới khi đang 1 là 1. Thêm CART-09 iPhone; Xóa yêu bấm Xóa cầu xác và quan nhận sát dialog. | cho sản phẩm đó, số lượng 2. Hai dòng phẩm xuất hiện đúng một lần. Đơn giá số lượng 1; thành tiền bằng đơn giá. Số lượng tăng từ 1 lên 2; thành tiền thành 60.000.000 ₫. Số lượng không được nhỏ hơn 1; kết quả chính xác khi bấm - ở 1 chưa được đặc tả thêm. xác nhận. | context sau test. riêng, mỗi sản Đóng context sau test. 30.000.000 ₫; Đóng context sau test. Đóng context sau test. Đóng context sau test. Nếu dialog có, Trước khi xóa chọn phải có dialog Cancel để không thay đổi giỏ. | tr lọc theo tên và ô số lượng td.nth(2). Card sản phẩm theo tên; table tbody bằng tên sản phẩm. Trong dòng tương ứng: tr.locator('td').nth(1/2/3) theo source hiện tại. row.getByRole('button',{name:'+ nút chưa có trong source hiện tại. row.getByRole('button',{name:'- nút chưa có trong source. row.getByRole('button',{name:'X dialog của SUT hiện chưa được gọi. |   |
| --- | --- | --- | --- | --- | --- |


|   | Thêm iPhone; bấm Xóa; CART-10 chọn Hủy xóa Cancel trong dialog. Thêm CART-11 iPhone; Xác nhận bấm Xóa; xóa xác nhận dialog. Thêm CART-12 iPhone, Nhãn tổng mở giỏ. Thêm sản phẩm, mở CART-13 giỏ, bấm Tiếp tục nút tiếp mua sắm tục mua sắm. Từ trang chủ thêm một sản CART-14 phẩm, Badge giỏ quan sát hàng link giỏ hàng trên header. Chưa đủ căn cứ để kết luận: nội dung dialog và nhãn nút xác | Dòng sản phẩm và tổng tiền vẫn còn nguyên. Dòng bị xóa; tổng tiền cập nhật; giỏ trống hiển thị empty state nếu không còn sản phẩm. Hiển thị chính xác nhãn “Tổng cộng”, không phải “Tổng tạm tính”. Link có nhãn “Tiếp tục mua sắm” và quay về trang chủ. Link Giỏ hàng có badge số lượng phù hợp. | Đóng context sau test. Đóng context sau test. Đóng context sau test. Context mới ở test kế tiếp. Đóng context sau test. | Nút Xóa; dialog hiện chưa tồn tại trong s Nút Xóa; dòng table tbody tr; headi state như CART-01. getByText('Tổng cộng',{exact:fa nhãn hiện tại trong source là “Tổng tạm Link source hiện có: getByRole('link',{name:'← Mua t nhãn theo đặc tả hiện chưa có. getByRole('link',{name:/Giỏ hàn Header hiện chỉ render link text, chưa c |   |
| --- | --- | --- | --- | --- | --- |


|   | nhận/hủy; cách tính badge khi có nhiều dòng hoặc số lượng lớn (tổng units hay số sản phẩm phân biệt); giới hạn trên của số lượng; và việc giỏ có cần tồn tại sau reload/đăng nhập lại hay không. Expected cho CART-08 chỉ áp dụng điều kiện không âm/không nhỏ hơn 1 theo tính chất số lượng; SRS chưa mô tả thông báo hay hành động cụ thể khi chạm ngưỡng. FR-15 — Quản lý sản phẩm Admin Đặc tả: Admin thêm/xem/sửa/xóa sản phẩm; tên bắt buộc và tối đa 255 ký tự; giá bắt buộc và dương; danh mục bắt buộc, phải chọn từ danh sách có sẵn; khi sửa chỉ sản phẩm đó thay đổi. SUT hiện tại: frontend- admin/src/App.j sx có form và bảng sản phẩm. Tên có required nhưng không có giới hạn 255; giá |   |   |   |
| --- | --- | --- | --- | --- |


|   | là type="number" nhưng không required/min; danh mục được chọn mặc định ID 1. Khi sửa, API cập nhật đúng ID nhưng UI tạm đổi tên mọi sản phẩm trong state. Các route POST/PUT/DELETE /api/products trong backend/server. js không kiểm tra validation hoặc auth. Kiểm tra quyền API thuộc FR-12; bảng dưới tập trung vào hành vi CRUD FR-15, dùng tài khoản Admin cho tiền điều kiện. Chuẩn bị ID / loại và thao tác Đăng nhập Sản phẩm; PROD-01 nhập tên Happy duy nhất, path — giá dương, thêm chọn danh mục seed; lưu. Đăng nhập PROD-02 Admin, mở Xem danh tab Sản sách phẩm. | Kết quả mong đợi theo đặc tả Admin; tab Sản phẩm mới xuất hiện với đúng tên, giá và danh mục. Danh sách sản phẩm seed và | Dọn dữ liệu Tìm đúng tên duy nhất, xóa đúng sản phẩm đã tạo. Không sửa/xóa dữ phẩm ở cell. liệu seed. | Locator dựa trên source Admin login: placeholder Email, Passwo Login; tab getByText('Sản phẩm',{exact:true}); form getByPlaceholder('Tên sản phẩm') getByPlaceholder('Giá tiền'), for select, nút Lưu sản phẩm. Tab “Sản phẩm”; bảng table tbody tr |   |
| --- | --- | --- | --- | --- | --- |


|   | phẩm test; PROD-03 Happy một sản path — sửa đúng một nút Sửa sản phẩm của đúng dòng. Tạo sản PROD-04 phẩm test; Happy bấm Xóa path — xóa dòng. Để tên trống, PROD-05 nhập giá Negative dương và — tên rỗng danh mục hợp lệ; submit. Nhập tên dài đúng PROD-06 255 ký tự, Boundary giá dương — tên 255 và danh ký tự mục hợp lệ; lưu. PROD-07 Nhập tên Boundary dài 256 ký — tên 256 tự, giá | sản phẩm hiện có được hiển thị. Sản phẩm Tạo hai sản đích thay đổi; sản sửa tên/giá phẩm còn Xóa hai sản lại giữ phẩm bằng nguyên cả theo tên/ID sau khi tải lại dữ liệu. Chỉ sản phẩm đó biến mất trong đúng sách và dữ liệu lưu trữ. Từ chối, Chấp nhận; tên được lưu đầy đủ. Từ chối; hoặc cập | phẩm test trên UI và riêng. Sản phẩm đã xóa; teardown khỏi danh chỉ xóa lại nếu còn đúng ID test. Nếu SUT tạo sản phẩm, tìm theo không tạo fixture/test sản phẩm. timestamp phẩm'}). và xóa chính xác. Xóa đúng sản phẩm có tên fixture 255 ký tự/ID lấy từ API. Nếu SUT không tạo lưu, xóa đúng sản | row.getByRole('button',{name:'Sử form placeholder tên/giá; getByRole('button',{name:'Lưu sả phẩm'}); xác minh API qua GET /api/p row.getByRole('button',{name:'Xó nhận qua GET /api/products. getByPlaceholder('Tên sản phẩm') getByRole('button',{name:'Lưu sả Placeholder Tên sản phẩm; dòng bảng đ theo tên; API dùng để kiểm tra độ dài đã Placeholder Tên sản phẩm; nút Lưu sả |   |
| --- | --- | --- | --- | --- | --- |


|   | ký tự dương và danh mục hợp lệ; lưu. Tạo sản phẩm với PROD-08 giá 1, tên Boundary hợp lệ và — giá nhỏ danh mục nhất dương seed hợp lệ. Nhập giá 0, PROD-09 tên hợp lệ Negative và danh — giá bằng 0 lưu. Nhập giá - PROD-10 1, tên hợp Negative lệ và danh — giá âm lưu. Để trống PROD-11 giá, nhập Negative tên và — giá danh mục thiếu hợp lệ; lưu. Tạo sản phẩm, chọn một PROD-12 danh mục Danh mục có sẵn hợp lệ khác danh mục mặc định rồi lưu. PROD-13 Boundary phẩm test; — chỉ sửa chỉ thay | nhật sản phẩm. Chấp nhận giá 1 vì giá phải dương. Từ chối, không tạo mục hợp lệ; sản phẩm. Từ chối, không tạo mục hợp lệ; sản phẩm. Từ chối vì giá là bắt buộc. đã chọn được lưu cho sản phẩm. Tạo hai sản Chỉ các trường đã sửa của A | phẩm test. Xóa sản phẩm test. Nếu được tạo, xóa theo tên/ID duy nhất. Nếu được tạo, dọn theo đúng fixture. Nếu được tạo, xóa theo đúng fixture. Danh mục Xóa sản phẩm test; không xóa danh mục seed. Xóa hai fixture test theo ID. | getByPlaceholder('Giá tiền'); for select; nút Lưu sản phẩm. Placeholder Giá tiền; nút Lưu sản ph Placeholder Giá tiền; nút Lưu sản ph Placeholder Giá tiền; nút Lưu sản ph form select; chọn option có tên lấy từ mục seed trong database; xác minh dữ liệ Nút Sửa trong row A; getByPlaceholde tiền'); form select; Lưu sản phẩm; /api/products để đối chiếu. |   |
| --- | --- | --- | --- | --- | --- |


|   | giá/danh đổi giá mục của hoặc danh sản phẩm mục sản đích phẩm A, giữ nguyên tên của A và mọi trường sản phẩm B. Thử PROD-14 submit sản mục Negative phẩm — không không có có danh category mục được chọn. Chưa đủ căn cứ để kết luận: có cho phép tên chỉ gồm khoảng trắng không; giá thập phân có hợp lệ hay phải là số nguyên; description/image có bắt buộc không; cách xử lý category ID sai hoặc danh mục bị xóa; sản phẩm trùng tên có được phép không; và nội dung lỗi/status code. Không nên dùng các giả định này làm expected. PROD-14 cũng cần xem xét lại khi có trạng thái danh mục rỗng hoặc lựa chọn “chưa chọn”. | thay đổi; B giữ nguyên. Từ chối nếu danh không được chọn từ danh sách. | Nếu có record phát sinh, xóa đúng fixture. | Form có form select, nhưng source mặ chọn ID 1 và chỉ render options từ danh s không có cách bỏ chọn qua UI thông thườ này chưa thể thực thi như thao tác ngư với dữ liệu seed hiện tại. |   |
| --- | --- | --- | --- | --- | --- |


| Tool: Copilot. Thời gian: 21:37 16/11/2026 Prompt: " Dựa trên test- case matrix FR-[01] mà tôi đã rà soát và chốt ở trên, hãy triển khai test case đăng ký hợp lệ - happy path Ràng buộc: - Dùng Playwright và theo pattern hiện có trong tests/. - Dữ liệu đầu vào phải ở file JSON hoặc CSV riêng; không khai báo toàn bộ test case bằng mảng/object inline trong spec. - Email/tên sản phẩm tạo mới phải duy nhất để tránh đụng dữ liệu giữa lần chạy. - Dùng ít nhất 3 dạng assertion phù hợp, ví dụ URL, visibility, text/count, hoặc attribute. - Ưu tiên locator theo role/label/placehol der/text; chỉ dùng CSS khi cần. - Không thêm wait cố định nếu có thể dùng auto-wait của Playwright. - Không sửa expected result để né lỗi sản phẩm. Nếu một ca phát hiện lỗi, giữ assertion theo đặc tả và | Đã thêm đúng hai file: register. spec.ts — test Playwright cho đăng ký hợp lệ. fr01- registrat ion.json — dữ liệu test tách riêng. Test FIND-REG- 01: valid registration redirects to login dùng tên và email có suffix ngẫu nhiên; mật khẩu Abcdef1! đúng 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt. Test kiểm tra visibility, thuộc tính input và URL/text sau submit. Yêu cầu được cover: nhập họ tên/email/mật khẩu hợp lệ; định dạng và tính duy nhất của email test; quy tắc mật khẩu; yêu cầu type=email/type =password; chuyển đến trang đăng nhập sau đăng ký thành | VALID | Code tốt, phân tách test và data tốt. |   |
| --- | --- | --- | --- | --- |


| đánh dấu finding. - Chỉ sửa file cần thiết cho FR này. Trước khi sửa, nêu danh sách file dự định thay đổi và giải thích ngắn gọn. Các ràng buộc trên sẽ áp dụng cho các prompt sau kể cả tôi có nói hay không Sau khi triển khai, liệt kê test case đã tạo và chỉ rõ test nào cover yêu cầu nào." | công. Trường xác nhận mật khẩu chưa được cover vì hiện không có trong form. Validation: Playwright phát hiện test thành công với --list. Test chưa chạy trên browser: cấu hình sẽ khởi động backend, còn khởi động backend có thể tái tạo database. Type- check chưa chạy vì TypeScript không có sẵn; không cài thêm package. Theo Register.jsx, test được đánh dấu finding và giữ expected theo đặc tả: SUT hiện dùng type="text" cho Email và validator không chấp nhận mật khẩu Abcdef1!. Chưa xác minh kết quả runtime; không có dữ liệu test nào được tạo. Nếu test chạy thành công sau khi SUT được sửa, tài khoản unique sẽ được lưu lại trong DB. |   |   |   |
| --- | --- | --- | --- | --- |
| Tool: Copilot. Thời | Đã bổ sung REG- | VALID | Code tố t, phân tách |   |


| gian: 21:42 16/11/2026 Prompt: " hãy nhớ kĩ ma trận test case ở đầu session nhé, sẽ nhắc lại nó nhiều, và cơ sở dữ liệu có reset cũng không sao. tiếp theo triển khai test case FR01 - REG 3, 4, 5, 6" | 03, REG-04, REG-05 và REG- 06 vào fixture JSON, giữ nguyên test happy path: register. spec.ts fr01- registrat ion.json Kết quả chạy riêng spec: 2 passed, 3 failed trên tổng 5 test (bao gồm happy path hiện có). FIND- REG-03, FIND- REG-04: giữ đỏ theo đặc tả. Email thực tế là type="tex t" nên checkVali dity() chấp nhận email sai; đồng thời SUT báo mật khẩu yếu với mật khẩu hợp lệ theo FR-01. REG-05, REG-06: passed; trường bắt buộc ngăn submit khi họ |   | test và data tố t |   |
| --- | --- | --- | --- | --- |


|   | tên/email để trống. FIND- REG-01: cũng tiếp tục fail vì cùng lỗi kiểu Email và validator mật khẩu. Các test mới lấy dữ liệu từ JSON, tạo tên/email có suffix duy nhất, kiểm tra URL và theo dõi request đăng ký để xác nhận không gửi khi dữ liệu bị từ chối. git diff - -check không báo lỗi. Chỉ chạy spec FR- 01 này, chưa chạy toàn bộ suite hoặc TypeScript compiler. Locator input dựa vào thứ tự vì nhãn trong form chưa được liên kết với input. |   |   |   |
| --- | --- | --- | --- | --- |
| Tool: Copilot. Thời gian: 21:47 16/11/2026 Prompt: "triển khai FR01 REG2, 7, 8, 9, 10, 11, 12" | Đã triển khai các ca trong register.spec.t s, với dữ liệu riêng trong fr01- registration.js on. Mỗi lần chạy tạo email và tên duy nhất; REG-02 tạo trước tài khoản | VALID | Code tố t, độ phủ tốt |   |


|   | qua API rồi thử đăng ký email đó lần nữa. Ca REG- 02 REG- 07 REG- 08 REG- 09 đúng 8 ký tự REG- 10 hoa REG- 11 thường REG- 12 số Chạy toàn bộ spec đăng ký: 5 failed, 7 passed; các ca thất bại gồm REG- 01, REG-02, REG-03, REG-04 và REG-09. Chạy lại riêng REG-02 xác nhận API trả thành công cho email trùng. git diff --check sạch; chỉ hai file trên thay đổi. | Yêu cầu được kiểm tra Từ chối email đã tồn tại Từ chối mật khẩu để trống Passed Từ chối mật khẩu 7 ký tự Passed Chấp nhận mật khẩu mạnh Từ chối mật khẩu thiếu chữ Từ chối mật khẩu thiếu chữ Từ chối mật khẩu thiếu chữ | bởi lỗi kiểm tra mật khẩu. Passed Passed Passed | Kết quả Finding: API chấp nhận email trùng; UI cũng bị Finding: SUT từ chối mật khẩu hợp lệ. |   |
| --- | --- | --- | --- | --- | --- |
| Tool: Copilot. Thời gian: 21:54 16/11/2026 Prompt: "triển khai FR07 - CART 1, 2, 3, 4, 5, từ nay không cần chạy test sau nữa và lưu kết quả 3 prompt trước của | Đã tạo HW04_Test_Autom ation_Implement ation_Log.md, ghi lại ba lượt triển khai FR-01 cùng kết quả chạy, và lượt FR-07 CART-01–05. | VALID | Code tố t, phân tách test và data tốt |   |   |


| FR01, và 1 prompt vừa rồi của FR07 vào một markdown mới, các prompt triển khai test case sau cũng như vậy" | Mình sẽ tiếp tục bổ sung các prompt triển khai test case sau vào cùng tài liệu. FR-07 đã cập nhật add-to- cart.spec.ts và thêm fixture fr07-cart.json. Không chạy test theo yêu cầu; git diff --check sạch. Chưa xác minh hành vi runtime của CART-01– 05. Locator ảnh minh họa dựa trên POM hiện có; SUT hiện không render minh họa trong empty state. |   |   |   |
| --- | --- | --- | --- | --- |
| Tool: Copilot. Thời gian: 21:56 16/11/2026 Prompt: "triển khai FR07 CART 6, 12, 13" | Đã triển khai CART-06, CART- 12 và CART-13 trong add-to- cart.spec.ts, cập nhật locator ở CartPage.ts và expected price trong fr07- cart.json. CART-06 kiểm tra đơn giá và thành tiền. CART-12 kiểm tra nhãn chính xác “Tổng | VALID | Code tố t, phân tách test và data tố t |   |


|   | cộng”. CART-13 kiểm tra nhãn link “Tiếp tục mua sắm”, href và điều hướng về trang chủ. ã ghi l°ãt triển khai này vào HW04_Test _Automati on_Implem entation_ Log.md. git diff -- check sạch. Không chạy test theo yêu cầu; các expected vẫn theo đặc tả, dù SUT hiện hiển thị nhãn khác. |   |   |   |
| --- | --- | --- | --- | --- |
| Tool: Copilot. Thời gian: 22:00 16/11/2026 Prompt: "triển khai FR07 CART 7. 8, 9, 10" | Đã triển khai CART-07–10 trong add-to- cart.spec.ts, bổ sung expected quantity/thành tiền trong fr07- cart.json, và ghi lượt này vào HW04_Test_Autom ation_Implement ation_Log.md. CART-07: tăng số lượng và kiểm tra thành tiền. | VALID | Code tốt, phân tách test và data tốt |   |


|   | CART-08: thử giảm ở số lượng 1; chấp nhận nút bị disable hoặc số lượng vẫn không giảm. CART-09: yêu cầu dialog xác nhận khi xóa. CART-10: hủy xác nhận thì sản phẩm vẫn còn. git diff -- check sạch. Không chạy test theo yêu cầu; các finding vẫn giữ expected theo đặc tả, trong khi SUT hiện không có nút tăng/giảm hoặc dialog xác nhận. |   |   |   |
| --- | --- | --- | --- | --- |
| Tool: Copilot. Thời gian: 22:08 16/11/2026 Prompt: "PROD 1, 2 ,3 ,4 FR15” | Đã triển khai PROD-01–04: PROD-01: tạo sản phẩm hợp lệ qua UI; kiểm tra trên danh sách và dữ liệu lưu. PROD-02: xem các | VALID | Code tốt, phân tách test và data tốt |   |


| Tool: Copilot. Thời gian: 22:13 16/11/2026 Prompt: "PROD 5, 6, 7, 8, 9, 10, 11, 12" | Đã triển khai PROD-05–12 dưới dạng data-driven trong products.spec.t s, với dữ liệu trong fr15- products.json: PROD-05: từ chối tên rỗng. PROD- 06/07: chấp nhận tên 255 ký tự; từ chối 256. PROD-08: chấp nhận giá 1. PROD- 09/10/11: từ chối giá 0, âm hoặc để trống. PROD-12: chọn danh mục Laptop và xác minh danh mục đã lưu. Các ca dọn đúng sản phẩm có mô tả fixture duy nhất nếu SUT tạo dữ liệu trái expected. Đã cập nhật nhật ký triển khai. Không chạy test theo yêu cầu; các expected vẫn theo FR-15. | VALID | Code tốt, phân tách test và data tốt |   |
| --- | --- | --- | --- | --- |


| Tool: Copilot. Thời gian: 21:13 16/11/2026 Prompt: "Sinh test case cho hàm parsePhoneNumbe rVN…" |   |   |   |   |
| --- | --- | --- | --- | --- |

## 4. Tổng kết Độ chính xác AI

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số | Số lượng | Tỉ lệ |
| --- | --- | --- |
| Tổng artifact AI sinh đã audit | 9 |   |
| VALID (đúng, dùng nguyên) | 9 | %100 |
| INVALID (sai; loại bỏ) | 0 | %0 |
| INCOMPLETE (chấp nhận sau khi sửa) | 0 | %0 |

## 5. Kết luận — Khi nào nên / không nên dùng AI?

AI vẫn cực kỳ mạnh trong việc sinh mã, miễn là mô tả nghiệp vụ và prompt đủ chất lượng và phản ánh đúng yêu cầu của người dùng

## 6. Mandatory Disclosure (dán nguyên văn)

Tôi đã sử dụng Copilot để tóm tắt yêu cầu HW04, gợi ý prompt kiểm thử cho FR- 01/FR-07/FR-15, rà soát các test FR-07 còn thiếu và soạn bản nháp một số nội dung báo cáo. Tôi đã chọn các tính năng và sửa, chạy test, kiểm tra report, ghi bug và commit; các đề xuất do AI tạo được tôi rà soát, chỉnh sửa trước khi nộp. AI không được dùng để tạo giả kết quả chạy, HTML report, ảnh, người tham gia hay bằng chứng kiểm thử.

## Chữ ký

| Họ tên sinh viên (in hoa): | NGUYỄN THIỆN NHÂN |
| --- | --- |
| MSSV: | 23120064 |
| Lớp / Khoá: | 23CTT1 |
| Môn học: | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| Giảng viên: |   |
| Ngày: | 16-17/11/2026 |
| Chữ ký: | NHAN |

## Tham khảo

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.

- ISTQB Foundation Level Syllabus (latest version).

- Hardman, P. (2025). A Post-AI Learning Taxonomy.

- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.


- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.

- Anthropic (2025). Building reliable AI test agents ‒ engineering blog.

- DeepEval & Promptfoo documentation - testing frameworks for LLM systems.
