---
name: domain-testing
description: 'Phân tích yêu cầu hoặc đặc tả và sinh (hoặc rà soát) test case bằng kỹ thuật domain testing, tức equivalence partitioning: xác định miền hợp lệ, miền không hợp lệ, lớp tương đương cho số, chuỗi, ngày giờ, enum, null/rỗng, trạng thái hệ thống và ràng buộc giữa các biến, rồi lập bảng test case Markdown. Hãy dùng skill này bất cứ khi nào người dùng nhờ thiết kế test case, tìm lớp tương đương, phân vùng miền giá trị, hoặc đánh giá test case có sẵn cho form, API, chức năng có đầu vào, kể cả khi họ không nêu tên kỹ thuật. Skill này không sinh giá trị biên.'
argument-hint: 'Cung cấp yêu cầu/spec, các biến đầu vào và luật validation cần phân tích.'
user-invocable: true
---

# Domain Testing

## Mục đích

Chuyển một yêu cầu hoặc spec thành các lớp tương đương và test case có thể thực thi. Phạm vi mặc định là **equivalence partitioning**; không phân tích giá trị biên trừ khi người dùng yêu cầu rõ.

## Quy trình

1. Đọc toàn bộ spec và liệt kê từng biến đầu vào, kiểu dữ liệu, nguồn giá trị và luật validation được nêu rõ.
2. Tách các điều kiện độc lập thành miền hợp lệ và miền không hợp lệ. Với mỗi miền, chia các giá trị có cùng cách xử lý kỳ vọng thành một lớp tương đương.
3. Kiểm tra các trường hợp đặc thù: số nguyên/thực, chuỗi và độ dài, ký tự đặc biệt, Unicode và tiếng Việt có dấu, ngày giờ và timezone nếu có, enum, chuỗi rỗng, whitespace-only, `null`, và giá trị thiếu.
3b. Với mỗi biến, trả lời đủ 6 câu hỏi trước khi chốt lớp:
    1. Định dạng/kiểu: sai kiểu, sai cấu trúc (mỗi lý do sai là một lớp).
    2. Tập giá trị: nếu spec liệt kê tập rời rạc, mỗi phần tử một lớp.
    3. Chuẩn hóa: khoảng trắng đầu/cuối, hoa/thường, Unicode, số 0 đầu.
    4. Quan hệ với biến khác hoặc thực thể khác (ràng buộc liên biến).
    5. Quan hệ với trạng thái hệ thống: khớp, không khớp, của thực thể khác,
       chưa từng được cấp, hết hạn, đã dùng, bị thay thế.
    6. Biến đầu ra do hệ thống sinh ra: độ dài, charset, phạm vi, tính duy nhất.
4. Nếu spec thiếu giới hạn, định nghĩa hoặc luật nghiệp vụ, ghi rõ giả định tối thiểu và hỏi người dùng xác nhận. Không tự bịa quy tắc. Theo mặc định, không hoàn tất các test case phụ thuộc vào phần chưa được xác nhận.
5. Chọn giá trị đại diện cho từng lớp, tránh nhầm kiểm thử giá trị biên với phân vùng tương đương. Nêu rõ khi một giá trị thuộc nhiều lớp hoặc khi lớp không thể tạo giá trị cụ thể do spec chưa đủ.
6. Với trường hợp valid, chọn giá trị chuẩn để bao phủ càng nhiều lớp hợp lệ càng tốt; với trường hợp invalid, chọn giá trị đại diện cho từng lớp không hợp lệ, đảm bảo các lớp hợp lệ khác vẫn được bao phủ.
7. Với nhiều biến, mặc định dùng **one-factor-at-a-time**: mỗi test case thay một biến trong khi các biến còn lại giữ giá trị hợp lệ chuẩn. Nếu người dùng yêu cầu bao phủ tương tác hoặc số lượng tổ hợp lớn, đề xuất hoặc dùng pairwise và ghi rõ công cụ/quy tắc kết hợp.
8. Xuất kết quả bằng Markdown theo cấu trúc ở dưới. Chỉ tạo Excel `.xlsx` khi người dùng yêu cầu; khi đó giữ nguyên ID, lớp, giá trị và kết quả trong bảng Markdown và bảng tính.
9. Kết thúc bằng các câu hỏi xác nhận còn mở và kiểm tra tính nhất quán của bảng.

