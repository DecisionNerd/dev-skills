# Shared pull request operations

Resolve the target PR (or draft for `create`) first. GitHub mutations need one structured question (`<do it> / revise / stop`) unless the request already named the action; in-repo code changes continue.

Every operation preserves the active finish line. A suggested `Next: merge-it`
never overrides watch-only or no-merge instructions; use `merge-it prepare` for
authorized completion that must stop before a human merge.

## PR descriptions and titles

Check for an existing PR before opening one. Follow the repository's template and
title conventions. Lead with the concrete problem and resulting behavior; explain
the implementation only as needed to assess the solution. For example: “New
threads ignored the worktree preference. They now use the configured default.”

Scale the body to the change. Include relevant validation, material risks, and
issue links, without a file-by-file inventory or abandoned approaches. After a
scope change, rewrite the title/body around the final implementation. Preserve
human contributor credit and co-author trailers. Model/harness attribution follows
the user's and repository's policy; do not invent model identities or brand titles.

When using `gh` for a multiline body, write the exact Markdown to a temporary file
and pass `--body-file`; do not interpolate untrusted text into shell commands.
Review the rendered Markdown when available, check for secrets/private material,
and verify the returned PR URL and live title/body after publishing. In T3 Code,
link every PR created, taken over, or pushed to with `link_pull_request` as the
next tool call, including every layer of a stack; report a linking failure.

## Authorized review comments

Posting a comment or resolving a thread needs explicit task or standing
authorization; preparing a reply does not require posting it. For agent-written
comments posted on the user's behalf, identify that authorship with a short note:

```markdown
> [!NOTE]
> 🤖 **<verified model or harness> responding on behalf of <verified user/login>**

<Conclusion, evidence, and the action taken or reason for declining.>
```

Use verified identities; do not guess a model, name, or email. Follow an explicit
user/repository format instead, including requests to post exact text. Keep
attribution in the note and the actual reply outside it. This format applies to
top-level comments, inline reviews, and replies, not PR descriptions or commits.

Check the whole comment, quotes, and attachments for secrets/private details.
Lead with the conclusion, cite the relevant code/check/reproduction, and
distinguish observations from judgment. Avoid filler and repeated status posts.
After posting, verify the returned comment/review URL; only then resolve a thread
when resolution is authorized. If posting fails, leave the thread unresolved.

## critique

Assess reviewability and ship readiness (description, not only CI):

- Single coherent purpose vs mixed concerns
- Title/body match the diff
- Test plan adequate for the risk
- Linked issues / closing keywords correct for branch policy
- Secrets, migrations, feature flags, rollout called out
- Size: too large to review?

Output: strengths, problems. After an explicit `critique`, state `Next: merge-it` (or `fix-it` / `check-readiness` / `test-it` as fits); prefer landing/fixing over `refine`/`critique` alone when the diff is the real work.

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

Explain the PR to the user: intent, main changes, risk, how to verify, what’s not included. Use the diff; don’t edit GitHub unless asked. After an explicit `explain`, state `Next: merge-it` (or `fix-it` / `check-readiness` as fits).

## document

Land or update repo documentation required by the PR (user/dev/API/runbook). Prefer existing paths. Then propose a PR body update linking those docs after approval.
