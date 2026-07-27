---
name: issues
description: >
  Work GitHub issues with command arguments: create/draft, update, critique,
  narrow, widen, merge, clean, refine, explain, document, close, reopen, search,
  and status. Use when the user asks about issues, `/issues <command>`, drafting
  or improving an issue, scoping, combining duplicates, explaining an issue, or
  adding repo docs for tracked work. Default with a rough idea is `create`.
argument-hint: "[command] [issue|#n|url|idea...]"
---

# Issues

Command-driven GitHub issue skill. Parse the first token as a command when it matches the table below; otherwise map clear intent, or default to `create` for a rough idea / bug / feature request.

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

1. **No argument**: ask what to do; offer `create`, `status`, `critique`, or `help`.
2. **First word is a command**: run that command; remainder is the target/context.
3. **Clear intent without command word** (“draft an issue for…”, “narrow #42”, “explain this issue”): map to the command and proceed.
4. **Rough idea / bug / feature with no command**: `create`.

Before mutating GitHub (create/update/close/reopen/merge redirects), show the proposed change and get explicit approval unless the user already ordered that exact mutation.

## Shared operations

Use [references/ops.md](references/ops.md) for `critique`, `narrow`, `widen`, `merge`, `clean`, `refine`, `explain`, and `document`.

## Create / draft

For `create` or `draft`, follow [references/create.md](references/create.md) end-to-end (disposition → questions → draft → approval → `gh issue create` / update).

## Update / close / reopen / search / status

- Resolve the issue with `gh issue view` / search; read `AGENTS.md` for repo conventions.
- `update`: propose a diff of sections; apply only after approval (`gh issue edit` or comment).
- `close` / `reopen`: state why; comment when it preserves decision history.
- `search` / `dup`: classify Duplicate / Related / No Match; prefer update-over-create.
- `status`: short factual summary + next recommended command if stuck.

## Related skills

- Planning implementation: `recon issue`
- Pre-PR / closure readiness: `check-readiness`
- PR open/fix/merge lifecycle: `merge-it` or `pulls`
- Milestones: `milestones`
