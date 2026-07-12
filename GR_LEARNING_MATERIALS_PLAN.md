# General Relativity Learning Experience — Detailed Implementation Plan

## Goal

Build a concept-first, lightly mathematical course whose spine is Adam Brown's lecture transcript. The course should let a learner explain *why* Einstein replaced gravity as a force with curved spacetime, understand the essential physics of black holes, and connect the theory to observations.

The materials will distinguish three kinds of content throughout:

- **Transcript-grounded:** directly stated or derived in the lecture, with timestamp.
- **Board reconstruction:** the most likely equation, graph, or diagram Brown was using, inferred from his words and standard presentations of the same argument.
- **GR supplement:** background supplied from established general-relativity knowledge to make the lecture understandable or close a conceptual gap.

Nothing inferred will be presented as an exact transcription of the missing board.

## What the transcript supports

The local transcript is about 17,000 words and has eight timestamped chapters. Its main conceptual chain is unusually coherent:

1. Special relativity and the speed-of-light constraint.
2. Newton's second law and Newtonian gravity.
3. The equality of inertial and gravitational mass.
4. Inertial forces and Einstein's “happiest thought.”
5. Free fall as straight motion in curved spacetime.
6. Einstein's field equation: matter/energy and curvature.
7. Black-hole horizons, energy extraction, redshift, and time dilation.
8. Falling through a horizon, tidal forces, and observational evidence.

The final discussion about whether AI could rediscover GR is valuable philosophy of science, but it will be an optional epilogue rather than part of the physics sequence.

## Phase 1: Build a source and board map

First, clean the transcript's encoding artifacts without altering its content. Then divide it into short argument units, not merely the eight large YouTube chapters.

For every unit, record:

- timestamp range;
- question being answered;
- main claim;
- analogy or thought experiment;
- spoken equation;
- missing visual cues such as “this line,” “sitting here,” or “on the board”;
- prerequisite idea;
- likely misconception;
- confidence of any board reconstruction.

The board reconstruction will use three confidence levels:

- **High:** Brown verbally names every term or describes the geometry explicitly.
- **Medium:** the visual is not fully described, but a standard diagram uniquely fits the argument.
- **Low:** several plausible drawings could fit; these will be shown as teaching reconstructions, not claims about the original board.

Expected artifact: `01_SOURCE_AND_BOARD_MAP.md`.

## Phase 2: Reconstruct the missing board as a visual notebook

Create a sequence of simple “board plates.” Each plate will contain:

1. a clean redrawn diagram or equation;
2. the timestamp and transcript clues behind it;
3. a plain-language reading of every symbol or line;
4. the role it plays in the argument;
5. the reconstruction confidence;
6. any difference between the likely original board and the pedagogically improved version.

The transcript already strongly suggests at least these plates:

1. `F = ma`: inertial mass as resistance to acceleration.
2. Newtonian gravity beside Coulomb's law: similar inverse-square form, different “charge.”
3. Cancellation of the falling object's mass: universal free fall.
4. Centrifugal force as an inertial-force analogy.
5. A spacetime diagram comparing held chalk with freely falling chalk.
6. San Francisco-to-London on a flat map versus a great-circle route on a globe.
7. A geodesic: apparently curved on a flat representation, straight in the actual curved geometry.
8. Einstein's field equation, likely `G_{μν} = (8πG/c⁴)T_{μν}`, interpreted rather than derived.
9. Escape velocity and the Schwarzschild radius `r_s = 2GM/c²`.
10. The brick-and-pulley black-hole energy-extraction experiment.
11. Gravitational redshift/time dilation, including the Schwarzschild factor `sqrt(1 - 2GM/(rc²))` where supported by the later discussion.
12. Distant-observer and infalling-observer views of horizon crossing.
13. Evidence diagrams: stellar orbits around Sagittarius A*, a gravitational-wave signal, and light bending near the Sun.

Expected artifacts: `02_RECONSTRUCTED_BOARD_NOTEBOOK.md` plus a `board_figures/` directory.

## Phase 3: Write the concept-first course

The main course will have seven lessons. Each lesson begins with Brown's question and follows his reasoning before adding outside explanation.

### Lesson 1 — The puzzle Einstein took seriously

- What special relativity changed.
- `F = ma` and the meaning of inertial mass.
- Newtonian gravity and gravitational mass.
- Why equality of the two masses is a clue rather than a boring cancellation.

Target insight: all bodies fall alike because gravity couples universally.

### Lesson 2 — Einstein's happiest thought

- Real forces versus inertial/fictitious forces.
- Rotation and the centrifugal-force analogy.
- The elevator/free-fall thought experiment, added as context where the transcript assumes it.
- The equivalence principle, stated carefully and without overclaiming.

Target insight: locally, free fall removes gravity; standing still on Earth is the accelerated state.

### Lesson 3 — Gravity becomes geometry

- Worldlines and spacetime diagrams.
- Why freely falling motion is the “straight” motion.
- Flat maps, globes, great circles, and geodesics.
- Curvature without embedding spacetime into a higher-dimensional rubber sheet.

Target insight: gravity does not deflect a body away from natural motion; matter changes what natural straight motion is.

### Lesson 4 — The field equation without tensor calculus

- What lives on the geometry side and matter side.
- Why energy, momentum, pressure, and stress all gravitate.
- “Matter tells spacetime how to curve; curved spacetime tells matter how to move.”
- What the equation does *not* mean.

Target insight: the Einstein equation is a feedback law between matter/energy and spacetime geometry.

### Lesson 5 — Why a black hole must be black

- Newtonian escape velocity as a clue, not the full explanation.
- The Schwarzschild radius.
- The brick-and-pulley thought experiment.
- Why permitting signals or objects to escape from inside the horizon would enable an energy-accounting contradiction in Brown's argument.

Target insight: the horizon is a causal boundary, not a material surface with an unusually strong pulling force.

### Lesson 6 — Clocks, energy, and horizon crossing

- Gravitational redshift and time dilation.
- Energy measured locally versus by an observer far away.
- Why the distant observer sees fading and freezing.
- Why the infalling observer crosses normally.
- Tidal forces, black-hole size, spaghettification, and the singularity.

Target insight: the two observer stories differ but do not contradict each other.

### Lesson 7 — How nature answers back

