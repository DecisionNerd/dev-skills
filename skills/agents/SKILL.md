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

1. **No argument**: ask intent; offer `slap` (if something is on fire), else `analyze` / `design` / `help`.
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

Only after you know *what* is bad (`analyze` first unless the user already provided a sharp diagnosis). Propose a small numbered plan (prompt splits, tool narrowing, caching, evals, step limits, model routing). Implement only what the user approves. Prefer measurable wins (fewer steps, fewer retries, clearer success criteria).

Details: [references/optimize.md](references/optimize.md).

## `design`

Architecture before code. Output a short design: goal, inputs/outputs, tools (allow/deny), memory, success criteria, failure/escalation, whether to use `sub` fan-out, eval plan. Ask before scaffolding files. Prefer one sharp agent over a swarm.

Details: [references/design.md](references/design.md).

## `sub` / `sub-agents`

Parent agent **orchestrates**; children do bounded work. Follow [references/sub.md](references/sub.md).

Rules:

- Write a crisp parent brief: goal, constraints, done-when, tools allowed, what **not** to do.
- Prefer parallel explore/research children; keep write/mutate work sequential or single-owned.
- Never give two subagents overlapping write ownership of the same files.
- Aggregate child results; parent decides; do not rubber-stamp contradictory child plans.
- If children thrash → **`slap`**, don’t spawn more.

## Related skills

- Product/backend bugs: `diagnose-bug` / `troubleshoot-app` / `fix-it`
- Tests as agent success criteria: `test-it`
- Docs for agents/humans: `document-it`
- Options before design: `research-it`
- Repo situational awareness: `recon`
