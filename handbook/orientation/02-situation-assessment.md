# Situation Assessment

A short, honest map of the room: environment, repo health, docs, git history, and what’s actively burning.

## What it is

Situation is evidence, not mood. Branch dirty? Prod erroring? Agent looping? Milestone empty? Say it in bullets. The output should make the next person (or agent) dangerous in a good way within a minute.

## Why it works

Builders under stress skip the survey and “just fix it,” which is how you get two writers on one file and a half-applied migration. A brief survey is cheaper than a slap later.

## Do

- Read `git status`, recent log, open PR if any
- Skim README / AGENTS / product docs once
- Separate **fire** (user-impacting, data risk, thrash) from **smoke** (noise, prefs)

## Don't

- Dump the whole monorepo into context
- Treat every warning as Sev-1

## Agent skill

`idk-now` · `recon` · `recon repo` · `troubleshoot-app` · `diagnose-bug` · `tidy-up scan`
