# agents optimize

Improve an existing agent’s **latency, cost, reliability, and loop quality**. Prefer `analyze` first unless the diagnosis is already sharp.

## Principles

- Measure or estimate before/after (steps, retries, tokens, wall time, failure rate).
- Smallest change that removes the top failure mode.
- Do not “optimize” a runaway system — **`slap`** first.
- Keep behavior contracts; don’t silently change product outcomes.

## Common levers (pick few)

| Lever | When |
| --- | --- |
| Step / tool-call caps | Loops, tool spam |
| Narrower tools | Shell/network overuse, accidental writes |
| Clearer done-when | Ambiguous success, endless polish |
| Prompt split (plan vs act) | Mixed planning+editing thrash |
| Model routing | Cheap model for explore, stronger for mutate |
| Caching / less context | Context rot, repeated file reads |
| Evals / golden tasks | Regressions after prompt edits |
| Subagent fan-out | Parallel research; never parallel writers on same paths |

## Output

1. **Target metric(s)**
2. **Plan** (numbered, each reversible)
3. **Risks**
4. Ask approval → implement → re-run a thin smoke scenario → report delta

Hand off to `test-it` for agent eval harnesses, `observe-it` for production agent telemetry, `document-it` for operator runbooks.
