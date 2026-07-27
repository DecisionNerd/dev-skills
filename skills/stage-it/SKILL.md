---
name: stage-it
description: Land a feature or release candidate on the staging branch/environment per repo policy — open and drive the staging PR with gates, merge readiness, and staging deploy verification. Use when the user asks to stage, promote to staging, land on staging, or "stage it". Does not send work all the way into production (use ship-it). On main-only repos with no staging policy, do not invent a staging path — use merge-it for the next integrate target, or ship-it if they meant production + health check.
---

# Stage It

## Overview

Use this skill to promote work onto the staging branch (and staging environment when one exists) without skipping the evidence trail. This is commonly `feature-branch` -> `staging` for deployed applications with a staged release train.

This skill does **not** promote staging to production. That is `ship-it`.

This skill does not mutate production data, seed CMS records, rotate secrets, or bypass branch protection unless the user explicitly asks for a separate operational change and the repo runbook allows it.

## First Gate: Does This Repo Use Staging?

Before acting, classify the repository from current evidence only (not memory of another repo):

1. Read `AGENTS.md`, workflow docs such as `CONTRIBUTING.md` or `.github/ISSUE_WORKFLOW.md`, PR templates, deployment config, branch protection/rulesets when available, and recent PR/branch history.
2. Look for a real staging integration path: a `staging` (or equivalently named) branch that feature work merges into before production, staging environment/deploy config, or explicit repo docs that say feature PRs target staging.
3. **Main-only repos** (libraries, packages, tools, or apps that merge features directly to `main`/`master` with no staging branch policy):
   - Stop. Do not create a `staging` branch or invent a staging promotion path.
   - Tell the user this repo has no staging release train.
   - Ask them to use **`ship-it`** if they meant production release, or `merge-it` / the repo's normal feature -> default-branch flow if they meant landing a feature PR.
4. Only continue when current repo evidence establishes a staging target branch.

## Workflow (Staging Repos)

1. Confirm source and staging target.
   - Resolve the staging branch name from repo-local guidance (usually `staging`).
   - Resolve the source branch: the user's current feature/fix branch, or an explicit head they named. Do not open a staging PR from a dirty unrelated worktree without clarifying scope.
   - Fetch remotes and verify remote staging and the source branch are current.
   - If there is no diff from staging, report that there is nothing to stage.
   - Never open a feature branch directly against production when repo policy says features must land on staging first — that is this skill's job, not `ship-it`.

2. Build the staging inventory.
   - List commits and linked PRs in `<staging-branch>..<source-branch>`.
   - Identify linked issues and whether issue completion is the staging merge or a later production promotion under repo policy.
   - Call out risky areas (auth, routing, migrations, CMS, redirects, live integrations).

3. Run pre-merge gates on the source branch.
   - Use repo-standard gates from docs and package scripts.
   - At minimum, run the main test/build/lint gates when available.
   - Do not print secrets, tokens, environment values, private provider data, or raw CMS records.

4. Open the staging PR.
   - Base: staging branch; head: source branch.
   - Title should make staging intent obvious (for example `Stage: <short change summary>`).
   - Body should include the inventory, local gates, staging smoke plan, and linked issues.
   - Use GitHub closing syntax on the staging PR only when repo policy says the staging merge satisfies the issue. Otherwise note that production/`ship-it` still owns closure.

5. Drive PR readiness.
   - Wait for required CI, preview/staging deploy checks, and code review automation.
   - If review/autofix skills or tools are available and appropriate, use them for actionable findings.
   - Do not merge with failing required checks, unresolved required reviews, or unexplained deploy failures.

6. Merge and sync staging.
   - Use the repo's normal merge method (squash when that is repo practice for feature PRs).
   - After merge, fetch and update local staging when appropriate.
   - Record the PR URL, merge commit, and final staging commit.
   - Delete the remote feature branch only when repo practice allows it and it is not an integration branch.

7. Verify staging, not just GitHub.
   - Wait for the staging deployment for the final staging commit when a staging environment exists.
   - Verify the deployed commit or deployment source matches the merge when possible.
   - Run staging smoke checks from the repo runbook (routes, auth boundaries, critical APIs) matching release risk.
   - If smoke is blocked by credentials or CI identity, report that as an infrastructure blocker and still run any safe read-only checks available.

8. Close the loop — and hand off production.
   - Verify issue state after the staging merge when staging is the completion branch.
   - After a successful stage, recommend **`ship-it`** as the separate production-release follow-up when repo policy uses staging -> production. Do not run `ship-it` automatically unless the user explicitly asked to ship to production in the same request.

## Relationship to Other Skills

| Intent | Skill |
| --- | --- |
| Land feature on staging | `stage-it` (this skill) |
| Merge current work → next integrate target | `merge-it` |
| All the way into production + check it is healthy | `ship-it` |
| Main-only / no staging policy | Do not use this skill — use `merge-it` for the next integrate target, or `ship-it` if they meant production |

## Blockers

Stop and ask or report a blocker when:

- The repo is main-only or has no staging branch policy (redirect to `ship-it` / normal PR flow as above).
- The source branch is behind or conflicted with staging and the merge path is unclear.
- Required checks are failing for reasons unrelated to known, documented infrastructure blockers.
- Staging deployment cannot be tied to the merged commit when verification is required.
- Smoke checks expose a live staging regression.
- The request would require a production change, database mutation, secret change, DNS change, or auth provider change that was not explicitly requested.

## Final Response

Keep the final response short and evidence-first:

- Staging PR URL and merge status.
- Final commit on staging / staging deploy when applicable.
- Smoke checks run and results.
- Issues closed, left open, or deferred to production.
- Whether `ship-it` is the logical next step (and that it was not run unless requested).

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Staging as progressive-delivery control (SRE launch/canary thinking). Staging that never matches prod is theater.

Handbook card: `handbook/practices/stage-it.md`.
