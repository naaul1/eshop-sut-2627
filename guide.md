# Guide — HW02 Domain Testing on EShop (v2: FR-04 + FR-08 + FR-14 + Pool D)

> Scope locked: Pool A = FR-04 Profile, Pool B = FR-08 Checkout, Pool C = FR-14 Categories. Pool D = FR-20 Mobile (see §4).
> Rule: spec (`README.md`) = oracle. Code refs below are suspects only — verify by execution before reporting. Never fix SUT.

## 1. Setup (do once)

```bash
cd backend && npm install && node database.js  # seed/reset
cd backend && node server.js                    # :3000, keep running
cd frontend-web && npm install && npm run dev      # :5173
cd frontend-admin && npm install && npm run dev    # :5174
cd frontend-mobile && npm install && npx expo start # Expo Go, same Wi-Fi
```

Accounts: Admin `admin@eshop.com` / `Admin123!`, User `test@eshop.com` / `Test1234!`.
Login: `POST /api/login` → `Authorization: Bearer <token>`.

```bash
TOKEN=$(curl -s -X POST localhost:3000/api/login -H 'Content-Type: application/json' -d '{"email":"test@eshop.com","password":"Test1234!"}' | python3 -c 'import sys,json;print(json.load(sys.stdin)["token"])')
ADMIN=$(curl -s -X POST localhost:3000/api/login -H 'Content-Type: application/json' -d '{"email":"admin@eshop.com","password":"Admin123!"}' | python3 -c 'import sys,json;print(json.load(sys.stdin)["token"])')
```

## 2. FR-04 Profile (Pool A) — `README.md:62-67`

Oracle: update only `name`, `phone`, `shipping_address` on own profile. Phone = starts with `0`, 10–11 digits. Email immutable. Never accept `role` from client (see SEC-06).
Suspects: `backend/server.js:118-135` accepts `role` from body and writes it; `frontend-mobile/App.js:287` validates with `/^[1-9][0-9]{8,9}$/` (9–10 digits, must NOT start with 0 — inverted vs spec).

| Var | Valid | Invalid (each ≥1 case) | ON / OFF |
|---|---|---|---|
| name | non-empty string | empty, missing | — |
| phone | `0` + 9–10 more digits (10–11 total) | 9 digits, 12 digits, not starting `0`, letters, empty | `09xxxxxxxx` (10d) / `09xxxxxxxxx` (11d) vs 9d / 12d / `19xxxxxxxx` |
| shipping_address | any string | — | — |
| role in body | must be ignored | `role:"admin"` escalates | with / without `role` field |
| auth | own token | no token, other user's id (if exposed) | — |

BVA (3-value where cheap): phone length 9/10/11/12 digits; leading digit `0` vs `1`; name empty vs 1 char. State 2- vs 3-value per bound in report.
Key cases: `FR04-D01` all-valid; `D02` phone 9 digits; `D03` phone 12 digits; `D04` phone starting `1`; `D05` `role:"admin"` in `PUT /api/users/me` then `GET /api/users/me` check role unchanged; `D06` no token → 401; mobile `D07` enter valid `0xxxxxxxxx` on mobile profile → observe reject (if regex bug holds).
Curl: `PUT /api/users/me` with `{"name":"A","phone":"0912345678","shipping_address":"HN"}` and variant with `"role":"admin"`.

## 3. FR-08 Checkout (Pool B) — `README.md:102-108`

Oracle: login required; total auto-computed from cart, not user-editable; UI lists all items; **backend must recalc, ignore client `total_amount`**; cart cleared on success.
Suspects: `backend/server.js:297-309` inserts client `total_amount` directly, no recalc; `frontend-mobile/App.js:391` sends `items: cart.slice(0,-1)` (drops last item when >1); `App.js:348,684-690` keeps `editableTotal` state (mobile total field is `editable={false}`, so UI ok — backend is the hole).

| Var | Valid | Invalid | ON / OFF |
|---|---|---|---|
| auth | user token | none / garbage → must 401/403 | with / without header |
| cart | ≥1 item | empty cart checkout | 0 / 1 / 2 items |
| total_amount (client) | ignored by backend | forged `1` or `1000` on a 500k cart → backend must not honor | real total vs real±1 vs `1` |
| item list | all items ordered | last item missing (mobile) | 1-item vs 2-item vs 3-item cart on mobile, compare order content |
| post-state | cart cleared | cart persists | — |

