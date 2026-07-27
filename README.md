# dev-skills

Personal agent skills for Cursor, Claude Code, Codex, and other agents compatible with [`npx skills`](https://github.com/vercel-labs/skills).

**Docs:** [decisionnerd.github.io/dev-skills](https://decisionnerd.github.io/dev-skills/)

**Handbook:** [*The 'This is Fine' Guide to Building Software*](./handbook/) — lifecycle (Discover → Deliver → Operate → Maintain → Retire), architecture choosers, then the skills/practices deck (source in [`handbook/`](./handbook/); site via `npm run handbook:prepare`).

![This is fine](./handbook/assets/this-is-fine.png)

[![skills.sh](https://skills.sh/b/DecisionNerd/dev-skills)](https://skills.sh/DecisionNerd/dev-skills)

## Install

```bash
npx skills add DecisionNerd/dev-skills
npx skills add DecisionNerd/dev-skills --skill repos -g -y
```

## Available Skills (21)

### GitHub

Orient, repos, issues, milestones, pulls, readiness, and merge.

- **`idk-now`** — When the user doesn't know what to do next: briefly survey environment, repo, docs, and git history; guide them through clarifying questions; then suggest ne…
- **`recon`** — Scout the current work and recommend the next skill or action. Arguments: repo (whole-repo health), issue (deep implementation plan for an issue), milestone…
- **`repos`** — Manage GitHub repositories: create/settings, split, combine, monorepo moves, architecture review, CI harden/simplify, and secrets (Pulumi ESC by default).
- **`issues`** — Work GitHub issues with command arguments: create/draft, update, critique, narrow, widen, merge, clean, refine, explain, document, close, reopen, search, and…
- **`milestones`** — Work GitHub milestones with command arguments: create, update, critique, narrow, widen, merge, clean, refine, explain, document, close, status, and plan.
- **`pulls`** — Work GitHub pull requests with command arguments: create/open, update, critique, narrow, widen, merge, clean, refine, explain, document, review, status/check…
- **`check-readiness`** — Review whether a GitHub issue is complete enough for its current stage and decide the next PR or closure action. Use before PR, before closing an issue, afte…
- **`merge-it`** — Open a GitHub pull request for the current branch, run review/autofix feedback, wait for CI and required checks to go green, merge the PR, confirm linked iss…
### Craft

KISS, research, fix, refactor, test, observe, and document.

- **`kiss`** — Audit goals, processes, systems, and plans for needless complexity — then recommend simplification only when it is warranted.
- **`research-it`** — Research a technical or product question before building — APIs, libraries, prior art in-repo, external docs, tradeoffs, and a recommendation.
- **`fix-it`** — Create an implementation-ready repair plan from troubleshooting evidence, live-app diagnoses, failing URLs, screenshots, logs, data-plane findings, or clearl…
- **`refactor-it`** — Safely refactor code to improve structure, clarity, or testability without changing intended behavior.
- **`test-it`** — Add, fix, or harden tests for the current change, issue, or failing suite.
- **`observe-it`** — Add or improve observability — structured logs, metrics, traces, errors, analytics, and dashboards — for a feature, bug path, or service.
- **`document-it`** — Document what you just changed (surgical by default); use DocSlime structures when product-docs altitude is earned.
### Agents

Slap/drain runaway agents, analyze, optimize, design, and sub-agents.

- **`agents`** — Work agent systems with command arguments: slap (emergency-fix stupid agent behavior and safely drain dumb workflows), analyze, optimize, design, and sub / s…
### Ops & Ship

Live diagnosis, shipping, and local tidy-up.

- **`troubleshoot-app`** — Troubleshoot live web app failures by combining user-visible browser evidence, current project data-plane sources, logs, analytics, and local code inspection.
- **`diagnose-bug`** — Diagnose backend, API, worker, data-pipeline, or algorithm bugs by reproducing with inputs/tests, checking invariants and complexity assumptions, correlating…
- **`stage-it`** — Use when the user asks to stage, promote to staging, land on staging, or "stage it" — getting a feature or release candidate onto the staging branch/environm…
- **`ship-it`** — Use when the user asks to ship, promote, release, or take staging to production/main — especially "ship it", "promote staging to production", "take this to p…
- **`tidy-up`** — Clean dangling workspaces/worktrees, stale branches, excess build artifacts, caches, and other leftover clutter. Arguments: scan/plan (inventory only), works…

## License

MIT — see [LICENSE](./LICENSE).
