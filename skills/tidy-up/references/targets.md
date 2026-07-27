# tidy-up targets

Heuristic inventory. Adapt to the repo; do not delete paths that are tracked source.

## Discovery (read-only)

```bash
git rev-parse --show-toplevel 2>/dev/null
git status --short --branch
git worktree list
git branch -vv
du -sh . 2>/dev/null
```

When useful: `git clean -ndX` (preview ignored files), `df -h .`, language lockfiles to detect stack.

## Workspaces / worktrees

| Candidate | Notes |
| --- | --- |
| `git worktree list` entries with missing path | `git worktree prune` |
| Extra worktrees on merged/deleted branches, clean tree | remove after approval |
| Empty `.worktrees/`, `worktrees/`, agent scratch dirs | only if unused and policy allows |
| Cursor/cloud agent leftover dirs under known scratch roots | confirm path belongs to this project |

## Build artifacts (usually low risk if ignored)

`dist`, `build`, `out`, `site`, `.next`, `.nuxt`, `.output`, `.svelte-kit`, `storybook-static`, `coverage`, `htmlcov`, `target/debug` (ask before full `target/`), `*.tsbuildinfo`, `.turbo/cache` outputs, compiled `*.pyc` trees.

Prefer deleting via ignore-aware clean for listed globs rather than inventing new roots.

## Caches (regenerable)

| Kind | Examples |
| --- | --- |
| Bundler/dev | `.cache`, `.parcel-cache`, `.vite`, `.turbo`, `.eslintcache` |
| Python | `__pycache__`, `.pytest_cache`, `.mypy_cache`, `.ruff_cache`, `.tox` |
| JS tooling | `node_modules/.cache`, Next/Webpack caches |
| Native | `.swiftpm`, occasional `.gradle` (ask in Android monorepos) |

Global (only if user asked): npm/pnpm/yarn/bun caches, pip/uv cache, Homebrew cache, Xcode derived data.

## Branches

- Locals with upstream `[gone]`
- Locals fully merged into default branch (`main`/`master`)
- Never auto-delete: current, default, unprotected names user lists

## Size reporting

Use `du -sh <path>` for candidates when not too many; for large trees summarize top offenders. Mention that reclaim happens after trash empty / filesystem sync where relevant.
