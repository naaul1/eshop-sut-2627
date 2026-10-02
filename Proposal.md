# CS423 – CSC15003 – Software Testing (AI-augmented · 2026)
# Topic: T2_Web_Automation_Testing


**Thành viên thực hiện:**
- 23120059: Trần Đình Luân
- 23120064: Nguyễn Thiện Nhân	
- 23120066: Võ Thiện Nhân


# I. Web Automation Test's basis

## 1. Definition

Web Automation Testing là kiểm thử tự động giao diện và luồng nghiệp vụ web bằng script/tool thay cho thao tác thủ công lặp lại. Mục tiêu là để tăng tốc độ test, bao phủ cross-browser, tích hợp CI/CD.

Web Automation Testing nên được thực hiện khi:
- regression test, smoke test
- cần chạy nhiều môi trường/trình duyệt
- chạy những test tốn công (như nhập dữ liệu)
- cần phối hợp với CI  

và không nên thực hiện khi:
- tính năng còn prototype và sẽ thay đổi liên tục
- test dùng vài lần
- những thứ khó automate (captcha, OPT, ...)


## 2. Keywords

| # | Keyword | Giải thích chung |
|---|---|---|
| 1 | DOM | Cấu trúc cây biểu diễn trang web, mọi thao tác tự động đều dựa trên việc truy vấn và tương tác với các node trong cây này |
| 2 | Locator / Selector | Là cách chỉ đường để tool tìm ra nút cần bấm, ví dụ tìm theo tên, theo class hay theo vai trò của nút đó trên trang |
| 3 | Synchronization & Waiting | Trang web cần thời gian để tải xong, còn tool thì chạy rất nhanh. Khái niệm này là cách bắt tool chờ trang load xong rồi mới bấm, tránh bấm hụt |
| 4 | Assertion | Câu lệnh kiểm tra kết quả thực tế có khớp kỳ vọng hay không và quyết định test pass hay fail |
| 5 | Test Data | Là dữ liệu được chuẩn bị sẵn để thử (ví dụ tài khoản mẫu hay giỏ hàng mẫu), sao cho test có thể thực hiện lặp lại giống nhau |
| 6 | Test Environment | Môi trường chạy kiểm thử gồm trình duyệt, hệ điều hành, cấu hình mạng và hạ tầng thực thi, tách biệt với môi trường thật |
| 7 | POM (Page Object Model) | Là cách gói mỗi trang web thành một bản vẽ riêng, ghi sẵn nút nào ở đâu và bấm ra sao. Test chỉ cần gọi bản vẽ đó, khi giao diện đổi thì sửa một chỗ thay vì sửa hết mọi test |
| 8 | Browser Context | Phiên trình duyệt cách ly độc lập (cookie, storage riêng), cho phép chạy nhiều vai trò song song không lẫn session |

## 3. Procedure



# II. Tool short-list

## 1. Candidate tools

**Traditional tool:** Playwright

**AI-augmented tool:** Mabl

**Backup:** Selenium 4


