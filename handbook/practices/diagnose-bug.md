# Diagnose Bug

Backend / algo / API root-cause with a repair hypothesis.

## What it is

Backend / algo / API root-cause with a repair hypothesis. This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

Debugging without a hypothesis wastes time. This practice is the **deterministic compute** cut of diagnosis ([Quality regimes](../concepts/11-quality-regimes.md) A) — APIs, algos, pipelines — vs `troubleshoot-app` (product UI, B) or `agents analyze` + Langfuse (generative, C). Prefer the [quality trace](../concepts/13-quality-trace.md); silent data lies and missing contracts are still [bugs](../concepts/12-bugs-and-debt.md).

## When to use it

When the situation matches the one-liner above and [Orientation](../orientation/index.md) (or your [project path](../paths/index.md)) says this is the fire to touch now.

## Do

- Invoke the skill; follow its safety rules
- Keep one write owner; collect evidence before claiming done
- Hand off to the next practice instead of boiling the ocean

## Don't

- Skip orientation when you’re lost
- Spawn overlapping agents to “go faster”
- Treat the practice as done without evidence

## Related concepts

[04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md), [11-quality-regimes](../concepts/11-quality-regimes.md), [12-bugs-and-debt](../concepts/12-bugs-and-debt.md), [13-quality-trace](../concepts/13-quality-trace.md)

## Further reading

- [Quality regimes (handbook)](../concepts/11-quality-regimes.md)
- [Google SRE Workbook — Implementing SLOs](https://sre.google/workbook/implementing-slos/) (correctness / pipeline SLIs)
- [Google SRE — Monitoring distributed systems](https://sre.google/sre-book/monitoring-distributed-systems/)
- [OpenTelemetry docs](https://opentelemetry.io/docs/)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`diagnose-bug`
