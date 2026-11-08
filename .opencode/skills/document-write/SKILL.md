---
name: Document Write
description: Viết hoặc sửa tài liệu cho repo EShop (docs/*.md, README, báo cáo HW03, checklist, bug report, ghi chú). Dùng khi người dùng yêu cầu "viết document", "viết tài liệu", "soạn docs", "viết báo cáo", "ghi lại thành tài liệu" hoặc nhờ chỉnh lại văn phong tài liệu.
---

# Document Write

## Mục đích

Viết tài liệu cho repo này theo đúng văn phong của sinh viên mới học software testing:
tiếng Việt có dấu, câu ngắn, dễ hiểu, không lan man.

## Nguyên tắc bắt buộc

- Viết tiếng Việt có dấu. Không viết kiểu không dấu, không trộn tiếng Anh khi đã có từ tiếng Việt.
- Chỉ dùng ký tự có trên bàn phím. Không dùng mũi tên, em dash, emoji, dấu lớn hơn hoặc bằng, ngoặc cong, ký hiệu tiền.
  Thay bằng chữ hoặc ký tự thường:
  - "dẫn đến", "sang", "thì" thay cho mũi tên.
  - "-" thay cho em dash.
  - ">=" thay cho ký hiệu lớn hơn hoặc bằng.
  - "VND" hoặc "đ" thay cho ký hiệu tiền.
  - "..." thay cho dấu chấm lửng một ký tự.
- Viết ngắn. Mỗi câu nên dưới 25 từ. Mỗi đoạn 2 đến 4 câu. Không viết đoạn dài quá 5 câu.
- Không lặp lại điều vừa nói. Không thêm phần "Tổng kết" nếu nội dung đã rõ.
- Không bịa. Thông tin về hành vi hệ thống phải lấy từ `README.md` hoặc từ code đã đọc.
  Khi code và `README.md` khác nhau, ghi rõ đó là lỗi theo spec, không tự sửa code.
- Không dùng từ hoa mỹ, không dùng "vô cùng", "cực kỳ", "đáng chú ý là". Viết thẳng vào việc.
- Tài liệu trong repo là tiếng Việt. Code, tên hàm, tên file, commit message giữ nguyên.

## Cấu trúc tài liệu

- Mở đầu bằng 1 đến 2 câu nêu mục đích của tài liệu.
- Dùng tiêu đề `##` cho phần lớn, `###` cho mục nhỏ. Không lồng quá 3 cấp.
- Dùng gạch đầu dòng khi liệt kê. Dùng bảng chỉ khi so sánh nhiều cột.
- Mỗi bảng có tiêu đề cột rõ ràng, không quá 5 cột.
- Kết thúc bằng phần việc cần làm hoặc checklist ngắn, nếu phù hợp.

## Quy trình

### 1. Xác định tài liệu

Xác định người dùng muốn viết tài liệu nào: file mới hay sửa file có sẵn, dùng cho mục nào của HW03.
Nếu chưa rõ, hỏi lại một câu ngắn. Không tự chọn nội dung thay người dùng.

### 2. Đọc nguồn trước khi viết

- Đọc file tài liệu đang có để giữ đúng văn phong và tránh trùng lặp.
- Đọc `README.md` nếu tài liệu nói về yêu cầu hoặc hành vi hệ thống.
- Đọc `docs/refs/hw03.req.md` nếu tài liệu phục vụ bài HW03.
- Đọc code liên quan bằng `grep` nếu cần mô tả chức năng thật.
- Xem `docs/AI Audit Report.md` và `docs/AI Critique.md` để biết mẫu đang dùng.

### 3. Viết nháp theo khung

Viết đúng thứ tự: mục đích, nội dung chính, việc cần làm.
Mỗi ý một gạch đầu dòng hoặc một câu. Không gộp nhiều ý vào một câu dài.

### 4. Rà lại trước khi lưu

Đọc lại và cắt các câu thừa. Nếu một câu không thêm thông tin mới thì xóa.
Kiểm tra lại các con số, tên màn hình, mã FR hoặc IA cho khớp nguồn.

### 5. Lưu và kiểm tra

Dùng `edit` cho file có sẵn, `write` cho file mới.
Sau khi lưu, chạy `git diff` để chắc chỉ đổi đúng phần cần đổi.

## Ví dụ

Không viết:

```text
Hệ thống EShop là một nền tảng thương mại điện tử vô cùng hiện đại và đáng chú ý, được thiết kế nhằm mục đích mang đến cho người dùng những trải nghiệm mua sắm tuyệt vời nhất có thể, đồng thời cũng giúp cho các quản trị viên có thể dễ dàng quản lý...
```

Viết:

```text
EShop là web bán hàng mẫu dùng cho bài HW03. Web có 3 phần: cửa hàng, trang quản trị và ứng dụng di động.

Mục tiêu của tài liệu này là liệt kê các lỗi tìm được ở màn hình Home.
```

## Kiểm tra cuối

- [ ] Tiếng Việt có dấu, câu ngắn, dễ hiểu.
- [ ] Không có ký tự ngoài bàn phím.
- [ ] Không có đoạn văn dài quá 5 câu.
- [ ] Thông tin khớp với `README.md` hoặc code đã đọc.
- [ ] Không lặp ý, không lan man.
- [ ] `git diff` chỉ đổi đúng phần cần đổi.
