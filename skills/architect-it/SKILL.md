---
name: architect-it
description: >
  Design or evolve the architecture of a system, module, or feature — survey the
  codebase, frame the bet (boundaries, placement, data flow), propose options with
  tradeoffs, record the decision as an ADR, and plan the first slice. Use when the
  user says "architect it", asks to design a system or module, review architecture,
  plan boundaries before building, or untangle a structural bet that refactoring
  alone cannot fix. Not for behavior-preserving mechanics (use refactor-it),
  complexity audits (use kiss), or repo-level GitHub admin (use repos).
argument-hint: "[path|feature|question]"
---

# Architect It

Make the architecture bet explicit **before** code hardens around the wrong one. This skill surveys what exists, frames the decision, proposes options with tradeoffs, records the choice, and hands off an implementation plan — it does not scaffold the whole system in one PR.

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: the acceptance criteria (existing issue AC, BDD scenarios, tests, or contract when they exist; otherwise propose them and say where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on work you did not verify.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope, unless the user's request already named that exact action. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and for independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each child's result before consolidating. Use Claude Code's `Workflow` tool only for orchestration across many subagents that truly needs it; it is expensive.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents (Claude Code `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule; Codex `agents.default_subagent_model` or a role's `agents.<name>.config_file`; Cursor a custom subagent's `model:` frontmatter), follow it and do not pass a model. Otherwise: mechanical search or inventory → fast/cheap (Claude Code `haiku`); implementation and evidence gathering → mid (`sonnet`); planning, review, adversarial verification → top (`opus` or `fable`). In Claude Code set it with the `Agent` tool `model` param or agent frontmatter `model:`; in Codex pass a spawn model or set `model` in the role's config file; in Cursor set `model:` (default `inherit`) in `.cursor/agents/*.md`. Where the harness cannot choose (e.g. Cursor's built-in Explore/Bash/Browser subagents), children inherit the parent model; say so in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).

## When to use

- "Architect it", design this module/system, where should this concern live
- A feature needs boundaries decided before tickets are cut
- Architecture review: is the current structure still serving the roadmap?
- A rewrite/migration question ("should we split this out?") — plan the strangler path
- Structure keeps fighting every change — the architecture bet needs revisiting

## When NOT to use

- Mechanical, behavior-preserving moves → `refactor-it`
- "Is this overcomplicated?" audit → `kiss`
- Repo split/combine/monorepo moves on GitHub → `repos`
- Agent/LLM system design → `agents design`
- External library/API research → `research-it` (feeds this skill)
- One bug or feature with clear placement → skip to `issues` / `fix-it`

## Workflow

1. **Frame the decision**
   - Name the bet in one sentence: what must be decided (shape, boundary, placement, data flow, dependency direction) and what breaks if it stays undecided.
   - Name the quality regime (A/B/C per repo guidance) — it sets the proof bar for the plan.

2. **Survey the codebase**
   - Entry points, modules, dependency direction, data flow, deploy units; existing `AGENTS.md`, `docs/`, ADRs, runbooks.
   - Check `research-it` output if a prior investigation exists. Note the seams that already exist — good architecture usually amplifies them.
   - Fan out per-area reads to parallel read-only subagents (fast tier) when the codebase is large; a top-tier adversarial subagent steelmans the option you did not pick before the ADR is written; verify each child's result before consolidating.

3. **Propose options with tradeoffs**
   - 2–3 options max, KISS default first (simplest thing that could work — Gall's Law).
   - For each: what it makes easy, what it makes hard, blast radius, migration cost.
   - For new concerns, answer "what runs where" (browser / edge / API / worker / data / SaaS) before picking hosts.

4. **Decide and record**
   - Recommend one option; state the reversible/irreversible call explicitly.
   - Reversible bets proceed. For irreversible bets (data model, public API, placement), write the ADR draft and ask one structured question: `proceed with <option> / choose <alt> / stop`. If the user's request already named the option, proceed.
   - Write a short ADR (context, decision, consequences) in the repo's ADR location — create `docs/adr/` if none exists.
   - Flag future decision points instead of over-designing them now.

5. **Plan the slice**
   - Tracer-bullet steps: thinnest end-to-end path first, then deepen.
   - Mark which steps are `refactor-it` (behavior-preserving), feature work (`issues`), or new unit scaffolding.
   - Strangler fig over big bang: new grows around old behind a seam; old retires by evidence.

6. **Hand off**
   - Next: `issues create` for the slice tickets, `refactor-it` for structural prep, `research-it` for open technical questions, `kiss` to pressure-test the plan.

## Guardrails

- Do not scaffold the full system in one go; land the thinnest working slice.
- Reversible bets proceed; irreversible ones (data model, public API, placement) need the ADR draft and a structured question before committing.
- If the codebase already answers the question, don't invent a second architecture — follow the existing pattern or propose migrating to it explicitly.
- Simplification is a valid outcome: sometimes the right architecture is deleting a layer (`kiss`), not adding one.
- Done when: ADR written (or confirmed unnecessary), slice plan with a tracer bullet step, open technical questions named for `research-it`.

## Output

```markdown
**Decision**
- <the bet, one sentence>

**Options considered**
1. <option> — <tradeoff>
2. <option> — <tradeoff>

**Chosen**: <option> — <why now>

**Recorded**
- ADR: <path or "none needed">

**Slice plan**
1. ...

**Blocked on me**
(irreversible-bet confirmation if not yet resolved, else "none")

**Changed**
(ADR written to `<path>`, else "nothing")

**Found**
Decision, chosen option, rationale. Next: `issues create <slice tickets>` / `refactor-it <structural prep>` / `research-it <open question>`.
```

## Grounding

This skill's TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Deep modules behind small interfaces (Ousterhout); strangler fig over big-bang rewrite (Fowler); loosely coupled architecture for independent deployability (DORA); ADRs so wheels aren't reinvented; working simple systems precede complex ones (Gall).

Handbook card: `handbook/practices/architect-it.md`.
