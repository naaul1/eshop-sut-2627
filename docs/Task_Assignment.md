# Task Assignment — Technical Reference Only

## 1. Shares & File Ownership (Exclusive)

| Share | Owner | Files You Own (Only You Edit) |
|-------|-------|-------------------------------|
| **A — Platform & Auth** | Vo Nhan | `package.json`, `playwright.config.ts`, `tests/support/**`, `tests/pages/LoginPage.ts`, `tests/auth/**` |
| **B — Cart** | Nguyen Nhan | `tests/pages/HomePage.ts`, `tests/pages/ProductDetailPage.ts`, `tests/pages/CartPage.ts`, `tests/cart/**` |
| **C — Checkout** | Luan | `tests/pages/CheckoutPage.ts`, `tests/checkout/**` |

> **Rule**: Need a change in someone else's file? Ask them - don't edit it. One branch per share, PR to `main`, add only your own paths.

---

## 2. Shared Support Modules (Frozen — Share A Implements)

### `tests/support/auth.ts`

### `tests/support/throttle.ts`

**Usage in every spec:**
```ts
import { applyApiThrottle } from '../support/throttle';

test.beforeEach(async ({ page }) => {
  const delay = Number(process.env.THROTTLE_MS || 0);
  if (delay > 0) await applyApiThrottle(page, delay);
});
```

---

## 3. Test Conventions (All Shares)

- **File naming**: `*.spec.ts`, lowercase
- **Locators**: `getByRole` -> `getByText`/`getByPlaceholder` -> CSS -> avoid XPath
- **No `waitForTimeout()`** - use `expect()` (auto-retry) or `waitFor`
- **Navigation**: `page.goto('/', { waitUntil: 'domcontentloaded' })` - external images on `placehold.co` hang `load`
- **Currency**: browser locale `vi-VN` → assert `'6.000.000 ₫'`
- **Unique data**: `Date.now()`-suffixed emails via `registerViaAPI`
- **One error policy — every failure is a finding**: every test asserts the documented spec (FR). A failure is either a test bug (fix the test) or a SUT bug (a **finding, left red**). Never `test.fail()` / `test.fixme()` / skip, never weaken an assertion — `npm test` exits 1 until the SUT is fixed. No separate `spec-conformance.spec.ts` files; findings live in the normal spec files and are named `FIND-*`.
- **Batch assertions**: `expect.soft()` collects all mismatches
- **POM rule**: one method = one user action; assertions live in specs

---

## 4. POM Pattern (Minimal)

```ts
// tests/pages/LoginPage.ts
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('form input').nth(0);
    this.passwordInput = page.locator('form input').nth(1);
    this.submitButton = page.getByRole('button', { name: 'Sign In' });
    this.errorBox = page.getByText('Đăng nhập thất bại');
  }
  async goto() { await this.page.goto('/login', { waitUntil: 'domcontentloaded' }); }
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

---

## 5. SUT Deviations (Verified Bugs — These Are Findings, Not Test Errors)

| Area | Spec (FR) | Actual SUT Behavior |
|------|-----------|---------------------|
| **Login form** (FR-02/22) | `type=email`, `type=password`, label Email, button `Đăng nhập`, error above submit, one `<h1>` | label `Username`, fields `type=text`, button `Sign In`, error below button, **0 `<h1>`** |
| **Lockout** (FR-02) | counter +1; lock from 3rd failure; 30s | counter +2; locks on 2nd failure; 180s; same UI error for locked/wrong-password |
| **Cart** (FR-07/23/24) | merge duplicate rows, +/- controls, confirm dialog on remove, label `Tổng cộng`, `Tiếp tục mua sắm`, badge, empty-state illustration | duplicate rows, no controls, no dialog, label `Tổng tạm tính`, `← Mua tiếp`, no badge, text-only empty |
| **Product detail** (FR-06/24) | feedback after add | **first click no-op**; second click adds, shows `Đã thêm` for 2s |
| **Catalog** (FR-05/24) | price in ₫, `alt` text, one `<h1>` | price in `VND`, `alt=""`, **two `<h1>`**, search echo uses `innerHTML` |
| **Checkout** (FR-08) | login required, total read-only, backend recomputes, cart cleared | page renders without login, total editable, backend stores client value, cart **not cleared** |
| **Header** (FR-23) | logout label `Đăng xuất` | label `Thoát` |

> **Key trap**: Cart lives **in React memory only**. `page.goto()` or reload empties it. Navigate via in-app links. `POST /api/cart` exists but unused by web app.

---

## 6. Test Data & Routes (Seeded)

| Type | Value |
|------|-------|
| Shared user | `test@eshop.com` / `Test1234!` (valid logins only — never test wrong passwords) |
| Admin | `admin@eshop.com` / `Admin123!` (out of scope M1–3) |
| Products | 1: iPhone 15 Pro Max 30M₫ · 2: Samsung S24 Ultra 28M₫ · 3: MacBook Pro M3 45M₫ · 4: AirPods Pro 2 6M₫ · 5: Keychron Q1 4M₫ |
| Routes | `/login`, `/`, `/product/:id`, `/cart`, `/checkout` |
| APIs | `POST /api/login`, `POST /api/register`, `POST /api/checkout`, `GET /api/orders/my-orders`, `GET /api/products` |
| Coupons | SAVE10, BIGBUY, VIP100, EXPIRED — **out of scope M1–3** |

---

## 7. Share-Specific Specs (Summary)

### Share A — Auth (`tests/auth/`)
- `login.spec.ts`: happy path and wrong password, each on a separate throwaway user + login-form conformance (type=email/password, button name, h1 count) — findings left red
- `lockout.spec.ts`: lock-within-3-attempts behavior test + FR-02 conformance (should not lock on the 2nd failure) — each test uses its own throwaway user; finding left red

### Share B — Cart (`tests/cart/`)
- `add-to-cart.spec.ts`: add from catalog (1 item), add 2 items, product-detail path (click add **twice**) + conformance (merge rows, total label, +/- controls, remove dialog, button labels, empty state, badge, `alt` text) — findings left red

### Share C — Checkout (`tests/checkout/`)
- `checkout.spec.ts`: behavior (happy path + state-delta API verification) plus the FR-08/FR-21 findings FIND-C1..C5 — all in one file, left red

---

## 8. M3 Flakiness Protocol (All Shares)

### 8.1 Run 10 Times
```bash
mkdir -p logs
for i in $(seq 1 10); do
  DELAY=$([ "$i" -eq 1 ] && echo 0 || echo 300)
  echo "===== RUN $i / THROTTLE_MS=$DELAY $(date -Is) ====="
  THROTTLE_MS=$DELAY npx playwright test tests/<your-slice> --workers=1 --reporter=list
  echo "EXIT_CODE=$?"
