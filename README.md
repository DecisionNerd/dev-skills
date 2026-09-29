# dev-skills

Personal agent skills for Cursor, Claude Code, Codex, and other agents compatible with [`npx skills`](https://github.com/vercel-labs/skills).

**Docs:** [decisionnerd.github.io/dev-skills](https://decisionnerd.github.io/dev-skills/)

**Handbook:** [*The 'This is Fine' Guide to Building Software*](./handbook/) — lifecycle (Discover → Deliver → Operate → Maintain → Retire), architecture choosers, then the skills/practices deck (source in [`handbook/`](./handbook/); site via `npm run handbook:prepare`).

![This is fine](./handbook/assets/this-is-fine.png)

[![skills.sh](https://skills.sh/b/DecisionNerd/dev-skills)](https://skills.sh/DecisionNerd/dev-skills)

## Install

Install all skills:

```bash
npx skills add DecisionNerd/dev-skills
```

Install one skill globally:

```bash
npx skills add DecisionNerd/dev-skills --skill repos -g -y
```

## Available Skills (20)

### GitHub

Orient, repos, issues, milestones, pulls, readiness, and merge.

- **`idk-now`** — When the user doesn't know what to do next: briefly survey environment, repo, docs, and git history; guide them through clarifying questions; then suggest ne…
- **`recon`** — Scout the current work and recommend the next skill or action. Arguments: repo (whole-repo health), issue (deep implementation plan for an issue), milestone…
- **`repos`** — Manage GitHub repositories: create/settings, split, combine, monorepo moves, architecture review, CI harden/simplify, and secrets (Pulumi ESC by default).
- **`issues`** — Work GitHub issues with command arguments: create/draft, update, critique, narrow, widen, merge, clean, refine, explain, document, close, reopen, search, and…
- **`milestones`** — Work GitHub milestones with command arguments: create, update, critique, narrow, widen, merge, clean, refine, explain, document, close, status, and plan.
- **`pulls`** — Work GitHub pull requests with command arguments: create/open, update, critique, narrow, widen, merge, clean, refine, explain, document, review, status/check…
- **`check-readiness`** — Review whether a GitHub issue is complete enough for its current stage and decide the next PR or closure action. Use before PR, before closing an issue, afte…
- **`merge-it`** — Drive work through the full release path per repo policy — feature PR into the next integrate target (main/trunk, release branch, staging, or another repo-defined base), staging lands with…
### Craft

KISS, research, architect, fix, refactor, test, observe, and document.

- **`kiss`** — Audit goals, processes, systems, and plans for needless complexity — then recommend simplification only when it is warranted.
- **`research-it`** — Research a technical or product question before building — APIs, libraries, prior art in-repo, external docs, tradeoffs, and a recommendation.
- **`architect-it`** — Design or evolve the architecture of a system, module, or feature — survey the codebase, frame the bet (boundaries, placement, data flow), propose options with tradeoffs, record the decisi…
- **`fix-it`** — Create an implementation-ready repair plan from diagnosis evidence — live-app (troubleshoot-app), backend/algo (diagnose-bug), failing URLs, logs, data-plane findings, or clearly rep…
- **`refactor-it`** — Safely refactor code to improve structure, clarity, or testability without changing intended behavior.
- **`test-it`** — Add, fix, or harden tests for the current change, issue, or failing suite.
- **`observe-it`** — Add or improve observability — structured logs, metrics, traces, errors, analytics, dashboards, and (for generative) LLM traces/scores.
- **`document-it`** — Improve or add repository documentation for work just done or for product-docs gaps.
### Agents

Slap/drain runaway agents, analyze, optimize, design, and sub-agents.

- **`agents`** — Work agent systems with command arguments: slap (emergency-fix stupid agent behavior and safely drain dumb workflows), analyze, optimize, design, and sub / s…
### Ops & Ship

Live diagnosis, release path via merge-it, and local tidy-up.

- **`troubleshoot-app`** — Troubleshoot live web app failures by combining user-visible browser evidence, current project data-plane sources, logs, analytics, and local code inspection.
- **`diagnose-bug`** — Diagnose backend, API, worker, data-pipeline, or algorithm bugs by reproducing with inputs/tests, checking invariants and complexity assumptions, correlating…
- **`tidy-up`** — Clean dangling workspaces/worktrees, stale branches, excess build artifacts, caches, and other leftover clutter. Arguments: scan/plan (inventory only), works…

## License

MIT — see [LICENSE](./LICENSE).
