# 1. Thông tin tổng quan

## 1.1. Thông tin sinh viên
- Họ tên: Võ Thiện Nhân
- MSSV: 23120066
- Nhóm: 3

## 1.2. Thông tin hệ thống kiểm thử
- Tên hệ thống: EShop — Phiên bản dành cho Kiểm thử Phần mềm
- Link repo: https://github.com/naaul1/eshop-sut-2627
- Môi trường kiểm thử:
    + OS: Windows 11
    + Browser: VS Code Integrated Browser
    + Mobile: Android 13

## 1.3. Các chức năng kiểm thử
- Pool A: FR-03 - Quên mật khẩu & Đặt lại mật khẩu (2 bước)
- Pool B: FR-09 - Mã Giảm Giá (Coupon)
- Pool C: FR-17 - Quản lý Mã Giảm Giá (Coupon CRUD)
- Pool D:

# 2. Nội dung kiểm thử từng chức năng

## 2.1. FR-03 - Quên mật khẩu & Đặt lại mật khẩu (2 bước)

### 2.1.1. Đặc tả
*Bước 1 — Lấy mã OTP:*
- Người dùng nhập địa chỉ Email đã đăng ký.
- Hệ thống sinh mã OTP 6 chữ số ngẫu nhiên và gửi qua Email (trong môi trường demo: hiển thị trực tiếp trên màn hình).
- Giao diện phải hiển thị chỉ báo bước (Step Indicator) — ví dụ: "Bước 1 / 2".
- Có nút Quay lại đăng nhập.

*Bước 2 — Đặt lại mật khẩu:*
- Người dùng nhập OTP, Mật khẩu mới, và Xác nhận mật khẩu mới.
- Mật khẩu mới phải tuân thủ điều kiện như FR-01.
- Hai trường mật khẩu phải khớp nhau.
- OTP chỉ hợp lệ cho email đã yêu cầu, không thể dùng cho email khác.

### 2.1.2. Áp dụng Domain Testing
**a. Các biến và các miền tương đương**
| Tên biến | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ |
|---|---|---|---|
| Email yêu cầu OTP | Chuỗi | Email hợp lệ, đã đăng ký | Sai format; rỗng; whitespace-only; null/thiếu; email hợp lệ nhưng chưa đăng ký |
| OTP | Chuỗi chữ số | Đúng 6 chữ số, do hệ thống sinh cho email đã yêu cầu | Khác 6 chữ số; chứa ký tự không phải số; rỗng; whitespace-only; null/thiếu; hết hạn/đã dùng |
| Email gắn với OTP | Chuỗi | Trùng email đã dùng ở bước 1 | Khác email đã dùng ở bước 1 |
| Mật khẩu mới | Chuỗi | Tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số và ít nhất một ký tự trong `@ $ ! % * ? &` | Rỗng; whitespace-only; null/thiếu; ngắn hơn 8 ký tự; thiếu chữ hoa; thiếu chữ thường; thiếu chữ số; thiếu ký tự đặc biệt hợp lệ; chỉ dùng ký tự đặc biệt không thuộc tập cho phép |
| Xác nhận mật khẩu mới | Chuỗi | Trùng chính xác mật khẩu mới | Khác mật khẩu mới; rỗng; whitespace-only; null/thiếu |
| Chỉ báo bước | Số nguyên | Hiển thị đúng bước x/2 ở từng bước | Thiếu chỉ báo; hiển thị sai bước hoặc sai tổng số bước |
| Nút quay lại đăng nhập | UI | Hiển thị và điều hướng về trang đăng nhập | Không hiển thị hoặc không điều hướng đúng |

**b. Kết hợp và chọn giá trị đại diện**
- Cách chọn giá trị đại diện: 
    + Với các lớp valid: Chọn giá trị để bao phủ nhiều lớp hợp lệ nhất có thể.
    + Với các lớp invalid: Chọn giá trị để đảm bảo chỉ bao phủ 1 lớp không hợp lệ ở mỗi test case, tránh kết hợp nhiều lỗi trong cùng 1 test case để đảm bảo không bỏ sót lỗi do trùng test case với lỗi khác.
- Cách kết hợp trong trường hợp kiểm thử nhiều biến: Ưu tiên *one-factor-at-a-time*, mỗi test case thay một biến trong khi các biến còn lại giữ giá trị hợp lệ chuẩn.

**c. Danh sách Test Cases**
    Xem file: [fr03-domain-testing](FR-03_domain_test_cases.xlsx)

