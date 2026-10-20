---
name: boundary-testing
description: 'Phân tích yêu cầu chức năng bằng Boundary Value Analysis (BVA) và sinh test case tại các giá trị biên cho số, chuỗi, ngày giờ, enum và dữ liệu rỗng/null. Dùng khi cần bảng test case có kết quả thực tế, trạng thái, mã lỗi và ghi chú.'
argument-hint: 'Cung cấp mã yêu cầu chức năng (ví dụ FR-03), spec, biến đầu vào và yêu cầu xuất Markdown hoặc Excel.'
user-invocable: true
---

# Boundary Value Analysis

## Mục đích

Chuyển một yêu cầu chức năng thành test case theo **Boundary Value Analysis (BVA)**. Tập trung vào giá trị tại biên và lân cận biên của từng miền hợp lệ/không hợp lệ. Không tự suy diễn giới hạn hoặc luật nghiệp vụ chưa có trong spec.

## Khi sử dụng

- Yêu cầu có giới hạn dưới/trên, khoảng số, độ dài chuỗi, khoảng ngày giờ hoặc tập enum.
- Cần test case có mã nhận diện theo yêu cầu chức năng, kết quả thực tế, trạng thái, mã lỗi và ghi chú.
- Cần xuất bảng Markdown; tạo thêm `.xlsx` khi người dùng yêu cầu.

## Quy trình

1. Đọc spec và xác định mã yêu cầu chức năng. Nếu chưa có mã, hỏi xác nhận hoặc dùng mã tạm thời được đánh dấu rõ; không tự đặt mã chính thức.
2. Liệt kê mọi biến đầu vào, kiểu dữ liệu, đơn vị, format, miền hợp lệ, miền không hợp lệ và điều kiện phụ thuộc.
3. Xác định từng biên được nêu trong spec: cận dưới, cận trên, điểm chuyển miền, độ dài tối thiểu/tối đa, ngày bắt đầu/kết thúc, phần tử đầu/cuối enum, và quy tắc null/rỗng nếu có.
4. Chọn giá trị BVA cho từng biên:
   - Số nguyên: `min-1`, `min`, `min+1`, `max-1`, `max`, `max+1` khi các giá trị đó có ý nghĩa và có thể biểu diễn.
   - Số thực: dùng giá trị ngay trước, tại và ngay sau biên theo độ chính xác/step được spec quy định; nếu chưa rõ độ chính xác, hỏi trước.
   - Chuỗi: độ dài `min-1`, `min`, `min+1`, `max-1`, `max`, `max+1`; giữ nội dung hợp lệ để cô lập lỗi độ dài, sau đó thêm case cho charset/pattern nếu chúng là điều kiện riêng.
   - Ngày giờ: mốc ngay trước, tại và ngay sau theo đơn vị độ chính xác của hệ thống; ghi timezone/offset và định dạng đầy đủ.
   - Enum: phần tử đầu/cuối nếu có thứ tự hoặc mã số, mỗi giá trị được phép, và giá trị ngoài enum; không gọi thứ tự là biên nếu enum không có thứ tự.
   - Null/rỗng/thiếu/whitespace-only: tạo case riêng khi hệ thống phân biệt được chúng hoặc spec chưa xác định chúng tương đương.
5. Với mỗi biến, giữ các biến khác ở giá trị chuẩn hợp lệ. Mặc định dùng **one-factor-at-a-time**. Nếu người dùng yêu cầu tương tác nhiều biến, đề xuất pairwise hoặc tổ hợp được chỉ định và ghi rõ chiến lược.
6. Gán ID theo mẫu `TC-<FR_CODE>-NN`, ví dụ `TCB-FR03-01`. Dùng cùng mã yêu cầu trong toàn bộ bảng, số thứ tự tăng dần và không trùng.
7. Điền `Kết quả thực tế`, `Trạng thái`, và `Mã lỗi` là `Chưa thực thi` hoặc `—` khi chưa chạy test. Không bịa kết quả runtime, mã lỗi hay thông báo lỗi.
8. Xuất Markdown theo định dạng bắt buộc bên dưới. Nếu yêu cầu `.xlsx`, tạo workbook với ít nhất một sheet chứa bảng test case đầy đủ; giữ nguyên ID và nội dung Markdown, kiểm tra số dòng/cột sau khi tạo.
9. Kết thúc bằng coverage, giả định, câu hỏi xác nhận và các giới hạn chưa thể kiểm thử.

