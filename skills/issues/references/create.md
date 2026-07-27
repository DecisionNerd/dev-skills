---
# Loaded by the `issues` skill when command is `create` or `draft`.
---

# Create / Draft Issue

## Goal

Turn a short user input into a high-quality GitHub issue that is ready for planning or implementation. Start by analyzing the request and the repository context, then give the user a short disposition and focused questions before drafting. Before drafting a new issue, check for duplicate and related issues. If an existing issue already covers the work, recommend updating that issue or doing nothing instead of creating noise.

This command is for issue creation/drafting, not implementation. Do not edit product code unless the user explicitly pivots from writing the issue to implementation.

Use a lightweight BDD completion-scenario model for feature completion. BDD here means writing plain-language Given/When/Then completion scenarios and mapping them to expected evidence. It is not a requirement to introduce Cucumber, `.feature` files, or a new test framework. Prefer scenarios that capture user-visible behavior, product boundaries, permissions, privacy, provenance, entitlement, observability, documentation, and regression expectations.

**A bug is a bug** (`handbook/concepts/12-bugs-and-debt.md`): end-user, developer, agent, and infra experience failures all belong on the list. Do not launder pain as “just tech debt” or “just a feature request” without filing it. When drafting, name a **debt type** (development, architecture, data, test/proof, observability, documentation, understanding/feedback, infrastructure/toil, security, product-framing, craft/UX) when that names the interest. Note the **quality regime** (A compute / B product / C generative) when it changes what evidence closes the issue (`11-quality-regimes.md`).

Default interaction model:

1. Accept a short text input from the user.
2. Do repository and issue analysis.
3. Give a short disposition and a concise set of questions.
4. Wait for the user's answers.
5. If the answers are still insufficient for a strong issue, ask another short round of questions.
6. When enough information is available, write the issue draft.
7. Ask whether the user wants the issue created in GitHub.
8. Create or update the GitHub issue only after explicit approval.

## Required Input

Accept a short rough idea, bug report, feature request, product requirement, TODO, failing behavior, roadmap gap, or existing issue reference. The initial input may be incomplete, terse, or colloquial.

If the repository is ambiguous, determine the intended repository from the current workspace, the user's wording, or GitHub context before searching or drafting.

If the ask is too vague to analyze responsibly, ask for the single missing detail that would most change the issue: repository, affected product area, expected behavior, actual behavior, user/customer impact, or whether the user wants a new issue versus an update to an existing one.

## Workflow

1. Resolve repository and context.
   - Use the GitHub app or `gh repo view --json nameWithOwner,url` when needed.
   - Inspect local docs, roadmap files, code, tests, or product notes when they materially affect the issue scope.
   - For product-direction issues, check the repo's top-level product docs or roadmap before drafting so the issue does not preserve stale assumptions.
   - Keep repository workflow rules from `AGENTS.md` in mind, including milestone naming, integration branches, and product boundaries.

2. Search duplicate and related issues before drafting.
   - Search open and closed issues with multiple targeted queries, including product terms, synonyms, affected routes/components, integrations, error messages, and likely labels.
   - Use GitHub search or `gh issue list --state all --search "<query>" --json number,title,state,labels,milestone,url,body,updatedAt`.
   - Read likely matches with `gh issue view <number> --json title,body,labels,milestone,state,comments,url`.
   - Classify findings:
     - `Duplicate`: an issue already covers substantially the same requested work.
     - `Related`: an issue overlaps, blocks, depends on, or should be linked, but does not fully cover the requested work.
     - `No Match`: no existing issue appears to cover the work.
   - If a duplicate or strong related issue exists, prefer recommending an update to that issue over creating a new one.
   - If the existing issue is already complete, stale-but-irrelevant, or the request adds no new actionable information, recommend doing nothing and explain why.

3. Give a short disposition and ask targeted questions.
   - After issue/context analysis, respond with a short disposition before drafting:
     - `Likely New Issue`
     - `Likely Update Existing Issue`
     - `Likely Do Nothing`
     - `Need More Context`
   - Include the key duplicate/related issues checked.
   - Ask a concise series of questions that would materially improve the issue.
   - Prefer 2-5 questions. Ask fewer when the request is already clear.
   - Make questions concrete and answerable. Avoid broad prompts like "Anything else?"
   - Good question categories include:
     - affected users or user journey;
     - expected behavior and actual behavior;
     - acceptance criteria or done state;
     - scope boundaries and non-goals;
     - priority, milestone, or release timing;
     - related issue or duplicate confirmation;
     - observability, privacy, security, or testing constraints.
   - Stop after the questions and wait for the user's reply. Do not draft yet unless the user explicitly says to draft with assumptions.

4. Evaluate the user's answers.
   - If the answers are sufficient, proceed to the draft.
   - If the answers are still insufficient for a strong, actionable issue, ask another short round of focused questions.
   - Ask only about blockers or materially uncertain scope. Do not over-interview.
   - If a reasonable assumption is safe, state it in the draft instead of asking yet another question.

