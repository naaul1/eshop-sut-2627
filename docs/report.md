**CS423 – CSC15003 – Software Testing (AI-augmented · 2026)**

# BÁO CÁO SEMINAR

**Topic: T2_Web_Automation_Testing**

## I. Thông tin chung

### Nhóm thực hiện

Mã nhóm: 3

Thành viên thực hiện:**
  - 23120059: Trần Đình Luân
  - 23120064: Nguyễn Thiện Nhân	
  - 23120066: Võ Thiện Nhân

### Giảng viên hướng dẫn

Giảng viên lý thuyết: Lâm Quang Vũ

Giảng viên thực hành: Trương Phước Lộc 


## II. Nội dung lý thuyết

### 1. Định nghĩa

Web Automation Testing là kiểm thử tự động giao diện và luồng nghiệp vụ web bằng script/tool thay cho thao tác thủ công lặp lại. Mục tiêu là để tăng tốc độ test, bao phủ cross-browser, tích hợp CI/CD,...

Web Automation Testing nên được thực hiện khi:
- regression test, smoke test
- cần chạy nhiều môi trường/trình duyệt
- chạy những test tốn công (như nhập dữ liệu)
- cần phối hợp với CI  

và không nên thực hiện khi:
- tính năng còn prototype và sẽ thay đổi liên tục
- test chỉ dùng vài lần
- những thứ khó automate (captcha, OTP,...)

### 2. Keywords

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
| 9 | Test Configuration (Project) | Một cấu hình chạy: quy định bộ test sẽ chạy trên trình duyệt, kích thước màn hình và môi trường nào. Một lệnh chạy có thể lặp lại toàn bộ test qua nhiều cấu hình để bao phủ cross-browser (trong Playwright gọi là Project) |
| 10 | Headed / Headless | Hai chế độ chạy trình duyệt: hiện giao diện để quan sát khi demo/debug, hoặc chạy ngầm không giao diện để chạy nhanh trên CI |
| 11 | Slow-motion (slowMo) | Tùy chọn chèn độ trễ giữa các thao tác để mắt người theo kịp khi demo |
| 12 | Retrying Assertion | Assertion tự thử lại nhiều lần đến khi hết timeout thay vì kết luận ngay ở lần kiểm tra đầu tiên, giúp test bớt chập chờn khi trang tải chậm |
| 13 | Data-driven Testing | Một flow test chạy lặp với bảng dữ liệu nhiều dòng, mỗi dòng là một case |
| 14 | Fixture | Tool dùng chung do phần mềm cấp hoặc tự viết, có thể tự dựng môi trường/dữ liệu trước và tự dọn sau mỗi test (ví dụ trang trắng `page`, client gọi API `request`) |
| 15 | Network Intercept | Kỹ thuật chặn và chỉnh sửa request/response API giữa frontend và backend để kiểm thử logic và bảo mật mà không cần sửa server (trong Playwright dùng `page.route`) |
| 16 | State Machine | Mô hình trạng thái và các chuyển đổi cho phép của một đối tượng (ví dụ đơn hàng chỉ được đi `pending -> confirmed -> shipping -> delivered`), test phải phủ cả đường đúng và đường cấm |

### 3. Quy trình thực hiện

1. Phân tích cái gì cần test tự động
Chọn việc lặp lại nhiều, ít thay đổi (Login, Search, Cart, Checkout, Admin CRUD, ...). Chức năng mới bắt đầu làm lần đầu thì test tay trước.
2. Chọn tool + framework: theo tiêu chí Proposal: phí, learning curve, EShop Fit, AI, community.
3. Thiết kế framework: POM + cấu trúc tests/, quản lý data, quản lý secret/JWT.
4. Viết script: Viết từng bước: mở trang -> tìm nút bằng Locator -> bấm/nhập -> chờ trang load -> kiểm tra đúng sai bằng assertion.
5. Chạy script và bảo cáo: Chạy thử local để sửa lỗi, rồi chuyển sang chạy ngầm, chạy nhiều trình duyệt song song. Fail thì xem screenshot và log để biết và sửa.
6. Bảo trì: Giao diện đổi thì phải sửa lại test, không cần viết mới mà thông qua sửa locator và POM.

### 4. Khảo sát các công cụ

#### Ứng cử viên

**Traditional tool:** Playwright, Selenium 4, Cypress, WebdriverIO.

**AI-augmented tool:** Mabl, Testim AI.

#### Ma trận so sánh

