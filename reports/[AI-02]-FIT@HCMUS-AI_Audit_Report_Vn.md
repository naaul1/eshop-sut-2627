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
|**Mã bài tập:**|HW#01|
|**Ngày làm bài:**|29/09/2026|
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
| Công cụ: GitHub Copilot<br>Timestamp: 2026-10-15T23:16:15+07:00<br>Prompt: "Follow instructions in #prompt:SKILL.md with these arguments: Sử dụng kỹ thuật domain testing để viết test cases cho FR-03" | Đã tạo `testcases/FR-03-forgot-password.json` gồm 12 test case theo phân hoạch tương đương và giá trị biên; linter: 12 test cases, 0 errors, 0 warnings; đã sinh `outputs/FR-03-forgot-password.docx` và `outputs/FR-03-forgot-password.xlsx`. |  |  |  |

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

## **6. Mandatory Disclosure (dán nguyên văn)**



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

