---
title: Diagnose Bug
description: "Diagnose backend, API, worker, data-pipeline, or algorithm bugs by reproducing with inputs/tests, checking invariants and complexity assumptions, correlating logs/traces/metrics, and inspecting code. Use when a user reports wrong outputs, failing tests, timeouts, races, incorrect algorithms, flaky jobs, bad API responses, or asks why a non-UI system is broken — before implementation. Diagnose, recommend a fix, and ask a yes/no \"Do you want me to...\" question before changing code or data unless the user already asked to implement. For live web UI / browser-visible product failures, use troubleshoot-app instead."
sidebar:
  order: 2
---

`diagnose-bug`

Diagnose backend, API, worker, data-pipeline, or algorithm bugs by reproducing with inputs/tests, checking invariants and complexity assumptions, correlating logs/traces/metrics, and inspecting code. Use when a user reports wrong outputs, failing tests, timeouts, races, incorrect algorithms, flaky jobs, bad API responses, or asks why a non-UI system is broken — before implementation. Diagnose, recommend a fix, and ask a yes/no "Do you want me to..." question before changing code or data unless the user already asked to implement. For live web UI / browser-visible product failures, use troubleshoot-app instead.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill diagnose-bug
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/diagnose-bug/SKILL.md)
