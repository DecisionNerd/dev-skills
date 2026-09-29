---
name: troubleshoot-app
description: "Troubleshoot live web app failures by combining user-visible browser evidence, current project data-plane sources, logs, analytics, and local code inspection. Use when a user reports a broken or confusing app experience, asks why a deployed/live page is not working, provides a URL to inspect in Atlas or another browser, or asks to look at what they see. Diagnose, then implement the smallest fix and a regression test in the same run; stop first only for diagnosis-only requests, live-data/outside-repo changes, or a behavior-changing choice between fixes. For backend, API, data-pipeline, or algorithm bugs without a UI surface, use diagnose-bug; for agent/LLM quality failures, use agents analyze."
---

# Troubleshoot App

Use this skill to diagnose live app problems from the outside in: reproduce the user-visible issue, correlate it with data-plane truth, inspect logs and code, then recommend a fix. Keep it globally usable; discover the project's actual sources instead of assuming a stack.

This is **quality regime B** (interactive product). Wrong outputs from APIs/pipelines with no UI → `diagnose-bug` (A). Thrashing agents / bad LLM generations → `agents analyze` / Langfuse traces (C), not this skill.

Use lightweight BDD completion scenarios and existing requirements as the definition of what should be happening (`handbook/concepts/13-quality-trace.md`). Look in DocSlime `docs/` (`PRODUCT.md`, `experience/`, `REQUIREMENTS.md`, `engineering/TESTING.md`, …), issue bodies, PR descriptions, existing `.feature`/tests, and acceptance criteria. Prefer refining an existing definition over inventing a parallel one. If none fits, draft a concise Given/When/Then scenario and say where it should live. A broken, confusing, or falsely promised experience is still a bug — including craft/a11y/framing debt (`handbook/concepts/12-bugs-and-debt.md`).

For backend-only, API, worker, data-pipeline, or algorithm failures (no meaningful browser UI), use `diagnose-bug` instead.

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

## Core Rule

Do not jump straight from screenshot to code. Establish what the user sees, what the app believes, and what durable data says. Treat analytics as evidence, not authority.

**Done when:** the named BDD scenario or contract passes, a regression test is added, and no new failures appear in the narrowest suite.

A bug report is a fix request. After diagnosis, implement the smallest fix and add a regression test in the same run — report the diagnosis as a status note before coding. Stop before implementing only when:

- the user asked for diagnosis or explanation only, or said "don't change code";
- the fix requires a live-data mutation, production config change, or a change outside this repository; or
- two materially different fixes are viable and the choice changes product behavior — then ask one structured question with the options (`<option A> / <option B> / stop`).

If data repair is needed, describe it first and ask before mutating live data unless the user explicitly requested repair.

## Workflow

1. Reproduce the visible state.
   - Use Computer Use for Atlas or the user's named browser when they ask to see what they see.
   - Capture the URL, visible state, selected account/org/workspace, error copy, disabled controls, and any loading or redirect loop.
   - Avoid risky browser actions. Follow Computer Use confirmation policy for account changes, submissions, billing, permissions, uploads, destructive actions, or sensitive data transmission.

2. Identify the intended workflow.
   - Determine the user journey, entry URL, auth state, selected tenant/org/account, and expected landing state.
   - Search for the intended behavior in existing docs, requirements, acceptance criteria, BDD/Gherkin files, test files, issue text, PR text, and relevant code comments.
   - Link the expected behavior back to a concrete source when one exists, such as DocSlime `REQUIREMENTS.md` / `experience/`, a `.feature` file (only if the repo already uses one), an e2e/unit/integration test, or a GitHub issue.
   - If an existing definition is close but stale or incomplete, say how it should be refined rather than creating a competing definition.
   - If no definition is suitable, draft a proposed BDD completion scenario using Given/When/Then and recommend where it should live.
   - Name the invariant that appears violated, such as "active browser org exists but app has no private workspace," "checkout created a session but subscription is missing," or "UI says saved but database lacks row."

3. Discover data-plane sources.
   - Read project docs, `.env*` variable names, scripts, package files, and deployment metadata to identify systems in use.
   - Look for likely sources: application database, auth provider, billing provider, analytics, feature flags, queues/jobs, object storage, logs, and deployment platform.
   - Use only available credentials/tools. Redact secrets and personal data in summaries.
   - If a live data source is unavailable, say exactly which source is unavailable and why.
   - Fan out evidence gathering to parallel read-only subagents (fast tier) when more than one source is available — browser/session evidence, data-plane queries, and log correlation can run concurrently; verify each result before diagnosing.

