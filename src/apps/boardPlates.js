/** SVG board plate renderers for Lesson 1 (and shared). */

export function plateFma() {
  return `
  <svg viewBox="0 0 420 160" role="img" aria-label="Board plate: F equals m i a">
    <rect width="420" height="160" fill="#fffef9"/>
    <text x="24" y="36" font-family="Georgia, serif" font-size="16" fill="#1a1f2b">Likely board (teaching redraw)</text>
    <text x="24" y="88" font-family="Georgia, serif" font-size="36" fill="#1f4e79">F = mᵢ a</text>
    <text x="24" y="128" font-family="Segoe UI, sans-serif" font-size="14" fill="#4a5160">mᵢ : inertial mass — resistance to acceleration</text>
    <line x1="280" y1="50" x2="360" y2="50" stroke="#9a4a16" stroke-width="3" marker-end="url(#arrow)"/>
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#9a4a16"/>
      </marker>
    </defs>
    <text x="300" y="42" font-size="12" fill="#9a4a16">force</text>
    <circle cx="300" cy="100" r="18" fill="#d6e4f2" stroke="#1f4e79"/>
    <text x="292" y="105" font-size="12" fill="#1f4e79">mᵢ</text>
  </svg>`;
}

export function plateNewtonGravity() {
  return `
  <svg viewBox="0 0 420 180" role="img" aria-label="Board plate: Newtonian gravity">
    <rect width="420" height="180" fill="#fffef9"/>
    <text x="24" y="30" font-family="Georgia, serif" font-size="16" fill="#1a1f2b">Inverse-square gravity</text>
    <text x="24" y="70" font-family="Georgia, serif" font-size="28" fill="#1f4e79">F_g = −G M m_g / r²</text>
    <circle cx="90" cy="130" r="28" fill="#f3e0d0" stroke="#9a4a16" stroke-width="2"/>
    <text x="78" y="135" font-size="14" fill="#9a4a16">M</text>
    <circle cx="250" cy="130" r="14" fill="#d6e4f2" stroke="#1f4e79" stroke-width="2"/>
    <text x="242" y="135" font-size="12" fill="#1f4e79">m</text>
    <line x1="120" y1="130" x2="230" y2="130" stroke="#4a5160" stroke-dasharray="4 3"/>
    <text x="160" y="120" font-size="12" fill="#4a5160">r</text>
    <path d="M200 145 Q170 160 140 145" fill="none" stroke="#9a4a16" stroke-width="2"/>
    <text x="150" y="172" font-size="12" fill="#9a4a16">attraction</text>
  </svg>`;
}

export function plateCoulomb() {
  return `
  <svg viewBox="0 0 440 200" role="img" aria-label="Board plate: gravity versus Coulomb law">
    <rect width="440" height="200" fill="#fffef9"/>
    <text x="20" y="28" font-size="15" fill="#1a1f2b">Gravity vs electrostatics</text>
    <rect x="16" y="44" width="196" height="140" rx="8" fill="#f3e0d0" stroke="#9a4a16"/>
    <text x="28" y="70" font-size="14" font-weight="700" fill="#9a4a16">Gravity</text>
    <text x="28" y="100" font-size="16" fill="#1a1f2b">F ∝ − M m / r²</text>
    <text x="28" y="128" font-size="13" fill="#4a5160">minus → attraction</text>
    <text x="28" y="152" font-size="13" fill="#4a5160">“charge” = mass</text>
    <rect x="228" y="44" width="196" height="140" rx="8" fill="#d6e4f2" stroke="#1f4e79"/>
    <text x="240" y="70" font-size="14" font-weight="700" fill="#1f4e79">Electrostatics</text>
    <text x="240" y="100" font-size="16" fill="#1a1f2b">F ∝ + q₁ q₂ / r²</text>
    <text x="240" y="128" font-size="13" fill="#4a5160">plus → like charges repel</text>
    <text x="240" y="152" font-size="13" fill="#4a5160">charge ≠ inertial mass</text>
  </svg>`;
}

export function plateCancellation() {
  return `
  <svg viewBox="0 0 440 200" role="img" aria-label="Board plate: mass equality and cancellation">
    <rect width="440" height="200" fill="#fffef9"/>
    <text x="20" y="28" font-size="15" fill="#1a1f2b">Mass equality → universal free fall</text>
    <text x="20" y="68" font-size="20" fill="#1a1f2b">mᵢ a = G M m_g / r²</text>
    <text x="20" y="104" font-size="18" fill="#1f4e79">If mᵢ = m_g  ⇒  a = G M / r²</text>
    <text x="20" y="140" font-size="14" fill="#4a5160">Test-body identity drops out of the acceleration.</text>
    <text x="20" y="168" font-size="13" fill="#6e2c2c">Equality is empirical — not a bookkeeping identity.</text>
  </svg>`;
}

export const LESSON1_PLATES = {
  'b01-fma': {
    id: 'b01-fma',
    title: 'F = mᵢ a',
    confidence: 'high',
    start: '4:41',
    end: '5:45',
    clues: 'ma=F; mass resists acceleration',
    content: "Newton's second law with inertial mass labeled.",
    uncertainty: 'Whether Brown wrote F=ma or ma=F is uncertain.',
    svg: plateFma,
  },
  'b02-newton-gravity': {
    id: 'b02-newton-gravity',
    title: 'Newtonian gravity',
    confidence: 'high',
    start: '5:56',
    end: '7:20',
    clues: "Newton's constant; inverse-square",
    content: 'Inverse-square force between source and test masses.',
    uncertainty: 'Symbol names and sign convention may differ.',
    svg: plateNewtonGravity,
  },
  'b03-coulomb-comparison': {
    id: 'b03-coulomb-comparison',
    title: 'Gravity vs Coulomb',
    confidence: 'high',
    start: '7:32',
    end: '12:48',
    clues: 'electrostatic force law; minus vs plus sign',
    content: 'Side-by-side inverse-square comparison.',
    uncertainty: 'Constant notation and ordering unknown.',
    svg: plateCoulomb,
  },
  'b04-mass-equality-cancellation': {
    id: 'b04-mass-equality-cancellation',
    title: 'Mass cancellation',
    confidence: 'high',
    start: '12:58',
    end: '16:36',
    clues: 'inertial mass; gravitational mass; same mass',
    content: 'Equality and cancellation to mass-independent a.',
    uncertainty: 'Exact board layout unknown.',
    svg: plateCancellation,
  },
};

export function renderBoardPlate(plate) {
  return `
  <figure class="board-plate" id="${plate.id}">
    <div class="board-plate__header">
      <strong>${plate.title}</strong>
      <span>
        <span class="confidence" data-level="${plate.confidence}">${plate.confidence} confidence</span>
        <button type="button" class="badge" data-prov="board-reconstruction" data-provenance="board-reconstruction"
          data-start="${plate.start}" data-end="${plate.end}" data-confidence="${plate.confidence}"
          data-title="${plate.title}" data-detail="${plate.content}" data-clues="${plate.clues}">Board reconstructed</button>
      </span>
    </div>
    <div class="board-plate__body">
      <div class="board-plate__svg">${plate.svg()}</div>
      <div class="board-plate__meta">
        <p><strong>Likely content:</strong> ${plate.content}</p>
        <p><strong>Timestamps:</strong> ${plate.start} – ${plate.end}</p>
        <p class="faint"><strong>Uncertainty:</strong> ${plate.uncertainty} This is a teaching reconstruction, not a facsimile.</p>
      </div>
    </div>
  </figure>`;
}
