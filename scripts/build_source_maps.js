import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceDir = path.join(root, 'source');
const fragments = JSON.parse(fs.readFileSync(path.join(sourceDir, 'timestamp_fragments.json'), 'utf8'));

function timeToSeconds(value) {
  const parts = value.split(':').map(Number);
  return parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : parts[0] * 60 + parts[1];
}

const unitDefinitions = [
  ['u01-course-purpose', 'lesson-1', '0:00', 'Why seek the essence of GR?', 'Brown frames GR as Einstein’s decade-long attempt to find a deeper account of gravity and promises the central insight rather than a graduate course.', 'orientation'],
  ['u02-special-relativity-constraint', 'lesson-1', '2:07', 'Special relativity sets the constraint', 'Nothing outruns light, and gravity must ultimately be made compatible with the relativistic structure already respected by electromagnetism.', 'prerequisite'],
  ['u03-newton-second-law', 'lesson-1', '4:34', 'Inertial mass in F = ma', 'Newton’s second law introduces mass as resistance to acceleration; Brown says the law survives conceptually even though force and acceleration require refinement.', 'core-argument'],
  ['u04-newton-gravity-tension', 'lesson-1', '5:56', 'Newtonian gravity conflicts with instantaneous influence', 'The inverse-square gravitational force law works empirically but appears to transmit changes instantaneously, conflicting with special relativity.', 'core-argument'],
  ['u05-electromagnetic-precedent', 'lesson-1', '7:30', 'Coulomb’s law and Maxwell’s precedent', 'The static electric inverse-square law is only a limit of relativistic electromagnetism, suggesting that Newtonian gravity may also be a limit of a deeper theory.', 'analogy'],
  ['u06-attraction-and-force-carrier', 'lesson-1', '11:20', 'Why gravity cannot copy electromagnetism exactly', 'The sign difference between gravitational attraction and like-charge repulsion prevents a literal mathematical copy of electromagnetism.', 'qualification'],
  ['u07-mass-as-gravitational-charge', 'lesson-1', '12:56', 'Gravity’s charge is mass', 'Unlike electric charge, the property sourcing and responding to gravity is mass—the same kind of quantity that already appears as inertia.', 'core-argument'],
  ['u08-mass-equality-and-free-fall', 'lesson-1', '14:07', 'The empirical equality and universal free fall', 'Inertial and gravitational mass are experimentally equal, so the falling object’s mass cancels and all test bodies share the same acceleration.', 'core-argument'],
  ['u09-rotating-bucket', 'lesson-2', '16:42', 'Rotating water and an inertial force', 'Brown uses a rotating bucket to compare an outside inertial description with the centrifugal force experienced in the rotating frame.', 'thought-experiment'],
  ['u10-inertial-charge-and-einstein-leap', 'lesson-2', '19:19', 'Why inertial forces couple to inertial mass', 'Centrifugal force necessarily scales with inertial mass; gravity does too, motivating Einstein’s proposal that gravity itself is an inertial effect.', 'core-argument'],
  ['u11-free-fall-removes-gravity', 'lesson-2', '20:55', 'Astronauts, Earth, and free fall', 'Free-floating astronauts feel no gravitational force, whereas a person standing on Earth is prevented from following free fall.', 'core-argument'],
  ['u12-redefine-straight-motion', 'lesson-2', '22:00', 'The price of the inertial-force interpretation', 'If free fall is inertial motion, the theory must revise which spacetime paths count as straight and which observers are accelerated.', 'transition'],
  ['u13-chalk-worldlines', 'lesson-3', '23:20', 'Held and falling chalk in spacetime', 'A held object and a freely falling piece of chalk trace different spacetime paths; treating the falling path as straight requires a new geometry.', 'core-argument'],
  ['u14-map-and-great-circle', 'lesson-3', '24:47', 'The map/globe analogy', 'A great-circle flight looks curved on a flat map but is the straightest route on the curved Earth.', 'analogy'],
  ['u15-geodesics-and-curvature', 'lesson-3', '26:39', 'Free fall as a geodesic', 'Flattening a curved geometry distorts straightness; similarly, free-fall paths are geodesics in curved spacetime even when coordinate plots look curved.', 'core-argument'],
  ['u16-from-insight-to-equations', 'lesson-4', '28:33', 'Eight years to characterize curvature', 'Einstein had the physical picture by about 1907 but needed years to find the mathematics relating matter to spacetime curvature.', 'history-transition'],
  ['u17-field-equation-interpretation', 'lesson-4', '29:23', 'Reading Einstein’s field equation', 'Brown identifies a curvature tensor on the left, constants, and the stress-energy tensor on the right as the relativistic generalization of matter and energy.', 'core-argument'],
  ['u18-gr-slogan-and-reach', 'lesson-4', '30:31', 'Matter curves; geometry guides motion', 'The equation captures a reciprocal story: matter and energy curve spacetime, and curved spacetime governs free motion across enormous scales.', 'synthesis'],
  ['u19-schwarzschild-solution', 'lesson-5', '31:46', 'The exact solution Einstein underestimated', 'Schwarzschild quickly found an exact vacuum solution around a central mass; its horizon confused physicists, including Einstein, for decades.', 'history-core'],
  ['u20-escape-speed-and-radius', 'lesson-5', '34:06', 'Newtonian clue to the Schwarzschild radius', 'Equating Newtonian escape velocity with light speed yields 2GM/c², correctly signaling a special radius but not yet explaining a relativistic horizon.', 'approximation'],
  ['u21-lowering-brick-energy', 'lesson-5', '36:27', 'Lowering a brick toward a gravitating body', 'A rope and pulley extract gravitational potential energy while lowering a brick, producing the Newtonian energy GMm/r and a fraction GM/(rc²) of rest energy.', 'thought-experiment'],
  ['u22-efficiency-across-scales', 'lesson-5', '38:08', 'Why ordinary gravity gives tiny efficiencies', 'For Earth, Sun, and ordinary fuel the extractable fraction is small, but compactness increases it.', 'worked-example'],
  ['u23-over-unity-paradox', 'lesson-5', '42:23', 'Naive extrapolation produces more than mc²', 'Extending the Newtonian expression too far suggests extracting more rest energy than the brick contains and recycling the surplus into a perpetual-motion process.', 'paradox'],
  ['u24-collapse-blocks-the-machine', 'lesson-5', '44:00', 'The system becomes a black hole first', 'Before the impossible energy cycle can be realized, the gravitating system crosses the compactness threshold and forms a horizon.', 'resolution'],
  ['u25-relativistic-force-correction', 'lesson-6', '47:12', 'The first exact Schwarzschild correction', 'Brown replaces the Newtonian description with a radius-dependent relativistic expression that reduces to Newton at large distance and diverges for static hovering near the horizon.', 'equation'],
  ['u26-static-versus-orbiting', 'lesson-6', '51:00', 'Hovering, falling, and orbiting are different', 'Maintaining a fixed radius requires acceleration; free-fall orbits remove felt force, but stable circular orbits cease sufficiently close to the black hole.', 'observer-distinction'],
  ['u27-gravitational-time-dilation', 'lesson-6', '55:34', 'Static clocks at different radii', 'The Schwarzschild time factor compares a static clock near the black hole with one far away and approaches zero at the horizon in these coordinates.', 'equation'],
  ['u28-redshift-from-pulse-counting', 'lesson-6', '59:00', 'Light pulses reveal the clock-rate difference', 'A distant observer receives fewer wave crests per unit time, so outward light is redshifted and carries less energy at infinity.', 'core-argument'],
  ['u29-energy-at-infinity', 'lesson-6', '1:03:10', 'Local rest energy versus distant value', 'A mass held deep in the potential has local rest energy mc² but a smaller energy value for a distant observer, consistent with the work required to retrieve it.', 'core-argument'],
  ['u30-exact-extraction-fraction', 'lesson-6', '1:05:32', 'Relativistic completion of the pulley experiment', 'The exact redshift relation yields an extraction fraction that matches Newton far away and approaches 100 percent as the lowering point approaches the horizon.', 'resolution'],
  ['u31-black-hole-power-plant', 'lesson-6', '1:09:01', 'Why black holes are idealized ultimate power plants', 'Chemical and nuclear reactions access small fractions of rest energy, whereas the idealized lowering process can approach the full rest-mass energy.', 'application'],
  ['u32-quantum-and-charge-caveats', 'lesson-6', '1:11:12', 'What happens to particle identity?', 'Classically matter enters the black hole; quantum evaporation raises deeper questions about conserved particle numbers and quantum gravity.', 'caveat'],
  ['u33-two-observer-question', 'lesson-6', '1:13:50', 'Set up the two descriptions of infall', 'Brown separates the distant observer’s received signals from the infalling observer’s local experience.', 'observer-distinction'],
  ['u34-distant-view-of-infall', 'lesson-6', '1:14:57', 'Redshifted fading for the distant observer', 'Signals from the infaller arrive increasingly delayed and redshifted; the distant observer never receives a horizon-crossing event in finite Schwarzschild time.', 'observer-distinction'],
  ['u35-infaller-horizon-and-tides', 'lesson-6', '1:16:35', 'Finite proper-time crossing and later danger', 'The infaller crosses a sufficiently large horizon without a local catastrophe, while tidal forces and the singularity determine eventual destruction.', 'observer-distinction'],
  ['u36-generic-black-hole-formation', 'lesson-7', '1:18:51', 'From mathematical curiosity to generic outcome', 'Penrose and Hawking showed that black-hole formation and singular behavior are not merely artifacts of perfectly tuned solutions.', 'theory-evidence'],
  ['u37-sagittarius-orbits', 'lesson-7', '1:20:10', 'Inferring Sagittarius A* from stellar motion', 'Stellar orbits reveal an unseen object that is extremely massive, compact, and dark at the center of the Milky Way.', 'observational-evidence'],
  ['u38-gravitational-wave-evidence', 'lesson-7', '1:21:26', 'Feeling mergers with LIGO', 'Correlated interferometer signals match the predicted waveform from merging black holes and allow the source masses and distance to be inferred.', 'observational-evidence'],
  ['u39-eht-evidence', 'lesson-7', '1:22:44', 'Imaging emission around black holes', 'The Event Horizon Telescope resolves radio emission from matter near supermassive black holes, adding a distinct line of evidence.', 'observational-evidence'],
  ['u40-theory-reach', 'lesson-7', '1:23:22', 'From elevators to the universe', 'Brown emphasizes the extraordinary range from local thought experiments to solar-system dynamics, cosmology, and black holes.', 'synthesis'],
  ['u41-light-bending-prediction', 'lesson-7', '1:24:21', 'Why gravity bends light', 'GR predicts light deflection by the Sun; Brown contrasts it with a Newtonian particle-like estimate and explains the relativistic enhancement.', 'prediction'],
  ['u42-eclipse-test', 'lesson-7', '1:26:13', 'The 1919 eclipse and public confirmation', 'Eddington’s eclipse expeditions measured apparent stellar shifts near the eclipsed Sun and made relativity famous, although the historical evidence requires nuance.', 'observational-evidence'],
  ['u43-ai-and-theory-discovery', 'epilogue', '1:29:33', 'Could AI rediscover GR?', 'Brown and Dwarkesh ask whether a model could infer relativity from sparse principles and empirical clues rather than being handed the final framework.', 'philosophy'],
  ['u44-necessary-clues', 'epilogue', '1:31:00', 'Which clues constrain the search?', 'Finite light speed and the equivalence principle sharply narrow the space of possible gravitational theories but may not uniquely determine the answer.', 'philosophy'],
  ['u45-consistency-and-known-limits', 'epilogue', '1:33:39', 'Consistency when experiments are inaccessible', 'Without reachable experiments, theory search depends on mathematical consistency, recovery of known limits, and the hope that few consistent candidates exist.', 'philosophy'],
  ['u46-ai-as-explainer', 'epilogue', '1:35:13', 'Superhuman proof and human understanding', 'Brown argues that future systems may not only discover results but also repeatedly search for human-comprehensible explanations.', 'philosophy'],
];