BVA: cart size 0/1/2; quantity 0/1 (via cart API if allowed); total forged at `real-1` / `real` / `real+1` and extreme `1`. Attempt counts not applicable — state choice in report.
Key cases: `FR08-D01` happy path, verify order `total_amount` and cart state; `D02` no token → must fail; `D03` send `total_amount: 1` on large cart → Pass only if backend recalculates/rejects; `D04` mobile 2-item cart → confirm both items ordered (catch `slice(0,-1)`); `D05` empty cart checkout.
Curl: `POST /api/checkout -H "Authorization: Bearer $TOKEN" -d '{"total_amount":1,"shipping_address":"HN"}'`.

## 4. FR-14 Categories (Pool C) — `README.md:186-189`

Oracle: admin-only; add/view/delete; **name required, non-empty**.
Suspects: `backend/server.js:249-278` checks `authenticateToken` only, never `role` (any logged-in user can create/update/delete — violates FR-12/SEC-03); no empty-name validation; `PUT` exists though spec lists only Add/View/Delete (testable extra, not a bug unless TA says so); `DELETE` has no guard for categories in use.

| Var | Valid | Invalid | ON / OFF |
|---|---|---|---|
| auth+role | admin token | no token → 401; **user token → must 403** (suspect 200) | none / user / admin |
| name | non-empty, e.g. `"Điện tử"` | `""`, whitespace, missing | `""` vs `"a"` |
| id | existing id | non-existent id update/delete | — |

BVA: name `""` / `"a"` / long string (255/256 if you want cross-ref with FR-15); id `0/1/max+1`. Minimal — this FR is thin, so weight Domain + access-control matrix.
Key cases: `FR14-D01` admin create normal; `D02` create `""`; `D03` create whitespace; `D04` user-token create → must 403; `D05` no-token create → 401; `D06` user-token delete; `D07` get list as anonymous (spec: view — decide oracle: public `GET /api/categories` at `server.js:243` is open; note as observation, not bug, unless admin-only claimed).
Curl: `POST /api/categories -H "Authorization: Bearer $TOKEN" -d '{"name":""}'` with `$TOKEN` (user) vs `$ADMIN`.

## 5. Pool D interpretation (FR-20 Mobile, `README.md:233-236`)

Problem: Pool D has exactly one FR (FR-20: product view, login/logout/register, cart, checkout, profile, order history + cancel only from `pending`/`confirmed`). No 3-way split exists in spec.
Recommended approach — **parity re-execution** (defensible, no spec invention):
1. Re-run your FR-04 + FR-08 domain cases on mobile UI (`App.js:893-976` profile, `App.js:342-420,659-757` checkout, `App.js:312-340` cancel). Same IDs with `-M` suffix (e.g. `FR04-D01-M`), same oracles. Record web-vs-mobile divergences as Pool-D evidence (phone regex reject, `slice(0,-1)` drop are mobile-specific).
2. Add 3–5 mobile-only cases: cancel from `pending` (ok), `confirmed` (ok), `shipping` (must fail per FR-10/20 — backend suspect `server.js:328-329` allows it); logout then checkout; offline/empty-cart checkout.
3. If group needs distinct Pool-D slices per member, split FR-20 by view (`auth` / `catalog+cart` / `checkout+profile+orders`) and cite this guide as the agreement — but for a single person doing FR-04/08/14, parity (option 1+2) covers Pool D with least duplication.

## 6. How to run (all FRs)

Domain: variables → partition table → ON/OFF → combination (one valid row + one-invalid-per-condition) → cases `FRxx-Dxx` → curl first, then UI → evidence per fail. BVA: ordered vars only, list bounds, state 2-/3-value, cases `FRxx-Bxx` → execute. One commit per step: `test(FR-04): domain partitions|cases|execution`, same for `FR-08`, `FR-14`, `FR-20M`.
Gap analysis per bug: (a) bad prompt / (b) tool limit / (c) complexity — one line each. Issues: title `[FR-xx] …`, body = FR ref + STR + expected vs actual + screenshot + severity. Audit: tool, datetime, prompt, output per session; critique 200–300 words from gap labels.

## 7. Submission (`req.md` §14–15)

Report MD+PDF, bug report + issue screenshots, critique + audit, `git log --oneline --decorate > git-log.txt`, README self-assessment + counts (designed/executed/passed/failed/pending, bugs, videos), zip `<StudentID>_HW02_AI_DomainTesting_<000-100>.zip`.

## Log
- v1 (2026-10-13): full tier list + Pool-D 3-way split proposal.
- v2 (2026-10-17): narrowed to FR-04/FR-08/FR-14 + Pool-D parity interpretation per user pick.
