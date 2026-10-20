**CS423 – CSC15003 – Software Testing (AI-augmented · 2026\)**

# HW02 – Domain Testing Report

Họ và tên: Trần Đình Luân\
MSSV: 23120059\
Nhóm: 03\


## 1. Feature selections

| Pool | Feature | FR ID |
| --- | --- | --- |
| A | Quản lý hồ sơ cá nhân | FR-04 |
| B | Thanh toán | FR-08 |
| C | Quản lý Danh mụ | FR-14 |
| D | Mobile (Thanh toán) | FR-20 |

## 2. Feature A - FR-04: Quản lý hồ sơ cá nhân

### 2.1 Domain Testing

#### 2.1.1 Step 1 - Xác định input/output

| Variable | Data type | Required / Optional | Valid domain | Invalid domain | Oracle |
| --- | --- | --- | --- | --- | --- |
| `token` | `string (JWT)` | Required | JWT hợp lệ của user | thiếu; sai định dạng; hết hạn | FR-04; FR-02 |
| `name` | `string` | Required | `độ dài sau trim ≥ 1` | `độ dài sau trim = 0` (trống/khoảng trắng) | FR-04; FR-01 |
| `phone` | `string` | Required | `10 ≤ độ dài ≤ 11`, bắt đầu `0`, ký tự `∈ [0-9]` | `1–9 chữ số`; `≥ 12 chữ số`; bắt đầu `≠ 0`; chứa ký tự `∉ [0-9]`; trống | FR-04 |
| `shipping_address` | `string` | Optional | chuỗi bất kỳ | `N/A` | FR-04 |
| `email` | `string` | Optional | không gửi hoặc `email = email hiện tại` | `email ≠ email hiện tại` | FR-04 |
| `role` | `string` | Optional | không gửi hoặc `role = role hiện tại` | `role ≠ role hiện tại` | FR-04 |
| `user_id` | `int` | Optional | không gửi hoặc `user_id = user hiện tại` | `user_id ≠ user hiện tại` | FR-04 |

#### 2.1.2 Step 2 - Phân thành các domain tương đương

| Variable | Domain ID | Domain description | Valid / Invalid |
| --- | --- | --- | --- |
| `token` | FR04-P1 | JWT hợp lệ của user | Valid |
| `token` | FR04-N1 | thiếu token | Invalid |
| `token` | FR04-N2 | token sai định dạng/hết hạn | Invalid |
| `name` | FR04-P2 | `độ dài sau trim ≥ 1` | Valid |
| `name` | FR04-N3 | `độ dài sau trim = 0` | Invalid |
| `phone` | FR04-P3 | `10 ≤ độ dài ≤ 11`, bắt đầu `0`, ký tự `∈ [0-9]` | Valid |
| `phone` | FR04-N4 | `1–9 chữ số` | Invalid |
| `phone` | FR04-N5 | `≥ 12 chữ số` | Invalid |
| `phone` | FR04-N6 | `10–11 chữ số`, bắt đầu `≠ 0` | Invalid |
| `phone` | FR04-N7 | `10–11 chữ số`, chứa ký tự `∉ [0-9]` | Invalid |
| `phone` | FR04-N8 | `0 chữ số` (trống) | Invalid |
| `shipping_address` | FR04-P4 | chuỗi bất kỳ | Valid |
| `email` | FR04-P5 | không gửi hoặc email hiện tại | Valid |
| `email` | FR04-N9 | `email ≠ email hiện tại` | Invalid |
| `role` | FR04-P6 | không gửi hoặc role hiện tại | Valid |
| `role` | FR04-N10 | `role ≠ role hiện tại` | Invalid |

#### 2.1.3 Step 3 - Test Cases

| Test case ID | Objective | Inputs | Expected output | Actual output | Pass / Fail |
| --- | --- | --- | --- | --- | --- |
| FR04-D01 | P1, P2, P3, P4, P5, P6, P7 — cập nhật hợp lệ | - Đã đăng nhập<br>- name: "Nguyễn Văn A"<br>- phone: "0912345678"<br>- shipping_address: "123 Lê Lợi, Q1" | Toast "Cập nhật thành công!"; hồ sơ hiển thị name/phone/address mới | Toast "Số điện thoại không hợp lệ" | Fail |
| FR04-D02 | N1 — thiếu token | - Chưa đăng nhập<br>- Mở trang Hồ sơ | Hiển thị "Vui lòng đăng nhập"; không mở form hồ sơ | Hiển thị "Vui lòng đăng nhập"; không mở form hồ sơ | Pass |
| FR04-D03 | N2 — token sai/hết hạn | - Chỉnh sửa token trong local storage thành "hehehe"<br>- Mở trang Hồ sơ | Chuyển trang đăng nhập hoặc hiển thị "Vui lòng đăng nhập"| Cập nhật thành công | Fail |
| FR04-D04 | N4 — phone 1–9 chữ số | - Đã đăng nhập; mở Hồ sơ<br>- phone: "091234567"<br>- Bấm Cập nhật | Toast "Số điện thoại không hợp lệ"; phone giữ nguyên | Toast "Số điện thoại không hợp lệ"; phone giữ nguyên | Pass |
| FR04-D05 | N5 — phone ≥ 12 chữ số | - Đã đăng nhập; mở Hồ sơ<br>- phone: "091234567890"<br>- Bấm Cập nhật | Toast "Số điện thoại không hợp lệ"; phone giữ nguyên | Toast "Số điện thoại không hợp lệ"; phone giữ nguyên | Pass |
| FR04-D06 | N6 — phone không bắt đầu 0 | - Đã đăng nhập; mở Hồ sơ<br>- phone: "1912345678"<br>- Bấm Cập nhật | Toast "Số điện thoại không hợp lệ"; phone giữ nguyên | Cập nhật thành công | Fail |
| FR04-D07 | N7 — phone chứa ký tự khác số | - Đã đăng nhập; mở Hồ sơ<br>- phone: "09123abc78"<br>- Bấm Cập nhật | Toast "Số điện thoại không hợp lệ"; phone giữ nguyên | Toast "Số điện thoại không hợp lệ"; phone giữ nguyên | Pass |
| FR04-D08 | N8 — phone trống | - Đã đăng nhập; mở Hồ sơ<br>- phone: ""<br>- Bấm Cập nhật | Toast "Số điện thoại không hợp lệ"; phone giữ nguyên | Toast "Số điện thoại không hợp lệ"; phone giữ nguyên | Pass |
| FR04-D09 | N9 — email khác email hiện tại | - Đã đăng nhập; mở Hồ sơ<br>- Thử sửa ô Email | Ô Email không thể nhấn vào và chỉnh sửa | Ô Email không thể nhấn vào và chỉnh sửa | Pass |
| FR04-D10 | N10 — role khác role hiện tại | - Đã đăng nhập user; mở Hồ sơ | Không có ô/nút sửa role; role không đổi | Không có ô/nút sửa role; role không đổi | Pass |
| FR04-D11 | P2 — cập nhật name | - Đã đăng nhập; mở Hồ sơ<br>- name: "Tên Mới"<br>- Giữ nguyên phone/address<br>- Bấm Cập nhật | Toast "Cập nhật thành công!"; name đổi, phone/address giữ nguyên | Toast "Cập nhật thành công!"; name đổi, phone/address giữ nguyên | Pass |
| FR04-D12 | N3 — name trống/khoảng trắng | - Đã đăng nhập; mở Hồ sơ<br>- name: " "<br>- phone hợp lệ<br>- Bấm Cập nhật | Toast "Họ Tên không được để trống"; name giữ nguyên | Cập nhật thành công | Fail |