const unitStarts = unitDefinitions.map((definition) => timeToSeconds(definition[2]));
const argumentUnits = unitDefinitions.map((definition, index) => {
  const [id, lessonId, requestedStart, title, summary, role] = definition;
  const selected = fragments.filter((fragment) => fragment.seconds >= unitStarts[index] && fragment.seconds < (unitStarts[index + 1] ?? Infinity));
  if (selected.length === 0) throw new Error(`No fragments selected for ${id}`);
  const nonTeachingTerms = ['Jane Street', 'Crusoe', 'Cursor app', 'cursor.com'];
  const detectedNonTeachingTerms = nonTeachingTerms.filter((term) => selected.some((fragment) => fragment.text.includes(term)));
  return {
    id, lessonId, title, summary, role, requestedStart,
    timestampStart: selected[0].timestamp,
    timestampEnd: selected.at(-1).timestamp,
    startSeconds: selected[0].seconds,
    endSeconds: selected.at(-1).seconds,
    sourceLineStart: selected[0].sourceLineStart,
    sourceLineEnd: selected.at(-1).sourceLineEnd,
    fragmentIds: selected.map((fragment) => fragment.id),
    containsNonTeachingMaterial: detectedNonTeachingTerms.length > 0,
    nonTeachingTerms: detectedNonTeachingTerms,
  };
});

