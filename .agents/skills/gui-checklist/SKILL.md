---
name: gui-checklist
description: Thiết kế GUI checklist cho kiểm thử giao diện (GUI testing) - danh sách mục kiểm tra Pass/Fail cho màn hình hoặc tính năng, đảm bảo bao phủ đủ 4 interface aspects - General UI standards, Forms, Navigation, Feedback/state. Dùng skill này bất cứ khi nào người dùng nhắc đến "GUI checklist", "UI checklist", "checklist kiểm thử giao diện", "kiểm thử GUI", "GUI testing", "UI review checklist", hoặc đưa mô tả màn hình, spec, user story, screenshot, link Figma và nhờ liệt kê những gì cần kiểm tra trên giao diện, kể cả khi họ không nói rõ chữ "checklist". KHÔNG dùng để chia phân vùng/giá trị biên của dữ liệu nhập (đó là domain testing) và không viết automation script.
---

# GUI Checklist

Sinh checklist kiểm thử GUI: các mục kiểm tra Pass/Fail, bám theo từng màn hình hoặc tính năng cụ thể, bao phủ 4 khía cạnh giao diện (interface aspects):

1. **General UI standards** - bố cục, kiểu chữ, màu sắc, tính nhất quán, responsive, nội dung hiển thị
2. **Forms** - nhãn, loại control, thứ tự focus, cách hiển thị lỗi, nút gửi
3. **Navigation** - menu, liên kết, nút quay lại, trạng thái "đang ở đâu", modal, deep link
4. **Feedback / state** - loading, empty, error, success, disabled, hover/focus, xác nhận hành động

Lý do dùng bộ khung 4 aspect: checklist viết tay thường lệch về "trông có đẹp không" và bỏ sót hành vi (trạng thái, điều hướng, phản hồi sau thao tác). Ép mỗi màn hình đi qua cả 4 aspect, hoặc ghi rõ vì sao N/A, là cách để không sót mà vẫn biết sót có chủ ý hay không.

Ngoài phạm vi: phân vùng tương đương/giá trị biên của dữ liệu nhập (dùng skill domain-testing), performance, security, usability testing với người dùng thật, viết automation. Nếu người dùng yêu cầu, nói rõ skill này chưa bao gồm.

## Quy trình

1. **Thu thập đầu vào.** Chấp nhận mô tả màn hình, spec/user story, screenshot, link Figma hoặc URL. Nếu chỉ có tên tính năng chung chung, nêu giả định rõ hoặc hỏi tối đa một câu ngắn rồi làm tiếp, đừng hỏi dồn. Với screenshot, nhìn kỹ để lấy tên nút, label, thông báo thật.
2. **Liệt kê thành phần UI.** Màn hình/trang, form và field, nút/link/menu, bảng/danh sách, modal/toast, các trạng thái dữ liệu (đang tải, rỗng, lỗi, thành công). Đây là "mỏ neo" để item cụ thể thay vì chung chung.
3. **Lập ma trận phủ** màn hình × 4 aspect. Mỗi ô ghi "Áp dụng" hoặc "N/A + lý do ngắn" (ví dụ dashboard chỉ đọc, không có form, thì Forms = N/A). Không bỏ trống ô nào.
4. **Sinh item cho từng aspect áp dụng.** Đọc file tham chiếu tương ứng, chỉ đọc aspect cần dùng:
   - General UI standards: `references/general-ui.md`
   - Forms: `references/forms.md`
   - Navigation: `references/navigation.md`
   - Feedback / state: `references/feedback-state.md`

   Các file này là gợi ý nhóm kiểm tra, không phải danh sách để chép máy móc. Chỉ lấy nhóm nào phù hợp với màn hình đang xét.