5. Decide whether to draft a new issue.
   - Draft a new issue only when the request is materially distinct from existing issues or needs separate tracking.
   - Recommend updating an existing issue when the new information fits cleanly as acceptance criteria, context, a comment, or a checklist item.
   - Recommend doing nothing when the work is already tracked and the new request adds no useful decision, requirement, reproduction, or implementation detail.
   - If recommending an update, provide the exact update text or comment body the user could add.

6. Build a comprehensive issue, using the user's answers.
   - Convert the user's request into clear problem framing, outcome, requirements, acceptance criteria, and non-goals.
   - Treat tracker issues as a special case. A tracker issue may be a canonical roadmap, milestone, project, release, version, or phase checklist whose value depends on preserving phased sections, issue lists, dependency notes, status checkboxes, close criteria, references, and historical ordering.
   - Do not force a pure tracker issue into the standard feature-issue template if doing so would obscure the tracker structure or lose roadmap/checklist detail. Instead, preserve the tracker format and improve it in place with only the missing standards that help the tracker do its job.
   - When a tracker issue is also a closure issue for a milestone, release, version bump, launch, phase, or closeout gate, keep the tracker portions intact and add a clearly separate standards layer for the closure work. That closure layer should define the closeout problem, objective, requirements, acceptance criteria, BDD completion scenarios, implementation/readiness notes, observability, security/privacy, testing, documentation, non-goals, related issues, and open questions as appropriate.
   - For tracker-plus-closure issues, do not bury the closure criteria inside the checklist alone. Make explicit what evidence will prove the milestone/release/version is complete, such as linked issues closed or superseded, required docs updated, tests and BDD scenarios passing or mapped to manual/agentic evidence, release notes/runbooks complete, regressions triaged, and launch or version risks accepted with owners.
   - Add a `BDD Completion Scenarios` section for any issue where completion depends on behavior, permissions, data movement, observability, docs, rollout, or user outcome.
   - Write 2-6 concise Given/When/Then scenarios. Use fewer for narrow bugs and more only when distinct user roles, access contexts, data states, or failure modes materially change done.
   - Keep each scenario implementation-neutral but evidence-oriented. It should be possible for a future plan or readiness check to map the scenario to automated tests, manual verification, issue evidence, or an explicit non-automated rationale.
   - Include implementation-relevant expectations without over-prescribing code.
   - For non-docs-only issues, include the full implementation envelope: product/code work, observability, security/privacy, automated tests, impacted e2e/integration/unit tests, and implementation documentation.
   - Fill gaps from repository patterns, docs, and risk analysis. Do not omit observability, security, tests, or documentation merely because the user did not mention them.
   - Keep the issue bounded. Put nearby improvements in follow-ups or non-goals.

7. Include implementation readiness details.
   - Name likely affected files, modules, routes, schemas, jobs, services, docs, tests, or workflows when discoverable.
   - Identify dependencies, migrations, data backfills, feature flags, rollout gates, configuration, or environment variables when relevant.
   - Include observability expectations using existing project systems: logs, error reporting, metrics, tracing, analytics, audit records, rollout metadata, or dashboards.
   - Assess security and privacy: auth, authorization, entitlement, input validation, injection risk, sensitive-data exposure, secrets/tokens, logging safety, retention, auditability, abuse, and rate limits.
   - Specify test coverage to add or update: unit, integration, e2e, fixtures, mocks, accessibility, regression, build/lint/typecheck, and manual QA.
   - In `Testing`, map BDD scenarios to the expected verification layer when possible, such as `Scenario 1: Playwright e2e`, `Scenario 2: Convex integration test`, `Scenario 3: manual admin review because provider sandbox access is required`.
   - Specify docs to update: user docs, developer docs, API docs, architecture/requirements/testing docs, runbooks, changelogs, examples, or config docs.

8. Prepare GitHub metadata.
   - Recommend labels only when the repo already uses matching labels.
   - Recommend a milestone only when it clearly matches repo conventions.
   - Link duplicate or related issues in the body.
   - If creating the issue, use a concise task-oriented title and a body that includes all relevant sections.
   - After presenting the draft, ask a binary yes/no approval question for the recommended GitHub action.
   - Do not combine create/update/revise/stop alternatives into the approval question. If helpful, put alternatives in a separate sentence after the yes/no question.
   - Do not create or update an issue unless the user explicitly approves that action after seeing the draft or update text.

## Output

The output is staged. Do not jump directly from a short input to a full issue unless the user explicitly requests a draft with assumptions.

### First Response After Short Input

Lead with a short disposition and questions. Use this shape:

```markdown
**Disposition**
- Recommendation: <Likely New Issue | Likely Update Existing Issue | Likely Do Nothing | Need More Context>
- Related issues checked: <issue links or "None found">
- Rationale: <1-3 sentence explanation>

**Questions**
1. <focused question>
2. <focused question>
3. <focused question>
```

If no questions are needed, say so and ask whether to proceed to the draft.

