# agents slap

Emergency protocol: stop stupid agent behavior and **safely drain** a dumb or runaway workflow.

Use the user’s wording when they say **emergency fix stupid agent behavior** and **safely drain dumb workflow** — that is the job.

## When this is the right command

- Agent rewriting the same file / retrying the same failing tool
- Infinite plan↔edit loops, ignore-user instructions, tool spam
- Durable/workflow runs enqueueing junk steps or never completing
- Subagent swarm with overlapping writes or contradictory “fixes”
- User says: slap, stop, drain, kill the loop, agent is being stupid

If the problem is normal product code (not agent orchestration), hand off to `diagnose-bug` / `troubleshoot-app` / `fix-it` after containment.

## Hard rules

1. **Parent stays in charge.** Do not spawn a bigger agent to fix a runaway agent.
2. **Pause before delete.** Prefer pause/cancel/drain over destroying evidence.
3. **No overlapping writers.** If multiple agents can write, stop all but one (usually none until human approval).
4. **Ask before destructive remote actions** (force-cancel prod workflows, wipe queues, hard-reset branches) unless the user already ordered that exact action.
5. **One blunt diagnosis.** Name the stupid behavior in a single sentence; then the smallest fix.

## Procedure

### 1. Stabilize (stop the bleeding)

Identify what is still running:

- Local: cancel/stop the active agent turn if the harness allows; do not start new Task/subagents except a **read-only** scout if needed.
- Remote/durable (Trigger, queues, CI agent jobs): list active runs; **pause** or **cancel queued** work; leave in-flight *safe* steps noted for drain.
- File system: note dirty paths (`git status`); if an agent is mid-write, wait for the process to stop before editing the same files yourself.

Output a one-line **Freeze**: what you stopped and what is still draining.

### 2. Safely drain

Drain means: no new dumb work enters; in-flight work either finishes cleanly or aborts without leaving locks, half-deploys, or corrupted state.

Checklist:

- [ ] No new agent turns / workflow triggers / retries scheduled
- [ ] In-flight steps classified: **safe to finish** vs **abort now**
- [ ] Locks, leases, advisory locks, or “running” flags cleared or timed out intentionally
- [ ] Partial deploys / migrations: stop before apply if unsure; do not “finish” a bad migration
- [ ] Queues empty or parked; dead-letter noted if present

If you cannot drain safely, say what is stuck and ask for the one approval that unblocks (e.g. “cancel run `run_…`”).

### 3. Contain damage

- Diff agent-touched files; list bad edits.
- Prefer `git checkout -- <path>` / revert of agent-only commits **only with approval** (or if user said “undo the agent”).
- Quarantine: move speculative agent output to a scratch note; don’t leave conflicting half-implementations in the main path.
- Secrets: if the agent may have logged or committed secrets, flag immediately (rotate guidance; do not paste secrets back).

### 4. Slap (name it + smallest durable fix)

Write exactly:

```markdown
**Stupid behavior**
<one blunt sentence: what it kept doing wrong>

**Why**
<one short cause: missing stop condition, tool too broad, conflicting skills, no max-steps, etc.>

**Slap (durable)**
1. <smallest guardrail — e.g. max N tool calls, deny write to X, success criteria Y>
2. <optional second guardrail>

**Drain status**
frozen / draining / drained — <one line>
```

Examples of durable slaps (pick the smallest that fits):

- Hard **max-steps** / max tool calls / wall-clock budget
- Narrow **tool allowlist**; ban `Shell` or network if not needed
- Explicit **stop conditions** and “ask human when unsure”
- Split one overloaded agent into planner (read-only) + executor (writes)
- Disable auto-retry / exponential re-queue on known-fatal errors
- Remove contradictory instructions from stacked skills/rules

### 5. Handoff

- Need root cause depth → `agents analyze`
- Need lasting architecture → `agents design` or `agents optimize`
- Product broke → `fix-it` / `test-it`
- Docs/runbooks wrong → `document-it`

End with one **Follow-Up Prompt**: e.g. “Drain complete — run `agents analyze` on `<path>`?”

## Anti-patterns

- Spawning more subagents to “outvote” the dumb one
- Rewriting the whole agent system during an emergency
- Hard-killing mid-migration without checking state
- Silent force-push / history rewrite to hide agent mess
- Optimizing prompts before the workflow is drained
