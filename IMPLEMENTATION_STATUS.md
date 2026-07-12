# Implementation Status & Development Reference

**Document purpose:** Authoritative snapshot of what exists in this repository, how it is structured, what was validated, and what remains for full plan Definition of Done. Written for **future agents and human developers**.

**Implementation history:** The source registry and original course foundation predate the current edition. The learner-facing interface was comprehensively rebuilt as the **1915 Seminar Folio** edition and revalidated by Codex on 2026-07-12.

**Authoritative plan:** `GR_LEARNING_MATERIALS_PLAN.md`  
**Related short handoff:** `ai/07_handoff.md`  
**User-facing README:** `README.md`

**Status date of this write-up:** 2026-07-12.

**Overall maturity:** **v2 shippable interactive course** — source foundation complete; HTML course usable offline; learner-facing system rebuilt; all 18 pages content-validated; unit tests and production build passing; desktop and mobile browser QA complete. See §9 for remaining editorial opportunities.

---

## 1. Project goal (as implemented)

Build a **concept-first, lightly mathematical** general-relativity learning experience whose **spine is Adam Brown’s lecture transcript** (conversation with Dwarkesh Patel). The course must:

1. Teach why Einstein replaced gravity-as-force with curved spacetime.
2. Cover essential black-hole physics and observational connections.
3. Keep three content classes visibly distinct:
   - **Transcript-grounded** (timestamped)
   - **Board reconstruction** (confidence-labeled; never a facsimile claim)
   - **GR supplement** (established background added for coherence)
4. Ship as an **interactive, offline-capable HTML** experience (canonical deliverable per plan Part II).

Historical Einstein Archive appendices are included as a secondary track with **evidence-status** labeling.

---

## 2. Implementation history (phases)

### 2.1 Phases 0–1 — Source foundation (completed earlier; verified)

Delivered under the plan’s “first task after authorization” and recorded in `ai/00_objective.md` through `ai/06_verification.md`.

| Deliverable | Location | Notes |
|-------------|----------|--------|
| Immutable raw transcript | `transcript.txt` | Must not be rewritten by tooling |
| Normalized working copy | `source/transcript.normalized.txt` | UTF-8 / NFC / LF |
| Timestamp fragments | `source/timestamp_fragments.json` | **744** monotonic interview fragments (parser stops on timestamp regression; excludes trailing next-video noise) |
| Argument units | `source/argument_units.json` | **46** curated teaching units |
| Scientific claims | `source/claims.json` | **55** claims with provenance |
| Board reconstructions | `source/board_reconstructions.json` | **18** plates, confidence high/medium/low |
| Source registry | `source/source_registry.json` | Derivation graph + raw SHA-256 |
| Lesson 1 implementation brief | `source/lesson1_vertical_slice.md` | Inputs for first UI slice |
| Pipeline scripts | `scripts/prepare_source.js`, `build_source_maps.js`, `validate_source.js` | Regeneration + validation |

**Raw transcript hash (as verified in Phase 0–1):**  
`53ee28438067a11259a1b533e479a3eb7363ee4b48d8c589396376b5b21bf9d9`

**Discoveries worth preserving for future work:**

- Apparent mojibake was often a **Windows console decoding** issue; UTF-8-aware tools read the file correctly.
- Sponsor / non-teaching material can appear inside timed transcript; argument units flag affected spans.
- Board reconstructions remain **inferential** until video stills exist.

### 2.2 Learner-facing HTML course (v2 — 1915 Seminar Folio)

Implemented after Phase 0–1 gate. Stack matches plan §9.4 defaults:

- Semantic multi-page HTML
- Modern CSS design tokens
- Vanilla ES modules
- **Vite 6** multi-page build (`base: './'` for offline relative assets)
- **KaTeX** for math (bundled into production build; no CDN required after `npm run build`)
- **localStorage** for progress, preferences, predictions
- SVG + limited DOM animation (respects reduced motion)
- No React, no backend, no auth

### 2.3 Human validation performed (by product owner)