### 2.2 Boundary Value Analysis

#### 2.2.1 Step 1 - Xác định các input có boundary value

| Variable | Boundary / threshold |
| --- | --- |
| `phone` | `10 ≤ độ dài ≤ 11` chữ số |
| `name` | `độ dài sau trim ≥ 1` |

#### 2.2.2 Step 2 - Boundary Table

| Variable | Boundary ID | min-1 | min | min+1 | max-1 | max | max+1 | Expected output |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `phone` | FR04-BD01 | 9 | 10 | 11 | 10 | 11 | 12 | 9/12: Toast lỗi; 10/11: Toast thành công |
| `name` | FR04-BD02 | 0 | 1 | 2 | N/A | N/A | N/A | 0: báo lỗi; 1/2: thành công |

#### 2.2.3 Step 3 - Test Cases

| Test case ID | Objective | Inputs | Expected output | Actual result | Pass / Fail |
| --- | --- | --- | --- | --- | --- |
| FR04-B01 | BD01 — phone 9 chữ số | - Đã đăng nhập; mở Hồ sơ<br>- phone: "091234567"<br>- Bấm Cập nhật | Toast "Số điện thoại không hợp lệ"; phone giữ nguyên | Toast "Số điện thoại không hợp lệ" | Pass |
| FR04-B02 | BD01 — phone 10 chữ số | - Đã đăng nhập; mở Hồ sơ<br>- phone: "0912345678"<br>- Bấm Cập nhật | Toast "Cập nhật thành công!"; phone mới hiển thị | Toast "Số điện thoại không hợp lệ" | Fail |
| FR04-B03 | BD01 — phone 11 chữ số | - Đã đăng nhập; mở Hồ sơ<br>- phone: "09123456789"<br>- Bấm Cập nhật | Toast "Cập nhật thành công!"; phone mới hiển thị | Toast "Số điện thoại không hợp lệ" | Fail |
| FR04-B04 | BD01 — phone 12 chữ số | - Đã đăng nhập; mở Hồ sơ<br>- phone: "091234567890"<br>- Bấm Cập nhật | Toast "Số điện thoại không hợp lệ"; phone giữ nguyên | Toast "Số điện thoại không hợp lệ" | Pass |
| FR04-B05 | BD02 — name 0 ký tự | - Đã đăng nhập; mở Hồ sơ<br>- name: ""<br>- phone hợp lệ<br>- Bấm Cập nhật | Form bắt buộc điền tên; name giữ nguyên | Form hiện "Please fill out this field"; name giữ nguyên | Pass |
| FR04-B06 | BD02 — name 1 ký tự | - Đã đăng nhập; mở Hồ sơ<br>- name: "A"<br>- phone hợp lệ<br>- Bấm Cập nhật | Toast "Cập nhật thành công!" | Toast "Cập nhật thành công!" | Pass |
| FR04-B07 | BD02 — name 2 ký tự | - Đã đăng nhập; mở Hồ sơ<br>- name: "AB"<br>- phone hợp lệ<br>- Bấm Cập nhật | Toast "Cập nhật thành công!" | Toast "Cập nhật thành công!" | Pass |

## 3. Feature B - FR-08: Thanh toán

### 3.1 Domain Testing

#### 3.1.1 Step 1 - Xác định input/output

| Variable | Data type | Required / Optional | Valid domain | Invalid domain | Oracle |
| --- | --- | --- | --- | --- | --- |
| `token` | `string (JWT)` | Required | JWT hợp lệ của user | thiếu; sai định dạng; hết hạn | FR-08 |
| `cart` | `array` | Required | `số sản phẩm ≥ 1` | `số sản phẩm = 0` | FR-08 |
| `total_amount` (client) | `number` | Optional | không gửi/trống hoặc số bất kỳ (backend bỏ qua) | `N/A` | FR-08 |
| `items` | `array` | Required | đủ sản phẩm trong giỏ | thiếu sản phẩm | FR-08 |
| `order_total` (output) | `number` | Required | `= tổng server tính từ giỏ` | `= total_amount client` | FR-08 |
| `cart_after_checkout` (output) | `array` | Required | `số sản phẩm = 0` | `số sản phẩm ≥ 1` | FR-08 |