### 2.1.3. Áp dụng Boundary Value Analysis
**a. Xác định các giá trị biên và thiết kế giá trị kiểm thử tại biên**
| Tên biến | Biên cần kiểm thử | Các điểm biên |
|---|---|---|
| OTP | Độ dài yêu cầu | 5, 6, 7 chữ số |
| Email tương ứng với OTP | Trùng/khác với email yêu cầu | Trùng hoặc khác |
| Mật khẩu mới | Biên độ dài tối thiểu | 7, 8, 9 ký tự |
| Mật khẩu mới | Số lượng chữ hoa/chữ thường/chữ số/ký tự đặc biệt | 0, 1, 2 ký tự |
| Xác nhận mật khẩu mới | Trùng/khác Mật khẩu mới | Trùng hoặc khác |
| Chỉ báo số bước | Số chỉ báo tại mỗi bước | Giá trị hợp lệ tại mỗi bước |

**b. Danh sách Test Cases**
    Xem file: [fr03-bva](FR-03_boundary_test_cases.xlsx)

### 2.1.4. Điểm AI làm sai
    AI đã bỏ qua trường hợp OTP được nhập đúng định dạng nhưng không khớp với mã do hệ thống sinh ra. Bên cạnh đó, AI chỉ kiểm tra 2/7 ký tự đặc biệt trong yêu cầu của mật khẩu (@, $, !, %, *, ?, &). Lý do AI bỏ sót các trường hợp trên có thể do thiếu sót trong skill được sử dụng để sinh test cases khi chỉ tập trung phân miền giá trị theo kiểu dữ liệu và định dạng mà không yêu cầu kiểm tra tính hợp lệ của dữ liệu.

### 2.1.5. Kết quả kiểm thử
**Các lỗi tìm được** (chi tiết trong file BUG-REPORT.md)**:**
- ER-FR03-01: Chương trình sinh và nhận mã OTP gồm 4 chữ số thay vì 6.
- ER-FR03-02: Chương trình chấp nhận sai điều kiện mật khẩu mới.
- ER-FR03-03: Giao diện không có nút Quay lại đăng nhập và chỉ báo số bước.
- ER-FR03-04: Giao diện đổi mật khẩu thiếu trường Xác nhận mật khẩu mới.

## 2.2. FR-09 - Mã giảm giá (Coupon)

### 2.2.1. Đặc tả
Tại bước Checkout, người dùng có thể nhập mã giảm giá. Hệ thống áp dụng giảm giá dựa trên **5 điều kiện** sau, tất cả phải thỏa mãn:

| #   | Điều kiện              | Mô tả                                                       |
| --- | ---------------------- | ----------------------------------------------------------- |
| C1  | **Mã tồn tại**         | Mã phải có trong CSDL và đang hoạt động (`is_active = 1`)   |
| C2  | **Còn hạn sử dụng**    | Ngày hiện tại phải trước `expired_at`                       |
| C3  | **Đủ ngưỡng đơn hàng** | Tổng đơn hàng **>= (lớn hơn hoặc bằng)** `min_order_amount` |
| C4  | **Đã đăng nhập**       | Người dùng phải có JWT Token hợp lệ                         |
| C5  | **Chưa dùng hết lượt** | Số lần đã dùng mã này của user < `max_uses_per_user`        |

**Công thức tính giảm giá:**

- Loại `percent`: `discount_amount = total × discount_value / 100`
- Loại `fixed`: `discount_amount = discount_value`
- `final_amount = total - discount_amount`

**Mã giảm giá mẫu trong hệ thống:**

| Mã        | Loại    | Giá trị   | Ngưỡng tối thiểu | Hạn dùng   | Số lần/người |
| --------- | ------- | --------- | ---------------- | ---------- | ------------ |
| `SAVE10`  | percent | 10%       | 300,000 ₫        | 2099-12-31 | 1            |
| `BIGBUY`  | fixed   | 50,000 ₫  | 500,000 ₫        | 2099-12-31 | 1            |
| `VIP100`  | fixed   | 100,000 ₫ | 300,000 ₫        | 2099-12-31 | 2            |
| `EXPIRED` | percent | 20%       | 100,000 ₫        | 2020-01-01 | 1            |

### 2.2.2. Áp dụng Domain Testing
**a. Các biến và các miền tương đương**
| Tên biến | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ |
|---|---|---|---|
| `code` / mã coupon | Chuỗi | Mã tồn tại trong CSDL và `is_active = 1`; chuỗi chuẩn theo mã đã cấp | Không tồn tại; tồn tại nhưng `is_active != 1`; sai kiểu; rỗng; whitespace-only; `null`/thiếu |
| Trạng thái `expired_at` | Ngày/giờ lưu trong coupon | Thời điểm hiện tại trước `expired_at` | Hiện tại bằng hoặc sau `expired_at`; định dạng không hợp lệ, thiếu, `null`, timezone không rõ (chưa có luật xử lý) |
| `total_amount` | Số tiền | Số hợp lệ và thỏa `total_amount >= min_order_amount` | Số hợp lệ nhưng thấp hơn ngưỡng; sai kiểu; rỗng; whitespace-only; `null`/thiếu; số âm/0 |
| JWT Token | Chuỗi header Authorization | JWT hợp lệ và xác thực thành công | Thiếu; sai scheme/cấu trúc; chữ ký không hợp lệ; đã hết hạn; `null`/rỗng (nếu header nhận được) |
| `user_id` | Số nguyên trong JSON body | User hợp lệ, theo quan hệ với JWT nếu hệ thống yêu cầu | Sai kiểu; rỗng; `null`/thiếu; user không tồn tại; không khớp JWT |
| Số lần user đã dùng mã | Số nguyên do hệ thống lưu | `used_count < max_uses_per_user` | `used_count = max_uses_per_user`; `used_count > max_uses_per_user` |
| `min_order_amount` | Số tiền lưu trong coupon | Giá trị số dùng được để so sánh với `total_amount` | Sai kiểu; rỗng; `null`/thiếu; đơn vị/độ chính xác không tương thích (chưa được đặc tả) |
| Kết quả giảm giá | JSON chứa số tiền | `discount_amount` và `final_amount` theo công thức đã nêu | Thiếu field; kiểu không phải số |

