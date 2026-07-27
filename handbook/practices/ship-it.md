# Ship It

Send it all the way into production and check that it’s healthy.

## What it is

Send it all the way into production and check that it’s healthy — promote to prod, then verify/observe live health. Not “merge a PR.” This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

Continuous delivery keeps software releasable; progressive delivery (canaries, flags) limits blast radius (Google SRE). Promote with evidence and rollback/kill-switch thinking—not hope.

## When to use it

When the situation matches the one-liner above and [Orientation](../orientation/index.md) (or [Deliver](../flow/02-deliver.md) / [Operate](../flow/03-operate.md)) says this is the fire to touch now.

## Do

- Invoke the skill; follow its safety rules
- Keep one write owner; collect evidence before claiming done
- Hand off to the next practice instead of boiling the ocean

## Don't

- Skip orientation when you’re lost
- Spawn overlapping agents to “go faster”
- Treat the practice as done without evidence

## Related concepts

[07-stop-conditions](../concepts/07-stop-conditions.md), [01-this-is-fine-stance](../concepts/01-this-is-fine-stance.md)

## Further reading

- [DORA — Continuous delivery](https://dora.dev/capabilities/continuous-delivery/)
- [Google SRE Workbook — Canarying releases](https://sre.google/workbook/canarying-releases/)
- [Google SRE — Reliable product launches](https://sre.google/sre-book/reliable-product-launches/)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`ship-it`
