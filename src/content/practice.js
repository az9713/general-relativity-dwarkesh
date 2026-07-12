/** Practice bank, misconceptions, flashcards. */

export const misconceptions = [
  {
    id: 'm-force-equal',
    claim: 'Gravity pulls equally hard on all objects.',
    correction:
      'In Newton’s law the force is larger on a larger gravitational mass; inertial mass scales so acceleration matches when m_i = m_g.',
    lessonId: 'lesson-1',
  },
  {
    id: 'm-defined-equal',
    claim: 'Inertial and gravitational mass are equal by definition.',
    correction:
      'They play different roles. Equality is an empirical fact elevated into principle-level physics.',
    lessonId: 'lesson-1',
  },
  {
    id: 'm-standing-inertial',
    claim: 'Standing still on Earth is the inertial state.',
    correction: 'You feel weight because the ground accelerates you away from free fall.',
    lessonId: 'lesson-2',
  },
  {
    id: 'm-rubber',
    claim: 'Spacetime is literally a rubber sheet with balls rolling downhill.',
    correction:
      'Embedding analogies can mislead. Curvature is intrinsic; “downhill” often smuggles in an external gravity.',
    lessonId: 'lesson-3',
  },
  {
    id: 'm-graph-curve',
    claim: 'A curved worldline on a graph proves spacetime is curved.',
    correction: 'Coordinates can bend the appearance of geodesics. Curvature is geometric, not one plot style.',
    lessonId: 'lesson-3',
  },
  {
    id: 'm-only-mass',
    claim: 'Only rest mass sources curvature.',
    correction: 'Stress-energy includes energy, momentum, pressure, and stress.',
    lessonId: 'lesson-4',
  },
  {
    id: 'm-newton-proof',
    claim: 'Newtonian escape speed equaling c proves black holes in GR.',
    correction: 'It is a useful clue for the scale r_s ~ 2GM/c², not a GR derivation.',
    lessonId: 'lesson-5',
  },
  {
    id: 'm-horizon-shell',
    claim: 'The horizon is a material surface.',
    correction: 'It is a causal boundary. Crossing can be locally uneventful (tides aside).',
    lessonId: 'lesson-5',
  },
  {
    id: 'm-time-stops',
    claim: 'Local time stops at the horizon for the infaller.',
    correction:
      'Distant static descriptions mislead. The infaller reaches the horizon in finite proper time.',
    lessonId: 'lesson-6',
  },
  {
    id: 'm-frozen',
    claim: 'A bright infaller remains visibly frozen forever.',
    correction: 'Signals redshift and fade; there is no eternal bright freeze-frame.',
    lessonId: 'lesson-6',
  },
  {
    id: 'm-whole-future',
    claim: 'The infaller sees the entire future of the universe at the horizon.',
    correction: 'This popular claim is not a safe generic slogan; avoid comic-book omniscience.',
    lessonId: 'lesson-6',
  },
  {
    id: 'm-horizon-sing',
    claim: 'Horizon and singularity are the same.',
    correction: 'Horizon is a causal boundary; singularity is a separate classical breakdown.',
    lessonId: 'lesson-6',
  },
  {
    id: 'm-big-tides',
    claim: 'Larger black holes have stronger horizon tides.',
    correction: 'Horizon tides weaken as mass increases; supermassive horizons can be mild tidally.',
    lessonId: 'lesson-6',
  },
  {
    id: 'm-eht-photo',
    claim: 'EHT photographed the event horizon surface.',
    correction:
      'EHT images emission and shadow/photon-ring structure related to strong gravity — not a solid shell photo.',
    lessonId: 'lesson-7',
  },
  {
    id: 'm-einstein-dice',
    claim: 'Einstein simply hated randomness in quantum mechanics.',
    correction:
      'He accepted empirical success but disputed completeness, locality/separability, and related foundations. “Dice” is not an adequate summary.',
    lessonId: 'archive',
  },
];

export const flashcards = [
  { id: 'f1', front: 'Inertial mass mᵢ', back: 'Resistance to acceleration in F = mᵢ a.' },
  { id: 'f2', front: 'Gravitational mass m_g', back: 'Coupling “charge” in Newtonian gravity.' },
  { id: 'f3', front: 'Why free-fall a is universal (Newton + equality)', back: 'With mᵢ = m_g, a = GM/r² independent of test mass.' },
  { id: 'f4', front: 'Equivalence principle (local)', back: 'Local free fall removes gravity; equivalence fails globally via tides.' },
  { id: 'f5', front: 'Geodesic (pedagogical)', back: 'Straightest available path given the geometry; free fall follows geodesics.' },
  { id: 'f6', front: 'Einstein equation (words)', back: 'Geometry side Gμν related to stress-energy Tμν.' },
  { id: 'f7', front: 'Schwarzschild radius', back: 'r_s = 2GM/c² — horizon scale for Schwarzschild BH.' },
  { id: 'f8', front: 'Event horizon', back: 'Causal boundary, not a material surface.' },
  { id: 'f9', front: 'Static redshift factor', back: '√(1 − r_s/r) for static observers with r > r_s.' },
  { id: 'f10', front: 'Horizon vs singularity', back: 'Distinct: causal boundary vs classical geometric breakdown.' },
  { id: 'f11', front: 'EHT ring means…', back: 'Lensed emission/shadow structure — not a photo of a hard horizon shell.' },
  { id: 'f12', front: 'Weak-field light deflection', back: 'α ≈ 4GM/(b c²) — twice naive Newtonian light corpuscle value.' },
];

export const atlas = [
  { id: 'a1', title: 'Inertial vs gravitational mass', body: 'Different roles; empirically equal for test bodies.' },
  { id: 'a2', title: 'Force vs geometry', body: 'Newton: force on a stage. Einstein: stage geometry guides free motion.' },
  { id: 'a3', title: 'Local vs global', body: 'Equivalence is local; tides reveal extended gravitational fields.' },
  { id: 'a4', title: 'Worldline vs geodesic', body: 'Worldline = any history; geodesic = free (natural) history.' },
  { id: 'a5', title: 'Coordinate vs observable', body: 'Chart appearance ≠ invariant measurement.' },
  { id: 'a6', title: 'Stress-energy vs curvature', body: 'Tμν sources; Gμν responds; motion follows geometry.' },
  { id: 'a7', title: 'Horizon vs singularity', body: 'Causal boundary vs curvature catastrophe (classical).' },
  { id: 'a8', title: 'Distant vs infalling observer', body: 'Different descriptions, compatible physics.' },
  { id: 'a9', title: 'Mass vs horizon tides', body: 'Larger M → weaker tides near r ~ r_s.' },
  { id: 'a10', title: 'Independent black-hole evidence', body: 'Orbits, waves, EHT-scale imaging, EM counterparts — different channels.' },
];
