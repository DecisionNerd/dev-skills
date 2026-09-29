---
name: refactor-it
description: >
  Safely refactor code to improve structure, clarity, or testability without
  changing intended behavior. Use when the user says "refactor it", asks to
  clean up a module, extract helpers, reduce duplication, or prepare code for
  a feature — not for product behavior changes (use fix-it) or pure test adds
  (use test-it). Prefer small steps with tests green between steps.
argument-hint: "[path|symbol|module...]"
---

# Refactor It

Improve the code's shape while **preserving behavior**. If behavior must change, stop and use `fix-it` (or implement the feature explicitly) instead of hiding changes inside a "refactor."

Paying down **development / architecture debt** (`handbook/concepts/12-bugs-and-debt.md`) is a valid reason to refactor — still keep steps behavior-preserving and evidence-backed.

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

## When to use

- "Refactor it", extract function/module, rename for clarity, decompose god-file
- Prep for a feature when structure blocks a clean change
- After `diagnose-bug` when the bug fix is done and structure still hurts

## When NOT to use

- Product behavior change → `fix-it`
- Disk/worktree clutter → `tidy-up`
- Docs-only cleanup → `document-it` / DocSlime `kiss`

## Workflow

Done when: public contracts unchanged, tests green after every step, diff reviewable. Single writer per path set; parallel read-only scouting (fast tier) for characterization coverage is fine.

1. **Characterize current behavior**
   - Identify entry points, public API, and existing tests that lock behavior.
   - If tests are missing for the risky surface, propose `test-it` **before** deep refactor (or add characterization tests first).

2. **Define non-goals**
   - No feature work, no dependency upgrades "while we're here," no drive-by style wars outside the touched surface.

3. **Plan small steps**
   - Extract, rename, move, invert dependencies — one cohesive idea per step.
   - Keep diffs reviewable; avoid rewriting unrelated files.

4. **Execute with a safety net**
   - After each step, run the narrowest relevant tests.
   - Stop if behavior drifts; revert the step or add a failing characterization test.

5. **Verify**
   - Same public contracts, same user-visible behavior.
   - Note any intentional API renames and required call-site updates (still behavior-preserving).

6. **Wrap up**
   - Next: `test-it` if coverage is still thin, `document-it` if public API moved, `pulls create` / `merge-it` to land.

## Guardrails

- Behavior change → not this skill (`fix-it` / feature work).
- Don't mix refactor with large feature commits; split PRs when possible (`pulls narrow`).
- Performance "refactors" need a measured baseline or they're speculative — say so.

## Output

```markdown
**Target**
- ...

**Behavior locked by**
- tests / manual checks: ...

**Steps taken**
1. ...

**Verification**
- Ran: ...

## Blocked on me

none

## Changed

- ...

## Found

- ...
- Next: test-it / document-it / pulls create
```

## Grounding

This skill's TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Fowler refactoring = behavior-preserving micro-steps under test; Beck: passes tests first. Characterization tests before structural change.

Handbook card: `handbook/practices/refactor-it.md`.
