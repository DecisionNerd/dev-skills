# Recon → milestone

Milestone situational awareness. Read-only; hand off via `Next:`.

## Gather

1. Resolve milestone by title, number, or URL (`gh api` milestones list/get).
2. List issues in the milestone: open vs closed (`gh issue list --milestone "..."`).
3. Note due date, description, close criteria if present.
4. Cross-check git: recent commits/PRs mentioning those issue numbers.

## Assess

- % complete and overdue risk
- Issues that look duplicate / oversized / missing AC → `issues critique|narrow|refine`
- Missing tracker/closure issue when repo expects one → `issues create`
- Membership wrong → `milestones plan|narrow|widen`
- Ready to close → `milestones close` (only if criteria met)
- Release-shaped → after issues close, `merge-it` (Stage/Ship phases per repo policy)

## Output

```markdown
**Milestone**
<title> — due <date or none>
<url if any>

**Progress**
- Open: N | Closed: M | Blockers: ...

**Gaps**
- ...

**Recommend**
1. **Primary:** `milestones …` or `issues …` — why
2. Alternatives: ...

**Blocked on me**
<Genuine blocker, else "none">

**Changed**
<nothing>

**Found**
<Progress summary and `Next: <primary invoke>`>
```
