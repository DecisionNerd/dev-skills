---
name: pulls
description: "Work GitHub pull requests with command arguments: create/open, update, critique, narrow, widen, merge, clean, refine, explain, document, review, status/checks, and close. Default with only a PR identifier (and optional details) is execute completion work — fix, test, ready-check, autofix→merge, stage/ship where repo policy has them — not PR-admin. Explicit commands still do admin. No-arg defaults to completing the current-branch PR when one exists. Use when the user asks about PRs, `/pulls <command|#n|url|branch>`, or finishing a change set. For full autofix→CI→merge→issue-close, prefer merge-it (default completion often hands off to it)."
argument-hint: "[command|#n|url|branch...]"
---

# Pulls

Command-driven GitHub pull request skill. Parse the first token as a command when it matches the table; otherwise map clear intent.

**Default:** if the user gives only a PR identifier (`#12`, `12`, URL, branch) and optional details — **no admin command** — execute **Complete the work**. Same when invoked with no args and a PR matches the current branch. Do not ask which admin command to run. Do not stop at `status`/`critique`/`refine`.

Admin commands shape the PR when explicitly requested; they are not the default path.

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: the acceptance criteria (existing issue AC, BDD scenarios, tests, or contract when they exist; otherwise propose them and say where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on work you did not verify.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope, unless the user's request already named that exact action. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and for independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each child's result before consolidating. Use Claude Code's `Workflow` tool only for orchestration across many subagents that truly needs it; it is expensive.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents (Claude Code `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule; Codex `agents.default_subagent_model` or a role's `agents.<name>.config_file`; Cursor a custom subagent's `model:` frontmatter), follow it and do not pass a model. Otherwise: mechanical search or inventory → fast/cheap (Claude Code `haiku`); implementation and evidence gathering → mid (`sonnet`); planning, review, adversarial verification → top (`opus` or `fable`). In Claude Code set it with the `Agent` tool `model` param or agent frontmatter `model:`; in Codex pass a spawn model or set `model` in the role's config file; in Cursor set `model:` (default `inherit`) in `.cursor/agents/*.md`. Where the harness cannot choose (e.g. Cursor's built-in Explore/Bash/Browser subagents), children inherit the parent model; say so in the status note.
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
| `close` | Close without merging (with reason) |
| `ready` | Mark ready for review / convert from draft when appropriate |
| `help` / `library` | List commands |

Target: PR number, URL, branch name, or “current branch”.

## Routing

1. **No argument**: if a PR matches the current branch → **Complete the work** on it. Else ask via the structured question tool — options: `create` a PR for this branch / name a PR number or branch / `help`.
2. **First word is a command**: run it. After admin work, state `Next: merge-it` and run it when the user signaled progress.
3. **Clear admin intent** (“open a PR”, “explain this PR”, “narrow this PR”): map and proceed.
4. **PR identifier ± details, no admin command** (`#12`, URL, branch, or `#12 fix the flaky check`): **Complete the work** — execute, don’t menu.

Before mutating GitHub (create/edit/merge/close), state the proposed action; ask one structured question with options `<do it> / revise / stop`. Skip when the user’s request already named that exact action. Prefer squash merge when that is repo practice (see `merge-it`). Completion handoffs follow the target skill’s approval rules.

## Shared operations

Use [references/ops.md](references/ops.md) for critique/narrow/widen/merge/clean/refine/explain/document as applied to PRs.

## Complete the work

PR admin (`create` / `critique` / `refine` / `narrow` / …) shapes the review unit. Completing the work means fixing what’s broken, proving it, landing it, and closing linked issues.

### Default path (identifier ± details, or no-arg with current-branch PR)

When routed here (no admin command):

1. Resolve the PR (`gh pr view` + checks + reviews); note linked issues.
2. Fold any user details into focus (e.g. “only CI”, “address review threads”).
3. Pick the **smallest next execution skill** from the table and **run it now**. One-line why — no recommend-only menu.
4. Chain forward (usually toward `merge-it`) until merged/closed, blocked on approval, or the user stops you.
5. If the PR is missing and the branch has shippable work, `create`/`open` then continue completion (often `merge-it`).

### After explicit admin commands

After `status`/`checks`, `critique`, `explain`, `review`, `create`/`open`, state `Next: merge-it` (or `fix-it` / `check-readiness` as fits); run it immediately when the user already signaled land/finish.

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
| Landed on staging; production next | `merge-it` (Ship phase) |
| Unsure | `recon` (no args) |

Do **not** default to `pulls refine|critique|clean|status` when a PR identifier (or current-branch PR) was given. Prefer execute (`merge-it` / `fix-it` / `check-readiness`).

## Create / open

1. Read `AGENTS.md` / PR template / branch policy (feature→`main` vs feature→`staging`).
2. Inspect `git status`, diff vs base, linked issues.
3. Draft title + body (summary, test plan, risk, issue links / closing keywords when appropriate).
4. Approve → `gh pr create` (no `--json` on create if unsupported; view afterward).
5. Continue into **Complete the work** — usually `merge-it` — unless the user only asked to open.

## merge vs merge-it

- `pulls merge`: merge when checks/reviews already satisfy policy, or user insists on merge-only.
- If actionable review comments, failing checks, or issue closure verification are needed, invoke **`merge-it`** instead of reinventing that lifecycle.

## review / status

- `review`: read the diff; report only merge-blocking findings, each with file:line and a repro; label non-blocking findings as such. Use an independent reviewer subagent (top tier) when the diff exceeds a few hundred lines. On default completion routing, proceed into `fix-it` / `merge-it` for blocking findings. After an explicit `review` command, state `Next: fix-it` or `Next: merge-it` as appropriate.
- `status` / `checks`: `gh pr checks`, review decision, mergeStateStatus, preview URLs when present. After an explicit `status` command, state `Next: merge-it` (or `fix-it`). On default routing, skip standalone status and go straight to completion.

## Output

## Blocked on me

none

## Changed

nothing

## Found

Next: merge-it (or the execution skill that best fits the current state)

## Related skills

See **Complete the work**. Full release path (Integrate/Stage/Ship): `merge-it`. Gate: `check-readiness`. Issues: `issues`.

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

PRs as the review unit (GitHub Docs); small reviewable changes (Google eng practices); required checks gate trunk (DORA trunk-based).

Handbook card: `handbook/practices/pulls.md`.
