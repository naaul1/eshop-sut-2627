**[ER-FR03-01]** *Chương trình sinh và nhận mã OTP gồm 4 chữ số thay vì 6.*
- Screenshot: ![alt text](bug-report/er-fr03-01.png)

**[ER-FR03-02]** *Chương trình chấp nhận sai điều kiện mật khẩu mới.*
Mật khẩu dùng để test:
- NewPass1! -> rejected
Screenshot: ![alt text](bug-report/er-fr03-02-1.png)
- New Pass12 -> accepted 
Screenshot: ![alt text](bug-report/er-fr03-02-2.png)

Điều kiện kiểm tra thực tế trong chương trình:
- Tối thiểu 8 ký tự
- Có ít nhất 1 chữ thường và 1 chữ hoa
- Có ít nhất 1 số
- Có ít nhất 1 khoảng trắng
- Không có ý tự đặc biệt ngoài chữ hoa, chữ thường, số và khoảng trắng

**[ER-FR03-03]** *Giao diện không có nút Quay lại đăng nhập và chỉ báo số bước.*
Screenshot: ![alt text](bug-report/er-fr03-03.png)

**[ER-FR03-04]** *Giao diện đổi mật khẩu thiếu trường Xác nhận mật khẩu mới*
Screenshot: ![alt text](bug-report/er-fr03-04.png)