| Check | Result |
|-------|--------|
| Lesson 1 full smoke test (prediction → Mass Cancellation Lab → practice → complete) | **Passed; no bugs reported** |
| Additional lessons smoke-tested | **Passed** (owner reported “a few lessons”; not every route formally logged) |
| Current rebuild acceptance | **Passed** — source validation, 18-page content validation, unit tests, production build, desktop/mobile visual QA, navigation and interaction checks |

Future agents should **not** assume every page/app was exhaustively tested on all breakpoints.

---

## 3. Repository map

```text
general_relativity_dwarkesh/
├── GR_LEARNING_MATERIALS_PLAN.md   # Full product + scientific + archive spec
├── IMPLEMENTATION_STATUS.md        # THIS FILE — agent/human reference
├── README.md                       # How to run / high-level map
├── transcript.txt                  # IMMUTABLE raw source
├── package.json                    # npm scripts, vite, katex
├── vite.config.js                  # Multi-page HTML entry discovery
│
├── index.html                      # Course home
├── lessons/                        # 7 lesson entry HTML files
├── visual-lab/index.html
├── practice/index.html
├── reference/index.html
├── review/capstone.html
├── archive/                        # Archive A–E entry HTML files
│
├── src/                            # Application code (canonical logic)
│   ├── main.js                     # Page router / mounts by data-page
│   ├── apps/                       # Interactive labs + board SVG plates
│   ├── components/                 # Shell, provenance, lesson page, KaTeX helper
│   ├── content/                    # lessons, practice, archive data modules
│   ├── styles/                     # tokens, base, layout, course, archive
│   └── utils/                      # constants, math, storage, paths
│
├── source/                         # Evidence layer (JSON + normalized transcript)
├── scripts/                        # Source + content validation + flashcard export
├── tests/unit/math.test.js         # Formula unit tests
├── public/                         # Static assets copied to dist
│   ├── attribution/SOURCES.md
│   └── flashcards.csv
│
├── 01_…md … 08_…md                 # Markdown companions (outline / print-oriented)
├── ai/                             # Agent workflow notes (objective → handoff)
└── dist/                           # Production build output (generated; do not hand-edit)
```

**Ignore for product logic:** `mcps/` (local MCP tool schema dumps; not part of the course).

---

## 4. How the HTML app works

### 4.1 Multi-page + shared module pattern

Each HTML page is thin:

- `#site-shell` — hydrated by `mountShell()`
- `#main` — page body mounted by `src/main.js` based on `document.body.dataset.page` (and `data-lesson-id` for lessons)
- `<script type="module" src="/src/main.js">` — Vite rewrites for build

**Page types (`data-page`):**

| Value | Mount behavior |
|-------|----------------|
| `home` | Course index, lesson cards, provenance legend |
| `lesson` | `mountLessonPage(lessonId)` from `lessonPage.js` |
| `visual-lab` | All board plates (L1 SVGs) + all labs |
| `practice` | Misconception clinic + flashcards + CSV copy helper |
| `reference` | Concept atlas + equation cards + glossary |
| `capstone` | Full-chain teach-back prompts |
| `archive-index` / `archive-ten-year` / `archive-constellation` / `archive-quantum` / `archive-turing` / `archive-nobel` | Archive sections |

### 4.2 Navigation (plan §4)

Implemented in `src/components/shell.js`:

- Global header: mark, Lessons/Visual Lab/Practice/Reference/Einstein Archive, Resume, Settings
- Sticky **horizontal lesson rail**: Index | 1 Coincidence | … | 7 Evidence
- Archive secondary rail on archive pages
- Breadcrumb + previous / index / next on lesson pages (`renderLessonNav`)
- Skip link to `#main`
- Mobile menu toggle for global nav
- Settings: reduced motion, plain archive mode, font scale
- Progress via localStorage (`src/utils/storage.js`)
- Provenance drawer (slide-over) for badges

**Deep links:** lesson section IDs, board plate IDs, app host IDs. Relative path helper: `src/utils/paths.js` (`hrefTo`, `depthPrefix`).

