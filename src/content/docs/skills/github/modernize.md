---
title: Modernize
description: Assess and update an old PR against its current base and architecture. Use when the user says modernize, rebase this PR, or bring an old branch up to date; recommend rework or closure when a rebase would preserve obsolete behavior.
sidebar:
  order: 11
---

`modernize <PR|branch>`

Assess whether the original goal still belongs in the current architecture before rebasing. Choose MODERNIZE, REWORK, or CLOSE with evidence; publish only authorized updates with protection against concurrent changes.

A closure recommendation does not close the PR. Assessment-only requests do not update branches, and old CI results do not qualify a newly rebased head.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill modernize
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/modernize/SKILL.md)
- Adapted from [Theo Browne's modernize skill](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/modernize/SKILL.md) (MIT).
