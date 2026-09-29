# AGENTS.md

Guidance for AI coding agents working in this repository.

## Repository Overview

A personal collection of agent skills for Cursor, Claude Code, Codex, and other agents compatible with the [Agent Skills](https://agentskills.io/) format and the [`npx skills`](https://github.com/vercel-labs/skills) CLI.

Documentation site (Astro Starlight) lives at the repo root and deploys to GitHub Pages from `.github/workflows/deploy.yml`. Build output goes to `site/` (gitignored). Local docs commands: `npm run handbook:prepare`, `npm run dev`, `npm run build`.

Canonical handbook source is [`handbook/`](./handbook/) (**The 'This is Fine' Guide to Building Software**). Do not edit `src/content/docs/handbook/` — it is generated and gitignored.

Install:

```bash
npx skills add DecisionNerd/dev-skills
```

## Creating a New Skill

### Directory Structure

```
skills/
  {skill-name}/           # kebab-case directory name
    SKILL.md              # Required: skill definition
    scripts/              # Optional: executable scripts
    references/           # Optional: supporting docs loaded on demand
    lib/                  # Optional: shared code for scripts
```

### Naming Conventions

- **Skill directory**: `kebab-case` (e.g. `issues`, `merge-it`)
- **SKILL.md**: Always uppercase, always this exact filename
- **Scripts**: `kebab-case.sh` or `kebab-case.mjs`

### SKILL.md Format

```markdown
---
name: {skill-name}
description: {One sentence describing when to use this skill. Include trigger phrases.}
---

# {Skill Title}

{Brief description of what the skill does.}

## When to Use

{Scenarios that should activate this skill}

## Instructions

{Step-by-step guidance for the agent}
```

### Required Fields

- `name`: Unique identifier (lowercase, hyphens allowed)
- `description`: Brief explanation of what the skill does and when to use it

### Best Practices

- Keep `SKILL.md` under ~500 lines; put detailed reference material in separate files
- Write specific descriptions so agents know when to activate the skill
- Prefer scripts over large inline code blocks when execution is needed
- Link supporting files one level deep from `SKILL.md`
- Every `SKILL.md` must carry the `## Operating contract` block copied byte-for-byte from the text between the `<!-- contract:start -->` and `<!-- contract:end -->` markers in `handbook/concepts/14-operating-contract.md` (the markers stay in that file only); do not paraphrase or summarise it.
- Run `npm run check:skills` before committing. The script verifies that every skill has the contract block, has no banned phrases, stays under 500 lines, and (with `--mirrors`) that `src/content/docs/skills/**` description frontmatter matches the `SKILL.md` frontmatter description.
- The `description:` field in `src/content/docs/skills/**` mirrors must match the `description:` in the corresponding `SKILL.md` frontmatter exactly (whitespace-normalised). Update both together.

### End-User Installation

```bash
# All skills
npx skills add DecisionNerd/dev-skills

# One skill
npx skills add DecisionNerd/dev-skills --skill {skill-name}

# Global install
npx skills add DecisionNerd/dev-skills -g -y
```