| Tiêu chí | Playwright | Mabl | Cypress | Selenium 4 | Testim AI | WebdriverIO |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Phí bản quyền** | Miễn phí, Open-source (Apache 2.0). | Trả phí (Subscription), báo giá custom. | Freemium (Local: Miễn phí (MIT), Cloud: Trả phí). | Miễn phí, Open-source (Apache 2.0) . | Trả phí, có bản Free trial giới hạn. | Miễn phí, Open-source (MIT) . |
| **2. Learning curve** | Khó. Yêu cầu JS/TS, Python, Java, .NET. Phù hợp Dev/SDET. | Rất dễ. Low-code/No-code. Phù hợp Manual QA/BA. | Trung bình. Yêu cầu biết JS/TS. Phù hợp QA/FE Dev. | Rất khó. Cần kỹ năng code cao, bắt buộc biết POM + tự quản wait. Phù hợp Automation Engineer. | Rất dễ. Low-code/No-code. Phù hợp Manual QA/BA. | Trung bình. Yêu cầu biết JS/TS. Dễ cấu hình hơn Selenium. |
| **3. EShop Fit** | Rất tốt cho Web/Admin. Test chéo và API xuất sắc. Không hỗ trợ Mobile. | Tốt cho cả 3 (Web, Mobile, API). Hỗ trợ Visual test mạnh. Hạn chế: Trial ngắn. | Tốt cho Web độc lập. Không hỗ trợ Mobile. Test chéo domain cồng kềnh. | Tốt cho Web. Có thể kết hợp Appium cho Mobile. Khó bảo trì, có chặn API nhưng cồng kềnh hơn Playwright. | Tối ưu cho Web (React) và Mobile. Giả lập mạng và xử lý API phức tạp. | Rất tốt cho cả Web, Admin và Mobile. Xử lý API dễ, nhưng cần tự code bắt lỗi. |
| **4. AI capabilities** | Không có sẵn. Phải tích hợp Agent ngoài (MCP). | Rất mạnh. Tích hợp sẵn Auto-healing (AI tự động cập nhật và sửa locators khi giao diện web/app thay đổi mà test không bị fail), Visual test. | Mạnh. Có Cypress AI Studio, auto-healing và trợ lý AI. | Không có sẵn. | Rất mạnh. Auto-healing, sinh test data thông minh. | Không có sẵn. Có MCP hỗ trợ AI Agent. |
| **5. Community** | Rất lớn mạnh, hỗ trợ tốt từ Microsoft, fix bug nhanh. | Nhỏ, hệ sinh thái đóng. Phụ thuộc Support của hãng. | Rất lớn, tài liệu phong phú, hệ sinh thái Plugin khổng lồ. | Lớn nhất, lâu đời. Dễ lẫn lộn với tài liệu cũ/lỗi thời. | Trung bình. Dựa chủ yếu vào Support ticket chính hãng. | Lớn mạnh trong hệ Node.js. Cộng đồng Discord sôi nổi, nhiều plugin. |

#### Lựa chọn

**Playwright (chính)**
- Miễn phí và mã nguồn mở nên phù hợp với nhu cầu và khả năng của sinh viên.
- Tối ưu cho tác vụ kiểm thử Web Frontend (thông qua khả năng quản lý nhiều trình duyệt/context riêng biệt, có thể chặn và can thiệp Backend API để test các lỗi bảo mật và logic cố ý cắm sẵn trong mã nguồn).
- Cộng đồng phát triển cực nhanh, được Microsoft hậu thuẫn. Tài liệu xuất sắc, hỗ trợ sôi nổi qua GitHub, Discord và StackOverflow, có MCP hỗ trợ AI Agent.

**WebdriverIO**
- Miễn phí, mã nguồn mở, chạy trên Node.js nên đồng nhất với stack React + Vite của EShop, chỉ cần giỏi JS/TS là đủ.
- Cấu hình nhẹ hơn Selenium 4, hỗ trợ sẵn WebDriver + BiDi/CDP với plugin phong phú, dễ viết test chéo Web + Admin và intercept API kiểm thử bảo mật.
- Cộng đồng Node.js lớn, Discord sôi nổi, tài liệu hiện đại ít lẫn doc cũ như Selenium 2/3, có MCP hỗ trợ AI Agent, phù hợp định hướng AI-augmented của môn học.

## III. Nội dung demo

### 1. Playwright

#### Giới thiệu

Playwright là framework kiểm thử tự động end-to-end (E2E) mã nguồn mở do Microsoft phát triển, phát hành theo giấy phép Apache 2.0. Công cụ điều khiển ba nhân trình duyệt Chromium, Firefox và WebKit qua một API duy nhất, hỗ trợ TypeScript/JavaScript, Python, Java và .NET. Gói `@playwright/test` là test runner chính thức, quản lý vòng đời test, fixture, assertion, reporter và chế độ chạy song song. Phiên bản đang dùng trong repo là 1.64.1.

