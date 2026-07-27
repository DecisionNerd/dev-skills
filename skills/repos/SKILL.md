---
name: repos
description: >
  Manage GitHub repositories: create/settings, split, combine, monorepo moves,
  architecture review, CI harden/simplify, and secrets (Pulumi ESC by default).
  Use when the user says repos, `/repos <command>`, wants to carve or join repos,
  redesign monorepo layout, harden workflows, or set up secrets without long-lived
  GitHub Actions secrets. Mutating GitHub/Pulumi/cloud requires explicit approval.
argument-hint: "[status|create|settings|split|combine|monorepo|architecture|ci|secrets|access|archive|help] [target...]"
---

# Repos

Command-driven **GitHub repository management**. Parse the first token as a command when it matches the table; otherwise map clear intent.

Default secrets path is **[Pulumi ESC](https://www.pulumi.com/docs/esc/)** (OIDC + `pulumi/esc-action`) — not long-lived `secrets.*` in GitHub unless the user explicitly wants classic repo secrets.

## Commands

| Command | What it does |
| --- | --- |
| *(none)* / `status` / `audit` | Survey current repo(s): visibility, default branch, protection, workflows, secrets posture, topics |
| `create` | Plan/create a new GitHub repo (template, visibility, init files, team access) |
| `settings` / `protect` | Branch protection, rulesets, merge policy, required checks, autodelete heads |
| `split` | Carve a package/path/history into a new repo (filter-repo / subtree plan) |
| `combine` / `merge-repos` | Join multiple repos into one (history strategy, path prefixes, CI unification) |
| `monorepo` | Design or migrate to/from monorepo (tooling, packages, CI graph, ownership) |
| `architecture` / `arch` | Repo-as-system architecture: boundaries, apps/packages, deploy units, coupling |
| `ci` | CI/CD workflows — see [CI subcommands](#ci-subcommands) |
| `secrets` | Secrets & config — **Pulumi ESC default**; see [references/secrets-esc.md](references/secrets-esc.md) |
| `access` | Collaborators, teams, outside collaborators, deploy keys posture |
| `topics` / `rename` / `transfer` / `visibility` | Metadata and identity operations |
| `archive` / `unarchive` | Archive or restore a repo |
| `template` | Template repo flags / generate from template |
| `sync` | Mirror or keep a fork/upstream sync plan (no silent force) |
| `help` / `library` | List commands |

Aliases: `carve` → `split`; `join` → `combine`; `esc` → `secrets`; `workflows` → `ci`.

Target: `owner/repo`, URL, local path, or “current repo.”

## Routing

1. **No argument**: `status` for the current git remote.
2. **First word is a command**: run it; remainder is target/context.
3. **`ci harden` / `ci simplify`**: CI subcommands (below).
4. **Clear intent** (“split packages/api into its own repo”, “move secrets to ESC”): map and proceed.

Mutating GitHub (create, settings, transfer, archive, secret writes), Pulumi ESC, or history rewrites requires **explicit approval**. Prefer plans + DAG before execution. For complexity judgment on CI/architecture, pair with `kiss`.

## CI subcommands

| Subcommand | What it does |
| --- | --- |
| `ci` / `ci status` | Inventory workflows, required checks, flaky/slow jobs, secrets usage |
| `ci harden` | Least privilege permissions, pin actions SHAs or trustworthy versions, OIDC, no plaintext secrets, branch protections aligned to checks, fail-closed on supply chain basics |
| `ci simplify` | Remove redundant jobs/matrices, cache sanely, consolidate reusable workflows — **only if** complexity is unwarranted (use `kiss` lens; keep earned gates) |
| `ci add` | Add a workflow (test/lint/release/deploy) fitting repo stack |
| `ci reuse` | Extract composite/reusable workflows across monorepo or org |

Details: [references/ci.md](references/ci.md).

## `secrets` (Pulumi ESC default)

Default method: **Pulumi ESC + GitHub OIDC** (`id-token: write`, `pulumi/auth-actions`, `pulumi/esc-action`) so CI does not store long-lived cloud keys in GitHub Secrets.

| Subcommand | What it does |
| --- | --- |
| `secrets` / `secrets status` | Where secrets live today (GitHub / ESC / both); drift risk |
| `secrets setup` | Bootstrap ESC env + OIDC trust + workflow injection (default path) |
| `secrets migrate` | Move classic GitHub Actions secrets → ESC; remove static secrets when safe |
| `secrets github` | Classic repo/org/environment secrets **only if user insists** |
| `secrets rotate` | Rotation plan for ESC providers / remaining GitHub secrets |

Follow [references/secrets-esc.md](references/secrets-esc.md). Never print secret values.

## `split` / `combine` / `monorepo`

- **split**: map boundaries → history strategy (`git filter-repo` preferred) → new remote → CI/secrets/access → update consumers. See [references/split.md](references/split.md).
- **combine**: path prefix plan → history import strategy → unified CI → CODEOWNERS → redirect/archive sources. See [references/combine.md](references/combine.md).
- **monorepo**: package layout (apps/packages), task runner, affected CI, ownership, release units. See [references/monorepo.md](references/monorepo.md).

Always produce a **DAG** of migration steps with right-sized tasks (Goldilocks — see `kiss`).

## `architecture`

Repo-level architecture review (not app feature design):

- Deployable units vs packages vs shared libs
- Boundary rules (who may import whom)
- CI/CD and env topology (dev/staging/prod)
- Recommendation: keep / reshape / split / combine — with risks/benefits

Hand off product/UI feeling to ProductFeeling / Impeccable; docs tree to DocSlime; code structure inside a package to `refactor-it`.

## Standard hygiene (`status` checklist)

- Default branch, visibility, homepage/topics
- Branch protection / rulesets vs actual required checks
- Workflows present, permissions blocks, action pinning posture
- Secrets: GitHub vs ESC; long-lived credentials remaining
- Dependabot/Renovate, CODEOWNERS, SECURITY.md, license
- Autodelete head branches, squash/rebase policy
- Forks, templates, archive state

## Related skills

- Complexity of CI/arch/plan → `kiss`
- Issues/PRs/milestones → `issues` / `pulls` / `milestones`
- Ship staging/prod → `stage-it` / `ship-it`
- Agent thrash during migration → `agents slap`
- Local clutter after history ops → `tidy-up`
- Lost on whether to split → `idk-now` then `repos architecture`
