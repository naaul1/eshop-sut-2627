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
| **Mã bài tập (ví dụ HW\#00, HW\#02):** | HW\#02 |
| **Ngày làm bài:** | 16/10/2026 |
| **Công cụ AI đã dùng:** | OpenCode (Muse Spark 1.3 Free, DeepSeek V4.1 Flash) |
| **Công cụ AI đã dùng:** | \[x\] Có  \[ \] Không |

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
| **Artifact \#4 — Guide.md**<br>**OpenCode — Muse Spark 1.3 Free**<br>2026-10-16 00:57:56<br><br>now that i choose to proceed with FR4, FR8, and FR14 in pool A, B, and C respectively, please edit @guide.md to be shorter and more concise into those 3 FRs, as well as suggest a way of doing pool D, mobile app, as your interpretation. edit altogether back into @guide.md | Guide.md v2: phạm vi FR-04/08/14; oracle + suspect refs; bảng partition/ON-OFF/BVA; Pool D FR-20 diễn giải parity. | **VALID** | Traceability đúng SRS; không có log SV sửa. | Không sửa. |
| **Artifact \#5 — Skills (domain-testing, bva, ai-audit)**<br>**OpenCode — Muse Spark 1.3 Free**<br>2026-10-16 01:00:17<br><br>regarding the requirements and this repo document, create needed skills in percise language. | 3 skills: domain-testing, bva, ai-audit — inputs (FR excerpt), quy trình từng bước, template output, demo script; log vào docs/prompt-log.md. | **INCOMPLETE** | Skills ban đầu sai quy ước EP/BVA: required/optional, khoảng invalid, input JSON; SV sửa. | Viết lại domain-testing/bva (2026-10-20 01:10, 01:43): data type; required = thiếu thì không chạy được; invalid dạng ≤9/≥12; input bullet, không JSON; expected là toast UI. |
| **Artifact \#6 — Domain Testing FR-04/08/14**<br>**OpenCode — DeepSeek V4.1 Flash Free**<br>2026-10-20 00:45:11<br><br>@domain-testing đối với các FR04, FR08, FR14. Viết các thông tin domain test đó vào bảng đã chuẩn bị sẵn trong @docs/report.md , không được thay đổi bất kì cột nào trừ khi thật sự cần, trong trường hợp đó hãy xác nhận lại trước khi thực hiện. không được thay đổi bất cứ phần nào ngoài nội dung domain testing. | Domain Testing FR-04/08/14 vào docs/report.md: FR-04 7 biến/17 domain/14 case; FR-08 7/17/13; FR-14 5/13/14; Actual/Pass-Fail trống. | **INCOMPLETE** | Sai partition FR04-N4/N5, sai expected FR08-D04..D09, thiếu FR08-D14 — vi phạm EP/oracle/coverage. | Sửa FR04-N4/N5 thành ≤9 và ≥12; chỉnh expected FR08-D04..D09; thêm FR08-D14; rút gọn còn 12/14/9 case. |
| **Artifact \#7 — BVA FR-04/08/14**<br>**OpenCode — DeepSeek V4.1 Flash Free**<br>2026-10-20 03:07:30<br><br>@bva cho các FR: FR4, FR8, FR14. Sau đó, điền nội dung bva đó vào bảng trong @docs/report.md , không thêm hay xoá các cột có sẵn. Tham khảo phần domain test trong cách viết ngắn gọn và cách trình bày. | BVA FR-04/08/14: phone 9/10/11/12; name 0/1/2; cart 0/1/2; total_amount 9999999/10000000/10000001; 7/6/3 case. | **INCOMPLETE** | BVA sai biến: total_amount client không có ngưỡng nghiệp vụ (backend bỏ qua); thừa case. | Bỏ BVA total_amount FR-08, chỉ giữ cart 0/1/2 (3 case); FR-04/FR-14 giữ nguyên; điền actual sau thực thi. |
| **Artifact \#8 — Domain Testing FR-20**<br>**OpenCode — DeepSeek V4.1 Flash Free**<br>2026-10-21 01:07:05<br><br>@domain-testing trên app mobile, chỉ riêng feature thanh toán. thực hiện vào bảng trong @docs/report.md và không thêm hay bớt cột. @ai-audit sau khi thực hiện xong. | Domain Testing FR-20 vào §5.1: 6 biến, 12 domain, 8 case D01..D08; Actual/Pass-Fail trống. | **INCOMPLETE** | Thừa case trùng/không quan sát được qua UI; rút gọn còn 6 case. | Bỏ 2 case, giữ D01–D06; điền actual sau thực thi. |
| **Artifact \#9 — BVA FR-20**<br>**OpenCode — DeepSeek V4.1 Flash Free**<br>2026-10-21 02:11:58<br><br>@bva hãy thực hiện bva lên fr20, feature thanh toán cho mobile. điền nội dung vào bảng trong @docs/report.md , không được thêm hay xoá cột. sau khi thực hiện, @ai-audit | BVA FR-20 vào §5.2: cart 0/1/2; quantity 0/1/2; 2 boundary; 6 case B01..B06; Actual/Pass-Fail trống. | **VALID** | Đúng ngưỡng BVA cart/quantity; SV chỉ thực thi, không sửa thiết kế. | Điền Actual/Pass-Fail sau thực thi; không đổi bảng. |
| **Artifact \#10 — Bug Report §7**<br>**OpenCode — DeepSeek V4.1 Flash Free**<br>2026-10-21 02:55:17<br><br>write the bugs i've found myself into the "bug report" section of @docs/report.md | 6 bug BUG-01..BUG-06: FR-04 regex phone; FR-04 tên trắng; FR-08 total sửa được; FR-08 backend tin total_amount; FR-14 category rỗng; FR-20 quantity +1; kèm root cause/severity; loại 3 case token. | **INCOMPLETE** | Phương pháp BUG-04 không khớp thực tế (proxy) và root cause/severity vượt bằng chứng thực thi; thiếu GitHub issue. | Đổi BUG-04 sang DevTools Edit and Resend as fetch; bỏ dòng Severity/Root cause; thêm issue #25–#27; giữ 6 bug đã xác nhận. |

## **4\. Tổng kết Độ chính xác AI**

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số | Số lượng | Tỉ lệ |
| :---- | :---- | :---- |
| **Tổng artifact AI sinh đã audit** | 7 | 100% |
| **VALID (đúng, dùng nguyên)** | 2 | 29% |
| **INVALID (sai; loại bỏ)** | 0 | 0% |
| **INCOMPLETE (chấp nhận sau khi sửa)** | 5 | 71% |

## **5\. Kết luận — Khi nào nên / không nên dùng AI?**

AI mạnh nhất ở việc dựng khung: liệt kê biến, chia domain, đề xuất boundary và sinh nhanh bản nháp test case/bug report. Tuy nhiên, AI thường sai ở các quy ước ngữ nghĩa: nhầm required/optional, chia invalid domain thành đúng 9 hoặc 12 chữ số thay vì <=9/>=12, bỏ sót case backend phải tính lại tổng tiền, và tự suy diễn root cause/severity khi chưa có bằng chứng. AI cũng đề xuất proxy trong khi thực tế chỉ cần DevTools. Vì vậy, tôi xem AI là người tạo bản nháp và gợi ý coverage, không phải oracle. Mọi expected result phải đối chiếu README/SRS; mọi kết luận phải được thực thi và ghi bằng chứng. Quy trình hiệu quả là prompt từng bước, review sau mỗi bước, và chỉ dùng output sau khi sửa.

## **6\. Mandatory Disclosure (dán nguyên văn)**

*"Các báo cáo kiểm thử này được sinh phiên bản đầu bởi OpenCode (Muse Spark 1.3 Free, DeepSeek V4.1 Flash Free); tôi đã rà soát và chỉnh sửa các bảng Domain Testing, BVA và Bug Report, bổ sung FR08-D14 và các case token sai/hết hạn; phần thực thi test, thu thập bằng chứng và tạo GitHub Issues do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."*

*"\[Test case / script / dataset / báo cáo\] này được sinh phiên bản đầu bởi \[tên công cụ AI\]; tôi đã rà soát và chỉnh sửa \[phần X\], bổ sung \[edge case Y, Z\]; \[phần W\] do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."*

## **Chữ ký**

| Họ tên sinh viên (in hoa): | TRẦN ĐÌNH LUÂN |
| :---- | :---- |
| **MSSV:** | 23120059 |
| **Lớp / Khoá:** | 23CTT1\_3 |
| **Môn học:** | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| **Giảng viên:** | Lâm Quang Vũ |
| **Ngày:** | 21/10/2026 |
| **Chữ ký:** | Trần Đình Luân |

## **Tham khảo**

* Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.  
* ISTQB Foundation Level Syllabus (latest version).  
* Hardman, P. (2025). A Post-AI Learning Taxonomy.  
* Fuster Rabella, M. (2025). OECD Education Working Paper No. 338\.  
* Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.  
* Anthropic (2025). Building reliable AI test agents — engineering blog.  
* DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