Trong vòng đời phát triển phần mềm, Playwright nằm ở tầng kiểm thử E2E và giao diện của test pyramid. Unit test kiểm tra từng hàm, integration test kiểm tra sự phối hợp giữa các module, còn Playwright kiểm tra một luồng nghiệp vụ hoàn chỉnh trên trình duyệt thật, giao diện thật và backend thật. Vì vậy công cụ này phù hợp với regression test, smoke test, kiểm thử cross-browser và chạy tự động trong CI/CD. Playwright bổ sung cho unit test chứ không thay thế.

Với EShop, Playwright được chọn làm công cụ chính vì hệ thống là ứng dụng web React + Vite giao tiếp với backend Express qua API. Các luồng cần kiểm thử trải qua nhiều vai trò User và Admin, cần nhiều phiên đăng nhập độc lập và có tình huống phải can thiệp vào dữ liệu gửi lên server. Browser context, network interception và chế độ chạy headed của Playwright đáp ứng trực tiếp các yêu cầu này. Cấu hình trong repo chỉ khai báo một project Chromium để tập trung vào luồng nghiệp vụ thay vì cross-browser.

#### Cách cài đặt

**Yêu cầu môi trường**

- Node.js 20 trở lên, khuyến nghị bản LTS. npm đi kèm Node.js.
- Các lệnh chạy từ thư mục gốc của repo.

**Cài đặt**

Cách 1: Tạo mới dự án bằng wizard:

```bash
npm init playwright@latest
```

Wizard hỏi lần lượt: 
- Fùng TypeScript hay JavaScript
- Đặt test trong thư mục nào (mặc định `tests/`)
- Có thêm GitHub Actions workflow hay không
- Và có cài nhân trình duyệt ngay hay không (nếu chọn có, wizard sẽ tải Chromium, Firefox và Webkit). 
 
Sau khi chạy, nó tạo `playwright.config.ts`, thư mục test mẫu, thêm các script chạy test vào `package.json` và có thể tải browser về máy. Repo EShop đã có sẵn phần scaffold nên không cần chạy lại bước này.

Cách 2, phù hợp với repo hiện tại:

```bash
npm install
npx playwright install chromium
```
Giải thích:

- `npm install` cài các dependency đã khai báo trong `package.json`, gồm `@playwright/test` và `@types/node`.
- `npx playwright install chromium` tải nhân trình duyệt Chromium. Nếu bỏ tên browser, Playwright tải cả Chromium, Firefox và WebKit.

**Nhân trình duyệt (browser core) từ `npx playwright install`**

Playwright không điều khiển trình duyệt có sẵn của hệ điều hành. Mỗi phiên bản Playwright đi kèm một bản build trình duyệt đã được vá và ghim phiên bản, sau đó tải về thư mục cache.

Cách làm này giúp test chạy giống nhau trên máy cá nhân, máy đồng đội và CI vì tất cả dùng đúng một bản Chromium. Khi nâng cấp Playwright, cần chạy lại `npx playwright install chromium` để tải bản browser tương ứng. Kiểm tra phiên bản và danh sách browser đã cài:

```bash
npx playwright --version
npx playwright install --list
```

**Chạy SUT và chạy test**

Playwright cần ứng dụng đang chạy. Với EShop, mở các process:

| Process | URL |
|---|---|
| Backend API | `http://localhost:3000` |
| Frontend Web | `http://localhost:5173` |
| Web Admin    | `http://localhost:5174` |

Các lệnh thường dùng:

```bash
npm test                                         # chạy toàn bộ test (mặc định headless)
npx playwright test tests/auth                   # chạy một nhóm test
npx playwright test tests/scenario/sc01.spec.ts  # chạy một file
npm run test:headed                              # hiện trình duyệt
# Hoặc npx playwright test --headed   
       
npm run report                                   # mở báo cáo HTML
```

Lần chạy đầu nên dùng `npm run test:headed` để chắc chắn browser mở được và ứng dụng truy cập đúng địa chỉ. Khi test fail, Playwright lưu trace, screenshot và video vào `test-results`, đồng thời tạo báo cáo HTML trong `playwright-report`.

#### Config và API quan trọng

Playwright được điều khiển qua hai lớp: file `playwright.config.ts` quy định môi trường chạy, và API trong file test quy định cách tương tác với trang cùng cách kiểm tra kết quả. Phần dưới trình bày các thiết lập và API quan trọng, kèm cách chúng được dùng trong repo EShop.

**Thiết lập trong `playwright.config.ts`**

