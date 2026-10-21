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
|**Mã bài tập:**|HW#02|
|**Ngày làm bài:**|20/10/2026|
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
| Công cụ: GitHub Copilot<br>Timestamp: 2026-10-15T23:02:26+07:00<br>Prompt: "Follow instructions in #prompt:SKILL.md with these arguments: Sau khi thực hiện 1 prompt, ghi nhận lượt làm việc đó vào file reports\\[AI-02\\]-FIT@HCMUS-AI_Audit_Report_Vn.md, ở mục 3. Bảng Audit — 1 hàng / artifact, với entry ghi rõ: tên công cụ AI sử dụng, timestamps và câu prompt ở cột (1), output từ AI ở cột (2), các cột còn lại để trống" | Đã tạo `.agents/skills/ai-audit-log/SKILL.md` theo hướng dẫn agent customization và kiểm tra thành công frontmatter, đường dẫn báo cáo, cùng các điều kiện ghi audit row. | VALID |  |  |
| Công cụ: GitHub Copilot<br>Timestamp: 2026-10-18T23:35:34+07:00<br>Prompt: "Follow instructions in #prompt:SKILL.md with these arguments: Tạo skill tên domain-testing<br>1. Skill làm gì:<br>Khi tôi đưa một yêu cầu/spec, phân tích các biến đầu vào và sinh test case theo kỹ thuật domain testing: phân vùng tương đương (equivalence partitioning)<br>Với mỗi biến: xác định miền hợp lệ/không hợp lệ và các lớp tương đương, chưa cần phân tích giá trị biên<br><br>2. Đầu ra:<br>- Bảng biến: tên, kiểu dữ liệu, miền hợp lệ, miền không hợp lệ<br>- Bảng test case: ID, biến, lớp tương đương, giá trị test, kết quả mong đợi.<br>- Với nhiều biến: nêu cách kết hợp (mỗi lần chỉ thay một biến, hoặc pairwise).<br>- Xuất ra Markdown, (và Excel (.xlsx) nếu tôi yêu cầu).<br><br>3. Quy tắc riêng:<br>- Luôn ghi rõ giả định nếu spec thiếu giới hạn.<br>- Xử lý cả kiểu số, chuỗi (độ dài, ký tự đặc biệt, Unicode, tiếng Việt có dấu), ngày giờ, enum, và giá trị rỗng/null.<br>- Không bịa quy tắc nghiệp vụ; chỗ nào mơ hồ thì yêu cầu tôi xác nhận.<br><br>4. Ví dụ để test skill:<br>- "Trường tuổi nhận số nguyên từ 18 đến 60"<br>- "Mật khẩu 8-20 ký tự, phải có chữ hoa và số"<br>- "Số tiền chia hóa đơn, đơn vị VND, nguyên dương, tối đa 100 triệu"<br><br>Hãy hỏi tôi các điểm còn thiếu trước khi viết, rồi chạy thử các ví dụ trên." | Đã tạo và kiểm tra `.agents/skills/domain-testing/SKILL.md`; đã chạy thử ba ví dụ bằng phân vùng tương đương và ghi rõ giả định/câu hỏi xác nhận. | INCOMPLETE | Skill chỉ tập trung phân miền giá trị theo kiểu dữ liệu và định dạng mà bỏ qua tính hợp lệ của dữ liệu | Mục Quy trình: thêm **mục 3b. và 6.**; mục Định dạng đầu ra: **chỉnh sửa Bảng test case thêm các cột dùng cho quá trình test** |
| Công cụ: GitHub Copilot<br>Timestamp: 2026-10-18T23:45:41+07:00<br>Prompt: Follow instructions in #prompt:SKILL.md with these arguments: tạo test case cho FR-03, xuất kết quả ra file .xlsx | Đã tạo bộ test case theo phân vùng tương đương one-factor-at-a-time cho FR-03 trong `reports/FR-03_domain_test_cases.md` và workbook `reports/FR-03_domain_test_cases.xlsx`; workbook gồm 5 sheet và 37 test case. | INCOMPLETED | AI bỏ sót trường hợp mã OTP hợp lệ nhưng không khớp với mã do hệ thống sinh ra. | **Bổ sung TC-FR03-38, miền không hợp lệ cho OTP: sai OTP;** |
| Công cụ: GitHub Copilot<br>Timestamp: 2026-10-19T23:42:56+07:00<br>Prompt: "Follow instructions in #prompt:SKILL.md with these arguments: Tạo skill thực hiện Boundary Value Analysis trên yêu cầu chức năng được yêu cầu, test case viết dưới dạng bảng:<br>\| ID \| Biến \| Lớp tương đương \| Giá trị test \| Kết quả mong đợi \| Kết quả thực tế \| Trạng thái \| Mã lỗi \| Ghi chú \|<br>\|---\|---\|---\|---\|---\|---\|---\|---\|---\|<br>\| TC-FR00-01 \| ... \| ... \| ... \| ... \| ... \| ... \| ... \| ... \|" | Đã tạo và kiểm tra `.agents/skills/boundary-testing/SKILL.md`; skill hướng dẫn BVA cho số, chuỗi, ngày giờ, enum, null/rỗng, mã `TC-<FR_CODE>-NN`, bảng 9 cột và xuất `.xlsx` khi được yêu cầu. | VALID |  |  |
| Công cụ: GitHub Copilot<br>Timestamp: 2026-10-19T23:48:42+07:00<br>Prompt: Follow instructions in #prompt:SKILL.md with these arguments: FR-03, xuất file .xlsx | Đã tạo bộ test case BVA FR-03 trong `reports/FR-03_boundary_test_cases.md` và `reports/FR-03_boundary_test_cases.xlsx`; workbook có sheet `Test Cases` với 9 cột, 29 test case từ `TC-FR03-01` đến `TC-FR03-29`, kết quả thực tế `Chưa thực thi` và trạng thái `NOT RUN`. | INCOMPLETE | AI chỉ kiểm tra 2/7 ký tự hợp lệ được phép sử dụng ở mục mật khẩu mới mà bỏ qua các ký tự còn lại; AI đặt mã test cases trùng với test cases thuộc phần domain testing | **Sửa mã test cases thành TCB-FR03-XX**; bổ sung **TCB-FR03-30 đến TCB-FR03-34** |
| Công cụ: GitHub Copilot<br>Timestamp: 2026-10-20T22:49:02+07:00<br>Prompt: FR-09, xuất file .xlsx | Đã tạo bộ test case Domain Testing cho FR-09 trong `reports/FR-09_domain_test_cases.md` và `reports/FR-09_domain_test_cases.xlsx`; gồm bảng biến, chiến lược one-factor-at-a-time, 36 test case từ `TC-FR09-01` đến `TC-FR09-36`, coverage và các câu hỏi mở. | INCOMPLETE | AI tạo test case liên quan đến các giá trị được lưu trên backend ('expired_at', 'type' và 'discount_value'), không thể test từ web khách. | **Loại bỏ các test cases TC-FR09-12, TC-FR09-28 đến TC-FR09-30 và TC-FR09-33** |
| Công cụ: GitHub Copilot<br>Timestamp: 2026-10-21T00:16:45+07:00<br>Prompt: FR-09, xuất file .xlsx | Đã tạo bộ test case Boundary Value Analysis cho FR-09 trong `reports/FR-09_boundary_test_cases.md` và `reports/FR-09_boundary_test_cases.xlsx`; gồm bảng biến và miền, chiến lược one-factor-at-a-time, 26 test case từ `TCB-FR09-01` đến `TCB-FR09-26`, coverage, giả định và câu hỏi xác nhận. | VALID |  |  |
| Công cụ: GitHub Copilot<br>Timestamp: 2026-10-21T00:50:54+07:00<br>Prompt: FR-17, chỉ thực hiện các test case có thể áp dụng trên client web admin, xuất file .xlsx | Đã tạo bộ test case Domain Testing cho FR-17 trong `reports/FR-17_domain_test_cases.md` và `reports/FR-17_domain_test_cases.xlsx`; gồm bảng biến, chiến lược one-factor-at-a-time, 28 test case từ `TC-FR17-01` đến `TC-FR17-28`, coverage, giả định và câu hỏi xác nhận; phạm vi giới hạn ở client web admin. | INCOMPLETE | Thiếu các test case khi dữ liệu nhập vào không phải số nguyên và không phải số | Bổ sung **TC-FR17-29 đến TC-FR17-34** |
| Công cụ: GitHub Copilot<br>Timestamp: 2026-10-21T08:21:30+07:00<br>Prompt: FR-17, chỉ thực hiện các test case có thể áp dụng trên client web admin, xuất file .xlsx | Đã tạo bộ test case Boundary Value Analysis cho FR-17 trong `reports/FR-17_boundary_test_cases.md` và `reports/FR-17_boundary_test_cases.xlsx`; gồm bảng biến và miền, chiến lược one-factor-at-a-time, 33 test case từ `TCB-FR17-01` đến `TCB-FR17-33`, coverage, giả định và câu hỏi xác nhận; các cận không được đặc tả được đánh dấu `BLOCKED`. | VALID |  |  |


