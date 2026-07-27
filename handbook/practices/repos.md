# Repos

GitHub repository management: status, split/combine, monorepo, architecture, CI harden/simplify, secrets via **Pulumi ESC** by default.

## What it is

GitHub repository management: status, split/combine, monorepo, architecture, CI harden/simplify, secrets via **Pulumi ESC** by default. In this guide, practices are skill-mapped TTPs: they tell you *when*, *why*, and *which command* — not a second copy of the full skill text. Open the skill when you execute.

## Why it works

Repo topology and CI/secrets posture are how fire spreads or gets contained. Named commands keep migrations DAG-shaped and right-sized (`kiss`).

## When to use it

Carving or joining repos, monorepo design, hardening workflows, or replacing long-lived GitHub Secrets with ESC/OIDC.

## Do

- Plan + approve before history rewrite, transfer, or secret deletion
- Default secrets to Pulumi ESC + OIDC
- Pair CI simplify with a `kiss` lens so earned gates survive

## Don't

- Print secret values
- Force-push shared history without approval
- Gut required checks to “simplify”

## Related concepts

[01-this-is-fine-stance](../concepts/01-this-is-fine-stance.md), [03-smallest-next-step](../concepts/03-smallest-next-step.md), [07-stop-conditions](../concepts/07-stop-conditions.md)

## Agent skill

`repos` · `repos status|split|combine|monorepo|architecture|ci harden|ci simplify|secrets setup`
