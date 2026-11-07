---
name: AI Log
description: Ghi một artifact AI vào bảng Audit trong docs/AI Audit Report.md cho bài HW03. Dùng khi người dùng yêu cầu "ai-log", "ghi audit", "điền AI Audit Report" cho một artifact cụ thể.
---

# AI Log

## Mục đích

Ghi đúng một hàng cho một artifact AI vào mục 3 của `docs/AI Audit Report.md`.
Mỗi hàng phải dựa trên ba nguồn:

1. Yêu cầu của bài tập trong `docs/refs/hw03.req.md`.
2. Prompt và câu trả lời thật của session hiện tại.
3. File hoặc tài liệu mà sinh viên đã tạo cho artifact đó.

## Nguyên tắc bắt buộc

- Không bịa prompt, output, thời gian, verdict, lý do hoặc phần sửa.
- Nếu session hiện tại không còn prompt hoặc output gốc, dừng lại và hỏi người dùng dán lại. Không tự viết lại rồi gọi là "nguyên văn".
- Chỉ sửa đúng hàng của artifact được yêu cầu. Không đổi hàng mẫu, mục 4, mục 5, mục 6 và phần chữ ký.
- Không tự cập nhật bảng tổng kết ở mục 4 trừ khi người dùng yêu cầu.
- Viết tiếng Việt có dấu, câu ngắn, từ ngữ đơn giản cho sinh viên đọc.
- Không dùng ký tự ngoài bàn phím trong phần do agent viết: không dùng mũi tên, em dash, dấu lớn hơn hoặc bằng, ký hiệu tiền, ngoặc cong, dấu chấm lửng một ký tự. Viết thành lời hoặc dùng `-`, `>=`, `VND`, `...`.
- Ngoại lệ: cột (2) Output AI phải giữ nguyên văn, nên có thể chứa ký tự lạ do AI sinh ra.

## Quy trình

### 1. Xác định artifact

Artifact là nội dung người dùng nêu trong tin nhắn gọi skill.
Ví dụ: "GUI checklist màn hình Home", "bảng test execution", "kịch bản usability", "bug report", "chạy cross-browser".

Nếu người dùng chỉ nói "ghi audit" mà không nêu artifact, hỏi lại một câu ngắn.
Không tự chọn artifact thay người dùng.

Đối chiếu artifact với bảng tra ở cuối file để biết task nào trong HW03 đang được nói tới.

### 2. Đọc ba nguồn

Đọc `docs/refs/hw03.req.md` và tìm đúng task, đúng FR hoặc IA liên quan.
Đọc `docs/AI Audit Report.md` để nắm bảng hiện tại, thông tin sinh viên và tên công cụ AI đã khai báo.
Xem lại session hiện tại để lấy đúng prompt và đúng câu trả lời đã sinh ra artifact.

Tìm file thật của artifact bằng `glob` và `grep`, ví dụ `docs/**`, `report/**`, `*.md`, `*.xlsx`, `*.csv`, `*.png`, `.opencode/skills/**`.
Đọc file đó để biết artifact đã có gì và còn thiếu gì.
Không đánh giá artifact chỉ dựa trên lời AI kể.

### 3. Chọn hàng để điền

Tìm hàng trống đầu tiên có dạng `**Artifact #N**` trong mục 3.
Điền hàng theo thứ tự tăng dần.
Giữ nhãn `**Artifact #N**` và thêm tên ngắn của artifact sau dấu gạch ngang.
Nếu đã dùng hết 10 hàng, thêm hàng `**Artifact #11**` và các hàng tiếp theo ngay trước mục 4.

Nếu người dùng yêu cầu nhiều artifact, thêm nhiều hàng trong cùng một lần.
Mỗi hàng phải có prompt và output riêng, không gộp hai artifact vào một hàng.

### 4. Viết cột (1) Prompt + Công cụ

Dùng tên công cụ đã ghi ở mục 1 của file audit.
Lấy thời gian hiện tại bằng `date '+%H:%M %d/%m/%Y'`, trừ khi người dùng cho thời gian khác.

Mẫu:

```text
**Artifact #1 - GUI checklist màn hình Home**<br>**Tool: OpenCode (DeepSeek V4.1 Flash)<br>Thời gian: 21:40 07/11/2026<br>Prompt: "Lập checklist GUI cho màn hình Home, phủ đủ IA-01 đến IA-04"**
```

Quy tắc:

- Prompt phải là nguyên văn, giữ đúng chính tả và dấu câu của người dùng.
- Không tóm tắt prompt.
- Nếu artifact được tạo qua nhiều prompt, trích lần lượt các prompt, ngăn bằng `<br>`.
- Đổi ký tự `|` trong prompt thành `\|` để không làm vỡ bảng.

### 5. Viết cột (2) Output AI

Chép nguyên văn câu trả lời của AI đã tạo ra artifact.
Không sửa lỗi chính tả, không dịch, không rút gọn từ ngữ.

Quy tắc định dạng:

- Đổi xuống dòng thành `<br>`.
- Đổi ký tự `|` thành `\|`.
- Giữ nguyên nội dung, kể cả khi AI trả lời sai.
- Nếu output rất dài, vẫn ưu tiên dán nguyên văn toàn bộ. Nếu người dùng đồng ý, có thể thay bằng ảnh chụp kèm đường dẫn file, nhưng phải ghi rõ đó là ảnh chụp output gốc.

### 6. Viết cột (3) Verdict

Chỉ dùng một trong ba nhãn:

