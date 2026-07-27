---
name: idk-now
description: >
  When the user doesn't know what to do next: briefly survey environment, repo,
  docs, and git history; guide them through clarifying questions; then suggest
  next steps using DecisionNerd/dev-skills plus DocSlime, ProductFeeling, Impeccable,
  and any vendored skills in the repo space — aimed at an achievable goal toward
  why the project exists. Use when the user says "idk", "I don't know", "what
  now", "stuck", "lost", or `/idk-now`. Prefer recon when they already know the
  domain and need a tactical next skill only.
argument-hint: "[guide|quick|vision|skills|help] [hint...]"
---

# IDK Now

For when the user **doesn't know what to do next**. Not a silent autopilot: survey → questions → a concrete, achievable next step that serves the **project vision**.

Unlike `recon` (tactical: git scope → skill from this pack), `idk-now` is **directional**: recover purpose, then pick the smallest useful move — which may be a DecisionNerd skill, DocSlime / ProductFeeling / Impeccable, or a **vendored** skill in this repo.

## Commands

| Command | What it does |
| --- | --- |
| *(none)* / `guide` | Full flow: survey → questions → recommend |
| `quick` | Short survey + 1–2 questions + one primary recommend (less chat) |
| `vision` | Focus on recovering/stating why the project exists, then one goal |
| `skills` | Inventory available skills (pack + DocSlime/PF/Impeccable + vendored) without full coaching |
| `help` / `library` | List commands |

Optional free-text after the command is a hint (“shipping feels stuck”, “docs are a mess”).

## Routing

1. No args / “idk” / “what now” → `guide`.
2. First word is a command → that command.
3. Clear “just list skills” → `skills`; “why does this project exist?” → `vision`.

Read-only by default. Do not implement, open PRs, or mutate GitHub until the user accepts a follow-up skill/action.

## Flow (`guide` / default)

Follow [references/flow.md](references/flow.md). Summary:

### 1. Brief survey (read-only, keep it short)

**Environment** — cwd, OS hints if relevant, whether this is a worktree, active branch, dirty/clean.

**Repo** — remote, default branch, package/stack signals, open PR on branch if any.

**Docs / vision signals** — skim in order until you can state a candidate purpose (do not dump files):

- `README.md`, `AGENTS.md`, `CLAUDE.md`, `PRODUCT.md`, `VISION.md`, `docs/` (esp. DocSlime-style PRODUCT / DESIGN / REQUIREMENTS / strategy)
- `.productfeeling/`, `FEELING.md` if present
- Landing/marketing copy or `apps/web` hero only if docs are empty

**Git history** — recent commits/themes (`git log --oneline -15`), ahead/behind, abandoned branches if obvious.

**Skills present** — see [references/skill-universe.md](references/skill-universe.md).

Write a tight **Survey** block (bullet list, not an essay). If vision is unclear, say so explicitly.

### 2. Guided questions

Ask **3–5** questions max, prefer multiple-choice when possible. Cover:

1. **Horizon** — today / this week / this milestone / vague “make it better”
2. **Constraint** — time, risk, “must not break prod”, solo vs team
3. **Energy** — ship / fix / clarify / design / clean / explore
4. **Blocker feel** — unknown next, too many options, broken thing, missing vision, waiting on people
5. Optional: **user type** they care about right now (if product-shaped)

Do not interrogate if answers are already in the user message — skip asked questions.

For `quick`: at most 2 questions, or zero if enough signal.

### 3. Goal → next steps

From survey + answers:

1. State **Project vision** (1–2 sentences) — inferred or confirmed; flag confidence low/med/high.
2. State **Achievable goal** for this session/week — small enough to finish; clearly advances the vision (not busywork).
3. Rank **Next steps** (primary + 2 alternates), each with:
   - exact skill invoke (`issues create …`, `productfeeling audit …`, `$impeccable polish`, `docslime-fill`, `recon issue #n`, …)
   - one-line why it serves the goal/vision
4. End with one **Follow-Up Prompt**: “Want me to run \<primary\>?”

## Skill universe (must consider)

When recommending, search across:

1. **This pack (DecisionNerd/dev-skills)** — agents, check-readiness, diagnose-bug, document-it, fix-it, idk-now, issues, kiss, merge-it, milestones, observe-it, pulls, recon, refactor-it, repos, research-it, ship-it, stage-it, test-it, tidy-up, troubleshoot-app, …
2. **DocSlime** — `docslime-init`, `docslime-fill`, `docslime-adr`, `docslime-kiss`, `docslime-install` (product docs tree)
3. **ProductFeeling** — feeling/emotion-aware product design (`productfeeling` / `/productfeeling`)
4. **Impeccable** — frontend craft (`impeccable` craft/shape/audit/polish/…)
5. **Vendored / local skills in the repo space** — discover under `.agents/skills/`, `.cursor/skills/`, `skills/`, `vendor/**/skills`, `packages/**/skills`, or paths `AGENTS.md` names. Prefer repo-vendored copies when present.

Details and routing heuristics: [references/skill-universe.md](references/skill-universe.md).

Prefer the **smallest** skill that unblocks the achievable goal. Do not recommend a swarm of skills.

## `vision`

Survey docs + README + recent commits only; ask at most two questions if purpose is ambiguous; output vision statement + one achievable goal + one skill. Skip full skill inventory unless needed.

## `skills`

Inventory only: DecisionNerd pack from this repo’s `skills/*/SKILL.md` (or installed list), plus DocSlime / ProductFeeling / Impeccable if installed or vendored, plus any other vendored skills found. Table: name | one-line job | installed?.

## Related skills

- Already know the domain, need tactical next move → `recon`
- Clear issue to plan → `recon issue`
- Emergency agent thrash → `agents slap` (not this skill)