## **4. Tổng kết Độ chính xác AI**

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

|Chỉ số|Số lượng|Tỉ lệ|
|-|-|-|
|**Tổng artifact AI sinh đã audit**|||
|**VALID (đúng, dùng nguyên)**|||
|**INVALID (sai; loại bỏ)**|||
|**INCOMPLETE (chấp nhận sau khi sửa)**|||

## **5. Kết luận — Khi nào nên / không nên dùng AI?**

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này?

## **Chữ ký**

|Họ tên sinh viên (in hoa):|VÕ THIỆN NHÂN|
|-|-|
|**MSSV:**|23120066|
|**Lớp / Khoá:**|23_3|
|**Môn học:**|CS423 / CSC13003 – Kiểm chứng Phần mềm|
|**Giảng viên:**|Lâm Quang Vũ|
|**Ngày:**|29/09/2026|
|**Chữ ký:**|vothiennhan|

## **Tham khảo**

* Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.
* ISTQB Foundation Level Syllabus (latest version).
* Hardman, P. (2025). A Post-AI Learning Taxonomy.
* Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.
* Perkins, M., Roe, J., \& Furze, L. (2025). AI Assessment Scale.
* Anthropic (2025). Building reliable AI test agents — engineering blog.
* DeepEval \& Promptfoo documentation — testing frameworks for LLM systems.
