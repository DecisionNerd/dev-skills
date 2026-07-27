# Handbook

Canonical source for **The 'This is Fine' Guide to Building Software**.

One file per page:

- `index.md` — title, What’s Inside, how to use (leads with project paths)
- `paths/` — progressive shapes (website → CLI → Python package → monorepo) plus `paths/compute/` deploy targets

- `why-it-works.md` — why calm, skill-driven building beats panic automation
- `orientation/` — recover vision and situation before picking tools
- `concepts/` — deep dives (`NN-` prefixes set reading order)
- `strategies/` — goal-shaped plays that compose practices (`NN-` order)
- `practices/` — modular Tools, Techniques, and Practices (TTPs), skill-mapped
- `sources.md` — authoritative bibliography grounding practice TTPs
- `continue-learning.md` — companions and further study beyond this handbook
- `assets/` — original “this is fine” homage art (inspired by the cultural meme; **not** a copy of KC Green’s copyrighted comic)

**Authoring rule:** put teaching sequences in `paths/`; keep strategies/practices as the reusable deck. Cross-link with relative `.md` links.

`npm run handbook:prepare` stages this tree into Starlight under `src/content/docs/handbook/` (generated; do not edit there).

Edit the handbook **here**.
