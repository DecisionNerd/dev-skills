---
name: sitrep
description: "Provide a situation report on the current work: objective, done, in progress, blocked, next, and open questions. Default window is everything since the session start or the previous sitrep in this conversation, whichever is later. Evidence comes from session history plus read-only git/GitHub checks. Use when the user says \"sitrep\", \"situation report\", \"status report\", \"where are we\", \"what's happened\", \"catch me up\", or after a long run to summarise state."
argument-hint: "[full|since <point>|<scope>]"
---

# Sitrep

A situation report for the current run. Sitrep reads the environment (session history, git, GitHub, `TASKS.md`) and reports what happened, what is moving, what is stuck, and what the user owes or needs to decide. It is read-only: sitrep never mutates the repo or GitHub, and never continues unfinished work as a side effect — reporting is the whole job.

## Operating contract

Shared by every DecisionNerd/dev-skills skill. Canonical copy: `handbook/concepts/14-operating-contract.md`.

- **Define done first.** Before using tools, write the finish line in one or two lines: acceptance criteria (existing issue AC, BDD scenarios, tests, or contract; otherwise propose them and where they should live) and the evidence that will prove them. Re-check it before reporting done. Never report done on unverified work.
- **Requested scope sets the finish line.** A question ("is it ready?", "why is it broken?", "what next?") ends with the answer and a `Next:` line naming the exact next invoke. An outcome request ("fix", "finish", "land", "#42") continues through the chain (diagnose → fix → test → check-readiness → merge-it) until the outcome or a real blocker. Do not end a turn with "Do you want me to…?" for in-scope, in-repo work.
- **Stop only for real blockers.** Stop and ask only when you cannot continue without the user, or before: deleting data or unmerged work, force-push or history rewrite, changing anything outside this repository (GitHub objects, deployments, live data, production or paid resources, external services), or leaving the requested scope, unless the user's request already named that exact action. Keep the harness's permission prompts for risky commands. Otherwise keep going and put status notes in the same message as the next action.
- **Ask well, once.** For a genuine question use the harness's structured question tool when it has one (Claude Code: `AskUserQuestion`; Codex: `request_user_input` when the current mode supports it; T3 Code: the `question` tool) with concrete options; otherwise plain text with numbered options. Treat the answer as settled; do not re-open earlier verdicts, plans, or answers unless asked.
- **Fan out when work is parallel.** Use subagents for independent reads (repo survey, evidence gathering, per-option research, per-area audits) and independent verification (a reviewer that did not write the change). Writes stay single-owner per path set and sequential. Brief every child with goal, done-when, constraints, must-not, and return shape; verify each result before consolidating. Use Claude Code's `Workflow` tool only when orchestrating many subagents truly needs it; it is expensive. T3 Code: its delegated subagents — with optional worktree isolation for independent verification — cover this without the `Workflow` tool.
- **Pick the model tier per child; defer to routing config.** If the harness or user config already routes subagents, follow it and do not pass a model. Otherwise pick a tier per child: mechanical search or inventory → fast/cheap; implementation and evidence gathering → mid; planning, review, adversarial verification → top. Tier names differ per harness (Claude Code: `haiku` / `sonnet` / `opus` or `fable`; T3 Code: inherit by default or pick from its live provider/model catalog). Set the choice with the harness's spawn `model` param or agent frontmatter `model:` (per-harness details: `skills/agents/references/sub.md`). Where the harness cannot choose, children inherit or the harness picks; say which in the status note.
- **Keep a checklist on long runs.** For more than about five steps or work that crosses skills, keep `TASKS.md` at the repo root and tick items as they finish. Do not commit it unless the repo already tracks one.
- **Close every run with three headings.** `Blocked on me` (the one genuine question or blocker, else "none"); `Changed` (files, commits, GitHub objects, deploys, else "nothing"); `Found` (evidence, verdict, and `Next: <exact invoke>`).

