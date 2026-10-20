---
name: ai-audit-log
description: 'Record every AI prompt execution in the repository AI Audit Report. Use after completing any prompt that produces an artifact, code, analysis, or other AI output for this coursework repository.'
argument-hint: 'Provide the exact prompt and the resulting AI output to append to the audit table.'
user-invocable: true
---

# AI Audit Log

## Purpose

Keep `reports/[AI-02]-FIT@HCMUS-AI_Audit_Report_Vn.md` synchronized with AI-assisted work in this repository. Create one audit row for each completed prompt that produces an AI artifact or result.

## Procedure

1. Identify the AI tool used. Use `GitHub Copilot` when this workflow is executed in this workspace unless the user specifies another tool.
2. Capture the timestamp at the moment the prompt is completed, using ISO 8601 with the local timezone.
3. Copy the user's prompt verbatim. Do not paraphrase it. Preserve Markdown where practical; escape pipe characters so the table remains valid.
4. Capture the AI output verbatim when it is reasonably short. For long output, record a concise exact-location reference plus a faithful summary, and identify the generated file or response. Never invent output that was not produced.
5. In section `## 3. Bảng Audit — 1 hàng / artifact` of `reports/[AI-02]-FIT@HCMUS-AI_Audit_Report_Vn.md`, locate the last existing data row of the five-column audit table and append exactly one new row immediately below it. Insert the new row before `## 4. Tổng kết Độ chính xác AI`; never insert it directly below the separator when existing rows are present.
6. Put the tool name, timestamp, and prompt in column (1). Put the AI output in column (2). Leave columns (3), (4), and (5) empty as `|||` until the student audits and revises the artifact.
7. Preserve existing rows, headings, totals, signatures, and unrelated formatting. Do not update the summary counts automatically because the verdict is intentionally left blank.
8. If the prompt or output contains sensitive credentials, tokens, or personal data, redact only the sensitive value and clearly mark the redaction; do not copy secrets into the report.

## Row Format

Use this five-column shape:

```markdown
| Công cụ: GitHub Copilot<br>Timestamp: 2026-10-15T23:02:26+07:00<br>Prompt: [nguyên văn prompt] | [output AI hoặc tham chiếu chính xác tới artifact] |  |  |  |
```

## Completion Checks

- The skill file is located at `.agents/skills/ai-audit-log/SKILL.md`.
- The report path and section heading are unchanged.
- Exactly one new row was added for the completed prompt, as the bottom-most data row in the audit table.
- Column (1) includes tool, timestamp, and verbatim prompt.
- Column (2) describes or contains the actual AI output.
- Columns (3)-(5) remain empty.
- Markdown table pipes inside prompt or output are escaped as `\|`.
