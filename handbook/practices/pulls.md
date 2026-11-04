# Pulls

Open, improve, and monitor PRs; babysit verified fixes without implicit merging.

## What it is

PR operations with explicit finish lines: watch observes, babysit repairs and monitors, and merge requires its own authorization. Open the skill to execute.

## Why it works

Pull requests are the modern code-review batch. Google’s eng practices favor small, reviewable changes; GitHub PRs plus required checks make review and CI the integrate gate for trunk-based teams.

## When to use it

When the situation matches the one-liner above and [Orientation](../orientation/index.md) (or your [project path](../paths/index.md)) says this is the fire to touch now.

## Do

- Invoke the skill; follow its safety rules
- Keep one write owner; collect evidence before claiming done
- With only a PR identifier (± details), or no-arg on a current-branch PR, **execute** completion work — don’t menu admin commands
- Preserve explicit watch, babysit, and ready-for-human-merge restrictions across handoffs
- Lead PR descriptions with the problem and resulting behavior; keep authorized review replies attributed and evidence-backed
- Use one supported watcher and report any limitations of checks-only monitoring
- Hand off to the next practice instead of boiling the ocean

## Don't

- Skip orientation when you’re lost
- Spawn overlapping agents to “go faster”
- Treat the practice as done without evidence
- Resolve an older review finding merely because a newer push exists
- Treat monitoring readiness as permission to merge

## Related concepts

[06-work-ownership](../concepts/06-work-ownership.md), [04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md)

## Further reading

- [Google Eng Practices — Code review](https://google.github.io/eng-practices/review/)
- [GitHub Docs — About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [DORA — Trunk-based development](https://dora.dev/capabilities/trunk-based-development/)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`pulls` · `pulls watch <PR>` · `pulls babysit <PR>`
