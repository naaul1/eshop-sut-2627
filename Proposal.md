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
- những thứ khó automate (captcha, OTP, ...)


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


1. Phân tích cái gì cần test tự động
Chọn việc lặp lại nhiều, ít thay đổi (Login, Search, Cart, Checkout, Admin CRUD, ...). Chức năng mới bắt đầu làm lần đầu thì test tay trước.
2. Chọn tool + framework: theo tiêu chí Proposal: phí, learning curve, EShop Fit, AI, community.
3. Thiết kế framework: POM + cấu trúc tests/, quản lý data, quản lý secret/JWT.
4. Viết script: Viết từng bước: mở trang -> tìm nút bằng Locator -> bấm/nhập -> chờ trang load -> kiểm tra đúng sai bằng assertion.
5. Chạy script và bảo cáo: Chạy thử local để sửa lỗi, rồi chuyển sang chạy ngầm, chạy nhiều trình duyệt song song. Fail thì xem screenshot và log để biết và sửa.
6. Bảo trì: Giao diện đổi thì phải sửa lại test, không cần viết mới mà thông qua sửa locator và POM.

# II. Tool short-list

## 1. Candidate tools

**Traditional tool:** Playwright, Selenium 4, Cypress, WebdriverIO.

**AI-augmented tool:** Mabl, Testim AI.


## 2. Comparison Matrix

| Tiêu chí | Playwright | Mabl | Cypress | Selenium 4 | Testim AI | WebdriverIO |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Phí bản quyền** | Miễn phí, Open-source (Apache 2.0). | Trả phí (Subscription), báo giá custom. | Freemium (Local: Miễn phí (MIT), Cloud: Trả phí). | Miễn phí, Open-source (Apache 2.0) . | Trả phí, có bản Free trial giới hạn. | Miễn phí, Open-source (MIT) . |
| **2. Learning curve** | Khó. Yêu cầu JS/TS, Python, Java, .NET. Phù hợp Dev/SDET. | Rất dễ. Low-code/No-code. Phù hợp Manual QA/BA. | Trung bình. Yêu cầu biết JS/TS. Phù hợp QA/FE Dev. | Rất khó. Cần kỹ năng code cao, bắt buộc biết POM + tự quản wait. Phù hợp Automation Engineer. | Rất dễ. Low-code/No-code. Phù hợp Manual QA/BA. | Trung bình. Yêu cầu biết JS/TS. Dễ cấu hình hơn Selenium. |
| **3. EShop Fit** | Rất tốt cho Web/Admin. Test chéo và API xuất sắc. Không hỗ trợ Mobile. | Tốt cho cả 3 (Web, Mobile, API). Hỗ trợ Visual test mạnh. Hạn chế: Trial ngắn. | Tốt cho Web độc lập. Không hỗ trợ Mobile. Test chéo domain cồng kềnh. | Tốt cho Web. Có thể kết hợp Appium cho Mobile. Khó bảo trì, có chặn API nhưng cồng kềnh hơn Playwright. | Tối ưu cho Web (React) và Mobile. Giả lập mạng và xử lý API phức tạp. | Rất tốt cho cả Web, Admin và Mobile. Xử lý API dễ, nhưng cần tự code bắt lỗi. |
| **4. AI capabilities** | Không có sẵn. Phải tích hợp Agent ngoài (MCP). | Rất mạnh. Tích hợp sẵn Auto-healing (AI tự động cập nhật và sửa locators khi giao diện web/app thay đổi mà test không bị fail), Visual test. | Mạnh. Có Cypress AI Studio, auto-healing và trợ lý AI. | Không có sẵn. | Rất mạnh. Auto-healing, sinh test data thông minh. | Không có sẵn. Có MCP hỗ trợ AI Agent. |
| **5. Community** | Rất lớn mạnh, hỗ trợ tốt từ Microsoft, fix bug nhanh. | Nhỏ, hệ sinh thái đóng. Phụ thuộc Support của hãng. | Rất lớn, tài liệu phong phú, hệ sinh thái Plugin khổng lồ. | Lớn nhất, lâu đời. Dễ lẫn lộn với tài liệu cũ/lỗi thời. | Trung bình. Dựa chủ yếu vào Support ticket chính hãng. | Lớn mạnh trong hệ Node.js. Cộng đồng Discord sôi nổi, nhiều plugin. |


## 3. Recommended pick

**Playwright (chính)**
- Miễn phí và mã nguồn mở nên phù hợp với nhu cầu và khả năng của sinh viên.
- Tối ưu cho tác vụ kiểm thử Web Frontend (thông qua khả năng quản lý nhiều trình duyệt/context riêng biệt, có thể chặn và can thiệp Backend API để test các lỗi bảo mật và logic cố ý cắm sẵn trong mã nguồn).
- Cộng đồng phát triển cực nhanh, được Microsoft hậu thuẫn. Tài liệu xuất sắc, hỗ trợ sôi nổi qua GitHub, Discord và StackOverflow, có MCP hỗ trợ AI Agent.

**WebdriverIO**
- Miễn phí, mã nguồn mở, chạy trên Node.js nên đồng nhất với stack React + Vite của EShop, chỉ cần giỏi JS/TS là đủ.
- Cấu hình nhẹ hơn Selenium 4, hỗ trợ sẵn WebDriver + BiDi/CDP với plugin phong phú, dễ viết test chéo Web + Admin và intercept API kiểm thử bảo mật.
- Cộng đồng Node.js lớn, Discord sôi nổi, tài liệu hiện đại ít lẫn doc cũ như Selenium 2/3, có MCP hỗ trợ AI Agent, phù hợp định hướng AI-augmented của môn học.


# III. AI Disclosure
Sử dụng Muse Spark 1.3 để tra cứu các từ khoá (đã tìm hiểu và xác nhận thủ công), cũng như giải thích về quy trình test tự động.
Sử dụng Gemini Pro để tìm hiểu các phần Learning curve, AI capabilities và Community của các phần mềm kiểm thử.
Đã cross-check các thông tin về các phần mềm trên bằng Claude Sonnet 5 Medium.
Đã fact check thủ công các criteria, chỉnh sửa phần ngôn ngữ hỗ trợ.
Có sử dụng GitHub Copilot để đánh giá mức độ phù hợp của EShop đối với các phần mềm.
