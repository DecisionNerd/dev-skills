# agents sub / sub-agents

Run work through **subagents** while the parent orchestrates. Aliases: `sub`, `sub-agents`, `subagents`.

## When to use

- Parallel codebase explore / research with isolated context
- Independent reviews (e.g. security vs UX) that must not share a polluted thread
- Fan-out then merge: map → reduce in the parent

## When not to use

- Emergency thrash → `slap` first
- Single-file surgical edit (parent is enough)
- Two writers on the same paths (forbidden)

## Parent brief (required)

Every child gets a brief with:

1. **Goal** — one sentence
2. **Constraints** — read-only vs allow writes; paths in scope
3. **Done-when** — concrete success
4. **Must not** — out-of-scope actions
5. **Return shape** — what to report to parent (bullets, file paths, verdict)

## Execution pattern

1. Parent decomposes into N non-overlapping jobs.
2. Launch subagents (Task / Agent tool) — parallel for explore; sequential for mutate.
3. Parent aggregates; resolves conflicts; decides next action.
4. If any child loops or fights → cancel that child; consider `slap`.

## Return to user

Summarize child results in the parent voice. Do not dump raw conflicting plans without a decision.
