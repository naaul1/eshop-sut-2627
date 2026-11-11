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
| **Công cụ AI đã dùng:** | OpenCode (DeepSeek V4.1 Flash), Antigravity |
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
| **Artifact \#1 - GUI checklist 42 mục**<br>**Tool: OpenCode (DeepSeek V4.1 Flash)<br>Thời gian: 04:23 09/11/2026<br>Prompt (không còn nguyên văn): \"Với phạm vi: Dashboard, Danh mục, Mã Giảm Giá, Đơn hàng.<br>Hãy tạo 42 mục checklist GUI, chia theo 4 nhóm như trong `README.md`<br>Mỗi mục gồm: ID, IA, màn hình, điều cần kiểm tra, kết quả mong đợi, cách kiểm tra.<br>Không bịa FR. Nếu không chắc, hãy xác nhận lại với tôi.\"** | Bản cuối cùng sau chỉnh sửa: `docs/checklist.xlsx`, sheet Checklist, A1:N43. Checklist có 42 mục, 4 màn hình, 35 mục AI và 7 mục SV. Ba cột Chrome, Firefox, Safari có 22 Passed và 20 Failed. Cột Notes ghi lý do cho 24 mục Failed. Sheet Bugs có 11 lỗi. Không dán toàn bộ 42 dòng vì output quá dài; xem file đính kèm. | INCOMPLETE | HW03 Task 1 yêu cầu hơn 40 mục, phủ đủ IA-01 đến IA-04 và có mục SV thêm kèm lý do AI bỏ sót. Bản AI ban đầu có mục không bám FR trong README và thiếu 7 check, nên chưa dùng nguyên được. | Đã sửa các mục theo FR-21 đến FR-24, FR-13, FR-14, FR-17, FR-18; thêm 7 check: GUI-002, GUI-005, GUI-011, GUI-015, GUI-034, GUI-035, GUI-040; cập nhật nguồn 35 AI + 7 SV trong `docs/checklist.xlsx` và `docs/report.md`. |
| **Artifact \#2 - Nội dung Task 1 trong report**<br>**Tool: OpenCode (DeepSeek V4.1 Flash)<br>Thời gian: 04:23 09/11/2026<br>Prompt: (không còn nguyên văn) \"Viết phần Task 1 GUI Checklist vào docs/report.md, gồm phạm vi, thiết kế checklist, prompt AI, mục SV thêm, kết quả thực thi, danh sách lỗi, ảnh minh chứng và GitHub Issues.\"** | Bản cuối cùng trong `docs/report.md`, mục Task 1. Nội dung: 42 mục, 35 AI + 7 SV, 18 Passed, 24 Failed, 11 bug. Mục 1.7 ghi rõ chưa có ảnh minh chứng và chưa tạo GitHub Issues. Không dán toàn bộ 140 dòng vì output quá dài; xem file đính kèm. | INCOMPLETE | HW03 Task 1 yêu cầu ảnh cho từng mục Failed và bug phải có trên GitHub Issues. Report đã có 42 mục, 35 AI + 7 SV, Notes cho 24 mục Failed và 11 bug, nhưng mục 1.7 nói chưa có ảnh và chưa tạo issue. | Chụp 24 ảnh cho mục Failed, tạo 11 GitHub Issues kèm ảnh, dán link vào cột Bug ID trong `docs/checklist.xlsx`, cập nhật mục 1.7 của `docs/report.md`. |
| **Artifact \#3 - Nội dung Task 2 trong report và phân tích**<br>**Tool: Antigravity<br>Thời gian: 04:13 10/11/2026<br>Prompt: \"được rồi, hãy thực hiện toàn bộ các phase theo kế hoạch. đối với việc điền vào docs/report.md: [trích dẫn Task 1], dùng skill /home/naul1/Projects/software-testing/eshop-sut-2627/.agents/skills/document-write/ .\"** | Nội dung hoàn chỉnh của Task 2 trong `docs/report.md` (mục 2.1 đến 2.7) cùng các tài liệu phân tích: `docs/usability/sessions/session-summary.md`, `docs/usability/analysis.md`. Báo cáo ghi nhận điểm SUS trung bình 58.2/100, xếp hạng 6 vấn đề (UF-01 đến UF-06) và phát hiện lỗi chức năng mới BUG-11. | INCOMPLETE | Task 2 Phase 2 và Phase 3 yêu cầu ghi nhận diễn biến phiên, điểm SUS, tổng hợp phân loại lỗi theo mức độ nghiêm trọng và tạo issue cho lỗi phát hiện. Cần bổ sung báo cáo về BUG-11 và tạo GitHub Issue, cũng như ghi lại trong báo cáo trước khi nộp. | Bổ sung thêm phần phân tích về các loại các phát hiện và ghi thêm báo cáo về BUG-11|
| **Artifact \#4 - Nội dung Task 3 trong report**<br>**Tool: Antigravity<br>Thời gian: 05:13 11/11/2026<br>Prompt: Viết phần 3 đơn giản cho Report: ## Task 3: Cross-Browser / Cross-Platform . trong đó, đề cập tới công cụ tôi dùng là Sauce Labs, và tôi test trên 3 nền tảng chrome, firefox và safari. tôi đã chụp lại toàn bộ screenshot.\"** | Bản cuối cùng trong `docs/report.md`, mục Task 3 (mục 3.1 đến 3.4). Nội dung: 3.1 Phạm vi kiểm tra 42 mục trên Chrome, Firefox, Safari trên Web Admin; 3.2 Công cụ Sauce Labs trên Windows và macOS, có gắn overlay email sinh viên; 3.3 Kết quả 22 Passed và 20 Failed đồng nhất trên cả 3 trình duyệt; 3.4 Bảng tổng hợp 38 ảnh minh chứng lưu trong `docs/images/` (Chrome: 13, Firefox: 12, Safari: 13). | VALID | HW03 Task 3 yêu cầu kiểm thử lại checklist trên ít nhất 3 nền tảng (Chrome, Firefox, Safari), dùng công cụ cloud (Sauce Labs) và đối chiếu kết quả thực thi. Nội dung do AI sinh đáp ứng đầy đủ và chính xác tất cả yêu cầu này theo đúng quy chuẩn báo cáo. | Giữ nguyên nội dung do AI sinh, cập nhật trực tiếp vào `docs/report.md` mục Task 3 và đối chiếu với 38 ảnh minh chứng đã lưu tại `docs/images/chrome`, `docs/images/firefox`, `docs/images/safari`. |
| **Artifact \#5**   |  |  |  |  |
| **Artifact \#6**   |  |  |  |  |
| **Artifact \#7**   |  |  |  |  |
| **Artifact \#8**   |  |  |  |  |
| **Artifact \#9**   |  |  |  |  |
| **Artifact \#10**   |  |  |  |  |

