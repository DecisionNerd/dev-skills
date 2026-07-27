# DocSlime

Product docs companion — init, fill, ADR, KISS — the durable half of the [quality trace](../concepts/13-quality-trace.md).

## What it is

Scaffold and fill a product `docs/` tree so vision, requirements, tests, and production learning stay linked. Prefer existing trees; interview before inventing facts (`docslime-fill`). Pair with lightweight BDD scenarios on issues and in `TESTING.md`.

## Why it works

Durable docs reduce rediscovery cost and give agents a shared oracle. DocSlime’s lifecycle (PRODUCT → experience → REQUIREMENTS → ARCHITECTURE/ADRs → TESTING → PUBLISHING → OBSERVABILITY) is the house **quality trace**: promises become testable requirements, Mapped Given/When/Then behavior, then proof and feedback ([Dan North BDD](https://dannorth.net/blog/introducing-bdd/); Diátaxis for page types). Missing or lying docs are [documentation / framing debt](../concepts/12-bugs-and-debt.md) — bugs for developers and agents, not “nice to have.”

## When to use it

When product truth is missing, incoherent, or unfilled templates remain — before large builds, or when `check-readiness` / `fix-it` can’t find a definition of done. Not every repo needs every template; drop what you don’t own.

## Do

- Init only if needed; fill by interviewing; remove LLM guidance as you go
- Keep requirements testable and solution-neutral; map TESTING to GWT / evidence
- One write owner; hand off to `issues` / `test-it` / `document-it` / `observe-it` as appropriate

## Don't

- Invent product facts or keep empty theater docs
- Require Cucumber just because BDD is the vocabulary
- Skip orientation when you’re lost
- Spawn overlapping agents to “go faster”

## Related concepts

[13-quality-trace](../concepts/13-quality-trace.md), [08-vision-tied-goals](../concepts/08-vision-tied-goals.md), [12-bugs-and-debt](../concepts/12-bugs-and-debt.md), [04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md)

## Further reading

- [Quality trace (handbook)](../concepts/13-quality-trace.md)
- [DocSlime](https://www.docslime.dev/)
- [Dan North — Introducing BDD](https://dannorth.net/blog/introducing-bdd/)
- [Diátaxis documentation framework](https://diataxis.fr/)
- [Documenting Architecture Decisions (Nygard)](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`docslime-init` · `docslime-fill` · `docslime-adr` · `docslime-kiss` · `docslime-install` · `document-it` (defaults to these structures/methods)
