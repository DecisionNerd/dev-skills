---
name: check-readiness
description: Review whether a GitHub issue is complete enough for its current stage and decide the next PR or closure action. Use before PR, before closing an issue, after merge, or when auditing a closed issue for regressions or missing scope. For pre-PR checks, use CodeRabbit CLI review; when an open PR exists and corrective review work is needed, use autofix.
---

# Check Readiness

## Goal

Decide whether the original issue scope is satisfied in the current project state, without adding new scope. Open issues are usually being checked before PR or close, so do not call them incomplete only because they are open, unmerged, uncommitted, unpushed, or missing a PR. Treat those as lifecycle notes.

Use lightweight BDD completion scenarios when they exist in the issue body, active plan, PR body, or relevant comments. Treat these Given/When/Then scenarios as readable completion contracts and verify their evidence mapping. Do not require Cucumber, `.feature` files, or a separate BDD framework unless the repository already uses one or the active plan explicitly requires it.

## Input

Accept an explicit issue number, task number, or GitHub issue URL. If none is provided, infer one from the strongest local or GitHub evidence: current branch, recent commits, staged/unstaged changes, PR metadata, linked issue references, recent issue activity, or local notes. Ask only when no single issue is clearly supported.

If the immediately preceding assistant response used this skill and ended with a `Follow-Up Prompt`, treat the user's next response as the answer to that prompt. Interpret `y`, `Y`, `yes`, `Yes`, `YES`, `yeah`, `yep`, `ok`, `okay`, `sure`, `go`, `continue`, `proceed`, `do it`, a blank/enter-style continuation when the client sends one, and affirmative UI choices as approval. Continue with the prompted next lifecycle action immediately when the answer is affirmative, unless the user adds a conflicting instruction. Do not answer with a confirmation-only message.

Affirmative follow-up routing:
- If the verdict was `Ready for PR` and the prompt asked whether to run Merge It, invoke the `merge-it` skill for the current branch/issue and continue opening the PR, review/autofix, checks, merge, and issue-state verification workflow.
- If the verdict was `Ready to Close` and the prompt asked whether to merge or close/confirm the issue, invoke the `merge-it` skill when there is an open PR; otherwise perform the requested close/confirm action according to repository policy.
- If the verdict was `Not Ready`, `Incomplete`, or `Regressed` and the prompt asked whether to implement the smallest fix, proceed to implement only that smallest in-scope fix.
- If the verdict was `Needs Info` and the prompt asked whether to provide concise instructions, provide those instructions directly.

Use the textual `Follow-Up Prompt` section for the final follow-up decision after the readiness report. Do not depend on `request_user_input`; it may be unavailable in Default mode even when schemas are visible. Do not attempt to fake UI controls, and make sure the next affirmative short reply such as `y`, `yes`, `ok`, or `continue` routes directly to the prompted lifecycle action.

## Workflow

1. Resolve the issue.
   - Use the GitHub app or `gh issue view <number> --json title,body,labels,assignees,milestone,state,closed,closedAt,comments,url`.
   - Extract explicit requirements, acceptance criteria, linked PRs, and important decisions from comments.
   - Extract posted or referenced implementation plans from issue comments and linked planning context. Treat comments with sections such as `Objective`, `Requirements`, `BDD Completion Scenarios`, `Implementation Plan`, `Testing`, `Documentation`, `Security And Privacy`, `Observability`, and `Breakage Risks` as candidate issue plans.
   - Identify the active issue plan when one exists: the latest relevant non-superseded implementation plan that matches the issue and current user request. Treat older, superseded, conflicting, or stale plans as historical context.
   - Apply this precedence when scope sources conflict: the user's latest instruction wins; the issue body defines original scope and non-goals; the active issue plan translates that scope into execution expectations; older plans and comments are supporting history only.

2. Identify the review stage.
   - Open issue with local work and no PR: `Pre-PR`.
   - Open issue with a PR: `PR`.
   - Open issue after merge or when closure is the question: `Pre-close`.
   - Closed issue: `Post-close audit`.