| Thiết lập | Giá trị trong repo | Tác dụng |
|---|---|---|
| `testDir` | `./tests` | Thư mục chứa test; mọi file `*.spec.ts` bên trong được thu thập. |
| `timeout`, `expect.timeout` | `60_000`, `5_000` | Thời gian tối đa cho một test và cho một assertion tự retry, tính bằng mili giây. |
| `retries` | `0` | Không chạy lại test fail; flakiness phải hiện ra thay vì bị che. |
| `workers` | `1` | Chạy tuần tự một worker để tránh tranh chấp dữ liệu dùng chung. |
| `reporter` | `list`, `html` | In kết quả ra terminal và tạo báo cáo HTML, không tự mở. |
| `use.baseURL` | `http://localhost:5173` | Ghép vào đường dẫn tương đối, ví dụ `page.goto('/login')`. |
| `use.locale`, `use.timezoneId` | `vi-VN`, `Asia/Ho_Chi_Minh` | Cố định định dạng số, tiền tệ và múi giờ để test không phụ thuộc máy chạy. |
| `use.headless` | `true` | Chạy ngầm mặc định; `--headed` ghi đè khi cần quan sát. |
| `use.trace`, `use.screenshot`, `use.video` | `retain-on-failure`, `only-on-failure`, `retain-on-failure` | Thu thập bằng chứng khi test fail để điều tra. |
| `launchOptions.slowMo` | `1000` | Chèn 1 giây trước mỗi thao tác, phục vụ demo. |
| `projects` | `chromium` | Chỉ chạy trên Chromium với profile `Desktop Chrome`. |
| `webServer` | backend, frontend | Tự khởi động hai tiến trình và chờ URL sẵn sàng trước khi chạy test. |

**API và fixture**

| API / fixture | Công dụng | Cách dùng trong repo |
|---|---|---|
| `test`, `expect` | Khai báo test và assertion. | Có trong mọi file spec. |
| `page` | Đại diện một tab trình duyệt, nơi tạo locator và thực hiện thao tác. | Tham số `{ page }` trong test. |
| `context`, `browser` | Context là phiên cách ly có cookie và localStorage riêng; browser dùng để tạo thêm context độc lập. | Kịch bản 2 tạo context User và Admin từ cùng browser. |
| `request` | Client HTTP gọi API trực tiếp, không qua UI. | `tests/support/auth.ts` đăng nhập và đăng ký qua API. |
| `test.step`, `test.beforeEach` | Chia test thành các bước có tên; chạy phần chuẩn bị trước mỗi test. | `tests/scenario/sc01.spec.ts` và hook gắn throttle API. |
| `getByRole`, `getByPlaceholder`, `locator` | Tìm phần tử theo vai trò, placeholder hoặc CSS/DOM. | Tìm nút `Tìm`, ô `Tìm kiếm...`, input trong form. |
| Web-first assertion | `toBeVisible`, `toHaveURL`, `toHaveText`, `toHaveCount`, tự retry đến hết timeout. | Kiểm tra URL, giá, số dòng trong giỏ hàng. |
| `expect.soft` | Ghi nhận nhiều lỗi trong cùng một test thay vì dừng ở lỗi đầu. | Kiểm tra từng sản phẩm, từng dòng giỏ hàng. |
| `page.goto` | Mở URL; dùng `waitUntil: 'domcontentloaded'` để không chờ ảnh ngoài. | `LoginPage.goto` và các test điều hướng. |
| `page.addInitScript` | Chèn script trước khi trang tải. | `seedAuthToken` ghi JWT vào localStorage. |
| `page.route` | Chặn request/response để thêm delay hoặc sửa dữ liệu. | `tests/support/throttle.ts`; kịch bản 2 dùng để sửa `total_amount`. |
| POM | Đóng gói locator và thao tác của một trang vào class. | `tests/pages/LoginPage.ts`, `tests/pages/CheckoutPage.ts`. |

**Ví dụ cách dùng**

```ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login (happy path)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('test@eshop.com', 'Test1234!');
  await expect(page).toHaveURL('/');
});
```

Đoạn code trên cho thấy cách các thành phần phối hợp: fixture `page` được truyền vào test, POM đóng gói thao tác, `baseURL` rút gọn đường dẫn, và assertion tự retry để chờ điều hướng hoàn tất.

**Cấu trúc folder**

- `tests/pages`: class POM, mỗi method tương ứng một thao tác người dùng; assertion đặt trong spec.
- `tests/support/auth.ts`: đăng nhập và đăng ký qua API, sau đó seed JWT bằng `addInitScript` để không phải thao tác form mỗi test.
- `tests/support/throttle.ts`: dùng `page.route` thêm delay cho mọi request `/api/**`, phục vụ đo flakiness.
- `tests/auth`, `tests/checkout`, `tests/scenario`: các file spec thực tế.

