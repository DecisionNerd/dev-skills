# agents analyze

Read-only autopsy of an agent system. No prompt rewrites or workflow mutations unless the user switches to `optimize`, `design`, or `slap`.

## Gather

1. **Entry points** — skills (`SKILL.md`), rules, system prompts, agent YAMLs, workflow definitions, Cursor Task configs.
2. **Tools** — allow/deny lists; whether Shell/network/write are available.
3. **Runtime evidence** — transcripts, run IDs, logs, Langfuse/PostHog/OTel if present, CI agent logs.
4. **Success criteria** — what “done” means (often missing → root cause).

## Report shape

```markdown
## Agent analyze: <name or path>

**Surface**
- Harness:
- Agents / roles:
- Tools:

**Observed behavior**
- …

**Evidence**
- …

**Failure modes** (ranked)
1. …
2. …

**Verdict**
keep | slap-then-optimize | redesign

**Recommend**
- `agents <command> …` — why
```

## Focus questions

- Does it have a stop condition and max steps?
- Can two writers touch the same files?
- Are skills/rules contradictory?
- Is context rotting (huge dumps, no summarization)?
- Are tools too broad for the job?
- Would a human know when this agent succeeded?
