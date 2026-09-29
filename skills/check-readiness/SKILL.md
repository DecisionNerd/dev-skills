---
name: check-readiness
description: Review whether a GitHub issue is complete enough for its current stage and decide the next PR or closure action. Use before PR, before closing an issue, after merge, or when auditing a closed issue for regressions or missing scope. For pre-PR checks, use CodeRabbit CLI review; when an open PR exists and corrective review work is needed, use autofix.
---

# Check Readiness

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

## Goal

Decide whether the original issue scope is satisfied in the current project state, without adding new scope. Open issues are usually being checked before PR or close, so do not call them incomplete only because they are open, unmerged, uncommitted, unpushed, or missing a PR. Treat those as lifecycle notes.

Use lightweight BDD completion scenarios when they exist in the issue body, active plan, PR body, or relevant comments. Treat these Given/When/Then scenarios as readable completion contracts and verify their evidence mapping. Do not require Cucumber, `.feature` files, or a separate BDD framework unless the repository already uses one or the active plan explicitly requires it.

**When NOT:** exploring “what should we build?”, inventing new scope, or coaching a lost user → `recon` / `idk-now` / `issues create`. This skill gates evidence against *existing* scope.

## Input

Accept an explicit issue number, task number, or GitHub issue URL. If none is provided, infer one from the strongest local or GitHub evidence: current branch, recent commits, staged/unstaged changes, PR metadata, linked issue references, recent issue activity, or local notes. Ask only when no single issue is clearly supported.

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
   - If branch policy remains genuinely ambiguous after checking repo-local docs and branch existence, use `Needs Info` and ask for the base-branch decision with a structured question listing the candidate base branches (e.g. `main / staging / <other>`). Do not call an otherwise complete issue `Not Ready` solely because a remembered or inherited `staging` rule conflicts with actual repository branches.
   - Record the selected base and any policy conflict in `Lifecycle Notes`.

4. Compare scope to evidence.
   - Read only the relevant code, docs, tests, configuration, Git history, PRs, and issue comments.
   - Compare the current project state against both the issue body's explicit requirements and acceptance criteria and, when present, the active issue plan's in-scope obligations.
   - Compare every active BDD completion scenario against current evidence. A scenario can be satisfied by automated tests, focused manual verification, documentation-only proof, PR/issue evidence, or an explicit rationale that the scenario is no longer in scope.
   - When BDD scenarios have a testing or evidence map, verify that the named tests, commands, files, docs, or manual evidence actually exist or were run. If the map is missing, infer the smallest reasonable evidence check from repository patterns.
   - Treat plan obligations such as tests, documentation, security/privacy review, observability, migrations, rollout notes, or compatibility work as readiness criteria when they are part of the active plan for satisfying the original issue.
   - Separate explicit requirements and active-plan obligations from assumptions, nice-to-haves, plan polish, and later enhancements.
   - Run focused verification when it materially supports the verdict.
   - For more than ~3 scenarios or a post-close audit, fan out one verifier subagent per scenario group (top tier for adversarial verification); each returns evidence location and repro; report only gaps that block the verdict, each with file:location.

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

7. Take the next smallest action per verdict.
   - Ready for PR → state `Next: merge-it`. Run merge-it immediately when invoked from a completion chain (issues/pulls/milestones default path, or the user asked to land/ship); otherwise state it as the next step.
   - Ready to Close → same routing through merge-it or close per repo policy.
   - Not Ready / Incomplete / Regressed → implement the smallest in-scope fix now when the request was an outcome; when the request was the verdict only, report the gap and state `Next: fix-it`.
   - Needs Info → give the instructions directly.
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

**Blocked on me**
<The one genuine question or blocker, else "none">

**Changed**
<Files, commits, GitHub objects touched, else "nothing">

**Found**
<Evidence, verdict, and `Next: <exact invoke>`>
```

Keep the answer concise. Lead with the verdict and evidence, not a broad implementation plan.
The final sections must end with `Verdict`, then `Minimal Next Action`, then the three closing headings `Blocked on me` / `Changed` / `Found`, with no extra prose after `Found`.

## Related commands

Issue body/scope fixes: `issues refine|narrow|widen|critique`. PR description and checks: `pulls refine|status|critique`. Full merge lifecycle: `merge-it`.

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Definition of Done = quality trace (`handbook/concepts/13-quality-trace.md`): DocSlime contracts + BDD scenario→evidence maps, regime-specific (`11-quality-regimes.md`). DORA CI / protected branches gate integrate. Missing Cucumber is fine; missing scenarios without evidence is not.

Handbook card: `handbook/practices/check-readiness.md`.
