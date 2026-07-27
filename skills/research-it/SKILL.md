---
name: research-it
description: >
  Research a technical or product question before building — APIs, libraries,
  prior art in-repo, external docs, tradeoffs, and a recommendation. Use when
  the user says "research it", asks what to use, compares options, wants an
  RFC-style brief, or needs evidence before implementation. Read-only by
  default; ask before installing dependencies or writing production code.
  Hand off to fix-it / recon issue / issues create when ready to plan or track.
argument-hint: "[question|library|API|approach...]"
---

# Research It

Replace vibes with **evidence**: what exists, what fits this repo, what to do next.

## When to use

- “What’s the best way to…?”, “research it”, vendor/API comparison, spike before build
- Ambiguous architecture choice before `recon issue` or `fix-it`
- Need external docs or in-repo prior art surveyed first

## Workflow

1. **Frame the question**
   - Decision to make, constraints (stack, latency, cost, compliance, timeline), success criteria.

2. **Search inward then outward**
   - In-repo: existing packages, patterns, ADRs, prior PRs/issues.
   - External: official docs (WebFetch), reputable references; note versions/dates.
   - Don’t treat random blogs as authority over primary docs.

3. **Compare options**
   - 2–4 viable options max. Criteria table: fit, complexity, ops burden, risk, lock-in.
   - Prefer **house defaults when unconstrained**: React + Next on Vercel for web; Pulumi ESC + OIDC for secrets; Langfuse for LLM obs/evals — unless the repo already standardized elsewhere.
   - Call out unknowns and what a spike would prove.

4. **Recommend**
   - One primary recommendation with rationale tied to *this* repo’s constraints.
   - Explicit non-goals / rejected options with why.

5. **Next steps**
   - Suggest `issues create`, `recon issue`, `fix-it`, or a time-boxed spike checklist.
   - Ask before adding dependencies or scaffolding.

## Guardrails

- Read-only unless the user asks to spike code or add a dep.
- Cite sources (URLs/paths). Distinguish fact vs inference.
- No secret keys in research notes.

## Output

```markdown
**Question**
- ...

**Constraints**
- ...

**Options**
| Option | Fit | Cost/complexity | Risk | Notes |
| ... |

**Recommendation**
- Primary: ...
- Why: ...
- Rejected: ...

**Open questions / spike**
- ...

**Follow-Up Prompt**
Do you want me to open an issue (issues create), plan it (recon issue), or spike a prototype?
```

## Grounding

This skill’s TTPs are grounded in current engineering baselines (DORA, GitHub Docs, Fowler/Beck, Google SRE & SWE book, OpenTelemetry, OWASP LLM / NIST AI RMF, Diátaxis — see handbook `sources.md`).

Evidence before commitment; avoid jumping to complex systems before a simple one works (Gall’s Law / Beck). Prefer house defaults only when the repo has no stronger local constraint (`handbook/concepts/11-quality-regimes.md` for generative tooling; `repos` for ESC).

Handbook card: `handbook/practices/research-it.md`.
