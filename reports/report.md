# 1. Thông tin tổng quan

## 1.1. Thông tin sinh viên
- Họ tên: Võ Thiện Nhân
- MSSV: 23120066
- Nhóm: 3

## 1.2. Thông tin hệ thống kiểm thử
- Tên hệ thống: EShop — Phiên bản dành cho Kiểm thử Phần mềm
- Link repo: https://github.com/naaul1/eshop-sut-2627 (branch: vtnhan-hw03)
- Môi trường kiểm thử:
    + OS: Windows 11
    + Browser: Opera GX, Chrome, Firefox, Expo Go
    + Mobile: Android 13

# 2. Nội dung thực hiện bài tập

## Task 1. GUI Checklist

### a. Checklist: 

**Kết quả do AI sinh:** [ai-checklist](ai-artifacts/gui-checklist-authentication.md)

**Các ý AI sai hoặc bỏ sót:**
- Chưa kiểm tra việc sử dụng ngôn ngữ đồng nhất trên toàn bộ ứng dụng
- Chưa kiểm tra bố cục UI ở các tỉ lệ zoom trên 200%
- Trùng lặp ở cái ý kiểm tra phản hồi nút khi double click, hiển thị mã OTP, che mật khẩu,...
- Chưa kiểm tra nút hỗ trợ ẩn/hiện mật khẩu
- Chưa kiểm tra kiểu dữ liệu được chấp nhận ở ô OTP
- Chưa kiểm tra điều hướng khi người dùng đã đăng nhập tìm cách truy cập trang đăng ký/đăng nhập

**Các ý đã sửa đổi, bổ sung:**
- **Thêm các item:** 
    + UI-15: sử dụng đồng nhất ngôn ngữ tiếng Việt trên giao diện
    + FRM-23: nút ẩn/hiện mật khẩu
    + FRM-24: ràng buộc kiểu dữ liệu nhập cho ô OTP
    + NAV-13: điều hướng người dùng khi đã đăng nhập
- **Chỉnh sửa các item:** 
    + UI-08: bổ sung kiểm tra ở tỉ lệ zoom 300% và 400%
    + FRM-13: thay đổi điều kiện chấp nhận để phù hợp với mô tả và không trùng với FB-07
- **Loại bỏ các item:**
    + FRM-09
    + FRM-11
    + FRM-16

**Nguyên nhân AI bỏ sót các item đã được thêm:**
Nguyên nhân chủ yếu khiến AI bỏ sót các item cần kiểm tra là vì prompt đã yêu cầu AI tạo checklist dựa trên đặc tả của SUT. Khi tạo checklist AI đã bám theo đặc tả được ghi trong file README.md, còn các yêu cầu được bổ sung không có trong đặc tả, cụ thể:
- UI-15: Đây là yêu cầu quan trọng về sự nhất quán trong giao diện, đã bị AI bỏ qua vì đặc tả không yêu cầu.
- FRM-23: Đây là 1 trong những chức năng quan trọng hỗ trợ người dùng trong trường hợp cần kiểm tra lỗi gõ phím, đã bị AI bỏ qua vì đặc tả không yêu cầu.
- FRM-24: Đây là 1 ràng buộc giao diện hỗ trợ người dùng mobile trong việc nhập liệu ở các trường bắt buộc kiểu số, đã bị AI bỏ qua vì đặc tả không yêu cầu.

NAV-13 bị bỏ sót có khả năng là do hạn chế trong suy luận của AI khi không xét đến trường hợp người dùng đã đăng nhập nhưng cố truy cập vào trang /login hoặc /register.

**Kết quả sau sửa đổi, bổ sung:** [gui-checklist](gui-checklist.md)

### b. Thực hiện kiểm tra GUI trên SUT

## Task 2. Usability Evaluation

## Task 3. Cross-Browser / Cross-Platform

# 3. Agent Skill

# 4. AI Critique

# 5. AI Audit Report
    Xem file: ai-templates/[AI-02]-FIT@HCMUS-AI_Audit_Report_Vn.md

# 6. Mandatory Disclosure



```
    Các file FR-03_boundary_test_cases.xlsx, FR-03_domain_test_cases.xlsx, FR-09_boundary_test_cases.xlsx, FR-09_domain_test_cases.xlsx, FR-17_boundary_test_cases.xlsx, FR-17_domain_test_cases.xlsx được sinh phiên bản đầu bởi Github Copilot; tôi đã rà soát và chỉnh sửa 1 số dữ liệu đầu vào, bổ sung các test cases TC-FR03-38, TCB-FR03-30 đến TCB-FR03-34,  TC-FR17-29 đến TC-FR17-34, miền không hợp lệ cho OTP: sai OTP; REPORT.md, README.md và BUG-REPORT.md do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm.
```