# repos ci

## status

Inventory `.github/workflows/*`: triggers, jobs, `permissions`, secrets references, required checks vs branch protection, time/cost hotspots, duplicate lint/test.

## harden

Apply without theater:

- Explicit `permissions:` (deny-by-default mindset)
- `id-token: write` only when OIDC needed
- Prefer OIDC + ESC over static cloud keys ([secrets-esc.md](secrets-esc.md))
- Pin third-party actions to commit SHA when supply-chain risk matters; otherwise stay on maintained majors and Dependabot/Renovate
- No secrets in PRs from forks without care; limit `pull_request_target`
- Required checks match real jobs; protect default branch
- Cache with safe keys; don’t cache secrets
- Separate build vs deploy jobs; environment protection for prod

## simplify

Use a `kiss` lens: remove redundant matrices, merge duplicate workflows, adopt reusable workflows — **keep** earned gates (security scan, prod approvals). Show benefits/risks; don’t gut hardenings to look clean.

## add / reuse

Fit the stack (Node, Python, Go, monorepo affected). Prefer org or repo reusable workflows over copy-paste. Right-size jobs (Goldilocks).
