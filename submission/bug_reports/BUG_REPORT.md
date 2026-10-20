# BÁO CÁO LỖI (BUG REPORT) - ESHOP SUT

## 1. Bảng Tổng Hợp Lỗi
| Bug ID | Feature | Tiêu đề lỗi (Title) | Mức độ (Severity) | GitHub Issue Link |
| :--- | :--- | :--- | :--- | :--- |
| BUG-01 | FR-01 (Pool A) | Mật khẩu không bắt buộc ký tự đặc biệt như mô tả | High | [Issue #1](https://github.com/...) |
| BUG-02 | FR-07 (Pool B) | Giá trị "Tổng cộng" hiển thị sai nhãn thành "Tổng tạm tính" | Low | [Issue #2](https://github.com/...) |

---

## 2. Chi Tiết Các Lỗi 
### BUG-01: Mật khẩu không bắt buộc ký tự đặc biệt
- **Feature:** FR-01 (Account Registration)
- **Các bước tái hiện (Steps to Reproduce):**
  1. Truy cập trang Đăng ký.
  2. Nhập Email hợp lệ, Họ tên hợp lệ.
  3. Nhập mật khẩu `Password123` (không có ký tự đặc biệt).
  4. Nhấn nút "Đăng ký".
- **Kết quả thực tế (Actual Result):** Hệ thống tạo tài khoản thành công.
- **Kết quả mong đợi (Expected Result):** Báo lỗi mật khẩu yếu theo đúng FR-01 (cần chứa ít nhất 1 ký tự đặc biệt).
- **Hình ảnh minh họa / GitHub Issue:**
  - GitHub Link: [Link tới GitHub Issue #1](https://github.com/...)
  - Screenshot:
    ![BUG-01 Screenshot](./screenshots/bug_01.png)