const unitById = new Map(argumentUnits.map((unit) => [unit.id, unit]));

const claimDefinitions = [
  ['c001', 'lesson-1', 'transcript', ['u02-special-relativity-constraint'], 'Special relativity treats the finite speed of light as a fundamental constraint that gravity must respect.', 'Causality language is supplemental when used.'],
  ['c002', 'lesson-1', 'transcript', ['u03-newton-second-law'], 'In Newtonian mechanics, inertial mass measures resistance to acceleration through F = ma.', null],
  ['c003', 'lesson-1', 'transcript', ['u04-newton-gravity-tension'], 'Newtonian gravity uses an inverse-square force proportional to the two masses and appears instantaneous.', null],
  ['c004', 'lesson-1', 'transcript', ['u05-electromagnetic-precedent'], 'Coulomb’s inverse-square law is a static limit of Maxwellian electromagnetism, which is compatible with finite propagation speed.', null],
  ['c005', 'lesson-1', 'transcript', ['u06-attraction-and-force-carrier'], 'Gravity cannot simply copy electromagnetism because like masses attract while like charges repel.', 'Spin-language is optional and supplemental.'],
  ['c006', 'lesson-1', 'transcript', ['u07-mass-as-gravitational-charge'], 'Mass plays the role of gravitational charge, unlike electric charge, which is independent of inertial mass.', null],
  ['c007', 'lesson-1', 'transcript', ['u08-mass-equality-and-free-fall'], 'Gravitational mass and inertial mass are experimentally equal to very high precision.', 'Current precision requires an external citation later.'],
  ['c008', 'lesson-1', 'transcript', ['u08-mass-equality-and-free-fall'], 'When gravitational and inertial mass are equal, the test-body mass cancels and gravitational acceleration is universal.', 'Assumes the Newtonian test-body setup.'],
  ['c009', 'lesson-1', 'gr-supplement', ['u08-mass-equality-and-free-fall'], 'The weak equivalence principle says freely falling test bodies share trajectories when nongravitational effects and self-gravity are negligible.', 'States the scope more precisely than the slogan.'],
  ['c010', 'lesson-2', 'transcript', ['u09-rotating-bucket'], 'Centrifugal force appears in a rotating description but not in the outside inertial description.', null],
  ['c011', 'lesson-2', 'transcript', ['u10-inertial-charge-and-einstein-leap'], 'Inertial forces necessarily scale with inertial mass.', null],
  ['c012', 'lesson-2', 'transcript', ['u10-inertial-charge-and-einstein-leap'], 'The equality of inertial and gravitational mass permits Einstein’s hypothesis that gravity is an inertial effect.', null],
  ['c013', 'lesson-2', 'transcript', ['u11-free-fall-removes-gravity'], 'A freely falling astronaut feels weightless, while a person supported on Earth feels the support force.', null],
  ['c014', 'lesson-2', 'gr-supplement', ['u11-free-fall-removes-gravity'], 'Gravity can be transformed away only locally; tidal relative acceleration remains across an extended region.', 'Required limitation of the elevator analogy.'],
  ['c015', 'lesson-2', 'transcript', ['u12-redefine-straight-motion'], 'Treating gravity as inertial requires revising which spacetime paths count as straight.', null],
  ['c016', 'lesson-3', 'transcript', ['u13-chalk-worldlines'], 'A supported object and a freely falling object trace different paths through a spacetime plot.', null],
  ['c017', 'lesson-3', 'transcript', ['u14-map-and-great-circle'], 'A great-circle route can appear curved on a flat map while being the straightest route on the globe.', null],
  ['c018', 'lesson-3', 'transcript', ['u15-geodesics-and-curvature'], 'Free-falling objects follow geodesics in curved spacetime.', null],
  ['c019', 'lesson-3', 'gr-supplement', ['u15-geodesics-and-curvature'], 'A geodesic is locally extremal or straightest motion, not always a globally shortest path.', 'Prevents overextending the globe analogy.'],
  ['c020', 'lesson-3', 'gr-supplement', ['u15-geodesics-and-curvature'], 'Curvature can be detected intrinsically without embedding spacetime in a higher dimension.', 'Corrects rubber-sheet intuition.'],
  ['c021', 'lesson-4', 'transcript', ['u16-from-insight-to-equations'], 'Einstein needed years to find a mathematical characterization of curved spacetime consistent with his physical insight.', null],
  ['c022', 'lesson-4', 'transcript', ['u17-field-equation-interpretation'], 'The left side of Einstein’s field equation characterizes spacetime curvature and the right side characterizes matter and energy.', null],
  ['c023', 'lesson-4', 'transcript', ['u17-field-equation-interpretation'], 'The stress-energy tensor generalizes the Newtonian mass source to relativistic matter and energy.', null],
  ['c024', 'lesson-4', 'gr-supplement', ['u17-field-equation-interpretation'], 'Stress-energy includes energy density, momentum density, pressure, and stress, not only rest mass.', 'Adds components Brown does not enumerate fully.'],
  ['c025', 'lesson-4', 'transcript', ['u18-gr-slogan-and-reach'], 'Matter tells spacetime how to curve, while curved spacetime determines free motion.', 'Interpretive slogan, not a literal two-step time process.'],
  ['c026', 'lesson-5', 'transcript', ['u19-schwarzschild-solution'], 'The Schwarzschild solution exactly describes spacetime outside a spherically symmetric central mass.', 'State the vacuum exterior and symmetry assumptions.'],
  ['c027', 'lesson-5', 'transcript', ['u20-escape-speed-and-radius'], 'Setting Newtonian escape velocity equal to light speed produces the radius 2GM/c².', null],
  ['c028', 'lesson-5', 'gr-supplement', ['u20-escape-speed-and-radius'], 'The escape-speed calculation is a numerical clue, not the causal derivation of a GR event horizon.', 'Essential guardrail.'],
  ['c029', 'lesson-5', 'transcript', ['u21-lowering-brick-energy'], 'Slowly lowering a brick extracts gravitational potential energy approximately GMm/r in Newtonian gravity.', null],
  ['c030', 'lesson-5', 'transcript', ['u21-lowering-brick-energy'], 'Dividing the extracted Newtonian energy by mc² gives the compactness fraction GM/(rc²).', null],
  ['c031', 'lesson-5', 'transcript', ['u23-over-unity-paradox'], 'Naively extrapolating the Newtonian fraction can suggest extracting more than the brick’s rest energy.', null],
  ['c032', 'lesson-5', 'transcript', ['u23-over-unity-paradox'], 'Recycling such a surplus into new mass would create a perpetual-motion contradiction.', null],
  ['c033', 'lesson-5', 'transcript', ['u24-collapse-blocks-the-machine'], 'The system forms a black hole before the impossible Newtonian cycle can be completed.', 'The exact mechanism is completed in Lesson 6.'],
  ['c034', 'lesson-5', 'gr-supplement', ['u24-collapse-blocks-the-machine'], 'An event horizon is a causal boundary whose interior future-directed signals cannot reach the external region.', 'Replaces escape-speed language with the GR concept.'],
  ['c035', 'lesson-6', 'transcript', ['u25-relativistic-force-correction'], 'The static Schwarzschild description reduces to Newtonian gravity far away and becomes singular for hovering at the horizon.', 'Do not apply hovering acceleration to a free-faller.'],
  ['c036', 'lesson-6', 'transcript', ['u26-static-versus-orbiting'], 'A static observer near a black hole is accelerated, whereas an orbiting or falling observer can be in free fall.', null],
  ['c037', 'lesson-6', 'transcript', ['u27-gravitational-time-dilation'], 'For static Schwarzschild observers, the clock-rate factor relative to infinity is sqrt(1-2GM/(rc²)).', 'Valid outside the horizon for static observers.'],
  ['c038', 'lesson-6', 'transcript', ['u28-redshift-from-pulse-counting'], 'Light climbing outward is received at lower frequency and energy because fewer crests arrive per unit time.', null],
  ['c039', 'lesson-6', 'transcript', ['u29-energy-at-infinity'], 'A local object with rest energy mc² can have a smaller conserved energy value as measured from infinity.', 'Observer and spacetime assumptions must be explicit.'],
  ['c040', 'lesson-6', 'transcript', ['u30-exact-extraction-fraction'], 'The idealized extractable fraction approaches 1 as the release point approaches the horizon.', 'Requires the assumptions in the implementation plan.'],
  ['c041', 'lesson-6', 'transcript', ['u31-black-hole-power-plant'], 'An idealized black-hole lowering process can access a much larger fraction of rest energy than chemical or ordinary nuclear reactions.', null],
  ['c042', 'lesson-6', 'transcript', ['u33-two-observer-question', 'u34-distant-view-of-infall'], 'A distant observer receives increasingly delayed and redshifted signals and does not receive the crossing at finite Schwarzschild time.', 'Do not depict a permanently bright frozen image.'],
  ['c043', 'lesson-6', 'transcript', ['u35-infaller-horizon-and-tides'], 'The infaller crosses a sufficiently large event horizon in finite proper time without a locally singular event at the horizon.', null],
  ['c044', 'lesson-6', 'transcript', ['u35-infaller-horizon-and-tides'], 'Tidal forces at the horizon are weaker for larger black holes.', null],
  ['c045', 'lesson-6', 'gr-supplement', ['u35-infaller-horizon-and-tides'], 'The horizon and curvature singularity are distinct; the horizon can be locally regular while the singularity marks failure of the classical solution.', 'Required distinction.'],
  ['c046', 'lesson-7', 'transcript', ['u36-generic-black-hole-formation'], 'Singularity theorems helped establish black-hole formation as a generic consequence rather than a finely tuned pathology.', 'State theorem assumptions later.'],
  ['c047', 'lesson-7', 'transcript', ['u37-sagittarius-orbits'], 'Stellar orbits around the Galactic center imply a massive, compact, dark central object.', null],
  ['c048', 'lesson-7', 'transcript', ['u38-gravitational-wave-evidence'], 'LIGO observations match signals from compact-object mergers including black-hole binaries.', 'Current event counts require later sourcing.'],
  ['c049', 'lesson-7', 'transcript', ['u39-eht-evidence'], 'EHT observations resolve emission from matter in strong-gravity environments around supermassive black holes.', 'Do not call the bright ring the horizon.'],
  ['c050', 'lesson-7', 'transcript', ['u41-light-bending-prediction'], 'GR predicts deflection of light near the Sun that differs from a simple Newtonian particle estimate.', null],
  ['c051', 'lesson-7', 'transcript', ['u42-eclipse-test'], 'The 1919 eclipse expeditions reported shifts consistent with Einstein’s prediction and drove his public fame.', 'Measurement quality needs historical sourcing.'],
  ['c052', 'lesson-7', 'gr-supplement', ['u37-sagittarius-orbits', 'u38-gravitational-wave-evidence', 'u39-eht-evidence'], 'Confidence in astrophysical black holes comes from converging dynamical, waveform, and imaging evidence.', 'Avoid treating one observation as exhaustive proof.'],
  ['c053', 'epilogue', 'transcript', ['u43-ai-and-theory-discovery', 'u44-necessary-clues'], 'Finite light speed and mass equality are powerful clues but may not uniquely determine GR without more consistency requirements.', null],
  ['c054', 'epilogue', 'transcript', ['u45-consistency-and-known-limits'], 'When experiments are inaccessible, theory search relies on mathematical consistency and recovery of known limits.', null],
  ['c055', 'epilogue', 'transcript', ['u46-ai-as-explainer'], 'Future AI systems may search not only for results but for human-comprehensible explanations.', 'A forecast, not established fact.'],
];