## 2. Comparison Matrix
| Tiêu chí | Playwright | Mabl | Selenium 4 |
| :--- | :--- | :--- | :--- |
| **1. Phí bản quyền** | - Hoàn toàn miễn phí và mã nguồn mở (Giấy phép Apache License 2.0) | - Không miễn phí, không mã nguồn mở.<br>- Chi phí bản quyền dạng Subscription và được báo giá tùy chỉnh dựa trên số lượng tính năng và nhu cầu chạy test song song trên Cloud của doanh nghiệp. | - Hoàn toàn miễn phí và mã nguồn mở (Giấy phép Apache License 2.0) |
| **2. Learning curve** | - Độ khó cao.<br>- Đòi hỏi nền tảng lập trình vững (hỗ trợ JavaScript/TypeScript, Python, Java, .NET) và kiến thức về xử lý bất đồng bộ.<br>- Phù hợp nhất với Lập trình viên hoặc Kỹ sư tự động hóa (SDET). | - Độ khó rất thấp, dễ tiếp cận nhất trong 3 công cụ.<br>- Sử dụng mô hình low-code/no-code (ghi hình thao tác record-and-playback, kéo thả) kết hợp AI tự động sửa lỗi.<br>- Phù hợp với Manual Tester, Business Analyst (BA), hoặc người không có chuyên môn sâu về lập trình. | - Độ khó cực cao.<br>- Đòi hỏi kỹ năng lập trình xuất sắc, am hiểu cấu trúc framework (Page Object Model) và tự quản lý cơ chế chờ.<br>- Dành riêng cho Kỹ sư tự động hóa chuyên sâu.<br>- Hỗ trợ Ruby, JavaScript, C#, Python và Java.|
| **3. EShop Fit** | - Rất tối ưu cho việc kiểm thử 2 phân hệ Frontend Web và Web Admin (React + Vite).<br>- Xử lý rất tốt các kịch bản test chéo (ví dụ: User đặt hàng ở Web sau đó Admin xác nhận ở Web Admin) nhờ khả năng quản lý nhiều trình duyệt/context riêng biệt.<br>- Hỗ trợ mạnh mẽ việc chặn và can thiệp Backend API để test các lỗi bảo mật và logic cố ý cắm sẵn trong mã nguồn.<br>- Hạn chế: Không thể kiểm thử trực tiếp phân hệ Frontend Mobile (React Native + Expo). | - Là công cụ duy nhất trong 3 phần mềm có thể kiểm thử trọn vẹn cả 3 phân hệ: Web, Mobile App (React Native) và trực tiếp Backend API trên cùng một nền tảng.<br>- Đặc biệt phù hợp với kho lưu trữ này vì EShop có chứa các lỗi giao diện cố ý.<br>- Tính năng Visual Testing tích hợp AI của Mabl sẽ phát hiện các sai lệch giao diện như lệch nút, tràn chữ dễ dàng hơn so với việc viết assertion bằng code.<br>- Hạn chế: Free Trial 14 ngày và có yêu cầu email doanh nghiệp. | - Đáp ứng tốt việc kiểm thử Frontend Web và Web Admin.<br>- Có thể kết hợp với hệ sinh thái Appium để mở rộng kiểm thử phân hệ Mobile App (React Native).<br>- Hạn chế: Khó bảo trì khi giao diện React thay đổi, phải tự viết code chờ đợi phần tử tải xong.<br>- Không có cơ chế intercept mạng tinh gọn như Playwright để đánh giá bảo mật hoặc API Backend. |
| **4. AI capabilities** | - Không tích hợp sẵn AI bên trong nền tảng lõi.<br>- Có thể kết hợp với AI để sinh mã.<br>- Có hỗ trợ MCP cho các AI Agent. | - Tích hợp AI rất mạnh mẽ là điểm mạnh cốt lõi.<br>- Nổi bật với tính năng Auto-healing (AI tự động cập nhật và sửa locators khi giao diện web/app thay đổi mà test không bị fail).<br>- Dùng AI để phát hiện lỗi hiển thị và tối ưu hóa thời gian chờ. | - Bản thân thư viện lõi không chứa bất kỳ tính năng AI nào.<br>- Thuần túy là công cụ điều khiển trình duyệt cơ bản.<br>- Việc áp dụng AI hoàn toàn phụ thuộc vào việc kỹ sư tự tích hợp với các thư viện hoặc AI Agent bên ngoài. |
| **5. Community** | - Cộng đồng mã nguồn mở đang phát triển cực mạnh, được chống lưng bởi Microsoft.<br>- Được thảo luận sôi nổi, tốc độ fix bug và ra mắt tính năng mới rất nhanh.<br>- Dễ dàng tìm kiếm hỗ trợ trên GitHub, Discord. | - Cộng đồng người dùng bên ngoài khá khiêm tốn do là phần mềm thương mại đóng.<br>- Rất ít tài liệu hay giải pháp chia sẻ trên các diễn đàn như StackOverflow.<br>- Việc giải quyết vấn đề chủ yếu phụ thuộc vào tài liệu nội bộ và đội ngũ Customer Support của chính hãng Mabl. | - Lâu đời nhất, phổ biến nhất và có hệ sinh thái lớn nhất.<br>- Số lượng tài liệu và khóa học vô tận.<br>- Có nhiều tài liệu cũ và lỗi thời từ Selenium 2/3 trôi nổi. |


## 3. Recommended pick: Playwright
- Cộng đồng phát triển cực nhanh, được Microsoft hậu thuẫn. Tài liệu xuất sắc, hỗ trợ sôi nổi qua GitHub, Discord và StackOverflow.
- Miễn phí nên phù hợp với nhu cầu tối thiểu của sinh viên.
- Tối ưu cho tác vụ kiểm thử Web Frontend (thông qua khả năng quản lý nhiều trình duyệt/context riêng biệt, có thể chặn và can thiệp Backend API để test các lỗi bảo mật và logic cố ý cắm sẵn trong mã nguồn).


# II. AI Disclosure
Sử dụng Gemini Pro để tìm hiểu các phần Learning curve, AI capabilities và Community.
Đã cross-check các thông tin trên bằng Claude Sonnet 5 Medium.
Đã fact check thủ công các criteria, chỉnh sửa phần ngôn ngữ hỗ trợ của 3 software.
Có sử dụng GitHub Copilot để đánh giá mức độ phù hợp của EShop đối với 3 software.
