# Flakiness metrics — tests/checkout (Share C)

Protocol: `docs/Task_Assignment.md` §8. Run 1 unthrottled (cold), runs 2–10 with `THROTTLE_MS=300`.
The protocol was executed with the five findings **left red** (no `test.fail()`), so every run exits 1 by design.
A consistently failing test is not a flake under the §8 definition; the per-test outcomes below are what matters.
Command per run (race spec excluded on purpose so it does not pollute per-test metrics):

```bash
mkdir -p docs/team-log/raw
for i in $(seq 1 10); do
  if [ "$i" -eq 1 ]; then DELAY=0; else DELAY=300; fi
  {
    echo "===== RUN $i / THROTTLE_MS=$DELAY $(date -Is) ====="
    THROTTLE_MS=$DELAY npx playwright test tests/checkout/checkout.spec.js tests/checkout/spec-conformance.spec.js --workers=1 --reporter=list
    echo "EXIT_CODE=$?"
  } 2>&1 | tee -a docs/team-log/raw/checkout-runs.log
done
```

T1 = happy path (order created) · T2 = checkout shows cart line/total · C1–C5 = spec-conformance findings, intentionally left red.
`✘` = real failure (a finding). The suite exits 1 on every run while the SUT keeps these bugs; they are not quarantined.
The log below was regenerated on 2026-10-22 after the findings were left unquarantined.

| Run | THROTTLE_MS | T1 | T2 | C1 | C2 | C3 | C4 | C5 | Passed | Failed | Duration | Notes |
| --: | --: | -- | -- | -- | -- | -- | -- | -- | --: | --: | --: | --- |
| 1 | 0 | ✓ | ✓ | ✘ | ✘ | ✘ | ✘ | ✘ | 2 | 5 | 23.9s | cold start, exit 1 |
| 2 | 300 | ✓ | ✓ | ✘ | ✘ | ✘ | ✘ | ✘ | 2 | 5 | 27.2s | exit 1 |
| 3 | 300 | ✓ | ✓ | ✘ | ✘ | ✘ | ✘ | ✘ | 2 | 5 | 28.0s | exit 1 |
| 4 | 300 | ✓ | ✓ | ✘ | ✘ | ✘ | ✘ | ✘ | 2 | 5 | 29.2s | exit 1 |
| 5 | 300 | ✓ | ✓ | ✘ | ✘ | ✘ | ✘ | ✘ | 2 | 5 | 29.3s | exit 1 |
| 6 | 300 | ✓ | ✓ | ✘ | ✘ | ✘ | ✘ | ✘ | 2 | 5 | 28.8s | exit 1 |
| 7 | 300 | ✓ | ✓ | ✘ | ✘ | ✘ | ✘ | ✘ | 2 | 5 | 28.5s | exit 1 |
| 8 | 300 | ✓ | ✓ | ✘ | ✘ | ✘ | ✘ | ✘ | 2 | 5 | 27.3s | exit 1 |
| 9 | 300 | ✓ | ✓ | ✘ | ✘ | ✘ | ✘ | ✘ | 2 | 5 | 28.0s | exit 1 |
| 10 | 300 | ✓ | ✓ | ✘ | ✘ | ✘ | ✘ | ✘ | 2 | 5 | 26.5s | exit 1 |

**Summary:** no test in this slice flaked across the 10 runs (T1/T2 10/10 ✓; C1–C5 10/10 ✘, deterministic findings).
Under the §8 definition a consistently failing test is not a flake — these five are known SUT defects, not flaky tests.
Exit code is 1 on all 10 runs by design because the findings are left red, not quarantined. Throttling only raised
behaviour-test durations (T1 1.1 s → ≈2.2 s). Log: `docs/team-log/raw/checkout-runs.log`.

---

## Flake investigation — auth bootstrap race (forced experiment, Task_Assignment §8.4)

Because the deterministic slice produced no natural flake, the §8.4 forced race was used.
Scratch file: `tests/checkout/race-experiment.spec.js` (delete before merging).

- Symptom: same code, mixed outcome — `PROFILE_DELAY_MS=210`, `--repeat-each=20`:
  **7/20** repetitions ended at `/login` (alert + redirect), **13/20** stayed at `/checkout`.
- Hypothesis: `Cart.jsx` reads `user` from `AuthContext` synchronously; when `GET /api/users/me` has not resolved yet,
  the `!user` branch fires and the app redirects to `/login` even though the JWT is valid and already in `localStorage`.
- Timing scan (`--repeat-each=10` per value, counting `/login` results):

  | Setting | Result |
  | :-- | :-- |
  | `RACE_THROTTLE_MS=300` (uniform, §8.4 default) | 0/20 login — profile always wins the race |
  | `RACE_THROTTLE_MS=800 / 1500 / 3000` | 0/10 login each |
  | `PROFILE_DELAY_MS=150` | 0/10 login |
  | `PROFILE_DELAY_MS=170 / 190` | 0/10 login |
  | `PROFILE_DELAY_MS=210` | 2/10 login (then 7/20 in the full run) |
  | `PROFILE_DELAY_MS=230` | 9/10 login |
  | `PROFILE_DELAY_MS=250–600` | 10/10 login (deterministic reproduction) |

- Evidence: `docs/team-log/raw/race-experiment.log` (`grep -c 'RACE_RESULT_URL=.*login'` = 7, `...checkout` = 13).
- Root cause: **app-side race** (`AuthContext` profile fetch vs. `Cart.handleCheckout`), not a test bug.
  Uniform throttling alone does not reproduce it because the product fetch and the profile fetch are both delayed equally.
- Action:
  1. Tests keep the `await expect(page.getByRole('link', { name: /Chào/ })).toBeVisible()` guard before clicking checkout (mitigation).
  2. Logged as **FIND-C6** in `docs/team-log/findings-checkout.md`; the deterministic variant (`PROFILE_DELAY_MS>=250`) gives a
     stable repro for the dev report.
  3. `race-experiment.spec.js` is scratch evidence and must be deleted before the PR is merged.