#### 3.1.2 Step 2 - Phân thành các domain tương đương

| Variable | Domain ID | Domain description | Valid / Invalid |
| --- | --- | --- | --- |
| `token` | FR08-P1 | JWT hợp lệ của user | Valid |
| `token` | FR08-N1 | thiếu token | Invalid |
| `token` | FR08-N2 | token sai định dạng/hết hạn | Invalid |
| `cart` | FR08-P2 | `số sản phẩm ≥ 1` | Valid |
| `cart` | FR08-N3 | `số sản phẩm = 0` | Invalid |
| `total_amount` (client) | FR08-P3 | không gửi/trống hoặc số bất kỳ | Valid |
| `items` | FR08-P4 | đủ sản phẩm trong giỏ | Valid |
| `items` | FR08-N4 | thiếu sản phẩm | Invalid |
| `order_total` (output) | FR08-P5 | `= tổng server tính từ giỏ` | Valid |
| `order_total` (output) | FR08-N5 | `= total_amount client != tổng server tính từ giỏ` | Invalid |
| `cart_after_checkout` (output) | FR08-P6 | `số sản phẩm = 0` | Valid |
| `cart_after_checkout` (output) | FR08-N6 | `số sản phẩm ≥ 1` | Invalid |

#### 3.1.3 Step 3 - Test Cases

| Test case ID | Objective | Inputs | Expected output | Actual output | Pass / Fail |
| --- | --- | --- | --- | --- | --- |
| FR08-D01 | P1, P2, P3, P4, P5, P6 — thanh toán hợp lệ | - Đã đăng nhập<br>- cart: 2 sản phẩm, tổng 10000000<br>- total_amount: 10000000<br>- Bấm Xác Nhận Thanh Toán | Trang "Thanh toán thành công!"; đơn tổng 10000000; giỏ trống | Trang "Thanh toán thành công!"; đơn tổng 10000000; giỏ trống | Pass |
| FR08-D02 | N1 — thiếu token | - Chưa đăng nhập<br>- Mở trang Thanh toán | Chuyển trang đăng nhập hoặc "Vui lòng đăng nhập"; không tạo đơn | Toast "Bạn cần đăng nhập để tạo đơn" và chuyển hướng về trang đăng nhập | Pass |
| FR08-D03 | N2 — token sai/hết hạn | - Mở trang Thanh toán<br>- Chỉnh sửa token trong local storage thành "huhuhu" | Chuyển trang đăng nhập hoặc "Vui lòng đăng nhập"; không tạo đơn | Tạo đơn và thanh toán bình thường | Fail |
| FR08-D04 | N5 — order_total = 1 | - Đã đăng nhập; cart 10000000<br>- Sửa ô tổng tiền thành 1<br>- Bấm Xác Nhận Thanh Toán | Ô tổng tiền readonly | Người dùng chỉnh sửa được, và đơn hàng bị tính giá 1đ | Fail |
| FR08-D05 | N5 — order_total = 0 | - Đã đăng nhập; cart 10000000<br>- Sửa ô tổng tiền thành 0<br>- Bấm Xác Nhận Thanh Toán | Ô tổng tiền readonly | Người dùng chỉnh sửa được, và đơn hàng bị tính giá 0đ | Fail |
| FR08-D06 | N5 — order_total âm | - Đã đăng nhập; cart 10000000<br>- Sửa ô tổng tiền thành -100000<br>- Bấm Xác Nhận Thanh Toán | Ô tổng tiền readonly | Người dùng chỉnh sửa được, và đơn hàng bị tính giá -100000đ | Fail |
| FR08-D07 | N5 — order_total > thực tế | - Đã đăng nhập; cart 10000000<br>- Sửa ô tổng tiền thành 20000000<br>- Bấm Xác Nhận Thanh Toán | Ô tổng tiền readonly | Người dùng chỉnh sửa được, và đơn hàng bị tính giá 20000000đ | Fail |
| FR08-D08 | N5 — order_total không phải số | - Đã đăng nhập; cart 10000000<br>- Sửa ô tổng tiền thành "abc"<br>- Bấm Xác Nhận Thanh Toán | Ô tổng tiền không nhận chữ | Ô tổng tiền không nhận chữ | Pass |
| FR08-D09 | P3 — total_amount trống | - Đã đăng nhập; cart 10000000<br>- Xóa trắng ô tổng tiền<br>- Bấm Xác Nhận Thanh Toán | Không thanh toán được hoặc đơn vẫn 10000000 do server tính | Ô tổng tiền hiện 0 và thanh toán vẫn bị tính 0đ | Fail |
| FR08-D10 | N3 — giỏ rỗng | - Đã đăng nhập<br>- cart: 0 sản phẩm<br>- Mở trang Thanh toán | Hiển thị giỏ trống; không có nút thanh toán/không tạo đơn | Hiển thị giỏ trống; không có nút thanh toán/không tạo đơn | Pass |
| FR08-D11 | P4, N4 — hiển thị đủ items | - Đã đăng nhập<br>- cart: 2 sản phẩm<br>- Mở trang Thanh toán | Hiển thị đủ 2 tên, số lượng, thành tiền | Hiển thị đủ 2 tên, số lượng, thành tiền | Pass |
| FR08-D12 | P3 — total readonly | - Đã đăng nhập; cart có sản phẩm<br>- Mở trang Thanh toán | Ô tổng tiền readonly/disabled; không sửa được | Ô tổng tiền sửa được | Fail |
| FR08-D13 | P6, N6 — giỏ rỗng sau thanh toán | - Thanh toán thành công<br>- Mở Giỏ hàng/Lịch sử đơn | Giỏ trống, badge = 0; đơn mới có tổng đúng | Giỏ trống, badge = 0; đơn mới có tổng đúng | Pass |
| FR08-D14 | N5 — backend không tính lại tổng tiền | - Cart gồm 2 sản phẩm (AirPods Pro 2 + Keychron Q1) có tổng 10000000<br>- Thanh toán thành công<br>- Edit request, tăng số lượng Bàn phím Keychron lên 2 | Đơn được tạo có giá trị 14000000 | Đơn được tạo có giá trị 10000000 | Fail |

