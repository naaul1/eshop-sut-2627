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
|**Mã bài tập:**|HW#03|
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
| Công cụ: Claude Sonnet 5.5<br>Timestamp: 2026-11-09T:17:44:00+07:00<br>Prompt: /skill-creator Tạo skill để thiết kế GUI checklist cho kiểm thử GUI, đảm bảo các item sinh ra bao phủ các interface aspects sau:<br>- General UI standards<br>- Forms<br>- Navigation<br>- Feedback / state | .agents/skills/gui-checklist | VALID | | |
| Công cụ: GitHub Copilot<br>Timestamp: 2026-11-09T17:50:34+07:00<br>Prompt: /gui-checklist Tạo checklist với tối thiểu 40 item để kiểm tra GUI của các màn hình đăng ký, đăng nhập, quên mật khẩu, kết quả sinh ra đặt trong folder ai-artifacts* | reports/ai-artifacts/gui-checklist-authentication.md | INCOMPLETE | Đã được giải thích trong report.md | Các ý đã sửa, bổ sung được đã được liệt kê trong report.md |
| Công cụ: GitHub Copilot<br>Timestamp: 2026-11-10T12:49:58+07:00<br>Prompt: Tạo file .xslx từ file trên | Đã tạo và kiểm tra workbook [reports/gui-checklist.xlsx](./gui-checklist.xlsx), gồm các sheet Phạm vi, Ma trận phủ, General UI, Forms, Navigation và Feedback-state. | VALID |  |  |
| Công cụ: GitHub Copilot<br>Timestamp: 2026-11-10T16:27:38+07:00<br>Prompt: hướng dẫn deploy backend trên render.com | Đã thêm script `npm start`, cấu hình server dùng `process.env.PORT`, đọc JWT secret từ biến môi trường, và bổ sung hướng dẫn deploy Render cùng lưu ý filesystem SQLite trong [setup_guide.md](../setup_guide.md). | VALID |  |  |

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