### 4.3 Provenance system

- Badges: `src/components/provenance.js` → `provenanceBadge()` / `openDrawer()`
- Labels map in `PROVENANCE_LABELS` (`src/utils/constants.js`)
- Scientific classes: `transcript`, `board-reconstruction`, `gr-supplement`
- Historical classes used in archive: documented, recollected, disputed, near-encounter, first-person-recollection, etc.
- Drawer content: class, timestamps, board confidence, detail, clues, fixed disclaimer about non-facsimile boards

### 4.4 Lesson template (as rendered)

`src/components/lessonPage.js` builds each lesson from `src/content/lessons.js`:

1. Brown’s question + timestamp badge  
2. Learner prediction textarea (local note)  
3. Sections: HTML body, optional provenance, optional board plates, optional app mount  
4. Three-rung mathematics (A/B/C `<details>`)  
5. Practice MCQs with explain + retry  
6. Teach-back + **Mark lesson complete**  
7. Connections chips + lesson nav  

**Lesson content module:** `src/content/lessons.js` — all seven lessons’ narrative, questions, math rungs, teach-backs, insight statements.

### 4.5 Design system

CSS under `src/styles/`:

| File | Role |
|------|------|
| `tokens.css` | Colors (geometry/matter/light/observers/warning), archive palette, layout vars |
| `base.css` | Typography, buttons, badges, cards, callouts, forms, KaTeX overflow |
| `layout.css` | Header, rails, drawer, settings, footer, breadcrumbs, lesson-nav |
| `course.css` | Hero, lesson cards, board plates, app shells, practice items, math rungs |
| `archive.css` | Rare-book theme, timeline, person cards, Solvay grid, Nobel sim |
| `main.css` | Imports all of the above + KaTeX CSS |

**Archive plain mode:** `html[data-plain-archive='true']` flattens archive theme toward main course chrome.

---

## 5. Curriculum & features implemented

### 5.1 Seven lessons

| # | File | Content module id | Target insight (compressed) | Primary app(s) |
|---|------|-------------------|-----------------------------|----------------|
| 1 | `lessons/01-coincidence.html` | `lesson-1` | Mass equality → universal free fall is a deep clue | Mass Cancellation Lab + boards b01–b04 |
| 2 | `lessons/02-happiest-thought.html` | `lesson-2` | Free fall removes gravity locally; standing is accelerated | Einstein Elevator |
| 3 | `lessons/03-geometry.html` | `lesson-3` | Free fall as geodesic; map/globe analogy | Worldline + Map-to-Globe |
| 4 | `lessons/04-field-equation.html` | `lesson-4` | Interpret \(G_{\mu\nu}\) vs \(T_{\mu\nu}\) | Field Equation explorer (conceptual) |
| 5 | `lessons/05-black-holes.html` | `lesson-5` | Horizon = causal boundary; Newton clue ≠ GR proof | Schwarzschild Scale + Brick Energy |
| 6 | `lessons/06-horizon-crossing.html` | `lesson-6` | Distant vs infalling accounts; tides; horizon ≠ singularity | Clock/Redshift + Dual Observer + Tidal |
| 7 | `lessons/07-evidence.html` | `lesson-7` | Independent observational channels | Orbit Inference + Light Bending |

**Lesson 1 vertical slice** followed `source/lesson1_vertical_slice.md` closely (required claims c001–c009 awareness, boards b01–b04, Mass Cancellation Lab contract, misconceptions, teach-back).

### 5.2 Interactive applications

