# HW02 – Domain Testing Report

> Template: headers only. Replace every `<...>` placeholder and fill the tables.

## 1. General Information

| Field | Value |
| --- | --- |
| Exercise ID | HW02-AI |
| Course | Software Testing |
| Student name | `<Student name>` |
| Student ID | `<Student ID>` |
| Group | `<Group>` |
| Self-assessed grade | `<000-100>` |
| Submission date | `<YYYY-MM-DD>` |
| AI tools used | `<Tool 1>, <Tool 2>, ...` |

## 2. System Under Test (SUT)

### 2.1 SUT Description

### 2.2 Architecture and Components

| Component | Directory | Technology | URL |
| --- | --- | --- | --- |
|  |  |  |  |

### 2.3 Oracle and References

| Reference | Path / Link | Purpose |
| --- | --- | --- |
| SRS | `README.md` |  |
| API specification | `api_specification.md` |  |
| Setup guide | `setup_guide.md` |  |

## 3. Feature Selection

| Pool | Feature | FR ID | Reason for selection |
| --- | --- | --- | --- |
| A |  | FR-04 |  |
| B |  | FR-08 |  |
| C |  | FR-14 |  |
| D |  | FR-20 |  |

### 3.1 Feature Duplication Check

| Member | Pool A | Pool B | Pool C | Pool D |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 4. Test Environment and Setup

### 4.1 Environment

| Item | Version / Value |
| --- | --- |
| Operating system |  |
| Node.js |  |
| Browser |  |
| Mobile runtime |  |
| Backend URL |  |
| Frontend Web URL |  |
| Frontend Admin URL |  |
| Database seed |  |

### 4.2 Test Accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin |  |  |
| User |  |  |

### 4.3 Execution Conventions

### 4.4 Evidence Locations

| Evidence type | Location |
| --- | --- |
| API logs |  |
| Screenshots |  |
| Videos |  |
| GitHub Issues |  |

## 5. Feature A — FR-04: Personal Profile Management (Pool A)

### 5.1 Feature Overview

#### 5.1.1 Specification Summary

#### 5.1.2 Business Rules and Constraints

#### 5.1.3 APIs and UI Screens Under Test

| Layer | Endpoint / Screen | Method / Route |
| --- | --- | --- |
| API |  |  |
| Web UI |  |  |
| Mobile UI |  |  |

### 5.2 Domain Testing

#### 5.2.1 Step 1 — Identify Input Variables

| Variable | Data type | Required / Optional | Valid domain | Invalid domain | Oracle source |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

#### 5.2.2 Step 2 — Partition into Equivalence Domains

| Variable | Domain ID | Domain description | Valid / Invalid | Expected behavior |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

#### 5.2.3 Step 3 — ON / OFF Points and Combination Table

| Combo ID | Variable 1 | Variable 2 | Variable 3 | Variable n | Covered domains | Expected result |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

#### 5.2.4 Step 4 — Domain Test Cases

| Test case ID | Objective | Preconditions | Inputs | Steps (API) | Steps (UI) | Expected result (per SRS) | Actual result | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR04-D01 |  |  |  |  |  |  |  |  |  |

#### 5.2.5 Step 5 — Execution Results and Evidence

| Test case ID | Executed at | Executed by | Result | Evidence link | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### 5.3 Boundary Value Analysis

#### 5.3.1 Step 1 — Identify Bounded Variables

| Variable | Boundary / threshold | Value | Unit | Spec reference |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

#### 5.3.2 Step 2 — Choose 2-Value or 3-Value BVA

| Boundary | Chosen method | Rationale |
| --- | --- | --- |
|  |  |  |

#### 5.3.3 Step 3 — Boundary Table

| Boundary ID | Variable | min-1 | min | min+1 | max-1 | max | max+1 | Expected result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |

#### 5.3.4 Step 4 — Boundary Test Cases

| Test case ID | Objective | Preconditions | Inputs | Steps (API) | Steps (UI) | Expected result (per SRS) | Actual result | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR04-B01 |  |  |  |  |  |  |  |  |  |

#### 5.3.5 Step 5 — Execution Results and Evidence

| Test case ID | Executed at | Executed by | Result | Evidence link | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### 5.4 AI Gap Analysis — Feature A

| Gap ID | Missed test case / bug | Cause class (a/b/c) | Explanation | Corrective action taken |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### 5.5 Defects Found — Feature A

| Bug ID | Title | Severity | Priority | GitHub Issue | Status |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 6. Feature B — FR-08: Checkout (Pool B)

### 6.1 Feature Overview

#### 6.1.1 Specification Summary

#### 6.1.2 Business Rules and Constraints

#### 6.1.3 APIs and UI Screens Under Test

| Layer | Endpoint / Screen | Method / Route |
| --- | --- | --- |
| API |  |  |
| Web UI |  |  |
| Mobile UI |  |  |

### 6.2 Domain Testing

#### 6.2.1 Step 1 — Identify Input Variables

| Variable | Data type | Required / Optional | Valid domain | Invalid domain | Oracle source |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

#### 6.2.2 Step 2 — Partition into Equivalence Domains

