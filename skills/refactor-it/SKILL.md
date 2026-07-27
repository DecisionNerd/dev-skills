---
name: refactor-it
description: >
  Safely refactor code to improve structure, clarity, or testability without
  changing intended behavior. Use when the user says "refactor it", asks to
  clean up a module, extract helpers, reduce duplication, or prepare code for
  a feature — not for product behavior changes (use fix-it) or pure test adds
  (use test-it). Prefer small steps with tests green between steps.
argument-hint: "[path|symbol|module...]"
---

# Refactor It

Improve the code’s shape while **preserving behavior**. If behavior must change, stop and use `fix-it` (or implement the feature explicitly) instead of hiding changes inside a “refactor.”

## When to use

- “Refactor it”, extract function/module, rename for clarity, decompose god-file
- Prep for a feature when structure blocks a clean change
- After `diagnose-bug` when the bug fix is done and structure still hurts

## Workflow

1. **Characterize current behavior**
   - Identify entry points, public API, and existing tests that lock behavior.
   - If tests are missing for the risky surface, propose `test-it` **before** deep refactor (or add characterization tests first).

2. **Define non-goals**
   - No feature work, no dependency upgrades “while we’re here,” no drive-by style wars outside the touched surface.

3. **Plan small steps**
   - Extract, rename, move, invert dependencies — one cohesive idea per step.
   - Keep diffs reviewable; avoid rewriting unrelated files.

4. **Execute with a safety net**
   - After each step, run the narrowest relevant tests.
   - Stop if behavior drifts; revert the step or add a failing characterization test.

5. **Verify**
   - Same public contracts, same user-visible behavior.
   - Note any intentional API renames and required call-site updates (still behavior-preserving).

6. **Follow-up**
   - Offer `test-it` if coverage is still thin, `document-it` if public API moved, `pulls create` / `merge-it` to land.

## Guardrails

- Behavior change → not this skill (`fix-it` / feature work).
- Don’t mix refactor with large feature commits; split PRs when possible (`pulls narrow`).
- Performance “refactors” need a measured baseline or they’re speculative — say so.

## Output

```markdown
**Target**
- ...

**Behavior locked by**
- tests / manual checks: ...

**Steps taken**
1. ...

**Verification**
- Ran: ...

**Follow-Up Prompt**
Do you want me to test-it, document-it, or open a PR?
```
