---
name: tidy-up
description: >
  Clean dangling workspaces/worktrees, stale branches, excess build artifacts,
  caches, and other leftover clutter. Arguments: scan/plan (inventory only),
  workspaces, artifacts, caches, branches, deep, and all. Use when the user
  says "tidy up", reclaim disk, remove stale worktrees, clear build junk, or
  prune leftover agent/dev debris. Always inventory first; delete only with
  approval unless the user already ordered that exact cleanup.
argument-hint: "[scan|workspaces|artifacts|caches|branches|deep|all] [path...]"
---

# Tidy Up

Reclaim space and remove **leftover** local clutter without wrecking active work. Parse the first token as a command when it matches the table; otherwise map clear intent. Default with no useful target is **`scan`** (inventory + proposed cleanup), not blind delete.

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

| Command | What it does |
| --- | --- |
| `scan` / `plan` / `dry-run` | Inventory clutter; estimate size; propose deletions (**no deletes**) |
| `workspaces` / `worktrees` | Remove dangling / merged / abandoned git worktrees and empty workspace dirs |
| `artifacts` / `build` | Remove stale build outputs (`dist`, `build`, `.next`, `site`, `coverage`, etc.) |
| `caches` | Clear regenerable caches (tool/package caches in-repo; ask before global home caches) |
| `branches` | Prune stale local branches (merged / gone remote); never delete unmerged without approval |
| `deep` | Broader pass: workspaces + artifacts + caches + safe branch prune (still gated) |
| `all` | Same as `deep` for the current repo (or named path); still inventory → approve → delete |
| `help` / `library` | List commands |

Aliases: `clean` / `cleanup` / `prune` → map to the narrowest fitting command, or `scan` if unclear.

Target: repo root (default cwd), monorepo package path, or explicit directory.

## Routing

1. **No argument** / vague “tidy up”: run **`scan`**, then ask one structured multi-select question: which buckets to apply (workspaces / artifacts / caches / branches / deep), showing estimated sizes and risk level for each. Use the harness's structured question tool when available; otherwise plain text with numbered options.
2. **First word is a command**: run it; remainder is path/scope.
3. **Clear intent** (“remove old worktrees”, “clear .next”, “prune merged branches”): map and proceed.
4. **User already ordered exact deletes** (“delete these worktrees”, “rm -rf dist and .next”): execute that scope; list what was removed under `Changed`.

## Hard safety rules

Follow [references/safety.md](references/safety.md). Summary:

1. **Inventory before delete** — list paths + sizes + why removable.
2. **Never delete** uncommitted changes, active worktree checkouts still in use, `.env` / secrets, or non-ignored source.
3. Prefer **project-local** cleanups; **global** caches (`~/Library/Caches`, npm/pnpm/yarn global store, Docker) only when explicitly asked.
4. Prefer repo scripts (`npm run clean`, `make clean`, `git worktree prune`) over ad-hoc `rm -rf`.
5. No `git clean -fdx` unless the user explicitly asks for that exact command after seeing what it would remove.
6. No force-delete of unmerged branches or worktrees with dirty status without explicit approval.
7. After deletes, report what was removed and approximate space reclaimed under `Changed`.
8. **Single owner, no fan-out for deletes.** Destructive commands run sequentially in the parent; no subagent fan-out for delete steps.

## Default flow (`scan` → apply)

1. Detect stack (git, node, python, rust, docker, turbo, etc.) and ignore rules.
2. Inventory candidates (see [references/targets.md](references/targets.md)).
3. Present a table: path | kind | size | risk | command that would clean it.
4. Ask which buckets to apply (or run the named command if already chosen).
5. Execute (single-owner; no subagent fan-out for delete steps); re-scan briefly.
6. Close with three headings: `Blocked on me` (any high-risk item still awaiting approval), `Changed` (paths removed, approximate space reclaimed), `Found` (what remains; Next: `<next invoke if applicable>`).

## Command notes

### `workspaces` / `worktrees`

- `git worktree list --porcelain`; prune with `git worktree prune` for missing dirs.
- Remove worktrees whose branch is merged/deleted and working tree is clean — after approval.
- Drop empty leftover dirs from agent/cloud worktrees when safe.
- If a worktree is dirty or has an open PR tip, report and skip unless user forces.

### `artifacts` / `build`

- Remove ignored build outputs that regenerate: `dist`, `build`, `out`, `site`, `.next`, `.nuxt`, `.output`, `coverage`, `*.tsbuildinfo`, Storybook static, etc.
- Respect monorepos: clean packages in scope only.
- Prefer `git clean -fdX -- <paths>` (ignored only) over deleting tracked files.

### `caches`

- In-repo: `.turbo`, `.cache`, `.parcel-cache`, `.vite`, `__pycache__`, `.pytest_cache`, `.mypy_cache`, `.ruff_cache`, `.eslintcache`, native build caches when ignored.
- Package managers: local `node_modules/.cache`; ask before `pnpm store prune` / npm cache verify-delete / global Homebrew caches.
- Do not delete `node_modules` unless the user asked (`deep` may *propose* it, not auto-run).

### `branches`

- Fetch/prune remotes when network ok: `git fetch --prune`.
- List merged locals and `gone` upstreams; delete only after listing.
- Keep: current branch, default branch, branches the user names as keepers.

### `deep` / `all`

Run scan across all buckets, then apply approved buckets in order: **workspaces → artifacts → caches → branches**. Stop and ask if any high-risk item appears (Docker system prune, whole `node_modules`, unmerged branch).

## Related skills

- Agent thrash left junk mid-run: `agents slap` first, then `tidy-up`
- Code structure cleanup (not disk clutter): `refactor-it`
- Situational awareness before cleaning: `recon`

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Inventory before delete (safe ops hygiene). Reclaim regenerable clutter and merged branches; never confuse tidy with deleting secrets or unmerged work.

Handbook card: `handbook/practices/tidy-up.md`.
