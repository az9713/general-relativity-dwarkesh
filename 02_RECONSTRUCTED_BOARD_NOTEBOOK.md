# Reconstructed Board Notebook

Board plates are **teaching reconstructions** inferred from Adam Brown’s transcript cues and standard presentations of the same arguments. They are not facsimiles of the original board.

Live interactive versions ship in the HTML course (`visual-lab/` and embedded in lessons). Source registry: `source/board_reconstructions.json`.

## Confidence scale

| Level | Meaning |
|-------|---------|
| High | Brown names the important terms or describes the arrangement clearly |
| Medium | A standard diagram uniquely fits the argument |
| Low | Multiple visuals could fit; teaching reconstruction only |

---

## Plate B01 — \(F = m_i a\)

- **Timestamps:** 4:41–5:45  
- **Confidence:** high  
- **Clues:** “ma=F”; mass resists acceleration  
- **Likely content:** Newton’s second law with inertial mass labeled  
- **Teaching redraw:** Clean equation + force-to-acceleration sketch  
- **Uncertainty:** \(F=ma\) vs \(ma=F\) ordering  

**Reading:** \(m_i\) is resistance to acceleration, not yet “gravitational charge.”

---

## Plate B02 — Newtonian gravity

- **Timestamps:** 5:56–7:20  
- **Confidence:** high  
- **Clues:** Newton’s constant; inverse-square  
- **Likely content:** \(F_g \propto M m / r^2\) with attraction  
- **Uncertainty:** symbol names and sign convention  

---

## Plate B03 — Gravity vs Coulomb

- **Timestamps:** 7:32–12:48  
- **Confidence:** high  
- **Clues:** electrostatic force law; minus vs plus sign  
- **Likely content:** side-by-side inverse-square comparison  
- **Role:** make the mass coincidence visible by contrast with independent electric charge  

---

## Plate B04 — Mass cancellation

- **Timestamps:** 12:58–16:36  
- **Confidence:** high  
- **Clues:** inertial mass; gravitational mass; “same mass”  
- **Teaching sequence:**  
  1. \(m_i a = G M m_g / r^2\)  
  2. Empirical \(m_i = m_g\)  
  3. \(a = G M / r^2\)  

**Role:** target insight of Lesson 1 — universal free fall as a clue, not a proof of GR.

---

## Later plates (Lessons 2–7)

See `source/board_reconstructions.json` for the full mapped set (18 plates), including:

- centrifugal / inertial-force analogy  
- free-fall vs held chalk worldlines  
- map vs globe / geodesic  
- Einstein field equation (interpretive)  
- escape velocity & Schwarzschild radius  
- brick-and-pulley  
- redshift factor  
- dual-observer horizon crossing  
- evidence diagrams (orbits, waves, light bending)  

SVG teaching redraws for Lesson 1 are implemented in `src/apps/boardPlates.js`. Additional plates use the interactive labs as primary visual vehicles in v1.
