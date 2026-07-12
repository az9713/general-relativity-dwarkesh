/** Canonical lesson content for the seven-lesson course. */

export const lessons = {
  'lesson-1': {
    id: 'lesson-1',
    number: 1,
    title: 'The Coincidence Einstein Took Seriously',
    insight:
      'All bodies fall alike because gravity couples universally — the equality of inertial and gravitational mass is a deep clue, not a boring cancellation.',
    minutes: 30,
    brownQuestion: {
      text: 'Can an ordinary learner see the central insight of general relativity without taking the full graduate course?',
      start: '0:00',
      end: '2:00',
    },
    sections: [
      {
        id: 's1-purpose',
        title: "Brown's question",
        html: `
          <p>Adam Brown opens with a practical challenge: extract the <em>essence</em> of Einstein’s insight about gravity without a full GR curriculum.
          ${''}
          The lecture spine that follows is a single conceptual chain — from special relativity’s speed limit, through Newton’s laws and a striking mass coincidence, to curved spacetime, black holes, and evidence.</p>
        `,
        provenance: { type: 'transcript', start: '0:00', end: '2:00', detail: 'Course purpose and promise of the central insight.' },
      },
      {
        id: 's1-sr',
        title: 'The constraint from special relativity',
        html: `
          <p>Special relativity treats the finite speed of light as a fundamental constraint. Instantaneous action-at-a-distance sits uneasily with that constraint.
          Newtonian gravity, as usually written, updates forces immediately across space. That is a clue that Newton’s theory cannot be the final word once relativity is taken seriously.</p>
          <p class="faint">We do not need the Lorentz transformation in this lesson — only the speed-of-light constraint as motivation.</p>
        `,
        provenance: { type: 'transcript', start: '2:07', end: '4:26', detail: 'SR constraint on gravity.' },
      },
      {
        id: 's1-two-masses',
        title: 'Two roles for mass',
        html: `
          <p>Newton’s second law introduces <strong>inertial mass</strong> <span data-math="m_i"></span>: how much an object resists acceleration.</p>
          <div class="equation-card">
            <div class="eq" data-math="F = m_i a" data-display="true"></div>
            <table class="symbol-table">
              <tr><th>Symbol</th><th>Meaning</th></tr>
              <tr><td><span data-math="F"></span></td><td>Net force</td></tr>
              <tr><td><span data-math="m_i"></span></td><td>Inertial mass (resistance to acceleration)</td></tr>
              <tr><td><span data-math="a"></span></td><td>Acceleration</td></tr>
            </table>
          </div>
          <p>Newtonian gravity introduces another role: <strong>gravitational mass</strong> <span data-math="m_g"></span>, the “charge” that couples to the gravitational field of a source mass <span data-math="M"></span>.</p>
          <div class="equation-card">
            <div class="eq" data-math="F_g = -\\frac{G M m_g}{r^2}" data-display="true"></div>
          </div>
          <p>Do <em>not</em> assume these masses are equal until the empirical coincidence is stated. They play conceptually different roles.</p>
        `,
        provenance: { type: 'transcript', start: '4:41', end: '7:20', detail: 'F=ma and Newtonian gravity.' },
        boards: ['b01-fma', 'b02-newton-gravity'],
      },
      {
        id: 's1-em',
        title: 'Why electromagnetism makes the coincidence visible',
        html: `
          <p>Electrostatics has a similar inverse-square structure, but electric charge is independent of inertial mass. Different charge-to-mass ratios produce different accelerations in the same electric field.</p>
          <p>Gravity also differs in sign structure: like masses attract, while like charges repel. Brown uses that contrast to show why gravity cannot simply copy electromagnetism’s force-carrier story without a new idea.</p>
        `,
        provenance: { type: 'transcript', start: '7:32', end: '12:48', detail: 'Coulomb comparison and attraction vs repulsion.' },
        boards: ['b03-coulomb-comparison'],
      },
      {
        id: 's1-cancel',
        title: 'Perform the cancellation only after naming the equality',
        html: `
          <p>Write the two laws together:</p>
          <div class="equation-card">
            <div class="eq" data-math="m_i a = \\frac{G M m_g}{r^2}" data-display="true"></div>
            <p>Using the empirical equality <span data-math="m_i = m_g"></span>:</p>
            <div class="eq" data-math="a = \\frac{G M}{r^2}" data-display="true"></div>
          </div>
          <p><strong>What disappeared:</strong> the identity and mass of the test body.</p>
          <p><strong>What did not:</strong> the source mass, distance, initial conditions, nongravitational forces, and limits of the test-body approximation.</p>
          <div class="callout matter">
            <p class="insight">Target insight: all bodies fall alike because gravity couples universally — not because “gravity pulls equally hard on everything.”</p>
          </div>
          <p><span class="badge" data-prov="gr-supplement" data-provenance="gr-supplement" data-title="Weak equivalence principle" data-detail="The weak equivalence principle makes precise the idea that free-fall trajectories of test bodies are independent of composition. Scope limits apply (self-gravity, spin, nongravitational forces). Requires external citation in formal publication.">GR supplement</span> Precision wording of the weak equivalence principle is established GR background beyond Brown’s informal phrasing.</p>
        `,
        provenance: { type: 'transcript', start: '12:58', end: '16:36', detail: 'Inertial vs gravitational mass and free fall.' },
        boards: ['b04-mass-equality-cancellation'],
        app: 'mass-cancellation',
      },
      {
        id: 's1-bridge',
        title: 'End on the clue, not the final theory',
        html: `
          <p>Mass equality does <strong>not</strong> prove curved spacetime. It makes possible Einstein’s next question: could gravity be an inertial effect? That bridge leads to Lesson 2.</p>
          <div class="misconception">
            <p><strong>Misconception:</strong> “The masses cancel because they were defined to be the same.”</p>
            <p><strong>Correction:</strong> They play different conceptual roles. Their equality is an empirical fact requiring explanation.</p>
          </div>
          <div class="misconception">
            <p><strong>Misconception:</strong> “Gravity pulls equally hard on all objects.”</p>
            <p><strong>Correction:</strong> In Newton’s formula it pulls harder on a more massive test body; that body also has more inertia, leaving the same acceleration.</p>
          </div>
        `,
      },
    ],
    mathRungs: {
      a: 'Words: heavier objects feel more gravitational force but also resist acceleration more. When those scale together, free-fall acceleration matches.',
      b: 'Algebra: from F = m_i a and F_g = G M m_g / r², equality m_i = m_g yields a = G M / r².',
      c: 'Theory window (optional): the weak equivalence principle is the modern name for the composition-independence of free fall for test bodies; Einstein elevates related ideas into the equivalence principle linking gravity and acceleration.',
    },
    teachBack:
      'Explain to a Newtonian physicist why equality of inertial and gravitational mass is surprising. Use the electric-charge comparison and distinguish force from acceleration.',
    questions: [
      {
        id: 'l1-q1',
        prompt: 'Why does a larger gravitational force on a heavier object not imply a larger gravitational acceleration?',
        choices: [
          'Because gravity does not exert forces',
          'Because inertial mass grows in proportion, cancelling in a = F/m when m_i = m_g',
          'Because heavier objects have more air resistance',
          'Because Newton defined acceleration to be universal',
        ],
        answer: 1,
        explain:
          'Force is larger, but F = m_i a means acceleration is force per inertial mass. With m_i = m_g, a is independent of the test mass.',
      },
      {
        id: 'l1-q2',
        prompt: 'Which mass appears in F = ma, and which in Newton’s gravitational force?',
        choices: [
          'Both use only gravitational mass',
          'F=ma uses inertial mass; gravity uses gravitational mass',
          'F=ma uses gravitational mass; gravity uses inertial mass',
          'Neither formula uses mass',
        ],
        answer: 1,
        explain: 'Inertial mass resists acceleration; gravitational mass is the coupling “charge” in Newton’s gravity law.',
      },
      {
        id: 'l1-q3',
        prompt: 'Does the cancellation prove that gravity is curved spacetime?',
        choices: [
          'Yes — it is equivalent to Einstein’s field equation',
          'No — it is a clue motivating equivalence, not the full theory',
          'Yes — Newton already had curved spacetime',
          'No — because masses never cancel',
        ],
        answer: 1,
        explain: 'The equality motivates Einstein’s next steps; curved spacetime and the field equation require further reasoning.',
      },
    ],
  },

  'lesson-2': {
    id: 'lesson-2',
    number: 2,
    title: "Einstein's Happiest Thought",
    insight: 'Locally, free fall removes gravity; standing still on Earth is the accelerated state.',
    minutes: 35,
    brownQuestion: {
      text: 'If free fall feels like “no force,” could gravity itself be an inertial effect?',
      start: '16:36',
      end: '18:00',
    },
    sections: [
      {
        id: 's2-forces',
        title: 'Real forces versus inertial forces',
        html: `
          <p>Some “forces” appear only because we insist on a non-inertial description — for example, centrifugal force in a rotating frame. They are bookkeeping for using the wrong standard of motion.</p>
          <p>Einstein’s happiest thought links gravity to this idea: in free fall, the usual weight sensation vanishes. Locally, gravity can be transformed away by changing the frame.</p>
        `,
        provenance: { type: 'transcript', start: '16:36', end: '22:00', detail: 'Inertial forces and free fall.' },
      },
      {
        id: 's2-elevator',
        title: 'Elevator and equivalence (with care)',
        html: `
          <p>An accelerating rocket without gravity can mimic weight. A freely falling elevator near Earth can mimic weightlessness. Local experiments may not tell the difference.</p>
          <div class="callout warning">
            <strong>Local, not global.</strong> Enlarge the laboratory and tidal differences appear. Equivalence is a local principle; it does not say gravity is identical to acceleration everywhere and forever.
          </div>
        `,
        provenance: { type: 'gr-supplement', detail: 'Elevator thought experiment as standard EP context; Brown assumes free-fall weightlessness.' },
        app: 'elevator',
      },
      {
        id: 's2-insight',
        title: 'Who is accelerating?',
        html: `
          <p>On Earth’s surface you feel weight because the ground prevents free fall — in GR language, you are accelerated. The freely falling body follows the natural motion.</p>
          <div class="misconception">
            <p><strong>Misconception:</strong> “Standing still on Earth is the inertial state.”</p>
            <p><strong>Correction:</strong> Feeling weight is the clue you are not inertial; free fall is.</p>
          </div>
        `,
      },
    ],
    mathRungs: {
      a: 'Words: free fall feels force-free; weight is what non-free-fall feels like.',
      b: 'Algebra: in a uniformly accelerating cabin, effective g_eff ≈ a; this is an analogy for local gravity, not a global field theory.',
      c: 'Theory: the equivalence principle (in careful modern forms) relates local free-fall frames to special-relativistic physics.',
    },
    teachBack:
      'Distinguish weight, gravity, acceleration, and free fall. State why equivalence is local rather than global.',
    questions: [
      {
        id: 'l2-q1',
        prompt: 'In free fall (ideal, local), a scale under your feet reads approximately…',
        choices: ['Your full weight', 'Zero', 'Infinite', 'The black-hole mass'],
        answer: 1,
        explain: 'You and the scale fall together; the contact force vanishes locally.',
      },
      {
        id: 'l2-q2',
        prompt: 'Why does enlarging the elevator threaten perfect equivalence?',
        choices: [
          'Because light slows down',
          'Because tidal (differential) gravity becomes detectable',
          'Because mass becomes negative',
          'Because Newton forbade large rooms',
        ],
        answer: 1,
        explain: 'Nonuniform gravity produces relative accelerations across an extended body — tides.',
      },
      {
        id: 'l2-q3',
        prompt: 'Who is “accelerated” while standing on Earth (GR reading)?',
        choices: ['The freely falling apple', 'You, pushed by the ground', 'Only photons', 'Nobody ever'],
        answer: 1,
        explain: 'The ground prevents geodesic free fall; proper acceleration is nonzero.',
      },
    ],
  },

  'lesson-3': {
    id: 'lesson-3',
    number: 3,
    title: 'Gravity Becomes Geometry',
    insight:
      'Gravity does not deflect a body away from natural motion; matter changes what natural straight motion is.',
    minutes: 40,
    brownQuestion: {
      text: 'If free fall is natural motion, what does gravity do instead of “pulling”? ',
      start: '22:00',
      end: '24:00',
    },
    sections: [
      {
        id: 's3-worldlines',
        title: 'Worldlines and free fall',
        html: `
          <p>A worldline is a path through spacetime. In a free-fall frame, free motion looks straight. In Earth-fixed height–time plots, free fall looks curved — but that graph curvature is not automatically spacetime curvature.</p>
        `,
        app: 'worldline',
        provenance: { type: 'transcript', start: '22:00', end: '28:00', detail: 'Chalk / free-fall geometry discussion.' },
      },
      {
        id: 's3-globe',
        title: 'Maps, globes, and geodesics',
        html: `
          <p>On a flat map, the shortest real flight path between distant cities can look curved. On the globe, that path is a great circle — a geodesic of the sphere’s geometry.</p>
          <div class="callout warning">
            This is an <strong>analogy</strong> for “straightest paths in curved geometry.” Earth’s surface is not four-dimensional spacetime, and the rubber-sheet picture is not a substitute for intrinsic curvature.
          </div>
        `,
        app: 'map-globe',
      },
      {
        id: 's3-insight',
        title: 'What gravity becomes',
        html: `
          <p>Matter and energy shape spacetime geometry. Free-falling bodies follow geodesics of that geometry. Gravity is not an extra force yanking objects off straight lines in a fixed stage — the stage’s idea of “straight” changes.</p>
          <div class="misconception">
            <p><strong>Misconception:</strong> “A curved line on a spacetime graph proves curved spacetime.”</p>
            <p><strong>Correction:</strong> Coordinates can make geodesics look curved; curvature is about geometry, not one plotting choice.</p>
          </div>
        `,
      },
    ],
    mathRungs: {
      a: 'Words: geodesics are the straightest available paths given the geometry.',
      b: 'Algebra: on a sphere, great-circle distance uses spherical trigonometry; flat-map straight lines are chart artifacts.',
      c: 'Theory: metrics define intervals; geodesic equations extremize proper time for free fall (timelike).',
    },
    teachBack:
      'Explain how a path that looks curved in coordinates can be the straightest path in the actual geometry. Avoid the rubber sheet as literal spacetime.',
    questions: [
      {
        id: 'l3-q1',
        prompt: 'A great-circle route looks curved on a flat map because…',
        choices: [
          'Pilots enjoy curves',
          'The map’s geometry differs from the globe’s',
          'Gravity bends airplanes sideways',
          'Longitude is imaginary',
        ],
        answer: 1,
        explain: 'The chart distorts the sphere; the geodesic is straightest on the globe.',
      },
      {
        id: 'l3-q2',
        prompt: 'In the geometric view of gravity, free fall is…',
        choices: [
          'Motion under a real Newtonian force always',
          'Natural (geodesic) motion in curved spacetime',
          'Proof that mass is negative',
          'Impossible near Earth',
        ],
        answer: 1,
        explain: 'Free fall follows geodesics; weight is non-geodesic acceleration.',
      },
      {
        id: 'l3-q3',
        prompt: 'Why is the rubber-sheet analogy dangerous if taken literally?',
        choices: [
          'It uses the wrong color',
          'It suggests an external down and embedding that can mislead about intrinsic spacetime curvature',
          'Einstein forbade sheets',
          'It only works for charge',
        ],
        answer: 1,
        explain: 'Embedding diagrams can help but often smuggle in an external gravity and a higher-dimensional stage.',
      },
    ],
  },

  'lesson-4': {
    id: 'lesson-4',
    number: 4,
    title: 'The Field Equation Without Tensor Calculus',
    insight: 'The Einstein equation is a feedback law between matter/energy and spacetime geometry.',
    minutes: 35,
    brownQuestion: {
      text: 'What equation links the stuff in the universe to the curvature of spacetime?',
      start: '28:00',
      end: '30:00',
    },
    sections: [
      {
        id: 's4-sides',
        title: 'Two sides of one law',
        html: `
          <div class="equation-card">
            <div class="eq" data-math="G_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}" data-display="true"></div>
            <table class="symbol-table">
              <tr><th>Side</th><th>Meaning</th></tr>
              <tr><td><span data-math="G_{\\mu\\nu}"></span></td><td>Geometry: how spacetime is curved (Einstein tensor)</td></tr>
              <tr><td><span data-math="T_{\\mu\\nu}"></span></td><td>Matter/energy: energy, momentum, pressure, stress</td></tr>
              <tr><td><span data-math="8\\pi G/c^4"></span></td><td>Coupling: gravity is weak in ordinary units</td></tr>
            </table>
          </div>
          <p>Slogan form (Wheeler): <em>Matter tells spacetime how to curve; curved spacetime tells matter how to move.</em></p>
        `,
        provenance: { type: 'transcript', start: '28:00', end: '35:00', detail: 'Field equation discussed conceptually.' },
        app: 'field-equation',
      },
      {
        id: 's4-not',
        title: 'What the equation does not mean',
        html: `
          <ul class="clean">
            <li>It does not say only rest mass gravitate — energy, momentum, pressure, and stress count.</li>
            <li>Writing the equation down does not mean you can solve arbitrary spacetimes by hand.</li>
            <li>It is not a claim that “space is a fabric” in a rubber-sheet sense.</li>
          </ul>
          <div class="misconception">
            <p><strong>Misconception:</strong> “Only mass appears in stress-energy.”</p>
            <p><strong>Correction:</strong> Pressure and other stresses gravitate in GR.</p>
          </div>
        `,
      },
    ],
    mathRungs: {
      a: 'Words: left side geometry, right side sources; mutual feedback.',
      b: 'Algebra: the constant 8πG/c⁴ sets strength; recovering Newton in the weak, slow limit is a consistency requirement (not derived here).',
      c: 'Theory: tensors encode multi-component relationships; Bianchi identities relate to local conservation structure.',
    },
    teachBack:
      'Interpret both sides of Einstein’s equation without claiming you can solve arbitrary spacetimes.',
    questions: [
      {
        id: 'l4-q1',
        prompt: 'T<sub>μν</sub> includes…',
        choices: ['Only rest mass density', 'Energy, momentum, pressure, stress', 'Only electric charge', 'Only temperature'],
        answer: 1,
        explain: 'Stress-energy is broader than “mass density.”',
      },
      {
        id: 'l4-q2',
        prompt: 'G<sub>μν</sub> lives on which side of the storytelling slogan?',
        choices: ['Matter side', 'Geometry side', 'Neither', 'Only black holes'],
        answer: 1,
        explain: 'G encodes curvature/geometry response.',
      },
      {
        id: 'l4-q3',
        prompt: 'This course expects you to…',
        choices: [
          'Derive the Einstein tensor from scratch',
          'Interpret the equation’s meaning and limits',
          'Solve binary black hole mergers analytically',
          'Reject all experiments',
        ],
        answer: 1,
        explain: 'Conceptual interpretation without full tensor calculus.',
      },
    ],
  },

  'lesson-5': {
    id: 'lesson-5',
    number: 5,
    title: 'Why a Black Hole Must Be Black',
    insight: 'The horizon is a causal boundary, not a material surface with an unusually strong pull.',
    minutes: 40,
    brownQuestion: {
      text: 'Why can’t light escape from a black hole — and what does “surface” even mean here?',
      start: '35:00',
      end: '40:00',
    },
    sections: [
      {
        id: 's5-newton',
        title: 'Newtonian escape speed as a clue',
        html: `
          <p>Setting Newtonian escape speed to <span data-math="c"></span> yields a radius of order <span data-math="2GM/c^2"></span>. That is a historical and heuristic clue — <strong>not</strong> a GR proof.</p>
        `,
        provenance: { type: 'transcript', detail: 'Escape velocity / dark star intuition in lecture.' },
        app: 'schwarzschild',
      },
      {
        id: 's5-rs',
        title: 'Schwarzschild radius',
        html: `
          <div class="equation-card">
            <div class="eq" data-math="r_s = \\frac{2GM}{c^2}" data-display="true"></div>
            <p>For the Schwarzschild black hole, the event horizon sits at <span data-math="r = r_s"></span> in standard coordinates. It is a causal boundary: future-directed paths from inside cannot reach distant observers.</p>
          </div>
        `,
      },
      {
        id: 's5-brick',
        title: 'Brick-and-pulley energy extraction',
        html: `
          <p>Brown’s energy-accounting argument: if you could lower a mass toward the hole and retrieve energy with a rope, allowing escape from inside the horizon would open contradictions in the idealized bookkeeping. The horizon protects a consistent causal structure.</p>
        `,
        app: 'brick',
      },
      {
        id: 's5-not-surface',
        title: 'Not a material surface',
        html: `
          <div class="misconception">
            <p><strong>Misconception:</strong> “The horizon is a hard shell you hit.”</p>
            <p><strong>Correction:</strong> It is a causal boundary. Local crossing can be uneventful (tides aside). The singularity is a separate notion.</p>
          </div>
        `,
      },
    ],
    mathRungs: {
      a: 'Words: horizon = no escape to infinity; not a brick wall.',
      b: 'Algebra: r_s = 2GM/c²; static redshift factor √(1−r_s/r) for r > r_s.',
      c: 'Theory: Killing horizons, coordinate singularities vs physical singularities.',
    },
    teachBack:
      'Distinguish the Newtonian dark-star clue from the GR causal meaning of an event horizon.',
    questions: [
      {
        id: 'l5-q1',
        prompt: 'Newtonian v_esc = c…',
        choices: [
          'Proves GR black holes rigorously',
          'Is a clue that yields the right scale r ~ 2GM/c²',
          'Shows horizons are solid',
          'Fails for the Sun only',
        ],
        answer: 1,
        explain: 'Heuristic scale, not a full GR derivation.',
      },
      {
        id: 'l5-q2',
        prompt: 'The event horizon is best described as…',
        choices: ['A metal shell', 'A causal boundary', 'The singularity', 'A place time stops for everyone'],
        answer: 1,
        explain: 'Causal structure, not material surface.',
      },
      {
        id: 'l5-q3',
        prompt: 'Horizon and singularity are…',
        choices: ['The same surface', 'Distinct concepts', 'Both made of neutrons', 'Only Newtonian ideas'],
        answer: 1,
        explain: 'Horizon is causal boundary; singularity is a separate breakdown of classical geometry (deep inside in Schwarzschild).',
      },
    ],
  },

  'lesson-6': {
    id: 'lesson-6',
    number: 6,
    title: 'Clocks, Energy, and Horizon Crossing',
    insight: 'Distant and infalling observer stories differ but do not contradict each other.',
    minutes: 40,
    brownQuestion: {
      text: 'Does time stop at the horizon? Who sees what?',
      start: '50:00',
      end: '55:00',
    },
    sections: [
      {
        id: 's6-redshift',
        title: 'Gravitational redshift and time dilation',
        html: `
          <p>Clocks deeper in a gravitational well tick slowly relative to distant static clocks. Light climbing out loses energy — redshift.</p>
          <div class="equation-card">
            <div class="eq" data-math="\\sqrt{1 - \\frac{2GM}{rc^2}} = \\sqrt{1 - \\frac{r_s}{r}}" data-display="true"></div>
            <p class="faint">Static observers outside the horizon only. Not for free-fall horizon crossing.</p>
          </div>
        `,
        app: 'clock',
      },
      {
        id: 's6-dual',
        title: 'Two observer stories',
        html: `
          <p>Distant observers see signals from an infaller become later, redder, and fainter. The infaller reaches the horizon in finite proper time. There is no permanently bright frozen person hanging on the horizon forever.</p>
        `,
        app: 'dual-observer',
      },
      {
        id: 's6-tides',
        title: 'Tides, size, and the singularity',
        html: `
          <p>Tidal forces scale roughly as <span data-math="GM L / r^3"></span>. At the horizon of a stellar-mass hole, tides can be lethal; for supermassive holes, horizon tides can be mild. The singularity is not the same as the horizon.</p>
          <div class="misconception">
            <p><strong>Misconception:</strong> “The infaller sees the entire future of the universe.”</p>
            <p><strong>Correction:</strong> That popular claim is not a generic reliable slogan; treat horizon crossing with care and avoid comic-book omniscience.</p>
          </div>
        `,
        app: 'tidal',
      },
    ],
    mathRungs: {
      a: 'Words: local vs distant measurements; fading vs finite proper time.',
      b: 'Algebra: static factor √(1−r_s/r); tidal Δa ≈ 2GML/r³.',
      c: 'Theory: coordinate time vs proper time; horizon-regular coordinates.',
    },
    teachBack:
      'Reconcile delayed, redshifted distant signals with finite proper-time horizon crossing. Distinguish horizon from singularity.',
    questions: [
      {
        id: 'l6-q1',
        prompt: 'Static redshift formulas at r = r_s…',
        choices: [
          'Apply unchanged to free-fall observers',
          'Break down / are not for free-fall crossing',
          'Prove time stops for the infaller',
          'Equal zero tides',
        ],
        answer: 1,
        explain: 'Static observers cannot sit at the horizon; free-fall is different.',
      },
      {
        id: 'l6-q2',
        prompt: 'Larger black holes at their horizons tend to have…',
        choices: ['Stronger tides', 'Weaker tides', 'No horizons', 'Negative mass'],
        answer: 1,
        explain: 'Tides at r ~ r_s weaken as mass grows.',
      },
      {
        id: 'l6-q3',
        prompt: 'A permanently bright frozen infaller forever is…',
        choices: ['Exact GR', 'A misleading popular image', 'Required by EHT', 'Newton’s law'],
        answer: 1,
        explain: 'Signals fade and redshift; no eternal bright freeze-frame.',
      },
    ],
  },

  'lesson-7': {
    id: 'lesson-7',
    number: 7,
    title: 'How Nature Answers Back',
    insight: 'GR survives very different empirical tests — elegance alone is not the story.',
    minutes: 35,
    brownQuestion: {
      text: 'What observations force us to take black holes and GR seriously?',
      start: '1:10:00',
      end: '1:20:00',
    },
    sections: [
      {
        id: 's7-orbits',
        title: 'Stellar orbits near Sagittarius A*',
        html: `
          <p>Stars orbiting the galactic center imply a compact massive object of millions of solar masses. Orbits constrain mass; they do not alone prove every horizon theorem.</p>
        `,
        app: 'orbit',
        provenance: { type: 'gr-supplement', detail: 'Observational GR evidence; calibrate with current literature when publishing numbers.' },
      },
      {
        id: 's7-gw',
        title: 'Gravitational waves',
        html: `
          <p>Merging compact objects radiate spacetime ripples detected by instruments such as LIGO/Virgo/KAGRA. Waveforms encode masses, spins, and strong-field dynamics — independent of electromagnetic images.</p>
        `,
      },
      {
        id: 's7-eht',
        title: 'Event Horizon Telescope',
        html: `
          <p>EHT images show ring-like emission around compact objects consistent with photon-ring / shadow structure in GR models.</p>
          <div class="misconception">
            <p><strong>Misconception:</strong> “EHT photographed the horizon itself.”</p>
            <p><strong>Correction:</strong> It images radio emission and a shadow/photon-ring structure related to strong lensing near a compact object — not a snapshot of a material horizon surface.</p>
          </div>
        `,
      },
      {
        id: 's7-light',
        title: 'Light bending and 1919',
        html: `
          <p>Weak-field light deflection <span data-math="\\alpha \\approx 4GM/(bc^2)"></span> is twice the naive Newtonian corpuscle value. The 1919 eclipse measurements were historically pivotal (with real experimental caveats).</p>
        `,
        app: 'light-bending',
      },
      {
        id: 's7-evidence',
        title: 'What counts as evidence',
        html: `
          <p>Prediction, retrodiction, independent channels, and calibrated uncertainties all matter. GR is constrained by solar-system tests, binary pulsars, cosmology, waves, and black-hole imaging — different regimes, shared theory.</p>
        `,
      },
    ],
    mathRungs: {
      a: 'Words: independent experiments converge on compact mass and strong-field GR.',
      b: 'Algebra: M ≈ 4π²a³/(G T²); α ≈ 4GM/(b c²).',
      c: 'Theory: parameterized post-Newtonian tests; waveform templates.',
    },
    teachBack:
      'State what stellar orbits, gravitational waves, EHT observations, and light bending each establish — and do not establish.',
    questions: [
      {
        id: 'l7-q1',
        prompt: 'Stellar orbits near Sgr A* primarily constrain…',
        choices: ['The color of the event horizon', 'Mass and compactness scale of the central object', 'Newton’s birthday', 'Only dark matter filaments'],
        answer: 1,
        explain: 'Dynamics give mass; horizon micro-physics needs more.',
      },
      {
        id: 'l7-q2',
        prompt: 'EHT’s ring is best described as…',
        choices: [
          'A photo of a solid horizon shell',
          'Emission/lensing structure near a compact object',
          'Proof time stops everywhere',
          'A Newtonian comet',
        ],
        answer: 1,
        explain: 'Shadow/photon-region related imaging, not a material surface photo.',
      },
      {
        id: 'l7-q3',
        prompt: 'Why cite multiple evidence channels?',
        choices: [
          'Because one slogan is enough',
          'Independent tests reduce the chance a single method misleads',
          'GR forbids experiments',
          'Only history matters',
        ],
        answer: 1,
        explain: 'Converging evidence across regimes strengthens the case.',
      },
    ],
  },
};
