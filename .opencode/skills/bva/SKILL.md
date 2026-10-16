---
name: Boundary Value Analysis for EShop
description: Apply stepwise BVA to one EShop FR (FR-01..FR-24). Use when identifying bounded variables, boundary tables, or BVA test cases per HW02 req §6.
---

# Boundary Value Analysis — EShop HW02

Source of truth: `README.md` (SRS v2.0). API usage: `api_specification.md`. Never invent oracles. Verify every boundary by execution against `http://localhost:3000` (plus `:5173`/`:5174`/Expo for UI).

## Inputs (required before starting)

1. FR identifier and verbatim bound statements from `README.md` (e.g. `price > 0`, `name ≤ 255`, `password ≥ 8`, `phone 10–11 digits starting 0`, `OTP 6 digits`, `lockout ≥3 fails / 30s`, `min_order_amount >=`, `max_uses_per_user >= 1`).
2. Endpoint(s) from `api_specification.md` + variable data types.
3. Declared BVA depth: 2-value (min, min+1 / max, max-1 + just-outside) or 3-value (min-1, min, min+1 / max-1, max, max+1). State choice explicitly per variable.

If no ordered/bounded variable exists (e.g. pure FR-10 transitions), declare so and analyse the closest ordered proxy (sequence length, retry count on final states, `total` around `min_order_amount`), or stop with justification.

## Procedure (execute in order, one step per turn)

### Step 1 — Identify ordered/bounded variables
List only variables with numeric, length, count, or time ordering. EShop reference bounds:

| Variable | Bound | ON (accept) | OFF (reject) |
|---|---|---|---|
| password length (FR-01/FR-03) | ≥8 + complexity | 8 valid-complexity | 7 |
| phone (FR-04) | 10–11 digits, starts `0` | 10, 11 digits starting `0` | 9, 12, not starting `0` |
| product name (FR-15) | 1–255 chars | 1, 255 | 0, 256 |
| price (FR-15/FR-16) | >0 | 1 (and small +1) | 0, negative |
| OTP (FR-03) | exactly 6 digits | 6 digits | 5, 7, non-digit |
| login fails / lockout (FR-02) | ≥3 fails, 30s | 3rd fail locks; 30s boundary | 2nd fail open; 29s locked / 31s open |
| coupon total vs min (FR-09 C3) | `total >= min_order_amount` | min, min+1 | min-1 |
| coupon uses (FR-09 C5) | `used < max_uses_per_user` (1 or 2) | uses = max-1 | uses = max |
| coupon expiry (FR-09 C2) | `now < expired_at` | today+1d, `2099-12-31` | today-1d, `2020-01-01` (`EXPIRED`) |
| coupon fields (FR-17) | value >0, min ≥0, max_uses ≥1 | 1 / 0 / 1 | 0 or negative / negative / 0 |
| quantity (FR-06) | integer ≥1 | 1, 2 | 0, negative, non-integer |

Confirm each bound by quoting `README.md` before generating values.

### Step 2 — Select boundary values
Per bound emit min-1/min/min+1 and max-1/max/max+1 (3-value) or the stated 2-value subset. Use concrete EShop values: price `0/1/2`, name `254/255/256 chars` (generate with `python3 -c 'print("a"*255)'`), phone `9/10/11/12 digits`, OTP lengths, totals `min-1/min/min+1` in ₫ (e.g. SAVE10 min 300000 → 299999/300000/300001), attempts `2/3/4`, lockout `29/30/31s` by stopwatch.

### Step 3 — Derive test cases
One case per boundary value. IDs `<FR>-B<NN>` (e.g. `FR09-B01`). Required columns: ID, bound, boundary value, inputs, steps (curl + UI), expected (quote spec, state `>` vs `>=` explicitly), actual (blank until run), P/F (blank until run).

### Step 4 — Execute and record
Reset state first for usage/lockout/order tests (`node database.js`). Execute via curl; time-based bounds (30s lockout) require stopwatch notes. Record actual + P/F + evidence. Off-by-one (`>` vs `>=`), type coercion, and empty-input handling are the expected bug classes — report only reproduced deviations as `[FR-XX] summary` with FR ref, STR, expected vs actual, severity.

## Output templates (use verbatim)

### BVA table
| Variable | Bound | min-1 | min | min+1 | max-1 | max | max+1 | Depth (2/3-value) |
|---|---|---|---|---|---|---|---|---|

### Test-case table
| ID | Bound | Boundary value | Inputs | Steps (API + UI) | Expected | Actual | P/F |
|---|---|---|---|---|---|---|---|

## Execution aids

```bash
cd backend && node database.js && node server.js  # reset + serve :3000
# boundary string generation
python3 -c 'print("a"*254)' ; python3 -c 'print("a"*255)' ; python3 -c 'print("a"*256)'
# coupon boundary (SAVE10 min 300000)
for T in 299999 300000 300001; do echo "== $T"; curl -s -X POST http://localhost:3000/api/apply-coupon -H 'Content-Type: application/json' -d "{\"code\":\"SAVE10\",\"total_amount\":$T,\"user_id\":1}"; echo; done
# price boundary
curl -s -X POST http://localhost:3000/api/products -H "Authorization: Bearer $ADMIN_TOKEN" -H 'Content-Type: application/json' -d '{"name":"BVA","price":0,"category_id":1}'
```

## Guardrails
- DO: state 2-value vs 3-value per variable; cite `path:line` for implementation notes; one Git commit per step (`test(FR-09): bva cases|execution`).
- DO NOT: test unordered enums as BVA without justification; reuse Domain cases as BVA without new boundary values; fabricate timing or API results.
