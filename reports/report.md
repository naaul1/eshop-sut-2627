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
**FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)**
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

### 2.1.4. Điểm AI bỏ sót
    AI đã bỏ qua trường hợp OTP được nhập đúng định dạng nhưng không khớp với mã do hệ thống sinh ra. Bên cạnh đó, AI chỉ kiểm tra 2/7 ký tự đặc biệt trong yêu cầu của mật khẩu (@, $, !, %, *, ?, &). Lý do AI bỏ sót các trường hợp trên có thể do thiếu sót trong skill được sử dụng để sinh test cases khi chỉ tập trung phân miền giá trị theo kiểu dữ liệu và định dạng mà không yêu cầu kiểm tra tính hợp lệ của dữ liệu.

### 2.1.5. Kết quả kiểm thử
**Các lỗi tìm được** (chi tiết trong file BUG-REPORT.md)**:**
- ER-FR03-01: Chương trình sinh và nhận mã OTP gồm 4 chữ số thay vì 6.
- ER-FR03-02: Chương trình chấp nhận sai điều kiện mật khẩu mới.
- ER-FR03-03: Giao diện không có nút Quay lại đăng nhập và chỉ báo số bước.
- ER-FR03-04: Giao diện đổi mật khẩu thiếu trường Xác nhận mật khẩu mới.