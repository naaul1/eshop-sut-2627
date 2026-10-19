**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026\)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# **AI Audit Report — Mẫu 5 mục cho mỗi Artifact**

*Phụ lục bắt buộc đính kèm cho mọi bài tập có dùng AI (HW\#01–HW\#06, Seminar).*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm.*

## **1\. Thông tin Sinh viên**

| Mục | Giá trị |
| :---- | :---- |
| **Họ tên sinh viên (in hoa):** | TRẦN ĐÌNH LUÂN |
| **MSSV:** |  23120059 |
| **Lớp / Khoá:** | 23CTT1\_3 |
| **Mã bài tập (ví dụ HW\#00, HW\#02):** | HW\# |
| **Ngày làm bài:** | 20/09/2026 |
| **Công cụ AI đã dùng:** | OpenCode (Muse Spark 1.3 Free) |
| **Công cụ AI đã dùng:** | \[ \] Có  \[ \] Không |

## **2\. Hướng dẫn (đọc trước khi điền)**

* Thêm 1 hàng cho mỗi artifact AI sinh (test case, script, checklist, OpenAPI spec, JMeter plan…).  
* Dán nguyên văn prompt — KHÔNG paraphrase.  
* Dán nguyên văn output AI (hoặc kèm screenshot có chú thích trong báo cáo).  
* Gắn nhãn: VALID / INVALID / INCOMPLETE.  
* Lý do phải dẫn chiếu slide, mục ISTQB, hoặc RFC kỹ thuật.  
* Hiển thị bản sửa với phần thay đổi được tô sáng.  
* Hàng mẫu in nghiêng — thay trước khi nộp.

## **3\. Bảng Audit — 1 hàng / artifact**

| (1) Prompt \+ Công cụ | (2) Output AI | (3) Verdict | (4) Lý do (ISTQB) | (5) Bản SV sửa |
| :---- | :---- | :---- | :---- | :---- |
| **Artifact #1 — guide.md v2 (FR-04/FR-08/FR-14 + Pool D)**<br><br>**Tool:** OpenCode (Muse Spark 1.3 Free)<br>**Thời gian:** 2026-10-16 00:57:56 (UTC+7)<br>**Prompt (nguyên văn):**<br>"now that i choose to proceed with FR4, FR8, and FR14 in pool A, B, and C respectively, please edit @guide.md to be shorter and more concise into those 3 FRs, as well as suggest a way of doing pool D, mobile app, as your interpretation. edit altogether back into @guide.md" | Rewrote guide.md to v2 scoped to FR-04 (Profile), FR-08 (Checkout), FR-14 (Categories) with oracle + suspect refs + partition/ON-OFF/BVA tables, plus Pool D (FR-20) parity re-execution interpretation.<br>Paths: `guide.md` (full rewrite); refs `README.md:62-67`, `README.md:102-108`, `README.md:186-189`, `README.md:233-236`, `backend/server.js:118-135`, `backend/server.js:249-278`, `backend/server.js:297-309`, `frontend-mobile/App.js:287`, `frontend-mobile/App.js:391`, `frontend-mobile/App.js:348`, `frontend-mobile/App.js:684-690`. | INCOMPLETE | Chưa có human review (prompt-log ghi pending). req.md §2 bắt buộc rà soát mọi output AI; ISTQB FL §1.3 yêu cầu rà soát độc lập trước khi dùng artifact. Output mới ở dạng tóm tắt, chưa dán nguyên văn/screenshot theo Mục 2. | SV cần đánh dấu accepted/corrected, đối chiếu `guide.md` với `README.md` + `backend/server.js`, tô sáng phần sửa. |
| **Artifact #2 — 3 skills HW02 (domain-testing, bva, ai-audit)**<br><br>**Tool:** OpenCode (Muse Spark 1.3 Free)<br>**Thời gian:** 2026-10-16 01:00:17 (UTC+7)<br>**Prompt (nguyên văn):**<br>"regarding the requirements and this repo document, create needed skills in percise language." | Created 3 reusable skills per req.md §7 and AGENTS.md §4, each with inputs (FR excerpt), stepwise procedure, output templates, and demo script:<br>- domain-testing: variables → partitions → ON/OFF + combination T1..Tn → cases FRxx-Dnn → execute via curl/JWT.<br>- bva: bounded variables → 2/3-value choice → min-1/min/min+1 tables → cases FRxx-Bnn → execute.<br>- ai-audit: per-session log (tool, datetime, prompt, output).<br>Paths: `.opencode/skills/domain-testing/SKILL.md` (new), `.opencode/skills/bva/SKILL.md` (new), `.opencode/skills/ai-audit/SKILL.md` (new); refs `README.md:1-288`, `api_specification.md:1-214`, `AGENTS.md:1-103`. | INCOMPLETE | Chưa có human review (prompt-log ghi pending). req.md §2 + §7 yêu cầu review/correct mọi AI output và kiểm chứng skill bằng demo end-to-end; ISTQB FL §4.2/§4.3 yêu cầu kỹ thuật phân vùng/biên phải được rà soát trước khi dùng. Chưa có link demo YouTube. | SV cần review 3 file `SKILL.md`, chạy thử `@domain-testing` / `@bva` trên 1 FR, ghi link demo + tô sáng phần sửa. |
| **Artifact \#3** |  |  |  |  |
| **Artifact \#4** |  |  |  |  |
| **Artifact \#5** |  |  |  |  |
| **Artifact \#6** |  |  |  |  |
| **Artifact \#7** |  |  |  |  |
| **Artifact \#8** |  |  |  |  |
| **Artifact \#9** |  |  |  |  |
| **Artifact \#10** |  |  |  |  |

## **4\. Tổng kết Độ chính xác AI**

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số | Số lượng | Tỉ lệ |
| :---- | :---- | :---- |
| **Tổng artifact AI sinh đã audit** | 2 | 100% |
| **VALID (đúng, dùng nguyên)** | 0 | 0% |
| **INVALID (sai; loại bỏ)** | 0 | 0% |
| **INCOMPLETE (chấp nhận sau khi sửa)** | 2 | 100% |

## **5\. Kết luận — Khi nào nên / không nên dùng AI?**

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này?

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **6\. Mandatory Disclosure (dán nguyên văn)**

*"\[Test case / script / dataset / báo cáo\] này được sinh phiên bản đầu bởi \[tên công cụ AI\]; tôi đã rà soát và chỉnh sửa \[phần X\], bổ sung \[edge case Y, Z\]; \[phần W\] do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."*

## **Chữ ký**

| Họ tên sinh viên (in hoa): | TRẦN ĐÌNH LUÂN |
| :---- | :---- |
| **MSSV:** | 23120059 |
| **Lớp / Khoá:** | 23CTT1\_3 |
| **Môn học:** | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| **Giảng viên:** | Lâm Quang Vũ |
| **Ngày:** | 20/09/2026 |
| **Chữ ký:** |  |

## **Tham khảo**

* Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.  
* ISTQB Foundation Level Syllabus (latest version).  
* Hardman, P. (2025). A Post-AI Learning Taxonomy.  
* Fuster Rabella, M. (2025). OECD Education Working Paper No. 338\.  
* Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.  
* Anthropic (2025). Building reliable AI test agents — engineering blog.  
* DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