#### Kịch bản demo

##### Chuẩn bị

Chạy đủ 3 tiến trình cho web automation testing: backend :3000, web :5173, admin :5174, seed database.

Playwright đặt ở root của repo, config 1 project Chromium cho demo (trước hết bỏ qua Firefox và Webkit).

##### Coverage E2E hiện có

Bảng dưới tổng hợp 25 test E2E trong ba nhóm auth, cart và checkout, lấy kết quả từ artifact của lần chạy full suite gần nhất trên Chromium. Trong đó có 9 test Pass và 16 test Fail.

Quy ước: `Pass` là test khớp đặc tả; `Fail` là finding của SUT, được giữ đỏ có chủ đích, không dùng `test.fail()` hay skip. Hai test scenario được trình bày riêng ở Kịch bản #1 và #2.

| Nhóm | Test case | FR | Kết quả | Ghi chú |
|---|---|---|---|---|
| Auth, `login.spec.ts` | Test 1: Login (happy path) | FR-02 | Pass | Đăng nhập hợp lệ vào được trang chủ. |
| Auth, `login.spec.ts` | Test 2: Login with invalid email | FR-02 | Pass | Hiển thị lỗi khi email sai. |
| Auth, `login.spec.ts` | Test 3: Login with invalid password | FR-02 | Pass | Hiển thị lỗi khi mật khẩu sai. |
| Auth, `login.spec.ts` | Test 4: FIND-A1 Password field should be masked | FR-22 | Fail | FIND-A1: SUT dùng `type="text"` thay vì `type="password"`. |
| Auth, `login.spec.ts` | Test 5: FIND-C2 Checkout without login | FR-08 | Fail | FIND-C2: SUT vẫn mở `/checkout` khi chưa đăng nhập; trùng với Checkout Test 4. |
| Auth, `lockout.spec.ts` | Test 1: Lockout after 3 failed login attempts | FR-02 | Pass | Pass vì test chỉ assert có lỗi; hành vi khóa sớm được bắt ở Test 3 (FIND-A3). |
| Auth, `lockout.spec.ts` | Test 2: FIND-A2 Lockout duration and reset | FR-02 | Fail | FIND-A2: SUT khóa 180 giây thay vì 30 giây. |
| Auth, `lockout.spec.ts` | Test 3: FIND-A3 Login succeeds with in 3 retries | FR-02 | Fail | FIND-A3: SUT khóa ngay sau lần sai thứ 2. |
| Cart, `add-to-cart.spec.ts` | Test 1: Add one product to the cart from the catalog | FR-07 | Pass | Thêm một sản phẩm từ catalog. |
| Cart, `add-to-cart.spec.ts` | Test 2: Add two different products to the cart | FR-07 | Pass | Hai sản phẩm khác nhau nằm ở hai dòng. |
| Cart, `add-to-cart.spec.ts` | Test 3: Add a product from its detail page | FR-06, FR-07 | Pass | Thêm từ trang chi tiết với số lượng 2. |
| Cart, `add-to-cart.spec.ts` | Test 4: FIND-B1 adding the same product twice merges into one row | FR-07 | Fail | FIND-B1: SUT tạo hai dòng thay vì gộp. |
| Cart, `add-to-cart.spec.ts` | Test 5: FIND-B2 cart quantity controls update quantity and total | FR-07 | Fail | FIND-B2: thiếu nút tăng và giảm số lượng. |
| Cart, `add-to-cart.spec.ts` | Test 6: FIND-B3 removing a product requires confirmation | FR-07, FR-24 | Fail | FIND-B3: xóa không có hộp thoại xác nhận. |
| Cart, `add-to-cart.spec.ts` | Test 7: FIND-B4 cart total and continue-shopping labels match the specification | FR-07 | Fail | FIND-B4: sai nhãn tổng tiền và nút mua tiếp. |
| Cart, `add-to-cart.spec.ts` | Test 8: FIND-B5 empty cart includes an illustration and message | FR-07, FR-24 | Fail | FIND-B5: giỏ trống chỉ có chữ, thiếu minh họa. |
| Cart, `add-to-cart.spec.ts` | Test 9: FIND-B6 the cart navigation link shows the item-count badge | FR-23, FR-24 | Fail | FIND-B6: không có badge số lượng. |
| Cart, `add-to-cart.spec.ts` | Test 10: FIND-B7 catalog product images have descriptive alt text | FR-05, FR-24 | Fail | FIND-B7: ảnh catalog có `alt` rỗng. |
| Checkout, `checkout.spec.ts` | Test 1: User places an order that the backend stores correctly (happy path) | FR-08 | Pass | Đơn mới có status `pending`, đúng tổng và đúng user. |
| Checkout, `checkout.spec.ts` | Test 2: Checkout shows the cart line and the cart total before confirming | FR-08 | Pass | Hiển thị đúng dòng sản phẩm và tổng tiền. |
| Checkout, `checkout.spec.ts` | Test 3: FIND-C1 The total amount must not be editable by the user | FR-08 | Fail | FIND-C1: ô tổng tiền cho phép chỉnh sửa. |
| Checkout, `checkout.spec.ts` | Test 4: FIND-C2 Unauthenticated visitor must be sent from /checkout to /login | FR-08 | Fail | FIND-C2: khách chưa đăng nhập vẫn vào được `/checkout`. |
| Checkout, `checkout.spec.ts` | Test 5: FIND-C3 The cart must be cleared after a successful checkout | FR-08 | Fail | FIND-C3: giỏ không được xóa sau khi đặt hàng. |
| Checkout, `checkout.spec.ts` | Test 6: FIND-C4 Backend must ignore a client-sent total_amount | FR-08 | Fail | FIND-C4: backend lưu `total_amount` do client gửi. |
| Checkout, `checkout.spec.ts` | Test 7: FIND-C5 The checkout page must have exactly one h1 | FR-21 | Fail | FIND-C5: trang checkout không có thẻ `h1`. |