function rangeForUnits(ids) {
  const units = ids.map((id) => unitById.get(id));
  if (units.some((unit) => !unit)) throw new Error(`Unknown unit in ${ids.join(', ')}`);
  return { timestampStart: units[0].timestampStart, timestampEnd: units.at(-1).timestampEnd };
}

const claims = claimDefinitions.map(([id, lessonId, provenanceType, argumentUnitIds, statement, caveat]) => ({
  id,
  lessonId,
  provenanceType,
  statement,
  ...rangeForUnits(argumentUnitIds),
  argumentUnitIds,
  caveat,
  reviewStatus: provenanceType === 'gr-supplement' ? 'requires-external-citation' : 'transcript-mapped',
}));

const boardDefinitions = [
  ['b01-fma', 'lesson-1', ['u03-newton-second-law'], 'high', ['ma=F', 'mass tells you how much'], 'Newton’s second law with force, acceleration, and inertial mass labeled.', 'Clean equation card plus force-to-acceleration diagram.', 'Exact placement and whether Brown wrote F=ma or ma=F are uncertain.'],
  ['b02-newton-gravity', 'lesson-1', ['u04-newton-gravity-tension'], 'high', [`Newton's constant`, 'distance between them squared'], 'Inverse-square gravitational force between source and test masses, including attraction.', 'Two-body diagram with labeled r and equation.', 'Symbol names and sign convention may differ from the original.'],
  ['b03-coulomb-comparison', 'lesson-1', ['u05-electromagnetic-precedent', 'u06-attraction-and-force-carrier'], 'high', ['electrostatic', 'minus sign', 'plus sign'], 'Gravity and electrostatics side by side to compare inverse-square structure and signs.', 'Aligned mass/charge and attraction/repulsion comparison.', 'Constant notation and ordering are unknown.'],
  ['b04-mass-equality-cancellation', 'lesson-1', ['u07-mass-as-gravitational-charge', 'u08-mass-equality-and-free-fall'], 'high', ['inertial mass', 'gravitational mass', 'same mass'], 'Identify m_i and m_g, set them equal, and cancel test-body mass.', 'Three-step derivation with non-color-only cancellation marks.', 'Brown may have used one symbol m rather than subscripts.'],
  ['b05-rotating-bucket', 'lesson-2', ['u09-rotating-bucket', 'u10-inertial-charge-and-einstein-leap'], 'medium', ['bucket', 'centrifugal force', 'pointing positively outwards'], 'Bucket/circle diagram comparing inertial and co-rotating descriptions.', 'Paired-frame diagram with tangent velocity and inward acceleration.', 'Transcript does not fully specify the drawing geometry.'],
  ['b06-free-fall-and-support', 'lesson-2', ['u11-free-fall-removes-gravity', 'u12-redefine-straight-motion'], 'medium', ['astronauts', 'free-floating', 'pushing you into your chair'], 'Compare free-floating astronaut with supported observer on Earth.', 'Elevator/rocket comparison with scale readings and tidal caveat.', 'The elevator may have been spoken rather than drawn here.'],
  ['b07-chalk-worldlines', 'lesson-3', ['u13-chalk-worldlines'], 'high', ['piece of chalk', 'this has to be straight', 'looks straight'], 'Spacetime axes with held-object and thrown/falling chalk paths.', 'Time-up diagram separating coordinate appearance from geodesic interpretation.', 'Axis labels and exact curves are not fully spoken.'],
  ['b08-map-globe-geodesic', 'lesson-3', ['u14-map-and-great-circle', 'u15-geodesics-and-curvature'], 'high', ['San Francisco', 'London', 'Greenland', 'rhumb line'], 'Flat map and globe showing a curved-looking great-circle route.', 'Synchronized map/globe SVG with route comparison.', 'Brown’s hand-drawn continents and projection are unrecoverable.'],
  ['b09-einstein-field-equation', 'lesson-4', ['u17-field-equation-interpretation'], 'high', ['T_(μν)', `Newton's constant`, 'speed of light'], 'Einstein field equation with geometry left and stress-energy right.', 'Semantic plate for G_μν = (8πG/c⁴)T_μν.', 'Transcript supports the teaching form without a cosmological term.'],
  ['b10-escape-and-schwarzschild-radius', 'lesson-5', ['u20-escape-speed-and-radius'], 'high', ['escape velocity', '2GM', 'divided by c²'], 'Escape-energy relation leading to v_esc and r_s=2GM/c².', 'Visually separate the Newtonian clue from the GR interpretation.', 'Intermediate algebra is not fully transcribed.'],
  ['b11-brick-pulley', 'lesson-5', ['u21-lowering-brick-energy', 'u23-over-unity-paradox'], 'high', ['brick', 'pulley system', 'slowly lower'], 'Central mass, brick m, rope/pulley, radius r, and distant work reservoir.', 'Energy-flow schematic paired with equations.', 'Mechanical layout and pulley placement are inferred.'],
  ['b12-collapse-before-surplus', 'lesson-5', ['u24-collapse-blocks-the-machine'], 'medium', ['formed a black hole'], 'Compactness sequence showing horizon formation before the over-unity cycle.', 'Before/after causal-boundary diagram.', 'Transcript does not specify a complete collapse drawing.'],
  ['b13-static-acceleration', 'lesson-6', ['u25-relativistic-force-correction', 'u26-static-versus-orbiting'], 'high', [`everything we've written down on the board`, 'large r', `Newton's force law`], 'Relativistic static-force expression and its Newtonian large-r limit.', 'Equation plot with domain and hovering/free-fall distinction.', 'Exact notation needs formula verification before rendering.'],
  ['b14-static-time-factor', 'lesson-6', ['u27-gravitational-time-dilation'], 'high', ['gravitational time dilation', 'time interval', 'square root'], 'Static Schwarzschild time-dilation factor comparing near and distant clocks.', 'Clock pair, pulse train, and dτ/dt equation.', 'Numerator/denominator arrangement must match the spoken comparison.'],
  ['b15-redshift-pulses', 'lesson-6', ['u28-redshift-from-pulse-counting'], 'medium', ['lower frequency', 'redshifted'], 'Wave crests emitted locally and received with larger spacing far away.', 'Linked clock, pulse, and wavelength diagram.', 'Original board may have used only an equation.'],
  ['b16-extraction-formula', 'lesson-6', ['u29-energy-at-infinity', 'u30-exact-extraction-fraction'], 'high', ['how much energy', 'exactly this formula', 'event horizon'], 'Energy at infinity and extractable fraction as functions of radius.', 'Graph with Newtonian expansion and horizon limit.', 'Final notation needs formula verification in Lesson 6.'],
  ['b17-two-observer-horizon', 'lesson-6', ['u33-two-observer-question', 'u34-distant-view-of-infall', 'u35-infaller-horizon-and-tides'], 'medium', ['two different perspectives', 'never see you cross', 'sail across'], 'Paired distant-observer and infaller views of one crossing.', 'Three-panel signals/spacetime/proper-time diagram.', 'Pedagogical synthesis rather than one verified board image.'],
  ['b18-evidence-triptych', 'lesson-7', ['u37-sagittarius-orbits', 'u38-gravitational-wave-evidence', 'u39-eht-evidence', 'u41-light-bending-prediction'], 'medium', ['stars around it', 'LIGO', 'radio emissions', 'light'], 'Evidence panels for orbits, wave strain, near-horizon emission, and bent light.', 'Four evidence cards distinguishing observation from inference.', 'Some visuals may have been production inserts, not board work.'],
];