- Stellar orbits around Sagittarius A*.
- Gravitational waves from mergers.
- Event Horizon Telescope observations.
- Deflection of starlight and the 1919 eclipse.
- Prediction, retrodiction, and what counts as evidence.

Target insight: GR is not admired only for elegance; it survives very different empirical tests.

Optional epilogue: Brown and Dwarkesh on whether AI could reconstruct GR from principles without the historical experimental clues.

Expected artifact: `03_ESSENCE_OF_GR_COURSE.md`.

## Phase 4: Add a three-rung mathematics ladder

The core should remain accessible, but conceptual understanding becomes firmer when a small amount of mathematics is used deliberately.

- **Rung A — Words and pictures:** sufficient for the main narrative.
- **Rung B — Algebra:** `F = ma`, inverse-square gravity, escape velocity, `E = mc²`, Schwarzschild radius, energy fractions, and redshift factors.
- **Rung C — Optional theory windows:** four-vectors, metrics, proper time, geodesics, curvature, stress-energy, and the structure—but not a full derivation—of Einstein's equation.

Every equation will be introduced by a physical question, interpreted term by term, checked for units or limits where useful, and followed by a worked example. Tensor calculus will not be required to complete the course.

Expected artifact: `04_GR_MATH_COMPANION.md`.

## Phase 5: Build active-learning materials

Passive reading is not enough. Each lesson will include:

- two prediction questions before the explanation;
- a short “draw it yourself” board exercise;
- one thought experiment;
- three conceptual checks;
- one algebra problem when appropriate;
- one misconception diagnosis;
- a teach-back prompt requiring the learner to explain the causal chain in their own words.

There will also be:

