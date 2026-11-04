# Modernize

Check whether an old PR's goal and implementation still fit before updating its
branch.

## When to draw

The user asks to rebase, modernize, or bring an old PR up to date.

## Why it works

Git detects line conflicts, not architectural conflicts. Comparing the original
intent with intervening base changes reveals duplicate mechanisms, superseded
fixes, and retired behavior that a clean rebase could restore.

## Do

- Use the PR's actual base and head, including fork repositories.
- Choose MODERNIZE, REWORK, or CLOSE from evidence before publishing.
- Preserve the original head and compare rebased commits with `git range-diff`.
- Protect concurrent changes with a lease pinned to the observed remote head.
- Verify the new head; distinguish old CI results from current evidence.

## Don't

- Rebase an obsolete implementation just to turn CI green.
- Close a PR from a closure recommendation without authorization.
- Refresh a rejected lease blindly or overwrite another active writer.
- Change branches during an assessment-only request.

## Agent skill

`modernize <PR|branch>`

## Further reading

[Theo Browne's modernize](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/modernize/SKILL.md)
(MIT); [Takeover](takeover.md); [Pulls](pulls.md).