| Variable | Domain ID | Domain description | Valid / Invalid | Expected behavior |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

#### 6.2.3 Step 3 — ON / OFF Points and Combination Table

| Combo ID | Variable 1 | Variable 2 | Variable 3 | Variable n | Covered domains | Expected result |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

#### 6.2.4 Step 4 — Domain Test Cases

| Test case ID | Objective | Preconditions | Inputs | Steps (API) | Steps (UI) | Expected result (per SRS) | Actual result | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR08-D01 |  |  |  |  |  |  |  |  |  |

#### 6.2.5 Step 5 — Execution Results and Evidence

| Test case ID | Executed at | Executed by | Result | Evidence link | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### 6.3 Boundary Value Analysis

#### 6.3.1 Step 1 — Identify Bounded Variables

| Variable | Boundary / threshold | Value | Unit | Spec reference |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

#### 6.3.2 Step 2 — Choose 2-Value or 3-Value BVA

| Boundary | Chosen method | Rationale |
| --- | --- | --- |
|  |  |  |

#### 6.3.3 Step 3 — Boundary Table

| Boundary ID | Variable | min-1 | min | min+1 | max-1 | max | max+1 | Expected result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |

#### 6.3.4 Step 4 — Boundary Test Cases

| Test case ID | Objective | Preconditions | Inputs | Steps (API) | Steps (UI) | Expected result (per SRS) | Actual result | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR08-B01 |  |  |  |  |  |  |  |  |  |

#### 6.3.5 Step 5 — Execution Results and Evidence

| Test case ID | Executed at | Executed by | Result | Evidence link | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### 6.4 AI Gap Analysis — Feature B

| Gap ID | Missed test case / bug | Cause class (a/b/c) | Explanation | Corrective action taken |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### 6.5 Defects Found — Feature B

| Bug ID | Title | Severity | Priority | GitHub Issue | Status |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 7. Feature C — FR-14: Category Management (Pool C)

### 7.1 Feature Overview

#### 7.1.1 Specification Summary

#### 7.1.2 Business Rules and Constraints

#### 7.1.3 APIs and UI Screens Under Test

| Layer | Endpoint / Screen | Method / Route |
| --- | --- | --- |
| API |  |  |
| Web UI |  |  |
| Mobile UI |  |  |

### 7.2 Domain Testing

#### 7.2.1 Step 1 — Identify Input Variables

| Variable | Data type | Required / Optional | Valid domain | Invalid domain | Oracle source |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

#### 7.2.2 Step 2 — Partition into Equivalence Domains

| Variable | Domain ID | Domain description | Valid / Invalid | Expected behavior |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

#### 7.2.3 Step 3 — ON / OFF Points and Combination Table

| Combo ID | Variable 1 | Variable 2 | Variable 3 | Variable n | Covered domains | Expected result |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

#### 7.2.4 Step 4 — Domain Test Cases

| Test case ID | Objective | Preconditions | Inputs | Steps (API) | Steps (UI) | Expected result (per SRS) | Actual result | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR14-D01 |  |  |  |  |  |  |  |  |  |

#### 7.2.5 Step 5 — Execution Results and Evidence

| Test case ID | Executed at | Executed by | Result | Evidence link | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### 7.3 Boundary Value Analysis

#### 7.3.1 Step 1 — Identify Bounded Variables

| Variable | Boundary / threshold | Value | Unit | Spec reference |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

#### 7.3.2 Step 2 — Choose 2-Value or 3-Value BVA

| Boundary | Chosen method | Rationale |
| --- | --- | --- |
|  |  |  |

#### 7.3.3 Step 3 — Boundary Table

| Boundary ID | Variable | min-1 | min | min+1 | max-1 | max | max+1 | Expected result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |

#### 7.3.4 Step 4 — Boundary Test Cases

| Test case ID | Objective | Preconditions | Inputs | Steps (API) | Steps (UI) | Expected result (per SRS) | Actual result | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR14-B01 |  |  |  |  |  |  |  |  |  |

#### 7.3.5 Step 5 — Execution Results and Evidence

| Test case ID | Executed at | Executed by | Result | Evidence link | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### 7.4 AI Gap Analysis — Feature C

| Gap ID | Missed test case / bug | Cause class (a/b/c) | Explanation | Corrective action taken |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### 7.5 Defects Found — Feature C

| Bug ID | Title | Severity | Priority | GitHub Issue | Status |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 8. Feature D — FR-20: Mobile Application (Pool D)

### 8.1 Feature Overview

#### 8.1.1 Specification Summary

#### 8.1.2 Business Rules and Constraints

#### 8.1.3 APIs and UI Screens Under Test

| Layer | Endpoint / Screen | Method / Route |
| --- | --- | --- |
| API |  |  |
| Web UI |  |  |
| Mobile UI |  |  |

### 8.2 Domain Testing

#### 8.2.1 Step 1 — Identify Input Variables

| Variable | Data type | Required / Optional | Valid domain | Invalid domain | Oracle source |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

#### 8.2.2 Step 2 — Partition into Equivalence Domains

