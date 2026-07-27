# Document It

Document what changed — **surgically by default**; use DocSlime structures/methods when product-altitude truth is actually in play.

## What it is

After a fix, refactor, or ship: update the nearest accurate home (README, runbook, API note, or an existing DocSlime section) so the next person can use the change. Escalate to DocSlime init/fill/ADR only when durable product/requirements/testing/decision docs are the real gap — not because you documented a PR.

## Why it works

Accuracy beats volume ([Diátaxis](https://diataxis.fr/), Write the Docs). [KISS](kiss.md) / Gall: don’t scaffold a docs org for a paragraph. When product contracts matter, DocSlime is the house [quality trace](../concepts/13-quality-trace.md). Lying or missing claims are still [bugs](../concepts/12-bugs-and-debt.md) — fix the claim you broke; don’t boil the ocean.

## When to use it

Right after work that invalidates docs; when onboarding/ops/API notes drift; when the user asks for product-docs altitude. Prefer `issues document` / `pulls document` for link stubs only.

## Do

- Surgical update first (nearest existing home)
- If `docs/` already exists and the change hits a contract there, patch that file — skip fill theater
- Use DocSlime init/add/fill/ADR only when earned
- One write owner; verify commands/paths

## Don't

- `docslime init` as a side effect of “document this fix”
- Duplicate PRODUCT/REQUIREMENTS into README
- Keep empty theater templates
- Spawn overlapping agents to “go faster”

## Related concepts

[13-quality-trace](../concepts/13-quality-trace.md), [03-smallest-next-step](../concepts/03-smallest-next-step.md), [04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md), [12-bugs-and-debt](../concepts/12-bugs-and-debt.md)

## Further reading

- [Quality trace (handbook)](../concepts/13-quality-trace.md)
- [KISS](kiss.md)
- [Diátaxis](https://diataxis.fr/)
- [DocSlime](https://www.docslime.dev/)
- [Write the Docs — Guide](https://www.writethedocs.org/guide/)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`document-it` · `docslime-*` when product altitude is earned