| App | Module | Notes |
|-----|--------|--------|
| Mass Cancellation Lab | `src/apps/massCancellation.js` | Prediction gate, lock \(m_i=m_g\), hypothetical unlock, electric compare, assumptions, transfer Q |
| Einstein Elevator | `src/apps/labs.js` → `mountElevator` | Scenarios × experiments; locality callout |
| Map-to-Globe | `mountMapGlobe` | Great circle vs map-straight; analogy disclaimer |
| Worldline Lab | `mountWorldline` | Earth-fixed vs free-fall frame sketches |
| Field Equation Explorer | `mountFieldEquation` | **Labeled conceptual only** — not a GR solver |
| Schwarzschild Scale | `mountSchwarzschildScale` | Presets; Newtonian escape labeled as clue |
| Brick Energy Lab | `mountBrickEnergy` | Static factor + extractable fraction; assumptions panel |
| Clock/Redshift | `mountClockRedshift` | Static formula domain warning |
| Dual-Observer Crossing | `mountDualObserver` | Play/step; fading vs finite proper time messaging |
| Tidal Force | `mountTidal` | \(\Delta a \approx 2GML/r^3\); large BH weaker horizon tides |
| Orbit Inference | `mountOrbit` | \(M \approx 4\pi^2 a^3/(GT^2)\) |
| Light Bending | `mountLightBending` | Weak-field \(\alpha \approx 4GM/(bc^2)\) |

**Math helpers:** `src/utils/math.js` + constants in `src/utils/constants.js`  
**Unit tests:** `tests/unit/math.test.js` (Schwarzschild, redshift domain, extractable fraction, escape@\(r_s\), tides, deflection ~1.75″ solar limb scale, orbital mass invert, compactness).

### 5.3 Board reconstructions

**Data:** 18 records in `source/board_reconstructions.json` (b01–b18), with timestamps, clues, confidence, uncertainty.

**Rendered SVG teaching plates in UI today:** primarily **Lesson 1** plates in `src/apps/boardPlates.js`:

- `b01-fma`
- `b02-newton-gravity`
- `b03-coulomb-comparison`
- `b04-mass-equality-cancellation`

**Lessons 2–7:** argument covered mainly by **interactive labs** + prose; full separate SVG plate set for b05–b18 was **not** fully implemented as first-class board-plate components (gap for DoD polish). Registry still documents all 18 for future plate work.

Markdown notebook outline: `02_RECONSTRUCTED_BOARD_NOTEBOOK.md`.

### 5.4 Practice system

| Piece | Location |
|-------|----------|
| Per-lesson MCQs + feedback | Inside each lesson via `lessons.js` + `lessonPage.js` |
| Misconception clinic (15 entries) | `src/content/practice.js` → Practice page |
| Flashcards (12 core) | `practice.js` + `public/flashcards.csv` + `npm run export:flashcards` |
| Markdown exercise pack | `05_EXERCISES.md`, `06_ANSWER_KEY.md`, `07_FLASHCARDS.md`, `08_MISCONCEPTIONS.md` |

### 5.5 Reference materials

- Concept atlas (10 spreads) — Practice content module / Reference page  
- Equation cards (Schwarzschild, Einstein equation, static redshift, light deflection) — Reference  
- Compact glossary — Reference  
- Math companion Markdown — `04_GR_MATH_COMPANION.md`  
- Course outline Markdown — `03_ESSENCE_OF_GR_COURSE.md`  
- Source/board map pointer — `01_SOURCE_AND_BOARD_MAP.md`

### 5.6 Capstone

`review/capstone.html` — seven reconstruction questions covering the full causal chain; links to archive as optional continuation.

### 5.7 Einstein Archive (Appendices A–E)

Content module: `src/content/archive.js`  
Pages under `archive/`.

| Appendix | Page | Implemented |
|----------|------|-------------|
| A Ten-Year Ascent | `ten-year-ascent.html` | Timeline chapters 1905–later with evidence status + source classes |
| B Constellation | `constellation.html` | **Core profiles** (Besso, Grossmann, Hilbert, Schwarzschild, Eddington, Bohr, Born, Schrödinger, Heisenberg, Pauli, Curie, Gödel, Oppenheimer, Mileva Marić, Elsa, …) with relation tags and sources; **explicit note** that remaining plan-named figures need expansion without inventing friendship edges |
| C Quantum Salon | `quantum-salon.html` | Timeline, interpretation bullets (not “hated dice”), interactive Solvay 1927 **pedagogical seating sketch** |
| D Turing & Shannon | `turing-shannon.html` | Near-encounter / later recollection labels; **not friends** |
| E Nobel Dossier | `nobel-dossier.html` | Einstein prize path caveats, Curie two-prize distinction, ranking warning, committee simulation |

