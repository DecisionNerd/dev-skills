# Merge It

Merge current work to the next integrate target.

## What it is

Merge current work to the next integrate target (main/trunk, release branch, staging, or another repo-defined base) — autofix → CI green → merge → close issue. Not production promote. This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

Trunk-based development and CI require green automated checks before integrate (DORA). GitHub protected branches enforce required status checks so “merge” means “proven,” not “hope.” Closing linked issues completes the audit trail.

## When to use it

When the situation matches the one-liner above and [Orientation](../orientation/index.md) (or your [project path](../paths/index.md)) says this is the fire to touch now.

## Do

- Invoke the skill; follow its safety rules
- Keep one write owner; collect evidence before claiming done
- Hand off to the next practice instead of boiling the ocean

## Don't

- Skip orientation when you’re lost
- Spawn overlapping agents to “go faster”
- Treat the practice as done without evidence

## Related concepts

[06-work-ownership](../concepts/06-work-ownership.md), [04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md)

## Further reading

- [DORA — Trunk-based development](https://dora.dev/capabilities/trunk-based-development/)
- [GitHub Docs — Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Docs — Linking PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`merge-it`
