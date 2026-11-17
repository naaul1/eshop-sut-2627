**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)** 

**CS423 / CSC15003 – Kiểm chứng Phần mềm (AI-augmented · 2026)** 

**HW04 – Automation Testing** 

# **I. Automation Testing** 

## **1. FR và test cases** 

**a. FR01** 

|**ID / loại**|**Chuẩn bị và thao tác**|**Kết quả mong đợi**<br>**theo đặc tả**|**Dọn dữ liệu**|**Locator dựa trên**<br>**source**|
|---|---|---|---|---|
|REG-01 Happy path|Mở /register; nhập tên<br>hợp lệ, email unique có<br>suffix ngẫu nhiên, mật<br>khẩu Abcdef1!; submit.|Đăng ký thành công,<br>chuyển đến /login; tài<br>khoản có thể đăng nhập<br>bằng thông tin vừa đăng<br>ký.|Xóa đúng tài khoản test<br>theo email/ID sau khi<br>kiểm tra; không dùng<br>email seed.|form input.nth(0/1/2);<br>nút getByRole('button',<br>{name:'Đăng Ký'}); xác<br>nhận URL /login.|
|REG-02 Negative —<br>email trùng|Tạo trước một tài khoản<br>test qua API; dùng<br>chính email đó đăng ký<br>trên UI.|Từ chối đăng ký; không<br>tạo thêm tài khoản cùng<br>email.|Xóa tất cả bản ghi khớp<br>email test duy nhất sau<br>khi kiểm tra.|Cùng ba input theo thứ<br>tự; nút Đăng Ký; nội<br>dung lỗi qua<br>getByText(...) nhưng<br>khôngcố định câu chữ.|
|REG-03 Negative —<br>thiếu @|Nhập email như<br>userexample.com; các<br>trườngcòn lại hợplệ.|Từ chối email không<br>đúng định dạng; không<br>tạo tài khoản.|Kiểm tra và xóa tài<br>khoản nếu SUT lỡ tạo.|Email là form<br>input.nth(1); submit<br>bằngnút ĐăngKý.|
|REG-04 Negative —<br>thiếu domain|Nhập user@; các<br>trườngcòn lại hợplệ.|Từ chối email không<br>hợplệ.|Như REG-03.|form input.nth(1); nút<br>ĐăngKý.|
|REG-05 Negative —<br>thiếu họ tên|Để trống họ tên, nhập<br>email unique và mật<br>khẩu hợplệ;submit.|Không đăng ký được;<br>họ tên là bắt buộc.|Nếu request vẫn được<br>gửi và tạo user, xóa<br>user test theo email.|form input.nth(0); input<br>thứ hai và thứ ba; nút<br>ĐăngKý.|
|REG-06 Negative —<br>thiếu email|Để trống email; điền<br>tên và mật khẩu hợp lệ;<br>submit.|Không đăng ký được;<br>email là bắt buộc.|Xác minh không có<br>record mới; nếu có, dò<br>theo tên test duy nhất<br>rồi dọn cẩn thận.|form input.nth(1); nút<br>Đăng Ký.|
|REG-07 Negative —<br>thiếu mật khẩu|Để trống mật khẩu;<br>điền tên và email<br>unique;submit.|Không đăng ký được;<br>mật khẩu là bắt buộc.|Xác minh không phát<br>sinh user; nếu có, dọn<br>đúngbảnghi test.|form input.nth(2); nút<br>Đăng Ký.|
|REG-08 Boundary — 7<br>ký tự|<br>Dùng mật khẩu dài 7 ký<br>tự, có đủ các nhóm ký<br>tự còn lại, ví dụ<br>Abcde1!; submit.|Từ chối vì ngắn hơn 8<br>ký tự.|Xác minh không tạo tài<br>khoản; nếu có, dọn.|Input thứ ba và nút<br>Đăng Ký; lỗi hiện được<br>render bằng một div,<br>không có selector ổn<br>định khác.|
|REG-09 Boundary —<br>đúng 8 ký tự|Dùng mật khẩu<br>Abcdef1! (đúng 8 ký<br>tự); email unique;<br>submit.|Chấp nhận mật khẩu<br>đúng biên và chuyển<br>đến đăng nhập.|Xóa tài khoản test sau<br>khi kiểm tra.|form input.nth(2); nút<br>Đăng Ký; URL /login.|
|REG-10 Negative —<br>thiếu chữ hoa|Dùng mật khẩu đủ dài<br>nhưng không có chữ<br>hoa,ví dụabcdef1!.|Từ chối mật khẩu.|Xác minh không tạo tài<br>khoản; nếu có, dọn.|Input thứ ba; nút Đăng<br>Ký.|
|REG-11 Negative —<br>thiếu chữ thường|Dùng mật khẩu đủ dài<br>nhưng không có chữ<br>thường, ví dụ<br>ABCDEF1!.|Từ chối mật khẩu.|Như REG-10.|Input thứ ba; nút Đăng<br>Ký.|
|REG-12 Negative —<br>thiếu chữ số|Dùng mật khẩu đủ dài<br>nhưng không có số, ví<br>dụAbcdefg!.|Từ chối mật khẩu.|Như REG-10.|Input thứ ba; nút Đăng<br>Ký.|



