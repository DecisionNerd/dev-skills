---
title: Observe It
description: "Add or improve observability — structured logs, metrics, traces, errors, analytics, dashboards, and (for generative) LLM traces/scores. Use when the user says \"observe it\", asks for instrumentation, telemetry, alerting hooks, Langfuse/evals online, or \"how do we know this works in prod\". Match signals to quality regime A/B/C; prefer existing vendors (OTel, Sentry, PostHog, Langfuse house default for LLM). Ask before emitting PII or paid-volume storms."
sidebar:
  order: 6
---

`observe-it`

Add or improve observability — structured logs, metrics, traces, errors, analytics, and dashboards — for a feature, bug path, or service. Use when the user says "observe it", asks for instrumentation, telemetry, alerting hooks, or "how do we know this works in prod". Prefer existing vendors and conventions (OTel, Sentry, PostHog, etc.). Ask before emitting PII or new paid-volume event storms.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill observe-it
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/observe-it/SKILL.md)
