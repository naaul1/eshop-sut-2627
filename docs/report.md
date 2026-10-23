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
npm test                                         # chạy toàn bộ test
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

##### Chuẩn bị**

Chạy đủ 3 tiến trình cho web automation testing: backend :3000, web :5173, admin :5174, seed database.

Playwright đặt ở root của repo, config 1 project Chromium cho demo (trước hết bỏ qua Firefox và Webkit).

Quay video chạy test dự phòng và chụp sẵn report phòng trường hợp bất trắc.

##### Kịch bản #1: Smoke test (User)**

**Mục đích:** chứng minh automation chạy được trên SUT thật.

**Flow:**
1. Mở `http://localhost:5173/login`, nhập Email `test@eshop.com`, Mật khẩu `Test1234!`, bấm Đăng nhập (FR-02: login hợp lệ vào được home).
2. Tại trang chủ, kiểm tra mỗi sản phẩm hiển thị đủ ảnh (có `alt`), tên, giá đơn vị ₫ (FR-05).
3. Nhập từ khóa vào ô tìm kiếm, kiểm tra kết quả lọc đúng và từ khóa chứa HTML bị escape (FR-05).
4. Mở 1 sản phẩm, để số lượng = 1, bấm Thêm vào giỏ, kiểm tra có toast/badge phản hồi (FR-06 + FR-24).
5. Mở giỏ hàng, kiểm tra badge số lượng = 1, đúng tên sản phẩm, đúng đơn giá và thành tiền (FR-07).

**Kỹ thuật Playwright:** chạy headed + `slowMo` để khán giả thấy trình duyệt tự bấm; locator ưu tiên `getByRole`/`getByPlaceholder`; assertion tự retry.

##### Kịch bản #2: End-to-end (User + Admin)

**Mục đích:** demo flow phức tạp nhất, chạm 6 FR, trình bày tính năng nhiều context context và intercept của Playwright.

**Flow:**
1. Context User: đăng nhập, thêm 2 sản phẩm vào giỏ, sang checkout nhập coupon `SAVE10`, kiểm tra giảm đúng 10% theo công thức `percent` (FR-07 + FR-08 + FR-09 C1/C2/C3).
2. Bật intercept API checkout, sửa `total_amount` gửi lên thấp hơn thực tế -> assert backend tự tính lại, đơn tạo ra vẫn đúng tổng (FR-08: không tin client).
3. Context Admin (chạy song song, session riêng): duyệt đơn `pending -> confirmed -> shipping -> delivered` đúng State Machine (FR-10 + FR-18).
4. Quay lại User thử hủy đơn đang `shipping` -> assert bị từ chối, vì User chỉ được hủy ở `pending`/`confirmed` (FR-10).
5. Admin mở Dashboard, kiểm tra doanh thu đã cộng đơn vừa `delivered` (FR-13: chỉ cộng đơn delivered).

**Kỹ thuật Playwright:** 2 Browser Context song song; `page.route` intercept; assert cả UI lẫn response API.

##### Kịch bản #3: Ma trận coupon 5 điều kiện (data-driven)

**Mục đích:** thể hiện rằng test thủ công rất mất thời gian, còn automate thì nhanh và đơn giản hơn nhiều.

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
