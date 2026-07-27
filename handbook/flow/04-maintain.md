# Maintain

Change without boiling the ocean. Most of a system’s life is spent here — and in the LLM era, the temptation is to regenerate rather than steward.

## Maintaining old code

- Debt charges **interest** — see [Bugs & debt](../concepts/12-bugs-and-debt.md).
- Characterize before you change: tests, contracts, or golden paths that pin behavior ([`test-it`](../practices/test-it.md), [`refactor-it`](../practices/refactor-it.md)).
- Sometimes the right move is **don’t touch** — isolate, document the landmine, wait for a real trigger.

## Refactor, update, simplify

| Move | When |
| --- | --- |
| **Refactor** | Behavior-preserving; change cost or clarity demands it; safety net exists |
| **Update** | Dependencies / platforms — treat as risk, not chores-in-bulk |
| **Simplify** | [`kiss`](../practices/kiss.md) — delete unearned machinery |

Rewrite is not refactor. Earn rewrites with evidence that incremental change failed or the architecture bet is wrong — then consider [Architecture](../architecture/index.md) again.

## Buy, vendor, or OSS

Keep in-house vs SaaS vs open-source alternative. The replacement may be “worse” as a product and still win if it **removes maintenance or cuts cost**. Decide with:

- Is this **core differentiation** or undifferentiated plumbing?
- Ops load, lock-in, and **exit** path
- Placement: often “vendor this concern” is the answer in [What runs where](../architecture/what-runs-where.md)

## LLM-era economics

**Mediocre code is almost free; good engineering is still expensive.**

Agents amplify the volume of okay-ish systems. Garbage software and brittle integrations aren’t proof that quality doesn’t matter — they’re proof that **cheap generation without ownership, regimes, and stop conditions** scales mess. Refuse a larger pile: quality regimes, [`agents slap`](../practices/agent-slap.md), evidence over vibes, and human ownership of the deploy unit.

## Next

- Still learning what to build → [Discover](01-discover.md)
- End of life → [Retire](05-retire.md)
