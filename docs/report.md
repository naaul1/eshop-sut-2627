**CS423 - CSC15003 - Software Testing (AI-augmented / 2026\)**

# HW03 - GUI & Usability

Họ và tên: Trần Đình Luân\
MSSV: 23120059\
Nhóm: 03
Github Repository: https://github.com/naaul1/eshop-sut-2627/tree/luan-hw3

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
Với phạm vi: Dashboard, Danh mục, Mã Giảm Giá, Đơn hàng. Hãy tạo 42 mục checklist GUI, chia theo 4 nhóm như trong `README.md`. Mỗi mục gồm: ID, IA, màn hình, điều cần kiểm tra, kết quả mong đợi, cách kiểm tra. Không bịa FR. Nếu không chắc, hãy xác nhận lại với tôi.
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
| Dashboard | 5 | 3 | 8 |
| Danh mục | 6 | 4 | 10 |
| Mã Giảm Giá | 5 | 7 | 12 |
| Đơn hàng | 6 | 6 | 12 |
| **Tổng** | **22** | **20** | **42** |

| IA | Passed | Failed | Tổng |
| --- | ---: | ---: | ---: |
| IA-01 | 8 | 2 | 10 |
| IA-02 | 2 | 6 | 8 |
| IA-03 | 6 | 2 | 8 |
| IA-04 | 6 | 10 | 16 |
| **Tổng** | **22** | **20** | **42** |

Cột Notes trong `docs/checklist.xlsx` ghi lý do cho từng mục Failed.
Ba cột Chrome, Firefox và Safari đều có 22 Passed và 20 Failed.
Không có mục Blocked hoặc Not run.

### 1.6 Danh sách lỗi

20 mục Failed được gom thành 11 lỗi.
Bảng dưới đây là danh sách lỗi trong báo cáo Markdown.

| Bug ID | Mô tả ngắn | Màn hình | FR/IA | Mục Failed | Severity |
| --- | --- | --- | --- | --- | --- |
| BUG-01 | Địa chỉ giao hàng render HTML | Đơn hàng | FR-18, SEC-04 | GUI-042 | Critical |
| BUG-02 | Dashboard còn nhãn tiếng Anh Delivered | Dashboard | FR-21 | GUI-002 | Minor |
| BUG-03 | Sidebar không thao tác được bằng bàn phím | Cả 4 màn hình | FR-21 | GUI-005, GUI-034 | Major |
| BUG-04 | Doanh thu Dashboard nhân đôi đơn delivered | Dashboard | FR-13 | GUI-006 | Critical |
| BUG-05 | Form Danh mục thiếu label, dấu * và chặn rỗng | Danh mục | FR-14, FR-22 | GUI-011, GUI-012, GUI-013 | Major |
| BUG-06 | Bảng thiếu empty state | Danh mục, Mã Giảm Giá, Đơn hàng | FR-24 | GUI-018, GUI-030, GUI-036 | Minor |
| BUG-07 | Form Mã Giảm Giá thiếu label, validation và báo lỗi | Mã Giảm Giá | FR-17, FR-22 | GUI-022, GUI-024, GUI-025, GUI-028, GUI-029 | Major |
| BUG-08 | Nút Tạo mã dùng màu cam | Mã Giảm Giá | FR-21 | GUI-020 | Minor |
| BUG-09 | Nút trạng thái sai màu và thiếu Hủy ở shipping | Đơn hàng | FR-10, FR-21 | GUI-039, GUI-041 | Major |
| BUG-10 | Đơn canceled vẫn chuyển được sang delivered | Đơn hàng | FR-10 | GUI-040 | Critical |

### 1.7 Ảnh minh chứng và GitHub Issues

Các ảnh minh chứng, bao gồm đa nên tảng ở task 3 được chứa trong folder [images/](images/).

#### Github Issues 

Các issues từ [BUG-01] đến [BUG-10] được tạo trên Github với Prefix [BUG-XX - GUI].

**Danh sách các Issue**

