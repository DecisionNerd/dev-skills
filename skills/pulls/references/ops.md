# Shared pull request operations

Resolve the target PR (or draft for `create`) first. Code or GitHub mutations need explicit approval unless already ordered.

## critique

Assess reviewability and ship readiness (description, not only CI):

- Single coherent purpose vs mixed concerns
- Title/body match the diff
- Test plan adequate for the risk
- Linked issues / closing keywords correct for branch policy
- Secrets, migrations, feature flags, rollout called out
- Size: too large to review?

Output: strengths, problems. After an explicit `critique`, offer to **execute** Complete the work (`merge-it`, `fix-it`, `check-readiness`, `test-it`, …). Prefer landing/fixing over `refine`/`critique` alone when the diff is the real work.

## narrow

Reduce the change set to one reviewable purpose.

- Identify files/commits to split into a follow-up branch/PR
- Propose how to split (do not rewrite history unless asked)
- Update PR body scope/test plan to match
- Prefer guiding the user through a smaller PR over force-pushing surprises

## widen

Rare. Only when the user explicitly wants more in this PR.

- Require rationale; warn about review risk
- Update body and test plan
- Prefer separate PRs when possible

## merge

1. Check `gh pr view` + checks + reviews + branch policy.
2. If autofix, failing required checks, or issue-close verification is needed → hand off to **`merge-it`**.
3. Otherwise, on approval: squash-merge when repo practice says so (`gh pr merge --squash`), delete branch if appropriate, report URL + merge commit.

## clean

Hygiene on the PR description and checklist: remove stale template sections, fix links, drop resolved “TODO” noise. Do not change code.

## refine

Improve title, summary, test plan, and risk notes so reviewers can act — without widening code scope.

## explain

Explain the PR to the user: intent, main changes, risk, how to verify, what’s not included. Use the diff; don’t edit GitHub unless asked. After an explicit `explain`, offer to **execute** Complete the work (usually `merge-it`, `fix-it`, or `check-readiness`).

## document

Land or update repo documentation required by the PR (user/dev/API/runbook). Prefer existing paths. Then propose a PR body update linking those docs after approval.
