# Lesson 1 Vertical Slice Brief

## Status

Source-ready; learner-facing implementation not started.

## Lesson identity

- Number: 1
- Working title: **The Coincidence Einstein Took Seriously**
- Transcript span: 00:00 through approximately 16:36
- Recommended active study time: 25–35 minutes
- Required prior knowledge: high-school algebra only

## Target insight

The learner can explain why different test bodies share the same gravitational acceleration and why the equality of inertial and gravitational mass is a deep clue rather than a routine cancellation.

## Source units

Use these records from `argument_units.json`, in order:

1. `u01-course-purpose`
2. `u02-special-relativity-constraint`
3. `u03-newton-second-law`
4. `u04-newton-gravity-tension`
5. `u05-electromagnetic-precedent`
6. `u06-attraction-and-force-carrier`
7. `u07-mass-as-gravitational-charge`
8. `u08-mass-equality-and-free-fall`

## Required claims

Use `c001` through `c009` from `claims.json`.

Do not publish `c009` as transcript-derived. It is a GR supplement that gives the weak equivalence principle a more precise scope and needs an external reference.

## Narrative sequence

### 1. Brown's question

Open with the lecture's challenge: can an ordinary learner see the central insight of GR without taking the full graduate course?

Provenance: transcript, `u01-course-purpose`.

### 2. The constraint inherited from special relativity

Explain only what Lesson 1 needs: physical influence cannot be treated as propagating instantaneously, so Newton's gravity cannot be the final theory.

Do not teach the Lorentz transformation here.

Provenance: transcript, `u02-special-relativity-constraint` and `u04-newton-gravity-tension`.

### 3. Two roles that mass appears to play

Introduce:

```text
F = m_i a
```

Interpret `m_i` as resistance to acceleration.

Then introduce the Newtonian gravitational force in a source/test-body form:

```text
F_g = -GMm_g/r²
```

Interpret `m_g` as coupling to gravity.

Do not assume equality until the empirical coincidence is stated.

Provenance: transcript, `u03-newton-second-law`, `u04-newton-gravity-tension`, and `u07-mass-as-gravitational-charge`.

### 4. Why electromagnetism makes the coincidence visible

Compare gravitational mass with electric charge. Electric charge and inertial mass are independent; different charge-to-mass ratios produce different electric accelerations.

Keep spin-1/spin-2 discussion inside an optional theory note. It is not required for the target insight.

Provenance: transcript, `u05-electromagnetic-precedent` and `u06-attraction-and-force-carrier`.

### 5. Perform the cancellation only after naming the empirical equality

Write:

```text
m_i a = -GMm_g/r²
```

Then use the empirical equality `m_i = m_g` to obtain:

```text
a = -GM/r²
```

State what disappeared: the identity and mass of the test body.

State what did not disappear: the source mass, distance, initial conditions, nongravitational forces, and limitations of the test-body approximation.

Provenance: transcript, `u08-mass-equality-and-free-fall`; precision scope from GR supplement `c009`.

### 6. End on the clue, not the final theory

The equality does not yet prove curved spacetime. It makes possible Einstein's next question: could gravity be an inertial effect? That question is the bridge to Lesson 2.

## Required board reconstructions

Use these records from `board_reconstructions.json`:

1. `b01-fma` — high confidence;
2. `b02-newton-gravity` — high confidence;
3. `b03-coulomb-comparison` — high confidence;
4. `b04-mass-equality-cancellation` — high confidence.

For each board display, provide:

- “Likely board” minimal view;
- clean teaching redraw;
- timestamp/source drawer;
- confidence label;
- uncertainty note.

## Required interaction: Mass Cancellation Lab

### Learning question

What must be true for two objects with different masses to have the same gravitational acceleration?

### Prediction

Before controls activate, ask:

> A 1 kg object and a 10 kg object are released at the same location in vacuum. Gravity pulls ten times harder on the 10 kg object. Which one accelerates faster, and why?

Record the prediction locally for comparison after exploration.

### Controls

- source mass `M`;
- test inertial mass `m_i`;
- test gravitational mass `m_g`;
- lock toggle: `m_i = m_g`;
- optional comparison mode using electric charge `q`.

### Linked displays

- two falling test bodies;
- gravitational force on each;
- acceleration of each;
- live equations;
- ratio `m_g/m_i`;
- electric charge-to-mass comparison.

### Required behavior

- With equality locked, changing test mass changes force but not acceleration.
- Unlocking equality is labeled “hypothetical universe,” not real measured physics.
- Acceleration changes with `m_g/m_i` when unlocked.
- Electric comparison shows why acceleration depends on charge-to-mass ratio.
- Reset restores real-world equality.

### Assumptions panel

- Newtonian weak-field treatment;
- test bodies do not appreciably affect the source;
- vacuum;
- same release event and initial velocity;
- nongravitational forces neglected;
- equality of inertial and gravitational mass is empirical input.

### Transfer question

> If two electrically charged particles have the same charge but different inertial masses, should they have the same acceleration in the same electric field? Explain the contrast with gravity.

## Prediction and review questions

1. Why does a larger gravitational force on a heavier object not imply a larger gravitational acceleration?
2. Which mass appears in `F=ma`, and which appears in Newton's gravitational force?
3. Why is electric charge a useful comparison?
4. Does cancellation prove that gravity is curved spacetime? Why not?
5. Name two conditions under which the simple “all objects fall alike” statement requires qualification.

## Misconceptions to diagnose

### “Gravity pulls equally hard on all objects.”

Correction: in the Newtonian formula it pulls harder on a more massive test body, but that body also has proportionally more inertia, leaving the same acceleration.

### “The masses cancel because they were defined to be the same.”

Correction: they play conceptually different roles. Their equality is an empirical fact requiring explanation.

### “All objects always follow identical paths.”

Correction: the statement assumes the same initial conditions and neglects drag, electromagnetic forces, self-gravity, size, spin-coupling effects, and tidal structure.

### “The cancellation already proves Einstein's field equation.”

Correction: it supplies a clue and motivates the equivalence principle; more reasoning is required to reach curved spacetime and the field equation.

## Draw-it-yourself task

Ask the learner to reproduce, from memory:

1. `F=m_i a`;
2. the gravitational force with `m_g`;
3. the equality `m_i=m_g`;
4. the cancellation leading to mass-independent acceleration;
5. one sentence explaining why the same move fails for electric charge.

## Teach-back prompt

> Explain to a Newtonian physicist why equality of inertial and gravitational mass is surprising. Your explanation must use the electric-charge comparison and must distinguish force from acceleration.

## Navigation and cross-links

- Previous: Course Index.
- Next: Lesson 2 — Einstein's Happiest Thought.
- Backward prerequisite: optional algebra reminder for rearranging `F=ma`.
- Forward connection: Lesson 2's inertial-force hypothesis.
- Related Visual Lab items: board plates `b01`–`b04` and Mass Cancellation Lab.
- Related misconception entries: force versus acceleration; equality by definition; universal free fall scope.
- Transcript source links: open provenance drawers without leaving the lesson.

## Acceptance gate for the vertical slice

The Lesson 1 implementation is accepted only when:

- every lecture-derived statement opens to a timestamp;
- all four board plates show confidence and uncertainty;
- learner prediction is recorded before exploration;
- changing test mass changes force but not acceleration under equality;
- hypothetical inequality is visibly labeled;
- electric comparison works;
- keyboard and reduced-motion behavior pass;
- phone and desktop layouts pass;
- learner can complete prediction → exploration → explanation → teach-back;
- no claim implies the equivalence principle alone derives all of GR.
