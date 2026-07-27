---
# Loaded by `recon issue` (or `recon #N`) for deep implementation planning.
# Prefer Plan Mode for the full plan; outside Plan Mode, produce the plan as
# read-only guidance and list mutating steps without executing them unless approved.
---

# Recon → issue (implementation plan)

## Goal

Turn a GitHub issue number into an implementation-ready plan that another Codex instance or engineer can execute confidently, then present that plan in chat. Optimize for complete scope, best practices, documentation, thorough testing, and early warnings about project areas that may break.

This skill is Plan Mode friendly. In Plan Mode, gather issue and repository context, produce an implementation-ready execution plan, and include any needed mutating actions such as creating or switching branches, writing temporary files, posting GitHub comments, editing code, staging files, committing, or pushing as explicit planned steps. Do not perform those mutating actions until the user approves the plan or asks to execute it.

For any issue that is not docs-only, the plan must cover the full implementation envelope even when the GitHub issue is thin or incomplete: product/code implementation, integration with existing observability systems, security and privacy risk assessment, appropriate automated test writing, impacted end-to-end and integration test updates, and implementation documentation including updates to impacted docs.

Use lightweight BDD completion scenarios as the bridge between issue intent, implementation work, and readiness review. BDD here means plain-language Given/When/Then completion scenarios plus an evidence map. It does not require Cucumber, `.feature` files, or new test tooling unless the repository already uses them or the plan explicitly justifies adding them.

By default, do not post the plan to the GitHub issue. Issue comments create friction and should only be written when the user explicitly asks to post, update, or publish the plan as an issue comment.

Only run this skill in Plan Mode. At the start of the workflow, check the active collaboration mode. If the active mode is not Plan Mode, stop before issue lookup, branch checks, repository inspection, or GitHub comments, and tell the user this skill is Plan Mode only.

## Required Input

Require an issue number. Accept formats like `123`, `#123`, `issue 123`, or a GitHub issue URL.

If the issue number is missing or ambiguous, ask for it before planning.

If the user references a prior, broken, stale, incomplete, or incorrect plan, treat that plan as context for the issue, not as the implementation target. Do not implement "plan fixes" unless the user explicitly asks to edit the plan text or post a corrected planning comment.

If the user asks to implement, continue, finish, or fix work from an existing plan, use the issue, the user's latest request, and the existing plan together to drive implementation. The deliverable is working repository changes for the issue, not a cleaner plan, unless the user explicitly asks for planning-only work.

If the immediately preceding assistant response used this skill and ended with a `Follow-Up Prompt`, treat the user's next response as the answer to that prompt. Interpret `y`, `Y`, `yes`, `Yes`, `YES`, `yeah`, `yep`, `ok`, `okay`, `sure`, `go`, `continue`, `proceed`, `do it`, a blank/enter-style continuation when the client sends one, and affirmative UI choices as approval. Continue with the prompted next action immediately when the answer is affirmative, unless the user adds a conflicting instruction. Do not answer with a confirmation-only message.

Affirmative follow-up routing:
- If the prompt asked whether to implement the issue plan, proceed into implementation in the current repository using the plan, issue, and latest user request as execution context. In Plan Mode, only do this if the user explicitly approves mutating work or the collaboration mode has switched out of Plan Mode; otherwise present the implementation as planned next steps.
- If the prompt asked whether to run `check-readiness`, invoke the `check-readiness` skill for the same issue/branch and continue that lifecycle check.
- If the prompt asked whether to post an issue comment, post the prepared plan comment and then summarize the posted comment.
- If the prompt asked a blocking question, use the affirmative answer as the selected decision and continue the planning workflow.

Use a textual `Follow-Up Prompt` at each lifecycle decision gate. The normal flow is:
1. The user invokes this skill with an issue number.
2. Build and present the issue plan, then ask whether to implement it.
3. If the user answers affirmatively, implement the issue work.
4. After implementation finishes, print the final implementation summary, then ask whether to run `check-readiness`.
5. If the user accepts the PR readiness prompt, invoke the `check-readiness` skill and continue that lifecycle check.

Do not use raw UI markup. Do not depend on `request_user_input` for these gates; it may be unavailable in Default mode even when schemas are visible. The textual `Follow-Up Prompt` is the canonical checkpoint, and short affirmative replies such as `y`, `yes`, `ok`, or `continue` should route directly to the prompted next action.

## Workflow

1. Confirm Plan Mode.
   - Check the active collaboration mode before doing any issue lookup, branch checks, repository inspection, file reads, or GitHub mutations.
   - If the active mode is Plan Mode, continue.
   - If the active mode is not Plan Mode, stop and tell the user that `recon issue` only runs in Plan Mode, then ask them to switch to Plan Mode or make a normal implementation request instead.

