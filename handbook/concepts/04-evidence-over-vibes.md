# Evidence over Vibes

Prefer tests, logs, readiness checks, user reports, and git state over “feels done.”

## Definition

Evidence is anything a skeptical teammate could verify. Vibes are unmeasured taste. Both matter in craft; only evidence closes issues and drains fires.

**Which evidence?** That depends on the [quality regime](11-quality-regimes.md): deterministic compute (correctness / contracts), interactive products (journeys / a11y / Web Vitals), or generative systems (traces / evals / feedback). The wrong green check is still a vibe.

**Where does the oracle live?** Prefer the [quality trace](13-quality-trace.md): DocSlime PRODUCT / REQUIREMENTS / TESTING plus lightweight BDD Given/When/Then scenarios mapped to proof. No scenario and no doc contract → you are guessing.

## Why it matters

Agents are fluent at sounding finished. Evidence is how you refuse false peaks — including “all unit tests passed” on a stochastic agent, or “playground looked fine” on a billing pipeline.

## For engineers and agents

- Name the regime first ([Quality regimes](11-quality-regimes.md))
- Walk the quality trace: requirement → BDD scenario → evidence map (`test-it`, `check-readiness`, DocSlime `TESTING.md`)
- Use `observe-it` when prod is silent — golden signals for services; RUM/vitals for web; LLM traces/scores (e.g. Langfuse) for generative — and feed learning back into experience/requirements
- Don’t merge on greenwashed CI you didn’t understand

## Where it shows up

[Craft and Harden](../strategies/04-craft-and-harden.md); practices test / observe / readiness / DocSlime; [Quality regimes](11-quality-regimes.md); [Quality trace](13-quality-trace.md)
