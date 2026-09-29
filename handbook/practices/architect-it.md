# Architect It

Make the architecture bet explicit before code hardens around the wrong one.

## What it is

Survey the codebase, frame the bet (boundaries, placement, data flow), propose options with tradeoffs, record the decision as an ADR, and plan the thinnest end-to-end slice. This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

Deep modules hide complexity behind small interfaces (Ousterhout); loosely coupled architecture keeps units independently deployable (DORA). ADRs archive decisions so wheels aren’t reinvented. Working simple systems precede complex ones (Gall’s Law) — so the KISS default wins ties, and the strangler fig pattern beats big-bang rewrites.

## When to use it

When the situation matches the one-liner above and [Orientation](../orientation/index.md) (or [Architecture](../architecture/index.md) / your [project shape](../paths/index.md)) says this is the fire to touch now.

## Do

- Invoke the skill; follow its safety rules
- Keep one write owner; collect evidence before claiming done
- Simplify when that is the right architecture — deleting a layer beats adding one ([KISS](kiss.md))

## Don't

- Skip orientation when you’re lost
- Scaffold the whole system in one PR — land the thinnest working slice
- Treat the practice as done without evidence

## Related concepts

[03-smallest-next-step](../concepts/03-smallest-next-step.md), [12-bugs-and-debt](../concepts/12-bugs-and-debt.md), [08-vision-tied-goals](../concepts/08-vision-tied-goals.md)

## Further reading

- [Ousterhout — A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/book.php)
- [Martin Fowler — Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Architecture Decision Records](https://adr.github.io/)
- [DORA — Loosely coupled architecture](https://dora.dev/capabilities/loosely-coupled-architecture/)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`architect-it`
