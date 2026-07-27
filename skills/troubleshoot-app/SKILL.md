---
name: troubleshoot-app
description: Troubleshoot live web app failures by combining user-visible browser evidence, current project data-plane sources, logs, analytics, and local code inspection. Use when a user reports a broken or confusing app experience, asks why a deployed/live page is not working, provides a URL to inspect in Atlas or another browser, asks to look at what they see, or wants diagnosis before implementation. The skill must diagnose the problem, recommend a fix, and ask a yes/no "Do you want me to..." question before making code or data changes unless the user already explicitly asked to implement. For backend, API, data-pipeline, or algorithm bugs without a UI surface, use diagnose-bug; for agent/LLM quality failures, use agents analyze.
---

# Troubleshoot App

Use this skill to diagnose live app problems from the outside in: reproduce the user-visible issue, correlate it with data-plane truth, inspect logs and code, then recommend a fix. Keep it globally usable; discover the project’s actual sources instead of assuming a stack.

This is **quality regime B** (interactive product). Wrong outputs from APIs/pipelines with no UI → `diagnose-bug` (A). Thrashing agents / bad LLM generations → `agents analyze` / Langfuse traces (C), not this skill.

Use lightweight BDD completion scenarios and existing requirements as the definition of what should be happening (`handbook/concepts/13-quality-trace.md`). Look in DocSlime `docs/` (`PRODUCT.md`, `experience/`, `REQUIREMENTS.md`, `engineering/TESTING.md`, …), issue bodies, PR descriptions, existing `.feature`/tests, and acceptance criteria. Prefer refining an existing definition over inventing a parallel one. If none fits, draft a concise Given/When/Then scenario and say where it should live. A broken, confusing, or falsely promised experience is still a bug — including craft/a11y/framing debt (`handbook/concepts/12-bugs-and-debt.md`).

For backend-only, API, worker, data-pipeline, or algorithm failures (no meaningful browser UI), use `diagnose-bug` instead.

## Core Rule

Do not jump straight from screenshot to code. Establish what the user sees, what the app believes, and what durable data says. Treat analytics as evidence, not authority.

Before making code, config, or data changes, end the diagnosis with:

> Do you want me to implement this fix?

The user can answer yes/no. If the user already explicitly says to implement or fix in the same request, proceed after a concise diagnosis.

## Workflow

1. Reproduce the visible state.
   - Use Computer Use for Atlas or the user’s named browser when they ask to see what they see.
   - Capture the URL, visible state, selected account/org/workspace, error copy, disabled controls, and any loading or redirect loop.
   - Avoid risky browser actions. Follow Computer Use confirmation policy for account changes, submissions, billing, permissions, uploads, destructive actions, or sensitive data transmission.

2. Identify the intended workflow.
   - Determine the user journey, entry URL, auth state, selected tenant/org/account, and expected landing state.
   - Search for the intended behavior in existing docs, requirements, acceptance criteria, BDD/Gherkin files, test files, issue text, PR text, and relevant code comments.
   - Link the expected behavior back to a concrete source when one exists, such as DocSlime `REQUIREMENTS.md` / `experience/`, a `.feature` file (only if the repo already uses one), an e2e/unit/integration test, or a GitHub issue.
   - If an existing definition is close but stale or incomplete, say how it should be refined rather than creating a competing definition.
   - If no definition is suitable, draft a proposed BDD completion scenario using Given/When/Then and recommend where it should live.
   - Name the invariant that appears violated, such as “active browser org exists but app has no private workspace,” “checkout created a session but subscription is missing,” or “UI says saved but database lacks row.”

3. Discover data-plane sources.
   - Read project docs, `.env*` variable names, scripts, package files, and deployment metadata to identify systems in use.
   - Look for likely sources: application database, auth provider, billing provider, analytics, feature flags, queues/jobs, object storage, logs, and deployment platform.
   - Use only available credentials/tools. Redact secrets and personal data in summaries.
   - If a live data source is unavailable, say exactly which source is unavailable and why.

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

8. Ask for permission.
   - End with a concrete yes/no prompt:
     - “Do you want me to implement the route repair and tests?”
     - “Do you want me to patch the data and then add an idempotent backfill?”
     - “Do you want me to update the feature flag config and verify the live page?”

## Atlas And Computer Use

Use Computer Use when the user references Atlas, a current browser tab, or “what it looks like to me.”

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
- Check timestamps and deployment hashes; stale previews often explain “still broken.”
- Check provider metadata and app database rows separately.
- Treat feature flags and analytics as rollout/behavior evidence, not access or billing truth.
- Do not paste secrets, tokens, raw private records, OAuth tokens, financial records, or private payloads into the final answer.
- If data repair is needed, describe it first and ask before mutating live data unless the user explicitly requested repair.

## Response Shape

Keep the diagnosis concise and evidence-led:

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

Do you want me to implement this fix?
```

If the user already asked to implement, include the diagnosis briefly, implement, validate, and summarize what changed.

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Live incidents: reproduce → isolate → evidence (SRE). Regime **B** (`handbook/concepts/11-quality-regimes.md`): journeys, a11y, Web Vitals, data-plane mismatch — not unit-test theater and not LLM-eval theater. Prefer the quality trace before inventing a private oracle (`13-quality-trace.md`).

Handbook card: `handbook/practices/troubleshoot-app.md`.
