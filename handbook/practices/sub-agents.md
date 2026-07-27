# Sub-Agents

Parent orchestrates; bounded parallel explore / sequential mutate.

## What it is

Parent orchestrates; bounded parallel explore / sequential mutate. This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

Parallelism helps exploration; overlapping writers create conflicts. Anthropic’s agent patterns favor orchestration with clear roles; OWASP warns against excessive agency—bound tools and ownership per child.

## When to use it

When the situation matches the one-liner above and [Orientation](../orientation/index.md) (or your [project path](../paths/index.md)) says this is the fire to touch now.

## Do

- Invoke the skill; follow its safety rules
- Keep one write owner; collect evidence before claiming done
- Hand off to the next practice instead of boiling the ocean

## Don't

- Skip orientation when you’re lost
- Spawn overlapping agents to “go faster”
- Treat the practice as done without evidence

## Related concepts

[05-agent-agency](../concepts/05-agent-agency.md), [06-work-ownership](../concepts/06-work-ownership.md)

## Further reading

- [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`agents sub` · `sub-agents`
