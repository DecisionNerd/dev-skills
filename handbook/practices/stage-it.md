# Stage It

Land work on staging per repo policy.

## What it is

Land work on staging per repo policy. This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

A staging environment is a progressive-delivery control: validate under production-like conditions before full exposure (SRE launch/canary thinking). Keep it honest—staging that never matches prod is theater.

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

[07-stop-conditions](../concepts/07-stop-conditions.md), [04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md)

## Further reading

- [Google SRE — Reliable product launches](https://sre.google/sre-book/reliable-product-launches/)
- [DORA — Continuous delivery](https://dora.dev/capabilities/continuous-delivery/)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`stage-it`