**Sitrep exception to the outcome rule:** sitrep only reports state; it never continues an outcome chain. When outcome work ("fix", "land", "#42") is already running, report it as `Continuing` with its next observable checkpoint — do not suggest re-invoking the active skill or imply the user must restart it. Reserve `Next: <invoke>` for actions not already underway, and write `Next: none` when the work is complete.

## Window

Default window: **since the previous sitrep in this conversation, or since the session start if there is no previous sitrep — whichever is later.** The conversation itself is the watermark; do not write watermark files.

Arguments:

| Argument | Behaviour |
| --- | --- |
| *(none)* | Default window (above). |
| `full` | Whole session, ignoring any previous sitrep. |
| `since <point>` | Since a named point: a commit sha, a time ("since 2pm"), an event ("since the last test run"), or "since the merge". |
| `<scope>` | Restrict to one area: an issue/PR (`#42`), a path (`src/api`), or a named workstream ("the auth migration"). Scope filters the report; it does not change the window unless combined with `since`. |

## Evidence gathering (read-only)

1. **Session history first.** Re-read this conversation from the window start: the stated objective, each skill invoked, each `Changed` list, each `Blocked on me`, and any answers the user gave. The user's latest instructions override stale state.
2. **Repo state.** Confirm what the history claims against disk:
   ```bash
   git status --short --branch
   git log --oneline -20
   git diff --stat HEAD
   ```
   Uncommitted files count as in-progress, not done.
3. **GitHub state** (when `gh` is available): open PRs and their checks for touched branches, PRs merged during the window and their post-merge check state, issue state for referenced `#N`s. CI results decide "done" — a merged PR with red checks is not done.
4. **Checklist.** If `TASKS.md` exists at the repo root, tick state is evidence for done/in-progress.
5. **Deltas only.** Events before the window appear only when needed for context (one line, marked "before window").

Do not re-derive history the session already settled. Do not ask the user anything git or the transcript can answer.

## Verdict rules

- **Done** only with evidence: test run passed, checks green, PR merged, file committed. "I wrote it" is in-progress until proven.
- **In progress** covers anything started, uncommitted, or waiting on CI.
- **Continuing** marks work already running when the sitrep lands: `<item> — Continuing; next checkpoint: <observable state>`. Do not pair it with a re-invoke of the active skill — the skill is already running and must not be restarted.
- **Blocked** distinguishes: blocked on the user (decision, credential, approval) vs blocked on an external system (CI, deploy, vendor). Name the exact unblock action.
- **Next** is a ranked list of concrete actions not already underway, each with the skill to invoke (`Next: merge-it`), not vague intentions. Work in flight belongs under Continuing, not Next. When nothing remains, write `Next: none`.
- **Questions** lists genuine decisions only the user can make. If there are none, say "none" — do not invent confirmations. Per the contract, one primary question goes under `Blocked on me`.

## Output shape

```markdown
**Sitrep** — <window: "since 14:20" / "since last sitrep" / "full session">

**Objective**
<One or two lines: what this run is trying to achieve, from the user's own words.>

**Done**
- <item> — <evidence: commit sha, check run, merge>

**In progress**
- <item> — <state: uncommitted, CI running, awaiting review>
- <work already running> — Continuing; next checkpoint: <observable state>

**Blocked on me**
<The one genuine question or blocker, else "none">

**Next**
1. <action not already underway> — `Next: <exact invoke>`
2. ...

`Next: none` when nothing remains.

**Questions for you**
- <decision only the user can make>, or "none"

**Changed**
<Files, commits, GitHub objects, deploys in the window, else "nothing">

**Found**
<One-line verdict: on track / drifting / blocked, plus the single most important fact. `Next: <primary invoke>`, or `Next: none` when complete. Work already running is reported as Continuing, never as a re-invoke.>
```

Keep it scannable: bullets, no paragraphs in section bodies except Objective and Found. A sitrep after a quiet window is short — "nothing changed, still blocked on X" is a valid report.

## Grounding

Read-only situation reports before action follow the SRE incident habit (state of the world before decisions) and the contract's closing headings. Handbook card: `handbook/practices/recon.md`.