**Historical guardrails observed in copy:** no Turing friendship claim; Hilbert not reduced to theft; Mileva neither unsupported coauthor nor erased; Nobel counts ≠ rankings.

---

## 6. Scientific & product guardrails encoded

These appear in lesson callouts, lab assumptions, misconceptions, and archive text. Future edits must not regress them (plan §10):

1. Distinguish **inertial vs gravitational mass** before equality.  
2. Equivalence is **local**; tides limit global equivalence.  
3. Free fall is natural/inertial motion; standing on Earth is accelerated (GR reading).  
4. Graph curvature of a worldline ≠ automatic spacetime curvature.  
5. Rubber sheet is analogy only, not literal spacetime.  
6. \(T_{\mu\nu}\) is more than rest mass (energy, momentum, pressure, stress).  
7. Newtonian \(v_{\mathrm{esc}}=c\) is a **clue**, not GR proof of horizons.  
8. Horizon ≠ material shell; horizon ≠ singularity.  
9. Static redshift formulas **not** for free-fall horizon crossing.  
10. No permanently bright frozen infaller forever.  
11. Larger black holes → **weaker** tides near horizon scale.  
12. EHT is not a photo of a solid horizon surface.  
13. Einstein’s quantum stance is about completeness/locality/separability, not mere dislike of randomness.  

Field Equation and Dual-Observer UIs carry explicit **conceptual / schematic** disclaimers.

---

## 7. Tooling, scripts, tests

### 7.1 npm scripts

```bash
npm install
npm run dev              # Vite dev server
npm run build            # Static offline site → dist/
npm run preview          # Serve dist/
npm run validate:source  # Transcript registries
npm run validate:content # Required HTML pages + guardrail string checks
npm run export:flashcards # public/flashcards.csv from practice.js
npm run test:unit        # node:test math suite
```

### 7.2 Source pipeline order

```bash
node scripts/prepare_source.js
node scripts/build_source_maps.js
node scripts/validate_source.js
```

**Never** let these rewrite `transcript.txt`.

### 7.3 Vite multi-page build

`vite.config.js` recursively discovers all `*.html` entry points except `node_modules`, `dist`, `mcps`, `.git`.  
`base: './'` enables file-relative asset URLs for offline use after build.

### 7.4 Validation counts (last known good)

- Source: 744 fragments, 46 units, 55 claims, 18 boards, 0 errors  
- Content: 18 required HTML pages present  
- Unit tests: 10 tests / 8 suites, all pass  
- Production build: succeeds (KaTeX fonts + single main JS/CSS bundle)

---

## 8. localStorage schema

Keys in `src/utils/constants.js` → `STORAGE_KEYS`:

| Key | Purpose |
|-----|---------|
| `gr-course-progress-v1` | Lesson status, last location, mastery placeholders |
| `gr-course-prefs-v1` | reducedMotion, plainArchive, fontScale |
| `gr-course-predictions-v1` | Saved lab/lesson predictions (e.g. Mass Cancellation) |

Degrades if storage unavailable (reads return defaults; writes fail soft).

---

## 9. What is NOT complete (honest DoD gap list)

Plan §13 “Complete means…” and Phases 2–10. Use this as the **work queue** for future agents.

