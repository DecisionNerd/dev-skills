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

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: the acceptance criteria (existing issue AC, BDD scenarios, tests, or contract when they exist; otherwise propose them and say where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on work you did not verify.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope, unless the user's request already named that exact action. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and for independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each child's result before consolidating. Use Claude Code's `Workflow` tool only for orchestration across many subagents that truly needs it; it is expensive.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents (Claude Code `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule; Codex `agents.default_subagent_model` or a role's `agents.<name>.config_file`; Cursor a custom subagent's `model:` frontmatter), follow it and do not pass a model. Otherwise: mechanical search or inventory → fast/cheap (Claude Code `haiku`); implementation and evidence gathering → mid (`sonnet`); planning, review, adversarial verification → top (`opus` or `fable`). In Claude Code set it with the `Agent` tool `model` param or agent frontmatter `model:`; in Codex pass a spawn model or set `model` in the role's config file; in Cursor set `model:` (default `inherit`) in `.cursor/agents/*.md`. Where the harness cannot choose, children inherit the parent model or the harness picks one (Cursor's built-in Explore/Bash/Browser subagents pick per subtask); say which in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).

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

Write a tight **Survey** block (bullet list, not an essay). If vision is unclear, say so explicitly. For a large repo (many packages, deep docs), fan out environment/repo/docs/git reads to parallel read-only subagents (fast tier); cap total file reads per the survey budget in [references/flow.md](references/flow.md).

### 2. Guided questions

Ask **3–5** questions max, prefer multiple-choice when possible. Use the harness's structured question tool (Claude Code: `AskUserQuestion`) with the options listed below; plain text with numbered options as fallback. Cover:

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
4. Close with three headings: `Blocked on me` (none, or the one real question), `Changed` (nothing — read-only), `Found`: vision confidence, achievable goal. Next: `<exact primary invoke>`.

## Skill universe (must consider)

When recommending, search across:

1. **This pack (DecisionNerd/dev-skills)** — agents, architect-it, check-readiness, diagnose-bug, document-it, fix-it, idk-now, issues, kiss, merge-it, milestones, observe-it, pulls, recon, refactor-it, repos, research-it, test-it, tidy-up, troubleshoot-app, …
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

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Under uncertainty, frame the goal before options (small batches / Beck clarity). Survey → vision-tied next skill beats thrashing tools.

Handbook card: `handbook/practices/idk-now.md`.
