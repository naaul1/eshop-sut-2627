**CS423 – CSC15003 – Software Testing (AI-augmented · 2026)**

# BÁO CÁO SEMINAR

**Topic: T2_Web_Automation_Testing**

## Mục lục

- [I. Thông tin chung](#i-thông-tin-chung)
  - [Nhóm thực hiện](#nhóm-thực-hiện)
  - [Giảng viên hướng dẫn](#giảng-viên-hướng-dẫn)
- [II. Nội dung lý thuyết](#ii-nội-dung-lý-thuyết)
  - [1. Định nghĩa](#1-định-nghĩa)
  - [2. Keywords](#2-keywords)
  - [3. Quy trình thực hiện](#3-quy-trình-thực-hiện)
  - [4. Khảo sát các công cụ](#4-khảo-sát-các-công-cụ)
    - [Danh sách](#danh-sách)
    - [Ma trận so sánh](#ma-trận-so-sánh)
    - [Lựa chọn](#lựa-chọn)
- [III. Nội dung demo](#iii-nội-dung-demo)
  - [1. Playwright](#1-playwright)
    - [Giới thiệu](#giới-thiệu)
    - [Cách cài đặt](#cách-cài-đặt)
    - [Config và API quan trọng](#config-và-api-quan-trọng)
    - [Kịch bản demo](#kịch-bản-demo)
      - [Chuẩn bị](#chuẩn-bị)
      - [Coverage E2E](#coverage-e2e)
      - [Kịch bản #1: Xem sản phẩm và thêm vào giỏ](#kịch-bản-1-xem-sản-phẩm-và-thêm-vào-giỏ)
      - [Kịch bản #2: Mua hàng và xử lý đơn](#kịch-bản-2-mua-hàng-và-xử-lý-đơn)
      - [Hướng mở rộng](#hướng-mở-rộng)
  - [2. WebdriverIO](#2-webdriverio)
    - [Giới thiệu](#giới-thiệu-1)
    - [Cách cài đặt](#cách-cài-đặt-1)
    - [Config và API quan trọng](#config-và-api-quan-trọng-1)
    - [Kịch bản demo](#kịch-bản-demo-1)
      - [Chuẩn bị](#chuẩn-bị-1)
      - [Coverage E2E](#coverage-e2e-1)
      - [Kịch bản #2: Mua hàng và xử lý đơn](#kịch-bản-2-mua-hàng-và-xử-lý-đơn-1)
      - [Kịch bản #3: Ma trận coupon](#kịch-bản-3-ma-trận-coupon)
      - [Hướng mở rộng](#hướng-mở-rộng-1)
- [IV. Tài liệu tham khảo](#v-tài-liệu-tham-khảo)

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
- chạy những test lặp lại, cũng như test tốn công và nhập dữ liệu
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

#### Danh sách

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
- Cộng đồng Node.js lớn, Discord sôi nổi, tài liệu hiện, đcũng như ít lẫn doc và Selenium 2/3, có MCP hỗ trợ AI Agent, phù hợp định hướng AI-augmented của môn học.

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
- Dùng TypeScript hay JavaScript
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

Playwright cần ứng dụng đang chạy. Với EShop, cần mở các process:

| Process | URL |
|---|---|
| Backend API | `http://localhost:3000` |
| Frontend Web | `http://localhost:5173` |
| Web Admin    | `http://localhost:5174` |

Tuy nhiên, `webServer` của Playwright (sẽ được đề cập ở [Config](#Config-và-API-quan-trọng)) đã tự khởi động cả ba server trên và tự dùng lại nếu server đã chạy. Do đó không cần mở server thủ công khi test.

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

**Config trong `playwright.config.ts`**

| Config | Giá trị trong repo | Tác dụng |
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
| `webServer` | backend, frontend-web, frontend-admin | Tự khởi động ba tiến trình và chờ URL sẵn sàng trước khi chạy test. |

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
  await loginPage.login('user@example.com', 'Test1234!');
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

- Chạy Playwright trên Chromium, tuần tự với `workers: 1`.
- `webServer` tự mở các server backend :3000, web :5173, admin :5174. Nếu backend được khởi động mới, database tự seed; nếu server đã chạy, Playwright dùng lại.
- Các test cần đăng nhập dùng user riêng; `sc02` dùng thêm phiên admin seed với mật khẩu đúng.

##### Coverage E2E

Bảng dưới tổng hợp 25 test auth, cart và checkout: **9 pass, 16 fail**. `Fail` là finding của SUT, được giữ đỏ có chủ đích, không dùng `test.fail()` hay skip.

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

Mã finding: `FIND-A1`...`A3` cho auth, `B1`...`B7` cho cart, `C1`...`C5` cho checkout. Auth Test 5 và Checkout Test 4 cùng một lỗi nên dùng chung `FIND-C2`.

Các test auth, checkout và `sc01` dùng user riêng khi cần đăng nhập; `sc02` dùng user riêng cùng phiên admin seed, chỉ đăng nhập với mật khẩu đúng.

Ngoài bảng trên, `sc01` fail ở 4 nhóm lỗi giao diện/tìm kiếm và ở tính năng add to cart từ màn hình chi tiết sản phẩm, `sc02` fail ở 6 nhóm lỗi coupon, tổng tiền, hủy đơn và doanh thu. Hai scenario này được trình bày kĩ hơn ở phần dưới.

Toàn bộ test đã chạy: **27 test, 9 pass, 18 fail**.

##### Kịch bản #1: Xem sản phẩm và thêm vào giỏ

**Mục đích:** kiểm tra luồng cơ bản của người mua trên SUT thật: đăng nhập, xem catalog, tìm kiếm, xem chi tiết và thêm vào giỏ.

**Các bước:**
1. Tạo tài khoản mới và đăng nhập bằng tài khoản đó.
2. Kiểm tra trang chủ chỉ có một tiêu đề chính (`h1`).
3. Kiểm tra mỗi sản phẩm có ảnh, tên, giá và mô tả ảnh.
4. Tìm `iPhone`; kiểm tra kết quả đều chứa `iPhone`.
5. Nhập một đoạn HTML vào ô tìm kiếm; kiểm tra trang hiển thị đúng chuỗi đã nhập và không chạy HTML.
6. Mở chi tiết sản phẩm đầu tiên, thêm 1 sản phẩm vào giỏ (bấm hai lần theo hành vi SUT).
7. Mở giỏ bằng link trên header; kiểm tra đúng 1 dòng, đúng tên, giá, số lượng và thành tiền.

**Kết quả:** Fail, nhưng test chạy hết flow. Các lỗi:
- Trang chủ có 2 tiêu đề chính (`h1`) thay vì 1.
- Ảnh sản phẩm không có mô tả.
- Giá dùng `VND` thay vì `₫`.
- Ô tìm kiếm hiển thị HTML thay vì văn bản thường, nên thẻ `<img>` được render.
- Sản phẩm không được thêm vào giỏ hàng nếu chỉ nhấn nút Thêm vào giỏ hàng một lần ở màn hình Chi tiết sản phẩm .

##### Kịch bản #2: Mua hàng và xử lý đơn

**Mục đích:** kiểm tra luồng mua hàng có coupon, admin xác nhận/giao đơn, người dùng hủy đơn và doanh thu trên dashboard.

**Chuẩn bị:** dùng user riêng và phiên admin seed. Giỏ có iPhone 15 Pro Max (30.000.000 ₫) và Tai nghe AirPods Pro 2 (6.000.000 ₫); tổng 36.000.000 ₫, coupon `SAVE10` giảm còn 32.400.000 ₫.

**Các bước:**
1. User thêm 2 sản phẩm vào giỏ và mở trang thanh toán.
2. Áp coupon `SAVE10`; kiểm tra tổng tiền giảm 10%.
3. Đặt hàng; thử sửa tổng tiền gửi lên server, rồi kiểm tra đơn được tạo với tổng tiền đúng.
4. Admin xác nhận và giao đơn; user thấy trạng thái `Đang giao`.
5. User hủy đơn; kiểm tra hệ thống từ chối hủy.
6. Admin mở lại đơn; kiểm tra không còn nút chuyển sang `Đã giao`.
7. Admin xem dashboard; kiểm tra doanh thu tăng đúng 32.400.000 ₫.

**Kết quả:** Fail, nhưng test chạy hết flow. Các lỗi:
- Coupon `SAVE10` tính sai: UI hiển thị 360.000.000 ₫ thay vì 32.400.000 ₫.
- Dữ liệu gửi lên server vẫn là 360.000.000 ₫.
- Backend lưu tổng tiền do client sửa thành 1 ₫.
- Hủy đơn đang giao vẫn thành công và đơn chuyển `Đã hủy`.
- Đơn `Đã hủy` vẫn có nút `Đánh dấu Đã giao` và chuyển được sang `Đã giao`.
- Doanh thu dashboard tăng 2 ₫ thay vì 32.400.000 ₫.

##### Hướng mở rộng

Phần này chưa triển khai. Có thể dùng lại luồng checkout và chạy với bảng dữ liệu coupon: `SAVE10` hợp lệ, mã hết hạn, mã không tồn tại, `BIGBUY` dưới ngưỡng, dùng `SAVE10` lần hai và checkout khi chưa đăng nhập. Mỗi dòng dữ liệu là một test, giúp kiểm tra nhiều trường hợp mà không lặp code.

### 2. WebdriverIO

#### Giới thiệu

WebdriverIO là framework tự động hóa kiểm thử end-to-end cho ứng dụng web, mobile và desktop. Repo sử dụng WebdriverIO 10 cùng Mocha và `expect-webdriverio` để điều khiển Chrome, kiểm tra giao diện người dùng và xác minh kết quả từ API của EShop.

Các file kiểm thử nằm trong `test/specs/` và tuân theo mẫu `*.e2e.ts`. WebdriverIO triển khai Scenario 2 về checkout và xử lý đơn, cùng Scenario 3 về ma trận kiểm tra coupon.

#### Cách cài đặt

**Yêu cầu môi trường**

- Node.js 20 trở lên và npm.
- Chrome hoặc Chromium tương thích với ChromeDriver.
- Backend, frontend-web và frontend-admin chạy lần lượt tại port `3000`, `5173`, `5174`.

**Cài đặt**

```bash
npm install
cd backend && npm install
cd ../frontend-web && npm install
cd ../frontend-admin && npm install
```

**Chạy SUT**

```bash
# Terminal 1
cd backend && node server.js

# Terminal 2
cd frontend-web && npm run dev -- --port 5173

# Terminal 3
cd frontend-admin && npm run dev -- --port 5174
```

**Chạy test**

```bash
npm run wdio
npx wdio run ./wdio.conf.ts --spec ./test/specs/sc02.e2e.ts
```

#### Config và API quan trọng

| Config/API | Giá trị hoặc cách dùng | Tác dụng |
|---|---|---|
| `runner` | `local` | Chạy test trên máy hiện tại. |
| `specs` | `./test/specs/**/*.e2e.ts` | Thu thập các spec WebdriverIO. |
| `capabilities` | `browserName: 'chrome'` | Chạy test trên Chrome. |
| `framework` | `mocha` | Cung cấp `describe` và `it`. |
| `browser`, `$`, `$$` | API điều khiển session và element | Điều hướng, tìm và thao tác với UI. |
| `expect-webdriverio` | `toBeDisplayed`, `toHaveText`, `toHaveUrl` | Assertion có auto-wait. |
| `browser.execute` | Chạy JavaScript trong trang | Intercept `XMLHttpRequest` và kiểm tra local state. |
| `fetch` | Gọi API trực tiếp | Tạo user và kiểm tra order/backend. |
| `softExpect` | Helper tích lũy lỗi | Mô phỏng hành vi `expect.soft` của Playwright. |

**Ví dụ cách dùng**

```ts
import { $, browser } from '@wdio/globals';
import { expect } from 'expect-webdriverio';

it('Login (happy path)', async () => {
  await browser.url('http://localhost:5173/login');
  await $('input[type="text"]').setValue('user@example.com');
  await $('input[type="password"]').setValue('Test1234!');
  await $('button=Sign In').click();
  await expect($('a[href="/profile"]')).toBeDisplayed();
});
```

**Cấu trúc folder**

- `test/specs`: các spec WebdriverIO.
- `test/pageobjects`: page object mẫu.
- `wdio.conf.ts`: cấu hình runner, Chrome, Mocha và reporter.
- `tsconfig.e2e.json`: cấu hình TypeScript cho test E2E.

#### Kịch bản demo

##### Chuẩn bị

- Khởi động ba process tại port `3000`, `5173`, `5174`.
- Test tạo user riêng qua API.
- Admin sử dụng tài khoản seed `admin@eshop.com`.

##### Coverage E2E

| Nhóm | Spec | Nội dung | Kết quả |
|---|---|---|---|
| Scenario | `test/specs/sc02.e2e.ts` | Checkout, coupon, order lifecycle và revenue | Fail khi SUT vi phạm đặc tả |
| Scenario | `test/specs/sc03.e2e.ts` | Ma trận coupon và chặn checkout khi chưa đăng nhập (6 test) | 4 pass, 2 fail; hai lỗi SUT |

Scenario 2 gom các kiểm tra mềm bằng `softExpect`; Scenario 3 dùng assertion cứng để mỗi test báo kết quả độc lập.

##### Kịch bản #2: Mua hàng và xử lý đơn

**Mục đích:** chạy lại Scenario 2 của Playwright bằng WebdriverIO với cùng điều kiện kiểm tra.

**Các bước:**
1. User đăng nhập, thêm hai sản phẩm vào giỏ và mở checkout.
2. Áp coupon `SAVE10`; kiểm tra tổng tiền.
3. Intercept checkout để gửi `total_amount: 1`; kiểm tra client payload và tổng tiền backend.
4. Admin xác nhận, giao đơn; user kiểm tra trạng thái `Đang giao`.
5. User hủy đơn; kiểm tra lỗi và trạng thái không đổi.
6. Admin kiểm tra trạng thái hủy và nút chuyển delivered.
7. Kiểm tra doanh thu dashboard.

**Kết quả:** test giữ trạng thái fail khi phát hiện lỗi SUT và gom các lỗi soft assertion để đối chiếu với Playwright.

##### Kịch bản #3: Ma trận coupon

**Mục đích:** kiểm tra các điều kiện áp dụng coupon theo FR-09 và xác minh route checkout yêu cầu đăng nhập.

**Chuẩn bị:** mỗi case cần đăng nhập tạo một user riêng qua API, đăng nhập trên giao diện, thêm iPhone 15 Pro Max (30.000.000 ₫) và AirPods Pro 2 (6.000.000 ₫) vào giỏ, rồi mở checkout. Riêng case `BIGBUY`, tổng đơn được chỉnh thành 400.000 ₫ để kiểm tra ngưỡng tối thiểu 500.000 ₫. Case sử dụng lại `SAVE10` dùng cùng một user cho cả hai lần áp mã và hoàn tất checkout lần đầu để ghi nhận lượt dùng.

**Các bước và kết quả:**
1. Áp `SAVE10` cho giỏ 36.000.000 ₫; kỳ vọng tổng sau giảm 10% là 32.400.000 ₫. **Fail:** giao diện hiển thị 360.000.000 ₫.
2. Áp mã `EXPIRED`; kiểm tra thông báo mã hết hạn. **Pass.**
3. Áp mã không tồn tại; kiểm tra thông báo bị từ chối. **Pass.**
4. Áp `BIGBUY` với tổng 400.000 ₫; kiểm tra thông báo chưa đạt ngưỡng. **Pass.**
5. Hoàn tất checkout với `SAVE10`, sau đó áp lại mã bằng cùng user; kiểm tra lượt dùng vượt giới hạn bị từ chối. **Pass.**
6. Xóa token và truy cập trực tiếp `/checkout`; kỳ vọng chuyển về `/login`. **Fail:** trình duyệt vẫn ở `/checkout`.

**Kết quả chạy:** 6 test trên Chrome 155, gồm 4 pass và 2 fail. Hai test fail tương ứng với lỗi tính giảm giá `SAVE10` và thiếu kiểm soát đăng nhập ở route checkout. Kết quả được giữ fail để phản ánh hành vi SUT, không bỏ qua hoặc nới lỏng assertion.

##### Hướng mở rộng

Có thể tách checkout và coupon thành page object/helper dùng chung; bổ sung kiểm tra trường hợp tổng đơn đúng bằng ngưỡng tối thiểu và coupon bị vô hiệu hóa.

# IV. Tài liệu tham khảo

[1]. [freeCodeCamp.org & Beau Carnes - "Software Testing Course – Playwright, E2E, and AI Agents"](https://youtu.be/jydYq7oAtD8)
[2]. [Playwright API documentation](https://playwright.dev/docs/api/class-playwright)
