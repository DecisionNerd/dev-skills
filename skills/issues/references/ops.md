# Shared issue operations

Apply these when the user runs `critique`, `narrow`, `widen`, `merge`, `clean`, `refine`, `explain`, or `document` on an issue. Always resolve the target issue (or draft in chat) first. Mutating GitHub requires explicit approval.

## critique

Produce a frank assessment. Do not rewrite unless asked.

Cover:

- Problem/objective clarity
- Scope boundaries and Non-Goals
- Acceptance criteria observability
- BDD completion scenarios (presence, quality, evidence map)
- Implementation notes realism
- Observability / security / testing / documentation gaps
- Duplicate or related-issue hygiene
- Tracker vs feature-issue shape (if relevant)

Output: strengths, issues (severity-ordered). If this was an explicit `critique` command, end by offering to **execute** Complete the work (`recon issue #N`, diagnose/fix, `check-readiness`, `merge-it`, …). Do not end only with `refine`/`narrow` when the issue is actionable.

## narrow

Reduce scope to the smallest shippable slice that still solves the core problem.

- Move cut work into Non-Goals or a follow-up issue draft
- Tighten AC and BDD scenarios to match
- Call out what must wait
- Propose the updated issue text; apply only after approval

## widen

Expand scope only with explicit user intent or clear product necessity.

- State why each addition belongs in *this* issue vs a follow-up
- Keep the issue bounded; refuse kitchen-sink expansions
- Update AC/BDD/tests/docs expectations accordingly
- Propose text; apply after approval

## merge

Combine two or more overlapping issues into one canonical issue.

1. Identify survivors vs duplicates (prefer the better-written or more-referenced issue).
2. Propose merged body (union of requirements, deduped AC/BDD).
3. On approval: update canonical issue; close others with pointers; preserve links.

Do not silently delete unique acceptance criteria.

## clean

Hygiene only — no scope change.

- Fix headings, checklists, dead links, stale “Open Questions”
- Remove resolved commentary that belongs in comments
- Normalize section order to the create template when helpful
- Propose diff; apply after approval

## refine

Improve clarity and actionability without changing agreed scope.

- Sharper titles, problem statements, AC verbs
- Better BDD wording; map scenarios to verification
- Fill omitted Observability/Security/Testing/Documentation *only* when clearly implied by existing scope
- Propose diff; apply after approval

## explain

Explain to the **user** in plain language. Do not edit GitHub unless asked.

Cover: what the issue is asking for, why it matters, what’s in/out of scope, how we’ll know it’s done, open risks/questions. Keep it short. After an explicit `explain`, offer to **execute** Complete the work (usually `recon issue #N` or diagnose/fix).

## document

Improve or add **repository documentation** required for the issue (not just the issue body).

1. Find gaps: missing user/dev/API/architecture/testing/runbook docs called out by the issue or implied by the change.
2. Draft or edit the smallest docs change in-repo.
3. Link those paths from the issue (propose issue update after docs land, with approval).

Prefer updating existing docs over new files. Do not invent a docs tree when the repo has none unless the user asks.