Các finding trong bảng được đánh mã theo nhóm: FIND-A1 đến FIND-A3 cho auth, FIND-B1 đến FIND-B7 cho cart, FIND-C1 đến FIND-C5 cho checkout. Auth Test 5 và Checkout Test 4 cùng mô tả một lỗi, nên FIND-C2 được dùng cho cả hai.

Lưu ý: trước đây Auth Test 3 và các test lockout dùng sai mật khẩu trên tài khoản dùng chung `test@eshop.com`, nên có thể khóa tài khoản trong 180 giây và làm `sc01` fail nếu chạy sau. Sau khi tách dữ liệu, mỗi test auth và `sc01` tự đăng ký một user riêng qua API; không test nào còn dùng `test@eshop.com`. Chỉ `sc02` dùng tài khoản admin seed với mật khẩu đúng.

Hai test scenario còn lại: `sc01` fail với 4 nhóm soft assertion nhưng đã chạy hết flow, `sc02` fail với 8 soft assertion. Tính cả hai scenario, full suite có 27 test: 9 pass và 18 fail.

##### Kịch bản #1: Smoke test (User)

**Mục đích:** chứng minh automation chạy được trên SUT thật, đồng thời kiểm tra các thành phần cơ bản của catalog, tìm kiếm, chi tiết sản phẩm và giỏ hàng.

**File:** `tests/scenario/sc01.spec.ts`

**Chuẩn bị:** `beforeEach` gắn `applyApiThrottle(page, 300)` cho mọi request `/api/**` để mô phỏng mạng chậm. Test tạo một user mới bằng `registerViaAPI` với email dạng `scenario-smoke-<timestamp>-<random>@example.com` và mật khẩu `Test1234!`, sau đó dùng chính email/password này để đăng nhập UI. Test không dùng tài khoản seed `test@eshop.com` để tránh phụ thuộc trạng thái lockout.

**Flow theo đúng thứ tự `test.step`:**
1. `Create a throwaway user via API`: đăng ký user riêng qua API.
2. `Navigate to the login page`: mở `http://localhost:5173/login` với `waitUntil: 'domcontentloaded'`.
3. `Fill email input`: nhập email của user vừa tạo vào input đầu tiên của form.
4. `Fill password input`: nhập `Test1234!` vào input thứ hai của form.
5. `Click the submit button`: bấm `form button[type="submit"]`.
6. `Verify that the user is redirected to the home page`: assert URL `http://localhost:5173/` (FR-02).
7. `Verify that the page have only 1 h1 element`: assert số lượng thẻ `h1` bằng 1 (FR-21).
8. `Verify each product card is displayed with the correct information`: với mỗi card, assert ảnh visible, `src` khác rỗng, `alt` khác rỗng, tên khác rỗng, giá khác rỗng, giá chứa ký hiệu tiền tệ (FR-05).
9. `Search products by name`: nhập `iPhone`, bấm `Tìm`; assert có ít nhất một card, tổng số card lớn hơn 0, mọi card chứa `iPhone` không phân biệt hoa thường (FR-05).
10. `Verify that HTML search input is escaped`: nhập chuỗi XSS chứa thẻ `img` và thuộc tính `onerror`; assert dòng kết quả hiển thị đúng chuỗi đã nhập, không render `img` hoặc `script` (FR-05).
11. `Clear search results for the next test`: xóa ô tìm kiếm, bấm `Tìm`, chờ card đầu tiên xuất hiện.
12. `Verify that product have a "Xem chi tiết" button`: mỗi card có link `Xem chi tiết`.
13. Bấm link `Xem chi tiết` của card đầu tiên.
14. `Verify that the product detail page is displayed`: assert URL khớp `/product/\d+` và chờ nút `Thêm vào giỏ hàng` của trang chi tiết xuất hiện (FR-06).
15. `Verify that add to cart function is working with correct information`: đặt số lượng 1, bấm `Thêm vào giỏ` hai lần (SUT bỏ qua lần đầu), bấm link `Giỏ hàng` trên header, không dùng `page.goto` để giữ giỏ trong bộ nhớ React; assert URL `/cart`, đúng 1 dòng, tên và đơn giá khớp trang chi tiết, số lượng bằng 1, thành tiền khớp đơn giá (FR-06, FR-07).

