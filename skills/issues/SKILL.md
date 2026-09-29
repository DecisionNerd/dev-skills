---
name: issues
description: "Work GitHub issues with command arguments: create/draft, update, critique, narrow, widen, merge, clean, refine, explain, document, close, reopen, search, and status. Default with only an issue identifier (and optional details) is execute completion work — plan/diagnose/implement/test/ready-check/merge — not issue-admin. Explicit commands still do admin. Rough idea with no identifier defaults to `create`. Use when the user asks about issues, `/issues <command|#n|url|idea>`, drafting or improving an issue, or finishing tracked work."
argument-hint: "[command|#n|url|idea...]"
---

# Issues

Command-driven GitHub issue skill. Parse the first token as a command when it matches the table below; otherwise map clear intent.

**Default:** if the user gives only an issue identifier (`#42`, `42`, URL) and optional details (context, constraints, “fix the flaky test”) — **no admin command** — execute **Complete the work**. Do not ask which admin command to run. Do not stop at `status`/`critique`/`refine`.

Admin commands shape the issue when explicitly requested; they are not the default path.

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: the acceptance criteria (existing issue AC, BDD scenarios, tests, or contract when they exist; otherwise propose them and say where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on work you did not verify.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope, unless the user's request already named that exact action. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and for independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each child's result before consolidating. Use Claude Code's `Workflow` tool only for orchestration across many subagents that truly needs it; it is expensive.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents (Claude Code `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule; Codex `agents.default_subagent_model` or a role's `agents.<name>.config_file`; Cursor a custom subagent's `model:` frontmatter), follow it and do not pass a model. Otherwise: mechanical search or inventory → fast/cheap (Claude Code `haiku`); implementation and evidence gathering → mid (`sonnet`); planning, review, adversarial verification → top (`opus` or `fable`). In Claude Code set it with the `Agent` tool `model` param or agent frontmatter `model:`; in Codex pass a spawn model or set `model` in the role's config file; in Cursor set `model:` (default `inherit`) in `.cursor/agents/*.md`. Where the harness cannot choose, children inherit the parent model or the harness picks one (Cursor's built-in Explore/Bash/Browser subagents pick per subtask); say which in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).

## Commands

| Command | What it does |
| --- | --- |
| `create` / `draft` | New issue from a rough idea (duplicate check, questions, draft, approve) |
| `update` | Improve an existing issue body/title/metadata with approval |
| `critique` | Honest quality critique (clarity, scope, AC, BDD, risks, docs) |
| `narrow` | Shrink scope; move extras to Non-Goals / follow-ups |
| `widen` | Expand scope deliberately with rationale and still-bounded AC |
| `merge` | Combine overlapping issues into one canonical issue (close/redirect others) |
| `clean` | Remove noise, stale text, broken checklists, formatting cruft |
| `refine` | Sharpen wording and structure without changing agreed scope |
| `explain` | Plain-language explanation for the user (not a GitHub edit) |
| `document` | Improve or add **repo** docs that the issue needs (then link from the issue) |
| `close` | Close with evidence-based rationale (and comment when useful) |
| `reopen` | Reopen with reason |
| `search` / `dup` | Duplicate/related issue search only |
| `status` | Summarize state, labels, milestone, linked PRs, blockers |
| `help` / `library` | List commands |

Target: issue number (`123`, `#123`), URL, title search, or free-text idea (for `create`).

## Routing

1. **No argument**: ask via the structured question tool — options: complete an issue (needs `#N`) / `create` / `status` / `help`.
2. **First word is a command**: run that command; remainder is the target/context. After admin work, state `Next: issues #N` and run it when the user signaled progress.
3. **Clear admin intent without command word** (“narrow #42”, “explain this issue”, “draft an issue for…”): map to that command and proceed.
4. **Issue identifier ± details, no admin command** (`#42`, `42`, URL, or `#42 focus on the API path`): **Complete the work** — execute, don’t menu.
5. **Rough idea / bug / feature with no identifier and no command**: `create`.

Before mutating GitHub (create/update/close/reopen/merge redirects), state the proposed change; ask one structured question with options `<do it> / revise / stop`. Skip when the user’s request already named that exact action. Implementation and other completion handoffs follow the target skill’s approval rules.

## Shared operations

Use [references/ops.md](references/ops.md) for `critique`, `narrow`, `widen`, `merge`, `clean`, `refine`, `explain`, and `document`.

## Create / draft

For `create` or `draft`, follow [references/create.md](references/create.md) end-to-end (disposition → questions → draft → approval → `gh issue create` / update).

## Complete the work

Issue admin (`create` / `critique` / `refine` / `narrow` / …) tracks intent. Completing the work means planning, diagnosing, implementing, proving, and shipping.

### Planning and workspace rules

Planning is a read-only phase, not a requirement for a host-specific mode or tool. If native Plan Mode is unavailable, inspect and produce the plan in the current agent. Respect active host restrictions; do not invent a mode-switch tool or stop merely because one is absent. A completion request already authorizes in-scope planning and implementation when the host permits them; a planning-only request does not.

Before the first repository write, read and follow [references/workspace.md](references/workspace.md). **Use a dedicated task worktree by default, with one writer per worktree.** Reuse a host-created task worktree only after verifying ownership. Apply this to docs and tests as well as code; read-only planning and GitHub-only admin do not need a worktree. Carry the absolute worktree path, branch, base, and ownership through every execution-skill handoff.

### Default path (identifier ± details)

When routed here (no admin command):

State the issue's AC and BDD completion scenarios as the finish line before picking an execution skill. For multi-issue or multi-area work, fan out one subagent per non-overlapping path set (mid tier) and keep `TASKS.md` for chains longer than five steps.

1. Resolve the issue (`gh issue view`); skim linked PRs, milestone, labels.
2. Fold any user details into scope (constraints, focus area, “don’t touch X”).
3. Resolve repository policy and inspect existing worktrees/PRs. Before implementation, establish the owned workspace using the rules above; plan-only work remains read-only.
4. Pick the **smallest next execution skill** from the table and **run it now** (invoke that skill / continue the work). One-line why is enough — do not present a recommend-only menu.
5. Chain forward as each step unblocks (e.g. `recon issue` → implement → `check-readiness` → `merge-it`) until a real blocker (an outside-repo approval, missing info) or the user stops you.
6. If the issue body is too vague to execute safely, do the minimum shaping (`refine` questions or a tight `recon issue` plan), then continue execution — don’t end on admin alone.

### After explicit admin commands

After `status`, `critique`, `explain`, `create`/`draft` (once the issue exists), state `Next: issues #N` (or the skill from the table that best fits the current state); run it when the user already signaled progress (“ship it”, “finish this”, or details that imply do-the-work).

| Situation | Execute |
| --- | --- |
| Needs implementation plan | `recon issue #N` (then implement from the plan) |
| Live UI / product broken | `troubleshoot-app` (diagnoses and fixes in-repo) |
| Backend / API / algo bug | `diagnose-bug` (diagnoses and fixes in-repo) |
| Repair plan from diagnosis | `fix-it` |
| Need tests / BDD evidence | `test-it` |
| Need logs/metrics/traces | `observe-it` |
| Repo docs gap (not just issue body) | `document-it` |
| Options before building | `research-it` |
| Scope satisfied? Pre-PR / close | `check-readiness` |
| Open PR / CI / merge / close issue | `merge-it` (or `pulls` when merge-only) |
| Milestone membership / release slice | then return to critical-path issue execution |
| Unsure / lost | `recon` (no args) or `idk-now` |

Do **not** default to `issues refine|critique|narrow|status` when an identifier was given. Prefer execute (`recon issue` / diagnose / fix / implement / `merge-it`) over more issue editing.

## Update / close / reopen / search / status

- Resolve the issue with `gh issue view` / search; read `AGENTS.md` for repo conventions.
- `update`: propose a diff of sections; apply only after approval (`gh issue edit` or comment).
- `close` / `reopen`: state why; comment when it preserves decision history.
- `search` / `dup`: classify Duplicate / Related / No Match; prefer update-over-create.
- `status`: short factual summary; state `Next: issues #N` (run it when the user asked to finish/ship).

## Output

## Blocked on me

none

## Changed

nothing

## Found

Next: issues #N (or the execution skill that best fits the current state)

## Related skills

See **Complete the work**. Deep plan: `recon issue`. Gate: `check-readiness`. Land: `merge-it` / `pulls`. Organize: `milestones`.

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

GitHub Issues as tracked intent — bug-council list (`handbook/concepts/12-bugs-and-debt.md`) plus lightweight BDD completion scenarios on the quality trace (`13-quality-trace.md`). Narrow scope = small batches (DORA). Label debt type; map scenarios to evidence.

Handbook card: `handbook/practices/issues.md`.
