# Curate Labs Ship-It Reference

Use this reference when the working directory is `curatelabs-nextjs` and running `ship-it`.

## Branch Policy

- Production promotion is `staging` -> `main`.
- Feature branches PR to `staging`, not `main`.
- Before opening a production PR, fetch remotes and confirm local `staging` matches `origin/staging`.

Useful checks:

```bash
git fetch origin
git status --short
git branch --show-current
git log --oneline origin/main..origin/staging
gh pr list --base staging --state open
gh pr list --base main --state open
```

## Pre-Promotion Gates

Prefer repo docs over this reference when they differ. Common Curate gates include:

```bash
npm run test:int
npm run build
npm run lint
```

For a targeted production fix, include focused tests that cover the changed surface before the broader gates when that makes failures easier to read.

## Production PR

Create the PR from `staging` to `main`:

```bash
gh pr create --base main --head staging --title "Promote staging to production" --body-file <body-file>
```

The PR body should include:

- Commits and merged PRs included in `main..staging`.
- Local gates and CI/deploy checks.
- Production smoke checklist.
- Linked issues and whether they should close on merge or after live verification.

## Curate Host-Boundary Smoke

For the public/CMS host split, production smoke should include read-only checks like:

```bash
curl -I https://www.curatelabs.ai/
curl -I https://cms.curatelabs.ai/admin
curl -I https://cms.curatelabs.ai/about
```

Expected shape for the host-boundary release:

- `https://www.curatelabs.ai/` serves the public site.
- `https://cms.curatelabs.ai/admin` reaches the CMS/admin auth boundary.
- Public slugs requested on `cms.curatelabs.ai` redirect to the matching `www.curatelabs.ai` URL.

## Production Evidence

After merge:

- Verify Vercel production deployed the final `main` commit.
- Run the repo production smoke command or workflow if configured.
- If Pulumi/Vercel/GitHub identity blocks an automated smoke workflow, report the infrastructure blocker separately from app health and run safe manual read-only route checks.
- Do not print WorkOS, Vercel, Pulumi, Payload, Blob, or database secrets.
