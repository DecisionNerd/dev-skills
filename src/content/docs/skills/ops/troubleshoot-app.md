---
title: Troubleshoot App
description: "Troubleshoot live web app failures by combining user-visible browser evidence, current project data-plane sources, logs, analytics, and local code inspection. Use when a user reports a broken or confusing app experience, asks why a deployed/live page is not working, provides a URL to inspect in Atlas or another browser, asks to look at what they see, or wants diagnosis before implementation. The skill must diagnose the problem, recommend a fix, and ask a yes/no \"Do you want me to...\" question before making code or data changes unless the user already explicitly asked to implement. For backend, API, data-pipeline, or algorithm bugs without a UI surface, use diagnose-bug instead."
sidebar:
  order: 1
---

`troubleshoot-app`

Troubleshoot live web app failures by combining user-visible browser evidence, current project data-plane sources, logs, analytics, and local code inspection. Use when a user reports a broken or confusing app experience, asks why a deployed/live page is not working, provides a URL to inspect in Atlas or another browser, asks to look at what they see, or wants diagnosis before implementation. The skill must diagnose the problem, recommend a fix, and ask a yes/no "Do you want me to..." question before making code or data changes unless the user already explicitly asked to implement. For backend, API, data-pipeline, or algorithm bugs without a UI surface, use diagnose-bug instead.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill troubleshoot-app
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/troubleshoot-app/SKILL.md)
