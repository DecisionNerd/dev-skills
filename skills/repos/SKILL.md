---
name: repos
description: "Manage GitHub repositories: create/settings, split, combine, monorepo moves, architecture review, CI harden/simplify, and secrets (Pulumi ESC by default). Use when the user says repos, `/repos <command>`, wants to carve or join repos, redesign monorepo layout, harden workflows, or set up secrets without long-lived GitHub Actions secrets. Mutating GitHub/Pulumi/cloud requires explicit approval."
argument-hint: "[status|create|settings|split|combine|monorepo|architecture|ci|secrets|access|archive|help] [target...]"
---

# Repos

Command-driven **GitHub repository management**. Parse the first token as a command when it matches the table; otherwise map clear intent.

Default secrets path is **[Pulumi ESC](https://www.pulumi.com/docs/esc/)** (OIDC + `pulumi/esc-action`) — not long-lived `secrets.*` in GitHub unless the user explicitly wants classic repo secrets.

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: the acceptance criteria (existing issue AC, BDD scenarios, tests, or contract when they exist; otherwise propose them and say where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on work you did not verify.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and for independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each child's result before consolidating. Use Claude Code's `Workflow` tool only for orchestration across many subagents that truly needs it; it is expensive.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents (Claude Code `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule; Codex `agents.default_subagent_model` or a role's `agents.<name>.config_file`), follow it and do not pass a model. Otherwise: mechanical search or inventory → fast/cheap (Claude Code `haiku`); implementation and evidence gathering → mid (`sonnet`); planning, review, adversarial verification → top (`opus` or `fable`). In Claude Code set it with the `Agent` tool `model` param or agent frontmatter `model:`; in Codex pass a spawn model or set `model` in the role's config file. Where the harness cannot choose (Cursor per-subagent model selection is unverified; assume it cannot), children inherit the parent model; say so in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).

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

Done when: the DAG is fully executed, consumer repos and import paths are updated, and CI is green on the new layout. Fan out per-repo inventories to parallel read-only subagents (fast tier) during the survey phase; keep `TASKS.md` across the migration for any chain longer than five steps.

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

For large orgs (many repos), split the audit by repo across parallel read-only subagents (fast tier); verify each before consolidating.

## Output

## Blocked on me

none

## Changed

nothing

## Found

Next: `<exact skill>` (from the recommend above)

## Related skills

- Complexity of CI/arch/plan → `kiss`
- Issues/PRs/milestones → `issues` / `pulls` / `milestones`
- Ship staging/prod → `merge-it` (Stage/Ship phases per repo policy)
- Agent thrash during migration → `agents slap`
- Local clutter after history ops → `tidy-up`
- Lost on whether to split → `idk-now` then `repos architecture`

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

DORA CI + loosely coupled topology; GitHub OIDC / pinned Actions / least privilege for supply-chain baseline; Pulumi ESC is this house’s default over long-lived cloud keys.

Handbook card: `handbook/practices/repos.md`.
