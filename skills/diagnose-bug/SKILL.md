---
name: diagnose-bug
description: Diagnose backend, API, worker, data-pipeline, or algorithm bugs by reproducing with inputs/tests, checking invariants and complexity assumptions, correlating logs/traces/metrics, and inspecting code. Use when a user reports wrong outputs, failing tests, timeouts, races, incorrect algorithms, flaky jobs, bad API responses, or asks why a non-UI system is broken — before implementation. Diagnose, recommend a fix, and ask a yes/no "Do you want me to..." question before changing code or data unless the user already asked to implement. For live web UI / browser-visible product failures, use troubleshoot-app instead.
---

# Diagnose Bug

Use this skill to diagnose backend and algorithmic failures from evidence inward: reproduce with concrete inputs, establish the intended invariant or contract, correlate runtime signals, then inspect code. Keep it globally usable; discover the project’s actual runtimes, test harnesses, and observability instead of assuming a stack.

This skill is for **non-UI** surfaces: APIs, services, CLIs, libraries, workers/queues, ETL/pipelines, compilers/analyzers, and algorithms (correctness, complexity, numeric stability). For live browser/product UI failures, use `troubleshoot-app`.

Use existing specs, types, contracts, property tests, unit/integration tests, and docs as the definition of correct behavior. Prefer refining an existing definition over inventing a parallel one. If none is suitable, propose a concise contract or Given/When/Then scenario and say where it should live.

## Core Rule

Do not jump straight from stack trace to a speculative rewrite. Establish the failing input, the expected contract, and what runtime evidence shows. Treat logs and metrics as evidence, not authority.

Before making code, config, or data changes, end the diagnosis with:

> Do you want me to implement this fix?

The user can answer yes/no. If the user already explicitly says to implement or fix in the same request, proceed after a concise diagnosis.

## Workflow

1. Capture the failing case.
   - Collect the exact input, command, request, fixture, seed, or test name that fails.
   - Record expected vs actual output, exit code, status, error message, and whether it is flaky.
   - Prefer a minimal reproducible example: shrink inputs, freeze seeds/time, isolate the failing test or request.
   - Avoid mutating production data or queues during diagnosis unless the user explicitly asked for a live repair.

2. Identify the intended contract.
   - Search docs, ADRs, OpenAPI/GraphQL schemas, type definitions, comments, issues, PRs, and existing tests for the expected behavior.
   - Name the invariant that appears violated, for example “idempotent retry must not double-charge,” “sort must be stable,” “handler must fail closed on missing tenant,” or “algorithm is O(n log n) on n ≤ 1e5.”
   - For algorithm bugs, state preconditions, postconditions, complexity/space bounds, and edge cases (empty, single element, duplicates, overflow, NaN, concurrency).
   - If an existing definition is close but incomplete, say how to refine it. If none fits, draft a proposed contract or BDD scenario and where it should live.

3. Discover runtime and evidence sources.
   - Read project docs, scripts, package files, CI config, and deployment metadata.
   - Look for: test runners, profilers, debuggers, tracing (OpenTelemetry), APM, structured logs, metrics, queue dashboards, DB read paths, feature flags, and load/bench harnesses.
   - Use only available credentials/tools. Redact secrets and personal data in summaries.
   - If a signal source is unavailable, say exactly which source and why.

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

8. Ask for permission.
   - End with a concrete yes/no prompt:
     - “Do you want me to fix the algorithm and add a regression test?”
     - “Do you want me to patch the handler, add an idempotency key check, and cover it with an integration test?”
     - “Do you want me to fix the race and add a flaky-repro test?”

## Backend And Algo Focus

Prefer these investigation angles:

- **APIs / services:** status codes, validation, authz, idempotency, retries, timeouts, schema drift.
- **Workers / queues:** at-least-once delivery, poison messages, ordering, visibility timeouts, dead-letter.
- **Data / pipelines:** nulls, duplicates, late data, partition skew, migration mismatch.
- **Algorithms:** correctness proofs via invariants, edge cases, complexity vs measured n, numeric stability.
- **Concurrency:** shared mutation, lock ordering, async races, TOCTOU.

Use `references/backend-evidence.md` for discovery patterns and safe reproduction tips.

## Response Shape

Keep the diagnosis concise and evidence-led:

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

Do you want me to implement this fix?
```

If the user already asked to implement, include the diagnosis briefly, implement, validate, and summarize what changed.
