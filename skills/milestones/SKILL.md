---
name: milestones
description: "Work GitHub milestones with command arguments: create, update, critique, narrow, widen, merge, clean, refine, explain, document, close, status, and plan. Default with only a milestone identifier (and optional details) is execute completion work — critical-path issue plan/implement, ready-check, merge, stage/ship — not milestone-admin. Explicit commands still do admin. Use when the user asks about milestones, `/milestones <command|title|number>`, release/version planning, or finishing a milestone slice."
argument-hint: "[command|title|number...]"
---

# Milestones

Command-driven GitHub milestone skill. Parse the first token as a command when it matches the table; otherwise map clear intent.

**Default:** if the user gives only a milestone identifier (title, number, URL) and optional details — **no admin command** — execute **Complete the work**. Do not ask which admin command to run. Do not stop at `status`/`critique`/`plan` alone.

Admin commands shape the milestone when explicitly requested; they are not the default path.

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: the acceptance criteria (existing issue AC, BDD scenarios, tests, or contract when they exist; otherwise propose them and say where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on work you did not verify.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and for independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each child's result before consolidating. Use Claude Code's `Workflow` tool only for orchestration across many subagents that truly needs it; it is expensive.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents (Claude Code `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule; Codex `agents.default_subagent_model` or a role's `agents.<name>.config_file`), follow it and do not pass a model. Otherwise: mechanical search or inventory → fast/cheap (Claude Code `haiku`); implementation and evidence gathering → mid (`sonnet`); planning, review, adversarial verification → top (`opus` or `fable`). In Claude Code set it with the `Agent` tool `model` param or agent frontmatter `model:`; in Codex pass a spawn model or set `model` in the role's config file. Where the harness cannot choose (Cursor per-subagent model selection is unverified; assume it cannot), children inherit the parent model; say so in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).

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

1. **No argument**: `list` open milestones; if exactly one is the obvious focus → **Complete the work** on it; else ask via the structured question tool — options: complete a listed milestone / `create` / `plan`.
2. **First word is a command**: run it; remainder is the target. After admin work, state `Next: milestones <name>` and run it when the user signaled progress.
3. **Clear admin intent** (“narrow the launch milestone”, “how’s the v1.2 milestone?” as status-only): map and proceed.
4. **Milestone identifier ± details, no admin command** (`v1.2`, title, number, or `v1.2 ship the API issues`): **Complete the work** — execute, don’t menu.

Before mutating GitHub (create/edit milestone, move issues, close), state the proposed change; ask one structured question with options `<do it> / revise / stop`. Skip when the user’s request already named that exact action. Completion handoffs follow the target skill’s approval rules.

## Shared operations

Use [references/ops.md](references/ops.md) for critique/narrow/widen/merge/clean/refine/explain/document as applied to milestones.

## Complete the work

Milestone admin (`create` / `plan` / `critique` / `narrow` / …) organizes the slice. Completing the work means finishing the open issues and shipping the release.

### Default path (identifier ± details)

When routed here (no admin command):

1. Resolve the milestone; list open issues and blockers (`gh issue list --milestone ...`).
2. Fold any user details into priority (which theme/issue to hit first).
3. Pick the **critical-path open issue** (or release path if issues are done) and **run** the smallest execution skill from the table now. One-line why — no recommend-only menu.
4. Chain forward issue-by-issue (and into `merge-it` Stage/Ship phases when the slice is releasable per repo policy) until blocked on a required GitHub mutation or the user stops you. For independent open issues in the slice, fan out one subagent per issue with non-overlapping paths (mid tier); the parent verifies each result before merge-it. This is the one place a Claude Code `Workflow` is warranted when there are many issues — note that it is expensive. Keep `TASKS.md` across the chain.
5. If membership is clearly wrong and blocks progress, do the minimum `plan`/`narrow` fix, then continue execution on the remnant.

### After explicit admin commands

After `status`, `critique`, `explain`, `plan`, `create`, state `Next: milestones <name>` (or `recon issue #N` / `merge-it` as fits); run it when the user already signaled finish/ship.

| Situation | Execute |
| --- | --- |
| Open issue needs a plan | `recon issue #N` then implement |
| Bug blocking the milestone | `diagnose-bug` / `troubleshoot-app` → `fix-it` |
| Issue ready to implement | implement (or `fix-it` if repair-shaped) |
| Need tests / evidence on a key issue | `test-it` |
| Scope done on an issue? | `check-readiness` |
| PR open for milestone work | `merge-it` |
| Issues done; staging / production release | `merge-it` (Stage/Ship phases) |
| Wrong membership / too much WIP | `milestones narrow`, then execute the remnant |
| Missing tracker/closure issue | `issues create` (tracker+closure), then continue |
| Unsure which issue first | `recon milestone <name>`, then execute its primary |

Do **not** default to `milestones refine|critique|clean|status` when a milestone identifier was given. Prefer execute on the critical-path issue.

## Create / plan / status / close

### create

1. Read repo conventions (`AGENTS.md`, existing milestone names).
2. Draft title, description (purpose, in-scope themes, out-of-scope, close criteria), optional due date.
3. State the draft; ask one structured question with options `create / revise / stop`. Create via API on approval.
4. State `Next: milestones <name>` (usually execute critical-path `recon issue` after a quick `plan`, or `issues create` for a tracker/closure issue); run it when the user wanted a working milestone, not just the shell.

### plan

1. Load the milestone and candidate open issues (`gh issue list --milestone ...` and unassigned related issues).
2. Propose adds/removes with one-line rationale each.
3. State proposed adds/removes; ask one structured question with options `apply / revise / stop`. On approval, edit issue milestones accordingly.
4. If a tracker/closure issue is needed, hand off to `issues create` with tracker+closure guidance.
5. **Execute** the first issue (`recon issue #N` or diagnose/fix) — not only “membership updated.”

### status

Report: due date, open vs closed counts, % complete, top blockers, overdue risk. After an explicit `status` command, state `Next: milestones <name>` (or `recon issue #N` on the blocker). On default routing, skip standalone status and go straight to completion.

### close

Only when open issues are closed, moved out, or the user explicitly accepts closing with leftovers (document waivers in the milestone description or a closing comment on a tracker issue). If close criteria need a release train, recommend `merge-it` Stage/Ship phases instead of premature close.

## Output

## Blocked on me

none

## Changed

nothing

## Found

Next: milestones <name> (or the execution skill that best fits the current state)

## Related skills

See **Complete the work**. Issues: `issues`. Plans: `recon issue` / `recon milestone`. Land and release: `pulls` / `merge-it` (Stage/Ship phases).

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Time-boxed releasable slices over endless backlog; keep milestone WIP honest (DORA small batches).

Handbook card: `handbook/practices/milestones.md`.