## Quy tắc quyết định

- Nếu spec thiếu cận, step, độ chính xác, timezone, charset, quy tắc null/rỗng hoặc expected result: dừng phần phụ thuộc thông tin đó và hỏi xác nhận. Có thể lập bảng phần chắc chắn, nhưng phải đánh dấu case chưa hoàn thiện.
- Nếu biên không thể biểu diễn vì kiểu dữ liệu hoặc độ chính xác chưa rõ, ghi rõ điều này thay vì chọn giá trị tùy ý.
- Không biến BVA thành exhaustive testing: chỉ sinh các điểm đại diện quanh biên và các lớp dữ liệu đặc thù có liên quan.
- Với miền mở như `x > 0`, xác định giá trị nhỏ nhất có thể biểu diễn theo kiểu/đơn vị; nếu không biết, hỏi xác nhận.
- Với điều kiện kết hợp như `min <= x <= max` và `x` phải là số nguyên dương, tạo biên cho từng điều kiện nhưng giữ các điều kiện còn lại hợp lệ để chỉ thay đổi một yếu tố.
- Expected result chỉ được lấy từ spec. Nếu spec không nêu thông báo hoặc mã lỗi, ghi “Bị từ chối; mã/thông báo lỗi cần xác nhận”.
- Phân biệt `Kết quả mong đợi` với `Kết quả thực tế`: cột sau chỉ điền sau khi chạy test.

## Định dạng đầu ra

### 1. Giả định và câu hỏi xác nhận

Ghi mã yêu cầu, đơn vị, độ chính xác, timezone, charset, cách xử lý null/rỗng, mã lỗi và các giới hạn chưa rõ. Nếu không có, ghi “Không có”.

### 2. Bảng biến và miền

| Tên biến | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ | Các biên cần kiểm thử |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

### 3. Chiến lược kết hợp

Nêu `one-factor-at-a-time` hoặc pairwise, giá trị chuẩn của các biến không được thay đổi, và lý do chọn. Không ngầm hiểu pairwise là exhaustive.

### 4. Bảng test case

Phải dùng đúng 9 cột sau:

| ID | Biến | Lớp tương đương | Giá trị test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Mã lỗi | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| TC-FR00-01 | ... | ... | ... | ... | Chưa thực thi | NOT RUN | — | ... |

`FR00` là placeholder phải thay bằng mã yêu cầu thực tế. Khi người dùng chỉ yêu cầu sinh test case mà chưa chạy, dùng `NOT RUN`; không ghi PASS/FAIL.

### 5. Coverage

Đối chiếu từng biên với ID test case, chỉ ra biên chưa có case, case bị chặn bởi thông tin thiếu, và câu hỏi cần xác nhận.

## Xuất Excel

Chỉ tạo `.xlsx` khi người dùng yêu cầu. Tên file nên gồm mã yêu cầu, ví dụ `FR-03_boundary_test_cases.xlsx`. Workbook tối thiểu có sheet `Test Cases`; có thể thêm `Variables`, `Assumptions` hoặc `Coverage` khi hữu ích. Sau khi tạo, kiểm tra sheet tồn tại, header đủ 9 cột, ID không trùng và số dòng khớp bảng Markdown.

## Tiêu chí hoàn tất

- `name` trong frontmatter trùng tên thư mục và `description` nêu rõ Boundary Value Analysis/BVA.
- Có mã yêu cầu hoặc đánh dấu rõ mã tạm thời.
- Mọi biên xác định được đều có case đại diện tại trước biên, tại biên và sau biên khi kiểu dữ liệu cho phép.
- Bảng test case có đúng 9 cột: ID, biến, lớp tương đương, giá trị test, kết quả mong đợi, kết quả thực tế, trạng thái, mã lỗi, ghi chú.
- ID theo mẫu `TC-<FR_CODE>-NN`, tăng dần và không trùng.
- Không bịa runtime result, status, mã lỗi, giới hạn hoặc thông báo nghiệp vụ.
- Đã ghi giả định, câu hỏi xác nhận, chiến lược kết hợp và coverage.
- Nếu có `.xlsx`, workbook khớp bảng Markdown và đã được kiểm tra cấu trúc.
