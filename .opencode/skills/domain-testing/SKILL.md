---
name: Domain Testing for EShop
description: Design-only Domain Testing for one EShop FR (FR-01..FR-24). Fills concise manual-UI tables in docs/report.md; never executes tests or records actual results.
---

# Domain Testing — design-only (EShop HW02)

## Scope

Fill the Domain Testing tables in `docs/report.md`:

1. §x.1.1 — Input/output variables
2. §x.1.2 — Equivalence domains
3. §x.1.3 — Test cases

Leave `Actual output` and `Pass / Fail` empty for the student.

**Do NOT execute anything.** The student runs all tests manually on the UI and records results.

## Hard rules

- DO NOT start servers, reset the database, call APIs, run `curl`/`node`/`npm`/scripts, open a browser, or use Expo.
- DO NOT fill `Actual output` or `Pass / Fail`.
- DO NOT fill `AI Gap Analysis` or `Bug Report` — those come after human execution/review.
- DO NOT report, confirm, or file bugs. Source-based suspicions stay in chat as **unverified suspects**.
- DO NOT modify SUT source, seed data, or other features' report sections.
- DO NOT add columns to the existing tables.

## Inputs

1. FR identifier + verbatim spec excerpt from `README.md`.
2. Field list from `api_specification.md` (only to know which variables exist, not to write API calls).
3. Target section in `docs/report.md`:

| FR | Report section |
| --- | --- |
| FR-04 | §2 Feature A |
| FR-08 | §3 Feature B |
| FR-14 | §4 Feature C |
| FR-20 | §5 Feature D |

For another FR, locate `## <n>. Feature ... — <FR-ID>: ...`. If missing, ask first.

## Writing style — concise, manual UI

- Table cells are short values/phrases, **not sentences or prose**.
- `Data type`: write the actual type in English — `string`, `int`, `float`, `boolean`, `array`, `JWT string`, etc. Do not write "Chuỗi", "Số".
- `Required / Optional`: write only one word.
  - `Required` = missing/empty means the FR cannot be performed, or the record becomes invalid. In FR-04, `name` and `phone` are **Required**.
  - `Optional` = missing is okay ("không có cũng không sao"); it does **not** mean the value can be arbitrary. If provided, all constraints still apply.
- `Valid domain` / `Invalid domain`: use numbers, symbols, ranges, and simple words:
  `0`, `10–11`, `bắt đầu 0`, `trống`, `sai định dạng`, `ký tự`, `độ dài`, `N/A`.
  - Invalid domains must be written as **sets/ranges**, not only the exact boundary values.
  - Example for a 10–11 digit phone: invalid = `độ dài ≤ 9 hoặc ≥ 12`, not just `9` and `12`.
- `Domain description`: short formula/description, e.g.
  `10 ≤ độ dài phone ≤ 11, bắt đầu 0`; invalid: `độ dài ≤ 9 hoặc ≥ 12`, `ký tự ∉ [0-9]`, `name trống`.
- `Objective`: state which domain is tested, short like the domain description, e.g.
  `FR04-N3 — phone ≤ 9 số`, `FR08-N4 — total_amount < thực tế`.
- `Inputs`: one variable per bullet line, **no JSON, no `{...}`**, e.g.
  `- name: "Nguyễn Văn A"<br>- phone: "0786456884"`.
  In a Markdown table cell, separate lines with `<br>` and start each line with `- `.
- `Expected output`: what the user sees on screen — toast, inline error, or screen state. Do **not** write HTTP status/JSON, e.g.
  - `Toast "Cập nhật thành công"; phone mới hiển thị`
  - `Toast "Số điện thoại không hợp lệ"; phone giữ nguyên`
- `Oracle`: short `FR-xx` reference, not a long quote.

## Procedure (one step per turn, stop for student review)

### Step 1 — Fill §x.1.1

| Variable | Data type | Required / Optional | Valid domain | Invalid domain | Oracle |

- Include only variables that affect the FR result (fields, auth/role, state).
- `Data type`: actual English type (`string`, `int`, `float`, `boolean`, `array`, `JWT string`, ...).
- Keep each cell short; no explanations.
- `Required` if missing/empty blocks the FR or invalidates the record; otherwise `Optional`.
- If the SRS sets no constraint for a variable, write `N/A` in the invalid cell.

### Step 2 — Fill §x.1.2

| Variable | Domain ID | Domain description | Valid / Invalid |

- IDs: `<FR>-P<n>` valid, `<FR>-N<n>` invalid (e.g. `FR04-P3`, `FR04-N3`).
- One row per domain; description short and formula-like.
- Invalid domains must be written as **sets/ranges**: `độ dài ≤ 9 hoặc ≥ 12`, `ký tự ∉ [0-9]`, `trống`; not only `9` and `12`.
- `Valid / Invalid` column contains only `Valid` or `Invalid`.

### Step 3 — Fill §x.1.3

| Test case ID | Objective | Inputs | Expected output | Actual output | Pass / Fail |

- IDs: `<FR>-D<NN>`.
- `Objective`: domain ID + short domain, e.g. `FR04-P3 — phone 10–11 số`.
- `Inputs`: bullet list, one variable per line, format `- name: "Nguyễn Văn A"<br>- phone: "0786456884"`; no JSON/braces.
- `Expected output`: visible UI feedback/state only.
- Leave `Actual output` and `Pass / Fail` empty.

## EShop anchors (verify against `README.md` before use)

- FR-02: wrong-login +1; lockout after ≥3 fails; 30s.
- FR-04: `name`, `phone` **Required**; `shipping_address` Optional; phone starts `0`, 10–11 digits (invalid: `độ dài ≤ 9 hoặc ≥ 12`, or not starting `0`); email and `role` immutable.
- FR-08: login required; total computed by backend; client `total_amount` ignored; cart cleared on success.
- FR-09: C1–C5; `percent = total*value/100`; `fixed = value`.
- FR-10: `pending → confirmed → shipping → delivered`; cancel only from `pending`/`confirmed`; `delivered`/`canceled` final.
- FR-14: admin-only; name required, non-empty.
- FR-16: header `name,price,description,imageUrl,category_id`; RFC 4180; all-or-nothing rollback.
- FR-20: mobile parity; same checkout/cancel rules as web.

## Guardrails

- DO: read specs first; keep the report's existing headings/columns; summarize added rows in chat.
- DO NOT: run tests, write API/HTTP expectations, fabricate results, fill pass/fail, or file issues.
