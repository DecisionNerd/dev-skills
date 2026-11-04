---
name: pulls
description: "Work GitHub PRs with create/open, update, critique, scope, review, status/checks, watch/monitor, babysit, merge, and close commands. Use when the user asks about PRs or invokes pulls. Watch observes; babysit fixes verified failures and waits without merging. A bare PR identifier or no args on a current-branch PR defaults to Integrate completion via merge-it; explicit commands and ready-for-human-merge requests keep their own finish line. Stage/Ship run only when requested."
argument-hint: "[command|#n|url|branch...]"
---

# Pulls

Command-driven GitHub pull request skill. Parse the first token as a command when it matches the table; otherwise map clear intent.

**Default:** if the user gives only a PR identifier (`#12`, `12`, URL, branch) and optional details — **no explicit command or finish-line restriction** — execute **Complete the work**. Same when invoked with no args and a PR matches the current branch. Do not ask which admin command to run. Explicit watch, babysit, and ready-for-human-merge requests override this default.

Admin commands shape the PR when explicitly requested; they are not the default path.

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

## Commands

| Command | What it does |
| --- | --- |
| `create` / `open` | Open a PR for the current (or named) branch after draft + approval |
| `update` | Edit title/body/base; refresh checklist from template |
| `critique` | Critique PR quality (scope, description, tests, risk, reviewability) |
| `narrow` | Reduce PR scope (split out commits/files into follow-ups) |
| `widen` | Intentionally expand PR only with clear rationale (usually discourage) |
| `merge` | Merge the PR (squash when repo practice); hand off to `merge-it` when review/autofix/CI/issue-close are needed |
| `clean` | Clean description, checklist noise, stale review threads summary |
| `refine` | Improve title/body/test plan without changing code scope |
| `explain` | Explain the PR’s changes to the user in plain language |
| `document` | Improve/add repo docs required by the PR; link from the PR body |
| `review` | Structured review summary (findings by severity); does not pretend to be CodeRabbit |
| `status` / `checks` | CI, reviews, mergeability, deploy/preview status |
| `watch` / `monitor` | Observe CI and reviews; report failures or readiness without editing or merging |
| `babysit` | Fix verified in-scope failures, update the owned PR branch, and monitor to readiness; no merge |
| `close` | Close without merging (with reason) |
| `ready` | Mark ready for review / convert from draft when appropriate |
| `help` / `library` | List commands |

Target: PR number, URL, branch name, or “current branch”.

## Routing

1. **Honor restrictions first:** “do not merge” is a constraint, not permission to start repairs. Preserve it through every mode. Ordinary stop/cancel instructions stop the work; “full stop” alone is not a delivery trigger.
2. **Explicit monitoring:** watch/monitor observes; babysit also fixes verified failures. “Watch this, do not merge” stays observation-only. If the user explicitly asks to monitor AND merge, use `merge-it` Merge mode unless a no-merge restriction applies.
3. **Ready-only completion:** “prepare for my merge”, “ready for human merge”, or a completion request restricted by “do not merge” routes to `merge-it prepare`. A bare restriction changes the active task's boundary without inventing new work.
4. **Explicit command/clear intent:** run it (“open a PR”, “explain this PR”, “narrow this PR”). After admin work, state the next action; execute a merge handoff only when merging was requested and no ready-only restriction applies.
5. **No argument:** if a PR matches the current branch → **Complete the work** within the active finish line. Else ask via the structured question tool — options: `create` a PR for this branch / name a PR number or branch / `help`.
6. **PR identifier ± details, no explicit restriction** (`#12`, URL, branch, or `#12 fix the flaky check`): **Complete the work** — execute, don’t menu.

Before mutating GitHub (create/edit/merge/close), state the proposed action; ask one structured question with options `<do it> / revise / stop`. Skip when the user’s request already named that exact action. Prefer squash merge when that is repo practice (see `merge-it`). Completion handoffs follow the target skill’s approval rules.

## Shared operations

Use [references/ops.md](references/ops.md) for critique/narrow/widen/merge/clean/refine/explain/document as applied to PRs.
It also owns writing guidance for PR descriptions and authorized comments.

## Complete the work

PR admin (`create` / `critique` / `refine` / `narrow` / …) shapes the review unit. Completing the work means fixing what’s broken, proving it, landing it, and closing linked issues.

### Default path (identifier ± details, or no-arg with current-branch PR)

When routed here (no admin command):

