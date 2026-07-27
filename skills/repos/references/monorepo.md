# repos monorepo

Design or migrate a monorepo (or escape one).

## Decide

| Stay multi-repo | Go monorepo |
| --- | --- |
| Hard ownership/security boundaries | Shared types/UI; atomic cross-package changes |
| Independent release cadence with little shared code | Single CI graph / one version policy helps |

Use `repos architecture` + `kiss` — monorepo is not always simpler.

## Design checklist

- `apps/` vs `packages/` (or stack-idiomatic layout)
- Package manager workspaces; task runner (turbo, nx, mise, make)
- **Affected** CI — don’t test the world every PR unless earned
- Release units (independent vs locked)
- CODEOWNERS per package
- ESC: one env with namespaced keys vs env-per-package — prefer least sprawl that stays clear
- Local `tidy-up` / artifact hygiene

## Migrate

Produce a DAG: layout → move packages → fix imports → CI affected → protections → docs. Prefer small merges over a big-bang weekend unless approved.
