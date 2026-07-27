# agents design

Design an agent (or small crew) **before** scaffolding code. Ask before creating files.

## Design doc (keep short)

```markdown
## Agent design: <name>

**Goal** — one sentence
**Users / triggers** — who/what starts it
**Inputs** — required context
**Outputs** — artifacts, side effects, done-when
**Tools** — allow / deny
**Memory** — none | session summary | store X
**Handoffs** — human gates; sibling skills
**Subagents** — none | parallel explore | sequential stages (see agents sub)
**Failure / escalation** — when to stop and ask
**Evals** — 2–3 golden tasks
**Non-goals**
```

## Defaults

- One sharp agent beats a swarm.
- Writes are single-owner; explores may be parallel (`sub`).
- Explicit max-steps and stop conditions from day one.
- Prefer existing harness patterns in-repo over new frameworks.
- If research is needed first → `research-it`; if product code is the real work → don’t hide it inside an “agent.”

After approval: scaffold minimally, then `agents optimize` once you have a trace, `test-it` for evals.