### 3.2 Boundary Value Analysis

#### 3.2.1 Step 1 - Xác định các input có boundary value

| Variable | Boundary / threshold |
| --- | --- |
| `cart` | `số sản phẩm ≥ 1` |

#### 3.2.2 Step 2 - Boundary Table

| Variable | Boundary ID | min-1 | min | min+1 | max-1 | max | max+1 | Expected output |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `cart` | FR08-BD01 | 0 | 1 | 2 | N/A | N/A | N/A | 0: không thanh toán; 1/2: thành công |

#### 3.2.3 Step 3 - Test Cases

| Test case ID | Objective | Inputs | Expected output | Actual result | Pass / Fail |
| --- | --- | --- | --- | --- | --- |
| FR08-B01 | BD01 — cart 0 sản phẩm | - Đã đăng nhập<br>- cart: 0 sản phẩm<br>- Mở trang Thanh toán | Hiển thị giỏ trống; không có nút thanh toán/không tạo đơn | Hiển thị giỏ trống; không có nút thanh toán/không tạo đơn | Pass |
| FR08-B02 | BD01 — cart 1 sản phẩm | - Đã đăng nhập<br>- cart: 1 sản phẩm "Bàn phím cơ Keychron Q1", tổng 4000000<br>- Bấm Xác Nhận Thanh Toán | Thanh toán thành công; đơn tổng 4000000; giỏ trống | Thanh toán thành công; đơn tổng 4000000; giỏ trống | Pass |
| FR08-B03 | BD01 — cart 2 sản phẩm | - Đã đăng nhập<br>- cart: 2 sản phẩm (AirPods Pro 2 + Keychron Q1), tổng 10000000<br>- Bấm Xác Nhận Thanh Toán | Thanh toán thành công; đơn tổng 10000000; giỏ trống | Thanh toán thành công; đơn tổng 10000000; giỏ trống | Pass |

## 4. Feature C - FR-14: Category Management

### 4.1 Domain Testing

#### 4.1.1 Step 1 - Xác định input/output

| Variable | Data type | Required / Optional | Valid domain | Invalid domain | Oracle |
| --- | --- | --- | --- | --- | --- |
| `token` | `string (JWT)` | Required | JWT hợp lệ của admin | thiếu; sai định dạng; hết hạn | FR-14; FR-12 |
| `role` | `string` | Required | `role = "admin"` | `role ≠ "admin"` | FR-14; FR-12 |
| `name` | `string` | Required | `độ dài sau trim ≥ 1` | `độ dài sau trim = 0` (trống/khoảng trắng) | FR-14 |
| `id` | `int` | Required | `id` của danh mục đang hiển thị | `id` không còn tồn tại (xóa lần 2) | FR-14 |
| `category_list` (output) | `array` | Required | chứa danh mục mới; không còn danh mục đã xóa | không đổi sau thao tác | FR-14 |

#### 4.1.2 Step 2 - Phân thành các domain tương đương

| Variable | Domain ID | Domain description | Valid / Invalid |
| --- | --- | --- | --- |
| `token` | FR14-P1 | JWT hợp lệ của admin | Valid |
| `token` | FR14-N1 | thiếu token | Invalid |
| `token` | FR14-N2 | token sai định dạng/hết hạn | Invalid |
| `role` | FR14-P2 | `role = "admin"` | Valid |
| `role` | FR14-N3 | `role ≠ "admin"` | Invalid |
| `name` | FR14-P3 | `độ dài sau trim ≥ 1` | Valid |
| `name` | FR14-N4 | `độ dài sau trim = 0` | Invalid |
| `id` | FR14-P4 | `id` của danh mục đang hiển thị | Valid |
| `id` | FR14-N5 | `id` không tồn tại | Invalid |
| `category_list` (output) | FR14-P5 | chứa danh mục mới; không còn danh mục xóa | Valid |
| `category_list` (output) | FR14-N6 | không đổi sau thao tác | Invalid |

#### 4.1.3 Step 3 - Test Cases

