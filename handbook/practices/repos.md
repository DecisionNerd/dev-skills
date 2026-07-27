# Repos

GitHub repo split/combine, monorepo, CI, Pulumi ESC secrets.

## What it is

GitHub repo split/combine, monorepo, CI, Pulumi ESC secrets. This practice is a skill-mapped TTP: *when*, *why*, and *which command*—not a full copy of the skill. Open the skill to execute.

## Why it works

Repo topology and CI security are first-class reliability. DORA ties loosely coupled architecture and CI to performance; GitHub OIDC + pinned Actions + least-privilege permissions are current supply-chain baselines; Pulumi ESC is this house’s default over long-lived cloud keys.

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

[01-this-is-fine-stance](../concepts/01-this-is-fine-stance.md), [03-smallest-next-step](../concepts/03-smallest-next-step.md), [07-stop-conditions](../concepts/07-stop-conditions.md)

## Further reading

- [GitHub Docs — OIDC for Actions](https://docs.github.com/en/actions/concepts/security/openid-connect)
- [GitHub — Securing the open source supply chain](https://github.blog/security/supply-chain-security/securing-the-open-source-supply-chain-across-github/)
- [Pulumi ESC + GitHub Actions](https://www.pulumi.com/docs/esc/guides/integrate-with/github-actions/)
- [DORA — Continuous integration](https://dora.dev/capabilities/continuous-integration/)

See also the handbook [Sources & grounding](../sources.md) bibliography.

## Agent skill

`repos` · `repos status|split|combine|monorepo|architecture|ci harden|ci simplify|secrets setup`