- [BUG-01 - GUI](https://github.com/naaul1/eshop-sut-2627/issues/42)
- [BUG-02 - GUI](https://github.com/naaul1/eshop-sut-2627/issues/43)
- [BUG-03 - GUI](https://github.com/naaul1/eshop-sut-2627/issues/44)
- [BUG-04 - GUI](https://github.com/naaul1/eshop-sut-2627/issues/45)
- [BUG-05 - GUI](https://github.com/naaul1/eshop-sut-2627/issues/46)
- [BUG-06 - GUI](https://github.com/naaul1/eshop-sut-2627/issues/47)
- [BUG-07 - GUI](https://github.com/naaul1/eshop-sut-2627/issues/48)
- [BUG-08 - GUI](https://github.com/naaul1/eshop-sut-2627/issues/49)
- [BUG-09 - GUI](https://github.com/naaul1/eshop-sut-2627/issues/50)
- [BUG-10 - GUI](https://github.com/naaul1/eshop-sut-2627/issues/51)


## Task 2: Usability Evaluation

### 2.1 Phạm vi và mục tiêu

Task 2 đánh giá độ tiện dụng của hệ thống qua một luồng nghiệp vụ hoàn chỉnh.
Phạm vi đánh giá chọn Flow: Quản trị viên tạo sản phẩm, sửa sản phẩm, import CSV và xem Dashboard.
Mục tiêu là tìm ra các điểm nghẽn tương tác, đánh giá độ rõ ràng của giao diện và mức độ tin cậy của số liệu báo cáo.
Bài đánh giá được thực hiện với 1 phiên thử nghiệm pilot và 7 phiên thử nghiệm chính thức với người dùng thật.

### 2.2 Kịch bản đánh giá

Kịch bản được thiết kế theo hướng mục tiêu, không đưa ra chỉ dẫn từng bước.
Nội dung giao cho người tham gia:

> "Bạn là quản trị viên của cửa hàng EShop. Bạn hãy tạo một sản phẩm mới tên 'Bình giữ nhiệt' giá 250000 đ thuộc danh mục 'Phụ kiện'.
> Sau đó, bạn đổi giá sản phẩm này thành 220000 đ.
> Tiếp theo, bạn nhập danh sách sản phẩm từ file products.csv có sẵn trên Desktop vào hệ thống.
> Cuối cùng, bạn mở Dashboard và đọc giúp tôi tổng doanh thu cùng số lượng đơn hàng hiện tại.
> Trong lúc thực hiện, bạn hãy vừa làm vừa nói to suy nghĩ của mình."

Tiêu chí hoàn thành kịch bản:
- Tạo thành công sản phẩm với đúng tên và giá ban đầu.
- Cập nhật đúng giá mới vào danh sách.
- Thực hiện xong thao tác import dữ liệu từ file CSV.
- Đọc đúng hai chỉ số thống kê trên màn hình Dashboard.

### 2.3 Công cụ thu thập dữ liệu

Buổi kiểm thử được tổ chức trực tuyến qua Discord, người tham gia share màn hình để người điều hành quan sát.
Người điều hành ghi lại điểm nghẽn, thời gian và phát biểu của người tham gia trong khi họ thực hiện kịch bản.
Ba công cụ được chuẩn bị trước:
- Phiếu khảo sát SUS gồm 10 nhận định chuẩn tiếng Việt với thang điểm từ 1 đến 5.
- Bộ câu hỏi mở đào sâu sau phiên, chia theo 4 nhóm: độ rõ ràng, xử lý lỗi, tốc độ phản hồi và độ tin cậy.

### 2.4 Người tham gia và phiên pilot

Người tham gia là 7 sinh viên quen trên mạng, không thuộc lớp môn học.
Các phiên kiểm thử được thực hiện qua Discord với tính năng share màn hình.
Phiên pilot được thực hiện trước với người tham gia P00 để rà soát kịch bản và chuẩn bị môi trường.
Bảng dưới đây là danh sách người tham gia, số liên lạc được che bốn số giữa.

| Mã | Họ và tên | Nghề nghiệp | Liên hệ (che giữa) |
| --- | --- | --- | --- |
| P00 | Trần Anh Đức | Sinh viên | 0346***645 |
| P01 | Nguyễn Hồng Dương | Sinh viên | 0768***504 |
| P02 | Dương Trọng Nhân | Sinh viên | 0978***824 |
| P03 | Hà Nhất Khang | Sinh viên | Discord: khang***gai |
| P04 | Lê Hoàng Thịnh | Sinh viên | Discord: nut***822 |
| P05 | Đỗ Nguyên Hoàng | Sinh viên | 0865***872 |
| P06 | Phạm Quốc Huy | Sinh viên | Discord: cheese**tu |
| P07 | Lê Bảo Anh | Sinh viên | Discord: thered***ler |

Bài học từ phiên pilot:
- Cần gửi file `products.csv` cho người tham gia trước qua Discord để họ tải về Desktop.
- Người điều hành cần giữ thái độ trung lập khi phần mềm phát sinh lỗi giao diện.

### 2.5 Kết quả đánh giá SUS

Sau khi hoàn thành thao tác, 7 người tham gia làm bài khảo sát SUS.
Điểm từng câu được quy đổi theo công thức chuẩn và nhân hệ số 2.5 để ra điểm trên thang 100.

| Mã | Thời gian làm | Điểm SUS | Đánh giá |
| --- | --- | --- | --- |
| P01 | 6p30 | 62.5 | Trung bình |
| P02 | 8p10 | 55.0 | Dưới trung bình |
| P03 | 5p15 | 65.0 | Trung bình |
| P04 | 10p45 | 50.0 | Kém |
| P05 | 7p20 | 57.5 | Dưới trung bình |
| P06 | 6p00 | 62.5 | Trung bình |
| P07 | 8p40 | 55.0 | Dưới trung bình |
| **Trung bình** | | **7p31** | **58.2** | **Dưới trung bình** |

Điểm trung bình của 7 phiên đạt 58.2 điểm.
Mức điểm này thấp hơn ngưỡng trung bình ngành 68 điểm, tương đương mức D.
Kết quả cho thấy hệ thống chưa thân thiện và còn nhiều rào cản tương tác.

### 2.6 Phân tích và phân loại vấn đề

Từ ghi chú quan sát trong 7 phiên, các vấn đề được gom nhóm và xếp hạng theo mức độ nghiêm trọng.
Có 6 vấn đề nổi bật, gồm lỗi chức năng và lỗi thiết kế giao diện.

| Mã | Nội dung phát hiện | Phân loại | Mức độ | Số người gặp |
| --- | --- | --- | --- | --- |
| UF-01 | Thiếu phản hồi khi lưu sản phẩm mới | Thiết kế UI | Major | 5/7 |
| UF-02 | Tên toàn bộ sản phẩm bị đổi khi sửa một món | Lỗi chức năng | Critical | 7/7 |
| UF-03 | Form thiếu nhãn và dấu sao bắt buộc | Thiết kế UI | Minor | 6/7 |
| UF-04 | Nút bấm import CSV dễ bị bỏ sót sau khi chọn tệp | Tương tác | Major | 4/7 |
| UF-05 | Doanh thu Dashboard sai lệch và nhãn tiếng Anh | Lỗi chức năng | Critical | 3/7 |
| UF-06 | Thanh bên không đổi URL, tải lại trang mất dữ liệu | Điều hướng | Major | 2/7 |

Chi tiết các vấn đề chính:
- UF-01: Form thêm sản phẩm tự xóa trắng sau khi bấm lưu nhưng không hiện thông báo thành công. Người dùng không biết đã lưu được chưa nên phải cuộn chuột kiểm tra.
- UF-02: Đây là lỗi chức năng nghiêm trọng trong mã nguồn (mã hóa BUG-11). Khi bấm lưu sau khi sửa một sản phẩm, danh sách bên dưới bị đổi toàn bộ tên sang sản phẩm vừa sửa. Cả 7 người dùng đều bất ngờ và lo lắng mất dữ liệu.
- UF-03: Các ô nhập chỉ có chữ chìm mà không có nhãn trường phía trên. Khi người dùng bắt đầu gõ thì mất chữ gợi ý, gây khó khăn cho việc kiểm tra lại thông tin.
- UF-04: Sau khi chọn file CSV, bảng xem trước hiện ra nhưng nút bấm nạp dữ liệu nằm ở vị trí khó thấy, làm 4 người lầm tưởng thao tác đã hoàn thành.
- UF-05: Doanh thu Dashboard bị tính gấp đôi đơn hoàn tất, hiển thị 1000000 đ thay vì 500000 đ. Lỗi này làm mất lòng tin của người dùng.

### 2.7 Báo cáo lỗi và trạng thái thực hiện

Qua buổi đánh giá usability, nhóm kiểm thử phát hiện thêm 1 lỗi chức năng mới ngoài checklist của Task 1:
- BUG-11: Chức năng sửa sản phẩm cập nhật nhầm tên cho tất cả sản phẩm trong bảng (Severity: Critical, liên quan FR-15).
- Lỗi BUG-04 từ Task 1 tiếp tục tái hiện tại Dashboard khi người dùng kiểm tra doanh thu.

Trạng thái thực hiện hiện tại:
- Tài liệu kịch bản, phiếu khảo sát, ghi chú phiên và phân tích đã lưu đầy đủ trong thư mục `docs/usability/`.

## Task 3: Cross-Browser / Cross-Platform

### 3.1 Phạm vi và mục tiêu

Task 3 kiểm tra lại checklist 42 mục của Task 1 trên 3 trình duyệt: Chrome, Firefox và Safari.
Cả 3 phiên đều truy cập ứng dụng Web Admin tại địa chỉ đã deploy trên Render: `https://admin-nmip.onrender.com/`.
Mục tiêu là đánh giá tính tương thích hiển thị và kiểm tra các lỗi ở Task 1 có lặp lại giống nhau giữa các trình duyệt hay không.

### 3.2 Công cụ và môi trường kiểm thử

Công cụ sử dụng là nền tảng đám mây Sauce Labs.
Sauce Labs cho phép kết nối đường hầm (tunnel) để kiểm thử trang web nội bộ trên các máy ảo chạy trình duyệt và hệ điều hành khác nhau.
Ba nền tảng được lựa chọn kiểm thử gồm:
- Chrome trên hệ điều hành Windows.
- Firefox trên hệ điều hành Windows.
- Safari trên hệ điều hành macOS.

Mỗi ảnh chụp màn hình đều thể hiện rõ thanh địa chỉ URL, tên trình duyệt và hệ điều hành tương ứng.
Trên mỗi ảnh có mở cửa sổ terminal echo tên và email sinh viên `23120059@student.hcmus.edu.vn` theo đúng quy định.

### 3.3 Kết quả thực hiện

Toàn bộ 42 mục kiểm tra đều được chạy đủ trên cả 3 trình duyệt.
Kết quả giữa 3 trình duyệt hoàn toàn đồng nhất:
- Chrome: 22 Passed, 20 Failed.
- Firefox: 22 Passed, 20 Failed.
- Safari: 22 Passed, 20 Failed.

Không có lỗi giao diện nào chỉ xuất hiện riêng lẻ trên một trình duyệt.
Toàn bộ 20 mục Failed đều tái hiện chính xác giống với kết quả đã ghi nhận ở mục 1.5 và 1.6.

### 3.4 Bảng tổng hợp ảnh minh chứng

Tôi đã chụp lại toàn bộ ảnh minh chứng cho từng mục kiểm thử trên cả 3 nền tảng.
Tổng cộng có 38 ảnh chụp được phân loại và lưu trữ theo từng thư mục trong repo:

| Trình duyệt | Nền tảng hệ điều hành | Số lượng ảnh | Thư mục lưu trữ |
| --- | --- | ---: | --- |
| Chrome | Windows | 13 | `docs/images/chrome/` |
| Firefox | Windows | 12 | `docs/images/firefox/` |
| Safari | macOS | 13 | `docs/images/safari/` |
| **Tổng** | **3 nền tảng** | **38** | `docs/images/` |