- spaced-repetition cards for terms and relationships;
- a misconception sheet (for example, “objects fall because spacetime is like a rubber sheet” or “the infaller sees the universe's entire future”);
- a cumulative concept map;
- answer keys with reasoning, not merely answers.

Expected artifacts: `05_EXERCISES.md`, `06_ANSWER_KEY.md`, `07_FLASHCARDS.md`, and `08_MISCONCEPTIONS.md`.

## Phase 6: Use the materials as a guided tutorial

We can then work through one lesson at a time in conversation. A typical session would be:

1. a two-minute recall check;
2. one Brown thought experiment;
3. a reconstructed board figure;
4. Socratic questions before explanation;
5. the optional algebra rung;
6. a short teach-back;
7. a mastery check determining whether to continue or revisit the concept.

The course should be adaptive: if the learner understands the equivalence principle but not spacetime diagrams, we spend time on worldlines and proper time rather than replaying the whole lecture.

## Quality controls

Before calling the package complete, verify that:

- every central transcript claim has a timestamp;
- every missing-board inference has a confidence label;
- every added fact is visibly marked as a GR supplement;
- no rubber-sheet analogy silently substitutes for intrinsic curvature;
- Newtonian clues are not presented as proofs of relativistic results;
- local and distant measurements around a black hole are kept distinct;
- the event horizon is distinguished from the singularity;
- every lesson ends with a check of transferable understanding;
- the final learner can reconstruct the full argument from mass equality to curved spacetime without memorizing slogans.

## Recommended order of production

1. Source and board map.
2. Reconstructed board notebook.
3. Seven-lesson course.
4. Mathematics companion.
5. Exercises, answers, flashcards, and misconception guide.
6. Final cross-check against the transcript.
7. Begin the interactive tutorial with Lesson 1.

If still frames or the original video later become available, compare them against the reconstructed board notebook and revise the figures. The course does not depend on that recovery, but exact frames would turn uncertain reconstructions into verified ones.

---

# Part II — Implementation Specification

## 1. Status and execution rule

This document is the implementation specification. It is intentionally explicit so that a less powerful implementation model can execute it without inventing major scientific, editorial, product, or design decisions.

This is still a plan. Do not create website code, diagrams, applications, historical prose, PDF, PPTX, or video until the user separately authorizes implementation.

When implementation is authorized, work through the phase gates in Section 12. Do not attempt the entire project in one pass.

## 2. Fixed product decisions

### 2.1 Canonical deliverable

The canonical deliverable is an **interactive, offline-capable HTML learning experience**. It combines the transcript-grounded course, reconstructed board, interactive scientific mini-applications, active practice, reference materials, and Einstein historical appendices.

### 2.2 Derived deliverables

Create these only after the HTML course is complete and validated:

1. printable PDF companion;
2. PPTX teaching deck;
3. CSV flashcard export suitable for Anki;
4. optional short narrated videos.

Do not independently author four versions. Reuse one canonical content set, diagram library, equation library, question bank, and citation registry.

### 2.3 Deferred features

Do not include in the first release:

- accounts, login, cloud progress, or a backend;
- embedded generative-AI tutor;
- multiplayer features;
- advanced numerical-relativity solvers;
- full tensor-calculus graduate course;
- decorative 3D simulations without a clear learning purpose;
- full video course before learner testing;
- unverified exact reproductions of Brown's board.

### 2.4 Audience

Assume an intellectually curious adult with high-school algebra, little or no calculus, and no formal GR training. Optional theory windows may introduce metrics, proper time, geodesics, curvature, four-vectors, and tensors, but these must never block the conceptual path.

## 3. Source and epistemic contract

### 3.1 Scientific content classes

Every scientific claim must be internally tagged as exactly one of:

- `transcript`: directly stated, demonstrated, or verbally derived in Brown's lecture;
- `board-reconstruction`: inferred missing equation, drawing, or board sequence;
- `gr-supplement`: established GR background added for coherence.

### 3.2 Historical content classes

Every historical claim or anecdote must be tagged as one of:

- `primary-history`;
- `secondary-history`;
- `first-person-recollection`;
- `secondhand-recollection`;
- `disputed`;
- `likely-apocryphal`;
- `dramatic-reconstruction`.

### 3.3 Learner-visible provenance

Use compact badges that open a source drawer:

- From the lecture;
- Board reconstructed;
- GR supplement;
- Documented;
- Recollected;
- Disputed;
- Dramatization.

The drawer contains timestamps, source citations, reconstruction clues, and confidence. Do not clutter every paragraph with full notes, but never hide the provenance mechanism.

### 3.4 Board confidence

Use:

- `high`: Brown names all important terms or describes the arrangement;
- `medium`: a standard diagram strongly fits, but the original arrangement is unknown;
- `low`: multiple visuals could fit; show only as a teaching reconstruction.

Never call an inferred board a facsimile.

### 3.5 Source preservation

- Keep `transcript.txt` unchanged.
- During implementation, create a normalized UTF-8 working copy.
- Repair mojibake only in the working copy.
- Preserve wording and timestamps.
- If Brown needs qualification, retain his claim and add a visible GR supplement.

### 3.6 Historical source priority

Use, in order:

1. Einstein Papers Project and *Collected Papers of Albert Einstein*;
2. Nobel Prize official archives;
3. Institute for Advanced Study archives;
4. American Institute of Physics history collections;
5. university, museum, and national archives;
6. peer-reviewed history and established scholarly biographies;
7. reputable popular history for orientation only.

Never use unsourced quote collections as evidence. Record image rights and attribution for every archival asset.

## 4. Information architecture

### 4.1 Primary navigation

Expose six destinations:

1. **Start** — orientation, diagnostic, course map, progress;
2. **Lessons** — seven-lesson sequence;
3. **Visual Lab** — reconstructed board and interactive applications;
4. **Practice** — workbook, problems, flashcards, misconception clinic;
5. **Reference** — concept atlas, mathematics, glossary, evidence dossier;
6. **Einstein Archive** — historical rare-book appendices.

### 4.2 Home page requirements

- one-sentence course promise;
- visual chain from mass equality to curved spacetime;
- Begin Lesson 1 action;
- optional five-minute diagnostic;
- seven-lesson map;
- provenance legend;
- locally stored progress summary;
- accessibility and reduced-motion controls;
- Brown/Dwarkesh source attribution.

### 4.3 Reusable lesson template

Every lesson follows this order:

1. Brown's question with timestamp;
2. learner prediction;
3. short conceptual explanation;
4. likely board state and clean redraw;
5. interactive exploration when appropriate;
6. three-rung mathematics panel;
7. misconception checkpoint;
8. draw-it-yourself task;
9. three to five practice questions;
10. teach-back prompt;
11. mastery check;
12. sources and provenance.

### 4.4 Progressive disclosure

The default view is conceptual. Put full derivations, tensor discussion, detailed archival notes, extra numerical examples, and technical caveats that interrupt flow behind learner-controlled expansion. Never hide simulation assumptions or misconception warnings.

### 4.5 Navigation model

Use three coordinated navigation layers:

1. global destination navigation;
2. a sticky horizontal lesson rail;
3. contextual previous/index/next navigation.

The horizontal lesson controls must be ordinary links styled as tabs, not an ARIA tab widget that swaps hidden panels. Each lesson has its own address so browser Back/Forward, bookmarking, copying a link, opening a lesson in a new tab, and deep linking work normally.

### 4.6 Global header

The first header row appears on every course page and contains:

- compact course mark/title linked to the main index;
- Lessons;
- Visual Lab;
- Practice;
- Reference;
- Einstein Archive;
- progress/resume control;
- accessibility/settings control.

The header may become compact after scrolling but must never obscure content. On narrow screens, secondary global destinations may move into an accessible menu; the course-title/index link and lesson rail remain directly available.

### 4.7 Sticky horizontal lesson rail

Place the lesson rail directly below the global header and keep it visible near the top while reading.

Required order and short labels:

```text
Index | 1 Coincidence | 2 Happiest Thought | 3 Geometry |
4 Field Equation | 5 Black Holes | 6 Horizon Crossing | 7 Evidence
```

Each lesson link displays:

- lesson number;
- short label;
- completion state;
- current state when active.

State design:

- not started: neutral;
- in progress: partial progress mark;
- completed: check mark plus accessible text;
- current: strong underline/background and `aria-current=page`;
- locked: never use locking in the default course; learners may visit any lesson.

Desktop behavior:

- show the full rail when space permits;
- keep labels concise;
- never wrap the rail into two rows;
- use subtle edge fades only when overflow exists.

Mobile behavior:

- horizontal scrolling with scroll snap;
- active lesson automatically centered on page load;
- visible left/right scroll buttons when adjacent lessons are off-screen;
- preserve native touch scrolling;
- do not hide lessons inside a dropdown as the only navigation method;
- use at least 44 px touch targets.

The rail is navigation, not lesson content. It must remain visually quieter than the lesson title.

### 4.8 Breadcrumb and page identity

Below the lesson rail, show a compact breadcrumb:

```text
Course Index / Lesson 3 / Gravity Becomes Geometry
```

Then show the full lesson title, target insight, estimated study time, and progress within the current lesson.

Breadcrumb rules:

- every segment except the current page is a link;
- use visible text rather than icon-only crumbs;
- preserve the hierarchy for Visual Lab, Practice, Reference, and Archive pages;
- do not duplicate the entire global navigation in the breadcrumb.

### 4.9 Previous, index, and next controls

Place a three-part navigation block at both the end of every lesson and, in compact form, near the start after the lesson introduction.

Desktop layout:

```text
← Previous                     Course Index                     Next →
Lesson 2: Happiest Thought                                   Lesson 4: Field Equation
```

Mobile layout stacks in this order:

1. Next lesson as the primary action;
2. Previous lesson;
3. Course Index.

Rules:

- include lesson number and title, not only “Previous” or “Next”;
- Lesson 1 previous points to Course Index;
- Lesson 7 next points to the Capstone Review, not directly into historical appendices;
- the Capstone Review links to recommended archive appendices as optional continuation;
- never create circular previous/next behavior;
- preserve completed state before following Next;
- keyboard focus moves predictably after navigation.

### 4.10 Course Index page

The Course Index is the navigation hub and must be reachable from every page through the course title, lesson rail, breadcrumb, and previous/index/next block.

Required content:

- Resume Course action showing the last meaningful location;
- complete seven-lesson roadmap;
- progress summary;
- target insight for each lesson;
- estimated study time;
- required or recommended prerequisite concepts;
- applications and diagrams included in each lesson;
- practice status;
- direct links to Visual Lab, Practice, Reference, and Einstein Archive;
- explanation of the recommended path and permission to navigate nonlinearly;
- Capstone Review entry.

Each lesson card uses one clear primary link. Do not fill the card with competing small links; put diagrams, applications, and practice in a secondary details area.

### 4.11 Meaningful cross-link types

Use cross-links only when they serve one of these roles:

- **Prerequisite:** “Review inertial mass from Lesson 1.”
- **Forward connection:** “This distinction becomes essential at the horizon in Lesson 6.”
- **Concept definition:** link to a glossary or equation card.
- **Representation:** link to the relevant board plate or interactive application.
- **Practice:** link to exercises testing the current concept.
- **Misconception:** link to the relevant misconception-clinic entry.
- **Evidence:** link a theoretical prediction to Lesson 7's observations.
- **Historical context:** link to the exact Einstein Archive passage.
- **Source:** open transcript timestamp/provenance, preferably in a drawer rather than navigating away.

Every cross-link must have descriptive text. Do not use “click here.”

### 4.12 Cross-link presentation

Use three visual forms:

1. inline text links for definitions and short conceptual references;
2. compact related-item chips for diagram, application, equation, practice, or misconception;
3. end-of-section “Connections” cards for substantial backward/forward/historical relationships.

Limit a normal section to one Connections card containing at most four high-value links. Avoid link soup.

Each substantial destination should provide a return path:

- an application opened from a lesson shows “Return to Lesson N”;
- a board plate shows its source lesson and related application;
- a practice item links back to the explanation after feedback;
- an archive entry links back to the scientific concept it illuminates;
- a glossary/equation overlay closes back to the same reading position.

If the learner arrived from a specific lesson, prefer returning to that lesson and section. Otherwise return to the destination's parent index.

### 4.13 Deep links and reading-position behavior

Assign stable fragment identifiers to:

- lesson sections;
- board plates;
- equation cards;
- applications;
- misconception entries;
- historical profiles;
- archive inserts.

Cross-links should target the exact relevant section, not merely the top of a long page.

Behavior requirements:

- browser Back restores the previous reading position where supported;
- opening a provenance drawer must not destroy the page position;
- application state may be encoded only when useful and safe; do not create unreadable URLs;
- copied links must open to the same conceptual section;
- changing lessons resets focus to the lesson heading, not the top browser chrome;
- a visible “Back to top of lesson” control may appear after substantial scrolling, but it is not a substitute for the lesson rail.

### 4.14 Archive navigation

The Einstein Archive has its own secondary rail:

```text
Archive Index | Ten-Year Ascent | Constellation | Quantum Salon |
Turing & Shannon | Nobel Dossier
```

Archive previous/next controls stay within the archive sequence. Scientific cross-links return to lessons without changing the course's pedagogical next/previous sequence.

### 4.15 Navigation accessibility and acceptance criteria

Required:

- a skip link to main content;
- semantic `<nav>` landmarks with distinct accessible labels;
- ordinary anchors for lesson links;
- `aria-current=page` on the active destination;
- visible focus states;
- no keyboard trap in horizontal rails;
- arrow buttons scroll the rail but do not steal normal Tab order;
- touch targets at least 44 by 44 px;
- completion is not communicated by color alone;
- sticky elements do not cover anchored headings;
- headings use scroll margin equal to the combined sticky-header height.

Navigation is accepted only when a tester can, using keyboard alone:

1. reach the course index;
2. move from Lesson 2 to Lesson 5 through the rail;
3. follow a cross-link to an application;
4. return to the originating lesson section;
5. use Previous and Next;
6. identify current and completed lessons;
7. operate the same flow at phone width without hidden destinations.

### 4.16 Stable page addresses

Prefer a static multi-page address scheme so pages remain bookmarkable and understandable:

```text
index.html
lessons/01-coincidence.html
lessons/02-happiest-thought.html
lessons/03-geometry.html
lessons/04-field-equation.html
lessons/05-black-holes.html
lessons/06-horizon-crossing.html
lessons/07-evidence.html
review/capstone.html
visual-lab/index.html
practice/index.html
reference/index.html
archive/index.html
archive/ten-year-ascent.html
archive/constellation.html
archive/quantum-salon.html
archive/turing-shannon.html
archive/nobel-dossier.html
```

Applications may be embedded in lessons and also exposed in the Visual Lab using the same underlying component and data. Do not maintain duplicate implementations.

Use lowercase, hyphenated, stable filenames. Once published, do not rename a page without adding a redirect or compatibility link. For local/offline builds, all navigation uses relative links. Fragment identifiers provide section-level deep links.

## 5. Curriculum-to-feature matrix

| Lesson | Core insight | Required diagrams | Required application |
|---|---|---|---|
| 1. The coincidence | Equal inertial and gravitational mass makes free fall universal | `F=m_i a`, gravity, Coulomb comparison, cancellation | Mass Cancellation Lab |
| 2. Happiest thought | Gravity can be removed locally in free fall; equivalence is local | rotating frame, elevator, local inertial frame, tidal limitation | Einstein Elevator |
| 3. Gravity becomes geometry | Free fall follows geodesics; coordinate appearance is not intrinsic geometry | chalk worldlines, flat map, globe, geodesic | Map-to-Globe Explorer; Worldline Lab |
| 4. Field equation | Stress-energy and geometry are locally related | labeled Einstein field equation | Field Equation Relationship Explorer |
| 5. Why black holes are black | Horizon is a causal boundary; Newtonian escape speed is only a clue | escape speed, Schwarzschild radius, pulley setup | Schwarzschild Scale; Brick Energy Lab |
| 6. Clocks and crossing | Distant and infalling accounts differ without contradiction | redshift, paired perspectives, tidal gradient | Clock/Redshift; Dual Observer; Tidal Force |
| 7. Nature answers | Independent observations constrain the black-hole interpretation | stellar orbits, waveform, EHT, light bending | Orbit Inference; Light Bending |

### 5.1 Lesson 1 acceptance statement

The learner can explain why different test masses share a gravitational acceleration and why that equality is conceptually unusual compared with electric charge.

### 5.2 Lesson 2 acceptance statement

The learner can distinguish weight, gravity, acceleration, and free fall, and can state why equivalence is local rather than global.

### 5.3 Lesson 3 acceptance statement

The learner can explain how a path that looks curved in coordinates can be the straightest available path in the actual geometry.

### 5.4 Lesson 4 acceptance statement

The learner can interpret the two sides of `G_μν = (8πG/c⁴)T_μν` without claiming to solve arbitrary spacetimes.

### 5.5 Lesson 5 acceptance statement

The learner can distinguish the Newtonian dark-star clue from the GR causal meaning of an event horizon.

### 5.6 Lesson 6 acceptance statement

The learner can reconcile delayed, redshifted distant signals with finite proper-time horizon crossing, and distinguish horizon from singularity.

### 5.7 Lesson 7 acceptance statement

The learner can state what stellar orbits, gravitational waves, EHT observations, and light bending each establish and do not establish.

## 6. Interactive application contract

### 6.1 Pattern required for every substantial application

Each application contains:

1. prediction before controls activate;
2. one to three meaningful controls;
3. linked visual and numerical representations;
4. concise observation panel;
5. “Why?” explanation;
6. assumptions and limitations;
7. transfer question;
8. reset;
9. keyboard operation;
10. reduced-motion behavior;
11. static fallback.

Moving a slider is not itself an achievement and must not earn points.

### 6.2 Mass Cancellation Lab

Controls: inertial mass, gravitational mass, source mass, and a hypothetical toggle allowing `m_g/m_i` to differ.

Show force and acceleration together. With equal masses, acceleration is independent of test-object mass. Compare with electric charge-to-mass ratio. Do not imply equality follows from Newtonian mechanics; it is an empirical fact promoted into a principle.

### 6.3 Einstein Elevator

Scenarios: accelerating rocket, elevator stationary on Earth, freely falling elevator near Earth, inertial cabin far away.

Experiments: release masses, stand on scale, send a light pulse, enlarge the laboratory to reveal tides. Explicitly state that equivalence is local.

### 6.4 Map-to-Globe Geodesic Explorer

Controls: draggable endpoints, projection toggle, globe rotation, flat-map straight line versus great circle. Display route lengths and both representations simultaneously. Do not claim Earth's surface is literally four-dimensional spacetime.

### 6.5 Free-Fall Worldline Lab

Objects: held body, freely falling body, thrown body, accelerating observer, light pulses. Compare Earth-fixed and local free-fall coordinates. State explicitly that graphical curvature of a worldline does not itself prove spacetime curvature.

### 6.6 Field Equation Relationship Explorer

Allow qualitative changes to idealized energy density, pressure/stress, and distribution. Show semantic relationships and geodesic response only. Label prominently: “Conceptual explorer, not a numerical GR solver.” Do not display a dented grid as though it were an exact solution.

### 6.7 Schwarzschild Scale Explorer

Use presets for Earth, Sun, stellar black hole, Sagittarius A*, and a much larger black hole. Calculate `r_s=2GM/c²` and compactness `r_s/r`. Use a logarithmic scale. Escape velocity is labeled Newtonian and used only where meaningful.

### 6.8 Brick-and-Pulley Energy Lab

Controls: brick mass, black-hole mass, lowering radius restricted to `r>r_s`, Newtonian versus relativistic display.

Use:

- Newtonian approximation `GM/(rc²)`;
- static redshift factor `sqrt(1-r_s/r)`;
- idealized extractable fraction `1-sqrt(1-r_s/r)`.

Always display assumptions: quasi-static lowering, negligible rope mass/strength limits, negligible backreaction, nonrotating uncharged black hole, classical treatment, and no lowering through the horizon.

### 6.9 Gravitational Clock and Redshift Lab

Controls: emitter radius outside `r_s`, receiver position, black-hole mass, pulse rate. Show local clocks, received pulse spacing, frequency, wavelength, and energy ratio. State that the static-clock formula does not describe a freely falling observer at the horizon.

### 6.10 Dual-Observer Horizon Crossing

Three synchronized panels: distant received signals, causal/spacetime diagram, infaller proper-time experience. Provide play, pause, step, emit-pulse, and coordinate/proper-time labels.

Required behavior: signals arrive later and redder; the infaller crosses in finite proper time; no permanently bright frozen body remains visible; the horizon is not a solid surface.

### 6.11 Tidal-Force Scale Explorer

Controls: black-hole mass, body height, radial position. Use the labeled approximation `Δa≈2GML/r³`. Compare stellar and supermassive horizons. Avoid pretending a comfort/danger threshold is exact.

### 6.12 Hidden Mass Orbit Inference

Controls: orbital size, period, and uncertainty. For the simplified case use `M≈4π²a³/(GT²)`. Show inferred mass and compactness constraints. Explain why orbital evidence alone does not prove every property of an event horizon.

### 6.13 Light-Bending Experiment

Controls: mass and impact parameter. Use weak-field `α≈4GM/(bc²)`. Show apparent star shift. State the approximation and do not make it a full lensing solver.

### 6.14 Priority order

Implement applications in this order:

1. Mass Cancellation;
2. Elevator;
3. Map-to-Globe;
4. Worldline;
5. Schwarzschild Scale;
6. Brick Energy;
7. Clock/Redshift;
8. Dual Observer;
9. Tidal Force;
10. Orbit Inference;
11. Light Bending;
12. Field Equation Explorer.

If quality or schedule forces cuts, preserve 1–9. Never ship a misleading simulation merely to meet a numerical target.

## 7. Supporting learning artifacts

### 7.1 Reconstructed board notebook

Each board plate contains:

- plate number and title;
- transcript timestamp;
- likely minimal original board;
- clean teaching redraw;
- transcript clues;
- confidence level;
- symbol legend;
- conceptual purpose;
- limitations;
- downloadable SVG;
- print-safe monochrome version.

### 7.2 Spacetime-diagram workbook

Progress through:

1. position-time graphs;
2. worldlines;
3. light rays and light cones;
4. inertial and accelerated observers;
5. proper time;
6. free-fall worldlines;
7. coordinate changes;
8. gravitational redshift signals;
9. horizon crossing;
10. causal structure.

Every exercise requires the learner to draw or predict before reveal.

### 7.3 Visual concept atlas

Required visual spreads:

- inertial versus gravitational mass;
- force versus geometry;
- local versus global;
- worldline versus geodesic;
- coordinate description versus observable;
- stress-energy versus curvature;
- horizon versus singularity;
- distant versus infalling observer;
- black-hole mass versus horizon tides;
- independent evidence for black holes.

### 7.4 Thought-experiment deck

Cards must cover elevator, free fall, horizontal light in a rocket, thrown chalk, map/globe routes, lowering a brick, separated clocks, horizon crossing, tidal forces, and evidence inference. Each card has prediction, reasoning, diagram, common wrong answer, and follow-up variation.

### 7.5 Practice system

Use prediction, multiple choice with explanation, diagram labeling, ordering, algebra, misconception diagnosis, short explanation, teach-back, and transfer scenarios.

Difficulty levels:

1. recognize;
2. predict;
3. draw/interpret;
4. calculate;
5. reconcile contradiction;
6. transfer.

Feedback must explain reasoning and plausible distractors. Permit retry without penalty. Store progress locally.

### 7.6 Flashcards

Prioritize relationships:

- diagram → interpretation;
- equation → physical question;
- misconception → correction;
- observer → measurement;
- concept pair → relationship;
- transcript quotation → role in Brown's argument.

Provide CSV export suitable for Anki.

### 7.7 Misconception clinic

At minimum address:

- gravity is just another force;
- heavier objects fall faster in vacuum;
- standing on Earth is inertial;
- the rubber sheet is literal spacetime;
- a curved graph line proves curved spacetime;
- only mass appears in stress-energy;
- Newtonian escape speed proves black holes;
- horizon is a material surface;
- local time stops at the horizon;
- a bright infaller remains visibly frozen forever;
- the infaller sees the universe's entire future;
- horizon and singularity are identical;
- larger black holes have stronger horizon tides;
- the EHT ring is a photograph of the horizon;
- Einstein rejected or failed to understand quantum physics.

### 7.8 Mathematics companion

Use three rungs for every topic:

- Words and pictures;
- Algebra;
- Optional theory window.

Required equation cards:

- `F=ma`;
- Newtonian gravity;
- Coulomb comparison;
- `E=mc²`;
- escape velocity;
- Schwarzschild radius;
- Schwarzschild static redshift/time factor;
- idealized energy at infinity;
- tidal approximation;
- weak-field light deflection;
- simplified orbital mass inference;
- Einstein field equation.

Every card includes the physical question, symbols, units, assumptions, limiting behavior, one worked example, one misuse warning, and one diagram.

Optional theory windows may introduce invariants, proper time, metric, geodesic equation, geodesic deviation, stress-energy, nonlinear field equations, and horizon-regular coordinates. Do not derive the full field equation.

## 8. Einstein Archive specification

### 8.1 Visual packaging

Present the archive as an expensive, out-of-print private-press scientific biography:

- warm ivory paper;
- charcoal text;
- oxblood and muted Prussian-blue accents;
- restrained antique-gold details;
- fine serif typography;
- generous margins and marginal notes;
- engraved-style SVG linework;
- folio numbers and running titles;
- archival inserts and foldout timelines.

Avoid routine page-turn animation, script body text, heavy sepia, torn-paper theater, fake damage, or fabricated handwriting. Provide a plain-reading mode using the main course typography.

### 8.2 Appendix A — The Ten-Year Ascent

Subtitle: Einstein's road from the happiest thought to general relativity, 1905–1915.

Required chapters:

1. patent office and intellectual formation;
2. 1907 happiest thought;
3. Grossmann and the missing mathematical language;
4. the incorrect *Entwurf* theory;
5. hole argument and covariance;
6. November 1915 week by week;
7. Mercury's perihelion;
8. Einstein–Hilbert priority, with competing interpretations;
9. 1919 fame;
10. Einstein's later discomfort with black holes and other consequences.

Required inserts: ten-year foldout timeline, wrong-turn map, equation ancestry, November 1915 document sequence, Mercury plate, eclipse dossier, and myth ledger.

### 8.3 Appendix B — Einstein's Constellation

Subtitle: Friends, rivals, collaborators, protégés, and difficult allies.

Build an interactive relationship network with time slider and filters. Allowed relationship labels:

- intimate friend;
- family friend;
- sustained correspondent;
- collaborator;
- scientific ally;
- friendly adversary;
- priority rival;
- senior supporter;
- younger critic;
- institutional colleague;
- conference associate;
- documented encounter;
- near encounter;
- physical proximity only;
- legendary/unverified meeting.

Every profile contains: how they met, strength of relationship, scientific connection, agreement, friction, documented scene, anecdote status, sources, and lesson links.

Core profiles:

- Michele Besso;
- Marcel Grossmann;
- Paul Ehrenfest;
- Hendrik Lorentz;
- Max Planck;
- David Hilbert;
- Karl Schwarzschild;
- Marie Curie;
- Niels Bohr;
- Max Born;
- Erwin Schrödinger;
- Wolfgang Pauli;
- Werner Heisenberg;
- Paul Dirac;
- Ernest Rutherford;
- Louis de Broglie;
- Satyendra Nath Bose;
- Kurt Gödel;
- John von Neumann;
- J. Robert Oppenheimer;
- Arthur Eddington;
- Willem de Sitter;
- Georges Lemaître;
- Leo Szilard;
- Bertrand Russell;
- Rabindranath Tagore;
- Queen Elisabeth of Belgium;
- W. E. B. Du Bois;
- Paul Robeson;
- Mileva Marić;
- Elsa Einstein.

Do not give every famous person the same visual edge weight. Relationship strength must reflect evidence.

### 8.4 Appendix C — The Quantum Salon

Subtitle: Einstein among the creators of the theory he helped begin and refused to consider complete.

Required contribution timeline:

- 1905 light quanta and photoelectric law;
- 1907 quantum model of solids;
- 1909 wave/particle fluctuation analysis;
- 1916–17 spontaneous and stimulated emission and photon momentum;
- 1924–25 Bose–Einstein statistics and condensation;
- 1927 and 1930 debates with Bohr;
- 1935 EPR;
- Einstein–Schrödinger correspondence and cat context;
- later foundational criticism.

Required interpretation:

- Einstein accepted the empirical success of quantum mechanics;
- he disputed the completeness of the wavefunction as a description of individual reality;
- his objections concerned completeness, locality, separability, measurement, and objective state;
- “God does not play dice” is not an adequate account;
- Bell's theorem and experiments constrain local hidden-variable completion;
- Einstein's objections helped define entanglement and quantum foundations.

Required relationship treatments:

- Bohr: affectionate adversary;
- Born: friend divided by probability;
- Schrödinger: ally, correspondent, later rupture;
- Heisenberg: observables and theory;
- Pauli: blunt younger critic;
- Dirac: next-generation mathematical austerity;
- de Broglie: matter waves and alternative paths;
- Bose: recognition and extension;
- Planck: cautious originator versus radical young Einstein;
- Rutherford: experimental authority.

Required interactive centerpiece: a sourced, selectable 1927 Solvay seating chart showing each participant's age, discovery, Nobel status, quantum position, and relationship with Einstein. Add filters for determinism, completeness, wave/particle stance, and relationship type.

### 8.5 Appendix D — Turing and Shannon near-encounters

Alan Turing:

- Princeton graduate student, 1936–38, while Einstein was nearby;
- archival evidence supports that Turing had seen Einstein;
- do not claim a substantive conversation without primary evidence;
- label `near encounter / substantive interaction unverified`.

Claude Shannon:

- IAS fellow, 1940–41;
- include his later recollection of Einstein entering his talk and asking where tea was;
- label first-person recollection recorded later;
- do not call them friends;
- add the separate Shannon–Turing Bell Labs interaction as a network cross-link.

### 8.6 Appendix E — The Prize He Won and the Prize He Didn't

Present as a Swedish Academy archival dossier.

Required Einstein sections:

- multiple Nobel-worthy achievements;
- nomination timeline;
- official 1921 citation;
- committee hesitation about relativity;
- Allvar Gullstrand's opposition;
- status and limitations of 1919 eclipse evidence;
- why the photoelectric law was institutionally safer;
- significance of “services to Theoretical Physics, and especially...”;
- why a later second prize was possible but did not occur;
- why Nobel totals are not lifetime rankings.

Required Curie comparison:

- 1903 Physics prize shared for radiation research;
- 1911 Chemistry prize for discovery of radium and polonium, isolation of radium, and study of its compounds;
- treat these as distinct bodies of work;
- do not imply two prizes means twice the scientific importance.

Required interaction: the learner acts as a Nobel committee member in selected historical years and sees only evidence then available. After choosing, show the historical decision and unresolved uncertainty. Do not imply one objectively correct counterfactual award.

### 8.7 Gossip with footnotes

Personality, loyalty, rivalry, jealousy, family life, exile, politics, humor, and social tension are welcome when historically relevant. Every colorful story needs an evidence status. Do not use scandal merely for attention and do not convert film scenes into history.

## 9. Design, technical, and accessibility decisions

### 9.1 Main course design

Use a calm scientific-editorial system: light neutral ground, deep ink text, cool geometry accent, warm matter/energy accent, separate warning color, spacious layout, and restrained motion.

Color meanings must remain consistent for geometry, matter/energy, observer A, observer B, light, uncertainty, and misconception. Color is never the only encoding.

### 9.2 Diagram rules

- use SVG for primary scientific diagrams;
- labels remain legible at 320 px width;
- axes are labeled;
- arrows have consistent meanings;
- every animation has a static canonical state;
- state whether a diagram depicts space, spacetime, a graph, an embedding, or an analogy;
- avoid decorative 3D;
- qualify every rubber-sheet or embedding image.

### 9.3 Motion rules

- motion must represent a physical or explanatory change;
- learner controls play, pause, step, and reset;
- support reduced motion;
- never animate multiple new concepts simultaneously;
- no decorative particle fields or parallax.

### 9.4 Recommended frontend

Use a static frontend with:

- semantic HTML;
- modern CSS;
- vanilla JavaScript modules;
- SVG and limited Canvas;
- KaTeX;
- a minimal bundler such as Vite;
- localStorage for progress and preferences.

Avoid React, databases, authentication, and large UI frameworks unless a later concrete requirement justifies them.

### 9.5 Offline requirement

The production build must contain all required assets locally, avoid CDN dependencies, work without internet after build, degrade if localStorage is unavailable, and include simple launch instructions. A service worker/PWA is optional later, not required initially.

### 9.6 Canonical data records

Course records require fields equivalent to:

```text
id, lessonId, title, contentType, body, provenanceType,
timestampStart, timestampEnd, sourceId, boardConfidence,
mathRung, misconceptions, diagramIds, appIds, questionIds,
citations, reviewStatus
```

Historical relationship records require:

```text
personId, displayName, lifespan, relationshipTypes,
relationshipStart, relationshipEnd, locations, scientificTopics,
documentedScenes, anecdotes, anecdoteStatus, primarySources,
secondarySources, relatedPeople, relatedLessonIds, reviewStatus
```

Choose JSON or JavaScript data modules. Do not duplicate the same factual prose in multiple pages.

### 9.7 Target project structure

```text
general_relativity_dwarkesh/
  transcript.txt
  GR_LEARNING_MATERIALS_PLAN.md
  package.json
  index.html
  src/
    app.js
    styles/          # tokens, base, layout, course, archive, print
    content/         # lessons, claims, people, sources, questions
    components/      # navigation, provenance, equation, practice
    diagrams/        # board, spacetime, black holes, evidence, history
    apps/            # one folder per mini-application
    utils/           # constants, units, math, storage, accessibility
  public/
    fonts/
    archival-images/
    attribution/
  scripts/
    normalize-transcript.js
    validate-content.js
    export-flashcards.js
    build-print-version.js
  tests/
    unit/
    content/
    accessibility/
    visual/
  dist/
```

This is a target only; do not create it during planning.

### 9.8 Accessibility

Meet WCAG 2.1 AA at minimum:

- complete keyboard operation;
- visible focus;
- semantic landmarks and headings;
- labeled controls and dynamic values;
- screen-reader diagram descriptions;
- prose/table alternatives for complex visuals;
- sufficient contrast;
- reduced-motion support;
- responsive phone through desktop;
- no hover-only interaction;
- plain-reading archive mode;
- useful print styling.

Interactive SVG must expose a text summary and announce important state changes.

## 10. Scientific and historical guardrails

The build fails review if any of these are violated:

- inertial and gravitational mass are not distinguished before equality;
- equivalence is presented as global;
- tides are omitted from the elevator limitation;
- free fall is described as feeling a gravitational force;
- worldline curvature is automatically equated with spacetime curvature;
- geodesic is simplistically defined as shortest path in every context;
- only rest mass is said to source curvature;
- Newtonian escape speed is presented as a GR proof;
- static Schwarzschild formulas are applied to a horizon-crossing infaller;
- coordinate time and proper time are conflated;
- horizon and singularity are conflated;
- a permanently bright frozen infaller is shown;
- larger black holes are said to have stronger horizon tides;
- EHT is described as directly photographing a horizon;
- Einstein's quantum position is reduced to dislike of randomness;
- Nobel totals are treated as scientific rankings;
- Turing is called Einstein's friend or confirmed interlocutor;
- Shannon is called Einstein's friend;
- Hilbert priority is reduced to theft;
- Mileva Marić is assigned unsupported coauthorship or dismissively erased;
- an anecdote lacks evidence status;
- a quotation lacks a reliable source;
- an archival image lacks rights/attribution data.

## 11. Testing plan

### 11.1 Unit tests

Test Schwarzschild radius, escape velocity, redshift factor and domain, extracted-energy fraction, tidal approximation, light deflection, orbital mass inference, unit conversion, horizon limits, and large-radius limits.

### 11.2 Content validation

Automated validation must reject:

- transcript claim without timestamps;
- board reconstruction without confidence;
- anecdote without status;
- relationship without sources;
- application without assumptions;
- equation without symbols;
- duplicate IDs;
- broken internal links.

### 11.3 Interaction and visual testing

For every application test default, extremes, domain protection, reset, keyboard, reduced motion, responsiveness, fallback, and explanatory updates.

Inspect phone, tablet, laptop, wide desktop, and print/PDF layouts. Check equations, SVG labels, long names, provenance drawers, and rare-book typography.

### 11.4 Learning validation

Manually ask the learner to:

1. explain the mass coincidence;
2. distinguish weight, gravity, and free fall;
3. interpret map/globe and worldline diagrams;
4. explain both sides of Einstein's equation;
5. explain why the horizon is not a surface;
6. reconcile distant and infalling accounts;
7. identify independent black-hole evidence;
8. explain Einstein as quantum founder and critic;
9. explain why Einstein's one Nobel and Curie's two are not comparative rankings.

Revise any material that produces slogans without causal understanding.

## 12. Ordered implementation phases and gates

### Phase 0 — Preserve and normalize

Inventory workspace, preserve raw transcript, create normalized working copy, identify chapter/timestamp boundaries, and create source registry.

Gate: raw and normalized copies can be compared; timestamps are intact; no course prose or code has begun.

### Phase 1 — Source and board map

Divide transcript into argument units; tag claims; find board cues; propose board states; assign confidence; identify GR supplements and misconceptions.

Gate: every planned lesson section points to source units and no board inference is untagged.

### Phase 2 — Historical research dossier

Build people/relationship registry; gather authoritative sources; verify quantum timeline, Nobel dossier, Curie comparison, and Turing/Shannon evidence; create image-rights ledger.

Gate: each core profile has reliable evidence and every anecdote has status.

### Phase 3 — Design system prototype

Define tokens, typography, semantic colors, controls, main shell, archive shell, provenance drawer, equation card, diagram frame, and mobile/desktop mockups.

Gate: both visual modes are readable; archive has plain mode; semantics do not rely on color.

### Phase 4 — Vertical slice

Build only home, Lesson 1, four board plates, Mass Cancellation Lab, one prediction, one misconception, one equation card, provenance flow, and local progress.

Gate: Lesson 1 works end to end on phone and desktop; calculations are tested; keyboard and reduced-motion behavior work; prediction → exploration → teach-back is complete.

Do not scale before this gate passes.

### Phase 5 — Geometry core

Build Lessons 2–4, Elevator, Map-to-Globe, Worldline, Field Equation Explorer, early spacetime workbook, and concept atlas.

Gate: local/global and coordinate/observable distinctions pass review; rubber-sheet intuition is not doing hidden conceptual work.

### Phase 6 — Black-hole core

Build Lessons 5–6 and the Schwarzschild, Brick Energy, Clock/Redshift, Dual Observer, and Tidal Force applications.

Gate: formulas have valid domains; static and infalling observers are separated; assumptions are visible; horizon and singularity remain distinct.

### Phase 7 — Evidence and practice

Build Lesson 7, Orbit Inference, Light Bending, problem bank, flashcards, misconception clinic, mastery checks, and progress dashboard.

Gate: observational claims are calibrated; answers explain reasoning; learner can review weak areas.

### Phase 8 — Einstein Archive

Build in order: Ten-Year Ascent, Constellation, Quantum Salon, Turing/Shannon, Nobel dossier.

Gate: every anecdote has status; relationship map does not imply unsupported friendship; archive remains accessible; quantum and Nobel sections pass historical review.

### Phase 9 — Integration and polish

Cross-link lessons and appendices; finish glossary, atlas, print styles, citations, attribution, asset optimization, accessibility, scientific audit, and content audit.

Gate: no broken links or missing provenance; essential applications have fallbacks; production build works offline.

### Phase 10 — Derived artifacts

Only now generate PDF, PPTX, flashcard export, and possible short-video scripts.

## 13. Definition of done

Complete means:

- seven lessons implemented;
- all central transcript claims timestamped;
- core board reconstructions confidence-labeled;
- essential interactive applications correct and qualified;
- exercises, feedback, flashcards, and misconception clinic complete;
- spacetime workbook, concept atlas, and math companion complete;
- five Einstein Archive appendices complete;
- quantum luminaries and Turing/Shannon handled at correct evidence levels;
- Nobel/Curie comparison accurate and sourced;
- mobile, desktop, keyboard, reduced-motion, and print behavior verified;
- production build runs without network access;
- scientific, historical, content, and accessibility reviews pass;
- learner can give the full capstone explanation from mass equality to curved spacetime, black holes, and evidence.

## 14. Rules for the implementation model

1. Do not invent transcript content, board content, quotations, meetings, friendships, or motives.
2. Do not collapse provenance classes.
3. Complete the vertical slice before scaling.
4. Do not add frameworks without concrete need.
5. Do not prioritize spectacle over scientific meaning.
6. Use a static diagram when it is more accurate than a simulation.
7. Do not use Newtonian formulas near a horizon as though exact.
8. Do not describe coordinate artifacts as local measurements.
9. Do not use unsourced celebrity anecdotes.
10. Do not imply every contemporary was Einstein's friend.
11. Do not pass a phase gate with known scientific errors.
12. Keep raw sources unchanged.
13. Keep content reusable across HTML, PDF, PPTX, and future video.
14. Put assumptions beside every application.
15. Prefer fewer correct interactions over many shallow widgets.

## 15. First task after implementation authorization

Perform only Phases 0 and 1:

1. inventory the workspace;
2. normalize a working transcript copy;
3. create the source registry;
4. segment transcript into argument units;
5. build claim/provenance map;
6. build board reconstruction map;
7. report the proposed Lesson 1 vertical slice.

Do not begin website code or historical appendix prose before these foundations exist.
