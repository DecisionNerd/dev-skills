# Workspace ownership for issue implementation

Read before the first repository write, including docs, generated files, formatting, and tests that write artifacts. Planning-only and GitHub-only operations may inspect any checkout read-only.

## Establish the task workspace

1. Read the closest tracked `AGENTS.md` and workflow guidance. Resolve the repository, issue, intended base, and existing PR before choosing a branch. Do not assume a universal `main` or `staging` policy.
2. Inspect `git status --short --branch`, `git worktree list --porcelain`, relevant branches, and linked/open PRs. Preserve all unrelated work. A clean checkout or matching issue number does not prove that no other agent owns it.
3. Reuse an existing task worktree only when the current session/host assignment or explicit handoff establishes ownership and it matches the issue. Never take over another active agent's branch/worktree, even for the same issue. Resolve duplicate ownership before writing to the same issue/PR; branch suffixes alone do not resolve it.
4. Otherwise create a dedicated worktree and unique task branch from the resolved base (or the existing issue branch when unowned and not checked out elsewhere). Use repository/host naming and placement conventions; otherwise prefer a sibling path outside the shared checkout. For a new branch, the command shape is `git worktree add -b <unique-task-branch> <absolute-task-path> <resolved-base-ref>`. Verify the base revision; fetch when needed and permitted. Never use force to bypass a checked-out branch or reuse a nonempty path. If creation races with another session, re-inspect ownership before retrying.
5. Verify `git -C <task-path> rev-parse --show-toplevel`, `git -C <task-path> branch --show-current`, and status. Record the absolute path, branch, base revision, issue, and owning session in working context. Run every edit, Git command, build, and test in that path. Configure file tools to use it too; a shell `cd` does not relocate other tools. Confirm the path again after a handoff or context reset.

Default to isolation even for a single implementation agent. A host-created dedicated worktree already satisfies this rule; do not nest another worktree unnecessarily. If the user or repository explicitly requires the existing checkout, use it only with exclusive writer ownership and serialize all writes. If isolation cannot be established, continue useful read-only work and report the concrete blocker rather than silently editing the shared checkout.

Do not switch branches, stash, reset, clean, or copy unrelated dirty changes out of the shared checkout to prepare the task. If this task depends on uncommitted work there, resolve its ownership and transfer explicitly before implementation.

## Concurrent agents and handoffs

This reference does not require spawning agents. When multiple agents are used:

- Give each concurrent writer a separate branch and worktree plus a bounded scope. Read-only reviewers may share a checkout while it is stable; otherwise review an immutable commit/snapshot. Never assume a subagent tool creates filesystem isolation.
- Pass the absolute path, branch, base, issue, scope, validation commands, and owner to each worker. Require it to verify its working directory before editing. If the host cannot bind a worker's writes to that worktree, keep it read-only and let the owning agent implement, or serialize the work with an explicit ownership handoff.
- Keep writable build outputs, temporary files, test databases, and service ports separate when concurrent runs would collide. Git worktrees share repository metadata and do not isolate external services.
- Have workers return commits, changed files, and validation evidence. The designated integrator reviews and integrates commits sequentially in its own task worktree, resolves conflicts there, and validates the combined result before the PR/merge handoff. Workers must not independently merge or close the same parent issue.
- Preserve ownership through `recon`, diagnosis, implementation, `test-it`, `check-readiness`, and `merge-it`. Those handoffs do not authorize returning to the shared checkout or taking another agent's branch.
- Remove only this task's worktrees/branches after checking they are inactive, clean, and their work is preserved under the repository's completion policy. Never prune other agents' workspaces as routine cleanup.
