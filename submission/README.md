# HW04 – Automation Testing

## 1. Self-Assessment

| No. | Criteria | Grade | Self-assessed Grade |
|---:|---|---:|---:|
| 1 | Task 1 – Feature A (FR-01) | 25 | 25 |
| 1 | Task 1 – Feature B (FR-07) | 25 | 25 |
| 1 | Task 1 – Feature C (FR-15) | 25 | 25 |
| 2 | Task 2 – Demo video | 15 | 15 |
| 3 | Agent Skills | 10 | 10 |
| | **Total** | **100** | **100** |

## 2. Test Summary

The suite covers three web features: account registration (FR-01), shopping cart
(FR-07), and product management (FR-15). The table below reports results for
**one browser**; the results were the same in each of the three browsers.

| Feature | Test cases designed | Executed per browser | Passed per browser | Failed per browser |
|---|---:|---:|---:|---:|
| FR-01 | 12 | 12 | 7 | 5 |
| FR-07 | 15 | 15 | 4 | 11 |
| FR-15 | 12 | 12 | 7 | 5 |
| **Total per browser** | **39** | **39** | **18** | **21** |

**Cross-browser execution:** Chromium, Firefox, and WebKit; 3 browser runs per
feature and 9 feature/browser runs in total. Across all browsers, 117 test-case
executions were recorded: 54 passed and 63 failed.

**Bugs documented:** 16 entries, documented in `BUG_REPORT.md`

## 4. Repository and Reports

- **Public GitHub repository:** https://github.com/naaul1/eshop-sut-2627/tree/hw04-ngnhan
- **Multi-browser HTML reports:** See the `reports/` directory or the linked
  public repository.
- **Main report:** `reports/MainReport.md` and `reports/MainReport.pdf`
- **AI Audit Report and AI Critique:** See the submission appendices.
- **Git commit log:** `commit-log.txt`
