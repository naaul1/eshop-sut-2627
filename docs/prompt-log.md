# Prompt Log (HW02 req §9)


## [2026-10-16 00:57:56] — OpenCode (Muse Spark 1.3 Free)
- Prompt: |
  now that i choose to proceed with FR4, FR8, and FR14 in pool A, B, and C respectively, please edit @guide.md to be shorter and more concise into those 3 FRs, as well as suggest a way of doing pool D, mobile app, as your interpretation. edit altogether back into @guide.md
- Output: |
  Rewrote guide.md to v2 scoped to FR-04 (Profile), FR-08 (Checkout), FR-14 (Categories) with oracle + suspect refs + partition/ON-OFF/BVA tables, plus Pool D (FR-20) parity re-execution interpretation.
  Paths touched as `path:line`: `guide.md` (full rewrite); refs cited `README.md:62-67`, `README.md:102-108`, `README.md:186-189`, `README.md:233-236`, `backend/server.js:118-135`, `backend/server.js:249-278`, `backend/server.js:297-309`, `frontend-mobile/App.js:287`, `frontend-mobile/App.js:391`, `frontend-mobile/App.js:348`, `frontend-mobile/App.js:684-690`.
- Human review: pending — user to mark accepted / corrected


## [2026-10-16 01:00:17] — OpenCode (Muse Spark 1.3 Free)
- Prompt: |
  regarding the requirements and this repo document, create needed skills in percise language.
- Output: |
  Created 3 reusable skills per req.md §7 and AGENTS.md §4, each with inputs (FR excerpt), stepwise procedure, output templates, and demo script:
  - domain-testing: variables → partitions → ON/OFF + combination T1..Tn → cases FRxx-Dnn → execute via curl/JWT.
  - bva: bounded variables → 2/3-value choice → min-1/min/min+1 tables → cases FRxx-Bnn → execute.
  - ai-audit: per-session log to assignment-docs/prompt-log.md (tool, datetime, prompt, output).
  Paths touched as `path:line`: `.opencode/skills/domain-testing/SKILL.md` (new), `.opencode/skills/bva/SKILL.md` (new), `.opencode/skills/ai-audit/SKILL.md` (new); refs `README.md:1-288`, `api_specification.md:1-214`, `AGENTS.md:1-103`.
- Human review: pending — user to mark accepted / corrected


## [2026-10-20 00:45:11] — OpenCode (DeepSeek V4.1 Flash Free)
- Prompt: |
  @domain-testing đối với các FR04, FR08, FR14. Viết các thông tin domain test đó vào bảng đã chuẩn bị sẵn trong @docs/report.md , không được thay đổi bất kì cột nào trừ khi thật sự cần, trong trường hợp đó hãy xác nhận lại trước khi thực hiện. không được thay đổi bất cứ phần nào ngoài nội dung domain testing.
- Output: |
  Điền Domain Testing cho FR-04, FR-08, FR-14 vào `docs/report.md` (§2.1.1–2.1.3, §3.1.1–3.1.3, §4.1.1–4.1.3):
  - FR-04: 7 biến, 17 domain, 14 test case (FR04-D01..D14).
  - FR-08: 7 biến, 17 domain, 13 test case (FR08-D01..D13).
  - FR-14: 5 biến, 13 domain, 14 test case (FR14-D01..D14).
  Giữ nguyên cột; Actual output và Pass / Fail để trống; không thực thi test.
- Human review: pending — student to run tests and mark accepted / corrected


## [2026-10-20 01:10:27] — OpenCode (DeepSeek V4.1 Flash Free)
- Prompt: |
  - Nội dung điền trong bảng Domain-testing ghi tối thiểu, không dài dòng, ngắn nhất mà vẫn giữ được thông tin. Ví dụ, ở bảng xác định input/output, cột required/optional chỉ điền một trong 2: required nếu bỏ trống hoặc không có thì không thực hiện FR đó được; cột valid và invalid domain ghi vắn tắt bằng số, kí hiệu và các từ đơn giản như ký tự, độ dài, trống, sai định dạng, ... Ở bảng phân thành các domain tương đương, cột domain description cũng tương tự, ghi ngắn gọn bằng số, kí tự nếu có thể (ví dụ 0 < độ dài `name` < 9). Ở bảng test cases, cột objectives nên ghi là để test domain nào và cũng ngắn gọn tương tự domain description, ngoài ra, các input cũng nên viết đơn giản từng biến ngắn gọn và xuống dòng gạch đầu dòng, thay vì kiểu json, expected output nên ghi toast sẽ hiển thị trên màn hình thay vì http response vì bài test này là test thủ công bằng UI chứ không phải tool.

  cập nhật nội dung trên cho skill domain-testing và có thể là cả bva ở những mục liên quan
