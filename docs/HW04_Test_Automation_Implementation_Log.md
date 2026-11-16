# Nhật ký triển khai kiểm thử tự động HW04

Ghi lại phạm vi, file thay đổi và kết quả xác minh cho từng prompt triển khai test case. Các prompt triển khai sau sẽ được bổ sung theo thứ tự vào tài liệu này.

## FR-01 — Đăng ký tài khoản

### Prompt 1 — Happy path REG-01

- **Phạm vi:** Đăng ký thành công bằng họ tên/email duy nhất và mật khẩu hợp lệ; kiểm tra hiển thị input, thuộc tính input và chuyển hướng đến trang đăng nhập.
- **File:** [register.spec.ts](../tests/auth/register.spec.ts), [fr01-registration.json](../tests/auth/data/fr01-registration.json).
- **Dữ liệu:** Tên và email có suffix ngẫu nhiên; mật khẩu `Abcdef1!` (đúng 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt).
- **Xác minh tại prompt:** Playwright discovery liệt kê được 1 test. Không chạy browser test khi đó; TypeScript compiler không có sẵn.
- **Finding dự kiến từ source:** Email đang là `type="text"`; password validator hiện từ chối mật khẩu đúng đặc tả.
- **Lỗi còn lại:** SUT vẫn khai báo email là `type="text"` và từ chối mật khẩu hợp lệ theo đặc tả.
- **Cập nhật:** Locator bám theo nhãn field; user do test tạo được dọn theo ID.

### Prompt 2 — Negative REG-03, REG-04, REG-05, REG-06

- **Phạm vi:** Email thiếu `@`, email thiếu domain, thiếu họ tên, thiếu email.
- **File:** Cập nhật hai file FR-01 nêu trên; các test case được nạp từ JSON.
- **Xác minh:** Chạy toàn bộ spec đăng ký, gồm 5 test: **3 failed, 2 passed**. REG-01, REG-03, REG-04 fail; REG-05 và REG-06 pass.
- **Finding:** Email SUT dùng `type="text"` nên không áp dụng validate HTML email; validator mật khẩu báo yếu với mật khẩu hợp lệ, làm chặn luồng email không hợp lệ trước khi gửi request.
- **Lỗi còn lại:** Email invalid vẫn không được SUT validate đúng; validator mật khẩu có thể chặn trước luồng email.
- **Cập nhật:** Các ca kiểm tra validity của field và dọn user nếu SUT bất ngờ tạo; expected không đổi.

### Prompt 3 — REG-02, REG-07 đến REG-12

- **Phạm vi:** Email trùng; thiếu mật khẩu; mật khẩu 7 ký tự; mật khẩu mạnh đúng 8 ký tự; lần lượt thiếu chữ hoa, chữ thường, chữ số.
- **File:** Cập nhật cùng `register.spec.ts` và `fr01-registration.json`; REG-02 tạo tài khoản fixture trước qua API.
- **Xác minh:** Chạy toàn bộ spec, **5 failed, 7 passed**. Failed: REG-01, REG-02, REG-03, REG-04, REG-09. Passed: REG-05, REG-06, REG-07, REG-08, REG-10, REG-11, REG-12.
- **Xác minh REG-02 riêng:** Failed; API chấp nhận email trùng (phản hồi 2xx). Luồng UI cũng bị validator mật khẩu chặn trước khi gọi API.
- **Finding:** Backend không đảm bảo email duy nhất; validator SUT từ chối mật khẩu hợp lệ đúng 8 ký tự.
- **Lỗi còn lại:** API vẫn nhận email trùng; validator mật khẩu vẫn từ chối mật khẩu hợp lệ và có thể làm ca âm pass vì lý do khác.
- **Cập nhật:** REG-02 dọn user setup và user phát sinh; các ca phân biệt response từ chối với response thành công.

## FR-07 — Giỏ hàng

### Prompt 4 — CART-01 đến CART-05

- **Phạm vi:** Giỏ trống và minh họa; tiêu đề cột; thêm một sản phẩm; gộp sản phẩm trùng; thêm hai sản phẩm khác nhau.
- **File:** [add-to-cart.spec.ts](../tests/cart/add-to-cart.spec.ts), [fr07-cart.json](../tests/cart/data/fr07-cart.json).
- **Dữ liệu:** Fixture JSON dùng các sản phẩm seed, trong đó AirPods có tên theo source `Tai nghe AirPods Pro 2`.
- **Expected theo đặc tả:** CART-01/02/04 được đánh dấu finding trong tên test; CART-03/05 là hành vi mong đợi thông thường.
- **Xác minh:** Không chạy test theo yêu cầu của người dùng. `git diff --check` sạch.
- **Lỗi còn lại:** Các sai khác SUT được giữ nguyên; locator hình minh họa của CART-01 còn rộng.
- **Cập nhật:** Quantity của CART-03/04 lấy từ fixture JSON; không thêm test.