## Quy tắc phân lớp

- Mỗi lớp phải có điều kiện thành viên rõ ràng và một expected result thống nhất.
- Luôn có lớp hợp lệ và lớp không hợp lệ khi spec cho phép xác định; không tạo lớp giả chỉ để đủ số lượng.
- Với số: phân biệt kiểu dữ liệu, dấu, số nguyên/thực, độ chính xác, đơn vị và giới hạn được nêu.
- Với chuỗi: phân biệt kiểu dữ liệu, rỗng, whitespace-only, độ dài, charset, ký tự đặc biệt, Unicode/tiếng Việt có dấu, và pattern nếu spec quy định.
- Với ngày giờ: phân biệt định dạng, ngày/giờ hợp lệ, timezone/offset, giá trị thiếu và thứ tự thời gian nếu có luật.
- Với enum: tạo lớp cho từng giá trị được phép và một lớp cho giá trị ngoài enum hoặc sai kiểu.
- `null`, giá trị thiếu, chuỗi rỗng và whitespace-only là các lớp riêng nếu hệ thống có thể nhận diện chúng riêng hoặc spec chưa nói chúng tương đương.
- Không gọi một lớp là “biên” và không thêm giá trị ngay sát giới hạn, vì đó là boundary value analysis.
- Kết quả mong đợi phải nói rõ accepted/rejected và thông báo hoặc mã lỗi chỉ khi spec cung cấp; nếu chưa có thì ghi “bị từ chối; cần xác nhận thông báo lỗi”.

## Định dạng đầu ra

### 1. Giả định và câu hỏi mở

Liệt kê ngắn gọn các giả định bắt buộc, phần chưa đủ thông tin và câu hỏi cần người dùng xác nhận. Nếu không có, ghi “Không có”.

### 2. Bảng biến

| Tên biến | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ |
|---|---|---|---|
| ... | ... | ... | ... |

Miền phải bao gồm điều kiện, đơn vị và format khi chúng có trong spec.

### 3. Chiến lược kết hợp

Nêu `one-factor-at-a-time` hoặc `pairwise`, biến chuẩn được giữ cố định, và lý do chọn chiến lược. Với pairwise, ghi rõ các cặp/tổ hợp được bao phủ; không ngầm hiểu là exhaustive.

### 4. Bảng test case

| ID | Biến | Lớp tương đương | Giá trị test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Mã lỗi | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| TC-FR00-01 | ... | ... | ... | ... | ... | ... | ... | ... |

Mỗi lớp xác định được có ít nhất một test case đại diện. ID tăng dần và không tái sử dụng trong cùng một yêu cầu, FR00 thay bằng mã yêu cầu.

### 5. Coverage và câu hỏi xác nhận

Đối chiếu các lớp đã tạo với bảng biến, ghi các lớp chưa thể kiểm thử, và lặp lại câu hỏi cần xác nhận nếu còn mơ hồ.

## Tiêu chí hoàn tất

- Frontmatter có `name` trùng tên thư mục và `description` nêu rõ trigger/use case.
- Có bảng biến và bảng test case đúng cột yêu cầu.
- Tất cả lớp có điều kiện và giá trị đại diện; expected result không vượt quá spec.
- Đã xét kiểu dữ liệu, null/rỗng và các loại giá trị đặc thù phù hợp với input.
- Đã ghi chiến lược kết hợp khi có nhiều biến.
- Không có phân tích giá trị biên ngoài yêu cầu.
- Mọi giả định và điểm mơ hồ đều được đánh dấu để người dùng xác nhận.