1. Resolve the PR (`gh pr view` + checks + reviews); note linked issues.
2. Fold any user details into focus (e.g. “only CI”, “address review threads”).
3. Pick the **smallest next execution skill** from the table and **run it now**. One-line why — no recommend-only menu.
4. Chain forward (usually toward `merge-it`) to the requested finish line, blocked on approval, or until the user stops you. A later ready-only restriction revokes the merge handoff.
5. If the PR is missing and the branch has shippable work, `create`/`open` then continue completion (often `merge-it`).

### After explicit admin commands

After `status`/`checks`, `critique`, `explain`, `review`, `create`/`open`, state the next action; run it when the user's requested finish includes it. Preserve ready-only restrictions. Watch/monitor and babysit finish with their own verdict and never fall through to merging.

| Situation | Execute |
| --- | --- |
| Failing checks / review comments / need autofix→merge→close | `merge-it` |
| Linked issue not done / gaps vs AC | `check-readiness` then implement or `fix-it` |
| Bug still open in the diff | `diagnose-bug` / `troubleshoot-app` → `fix-it` |
| Missing tests / evidence | `test-it` |
| Missing observability | `observe-it` |
| Missing repo docs | `document-it` (or `pulls document`) |
| PR too large / mixed purpose | `pulls narrow`, then continue landing the remnant |
| Ready to merge (policy already green) | `merge-it` or `pulls merge` |
| Landed on staging; production next | Recommend `merge-it` (Ship phase) as a follow-up; run it only when the user requests production promotion |
| Unsure | `recon` (no args) |

Do **not** default to `pulls refine|critique|clean|status` when a PR identifier (or current-branch PR) was given. Prefer execute (`merge-it` / `fix-it` / `check-readiness`).

## Create / open

1. Read `AGENTS.md` / PR template / branch policy (feature→`main` vs feature→`staging`).
2. Inspect `git status`, diff vs base, linked issues.
3. Check whether the branch already has a PR. Draft a problem-led title/body following the writing guidance in `references/ops.md`; include validation, material risk, and issue links/closing keywords when appropriate.
4. Approve → `gh pr create` (no `--json` on create if unsupported; view afterward).
5. Continue into **Complete the work** — usually `merge-it` — unless the user only asked to open.

## merge vs merge-it

- `pulls merge`: merge when checks/reviews already satisfy policy, or user insists on merge-only.
- If actionable review comments, failing checks, or issue closure verification are needed, invoke **`merge-it`** instead of reinventing that lifecycle.

## review / status

- `review`: read the diff; report only merge-blocking findings, each with file:line and a repro; label non-blocking findings as such. Use an independent reviewer subagent (top tier) when the diff exceeds a few hundred lines. On default completion routing, proceed into `fix-it` / `merge-it` for blocking findings. After an explicit `review` command, state `Next: fix-it` or `Next: merge-it` as appropriate.
- `status` / `checks`: `gh pr checks`, review decision, mergeStateStatus, preview URLs when present. After an explicit `status` command, state `Next: merge-it` (or `fix-it`). On default routing, skip standalone status and go straight to completion.

## watch / monitor / babysit

Follow [references/monitor.md](references/monitor.md). Watch/monitor observes and
reports; babysit also repairs verified in-scope failures and updates the owned
branch. Neither authorizes merging. Use the repository's actual base and gates,
retain unresolved feedback across pushes, and verify the current head before
calling the PR ready. In T3 Code, the owning parent uses one PR watcher and
unwatches before handoff; children never watch. Elsewhere report any limits of
the available wait mechanism.

For ready-only completion, use `merge-it prepare` when installed. Without that
companion skill, perform only the requested repairs and focused checks, prevent
unattended merging for this PR (disable auto-merge/remove queue entry under the
ready-only request, or report a blocker), and use the monitoring guidance above.
Hand back the open PR with current-head evidence and readiness/approval/blocker
status. Do not run merge, post-merge deployment, or issue-closure work.

## Source

Monitoring and writing guidance adapted from Theo Browne's
[`babysit-pr`](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/babysit-pr/SKILL.md),
[`file-pr`](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/file-pr/SKILL.md),
and [`leaving-pr-comments`](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/leaving-pr-comments/SKILL.md)
(MIT). Upstream notice: [LICENSE](LICENSE).

## Output

## Blocked on me

none

## Changed

nothing

## Found

State the verdict and exact next action consistent with the active mode. For a
watch/babysit handoff, give readiness or the blocker without starting a merge.
For ready-only completion, keep `merge-it prepare`; never substitute Merge mode.

## Related skills

See **Complete the work**. Full release path (Integrate/Stage/Ship): `merge-it`. Gate: `check-readiness`. Issues: `issues`.

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

PRs as the review unit (GitHub Docs); small reviewable changes (Google eng practices); required checks gate trunk (DORA trunk-based).

Handbook card: `handbook/practices/pulls.md`.