### Prompt 5 — CART-06, CART-12, CART-13

- **Phạm vi:** Đơn giá/thành tiền; nhãn tổng chính xác “Tổng cộng”; link “Tiếp tục mua sắm” và điều hướng về trang chủ.
- **File:** Cập nhật [add-to-cart.spec.ts](../tests/cart/add-to-cart.spec.ts), [CartPage.ts](../tests/pages/CartPage.ts), [fr07-cart.json](../tests/cart/data/fr07-cart.json) và nhật ký này.
- **Finding theo source:** SUT dùng “Giá”, “Tổng tạm tính” và “← Mua tiếp”; các assertion giữ expected theo đặc tả.
- **Xác minh:** Không chạy test theo yêu cầu của người dùng.
- **Lỗi còn lại:** Nhãn tổng và link trên SUT vẫn khác đặc tả.
- **Cập nhật:** Quantity của CART-06 lấy từ fixture; expected label và link không đổi.

### Prompt 6 — CART-07 đến CART-10

- **Phạm vi:** Tăng số lượng và cập nhật thành tiền; không giảm dưới 1; yêu cầu xác nhận trước khi xóa; hủy xác nhận thì giữ sản phẩm.
- **File:** Cập nhật [add-to-cart.spec.ts](../tests/cart/add-to-cart.spec.ts), [fr07-cart.json](../tests/cart/data/fr07-cart.json) và nhật ký này.
- **Finding theo source:** SUT hiện không có nút tăng/giảm và xóa sản phẩm không hiện dialog; expected trong test vẫn theo đặc tả.
- **Xác minh:** Không chạy test theo yêu cầu của người dùng.
- **Lỗi còn lại:** SUT vẫn thiếu thao tác tăng/giảm và hộp thoại xác nhận xóa.
- **Cập nhật:** CART-09 kiểm tra tổng sau khi xóa một trong hai sản phẩm, qua đó phủ CART-11 mà không thêm test.

## FR-15 — Quản lý sản phẩm Admin

### Prompt 7 — PROD-01 đến PROD-04

- **Phạm vi:** Thêm sản phẩm hợp lệ; xem sản phẩm; sửa một sản phẩm và giữ nguyên các sản phẩm khác; xóa sản phẩm.
- **File:** [products.spec.ts](../tests/admin/products.spec.ts), [fr15-products.json](../tests/admin/data/fr15-products.json) và nhật ký này.
- **Dữ liệu:** Tên sản phẩm tạo mới dùng suffix ngẫu nhiên; fixture chứa tài khoản Admin demo, giá và danh mục seed.
- **Finding theo source:** Luồng sửa cập nhật tên mọi sản phẩm trong state UI dù API chỉ sửa ID được chọn; PROD-03 giữ expected theo đặc tả.
- **Xác minh:** Không chạy test theo yêu cầu của người dùng.
- **Lỗi còn lại:** SUT vẫn cập nhật tên nhiều sản phẩm trong UI khi chỉ sửa một sản phẩm.
- **Cập nhật:** PROD-03 sửa giá/danh mục và kiểm tra hai sản phẩm; PROD-02 kiểm tra đủ năm sản phẩm seed.

### Prompt 8 — PROD-05 đến PROD-12

- **Phạm vi:** Tên rỗng; tên 255/256 ký tự; giá 1/0/âm/trống; chọn và lưu danh mục có sẵn.
- **File:** Cập nhật [products.spec.ts](../tests/admin/products.spec.ts), [fr15-products.json](../tests/admin/data/fr15-products.json) và nhật ký này.
- **Dọn dữ liệu:** Mô tả sản phẩm gắn suffix duy nhất; sau mỗi ca chỉ xóa sản phẩm mang đúng mô tả fixture của ca đó, kể cả khi SUT chấp nhận dữ liệu không hợp lệ.
- **Finding theo source:** Form không giới hạn 255 ký tự, không bắt buộc/giới hạn giá dương; expected vẫn theo FR-15.
- **Xác minh:** Không chạy test theo yêu cầu của người dùng.
- **Lỗi còn lại:** SUT chưa validate đầy đủ độ dài tên và giá; ca bỏ trống danh mục không điều khiển được qua UI hiện tại.
- **Cập nhật:** Ca reject kiểm tra validity/response thay vì chỉ kiểm tra record; Playwright cấu hình thêm Firefox và WebKit, không thêm test case.

