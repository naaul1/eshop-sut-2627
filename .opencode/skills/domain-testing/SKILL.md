---
name: Domain Testing for EShop
description: Design-only stepwise Domain Testing for one EShop FR (FR-01..FR-24). Fills the Domain Testing tables in docs/Report.md; never executes API/UI tests or records actual results.
---

# Domain Testing — design-only (EShop HW02)

## Scope

Produce the Domain Testing **design artifacts** and write them into `docs/Report.md`:

1. Input variables
2. Equivalence domains
3. ON/OFF points + combination table
4. Test cases
5. Execution notes (left blank)

**Do NOT execute anything.** The student runs all tests and records results. This skill only reads specs/source and edits the report tables.

## Hard rules

- DO NOT start servers, reset the database, call APIs, run `curl`/`node`/`npm`/scripts, open a browser, or use Expo.
- DO NOT fill `Actual result`, `Pass / Fail`, `Evidence`, or `Execution Notes` — leave those cells empty for the student.
- DO NOT fill `AI Gap Analysis` or `Defects Found` — those are completed after human execution/review.
- DO NOT report, confirm, or file bugs. If source inspection suggests a possible deviation, mention it in chat as an **unverified suspect** only, never in the report as a defect.
- DO NOT modify SUT source, seed data, or other features' report sections.

## Inputs

1. FR identifier + verbatim spec excerpt from `README.md`.
2. Endpoint(s) and auth mode from `api_specification.md` (used only to write the API steps).
3. Target section in `docs/Report.md`:

| FR | Report section |
| --- | --- |
| FR-04 | §2 Feature A |
| FR-08 | §3 Feature B |
| FR-14 | §4 Feature C |
| FR-20 | §5 Feature D |

For any other FR, locate the heading `## <n>. Feature ... — <FR-ID>: ...`. If the section is missing, ask the student before creating it.

If the FR spec excerpt is missing or ambiguous, ask. Never invent an oracle.

## Procedure (one step per turn, stop for student review)

### Step 1 — Identify input variables

Read `README.md` and `api_specification.md` (read-only). Fill §x.1.1:

| Variable | Data type | Required / Optional | Valid domain | Invalid domain | Oracle |

Include request-body fields, query/path params, auth/role context, and state preconditions that affect the outcome. In `Oracle`, cite the exact rule (`README.md:line` or FR clause), not code behavior.

### Step 2 — Partition into equivalence domains

Fill §x.1.2 with disjoint domains:

| Variable | Domain ID | Domain description | Valid / Invalid | Expected behavior |

- Use IDs `<FR>-P<n>` for valid and `<FR>-N<n>` for invalid (e.g. `FR04-P1`, `FR04-N1`).
- Cover each variable's valid and invalid classes, plus required/optional and boundary-adjacent classes.
- `Expected behavior` must be derived from the SRS only.

### Step 3 — ON/OFF points + combination table

Fill §x.1.3:

| Combo ID | Variable 1 | Variable 2 | Variable 3 | Covered domains | Expected result |

- ON point = a value inside the domain; OFF point = nearest value outside it.
- Add/remove `Variable n` columns to match the number of variables actually combined.
- Include: one all-valid row, one row per single-invalid condition, and any invalid-combination rows worth covering.
- Number rows `C01..Cn`; list the domain IDs each row covers.

### Step 4 — Design test cases

Fill §x.1.4:

| Test case ID | Objective | Inputs | Steps (API) | Steps (UI) | Expected result | Actual result | Pass / Fail | Evidence |

- IDs: `<FR>-D<NN>` (e.g. `FR08-D01`).
- `Objective`: which domain/condition the case proves.
- `Inputs`: concrete values (emails, phone numbers, amounts, IDs, tokens as roles).
- `Steps (API)`: method, path, headers/auth role, body — written as instructions for the student, not executed here.
- `Steps (UI)`: screen → action → submit, or `N/A` when the FR is API-only.
- `Expected result`: quote the SRS rule and state `>` vs `>=` where relevant.
- Leave `Actual result`, `Pass / Fail`, `Evidence` **empty**.
- One case may cover several related combos; note the combo IDs in `Objective`.

### Step 5 — Execution notes

Leave §x.1.5 empty. Do not pre-write results, evidence links, or pass/fail summaries.

## EShop domain anchors (verify against `README.md` before use)

- FR-02: wrong-login counter +1 per fail; lockout after ≥3 consecutive fails; 30s demo lockout.
- FR-04: phone starts with `0`, 10–11 digits; email immutable; only `name`, `phone`, `shipping_address` updatable.
- FR-08: login required; total computed by backend; client `total_amount` must not be trusted; cart cleared on success.
- FR-09: conditions C1–C5; `percent = total*value/100`; `fixed = value`.
- FR-10: `pending → confirmed → shipping → delivered`; cancel only from `pending`/`confirmed`; `delivered`/`canceled` final.
- FR-14: admin-only; name required, non-empty.
- FR-16: header `name,price,description,imageUrl,category_id`; RFC 4180 quoting; all-or-nothing rollback.
- FR-20: mobile parity; same checkout/cancel rules as web.

## Guardrails

- DO: read `README.md` and `api_specification.md` first; cite oracle refs; keep the report's existing headings/columns; summarize added rows in chat for review.
- DO NOT: run tests, fabricate actual results, fill pass/fail, file GitHub issues, or mark AI gap analysis/defects without student-provided execution evidence.