done 2>&1 | tee -a logs/<slice>-runs.log
```

### 8.2 Metrics Table (`flakiness-<slice>.md`)
```md
| Run | THROTTLE_MS | T1 | T2 | T3 | Passed | Failed | Duration | Notes |
| --: | --: | -- | -- | -- | --: | --: | --: | --- |
| 1 | 0   | ✓ | ✓ | ✓ | 3 | 0 | 1m20s | cold |
| 2 | 300 | ✓ | ✘ | ✓ | 2 | 1 | 1m35s | T2 timeout |
...
| Summary | flaky: T2 (1/10) | | | | | | |
```

### 8.3 Investigate One Flake
1. Re-run 20×: `THROTTLE_MS=300 npx playwright test tests/<slice>/<file> --repeat-each=20 --workers=1`
2. Open trace: `npx playwright show-report` → failed repetition → trace
3. Classify: test-side / environment / app-side
4. Write up in `flakiness-<slice>.md`

### 8.4 Fallback: Forced Race (Checkout Auth Race)
```ts
// tests/checkout/race-experiment.spec.ts (delete before merge)
import { test } from '@playwright/test';
import { loginViaAPI, seedAuthToken } from '../support/auth';
import { applyApiThrottle } from '../support/throttle';

test('race: checkout before profile loads', async ({ page, request }) => {
  const { token } = await loginViaAPI(request, { email: 'test@eshop.com', password: 'Test1234!' });
  await seedAuthToken(page, token);
  await applyApiThrottle(page, 300);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const card = page.locator('.bg-white', { hasText: 'iPhone 15 Pro Max' });
  await card.getByRole('button', { name: 'Thêm vào giỏ' }).click();
  await page.getByRole('link', { name: 'Giỏ hàng' }).click();
  // NO wait for "Chào" greeting — deliberate race
  await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
  console.log(`RACE_RESULT_URL=${page.url()}`);
});
```
Run 20×, count `/login` vs `/checkout` redirects. Mixed outcomes = genuine flake.

---

## 9. Troubleshooting

| Symptom | Fix |
|---------|-----|
| `page.goto` timeout on catalog | Use `waitUntil: 'domcontentloaded'` |
| Strict mode violation (N elements) | Scope locator: `.bg-white', { hasText: name }` |
| `test@eshop.com` locked | Wait 3 min, or restart backend (resets DB), or use throwaway account |
| No tests found | Run from repo root; check `testDir` and `*.spec.ts` naming |
| `Cannot find module '@playwright/test'` | `npm install` at repo root |
| Leftover `node_modules` from partial install | `rm -rf node_modules` then re-scaffold |
| Click does nothing | SUT bug (e.g., product-detail first click) — see §6 |
| A finding test starts passing | SUT may have been fixed — verify against the README FR, then close/adjust the `FIND-*` entry |
| Port 5173 busy | Restart Vite or update `baseURL` |
