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

Name what you’re kissing: goal set, process, system, plan, or flow. Skim evidence (docs, code layout, issue graph, agent config, user’s paste). If scope is fuzzy, ask one clarifying question or run a 30-second `recon`-style git glance.

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

**Follow-Up Prompt**
Want me to apply <recommendation>?
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
