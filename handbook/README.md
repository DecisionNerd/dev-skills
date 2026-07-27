# Handbook

Canonical source for **The 'This is Fine' Guide to Building Software**.

One file per page:

- `index.md` — book front: stance → lifecycle → architecture → reference
- `flow/` — lifecycle narrative (Discover → Deliver → Operate → Maintain → Retire)
- `architecture/` — chooser hub + what-runs-where placement
- `paths/` — project shapes (website → CLI → Python package → monorepo) plus `paths/compute/` host catalog
- `why-it-works.md` — why calm, skill-driven building beats panic automation
- `orientation/` — recover vision and situation before picking tools
- `concepts/` — deep dives (`NN-` prefixes set reading order); language/framework are Architecture choosers
- `strategies/` — goal-shaped plays that compose practices (`NN-` order)
- `practices/` — modular Tools, Techniques, and Practices (TTPs), skill-mapped
- `sources.md` — authoritative bibliography grounding TTPs and lifecycle
- `continue-learning.md` — companions and further study beyond this handbook
- `assets/` — cover art (`this-is-fine.png`; optional `this-is-fine.svg` homage)

**Authoring rule:** narrative in `flow/`; architecture choosers in `architecture/` (+ language/framework concepts + `paths/` detail); strategies/practices as the reusable deck. Cross-link with relative `.md` links. Do not reintroduce Path A/B/C or Track A/B naming.

`npm run handbook:prepare` stages this tree into Starlight under `src/content/docs/handbook/` (generated; do not edit there).

Edit the handbook **here**.
