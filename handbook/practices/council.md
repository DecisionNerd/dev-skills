# Council

Independent review from three model providers, with the parent responsible for
checking evidence and deciding what to change.

## When to draw

The user asks for a council or wants several providers to challenge a plan or
implementation. Use ordinary review for work that does not need this extra cost.

## Why it works

Independent first passes expose different assumptions. Reconciliation ties each
finding to the same artifact and its acceptance criteria; agreement alone is not
proof. Fresh reviews after fixes show whether the updated artifact resolves the
accepted findings.

## Do

- Use three providers, honor named members, and report unavailable members.
- Keep reviewers read-only and the parent responsible for fixes.
- Preserve scores, verdicts, evidence, and substantive dissent by round.
- Bound review loops; report unresolved issues when progress stalls.

## Don't

- Substitute same-provider agents without the user's choice.
- Treat a high score as permission to merge or deploy.
- Expand scope to win unanimous approval.

## Agent skill

`council <question|plan|path|PR>`

## Further reading

[Theo Browne's original council skill](https://github.com/t3dotgg/tstack/blob/1085050f3baed1ac724caa4a8166145fb2ac88af/skills/council/SKILL.md)
(MIT); [Sub-Agents](sub-agents.md) for general delegation.
