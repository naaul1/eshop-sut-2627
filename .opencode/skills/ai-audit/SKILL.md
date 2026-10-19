---
name: AI Audit Logger for HW02
description: Record one AI session in the HW02 AI Audit Report (docs/) per req.md §9. Logging only — never executes tests, scripts, or shell commands.
---

# AI Audit Logger — EShop HW02

## Scope

Satisfies `req.md` §9 (mandatory appendix) and `AGENTS.md` §5. Record one row per **AI-generated artifact** (test-case table, skill, script, report section) in:

- Official report: `docs/[AI-02] - FIT@HCMUS - AI Audit Report_Vn.md`
- Short running log: `docs/prompt-log.md`

This skill only **writes documentation**. It does not run tests and does not execute shell commands.

## Hard rules

- DO NOT run `date`, `touch`, `git`, test scripts, or any other shell command.
- DO NOT run or re-run the test cases being logged.
- DO NOT modify `docs/Report.md` or any SUT file.
- DO NOT fabricate tool names, timestamps, prompts, outputs, or verdicts.
- If the timestamp is unknown, use the current date/time available to the agent and mark it `(agent clock)`; the student corrects it.
- Log the **visible prompt and produced artifact**, not hidden reasoning.

## Inputs

| Input | Source |
| --- | --- |
| AI tool + model | Session metadata (e.g. OpenCode + model ID) |
| Date and time (UTC+7) | Current session time; student verifies |
| Verbatim prompt | The student's exact message |
| AI output | Verbatim output or a faithful summary + files/lines touched |
| Verdict | `VALID` / `INVALID` / `INCOMPLETE` |
| Reason | Cite the SRS, ISTQB section, or RFC that justifies the verdict |
| Student correction | What the student accepted, fixed, or rejected |

## Procedure

1. Identify the artifact produced in this session (e.g. "FR-04 Domain Testing tables", "BVA skill v2").
2. Append **one row** to section 3 of `docs/[AI-02] - FIT@HCMUS - AI Audit Report_Vn.md` using the template below. Replace the first empty `Artifact #n` row; do not insert in the middle of filled rows.
3. Mark the verdict:
   - `VALID` — correct and used as-is.
   - `INCOMPLETE` — usable after student correction.
   - `INVALID` — wrong; discarded.
4. In `(5) Bản SV sửa`, record the concrete correction or `Pending student review`. Do not claim review that has not happened.
5. Recalculate section 4 totals (artifact count, VALID/INVALID/INCOMPLETE counts and ratios).
6. Append a short entry to `docs/prompt-log.md` with tool, datetime, prompt, output, and review status.
7. Stop. Do not commit; the student decides when to commit.

## Entry template (report, section 3)

```md
| **Artifact #<n> — <artifact name>**<br><br>**Tool:** <tool + model><br>**Thời gian:** <YYYY-MM-DD HH:MM:SS> (UTC+7)<br>**Prompt (nguyên văn):**<br>"<verbatim prompt>" | <verbatim output or faithful summary><br>Paths: `<file:line>`, ... | <VALID/INVALID/INCOMPLETE> | <reason citing SRS/ISTQB/RFC> | <student correction or "Pending student review"> |
```

## Prompt-log template (append)

```md
## [<YYYY-MM-DD HH:MM:SS>] — <tool + model>
- Prompt: |
  <verbatim prompt>
- Output: |
  <summary + paths touched>
- Human review: pending — student to mark accepted / corrected
```

## Guardrails

- DO: log immediately after the session; keep prompts student-unique (copying prompts scores 0 per `req.md` §17); mark corrections explicitly for the §10 critique and §6 gap analysis.
- DO NOT: batch logs from memory; log failed or misleading turns selectively — include them when they explain a gap; invent evidence.
