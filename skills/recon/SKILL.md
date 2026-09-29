---
name: recon
description: "Scout the current work and recommend the next skill or action. Arguments: repo (whole-repo health), issue (deep implementation plan for an issue), milestone (milestone readiness and issue set). With no argument, read git logs and local branch state first to set scope, then suggest what to do next. Use when the user asks to recon, scout, assess, or \"what should I do next\". Knows DecisionNerd/dev-skills: agents, architect-it, idk-now, kiss, repos, issues, milestones, pulls, check-readiness, merge-it, fix-it, test-it, observe-it, document-it, research-it, refactor-it, troubleshoot-app, diagnose-bug, tidy-up. Prefer idk-now when the user is lost or needs vision-tied coaching across DocSlime / ProductFeeling / Impeccable / vendored skills — not only this pack."
argument-hint: "[repo|issue|milestone] [target...]"
---

# Recon

Situational awareness for the current repo. Recon gathers evidence, sets scope, and recommends the next skill from this pack. It does not silently implement, open PRs, or mutate GitHub unless the requested scope or a completion chain (including an `issues #N` handoff) calls for it.

If the user is lost (“idk”, no sense of purpose, need coaching across DocSlime / ProductFeeling / Impeccable / vendored skills), prefer `idk-now` instead of this skill.

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

## Commands

| Command | Scope | Primary output |
| --- | --- | --- |
| *(none)* | Infer from **git logs** + branch/worktree | Scope summary + ranked next-skill suggestions |
| `repo` | Whole repository | Health/readiness recon + next skills |
| `issue` / `#N` | One GitHub issue | Implementation-ready plan (see [references/issue.md](references/issue.md)) |
| `milestone` | One milestone | Progress, gaps, issue set + next skills |
| `help` / `library` | — | Command + skill map |

Routing:

1. No args → **git-log default** (below).
2. First word `repo` | `issue` | `milestone` | `help` → that command; remainder is the target.
3. Bare `#123` / `123` / issue URL → `issue`.
4. Clear intent (“recon the launch milestone”, “scout the repo”) → map and run.

## Default (no argument): git logs set scope

Run this sequence first (read-only):

```bash
git status --short --branch
git branch --show-current
git log --oneline -20
git log --oneline --decorate -10 --all
git diff --stat HEAD
git diff --stat main...HEAD 2>/dev/null || git diff --stat master...HEAD 2>/dev/null
```

Also when useful: `gh pr view --json number,url,title,state,baseRefName,headRefName` for the current branch; parse issue numbers from branch name / recent commit messages (`#123`, `Fixes #123`).

When `gh` is available, fan out git, GitHub, and docs surveys to parallel read-only subagents (fast tier) and consolidate in the parent before stating the situation.

From that evidence, state:

1. **Scope** — branch, ahead/behind, dirty files, recent themes from commits, linked issue/PR if any.
2. **Situation** — one short paragraph (shipping? stuck? dirty WIP? main with no feature branch?).
3. **Next** — ranked suggestions using the skill map (below), each with a one-line why and an exact invoke hint (e.g. `issues critique #42`, `pulls status`, `merge-it`).

Do not ask the user to restate what git already shows unless something is ambiguous (multiple issues, wrong repo).

## `repo`

Whole-repo recon (read-only):

- Default branch, open PR count, open issue pressure, milestone list (`gh` when available).
- `AGENTS.md` / CI / obvious docs gaps.
- Recent `git log` themes and risk areas.
- Fan out git, GitHub, and docs surveys to parallel read-only subagents (fast tier) when `gh` is available; consolidate in the parent.
- Suggest: `issues create`, `milestones plan|status`, `troubleshoot-app` / `diagnose-bug` if logs imply breakage, `pulls` / `merge-it` if work is stranded on branches or release-shaped per repo policy.

Details: [references/repo.md](references/repo.md).

## `issue`

Deep issue recon / implementation plan. Follow [references/issue.md](references/issue.md) and [references/planning-checklist.md](references/planning-checklist.md).