| Test case ID | Objective | Inputs | Expected output | Actual output | Pass / Fail |
| --- | --- | --- | --- | --- | --- |
| FR14-D01 | P1, P2, P3, P5, N6 — admin thêm hợp lệ | - Đăng nhập admin<br>- Mở Quản lý Danh mục<br>- name: "Điện tử"<br>- Bấm Thêm mới | Danh mục "Điện tử" xuất hiện trong bảng; không lỗi | Danh mục "Điện tử" xuất hiện trong bảng; không lỗi | Pass |
| FR14-D02 | N4 — name trống | - Đăng nhập admin; mở Quản lý Danh mục<br>- name: ""<br>- Bấm Thêm mới | Form báo "Tên danh mục là bắt buộc"; không thêm | Danh mục mới không có tên được thêm vào | Fail |
| FR14-D03 | N4 — name chỉ khoảng trắng | - Đăng nhập admin; mở Quản lý Danh mục<br>- name: "   "<br>- Bấm Thêm mới | Toast "Tên danh mục là bắt buộc"; không thêm | Danh mục mới có tên " " được thêm vào | Fail |
| FR14-D04 | N2 — token sai/hết hạn | - Mở Quản lý Danh mục<br>- Thay đổi token trong local storage thành "hahaha" | Chuyển trang đăng nhập | Vẫn còn ở trang Quản lý danh mục và có thể thêm danh mục bình thường | Fail |
| FR14-D05 | N1 — thiếu token | - Chưa đăng nhập<br>- Mở Admin | Trang Admin Login; không thấy Quản lý Danh mục | Chỉ thấy trang Admin Login; không thấy Quản lý Danh mục | Pass |
| FR14-D06 | N3 — role user | - Đăng nhập user<br>- Mở Admin | Không vào được Quản lý Danh mục; báo không có quyền | Toast "Bạn không phải là admin", không vào được web | Pass |
| FR14-D07 | P4 — xóa danh mục tồn tại | - Admin; danh mục "Điện tử"<br>- Bấm Xóa | Dòng "Điện tử" biến mất; danh sách cập nhật | Dòng "Điện tử" biến mất; danh sách cập nhật | Pass |
| FR14-D08 | N1 — thiếu token khi xóa | - Chưa đăng nhập<br>- Mở Quản lý Danh mục | Chuyển hướng về trang đăng nhập | Chuyển hướng về trang đăng nhập | Pass |
| FR14-D09 | P5 — admin xem danh sách | - Đăng nhập admin<br>- Mở Quản lý Danh mục | Bảng hiển thị ID, Tên Danh Mục, Hành động | Bảng hiển thị ID, Tên Danh Mục, Hành động | Pass |

### 4.2 Boundary Value Analysis

#### 4.2.1 Step 1 - Xác định các input có boundary value

| Variable | Boundary / threshold |
| --- | --- |
| `name` | `độ dài sau trim ≥ 1` |

#### 4.2.2 Step 2 - Boundary Table

| Variable | Boundary ID | min-1 | min | min+1 | max-1 | max | max+1 | Expected output |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `name` | FR14-BD01 | 0 | 1 | 2 | N/A | N/A | N/A | 0: báo lỗi; 1/2: thêm thành công |

#### 4.2.3 Step 3 - Test Cases

| Test case ID | Objective | Inputs | Expected output | Actual result | Pass / Fail |
| --- | --- | --- | --- | --- | --- |
| FR14-B01 | BD01 — name 0 ký tự | - Đăng nhập admin; mở Quản lý Danh mục<br>- name: ""<br>- Bấm Thêm mới | Form báo "Tên danh mục là bắt buộc"; không thêm | Vẫn thêm danh mục được bình thường | Fail |
| FR14-B02 | BD01 — name 1 ký tự | - Đăng nhập admin; mở Quản lý Danh mục<br>- name: "A"<br>- Bấm Thêm mới | Danh mục "A" xuất hiện trong bảng | Danh mục "A" xuất hiện trong bảng | Pass |
| FR14-B03 | BD01 — name 2 ký tự | - Đăng nhập admin; mở Quản lý Danh mục<br>- name: "AB"<br>- Bấm Thêm mới | Danh mục "AB" xuất hiện trong bảng | Danh mục "AB" xuất hiện trong bảng | Pass |

## 5. Feature D - FR-20: Mobile Application

### 5.1 Domain Testing

#### 5.1.1 Step 1 - Xác định input/output

| Variable | Data type | Required / Optional | Valid domain | Invalid domain | Oracle |
| --- | --- | --- | --- | --- | --- |
| `token` | `string (JWT)` | Required | JWT hợp lệ của user | thiếu; sai định dạng/hết hạn | FR-20; FR-08 |
| `cart` | `array` | Required | `số sản phẩm ≥ 1` | `số sản phẩm = 0` | FR-20; FR-08 |
| `items` | `array` | Required | `đủ sản phẩm trong giỏ` | `thiếu sản phẩm` | FR-20; FR-08 |
| `total_amount` (client) | `number` | Optional | không gửi/trống hoặc số bất kỳ (backend bỏ qua) | `N/A` | FR-20; FR-08 |
| `order_total` (output) | `number` | Required | `= tổng server tính từ giỏ` | `= total_amount client` | FR-20; FR-08 |
| `cart_after_checkout` (output) | `array` | Required | `số sản phẩm = 0` | `số sản phẩm ≥ 1` | FR-20; FR-08 |

#### 5.1.2 Step 2 - Phân thành các domain tương đương

| Variable | Domain ID | Domain description | Valid / Invalid |
| --- | --- | --- | --- |
| `token` | FR20-P1 | JWT hợp lệ của user | Valid |
| `token` | FR20-N1 | thiếu token/chưa đăng nhập | Invalid |
| `token` | FR20-N2 | token sai định dạng/hết hạn | Invalid |
| `cart` | FR20-P2 | `số sản phẩm ≥ 1` | Valid |
| `cart` | FR20-N3 | `số sản phẩm = 0` | Invalid |
| `items` | FR20-P3 | `đủ sản phẩm trong giỏ` | Valid |
| `items` | FR20-N4 | `thiếu sản phẩm` | Invalid |
| `total_amount` (client) | FR20-P4 | không gửi/trống hoặc số bất kỳ | Valid |
| `order_total` (output) | FR20-P5 | `= tổng server tính từ giỏ` | Valid |
| `order_total` (output) | FR20-N5 | `= total_amount client (khi lệch)` | Invalid |
| `cart_after_checkout` (output) | FR20-P6 | `số sản phẩm = 0` | Valid |
| `cart_after_checkout` (output) | FR20-N6 | `số sản phẩm ≥ 1` | Invalid |

#### 5.1.3 Step 3 - Test Cases

