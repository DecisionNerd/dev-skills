---
name: pulls
description: >
  Work GitHub pull requests with command arguments: create/open, update,
  critique, narrow, widen, merge, clean, refine, explain, document, review,
  status/checks, and close. Use when the user asks about PRs, `/pulls <command>`,
  opening or improving a PR, scoping a change set, explaining a diff, or
  documenting from a PR. For full autofix→CI→merge→issue-close lifecycle, prefer
  merge-it or run `pulls merge` which may hand off to merge-it.
argument-hint: "[command] [pr|#n|url|branch...]"
---

# Pulls

Command-driven GitHub pull request skill. Parse the first token as a command when it matches the table; otherwise map clear intent.

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

1. **No argument**: `status` for the PR matching the current branch if any; else ask to `create` or name a PR.
2. **First word is a command**: run it.
3. **Clear intent** (“open a PR”, “why is this PR failing checks”, “explain this PR”): map and proceed.

Mutating GitHub (create/edit/merge/close) requires explicit approval unless the user already ordered that exact action. Prefer squash merge when that is repo practice (see `merge-it`).

## Shared operations

Use [references/ops.md](references/ops.md) for critique/narrow/widen/merge/clean/refine/explain/document as applied to PRs.

## Create / open

1. Read `AGENTS.md` / PR template / branch policy (feature→`main` vs feature→`staging`).
2. Inspect `git status`, diff vs base, linked issues.
3. Draft title + body (summary, test plan, risk, issue links / closing keywords when appropriate).
4. Approve → `gh pr create` (no `--json` on create if unsupported; view afterward).
5. Offer `status` or hand off to `merge-it` if the user wants autofix→merge→close.

## merge vs merge-it

- `pulls merge`: merge when checks/reviews already satisfy policy, or user insists on merge-only.
- If actionable review comments, failing checks, or issue closure verification are needed, invoke **`merge-it`** instead of reinventing that lifecycle.

## review / status

- `review`: read the diff; group findings Critical / Warning / Info; do not apply fixes unless asked (`fix-it` or `merge-it` / autofix).
- `status` / `checks`: `gh pr checks`, review decision, mergeStateStatus, preview URLs when present.

## Related skills

- Full ship lifecycle: `merge-it`
- Issues: `issues`
- Readiness before PR: `check-readiness`
- Staging/production promote: `stage-it` / `ship-it`

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

PRs as the review unit (GitHub Docs); small reviewable changes (Google eng practices); required checks gate trunk (DORA trunk-based).

Handbook card: `handbook/practices/pulls.md`.
