---
name: Domain Testing for EShop
description: Apply stepwise Domain Testing to one EShop FR (FR-01..FR-24). Use when designing partitions, ON/OFF points, combination tables, or domain test cases per HW02 req §6.
---

# Domain Testing — EShop HW02

Source of truth for expected behavior: `README.md` (SRS v2.0). API usage: `api_specification.md`. Never invent expected results. Never edit SUT source. Verify every claim by execution.

## Inputs (required before starting)

1. FR identifier and verbatim spec excerpt from `README.md` (e.g. FR-09 C1–C5 + formula; FR-10 state diagram + final-state rules; FR-02 counter +1 / lockout ≥3 fails / 30s).
2. Relevant endpoint(s) from `api_specification.md` + auth mode (none / user JWT / admin JWT).
3. Seed state note: whether `backend/database.js` was re-run to reset deterministic state (mandatory for FR-02 lockout, FR-09 usage counts, FR-10 orders).

If any input is missing, ask for it. Do not proceed on assumed spec.

## Procedure (execute in order, one step per turn)

### Step 1 — Identify variables
List every input variable from spec + API body. For each state: name, data type, required/optional, where it is enforced (backend `backend/server.js:line`, frontend, mobile).

### Step 2 — Partition into equivalence domains
Partition each variable into disjoint valid/invalid domains derived only from `README.md`. Reference EShop domain anchors where applicable:
- FR-09: C1 exists+active, C2 `now < expired_at`, C3 `total >= min_order_amount`, C4 valid JWT, C5 `used < max_uses_per_user`; formula `percent: total*value/100`, `fixed: value`.
- FR-10: states `pending, confirmed, shipping, delivered, canceled`; legal: `pending→confirmed→shipping→delivered`, cancel only from `pending/confirmed`; `delivered/canceled` final; user must not cancel in `shipping`.
- FR-02: counter +1 per fail; lockout after ≥3 consecutive fails, 30s.
- FR-16: header `name,price,description,imageUrl,category_id`, RFC 4180 quoting, all-or-nothing rollback.
- FR-15: name required ≤255, price >0, category required. FR-04: phone starts `0`, 10–11 digits. FR-01/FR-03: password ≥8 with upper+lower+digit+special, confirm must match.

### Step 3 — ON/OFF points + combination table
For each domain boundary select one ON point (inside) and one OFF point (nearest outside). Build a combination table: one all-valid row + one row per single-invalid condition (robustness). Goal: each domain × each condition covered at least once, plus invalid-domain combos. Number rows T1..Tn.

### Step 4 — Derive test cases
Convert each combination row into 1+ test cases with IDs `<FR>-D<NN>` (e.g. `FR09-D01`). Required columns: ID, objective, inputs, steps (API curl + UI path if FR-21..FR-24 relevant), expected (quote `README.md`), actual (leave blank until executed), P/F (leave blank).

### Step 5 — Execute and record
Execute via API first (deterministic), then UI/Expo for GUI aspects. Record actual + Pass/Fail + evidence (curl log, screenshot path, video timestamp). A deviation is a bug only if reproduced against running code. File per `ai-audit` skill and report as `[FR-XX] summary` with FR ref, STR, expected vs actual, severity.

## Output templates (use verbatim)

### Partition table
| Variable | Valid partitions | Invalid partitions | Type / Required | Spec ref |
|---|---|---|---|---|

### Combination table
| Combo | Cond1 | Cond2 | ... | Covers | Test ID |
|---|---|---|---|---|---|

### Test-case table
| ID | Objective | Inputs | Steps (API + UI) | Expected | Actual | P/F |
|---|---|---|---|---|---|---|

## Execution aids

```bash
# reset seed (stateful features only, note in report)
cd backend && node database.js
cd backend && node server.js  # keep running :3000

# login → token
TOKEN=$(curl -s -X POST http://localhost:3000/api/login -H 'Content-Type: application/json' -d '{"email":"test@eshop.com","password":"Test1234!"}' | python3 -c 'import sys,json;print(json.load(sys.stdin)["token"])')
ADMIN_TOKEN=$(curl -s -X POST http://localhost:3000/api/login -H 'Content-Type: application/json' -d '{"email":"admin@eshop.com","password":"Admin123!"}' | python3 -c 'import sys,json;print(json.load(sys.stdin)["token"])')

# example: FR-09 coupon
curl -s -X POST http://localhost:3000/api/apply-coupon -H 'Content-Type: application/json' -d '{"code":"SAVE10","total_amount":300000,"user_id":1}' | python3 -m json.tool
```

## Guardrails
- DO: read `README.md` + `api_specification.md` first; cite code as `path:line`; one Git commit per step (`test(FR-09): domain partitions|cases|execution`).
- DO NOT: issue a single "generate tests and find bugs" prompt; submit unreviewed output; fabricate actual results, screenshots, or issue links; fix SUT to match spec.
- When uncertain, state hypotheses + executed evidence; trust execution over reading.