## **4\. Tổng kết Độ chính xác AI**

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số | Số lượng | Tỉ lệ |
| :---- | :---- | :---- |
| **Tổng artifact AI sinh đã audit** | 4 | 100% |
| **VALID (đúng, dùng nguyên)** | 1 | 25% |
| **INVALID (sai; loại bỏ)** | 0 | 0% |
| **INCOMPLETE (chấp nhận sau khi sửa)** | 3 | 75% |

## **5\. Kết luận — Khi nào nên / không nên dùng AI?**

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này?

Qua 4 artifact đã audit, AI mạnh ở việc dựng khung và viết nháp nhanh. AI làm tốt checklist, bảng điểm SUS và các mục báo cáo theo mẫu cho sẵn. AI yếu ở chỗ bám nguồn: nhắm sai FR trong README, đếm lệch số Passed và Failed, không biết dữ liệu người tham gia là thật hay bịa. Tôi dùng AI để sinh bản nháp đầu, rồi tự đối chiếu từng con số với checklist và file đính kèm. Không nên dùng AI để thu thập dữ liệu thật hay khẳng định bug khi chưa tái hiện. Sau mỗi lần AI sinh artifact, cần rà soát và ghi vào AI Audit Report ngay để không mất prompt gốc.

## **6\. Mandatory Disclosure (dán nguyên văn)**

*"Checklist, báo cáo và các tài liệu usability trong bài này được sinh phiên bản đầu bởi OpenCode (DeepSeek V4.1 Flash) và Antigravity; tôi đã rà soát và chỉnh sửa các mục checklist theo FR trong README, bổ sung 7 mục GUI do AI bỏ sót và phần phân tích BUG-11; danh sách 7 người tham gia, điểm SUS từng phiên và toàn bộ ảnh chụp màn hình do tôi tự thu thập. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."*

## **Chữ ký**

| Họ tên sinh viên (in hoa): | TRẦN ĐÌNH LUÂN |
| :---- | :---- |
| **MSSV:** | 23120059 |
| **Lớp / Khoá:** | 23CTT1\_3 |
| **Môn học:** | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| **Giảng viên:** | Lâm Quang Vũ |
| **Ngày:** | 11/11/2026 |
| **Chữ ký:** | Trần Đình Luân |

## **Tham khảo**

* Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.  
* ISTQB Foundation Level Syllabus (latest version).  
* Hardman, P. (2025). A Post-AI Learning Taxonomy.  
* Fuster Rabella, M. (2025). OECD Education Working Paper No. 338\.  
* Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.  
* Anthropic (2025). Building reliable AI test agents — engineering blog.  
* DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
