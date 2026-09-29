---
title: Issues
description: "Work GitHub issues with command arguments: create/draft, update, critique, narrow, widen, merge, clean, refine, explain, document, close, reopen, search, and status. Default with only an issue identifier (and optional details) is execute completion work — plan/diagnose/implement/test/ready-check/merge — not issue-admin. Explicit commands still do admin. Rough idea with no identifier defaults to `create`. Use when the user asks about issues, `/issues <command|#n|url|idea>`, drafting or improving an issue, or finishing tracked work."
sidebar:
  order: 4
---

`issues`

Work GitHub issues with command arguments: create/draft, update, critique, narrow, widen, merge, clean, refine, explain, document, close, reopen, search, and status. Default with only an issue identifier (and optional details) is execute completion work — plan/diagnose/implement/test/ready-check/merge — not issue-admin. Explicit commands still do admin. Rough idea with no identifier defaults to `create`. Use when the user asks about issues, `/issues <command|#n|url|idea>`, drafting or improving an issue, or finishing tracked work.

An issue identifier starts the completion workflow. Planning works without native Plan Mode. Implementation defaults to an owned task worktree, with a separate worktree for each concurrent writer and the same path carried through skill handoffs.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill issues
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/issues/SKILL.md)
