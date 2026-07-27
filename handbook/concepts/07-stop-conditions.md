# Stop Conditions

Explicit rules for when an agent or human loop must halt, ask, or hand off.

## Definition

Max steps, max retries, “ask when unsure,” success criteria, deny-lists for tools/paths. Without them, cheap tokens become expensive fire.

## Why it matters

Most “stupid agent behavior” is missing stop conditions, not missing intelligence.

## For engineers and agents

- Write done-when before tools
- Cap tool calls; ban overlapping writes
- On loop detection → `agents slap`, don’t spawn more

## Where it shows up

`agents design` / `optimize` / `slap`; [Agent Hygiene](../strategies/06-agent-hygiene.md)

