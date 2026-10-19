---
name: Boundary Value Analysis for EShop
description: Design-only BVA for one EShop FR (FR-01..FR-24). Fills concise manual-UI tables in docs/report.md; never executes tests or records actual results.
---

# Boundary Value Analysis — design-only (EShop HW02)

## Scope

Fill the BVA tables in `docs/report.md`:

1. §x.2.1 — Bounded variables
2. §x.2.2 — Boundary table
3. §x.2.3 — Test cases

Leave `Actual result` and `Pass / Fail` empty for the student.

**Do NOT execute anything.** The student runs all tests manually on the UI and records results.

## Hard rules

- DO NOT start servers, reset the database, call APIs, run `curl`/`node`/`npm`/scripts, open a browser, or use Expo.
- DO NOT fill `Actual result` or `Pass / Fail`.
- DO NOT fill `AI Gap Analysis` or `Bug Report` — those come after human execution/review.
- DO NOT report or file bugs. Source-based suspicions stay in chat as **unverified suspects**.
- DO NOT modify SUT source, seed data, or other features' report sections.
- DO NOT add columns to the existing tables.

## Inputs

1. FR identifier + verbatim bound statements from `README.md`.
2. Field list from `api_specification.md` (only to know which variables exist).
3. BVA depth: 2-value or 3-value. Choose per boundary, but do not add a column; state the choice in chat.
4. Target section in `docs/report.md`:

| FR | Report section |
| --- | --- |
| FR-04 | §2 Feature A |
| FR-08 | §3 Feature B |
| FR-14 | §4 Feature C |
| FR-20 | §5 Feature D |

For another FR, locate `## <n>. Feature ... — <FR-ID>: ...`. If missing, ask first.

If no ordered/bounded variable exists, say so in chat and stop. Never invent a bound.

## Writing style — concise, manual UI

- Table cells are short values/phrases, **not sentences or prose**.
- `Data type`: only if the report table already has a Data type column, use `string`, `int`, `float`; do not add a new column.
- `Boundary / threshold`: short range/formula, e.g. `10–11 ký tự`, `> 0`, `≥ 8`, `= 6 số`.
- Boundary table cells: representative numbers (`7`, `8`, `9`) for the valid/invalid ranges; `N/A` when not applicable. State the full invalid range in chat, not only the point.
- `Objective`: boundary ID + short boundary, e.g.
  `FR04-BD01 — phone 9/10/11/12 số`, `FR09-BD03 — total = min-1`.
- `Inputs`: one variable per bullet line, format `- phone: "091234567"`; in a table cell use `<br>` between lines. **No JSON/braces.**
- `Expected output`: what the user sees on screen — toast, inline error, or screen state. Do **not** write HTTP status/JSON, e.g.
  - `Toast "Số điện thoại không hợp lệ"; phone giữ nguyên`
  - `Toast "Cập nhật thành công"; phone mới hiển thị`
- `Oracle`: short `FR-xx` reference, not a long quote.

## Procedure (one step per turn, stop for student review)

### Step 1 — Fill §x.2.1

| Variable | Boundary / threshold |

- List only numeric, length, count, time, or ordered variables.
- Keep the threshold short; quote the SRS rule in chat if needed.
- Do not derive bounds from code.

### Step 2 — Fill §x.2.2

| Variable | Boundary ID | min-1 | min | min+1 | max-1 | max | max+1 | Expected output |

- IDs: `<FR>-BD<NN>`.
- Fill concrete values (character counts, digit counts, amounts, seconds, attempts).
- `N/A` for cells that do not apply.
- `Expected output`: visible UI feedback/state only.
- Choose 2-value or 3-value per boundary; state it in chat, not in a new column.

### Step 3 — Fill §x.2.3

| Test case ID | Objective | Inputs | Expected output | Actual result | Pass / Fail |

- IDs: `<FR>-B<NN>`.
- `Objective`: boundary ID + short boundary, e.g. `FR04-BD01 — phone 9 số`.
- `Inputs`: bullet list, each line `- variable: value`, separated by `<br>` in a table cell; no JSON.
- `Expected output`: visible UI feedback/state only.
- Leave `Actual result` and `Pass / Fail` empty.

## EShop boundary anchors (verify against `README.md` before use)

| Variable | Bound | ON (accept) | OFF (reject) |
| --- | --- | --- | --- |
| password (FR-01/FR-03) | ≥8 + complexity | 8 valid chars | `< 8` or missing complexity |
| phone (FR-04) | 10–11 digits, starts `0` | 10, 11 | `≤ 9` or `≥ 12`; not starting `0`; non-digit |
| product name (FR-15) | 1–255 chars | 1, 255 | `0` or `> 255` |
| price (FR-15/FR-16) | >0 | 1 | `≤ 0` |
| OTP (FR-03) | exactly 6 digits | 6 | `≠ 6` or non-digit |
| login lockout (FR-02) | ≥3 fails / 30s | 3rd fail locks | 2nd fail open; `≥ 30s` open |
| coupon total (FR-09 C3) | `total >= min_order_amount` | min, min+1 | `< min` |
| coupon uses (FR-09 C5) | `used < max_uses_per_user` | max-1 | `≥ max` |
| coupon expiry (FR-09 C2) | `now < expired_at` | future date | `≥ expired_at` |
| quantity (FR-06) | integer ≥1 | 1 | `≤ 0` or non-integer |

## Guardrails

- DO: state 2-value vs 3-value in chat; keep the report's existing headings/columns; summarize added rows in chat.
- DO NOT: treat unordered enums as BVA without justification; reuse Domain cases as BVA without new boundary values; write API/HTTP expectations; run tests.
