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
| **Mã bài tập (ví dụ HW\#00, HW\#02):** | HW\#03 |
| **Ngày làm bài:** | 07/11/2026 |
| **Công cụ AI đã dùng:** | OpenCode (DeepSeek V4.1 Flash) |
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
| **Mẫu (italic) — thay trước khi nộp:** |  |  |  |  |
| **Tool: AI Tool (e.g., ChatGPT, Claude, Gemini)Thời gian: 14:32 25/02/2026Prompt:"Sinh test case cho hàm parsePhoneNumberVN…"** | TC01: parsePhoneNumberVN("0912345678")Kỳ vọng: {prefix:84, number:912345678, valid:true}… | INCOMPLETE | AI bỏ qua định dạng RFC 3966\. ISTQB FL §4.3 Boundary Value Analysis yêu cầu test ranh giới định dạng. | Thêm TC: parsePhoneNumberVN("+84-91-234-5678")Kỳ vọng: {prefix:84, number:912345678, valid:true} |
| **Artifact \#1 - GUI checklist 42 mục**<br>**Tool: OpenCode (DeepSeek V4.1 Flash)<br>Thời gian: 04:23 09/11/2026<br>Prompt (không còn nguyên văn): "Với phạm vi: Dashboard, Danh mục, Mã Giảm Giá, Đơn hàng.<br>Hãy tạo 42 mục checklist GUI, chia theo 4 nhóm như trong `README.md`<br>Mỗi mục gồm: ID, IA, màn hình, điều cần kiểm tra, kết quả mong đợi, cách kiểm tra.<br>Không bịa FR. Nếu không chắc, hãy xác nhận lại với tôi."** | Bản cuối cùng sau chỉnh sửa: `docs/checklist.xlsx`, sheet Checklist, A1:N43. Checklist có 42 mục, 4 màn hình, 35 mục AI và 7 mục SV. Ba cột Chrome, Firefox, Safari có 18 Passed và 24 Failed. Cột Notes ghi lý do cho 24 mục Failed. Sheet Bugs có 11 lỗi. Không dán toàn bộ 42 dòng vì output quá dài; xem file đính kèm. | INCOMPLETE | HW03 Task 1 yêu cầu hơn 40 mục, phủ đủ IA-01 đến IA-04 và có mục SV thêm kèm lý do AI bỏ sót. Bản AI ban đầu có mục không bám FR trong README và thiếu 7 check, nên chưa dùng nguyên được. | Đã sửa các mục theo FR-21 đến FR-24, FR-13, FR-14, FR-17, FR-18; thêm 7 check: GUI-002, GUI-005, GUI-011, GUI-015, GUI-034, GUI-035, GUI-040; cập nhật nguồn 35 AI + 7 SV trong `docs/checklist.xlsx` và `docs/report.md`. |
| **Artifact \#2 - Nội dung Task 1 trong report**<br>**Tool: OpenCode (DeepSeek V4.1 Flash)<br>Thời gian: 04:23 09/11/2026<br>Prompt: (không còn nguyên văn) "Viết phần Task 1 GUI Checklist vào docs/report.md, gồm phạm vi, thiết kế checklist, prompt AI, mục SV thêm, kết quả thực thi, danh sách lỗi, ảnh minh chứng và GitHub Issues."** | Bản cuối cùng trong `docs/report.md`, mục Task 1. Nội dung: 42 mục, 35 AI + 7 SV, 18 Passed, 24 Failed, 11 bug. Mục 1.7 ghi rõ chưa có ảnh minh chứng và chưa tạo GitHub Issues. Không dán toàn bộ 140 dòng vì output quá dài; xem file đính kèm. | INCOMPLETE | HW03 Task 1 yêu cầu ảnh cho từng mục Failed và bug phải có trên GitHub Issues. Report đã có 42 mục, 35 AI + 7 SV, Notes cho 24 mục Failed và 11 bug, nhưng mục 1.7 nói chưa có ảnh và chưa tạo issue. | Chụp 24 ảnh cho mục Failed, tạo 11 GitHub Issues kèm ảnh, dán link vào cột Bug ID trong `docs/checklist.xlsx`, cập nhật mục 1.7 của `docs/report.md`. |
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
| **Tổng artifact AI sinh đã audit** |  |  |
| **VALID (đúng, dùng nguyên)** |  | % |
| **INVALID (sai; loại bỏ)** |  | % |
| **INCOMPLETE (chấp nhận sau khi sửa)** |  | % |

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
