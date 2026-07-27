# Retire

Leave the room better than you found it. In standards language this is close to ISO/IEC/IEEE 12207 **Disposal** plus **Transition** (cutover) — we say **Retire** so humans hear it.

## Deprecate and transition

- Prefer **strangler / migrate** patterns over big-bang flips when users depend on the old path.
- Dual-run with clear stop conditions for the old system.
- Be honest with users and operators about timelines and what’s breaking.
- Own the cutover: who flips traffic, who watches health ([`ship-it`](../practices/ship-it.md) / [`observe-it`](../practices/observe-it.md)), who turns the old unit off.

## Archive and remember

If you only delete, the next person (often you) will **reinvent a wheel that was already invented, worn out, and thrown away**.

Archive enough to learn:

- ADRs / DocSlime decision crumbs — why this existed, why it died
- Postmortems and “why we killed this” notes
- Pointers to replacements and migrations
- Links from README / handbook so search finds the grave, not a blank folder

Surgical [`document-it`](../practices/document-it.md); DocSlime ADR when the decision binds the org.

## Next

- New opportunity on the ashes → [Discover](01-discover.md)
- Lifecycle overview → [How work flows](index.md)