- `VALID`: artifact đáp ứng yêu cầu, dùng được, không cần sửa nội dung.
- `INCOMPLETE`: artifact dùng được một phần nhưng thiếu nội dung bắt buộc, sinh viên phải bổ sung.
- `INVALID`: artifact sai hướng hoặc không dùng được, phải làm lại.

Verdict phải khớp với lý do ở cột 4 và phần sửa ở cột 5.
Không mặc định chọn `VALID`.

### 7. Viết cột (4) Lý do (ISTQB)

Viết 1 đến 2 câu ngắn.
Nêu rõ artifact thiếu gì hoặc sai gì, và dựa vào đâu để kết luận.

Nguồn dẫn chiếu hợp lệ:

- Yêu cầu HW03, ví dụ "HW03 Task 1 yêu cầu hơn 40 mục và đủ IA-01 đến IA-04".
- ISTQB Foundation Level, ghi tên kỹ thuật như "phân tích giá trị biên", "phân vùng tương đương", "kiểm thử bảng quyết định".
- ISO 25010 nếu nói về khả năng dùng, khả năng truy cập hoặc hiệu năng.
- RFC nếu nói về định dạng dữ liệu, ví dụ RFC 4180 cho CSV.

Chỉ ghi số mục khi chắc chắn đúng.
Nếu không chắc, ghi tên kỹ thuật hoặc tên tài liệu, không ghi số mục.

### 8. Viết cột (5) Bản SV sửa

Ghi thay đổi cụ thể mà sinh viên đã làm hoặc cần làm.
Nêu rõ thêm gì, xóa gì, đổi gì và nằm ở file nào.

Quy tắc:

- Không viết "đã sửa" nếu file chưa được sửa.
- Nếu chưa sửa, ghi "Đề xuất sửa: ..." và để verdict là `INCOMPLETE` hoặc `INVALID`.
- Nếu không cần sửa, ghi "Giữ nguyên, chỉ chỉnh định dạng theo mẫu.".
- Có thể bôi đậm phần quan trọng bằng `**...**`.

### 9. Chèn hàng và kiểm tra

Dùng `edit` để thay đúng hàng trống.
Sau khi sửa, kiểm tra:

- Hàng có đúng 5 ô.
- Không có ký tự `|` chưa escape trong nội dung ô.
- Cột 2 là nguyên văn output.
- Verdict khớp với lý do và phần sửa.
- `git diff` chỉ thay đổi hàng vừa điền.

## Bảng tra artifact

| Artifact | Yêu cầu cần đối chiếu | File thường gặp |
| :---- | :---- | :---- |
| GUI checklist | HW03 Task 1: hơn 40 mục, đủ IA-01 đến IA-04 | `docs/**`, `*.md`, `*.xlsx`, `*.csv` |
| Thực thi checklist | HW03 Task 1: Passed hoặc Failed, có Notes cho mục Failed, ảnh cho mục Failed | file checklist, thư mục ảnh |
| Bug report | HW03 Task 1, 2, 3: các bước tái hiện, ảnh, GitHub Issues | `docs/**`, thư mục ảnh |
| Kịch bản usability | HW03 Task 2 Phase 1: mục tiêu, kịch bản, SUS hoặc UEQ-S, 7 người tham gia, phiên thử | `docs/**` |
| Phiên usability | HW03 Task 2 Phase 2: ghi chú, ghi màn hình, điểm SUS hoặc UEQ-S | `docs/**`, thư mục ảnh, video |
| Phân tích usability | HW03 Task 2 Phase 3: điểm, nhóm lỗi, mức độ nghiêm trọng | `docs/**` |
| Cross-browser hoặc cross-platform | HW03 Task 3: ít nhất 3 nền tảng, Chrome, Firefox, Safari hoặc Android Chrome hoặc Expo Go, ảnh có email sinh viên | thư mục ảnh |
| Agent skill | HW03 mục 7: skill tái sử dụng được và video demo | `.opencode/skills/**` |
| Báo cáo hoặc AI Critique | HW03 mục 9 và 10: nội dung, độ dài, thông tin bắt buộc | `docs/**` |

## Ví dụ một hàng

Đây chỉ là ví dụ minh họa, không phải nội dung để chép vào file thật.

```text
| **Artifact #1 - GUI checklist màn hình Home**<br>**Tool: OpenCode (DeepSeek V4.1 Flash)<br>Thời gian: 21:40 07/11/2026<br>Prompt: "Lập checklist GUI cho màn hình Home, phủ đủ IA-01 đến IA-04"** | Đã lập 42 mục cho màn hình Home... | INCOMPLETE | Thiếu kiểm tra dark mode, RTL và alt text. HW03 Task 1 yêu cầu hơn 40 mục và đủ 4 IA. | Bổ sung 6 mục về dark mode, RTL và alt text vào `docs/checklist.md`. |
```

## Kiểm tra cuối

- [ ] Đúng artifact người dùng yêu cầu.
- [ ] Cột 1 có Tool, thời gian và prompt nguyên văn.
- [ ] Cột 2 là output nguyên văn, đã escape `|` và đổi xuống dòng thành `<br>`.
- [ ] Verdict khớp với lý do và phần sửa.
- [ ] Có dẫn chiếu HW03, ISTQB, ISO 25010 hoặc RFC.
- [ ] Tiếng Việt có dấu và không có ký tự ngoài bàn phím trong phần agent viết.
- [ ] Chỉ hàng vừa điền thay đổi.
