---
title: Stage It
description: "Use when the user asks to stage, promote to staging, land on staging, or \"stage it\" — getting a feature or release candidate onto the staging branch/environment. On repos with staging branch rules, open and drive the PR into staging with gates, merge readiness, and staging deploy verification. On main-only repos (no staging policy), do not invent a staging path — ask the user to use ship-it to promote to production instead."
sidebar:
  order: 3
---

`stage-it`

Use when the user asks to stage, promote to staging, land on staging, or "stage it" — getting a feature or release candidate onto the staging branch/environment. On repos with staging branch rules, open and drive the PR into staging with gates, merge readiness, and staging deploy verification. On main-only repos (no staging policy), do not invent a staging path — ask the user to use ship-it to promote to production instead.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill stage-it
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/stage-it/SKILL.md)
