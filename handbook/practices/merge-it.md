# Merge It

Drive the full release path per repo policy: integrate, stage, ship.

## What it is

One skill for the whole release path — feature PR into the next integrate target, staging lands with deploy/smoke verification, and production promotion with live health checks — with the path discovered from repository instructions, not memory. This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

Trunk-based development and CI require green automated checks before integrate (DORA). GitHub protected branches enforce required status checks so “merge” means “proven,” not “hope.” A staging environment is a progressive-delivery control: validate under production-like conditions before full exposure (SRE launch/canary thinking) — staging that never matches prod is theater. Continuous delivery keeps software releasable; promote with evidence and rollback thinking, not hope. Closing linked issues completes the audit trail.

## When to use it

When the situation matches the one-liner above and [Orientation](../orientation/index.md) (or [Deliver](../flow/02-deliver.md) / [Operate](../flow/03-operate.md)) says this is the fire to touch now.

## Do

- Invoke the skill; follow its safety rules
- Read the repo’s release policy first; never invent a staging or production path a repo does not use
- Stop at phase boundaries; collect deploy/smoke evidence before claiming shipped
- Keep one write owner; collect evidence before claiming done

## Don't

- Skip orientation when you’re lost
- Call a merge a ship (or a stage) — name the phase
- Treat the practice as done without evidence

## Related concepts

[06-work-ownership](../concepts/06-work-ownership.md), [04-evidence-over-vibes](../concepts/04-evidence-over-vibes.md), [07-stop-conditions](../concepts/07-stop-conditions.md)

## Further reading

- [DORA — Trunk-based development](https://dora.dev/capabilities/trunk-based-development/)
- [DORA — Continuous delivery](https://dora.dev/capabilities/continuous-delivery/)
- [GitHub Docs — Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Docs — Linking PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)
- [Google SRE Workbook — Canarying releases](https://sre.google/workbook/canarying-releases/)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`merge-it`
