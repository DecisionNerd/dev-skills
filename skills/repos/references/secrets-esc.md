# repos secrets — Pulumi ESC (default)

Default for this skill: **Pulumi ESC** for environments, secrets, and configuration — injected into GitHub Actions via **OIDC**, not long-lived `secrets.*` cloud keys.

Docs: [ESC + GitHub Actions](https://www.pulumi.com/docs/esc/guides/integrate-with/github-actions/), [tutorial](https://www.pulumi.com/tutorials/esc-github/), [`pulumi/esc-action`](https://github.com/pulumi/esc-action).

## Goals

1. Short-lived credentials at job runtime
2. One ESC environment (or env-per-stage) as source of truth for CI + local
3. Minimal GitHub Secrets (ideally none for cloud keys; OIDC only)

## Setup DAG (right-sized)

1. **Pulumi Cloud org** — confirm org name; ESC project naming (e.g. `github-secrets` or `<repo>`)
2. **OIDC trust** — register GitHub as OIDC issuer in Pulumi Cloud access settings
3. **ESC environment** — `org/project/env` with `values.environmentVariables` (and provider logins via `fn::open::…` / OIDC where applicable)
4. **Workflow permissions** — `id-token: write`, least-privilege `contents` / `pull-requests` as needed
5. **Auth + inject** — `pulumi/auth-actions` then `pulumi/esc-action` (or esc-action with OIDC inputs)
6. **Remove static secrets** — after green runs, delete migrated GitHub Secrets
7. **Document** — where envs live; how staging vs prod differ

Ask approval before creating ESC envs, changing org OIDC, or deleting GitHub Secrets.

## Workflow sketch

```yaml
permissions:
  contents: read
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Authenticate with Pulumi Cloud
        uses: pulumi/auth-actions@v1
        with:
          organization: <org>
          requested-token-type: urn:pulumi:token-type:access_token:organization
      - name: Load ESC environment
        uses: pulumi/esc-action@v3
        with:
          environment: <org>/<project>/<env>
      # … build / deploy using injected env vars
```

Prefer current action majors from Pulumi docs; pin to SHA when hardening (`repos ci harden`).

## Migrate from GitHub Secrets

1. Inventory `${{ secrets.* }}` usages in workflows
2. Create ESC env; copy values as ESC secrets (user pastes into Pulumi UI/CLI — **agent must not echo values**)
3. Optional: export tooling / `pulumi/esc-export-secrets-action` patterns when appropriate
4. Switch workflows to ESC injection
5. Verify CI on a branch
6. Delete redundant GitHub Secrets with approval

## When classic GitHub Secrets are OK

User explicitly asks (`secrets github`), or a platform limitation blocks OIDC/ESC. Still prefer environment-scoped secrets, least privilege, and a plan to revisit ESC.

## Don't

- Print secret values into chat, logs, or commits
- Commit `.env` with production credentials
- Leave long-lived cloud keys in GitHub after ESC works
- Broaden OIDC trust beyond needed repos/branches
