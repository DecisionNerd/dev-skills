---
name: council
description: Convene independent reviews from three model providers and reconcile their findings. Use when the user says council, asks for a multi-model review, or wants several providers to challenge a plan or implementation.
---

# Council

Get independent judgments on a question, plan, or implementation, then resolve the
findings against evidence. The parent owns the decision and any changes.

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

- `council <question|plan|path|PR>`
- A request for independent feedback from multiple model providers.
- A consequential decision or implementation that the user wants challenged.

Use `agents sub` for general delegated execution; council is a review workflow.

## Instructions

### 1. Frame and prepare

Identify the target, acceptance criteria, constraints, and whether the request is
review-only or includes fixes. Use the active task as context when the target is
clear; ask only if ambiguity would change what gets reviewed.

For an implementation audit, inspect outstanding PR feedback, known defects, and
relevant checks first. When fixes are in scope, address known issues before
requesting reviews. For review-only requests, report them without editing.
Skip repairs to an implementation the user explicitly wants to replace.

Give every reviewer the same current artifact: commit SHA and local diff for code,
or the exact plan/document version for a decision. Include relevant check results
and failures. Do not expose credentials or private material to another provider
unless that use is authorized.

### 2. Select the council

Use three strong models, one from each of three different providers, at high
reasoning effort where supported. Resolve current model IDs from the harness's
live catalog rather than hard-coding versions. Honor user-named members and
configured routing restrictions.

In T3 Code, call `orchestrator_capabilities` once before the first delegation.
Use `delegate_task` for cross-provider members. Select the provider/model according
to the live tool schema and put settings in `target.options`. Elsewhere use the
harness's supported delegation tools.

If a named member, provider, or requested setting is unavailable, explain the
specific limitation before starting reviews. Do not silently substitute models,
claim provider diversity from same-provider agents, or bypass routing restrictions.
Offer a reduced council only as an explicit user choice.

### 3. Request independent reviews

Launch the three read-only reviews in parallel, subject to harness concurrency.
Each brief must include the goal, artifact/version, acceptance criteria, relevant
context, allowed reads, done-when, and return format. Prohibit edits, external
mutations, and further delegation. Keep first-round reviewers independent: do not
seed them with another reviewer's conclusions or the parent's preferred answer.

Ask each reviewer to return:

- Findings ranked by severity, with file/line or source evidence, impact, and a
  concrete correction; distinguish verified defects from assumptions.
- Disagreements with the proposed approach and the strongest viable alternative.
- An explicit verdict: satisfied, changes needed, or unable to assess.
- For code reviews, a score out of 10 with a short rationale.

Follow the harness's completion/wait instructions. A failed, missing, or
unassessable review is incomplete evidence, never an approval.

### 4. Reconcile and re-review

Check each finding against the artifact and evidence. Deduplicate shared findings;
accept or reject recommendations with reasons. Agreement and scores do not replace
tests or prove correctness. Preserve substantive dissent rather than forcing a
vote or manufacturing consensus.

For review-only requests, finish with findings and recommendations after one round,
unless the user requested iterative review. When changes are authorized, the
parent fixes accepted issues and runs the relevant checks. Send the updated
artifact, changes, and dispositions to a fresh review by each council member.
In T3 Code each re-check is a new `delegate_task`, never a message to the old child.

Count each full council pass as one round; retain partial passes as incomplete.
Track the artifact reviewed and each member's verdict and score per round.
Record an omitted score as `no score`; never invent or infer one.

Finish when all members are satisfied with the current artifact and required
checks pass. A score alone is not satisfaction. Default to at most three rounds
unless the user sets another budget. Stop earlier if reviews stall, repeat
unsupported objections, require out-of-scope work, or cannot complete. Report the
remaining disagreement or blocker and the exact next action; do not call that
consensus. Do not expand scope just to raise scores. Cancel outstanding work
that is no longer needed.

### 5. Report

Summarize the decision, accepted/rejected findings with reasons, changes and checks,
remaining dissent, rounds, and actual provider/model identities. For code review,
include the score history:

| Provider / model | Round 1 | Round 2 |
| --- | --- | --- |
| <actual member> | <score or no score> | <score or no score> |

Use only columns for rounds actually run, and mark missing reviews `incomplete`.
For plans or questions, report verdicts instead of scores.

If PR creation or editing is already authorized, put these results in a
`## Council review` section of the PR description, updating it rather than posting
a separate comment. Otherwise include the results in the final reply.
A satisfied council does not authorize a merge, deployment, or scope expansion.

## Source

Adapted from [Theo Browne's council skill](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/council/SKILL.md)
in `t3dotgg/tstack` (MIT). Upstream notice: [LICENSE](LICENSE).