**b. Kết hợp và chọn giá trị đại diện** (như mục 2.1.2)

**c. Danh sách Test Cases**
    Xem file: [fr09-domain-testing](FR-09_domain_test_cases.xlsx)

### 2.2.3. Áp dụng Boundary Value Analysis
**a. Xác định các giá trị biên và thiết kế giá trị kiểm thử tại biên**
| Tên biến | Biên cần kiểm thử | Các điểm biên |
|---|---|---|
| code | Độ dài yêu cầu | 5, 6, 7 chữ số |
| Giá trị đơn hàng | Giá trị đơn hàng tối thiểu áp dụng voucher | min, min-1, min+1 |
| Thời gian áp dụng | Thời gian hết hạn voucher | bằng expired_at, ngay trước expired_at, ngay sau expired_at |
| Số lần áp dụng voucher | Giới hạn áp dụng voucher mỗi người | max, max-1, max+1 |

**b. Danh sách Test Cases**
    Xem file: [fr09-bva](FR-09_boundary_test_cases.xlsx)

### 2.2.4. Điểm AI làm sai
    AI đã đưa vào các test cases không thể thực hiện test trên web client. Nguyên nhân là do prompt không ghi rõ chức năng này trên web client dành cho khách mua hàng.

### 2.2.5. Kết quả kiểm thử
**Các lỗi tìm được** (chi tiết trong file BUG-REPORT.md)**:**
- ER-FR09-01: Áp dụng sai công thức giảm giá.
- ER-FR09-02: Chương trình không kiểm tra người dùng đã đăng nhập và có JWT hợp lệ khi áp dụng coupon.
- ER-FR09-03: Coupon bị từ chối áp dụng tại đúng ngưỡng min của giá đơn hàng.

## 2.3. FR-17 - Quản lý Mã Giảm Giá (Coupon CRUD)

### 2.3.1. Đặc tả
- Admin có thể Thêm / Xem / Xóa mã giảm giá.
- Các trường bắt buộc: `code` (duy nhất), `type` (percent/fixed), `discount_value` (dương), `expired_at`, `min_order_amount` (>= 0), `max_uses_per_user` (>= 1).

### 2.3.2. Áp dụng Domain Testing
| Tên biến | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ |
|---|---|---|---|
| `code` | Chuỗi | Không rỗng, nhập trên form; sau khi nhập UI chuẩn hóa thành chữ hoa; chưa tồn tại khi tạo | Rỗng/thiếu; chỉ whitespace; mã đã tồn tại |
| `type` | Enum select | `percent`; `fixed` | Không có lựa chọn khác trên UI |
| `discount_value` | Số trên input number | Số dương (`> 0`) | Rỗng; 0; số âm; sai định dạng số |
| `expired_at` | Ngày trên input date | Có ngày được nhập | Rỗng/thiếu |
| `min_order_amount` | Số tiền trên input number | Số `>= 0`, UI mặc định 0 | Rỗng nếu field bị bỏ trống và backend không nhận mặc định; số âm; sai định dạng số |
| `max_uses_per_user` | Số lần trên input number | Số nguyên `>= 1`; UI đặt `min="1"` | Rỗng; 0; số âm; số thực/chuỗi sai kiểu nếu UI cho nhập |
| Xem danh sách coupon | Dữ liệu hiển thị | Coupon đã tạo xuất hiện với mã, loại, giá trị, ngưỡng, hạn, giới hạn/người | Không tải được danh sách; coupon không hiển thị hoặc hiển thị sai trường |
| Xóa coupon | Thao tác và trạng thái | Nút Xóa loại bỏ coupon khỏi danh sách sau thao tác thành công | Không có nút; xóa không thành công nhưng UI báo thành công; coupon vẫn còn sau refresh |

**b. Kết hợp và chọn giá trị đại diện** (như mục 2.1.2)

**c. Danh sách Test Cases**
    Xem file: [fr17-domain-testing](FR-17_domain_test_cases.xlsx)

### 2.3.3. Áp dụng Boundary Value Analysis