**Lưu ý:** SUT bỏ qua lần bấm `Thêm vào giỏ` đầu tiên và giỏ hàng chỉ nằm trong bộ nhớ React, nên test chủ động bấm hai lần và điều hướng bằng link nội bộ. Đây là cách test thích nghi với hành vi SUT, không phải thay đổi kỳ vọng nghiệp vụ.

**Kết quả lần chạy gần nhất:** Fail, nhưng test đã chạy hết flow (không còn bị chặn ở bước đăng nhập). Các lỗi đều là soft assertion:
- Bước 7: trang chủ có 2 thẻ `<h1>` thay vì 1 (FR-05, FR-21).
- Bước 8: 5 ảnh sản phẩm có `alt=""`; giá hiển thị `VND` thay vì `₫` (FR-05, FR-21, FR-24; phần `alt` trùng FIND-B7).
- Bước 10: từ khóa HTML không được escape; vùng kết quả render thẻ `<img>` và không hiển thị nguyên văn keyword (FR-05).
- Bước 15: các assertion giỏ hàng pass; test không còn lỗi do lockout hay do `page.goto('/cart')`.

**Kỹ thuật Playwright:** chạy headed + `slowMo` để khán giả theo dõi; `test.beforeEach` gắn throttle API bằng `page.route`; chia bước bằng `test.step`; `request` fixture + `registerViaAPI` để tạo user riêng; dùng `expect.soft` để gom lỗi; locator cấu trúc `form input`, `form button[type="submit"]`; `page.goto` với `domcontentloaded`.

##### Kịch bản #2: End-to-end (User + Admin)

**Mục đích:** demo flow phức tạp nhất, chạm 6 FR, trình bày hai Browser Context độc lập, intercept API và vòng đời đơn hàng.

**File:** `tests/scenario/sc02.spec.ts`

**Chuẩn bị:**
- `test.setTimeout(120_000)`.
- Tạo `userContext` và `userPage`; sau đó gọi `loginAdmin(browser)` để tạo admin context, mở `http://localhost:5174`, chờ `/api/admin/orders`, đăng nhập `admin@eshop.com` / `Admin123!`, assert heading `Dashboard` và đọc `revenueBefore`.
- `revenueBefore` được tính bằng tổng `total_amount * 2` của các đơn `delivered` theo cách test đang làm.
- Tạo user mới qua API bằng `registerViaAPI` và `loginViaAPI`, sau đó seed JWT vào `userPage` bằng `seedAuthToken`.
- Dữ liệu: `iPhone 15 Pro Max` giá 30.000.000 đồng và `Tai nghe AirPods Pro 2` giá 6.000.000 đồng; tổng 36.000.000 đồng; coupon `SAVE10` kỳ vọng còn 32.400.000 đồng.

