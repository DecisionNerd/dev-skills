# What runs where

Place **concerns**, not brand logos. Decide *what kind of work* lives in the browser, at the edge, in an API, in a worker, in data stores, or in a **managed SaaS / OSS** you don’t operate — then pick a [compute host](../paths/compute/index.md) only for units you still run yourself.

## Concerns to place

UI · auth · business logic · jobs / queues · storage · search · LLM calls · secrets · webhooks · admin / docs

Ask for each: *Is this core differentiation, or undifferentiated plumbing?* Plumbing often belongs in a vendor (see [Maintain — buy/vendor/OSS](../flow/04-maintain.md)).

## Lean defaults (house stance)

| Concern | Default lean placement |
| --- | --- |
| Product web UI + light full-stack | [Next.js + React on Vercel](../concepts/10-web-framework-selection.md) |
| Docs / handbook | Astro Starlight (static host / Pages) |
| Auth / payments / email (undifferentiated) | Managed SaaS when exit is acceptable |
| Async / spiky / event work | Worker / [serverless](../paths/compute/serverless.md) |
| Long-running or portable process | [Docker](../paths/compute/docker.md) → Fly / Cloud Run / etc. |
| Secrets | Pulumi ESC + OIDC — [`repos`](../practices/repos.md) |
| Generative traces / evals | Langfuse ([quality regime C](../concepts/11-quality-regimes.md)) |

One primary language per deploy unit — [Language selection](../concepts/09-language-selection.md).

## Then choose a host

Only after placement: open the [Compute catalog](../paths/compute/index.md). Host shopping before placement is how you get three clouds and no ownership map.

## Anti-patterns

- Every concern a microservice “for scale”
- A second host “just in case”
- LLM glue sprawl with no owner and no traces
- Rebuilding undifferentiated SaaS in-house on a deadline
- Skipping [Architecture](index.md) and coding until the diagram appears by accident

## Related

- Lifecycle: [Deliver](../flow/02-deliver.md) · [Maintain](../flow/04-maintain.md) · [Operate](../flow/03-operate.md)
- Shape: [Project shapes](../paths/index.md)
