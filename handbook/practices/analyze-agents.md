# Analyze Agents

Read-only autopsy of agent config, traces, failure modes.

## What it is

Read-only autopsy of agent config, traces, failure modes. This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

You cannot improve what you do not observe. SRE and DevOps both insist on evidence before change; agent systems need the same: traces of tool calls, failure modes, and stop-condition gaps. NIST AI RMF’s Map/Measure steps put diagnosis before govern-by-vibes rewrites.

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

[05-agent-agency](../concepts/05-agent-agency.md), [04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md)

## Further reading

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [OpenTelemetry docs](https://opentelemetry.io/docs/)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`agents analyze`
