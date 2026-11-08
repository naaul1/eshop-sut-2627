**CS423 - CSC15003 - Software Testing (AI-augmented / 2026\)**

# HW03 - GUI & Usability

Họ và tên: Trần Đình Luân\
MSSV: 23120059\
Nhóm: 03\

## Scope selection

**SUT:** EShop, chỉ phần Web Admin (`frontend-admin`), chạy tại `http://localhost:5174`.

**Phạm vi chọn:**

- Task 1 - GUI checklist: 4 màn hình admin
  - Dashboard
  - Danh mục
  - Mã Giảm Giá
  - Đơn hàng
- Task 2 - đánh giá usability: Flow B, admin tạo sản phẩm, sửa sản phẩm, import CSV, xem Dashboard.
- Task 3 - cross-browser: Chrome, Firefox, Safari.

## Task 1: GUI Checklist

### 1.1 Phạm vi và mục tiêu

Task 1 kiểm tra giao diện Web Admin của EShop tại `http://localhost:5174`.
Phạm vi gồm 4 màn hình: Dashboard, Danh mục, Mã Giảm Giá, Đơn hàng.
Mục tiêu là thiết kế checklist hơn 40 mục, phủ đủ IA-01 đến IA-04, chạy checklist và ghi lại lỗi.
Không sửa mã nguồn SUT.

### 1.2 Thiết kế checklist

Checklist có 42 mục, lưu tại `docs/checklist.xlsx`.
Bảng dưới đây là phân bổ theo màn hình và IA.

| Màn hình | IA-01 | IA-02 | IA-03 | IA-04 | Tổng |
| --- | ---: | ---: | ---: | ---: | ---: |
| Dashboard | 3 | 0 | 2 | 3 | 8 |
| Danh mục | 2 | 4 | 1 | 3 | 10 |
| Mã Giảm Giá | 3 | 4 | 2 | 3 | 12 |
| Đơn hàng | 2 | 0 | 3 | 7 | 12 |
| **Tổng** | **10** | **8** | **8** | **16** | **42** |

Nguồn mục: 35 mục do AI sinh, 7 mục do sinh viên thêm.
Mỗi mục có các cột: ID, IA, Screen, Check item, Expected, How to test, Source, Why AI missed it, Chrome, Firefox, Safari, Notes, Screenshot, Bug ID.

### 1.3 Prompt AI và review

Công cụ: OpenCode (DeepSeek V4.1 Flash).
Prompt đã dùng:

```text
Bạn là tester GUI. SUT là EShop Admin, React chạy tại http://localhost:5174.
Phạm vi: Dashboard, Danh mục, Mã Giảm Giá, Đơn hàng.
Hãy tạo 42 mục checklist GUI, chia theo 4 nhóm:
- IA-01: General UI standards
- IA-02: Forms
- IA-03: Navigation
- IA-04: Feedback / state

Mỗi mục gồm: ID, IA, màn hình, điều cần kiểm tra, kết quả mong đợi, cách kiểm tra.
Yêu cầu:
- Đúng 42 mục, không trùng lặp.
- Câu ngắn, kiểm tra được, có Passed/Failed rõ ràng.
- Dashboard: 8 mục. Danh mục: 10 mục. Mã Giảm Giá: 12 mục. Đơn hàng: 12 mục.
- Có mục về form, label, dấu *, lỗi trên nút submit.
- Có mục về bảng, empty state, loading, lỗi mạng.
- Có mục về navigation, tab active, keyboard, tab order.
- Có mục về trạng thái đơn hàng và quy tắc chuyển trạng thái.
- Có mục về accessibility, contrast, zoom, responsive, dark mode, RTL.
- Không bịa FR. Nếu không chắc, ghi "cần kiểm tra".
```

Bộ nháp AI sinh có các mục chung chung và một số mục ngoài phạm vi.
Tôi đã yêu cầu sửa các mục theo FR trong README và thêm 7 check.
Tôi review lại theo các bước sau:

- Loại mục ngoài phạm vi: storefront, giỏ hàng, thanh toán, mobile, đăng nhập, ảnh sản phẩm.
- Loại mục không kiểm tra được hoặc không có expected rõ ràng.
- Loại expected không có trong README: tên danh mục trùng hoặc quá dài, dialog xóa danh mục và coupon, phản hồi thành công, phân trang.
- Cũng loại: responsive, zoom, contrast, dark mode, RTL, Back và refresh.
- Đổi các mục chung chung thành mục bám FR-21 đến FR-24, FR-13, FR-14, FR-17 và FR-18.
- Giữ đúng 42 mục, không thêm mục rác cho đủ số.

### 1.4 Mục sinh viên thêm

Bảy mục dưới đây do sinh viên thêm sau khi đọc code.
Cột "Vì sao AI bỏ sót" giải thích lý do AI không sinh ra mục này.

