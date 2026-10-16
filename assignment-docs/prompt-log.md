# Prompt Log (HW02 req §9)


## [2026-10-16 00:57:56] — OpenCode (Muse Spark 1.3 Free)
- Prompt: |
  now that i choose to proceed with FR4, FR8, and FR14 in pool A, B, and C respectively, please edit @guide.md to be shorter and more concise into those 3 FRs, as well as suggest a way of doing pool D, mobile app, as your interpretation. edit altogether back into @guide.md
- Output: |
  Rewrote guide.md to v2 scoped to FR-04 (Profile), FR-08 (Checkout), FR-14 (Categories) with oracle + suspect refs + partition/ON-OFF/BVA tables, plus Pool D (FR-20) parity re-execution interpretation.
  Paths touched as `path:line`: `guide.md` (full rewrite); refs cited `README.md:62-67`, `README.md:102-108`, `README.md:186-189`, `README.md:233-236`, `backend/server.js:118-135`, `backend/server.js:249-278`, `backend/server.js:297-309`, `frontend-mobile/App.js:287`, `frontend-mobile/App.js:391`, `frontend-mobile/App.js:348`, `frontend-mobile/App.js:684-690`.
- Human review: pending — user to mark accepted / corrected


## [2026-10-16 01:00:17] — OpenCode (Muse Spark 1.3 Free)
- Prompt: |
  regarding the requirements and this repo document, create needed skills in percise language.
- Output: |
  Created 3 reusable skills per req.md §7 and AGENTS.md §4, each with inputs (FR excerpt), stepwise procedure, output templates, and demo script:
  - domain-testing: variables → partitions → ON/OFF + combination T1..Tn → cases FRxx-Dnn → execute via curl/JWT.
  - bva: bounded variables → 2/3-value choice → min-1/min/min+1 tables → cases FRxx-Bnn → execute.
  - ai-audit: per-session log to assignment-docs/prompt-log.md (tool, datetime, prompt, output).
  Paths touched as `path:line`: `.opencode/skills/domain-testing/SKILL.md` (new), `.opencode/skills/bva/SKILL.md` (new), `.opencode/skills/ai-audit/SKILL.md` (new); refs `README.md:1-288`, `api_specification.md:1-214`, `AGENTS.md:1-103`.
- Human review: pending — user to mark accepted / corrected