### Follow-Up Question Rounds

If the user's answers are still insufficient, ask only the remaining blockers:

```markdown
**Almost There**
I can draft this, but one or two details would materially improve it:

1. <focused blocker question>
2. <focused blocker question>
```

### Draft Output

After the user answers sufficiently, use this shape unless the user asks otherwise:

```markdown
**Issue Search**
- Decision: <New Issue | Update Existing Issue | Do Nothing>
- Duplicate/related issues checked: <issue links or "None found">
- Rationale: <short explanation>

**Recommended Action**
<Create a new issue, update issue #123, or do nothing. If updating, include the exact update/comment text.>

**Draft Issue**
Title: <concise task-oriented title>

## Problem
<who is hurting (user / developer / agent / infra) and why it matters — still a bug>

## Objective
<desired outcome>

## Debt / regime (when useful)
- Debt type: <development | architecture | data | test/proof | observability | documentation | understanding/feedback | infrastructure/toil | security | product-framing | craft/UX | n/a>
- Quality regime: <A | B | C | hybrid | n/a>

## Requirements
- <requirement>

## Acceptance Criteria
- <observable completion criteria>

## BDD Completion Scenarios
Scenario: <user role or system context completes an in-scope outcome>
Given <starting state, permission, data, entitlement, or context>
When <the user or system action happens>
Then <observable outcome or invariant>
And <important boundary, privacy, provenance, observability, or regression expectation>

## Implementation Notes
- <likely files/modules/flows and constraints>

## Observability
- <logs, metrics, tracing, analytics, audit records, dashboards, or "No observability changes expected because ...">

## Security And Privacy
- <risks assessed, mitigations, auth/authz/entitlement/data-safety checks, or "No new security/privacy surface expected because ...">

## Testing
- <tests to add/update, impacted e2e/integration/unit coverage, validation commands, expected failure modes, and BDD scenario-to-verification mapping>

## Documentation
- <implementation docs and impacted user/developer/API/architecture/testing/config docs, or "No docs expected because ...">

## Non-Goals
- <nearby work intentionally excluded>

## Related Issues
- <duplicate/related/blocking issues or "None found">

## Open Questions
- <only blockers or material ambiguities, or "None">

**Create In GitHub?**
Should I create this issue in GitHub?

If not, you can say "revise", "update #123", or "stop".
```

If the decision is `Update Existing Issue` or `Do Nothing`, omit `Draft Issue` unless the user explicitly asks for a new issue anyway.

When the user approves creation after seeing the draft, create the issue with the recommended metadata and return the created issue link. If the user approves updating an existing issue, apply only the approved update text and return the updated issue link.

After create/update succeeds (or when presenting a final draft the user may keep local), **offer to execute** Complete the work — usually `recon issue #N` for a plan, or `diagnose-bug` / `troubleshoot-app` when the issue is a live failure. If the user already asked to finish/ship the work (not only file it), run that next skill instead of stopping at “issue created.”

### Tracker Issue Output

For pure tracker issues, preserve the tracker-native format instead of forcing the full draft shape. Use sections such as:

```markdown
**Issue Search**
- Decision: <New Tracker | Update Existing Tracker | Do Nothing>
- Duplicate/related issues checked: <issue links or "None found">
- Rationale: <short explanation>

**Recommended Action**
<Create/update the tracker, or do nothing.>

**Draft Tracker**
Title: <concise task-oriented tracker title>

## Tracker Purpose
<What the tracker coordinates and why it exists.>

## Scope
- <phase, milestone, release, version, or project area>

## Tracker Sections
<Preserve or define phase/milestone/release sections, issue checklists, dependency notes, completion criteria, references, and historical context.>

## Maintenance Rules
- <When and how the tracker should be updated>

## Related Issues
- <linked issues>

## Open Questions
- <only blockers or material ambiguities, or "None">
```

For tracker issues that also close a milestone, release, version bump, launch, or phase, use a hybrid output. Preserve the tracker-native sections, and add a separate closure standard section:

```markdown
## Closure Standard

### Problem
<Why this milestone/release/version/phase needs explicit closure work.>

### Objective
<The closeout outcome.>

### Requirements
- <closure requirement>

### Acceptance Criteria
- <evidence-based completion criterion>

### BDD Completion Scenarios
Scenario: <milestone/release/version/phase closes with evidence>
Given <required scope, issue, environment, doc, or test state>
When <closeout validation runs>
Then <observable completion evidence exists>
And <risks, regressions, docs, or follow-ups are handled>

### Observability
- <required dashboards, logs, traces, analytics, audit evidence, or "No observability changes expected because ...">

### Security And Privacy
- <auth/authz/data-safety/release-risk checks, or "No new security/privacy surface expected because ...">

### Testing
- <tests, BDD evidence, manual/agentic verification, smoke checks, and commands>

### Documentation
- <release notes, changelog, runbook, requirements/testing docs, or "No docs expected because ...">

### Non-Goals
- <nearby work intentionally excluded>
```
