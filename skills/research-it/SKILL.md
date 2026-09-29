---
name: research-it
description: >
  Research a technical or product question before building — APIs, libraries,
  prior art in-repo, external docs, tradeoffs, and a recommendation. Use when
  the user says "research it", asks what to use, compares options, wants an
  RFC-style brief, or needs evidence before implementation. Read-only; spikes
  and dependency adds are a separate, asked-for step. Hand off to fix-it /
  recon issue / issues create when ready to plan or track.
argument-hint: "[question|library|API|approach...]"
---

# Research It

Replace vibes with **evidence**: what exists, what fits this repo, what to do next.

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

## When to use

- "What's the best way to…?", "research it", vendor/API comparison, spike before build
- Ambiguous architecture choice before `recon issue` or `fix-it`
- Need external docs or in-repo prior art surveyed first

## Workflow

Done when: one recommendation tied to this repo's constraints, rejected options listed, unknowns named with what a spike would prove.

1. **Frame the question**
   - Decision to make, constraints (stack, latency, cost, compliance, timeline), success criteria.

2. **Search inward then outward**
   - In-repo: existing packages, patterns, ADRs, prior PRs/issues.
   - External: official docs (WebFetch), reputable references; note versions/dates.
   - Don't treat random blogs as authority over primary docs.

3. **Compare options**
   - 2–4 viable options max. Fan out one read-only subagent per option (mid tier) with a fixed criteria table as return shape: fit, complexity, ops burden, risk, lock-in. Mark every unconfirmed claim `unconfirmed` with its source location.
   - An adversarial reviewer subagent (top tier) attacks the leading recommendation before it is finalized.
   - Prefer **house defaults when unconstrained**: React + Next on Vercel for web; Pulumi ESC + OIDC for secrets; Langfuse for LLM obs/evals — unless the repo already standardized elsewhere.
   - Call out unknowns and what a spike would prove.

4. **Recommend**
   - One primary recommendation with rationale tied to *this* repo's constraints.
   - Explicit non-goals / rejected options with why.

5. **Next steps**
   - Next: `issues create` / `recon issue` / `fix-it` to plan or track; a time-boxed spike checklist when unknowns remain.
   - Spikes and dependency adds are a separate, asked-for step — express them as a `Next:` statement, not a question.

## Guardrails

- Read-only unless the user asks to spike code or add a dep.
- Cite sources (URLs/paths). Distinguish fact vs inference.
- No secret keys in research notes.

## Output

```markdown
**Question**
- ...

**Constraints**
- ...

**Options**
| Option | Fit | Cost/complexity | Risk | Notes |
| ... |

**Recommendation**
- Primary: ...
- Why: ...
- Rejected: ...

**Open questions / spike**
- ...

## Blocked on me

none

## Changed

nothing

## Found

- ...
- Next: issues create / recon issue / fix-it
```

## Grounding

This skill's TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Evidence before commitment; avoid jumping to complex systems before a simple one works (Gall's Law / Beck). Prefer house defaults only when the repo has no stronger local constraint (`handbook/concepts/11-quality-regimes.md` for generative tooling; `repos` for ESC).

Handbook card: `handbook/practices/research-it.md`.