2. Resolve the issue.
   - Use the GitHub app or `gh issue view <number> --json title,body,labels,assignees,milestone,state,comments,url`.
   - If the issue is in a different repo than the current workspace, determine the intended repository before continuing.
   - Include the issue title, URL, state, labels, acceptance criteria, and any `BDD Completion Scenarios` in the working notes.
   - If existing issue comments contain earlier plans, read them as historical context. Identify stale assumptions or missing work, but keep the current goal anchored to the GitHub issue itself and the user's latest request.

3. Respect Plan Mode boundaries.
   - When running in Plan Mode, plan mutating repository and GitHub actions explicitly, but do not execute them unless the user explicitly approves that action or asks to start implementation.
   - In Plan Mode, it is acceptable to inspect the current branch, status, files, issue metadata, comments, and project history using read-only commands.
   - In Plan Mode, identify whether branch creation, checkout, temporary files, issue comments, implementation edits, tests, staging, commits, pushes, or PR creation will be needed, and place them in the ordered plan.
   - In Plan Mode, present the plan in chat by default. Prepare a proposed issue-comment body only when the user explicitly asks to post, update, or publish the plan as an issue comment.
   - If the user approves posting the plan while still in Plan Mode and the tool environment allows it, post the issue comment as the planned action; do not also create branches or edit repository files unless the approved plan includes those actions.

4. Ensure a feature branch.
   - Before editing files, creating temporary planning files in the repository, or posting an explicitly requested issue comment, check the current branch with `git branch --show-current`.
   - Never do issue-planning work while on `main`, `master`, `staging`, or a detached HEAD.
   - If on `main`, `master`, `staging`, or detached HEAD, check for existing local and remote feature branches that match the issue number(s) and topic before creating a new branch.
   - Reuse the best matching existing feature branch when one exists. Check local branches with `git branch --list` and remote branches with `git branch -r --list`; fetch first only when needed to avoid stale remote branch information.
   - Create and switch to a new task-oriented feature branch from the current branch only when no suitable local or remote feature branch already exists.
   - Prefer concise issue-number-first branch names such as `123-search-results`, `7-clerk-billing`, or `74-77-clerk-org-onboarding-and-owner-claim-bootstrap`; do not include filler like `plan-issue`, and do not include agent names.
   - If already on a feature branch, stay there unless the user explicitly asks for a new branch.
   - If the worktree has uncommitted changes, inspect them first and preserve unrelated work. Do not overwrite, reset, or revert existing changes.
   - Mention the feature branch used in the final response after completing implementation work or posting an explicitly requested issue comment.
   - In Plan Mode, include the branch decision and likely branch name in the plan, but wait for approval before creating or switching branches.

5. Build local context.
   - Inspect the repository before proposing changes.
   - Use `rg`, `rg --files`, and targeted file reads to find relevant routes, components, API functions, schema, tests, docs, configuration, observability hooks, telemetry conventions, logging/error-reporting paths, auth checks, and existing patterns.
   - Read linked issues, PRs, docs, or files when they materially affect scope. When `AGENTS.md` points to contributor or workflow docs, read those referenced docs before planning branch or PR flow.
   - Identify project conventions for validation, tests, docs, error handling, feature flags, telemetry, accessibility, data migration, deployment/release flow, and PR base policy.

6. Resolve branch and release policy.
   - Classify the repository before planning PR flow. Deployed apps or services may use separate `staging` and `main` deployment branches/environments. Libraries, SDKs, CLIs, crates, packages, and local tools normally use feature-branch PRs directly to the default branch, usually `main`.
   - Read repo-local guidance, especially `AGENTS.md`, `CONTRIBUTING.md`, `.github/ISSUE_WORKFLOW.md`, pull request templates, current branches, existing open/merged PRs, branch protection/ruleset evidence when available, and deployment config before deciding whether `staging` is an integration branch.
   - If repo workflow docs describe "create feature branch from `main`" and "merge to `main`", plan feature-to-`main` even when a broad or inherited staging habit exists elsewhere.
   - Plan feature-to-`staging`, `staging`-to-`main`, or any other named branch promotion path only when current repo-local evidence, branch protection, PR convention, deployment topology, or the user's explicit request establishes that this repo actually uses that path. Do not carry a staging policy from memory, another repository, or copied template text into a library/package repo.
   - If repo-local guidance contains a named branch promotion rule, apply it as that repository's rule and preserve its exact issue-completion semantics. Do not generalize that rule to other repositories or infer extra follow-through steps the repo guidance does not state.
   - For libraries/packages/tools, plan feature branch -> `main` by default unless current repo evidence explicitly requires another base. If repo-local docs conflict with project type or live branch state, call out the conflict and include a base-branch decision in `Open Questions` rather than assuming staging.

