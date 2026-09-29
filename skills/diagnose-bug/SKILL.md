---
name: diagnose-bug
description: "Diagnose backend, API, worker, data-pipeline, or algorithm bugs by reproducing with inputs/tests, checking invariants and complexity assumptions, correlating logs/traces/metrics, and inspecting code. Use when a user reports wrong outputs, failing tests, timeouts, races, incorrect algorithms, flaky jobs, bad API responses, or asks why a non-UI system is broken. Diagnose, then implement the smallest fix and a regression test in the same run; stop first only for diagnosis-only requests, live-data/outside-repo changes, or a behavior-changing choice between fixes. For live web UI / browser-visible product failures, use troubleshoot-app; for agent/LLM quality failures, use agents analyze."
---

# Diagnose Bug

Use this skill to diagnose backend and algorithmic failures from evidence inward: reproduce with concrete inputs, establish the intended invariant or contract, correlate runtime signals, then inspect code. Keep it globally usable; discover the project's actual runtimes, test harnesses, and observability instead of assuming a stack.

This skill is for **non-UI** surfaces: APIs, services, CLIs, libraries, workers/queues, ETL/pipelines, compilers/analyzers, and algorithms (correctness, complexity, numeric stability). This is **quality regime A** (deterministic compute).

- Live browser/product UI failures → `troubleshoot-app` (regime B)
- Agent loops / stochastic LLM quality → `agents analyze` (+ Langfuse traces/evals), not this skill as the primary cut (regime C)

Use existing specs, types, contracts, property tests, unit/integration tests, DocSlime/TESTING, and docs as the definition of correct behavior (`handbook/concepts/13-quality-trace.md`). Prefer refining an existing definition over inventing a parallel one. If none fits, propose a concise contract or Given/When/Then scenario and say where it should live. Wrong answers, broken invariants, and silent data lies are bugs — including data/test/observability debt labels when those name the interest (`handbook/concepts/12-bugs-and-debt.md`).

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

## Core Rule

Do not jump straight from stack trace to a speculative rewrite. Establish the failing input, the expected contract, and what runtime evidence shows. Treat logs and metrics as evidence, not authority.

**Done when:** the named contract or test passes, a regression test is added, and no new failures appear in the narrowest suite.

A bug report is a fix request. After diagnosis, implement the smallest fix and add a regression test in the same run — report the diagnosis as a status note before coding. Stop before implementing only when:

- the user asked for diagnosis or explanation only, or said "don't change code";
- the fix requires a live-data or queue mutation, production config change, or a change outside this repository; or
- two materially different fixes are viable and the choice changes product behavior — then ask one structured question with the options (`<option A> / <option B> / stop`).

## Workflow

1. Capture the failing case.
   - Collect the exact input, command, request, fixture, seed, or test name that fails.
   - Record expected vs actual output, exit code, status, error message, and whether it is flaky.
   - Prefer a minimal reproducible example: shrink inputs, freeze seeds/time, isolate the failing test or request.
   - Avoid mutating production data or queues during diagnosis unless the user explicitly asked for a live repair.

2. Identify the intended contract.
   - Search docs, ADRs, OpenAPI/GraphQL schemas, type definitions, comments, issues, PRs, and existing tests for the expected behavior.
   - Name the invariant that appears violated, for example "idempotent retry must not double-charge," "sort must be stable," "handler must fail closed on missing tenant," or "algorithm is O(n log n) on n ≤ 1e5."
   - For algorithm bugs, state preconditions, postconditions, complexity/space bounds, and edge cases (empty, single element, duplicates, overflow, NaN, concurrency).
   - If an existing definition is close but incomplete, say how to refine it. If none fits, draft a proposed contract or BDD scenario and where it should live.

3. Discover runtime and evidence sources.
   - Read project docs, scripts, package files, CI config, and deployment metadata.
   - Look for: test runners, profilers, debuggers, tracing (OpenTelemetry), APM, structured logs, metrics, queue dashboards, DB read paths, feature flags, and load/bench harnesses.
   - Use only available credentials/tools. Redact secrets and personal data in summaries.
   - If a signal source is unavailable, say exactly which source and why.
   - Fan out evidence gathering to parallel read-only subagents (fast tier) when more than one source is available — repro/test-runner, logs/traces, and code-path reads can run concurrently; verify each result before diagnosing.