- Output: |
  Viết lại `.opencode/skills/domain-testing/SKILL.md` và `.opencode/skills/bva/SKILL.md` theo style tối giản: Required/Optional một từ, domain description dạng công thức ngắn, Objective chỉ ghi domain/boundary, Inputs gạch đầu dòng không JSON, Expected output là toast/thông báo UI thay vì HTTP. Không thực thi test.
- Human review: pending — student to mark accepted / corrected


## [2026-10-20 01:43:22] — OpenCode (DeepSeek V4.1 Flash Free)
- Prompt: |
  cập nhật lại domain-testing với các chỉnh sửa sau:
  - data type nên ghi loại data thực tế mà variable sử dụng bằng tiếng anh (string, int, float, etc)
  - trường required/optional, optional không có nghĩa là được điều chỉnh tuỳ ý" mà có nghĩa là "không có cũng không sao", do đó name và phone ở FR04 phải là required. 
  - invalid domain (và domain description khi phân thành domain invalid) phải là dạng tập hợp, và khi `phone` yêu cầu 10-11 chữ số, domain không hợp lệ phải là từ 9 chữ số trở xuống và từ 12 chữ số trở lên, chứ không phải chỉ đúng 9 và 12 chữ số.
  - trong bảng test cases, input hiện tại vẫn trình bày theo kiểu json, thay vào đó hãy tách mỗi biến ra từng hàng và xuống dòng gạch đầu dòng, ví dụ: -  name: "Nguyễn Văn A"\- phone: "0786456884".
- Output: |
  Cập nhật `.opencode/skills/domain-testing/SKILL.md`: Data type dùng `string`/`int`/`float`/...; Required = thiếu thì không thực hiện được FR (FR-04 `name`, `phone` Required); invalid domain viết dạng khoảng/tập hợp (`độ dài ≤ 9 hoặc ≥ 12`); Inputs trong test case tách từng biến thành dòng bullet, không JSON. Không thực thi test.
- Human review: pending — student to mark accepted / corrected


## [2026-10-20 03:07:30] — OpenCode (DeepSeek V4.1 Flash Free)
- Prompt: |
  @bva cho các FR: FR4, FR8, FR14. Sau đó, điền nội dung bva đó vào bảng trong @docs/report.md , không thêm hay xoá các cột có sẵn. Tham khảo phần domain test trong cách viết ngắn gọn và cách trình bày.
- Output: |
  Điền BVA cho FR-04, FR-08, FR-14 vào `docs/report.md` (§2.2, §3.2, §4.2), giữ nguyên các cột hiện có:
  - FR-04: 2 biến (`phone` 9/10/11/12 chữ số; `name` 0/1/2 ký tự), 7 case FR04-B01..B07.
  - FR-08: 2 biến (`cart` 0/1/2 sản phẩm; `total_amount` 9999999/10000000/10000001), 6 case FR08-B01..B06.
  - FR-14: 1 biến (`name` 0/1/2 ký tự), 3 case FR14-B01..B03.
  Dùng 3-value BVA; cột max để `N/A` khi SRS không quy định; `Actual result` và `Pass / Fail` để trống; không thực thi test.
- Human review: pending — student to mark accepted / corrected


## [2026-10-21 01:07:05] — OpenCode (DeepSeek V4.1 Flash Free)
- Prompt: |
  @domain-testing trên app mobile, chỉ riêng feature thanh toán. thực hiện vào bảng trong @docs/report.md và không thêm hay bớt cột. @ai-audit sau khi thực hiện xong.
- Output: |
  Điền Domain Testing cho FR-20 (§5.1.1–5.1.3), chỉ phạm vi checkout trên mobile:
  - 6 biến: `token`, `cart`, `items`, `total_amount` (client), `order_total`, `cart_after_checkout`.
  - 12 domain: FR20-P1..P6, FR20-N1..N6.
  - 8 test case: FR20-D01..D08.
  Giữ nguyên cột; `Actual output`/`Pass / Fail` để trống; không sửa BVA và không thực thi test.
- Human review: pending — student to mark accepted / corrected


## [2026-10-21 02:11:58] — OpenCode (DeepSeek V4.1 Flash Free)
- Prompt: |
  @bva hãy thực hiện bva lên fr20, feature thanh toán cho mobile. điền nội dung vào bảng trong @docs/report.md , không được thêm hay xoá cột. sau khi thực hiện, @ai-audit
- Output: |
  Điền BVA cho FR-20 (§5.2.1–5.2.3) trong `docs/report.md`, chỉ phạm vi thanh toán trên mobile:
  - 2 biến: `cart` (0/1/2 sản phẩm), `quantity` (0/1/2).
  - 2 boundary: FR20-BD01, FR20-BD02; 6 test case FR20-B01..B06.
  Giữ nguyên cột; `Actual result`/`Pass / Fail` để trống; không thực thi test.
- Human review: pending — student to mark accepted / corrected