| Gap | Detail | Suggested next work |
|-----|--------|---------------------|
| **Full plan DoD not closed** | Owner paused before “Finish Plan DoD” execution finished | Treat this table as backlog |
| Board SVG plates b05–b18 | Registry exists; UI plates mostly L1 | Add plates to `boardPlates.js`; embed in lessons 2–7 + Visual Lab |
| Spacetime diagram workbook | Plan §7.2 (10 progressive exercises) not a dedicated interactive workbook page | New `practice/spacetime-workbook.html` or Reference section |
| Archive full constellation | Plan names many more figures with network filters/time slider | Expand `people[]`; optional relationship graph UI; primary citations |
| Historical research dossier depth | Phase 2 gate: every core profile with archival-grade sources | CPAE / Nobel / IAS primary refs; image-rights ledger |
| Observational number currency | Sgr A* mass etc. are illustrative | Re-cite current literature before publication |
| Formal a11y audit | Keyboard/focus/reduced-motion partly implemented; no WCAG checklist sign-off | Manual + tooling audit; fix sticky scroll-margin edge cases |
| Print CSS | Not a dedicated print stylesheet pass | `print.css` for lessons/reference |
| Phase 10 PDF companion | Not generated | Build print HTML → PDF or markdown→PDF pipeline |
| Phase 10 PPTX deck | Not generated | Teaching deck from lesson outlines |
| Richer Anki | CSV exists (12 cards); plan wants relationship-heavy cards | Expand `flashcards` array + export |
| Video still board verification | Deferred | Compare stills to b01–b18; upgrade confidence/layout notes |
| Content reuse IDs | Plan’s full canonical record schema not fully centralized | Unify content IDs across JSON source maps and `lessons.js` |
| Service worker / PWA | Explicitly optional; not implemented | Only if offline UX needs installability |
| Automated E2E browser tests | None | Playwright/Puppeteer smoke for critical paths |

**Paused work note:** A “Finish Plan DoD” session was requested, then **paused by the user** before remaining gaps above were closed. Do not invent that those items shipped.

---

## 10. Architectural decisions (do not casually reverse)

1. **Canonical interactive product = static HTML app**, not four independently authored formats.  
2. **Vanilla JS + Vite**, not React (plan default unless a concrete need appears).  
3. **Provenance is first-class UI**, not footnotes-only.  
4. **Boards are reconstructions** with confidence; never “facsimile of Brown’s board.”  
5. **`transcript.txt` is sacred.**  
6. **Simulations must state assumptions**; conceptual explorers must not pose as numerical GR solvers.  
7. **History requires evidence status**; fame ≠ friendship edge weight.  
8. **Lesson rail uses ordinary links**, not ARIA tabs that hide multi-page addresses.  
9. Content lives in **JS modules** for the app; **JSON in `source/`** for transcript-derived evidence; Markdown companions for print/outline. Prefer extending modules rather than duplicating prose in HTML.

---

## 11. How a future agent should extend safely

### 11.1 Adding or editing a lesson section

1. Edit `src/content/lessons.js` for that `lesson-id`.  
2. If lecture-derived, cross-check `source/argument_units.json` + `claims.json` timestamps.  
3. Tag provenance correctly.  
4. If new app: add mounter in `labs.js`, register in `lessonPage.js` `APP_MOUNT`, add Visual Lab mount in `main.js`.  
5. Run `npm run test:unit` if formulas change; `npm run build` before claiming done.

### 11.2 Adding a board plate

1. Prefer extending registry first (`board_reconstructions.json`) if new evidence.  
2. Add SVG factory + metadata in `src/apps/boardPlates.js`.  
3. Reference plate id from lesson section `boards: [...]`.  
4. Show confidence + uncertainty + non-facsimile language.

### 11.3 Touching history

1. Never invent meetings, quotations, or friendships.  
2. Every anecdote needs `anecdoteStatus` / provenance badge.  
3. Prefer CPAE, Nobel archives, IAS, peer-reviewed history (plan §3.6 order).

### 11.4 Changing math

1. Implement in `src/utils/math.js`.  
2. Add/adjust `tests/unit/math.test.js`.  
3. Surface domain limits in the lab UI (especially \(r > r_s\)).

### 11.5 Definition of Done completion path (recommended order)

When resuming “finish plan DoD”:

1. Board plates b05–b18 + Visual Lab parity  
2. Spacetime workbook page  
3. Archive expansion + citation hardening  
4. Print CSS + PDF pipeline  
5. PPTX outline or deck  
6. Expand flashcards / Anki  
7. Formal scientific + a11y review checklist written to `ai/08_dod_verification.md`  
8. Full smoke matrix (all lessons, all apps, archive, phone + keyboard)

