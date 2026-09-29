---
title: Diagnose Bug
description: "Diagnose backend, API, worker, data-pipeline, or algorithm bugs by reproducing with inputs/tests, checking invariants and complexity assumptions, correlating logs/traces/metrics, and inspecting code. Use when a user reports wrong outputs, failing tests, timeouts, races, incorrect algorithms, flaky jobs, bad API responses, or asks why a non-UI system is broken. Diagnose, then implement the smallest fix and a regression test in the same run; stop first only for diagnosis-only requests, live-data/outside-repo changes, or a behavior-changing choice between fixes. For live web UI / browser-visible product failures, use troubleshoot-app; for agent/LLM quality failures, use agents analyze."
sidebar:
  order: 2
---

`diagnose-bug`

Diagnose backend, API, worker, data-pipeline, or algorithm bugs from evidence inward. For live web UI failures use troubleshoot-app; for agent/LLM quality use agents analyze.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill diagnose-bug
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/diagnose-bug/SKILL.md)
