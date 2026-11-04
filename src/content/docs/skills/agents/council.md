---
title: Council
description: Convene independent reviews from three model providers and reconcile their findings. Use when the user says council, asks for a multi-model review, or wants several providers to challenge a plan or implementation.
sidebar:
  order: 2
---

`council <question|plan|path|PR>`

Get independent reviews from three strong models across three providers. The parent
checks the findings against evidence, resolves disagreements, and applies fixes
when requested. Review-only requests return findings without changing the target.

Named members and configured routing are respected. Unavailable providers are
reported without silent substitutions. Iterative reviews stop at agreement or a
bounded limit (three rounds by default), with unresolved dissent kept visible.

Code reviews retain each member's scores and verdicts across rounds. Results go
in an authorized PR description, or in the final reply when no PR edit is authorized.

## Examples

- `council review the current diff` — independent code reviews with scores.
- `council challenge this architecture plan` — alternatives and evidence-backed verdicts.
- `council fix and re-review this PR` — apply accepted fixes and review the updated code.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill council
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/council/SKILL.md)
- Adapted from [Theo Browne's council skill](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/council/SKILL.md) (MIT).
