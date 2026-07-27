# Practices (Tools, Techniques, and Practices)

A practice is the handbook’s smallest unit: one recurring building situation, the mechanism at stake, and the skill-shaped pattern that tends to resolve it. Modular — apply without reading every strategy — but most share the [concepts](../concepts/index.md).

**Don’t start here alphabetically.** Follow a [project path](../paths/index.md), then return for cards you need. Each card’s **Why it works** / **Further reading** cite sources listed in [Sources & grounding](../sources.md).

Browse this index when you know the pattern; browse a [strategy](../strategies/index.md) when you know the goal.

## By project path (starter draws)

| Path | Draw first |
| --- | --- |
| [Simple website](../paths/01-simple-website.md) | IDK Now, KISS, Repos (thin CI), Impeccable, Document It, Pulls, Merge/Ship, Tidy Up |
| [CLI](../paths/02-cli.md) | + Test It, Research It, Issues, Recon Issue, Check Readiness, repos ci harden |
| [Python package](../paths/03-python-package.md) | Research It, Test It, Document It, Repos CI/release, Check Readiness, KISS |
| [Monorepo](../paths/04-monorepo.md) | + Repos (architecture/monorepo/secrets ESC), Milestones, Stage/Ship, Observe, Sub-Agents, Agent Slap |
| [Compute](../paths/compute/index.md) | KISS, Repos CI/secrets (ESC), Observe, Stage/Ship, Diagnose on prod |

## Full catalogue

- [Agent Slap](agent-slap.md): Emergency-fix stupid agent behavior; safely drain dumb workflows.
- [Analyze Agents](analyze-agents.md): Read-only autopsy of agent config, traces, failure modes.
- [Check Readiness](check-readiness.md): Is the issue done enough to PR or close?
- [Design Agents](design-agents.md): Architecture before scaffolding: tools, memory, evals, stop conditions.
- [Diagnose Bug](diagnose-bug.md): Backend / algo / API root-cause with a repair hypothesis.
- [DocSlime](docslime.md): Product docs companion — init, fill, ADR, KISS.
- [Document It](document-it.md): Substantive README/runbook/API/docs that match the code.
- [Document Work](document-work.md): Repo docs that tracked work needs — then link from issue/PR.
- [Fix It](fix-it.md): Plan and implement a repair from diagnosis — smallest real fix.
- [IDK Now](idk-now.md): When you don’t know what to do next: survey, ask, suggest a vision-tied next skill.
- [Impeccable (craft)](impeccable.md): Frontend craft companion — shape, audit, polish UI.
- [Issues](issues.md): Create and shape GitHub issues with critique, narrow, widen, refine, document.
- [KISS](kiss.md): Audit complexity; simplify only when warranted; right-size the DAG.
- [Merge It](merge-it.md): Merge current work to the next integrate target.
- [Milestones](milestones.md): Organize release-shaped work; plan and critique milestone scope.
- [Observe It](observe-it.md): Logs, metrics, traces, analytics — visibility without PII storms.
- [Optimize Agents](optimize-agents.md): Measured improvements to agent loops — after analyze; never during thrash.
- [ProductFeeling](productfeeling.md): Emotion-aware product design companion — feeling north star and audits.
- [Pulls](pulls.md): Open and improve PRs; status/checks; hand off to merge-it when needed.
- [Recon](recon.md): Tactical scout from git/issue/milestone → next skill in this pack.
- [Recon Issue](recon-issue.md): Deep implementation plan for one issue before coding.
- [Refactor It](refactor-it.md): Improve structure without changing intended behavior.
- [Repos](repos.md): GitHub repo split/combine, monorepo, CI, Pulumi ESC secrets.
- [Research It](research-it.md): Evidence-backed options before building; read-only by default.
- [Ship It](ship-it.md): Send it all the way into production and check that it’s healthy.
- [Skill Universe](skill-universe.md): Inventory DecisionNerd + DocSlime + ProductFeeling + Impeccable + vendored skills.
- [Stage It](stage-it.md): Land work on staging per repo policy.
- [Sub-Agents](sub-agents.md): Parent orchestrates; bounded parallel explore / sequential mutate.
- [Test It](test-it.md): Make behavior provable with the repo’s real test stack.
- [Tidy Up](tidy-up.md): Clean dangling workspaces, artifacts, caches, stale branches — inventory first.
- [Troubleshoot App](troubleshoot-app.md): Live UI / data-plane breakage; reproduce, isolate, evidence.
- [Vision / Why](vision-why.md): Recover or write why the project exists before picking tools.
