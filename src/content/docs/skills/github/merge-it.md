---
title: Merge It
description: "Merge the current work into its next integrate target (main/trunk, release branch, staging, or another repo-defined base) — open/update the PR, run review/autofix, wait for CI green, merge, confirm linked issue closure, and return the local checkout. Use when the user asks to merge this, open a PR and merge it, land this branch on the next target, finish a branch end-to-end, run autofix before merging, or close out an issue through PR completion. Not for sending work all the way into production and checking that it is healthy (use ship-it). Prefer stage-it when the user specifically asked to stage / land on staging."
sidebar:
  order: 8
---

`merge-it`

Merge the current work into its next integrate target (main/trunk, release branch, staging, or another repo-defined base) — open/update the PR, run review/autofix, wait for CI green, merge, confirm linked issue closure, and return the local checkout. Use when the user asks to merge this, open a PR and merge it, land this branch on the next target, finish a branch end-to-end, run autofix before merging, or close out an issue through PR completion. Not for sending work all the way into production and checking that it is healthy (use ship-it). Prefer stage-it when the user specifically asked to stage / land on staging.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill merge-it
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/merge-it/SKILL.md)
