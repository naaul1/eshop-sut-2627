# Playwright — Tính năng và cách dùng (từ đơn giản tới phức tạp)

> Guide cho người mới, ví dụ bám theo EShop (Backend `http://localhost:3000`, Web `http://localhost:5173`).
> Ngôn ngữ ví dụ: JavaScript. Cài 1 lần: `npm init playwright@latest` rồi chạy `npx playwright test`.

---

## Mức 1 — Dùng mỗi ngày (học trước)

### 1. `goto` — mở trang
Đưa trình duyệt tới một địa chỉ, giống như gõ URL rồi Enter.

```js
await page.goto('http://localhost:5173/login');
```

### 2. Locator — chỉ đường tìm nút
Cách nói cho tool biết cần bấm/nhập vào đâu. Ưu tiên từ bền tới dễ gãy:

```js
page.getByRole('button', { name: 'Đăng nhập' }) // tốt nhất: theo vai trò + tên hiển thị
page.getByPlaceholder('Email')                  // theo chữ mờ trong ô nhập
page.getByTestId('cart-badge')                  // theo id kỹ thuật, ổn định nhất nếu dev có gắn
page.locator('css=.btn-submit')                 // CSS, dùng khi 3 cách trên không có
```

### 3. `fill` / `click` — nhập và bấm
Hai hành động phổ biến nhất, Playwright tự chờ nút bấm được rồi mới bấm (auto-wait).

```js
await page.getByPlaceholder('Email').fill('test@eshop.com');
await page.getByPlaceholder('Mật khẩu').fill('Test1234!');
await page.getByRole('button', { name: 'Đăng nhập' }).click();
```

### 4. `expect` — lời khẳng định (assertion)
Kiểm tra kết quả có đúng kỳ vọng không. Điểm hay: assertion của Playwright **tự thử lại** tới khi hết timeout thay vì fail ngay.

```js
await expect(page).toHaveURL(/.*home/);
await expect(page.getByText('Chào mừng')).toBeVisible();
await expect(page.getByTestId('cart-badge')).toHaveText('2');
```

---

## Mức 2 — Gom code cho gọn (học tiếp theo)

### 5. `test` / `describe` / `beforeEach` — khung bài test
`test` là một ca kiểm thử, `describe` gom nhiều ca cùng chủ đề, `beforeEach` chạy trước mỗi ca (thường để mở trang, đăng nhập).

```js
const { test, expect } = require('@playwright/test');

test.describe('Giỏ hàng', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    // ... đăng nhập ...
  });

  test('thêm sản phẩm thì badge tăng lên 1', async ({ page }) => {
    // ...
  });
});
```

### 6. POM — gói mỗi trang thành một bản vẽ
Thay vì lặp lại cách tìm nút ở mọi test, gom vào một class. Giao diện đổi thì sửa 1 chỗ.

```js
class LoginPage {
  constructor(page) { this.page = page; }
  async goto() { await this.page.goto('http://localhost:5173/login'); }
  async login(email, password) {
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Mật khẩu').fill(password);
    await this.page.getByRole('button', { name: 'Đăng nhập' }).click();
  }
}
// Trong test: const login = new LoginPage(page); await login.login('test@eshop.com', 'Test1234!');
```

### 7. Fixture — đồ nghề dùng chung
Dữ liệu/môi trường tự dựng trước và tự dọn sau mỗi test (tài khoản mẫu, giỏ hàng rỗng). Dùng fixture có sẵn `{ page }` là đủ cho người mới; tự viết fixture riêng khi cần.

---

## Mức 3 — Chờ đợi và debug (khi test chập chờn)

### 8. Auto-wait — tool tự chờ, đừng `sleep`
`click`/`fill` đã tự chờ nút hiện ra, bấm được, hết animation. Quy tắc: **không dùng** `waitForTimeout(3000)` cứng trừ khi bất đắc dĩ.

### 9. `waitFor` — chờ tường minh khi cần
Dùng khi chờ thứ không gắn với một nút cụ thể, ví dụ chờ API trả về.

```js
await page.getByRole('button', { name: 'Tìm kiếm' }).click();
await page.getByText('Kết quả').waitFor({ timeout: 5000 });
```