**Flow theo đúng thứ tự test:**
1. User mở trang chủ, assert link `Chào` visible; thêm lần lượt `iPhone 15 Pro Max` và `Tai nghe AirPods Pro 2` vào giỏ.
2. Mở giỏ hàng, bấm `Tiến hành thanh toán`; assert URL `/checkout`; assert danh sách `ul.list-disc li` có 2 dòng.
3. Nhập `SAVE10`, bấm `Áp dụng`; assert thông báo `Áp dụng thành công`; soft assert `Thành tiền:` chứa 32.400.000 (FR-07, FR-08, FR-09).
4. Gắn `page.route('**/api/checkout')`: đọc payload, lưu `clientTotal`, thay `total_amount` bằng 1 rồi gọi `route.continue`.
5. Bấm `Xác Nhận Thanh Toán`; chờ response `POST /api/checkout`; assert response OK; lấy `orderId`; assert heading `Thanh toán thành công!`.
6. Gọi `GET /api/orders/{orderId}`; soft assert `clientTotal` bằng 32.400.000; `savedOrder.total_amount` bằng 32.400.000 và khác 1 (FR-08).
7. Admin reload, chờ `/api/admin/orders`; mở `Đơn hàng`; tìm dòng `#orderId`; assert `Chờ xác nhận`; bấm `Xác nhận`; assert `Đã xác nhận`; bấm `Giao hàng`; assert `Đang giao` (FR-10, FR-18).
8. User bấm `Quay lại trang chủ`, mở link `Chào`; assert heading `Lịch sử đơn hàng`; tìm đơn; assert `Đang giao`.
9. User bấm `Hủy đơn`; bắt dialog; soft assert message khớp `/Lỗi/`; soft assert đơn vẫn `Đang giao` (FR-10).
10. Admin reload, chờ `/api/admin/orders`; mở `Đơn hàng`; tìm đơn; assert `Đã hủy`; soft assert nút `Đánh dấu Đã giao` có count 0; sau đó bấm nút này; assert `Đã giao`.
11. Admin mở `Dashboard`; đọc `revenueAfter`; soft assert `revenueAfter - revenueBefore` bằng 32.400.000 (FR-13).
12. `finally`: đóng `userContext` và `admin.context`.

**Kết quả lần chạy gần nhất:** Fail với 8 soft assertion (gom thành 6 nhóm lỗi), nhưng các bước chính vẫn chạy hết:
- `SAVE10`: UI hiển thị `Thành tiền: 360.000.000` thay vì 32.400.000.
- `clientTotal`: client gửi 360.000.000 thay vì 32.400.000.
- `savedOrder.total_amount`: backend lưu 1 thay vì 32.400.000.
- Hủy đơn đang giao: dialog báo `Hủy đơn thành công!`, đơn chuyển `Đã hủy`.
- Đơn `Đã hủy` vẫn có nút `Đánh dấu Đã giao`; bấm vào chuyển được sang `Đã giao`.
- Doanh thu Dashboard tăng 2 thay vì 32.400.000.

**Kỹ thuật Playwright:** `browser.newContext` cho hai phiên độc lập; `request` fixture để tạo user và đọc order; `seedAuthToken`; `page.route` và `route.continue` để intercept; `waitForResponse`; `expect.soft` để gom finding; xử lý dialog bằng `page.once('dialog')`.

##### Kịch bản #3: Ma trận coupon 5 điều kiện (data-driven)

**Mục đích:** thể hiện rằng test thủ công rất mất thời gian, còn automate thì nhanh và đơn giản hơn nhiều.

**File: Chưa thực hiện**

**Flow:** cùng 1 flow checkout, chạy lặp với bảng dữ liệu (FR-09 C1–C5):
1. `SAVE10` trên đơn >= 300.000₫ -> giảm 10% (pass).
2. `EXPIRED` -> bị từ chối vì hết hạn (C2).
3. Mã không tồn tại -> bị từ chối (C1).
4. `BIGBUY` trên đơn < 500.000₫ -> bị từ chối vì dưới ngưỡng (C3).
5. Dùng `SAVE10` lần 2 cùng user -> bị từ chối vì quá số lần/người (C5).
6. Chưa đăng nhập mà gõ thẳng URL `/checkout` (`page.goto`) -> assert bị đá về `/login`, vì thiếu JWT hợp lệ (C4).

**Kỹ thuật Playwright:** data-driven - mảng test data + vòng lặp `test()`; dùng `request` fixture gọi API setup giỏ hàng cho nhanh thay vì click tay từng lần.

### 2. WebDriverIO

# IV. AI Disclosure

Sử dụng Muse Spark 1.3 để tra cứu các từ khoá (đã tìm hiểu và xác nhận thủ công), cũng như giải thích về quy trình test tự động.
Sử dụng Muse Spark 1.3 để kiểm tra, góp ý, cũng như gợi ý ra Kịch bản test #3. Đã đối chiếu với các FR trong `README.md`.
Sử dụng Gemini Pro để tìm hiểu các phần Learning curve, AI capabilities và Community của các phần mềm kiểm thử.
Đã cross-check các thông tin về các phần mềm trên bằng Claude Sonnet 5 Medium.
Đã fact check thủ công các criteria, chỉnh sửa phần ngôn ngữ hỗ trợ.
Có sử dụng GitHub Copilot để đánh giá mức độ phù hợp của EShop đối với các phần mềm.

# V. Tài liệu tham khảo

[1]. [](https://youtu.be/jydYq7oAtD8)