Planning does not require native Plan Mode. Use read-only inspection in the current agent when a mode switch is unavailable, and respect any active host restrictions. A standalone planning request stops at the plan; when the request was an outcome or came from a completion workflow such as `issues #N`, return the plan and continue that workflow once the host permits execution. Before implementation, follow [workspace ownership](../issues/references/workspace.md). If `issues` is not installed, use a dedicated task worktree with verified exclusive ownership, preserve the shared checkout, and carry the verified absolute path, branch, base revision, and ownership through every execution handoff and implementation result.

End with the three closing headings; `Found` ends with `Next: <primary invoke>` as a statement.

## `milestone`

Milestone recon. Follow [references/milestone.md](references/milestone.md). Summarize purpose, due date, open/closed counts, blockers; suggest `milestones narrow|plan|critique|close`, `issues` for gaps, `merge-it` (Stage/Ship phases) when release-shaped.

## Skill map (DecisionNerd/dev-skills)

Use this map when recommending next steps. Prefer the **smallest** next skill that unblocks the user.

| Situation | Suggest |
| --- | --- |
| Lost / idk / need vision-tied next step | `idk-now` (considers DocSlime, ProductFeeling, Impeccable, vendored) |
| Goals/process/system/plan feel overcomplicated | `kiss audit\|goals\|process\|system\|plan\|flow` |
| Repo split/combine/monorepo/CI/secrets (ESC) | `repos status\|split\|combine\|monorepo\|ci\|secrets` |
| Need a new / better issue | `issues create\|critique\|refine\|narrow\|widen\|document` |
| Organize release/version work | `milestones status\|plan\|critique\|narrow` |
| Open or improve a PR | `pulls create\|critique\|status\|refine\|explain` |
| Autofix → CI green → merge → close issue | `merge-it` |
| Is the issue done enough to PR/close? | `check-readiness` |
| Live UI / data-plane broken | `troubleshoot-app` (diagnoses and fixes in-repo) |
| Backend / algo / API bug | `diagnose-bug` (diagnoses and fixes in-repo) |
| Agent / LLM quality or thrash | `agents slap` / `agents analyze` (+ Langfuse via `observe-it`) |
| Plan a repair from diagnosis | `fix-it` |
| Need tests / coverage / BDD evidence | `test-it` (name regime A/B/C first) |
| Need logs/metrics/traces/analytics | `observe-it` (regime-matched; Langfuse for C) |
| Need repo docs / runbooks (surgical) | `document-it` — DocSlime only when altitude earned |
| Need options/tradeoffs before building | `research-it` |
| Need structure cleanup without behavior change | `refactor-it` |
| Architecture bet needed before building | `architect-it` |
| Agent thrashing / dumb workflow / need drain | `agents slap` |
| Design / analyze / optimize agents or use subagents | `agents design\|analyze\|optimize\|sub` |
| Dangling worktrees / build junk / caches / stale branches | `tidy-up scan\|workspaces\|artifacts\|caches\|deep` |
| Staging land / production promote (repo policy) | `merge-it` (Stage / Ship phases) |
| Unsure / no arg | this skill’s default git-log recon |

When suggesting, name the skill and a concrete command string the user (or you) can run next. One primary recommendation, then 2–3 alternates.

## Output shape (default / repo / milestone)

```markdown
**Scope**
- Branch: ...
- Recent work: ...
- Linked: issue/PR/milestone or none

**Situation**
<1 short paragraph>

**Recommend**
1. **Primary:** `<skill> <command> …` — <why>
2. Alternatives: ...

**Blocked on me**
<The one genuine question or blocker, else "none">

**Changed**
<Files, commits, GitHub objects touched, else "nothing">

**Found**
<Situation summary and `Next: <primary invoke>`>
```

For `issue`, use the plan format in [references/issue.md](references/issue.md) instead, ending with the three closing headings where `Found` ends with `Next: <primary invoke>`.

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Situational awareness before action (SRE incident habit): read git/issue/PR state, then the smallest next move. For one issue, plan a reviewable small CL (Google eng practices).

Handbook card: `handbook/practices/recon.md`.
