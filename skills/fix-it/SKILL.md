---
name: fix-it
description: "Create an implementation-ready repair plan from diagnosis evidence — live-app (troubleshoot-app), backend/algo (diagnose-bug), failing URLs, logs, data-plane findings, or clearly reported breakage. Use when the user asks to \"fix it\", \"plan this fix\", or wants a plan before implementation — especially diagnose → fix-it → check-readiness → merge-it. Not for behavior-preserving structure work (refactor-it) or greenfield features without a failing contract."
---

# Fix It

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

## Goal

Turn a diagnosis into a decision-complete implementation plan that another agent or engineer can execute confidently. Bridge between diagnosis (`troubleshoot-app` / `diagnose-bug`) and code work.

Use lightweight BDD / contracts as the repair oracle (`handbook/concepts/13-quality-trace.md`). State what should happen, where that expectation lives, whether to use/refine/create it, and how tests/evals prove it. Prefer existing DocSlime REQUIREMENTS/TESTING, issue BDD, schemas, and tests over inventing a parallel definition.

Name the **quality regime** for evidence (`handbook/concepts/11-quality-regimes.md`): A = contracts/golden tests; B = journeys/a11y/data-plane; C = traces/evals (hand agent/LLM product bugs to `agents` + Langfuse when the failure is generative). Debt labels name interest — they do not demote the pain (`12-bugs-and-debt.md`).

## When NOT to use

- Pure structure cleanup with no behavior change → `refactor-it`
- "Add tests only" with no repair → `test-it`
- No failing contract yet / exploring options → `research-it` or `recon issue`
- Runaway agent thrash → `agents slap` first

## Required Input

Require at least one of:

- a prior `troubleshoot-app` or `diagnose-bug` diagnosis in the conversation;
- a failing URL, screenshot, or browser-visible symptom (regime B);
- failing inputs/tests, logs/traces/metrics, or data-plane evidence (regime A/C as applicable);
- a clearly stated broken workflow/invariant and expected behavior.

If no concrete symptom or diagnosis exists, ask for the missing evidence before planning. Do not require a GitHub issue number.

## Plan Mode

This skill is Plan Mode friendly.

- In Plan Mode, inspect repo and provider context read-only, then produce a plan. Do not edit code, write data, create branches, commit, push, post comments, or open PRs.
- Outside Plan Mode the plan is execution context: continue into implementation in the same run unless the user asked for plan only.
- If the user invokes this skill outside Plan Mode but asks for planning only, still provide the plan without mutating anything.

## Workflow

1. Ground in the evidence.
   - Restate the observed symptom, expected behavior, and regime (A / B / C / hybrid).
   - Carry forward the contract from diagnosis when available.
   - If diagnosis did not identify a definition, search DocSlime / requirements / TESTING / schemas / BDD / tests / issues / PRs before planning.
   - Classify the definition source as `Use Existing`, `Refine Existing`, or `Create New`.
   - If refining or creating a definition, include the proposed Given/When/Then (or invariant) and where it should live.
   - Separate confirmed facts from inference.
   - Include relevant layers: browser/session and data-plane when UI; repro input/test + logs/traces when backend; LLM/tool traces/scores when generative.
   - If a live data source is unavailable, state what is missing and why.

2. Inspect the repository read-only.
   - Use `rg`, `rg --files`, and targeted file reads to find the likely routes, components, API handlers, resolvers, jobs, schema, auth/authorization checks, telemetry, and tests.
   - Search for existing behavior definitions using relevant nouns, routes, visible labels, provider names, error text, invariant language, and test names.
   - Identify existing project conventions for validation, error handling, analytics/audit events, privacy boundaries, and test commands.
   - Check current branch/status only for planning branch steps; do not switch branches in Plan Mode.