7. Define scope.
   - Convert the issue into clear requirements and non-goals.
   - Extract existing BDD scenarios from the issue body or comments when present. Treat them as completion criteria unless they conflict with the user's latest instruction or the issue's explicit non-goals.
   - If the issue has no BDD completion scenarios and completion is behaviorally meaningful, draft a lightweight `BDD Completion Scenarios` section for the plan. Do not over-expand scope; use scenarios to clarify completion, not to smuggle in adjacent work.
   - Decide whether the issue is docs-only. If it is not docs-only, expand the execution plan beyond the literal issue wording to include the normal engineering obligations needed for a complete implementation.
   - If a prior plan is broken, describe what is wrong with it only insofar as it changes the issue scope or execution order.
   - Do not make the work about repairing the plan artifact unless the user asked for a corrected plan comment.
   - Call out ambiguities, hidden dependencies, and assumptions.
   - Separate product behavior, data/model changes, API/server changes, UI changes, observability, security/privacy, documentation, and migration or rollout needs.
   - Treat missing issue detail as a planning gap to fill from repository patterns and risk analysis. Do not omit observability, security, tests, or documentation merely because the issue did not mention them.

8. Plan implementation.
   - Prefer existing project patterns over new abstractions.
   - Break the work into ordered, reviewable steps.
   - Name likely files or directories for each step.
   - For non-docs-only issues, include the concrete product/code changes needed to deliver the behavior, not only scaffolding, issue grooming, or documentation.
   - Wire the implementation into existing observability systems where relevant: structured logs, error reporting, tracing, metrics, analytics events, audit records, rollout metadata, or dashboards according to project conventions.
   - Assess security and privacy risks before implementation: authentication, authorization, entitlement, input validation, injection risk, sensitive-data exposure, secrets/tokens, logging safety, data retention, auditability, and abuse or rate-limit concerns.
   - Include data backfills, compatibility handling, environment variables, permissions, feature-flag strategy, rollout gates, or migration steps when relevant.
   - Include the resolved PR base and issue-completion branch in the implementation plan when they affect branch creation, PR creation, issue closure, or release sequencing.

9. Implement from a plan when requested.
   - In Plan Mode, include implementation as ordered execution steps when the issue requires it, but stop before making repository changes unless the user explicitly switches to implementation or approves mutating work.
   - Start by reconciling the issue, latest user request, existing plan, current branch, and current repository state. If they conflict, follow the latest user request and issue acceptance criteria, and call out any materially stale plan assumptions.
   - Keep implementation scope tied to the issue requirements. Do not broaden into adjacent cleanup, speculative refactors, or plan-comment polish unless needed to deliver the issue.
   - Preserve user work in the branch. Inspect dirty files before editing, stage only relevant files, and do not revert unrelated changes.
   - Prefer small, reviewable changes that match established local patterns for architecture, naming, validation, errors, auth, tests, docs, telemetry, and data access.
   - Make privacy, authorization, entitlement, audit, billing, and data-retention checks explicit when the issue touches private data, organization context, integrations, scoring, or paid/gated behavior.
   - Update documentation and GitHub issue context when implementation changes product direction, architecture, requirements, testing expectations, or previously posted execution guidance.
   - Before declaring the implementation complete, compare the final diff against the issue requirements and the plan's intended outcome. Confirm the actual product/code work is done, not merely that the plan text was edited.
   - In the final response, summarize implemented behavior, key files changed, verification run, any tests not run, and remaining risks or follow-up work.
   - After the implementation summary, use `Follow-Up Prompt` to ask whether to run `check-readiness` as the next lifecycle action.

10. Plan validation.
   - For non-docs-only issues, plan test writing or test updates at the appropriate layers, not only validation commands.
   - Map each BDD scenario to a verification method: automated unit/integration/e2e coverage when practical, manual verification when external systems or human review are required, or an explicit reason when a scenario is documentation-only.
   - Include unit, integration, end-to-end, typecheck, lint, build, accessibility, and manual QA checks as appropriate to the issue.
   - Identify existing tests likely impacted by the implementation and name the test files, fixtures, mocks, or e2e flows that should be updated.
   - Add or update e2e tests when user-visible flows, routing, auth, onboarding, billing, integrations, permissions, or cross-service behavior changes.
   - Prefer existing test commands from package scripts, Makefiles, CI, or repo docs.
   - State expected failure modes and how tests should prove they are covered. If a BDD scenario is intentionally manual, state exactly what evidence should be captured before calling it done.

