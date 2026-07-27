---
name: document-it
description: >
  Improve or add repository documentation for work just done or for product-docs
  gaps. Use when the user says "document it", asks for README/runbook/API notes,
  architecture notes, changelogs, ADRs, or DocSlime product docs. Default to a
  surgical update of the nearest accurate home after a change — do not scaffold
  or fill a DocSlime tree unless the altitude truly needs it. When product/
  requirements/testing/observability contracts are in play, use DocSlime
  structures and methods. Keep docs accurate to the code.
argument-hint: "[path|feature|audience|docslime-name...]"
---

# Document It

Make the next human (or agent) able to **use, operate, or change** the thing without reverse-engineering — **without overbuilding docs**.

## Goldilocks first

| Situation | Do |
| --- | --- |
| You **just** fixed/shipped/refactored something | **Surgical update** — nearest accurate README, runbook, API note, changelog, or existing `docs/` section. Stop when a skeptic can use the change. |
| Product promise, requirements, test/obs contracts, or irreversible decisions | **DocSlime altitude** — update (or carefully add) the matching DocSlime page / ADR using DocSlime methods |
| No `docs/` and you only need a local how-to | Write/update root README or a small existing doc — **don’t** `docslime init` for a paragraph |
| User asks to set up / fill product docs | Then use `docslime-init` / `docslime-fill` / etc. |

**Don’t overuse DocSlime.** Init, full-tree fill, or new template pages are *earned* by missing product-altitude truth — not by “we should document this PR.”

## When to use

- “Document it” after `fix-it` / `refactor-it` / `observe-it` / ship
- Stale README/runbook/API for the surface you touched
- Real DocSlime gaps (PRODUCT/REQUIREMENTS/TESTING/ADR/…) when the user wants that altitude
- When `issues document` / `pulls document` needs a real edit, not a link stub

## Workflow

1. **Audience & job**
   - Who must succeed (user, integrator, operator, developer, agent)?
   - Smallest doc change that enables that job?

2. **Pick the smallest home**
   - Prefer an **existing** page next to the work (README section, runbook, module doc, changelog).
   - If a DocSlime tree **already exists** and the change touches a contract there (requirement, scenario map, obs signal, architecture), update that file surgically — don’t open a fill interview for one sentence.
   - Only propose `docslime init` / `docslime add` when durable product docs are missing *and* the user wants that system — not as a side effect of documenting today’s fix.

3. **Write or update**
   - Match local voice; document commands, contracts, env vars, failure modes, examples that match **current** code.
   - Cut stale claims; don’t document aspirations as fact.
   - No secrets.

4. **Verify**
   - Commands/paths work (or mark TBD); links resolve.

5. **Follow-up**
   - Offer `pulls create` / `merge-it`, or point the issue at new paths.
   - Offer DocSlime fill/ADR/kiss **only** if a real product-docs gap remains.

## When DocSlime *is* the right altitude

Use DocSlime **structures and methods** (not a bigger process than needed):

```
docs/
├── PRODUCT.md / DESIGN.md / REQUIREMENTS.md
├── experience/ …
└── engineering/ ARCHITECTURE · TESTING · PUBLISHING · OBSERVABILITY · adrs/
```

Methods when working at that altitude:

- Don’t invent product facts; interview only when filling gaps that matter
- Requirements testable/solution-neutral; TESTING maps GWT → evidence
- Hard decisions → ADR (`docslime add adr`); don’t bury them in chat
- Don’t keep empty theater templates; don’t fork PRODUCT into README
- Finished scaffold pages: remove `<!-- LLM: ... -->` / italic prompts

Tooling when earned: `docslime-install` → `init` / `add` / `fill` / `adr` / `kiss`.

## Guardrails

- Prefer surgical diffs over new trees.
- Don’t create parallel taxonomies beside an existing DocSlime `docs/`.
- Don’t init DocSlime “while we’re here” after a small code change.
- Keep diffs reviewable.
- Lying docs are still bugs — fix the claim you invalidated; don’t boil the ocean.

## Output

```markdown
**Audience / job**
- ...

**Scope**
- surgical | docslime-altitude
- why this altitude: ...

**Docs changed**
- paths: ...

**What a reader can now do**
- ...

**Follow-Up Prompt**
Do you want a PR (pulls create / merge-it), or is a deeper DocSlime fill/ADR actually needed?
```

## Grounding

Diátaxis / Write the Docs: accuracy over volume. DocSlime is the house product-docs system when altitude warrants it (`handbook/concepts/13-quality-trace.md`). KISS: don’t overbuild (`handbook/practices/kiss.md`). Lying docs are bugs (`12-bugs-and-debt.md`).

Handbook card: `handbook/practices/document-it.md`.
