---
name: ship-it
description: Use when the user asks to ship, promote, release, or take staging to production/main — especially "ship it", "promote staging to production", "take this to production", "ship staging", "staging to main", or "release the staging branch". Handles repo-level branch-policy checks, the release-source-to-production PR when the repo defines one, merge readiness, production deploy verification, smoke tests, and issue closeout evidence. For promoting work into staging first, use stage-it.
---

# Ship It

## Overview

Use this skill to turn an already-reviewed repo-approved release branch into a production release without skipping the evidence trail. This is commonly `staging` -> `main` for deployed applications, but the branch path is repo-level policy, not a global default. Libraries, SDKs, CLIs, crates, packages, and local tools often release from feature branches directly to the default branch or through a separate tag/package flow; do not force a staging promotion path onto those repos.

When the user wants to land work on staging first (not production), use `stage-it` instead.

This skill does not mutate production data, seed CMS records, rotate secrets, or bypass branch protection unless the user explicitly asks for a separate operational change and the repo runbook allows it.

## Workflow

1. Confirm the repo policy and release source.
   - Read `AGENTS.md`, the workflow docs it points to such as `CONTRIBUTING.md` or `.github/ISSUE_WORKFLOW.md`, release runbooks, pull request templates, branch protection/ruleset evidence when available, and recent branch state before acting.
   - Classify the repository before applying a production-promotion path. Deployed apps or services may have separate staging and production branches/environments. Libraries, SDKs, CLIs, crates, packages, and local tools normally should not use this skill unless repo-local release docs explicitly define a release-source-to-production branch promotion.
   - Resolve the production branch and release-source branch from repo-local guidance, existing promotion PRs, deployment config, branch protection/rulesets, or the user's explicit request. Use `main` and `staging` only when current repo evidence establishes that path.
   - If repo-local guidance does not define a release-source branch that promotes to production, stop and say this skill is not applicable for the repo's current policy. Recommend the repo's normal lifecycle skill or release flow, such as `merge-it` for feature -> default-branch library work.
   - If the current branch is not the resolved release-source branch, switch to that branch only when the worktree is clean enough and repo policy supports it; otherwise explain the required source branch.
   - Fetch remotes and verify the remote release-source and production branches are current.
   - If there is no diff from the production branch, report that there is nothing to promote.

2. Build the release inventory.
   - List commits and merged PRs in `<production-branch>..<release-source-branch>`.
   - Identify linked issues that may be closed or verified by the production release.
   - Call out risky areas such as auth, routing, database migrations, CMS content, redirects, SEO metadata, or live integrations.
   - If the repo has a release checklist, map the inventory onto that checklist.

3. Run pre-promotion gates on the release-source branch.
   - Use repo-standard gates from docs and package scripts.
   - At minimum, run the main integration/test/build gates when available.
   - For frontend or routing changes, include focused route/status checks before opening the production PR.
   - Do not print secrets, tokens, environment values, private provider data, or raw CMS records.

4. Open the production promotion PR.
   - Base: the resolved production branch; head: the resolved release-source branch.
   - Title should make the release intent obvious, such as `Promote staging to production` when the repo uses `staging` -> `main`, or `Ship it` when that matches team language.
   - Body should include the release inventory, local gates, known caveats, production smoke plan, and linked issues.
   - Never open a feature branch directly against production when repo-local policy says production can only receive PRs from a specific release-source branch.

5. Drive PR readiness.
   - Wait for required CI, preview/deploy checks, and code review automation.
   - If review/autofix skills or tools are available and appropriate, use them to address actionable findings.
   - Re-run any failed local gate after fixes.
   - Do not merge with failing required checks, unresolved required reviews, or unexplained deploy failures.

6. Merge and sync the production branch.
   - Use the repo's normal merge method.
   - After merge, fetch and update the local production branch.
   - Record the PR URL, merge commit, and final production commit.

7. Verify production, not just GitHub.
   - Wait for the production deployment for the final production commit to complete.
   - Verify the deployed commit or deployment source matches the merge.
   - Run production smoke checks from the repo runbook.
   - Include route, auth boundary, metadata, sitemap, and API checks that match the release risk.
   - If an external smoke workflow fails because of credentials or CI identity, report that as an infrastructure blocker and still perform any safe live read-only checks available.

8. Close the loop on issues.
   - Verify issue state after the production merge before saying an issue is closed.
   - If an issue requires production evidence, add or summarize the evidence only after live checks pass.
   - If issue closure is manual or blocked, state the exact remaining condition.

## Curate Labs Reference

When working in `curatelabs-nextjs`, read `references/curatelabs-nextjs.md` before creating the production PR. It captures the current Curate branch policy, useful gates, and host-boundary smoke checks.

## Blockers

Stop and ask or report a blocker when:

- The release-source branch is behind or conflicted with the production branch and the merge path is unclear.
- Repo-local guidance does not establish a release-source branch that promotes to production.
- Required checks are failing for reasons unrelated to known, documented infrastructure blockers.
- Production deployment cannot be tied to the merged commit.
- Smoke checks expose a live regression.
- The request would require a database mutation, secret change, DNS change, or auth provider change that was not explicitly requested.

## Final Response

Keep the final response short and evidence-first:

- Production PR URL and merge status.
- Final commit deployed to production.
- Smoke checks run and results.
- Issues closed, left open, or blocked.
- Any follow-up needed for infrastructure, docs, or release notes.
