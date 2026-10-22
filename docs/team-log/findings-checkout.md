# FIND — Checkout slice (Share C, FR-08)

Owner: Luan (Share C). Test files: `tests/checkout/checkout.spec.js` (behavior), `tests/checkout/spec-conformance.spec.js` (quarantined findings).
Raw evidence: `docs/team-log/raw/checkout-runs.log`, `docs/team-log/raw/race-experiment.log`.

> Provenance note: the first verification run used a scratch git worktree with contract-identical copies of
> With the team's approval the files were then added in-tree verbatim from the same contract, so all results below are now
> reproducible from the repo root with `npm test -- tests/checkout`.

---

## FIND-C1 — Checkout total is editable by the user (FR-08)

- Severity: High
- Spec: "Tổng tiền thanh toán được tính tự động từ giỏ hàng và không cho phép người dùng chỉnh sửa trực tiếp." (README FR-08)
- Actual: the total is a normal `<input type="number">` bound to `editableTotal` (Checkout.jsx:93–102); the user can type any amount.
  The edited value is then sent to `POST /api/checkout` as `total_amount` (Checkout.jsx:45–48), so the client fully controls what is charged.
- Steps: `tests/checkout/spec-conformance.spec.js` → "FIND-C1 / FR-08 spec: the total amount must not be editable by the user" → run → `isEditable()` returns `true`.
- Evidence: ✘ expected failure in `raw/checkout-runs.log`, runs 1–10; source `frontend-web/src/pages/Checkout.jsx`.

## FIND-C2 — `/checkout` renders for unauthenticated visitors (FR-08, SEC-02)

- Severity: High
- Spec: "Chỉ người dùng đã đăng nhập mới tiến hành thanh toán được." (FR-08)
- Actual: direct `page.goto('/checkout')` shows the order form with no token in `localStorage`. The login guard exists only on the
  cart button (`Cart.jsx:11–18`), not on the checkout route. Submitting without a token makes the API return 401 and shows an `alert()`.
- Steps: `tests/checkout/spec-conformance.spec.js` → "FIND-C2 ... unauthenticated visitor must be sent from /checkout to /login" → expected URL `/login`, actual URL stays `/checkout`.
- Evidence: ✘ expected failure in `raw/checkout-runs.log`, runs 1–10 (≈5.8 s assertion timeout each).

## FIND-C3 — Cart is not cleared after a successful checkout (FR-08)

- Severity: Medium
- Spec: "Sau thanh toán thành công, giỏ hàng được xóa." (FR-08)
- Actual: `clearCart` is destructured from `useCart()` (Checkout.jsx:8) but never called in `handleCheckout`; after the success screen,
  "Quay lại trang chủ" → "Giỏ hàng" still lists the purchased item.
- Steps: `tests/checkout/spec-conformance.spec.js` → "FIND-C3 ... cart must be cleared after a successful checkout" → full UI purchase, then open the cart → empty-state message is never shown.
- Evidence: ✘ expected failure in `raw/checkout-runs.log`, runs 1–10.

## FIND-C4 — Backend stores the client-sent total instead of recomputing it (FR-08)

- Severity: Critical
- Spec: "Backend phải tự tính lại tổng tiền; không chấp nhận giá trị total_amount do client gửi lên." (FR-08)
- Actual: `POST /api/checkout` inserts `req.body.total_amount` verbatim (backend/server.js:297–309). Sending `total_amount: 1` for a
  30.000.000 ₫ iPhone creates an order whose stored total is 1 ₫.
- Steps: `tests/checkout/spec-conformance.spec.js` → "FIND-C4 ... backend must ignore a client-sent total_amount" (API-only, `request` fixture) → `GET /api/orders/:id` returns `total_amount: 1`.
- Evidence: ✘ expected failure in `raw/checkout-runs.log`, runs 1–10; response bodies recorded in the run log.

## FIND-C5 — Checkout page has no `<h1>` (FR-21)

- Severity: Low
- Spec: "Tiêu đề trang: Mỗi trang có đúng 1 thẻ `<h1>` mô tả nội dung trang." (FR-21; also FR-05)
- Actual: the page title “Xác Nhận Đơn Hàng” is an `<h2>` (Checkout.jsx:80); `page.locator('h1')` resolves to 0 elements.
- Steps: `tests/checkout/spec-conformance.spec.js` → "FIND-C5 / FR-21 conformance: the checkout page must have exactly one <h1>".
- Evidence: ✘ expected failure in `raw/checkout-runs.log`, runs 1–10.

## FIND-C6 — Auth bootstrap race: checkout blocked before `/api/users/me` resolves (FR-08)

- Severity: Medium (intermittent)
- Spec: FR-08 requires a logged-in user to be able to check out; failing intermittently on a fresh page is a defect, not expected behaviour.
- Actual: `Cart.jsx` reads `user` from `AuthContext` synchronously. If the profile request is still in flight, `user` is `null`,
  the app raises an alert and navigates to `/login` even though the JWT was already in `localStorage`.
  Reproduction: `tests/checkout/race-experiment.spec.js` with `PROFILE_DELAY_MS=210` → 7/20 repetitions redirected to `/login`, 13/20 stayed on `/checkout`.
- Steps: see `docs/team-log/flakiness-checkout.md` → "Flake investigation".
- Evidence: `docs/team-log/raw/race-experiment.log`; the `Chào` guard in `checkout.spec.js` is the test-side mitigation.
- Action: keep the guard in all tests that click "Tiến hành thanh toán"; report the race for a dev fix; scratch spec is deleted before merging.

## Observation (not asserted — out of M1–3 scope)

- The UI never sends `shipping_address`, so created orders store `shipping_address: null`. FR-18 requires a safe display of the
  address; worth checking when the admin flow enters scope in the demo phase.
