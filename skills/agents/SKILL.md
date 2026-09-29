---
name: agents
description: >
  Work agent systems with command arguments: slap (emergency-fix stupid agent
  behavior and safely drain dumb workflows), analyze, optimize, design, and
  sub / sub-agents (delegate via subagents). Use when the user says agents,
  `/agents <command>`, agent loops are thrashing, workflows need draining,
  or they want agent architecture, analysis, or parallel subagent execution.
argument-hint: "[slap|analyze|optimize|design|sub|sub-agents] [target...]"
---

# Agents

Command-driven skill for **building, diagnosing, and running** agent systems (Cursor/Codex/Claude agents, Task/subagent trees, Trigger/durable workflows, custom orchestrators). Parse the first token as a command when it matches the table; otherwise map clear intent.

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: the acceptance criteria (existing issue AC, BDD scenarios, tests, or contract when they exist; otherwise propose them and say where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on work you did not verify.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope, unless the user's request already named that exact action. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and for independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each child's result before consolidating. Use Claude Code's `Workflow` tool only for orchestration across many subagents that truly needs it; it is expensive.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents (Claude Code `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule; Codex `agents.default_subagent_model` or a role's `agents.<name>.config_file`; Cursor a custom subagent's `model:` frontmatter), follow it and do not pass a model. Otherwise: mechanical search or inventory → fast/cheap (Claude Code `haiku`); implementation and evidence gathering → mid (`sonnet`); planning, review, adversarial verification → top (`opus` or `fable`). In Claude Code set it with the `Agent` tool `model` param or agent frontmatter `model:`; in Codex pass a spawn model or set `model` in the role's config file; in Cursor set `model:` (default `inherit`) in `.cursor/agents/*.md`. Where the harness cannot choose (e.g. Cursor's built-in Explore/Bash/Browser subagents), children inherit the parent model; say so in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).

## Commands

| Command | What it does |
| --- | --- |
| `slap` | Emergency: stop stupid agent behavior and **safely drain** a dumb/runaway workflow |
| `analyze` | Read-only autopsy of agent config, prompts, tools, traces, failure modes |
| `optimize` | Improve latency, cost, reliability, tool use, and loop quality — with a measured plan |
| `design` | Design an agent (roles, tools, memory, handoffs, evals) before coding |
| `sub` / `sub-agents` | Execute work via **subagents** (parallel/sequential Task agents) with a clear parent brief |
| `help` / `library` | List commands |

Aliases: `subagents` → `sub`; `drain` / `stop` / `kill-loop` → prefer `slap` when the situation is emergency thrash.

Target: path to agent config / skill / workflow, run ID, PR/issue, or free-text symptom (“it keeps rewriting the same file”).

## Routing

1. **No argument**: ask intent via the harness's structured question tool (Claude Code: `AskUserQuestion`); options: `slap` (something on fire), `analyze`, `optimize`, `design`, `sub`, `help`.
2. **First word is a command**: run it; remainder is target/context.
3. **Clear intent** (“emergency stop this agent”, “design a code-review agent”, “use subagents to explore”): map and proceed.
4. **Active runaway loop / dumb workflow burning tokens**: default to **`slap`** even if the user only said “fix the agents”.

Mutating production workflows, killing remote runs, or deleting agent state requires explicit approval unless the user already ordered that exact action. Prefer pause/drain over hard kill when both are possible.

## `slap` — emergency fix + safe drain

Use when an agent is thrashing, looping, spamming tools, rewriting the same files, ignoring instructions, or a durable/workflow run is producing junk. Follow [references/slap.md](references/slap.md).

Goals, in order:

1. **Stabilize** — stop further damage (pause run, cancel queued steps, freeze writes).
2. **Drain** — let in-flight safe work finish or abort cleanly; no orphan locks/partial deploys.
3. **Contain** — revert or quarantine bad agent edits if they landed.
4. **Slap** — name the stupid behavior in one blunt sentence + the smallest durable fix (prompt/guardrail/tool allowlist/max-steps).
5. **Handoff** — `analyze` for root cause, `optimize`/`design` for lasting change, `fix-it` if product code broke.

Do **not** start a new mega-agent to “fix” the runaway. Parent stays in charge; subagents only for narrow read-only recon if needed.

## `analyze`

Read-only. Produce:

- **Surface** — what agent(s), which harness (Cursor Task, Codex, Trigger, custom), entry prompts/skills.
- **Behavior** — observed loops, tool misuse, missing context, contradictory instructions.
- **Evidence** — logs/traces/transcripts/run IDs; cite concrete steps.
- **Failure modes** — ranked: loop, context rot, tool hallucination, scope creep, unsafe writes.
- **Verdict** — keep / redesign / slap-then-optimize.
- **Next** — exact follow-up (`agents optimize …`, `agents design …`, `agents slap …`).

Details: [references/analyze.md](references/analyze.md).

## `optimize`

Only after you know *what* is bad (`analyze` first unless the user already provided a sharp diagnosis). Propose a small numbered plan (prompt splits, tool narrowing, caching, evals, step limits, model routing). Implement in-repo prompt and config changes; ask only before production-workflow or paid changes. Prefer measurable wins (fewer steps, fewer retries, clearer success criteria).

Details: [references/optimize.md](references/optimize.md).

## `design`

Architecture before code. Output a short design: goal, inputs/outputs, tools (allow/deny), memory, success criteria, failure/escalation, whether to use `sub` fan-out, eval plan. Scaffolding is a separate step — end with `Next: scaffold <name>` rather than asking. Prefer one sharp agent over a swarm.

Details: [references/design.md](references/design.md).

## `sub` / `sub-agents`

Parent agent **orchestrates**; children do bounded work. Follow [references/sub.md](references/sub.md).

Rules:

- Write a crisp parent brief: goal, constraints, done-when, tools allowed, what **not** to do.
- Prefer parallel explore/research children; keep write/mutate work sequential or single-owned.
- Never give two subagents overlapping write ownership of the same files.
- Verify each child’s result before consolidating; do not rubber-stamp contradictory child plans.
- Aggregate verified results; parent decides.
- If children thrash → **`slap`**, don’t spawn more.

## Output

Close every run with:

```
Blocked on me: (production/paid change awaiting approval, or "none")
Changed: (files, config changes, GitHub objects, else "nothing")
Found: (analysis verdict, plan, or design). Next: `<exact follow-up invoke>`.
```

## Related skills

- Product/backend bugs: `diagnose-bug` / `troubleshoot-app` / `fix-it` (do not use `agents` as the primary cut for deterministic compute or UI data-plane bugs)
- Tests / evals as success criteria: `test-it` (regime C)
- Traces/scores in prod: `observe-it` (Langfuse house default for LLM)
- Docs for agents/humans: `document-it` (surgical)
- Options before design: `research-it`
- Repo situational awareness: `recon`

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Anthropic: keep agents simple and evaluable. OWASP LLM: bound tools/agency; NIST AI RMF: measure before optimize. Use `slap` to drain runaway loops (excessive agency). Parallel explore / sequential mutate for sub-agents. This is **quality regime C** — design for traces + evals (Langfuse house default), not unit-test theater (`handbook/concepts/11-quality-regimes.md`).

Handbook card: `handbook/practices/design-agents.md`.
