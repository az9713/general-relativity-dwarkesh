/** Physical constants (SI) used by interactive labs. */
export const G = 6.6743e-11;
export const C = 299792458;
export const SOLAR_MASS = 1.98847e30;
export const EARTH_MASS = 5.9722e24;
export const EARTH_RADIUS = 6.371e6;
export const SUN_RADIUS = 6.96e8;
export const SAGITTARIUS_A_MASS = 4.3e6 * SOLAR_MASS;

export const STORAGE_KEYS = {
  progress: 'gr-course-progress-v1',
  prefs: 'gr-course-prefs-v1',
  predictions: 'gr-course-predictions-v1',
};

export const LESSONS = [
  {
    id: 'lesson-1',
    number: 1,
    slug: '01-coincidence',
    shortLabel: 'Coincidence',
    title: 'The Coincidence Einstein Took Seriously',
    insight:
      'All bodies fall alike because gravity couples universally — inertial and gravitational mass are equal.',
    minutes: 30,
    href: 'lessons/01-coincidence.html',
  },
  {
    id: 'lesson-2',
    number: 2,
    slug: '02-happiest-thought',
    shortLabel: 'Happiest Thought',
    title: "Einstein's Happiest Thought",
    insight:
      'Locally, free fall removes gravity; standing still on Earth is the accelerated state.',
    minutes: 35,
    href: 'lessons/02-happiest-thought.html',
  },
  {
    id: 'lesson-3',
    number: 3,
    slug: '03-geometry',
    shortLabel: 'Geometry',
    title: 'Gravity Becomes Geometry',
    insight:
      'Gravity does not deflect bodies from natural motion; matter changes what straight motion is.',
    minutes: 40,
    href: 'lessons/03-geometry.html',
  },
  {
    id: 'lesson-4',
    number: 4,
    slug: '04-field-equation',
    shortLabel: 'Field Equation',
    title: 'The Field Equation Without Tensor Calculus',
    insight:
      'The Einstein equation is a feedback law between matter/energy and spacetime geometry.',
    minutes: 35,
    href: 'lessons/04-field-equation.html',
  },
  {
    id: 'lesson-5',
    number: 5,
    slug: '05-black-holes',
    shortLabel: 'Black Holes',
    title: 'Why a Black Hole Must Be Black',
    insight:
      'The horizon is a causal boundary, not a material surface with an unusually strong pull.',
    minutes: 40,
    href: 'lessons/05-black-holes.html',
  },
  {
    id: 'lesson-6',
    number: 6,
    slug: '06-horizon-crossing',
    shortLabel: 'Horizon Crossing',
    title: 'Clocks, Energy, and Horizon Crossing',
    insight:
      'Distant and infalling observer stories differ but do not contradict each other.',
    minutes: 40,
    href: 'lessons/06-horizon-crossing.html',
  },
  {
    id: 'lesson-7',
    number: 7,
    slug: '07-evidence',
    shortLabel: 'Evidence',
    title: 'How Nature Answers Back',
    insight:
      'GR survives very different empirical tests — not only elegance, but observation.',
    minutes: 35,
    href: 'lessons/07-evidence.html',
  },
];

export const ARCHIVE_PAGES = [
  { id: 'archive-index', label: 'Archive Index', href: 'archive/index.html' },
  { id: 'ten-year', label: 'Ten-Year Ascent', href: 'archive/ten-year-ascent.html' },
  { id: 'constellation', label: 'Constellation', href: 'archive/constellation.html' },
  { id: 'quantum-salon', label: 'Quantum Salon', href: 'archive/quantum-salon.html' },
  { id: 'turing-shannon', label: 'Turing & Shannon', href: 'archive/turing-shannon.html' },
  { id: 'nobel', label: 'Nobel Dossier', href: 'archive/nobel-dossier.html' },
];

export const PROVENANCE_LABELS = {
  transcript: 'From the lecture',
  'board-reconstruction': 'Board reconstructed',
  'gr-supplement': 'GR supplement',
  documented: 'Documented',
  recollected: 'Recollected',
  disputed: 'Disputed',
  dramatization: 'Dramatization',
  'primary-history': 'Documented',
  'secondary-history': 'Documented',
  'first-person-recollection': 'Recollected',
  'secondhand-recollection': 'Recollected',
  'likely-apocryphal': 'Disputed',
  'dramatic-reconstruction': 'Dramatization',
  'near-encounter': 'Near encounter',
};
