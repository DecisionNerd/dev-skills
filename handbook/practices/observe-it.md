# Observe It

Logs, metrics, traces, analytics — visibility without PII storms — **matched to the [quality regime](../concepts/11-quality-regimes.md).**

## What it is

Make production (or staging) *speak* so you are not guessing. Instrumentation shape follows the system: service golden signals, web RUM/vitals, or LLM traces and quality scores.

## Why it works

Google SRE’s four golden signals (latency, traffic, errors, saturation) are the minimum for user-facing *services*. Interactive products also need field **Web Vitals** and UX error paths. Generative systems need hierarchical traces of model/tool/retrieval steps plus **scores** (online evals, user feedback) — traditional APM alone under-describes quality ([Quality regimes](../concepts/11-quality-regimes.md)). OpenTelemetry keeps instrumentation portable; **Langfuse** is this house’s default LLM observability/eval plane on top of that idea. Watch cardinality and PII in every regime.

## When to use it

When prod/staging is silent, quality is drifting, or readiness needs live evidence — after naming the regime.

## Do

- Pick signals for regime A (incl. data freshness/correctness), B (vitals + errors), or C (traces + scores)
- Invoke the skill; follow its safety rules
- Keep one write owner; collect evidence before claiming done
- Hand off to the next practice instead of boiling the ocean

## Don't

- Equate “no 5xx” with “good generations”
- Flood logs with prompts/PII
- Skip orientation when you’re lost
- Spawn overlapping agents to “go faster”

## Related concepts

[04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md), [11-quality-regimes](../concepts/11-quality-regimes.md), [Operate](../flow/03-operate.md)

## Further reading

- [Quality regimes (handbook)](../concepts/11-quality-regimes.md)
- [Google SRE — Four golden signals](https://sre.google/sre-book/monitoring-distributed-systems/)
- [web.dev — Web Vitals](https://web.dev/articles/vitals)
- [OpenTelemetry documentation](https://opentelemetry.io/docs/)
- [Langfuse docs](https://langfuse.com/docs)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`observe-it` · companion `langfuse` when operating LLM traces/evals
