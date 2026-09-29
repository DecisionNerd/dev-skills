---
title: Merge It
description: Drive work through the full release path per repo policy — feature PR into the next integrate target (main/trunk, release branch, staging, or another repo-defined base), staging lands with deploy/smoke verification, and production promotion with live health checks. Open or update the PR, run review/autofix, wait for CI green, merge, verify the deploy, confirm linked issue closure, and return the local checkout. Use when the user asks to open a PR and merge it, land this branch, finish a branch end-to-end, stage it, promote to staging, ship it, promote staging to production, or release to prod. The release path always comes from repository instructions, not memory.
sidebar:
  order: 8
---

`merge-it`

Drive work through the full release path per repo policy — feature PR into the next integrate target (main/trunk, release branch, staging, or another repo-defined base), staging lands with deploy/smoke verification, and production promotion with live health checks. Open or update the PR, run review/autofix, wait for CI green, merge, verify the deploy, confirm linked issue closure, and return the local checkout. Use when the user asks to open a PR and merge it, land this branch, finish a branch end-to-end, stage it, promote to staging, ship it, promote staging to production, or release to prod. The release path always comes from repository instructions, not memory.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill merge-it
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/merge-it/SKILL.md)