**b. FR07** 

|**ID / loại**|**Chuẩn bị và thao**<br>**tác**|**Kết quả mong đợi**<br>**theo đặc tả**|**Dọn dữ liệu**|**Locator dựa trên source**|
|---|---|---|---|---|
|CART-01 Empty<br>state|<br>Context mới, vào<br>trang chủ rồi dùng<br>link Giỏ hàng.|<br>Có thông báo giỏ<br>trống và icon/hình<br>minh họa.|Đóng context sau<br>test; không có dữ<br>liệu backend.|getByRole('heading',{name:'Giỏ hàng<br>của bạn đang trống'}); ảnh/icon hiện<br>chưa có locator ứngvới SUT.|
|CART-02 Cấu trúc<br>bảng|Thêm một sản<br>phẩm từ trang chủ<br>rồi mở giỏ.|Có đủ cột Sản phẩm,<br>Đơn giá, Số lượng,<br>Thành tiền, Thao<br>tác.|Context mới cho<br>mỗi test.|page.locator('table thead th'); bảng<br>nằm trong Cart component.|
|CART-03 Happy<br>path — một sản<br>phẩm|Từ catalog thêm<br>một iPhone, bấm<br>link Giỏ hàng.|<br>Một dòng sản phẩm,<br>số lượng 1.|Đóng context sau<br>test.|Card: main .grid > .bg-white lọc theo<br>tên; nút Thêm vào giỏ; link<br>getByRole('link',{name:/Giỏ hàng/});<br>dòngtable tbodytr.|
|CART-04 Gộp sản<br>phẩm trùng|Từ catalog thêm<br>cùng iPhone hai<br>lần, mở giỏ trong<br>cùngcontext.|Chỉ một dòng cho<br>sản phẩm đó, số<br>lượng 2.|Đóng context sau<br>test.|Như CART-03; xác minh dòng bằng<br>table tbody tr lọc theo tên và ô số<br>lượng td.nth(2).|
|CART-05 Hai sản<br>phẩm khác nhau|<br>Thêm một iPhone<br>và một AirPods từ<br>catalomởiỏ|Hai dòng riêng, mỗi<br>sản phẩm xuất hiện<br>đúnmột lần|Đóng context sau<br>test.|Card sản phẩm theo tên; table tbody tr<br>lọc bằng tên sản phẩm.|
|CART-06 Đơn giá<br>và thành tiền|g, g.<br>Thêm iPhone, rồi<br>mở giỏ.|g .<br>Đơn giá 30.000.000<br>₫; số lượng 1; thành<br>tiền bằngđơngiá.|Đóng context sau<br>test.|Trong dòng tương ứng:<br>tr.locator('td').nth(1/2/3) theo thứ tự<br>source hiện tại.|
|CART-07 Boundary<br>— tăng số lượng|Thêm iPhone; tại<br>giỏ bấm +.|Số lượng tăng từ 1<br>lên 2; thành tiền<br>thành 60000000 ₫|Đóng context sau<br>test.|row.getByRole('button',{name:'+'}) —<br>nút chưa có trong source hiện tại.|
|CART-08 Boundary<br>— không giảm dưới<br>1|Thêm iPhone; thử<br>giảm số lượng khi<br>đang là 1.|.. .<br>Số lượng không<br>được nhỏ hơn 1; kết<br>quả chính xác khi<br>bấm - ở 1 chưa được<br>đặc tả thêm.|Đóng context sau<br>test.|row.getByRole('button',{name:'-'}) —<br>nút chưa có trong source.|
|CART-09 Xóa yêu<br>cầu xác nhận|Thêm iPhone; bấm<br>Xóa và quan sát<br>dialog.|Trước khi xóa phải<br>có dialog xác nhận.|Nếu dialog có, chọn<br>Cancel để không<br>thayđổigiỏ.|row.getByRole('button',{name:'Xóa'});<br>dialog của SUT hiện chưa được gọi.|
|CART-10 Hủy xóa|Thêm iPhone; bấm<br>Xóa; chọn Cancel<br>trongdialog|Dòng sản phẩm và<br>tổng tiền vẫn còn<br>nguyên|Đóng context sau<br>test.|Nút Xóa; dialog hiện chưa tồn tại<br>trong source.|
|CART-11 Xác nhận<br>xóa|.<br>Thêm iPhone; bấm<br>Xóa; xác nhận<br>dialog.|.<br>Dòng bị xóa; tổng<br>tiền cập nhật; giỏ<br>trống hiển thị empty<br>state nếu không còn<br>sảnphẩm.|Đóng context sau<br>test.|Nút Xóa; dòng table tbody tr; heading<br>empty state như CART-01.|
|CART-12 Nhãn<br>tổng|Thêm iPhone, mở<br>giỏ.|Hiển thị chính xác<br>nhãn “Tổng cộng”,<br>không phải “Tổng<br>tạm tính”.|Đóng context sau<br>test.|getByText('Tổng cộng',{exact:false});<br>nhãn hiện tại trong source là “Tổng<br>tạm tính”.|
|CART-13 — Tiếp<br>tục mua sắm|Mở trang chủ, thêm<br>iPhone vào giỏ, mở<br>giỏ hàng, bấm liên<br>kết tiếp tục mua<br>sắm.|Quay về trang chủ<br>(/). Nhãn liên kết<br>phải là “Tiếp tục<br>mua sắm”.|Giỏ nằm trong bộ<br>nhớ của trang; kết<br>thúc test và dùng<br>page mới cho test<br>kế tiếp.|cart.continueShoppingLink —<br>getByRole('link', { name: /Tiếp tục<br>mua sắm|Mua tiếp/ }); assert<br>toHaveText('Tiếp tục mua sắm') và<br>URL.|
|CART-14 — Giảm<br>số lượng và cập<br>nhật thành tiền|Thêm iPhone hai<br>lần, mở giỏ, bấm<br>nút giảm một lần.|Số lượng từ 2 còn 1;<br>thành tiền giảm từ<br>60.000.000 ₫ còn<br>30.000.000 ₫. Ca<br>này kiểm tra cập<br>nhật bình thường,<br>khác CART-08 chỉ<br>kiểm tra không giảm<br>dưới 1|Dùng page riêng;<br>giỏ không tồn tại<br>qua các page/test<br>mới.|cart.row('iPhone 15 Pro Max'), rồi<br>row.getByRole('button', { name: '-' });<br>số lượng/tiền lấy từ các ô td của dòng.|
|CART-15 — Xóa<br>một sản phẩm, giữ<br>sản phẩm còn lại|Thêm iPhone và<br>AirPods, mở giỏ,<br>xác nhận xóa<br>iPhone trong<br>dialog.|.<br>Dòng iPhone biến<br>mất, AirPods vẫn<br>còn với số lượng<br>không đổi; tổng tiền<br>còn 6.000.000 ₫.|Page mới cho test<br>tiếp theo; dữ liệu<br>giỏ trong bộ nhớ sẽ<br>được loại bỏ khi<br>page kết thúc.|cart.row('iPhone 15 Pro Max'),<br>cart.row('Tai nghe AirPods Pro 2');<br>trong dòng iPhone dùng<br>getByRole('button', { name: /Xóa/ });<br>dialog qua page.once('dialog', ...); tổng<br>qua cart.totalLabel.|



