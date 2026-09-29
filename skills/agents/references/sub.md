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
3. **Verify each child's result before consolidating.** Check that the child's return matches its done-when; flag any child that returned ambiguous, missing, or contradictory output and re-brief or discard rather than passing it through.
4. Parent aggregates verified results; resolves conflicts; decides next action.
5. If any child loops or fights → cancel that child; consider `slap`.

## When to use Claude Code `Workflow`

Use the `Workflow` tool only when orchestration across many subagents truly needs it — e.g. a staged dependency graph (survey → plan → implement per-area → reviewer), more than ~5 children, or work that must survive a parent context reset. It is expensive. For 2–4 children with no staged dependencies, plain `Agent` tool calls launched in a single message are cheaper and simpler.

## Model tiers

Choose the model tier per child based on the work; defer to routing config when it exists (see Per-harness mechanics below).

| Work type | Tier | Claude Code |
| --- | --- | --- |
| Mechanical search, inventory, file grep | fast/cheap | `haiku` |
| Implementation, evidence gathering, per-file edits | mid | `sonnet` |
| Planning, review, adversarial verification | top | `opus` or `fable` |

If the harness or user config already routes subagents, follow it and do not pass a model.

## Per-harness mechanics

Sources verified against current official docs (2026-09-29).

### Claude Code

- **Model param**: `Agent` tool `model` parameter accepts `haiku`, `sonnet`, `opus`, or `fable`.
- **Agent frontmatter**: `.claude/agents/*.md` frontmatter `model:` sets the model for that named agent.
- **Env override**: `CLAUDE_CODE_SUBAGENT_MODEL` env var sets a session-wide default for all subagents.
- **User config wins**: if `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule is set, follow it and do not pass a `model` param.
- **Workflow tool**: available for multi-subagent orchestration; expensive — use only when staging across many children truly needs it.

Source: checked against the Claude Code harness on 2026-09-29 — the `Agent` tool schema (`model` enum), `.claude/agents/*.md` frontmatter, and the `Workflow` tool description (runs only on explicit opt-in, which includes a skill instructing it; spawns many agents, so token cost is high). Re-check when the harness changes.

### Codex CLI

- **Global default**: `agents.default_subagent_model` in `~/.codex/config.toml` sets the default model for all spawned subagents. `agents.default_subagent_reasoning_effort` sets the default reasoning effort.
- **Per-role config**: `agents.<name>.config_file` points to a role-specific TOML file that layers on top of the global config; put the model key there for per-role overrides.
- **Inheritance**: if neither a spawn request nor `[agents]` defaults specify a model, the subagent inherits the parent's model and reasoning effort.
- **`request_user_input`**: available in interactive mode; availability in headless/CI runs is unverified against current docs — treat as interactive-only to be safe.
- **`agents/openai.yaml`**: purpose unverified against current Codex CLI docs — do not rely on it for model selection.

Sources: `https://learn.chatgpt.com/docs/config-file/config-reference`, `https://learn.chatgpt.com/docs/agent-configuration/subagents` (redirected from developers.openai.com/codex/).

### Cursor

- **Agent frontmatter `model:`**: custom subagents in `.cursor/agents/*.md` (also `.claude/agents/`, `.codex/agents/`, and the `~/` equivalents) take `model: inherit` (the default, same model as the parent) or a specific model ID.
- **Built-in subagents**: Explore, Bash, and Browser are used automatically and are not configurable; each picks a model for its subtask (Explore defaults to a faster model), so name that in status notes rather than assuming the parent model.
- **Question tool**: the agent can ask clarifying questions mid-task; use that tool when the surface exposes it, otherwise plain text with numbered options.

Sources: https://cursor.com/docs/subagents and https://cursor.com/docs/agent/overview (checked 2026-09-29).

Source: Cursor forum search (cursor.com/changelog, forum.cursor.com); official agent-model docs not confirmed.

### Other harnesses

Children inherit the parent model. State this in status notes so the user knows which tier is running.

## Return to user

Summarize child results in the parent voice. Do not dump raw conflicting plans without a decision.
