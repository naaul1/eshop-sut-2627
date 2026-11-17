# 1. Thông tin tổng quan

## 1.1. Thông tin sinh viên
- Họ tên: Võ Thiện Nhân
- MSSV: 23120066
- Nhóm: 3

## 1.2. Thông tin hệ thống kiểm thử
- Tên hệ thống: EShop — Phiên bản dành cho Kiểm thử Phần mềm
- Link repo: https://github.com/naaul1/eshop-sut-2627 (branch: vtnhan-hw04)
Trang issues: https://github.com/naaul1/eshop-sut-2627/issues
- Môi trường kiểm thử:
    + OS: Windows 11
    + Browser: Chrome, Firefox, Webkit
    + Mobile: không thực hiện trong bài tập này
- Các tính năng sẽ kiểm thử:
    + FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)
    + FR-09: Mã Giảm Giá (Coupon)
    + FR-17: Quản lý Mã Giảm Giá (Coupon CRUD)

# 2. Nội dung thực hiện bài tập

## Task 1. AI-generated automation scripts

**a. FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)**
- Test data: [fr03-data](../tests/FR-03/forgot-password-cases.json)
- Test script: [fr03-script](../tests/FR-03/forgot-password.spec.ts)
- POM: [fr03-pom](../tests/pages/ForgotPasswordPage.ts)
- Quá trình thực hiện:
1. Yêu cầu AI phân tích tính năng Quên mật khẩu theo spec được ghi trong README.md, bao gồm luồng hoạt động và UI, sau đó liệt kê các selector cần sử dụng. <br>
*Prompt:* <đính kèm file README.md>
```
Phân tích UI và luồng liên quan đến tính năng FR-03, liệt kê các selector cần sử dụng
```
2. Yêu cầu AI tạo POM cho tính năng đã phân tích. <br>
*Prompt:* 
```
Tạo POM tương ứng với tính năng trên
```
3. Yêu cầu AI tạo test script cho các test case được chỉ định. <br>
*Prompt:* <đính kèm file [fr03-tc](ai-artifacts/FR-03_domain_test_cases.md)>
```
Viết test script cho các test case: TC-FR03-01 đến TC-FR03-04, TC-FR03-11, TC-FR03-12, TC-FR03-17 đến TC-FR03-20, TC-FR03-22 đến TC-FR03-27
Đảm bảo các test được thực hiện theo dạng data-driven bằng cách import data từ file .json (nếu có thể), thực hiện test trên 3 trình duyệt là Chrome, Firefox và WebKit và sử dụng ít nhất 3 assertion pattern khác nhau.
```
4. Chạy test và đối chiếu kết quả với kết quả ở HW#02; kiểm tra lại script do AI sinh ra, chỉnh sửa các lỗi tìm thấy.
5. Yêu cầu AI tổng hợp session vừa làm việc để tạo skill áp dụng automation testing bằng Playwright. <br>
*Prompt:*
```
Tổng hợp các tác vụ đã thực hiện trong session này thành skill playwright-web-testing
Đầu vào là mã tính năng và mã test case (nếu không có mã test case thì mặc định thực hiện tất cả các test case liên quan đến tính năng đó), file spec và file test cases.
Đầu ra là mã nguồn POM, file test script và file test data.
```
- Các lỗi sai của AI đã phát hiện:
    + TC-FR03-01 muốn kiểm tra mã OTP bao gồm chính xác 6 chữ số những script do AI sinh ra chấp nhận mã 4 chữ số. Nguyên nhân có thể do hạn chế của AI, trong quá trình sinh test script, AI đã đọc source code sinh OTP và chấp nhận kết quả được sinh ra là mã có 4 chữ số thay vì xác định là lỗi.
    + Ở các test case cần đọc thông tin trên dialog, script do AI sinh ra đã không thể tương tác để đóng dialog dẫn đến test fail do timeout và làm sai lệch kết quả test. Nguyên nhân có thể do hạn chế của AI.
- Kết quả test: 
    + Số test đã thực hiện: 48 (16 test mỗi browser)
    + Số test pass: 42 (14 test mỗi browser)
    + Số test fail: 6 (2 test mỗi browser)