**c. FR15** 

|**ID / loại**|**Chuẩn bị và thao**<br>**tác**|**Kết quả mong đợi**<br>**theo đặc tả**|**Dọn dữ liệu**|**Locator dựa trên source**|
|---|---|---|---|---|
|PROD-01 Happy<br>path — thêm|Đăng nhập Admin;<br>tab Sản phẩm; nhập<br>tên duy nhất, giá<br>dương, chọn danh<br>mục seed; lưu.|Sản phẩm mới xuất<br>hiện với đúng tên,<br>giá và danh mục.|Tìm đúng tên duy<br>nhất, xóa đúng sản<br>phẩm đã tạo.|Admin login: placeholder Email,<br>Password, nút Login; tab<br>getByText('Sản phẩm',{exact:true});<br>form getByPlaceholder('Tên sản<br>phẩm'), getByPlaceholder('Giá tiền'),<br>form select,nút Lưu sảnphẩm.|
|PROD-02 Xem<br>danh sách|Đăng nhập Admin,<br>mở tab Sản phẩm.|Danh sách sản phẩm<br>seed và sản phẩm<br>hiện có được hiển<br>thị.|Không sửa/xóa dữ<br>liệu seed.|Tab “Sản phẩm”; bảng table tbody tr;<br>tên sản phẩm ở cell.|
|PROD-03 Happy<br>path — sửa đúng<br>một sản phẩm|Tạo hai sản phẩm<br>test; sửa tên/giá một<br>sản phẩm bằng nút<br>Sửa của đúng dòng.|Sản phẩm đích thay<br>đổi; sản phẩm còn<br>lại giữ nguyên cả<br>trên UI và sau khi<br>tải lại dữ liệu.|Xóa hai sản phẩm<br>test theo tên/ID<br>riêng.|row.getByRole('button',{name:'Sửa'});<br>form placeholder tên/giá;<br>getByRole('button',{name:'Lưu sản<br>phẩm'}); xác minh API qua GET<br>/api/products.|
|PROD-04 Happy<br>path — xóa|Tạo sản phẩm test;<br>bấm Xóa trong<br>đúng dòng.|Chỉ sản phẩm đó<br>biến mất khỏi danh<br>sách và dữ liệu lưu<br>trữ.|Sản phẩm đã xóa;<br>teardown chỉ xóa lại<br>nếu còn đúng ID<br>test.|row.getByRole('button',{name:'Xóa'});<br>xác nhận qua GET /api/products.|
|PROD-05 Negative<br>— tên rỗng|Để tên trống, nhập<br>giá dương và danh<br>mục hợp lệ; submit.|Từ chối, không tạo<br>sản phẩm.|Nếu SUT tạo sản<br>phẩm, tìm theo<br>fixture/test<br>timestamp và xóa<br>chính xác.|getByPlaceholder('Tên sản phẩm');<br>getByRole('button',{name:'Lưu sản<br>phẩm'}).|
|PROD-06 Boundary<br>— tên 255 ký tự|Nhập tên dài đúng<br>255 ký tự, giá<br>dương và danh mục<br>hợplệ;lưu.|Chấp nhận; tên được<br>lưu đầy đủ.|Xóa đúng sản phẩm<br>có tên fixture 255<br>ký tự/ID lấy từ API.|Placeholder Tên sản phẩm; dòng bảng<br>được tìm theo tên; API dùng để kiểm<br>tra độ dài đã lưu.|
|PROD-07 Boundary<br>— tên 256 ký tự|Nhập tên dài 256<br>ký tự, giá dương và<br>danh mục hợp lệ;<br>lưu.|Từ chối; không tạo<br>hoặc cập nhật sản<br>phẩm.|Nếu SUT lưu, xóa<br>đúng sản phẩm test.|Placeholder Tên sản phẩm; nút Lưu<br>sản phẩm.|
|PROD-08 Boundary<br>— giá nhỏ nhất<br>dương|Tạo sản phẩm với<br>giá 1, tên hợp lệ và<br>danh mục seed hợp<br>lệ|Chấp nhận giá 1 vì<br>giá phải dương.|Xóa sản phẩm test.|getByPlaceholder('Giá tiền'); form<br>select; nút Lưu sản phẩm.|
|PROD-09 Negative<br>— giá bằng 0|.<br>Nhập giá 0, tên hợp<br>lệ và danh mục hợp<br>lệ;lưu.|Từ chối, không tạo<br>sản phẩm.|Nếu được tạo, xóa<br>theo tên/ID duy<br>nhất.|Placeholder Giá tiền; nút Lưu sản<br>phẩm.|
|PROD-10 Negative<br>— giá âm|Nhập giá -1, tên<br>hợp lệ và danh mục<br>hợplệ;lưu.|Từ chối, không tạo<br>sản phẩm.|Nếu được tạo, dọn<br>theo đúng fixture.|Placeholder Giá tiền; nút Lưu sản<br>phẩm.|
|PROD-11 Negative<br>— giá thiếu|Để trống giá, nhập<br>tên và danh mục<br>hợplệ;lưu.|Từ chối vì giá là bắt<br>buộc.|Nếu được tạo, xóa<br>theo đúng fixture.|Placeholder Giá tiền; nút Lưu sản<br>phẩm.|
|PROD-12 Danh<br>mục hợp lệ|Tạo sản phẩm, chọn<br>một danh mục có<br>sẵn khác danh mục<br>mặc định rồi lưu.|Danh mục đã chọn<br>được lưu cho sản<br>phẩm.|Xóa sản phẩm test;<br>không xóa danh<br>mục seed.|form select; chọn option có tên lấy từ<br>danh mục seed trong database; xác<br>minh dữ liệu qua API.|



**2. Thiết kế test & dữ liệu test** 

Bộ kiểm thử bao phủ ba tính năng FR-01, FR-07 và FR-15. Các test case gồm luồng hợp lệ, dữ liệu không hợp lệ, giá trị biên và kiểm tra giao diện. Mỗi test được viết bằng Playwright và đối chiếu với yêu cầu tương ứng trong đặc tả. 

**FR-01 — Đăng ký:** có 12 test, gồm đăng ký hợp lệ; email trùng hoặc sai định dạng; các trường bắt buộc; mật khẩu ngắn hoặc thiếu chữ hoa, chữ thường, chữ số; và mật khẩu mạnh đúng 8 ký tự. Email tạo mới được gắn hậu tố ngẫu nhiên để tránh trùng giữa các lần chạy. 

**FR-07 — Giỏ hàng:** có 15 test, kiểm tra thêm một hoặc nhiều sản phẩm, gộp sản phẩm trùng, số lượng, đơn giá và thành tiền, xóa sản phẩm, giỏ trống, nhãn các cột và điều hướng tiếp tục mua sắm. 

**FR-15 — Quản lý sản phẩm:** có 12 test, kiểm tra danh sách và CRUD, cập nhật một sản phẩm mà không làm đổi sản phẩm khác, cùng các điều kiện tên bắt buộc/độ dài tối đa và giá phải dương. Sản phẩm tạo trong test dùng tên duy nhất và được dọn sau khi kiểm tra. 