| ID | Nội dung kiểm tra | Vì sao AI bỏ sót |
| --- | --- | --- |
| GUI-002 | Nhãn, nút, tiêu đề dùng tiếng Việt | AI không được cung cấp ngữ cảnh tiếng Việt |
| GUI-005 | Sidebar thao tác được bằng bàn phím | AI không thấy code sidebar dùng thẻ li với onClick |
| GUI-011 | Ô nhập có label và dấu * | AI bỏ qua đặc điểm form của trang admin |
| GUI-015 | Tab Danh mục được highlight | AI bỏ qua yêu cầu highlight của FR-23 |
| GUI-034 | Thứ tự focus trong trang đi đúng hướng | AI bỏ qua tab order toàn trang |
| GUI-035 | Nút hành động nhận focus và kích hoạt bằng bàn phím | AI bỏ qua keyboard trong bảng có nhiều nút |
| GUI-040 | Đơn canceled và delivered không chuyển được sang trạng thái khác | AI không biết quy tắc state machine của FR-10 |

### 1.5 Kết quả thực thi

| Màn hình | Passed | Failed | Tổng |
| --- | ---: | ---: | ---: |
| Dashboard | 4 | 4 | 8 |
| Danh mục | 5 | 5 | 10 |
| Mã Giảm Giá | 4 | 8 | 12 |
| Đơn hàng | 5 | 7 | 12 |
| **Tổng** | **18** | **24** | **42** |

| IA | Passed | Failed | Tổng |
| --- | ---: | ---: | ---: |
| IA-01 | 4 | 6 | 10 |
| IA-02 | 2 | 6 | 8 |
| IA-03 | 6 | 2 | 8 |
| IA-04 | 6 | 10 | 16 |
| **Tổng** | **18** | **24** | **42** |

Cột Notes trong `docs/checklist.xlsx` ghi lý do cho từng mục Failed.
Ba cột Chrome, Firefox và Safari đều có 18 Passed và 24 Failed.
Không có mục Blocked hoặc Not run.

### 1.6 Danh sách lỗi

24 mục Failed được gom thành 11 lỗi.
Bảng dưới đây là danh sách lỗi trong báo cáo Markdown.

| Bug ID | Mô tả ngắn | Màn hình | FR/IA | Mục Failed | Severity |
| --- | --- | --- | --- | --- | --- |
| BUG-01 | Tiêu đề trang dùng h2, h1 là tên sidebar | Cả 4 màn hình | FR-21 | GUI-001, GUI-009, GUI-019, GUI-031 | Minor |
| BUG-02 | Dashboard còn nhãn tiếng Anh Delivered | Dashboard | FR-21 | GUI-002 | Minor |
| BUG-03 | Sidebar không thao tác được bằng bàn phím | Cả 4 màn hình | FR-21 | GUI-005, GUI-034 | Major |
| BUG-04 | Doanh thu Dashboard nhân đôi đơn delivered | Dashboard | FR-13 | GUI-006 | Critical |
| BUG-05 | Form Danh mục thiếu label, dấu * và chặn rỗng | Danh mục | FR-14, FR-22 | GUI-011, GUI-012, GUI-013 | Major |
| BUG-06 | Bảng thiếu empty state | Danh mục, Mã Giảm Giá, Đơn hàng | FR-24 | GUI-018, GUI-030, GUI-036 | Minor |
| BUG-07 | Form Mã Giảm Giá thiếu label, validation và báo lỗi | Mã Giảm Giá | FR-17, FR-22 | GUI-022, GUI-024, GUI-025, GUI-028, GUI-029 | Major |
| BUG-08 | Nút Tạo mã dùng màu cam | Mã Giảm Giá | FR-21 | GUI-020 | Minor |
| BUG-09 | Nút trạng thái sai màu và thiếu Hủy ở shipping | Đơn hàng | FR-10, FR-21 | GUI-039, GUI-041 | Major |
| BUG-10 | Đơn canceled vẫn chuyển được sang delivered | Đơn hàng | FR-10 | GUI-040 | Critical |
| BUG-11 | Địa chỉ giao hàng render HTML | Đơn hàng | FR-18, SEC-04 | GUI-042 | Critical |

### 1.7 Ảnh minh chứng và GitHub Issues

Trạng thái hiện tại:

- Chưa có ảnh minh chứng trong repo. Cần chụp 24 mục Failed, mỗi ảnh có tên sinh viên và URL `http://localhost:5174`.
- Chưa tạo GitHub Issues. Môi trường hiện tại không có `gh` CLI và token. Cần tạo 11 issue, gắn nhãn `bug`, `GUI`, `severity`, rồi dán link vào cột Bug ID trong checklist.

Hai việc này phải hoàn thành trước khi nộp.

## Task 2: Usability Evaluation
