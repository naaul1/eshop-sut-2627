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

**[ER-FR09-01]** *Áp dụng sai công thức giảm giá*
Chi tiết lỗi:
- Dữ liệu đầu vào:
{
    "code": "SAVE10",
    "total_amount": "500000"
}
(áp dụng giảm giá 10% cho đơn 500.000 đ)
- Dữ liệu đầu ra:
{
    "discount_amount": -4500000, 
    "final_amount": 5000000
}
(giá tiền sau giảm giá là 5.000.000 đ)
- Mô tả lỗi: Chương trình áp dụng sai công thức giảm giá theo %
- Screenshot: ![alt text](bug-report/er-fr09-01.png)

**[ER-FR09-02]** *Chương trình không kiểm tra người dùng đã đăng nhập và có JWT hợp lệ khi áp dụng coupon*
Screenshot: ![alt text](bug-report/er-fr09-02.png)

