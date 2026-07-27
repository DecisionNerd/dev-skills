---
name: observe-it
description: >
  Add or improve observability — structured logs, metrics, traces, errors,
  analytics, and dashboards — for a feature, bug path, or service. Use when
  the user says "observe it", asks for instrumentation, telemetry, alerting
  hooks, or "how do we know this works in prod". Prefer existing vendors and
  conventions (OTel, Sentry, PostHog, etc.). Ask before emitting PII or new
  paid-volume event storms.
argument-hint: "[path|route|job|feature...]"
---

# Observe It

Make important behavior **visible in production** without drowning in noise or leaking sensitive data.

## When to use

- “Add logging/metrics/tracing”, “observe it”, “how do we detect this failing?”
- After `diagnose-bug` / `troubleshoot-app` when the root cause was invisible
- Before `ship-it` / `stage-it` when release risk needs signals

## Workflow

1. **Name the questions ops/product must answer**
   - e.g. success rate, latency, auth denials, queue lag, funnel drop-off.

2. **Discover existing stack**
   - Read docs, `.env*` names, SDK imports, dashboards, alert rules.
   - Reuse current logger/tracer/metrics/analytics — don’t add a second system.

3. **Instrument the smallest useful surface**
   - Logs: structured fields, correlation/request/job IDs, error cause chains.
   - Metrics: counters/histograms with low-cardinality labels.
   - Traces: spans on external calls and critical critical path.
   - Analytics: product events only when product already uses that bus.
   - Errors: report unexpected failures to the existing error tracker.

4. **Privacy & volume**
   - No secrets, tokens, raw PII, or full payloads in default logs.
   - Avoid high-cardinality labels (user id as metric label).
   - Sample or rate-limit chatty paths.

5. **Verify**
   - Local or staging: emit a signal and confirm it shows where expected (or document why it can’t).
   - Note dashboard/query stubs if the repo keeps them.

6. **Follow-up**
   - Offer `document-it` for runbooks, `test-it` for instrumentation guards, `ship-it` when ready.

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
