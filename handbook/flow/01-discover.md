# Discover

Learn before you pour accelerant. Discovery is not a phase you finish once — it re-enters from [Operate](03-operate.md) feedback and [Maintain](04-maintain.md) bets.

## Continuous discovery

- Frame the **problem / opportunity** before solution theater.
- Gather evidence from users — and for DX, treat **developers and agents as users** of the system you build.
- Loop: observe → learn → decide the next bet. Tie to [`observe-it`](../practices/observe-it.md), [ProductFeeling](../practices/productfeeling.md), and DocSlime `experience/` when you earn that altitude.

Do not confuse “we brainstormed” with discovery. Discovery produces **falsifiable** next bets.

## Fidelity: pretotype → prototype → MVP

“MVP” means three contradictory things in the wild. Name the level you’re actually at:

| Level | Question it answers | Typical artifact |
| --- | --- | --- |
| **Pretotype** | Would anyone care / try? | Fake door, landing + waitlist, paper, Wizard of Oz |
| **Prototype** | Can this interaction / tech approach work? | Clickable or throwaway code; learning > longevity |
| **MVP — utility-proving** | Does this create real value even if ugly? | Thinnest real usage path |
| **MVP — usable** | Can a real user complete the job without heroics? | Minimum usable product |
| **MVP — shippable** | Can we operate and change it without lighting new fires? | CI, ownership, recoverable deploy |

House stance: pick the **lowest fidelity that can falsify the risk you’re actually carrying**. Run [`kiss`](../practices/kiss.md) when fidelity is unearned. Selling *shippable* while delivering a pretotype is framing debt — see [Bugs & debt](../concepts/12-bugs-and-debt.md).

## Spec altitude: rough vs DocSlime

Two honest modes (not a moral hierarchy):

- **Exploratory building** — rough specification: vision sentence, 2–6 BDD completion scenarios, done-when, known unknowns. Prefer surgical [`document-it`](../practices/document-it.md). Do **not** scaffold full DocSlime theater.
- **Contract building** — fuller DocSlime altitude when stakes, multi-person, regulated, or agent-heavy work needs a durable [quality trace](../concepts/13-quality-trace.md). Use `docslime-*` when earned.

Coffee test: *What failure is expensive if we’re wrong — interest, trust, or infra?* Higher cost → higher altitude.

Agents still need falsifiable scenarios in rough mode; full DocSlime helps them share an oracle — same quality idea, different altitude.

## Next

- Ready to implement → [Deliver](02-deliver.md)
- Shape / language / host unclear → [Architecture](../architecture/index.md)
- Lost on the next bet → [`idk-now`](../practices/idk-now.md)