const fragmentsById = new Map(fragments.map((fragment) => [fragment.id, fragment]));
const boardReconstructions = boardDefinitions.map(([id, lessonId, argumentUnitIds, confidence, clueTerms, likelyBoardContent, teachingRedraw, uncertainty]) => {
  const unitFragments = argumentUnitIds.flatMap((unitId) => unitById.get(unitId).fragmentIds.map((fragmentId) => fragmentsById.get(fragmentId)));
  const transcriptClues = clueTerms.map((term) => {
    const match = unitFragments.find((fragment) => fragment.text.toLowerCase().includes(term.toLowerCase()));
    if (!match) return { term, fragmentId: null, timestamp: null, excerpt: null };
    const lower = match.text.toLowerCase();
    const termIndex = lower.indexOf(term.toLowerCase());
    const excerptStart = Math.max(0, termIndex - 140);
    const excerptEnd = Math.min(match.text.length, termIndex + term.length + 220);
    return { term, fragmentId: match.id, timestamp: match.timestamp, excerpt: match.text.slice(excerptStart, excerptEnd) };
  });
  return {
    id, lessonId, provenanceType: 'board-reconstruction', confidence, argumentUnitIds,
    timestampStart: unitById.get(argumentUnitIds[0]).timestampStart,
    timestampEnd: unitById.get(argumentUnitIds.at(-1)).timestampEnd,
    transcriptClues, likelyBoardContent, teachingRedraw, uncertainty,
    reviewStatus: transcriptClues.every((clue) => clue.fragmentId) ? 'mapped' : 'needs-clue-review',
  };
});

