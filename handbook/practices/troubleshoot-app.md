# Troubleshoot App

Live UI / data-plane breakage; reproduce, isolate, evidence.

## What it is

Live UI / data-plane breakage; reproduce, isolate, evidence. This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

Live incidents: reproduce → isolate → evidence before fix (SRE). This is the **interactive product** diagnosis cut ([Quality regimes](../concepts/11-quality-regimes.md) B) — pair with `diagnose-bug` for backend/algo (A) and `agents analyze` / Langfuse for generative (C). Prefer the [quality trace](../concepts/13-quality-trace.md) over a private oracle; broken UX/framing still counts as a [bug](../concepts/12-bugs-and-debt.md).

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

[04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md), [01-this-is-fine-stance](../concepts/01-this-is-fine-stance.md), [11-quality-regimes](../concepts/11-quality-regimes.md), [12-bugs-and-debt](../concepts/12-bugs-and-debt.md), [13-quality-trace](../concepts/13-quality-trace.md)

## Further reading

- [Quality regimes (handbook)](../concepts/11-quality-regimes.md)
- [Google SRE — Managing incidents](https://sre.google/sre-book/managing-incidents/)
- [Google SRE — Four golden signals](https://sre.google/sre-book/monitoring-distributed-systems/)
- [web.dev — Web Vitals](https://web.dev/articles/vitals)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`troubleshoot-app`
