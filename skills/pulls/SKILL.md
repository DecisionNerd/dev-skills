---
name: pulls
description: >
  Work GitHub pull requests with command arguments: create/open, update,
  critique, narrow, widen, merge, clean, refine, explain, document, review,
  status/checks, and close. Default with only a PR identifier (and optional
  details) is execute completion work — fix, test, ready-check, autofix→merge,
  stage/ship — not PR-admin. Explicit commands still do admin. No-arg defaults
  to completing the current-branch PR when one exists. Use when the user asks
  about PRs, `/pulls <command|#n|url|branch>`, or finishing a change set. For
  full autofix→CI→merge→issue-close, prefer merge-it (default completion often
  hands off to it).
argument-hint: "[command|#n|url|branch...]"
---

# Pulls

Command-driven GitHub pull request skill. Parse the first token as a command when it matches the table; otherwise map clear intent.

**Default:** if the user gives only a PR identifier (`#12`, `12`, URL, branch) and optional details — **no admin command** — execute **Complete the work**. Same when invoked with no args and a PR matches the current branch. Do not ask which admin command to run. Do not stop at `status`/`critique`/`refine`.

Admin commands shape the PR when explicitly requested; they are not the default path.

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

1. **No argument**: if a PR matches the current branch → **Complete the work** on it. Else ask to `create` or name a PR.
2. **First word is a command**: run it. After admin work, offer (or run) completion if the PR is still open.
3. **Clear admin intent** (“open a PR”, “explain this PR”, “narrow this PR”): map and proceed.
4. **PR identifier ± details, no admin command** (`#12`, URL, branch, or `#12 fix the flaky check`): **Complete the work** — execute, don’t menu.

Mutating GitHub (create/edit/merge/close) requires explicit approval unless the user already ordered that exact action. Prefer squash merge when that is repo practice (see `merge-it`). Completion handoffs follow the target skill’s approval rules.

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

After `status`/`checks`, `critique`, `explain`, `review`, `create`/`open`, end by **offering to execute** completion (Follow-Up Prompt). Run it immediately when the user already signaled land/finish.

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
| Landed on staging; production next | `ship-it` |
| Need staging promote | `stage-it` |
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

- `review`: read the diff; group findings Critical / Warning / Info; do not apply fixes unless asked — but on default completion routing, proceed into `fix-it` / `merge-it` for actionable findings. After an explicit `review` command, offer to execute those fixes.
- `status` / `checks`: `gh pr checks`, review decision, mergeStateStatus, preview URLs when present. After an explicit `status` command, offer to execute Complete the work (usually `merge-it` or `fix-it`). On default routing, skip standalone status and go straight to completion.

## Related skills

See **Complete the work**. Full ship lifecycle: `merge-it`. Gate: `check-readiness`. Issues: `issues`. Promote: `stage-it` / `ship-it`.

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

PRs as the review unit (GitHub Docs); small reviewable changes (Google eng practices); required checks gate trunk (DORA trunk-based).

Handbook card: `handbook/practices/pulls.md`.
