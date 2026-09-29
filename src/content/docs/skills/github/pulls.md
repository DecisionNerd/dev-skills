---
title: Pulls
description: "Work GitHub pull requests with command arguments: create/open, update, critique, narrow, widen, merge, clean, refine, explain, document, review, status/checks, and close. Default with only a PR identifier (and optional details) is execute completion work — fix, test, ready-check, autofix→merge, stage/ship where repo policy has them — not PR-admin. Explicit commands still do admin. No-arg defaults to completing the current-branch PR when one exists. Use when the user asks about PRs, `/pulls <command|#n|url|branch>`, or finishing a change set. For full autofix→CI→merge→issue-close, prefer merge-it (default completion often hands off to it)."
sidebar:
  order: 6
---

`pulls`

Work GitHub pull requests with command arguments: create/open, update, critique, narrow, widen, merge, clean, refine, explain, document, review, status/checks, and close. Default with only a PR identifier (and optional details) is execute completion work — fix, test, ready-check, autofix→merge, stage/ship where repo policy has them — not PR-admin. Explicit commands still do admin. No-arg defaults to completing the current-branch PR when one exists. Use when the user asks about PRs, `/pulls <command|#n|url|branch>`, or finishing a change set. For full autofix→CI→merge→issue-close, prefer merge-it (default completion often hands off to it).

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill pulls
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/pulls/SKILL.md)