Dữ liệu được tách khỏi file test và lưu trong JSON: fr01-registration.json, fr07-cart.json và fr15products.json. Các test tương ứng nằm trong register.spec.ts, add-to-cart.spec.ts và products.spec.ts. 

## **3. Chạy test & trình duyệt** 

Playwright được cấu hình với ba project Chromium, Firefox và WebKit trong playwright.config.ts. Có thể chạy riêng từng tính năng trên từng trình duyệt, ví dụ: 

### **npx playwright test tests/auth/register.spec.ts --project=chromium** 

### **npx playwright test tests/auth/register.spec.ts --project=firefox** 

### **npx playwright test tests/auth/register.spec.ts --project=webkit** 

Thay đường dẫn spec để chạy FR-07 hoặc FR-15. Chạy đủ cả ba tính năng trên ba trình duyệt tương ứng với 9 lượt chạy bộ test. Nếu cả 39 test case đều được thực thi trên cả ba trình duyệt, tổng cộng là 117 lượt thực thi test case. Cần lưu riêng report của từng lượt; report mặc định có thể bị ghi đè ở lần chạy tiếp theo. 

## **4. Tóm tắt kết quả chạy** 

Bộ test hiện có 39 test case được thiết kế: FR-01 có 12, FR-07 có 15 và FR-15 có 13. Điền số liệu dưới đây sau khi chạy đủ các trình duyệt và kiểm tra HTML reports: 