| Test case ID | Objective | Inputs | Expected output | Actual output | Pass / Fail |
| --- | --- | --- | --- | --- | --- |
| FR20-D01 | P1, P2, P3, P4, P5, P6 — thanh toán 1 sản phẩm hợp lệ | - Đã đăng nhập<br>- Giỏ: 1 sản phẩm "Bàn phím cơ Keychron Q1", tổng 4000000<br>- Mở Giỏ -> Tiến hành thanh toán<br>- Bấm Xác Nhận Thanh Toán | Màn hình "Thanh toán thành công!"; đơn mới tổng 4000000; giỏ trống | Màn hình "Thanh toán thành công!"; đơn mới tổng 4000000; giỏ trống | Pass |
| FR20-D02 | P1, P2, P3, P4, P5, P6 — thanh toán 2 sản phẩm | - Đã đăng nhập<br>- Giỏ: 2 sản phẩm (AirPods Pro 2 6000000 + Keychron Q1 4000000), tổng 10000000<br>- Mở Giỏ -> Tiến hành thanh toán | Màn hình "Thanh toán thành công!"; đơn mới tổng 10000000; giỏ trống | Màn hình "Thanh toán thành công!"; đơn mới tổng 10000000; | Pass |
| FR20-D03 | N1 — chưa đăng nhập | - Chưa đăng nhập<br>- Giỏ có 1 sản phẩm<br>- Mở Giỏ -> Tiến hành thanh toán | Alert "Bạn cần đăng nhập để thanh toán!"; chuyển màn hình Đăng nhập; | Alert "Bạn cần đăng nhập để thanh toán!"; chuyển màn hình Đăng nhập; | Pass |
| FR20-D04 | N3 — giỏ rỗng | - Đã đăng nhập<br>- Giỏ: 0 sản phẩm<br>- Mở Giỏ | Hiển thị "Giỏ hàng của bạn đang trống"; không có nút "Tiến hành thanh toán" | Hiển thị "Giỏ hàng của bạn đang trống"; không có nút "Tiến hành thanh toán" | Pass |
| FR20-D05 | P4 — tổng tiền readonly | - Đã đăng nhập<br>- Giỏ: 1 sản phẩm, tổng 4000000<br>- Mở Checkout<br>- Thử chạm/sửa ô "Tổng tiền thanh toán" | Ô tổng tiền disabled/không sửa được; vẫn hiển thị 4000000 | Ô tổng tiền disabled/không sửa được; vẫn hiển thị 4000000 | Pass |
| FR20-D06 | P6 — giỏ trống sau thanh toán | - Thanh toán thành công ở D01/D02<br>- Mở Giỏ; mở Hồ sơ -> Lịch sử đơn hàng | Giỏ trống, badge Giỏ (0); đơn mới trong Lịch sử có tổng đúng | Giỏ trống, badge Giỏ (0); đơn mới trong Lịch sử có tổng đúng | Pass |

### 5.2 Boundary Value Analysis

#### 5.2.1 Step 1 - Xác định các input có boundary value

| Variable | Boundary / threshold |
| --- | --- |
| `cart` | `số sản phẩm ≥ 1` |
| `quantity` | `số nguyên ≥ 1` |

#### 5.2.2 Step 2 - Boundary Table

| Variable | Boundary ID | min-1 | min | min+1 | max-1 | max | max+1 | Expected output |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `cart` | FR20-BD01 | 0 | 1 | 2 | N/A | N/A | N/A | 0: không thanh toán; 1/2: thanh toán thành công |
| `quantity` | FR20-BD02 | 0 | 1 | 2 | N/A | N/A | N/A | 0: không nhận/giữ 1; 1/2: thành tiền đúng |

#### 5.2.3 Step 3 - Test Cases

| Test case ID | Objective | Inputs | Expected output | Actual result | Pass / Fail |
| --- | --- | --- | --- | --- | --- |
| FR20-B01 | BD01 — cart 0 sản phẩm | - Đã đăng nhập<br>- cart: 0 sản phẩm<br>- Mở Giỏ | Hiển thị "Giỏ hàng của bạn đang trống"; không có nút thanh toán | Hiển thị "Giỏ hàng của bạn đang trống"; không có nút thanh toán | Pass |
| FR20-B02 | BD01 — cart 1 sản phẩm | - Đã đăng nhập<br>- cart: 1 sản phẩm "Bàn phím cơ Keychron Q1", tổng 4000000<br>- Bấm Tiến hành thanh toán -> Xác nhận | "Thanh toán thành công!"; đơn mới tổng 4000000; giỏ trống | "Thanh toán thành công!"; đơn mới tổng 4000000; giỏ trống | Pass |
| FR20-B03 | BD01 — cart 2 sản phẩm | - Đã đăng nhập<br>- cart: 2 sản phẩm (AirPods Pro 2 6000000 + Keychron Q1 4000000), tổng 10000000<br>- Bấm Tiến hành thanh toán -> Xác nhận | "Thanh toán thành công!"; đơn mới tổng 10000000; giỏ trống | "Thanh toán thành công!"; đơn mới tổng 10000000; giỏ trống | Pass |
| FR20-B04 | BD02 — quantity 0 | - Đã đăng nhập; giỏ có "Bàn phím cơ Keychron Q1"<br>- quantity: "0"<br>- Mở Giỏ | Không nhận 0; số lượng giữ 1; tổng 4000000 | Không nhận 0; số lượng giữ 1; tổng 4000000 | Pass |
| FR20-B05 | BD02 — quantity 1 | - Đã đăng nhập; giỏ có "Bàn phím cơ Keychron Q1"<br>- quantity: "1"<br>- Mở Giỏ | Thành tiền 4000000; tổng 4000000 | Số lượng tự nhảy lên thành 2; thành tiền 8000000; tổng 8000000 | Fail |
| FR20-B06 | BD02 — quantity 2 | - Đã đăng nhập; giỏ có "Bàn phím cơ Keychron Q1"<br>- quantity: "2"<br>- Mở Giỏ | Thành tiền 8000000; tổng 8000000 | Số lượng tự nhảy lên thành 3; thành tiền 12000000, tổng 12000000 | Fail |

