# Check Readiness

Is the issue done enough to PR or close — against the [quality trace](../concepts/13-quality-trace.md)?

## What it is

Compare current state to issue requirements, acceptance criteria, and BDD completion scenarios (plus DocSlime REQUIREMENTS/TESTING when present). Report gaps with evidence, not vibes.

## Why it works

Definition of Done prevents “looks finished” merges — and **done** is the scenario→evidence map ([Quality trace](../concepts/13-quality-trace.md)), regime-specific ([Quality regimes](../concepts/11-quality-regimes.md)). DORA high performers keep trunk releasable via automated checks; GitHub protected branches encode the gate; lightweight Given/When/Then ([Dan North](https://dannorth.net/blog/introducing-bdd/)) makes acceptance falsifiable without mandating Cucumber. Unsatisfied scenarios or missing DocSlime contracts are gaps — often [bugs or debt](../concepts/12-bugs-and-debt.md).

## When to use it

Before opening/merging a PR or closing an issue/milestone gate — when scenarios or docs claim done.

## Do

- Extract BDD scenarios and evidence maps from issue/plan/DocSlime
- Verify each scenario’s named proof exists or was run (or justified non-automated)
- One write owner for follow-up fixes; hand off to `test-it` / `document-it` / `docslime-fill` / `merge-it`

## Don't

- Ignore DocSlime TESTING maps when they exist
- Treat missing automation as a gap when manual evidence is appropriate and recorded
- Skip orientation when you’re lost
- Spawn overlapping agents to “go faster”

## Related concepts

[13-quality-trace](../concepts/13-quality-trace.md), [04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md), [03-smallest-next-step](../concepts/03-smallest-next-step.md), [11-quality-regimes](../concepts/11-quality-regimes.md), [12-bugs-and-debt](../concepts/12-bugs-and-debt.md)

## Further reading

- [Quality trace (handbook)](../concepts/13-quality-trace.md)
- [Dan North — Introducing BDD](https://dannorth.net/blog/introducing-bdd/)
- [DORA — Continuous integration](https://dora.dev/capabilities/continuous-integration/)
- [GitHub Docs — Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Martin Fowler — GivenWhenThen](https://martinfowler.com/bliki/GivenWhenThen.html)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`check-readiness`