3. Define the repair objective.
   - State the user-visible behavior that must work after the fix.
   - Link the objective to the chosen requirement, BDD scenario, or test definition. If a new/refined definition is needed, make adding or updating that definition part of the repair objective.
   - Identify non-goals and boundaries, especially around authorization, billing, privacy, data repair, or destructive operations.
   - Call out any one remaining blocker as an Open Question; raise it through the structured question tool with options. If no blocker exists, proceed with stated assumptions.

4. Plan implementation.
   - Prefer the smallest fix that restores the intended workflow.
   - Include the requirement/BDD/test definition update before or alongside code changes when the current definition is missing, stale, or too vague to verify.
   - Include all required code, data/model, UI, observability, documentation, and test updates.
   - Name likely files or directories only when useful for implementation safety.
   - Include any data repair or backfill as explicit planned steps, and mark whether it is live-data mutating.
   - Preserve fail-closed authorization and tenant boundaries unless the user explicitly changes the product rule.
   - Implementation fan-out: use one subagent per non-overlapping file set (mid tier) for parallel implementation; then an independent reviewer subagent (top tier) checks the diff against the Expected Behavior Definition before check-readiness.

5. Plan validation.
   - Include tests to add or update, not only commands to run.
   - Map each linked or proposed BDD scenario to concrete evidence: automated test, manual browser verification, data-plane query, log/audit evidence, CI check, or documentation review.
   - Cover the failure mode from the diagnosis, the successful path, and security/privacy boundary cases.
   - Include manual QA when the issue is browser-visible.
   - Do not consider the plan complete unless the validation proves the linked/refined/new behavior definition.

6. Lifecycle routing.
   - Outside Plan Mode, continue from the plan into implementation in the same run unless the user asked for plan only.
   - In Plan Mode, the harness's plan approval is the gate; do not add a textual one.
   - After implementation, run `check-readiness` (read-only) as the next step.
   - After readiness, the normal shipping path is `merge-it`.

## Output Format

Use this shape unless the user asks otherwise:

```markdown
**Observed Symptom**
<What the user sees and where.>

**Regime**
<A | B | C | hybrid — and why>

**Evidence**
- Browser/session (B): <facts or n/a>
- Repro input/test (A): <facts or n/a>
- App data/provider / logs/traces/scores: <facts or unavailable>
- Code path: <likely source files/functions>

**Diagnosis**
<Root cause and confidence. Clearly distinguish inference from confirmed evidence.>

**Expected Behavior Definition**
- Source: <existing docs/test/BDD/issue/PR path or URL, or "No suitable existing definition found">
- Decision: <Use Existing | Refine Existing | Create New>
- Scenario: <Given/When/Then summary, including where a new/refined definition should live when applicable>

**Objective**
<1-3 sentences describing the intended repaired behavior.>

**Requirements**
- <Requirement>

**Implementation Plan**
1. <Ordered implementation step with likely files/directories>
2. <Ordered implementation step>

**Observability**
- <Analytics, audit, logs, metrics, or why none are needed>

**Security And Privacy**
- <Auth/authz/tenant/billing/privacy risks and mitigations>

**Documentation**
- <Docs to update, or why none are expected>

**Testing**
- <Tests to add/update, validation commands, and BDD scenario-to-evidence mapping>

**Breakage Risks**
- <Risk plus mitigation/detection>

**Open Questions**
- <Only blockers/material ambiguities, or "None">

## Blocked on me

<the one genuine question or blocker, else "none">

## Changed

<files, commits, GitHub objects, deploys, else "nothing">

## Found

<evidence, verdict, and `Next: check-readiness` or the appropriate next step>
```

Keep the plan concrete and implementation-ready. Avoid restating large raw logs, secrets, private payloads, or sensitive user data.

## Related commands

After diagnosis/planning, use `issues create` if work should be tracked, `pulls create` / `merge-it` to land the fix, and `issues document` / `pulls document` when docs are part of the repair.

## Grounding

This skill's TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Smallest real repair after diagnosis (DORA small batches); evidence matches the regime (`11-quality-regimes.md`); BDD/contract from the quality trace (`13-quality-trace.md`).

Handbook card: `handbook/practices/fix-it.md`.
