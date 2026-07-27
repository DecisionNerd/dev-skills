# Shared milestone operations

Resolve the target milestone first. Mutating GitHub (edit milestone, move issues, close) requires explicit approval.

## critique

Assess:

- Clear purpose (release, version, theme, phase)?
- Scope coherent vs grab-bag?
- Due date realistic vs open issue load?
- Close criteria explicit and evidence-based?
- Missing tracker/closure issue when the repo expects one?
- Orphan high-priority issues that should be in/out?

Output: strengths, problems (severity), recommended next command.

## narrow

Shrink to a releasable slice.

- Propose issues to remove or defer to a named later milestone / backlog
- Adjust description and close criteria
- Apply membership changes only after approval

## widen

Expand only with rationale.

- Propose issues to pull in; reject unrelated pile-ons
- Update description/close criteria
- Apply after approval

## merge

Consolidate milestone A into B (or new C).

1. Compare titles, dues, issue sets.
2. Propose survivor, merged description, issue moves, loser closed/deleted per API norms.
3. Execute after approval; leave comments on a tracker issue if one exists.

## clean

Hygiene: description formatting, stale checklists, wrong due dates, issues closed but milestone left open, typos. No silent scope changes.

## refine

Improve description and close criteria clarity without moving issues unless required for consistency (call those out separately).

## explain

Explain to the user: what this milestone is for, what’s in it, how close it is, what “done” means, risks. No GitHub edits.

## document

Add or update repo docs for this milestone/release: changelog, release notes, runbook, version docs. Prefer existing doc paths. Link docs from the milestone description or tracker issue after approval.
