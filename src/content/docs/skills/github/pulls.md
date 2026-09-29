---
title: Pulls
description: "Work GitHub pull requests with command arguments: create/open, update, critique, narrow, widen, merge, clean, refine, explain, document, review, status/checks, and close. Default with only a PR identifier (and optional details) is execute Integrate completion work — fix, test, ready-check, autofix→merge — not PR-admin. Treat Stage/Ship as follow-ups; run them only when the user requests that phase. Explicit commands still do admin. No-arg defaults to completing the current-branch PR when one exists. Use when the user asks about PRs, `/pulls <command|#n|url|branch>`, or finishing a change set. For full autofix→CI→merge→issue-close, prefer merge-it (default completion often hands off to it)."
sidebar:
  order: 6
---

`pulls`

Work GitHub pull requests with command arguments: create/open, update, critique, narrow, widen, merge, clean, refine, explain, document, review, status/checks, and close. Default with only a PR identifier (and optional details) is execute Integrate completion work — fix, test, ready-check, autofix→merge — not PR-admin. Treat Stage/Ship as follow-ups; run them only when the user requests that phase. Explicit commands still do admin. No-arg defaults to completing the current-branch PR when one exists. Use when the user asks about PRs, `/pulls <command|#n|url|branch>`, or finishing a change set. For full autofix→CI→merge→issue-close, prefer merge-it (default completion often hands off to it).

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill pulls
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/pulls/SKILL.md)
