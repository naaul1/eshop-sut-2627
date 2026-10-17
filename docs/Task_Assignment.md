# T02 — Web Automation Testing — Stage S3 Task Assignment

**Scope: Study Milestones 1–3** (from `docs/T02_Web_Automation_Testing.docx.md`, Section 6)

> M1 — Set up Playwright + npm; verify with the EShop login spec from FR-02.
> M2 — Cover three flows: Login + lockout (FR-02), Add-to-Cart (FR-07), Checkout (FR-08).
> M3 — Capture flakiness metrics over 10 runs; investigate one flake.

**Team of 3** — 23120059 Trần Đình Luân · 23120064 Nguyễn Thiện Nhân · 23120066 Võ Thiện Nhân

---

## 0. TL;DR

- **Split:** 3 independent shares, pick any one in **§4.1** and mark it as taken — file ownership is exclusive, so all three work in parallel.
- **Only shared step:** Share A pushes the Playwright scaffold within the first 90 minutes (§2).
- **Golden rule:** the SUT is *intentionally buggy*. A failing spec-based test is usually a **finding**, not your mistake. Keep the assertion, quarantine with `test.fail()`, log it — never weaken a test to make a bug "pass".

---

## 1. Goal, definition of done, non-goals

### 1.1 What "done" looks like (team level)

- [ ] Playwright installed at repo root, Chromium project, one command runs everything: `npx playwright test`
- [ ] Login happy path verified against the live SUT (M1)
- [ ] Three flows automated: Login + lockout (FR-02), Add-to-Cart (FR-07), Checkout (FR-08) (M2)
- [ ] Each flow has: passing "behavior" tests + `test.fail()`-quarantined spec-conformance tests, with findings recorded
- [ ] 10-run flakiness metrics per share (run 1 cold, runs 2–10 with 300 ms API throttle), raw logs saved
- [ ] At least one flake (or forced race) investigated and written up (M3)
- [ ] Team log files with commands, errors, screenshots per S3 requirement
- [ ] Every member can run the whole suite unaided (validated in the wrap-up)

### 1.2 Non-goals (do NOT do in this stage)

- Do not modify the SUT (`backend/`, `frontend-web/`, `frontend-admin/`) — bugs are intentional; we only *report* them
- Do not start Milestone 4/5 (AI re-write, Copilot locators) — hand-write everything now, otherwise the M4 comparison is contaminated
- Do not touch `frontend-admin`, `frontend-mobile`
- Do not add GitHub Actions/CI yet
- Do not fix other members' tests "in passing" — report instead

---

## 2. How the work is split

- **Pick one share** in §4.1 — any one; effort is equal (~6–8 h). If two people want the same share, rock–paper–scissors. No share is the "leader" share.
- **File ownership is exclusive:** you edit only the files listed for your share. Need a change in someone else's file? Ask them — don't edit it.
- **Git:** one branch per share, add only your own paths, PR to `main`.

```bash
git switch -c membername       # your share's branch (s3/share-b, s3/share-c)
# ... work, commit often ...
git add <only your own paths>   # never `git add -A` / `git add .` (it sweeps teammates' WIP)
# open a PR to main — one teammate reviews
```

**Parallelization — A's scaffold is the only shared step:**

| Time | Share A owner | Share B / C owners |
| :-- | :-- | :-- |
| First 60–90 min | pre-flight + scaffold (§5, A1–A4) → **push** | learn Playwright + manual exploration (§3.3) |
| Then | auth specs (A5–A8), then M3 loop (§8) | write specs (§6/§7), then M3 loop |
| Day 3 | wrap-up meeting (§9) | wrap-up meeting (§9) |

If A's scaffold is late, B/C write their specs offline meanwhile. Do **not** create a second `playwright.config.js`. Don't commit `node_modules/`, reports, or `*.sqlite` (already gitignored).

---

## 3. Pre-flight — everybody does this first (60–90 min)

### 3.1 Check tools

Node.js ≥ 18 (`node --version`), npm, git, and a browser for manual exploration.

### 3.2 Start the SUT (backend + web only)

Two terminals, from the repo root:

```bash
# Terminal 1 — Backend API
cd backend && npm install && node server.js      # → http://localhost:3000
# Terminal 2 — Web frontend
cd frontend-web && npm install && npm run dev    # → http://localhost:5173
```

Check: `curl -s localhost:3000/api/products | head -c 80` and open http://localhost:5173.

