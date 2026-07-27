---
name: test-it
description: >
  Add, fix, or harden tests for the current change, issue, or failing suite.
  Use when the user says "test it", asks for coverage, regression tests, BDD
  evidence mapping, flaky-test stabilization, or CI test gaps. Name quality
  regime A/B/C first — wrong evidence is vibes. Prefer existing runners;
  ask before large new frameworks. Pair with fix-it / diagnose-bug /
  check-readiness when tests prove a repair or readiness gate.
argument-hint: "[path|issue|#n|failing-test...]"
---

# Test It

Make the intended behavior **provable** with automated and/or explicit manual evidence. Discover the repo’s real test stack; do not invent a new framework unless asked.

**Name the quality regime first** (see handbook `concepts/11-quality-regimes.md`):

| Regime | Prove with… |
| --- | --- |
| **A — Deterministic compute** (API/algo/analytics) | Invariants, golden/property tests, data contracts / expectation suites |
| **B — Interactive product** (web/fullstack) | Behavior tests + critical E2E; a11y; performance budgets / Web Vitals where relevant |
| **C — Generative / high-input** | Datasets + layered graders (code → LLM-judge → human); not exact free-text equality. Prefer Langfuse (or repo OTel eval stack) for experiment scores |

Hybrids: gate each surface by its own regime.

## When to use

- “Add tests”, “cover this”, “test it”, failing CI, flaky specs, eval harness gaps
- After `fix-it` / `diagnose-bug` / `troubleshoot-app` / `agents optimize` when verification is missing
- Before `check-readiness` or `merge-it` when BDD/eval scenarios lack evidence

## When NOT to use

- Behavior change disguised as “refactoring tests” → fix the product with `fix-it`, then cover
- Scaffolding a new test framework “for completeness” without user ask
- Using unit-test green to claim chat/agent quality (regime C needs evals/scores)

## Workflow

1. **Name the regime (A / B / C / hybrid)** and the oracle you can actually check.

2. **Scope the contract**
   - From issue/PR/BDD scenarios, failing assertion, eval dataset, or user-stated behavior.
   - Prefer existing Given/When/Then, test names, or dataset items over inventing parallel specs.

3. **Discover harness**
   - `package.json` / `Makefile` / CI / `pytest` / `cargo test` / eval runner / Langfuse datasets / etc.
   - Note unit vs integration vs e2e vs eval commands and how CI invokes them.

4. **Choose the smallest layer that proves the bug/feature**
   - Regime A: pure logic → unit/property; DB/API → integration; pipeline → golden/correctness checks
   - Regime B: component behavior → integration; user journeys → e2e; a11y/perf budgets as earned
   - Regime C: offline dataset experiment → CI score gate; promote production failures into the suite
   - External systems without sandbox → document manual evidence + why

5. **Implement or fix tests / evals**
   - Match local patterns (fixtures, factories, MSW, Playwright, graders, etc.).
   - Cover failure mode + success path + one boundary (authz, empty, overflow, jailbreak/injection for C).
   - Stabilize flakes: freeze time/seed, remove order dependence, await deterministically; for C, multi-trial stats when needed.

6. **Run and report**
   - Run the narrowest command that validates the change.
   - Map each BDD/eval scenario → test file, score, or manual evidence note.
   - Do not claim green if you did not run (or could not run) the relevant suite.

7. **Follow-up**
   - Ask whether to run `check-readiness`, `pulls refine` (test plan), `observe-it` / Langfuse, or `merge-it`.

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

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Quality is regime-specific (`handbook/concepts/11-quality-regimes.md`) and traced through DocSlime + lightweight BDD (`13-quality-trace.md`): pyramid + contracts for compute; journeys/a11y/Web Vitals for products; datasets + layered graders for generative. Prefer existing REQUIREMENTS/TESTING/issue scenarios over inventing frameworks.

Handbook card: `handbook/practices/test-it.md`.
