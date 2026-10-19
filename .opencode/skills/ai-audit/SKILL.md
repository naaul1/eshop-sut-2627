---
name: AI Audit Logger for HW02
description: Append one AI session to docs/prompt-log.md per req.md §9. Logging only — never writes the AI-02 report, runs tests, or shell commands.
---

# AI Audit Logger — EShop HW02

## Scope

Satisfies `req.md` §9 (mandatory appendix) and `AGENTS.md` §5.

This skill writes **only** to:

- `docs/prompt-log.md`

The official report `docs/[AI-02] - FIT@HCMUS - AI Audit Report_Vn.md` is a **short list of important artifacts**, compiled later from `docs/prompt-log.md` when the assignment is finished. Do **not** write to it during normal sessions.

This skill only writes documentation. It does not run tests and does not execute shell commands.

## Hard rules

- DO NOT modify `docs/[AI-02] - FIT@HCMUS - AI Audit Report_Vn.md`.
- DO NOT modify `docs/report.md`, SUT source, or seed data.
- DO NOT run `date`, `touch`, `git`, test scripts, or any other shell command.
- DO NOT run or re-run test cases while logging.
- DO NOT fabricate tool names, timestamps, prompts, outputs, or review status.
- If the exact time is unknown, use the current date available to the agent and mark it `(agent clock)`; the student corrects it.
- Log the **visible prompt and produced artifact**, not hidden reasoning.

## Inputs

| Input | Source |
| --- | --- |
| AI tool + model | Session metadata (e.g. OpenCode + model ID) |
| Date and time (UTC+7) | Current session time; student verifies |
| Verbatim prompt | The student's exact message |
| AI output | Verbatim output or a faithful summary + files/sections touched |
| Human review | `pending` until the student reviews; then `accepted` / `corrected` |

## Procedure

1. Identify the artifact produced in this session (e.g. "Domain Testing tables FR-04/08/14", "BVA skill v2").
2. Append **one entry per prompt-response pair** to the end of `docs/prompt-log.md` using the template below. Do not insert between existing entries.
3. Keep the entry short: what was produced, which files/sections were touched, and whether tests were executed.
4. Set `Human review: pending — student to mark accepted / corrected` unless the student has already reviewed it in this session.
5. Stop. Do not update the AI-02 report, do not commit; the student decides when to compile and commit.

## Entry template (append to `docs/prompt-log.md`)

```md
## [<YYYY-MM-DD HH:MM:SS>] — <tool + model>
- Prompt: |
  <verbatim prompt>
- Output: |
  <summary of the artifact + files/sections touched>
- Human review: pending — student to mark accepted / corrected
```

## End-of-assignment compilation (only when explicitly requested)

When the student asks to finalize the AI Audit Report, read `docs/prompt-log.md` and summarize only the **important artifacts** into section 3 of `docs/[AI-02] - FIT@HCMUS - AI Audit Report_Vn.md`:

- one row per important artifact;
- prompt + tool, output summary, verdict (`VALID` / `INVALID` / `INCOMPLETE`), reason citing SRS/ISTQB, student correction;
- then recalculate section 4 totals.

Never do this compilation automatically during a normal logging session.

## Guardrails

- DO: log immediately after the session; keep prompts student-unique (copying prompts scores 0 per `req.md` §17); mention corrections when they explain a gap for §6/§10.
- DO NOT: batch logs from memory; edit the AI-02 report mid-assignment; invent evidence or review status.
