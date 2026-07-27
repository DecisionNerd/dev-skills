# Operate

Keep the system alive, visible, and honest. Operation is where discovery gets free evidence — if you look.

## Operations

- Clear **ownership** for each deploy unit ([Work ownership](../concepts/06-work-ownership.md)).
- Runbooks for the failures you already know; toil vs engineering — automate only what repeats and hurts.
- Promote with the right play: [`merge-it`](../practices/merge-it.md) · [`stage-it`](../practices/stage-it.md) · [`ship-it`](../practices/ship-it.md).
- Secrets and CI remain boring: [`repos`](../practices/repos.md) (ESC + OIDC by default).

## Observability

Instrument for the [quality regime](../concepts/11-quality-regimes.md) you actually run:

| Regime | Lean toward |
| --- | --- |
| A — deterministic compute | Correctness SLIs, contracts, pipeline freshness |
| B — interactive products | Journeys, Web Vitals / RUM, errors that block jobs |
| C — generative / high-input | Traces, datasets, scores — house default **Langfuse** |

Start with [`observe-it`](../practices/observe-it.md) on the critical path. Don’t invent a full APM estate on day one.

## Feedback → Discover

Production signal, support, scores, and incidents are **product evidence**, not just dashboards. Feed them back into [Discover](01-discover.md): what to pretotype next, what fidelity you actually earned, what debt is charging interest ([Bugs & debt](../concepts/12-bugs-and-debt.md)).

## Next

- Changing code under load → [Maintain](04-maintain.md)
- Killing or replacing a system → [Retire](05-retire.md)
