---
name: observe-it
description: >
  Add or improve observability — structured logs, metrics, traces, errors,
  analytics, dashboards, and (for generative) LLM traces/scores. Use when the
  user says "observe it", asks for instrumentation, telemetry, alerting hooks,
  Langfuse/evals online, or "how do we know this works in prod". Match signals
  to quality regime A/B/C; prefer existing vendors (OTel, Sentry, PostHog,
  Langfuse house default for LLM). Ask before emitting PII or paid-volume storms.
argument-hint: "[path|route|job|feature...]"
---

# Observe It

Make important behavior **visible in production** without drowning in noise or leaking sensitive data.

**Match signals to the quality regime** (handbook `concepts/11-quality-regimes.md`):

| Regime | Observe… |
| --- | --- |
| **A — Deterministic compute** | Golden signals + (for pipelines) freshness/coverage/correctness |
| **B — Interactive product** | Errors + RUM / Core Web Vitals + critical funnel events |
| **C — Generative / high-input** | Hierarchical LLM/tool/retrieval traces + quality scores / user feedback. House default: **Langfuse** (OTel-friendly) unless the repo already standardized elsewhere |

## When to use

- “Add logging/metrics/tracing”, “observe it”, “how do we detect this failing?”, “add Langfuse/evals online”
- After `diagnose-bug` / `troubleshoot-app` / `agents analyze` when the root cause was invisible
- Before `ship-it` / `stage-it` when release risk needs signals

## When NOT to use

- Fixing a known bug without needing new signals → `fix-it` / `diagnose-bug`
- Proving behavior in CI → `test-it` (obs complements tests; does not replace them)
- Designing the agent itself → `agents design|optimize`

## Workflow

1. **Name the regime and the questions ops/product must answer**
   - e.g. success rate, latency, auth denials, queue lag, LCP regression, eval score drift, funnel drop-off.

2. **Discover existing stack**
   - Read docs, `.env*` names, SDK imports, dashboards, alert rules, Langfuse/OTel exporters.
   - Reuse current logger/tracer/metrics/analytics/eval plane — don’t add a second system.

3. **Instrument the smallest useful surface**
   - Logs: structured fields, correlation/request/job/trace IDs, error cause chains.
   - Metrics: counters/histograms with low-cardinality labels.
   - Traces: spans on external calls and critical path; for C, model + tool + retrieval spans.
   - Scores (C): user feedback, heuristic, or judge scores attached to traces/sessions.
   - Analytics: product events only when product already uses that bus.
   - Errors: report unexpected failures to the existing error tracker.

4. **Privacy & volume**
   - No secrets, tokens, raw PII, or full prompts/payloads in default logs.
   - Avoid high-cardinality labels (user id as metric label).
   - Sample or rate-limit chatty paths.

5. **Verify**
   - Local or staging: emit a signal and confirm it shows where expected (or document why it can’t).
   - Note dashboard/query stubs if the repo keeps them.

6. **Follow-up**
   - Offer `document-it` for runbooks, `test-it` for instrumentation/eval guards, `ship-it` when ready.

## Guardrails

- Observability is not a substitute for tests (`test-it`) or fixes (`fix-it`).
- Don’t “log everything”; prefer decision points and failure boundaries.
- Ask before changing production alert thresholds or creating paid vendor resources.

## Output

```markdown
**Questions we can now answer**
- ...

**Stack**
- ...

**Instrumentation**
- ...

**Privacy / cardinality notes**
- ...

**How to verify**
- ...

**Follow-Up Prompt**
Do you want me to document-it (runbook) or test-it (guards)?
```

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Signals follow quality regimes (`handbook/concepts/11-quality-regimes.md`): SRE golden signals (+ pipeline SLIs) for compute; Web Vitals/RUM for products; LLM traces + scores (Langfuse / OTel) for generative. Watch cardinality and PII.

Handbook card: `handbook/practices/observe-it.md`.
