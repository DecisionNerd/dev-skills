# Continue learning

This handbook is a stance and a map, not the whole library. Prefer [How work flows](flow/index.md) and [Architecture](architecture/index.md) before collecting more tabs.

## Companion skill ecosystems

| Companion | When to go deeper |
| --- | --- |
| [DecisionNerd/dev-skills](https://github.com/DecisionNerd/dev-skills) | The plays this guide maps — install with `npx skills add DecisionNerd/dev-skills` |
| [ProductFeeling](https://github.com/DecisionNerd/ProductFeeling) | How the *product* should feel; customer discovery; TTPs for emotion |
| [Impeccable](https://github.com/pbakaus/impeccable) | Frontend craft: shape, audit, polish |
| [DocSlime](https://www.docslime.dev/) | Product docs tree, ADRs, KISS review |
| Vendored `.agents/skills` / `.cursor/skills` | Repo-local truth — prefer when present |

## Themes to study outside the meme

- [How work flows](flow/index.md) — Discover → Deliver → Operate → Maintain → Retire
- Habit and return design (without compulsion)
- Incident response and blameless postmortems
- Trunk-based development and small batches
- Observability as product empathy
- [Quality regimes](concepts/11-quality-regimes.md) — compute vs product vs generative evidence
- [Bugs & debt](concepts/12-bugs-and-debt.md) — BugSplat lineage; debt types as named interest
- [Quality trace](concepts/13-quality-trace.md) — DocSlime docs + lightweight BDD scenarios
- Agent evals, Langfuse-style tracing, and stop conditions
- Monorepo affected CI and package boundaries

## Primary sources worth keeping

The curated bibliography lives in [Sources & grounding](sources.md) — DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis, and more. Each [practice](practices/index.md) links the subset that justifies that TTP.

Also keep close:

- Norman — emotional design / everyday things
- Kahneman — peaks, ends, and noisy judgment
- Your own `PRODUCT.md` / DocSlime `docs/` / git history — the only vision that counts for *this* repo

When stuck, don’t collect more tabs. Run `idk-now`, reopen [Orientation](orientation/index.md), or return to your [path](paths/index.md).
