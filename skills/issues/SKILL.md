---
name: issues
description: >
  Work GitHub issues with command arguments: create/draft, update, critique,
  narrow, widen, merge, clean, refine, explain, document, close, reopen, search,
  and status. Default with only an issue identifier (and optional details) is
  execute completion work — plan/diagnose/implement/test/ready-check/merge —
  not issue-admin. Explicit commands still do admin. Rough idea with no
  identifier defaults to `create`. Use when the user asks about issues,
  `/issues <command|#n|url|idea>`, drafting or improving an issue, or finishing
  tracked work.
argument-hint: "[command|#n|url|idea...]"
---

# Issues

Command-driven GitHub issue skill. Parse the first token as a command when it matches the table below; otherwise map clear intent.

**Default:** if the user gives only an issue identifier (`#42`, `42`, URL) and optional details (context, constraints, “fix the flaky test”) — **no admin command** — execute **Complete the work**. Do not ask which admin command to run. Do not stop at `status`/`critique`/`refine`.

Admin commands shape the issue when explicitly requested; they are not the default path.

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

1. **No argument**: ask what to do; offer complete an issue (needs `#N`), `create`, `status`, or `help`.
2. **First word is a command**: run that command; remainder is the target/context. After admin work, still point at (or offer to run) completion if the issue remains open.
3. **Clear admin intent without command word** (“narrow #42”, “explain this issue”, “draft an issue for…”): map to that command and proceed.
4. **Issue identifier ± details, no admin command** (`#42`, `42`, URL, or `#42 focus on the API path`): **Complete the work** — execute, don’t menu.
5. **Rough idea / bug / feature with no identifier and no command**: `create`.

Before mutating GitHub (create/update/close/reopen/merge redirects), show the proposed change and get explicit approval unless the user already ordered that exact mutation. Implementation and other completion handoffs follow the target skill’s approval rules.

## Shared operations

Use [references/ops.md](references/ops.md) for `critique`, `narrow`, `widen`, `merge`, `clean`, `refine`, `explain`, and `document`.

## Create / draft

For `create` or `draft`, follow [references/create.md](references/create.md) end-to-end (disposition → questions → draft → approval → `gh issue create` / update).

## Complete the work

Issue admin (`create` / `critique` / `refine` / `narrow` / …) tracks intent. Completing the work means planning, diagnosing, implementing, proving, and shipping.

### Default path (identifier ± details)

When routed here (no admin command):

1. Resolve the issue (`gh issue view`); skim linked PRs, milestone, labels.
2. Fold any user details into scope (constraints, focus area, “don’t touch X”).
3. Pick the **smallest next execution skill** from the table and **run it now** (invoke that skill / continue the work). One-line why is enough — do not present a recommend-only menu.
4. Chain forward as each step unblocks (e.g. `recon issue` → implement → `check-readiness` → `merge-it`) until blocked on approval, missing info, or the user stops you.
5. If the issue body is too vague to execute safely, do the minimum shaping (`refine` questions or a tight `recon issue` plan), then continue execution — don’t end on admin alone.

### After explicit admin commands

After `status`, `critique`, `explain`, `create`/`draft` (once the issue exists), end by **offering to execute** the same completion path (Follow-Up Prompt). Prefer running it when the user already signaled progress (“ship it”, “finish this”, details that imply do-the-work).

| Situation | Execute |
| --- | --- |
| Needs implementation plan | `recon issue #N` (then implement from the plan) |
| Live UI / product broken | `troubleshoot-app` → `fix-it` when approved |
| Backend / API / algo bug | `diagnose-bug` → `fix-it` when approved |
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
- `status`: short factual summary, then **offer to execute** Complete the work (or run it if the user already asked to finish/ship).

## Related skills

See **Complete the work**. Deep plan: `recon issue`. Gate: `check-readiness`. Land: `merge-it` / `pulls`. Organize: `milestones`.

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

GitHub Issues as tracked intent — bug-council list (`handbook/concepts/12-bugs-and-debt.md`) plus lightweight BDD completion scenarios on the quality trace (`13-quality-trace.md`). Narrow scope = small batches (DORA). Label debt type; map scenarios to evidence.

Handbook card: `handbook/practices/issues.md`.
