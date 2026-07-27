---
name: milestones
description: >
  Work GitHub milestones with command arguments: create, update, critique,
  narrow, widen, merge, clean, refine, explain, document, close, status, and
  plan. Use when the user asks about milestones, `/milestones <command>`,
  release/version planning, organizing issues into a milestone, or improving
  milestone scope and docs.
argument-hint: "[command] [milestone|title|number...]"
---

# Milestones

Command-driven GitHub milestone skill. Parse the first token as a command when it matches the table; otherwise map clear intent.

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

1. **No argument**: `list` + ask whether to `status`, `create`, or `plan`.
2. **First word is a command**: run it; remainder is the target.
3. **Clear intent** (“how’s the v1.2 milestone?”, “narrow the launch milestone”): map and proceed.

Mutating GitHub requires explicit approval after showing the plan.

## Shared operations

Use [references/ops.md](references/ops.md) for critique/narrow/widen/merge/clean/refine/explain/document as applied to milestones.

## Create / plan / status / close

### create

1. Read repo conventions (`AGENTS.md`, existing milestone names).
2. Draft title, description (purpose, in-scope themes, out-of-scope, close criteria), optional due date.
3. Approve → create via API.
4. Optionally offer `plan` to attach issues, or `issues create` for a tracker/closure issue.

### plan

1. Load the milestone and candidate open issues (`gh issue list --milestone ...` and unassigned related issues).
2. Propose adds/removes with one-line rationale each.
3. On approval, edit issue milestones accordingly.
4. If a tracker/closure issue is needed, hand off to `issues create` with tracker+closure guidance.

### status

Report: due date, open vs closed counts, % complete, top blockers, overdue risk, recommended next command (`narrow`, `critique`, `close`, …).

### close

Only when open issues are closed, moved out, or the user explicitly accepts closing with leftovers (document waivers in the milestone description or a closing comment on a tracker issue).

## Related skills

- Issue drafting and ops: `issues`
- Issue implementation planning: `recon issue` (or `recon` with no args to scout first)
- Shipping a release train: `stage-it` / `ship-it`
- PR lifecycle: `pulls` / `merge-it`

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Time-boxed releasable slices over endless backlog; keep milestone WIP honest (DORA small batches).

Handbook card: `handbook/practices/milestones.md`.
