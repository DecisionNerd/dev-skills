# Deliver

Build, integrate, and put the thing into service — with stop conditions and proof that matches the [quality regime](../concepts/11-quality-regimes.md).

## Before you write more code

If **shape, language, framework, or placement** is still hand-wavy, open **[Architecture](../architecture/index.md)** first. Coding without those bets is rearranging smoke.

## Implementation with stop conditions

- One deploy unit (or one package) with a done-when and owner — [Work ownership](../concepts/06-work-ownership.md).
- Prove as you go: [`test-it`](../practices/test-it.md), CI via [`repos`](../practices/repos.md), readiness via [`check-readiness`](../practices/check-readiness.md).
- Structure fighting the change? Frame the bet first — [`architect-it`](../practices/architect-it.md).
- Refuse unearned complexity — [`kiss`](../practices/kiss.md).

## Named ship plays (not synonyms)

`merge-it` runs the whole release path; name the **phase** so nobody confuses a merge with a promote:

| Phase | Means |
| --- | --- |
| Integrate | Land current work into the **next integrate target** (not automatically “production”) |
| Stage | Land on **staging** and verify the staging deploy |
| Ship | Promote **all the way to production** and **check that it’s healthy** |

Use the phase that matches policy. Don’t call a merge a ship.

## Open Architecture mid-delivery when…

- You’re about to add a second language, package, or host
- “Where does this concern live?” has no answer — [What runs where](../architecture/what-runs-where.md)
- Web UI vs docs stack isn’t chosen — [Web framework selection](../concepts/10-web-framework-selection.md)

## Next

- Live in production → [Operate](03-operate.md)
- Still discovering → [Discover](01-discover.md)
