**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026\)**

# AI Critique - 200–300 từ

Trong HW03, AI giúp tôi dựng nhanh khung checklist, dàn báo cáo và bảng điểm SUS. Tuy nhiên AI sai ở nhiều chỗ cụ thể. Bộ nháp checklist đầu tiên có mục về storefront, giỏ hàng, thanh toán và ảnh sản phẩm, dù phạm vi chỉ là 4 màn hình Web Admin. AI còn đưa expected không có trong README, ví dụ tên danh mục trùng hoặc dialog xác nhận xóa. Nhiều mục chung chung phải viết lại để bám FR-21 đến FR-24.

AI cũng bỏ sót 7 mục quan trọng. Sidebar dùng thẻ li với onClick nên không thao tác được bằng bàn phím, mà AI không thấy code nên không sinh mục này. Tương tự, AI bỏ qua thứ tự focus, nhãn và dấu sao của form, trạng thái tab active và quy tắc state machine FR-10 của đơn hàng.

Về số liệu, bản nháp Task 1 ghi 18 Passed và 24 Failed, trong khi chạy thật cho 22 Passed và 20 Failed. Con số do AI sinh chỉ là ước lượng vì AI không tự chạy được hệ thống. Bản Task 2 cũng thiếu phần báo cáo BUG-11.

Các lỗi trên lặp lại vì ba lý do. AI không đọc được mã nguồn của SUT. AI không có ngữ cảnh tiếng Việt của giao diện. AI thiên về mẫu web bán hàng chung chung, không phải trang quản trị.

Nguyên tắc tôi rút ra: dùng AI để sinh bản nháp đầu, không dùng AI làm nguồn chân lý. Mỗi mục checklist và mỗi con số đều phải đối chiếu với README, mã nguồn và lần chạy thật. AI tăng tốc phần nháp, người kiểm thử chịu trách nhiệm phần đúng.
