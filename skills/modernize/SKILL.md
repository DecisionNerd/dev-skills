---
name: modernize
description: Assess and update an old PR against its current base and architecture. Use when the user says modernize, rebase this PR, or bring an old branch up to date; recommend rework or closure when a rebase would preserve obsolete behavior.
---

# Modernize

Reassess the old PR's goal against today's code before updating its branch.
A conflict-free rebase is not evidence that the design still belongs.

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: acceptance criteria (existing issue AC, BDD scenarios, tests, or contract; otherwise propose them and where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on unverified work.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope, unless the user's request already named that exact action. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it; T3 Code: the `question` tool) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each result before consolidating. Use Claude Code's `Workflow` tool only when orchestrating many subagents truly needs it; it is expensive. T3 Code: its delegated subagents — with optional worktree isolation for independent verification — cover this without the `Workflow` tool.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents, follow it and do not pass a model. Otherwise pick a tier per child: mechanical search or inventory → fast/cheap; implementation and evidence gathering → mid; planning, review, adversarial verification → top. Tier names differ per harness (Claude Code: `haiku` / `sonnet` / `opus` or `fable`; T3 Code: inherit by default or pick from its live provider/model catalog). Set the choice with the harness's spawn `model` param or agent frontmatter `model:` (per-harness details: `skills/agents/references/sub.md`). Where the harness cannot choose, children inherit or the harness picks; say which in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).

## When to use

- `modernize <PR|branch>`
- Bring an old PR up to date, rebase it, or assess whether it remains useful.

Assessment-only requests stop at a recommendation. A request to update/rebase
includes the scoped branch update, subject to repository history-rewrite policy.
It does not include merging, changing the PR base, closing the PR, or expanding
the feature.

## Instructions

### 1. Pin intent and state

Read repository instructions and the PR's title, body, linked issues, reviews,
commits, and full diff. Record the URL, state, author, head repository/branch/SHA,
actual base repository/branch/SHA, checks, and review state. For a local branch,
resolve its intended base from repository guidance or the user's request.

Inspect dirty work, attached worktrees, and active ownership. Preserve them and
use an owned isolated checkout when needed. Never update another active writer's
branch without a handoff. Fetch the actual base and head, including a fork's head
remote when applicable; do not assume `origin/main`. Record the original head and
merge base so the old PR and intervening base changes remain distinguishable.
Retain the original head locally for comparison and recovery before rebasing.

### 2. Check conceptual compatibility

Inspect base changes since divergence, callers, schemas/APIs, moved or removed
code, and open/merged work likely to supersede the PR. Verify the original failure
where practical. Ask whether the PR would duplicate a current mechanism,
reintroduce retired behavior, or violate a newer invariant. Judge the intended
benefit against current architecture; age and sunk effort prove neither value
nor obsolescence.

Choose before rebasing or pushing:

| Disposition | Evidence and action |
| --- | --- |
| **MODERNIZE** | Goal still useful; implementation fits. Update, verify, and push when requested. |
| **REWORK** | Goal still useful; design no longer fits. Explain the smallest coherent replacement; implement only if the user's scope includes rework. |
| **CLOSE** | Goal already solved, superseded, or no longer justified. Cite evidence; recommend closure without closing unless explicitly authorized. |

An assessment-only request stops here. For REWORK/CLOSE, do not mechanically
rebase an obsolete implementation to make its CI green.

### 3. Update without losing intent

For MODERNIZE, rebase the owned continuation onto the freshly fetched actual
base, unless repository policy prescribes merging the base instead. Resolve
conflicts using both the original goal and current invariants. If a conflict
reveals an unresolved product/design choice, reconsider the disposition before
pushing.

Use `git range-diff` on the recorded old and new commit ranges for a rebase,
then inspect the final base-to-head diff and relevant callers. Explain dropped
commits that were already applied upstream; do not silently drop intended
behavior. For a merge update, inspect its resolutions and resulting diff.
Run focused repository checks and separate change failures from pre-existing
or infrastructure failures.

### 4. Publish only to the intended branch

Confirm the push target's repository and branch, especially for forks or takeover
continuations. When rewriting a remote PR branch is authorized, use an explicit
lease pinned to the remote head observed before the update:

`git push --force-with-lease=refs/heads/<branch>:<observed-head-sha> <head-remote> HEAD:refs/heads/<branch>`

Never use an unqualified force push or refresh the lease just to get past a
rejection. If the remote head moved, fetch, inspect, and reconcile the new work.
If the base moved materially during verification, reassess and rerun affected
checks. Normal fast-forward updates use a normal push.

In T3 Code, immediately link any PR pushed to with `link_pull_request` as the
next tool call, including stack layers, and report linking failures.
Re-read the PR after pushing, when one exists, and report the actual head and check state.
Do not claim the previous head's green CI covers the new head. Do not merge or
post a comment unless that action was requested. If an authorized comment is
needed, use concise attribution, evidence, and a secret/private-data check.

## Output

Lead with MODERNIZE, REWORK, or CLOSE and the reason. Include base changes,
conceptual conflicts, old/new heads, update/push status, check evidence, and the
remaining action with the PR link. State anything that could not be verified.

## Source

Adapted from [Theo Browne's modernize skill](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/modernize/SKILL.md)
(MIT). Upstream notice: [LICENSE](LICENSE).