## 6. AI Gap Analysis

| Gap ID | Problem | Cause |
| --- | --- | --- |
| G01 | Invalid domain FR04-N4 và FR04-N5 khoan sai khoảng invalid, độ dài của `phone` phải là <= 9 và >= 12 thay vì chỉ đúng 9 và 12 kí tự. Đã sửa thủ công.  | Giới hạn của AI tool |
| G02 | Các case từ FR08-D04 đền D09 bị sai expected output, đáng ra expected chỉ dừng lại ở việc không chỉnh sửa trực tiếp được `total`, thay vì giả sử. Đã sửa thủ công | Giới hạn của AI tool |
| G03 | Thiếu mất FR08-D14 nên không kiểm tra được requirement backend phải tính lại tổng đơn hàng. Đã thêm thủ công. | Giới hạn của AI tool |

## 7. Bug Report

| Bug ID | Title | FR | GitHub Issue |
| --- | --- | --- | --- |
| BUG-01 | Regex số điện thoại sai - từ chối số hợp lệ và chấp nhận số không bắt đầu bằng 0 | FR-04 | [[BUG-01 - FR-04]](https://github.com/naaul1/eshop-sut-2627/issues/25) |
| BUG-02 | Chấp nhận Họ Tên chỉ gồm khoảng trắng | FR-04 | [[BUG-02 - FR-04]](https://github.com/naaul1/eshop-sut-2627/issues/26) |
| BUG-03 | Ô tổng tiền thanh toán cho phép chỉnh sửa trực tiếp | FR-08 | [[BUG-03 - FR-08]](https://github.com/naaul1/eshop-sut-2627/issues/27)  |
| BUG-04 | Backend tin `total_amount` từ client, không tính lại từ giỏ/`items` | FR-08 | [[BUG-04 - FR-08]](https://github.com/naaul1/eshop-sut-2627/issues/28)  |
| BUG-05 | Chấp nhận tên danh mục rỗng hoặc chỉ gồm khoảng trắng | FR-14 | [[BUG-05 - FR-14]](https://github.com/naaul1/eshop-sut-2627/issues/29)  |
| BUG-06 | Ô số lượng trong giỏ mobile tự cộng thêm 1 | FR-20 | [[BUG-06 - FR-20]](https://github.com/naaul1/eshop-sut-2627/issues/30)  |

### 7.1 BUG-01 - FR-04: Regex số điện thoại sai - từ chối số hợp lệ và chấp nhận số không bắt đầu bằng 0

| Item | Value |
| --- | --- |
| FR reference | FR-04 |
| Spec reference | README.md — FR-04: "Số điện thoại hợp lệ: bắt đầu bằng số `0`, từ 10–11 chữ số." |
| Environment | Frontend Web (React + Vite), Chrome; Backend Node/Express `http://localhost:3000` |
| Preconditions | Đã đăng nhập `test@eshop.com`; mở trang Hồ sơ |
| GitHub Issue | [[BUG-01 - FR-04]](https://github.com/naaul1/eshop-sut-2627/issues/25) |

**Steps to reproduce**

| Step | Action | Input |
| --- | --- | --- |
| 1 | Mở trang Hồ sơ | — |
| 2 | Nhập số điện thoại 10 chữ số bắt đầu bằng 0, bấm Cập nhật | `0912345678` |
| 3 | Nhập số điện thoại 11 chữ số bắt đầu bằng 0, bấm Cập nhật | `09123456789` |
| 4 | Nhập số điện thoại bắt đầu bằng 1, bấm Cập nhật | `1912345678` |

**Expected result**

Bước 2, 3: cập nhật thành công.\
Bước 4: báo "Số điện thoại không hợp lệ", không cập nhật.

**Actual result**

Bước 2, 3: báo "Số điện thoại không hợp lệ".\ Bước 4: "Cập nhật thành công!" và số điện thoại sai được lưu.

### 7.2 BUG-02 - FR-04: Chấp nhận Họ Tên chỉ gồm khoảng trắng

| Item | Value |
| --- | --- |
| FR reference | FR-04 |
| Spec reference | README.md — FR-04: Họ Tên là trường bắt buộc khi cập nhật hồ sơ; FR-01: Họ Tên bắt buộc |
| Environment | Frontend Web (React + Vite), Chrome; Backend Node/Express `http://localhost:3000` |
| Preconditions | Đã đăng nhập `test@eshop.com`; mở trang Hồ sơ |
| GitHub Issue | [[BUG-02 - FR-04]](https://github.com/naaul1/eshop-sut-2627/issues/26) |

**Steps to reproduce**

| Step | Action | Input |
| --- | --- | --- |
| 1 | Mở trang Hồ sơ | — |
| 2 | Nhập Họ Tên chỉ gồm một khoảng trắng | `" "` |
| 3 | Nhập số điện thoại thỏa regex hiện tại của UI (xem BUG-01), bấm Cập nhật | `1912345678` |

**Expected result**

Báo "Họ Tên không được để trống"; hồ sơ giữ nguyên tên cũ.

**Actual result**

"Cập nhật thành công!"; hồ sơ lưu tên chỉ gồm khoảng trắng.


### 7.3 BUG-03 - FR-08: Ô tổng tiền thanh toán cho phép chỉnh sửa trực tiếp

| Item | Value |
| --- | --- |
| FR reference | FR-08 |
| Spec reference | README.md — FR-08: "Tổng tiền thanh toán được tính tự động từ giỏ hàng và không cho phép người dùng chỉnh sửa trực tiếp." |
| Environment | Frontend Web (React + Vite), Chrome; Backend Node/Express `http://localhost:3000` |
| Preconditions | Đã đăng nhập; giỏ có 2 sản phẩm (AirPods Pro 2 + Keychron Q1), tổng 10.000.000 ₫ |
| GitHub Issue | [[BUG-03 - FR-08]](https://github.com/naaul1/eshop-sut-2627/issues/27) |

**Steps to reproduce**

| Step | Action | Input |
| --- | --- | --- |
| 1 | Vào Giỏ hàng -> Tiến hành thanh toán | — |
| 2 | Nhấn vào ô "Tổng tiền thanh toán (VND)" và sửa thành 1, bấm Xác Nhận Thanh Toán | `1` |
| 3 | Lặp lại với các giá trị 0, -100000, 20000000 | `0`, `-100000`, `20000000` |

**Expected result**

Ô tổng tiền readonly/disabled, không sửa được; tổng luôn là 10.000.000 ₫.

**Actual result**

Ô tổng tiền sửa được; đơn hàng được tạo với đúng giá trị đã sửa (1 ₫, 0 ₫, -100.000 ₫, 20.000.000 ₫).

### 7.4 BUG-04 - FR-08: Backend tin `total_amount` từ client, không tính lại từ giỏ/`items`

| Item | Value |
| --- | --- |
| FR reference | FR-08 |
| Spec reference | README.md — FR-08: "Backend phải tự tính lại tổng tiền; không chấp nhận giá trị `total_amount` do client gửi lên." |
| Environment | Frontend Web (React + Vite), Chrome; Backend Node/Express `http://localhost:3000` |
| Preconditions | Đã đăng nhập; giỏ có 2 sản phẩm: AirPods Pro 2 (6.000.000 ₫) + Keychron Q1 (4.000.000 ₫), tổng 10.000.000 ₫ |
| GitHub Issue | [[BUG-04 - FR-08]](https://github.com/naaul1/eshop-sut-2627/issues/28) |

**Steps to reproduce**

| Step | Action | Input |
| --- | --- | --- |
| 1 | Vào Checkout, mở DevTools -> Network, chuột phải request `POST /api/checkout` -> **Edit and Resend as fetch** | — |
| 2 | Tăng `quantity` của Keychron Q1 từ 1 lên 2 trong `items`, giữ nguyên `total_amount` | `total_amount: 10000000` |
| 3 | Gửi request đã sửa trong DevTools, mở Lịch sử đơn hàng | — |

**Expected result**

Đơn mới có tổng 14.000.000 ₫ (server tính lại từ `items`) hoặc báo lỗi lệch tổng; không tạo đơn 10.000.000 ₫.

**Actual result**

Đơn mới được tạo với tổng 10.000.000 ₫; `items` bị bỏ qua hoàn toàn. Sửa trực tiếp `total_amount` thành 1/0/-100000 cũng tạo đơn với đúng giá trị đó.

### 7.5 BUG-05 - FR-14: Chấp nhận tên danh mục rỗng hoặc chỉ gồm khoảng trắng

| Item | Value |
| --- | --- |
| FR reference | FR-14 |
| Spec reference | README.md — FR-14: "Tên danh mục là bắt buộc, không được để trống." |
| Environment | Web Admin (React + Vite) `http://localhost:5174`; Backend Node/Express `http://localhost:3000` |
| Preconditions | Đã đăng nhập admin; mở tab Quản lý Danh mục |
| GitHub Issue | [[BUG-05 - FR-14]](https://github.com/naaul1/eshop-sut-2627/issues/29)  |

**Steps to reproduce**

| Step | Action | Input |
| --- | --- | --- |
| 1 | Mở Quản lý Danh mục | — |
| 2 | Để trống ô "Tên danh mục mới", bấm Thêm mới | `""` |
| 3 | Nhập toàn khoảng trắng, bấm Thêm mới | `"   "` |

**Expected result**

Form báo "Tên danh mục là bắt buộc"; không thêm danh mục.

**Actual result**

Danh mục mới được thêm với tên rỗng/" " và xuất hiện trong bảng.

### 7.6 BUG-06 - FR-20: Ô số lượng trong giỏ mobile tự cộng thêm 1

| Item | Value |
| --- | --- |
| FR reference | FR-20 |
| Spec reference | README.md — FR-06: "Số lượng (chỉ nhận số nguyên dương, tối thiểu là 1)"; FR-20: mobile phải có đầy đủ chức năng Giỏ hàng/Thanh toán |
| Environment | Expo Go (Android); Backend Node/Express `http://10.0.104.86:3000` |
| Preconditions | Đã đăng nhập; giỏ có "Bàn phím cơ Keychron Q1" (4.000.000 ₫) |
| GitHub Issue | [[BUG-06 - FR-20]](https://github.com/naaul1/eshop-sut-2627/issues/30)  |

**Steps to reproduce**

| Step | Action | Input |
| --- | --- | --- |
| 1 | Mở Giỏ hàng | — |
| 2 | Xóa ô Số lượng của Keychron Q1 và nhập 1 | `1` |
| 3 | Xóa ô Số lượng và nhập 2 | `2` |

**Expected result**

Số lượng đúng bằng giá trị nhập: 1 -> thành tiền 4.000.000 ₫; 2 -> thành tiền 8.000.000 ₫.

**Actual result**

Nhập 1 -> số lượng thành 2, thành tiền 8.000.000 ₫; nhập 2 -> số lượng thành 3, thành tiền 12.000.000 ₫.

## Appendix A


### AI Audit repot

See [`[AI-02] - FIT@HCMUS - AI Audit Report_Vn.md`](<[AI-02] - FIT@HCMUS - AI Audit Report_Vn>).

### AI Critique

See [`AICritique.md`](AICritique.md)
