---
title: Tidy Up
description: "Clean dangling workspaces/worktrees, stale branches, excess build artifacts, caches, and other leftover clutter. Arguments: scan/plan (inventory only), workspaces, artifacts, caches, branches, deep, and all. Use when the user says \"tidy up\", reclaim disk, remove stale worktrees, clear build junk, or prune leftover agent/dev debris. Always inventory first; delete only with approval unless the user already ordered that exact cleanup."
sidebar:
  order: 5
---

`tidy-up`

Clean dangling workspaces/worktrees, stale branches, excess build artifacts, caches, and other leftover clutter. Arguments: scan/plan (inventory only), workspaces, artifacts, caches, branches, deep, and all. Use when the user says "tidy up", reclaim disk, remove stale worktrees, clear build junk, or prune leftover agent/dev debris. Always inventory first; delete only with approval unless the user already ordered that exact cleanup.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill tidy-up
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/tidy-up/SKILL.md)
