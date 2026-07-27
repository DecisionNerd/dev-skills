---
name: fix-it
description: >
  Create an implementation-ready repair plan from diagnosis evidence — live-app
  (troubleshoot-app), backend/algo (diagnose-bug), failing URLs, logs, data-plane
  findings, or clearly reported breakage. Use when the user asks to "fix it",
  "plan this fix", or wants a plan before implementation — especially diagnose →
  fix-it → check-readiness → merge-it. Not for behavior-preserving structure work
  (refactor-it) or greenfield features without a failing contract.
---

# Fix It

## Goal

Turn a diagnosis into a decision-complete implementation plan that another agent or engineer can execute confidently. Bridge between diagnosis (`troubleshoot-app` / `diagnose-bug`) and code work.

Use lightweight BDD / contracts as the repair oracle (`handbook/concepts/13-quality-trace.md`). State what should happen, where that expectation lives, whether to use/refine/create it, and how tests/evals prove it. Prefer existing DocSlime REQUIREMENTS/TESTING, issue BDD, schemas, and tests over inventing a parallel definition.

Name the **quality regime** for evidence (`handbook/concepts/11-quality-regimes.md`): A = contracts/golden tests; B = journeys/a11y/data-plane; C = traces/evals (hand agent/LLM product bugs to `agents` + Langfuse when the failure is generative). Debt labels name interest — they do not demote the pain (`12-bugs-and-debt.md`).

## When NOT to use

- Pure structure cleanup with no behavior change → `refactor-it`
- “Add tests only” with no repair → `test-it`
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
- Outside Plan Mode, if the user explicitly asks to implement after a plan, use the plan as execution context and follow the normal coding-agent workflow.
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
   - Call out any one remaining blocker as an Open Question. If no blocker exists, proceed with assumptions.

4. Plan implementation.
   - Prefer the smallest fix that restores the intended workflow.
   - Include the requirement/BDD/test definition update before or alongside code changes when the current definition is missing, stale, or too vague to verify.
   - Include all required code, data/model, UI, observability, documentation, and test updates.
   - Name likely files or directories only when useful for implementation safety.
   - Include any data repair or backfill as explicit planned steps, and mark whether it is live-data mutating.
   - Preserve fail-closed authorization and tenant boundaries unless the user explicitly changes the product rule.

5. Plan validation.
   - Include tests to add or update, not only commands to run.
   - Map each linked or proposed BDD scenario to concrete evidence: automated test, manual browser verification, data-plane query, log/audit evidence, CI check, or documentation review.
   - Cover the failure mode from the diagnosis, the successful path, and security/privacy boundary cases.
   - Include manual QA when the issue is browser-visible.
   - Do not consider the plan complete unless the validation proves the linked/refined/new behavior definition.

6. Lifecycle routing.
   - End planning output with exactly one `Follow-Up Prompt`.
   - If the natural next step is implementation, ask: `Do you want me to implement this fix plan?`
   - After implementation, ask whether to run `check-readiness`.
   - After readiness, the normal shipping path is `merge-it`.
   - If the next user response is a short affirmative (`y`, `yes`, `ok`, `go`, `continue`, `proceed`, `do it`), treat it as approval for the named follow-up action, unless the user adds conflicting instructions.

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

**Follow-Up Prompt**
Do you want me to implement this fix plan?
```

Keep the plan concrete and implementation-ready. Avoid restating large raw logs, secrets, private payloads, or sensitive user data.

## Related commands

After diagnosis/planning, use `issues create` if work should be tracked, `pulls create` / `merge-it` to land the fix, and `issues document` / `pulls document` when docs are part of the repair.

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Smallest real repair after diagnosis (DORA small batches); evidence matches the regime (`11-quality-regimes.md`); BDD/contract from the quality trace (`13-quality-trace.md`).

Handbook card: `handbook/practices/fix-it.md`.
