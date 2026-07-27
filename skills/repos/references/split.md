# repos split

Carve a path/package into a new GitHub repository without surprise downtime.

## Plan first

1. **Boundary** — paths, ownership, public API, versioning
2. **Consumers** — who imports this today; publish strategy (npm, submodule, none)
3. **History** — full filter vs fresh root (prefer `git filter-repo` when history matters)
4. **CI/secrets/access** — new workflows; ESC env; teams
5. **Cutover DAG** — create repo → push filtered history → CI green → update consumers → archive or thin stub in source

## Do

- Dry-run filter; verify tree
- Keep licenses and NOTICE
- Set branch protection before opening to collaborators
- Document redirect in source README

## Don't

- Force-push shared branches without approval
- Leave deploy credentials only in the old repo
- Split without a consumer update plan