11. Plan documentation.
   - For non-docs-only issues, include implementation documentation unless there is a clear reason no docs are impacted.
   - Identify user-facing docs, developer docs, API docs, changelogs, examples, runbooks, architecture docs, requirement docs, testing docs, environment/config docs, or inline comments that should change.
   - Update impacted docs when the implementation changes behavior, architecture, API contracts, configuration, observability, security posture, testing expectations, rollout steps, or operational playbooks.
   - Do not add documentation for internal details unless it will reduce future maintenance risk.

12. Identify breakage risk.
   - Explicitly list parts of the project that could be affected.
   - Include backward compatibility risks, schema/data risks, auth/permission risks, billing/entitlement risks, security/privacy risks, observability gaps, performance risks, telemetry/privacy risks, UI regression risks, and CI/deployment risks when applicable.
   - Flag any work that could break other parts of the project and describe detection or mitigation.

13. Produce the plan or continue into implementation.
   - Lead with the issue summary and implementation objective.
   - Keep the plan concrete enough to execute.
   - Include open questions only when they block or materially change the plan.
   - If the user asked for planning only, do not edit code.
   - If the user asked to implement an issue or continue from a prior plan, this skill should not stop after plan repair. Use the plan as execution context, then implement the issue work in the repository according to the main coding-agent instructions.
   - Show the full plan in chat by default.
   - Do not post the plan as a GitHub issue comment unless the user explicitly asks to post, update, publish, or write it to the issue.
   - If the user explicitly asks for an issue comment, include issue-comment posting in the plan, ask for approval before actually posting it unless the user already gave explicit approval, write the plan body to a temporary markdown file, then post it with `gh issue comment <number> --body-file <temp-file>`.
   - When posting a plan comment for an issue in a different repository than the current workspace, pass the resolved repository with `--repo <owner/repo>`.
   - After posting a plan comment, summarize that the plan was added as an issue comment and include the issue URL.
   - End each planning or implementation-summary response with exactly one `Follow-Up Prompt` section that asks for the next approval or lifecycle action.
   - If the plan is ready and the next natural action is implementation, use the follow-up prompt to ask whether to implement the issue plan. Implementation must wait for this user response unless the user already explicitly asked to implement.
   - If the user explicitly asked for an issue comment and the plan is ready but not yet posted, use the follow-up prompt to ask whether to post the plan comment.
   - If implementation has completed and the issue appears ready for PR review, use the follow-up prompt to ask whether to run the `check-readiness` skill.
   - If a blocking question remains, use the follow-up prompt for that single blocker.
   - Do not call `request_user_input` for this checkpoint. The skill should work through plain chat approval so Default mode can continue smoothly.
   - When the user later answers `y`, `yes`, `ok`, `continue`, or another affirmative short reply to a follow-up that names another skill, invoke that skill directly and continue the lifecycle; do not ask the user to repeat the skill name.

## Output Format

Use this shape for the plan unless the user asks otherwise:

```markdown
**Issue**
Issue #<number>: <title>
<url>

**Objective**
<1-3 sentences>

**Requirements**
- <requirement>

**BDD Completion Scenarios**
Scenario: <user role, system context, or data state completes an in-scope outcome>
Given <starting state, permission, entitlement, data, or context>
When <the user or system action happens>
Then <observable outcome or invariant>
And <important boundary, privacy, provenance, observability, or regression expectation>

**Implementation Plan**
1. <step with likely files/directories>
2. <step with likely files/directories>

**Observability**
- <logs, metrics, tracing, analytics, audit records, dashboards, or "No observability changes expected because ...">

**Security And Privacy**
- <risks assessed, mitigations, auth/authz/entitlement/data-safety checks, or "No new security/privacy surface expected because ...">

**Documentation**
- <implementation docs and impacted user/developer/API/architecture/testing/config docs, or "No docs expected because ...">

**Testing**
- <tests to add/update, impacted e2e/integration/unit coverage, validation commands, expected failure modes, and BDD scenario-to-verification mapping>

**Breakage Risks**
- <risk plus mitigation/detection>

**Open Questions**
- <only blockers or material ambiguities, or "None">

**Follow-Up Prompt**
<Ask exactly one concise question for the next approval, lifecycle action, or blocking decision. Examples: "Do you want me to implement this issue plan?", "Do you want me to run check-readiness for issue #<number>?", or, only when the user explicitly requested an issue comment, "Post this plan as a comment on issue #<number>?">
```

For larger issues, read `references/planning-checklist.md` before writing the final plan.
