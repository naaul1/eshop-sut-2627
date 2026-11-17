**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# **AI Audit Report — Mẫu 5 mục cho mỗi Artifact**

*Phụ lục bắt buộc đính kèm cho mọi bài tập có dùng AI (HW#01–HW#06, Seminar).*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm.*

## **1. Thông tin Sinh viên**

|Mục|Giá trị|
|-|-|
|**Họ tên sinh viên (in hoa):**|VÕ THIỆN NHÂN|
|**MSSV:**|23120066|
|**Lớp / Khoá:**|23_3|
|**Mã bài tập:**|HW#04|
|**Ngày làm bài:**|17/11/2026|
|**Công cụ AI đã dùng:**|Github Copilot|
|**Công cụ AI đã dùng:**|[x] Có  [] Không|

## **2. Hướng dẫn (đọc trước khi điền)**

* Thêm 1 hàng cho mỗi artifact AI sinh (test case, script, checklist, OpenAPI spec, JMeter plan…).
* Dán nguyên văn prompt — KHÔNG paraphrase.
* Dán nguyên văn output AI (hoặc kèm screenshot có chú thích trong báo cáo).
* Gắn nhãn: VALID / INVALID / INCOMPLETE.
* Lý do phải dẫn chiếu slide, mục ISTQB, hoặc RFC kỹ thuật.
* Hiển thị bản sửa với phần thay đổi được tô sáng.
* Hàng mẫu in nghiêng — thay trước khi nộp.

## **3. Bảng Audit — 1 hàng / artifact**

|(1) Prompt + Công cụ|(2) Output AI|(3) Verdict|(4) Lý do (ISTQB)|(5) Bản SV sửa|
|-|-|-|-|-|
|Công cụ: GitHub Copilot<br>Timestamp: 2026-11-16T17:32:06+07:00<br>Prompt: Phân tích UI và luồng liên quan đến tính năng FR-03, liệt kê các selector cần sử dụng<br><br>[tagged_files]<br>* d:\N4_HK1_QAQC\eshop-sut-2627\README.md (289 lines)|Phân tích đặc tả FR-03, component ForgotPassword, Login, route và API backend; mô tả luồng 2 bước, liệt kê selector thực tế/khuyến nghị và chỉ ra các điểm lệch spec như thiếu step indicator, OTP 4 chữ số, thiếu xác nhận mật khẩu mới và nút quay lại đăng nhập.| VALID |  |  |
|Công cụ: GitHub Copilot<br>Timestamp: 2026-11-16T17:34:31+07:00<br>Prompt: Tạo POM tương ứng với tính năng trên|Đã tạo page object TypeScript cho luồng FR-03 tại tests/pages/ForgotPasswordPage.ts, gồm mở trang, đi từ Login, nhập email, yêu cầu OTP, kiểm tra bước 2, đọc thông báo OTP, reset mật khẩu và quay lại bước 1.| VALID |  |  |
|Công cụ: GitHub Copilot<br>Timestamp: 2026-11-16T19:06:26+07:00<br>Prompt: Viết test script cho các test case: TC-FR03-01 đến TC-FR03-04, TC-FR03-11, TC-FR03-12, TC-FR03-17 đến TC-FR03-20, TC-FR03-22 đến TC-FR03-27<br>Đảm bảo các test được thực hiện theo dạng data-driven bằng cách import data từ file .json (nếu có thể), thực hiện test trên 3 trình duyệt là Chrome, Firefox và WebKit và sử dụng ít nhất 3 assertion pattern khác nhau.<br><br>[tagged_files]<br>* d:\N4_HK1_QAQC\eshop-sut-2627\reports\ai-artifacts\FR-03_domain_test_cases.md (73 lines)<br>* d:\N4_HK1_QAQC\eshop-sut-2627\tests\FR-03\forgot-password.spec.ts (0 lines)|Đã tạo test script Playwright data-driven tại tests/FR-03/forgot-password.spec.ts và dữ liệu tại tests/FR-03/forgot-password-cases.json; bao phủ 16 test case, chạy trên 3 browser project trong cấu hình hiện có, sử dụng nhiều assertion pattern và tái sử dụng ForgotPasswordPage.| INCOMPLETE | AI sử dụng sai assertion cho TC-FR03-01 (chấp nhận cả OTP 4 và 6 chữ số), AI sinh sai code xử lý dialog | [tests\FR-03\forgot-password.spec.ts] dòng 75 sửa thành "expect(message).toMatch(/Mã OTP của bạn là: \d{6}/);", các phần liên quan đến dialog: thêm cụm page.on('dialog', ...), loại bỏ code do AI sinh ra. |
|Công cụ: GitHub Copilot<br>Timestamp: 2026-11-17T16:09:54+07:00<br>Prompt: Tổng hợp các tác vụ đã thực hiện trong session này thành skill playwright-web-testing<br>Đầu vào là mã tính năng và mã test case (nếu không có mã test case thì mặc định thực hiện tất cả các test case liên quan đến tính năng đó), file spec và file test cases.<br>Đầu ra là mã nguồn POM, file test script và file test data.<br><br>[tagged_files]<br>* d:\N4_HK1_QAQC\eshop-sut-2627\tests\FR-03\forgot-password.spec.ts (186 lines)|Đã tạo skill tái sử dụng tại .agents/skills/playwright-web-testing/SKILL.md, quy định đầu vào mã tính năng/test case/spec/test data và đầu ra POM, test script TypeScript, JSON data; bao gồm data-driven testing, locator strategy, assertion patterns, Chromium/Firefox/WebKit và các bước validation.| VALID |  |  |
|Công cụ: GitHub Copilot<br>Timestamp: 2026-11-17T17:16:53+07:00<br>Prompt: The user explicitly invoked the "/playwright-web-testing" skill. Follow its instructions now.<br>ARGUMENTS: tính năng: FR-09<br>test cases: TC-FR09-01 đến TC-FR09-06, TC-FR09-09, TC-FR09-11, TC-FR09-31, TC-FR09-32, TC-FR09-34, TC-FR09-35<br>Nút "Áp dụng" không bấm được xem như rejected<br><br>[tagged_files]<br>* d:\N4_HK1_QAQC\eshop-sut-2627\README.md (289 lines)<br>* d:\N4_HK1_QAQC\eshop-sut-2627\reports\ai-artifacts\FR-09_domain_test_cases.md (91 lines)|Đã tạo tests/pages/CouponPage.ts, tests/FR-09/coupon-cases.json và tests/FR-09/coupon.spec.ts; discovery có 12 case trên Chromium, Firefox và WebKit. Chạy Chromium: 9 passed, 3 failed; các lỗi được ghi nhận tại TC-FR09-03 (seed TEST active nhưng hết hạn) và TC-FR09-31/34 (công thức percent trả discount_amount -4500000 thay vì 50000).| INCOMPLETE | Ở TC-FR09-03: áp dụng coupon đã hết hạn sử dụng, AI expect kết quả trả về có status code 404 dành cho coupon không tồn tại. | [tests/FR-09/coupon-cases.json] TC-FR09-03: "expected": { "status": 400, ...} |
|Công cụ: GitHub Copilot<br>Timestamp: 2026-11-17T18:11:36+07:00<br>Prompt: The user explicitly invoked the "/playwright-web-testing" skill. Follow its instructions now.<br>ARGUMENTS: tính năng: FR-17<br>test case: TC-FR17-03 đến TC-FR17-05, TC-FR17-07 đến TC-FR17-22<br><br>[tagged_files]<br>* d:\N4_HK1_QAQC\eshop-sut-2627\reports\ai-artifacts\FR-17_domain_test_cases.md (83 lines)|Đã tạo [tests/pages/AdminCouponPage.ts], [tests/FR-17/fr17-cases.json] và [tests/FR-17/fr17.spec.ts]. Discovery: 19 case trên mỗi browser project, tổng 57 test instances. Chromium: 16 passed, 3 failed; TC-FR17-12/13/16 fail đúng theo đặc tả vì giao diện không chặn discount_value bằng 0/âm và min_order_amount âm.| VALID |  |  |

## **4. Tổng kết Độ chính xác AI**

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

|Chỉ số|Số lượng|Tỉ lệ|
|-|-|-|
|**Tổng artifact AI sinh đã audit**|6|100%|
|**VALID (đúng, dùng nguyên)**|4|67%|
|**INVALID (sai; loại bỏ)**|0|0%|
|**INCOMPLETE (chấp nhận sau khi sửa)**|2|33%|

## **5. Kết luận — Khi nào nên / không nên dùng AI?**

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này?

## **6. Mandatory Disclosure (dán nguyên văn)**

## **Chữ ký**

|Họ tên sinh viên (in hoa):|VÕ THIỆN NHÂN|
|-|-|
|**MSSV:**|23120066|
|**Lớp / Khoá:**|23_3|
|**Môn học:**|CS423 / CSC13003 – Kiểm chứng Phần mềm|
|**Giảng viên:**|Lâm Quang Vũ|
|**Ngày:**|17/11/2026|
|**Chữ ký:**|vothiennhan|

## **Tham khảo**

* Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.
* ISTQB Foundation Level Syllabus (latest version).
* Hardman, P. (2025). A Post-AI Learning Taxonomy.
* Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.
* Perkins, M., Roe, J., \& Furze, L. (2025). AI Assessment Scale.
* Anthropic (2025). Building reliable AI test agents — engineering blog.
* DeepEval \& Promptfoo documentation — testing frameworks for LLM systems.
