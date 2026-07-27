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

1. **No argument** / vague “tidy up”: run **`scan`**, show the plan, ask what to apply (`workspaces`, `artifacts`, `caches`, `branches`, `deep`).
2. **First word is a command**: run it; remainder is path/scope.
3. **Clear intent** (“remove old worktrees”, “clear .next”, “prune merged branches”): map and proceed.
4. **User already ordered exact deletes** (“delete these worktrees”, “rm -rf dist and .next”): execute that scope after a short confirmation list.

## Hard safety rules

Follow [references/safety.md](references/safety.md). Summary:

1. **Inventory before delete** — list paths + sizes + why removable.
2. **Never delete** uncommitted changes, active worktree checkouts still in use, `.env` / secrets, or non-ignored source.
3. Prefer **project-local** cleanups; **global** caches (`~/Library/Caches`, npm/pnpm/yarn global store, Docker) only when explicitly asked.
4. Prefer repo scripts (`npm run clean`, `make clean`, `git worktree prune`) over ad-hoc `rm -rf`.
5. No `git clean -fdx` unless the user explicitly asks for that exact command after seeing what it would remove.
6. No force-delete of unmerged branches or worktrees with dirty status without explicit approval.
7. After deletes, report what was removed and approximate space reclaimed.

## Default flow (`scan` → apply)

1. Detect stack (git, node, python, rust, docker, turbo, etc.) and ignore rules.
2. Inventory candidates (see [references/targets.md](references/targets.md)).
3. Present a table: path | kind | size | risk | command that would clean it.
4. Ask which buckets to apply (or run the named command if already chosen).
5. Execute; re-scan briefly; summarize.

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
