---
title: Pulls
description: "Work GitHub PRs with create/open, update, critique, scope, review, status/checks, watch/monitor, babysit, merge, and close commands. Use when the user asks about PRs or invokes pulls. Watch observes; babysit fixes verified failures and waits without merging. A bare PR identifier or no args on a current-branch PR defaults to Integrate completion via merge-it; explicit commands and ready-for-human-merge requests keep their own finish line. Stage/Ship run only when requested."
sidebar:
  order: 7
---

`pulls`

Work GitHub PRs with create/open, update, critique, scope, review, status/checks, watch/monitor, babysit, merge, and close commands. Use when the user asks about PRs or invokes pulls. Watch observes; babysit fixes verified failures and waits without merging. A bare PR identifier or no args on a current-branch PR defaults to Integrate completion via merge-it; explicit commands and ready-for-human-merge requests keep their own finish line. Stage/Ship run only when requested.

## Monitoring and handoff

- `pulls watch <PR>` / `monitor` observes checks and reviews, reporting actionable failures without edits.
- `pulls babysit <PR>` fixes verified in-scope failures and monitors the updated head without merging.
- “Prepare for my merge” routes to `merge-it prepare` and keeps the PR open for human action.

Monitoring honors the repository's actual base, required bots, and approvals.
T3 Code uses its owning parent thread's PR watcher; other harnesses report any
limitations when only checks can be watched. Older unresolved review findings
are rechecked against the current code rather than discarded by timestamp.

Descriptions lead with the problem and resulting behavior. Authorized comments
identify the agent's role and cite evidence; threads are resolved only after
an authorized reply succeeds.

## Install

```bash
npx skills add DecisionNerd/dev-skills --skill pulls
```

## Source

- [SKILL.md](https://github.com/DecisionNerd/dev-skills/blob/main/skills/pulls/SKILL.md)