### 10. Codegen — ghi hình sinh code
Không nhớ lệnh thì cho tool tự ghi: `npx playwright codegen http://localhost:5173`, bấm tay trên trình duyệt, code tự hiện. Rất hợp để học Locator.

### 11. Trace / Screenshot / Video — xem lại lúc fail
Bật trong `playwright.config.js` để khi rớt thì mở ra xem từng bước như camera hành trình:

```js
// playwright.config.js
module.exports = {
  use: { trace: 'on-first-retry', screenshot: 'only-on-failure', video: 'retain-on-failure' },
};
// Xem bằng: npx playwright show-report
```

---

## Mức 4 — Nâng cao (khi đã cứng tay)

### 12. Browser Context — nhiều vai trò song song
Mỗi context như một tab ẩn danh riêng (cookie/storage riêng). Dùng để test chéo: User đặt hàng ở context 1, Admin duyệt đơn ở context 2, không lẫn session.

```js
const userCtx = await browser.newContext();
const adminCtx = await browser.newContext();
const userPage = await userCtx.newPage();
const adminPage = await adminCtx.newPage();
```

### 13. Network Intercept (`route`) — chặn/sửa API
Chặn request giữa frontend và backend để test bảo mật/logic mà không cần sửa server. Ví dụ: giả lập server báo hết hàng, hoặc kiểm tra frontend có gửi JWT không.

```js
await page.route('**/api/checkout', async route => {
  const req = route.request();
  console.log(req.headers()['authorization']); // kiểm tra có gửi token không
  await route.continue();
});
```

### 14. API testing (`request`) — test backend trực tiếp
Không cần mở trình duyệt, bắn HTTP thẳng vào `localhost:3000` để kiểm tra login, coupon, phân quyền admin.

```js
test('coupon SAVE10 giảm 10%', async ({ request }) => {
  const res = await request.post('http://localhost:3000/api/checkout', {
    headers: { Authorization: `Bearer ${token}` },
    data: { coupon: 'SAVE10' },
  });
  expect(res.ok()).toBeTruthy();
});
```

### 15. Projects — một test chạy trên nhiều trình duyệt
Project là một "cấu hình chạy": mỗi project có thể khác trình duyệt, khác kích thước màn hình, khác địa chỉ web. Khai báo 3 project thì 1 lệnh `npx playwright test` sẽ chạy mỗi test 3 lần tương ứng.

```js
// playwright.config.js
module.exports = {
  projects: [{ name: 'chromium' }, { name: 'firefox' }, { name: 'webkit' }],
  workers: 4,
  retries: 2,
};
```

Chạy hết thì cứ `npx playwright test`. Muốn chạy riêng 1 trình duyệt (lúc demo sống cho nhanh, hoặc debug) thì chỉ đích danh:

```bash
npx playwright test --project=chromium          # chỉ chạy Chromium
npx playwright test --project=firefox tests/cart.spec.js  # 1 file trên Firefox
```

Mẹo thực tế cho nhóm: config để 1 project Chromium làm mặc định khi demo (nhanh nhất), còn bản full 3 trình duyệt để chạy ngầm trước giờ demo rồi mở report ra khoe. Cross-browser khác nhau thật — có bug chỉ lòi ra trên Firefox/WebKit mà Chromium không có.

### 16. MCP — cho AI Agent điều khiển
Playwright có MCP server để AI (Copilot/Claude) tự mở trình duyệt, đọc Locator và sinh/sửa test giúp bạn. Đây là cầu nối AI-augmented của một tool truyền thống.

---

## Lộ trình gợi ý cho nhóm (EShop)

1. Tuần 1: chỉ dùng Mức 1 — viết được login, tìm kiếm, thêm vào giỏ.
2. Tuần 2: áp Mức 2 — refactor sang POM + `beforeEach`.
3. Tuần 3: bật Mức 3 — bỏ `sleep`, bật trace, dùng codegen khi bí Locator.
4. Đồ án: lấy 1 ca Mức 4 làm điểm nhấn — test chéo User/Admin bằng 2 context, hoặc intercept API checkout để demo lỗi bảo mật.