| Variable | Domain ID | Domain description | Valid / Invalid | Expected behavior |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

#### 8.2.3 Step 3 — ON / OFF Points and Combination Table

| Combo ID | Variable 1 | Variable 2 | Variable 3 | Variable n | Covered domains | Expected result |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

#### 8.2.4 Step 4 — Domain Test Cases

| Test case ID | Objective | Preconditions | Inputs | Steps (API) | Steps (UI) | Expected result (per SRS) | Actual result | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR20-D01 |  |  |  |  |  |  |  |  |  |

#### 8.2.5 Step 5 — Execution Results and Evidence

| Test case ID | Executed at | Executed by | Result | Evidence link | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### 8.3 Boundary Value Analysis

#### 8.3.1 Step 1 — Identify Bounded Variables

| Variable | Boundary / threshold | Value | Unit | Spec reference |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

#### 8.3.2 Step 2 — Choose 2-Value or 3-Value BVA

| Boundary | Chosen method | Rationale |
| --- | --- | --- |
|  |  |  |

#### 8.3.3 Step 3 — Boundary Table

| Boundary ID | Variable | min-1 | min | min+1 | max-1 | max | max+1 | Expected result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |

#### 8.3.4 Step 4 — Boundary Test Cases

| Test case ID | Objective | Preconditions | Inputs | Steps (API) | Steps (UI) | Expected result (per SRS) | Actual result | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR20-B01 |  |  |  |  |  |  |  |  |  |

#### 8.3.5 Step 5 — Execution Results and Evidence

| Test case ID | Executed at | Executed by | Result | Evidence link | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### 8.4 AI Gap Analysis — Feature D

| Gap ID | Missed test case / bug | Cause class (a/b/c) | Explanation | Corrective action taken |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### 8.5 Defects Found — Feature D

| Bug ID | Title | Severity | Priority | GitHub Issue | Status |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 9. Bug Report

| Bug ID | Title | FR | Severity | Status | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### 9.1 Bug Details — `<BUG-01>`

#### 9.1.1 Summary

#### 9.1.2 Environment

#### 9.1.3 Preconditions

#### 9.1.4 Steps to Reproduce

#### 9.1.5 Expected Result

#### 9.1.6 Actual Result

#### 9.1.7 Evidence

#### 9.1.8 Severity and Priority

#### 9.1.9 Related FR and Spec Reference

### 9.2 Bug Details — `<BUG-02>`

#### 9.2.1 Summary

#### 9.2.2 Environment

#### 9.2.3 Preconditions

#### 9.2.4 Steps to Reproduce

#### 9.2.5 Expected Result

#### 9.2.6 Actual Result

#### 9.2.7 Evidence

#### 9.2.8 Severity and Priority

#### 9.2.9 Related FR and Spec Reference

## 10. AI Gap Analysis Summary

### 10.1 Gap Classification

| Cause class | Description | Gap count | Example |
| --- | --- | --- | --- |
| a | Poor prompt / input |  |  |
| b | AI tool limitation |  |  |
| c | Inherent feature complexity |  |  |

### 10.2 Missed Test Cases

| Gap ID | Feature | Missed case / bug | Cause class | Why the AI missed it |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### 10.3 Lessons Learned

## 11. AI Critique

### 11.1 Critique

### 11.2 Word Count

| Metric | Value |
| --- | --- |
| Word count | `<200-300>` |

## 12. Agent Skills

### 12.1 Skill Inventory

| Skill | Purpose | Location | Demonstration video |
| --- | --- | --- | --- |
| domain-testing |  |  |  |
| bva |  |  |  |
| ai-audit |  |  |  |

### 12.2 End-to-End Demonstration

| Video | Feature demonstrated | YouTube link |
| --- | --- | --- |
|  |  |  |

## 13. AI Audit Report

### 13.1 Declaration

### 13.2 Interaction Log

| No. | AI tool | Date and time | Prompt | Output | Human review |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### 13.3 Audit Reference

## 14. Git Commit Log

| No. | Commit hash | Date | Message | Step / Feature |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### 14.1 Log File

## 15. Test Summary Report

### 15.1 Test Case Metrics

| Feature | Designed | Executed | Passed | Failed | Not yet executed |
| --- | --- | --- | --- | --- | --- |
| FR-04 |  |  |  |  |  |
| FR-08 |  |  |  |  |  |
| FR-14 |  |  |  |  |  |
| FR-20 |  |  |  |  |  |
| Total |  |  |  |  |  |

### 15.2 Bug Metrics

| Severity | Open | Fixed | Total |
| --- | --- | --- | --- |
| Critical |  |  |  |
| High |  |  |  |
| Medium |  |  |  |
| Low |  |  |  |
| Total |  |  |  |

### 15.3 Coverage Summary

### 15.4 Residual Risks and Limitations

## 16. Conclusion

## Appendix A — Abbreviations

| Abbreviation | Meaning |
| --- | --- |
|  |  |

## Appendix B — Evidence Index

| Evidence ID | Description | Link / Path |
| --- | --- | --- |
|  |  |  |

## Appendix C — References

| No. | Reference |
| --- | --- |
|  |  |