5. **Rà chất lượng item** theo mục "Item tốt" bên dưới.
6. **Kiểm tra bao phủ trước khi trả:**
   - Mỗi aspect "Áp dụng" có ít nhất một item.
   - Mỗi thành phần tương tác đã liệt kê (nút, link, field, menu) xuất hiện trong ít nhất một item.
   - Mỗi trạng thái dữ liệu liên quan (loading, empty, error, success) được nhắc tới.
7. **Ghi giả định và câu hỏi mở** khi spec thiếu thông tin.

## Item tốt

- **Một điều kiện kiểm tra cho mỗi item**, để khi Fail chỉ ra đúng một lỗi. "Nút Lưu rõ ràng, đúng màu và đủ lớn" nên tách thành ba item.
- **Quan sát được và có tiêu chí Pass rõ.** Nếu spec/design nêu giá trị cụ thể (màu, kích thước, câu chữ) thì trích vào tiêu chí. Nếu không, tiêu chí là "nhất quán với các màn hình/component khác" hoặc theo chuẩn chung (ví dụ tương phản chữ đạt WCAG AA), và ghi rõ nguồn của tiêu chí.
- **Gắn thành phần có tên thật** trên màn hình ("nút Đăng nhập", "trường Email"), không viết "các nút".
- **Không bịa quy tắc nghiệp vụ.** Spec không nói thì đưa vào câu hỏi mở.
- **Không trùng lặp giữa các aspect.** Đặt item vào aspect mà lỗi dễ nhận ra nhất: thông báo lỗi ngay dưới field thuộc Forms; toast "Lưu thành công" thuộc Feedback/state.

Ví dụ:

| Không tốt | Tốt |
|---|---|
| Giao diện đẹp, dễ nhìn | Khoảng cách giữa label và field "Email" bằng nhau ở mọi field trong form |
| Form hoạt động đúng | Nhấn Enter khi đang ở field "Mật khẩu" thì gửi form, giống nhấn nút Đăng nhập |
| Có thông báo lỗi | Khi mất mạng lúc bấm Lưu, hiển thị thông báo lỗi kết nối và dữ liệu đã nhập vẫn còn nguyên |

## Định dạng đầu ra

Mặc định xuất Markdown, cùng ngôn ngữ người dùng đang dùng, theo thứ tự:

1. **Phạm vi & giả định** (vài dòng)
2. **Ma trận phủ**

   | Màn hình | General UI | Forms | Navigation | Feedback/state |
   |---|---|---|---|---|
   | Đăng nhập | Áp dụng | Áp dụng | Áp dụng | Áp dụng |
   | Dashboard | Áp dụng | N/A - không có form | Áp dụng | Áp dụng |

3. **Checklist theo aspect**, mỗi aspect một bảng:

   | ID | Thành phần | Item kiểm tra | Tiêu chí Pass | Ưu tiên | Kết quả | Ghi chú |
   |---|---|---|---|---|---|---|
   | UI-01 | Header | Logo hiển thị đúng vị trí, không bị méo | Logo giữ tỉ lệ gốc, căn trái theo design | Thấp | | |

   - Tiền tố ID: `UI-` (General UI standards), `FRM-` (Forms), `NAV-` (Navigation), `FB-` (Feedback/state).
   - Ưu tiên: **Cao** nếu lỗi chặn người dùng hoàn thành tác vụ chính hoặc gây mất dữ liệu; **Trung bình** nếu gây nhầm lẫn nhưng vẫn làm được việc; **Thấp** nếu thuần thẩm mỹ.
   - Cột Kết quả để trống cho người kiểm thử điền Pass/Fail.
4. **Tổng kết bao phủ**: số item theo từng aspect, và nhắc lại aspect nào N/A.
5. **Giả định / Câu hỏi mở** nếu có.

Không ép số lượng item. Màn hình đơn giản (như đăng nhập) thường vài chục item tổng cộng là đủ; ưu tiên phủ rộng đủ 4 aspect hơn là nhiều item lặp ý. Xuất thêm file Excel (.xlsx) chỉ khi người dùng yêu cầu.
