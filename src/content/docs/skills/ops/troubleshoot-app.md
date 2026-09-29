---
title: Troubleshoot App
description: "Troubleshoot live web app failures by combining user-visible browser evidence, current project data-plane sources, logs, analytics, and local code inspection. Use when a user reports a broken or confusing app experience, asks why a deployed/live page is not working, provides a URL to inspect in Atlas or another browser, or asks to look at what they see. Diagnose, then implement the smallest fix and a regression test in the same run; stop first only for diagnosis-only requests, live-data/outside-repo changes, or a behavior-changing choice between fixes. For backend, API, data-pipeline, or algorithm bugs without a UI surface, use diagnose-bug; for agent/LLM quality failures, use agents analyze."
sidebar:
  order: 1
---

`troubleshoot-app`

Troubleshoot live web app failures by combining user-visible browser evidence, data-plane sources, logs, analytics, and local code inspection. For backend/API/pipeline bugs without UI, use diagnose-bug; for agent/LLM quality, use agents analyze.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill troubleshoot-app
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/troubleshoot-app/SKILL.md)
