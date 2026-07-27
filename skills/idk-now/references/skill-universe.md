# idk-now skill universe

Consider **all** of these when recommending — not only DecisionNerd/dev-skills.

## 1. DecisionNerd/dev-skills (this pack)

Discover: `skills/*/SKILL.md` in this collection, or installed copies. Typical routing:

| Need | Skill |
| --- | --- |
| Situational tactical next | `recon` |
| Lost / no next / need vision-tied coaching | `idk-now` (this) |
| Track work | `issues`, `milestones`, `pulls` |
| Plan an issue | `recon issue` |
| Ready to PR/close? | `check-readiness` |
| Autofix → merge → close | `merge-it` |
| Bug / live break | `diagnose-bug`, `troubleshoot-app`, `fix-it` |
| Tests / observe / docs / research / refactor | `test-it`, `observe-it`, `document-it`, `research-it`, `refactor-it` |
| Overcomplicated goals / process / system / plan | `kiss` |
| Repo management (split/combine/monorepo/CI/ESC secrets) | `repos` |
| Agents misbehaving | `agents slap\|analyze\|design\|sub` |
| Ship | `stage-it`, `ship-it` |
| Disk/worktree clutter | `tidy-up` |

## 2. DocSlime

Product documentation system (init / fill / ADR / KISS review / install).

Use when the gap is **missing or incoherent product docs**, onboarding, or decision records — especially before large builds. Skills often named: `docslime-init`, `docslime-fill`, `docslime-adr`, `docslime-kiss`, `docslime-install`.

Prefer when vision signals are empty and the user chooses clarity-first.

## 3. ProductFeeling

Emotion-aware product design: how the product should *feel*, emotional journeys, tone, trust, delight. Upstream of Impeccable; pairs with DocSlime `docs/`.

Use when the blocker is “it works but feels wrong”, empty/error/success emotion, or need a feeling brief before UI craft.

## 4. Impeccable

Frontend craft: design, redesign, audit, polish, shape, motion, visual systems. Real UI code.

Use when the achievable goal is improving a **visible surface** and craft is the lever. Not for backend-only work.

## 5. Vendored skills in repo space

Search (read-only):

```text
.agents/skills/*/SKILL.md
.cursor/skills/*/SKILL.md
skills/*/SKILL.md
**/vendor/**/skills/**/SKILL.md
packages/**/skills/**/SKILL.md
```

Also check `AGENTS.md` / `CLAUDE.md` for named skills. Prefer the vendored copy’s instructions when both global and vendored exist.

If a vendored skill clearly matches the goal better than the generics above, recommend it.

## Discovery commands (optional)

```bash
# pack / local
find . -path './node_modules' -prune -o -name SKILL.md -print 2>/dev/null | head -80

# installed (if CLI available)
npx skills list 2>/dev/null | head -80
```

Do not install new skills unless the user asks; you may *suggest* `npx skills add …` as an alternate step.

## Recommendation bias

1. Unblock safety (prod break, agent thrash) first.
2. Else smallest step toward stated achievable goal.
3. Vision-building skills only when vision is weak *and* the user accepts a clarity step.
4. One primary invoke string the user can approve immediately.