**b. FR-09: Mã Giảm Giá (Coupon)**
- Test data: [fr09-data](../tests/FR-09/coupon-cases.json)
- Test script: [fr09-script](../tests/FR-09/coupon.spec.ts)
- POM: [fr09-pom](../tests/pages/CouponPage.ts)
- Quá trình thực hiện:
1. Yêu cầu AI áp dụng skill đã tạo ở FR-03 để tạo test data, script và POM cho FR-09. <br>
*Prompt:* <đính kèm file README.md và [fr09-tc](ai-artifacts/FR-09_domain_test_cases.md)>
```
/playwright-web-testing tính năng: FR-09
test cases: TC-FR09-01 đến TC-FR09-06, TC-FR09-09, TC-FR09-11, TC-FR09-31, TC-FR09-32, TC-FR09-34, TC-FR09-35
Nút "Áp dụng" không bấm được xem như rejected
```
2. Chạy test và đối chiếu kết quả với kết quả ở HW#02; kiểm tra lại script do AI sinh ra, chỉnh sửa các lỗi tìm thấy.
- Các lỗi sai của AI đã phát hiện:
    + Ở TC-FR09-03, khi áp dụng coupon đã hết hạn sử dụng, status code trả về nên là 422 (Unprocessable Content) hoặc chấp nhận thay thế bằng status code 400 (Bad Request), nhưng AI đã kiểm tra status code 404 (Not Found) dành cho trường hợp coupon vốn không tồn tại, Từ đó dẫn đến sai lệch trong kết quả test. Nguyên nhân có thể là do prompt và đặc tả không quy định rõ status code cho từng trường hợp.
- Kết quả thực hiện test:
    + Số test đã thực hiện: 36 (12 test mỗi browser)
    + Số test pass: 27 (9 test mỗi browser)
    + Số test fail: 9 (3 test mỗi browser)

**c. FR-17: Quản lý Mã Giảm Giá (Coupon CRUD)**
- Test data: [fr17-data](../tests/FR-17/fr17-cases.json)
- Test script: [fr17-script](../tests/FR-17/fr17.spec.ts)
- POM: [fr17-pom](../tests/pages/AdminCouponPage.ts)
- Quá trình thực hiện:
1. Yêu cầu AI áp dụng skill đã tạo ở FR-03 để tạo test data, script và POM cho FR-17. <br>
*Prompt:* <đính kèm file README.md và [fr17-tc](ai-artifacts/FR-17_domain_test_cases.md)>
```
/playwright-web-testing tính năng: FR-17
test case: TC-FR17-03 đến TC-FR17-05, TC-FR17-07 đến TC-FR17-22
```
2. Chạy test và đối chiếu kết quả với kết quả ở HW#02; kiểm tra lại script do AI sinh ra.
- Các lỗi sai của AI đã phát hiện: Không có
- Kết quả thực hiện test:
    + Số test đã thực hiện: 57 (19 test mỗi browser)
    + Số test pass: 48 (16 test mỗi browser)
    + Số test fail: 9 (3 test mỗi browser)

## Task 2. Demo video

# 3. Agent Skill

**Skill đã sử dụng:**
- [ai-audit-log](../.agents/skills/ai-audit-log): dùng để ghi nhận lượt làm việc với AI vào tài liệu AI Audit Report
- [playwright-web-testing](../.agents/skills/playwright-web-testing): dùng để sinh test case cho các tính năng FR-09 và FR-17

# 4. AI Critique

Trong quá trình thực hiện bài tập này, AI đã sinh ra POM, test script và data tương đối chính xác, tuy nhiên còn mắc lỗi về xử lý dialog của browser ở FR-03, khiến script không thể đọc được nội dung dialog dẫn đến fail do timeout, gây ảnh hưởng đến kết quả test. Nguyên nhân của sai sót trên có thể đến từ hạn chế của model. Bên cạnh đó, ở FR-09, AI đã sử dụng sai status code cho trường hợp coupon đã hết hạn, nguyên nhân có thể là do trong prompt và trong đặc tả của tính năng không quy định rõ ràng status code cho các trường hợp. Qua đó, tôi rút ra kinh nghiệm khi áp dụng AI trong bài tập này là cần chạy thử và kiểm tra kỹ lưỡng tất cả code do AI sinh ra, và cần ràng buộc chặt chẽ về status code trong tài liệu đặc tả khi sử dụng AI để sinh test script.

# 5. AI Audit Report

Xem file: [ai-02](ai-templates/[AI-02]-FIT@HCMUS-AI_Audit_Report_Vn.md)

# 6. Mandatory Disclosure

Skill playwright-web-testing, các test script, test data, POM trong thư mục[tests](../tests) được sinh bản đầu bởi Github Copilot; tôi đã rà soát, chạy thử script và sửa một số lỗi đã được liệt kê ở các mục trên; các phần còn lại do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm.