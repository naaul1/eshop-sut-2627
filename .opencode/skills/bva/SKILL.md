---
name: Boundary Value Analysis for EShop
description: Design-only stepwise BVA for one EShop FR (FR-01..FR-24). Fills the Boundary Value Analysis tables in docs/Report.md; never executes tests or records actual results.
---

# Boundary Value Analysis — design-only (EShop HW02)

## Scope

Produce the BVA **design artifacts** and write them into `docs/Report.md`:

1. Bounded variables
2. 2-value vs 3-value choice
3. Boundary table
4. Test cases
5. Execution notes (left blank)

**Do NOT execute anything.** The student runs all tests and records results. This skill only reads specs/source and edits the report tables.

## Hard rules

- DO NOT start servers, reset the database, call APIs, run `curl`/`node`/`npm`/scripts, open a browser, or use Expo.
- DO NOT fill `Actual result`, `Pass / Fail`, `Evidence`, or `Execution notes` — leave them empty.
- DO NOT fill `AI Gap Analysis` or `Defects Found` — those require human execution/review.
- DO NOT report or file bugs. Source-based suspicions stay in chat as **unverified suspects**.
- DO NOT modify SUT source, seed data, or other features' report sections.

## Inputs

1. FR identifier + verbatim bound statements from `README.md`.
2. Endpoint(s) from `api_specification.md` (for writing the steps only).
3. Declared BVA depth: 2-value or 3-value. Choose per boundary and justify it.
4. Target section in `docs/Report.md`:

| FR | Report section |
| --- | --- |
| FR-04 | §2 Feature A |
| FR-08 | §3 Feature B |
| FR-14 | §4 Feature C |
| FR-20 | §5 Feature D |

For any other FR, locate the heading `## <n>. Feature ... — <FR-ID>: ...`. If missing, ask before creating it.

If no ordered/bounded variable exists, state that in chat and stop, or propose the closest ordered proxy with justification. Never invent a bound.

## Procedure (one step per turn, stop for student review)

### Step 1 — Identify bounded variables

Fill §x.2.1:

| Variable | Boundary / threshold | Value | Spec reference |

List only numeric, length, count, time, or ordered variables. Quote the bound from `README.md`; do not derive it from code.

### Step 2 — Choose 2-value or 3-value BVA

Fill §x.2.2:

| Boundary | Chosen method | Rationale |

- 3-value: `min-1, min, min+1` and `max-1, max, max+1`.
- 2-value: `min, min+1` / `max-1, max` plus the nearest outside point.
- State the choice explicitly for every boundary. Default to 3-value when the cost is low.

### Step 3 — Boundary table

Fill §x.2.3:

| Boundary ID | Variable | min-1 | min | min+1 | max-1 | max | max+1 | Expected result |

- IDs: `<FR>-BD<NN>` (e.g. `FR04-BD01`).
- Use `N/A` for cells that do not apply, but keep the column structure.
- `Expected result` states accept/reject per SRS and shows `>` vs `>=` where it matters.
- Use concrete values (character counts, digit counts, amounts in ₫, seconds, attempt counts).

### Step 4 — Design test cases

Fill §x.2.4:

| Test case ID | Objective | Inputs | Steps (API) | Steps (UI) | Expected result | Actual result | Pass / Fail | Evidence |

- IDs: `<FR>-B<NN>` (e.g. `FR08-B01`).
- One case per boundary value; note the boundary ID in `Objective`.
- `Inputs`: concrete boundary values, including generated strings (e.g. `"a" × 255`) and exact amounts.
- `Steps (API)`: method, path, auth role, body — instructions for the student, not executed here.
- `Steps (UI)`: screen → action → submit, or `N/A`.
- `Expected result`: quote the SRS and state the inclusive/exclusive comparison explicitly.
- Leave `Actual result`, `Pass / Fail`, `Evidence` **empty**.

### Step 5 — Execution notes

Leave §x.2.5 empty. Do not pre-write results, evidence links, or timing observations.

## EShop boundary anchors (verify against `README.md` before use)

| Variable | Bound | ON (accept) | OFF (reject) |
| --- | --- | --- | --- |
| password (FR-01/FR-03) | ≥8 + complexity | 8 valid chars | 7 |
| phone (FR-04) | 10–11 digits, starts `0` | 10, 11 | 9, 12, not starting `0` |
| product name (FR-15) | 1–255 chars | 1, 255 | 0, 256 |
| price (FR-15/FR-16) | >0 | 1 | 0, negative |
| OTP (FR-03) | exactly 6 digits | 6 | 5, 7, non-digit |
| login lockout (FR-02) | ≥3 fails / 30s | 3rd fail locks | 2nd fail open; 30s+ open |
| coupon total (FR-09 C3) | `total >= min_order_amount` | min, min+1 | min-1 |
| coupon uses (FR-09 C5) | `used < max_uses_per_user` | max-1 | max |
| coupon expiry (FR-09 C2) | `now < expired_at` | future date | past date |
| quantity (FR-06) | integer ≥1 | 1 | 0, negative, non-integer |

## Guardrails

- DO: state 2-value vs 3-value per boundary; quote the SRS; keep the report's existing headings/columns; summarize added rows in chat.
- DO NOT: treat unordered enums as BVA without justification; reuse Domain cases as BVA without new boundary values; fabricate values, timing, or results; run tests.