Verified facts:
- **Restarting the backend resets the DB to seed data** (normal here; test data doesn't survive restarts).
- `run_servers.sh` is stale (another machine's paths) — don't use it.
- `test@eshop.com / Test1234!` is a **shared account** — never use it for wrong-password experiments (see §10.3).

### 3.3 Manual exploration (before automating — S3 requirement)

With DevTools (F12) open: visit `/`, log in with `test@eshop.com / Test1234!`, add a product, open the cart, go through checkout, and watch the **Network** tab. Write down 3 surprises (seeded bugs) — your first findings draft. Keep the **Elements** tab open for locators.

### 3.4 Learning path

- `docs/Playwright-Guide.md` — Mức 1 → 3 (in this repo, Vietnamese)
- Official: <https://playwright.dev/docs/intro> · <https://playwright.dev/docs/writing-tests> · <https://playwright.dev/docs/locators> · <https://playwright.dev/docs/test-assertions> · <https://playwright.dev/docs/best-practices>
- `npx playwright codegen http://localhost:5173` — click around, get real locators

### 3.5 Bug vs test error — the most important skill

| Symptom | Meaning | Action |
| :-- | :-- | :-- |
| App behaves differently from `README.md` spec (FR-x) | **Bug (finding)** | Keep the spec-based assertion, mark `test.fail()`, log `FIND-x` evidence |
| Locator can't find the element / strict-mode violation | **Test error** | Fix the test with codegen; prefer role/text locators |
| Same test passes and fails on rerun of the same code | **Flake** | M3 protocol (§8) |

---

## 4. Shares & shared contracts

### 4.1 Pick your share — mark it when taken

All three shares are equal in effort (~6–8 h). Pick any one, then replace `☐ open` with `✅ <your name>` so everyone can see who has which share (one claim per share).

| Share | Chosen by | You build | You own (only you edit) |
| :-- | :-- | :-- | :-- |
| **A — Platform & Auth** | ☐ open | M1 Playwright scaffold + login spec; FR-02 login/lockout tests; M3 metrics for `tests/auth` | `package.json`, `package-lock.json`, `playwright.config.js`, `tests/support/**`, `tests/pages/LoginPage.js`, `tests/auth/**` |
| **B — Cart** | ☐ open | FR-07 add-to-cart tests (catalog, product detail, cart); M3 metrics for `tests/cart` | `tests/pages/HomePage.js`, `tests/pages/ProductDetailPage.js`, `tests/pages/CartPage.js`, `tests/cart/**` |
| **C — Checkout** | ☐ open | FR-08 checkout tests (UI + order API); M3 metrics for `tests/checkout` | `tests/pages/CheckoutPage.js`, `tests/checkout/**` |

You will learn — **A:** setup/config/POM/codegen/trace viewer · **B:** locators/assertions/test isolation · **C:** API testing with `request`, token seeding, races.

Team-log files (one set per share): `docs/team-log/share-<a|b|c>.md`, `findings-<auth|cart|checkout>.md`, `flakiness-<auth|cart|checkout>.md`, `raw/<auth|cart|checkout>-runs.log`.

The shared contracts in **§4.2–§4.8 are frozen**: Share A implements them; B and C import them and never edit them.

### 4.2 Repo layout after M1 scaffold

```
<repo-root>/
├── package.json                       # NEW: root Playwright project (Share A)
├── playwright.config.js               # NEW (Share A)
├── tests/
│   ├── support/
│   │   ├── auth.js                    # NEW (Share A)
│   │   └── throttle.js                # NEW (Share A)
│   ├── pages/
│   │   ├── LoginPage.js               # Share A
│   │   ├── HomePage.js                # Share B
│   │   ├── ProductDetailPage.js       # Share B
│   │   ├── CartPage.js                # Share B
│   │   └── CheckoutPage.js            # Share C
│   ├── auth/                          # Share A
│   ├── cart/                          # Share B
│   └── checkout/                      # Share C
└── docs/team-log/                     # evidence (per-share files)
```

### 4.3 Bootstrap commands (Share A)

```bash
cd <repo-root>
# non-interactive scaffold: JS, tests/ dir, Chromium only, no browser download yet, no GitHub Actions
npm init playwright@latest -- --quiet --browser=chromium --lang=js --no-browsers
npx playwright install chromium
```

Then:
- [ ] Check `git diff .gitignore` — if the scaffolder touched it, restore: `git checkout -- .gitignore` (our .gitignore already ignores `playwright-report/`, `test-results/`, `node_modules/`)
- [ ] Run the generated example as an install smoke-check: `npx playwright test tests/example.spec.js --project=chromium`
- [ ] Delete the example: `rm tests/example.spec.js`
- [ ] Replace `playwright.config.js` with the content below
- [ ] Record the Playwright version in your log: `npx playwright --version`

### 4.4 `playwright.config.js` (exact content)

```js
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,                 // per test
  expect: { timeout: 5_000 },      // assertion retry window
  fullyParallel: false,
  retries: 0,                      // IMPORTANT: no retries — flakiness must be visible, not hidden
  workers: 1,                      // single worker: deterministic runs + shared SUT
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:5173',
    locale: 'vi-VN',               // makes toLocaleString() deterministic: 6.000.000
    timezoneId: 'Asia/Ho_Chi_Minh',
    headless: true,
    trace: 'retain-on-failure',    // evidence for flake investigations
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: { slowMo: Number(process.env.SLOWMO || 0) },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
```

Root `package.json` scripts to add (Share A):

```json
"scripts": {
  "test": "playwright test",
  "test:headed": "playwright test --headed --workers=1",
  "report": "playwright show-report"
}
```

Useful CLI commands (everybody):

```bash
npx playwright test                          # everything
npx playwright test tests/auth               # one slice
npx playwright test --headed --workers=1     # watch the browser
SLOWMO=500 npx playwright test --headed      # slow motion for demos
npx playwright codegen http://localhost:5173 # generate locators by clicking
npx playwright show-report                   # HTML report with traces/screenshots/videos
npx playwright show-trace test-results/<test-folder>/trace.zip
```

### 4.5 `tests/support/auth.js` (exact content — Share A)

```js
const API = 'http://localhost:3000';

/** Log in through the API and return { token, user }. Faster and more stable than the UI. */
export async function loginViaAPI(request, { email, password }) {
  const res = await request.post(`${API}/api/login`, { data: { email, password } });
  if (!res.ok()) throw new Error(`API login failed: ${res.status()} ${await res.text()}`);
  return res.json();
}

/** Register a throwaway user through the API. Used to avoid locking shared accounts. */
export async function registerViaAPI(request, { name = 'Probe User', email, password }) {
  const res = await request.post(`${API}/api/register`, { data: { name, email, password } });
  if (!res.ok()) throw new Error(`API register failed: ${res.status()} ${await res.text()}`);
  return res.json();
}

/** Write the JWT into localStorage BEFORE the app loads, so the app is logged in on first paint. */
export async function seedAuthToken(page, token) {
  await page.addInitScript((t) => { localStorage.setItem('token', t); }, token);
}
```

Usage (B and C):

```js
import { test, expect } from '@playwright/test';
import { loginViaAPI, seedAuthToken } from '../support/auth.js';

test.beforeEach(async ({ page, request }) => {
  const { token } = await loginViaAPI(request, { email: 'test@eshop.com', password: 'Test1234!' });
  await seedAuthToken(page, token);
});
```

### 4.6 `tests/support/throttle.js` (exact content — Share A)

```js
/** Add a fixed delay (ms) to every API call — used for M3 flakiness measurement. */
export async function applyApiThrottle(page, delayMs = 300) {
  await page.route('**/api/**', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    await route.continue();
  });
}
```

Usage (every spec file, so `THROTTLE_MS` can be toggled from the shell):

```js
import { applyApiThrottle } from '../support/throttle.js';

test.beforeEach(async ({ page }) => {
  const delay = Number(process.env.THROTTLE_MS || 0);
  if (delay > 0) await applyApiThrottle(page, delay);
});
```

### 4.7 Test-writing conventions (everybody)

- One `*.spec.js` per concern; file names lower-case (`login.spec.js`)
- Prefer locators in this order: `getByRole` → `getByText`/`getByPlaceholder` → CSS class → XPath (avoid)
- **No `waitForTimeout()`** — assert with `expect(...)` (auto-retries up to 5 s) or `waitFor`
- Navigate with `page.goto('/', { waitUntil: 'domcontentloaded' })` (the home page loads external images from `placehold.co`; `load` can hang on a bad network)
- Numbers: browser locale is `vi-VN`, so `6000000` renders as `6.000.000` — assert `'6.000.000 ₫'`
- Unique test data: any test that can lock/duplicate something must use `Date.now()`-suffixed emails via `registerViaAPI`
- `test.fail()` convention (verified with Playwright 1.64: an expected failure shows ✘ in the list but the **run passes and exits 0**):
  ```js
  test('FR-02 spec: password input must be type=password', async ({ page }) => {
    test.fail(); // ← quarantined known SUT bug; remove when the SUT is fixed
    await expect(page.locator('form input').nth(1)).toHaveAttribute('type', 'password');
  });
  ```
- For a *batch* of spec mismatches in one test, use `expect.soft()` so all mismatches are collected:

```js
test('FR-02/22 conformance: login form fields', async ({ page }) => {
  test.fail();
  await page.goto('/login', { waitUntil: 'domcontentloaded' });
  await expect.soft(page.locator('form input').nth(0)).toHaveAttribute('type', 'email');
  await expect.soft(page.locator('form input').nth(1)).toHaveAttribute('type', 'password');
  await expect.soft(page.getByRole('button', { name: 'Đăng nhập' })).toBeVisible();
  await expect.soft(page.locator('h1')).toHaveCount(1); // FR-05/21: exactly one h1 per page
});
```

### 4.8 POM pattern (minimal — follow this shape)

```js
// tests/pages/LoginPage.js  (Share A owns; B/C write their own page objects the same way)
export class LoginPage {
  constructor(page) {
    this.page = page;
    // NOTE: this SUT's login form has no placeholders and no htmlFor labels (see §10) —
    // structural locators are required. Verified with codegen on 2026-10-17.
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

Rule: a POM method = one user action (`login`, `addToCart`), not assertions. Assertions live in specs.

---

## 5. Share A — Platform & Authentication (M1 + FR-02)

**You cover:** the whole Playwright setup (M1) and the Login + lockout flow (M2 part), plus the M3 metrics for `tests/auth`.

**Files you own:** `package.json`, `package-lock.json`, `playwright.config.js`, `tests/support/auth.js`, `tests/support/throttle.js`, `tests/pages/LoginPage.js`, `tests/auth/*.js`, `docs/team-log/share-a.md`, `docs/team-log/findings-auth.md`, `docs/team-log/flakiness-auth.md`, `docs/team-log/raw/auth-runs.log`

**Learn first (45 min):** `docs/Playwright-Guide.md` Mức 1–3; official *Getting started* + *Locators* + *Best practices*; try `npx playwright codegen http://localhost:5173/login` after scaffolding.

### Checklist

- [ ] **A1. Scaffold** (§4.3–§4.6) — push within 90 minutes, tell the team
- [ ] **A2. `tests/pages/LoginPage.js`** per §4.8 (fill in the real locators; verify with codegen)
- [ ] **A3. `tests/auth/login.spec.js` — 2 passing tests**
  - [ ] happy path: `test@eshop.com / Test1234!` → lands on home (`toHaveURL(/\/$/)`) and sees heading `Danh sách sản phẩm`
  - [ ] wrong password for a **throwaway user** (register via `registerViaAPI`, email `a2-<Date.now()>@example.com`): stays on `/login`, sees the error text `Đăng nhập thất bại`
- [ ] **A4. `tests/auth/spec-conformance.spec.js` — 1–2 `test.fail()` tests** with the §4.7 `expect.soft` batch. Minimum checks (all fail against the current SUT — they are the findings):
  - [ ] email input must be `type="email"`, password input `type="password"` (FR-02/22)
  - [ ] submit button name must be `Đăng nhập` (FR-02/21) — actual is `Sign In`
  - [ ] login page must have exactly one `<h1>` (FR-05/21) — actual: 0
  - [ ] optional: error message must appear **above** the submit button (FR-22) — compare `boundingBox()` y-coordinates
- [ ] **A5. `tests/auth/lockout.spec.js`** — verified SUT behavior (2026-10-17):
  - [ ] passing behavior test: fresh throwaway user, 3 wrong attempts → account locks **within 3 attempts** and a correct password is afterwards refused (all attempts show the error and stay on `/login`). Actual SUT locks on the **2nd** wrong attempt — "within 3" is still true, so this passes.
  - [ ] `test.fail()` spec test (FR-02): after **2** wrong attempts the counter should be 2 and the account should NOT be locked; a correct login must succeed. Actual SUT: it locks and returns 403 → the assertion fails as expected.
- [ ] **A6. DB evidence for the lockout finding** — after A5, run this read-only query and paste the output into `findings-auth.md`:
  ```bash
  cd backend
  node -e "const s=require('sqlite3');const db=new s.Database('./database.sqlite',s.OPEN_READONLY);db.all(\"SELECT email,login_attempts,locked_until,datetime('now') AS db_now FROM users WHERE email LIKE 'lockout-%' ORDER BY id DESC LIMIT 5\",[],(e,r)=>{console.log(e||r);db.close()})"
  ```
  Expected evidence: `login_attempts` jumped by 2 per attempt (2 → 4) and `locked_until` is ~180 s in the future (FR says +1 and lock only from the 3rd failure, for 30 s).
  ⚠️ Never `require('./backend/database')` or run `node database.js` from a helper — it **drops and reseeds all tables**. The command above opens the SQLite file read-only, that's safe.
- [ ] **A7. Findings** in `docs/team-log/findings-auth.md`, format:
  ```md
  ## FIND-A1 — Lockout triggers after 2nd wrong attempt (FR-02)
  - Severity: High
  - Spec: "Nếu đăng nhập sai từ 3 lần trở lên liên tiếp, tài khoản bị tạm khóa 30 giây"
  - Actual: locked after 2nd failure; locked_until = now + 180 s; counter +2 per attempt
  - Steps: tests/auth/lockout.spec.js ("FR-02 spec: ...") -> run -> output in docs/team-log/raw/auth-runs.log
  - Evidence: DB query output (copy-paste), screenshot
  ```
  Minimum findings: lockout early (FR-02), counter +2 (FR-02), login-form UI conformance (FR-02/22). Mark each with the FR number.
- [ ] **A8. Team log entry** `docs/team-log/share-a.md`: date, commands used, errors + fixes, links to files. One section per session.
- [ ] **A9. M3 loop** for `tests/auth` (§8) → `docs/team-log/flakiness-auth.md` + `raw/auth-runs.log`

### Known traps for Share A

1. **The login page does not match FR-02 at all** — this is the first finding, not a reason to stop: label text is `Username`, inputs have no placeholders, password is `type="text"`, button says `Sign In`, the heading even says `Đăng Ký` (wrong page title).
2. Never test wrong passwords on `test@eshop.com` — you would lock the shared account for ~3 minutes.
3. The UI shows the same generic message for wrong credentials and for a locked account — note it in findings (the backend does return a distinct 403 message, the UI hides it).
4. After a failed login the app stays on `/login`; after a successful one it goes to `/` (not `/home`).

---

## 6. Share B — Add-to-Cart (FR-07)

**You cover:** catalog → product → cart flow (M2 part), plus M3 metrics for `tests/cart`.

**Files you own:** `tests/pages/HomePage.js`, `tests/pages/ProductDetailPage.js`, `tests/pages/CartPage.js`, `tests/cart/*.js`, `docs/team-log/share-b.md`, `docs/team-log/findings-cart.md`, `docs/team-log/flakiness-cart.md`, `docs/team-log/raw/cart-runs.log`

**Learn first (45 min):** `docs/Playwright-Guide.md` Mức 1–3; official *Locators*, *Assertions*, *Best practices*; codegen on the home/product/cart pages.

**Key SUT fact:** the cart lives **in React memory only** (not localStorage, not the server). `page.goto(...)` or a reload empties it. Build your cart with UI clicks inside the same test, navigate with in-app links only. `POST /api/cart` exists but the web app never uses it — ignore it.

### Checklist

- [ ] **B1. Page objects** (contract §4.8):
  - `HomePage`: `goto()`, `card(productName)`, `addToCart(productName)`, `openCart()`
  - `ProductDetailPage`: `open(productId)`, `addButton()`, `addToCartTwice()` (see trap 2)
  - `CartPage`: `rows()`, `row(productName)`, `totalLine()`, `remove(productName)`, `openCheckout()`
- [ ] **B2. `tests/cart/add-to-cart.spec.js` — passing tests** (login first via `loginViaAPI` + `seedAuthToken`, §4.5)
  1. add `Tai nghe AirPods Pro 2` (6.000.000 ₫) from its catalog card → cart shows 1 row with name, `6.000.000 ₫`, quantity `1`, line total `6.000.000 ₫`, and total line contains `6.000.000 ₫`
  2. add `Tai nghe AirPods Pro 2` + `Bàn phím cơ Keychron Q1` (4.000.000 ₫) → 2 rows, total line contains `10.000.000 ₫`
  3. product-detail path: open `/product/4`, click "Thêm vào giỏ hàng" **twice** (trap 2), then verify the cart — the first click is a no-op in this SUT
- [ ] **B3. `tests/cart/spec-conformance.spec.js` — `test.fail()` tests** with `expect.soft`. Implement at least 4 of these (each is a real finding):
  - adding the same product twice must merge into ONE row with quantity 2 (FR-07) — actual: two rows
  - total label must be `Tổng cộng` (FR-07) — actual: `Tổng tạm tính`
  - quantity must have +/- controls (FR-07) — actual: none
  - removing an item must show a confirmation dialog (FR-07/24) — actual: removed immediately, no dialog
  - "Tiếp tục mua sắm" button label (FR-07) — actual: `← Mua tiếp`
  - empty cart must show an illustration (FR-07/24) — actual: text only
  - header cart link must show a count badge (FR-23) — actual: no badge
  - catalog images must have a non-empty `alt` (FR-24) — actual: `alt=""`
- [ ] **B4. Findings** in `docs/team-log/findings-cart.md` (FIND-B1…), same format as §5 A7, with FR references and test names
- [ ] **B5. Team log** `docs/team-log/share-b.md`
- [ ] **B6. M3 loop** for `tests/cart` (§8) → `flakiness-cart.md` + `raw/cart-runs.log`

### Known traps for Share B

1. **No badge, no toast:** after adding from a catalog card there is no visible feedback at all (FR-24 finding). Your passing tests must navigate to the cart to verify state.
2. **Product detail "first click does nothing"** (`clickCount` bug): call the add button **twice**. The button then shows `Đã thêm` for only 2 s — prefer asserting cart contents over that transient text.
3. Card locator: `page.locator('.bg-white', { hasText: productName })` scopes to one product card (verified). The card button is `Thêm vào giỏ` (no "hàng"); the product-detail button is `Thêm vào giỏ hàng`.
4. The header cart link is `page.getByRole('link', { name: 'Giỏ hàng' })`; in-app click keeps the cart, `page.goto('/cart')` does not.
5. Prices are rendered with `vi-VN` formatting only if the browser locale is `vi-VN` (already set in the shared config). Expected strings look like `6.000.000 ₫`.

---

## 7. Share C — Checkout (FR-08)

**You cover:** cart → checkout → order flow (M2 part), plus M3 metrics for `tests/checkout`.

**Files you own:** `tests/pages/CheckoutPage.js`, `tests/checkout/*.js`, `docs/team-log/share-c.md`, `docs/team-log/findings-checkout.md`, `docs/team-log/flakiness-checkout.md`, `docs/team-log/raw/checkout-runs.log`

**Learn first (60 min):** everything from B's list plus the `request` fixture (<https://playwright.dev/docs/api-testing>) and `page.route` (<https://playwright.dev/docs/network>).

### Checklist

- [ ] **C1. `tests/pages/CheckoutPage.js`**: `items()`, `totalInput()`, `summaryTotal()`, `confirm()`
- [ ] **C2. `tests/checkout/checkout.spec.js` — passing happy path**
  1. login via API + `seedAuthToken`
  2. `page.goto('/')` then **wait for the profile to load**: `await expect(page.getByRole('link', { name: /Chào/ })).toBeVisible()` — this guard is mandatory (trap 1)
  3. add `iPhone 15 Pro Max` (30.000.000 ₫) from its card
  4. in-app: `Giỏ hàng` → `Tiến hành thanh toán` → assert URL `/checkout` and the item line `iPhone 15 Pro Max x 1`
  5. `Xác Nhận Thanh Toán` → assert heading `Thanh toán thành công!`
  6. API verification with the **state-delta pattern** (robust against orders created by teammates):
     ```js
     const api = { headers: { Authorization: `Bearer ${token}` } };
     const before = await (await request.get('http://localhost:3000/api/orders/my-orders', api)).json();
     const beforeIds = new Set(before.map((o) => o.id));
     // ... do the UI checkout ...
     const after = await (await request.get('http://localhost:3000/api/orders/my-orders', api)).json();
     const created = after.find((o) => !beforeIds.has(o.id));
     expect(created).toBeTruthy();
     expect(created.status).toBe('pending');
     expect(created.total_amount).toBe(30000000);
     ```
- [ ] **C3. `tests/checkout/spec-conformance.spec.js` — `test.fail()` tests** (all verified real bugs):
  - `Tổng tiền thanh toán` must not be editable (FR-08) — actual: it is a normal `<input type="number">`; `expect(await totalInput().isEditable()).toBe(false)` fails
  - unauthenticated user opening `/checkout` must be sent to `/login` (FR-08) — actual: the page renders
  - after a successful checkout the cart must be cleared (FR-08) — actual: item still in cart (clearCart is never called)
  - API test: the backend must recompute the total and ignore the client value (FR-08):
    ```js
    test('FR-08 spec: backend must ignore client-sent total_amount', async ({ request }) => {
      test.fail();
      const { token } = await loginViaAPI(request, { email: 'test@eshop.com', password: 'Test1234!' });
      const res = await request.post('http://localhost:3000/api/checkout', {
        headers: { Authorization: `Bearer ${token}` },
        data: { items: [{ id: 1, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 1 }], total_amount: 1, shipping_address: 'x' },
      });
      const { orderId } = await res.json();
      const order = await (await request.get(`http://localhost:3000/api/orders/${orderId}`)).json();
      expect(order.total_amount).not.toBe(1); // bug: backend stores 1
    });
    ```
- [ ] **C4. Findings** in `docs/team-log/findings-checkout.md` (FIND-C1…), same format as §5 A7
- [ ] **C5. Team log** `docs/team-log/share-c.md`
- [ ] **C6. M3 loop** for `tests/checkout` (§8) → `flakiness-checkout.md` + `raw/checkout-runs.log`

### Known traps for Share C

1. **Auth bootstrap race (real, app-side):** on a fresh page the profile (`/api/users/me`) loads asynchronously. If `Tiến hành thanh toán` is clicked before it resolves, `user` is null and the app shows an alert and redirects to `/login`. Always wait for the `Chào, ...` link (C2 step 2). Under network throttling this becomes flaky — this is our designated flake candidate (see §8.4).
2. Cart is in memory: never `page.goto('/checkout')` mid-flow — use the in-app buttons, or the cart is empty.
3. The checkout total input starts as the cart total (`30000000`, no separators); the summary text uses `30.000.000 ₫`. Assert accordingly.
4. `alert()` dialogs are auto-dismissed by Playwright by default — in a failure path, check `page.url()` instead of the dialog text.
5. The coupon box exists on this page but FR-09 is **not** part of milestones 1–3 — leave it alone for now.

---

## 8. Milestone 3 — flakiness protocol (every share, same recipe)

**Definition used here:** a *flake* = the same test, same code, different result across the 10 runs. A consistently failing test that is quarantined with `test.fail()` is **not** a flake.

### 8.1 Run the 10-run loop

From the repo root (bash/WSL/Git Bash; on Windows use WSL or Git Bash):

```bash
mkdir -p docs/team-log/raw
for i in $(seq 1 10); do
  if [ "$i" -eq 1 ]; then DELAY=0; else DELAY=300; fi   # run 1 cold, runs 2-10 throttled
  {
    echo "===== RUN $i / THROTTLE_MS=$DELAY $(date -Is) ====="
    THROTTLE_MS=$DELAY npx playwright test tests/cart --workers=1 --reporter=list
    echo "EXIT_CODE=$?"
  } 2>&1 | tee -a docs/team-log/raw/cart-runs.log
done
```

Replace `tests/cart` with your slice (`tests/auth` or `tests/checkout`) **and** the log filename (`raw/auth-runs.log` / `raw/checkout-runs.log`). Notes:
- Each run overwrites `playwright-report/`; the raw log is the durable evidence. For per-run HTML reports use `PLAYWRIGHT_HTML_REPORT=reports/run-$i` if you want, but it's optional.
- If the team shares **one** SUT instance, do not run your loops at the same time as a teammate's — take turns. If each member runs their own local backend/web, run freely.
- Run 1 is intentionally unthrottled ("first run" vs "10th run" learning objective).

### 8.2 Fill the metrics table

In `docs/team-log/flakiness-<slice>.md`:

```md
| Run | THROTTLE_MS | T1 | T2 | T3 | T4 | Passed | Failed | Duration | Notes |
| --: | --: | -- | -- | -- | -- | --: | --: | --: | --- |
| 1 | 0   | ✓ | ✓ | ✓ | ✘* | 3 | 0 | 1m20s | cold start |
| 2 | 300 | ✓ | ✓ | ✘ | ✘* | 2 | 1 | 1m35s | T3 timed out on ... |
...
| Summary | | flaky tests: T3 (1/10) | | | | | | |
```

`✘*` = expected failure via `test.fail()` → counts as passed for suite health but is listed separately. Record every run's per-test result from the list output (`grep -E "✓|✘|passed|failed" docs/team-log/raw/<slice>-runs.log`).

### 8.3 Investigate one flake

For the first test that shows **mixed** ✓/✘:

1. Re-run just that test 20×: `THROTTLE_MS=300 npx playwright test tests/cart/<file> --repeat-each=20 --workers=1` → frequency (x/20)
2. Open the evidence: `npx playwright show-report` → click the failed repetition → **trace** (network waterfall, DOM snapshots, console)
3. Classify the root cause:
   - *test-side*: missing auto-wait, wrong locator, shared state between tests → fix the test, note the fix
   - *environment*: external assets (`placehold.co`), machine load → mitigate (e.g. `domcontentloaded`, avoid `load`)
   - *app-side*: a real race/defect → record as finding, quarantine with `test.fixme(true, 'reason + FIND id')` if intermittent, or `test.fail()` if deterministic
4. Write the investigation up in `flakiness-<slice>.md`:

```md
### Flake investigation — <test name>
- Symptom: failed runs 3, 7 of 10 (0% → 20% → 0%)
- Hypothesis: cart state / async profile / slow API
- Evidence: trace path, error text, screenshot, network timings (paste)
- Root cause: ...
- Action: fixed / quarantined as FIND-x / risk noted
```

### 8.4 Fallback: if nobody finds a natural flake — forced race experiment

This reproduces a **real app race** documented in §7 trap 1 (the cart page decides `user` before the async profile request finishes). Create a scratch file `tests/checkout/race-experiment.spec.js` (delete it before merging), run it 20×, count the outcomes:

```js
import { test } from '@playwright/test';
import { loginViaAPI, seedAuthToken } from '../support/auth.js';
import { applyApiThrottle } from '../support/throttle.js';

test('race experiment: checkout clicked before profile loads', async ({ page, request }) => {
  const { token } = await loginViaAPI(request, { email: 'test@eshop.com', password: 'Test1234!' });
  await seedAuthToken(page, token);
  await applyApiThrottle(page, 300);            // try 150–300 ms until outcomes mix
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const card = page.locator('.bg-white', { hasText: 'iPhone 15 Pro Max' });
  await card.getByRole('button', { name: 'Thêm vào giỏ' }).click();
  await page.getByRole('link', { name: 'Giỏ hàng' }).click();
  // deliberately NO wait for the "Chào," greeting here
  await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
  console.log(`RACE_RESULT_URL=${page.url()}`);
});
```

```bash
THROTTLE_MS=300 npx playwright test tests/checkout/race-experiment.spec.js --repeat-each=20 --workers=1 --reporter=list 2>&1 | tee docs/team-log/raw/race-experiment.log
grep -c "RACE_RESULT_URL=http://localhost:5173/login" docs/team-log/raw/race-experiment.log   # redirected to login
grep -c "RACE_RESULT_URL=http://localhost:5173/checkout" docs/team-log/raw/race-experiment.log # stayed
```

If both counts are > 0 → genuine flake reproduced; write it up as the M3 investigation (root cause = app-side auth race; test-side fix = the `Chào` guard). If it is deterministic, report it as a deterministic race finding and investigate the timing with `THROTTLE_MS` values between 100 and 1500.

---

## 9. Wrap-up meeting (60–90 min, all three) + final acceptance

Agenda:

- [ ] Each owner demos their slice headed: `npx playwright test tests/<slice> --headed --workers=1` (5 min each)
- [ ] Each owner presents 1 finding + the 10-run metrics summary (5 min each)
- [ ] Scribe merges the three flakiness files into `docs/team-log/M3-flakiness-summary.md` (one writer only)
- [ ] Cross-run validation (S3: "every member must be able to run the tool unaided"): each member runs **someone else's** slice and explains one locator and one assertion
- [ ] Final full-suite validation: one person restarts the backend (fresh seed), then `npx playwright test --workers=1` — must exit 0 (expected-fail tests are fine)
- [ ] `npx playwright show-report` — check the HTML report/traces are usable
- [ ] PRs merged to `main`; confirm no one touched another's files: `git diff --name-only main` on each branch
- [ ] Definitions of done (§1.1) ticked

---

## 10. Reference

### 10.1 Test data (seeded)

| What | Value |
| :-- | :-- |
| User | `test@eshop.com` / `Test1234!` (shared — valid logins only) |
| Admin | `admin@eshop.com` / `Admin123!` (not needed for M1–3) |
| Products | 1 iPhone 15 Pro Max 30,000,000 ₫ · 2 Samsung S24 Ultra 28,000,000 ₫ · 3 MacBook Pro M3 45,000,000 ₫ · 4 AirPods Pro 2 6,000,000 ₫ · 5 Keychron Q1 4,000,000 ₫ |
| Routes | `/login`, `/` (catalog), `/product/:id`, `/cart`, `/checkout` |
| APIs | `POST /api/login`, `POST /api/register`, `POST /api/checkout`, `GET /api/orders/my-orders`, `GET /api/products` |
| Coupons | SAVE10, BIGBUY, VIP100, EXPIRED — **out of scope for M1–3** |

### 10.2 SUT deviations you will hit (verified 2026-10-17 — these are findings, not test errors)

| Area | Spec | Actual |
| :-- | :-- | :-- |
| Login form (FR-02/22) | `type=email`, `type=password`, label Email, button `Đăng nhập`, error above submit | label `Username`, fields `type=text`, button `Sign In`, error below the button, page has no `h1` |
| Lockout (FR-02) | counter +1; lock from 3rd consecutive failure; 30 s | counter +2; locks on 2nd failure; 180 s; UI shows the same generic error for locked and wrong password |
| Cart (FR-07/23/24) | merge duplicate rows, +/- controls, confirm dialog on remove, label `Tổng cộng`, `Tiếp tục mua sắm`, badge, empty-state illustration | duplicate rows, no controls, no dialog, label `Tổng tạm tính`, `← Mua tiếp`, no badge, text-only empty state |
| Product detail (FR-06/24) | feedback after add | first click is a no-op; second click adds and shows `Đã thêm` for 2 s |
| Catalog (FR-05/24) | price in ₫, alt text, one h1 | price in `VND`, `alt=""`, two `<h1>`s, search echo rendered with `innerHTML` |
| Checkout (FR-08) | login required, total read-only, backend recomputes, cart cleared | page renders without login, total is editable, backend stores the client value, cart not cleared |
| Header (FR-23) | logout label `Đăng xuất` | label is `Thoát` |

### 10.3 Troubleshooting

| Symptom | Likely cause / fix |
| :-- | :-- |
| `page.goto` timeout on the catalog | external `placehold.co` images + `load` event → use `waitUntil: 'domcontentloaded'` |
| `strict mode violation: locator resolved to N elements` | locator too broad → scope it (`page.locator('.bg-white', { hasText: name })`) or add `.first()` only as a last resort |
| Login test fails on `test@eshop.com` | the account is locked (someone tested wrong passwords) → wait 3 min, or restart the backend (resets DB), or use a throwaway account |
| `npx playwright test` finds no tests | run from the **repo root**; check `testDir` and file names end with `.spec.js` |
| `Cannot find module '@playwright/test'` | `npm install` was not run at the repo root after the scaffold |
| Scaffold/`npm install` errors about the existing root `node_modules` (there is a leftover partial Playwright install in this repo) | `rm -rf node_modules` at the repo root and re-run the scaffold/install |
| Element found but click does nothing | SUT seeded bug (e.g. product-detail first click) → read §10.2 before rewriting the test |
| Expected-fail test suddenly fails the run | it *passed* — the SUT may have changed → revisit the finding, un-mark `test.fail()` if fixed |
| Port 5173 busy | Vite may fall back to another port → restart Vite or update `baseURL` |
| `sqlite3` build error during `npm install` (Windows) | install Node LTS with build tools, or use WSL |

---

## 11. AI-assistance note (for the team log)

This plan was drafted with AI assistance on 2026-10-17 and **must be reviewed, edited, and verified by the team before use** (course AI policy: every AI-generated artefact needs human review). When you later fill in `[AI-02]`, record: the prompts used to generate/verify this plan, what you changed, and the fact that all the SUT facts in §10 were verified against a live instance with commands documented in the team log.

*— End of assignment —*