fs.writeFileSync(path.join(sourceDir, 'argument_units.json'), `${JSON.stringify(argumentUnits, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(sourceDir, 'claims.json'), `${JSON.stringify(claims, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(sourceDir, 'board_reconstructions.json'), `${JSON.stringify(boardReconstructions, null, 2)}\n`, 'utf8');

const registryPath = path.join(sourceDir, 'source_registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
registry.derivedArtifacts = [
  ...registry.derivedArtifacts.filter((artifact) => !['argument-units', 'scientific-claims', 'board-reconstructions', 'lesson-1-vertical-slice'].includes(artifact.id)),
  {
    id: 'argument-units',
    path: 'source/argument_units.json',
    derivedFrom: 'timestamp-fragments',
    transformation: 'Human-curated grouping into complete lesson arguments',
    recordCount: argumentUnits.length,
  },
  {
    id: 'scientific-claims',
    path: 'source/claims.json',
    derivedFrom: 'argument-units',
    transformation: 'Scientific claim extraction with provenance and caveats',
    recordCount: claims.length,
  },
  {
    id: 'board-reconstructions',
    path: 'source/board_reconstructions.json',
    derivedFrom: 'argument-units',
    transformation: 'Likely board-state reconstruction with transcript clues and confidence',
    recordCount: boardReconstructions.length,
  },
  {
    id: 'lesson-1-vertical-slice',
    path: 'source/lesson1_vertical_slice.md',
    derivedFrom: ['argument-units', 'scientific-claims', 'board-reconstructions'],
    transformation: 'Implementation brief for the first learner-facing slice',
  },
];
fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({
  argumentUnits: argumentUnits.length,
  claims: claims.length,
  boardReconstructions: boardReconstructions.length,
  unresolvedBoardClues: boardReconstructions.flatMap((board) => board.transcriptClues.filter((clue) => !clue.fragmentId).map((clue) => `${board.id}:${clue.term}`)),
  lessonCounts: Object.fromEntries([...new Set(argumentUnits.map((unit) => unit.lessonId))].map((lessonId) => [lessonId, argumentUnits.filter((unit) => unit.lessonId === lessonId).length])),
}, null, 2));
