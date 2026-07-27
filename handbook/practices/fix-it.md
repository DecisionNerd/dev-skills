# Fix It

Plan and implement a repair from diagnosis — smallest real fix, evidence matched to regime.

## What it is

Turn `troubleshoot-app` / `diagnose-bug` (or clear breakage evidence) into an implementation-ready plan, then execute when approved. Bridge diagnose → plan → `check-readiness` → `merge-it`.

## Why it works

Small, tested repairs beat speculative rewrites (DORA small batches). The repair oracle comes from the [quality trace](../concepts/13-quality-trace.md) (DocSlime + lightweight BDD / contracts); proof shape follows [quality regimes](../concepts/11-quality-regimes.md). A bug remains a bug whether the interest is labeled development, data, craft, or framing debt ([Bugs & debt](../concepts/12-bugs-and-debt.md)).

## When to use it

After a diagnosis (or clear failing contract) when you need a decision-complete plan — not for pure refactors (`refactor-it`) or greenfield without a broken promise.

## Do

- Name regime A/B/C; lock Use Existing / Refine / Create New for the contract
- Prefer smallest fix that restores the scenario; map scenario → evidence
- One write owner; ask before mutating unless already ordered to implement

## Don't

- Hide behavior change inside “refactor”
- Invent a parallel Definition of Done when DocSlime/issue BDD exists
- Spawn overlapping agents to “go faster”

## Related concepts

[03-smallest-next-step](../concepts/03-smallest-next-step.md), [04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md), [11-quality-regimes](../concepts/11-quality-regimes.md), [12-bugs-and-debt](../concepts/12-bugs-and-debt.md), [13-quality-trace](../concepts/13-quality-trace.md)

## Further reading

- [Quality regimes (handbook)](../concepts/11-quality-regimes.md)
- [Quality trace (handbook)](../concepts/13-quality-trace.md)
- [DORA — Working in small batches](https://dora.dev/capabilities/working-in-small-batches/)
- [Martin Fowler — Refactoring](https://martinfowler.com/books/refactoring.html)
- [Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`fix-it`