---

## 12. Key file index for agents

| Need | Open first |
|------|------------|
| Product requirements | `GR_LEARNING_MATERIALS_PLAN.md` |
| What shipped vs not | **This file** |
| Run / scripts | `README.md`, `package.json` |
| Lesson prose | `src/content/lessons.js` |
| Labs | `src/apps/massCancellation.js`, `src/apps/labs.js` |
| Boards UI | `src/apps/boardPlates.js` |
| Shell / nav | `src/components/shell.js` |
| Lesson renderer | `src/components/lessonPage.js` |
| Page entry router | `src/main.js` |
| Archive prose | `src/content/archive.js` |
| Practice bank | `src/content/practice.js` |
| Transcript evidence | `source/*` |
| Lesson 1 brief | `source/lesson1_vertical_slice.md` |
| Formula tests | `tests/unit/math.test.js` |
| Prior agent notes | `ai/05_implementation_notes.md`, `ai/06_verification.md`, `ai/07_handoff.md` |

---

## 13. User decisions that constrained v1

Recorded during implementation conversations:

1. Tech stack: **plan default** (Vite, vanilla JS, KaTeX, offline static).  
2. Archive depth preference stated as **Full Appendix A–E** — delivered as **structured A–E with core profiles and evidence labels**, not every plan-named figure at archival monograph depth.  
3. Lesson 1 smoke test: **no bugs**.  
4. Additional lessons smoke-tested: **passed**.  
5. User then requested **Finish Plan DoD**, then **paused** and requested this documentation instead.

---

## 14. Definition of Done scorecard (snapshot)

| Criterion (plan §13, compressed) | v1 status |
|----------------------------------|-----------|
| Seven lessons implemented | **Yes** |
| Central transcript claims timestamped (source layer) | **Yes** |
| Core board reconstructions confidence-labeled (registry) | **Yes** |
| Board teaching redraws for all core plates in UI | **Partial** (L1 strong) |
| Essential interactive apps correct & qualified | **Yes** (v1; assumptions present) |
| Exercises, feedback, flashcards, misconception clinic | **Yes** |
| Spacetime workbook | **Missing as dedicated feature** |
| Concept atlas + math companion | **Yes** |
| Five archive appendices | **Yes (core depth)** |
| Quantum + Turing/Shannon evidence levels | **Yes (guardrailed)** |
| Nobel/Curie comparison careful | **Yes** |
| Mobile/desktop/keyboard/reduced-motion/print verified | **Partial** (owner smoke tests; no formal matrix; print weak) |
| Offline production build | **Yes** |
| Scientific/historical/content/a11y formal reviews | **Not fully signed off** |
| PDF/PPTX derived artifacts | **No** |
| Learner full capstone capability | **Supported by materials; not formally assessed** |

---

## 15. Changelog of major implementation batches

1. **Source foundation** — normalize transcript, registries, validation, Lesson 1 brief (`source/`, `scripts/`, `ai/00`–`06`).  
2. **HTML course v1** — Vite app, design system, 7 lessons, 12 labs, practice/reference/capstone, archive A–E, Markdown 01–08, unit tests, build (`src/`, pages, `tests/`, companions).  
3. **Human smoke tests** — L1 + additional lessons; no bugs reported on tested paths.  
4. **This document** — freeze state for future agents after pause on full DoD push.

---

## 16. Contact points for contradictions

If documents disagree, resolve in this order:

1. **Scientific / historical truth + plan guardrails** over convenience.  
2. **`transcript.txt` + `source/` registries** over lesson prose if a lecture claim is at stake.  
3. **`GR_LEARNING_MATERIALS_PLAN.md`** for product intent.  
4. **This file** for what actually exists in the repo.  
5. **`README.md` / `ai/*`** for shorter summaries (may lag).

When you change the system substantially, **update this file** (or add a dated addendum section) so the next agent does not re-discover the codebase from zero.

---

*End of implementation reference. Current Seminar Folio edition rebuilt and validated 2026-07-12.*