4. Reproduce and gather signals.
   - Run the smallest failing test or local invocation first when possible.
   - Capture stack traces, assertion diffs, request/response payloads (redacted), job IDs, trace/span IDs, and timing.
   - Compare at least two layers when possible: input → code path → durable state or output; or unit result vs integration vs production log.
   - Check for races, retries without idempotency, cache staleness, clock skew, partial writes, off-by-one, wrong comparator, mutable shared state, incorrect big-O assumptions under real input size, and numeric/precision issues.

5. Inspect code only after evidence.
   - Locate the function, handler, worker, query, or algorithm that should enforce the contract.
   - Find tests that should already cover the case. Missing coverage is part of the recommended fix.
   - Prefer reading the hot path and invariants over broad refactors. For algorithms, verify loop bounds, termination, data-structure choices, and complexity against measured sizes.

6. Diagnose.
   - State the observed symptom and minimal repro.
   - State the intended contract used: existing spec/test, refined definition, or newly proposed scenario.
   - State runtime/test evidence.
   - State the likely root cause and confidence level.
   - Distinguish confirmed facts from inference.

7. Recommend.
   - Recommend the smallest fix that restores the contract while preserving safety boundaries (authz, tenancy, idempotency, data integrity).
   - Include tests (unit/property/integration), logging/metrics if needed, and any migration or backfill as explicit steps.
   - Make verification explicit: the linked or proposed contract/test must pass; for performance bugs, state the target metric and input size.
   - Identify a safe workaround only when appropriate (feature flag, circuit breaker, temporary guard).

8. Fix and prove.
   - If the fix requires a live-data mutation or a change outside this repository, state the proposed action and ask one structured question: `<do it> / revise / stop`. If two materially different fixes exist and the choice changes product behavior, ask the same structured question with the options named.
   - Implement the smallest fix identified in step 7.
   - Add a regression test that would have caught this bug.
   - Run the narrowest test suite that covers the fix; confirm it is green.
   - Re-check the contract from step 2: the named invariant or scenario must now pass.

## Backend And Algo Focus

Prefer these investigation angles:

- **APIs / services:** status codes, validation, authz, idempotency, retries, timeouts, schema drift.
- **Workers / queues:** at-least-once delivery, poison messages, ordering, visibility timeouts, dead-letter.
- **Data / pipelines:** nulls, duplicates, late data, partition skew, migration mismatch.
- **Algorithms:** correctness proofs via invariants, edge cases, complexity vs measured n, numeric stability.
- **Concurrency:** shared mutation, lock ordering, async races, TOCTOU.

Use `references/backend-evidence.md` for discovery patterns and safe reproduction tips.

## Response Shape

Keep the diagnosis concise and evidence-led. Report diagnosis as a status note before coding:

```markdown
I reproduced the bug: ...

Expected contract:
- Source: <spec/test/docs/issue/PR or "No suitable existing definition found">
- Invariant / scenario: <existing/refined/proposed summary>

Evidence:
- Repro / test: ...
- Logs / traces / metrics: ...
- State / output: ...

Diagnosis: ...

Recommended fix: ...

## Blocked on me

<the one genuine question or blocker, else "none">

## Changed

<files changed by the fix, else "nothing">

## Found

Diagnosis: <root cause>. Fix: <what changed>. Verification: <test name(s) and result>.

Next: check-readiness
```

## Grounding

This skill's TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Reproduce → isolate → falsifiable hypothesis before coding (SRE troubleshooting). Regime **A** (`handbook/concepts/11-quality-regimes.md`); `troubleshoot-app` for product UI (B); `agents analyze` + Langfuse for generative (C). Prefer golden signals / data correctness SLIs over random restarts. Close against the quality trace (`13-quality-trace.md`).

Handbook card: `handbook/practices/diagnose-bug.md`.
