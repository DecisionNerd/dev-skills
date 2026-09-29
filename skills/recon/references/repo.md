# Recon → repo

Whole-repository situational awareness. Read-only; hand off via `Next:`.

## Gather

1. Git: status, current branch, `git log --oneline -30`, ahead/behind vs default branch, dirty diff stat.
2. GitHub (when `gh` works):
   - `gh repo view --json nameWithOwner,defaultBranchRef,url`
   - `gh pr list --state open --limit 20`
   - `gh issue list --state open --limit 20`
   - `gh api repos/{owner}/{repo}/milestones?state=open` (or equivalent)
3. Repo guidance: `AGENTS.md`, CI workflows presence, obvious `docs/` / README gaps.
4. Classify repo type lightly: deployed app with staging vs library/main-only (from docs/branches, not memory of other repos).

## Assess

- Stranded branches / open PRs without movement
- Issue backlog without milestones vs overfull milestones
- Broken-looking recent commits (fix/revert storms) → diagnose skills
- Release train hints (`staging` branch, promote PRs) → `merge-it` Stage/Ship phase awareness

## Recommend

Rank next skills from the skill map in `SKILL.md`. Examples:

- Many rough ideas, few issues → `issues create`
- Milestone due soon, open issues scattered → `milestones plan` or `milestones status`
- Feature branch with commits, no PR → `pulls create` or `merge-it`
- Failing production reports in issues → `troubleshoot-app` / `diagnose-bug`

End with the three closing headings; `Found` ends with `Next: <primary invoke>` as a statement.
