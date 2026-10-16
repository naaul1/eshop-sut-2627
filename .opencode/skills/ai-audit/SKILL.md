---
name: AI Audit Logger for HW02
description: Log one AI session to "[AI-02] - FIT@HCMUS - AI Audit Report_Vn.md" per HW02 req §9. Use after any AI-assisted testing step, or to emit the no-AI declaration.
---

# AI Audit Logger — EShop HW02

Satisfies `req.md` §9 (mandatory appendix) and `AGENTS.md` §5. Every AI interaction during HW02 must be traceable. Prefer logging immediately after each session; never batch from memory.

## Inputs
- Tool name (e.g. OpenCode + model ID, ChatGPT, Claude, Gemini, Copilot).
- datetime (`date -u +%Y-%m-%d %H:%M:%S`).
<!-- time is using UTC+7 timezone -->
- Verbatim user prompt.
- Verbatim or faithfully summarised AI output + file/line refs touched.

## Procedure
1. After each AI session, append one entry to `[AI-02] - FIT@HCMUS - AI Audit Report_Vn.md`'s audit table using the template below. One entry per prompt-response pair, not one per feature.
2. Keep prompts student-unique. Copying prompts between students scores 0 per `req.md` §17.
3. If no AI was used at all, do not create log entries; instead place the literal declaration `I do not use any AI help in this exercise.` in the report appendix.
4. Commit log updates with testing commits (`git log --oneline --decorate > git-log.txt` for submission).

## Entry template (append verbatim, fill brackets)

```md
| **Tool: AI Tool (e.g., ChatGPT, Claude, Gemini) Thời gian: 14:32 25/02/2026 Prompt:"Sinh test case cho hàm parsePhoneNumberVN…"** | TC01: parsePhoneNumberVN("0912345678")Kỳ vọng: {prefix:84, number:912345678, valid:true}… | INCOMPLETE | AI bỏ qua định dạng RFC 3966\. ISTQB FL §4.3 Boundary Value Analysis yêu cầu test ranh giới định dạng. | Thêm TC: parsePhoneNumberVN("+84-91-234-5678")Kỳ vọng: {prefix:84, number:912345678, valid:true} |
```


## Execution aid

```bash
date -u +%Y-%m-%dT%H:%M:%SZ
touch assignment-docs/"[AI-02] - FIT@HCMUS - AI Audit Report_Vn.md"
```

## Guardrails
- DO: log promptly; mark corrections explicitly (supports req §10 critique and §6 gap analysis causes: a) poor prompt, b) tool limit, c) feature complexity).
- DO NOT: fabricate datetimes, prompts, or outputs; omit failed or misleading AI turns.
