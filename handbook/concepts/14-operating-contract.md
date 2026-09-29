# Operating Contract

Rules every dev-skills skill follows — shared vocabulary so agents and humans agree on when to stop, what done means, and how subagents are structured.

## Rationale

Skills install individually, so behaviour-critical rules cannot live in a shared reference that might not be present. Duplicating a short canonical block in every `SKILL.md` (enforced by `scripts/check-skill-contract.mjs`) gives each skill a self-contained contract while keeping a single source of truth here. The block covers four recurring failure modes: agents that end turns on a yes/no question when the user already said "fix it"; agents that stop at the first uncertainty instead of keeping going; agents that spawn children without a clear brief or verification step; and agents that pick the wrong model or fight the harness routing config.

<!-- contract:start -->
## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: the acceptance criteria (existing issue AC, BDD scenarios, tests, or contract when they exist; otherwise propose them and say where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on work you did not verify.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope, unless the user's request already named that exact action. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and for independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each child's result before consolidating. Use Claude Code's `Workflow` tool only for orchestration across many subagents that truly needs it; it is expensive.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents (Claude Code `CLAUDE_CODE_SUBAGENT_MODEL` or a CLAUDE.md rule; Codex `agents.default_subagent_model` or a role's `agents.<name>.config_file`; Cursor a custom subagent's `model:` frontmatter), follow it and do not pass a model. Otherwise: mechanical search or inventory → fast/cheap (Claude Code `haiku`); implementation and evidence gathering → mid (`sonnet`); planning, review, adversarial verification → top (`opus` or `fable`). In Claude Code set it with the `Agent` tool `model` param or agent frontmatter `model:`; in Codex pass a spawn model or set `model` in the role's config file; in Cursor set `model:` (default `inherit`) in `.cursor/agents/*.md`. Where the harness cannot choose, children inherit the parent model or the harness picks one (Cursor's built-in Explore/Bash/Browser subagents pick per subtask); say which in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).
<!-- contract:end -->

## Per-harness mechanics

| Harness | Model selection | Question tool | Notes |
| --- | --- | --- | --- |
| **Claude Code** | `Agent` tool `model` param (`haiku` / `sonnet` / `opus` / `fable`); or agent frontmatter `model:` in `.claude/agents/*.md`; or env `CLAUDE_CODE_SUBAGENT_MODEL`. Follow user config first. (Checked against the harness tool schema, 2026-09-29.) | `AskUserQuestion` | `Workflow` tool available for multi-subagent orchestration; expensive — use only when truly needed. |
| **Codex** | `agents.default_subagent_model` in `~/.codex/config.toml` sets the default for all spawned subagents. Per-role override: `agents.<name>.config_file` points to a role-specific TOML layer. Children inherit parent model when neither a spawn request nor `[agents]` defaults specify one. | `request_user_input` (interactive mode; headless/CI availability unverified) | `agents/openai.yaml` purpose unverified for model selection — do not rely on it. Sources: learn.chatgpt.com/docs/config-file/config-reference and learn.chatgpt.com/docs/agent-configuration/subagents (verified 2026-09-29). |
| **Cursor** | Custom subagents in `.cursor/agents/*.md` (also `.claude/agents/`, `.codex/agents/`, and the `~/` equivalents) take frontmatter `model: inherit` (default) or a specific model ID. Built-in Explore/Bash/Browser subagents are not configurable; they pick a model per subtask (Explore defaults to a faster model). | Cursor's clarifying-question tool when the surface exposes it; otherwise plain text with numbered options | Sources: cursor.com/docs/subagents, cursor.com/docs/agent/overview (checked 2026-09-29). |
| **Other harnesses** | Children inherit the parent model. | Plain text with numbered options | State inheritance in status notes so the user knows which tier is running. |

## Gate classification

| Gate | Class | Replacement behaviour |
| --- | --- | --- |
| diagnose-bug / troubleshoot-app "Do you want me to implement this fix?" | **Anti-pattern** — bug report is a fix request | Continue into fix + regression test; stop only for diagnosis-only asks, live data, outside-repo changes |
| fix-it "implement this fix plan?" outside Plan Mode | **Anti-pattern** | Continue; Plan Mode's own approval is the only gate |
| fix-it / recon issue / test-it "run check-readiness?" | **Anti-pattern** (read-only next step) | Run it in a chain; else `Next:` statement |
| check-readiness "run Merge It?" | **Scope-dependent** | `Next: merge-it`; run when in a completion chain or asked to land |
| check-readiness "want instructions?" | **Anti-pattern** | Give them |
| recon / idk-now / kiss / *-it "Want me to run `<primary>`?" | **Anti-pattern format** | `Next:` statement |
| tidy-up double confirmation of ordered deletes | **Anti-pattern** | Execute, list under `Changed` |
| issues create "ask whether to proceed to the draft" | **Anti-pattern** | Draft immediately when no questions are needed |
| recon issue second approval for an explicitly requested comment | **Anti-pattern** | Post |
| GitHub create/edit/merge/close; repo settings; ESC; history rewrites | **Legitimate** (outside repo / irreversible) | One structured question with the draft; if user already named the action, do it |
| tidy-up deletes, unmerged branches, global caches | **Legitimate** (destructive) | Structured multi-select question |
| observe-it PII / paid vendor / prod thresholds; merge-it prod promotion; agents prod runs | **Legitimate** (paid / production) | Ask via question tool |
| research-it deps/spike; agents design scaffolding; kiss apply | **Legitimate** (outside requested scope) | `Next:` statement |
| architect-it irreversible bet; test-it new framework | **Legitimate** (irreversible / dependency choice) | Structured question with options |
| No-arg routing in agents/issues/milestones/pulls/tidy-up; ambiguous target | **Legitimate** (cannot continue) | Structured question with options |

_Codex mechanics verified against current docs (2026-09-29): learn.chatgpt.com/docs/config-file/config-reference and learn.chatgpt.com/docs/agent-configuration/subagents. Cursor subagent `model:` frontmatter and the clarifying-question tool verified the same day: cursor.com/docs/subagents and cursor.com/docs/agent/overview._
