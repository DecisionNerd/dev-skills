---
name: milestones
description: >
  Work GitHub milestones with command arguments: create, update, critique,
  narrow, widen, merge, clean, refine, explain, document, close, status, and
  plan. Default with only a milestone identifier (and optional details) is
  execute completion work — critical-path issue plan/implement, ready-check,
  merge, stage/ship — not milestone-admin. Explicit commands still do admin.
  Use when the user asks about milestones, `/milestones <command|title|number>`,
  release/version planning, or finishing a milestone slice.
argument-hint: "[command|title|number...]"
---

# Milestones

Command-driven GitHub milestone skill. Parse the first token as a command when it matches the table; otherwise map clear intent.

**Default:** if the user gives only a milestone identifier (title, number, URL) and optional details — **no admin command** — execute **Complete the work**. Do not ask which admin command to run. Do not stop at `status`/`critique`/`plan` alone.

Admin commands shape the milestone when explicitly requested; they are not the default path.

## Commands

| Command | What it does |
| --- | --- |
| `create` | Create a milestone (title, description, due date) after draft + approval |
| `update` | Edit title, description, or due date |
| `critique` | Critique milestone purpose, scope, issue set, and close criteria |
| `narrow` | Reduce milestone scope; move issues out or to later milestones |
| `widen` | Expand milestone deliberately; pull in related open issues with rationale |
| `merge` | Consolidate two milestones (move issues, close/redirect the loser) |
| `clean` | Clean description noise, fix due dates, tidy issue membership |
| `refine` | Sharpen description and close criteria without changing membership |
| `explain` | Plain-language explanation of the milestone for the user |
| `document` | Improve/add repo release notes, changelog, or runbook for this milestone |
| `close` | Close milestone when issues are done (or with explicit incomplete waiver) |
| `status` | Progress: open/closed issue counts, blockers, due date risk |
| `plan` | Propose which open issues belong; optional tracker issue via `issues create` |
| `list` | List open (and optionally closed) milestones |
| `help` / `library` | List commands |

Target: milestone title, number, or URL. Use `gh api` / `gh milestone` when available, or `gh api repos/{owner}/{repo}/milestones`.

## Routing

1. **No argument**: `list`, then if exactly one open milestone is the obvious focus → **Complete the work** on it; else ask which milestone to complete (or `create` / `plan`).
2. **First word is a command**: run it; remainder is the target. After admin work, offer (or run) completion if open issues remain.
3. **Clear admin intent** (“narrow the launch milestone”, “how’s the v1.2 milestone?” as status-only): map and proceed.
4. **Milestone identifier ± details, no admin command** (`v1.2`, title, number, or `v1.2 ship the API issues`): **Complete the work** — execute, don’t menu.

Mutating GitHub requires explicit approval after showing the plan. Completion handoffs follow the target skill’s approval rules.

## Shared operations

Use [references/ops.md](references/ops.md) for critique/narrow/widen/merge/clean/refine/explain/document as applied to milestones.

## Complete the work

Milestone admin (`create` / `plan` / `critique` / `narrow` / …) organizes the slice. Completing the work means finishing the open issues and shipping the release.

### Default path (identifier ± details)

When routed here (no admin command):

1. Resolve the milestone; list open issues and blockers (`gh issue list --milestone ...`).
2. Fold any user details into priority (which theme/issue to hit first).
3. Pick the **critical-path open issue** (or release path if issues are done) and **run** the smallest execution skill from the table now. One-line why — no recommend-only menu.
4. Chain forward issue-by-issue (and into `stage-it` / `ship-it` when the slice is releasable) until blocked on approval or the user stops you.
5. If membership is clearly wrong and blocks progress, do the minimum `plan`/`narrow` fix, then continue execution on the remnant.

### After explicit admin commands

After `status`, `critique`, `explain`, `plan`, `create`, end by **offering to execute** completion on the critical-path issue (Follow-Up Prompt). Run it when the user already signaled finish/ship.

| Situation | Execute |
| --- | --- |
| Open issue needs a plan | `recon issue #N` then implement |
| Bug blocking the milestone | `diagnose-bug` / `troubleshoot-app` → `fix-it` |
| Issue ready to implement | implement (or `fix-it` if repair-shaped) |
| Need tests / evidence on a key issue | `test-it` |
| Scope done on an issue? | `check-readiness` |
| PR open for milestone work | `merge-it` |
| Issues done; staging / production | `stage-it` / `ship-it` |
| Wrong membership / too much WIP | `milestones narrow`, then execute the remnant |
| Missing tracker/closure issue | `issues create` (tracker+closure), then continue |
| Unsure which issue first | `recon milestone <name>`, then execute its primary |

Do **not** default to `milestones refine|critique|clean|status` when a milestone identifier was given. Prefer execute on the critical-path issue.

## Create / plan / status / close

### create

1. Read repo conventions (`AGENTS.md`, existing milestone names).
2. Draft title, description (purpose, in-scope themes, out-of-scope, close criteria), optional due date.
3. Approve → create via API.
4. Recommend **Complete the work** next — usually execute critical-path `recon issue` after a quick `plan`, or `issues create` for a tracker/closure issue — and run it when the user wanted a working milestone, not just the shell.

### plan

1. Load the milestone and candidate open issues (`gh issue list --milestone ...` and unassigned related issues).
2. Propose adds/removes with one-line rationale each.
3. On approval, edit issue milestones accordingly.
4. If a tracker/closure issue is needed, hand off to `issues create` with tracker+closure guidance.
5. **Execute** the first issue (`recon issue #N` or diagnose/fix) — not only “membership updated.”

### status

Report: due date, open vs closed counts, % complete, top blockers, overdue risk. After an explicit `status` command, offer to execute Complete the work on the blocker. On default routing, skip standalone status and go straight to completion.

### close

Only when open issues are closed, moved out, or the user explicitly accepts closing with leftovers (document waivers in the milestone description or a closing comment on a tracker issue). If close criteria need a release train, recommend `stage-it` / `ship-it` instead of premature close.

## Related skills

See **Complete the work**. Issues: `issues`. Plans: `recon issue` / `recon milestone`. Land: `pulls` / `merge-it`. Release: `stage-it` / `ship-it`.

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Time-boxed releasable slices over endless backlog; keep milestone WIP honest (DORA small batches).

Handbook card: `handbook/practices/milestones.md`.
