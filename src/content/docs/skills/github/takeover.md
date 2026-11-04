---
title: Takeover
description: Take over an existing PR, branch, or agent thread while preserving contributor credit and unrelated work. Use when the user says takeover, take over this work, or continue another agent's implementation.
sidebar:
  order: 10
---

`takeover <PR|branch|agent-thread>`

Reconstruct the original goal and current code, establish write ownership, preserve contributor credit, and finish at the requested boundary. Source work and later corrections are rechecked before delivery.

A ready-for-human-merge request stays ready-only. Taking over does not authorize closing the source PR or overwriting an active agent's work.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill takeover
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/takeover/SKILL.md)
- Adapted from [Theo Browne's takeover skill](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/takeover/SKILL.md) (MIT).
