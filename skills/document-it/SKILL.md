---
name: document-it
description: >
  Improve or add repository documentation for a feature, API, ops path, or
  decision. Use when the user says "document it", asks for README/runbook/API
  docs, architecture notes, changelog entries, or DocSlime-style product docs
  updates. Prefer editing existing docs over new files; keep docs accurate to
  the code. For issue/PR-scoped doc links only, issues document / pulls document
  may be enough — use this skill for substantive doc work.
argument-hint: "[path|feature|audience...]"
---

# Document It

Make the next human (or agent) able to **use, operate, or change** the thing without reverse-engineering.

## When to use

- “Document it”, missing README/runbook, stale API docs, onboarding gaps
- After `fix-it` / `refactor-it` / `observe-it` when behavior or ops changed
- When `issues document` / `pulls document` needs a real docs PR, not a link stub

## Workflow

1. **Audience & job**
   - Who is the reader (user, integrator, operator, future implementer)?
   - What job must the doc enable?

2. **Find the canonical home**
   - Prefer existing trees: `README`, `docs/`, `AGENTS.md` pointers, API refs, runbooks.
   - If the repo uses DocSlime (`PRODUCT.md`, `REQUIREMENTS.md`, etc.), update those shapes instead of inventing parallel docs.
   - Create a new file only when no suitable home exists and the user accepts it.

3. **Write or update**
   - Match local voice and structure.
   - Document contracts, commands, env vars, failure modes, and examples that match **current** code.
   - Cut stale claims; don’t document aspirations as fact.
   - Link to issues/PRs sparingly for durable decisions.

4. **Verify**
   - Commands and paths in the doc actually work (or mark TBD).
   - Cross-links resolve.

5. **Follow-up**
   - Offer `pulls create` / `merge-it` to land docs, or `issues refine` to point the issue at new paths.

## Guardrails

- No secrets in docs.
- Don’t duplicate three sources of truth — pick one canonical page and link.
- Keep diffs reviewable; prefer surgical edits.

## Output

```markdown
**Audience / job**
- ...

**Docs changed**
- paths: ...

**What a reader can now do**
- ...

**Follow-Up Prompt**
Do you want me to open a PR with pulls create / merge-it?
```
