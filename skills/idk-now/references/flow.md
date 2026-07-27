# idk-now flow

## Output shape (`guide` / `quick`)

```markdown
## Survey
- Env: …
- Repo: …
- Vision signals: … (or “unclear”)
- Recent git: …
- Skills on hand: DecisionNerd …; DocSlime …; ProductFeeling …; Impeccable …; vendored: …

## Questions
1. …
2. …

*(wait for answers unless quick mode already has enough)*

## Direction
**Vision** (confidence: low|med|high): …
**Achievable goal:** …

## Next
1. **Primary:** `<skill> <command> …` — …
2. Alternatives: …

## Follow-Up Prompt
Want me to run <primary>?
```

## Survey budget

Stay brief. Cap file reads: README + one vision/product doc + AGENTS if present + git log. Do not recursively read the whole `docs/` tree unless vision is empty after the first pass.

## Question tips

- Offer choices, not essays.
- If the user says “just ship something”: bias toward `check-readiness` / `pulls` / `stage-it` / `ship-it` / Impeccable polish of an existing surface — not greenfield DocSlime.
- If vision is missing and the project is product-shaped: suggest DocSlime init or ProductFeeling init as *one* path, not a docs rabbit hole, unless they choose clarity-first.
- If the surface is UI and the goal is feel/craft: ProductFeeling (emotion) → Impeccable (craft), not random `fix-it`.
- If the repo is dirty with agent debris: `tidy-up scan` or `agents slap` before strategy theater.

## Goal quality bar

An achievable goal must be:

- Finishable in one focused session (or clearly “part 1 of …”)
- Connected to why the project exists (users, product promise, or maintainer mission)
- Not “organize everything” or “boil the ocean”