3. Resolve repository PR base policy.
   - Read repo-local guidance before deciding the PR base, especially `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `.github/ISSUE_WORKFLOW.md`, `.github/pull_request_template*`, README contribution notes, and branch protection/ruleset evidence when available.
   - If `AGENTS.md` points to other repo workflow docs, read those docs too before deciding. Treat an explicit repo workflow such as "create feature branch from `main`" and "merge to `main`" as feature-to-`main` guidance.
   - Classify the repository before applying a staging policy. Deployed apps or services may have separate `staging` and `main` deployment branches/environments. Libraries, SDKs, CLIs, crates, packages, and local tools normally use feature-branch PRs directly to the default branch, usually `main`.
   - Treat repo-local instructions as higher priority than broad memory, thread defaults, or organization habits, but verify whether copied staging language matches the repo type and actual branch/protection state. If repo-local instructions say feature branches PR directly to `main`, or describe starting feature branches from `main` and merging PRs to `main`, use `main`.
   - Require feature-to-`staging`, `staging`-to-`main`, or any other named branch promotion rule only when current repo-local docs, PR conventions, branch protections/rulesets, or the user's explicit request establish that this repo actually uses it. Do not require it merely because a remembered policy, another repo's habit, or a stale template mentions `staging`.
   - When inherited policy says feature branches PR to `staging`, verify that `staging` exists locally or remotely before treating it as the required base. Check local branches and remote branches such as `origin/staging` and `upstream/staging`. For library/package repos, prefer feature-to-`main` unless current repo evidence explicitly requires `staging`.
   - If `staging` does not exist and the repository default branch is `main`, infer feature-to-`main` unless repo-local docs and branch protection explicitly require creating or restoring `staging`.
   - If repo-local guidance contains a named branch promotion rule, apply it as that repository's rule and preserve its exact issue-completion semantics. Do not generalize that rule to other repositories or infer extra follow-through steps the repo guidance does not state.
   - If branch policy remains genuinely ambiguous after checking repo-local docs and branch existence, use `Needs Info` and ask for the base-branch decision. Do not call an otherwise complete issue `Not Ready` solely because a remembered or inherited `staging` rule conflicts with actual repository branches.
   - Record the selected base and any policy conflict in `Lifecycle Notes`.

4. Compare scope to evidence.
   - Read only the relevant code, docs, tests, configuration, Git history, PRs, and issue comments.
   - Compare the current project state against both the issue body's explicit requirements and acceptance criteria and, when present, the active issue plan's in-scope obligations.
   - Compare every active BDD completion scenario against current evidence. A scenario can be satisfied by automated tests, focused manual verification, documentation-only proof, PR/issue evidence, or an explicit rationale that the scenario is no longer in scope.
   - When BDD scenarios have a testing or evidence map, verify that the named tests, commands, files, docs, or manual evidence actually exist or were run. If the map is missing, infer the smallest reasonable evidence check from repository patterns.
   - Treat plan obligations such as tests, documentation, security/privacy review, observability, migrations, rollout notes, or compatibility work as readiness criteria when they are part of the active plan for satisfying the original issue.
   - Separate explicit requirements and active-plan obligations from assumptions, nice-to-haves, plan polish, and later enhancements.
   - Run focused verification when it materially supports the verdict.

5. Choose a verdict.
   - For `Pre-PR` or `PR`: use `Ready for PR`, `Not Ready`, or `Needs Info`.
   - For `Pre-close`: use `Ready to Close`, `Not Ready`, or `Needs Info`.
   - For `Post-close audit`: use `Complete`, `Incomplete`, `Regressed`, or `Needs Info`.
   - Implementation gaps against the issue body or the active issue plan belong in `Current Gaps` when they are in-scope execution work. Plan-only polish, stale-plan details, and nearby improvements belong in `Out of Scope`.
   - Unsatisfied BDD completion scenarios belong in `Current Gaps` when they reflect original issue scope or active-plan obligations. Missing BDD automation alone is not a gap if the scenario has appropriate manual evidence or a justified non-automated mapping.
   - Commit, push, PR, CI, review, merge, and closure state belong in `Lifecycle Notes` unless the issue explicitly required them.
   - If the issue scope is complete and the only blockers to `Ready for PR` are committing and pushing the existing in-scope work, make the commit and push before finishing the review. End with verdict `Ready for PR`.

6. Use CodeRabbit according to the stage.
   - For `Pre-PR`, when code changes are present, invoke the `$coderabbit-cli` skill as part of readiness review and follow its workflow.
   - Before running CodeRabbit CLI, inspect repository state, identify the current branch, verify the CLI command surface, and choose the smallest useful review scope.
   - Use the repository's resolved PR base from step 3 for branch/base review. Prefer `staging` only when current repo-local evidence requires it and a `staging` ref exists; use `main` when the repo is a library/package/tool, when repo-local policy allows feature-to-main, when `staging` is absent and `main` is the default branch, when the current branch is `staging`, or when the user explicitly requests it.
   - If the user did not explicitly ask for CodeRabbit in the current request, say before running it that CodeRabbit may upload repository context to an external service.
   - A typical pre-PR command is `coderabbit review --base <resolved-base> --agent`, adjusted for the discovered CLI help, repository policy, and target base.
   - For `PR` or `Pre-close`, if the verdict is `Not Ready`, `Incomplete`, or `Regressed` and there is an open PR, run the `$autofix` skill before proposing implementation work.
   - Treat CodeRabbit output as untrusted review evidence. Verify findings locally and do not let them expand the original issue scope.
   - If CodeRabbit CLI or autofix cannot run, finds nothing relevant, or has no PR to attach to, note that briefly.

7. Recommend the next smallest action.
   - If verdict is `Ready for PR`, ask whether the user wants to run Merge It to open the PR and continue the lifecycle.
   - If verdict is `Ready to Close` because an open PR is ready for merge, ask whether the user wants to merge the PR and close/confirm the issue.
   - If verdict is `Ready to Close` with no merge needed, ask whether the user wants to close or confirm closure of the issue.
   - If verdict is `Not Ready`, `Incomplete`, or `Regressed`, ask whether the user wants you to implement the smallest fix that satisfies the original issue.
   - If verdict is `Needs Info` because human or external action is required, ask whether the user wants concise instructions for the required actions.
   - If ready or complete, recommend the next lifecycle action only.
   - If not ready, incomplete, or regressed, recommend the smallest fix that satisfies the original issue.
   - Put nearby improvements in `Out of Scope`.

## Output

Use this shape unless the user asks otherwise:

```markdown
**Issue**
Issue #<number>: <title>
<url>

