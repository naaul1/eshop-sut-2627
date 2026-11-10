# 1. Thông tin tổng quan

## 1.1. Thông tin sinh viên
- Họ tên: Võ Thiện Nhân
- MSSV: 23120066
- Nhóm: 3

## 1.2. Thông tin hệ thống kiểm thử
- Tên hệ thống: EShop — Phiên bản dành cho Kiểm thử Phần mềm
- Link repo: https://github.com/naaul1/eshop-sut-2627 (branch: vtnhan-hw03)
Trang issues: https://github.com/naaul1/eshop-sut-2627/issues
- Môi trường kiểm thử:
    + OS: Windows 11
    + Browser: Opera GX (Task 1), Chrome, Firefox (Task 3)
    + Mobile: Android 13 (Expo Go)

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
    + FRM-25: bàn phím trên mobile không che ô nhập dữ liệu
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
- FRM-23: Đây là một trong những chức năng quan trọng hỗ trợ người dùng trong trường hợp cần kiểm tra lỗi gõ phím, đã bị AI bỏ qua vì đặc tả không yêu cầu.
- FRM-24: Đây là ràng buộc giao diện hỗ trợ người dùng mobile trong việc nhập liệu ở các trường bắt buộc kiểu số, đã bị AI bỏ qua vì đặc tả không yêu cầu.
- FRM-25: Đây là ràng buộc giao diện quan trọng giúp người dùng kiểm tra lại dữ liệu đã nhập, đã bị AI bỏ qua vì đặc tả không yêu cầu.

NAV-13 bị bỏ sót có khả năng là do hạn chế trong suy luận của AI khi không xét đến trường hợp người dùng đã đăng nhập nhưng cố truy cập vào trang /login hoặc /register.

**Kết quả sau sửa đổi, bổ sung:** [gui-checklist](gui-checklist.md)

### b. Thực hiện kiểm tra GUI trên SUT

**Kết quả thực hiện:**
- Tổng số test: 68
- PASS: 41
- FAIL: 25
- Không kiểm tra: 2

**Các lỗi tìm được:**
Xem [bug-report](bug-report.md) - mục Task 1

## Task 2. Usability Evaluation

### a. Chuẩn bị
**Luồng thực hiện đánh giá:** Đăng ký tài khoản -> Đăng nhập -> Đăng xuất -> Quên mật khẩu -> Đăng nhập
**Mục tiêu thực hiện đánh giá:** Để xác định những khó khăn người dùng có thể gặp phải khi điều hướng giữa các luồng và những trường nhập liệu gây khó khăn cho người dùng.
**Kịch bản đánh giá:**
```
    Hãy đăng ký tài khoản mới và đăng nhập vào hệ thống, sau đó đăng xuất, đổi mật khẩu và đăng nhập lại.
```
**Thang đánh giá:** UEQ-S
**Người dùng tham gia đánh giá:**
- Gia Bảo - 038****517
- Tài Võ - 082****515
- Trí Dũng - 097****329

### b. Thực hiện đánh giá và báo cáo
**Kết quả đánh giá:** Item 1-8 là các item trong thang UEQ-S
| User No. | Item 1 | Item 2 | Item 3 | Item 4 | Item 5 | Item 6 | Item 7 | Item 8 | Pragmatic Quality | Hedonic Quality | UEQ-S |
|-|-|-|-|-|-|-|-|-|-|-|-|
| 1 | -1 | 1 | -1 | -3 | -2 | -1 | -2 | -2 | -1.00 | -1.75 | -1.38 |
| 2 | 0 | -3 | -3 | 0 | -1 | -1 | -3 | -3 | -1.50 | -2.00 | -1.75 |
| 3 | 1 | 0 | 1 | 2 | 2 | 0 | 1 | 2 | 1.00 | 1.25 | 1.13 |
| Trung bình | 0 | -0.67 | -1 | -0.33 | -0.33 | -0.67 | -1.33 | -1 | -0.50 | -0.83 | -0.67 |
**Pain point phổ biến:** 
| Pain point | Severity |
| Không thể đặt mật khẩu đúng theo yêu cầu (vì hệ thống nhận sai yêu cầu mật khẩu, là lỗi ER-FR03-02 đã ghi nhận ở HW#02) | High - làm kẹt luồng |
| Người dùng nhầm lẫn họ tên và email ở màn hình Đăng nhập (vì ER-UI-11) | High |
| Người dùng khó đọc điều kiện mật khẩu mạnh ở màn hình đăng ký | Medium |
**Báo cáo lỗi:**
Xem [bug-report](bug-report.md) - Mục Task 2


## Task 3. Cross-Browser / Cross-Platform

### a. Kết quả thực hiện trên Chrome
[task3-chrome](gui-checklist-task3-chrome.xlsx)
Screenshot lỗi trong folder [task3-chrome](bug-report/task3-chrome)
Không tìm thấy lỗi mới so với Task 1

### b. Kết quả thực hiện trên Firefox
[task3-firefox](gui-checklist-task3-firefox.xlsx)
Screenshot lỗi trong folder [task3-firefox](bug-report/task3-firefox)
Không tìm thấy lỗi mới so với Task 1

### c. Kết quả thực hiện trên Expo Go
[task3-expo-go](gui-checklist-task3-expo-go.xlsx)
Screenshot lỗi trong folder [task3-expo-go](bug-report/task3-expo-go)
**Các lỗi tìm được:** (không liệt kê lại các lỗi đã có trong task 1)
- ER-FRM-M06
- ER-NAV-M01
- ER-FB-M11

# 3. Agent Skill
**Skill đã sử dụng:**
- [ai-audit-log](../.agents/skills/ai-audit-log): sử dụng để ghi log các lần prompt
- [gui-checklist](../.agents/skills/gui-checklist): sử dụng để tạo GUI checklist

# 4. AI Critique
Trong quá trình làm bài tập này, AI đã sinh tương đối đầy đủ cái item cần kiểm tra, nhưng đã bỏ qua một số item quan trọng ảnh hưởng trực tiếp đến trải nghiệm người dùng. Nguyên nhân chủ yếu là do tôi đã yêu cầu AI sinh ra checklist dựa trên đặc tả của hệ thống, còn các item bị bỏ sót là cái yêu cầu chung về thiết kế GUI mà không được viết trong đặc tả. Qua đó, tôi rút ra được kinh nghiệm là cần viết prompt yêu cầu AI kiểm tra thêm các yêu cầu phổ biến ảnh hưởng đến người dùng thay vì bám hoàn toàn vào đặc tả, cũng như cần kiểm tra kỹ lưỡng kết quả do AI sinh ra trước khi sử dụng.

# 5. AI Audit Report
Xem file: ai-templates/[AI-02]-FIT@HCMUS-AI_Audit_Report_Vn.md

# 6. Mandatory Disclosure
Skill gui-checklist được sinh bởi Claude Sonnet 5.5, file gui-checklist.md được sinh phiên bản đầu bởi Github Copilot, là file gui-checklist-authentication.md trong folder ai-artifacts, file gui-checklist.xlsx được sinh bởi Github Copilot dựa trên file gui-checklist.md sau khi tôi chỉnh sửa; tôi đã rà soát và thêm các item UI-15, FRM-23, FRM-24, FRM-25, NAV-13; chỉnh sửa các item UI-08, FRM-13; loại bỏ các item FRM-09, FRM-11, FRM-16; các phần còn lại do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm.