---
name: recon
description: >
  Scout the current work and recommend the next skill or action. Arguments:
  repo (whole-repo health), issue (deep implementation plan for an issue),
  milestone (milestone readiness and issue set). With no argument, read git
  logs and local branch state first to set scope, then suggest what to do next.
  Use when the user asks to recon, scout, assess, or "what should I do next".
  Knows DecisionNerd/dev-skills: agents, idk-now, kiss, repos, issues, milestones, pulls, check-readiness,
  merge-it, fix-it, test-it, observe-it, document-it, research-it, refactor-it,
  troubleshoot-app, diagnose-bug, stage-it, ship-it, tidy-up.
  Prefer idk-now when the user is lost or needs vision-tied coaching across DocSlime /
  ProductFeeling / Impeccable / vendored skills — not only this pack.
argument-hint: "[repo|issue|milestone] [target...]"
---

# Recon

Situational awareness for the current repo. Recon gathers evidence, sets scope, and **recommends the next skill** from this pack. It does not silently implement, open PRs, or mutate GitHub unless the user approves a follow-up that requires it.

If the user is **lost** (“idk”, no sense of purpose, need coaching across DocSlime / ProductFeeling / Impeccable / vendored skills), prefer **`idk-now`** instead of this skill.

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

From that evidence, state:

1. **Scope** — branch, ahead/behind, dirty files, recent themes from commits, linked issue/PR if any.
2. **Situation** — one short paragraph (shipping? stuck? dirty WIP? main with no feature branch?).
3. **Next** — ranked suggestions using the skill map (below), each with a one-line why and an exact invoke hint (e.g. `issues critique #42`, `pulls status`, `merge-it`).

Do not ask the user to restate what git already shows unless something is ambiguous (multiple issues, wrong repo).

## `repo`

Whole-repo recon (still read-only unless follow-up approved):

- Default branch, open PR count, open issue pressure, milestone list (`gh` when available).
- `AGENTS.md` / CI / obvious docs gaps.
- Recent `git log` themes and risk areas.
- Suggest: `issues create`, `milestones plan|status`, `troubleshoot-app` / `diagnose-bug` if logs imply breakage, `pulls` / `merge-it` if work is stranded on branches, `stage-it` / `ship-it` if staging/main policy exists.

Details: [references/repo.md](references/repo.md).

## `issue`

Deep issue recon / implementation plan. Follow [references/issue.md](references/issue.md) and [references/planning-checklist.md](references/planning-checklist.md).

Prefer Plan Mode for full plans. Outside Plan Mode, still produce the plan as guidance and list mutating steps without executing them until approved.

End with one **Follow-Up Prompt** (implement? `check-readiness`? `issues refine`?).

## `milestone`

Milestone recon. Follow [references/milestone.md](references/milestone.md). Summarize purpose, due date, open/closed counts, blockers; suggest `milestones narrow|plan|critique|close`, `issues` for gaps, `ship-it` / `stage-it` when release-shaped.

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
| Live UI / data-plane broken | `troubleshoot-app` then maybe `fix-it` |
| Backend / algo / API bug | `diagnose-bug` then maybe `fix-it` |
| Plan a repair from diagnosis | `fix-it` |
| Need tests / coverage / BDD evidence | `test-it` |
| Need logs/metrics/traces/analytics | `observe-it` |
| Need repo docs / runbooks / API docs | `document-it` |
| Need options/tradeoffs before building | `research-it` |
| Need structure cleanup without behavior change | `refactor-it` |
| Agent thrashing / dumb workflow / need drain | `agents slap` |
| Design / analyze / optimize agents or use subagents | `agents design\|analyze\|optimize\|sub` |
| Dangling worktrees / build junk / caches / stale branches | `tidy-up scan\|workspaces\|artifacts\|caches\|deep` |
| Land on staging | `stage-it` |
| Staging → production | `ship-it` |
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

**Follow-Up Prompt**
Do you want me to run <primary suggestion>?
```

For `issue`, use the plan format in [references/issue.md](references/issue.md) instead, still ending with a single Follow-Up Prompt tied to this skill map.
