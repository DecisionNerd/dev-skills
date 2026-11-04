# Takeover

Continue inherited work by verifying the original goal, current code, and write
ownership before changing anything.

## When to draw

A user hands over another agent's PR, branch, or thread and asks you to finish it.

## Why it works

A handoff summary can lag behind commits or later corrections. Reconstructing
intent from current artifacts prevents redundant fixes and lost work. Preserving
authorship and verified co-author identities keeps credit intact through a
replacement PR or squash merge.

## Do

- Read the source and later corrections; pin the actual head and intended base.
- Establish exclusive ownership or use an owned continuation.
- Reproduce and verify inherited claims before relying on them.
- Keep the user's finish line through every delivery handoff.

## Don't

- Reset dirty work or write into another active agent's checkout.
- Close a source PR or merge merely because the work was handed over.
- Guess contributor identities or substitute model attribution for human credit.

## Agent skill

`takeover <PR|branch|agent-thread>`

## Further reading

[Theo Browne's takeover](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/takeover/SKILL.md)
(MIT); [Modernize](modernize.md); [Pulls](pulls.md).
