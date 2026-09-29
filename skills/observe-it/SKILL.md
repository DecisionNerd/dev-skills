---
name: observe-it
description: >
  Add or improve observability — structured logs, metrics, traces, errors,
  analytics, dashboards, and (for generative) LLM traces/scores. Use when the
  user says "observe it", asks for instrumentation, telemetry, alerting hooks,
  Langfuse/evals online, or "how do we know this works in prod". Match signals
  to quality regime A/B/C; prefer existing vendors (OTel, Sentry, PostHog,
  Langfuse house default for LLM). Ask before emitting PII or paid-volume storms.
argument-hint: "[path|route|job|feature...]"
---

# Observe It

Make important behavior **visible in production** without drowning in noise or leaking sensitive data.

**Match signals to the quality regime** (handbook `concepts/11-quality-regimes.md`):

| Regime | Observe… |
| --- | --- |
| **A — Deterministic compute** | Golden signals + (for pipelines) freshness/coverage/correctness |
| **B — Interactive product** | Errors + RUM / Core Web Vitals + critical funnel events |
| **C — Generative / high-input** | Hierarchical LLM/tool/retrieval traces + quality scores / user feedback. House default: **Langfuse** (OTel-friendly) unless the repo already standardized elsewhere |

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

## When to use

- "Add logging/metrics/tracing", "observe it", "how do we detect this failing?", "add Langfuse/evals online"
- After `diagnose-bug` / `troubleshoot-app` / `agents analyze` when the root cause was invisible
- Before `merge-it` Stage/Ship phases when release risk needs signals

## When NOT to use

- Fixing a known bug without needing new signals → `fix-it` / `diagnose-bug`
- Proving behavior in CI → `test-it` (obs complements tests; does not replace them)
- Designing the agent itself → `agents design|optimize`

## Workflow

Done when: each named question is answerable from an emitted signal verified locally or in staging.

1. **Name the regime and the questions ops/product must answer**
   - e.g. success rate, latency, auth denials, queue lag, LCP regression, eval score drift, funnel drop-off.

2. **Discover existing stack**
   - Read docs, `.env*` names, SDK imports, dashboards, alert rules, Langfuse/OTel exporters.
   - Reuse current logger/tracer/metrics/analytics/eval plane — don't add a second system.

3. **Instrument the smallest useful surface**
   - Logs: structured fields, correlation/request/job/trace IDs, error cause chains.
   - Metrics: counters/histograms with low-cardinality labels.
   - Traces: spans on external calls and critical path; for C, model + tool + retrieval spans.
   - Scores (C): user feedback, heuristic, or judge scores attached to traces/sessions.
   - Analytics: product events only when product already uses that bus.
   - Errors: report unexpected failures to the existing error tracker.

4. **Privacy & volume**
   - No secrets, tokens, raw PII, or full prompts/payloads in default logs.
   - Avoid high-cardinality labels (user id as metric label).
   - Sample or rate-limit chatty paths.
   - Ask before changing production alert thresholds or creating paid vendor resources (legitimate gate: use the question tool with options).

5. **Verify**
   - Local or staging: emit a signal and confirm it shows where expected (or document why it can't).
   - Note dashboard/query stubs if the repo keeps them.

6. **Wrap up**
   - Next: `document-it` for runbooks, `test-it` for instrumentation/eval guards, `merge-it` (Ship phase) when ready.

## Guardrails

- Observability is not a substitute for tests (`test-it`) or fixes (`fix-it`).
- Don't "log everything"; prefer decision points and failure boundaries.

## Output

```markdown
**Questions we can now answer**
- ...

**Stack**
- ...

**Instrumentation**
- ...

**Privacy / cardinality notes**
- ...

**How to verify**
- ...

## Blocked on me

none

## Changed

- ...

## Found

- ...
- Next: document-it (runbook) / test-it (guards) / merge-it
```

## Grounding

This skill's TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Signals follow quality regimes (`handbook/concepts/11-quality-regimes.md`): SRE golden signals (+ pipeline SLIs) for compute; Web Vitals/RUM for products; LLM traces + scores (Langfuse / OTel) for generative. Watch cardinality and PII.

Handbook card: `handbook/practices/observe-it.md`.