Bảng này tương ứng với 1 browser bất kỳ, vì số liệu kết quả 3 browser giống nhau. 

|Tính năng|Test thiết kế|Đã chạy|Passed|Failed|
|---|---|---|---|---|
|FR-01|12|12|7|5|
|FR-07|15|15|4|11|
|FR-15|12|12|7|5|
|Tổng|39|39|18|21|



# **II. AI Gap Analysis** 

Locator cần kiểm tra trên giao diện thực tế, dù được gợi ý từ Page Object và source. AI có thể đề xuất expected result theo đặc tả nhưng không tự phân biệt được lỗi của ứng dụng với lỗi của test nếu thiếu kết quả chạy và bằng chứng. Bài học rút ra là dùng AI để tăng tốc phân tích và tạo 

bản nháp, nhưng phải kiểm tra lại từng yêu cầu, assertion, dữ liệu và kết quả chạy trước khi đưa vào báo cáo. 

# **III. Mandatory Disclosure** 

Tôi đã sử dụng Copilot để tóm tắt yêu cầu HW04, gợi ý prompt kiểm thử cho FR-01/FR07/FR-15, rà soát các test FR-07 còn thiếu và soạn bản nháp một số nội dung báo cáo. Tôi đã chọn các tính năng và sửa, chạy test, kiểm tra report, ghi bug và commit; các đề xuất do AI tạo được tôi rà soát, chỉnh sửa trước khi nộp. AI không được dùng để tạo giả kết quả chạy, HTML report, ảnh, người tham gia hay bằng chứng kiểm thử. 

# **IV. Self-assessment** 

|**No.**|**Criteria**|**Grade**|**Self-assessed Grade**|
|---|---|---|---|
|1|Task 1 – Feature A|25|25|
|1|Task 1 – Feature B|25|25|
|1|Task 1 – Feature C|25|25|
|2|Task 2 – Demo video|15|0|
|3|Agent skills|10|0|
||Total|100|75|



# **Table of Contents** 

|HW04 – Automation Testing .......................................................................................................... 1|
|---|
|I.<br>Automation Testing ................................................................................................................. 1|
|1.<br>FR và test cases ................................................................................................................... 1|
|a.<br>FR01 ................................................................................................................................ 1|
|b.<br>FR07 ................................................................................................................................ 2|
|c.<br>FR15 ................................................................................................................................ 3|
|2.<br>Thiết kế test & dữ liệu test................................................................................................... 3|
|3.<br>Chạy test & trình duyệt........................................................................................................ 4|
|4.<br>Tóm tắt kết quả chạy ........................................................................................................... 4|
|II.<br>AI Gap Analysis ...................................................................................................................... 4|
|III.<br>Mandatory Disclosure ......................................................................................................... 5|



