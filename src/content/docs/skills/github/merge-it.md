---
title: Merge It
description: Drive delivery through the repository's actual Integrate, Stage, or Ship path. Use when asked to land, merge, stage, ship, or finish a branch end-to-end. Open or update the PR, fix verified findings, and monitor current-head checks and reviews. Use merge-it prepare for ready-for-human-merge requests; it never merges or enables automatic merging. Merge mode verifies deployment and issue closure for the requested phase. Repository instructions define the release path.
sidebar:
  order: 9
---

`merge-it`

Drive delivery through the repository's actual Integrate, Stage, or Ship path. Use when asked to land, merge, stage, ship, or finish a branch end-to-end. Open or update the PR, fix verified findings, and monitor current-head checks and reviews. Use merge-it prepare for ready-for-human-merge requests; it never merges or enables automatic merging. Merge mode verifies deployment and issue closure for the requested phase. Repository instructions define the release path.

## Completion modes

- `merge-it [integrate|stage|ship]` completes the requested release phase when merging is authorized.
- `merge-it prepare [integrate|stage|ship]` applies scoped fixes, verifies the final head, and monitors checks/reviews, then hands back the PR for human merge.

Prepare mode disables unattended merging for this PR and confirms that state
before pushes and handoff. It never merges, enters a merge queue, performs the
post-merge deployment flow, or closes linked issues. The final verdict is
ready, waiting for required approval, or blocked, with evidence for the current
head. An ordinary “full stop” instruction stops work rather than starting it.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill merge-it
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/merge-it/SKILL.md)
