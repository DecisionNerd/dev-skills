---
name: test-it
description: >
  Add, fix, or harden tests for the current change, issue, or failing suite.
  Use when the user says "test it", asks for coverage, regression tests, BDD
  evidence mapping, flaky-test stabilization, or CI test gaps. Name quality
  regime A/B/C first — wrong evidence is vibes. Prefer existing runners; if
  none exists, ask with options via the question tool. Pair with fix-it /
  diagnose-bug / check-readiness when tests prove a repair or readiness gate.
argument-hint: "[path|issue|#n|failing-test...]"
---

# Test It

Make the intended behavior **provable** with automated and/or explicit manual evidence. Discover the repo's real test stack; do not invent a new framework unless asked.

**Name the quality regime first** (see handbook `concepts/11-quality-regimes.md`):

| Regime | Prove with… |
| --- | --- |
| **A — Deterministic compute** (API/algo/analytics) | Invariants, golden/property tests, data contracts / expectation suites |
| **B — Interactive product** (web/fullstack) | Behavior tests + critical E2E; a11y; performance budgets / Web Vitals where relevant |
| **C — Generative / high-input** | Datasets + layered graders (code → LLM-judge → human); not exact free-text equality. Prefer Langfuse (or repo OTel eval stack) for experiment scores |

Hybrids: gate each surface by its own regime.

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: the acceptance criteria (existing issue AC, BDD scenarios, tests, or contract when they exist; otherwise propose them and say where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on work you did not verify.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and for independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each child's result before consolidating. Use Claude Code's `Workflow` tool only for orchestration across many subagents that truly needs it; it is expensive.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents (Claude Code `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule; Codex `agents.default_subagent_model` or a role's `agents.<name>.config_file`), follow it and do not pass a model. Otherwise: mechanical search or inventory → fast/cheap (Claude Code `haiku`); implementation and evidence gathering → mid (`sonnet`); planning, review, adversarial verification → top (`opus` or `fable`). In Claude Code set it with the `Agent` tool `model` param or agent frontmatter `model:`; in Codex pass a spawn model or set `model` in the role's config file. Where the harness cannot choose (Cursor per-subagent model selection is unverified; assume it cannot), children inherit the parent model; say so in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).

## When to use

- "Add tests", "cover this", "test it", failing CI, flaky specs, eval harness gaps
- After `fix-it` / `diagnose-bug` / `troubleshoot-app` / `agents optimize` when verification is missing
- Before `check-readiness` or `merge-it` when BDD/eval scenarios lack evidence

## When NOT to use

- Behavior change disguised as "refactoring tests" → fix the product with `fix-it`, then cover
- Scaffolding a new test framework "for completeness" without user ask
- Using unit-test green to claim chat/agent quality (regime C needs evals/scores)

## Workflow

Done when: named scenarios map to tests, the narrowest suite passes, nothing claimed green that wasn't run. Fan out per test layer (unit / integration / e2e) when files don't overlap — one subagent per layer (mid tier); single writer per path set.

1. **Name the regime (A / B / C / hybrid)** and the oracle you can actually check.

2. **Scope the contract**
   - From issue/PR/BDD scenarios, failing assertion, eval dataset, or user-stated behavior.
   - Prefer existing Given/When/Then, test names, or dataset items over inventing parallel specs.

3. **Discover harness**
   - `package.json` / `Makefile` / CI / `pytest` / `cargo test` / eval runner / Langfuse datasets / etc.
   - Note unit vs integration vs e2e vs eval commands and how CI invokes them.
   - No test framework found: ask with options via the question tool before adding one.

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

7. **Wrap up**
   - Next: `check-readiness` (run it when in a completion chain); `pulls refine` for a test plan; `observe-it` / Langfuse for online eval coverage; `merge-it` to land.

## Guardrails

- No drive-by refactors while testing unless required for testability (prefer `refactor-it`).
- Don't delete coverage to "make CI green" without an explicit waiver.
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

## Blocked on me

none

## Changed

- ...

## Found

- ...
- Next: check-readiness / merge-it
```

## Grounding

This skill's TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Quality is regime-specific (`handbook/concepts/11-quality-regimes.md`) and traced through DocSlime + lightweight BDD (`13-quality-trace.md`): pyramid + contracts for compute; journeys/a11y/Web Vitals for products; datasets + layered graders for generative. Prefer existing REQUIREMENTS/TESTING/issue scenarios over inventing frameworks.

Handbook card: `handbook/practices/test-it.md`.
