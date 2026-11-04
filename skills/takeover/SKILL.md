---
name: takeover
description: Take over an existing PR, branch, or agent thread while preserving contributor credit and unrelated work. Use when the user says takeover, take over this work, or continue another agent's implementation.
---

# Takeover

Finish the original goal from inherited work while preserving ownership,
contributor credit, and newer changes.

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

- `takeover <PR|branch|agent-thread>`
- Continue another agent's implementation or accept an explicit handoff.

A takeover does not itself authorize merging, closing the source PR, deleting
branches, or replacing another active agent's checkout.

## Instructions

### 1. Reconstruct the handoff

Read the source PR or thread, linked issues, reviews, commits, and later user
corrections. In T3 Code, read a named thread with `t3_thread_read` before relying
on its contents; use its returned link when referring to it.

Resolve the actual repository, base, source head SHA, branch/worktree ownership,
and uncommitted work. State the original goal, the inherited state, and the
requested finish line: local implementation, updated PR, ready for human merge,
or merged work. Treat prior summaries and green checks as leads to verify.

### 2. Establish write ownership

Inspect worktree attachment and activity before writing. Never take over an
active agent's branch or worktree without an explicit handoff. Preserve dirty
and unrelated work; do not reset, stash, or move it to make the checkout usable.
Use an owned continuation branch/worktree when safe ownership cannot be
established, following the harness's worktree rules.

For a replacement PR, carry forward the original commits with authorship intact
and add fixes separately. Respect an explicitly requested in-place or stacked
continuation. Do not open a duplicate PR or mutate the source PR merely because
a local continuation exists.

### 3. Reassess and finish the same goal

Compare the source work with its freshly fetched intended base. Check whether
the original failure still reproduces and whether newer work already solves it.
If `modernize` is installed, use it for this assessment with the continuation
branch as the write target; do not let it update the source branch inadvertently.
Otherwise inspect base changes, conceptual conflicts, and the final diff directly.

Preserve intended behavior while replacing stale implementation choices. Fix
accepted defects and review findings within the original goal. If the goal is
already satisfied, report the evidence without creating redundant changes.
Run focused checks and realistic workflow verification appropriate to the change;
distinguish fixtures, local results, CI, and live behavior.

Before any source-branch update or replacement PR, re-read the source PR/head and
account for new commits or corrections. Reconcile concurrent work instead of
overwriting it. A stale handoff never authorizes a stale-head push.

### 4. Preserve credit and deliver

Keep existing author identities and co-author trailers. Credit contributors and
link the source PR in a continuation PR's description. When squash merging is
authorized, preserve human author/co-author credit in the merge commit using
identities verified from commits or contributor records; do not guess emails.
Model attribution does not replace contributor credit.

In T3 Code, link each PR taken over, created, or pushed to with
`link_pull_request` as the next tool call once the action/PR is resolved. Include
every stack layer and report linking failures.

Use available delivery skills for the requested finish line: `pulls create`
for a PR, `pulls watch` for monitoring, `merge-it prepare` for human merge, or
`merge-it` for an authorized merge. Missing companion skills are not a blocker:
perform the same scoped checks and handoff directly. Keep a ready-only request
ready-only through every handoff. Creating a PR alone is not a monitoring result.
For a ready-only delivery without companion skills, inspect and disable this
PR's unattended merging under that request, or report a blocker before pushing.
Verify checks/reviews on the final head and hand back the open PR. If no supported
wait mechanism exists, report that limitation rather than claim ongoing monitoring.

Do not close the source PR, merge, force-push, or delete inherited work without
authorization for that action. Preserve branch protection and repository policy.

## Output

Report the source link/head, inherited and changed work, proof, how credit was
preserved, the continuation PR/head when present, and remaining decisions.
Distinguish completed work from claims inherited but not independently verified.

## Source

Adapted from [Theo Browne's takeover skill](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/takeover/SKILL.md)
(MIT). Upstream notice: [LICENSE](LICENSE).
