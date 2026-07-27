# Test It

Make behavior provable with the repo’s real test stack — **in the right [quality regime](../concepts/11-quality-regimes.md)**, against the [quality trace](../concepts/13-quality-trace.md).

## What it is

Make the intended behavior provable with automated and/or explicit manual evidence. Discover the repo’s real harness; do not invent a new framework unless asked. Prefer DocSlime `TESTING.md`, issue BDD completion scenarios, and existing tests as the oracle. A green suite that measures the wrong thing is still a vibe.

## Why it works

Automated tests are the safety net for CI and refactoring — but *what* to prove comes from lightweight BDD ([Dan North](https://dannorth.net/blog/introducing-bdd/); [GivenWhenThen](https://martinfowler.com/bliki/GivenWhenThen.html)) and DocSlime’s scenario→evidence map, shaped by system type ([Quality regimes](../concepts/11-quality-regimes.md)):

- **Deterministic compute** — invariants, golden/property tests, pipeline correctness.
- **Interactive products** — behavior + critical journeys, a11y, performance budgets.
- **Generative / high-input** — datasets, layered graders; prefer Langfuse (or repo OTel eval stack) for experiment scores.

Prefer the repo’s existing runner over inventing a framework. Cucumber/`.feature` only if already house style.

## When to use it

After naming the regime and locating (or proposing) the BDD/requirement definition — when verification is missing before readiness/merge, or when DocSlime `TESTING.md` shows gaps.

## Do

- Name regime A / B / C (or hybrid); pull scenarios from DocSlime / issue / existing tests
- Map each scenario → evidence (test, eval, manual, doc-only, or explicit out-of-scope)
- Invoke the skill; one write owner; hand off to `check-readiness` / `document-it` / DocSlime fill as needed

## Don't

- Treat unit-test green as proof of chat/agent quality
- Invent parallel scenarios when REQUIREMENTS/TESTING already define them
- Require a new BDD framework for vocabulary alone
- Skip orientation when you’re lost
- Spawn overlapping agents to “go faster”

## Related concepts

[13-quality-trace](../concepts/13-quality-trace.md), [04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md), [11-quality-regimes](../concepts/11-quality-regimes.md), [12-bugs-and-debt](../concepts/12-bugs-and-debt.md)

## Further reading

- [Quality trace (handbook)](../concepts/13-quality-trace.md)
- [Dan North — Introducing BDD](https://dannorth.net/blog/introducing-bdd/)
- [Practical Test Pyramid (Fowler)](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Software Engineering at Google — Testing](https://abseil.io/resources/swe-book/html/ch11.html)
- [Anthropic — Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Martin Fowler — GivenWhenThen](https://martinfowler.com/bliki/GivenWhenThen.html)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`test-it`
