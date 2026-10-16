---
title: Sitrep
description: "Provide a situation report on the current work: objective, done, in progress, blocked, next, and open questions. Default window is everything since the session start or the previous sitrep in this conversation, whichever is later. Evidence comes from session history plus read-only git/GitHub checks. Use when the user says \"sitrep\", \"situation report\", \"status report\", \"where are we\", \"what's happened\", \"catch me up\", or after a long run to summarise state."
sidebar:
  order: 3
---

`sitrep`

Provide a situation report on the current work: objective, done, in progress, blocked, next, and open questions. Default window is everything since the session start or the previous sitrep in this conversation, whichever is later. Evidence comes from session history plus read-only git/GitHub checks. Use when the user says "sitrep", "situation report", "status report", "where are we", "what's happened", "catch me up", or after a long run to summarise state.

Read-only: sitrep reports state and names the next skill to invoke; it never mutates the repo or GitHub as a side effect.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill sitrep
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/sitrep/SKILL.md)