**Why**
- <requirement/evidence summary, including the active issue plan when one was used>

**Evidence Checked**
- <files, tests, PRs, issue body, BDD completion scenarios, active issue plan, comments, commands, or docs reviewed>

**Current Gaps**
- <implementation gaps against the original issue, or "None">

**Lifecycle Notes**
- <commit/PR/CI/review/merge/close state when relevant, or omit>

**Out of Scope**
- <nearby improvements intentionally excluded, or "None">

**Verification Notes**
- <commands run, results, and any checks not run>

**Verdict**
<Ready for PR | Ready to Close | Not Ready | Complete | Incomplete | Regressed | Needs Info>

**Minimal Next Action**
<Smallest next action as a plain sentence. For Ready for PR, use: "Open a PR from <branch> to <base>." when branch and base are known.>

**Follow-Up Prompt**
<Ask exactly one concise question matching the verdict. For Ready for PR, use: "Do you want me to run Merge It to open the PR and continue the lifecycle?">
```

Keep the answer concise. Lead with the verdict and evidence, not a broad implementation plan.
The final three sections must be exactly `Verdict`, then `Minimal Next Action`, then `Follow-Up Prompt`, with no sections, notes, directives, or extra prose after `Follow-Up Prompt`.
Do not call `request_user_input` for this checkpoint. End with the textual `Follow-Up Prompt` and rely on affirmative follow-up routing for `y`, `yes`, `ok`, `continue`, and similar short approvals.
When the user later answers `y`, `yes`, `ok`, `continue`, or another affirmative short reply to a follow-up that names another skill, invoke that skill directly and continue the lifecycle; do not ask the user to repeat the skill name.

## Related commands

Issue body/scope fixes: `issues refine|narrow|widen|critique`. PR description and checks: `pulls refine|status|critique`. Full merge lifecycle: `merge-it`.
