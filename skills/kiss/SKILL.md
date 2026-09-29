---
name: kiss
description: >
  Audit goals, processes, systems, and plans for needless complexity — then
  recommend simplification only when it is warranted. Use when the user says
  "kiss", "keep it simple", "is this overcomplicated", "simplify this", or asks
  whether to cut scope/steps/architecture. Weigh risks and benefits of
  simplifying; do not default to reductionist cuts when complexity is earned.
  Simple also means a straightforward DAG to completion with right-sized tasks
  (not too small, not overly big). Pair with idk-now, recon, refactor-it, or
  agents design when the target is unclear or agent-shaped.
argument-hint: "[audit|goals|process|system|plan|flow|help] [target...]"
---

# KISS

**Keep It Simple** — honestly. Look at what is used or planned (goals, processes, systems, workflows), judge whether it is *overly* complex, and only then recommend simplification. If complexity is earned, say so and protect it.

Simple here means:

1. A **straightforward DAG** from now → done (clear dependencies, few parallel critical paths, obvious stop).
2. **Right-sized tasks** — not micro-chores that thrash context, not epic blobs that hide risk.
3. **Least mechanism** that still serves the vision and constraints (safety, scale, compliance, team reality).

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: the acceptance criteria (existing issue AC, BDD scenarios, tests, or contract when they exist; otherwise propose them and say where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on work you did not verify.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and for independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each child's result before consolidating. Use Claude Code's `Workflow` tool only for orchestration across many subagents that truly needs it; it is expensive.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents (Claude Code `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule; Codex `agents.default_subagent_model` or a role's `agents.<name>.config_file`), follow it and do not pass a model. Otherwise: mechanical search or inventory → fast/cheap (Claude Code `haiku`); implementation and evidence gathering → mid (`sonnet`); planning, review, adversarial verification → top (`opus` or `fable`). In Claude Code set it with the `Agent` tool `model` param or agent frontmatter `model:`; in Codex pass a spawn model or set `model` in the role's config file. Where the harness cannot choose (Cursor per-subagent model selection is unverified; assume it cannot), children inherit the parent model; say so in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).

## Commands

| Command | What it does |
| --- | --- |
| *(none)* / `audit` | Full KISS pass on the named (or inferred) target |
| `goals` | Focus on goal/scope sprawl vs vision-tied outcomes |
| `process` | Focus on rituals, checklists, handoffs, approval chains |
| `system` | Focus on architecture, services, tools, agent stacks |
| `plan` | Focus on an implementation plan / milestone / issue set |
| `flow` / `dag` | Draw or critique the task DAG; resize nodes |
| `help` / `library` | List commands |

Target: path, issue/PR/milestone, doc, plan paste, agent design, or “current work.”

## Routing

1. No args → `audit` on current git/docs scope (brief survey first).
2. First word is a command → that lens; remainder is target.
3. Clear intent (“is this architecture too much?”, “simplify the rollout plan”) → map and run.

Read-only by default. Do not delete systems, rewrite plans, or cut scope until the user accepts a recommendation.

## Hard rules

1. **No automatic reductionism.** Complexity that buys safety, clarity, scale, or irreversible-risk control can stay. Say *keep* when keep is right.
2. Always present **benefits and risks of simplifying** (and of *not* simplifying).
3. Prefer **one** primary recommendation: simplify / keep / reshape (right-size without net removal).
4. If recommending simplify, show the **simpler DAG** and what was removed or merged — and what must remain.
5. Tasks in the DAG must pass the **Goldilocks test**: each node is finishable in one focused session (or clearly “part N”), has a done-when, and is not a fake split of a single thought.

## Workflow (`audit` and siblings)

### 1. Scope the target

Name what you’re kissing: goal set, process, system, plan, or flow. Skim evidence (docs, code layout, issue graph, agent config, user’s paste). If scope is fuzzy, ask one clarifying question (structured question tool when available, else numbered options) or run a 30-second `recon`-style git glance. For large targets (multiple areas or packages), one subagent per lens/area (fast tier) in parallel; an independent top-tier subagent argues "keep" before you recommend "simplify"; verify each before consolidating.

### 2. Describe current shape

- **Intent** — what success is
- **Pieces** — goals / steps / components / roles
- **Coupling** — what depends on what (sketch a DAG)
- **Tax** — coordination cost, cognitive load, failure modes, time-to-value

### 3. Complexity verdict

Choose one:

| Verdict | Meaning |
| --- | --- |
| **Overly complex** | Mechanism exceeds need; DAG is tangled, tasks wrong-sized, or redundant layers don’t buy required properties |
| **Earned complexity** | Extra pieces buy real constraints (safety, scale, compliance, multi-team); simplifying would shift risk |
| **Wrong-shaped** | Not necessarily too much — nodes too big/small, or DAG unclear — reshape without reductionism |

Do not invent “overly complex” to have something to cut.

### 4. Risks & benefits

Always fill both columns:

**If we simplify**

- Benefits: …
- Risks: …

**If we keep as-is**

- Benefits: …
- Risks: …

### 5. Recommendation

One primary call:

- **Simplify** — what to remove/merge/replace; simpler DAG; migration notes
- **Keep** — what complexity is doing; what *not* to touch; optional light cleanup only
- **Reshape** — right-size tasks / clarify DAG / rename stages without net capability loss

Optional alternates (≤2). Hand off: `refactor-it`, `issues narrow`, `milestones narrow`, `agents design`, `research-it`, `idk-now`, DocSlime/ProductFeeling if product-shaped.

## Output shape

```markdown
## KISS: <target>

**Lens:** audit | goals | process | system | plan | flow

**Current shape**
- Intent: …
- Pieces: …
- DAG (sketch): …
- Tax: …

**Verdict:** overly complex | earned complexity | wrong-shaped
**Why:** <3–5 lines>

**Simplify?**
| | Benefits | Risks |
| --- | --- | --- |
| Simplify | … | … |
| Keep as-is | … | … |

**Recommend:** Simplify | Keep | Reshape
**Do next:** <concrete steps or skill invokes>
**Simpler / clearer DAG:** <mermaid or bullets, if recommending change>

**Blocked on me**
(none, or the one genuine question or missing decision)

**Changed**
(nothing — read-only; or what was reworded/removed if reshape was applied)

**Found**
Verdict, recommendation, simpler DAG if applicable. Next: `<exact invoke — e.g. refactor-it, issues narrow, agents design>`.
```

## Goldilocks task sizing

| Too small | Just right | Overly big |
| --- | --- | --- |
| Split that forces thrash / fake progress | One session, clear done-when, single owner | Hides risk; can’t DAG; “and also…” |

Merge micro-tasks; split epics at real dependency or risk boundaries — not at arbitrary checklist length.

## Related skills

- Lost on what matters → `idk-now`
- Tactical scout → `recon`
- Code structure only → `refactor-it`
- Issue/milestone scope → `issues narrow` / `milestones narrow`
- Agent stacks → `agents analyze|design|optimize` (slap first if thrashing)
- Docs bloat → DocSlime `kiss` / `document-it` as appropriate

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Beck’s simple-design order (pass tests → reveal intent → remove duplication → fewer elements) and Gall’s Law: simplify when complexity is unearned, not by deleting needed safety. DORA loosely coupled architecture rewards deployable simplicity.

Handbook card: `handbook/practices/kiss.md`.
