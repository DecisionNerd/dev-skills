# Sources & grounding

Authoritative, current references that ground this handbook’s practices (TTPs), skills, and lifecycle/architecture narrative. Prefer primary docs and research over blogs. Update this page when house defaults or industry baselines change.

## Software lifecycle & service operation

| Source | Use for |
| --- | --- |
| [ISO/IEC/IEEE 12207:2017 overview (IEEE)](https://ieeexplore.ieee.org/document/8067765) | Canonical software life cycle processes: requirements, implementation, **operation**, **maintenance**, **disposal**, **transition** |
| [ITIL — IT service management](https://www.axelos.com/certifications/itil-service-management) | Transition into service, operation, continual improvement vocabulary |
| [Microsoft Learn — DevOps / ALM](https://learn.microsoft.com/en-us/devops/plan/what-is-devops) | Plan → Develop → Deliver → Operate beat |
| [How work flows (handbook)](flow/index.md) | House phases: Discover → Deliver → Operate → Maintain → Retire |

## Discovery, fidelity & MVP

| Source | Use for |
| --- | --- |
| [Alberto Savoia — Pretotype It](https://www.pretotyping.org/) | Pretotyping vs prototyping; falsify interest early |
| [Teresa Torres — Continuous Discovery Habits](https://www.producttalk.org/continuous-discovery-habits/) | Dual-track discovery; opportunity framing |
| [Eric Ries — Lean Startup (MVP)](http://theleanstartup.com/principles) | Build–measure–learn; thinnest real product to learn |
| [Discover (handbook)](flow/01-discover.md) | Fidelity ladder + spec altitude |

## Architecture, placement & buy-vs-build

| Source | Use for |
| --- | --- |
| [Martin Fowler — Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html) | Incremental replace / retire patterns |
| [Architecture Decision Records](https://adr.github.io/) | Archive decisions so wheels aren’t reinvented |
| [Architecture (handbook)](architecture/index.md) · [What runs where](architecture/what-runs-where.md) | Shape, language, framework, placement, hosts |
| [Maintain (handbook)](flow/04-maintain.md) | Refactor vs buy/vendor/OSS; LLM-era cost asymmetry |

## Delivery performance & batch size

| Source | Use for |
| --- | --- |
| [DORA — Trunk-based development](https://dora.dev/capabilities/trunk-based-development/) | Short-lived branches, merge frequency, CI as enabler |
| [DORA capabilities overview](https://dora.dev/capabilities/) | Continuous integration/delivery, small batches, test automation |
| [*Accelerate* / State of DevOps research](https://dora.dev/research/) | Deployment frequency, lead time, change fail rate, restore time |

## Version control & GitHub collaboration

| Source | Use for |
| --- | --- |
| [GitHub Docs — Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) | Required checks, reviews, merge gates |
| [GitHub Docs — About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) | PR as review unit |
| [GitHub Docs — Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues) | Tracked work, linking PRs |

## Testing & evidence

| Source | Use for |
| --- | --- |
| [Martin Fowler — Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) | Layered tests, Given/When/Then, avoid ice-cream cone |
| [Software Engineering at Google — Testing](https://abseil.io/resources/swe-book/html/ch11.html) | Narrow tests first; ~80/15/5 guideline; productivity + confidence |
| [Google Testing Blog — Test behaviors, not methods](https://testing.googleblog.com/2014/04/testing-on-toilet-test-behaviors-not.html) | Behavior-focused tests |
| [Cucumber — Given/When/Then](https://cucumber.io/docs/gherkin/reference/) | BDD scenario shape for acceptance evidence |
| [Dan North — Introducing BDD](https://dannorth.net/blog/introducing-bdd/) | Behaviour = acceptance criteria; GWT vocabulary |
| [Dan North — What’s in a Story?](https://dannorth.net/blog/whats-in-a-story/) | Outside-in stories + scenarios as done |
| [Martin Fowler — GivenWhenThen](https://martinfowler.com/bliki/GivenWhenThen.html) | GWT as specification-by-example structure |
| [Quality regimes (handbook)](concepts/11-quality-regimes.md) | Which evidence closes which kind of system |
| [Quality trace (handbook)](concepts/13-quality-trace.md) | DocSlime + lightweight BDD end-to-end |
## Quality by system shape (regimes)

| Source | Use for |
| --- | --- |
| [Google SRE — Service level objectives](https://sre.google/sre-book/service-level-objectives/) | Correctness as an SLI; pick few meaningful objectives |
| [Google SRE Workbook — Implementing SLOs](https://sre.google/workbook/implementing-slos/) | Pipeline freshness, coverage, correctness SLIs |
| [Google SRE Workbook — Data processing](https://sre.google/workbook/data-processing/) | Golden data / correctness for pipelines |
| [Great Expectations docs](https://docs.greatexpectations.io/) | Expectations as executable data-quality tests |
| [web.dev — Web Vitals](https://web.dev/articles/vitals) | LCP / INP / CLS as product UX quality |
| [Google Search — Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) | Field UX thresholds for sites |
| [W3C — WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) | Accessibility as product quality bar |
| [Anthropic — Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Datasets, layered graders, living eval suites |
| [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Measure before adding agent complexity |
| [Langfuse — Observability & evaluation](https://langfuse.com/docs) | House-default LLM traces, datasets, scores (OTel-friendly) |
| [OpenTelemetry docs](https://opentelemetry.io/docs/) | Vendor-neutral traces for services *and* LLM spans |
## Design simplicity & refactoring

| Source | Use for |
| --- | --- |
| [Beck Design Rules](https://martinfowler.com/bliki/BeckDesignRules.html) | Pass tests → reveal intent → no duplication → fewer elements |
| [Martin Fowler — Refactoring](https://martinfowler.com/books/refactoring.html) | Small behavior-preserving steps; tests as safety net |
| [Gall’s Law](https://en.wikipedia.org/wiki/John_Gall_(author)#Gall's_law) | Working complex systems evolve from working simple ones |
| [XP Simple Design](https://deviq.com/practices/simple-design/) | Simplicity as prioritized rules, not vibes |

## Observability & incidents

| Source | Use for |
| --- | --- |
| [Google SRE — Four golden signals](https://sre.google/sre-book/monitoring-distributed-systems/) | Latency, traffic, errors, saturation |
| [OpenTelemetry docs](https://opentelemetry.io/docs/) | Vendor-neutral metrics/logs/traces |
| [Google SRE — Incident management](https://sre.google/sre-book/managing-incidents/) | Roles, communication, blameless learning |
| [Google SRE Workbook — Canarying](https://sre.google/workbook/canarying-releases/) | Progressive exposure before full rollout |

## Shipping & progressive delivery

| Source | Use for |
| --- | --- |
| [Google SRE — Reliable product launches](https://sre.google/sre-book/reliable-product-launches/) | Feature flags, gradual rollout |
| [CNCF / progressive delivery patterns](https://tag-app-delivery.cncf.io/) | Canary, blue-green, staged promote (when applicable) |

## CI/CD security & secrets

| Source | Use for |
| --- | --- |
| [GitHub Docs — OIDC for Actions](https://docs.github.com/en/actions/concepts/security/openid-connect) | Short-lived cloud auth; no long-lived keys |
| [GitHub Blog — Supply chain security](https://github.blog/security/supply-chain-security/securing-the-open-source-supply-chain-across-github/) | Pin actions, trusted publishing, reduce secret sprawl |
| [OWASP DevSecOps — CI/CD training](https://github.com/OWASP/DevSecOpsGuideline) | Secrets hygiene, OIDC, least privilege |
| [SLSA](https://slsa.dev/) | Build provenance levels |
| [Pulumi ESC + GitHub Actions](https://www.pulumi.com/docs/esc/guides/integrate-with/github-actions/) | House default for secrets/config injection |

## Architecture & monorepos

| Source | Use for |
| --- | --- |
| [DORA — Loosely coupled architecture](https://dora.dev/capabilities/loosely-coupled-architecture/) | Independent deployability |
| [Google Eng Practices — Code review](https://google.github.io/eng-practices/review/) | Small CLs, ownership, reviewability |
| [Trunk Based Development](https://trunkbaseddevelopment.com/) | Monorepo + short-lived branches patterns |

## Agents & AI-assisted development

| Source | Use for |
| --- | --- |
| [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | Prompt injection, excessive agency, sensitive info |
| [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) | Govern/map/measure/manage AI risk |
| [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Simple composable patterns; avoid unnecessary swarms |
| [Anthropic — Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Task suites, code vs LLM vs human graders |
| [OpenAI — Agents guide](https://platform.openai.com/docs/guides/agents) | Tool use, handoffs, guardrails (vendor-current) |
| [Langfuse docs](https://langfuse.com/docs) | House default for generative observability + eval workflows |

## Bugs, debt & experience failures

| Source | Use for |
| --- | --- |
| [Everything’s a bug (or an issue)](https://www.bozemanpass.com/everythings-a-bug-or-an-issue/) | Cultural root: BugSplat / bug council — docs, UX, perf, features, defects in one list |
| [Martin Fowler — Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html) | Debt as interest on incomplete alignment / cruft |
| [Martin Fowler — Technical Debt Quadrant](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html) | Prudent/reckless × deliberate/inadvertent |
| [Ward Explains Debt Metaphor](http://wiki.c2.com/?WardExplainsDebtMetaphor) | Primary Cunningham explanation |
| [Jeff Atwood — Bug vs feature request](https://blog.codinghorror.com/thats-not-a-bug-its-a-feature-request/) | User-seat: can’t-do-the-thing is the same pain |
| [Google SRE — Eliminating toil](https://sre.google/sre-book/eliminating-toil/) | Infra/ops experience debt (toil) |
| [Bugs & debt (handbook)](concepts/12-bugs-and-debt.md) | House taxonomy: data, development, framing, feedback, docs, … |

## Product docs & DX (companions)

| Source | Use for |
| --- | --- |
| [Diátaxis](https://diataxis.fr/) | Tutorials / how-to / reference / explanation |
| [Write the Docs](https://www.writethedocs.org/guide/) | Docs as product |
| [DocSlime](https://www.docslime.dev/) | Product docs lifecycle; REQUIREMENTS/TESTING quality trace |
| ProductFeeling / Impeccable handbooks | Feeling north star and UI craft |
| [Quality trace (handbook)](concepts/13-quality-trace.md) | How DocSlime + BDD connect quality and documentation |
## How practices use these sources

Each [practice](practices/index.md) includes a **Why it works** paragraph tied to the mechanisms above and a **Further reading** list (2–4 links). Skills remain the executable playbooks; this page is the shared bibliography.