4. Query current data.
   - Use read-only queries first.
   - Correlate by stable IDs from the UI, URL, session, metadata, database rows, and analytics properties.
   - Compare at least two layers when possible: browser/session, application database, provider system, logs/analytics.
   - Check for stale/missing mirror rows, mismatched IDs, old immutable deployments, incomplete jobs, feature flag differences, and entitlement/billing denials.

5. Inspect code only after evidence.
   - Locate the resolver, route, component, middleware, job, or webhook that should bridge the mismatched layers.
   - Locate tests or BDD files that should already cover the intended behavior. If they do not exist, identify the missing test or BDD definition as part of the recommended fix.
   - Look for fail-closed checks, idempotency gaps, retry holes, race conditions, missing backfills, stale deployment URLs, and unsafe fallback assumptions.

6. Diagnose.
   - State the observed symptom.
   - State the intended behavior definition used: existing requirement, existing BDD/test, refined definition, or newly proposed BDD scenario.
   - State the data-plane facts.
   - State the likely root cause and confidence level.
   - Distinguish current facts from inference.

7. Recommend.
   - Recommend the smallest fix that restores the intended workflow while preserving authorization, billing, privacy, and tenant boundaries.
   - Recommend whether to use an existing requirement/BDD/test definition unchanged, refine it, or add a new definition before or alongside the implementation.
   - Include any data repair, backfill, migration, logging, telemetry, and test coverage needed.
   - Make the verification target explicit: the fix should prove the linked or proposed requirement/BDD scenario now passes.
   - Identify immediate workaround only if it is safe.

8. Fix and prove.
   - If the fix requires a live-data mutation or a change outside this repository, state the proposed action and ask one structured question: `<do it> / revise / stop`. If two materially different fixes exist and the choice changes product behavior, ask the same structured question with the options named.
   - Implement the smallest fix identified in step 7.
   - Add a regression test that would have caught this bug.
   - Run the narrowest test suite that covers the fix; confirm it is green.
   - Re-check the scenario from step 2: the named BDD scenario or invariant must now pass.

## Atlas And Computer Use

Use Computer Use when the user references Atlas, a current browser tab, or "what it looks like to me."

- Start with `get_app_state` before interacting.
- Prefer opening a new tab for separate URLs unless the user asks to continue in the current tab.
- Read the accessibility tree and screenshot. Record the page title, host, route, selected identity/workspace, and visible error text.
- Use navigation and reloads for diagnosis. Do not submit forms, create accounts, change billing, accept permissions, or modify account/org settings without the required confirmation.
- If the live page is an immutable preview/deployment URL, compare it with the current deployment for the relevant branch.

## Data-Plane Evidence

Use `references/data-plane-sources.md` for source-discovery patterns and read-only query examples.

Best practices:

- Prefer read-only provider APIs, CLIs, dashboards, logs, and database queries.
- Correlate the same entity across systems before concluding.
- Check timestamps and deployment hashes; stale previews often explain "still broken."
- Check provider metadata and app database rows separately.
- Treat feature flags and analytics as rollout/behavior evidence, not access or billing truth.
- Do not paste secrets, tokens, raw private records, OAuth tokens, financial records, or private payloads into the final answer.

## Response Shape

Keep the diagnosis concise and evidence-led. Report diagnosis as a status note before coding:

```markdown
I reproduced the issue: ...

Expected behavior definition:
- Source: <docs/test/BDD/issue/PR link or "No suitable existing definition found">
- Scenario: <existing/refined/proposed Given/When/Then summary>

Data-plane checks:
- Browser/session: ...
- App database: ...
- Provider/logs/analytics: ...

Diagnosis: ...

Recommended fix: ...

## Blocked on me

<the one genuine question or blocker, else "none">

## Changed

<files changed by the fix, else "nothing">

## Found

Diagnosis: <root cause>. Fix: <what changed>. Verification: <test name(s) and result>.

Next: check-readiness
```

## Grounding

This skill's TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Live incidents: reproduce → isolate → evidence (SRE). Regime **B** (`handbook/concepts/11-quality-regimes.md`): journeys, a11y, Web Vitals, data-plane mismatch — not unit-test theater and not LLM-eval theater. Prefer the quality trace before inventing a private oracle (`13-quality-trace.md`).

Handbook card: `handbook/practices/troubleshoot-app.md`.
