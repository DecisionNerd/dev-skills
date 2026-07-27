# repos combine

Join two or more GitHub repositories into one.

## Plan first

1. **Target layout** — path prefixes (`apps/a`, `packages/b`)
2. **History** — import with prefixes vs squash-import; call out rewrite risks
3. **Default branch / protections** — which rules win
4. **CI** — unify workflows; ESC envs; required checks
5. **CODEOWNERS / teams** — map old owners
6. **Cutover** — freeze sources → import → CI → redirect → archive donors

## Do

- Preserve licenses per tree
- One write owner during cutover
- Right-sized migration tasks (`kiss` / Goldilocks)

## Don't

- Silent history destruction
- Keep duplicate deploy pipelines fighting each other
