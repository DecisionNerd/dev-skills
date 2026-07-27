# Research It

Evidence-backed options before building; read-only by default.

## What it is

Evidence-backed options before building; read-only by default. This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

Premature commitment is expensive. Lightweight research (constraints, prior art, tradeoffs) before build avoids Gall’s-Law violations. When the repo has no stronger local constraint, prefer house defaults: React+Next on Vercel for web, Pulumi ESC+OIDC for secrets, Langfuse for LLM obs/evals.

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

[04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md), [08-vision-tied-goals](../concepts/08-vision-tied-goals.md)

## Further reading

- [Gall’s Law](https://en.wikipedia.org/wiki/John_Gall_(author)#Gall's_law)
- [Beck Design Rules](https://martinfowler.com/bliki/BeckDesignRules.html)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`research-it`
