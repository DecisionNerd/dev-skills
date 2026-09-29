---
name: document-it
description: >
  Improve or add repository documentation for work just done or for product-docs
  gaps. Use when the user says "document it", asks for README/runbook/API notes,
  architecture notes, changelogs, ADRs, or DocSlime product docs. Default to a
  surgical update of the nearest accurate home after a change — do not scaffold
  or fill a DocSlime tree unless the altitude truly needs it. When
  product/requirements/testing/observability contracts are in play, use DocSlime
  structures and methods. Keep docs accurate to the code.
argument-hint: "[path|feature|audience|docslime-name...]"
---

# Document It

Make the next human (or agent) able to **use, operate, or change** the thing without reverse-engineering — **without overbuilding docs**.

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: the acceptance criteria (existing issue AC, BDD scenarios, tests, or contract when they exist; otherwise propose them and say where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on work you did not verify.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope, unless the user's request already named that exact action. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and for independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each child's result before consolidating. Use Claude Code's `Workflow` tool only for orchestration across many subagents that truly needs it; it is expensive.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents (Claude Code `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule; Codex `agents.default_subagent_model` or a role's `agents.<name>.config_file`; Cursor a custom subagent's `model:` frontmatter), follow it and do not pass a model. Otherwise: mechanical search or inventory → fast/cheap (Claude Code `haiku`); implementation and evidence gathering → mid (`sonnet`); planning, review, adversarial verification → top (`opus` or `fable`). In Claude Code set it with the `Agent` tool `model` param or agent frontmatter `model:`; in Codex pass a spawn model or set `model` in the role's config file; in Cursor set `model:` (default `inherit`) in `.cursor/agents/*.md`. Where the harness cannot choose (e.g. Cursor's built-in Explore/Bash/Browser subagents), children inherit the parent model; say so in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).

## Goldilocks first

| Situation | Do |
| --- | --- |
| You **just** fixed/shipped/refactored something | **Surgical update** — nearest accurate README, runbook, API note, changelog, or existing `docs/` section. Stop when a skeptic can use the change. |
| Product promise, requirements, test/obs contracts, or irreversible decisions | **DocSlime altitude** — update (or carefully add) the matching DocSlime page / ADR using DocSlime methods |
| No `docs/` and you only need a local how-to | Write/update root README or a small existing doc — **don't** `docslime init` for a paragraph |
| User asks to set up / fill product docs | Then use `docslime-init` / `docslime-fill` / etc. |

**Don't overuse DocSlime.** Init, full-tree fill, or new template pages are *earned* by missing product-altitude truth — not by "we should document this PR."

## When to use

- "Document it" after `fix-it` / `refactor-it` / `observe-it` / ship
- Stale README/runbook/API for the surface you touched
- Real DocSlime gaps (PRODUCT/REQUIREMENTS/TESTING/ADR/…) when the user wants that altitude
- When `issues document` / `pulls document` needs a real edit, not a link stub

## Workflow

Done when: a skeptic can use the change; commands and links verified against current code.

1. **Audience & job**
   - Who must succeed (user, integrator, operator, developer, agent)?
   - Smallest doc change that enables that job?

2. **Pick the smallest home**
   - Prefer an **existing** page next to the work (README section, runbook, module doc, changelog).
   - If a DocSlime tree **already exists** and the change touches a contract there (requirement, scenario map, obs signal, architecture), update that file surgically — don't open a fill interview for one sentence.
   - Only propose `docslime init` / `docslime add` when durable product docs are missing *and* the user wants that system — not as a side effect of documenting today's fix.

3. **Write or update**
   - Match local voice; document commands, contracts, env vars, failure modes, examples that match **current** code.
   - Cut stale claims; don't document aspirations as fact.
   - No secrets.

4. **Verify**
   - Commands/paths work (or mark TBD); links resolve.

5. **Wrap up**
   - Next: `pulls create` / `merge-it` to land, or point the issue at new paths.
   - Next: DocSlime fill/ADR/kiss only if a real product-docs gap remains.

## When DocSlime *is* the right altitude

Use DocSlime **structures and methods** (not a bigger process than needed):

```
docs/
├── PRODUCT.md / DESIGN.md / REQUIREMENTS.md
├── experience/ …
└── engineering/ ARCHITECTURE · TESTING · PUBLISHING · OBSERVABILITY · adrs/
```

Methods when working at that altitude:

- Don't invent product facts; interview only when filling gaps that matter
- Requirements testable/solution-neutral; TESTING maps GWT → evidence
- Hard decisions → ADR (`docslime add adr`); don't bury them in chat
- Don't keep empty theater templates; don't fork PRODUCT into README
- Finished scaffold pages: remove `<!-- LLM: ... -->` / italic prompts

Tooling when earned: `docslime-install` → `init` / `add` / `fill` / `adr` / `kiss`.

## Guardrails

- Prefer surgical diffs over new trees.
- Don't create parallel taxonomies beside an existing DocSlime `docs/`.
- Don't init DocSlime "while we're here" after a small code change.
- Keep diffs reviewable.
- Lying docs are still bugs — fix the claim you invalidated; don't boil the ocean.

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

## Blocked on me

none

## Changed

- ...

## Found

- ...
- Next: pulls create / merge-it
```

## Grounding

Diátaxis / Write the Docs: accuracy over volume. DocSlime is the house product-docs system when altitude warrants it (`handbook/concepts/13-quality-trace.md`). KISS: don't overbuild (`handbook/practices/kiss.md`). Lying docs are bugs (`12-bugs-and-debt.md`).

Handbook card: `handbook/practices/document-it.md`.
