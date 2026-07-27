# tidy-up safety

Non-negotiables when deleting local clutter.

## Always

1. Show an inventory (path, kind, size if cheap, reason it’s safe) before bulk deletes.
2. Prefer regenerable + gitignored paths.
3. Keep secrets and env files: `.env`, `.env.*`, credentials, keychains, `*.pem` — never “tidy” these.
4. Keep active work: current branch checkout, dirty worktrees, paths with uncommitted changes.
5. Prefer official clean entrypoints when present (`package.json` scripts named `clean`/`clean:*`, `make clean`, `cargo clean` only when asked for rust artifacts).

## Never (unless user explicitly orders that exact action after seeing the list)

- `git clean -fdx` (removes ignored **and** can surprise; `-fdX` ignored-only is preferred when used)
- `docker system prune -a --volumes`
- Deleting unmerged branches / worktrees with local commits not on remote
- Deleting another repo’s directory outside the agreed scope
- Force-push or history rewrite as “cleanup”
- Removing `node_modules` / virtualenvs without an explicit ask

## Risk labels (use in inventory)

| Risk | Meaning |
| --- | --- |
| low | Ignored, regenerable build/cache; safe after confirm |
| medium | Worktree/branch prune; regenerable but costly (reinstall/rebuild) |
| high | Unmerged work, global caches, docker volumes, anything unclear |

High-risk items stay **proposed only** until the user names them.
