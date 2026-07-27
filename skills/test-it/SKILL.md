---
name: test-it
description: >
  Add, fix, or harden tests for the current change, issue, or failing suite.
  Use when the user says "test it", asks for coverage, regression tests, BDD
  evidence mapping, flaky-test stabilization, or CI test gaps. Prefer existing
  runners and patterns; ask before large new frameworks. Pair with fix-it /
  diagnose-bug / check-readiness when tests prove a repair or readiness gate.
argument-hint: "[path|issue|#n|failing-test...]"
---

# Test It

Make the intended behavior **provable** with automated and/or explicit manual evidence. Discover the repo’s real test stack; do not invent a new framework unless asked.

## When to use

- “Add tests”, “cover this”, “test it”, failing CI, flaky specs
- After `fix-it` / `diagnose-bug` / `troubleshoot-app` when verification is missing
- Before `check-readiness` or `merge-it` when BDD scenarios lack evidence

## Workflow

1. **Scope the contract**
   - From issue/PR/BDD scenarios, failing assertion, or user-stated behavior.
   - Prefer existing Given/When/Then or test names over inventing parallel specs.

2. **Discover harness**
   - `package.json` / `Makefile` / CI / `pytest` / `cargo test` / `go test` / etc.
   - Note unit vs integration vs e2e commands and how CI invokes them.

3. **Choose the smallest layer that proves the bug/feature**
   - Pure logic → unit
   - DB/API/auth boundaries → integration
   - User journeys / routing / permissions → e2e
   - External systems without sandbox → document manual evidence + why

4. **Implement or fix tests**
   - Match local patterns (fixtures, factories, MSW, Playwright, etc.).
   - Cover failure mode + success path + one boundary (authz, empty, overflow).
   - Stabilize flakes: freeze time/seed, remove order dependence, await deterministically.

5. **Run and report**
   - Run the narrowest command that validates the change.
   - Map each BDD scenario → test file or manual evidence note.
   - Do not claim green if you did not run (or could not run) the relevant suite.

6. **Follow-up**
   - Ask whether to run `check-readiness`, `pulls refine` (test plan), or `merge-it`.

## Guardrails

- No drive-by refactors while testing unless required for testability (prefer `refactor-it`).
- Don’t delete coverage to “make CI green” without an explicit waiver.
- Redact secrets in fixtures and snapshots.

## Output

```markdown
**Contract**
- ...

**Harness**
- Commands: ...

**Changes**
- Tests added/updated: ...
- Scenario → evidence map: ...

**Results**
- Ran: <command> → <pass/fail>
- Not run: <why>

**Follow-Up Prompt**
Do you want me to run check-readiness / merge-it / continue fixing failures?
```
