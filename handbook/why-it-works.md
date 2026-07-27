# Why it Works

Building software under load fails in predictable ways: teams optimise motion (commits, agent turns, ticket counts) while the **remembered** experience of the product and of the builders themselves goes sour. This handbook treats calm competence as a design requirement for *how you build* — measured through shipped outcomes and recoverable state — while refusing panic automation that manufactures more fire.

Working definitions live in [Concepts](concepts/index.md). Know *why the project exists* first: [Orientation](orientation/index.md).

## The science (borrowed, then aimed at builders)

**Affect and problem-solving.** Positive affect broadens attention; panic narrows it (Norman and related emotional-design work — see ProductFeeling’s lineage). A builder who feels cornered ships brittle patches and spawns overlapping agents. A builder who feels *this is fine* (situated calm, not denial) can pick the smallest next step.

**Peak–end for sessions.** People don’t remember average minutes of a coding session; they remember the worst thrash and how it ended. An agent loop that burns an hour and leaves a dirty worktree is a peak you’ll dread repeating. Ending a session with a drained workflow, a green test, or a written next step is a designed ending.

**Named techniques beat vibes.** Culinary schools don’t treat knife cuts as optional personality. Escoffier-style *named cuts* make excellence teachable. Agent **skills** are the same idea: a `slap` drain, a `recon issue` plan, a `check-readiness` gate — repeatable moves with stop conditions.

**Quality has regimes.** Backend/algo/analytics quality is not website quality is not generative quality. Correctness SLIs and contracts, Core Web Vitals and journeys, and LLM traces/evals (e.g. Langfuse) are different oracles — see [Quality regimes](concepts/11-quality-regimes.md).

**A bug is a bug.** Pain for a user, developer, agent, or operator counts whether it lives in code, data, docs, framing, or feedback loops. Debt is unpaid interest on those bugs — see [Bugs & debt](concepts/12-bugs-and-debt.md) (BugSplat / bug-council lineage).

**Quality has a documentation trace.** DocSlime holds product truth; lightweight BDD scenarios make behavior falsifiable; tests/evals/observation close the loop — see [Quality trace](concepts/13-quality-trace.md). Documentation that lies is a quality failure, not a side quest.

**Agency preserves quality.** Builders (and end users) attach to systems that make them competent and in control. Dark patterns in product *and* in agent orchestration — forced pledges, infinite retries, overlapping writers — manufacture compliance, not craft.

## From cowboy coding to skill-shaped work

**Heroics (always).** Individual brilliance puts out fires and starts new ones. No shared vocabulary.

**Process theater.** Checklists without taste: every PR has a template, nothing has a vision.

**AI thrash (now).** Cheap tokens make it easy to *look* busy. **Mediocre code is almost free; good engineering is still expensive.** Without stop conditions, tool allowlists, and vision-tied goals, agents rearrange the smoke — see [Maintain](flow/04-maintain.md).

**Where this guide sits.** [Lifecycle](flow/index.md) (Discover → Retire) → [Architecture](architecture/index.md) when you need a bet → strategy → practice → evidence. DecisionNerd skills for GitHub/craft/ops/agents; DocSlime for product docs; ProductFeeling for how the product should *feel*; Impeccable for UI craft. The meme on the cover is the stance: sit upright, hold the coffee, name the fire, move once.

## Art and science

Both. Taste chooses the dish (vision). Technique chooses the cut (skill). Measurement tastes as you go (tests, logs, readiness, user memory). Two failure modes:

- **Consumed by process** — perfect CI, empty product promise.
- **Lost in vibes** — “the agent will figure it out,” no evidence.

Grounded clarity, not vibes. That’s the whole point of [This is Fine (stance)](concepts/01-this-is-fine-stance.md).

## Further reading

- [How work flows](flow/index.md) — Discover → Deliver → Operate → Maintain → Retire
- [Architecture](architecture/index.md) — shape, language, framework, placement, hosts
- [Sources & grounding](sources.md) — full bibliography for every practice TTP
- [Quality regimes](concepts/11-quality-regimes.md) — which evidence closes which system shape
- [Bugs & debt](concepts/12-bugs-and-debt.md) — experience bugs and debt types
- [Quality trace](concepts/13-quality-trace.md) — DocSlime + BDD as quality/docs system
- [Emotional Design (Don Norman)](https://jnd.org/emotional-design-people-and-things/)
- [Peak–End Rule (NN/g)](https://www.nngroup.com/articles/peak-end-rule/)
- ProductFeeling handbook — feeling as a product requirement
- This pack’s `idk-now` and `agents slap` skills — vision coaching and emergency drain
