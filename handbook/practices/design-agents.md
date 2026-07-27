# Design Agents

Architecture before scaffolding: tools, memory, evals, stop conditions.

## What it is

Architecture before scaffolding: tools, memory, evals, stop conditions. This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

This is **regime C** design ([Quality regimes](../concepts/11-quality-regimes.md)): quality is eval + trace shaped, not “assert exact string.” Effective agent systems stay simple — clear tools, explicit handoffs, and evaluation — not maximal swarms (Anthropic). Design-time limits on agency reduce OWASP “excessive agency” and sensitive-data leakage. Bake in datasets, graders, and observability (house default: Langfuse on OTel). Treat max-steps and deny-lists like non-functional requirements.

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

[05-agent-agency](../concepts/05-agent-agency.md), [07-stop-conditions](../concepts/07-stop-conditions.md), [11-quality-regimes](../concepts/11-quality-regimes.md)

## Further reading

- [Quality regimes (handbook)](../concepts/11-quality-regimes.md)
- [Anthropic — Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Langfuse docs](https://langfuse.com/docs)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`agents design`
