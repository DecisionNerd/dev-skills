---
title: Stage It
description: "Land a feature or release candidate on the staging branch/environment per repo policy — open and drive the staging PR with gates, merge readiness, and staging deploy verification. Use when the user asks to stage, promote to staging, land on staging, or \"stage it\". Does not send work all the way into production (use ship-it). On main-only repos with no staging policy, do not invent a staging path — use merge-it for the next integrate target, or ship-it if they meant production + health check."
sidebar:
  order: 3
---

`stage-it`

Land a feature or release candidate on the staging branch/environment per repo policy — open and drive the staging PR with gates, merge readiness, and staging deploy verification. Use when the user asks to stage, promote to staging, land on staging, or "stage it". Does not send work all the way into production (use ship-it). On main-only repos with no staging policy, do not invent a staging path — use merge-it for the next integrate target, or ship-it if they meant production + health check.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill stage-it
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/stage-it/SKILL.md)
