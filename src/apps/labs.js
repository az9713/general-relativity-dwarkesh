/**
 * Interactive labs for Lessons 2–7.
 * Each mount*(root) follows the application contract: controls, linked displays,
 * Why?, assumptions, reset, keyboard-friendly ranges.
 */
import {
  schwarzschildRadius,
  newtonianEscapeSpeed,
  staticRedshiftFactor,
  extractableEnergyFraction,
  tidalDeltaA,
  weakFieldDeflection,
  orbitalMass,
  compactness,
  formatNumber,
  formatSci,
} from '../utils/math.js';
import {
  G,
  C,
  EARTH_MASS,
  SOLAR_MASS,
  EARTH_RADIUS,
  SUN_RADIUS,
  SAGITTARIUS_A_MASS,
} from '../utils/constants.js';

function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function bindRanges(root, onChange) {
  root.querySelectorAll('input, select, button[data-action]').forEach((node) => {
    node.addEventListener('input', onChange);
    node.addEventListener('change', onChange);
  });
  onChange();
}

export function mountElevator(root) {
  if (!root) return;
  root.innerHTML = `
  <div class="app-shell">
    <h3 class="app-shell__title">Einstein Elevator</h3>
    <p class="muted">Compare scenarios that feel alike locally — and enlarge the lab to reveal tides.</p>
    <div class="app-controls">
      <div>
        <label for="el-scene">Scenario</label>
        <select id="el-scene">
          <option value="rocket">Accelerating rocket (no gravity)</option>
          <option value="earth">Stationary elevator on Earth</option>
          <option value="fall">Freely falling elevator near Earth</option>
          <option value="inertial">Inertial cabin far from masses</option>
        </select>
      </div>
      <div>
        <label for="el-exp">Experiment</label>
        <select id="el-exp">
          <option value="release">Release two masses</option>
          <option value="scale">Stand on a scale</option>
          <option value="light">Send a horizontal light pulse</option>
          <option value="tides">Enlarge the laboratory (tides)</option>
        </select>
      </div>
    </div>
    <div class="app-panel">
      <h4>What you notice</h4>
      <p id="el-result"></p>
    </div>
    <div class="callout warning" id="el-local">
      <strong>Locality:</strong> Equivalence holds in a small enough region for a short enough time. Tides (differential gravity) reveal true curvature and break exact equivalence in an enlarged lab.
    </div>
    <details class="rung"><summary>Assumptions</summary>
      <div class="rung-body"><ul class="clean">
        <li>Idealized uniform acceleration or uniform field unless tides are selected</li>
        <li>No air resistance; classical light treatment for the pulse demo</li>
        <li>Does not derive the Einstein field equation</li>
      </ul></div>
    </details>
    <button type="button" class="btn" id="el-reset">Reset</button>
  </div>`;

  const results = {
    rocket: {
      release: 'Both masses “fall” toward the floor together — the floor accelerates up to meet them. Locally indistinguishable from gravity.',
      scale: 'The scale reads a nonzero weight: you are accelerating.',
      light: 'In the rocket frame the pulse appears to curve downward as the floor accelerates. (Pedagogical cartoon of the equivalence idea.)',
      tides: 'No genuine gravitational tides from a uniform acceleration; enlarging the cabin does not create differential pull from a mass.',
    },
    earth: {
      release: 'Masses accelerate downward together (ideal vacuum). You attribute this to gravity.',
      scale: 'Scale reads weight — you are not in free fall; the ground accelerates you upward (GR reading).',
      light: 'Locally similar to the rocket if the region is small.',
      tides: 'Enlarge enough and separated masses diverge or converge slightly — real Earth gravity is nonuniform. Equivalence is local.',
    },
    fall: {
      release: 'Released masses float beside you. Locally, gravity is “gone.”',
      scale: 'Scale reads ~0. You and the cabin free-fall together.',
      light: 'Locally straight propagation in the free-fall frame (idealization).',
      tides: 'In a tall enough falling elevator, head and feet feel different accelerations. Free fall removes gravity only locally.',
    },
    inertial: {
      release: 'Masses float. No preferred “down.”',
      scale: 'Scale reads 0.',
      light: 'Pulse travels straight across the cabin.',
      tides: 'No planetary tides if truly isolated.',
    },
  };

  const update = () => {
    const s = root.querySelector('#el-scene').value;
    const e = root.querySelector('#el-exp').value;
    root.querySelector('#el-result').textContent = results[s][e];
  };
  bindRanges(root, update);
  root.querySelector('#el-reset').onclick = () => {
    root.querySelector('#el-scene').value = 'rocket';
    root.querySelector('#el-exp').value = 'release';
    update();
  };
}

export function mountMapGlobe(root) {
  if (!root) return;
  root.innerHTML = `
  <div class="app-shell">
    <h3 class="app-shell__title">Map-to-Globe Geodesic Explorer</h3>
    <p class="muted">A path that looks curved on a flat map can be the straightest path on a sphere. Analogy only — Earth’s surface is not 4D spacetime.</p>
    <div class="app-controls">
      <div>
        <label for="mg-lat1">Start latitude (°)</label>
        <input type="range" id="mg-lat1" min="-60" max="60" value="37"/>
      </div>
      <div>
        <label for="mg-lon1">Start longitude (°)</label>
        <input type="range" id="mg-lon1" min="-180" max="180" value="-122"/>
      </div>
      <div>
        <label for="mg-lat2">End latitude (°)</label>
        <input type="range" id="mg-lat2" min="-60" max="60" value="51"/>
      </div>
      <div>
        <label for="mg-lon2">End longitude (°)</label>
        <input type="range" id="mg-lon2" min="-180" max="180" value="0"/>
      </div>
    </div>
    <div class="app-display">
      <div class="app-panel">
        <h4>Flat map (plate carrée sketch)</h4>
        <svg id="mg-map" viewBox="0 0 360 180" width="100%" style="background:#e8eef5;border-radius:8px;">
          <rect width="360" height="180" fill="#d6e4f2"/>
          <path id="mg-flat" fill="none" stroke="#9a4a16" stroke-width="2"/>
          <path id="mg-straight" fill="none" stroke="#1f4e79" stroke-width="2" stroke-dasharray="4 3"/>
          <circle id="mg-a" r="4" fill="#0f6b5c"/>
          <circle id="mg-b" r="4" fill="#6b2d8b"/>
        </svg>
        <p class="faint">Solid: great-circle sample · Dashed: straight line in map coordinates</p>
      </div>
      <div class="app-panel">
        <h4>Lengths (relative units)</h4>
        <div class="metric"><span class="label">Map-straight length</span><span class="value" id="mg-ls">—</span></div>
        <div class="metric"><span class="label">Great-circle length</span><span class="value" id="mg-lg">—</span></div>
        <p id="mg-msg" class="muted"></p>
      </div>
    </div>
    <details class="rung"><summary>Assumptions</summary>
      <div class="rung-body">Spherical Earth; pedagogical 2D map. <strong>Do not</strong> claim Earth’s surface is literally spacetime.</div>
    </details>
  </div>`;

  function toRad(d) {
    return (d * Math.PI) / 180;
  }
  function greatCircle(lat1, lon1, lat2, lon2) {
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δλ = toRad(lon2 - lon1);
    const cosc =
      Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    return Math.acos(Math.min(1, Math.max(-1, cosc)));
  }

  const update = () => {
    const lat1 = +root.querySelector('#mg-lat1').value;
    const lon1 = +root.querySelector('#mg-lon1').value;
    const lat2 = +root.querySelector('#mg-lat2').value;
    const lon2 = +root.querySelector('#mg-lon2').value;
    const x1 = lon1 + 180;
    const y1 = 90 - lat1;
    const x2 = lon2 + 180;
    const y2 = 90 - lat2;
    root.querySelector('#mg-a').setAttribute('cx', x1);
    root.querySelector('#mg-a').setAttribute('cy', y1);
    root.querySelector('#mg-b').setAttribute('cx', x2);
    root.querySelector('#mg-b').setAttribute('cy', y2);
    root.querySelector('#mg-straight').setAttribute('d', `M${x1} ${y1} L${x2} ${y2}`);

    // sample great circle in map coords
    const pts = [];
    for (let i = 0; i <= 32; i++) {
      const t = i / 32;
      // slerp on sphere
      const φ1 = toRad(lat1);
      const λ1 = toRad(lon1);
      const φ2 = toRad(lat2);
      const λ2 = toRad(lon2);
      const ω = greatCircle(lat1, lon1, lat2, lon2);
      if (ω < 1e-9) {
        pts.push([x1, y1]);
        continue;
      }
      const a = Math.sin((1 - t) * ω) / Math.sin(ω);
      const b = Math.sin(t * ω) / Math.sin(ω);
      const x = a * Math.cos(φ1) * Math.cos(λ1) + b * Math.cos(φ2) * Math.cos(λ2);
      const y = a * Math.cos(φ1) * Math.sin(λ1) + b * Math.cos(φ2) * Math.sin(λ2);
      const z = a * Math.sin(φ1) + b * Math.sin(φ2);
      const φ = Math.atan2(z, Math.hypot(x, y));
      const λ = Math.atan2(y, x);
      pts.push([(λ * 180) / Math.PI + 180, 90 - (φ * 180) / Math.PI]);
    }
    root.querySelector('#mg-flat').setAttribute(
      'd',
      pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
    );
    const ls = Math.hypot(x2 - x1, y2 - y1);
    const lg = greatCircle(lat1, lon1, lat2, lon2) * (180 / Math.PI);
    root.querySelector('#mg-ls').textContent = formatNumber(ls);
    root.querySelector('#mg-lg').textContent = formatNumber(lg);
    root.querySelector('#mg-msg').textContent =
      'The great circle is geodesic on the globe; the dashed line is “straight” only in the flat chart.';
  };
  bindRanges(root, update);
}

export function mountWorldline(root) {
  if (!root) return;
  root.innerHTML = `
  <div class="app-shell">
    <h3 class="app-shell__title">Free-Fall Worldline Lab</h3>
    <p class="muted">Compare held chalk, free fall, and light. Graphical curvature of a worldline is not automatically spacetime curvature.</p>
    <div class="app-controls">
      <div>
        <label for="wl-mode">Coordinate view</label>
        <select id="wl-mode">
          <option value="earth">Earth-fixed (height vs time)</option>
          <option value="fall">Local free-fall frame</option>
        </select>
      </div>
      <div>
        <label for="wl-obj">Highlight</label>
        <select id="wl-obj">
          <option value="held">Held chalk</option>
          <option value="fall">Freely falling chalk</option>
          <option value="throw">Thrown chalk</option>
          <option value="light">Light pulse</option>
        </select>
      </div>
    </div>
    <svg viewBox="0 0 400 240" width="100%" style="background:#fff;border:1px solid var(--border);border-radius:8px;">
      <text x="12" y="20" font-size="12" fill="#4a5160">height</text>
      <text x="340" y="230" font-size="12" fill="#4a5160">time →</text>
      <line x1="40" y1="200" x2="380" y2="200" stroke="#b8b1a3"/>
      <line x1="40" y1="200" x2="40" y2="20" stroke="#b8b1a3"/>
      <path id="wl-path" fill="none" stroke="#1f4e79" stroke-width="3"/>
      <path id="wl-light" fill="none" stroke="#c9a227" stroke-width="2" stroke-dasharray="4 2"/>
    </svg>
    <p id="wl-cap" class="muted"></p>
    <details class="rung"><summary>Assumptions</summary>
      <div class="rung-body">1+1 pedagogical diagram; Newtonian free-fall parabola in Earth coordinates is a teaching sketch, not a GR geodesic plot.</div>
    </details>
  </div>`;

  const update = () => {
    const mode = root.querySelector('#wl-mode').value;
    const obj = root.querySelector('#wl-obj').value;
    const path = root.querySelector('#wl-path');
    const light = root.querySelector('#wl-light');
    light.setAttribute('d', 'M40 100 L380 40');
    if (mode === 'earth') {
      if (obj === 'held') {
        path.setAttribute('d', 'M40 80 L380 80');
        root.querySelector('#wl-cap').textContent =
          'Held chalk: constant height in Earth coordinates — but it is the accelerated object (you push up on it).';
      } else if (obj === 'fall') {
        path.setAttribute('d', 'M40 40 Q120 40 200 120 T380 200');
        root.querySelector('#wl-cap').textContent =
          'Free fall looks curved in height–time axes. In GR this is the natural “straight” motion in curved spacetime.';
      } else if (obj === 'throw') {
        path.setAttribute('d', 'M40 160 Q200 20 380 160');
        root.querySelector('#wl-cap').textContent = 'Thrown chalk: parabolic arc in these axes.';
      } else {
        path.setAttribute('d', 'M40 100 L380 40');
        root.querySelector('#wl-cap').textContent = 'Light pulse: steep worldline (schematic).';
      }
    } else {
      if (obj === 'fall') {
        path.setAttribute('d', 'M40 120 L380 120');
        root.querySelector('#wl-cap').textContent =
          'In a local free-fall frame, free fall is approximately a straight worldline. Equivalence is local.';
      } else if (obj === 'held') {
        path.setAttribute('d', 'M40 160 Q200 80 380 20');
        root.querySelector('#wl-cap').textContent =
          'Held chalk accelerates relative to free fall — it is the one being pushed.';
      } else {
        path.setAttribute('d', 'M40 140 Q200 100 380 60');
        root.querySelector('#wl-cap').textContent = 'Other motions relative to the free-fall frame.';
      }
    }
  };
  bindRanges(root, update);
}

export function mountFieldEquation(root) {
  if (!root) return;
  root.innerHTML = `
  <div class="app-shell">
    <h3 class="app-shell__title">Field Equation Relationship Explorer</h3>
    <p class="callout warning"><strong>Conceptual explorer, not a numerical GR solver.</strong> Do not treat the cartoon grid as an exact solution.</p>
    <div class="app-controls">
      <div>
        <label for="fe-rho">Energy density (qualitative)</label>
        <input type="range" id="fe-rho" min="0" max="10" value="4"/>
      </div>
      <div>
        <label for="fe-p">Pressure / stress (qualitative)</label>
        <input type="range" id="fe-p" min="0" max="10" value="1"/>
      </div>
      <div>
        <label for="fe-spread">How spread out?</label>
        <input type="range" id="fe-spread" min="1" max="10" value="3"/>
      </div>
    </div>
    <div class="app-display">
      <div class="app-panel">
        <h4>Geometry side G<sub>μν</sub></h4>
        <svg viewBox="0 0 200 120" width="100%" id="fe-grid"></svg>
        <p class="faint" id="fe-g">Curvature response (schematic)</p>
      </div>
      <div class="app-panel">
        <h4>Matter side T<sub>μν</sub></h4>
        <div class="metric"><span class="label">Energy density weight</span><span class="value" id="fe-tv">—</span></div>
        <div class="metric"><span class="label">Pressure contribution</span><span class="value" id="fe-pv">—</span></div>
        <p class="muted">Matter/energy tells geometry how to curve; geometry tells matter how to move (geodesics). Both energy density and pressure/stress gravitate.</p>
      </div>
    </div>
    <details class="rung"><summary>Assumptions</summary>
      <div class="rung-body">Qualitative sliders only. No claim to solve Einstein’s equation. Grid deformation is pedagogical, not a metric plot.</div>
    </details>
  </div>`;

  const update = () => {
    const rho = +root.querySelector('#fe-rho').value;
    const p = +root.querySelector('#fe-p').value;
    const spread = +root.querySelector('#fe-spread').value;
    root.querySelector('#fe-tv').textContent = rho;
    root.querySelector('#fe-pv').textContent = p;
    const strength = (rho + 0.5 * p) / spread;
    const svg = root.querySelector('#fe-grid');
    let g = '';
    for (let i = 0; i <= 8; i++) {
      const x = 20 + i * 20;
      const bow = strength * 1.5;
      g += `<path d="M${x} 10 Q${x + bow} 60 ${x} 110" fill="none" stroke="#1f4e79" stroke-width="1.2"/>`;
    }
    for (let j = 0; j <= 5; j++) {
      const y = 15 + j * 18;
      g += `<path d="M20 ${y} Q100 ${y + strength} 180 ${y}" fill="none" stroke="#9a4a16" stroke-width="1"/>`;
    }
    svg.innerHTML = g;
    root.querySelector('#fe-g').textContent =
      strength > 3
        ? 'Stronger concentrated stress-energy → more schematic “curvature response.”'
        : 'Weaker or more spread sources → milder schematic response.';
  };
  bindRanges(root, update);
}

export function mountSchwarzschildScale(root) {
  if (!root) return;
  root.innerHTML = `
  <div class="app-shell">
    <h3 class="app-shell__title">Schwarzschild Scale Explorer</h3>
    <div class="app-controls">
      <div>
        <label for="ss-preset">Preset</label>
        <select id="ss-preset">
          <option value="earth">Earth</option>
          <option value="sun">Sun</option>
          <option value="stellar">Stellar BH (~10 M☉)</option>
          <option value="sgr">Sagittarius A*</option>
          <option value="big">Large BH (10⁹ M☉)</option>
        </select>
      </div>
    </div>
    <div class="app-panel">
      <div class="metric"><span class="label">Mass</span><span class="value" id="ss-m">—</span></div>
      <div class="metric"><span class="label">rₛ = 2GM/c²</span><span class="value" id="ss-rs">—</span></div>
      <div class="metric"><span class="label">Object radius (if any)</span><span class="value" id="ss-r">—</span></div>
      <div class="metric"><span class="label">Compactness rₛ/r</span><span class="value" id="ss-c">—</span></div>
      <div class="metric"><span class="label">Newtonian v_esc at surface</span><span class="value" id="ss-ve">—</span></div>
    </div>
    <p class="callout warning">Escape velocity here is <strong>Newtonian</strong> and only a clue. The GR horizon is a causal boundary, not “v_esc = c proves black holes.”</p>
  </div>`;

  const presets = {
    earth: { M: EARTH_MASS, R: EARTH_RADIUS, label: 'Earth' },
    sun: { M: SOLAR_MASS, R: SUN_RADIUS, label: 'Sun' },
    stellar: { M: 10 * SOLAR_MASS, R: null, label: '10 M☉ BH' },
    sgr: { M: SAGITTARIUS_A_MASS, R: null, label: 'Sgr A*' },
    big: { M: 1e9 * SOLAR_MASS, R: null, label: '10⁹ M☉ BH' },
  };

  const update = () => {
    const p = presets[root.querySelector('#ss-preset').value];
    const rs = schwarzschildRadius(p.M);
    root.querySelector('#ss-m').textContent = `${formatSci(p.M)} kg`;
    root.querySelector('#ss-rs').textContent = `${formatNumber(rs)} m (${formatNumber(rs / 1000)} km)`;
    if (p.R) {
      root.querySelector('#ss-r').textContent = `${formatNumber(p.R)} m`;
      root.querySelector('#ss-c').textContent = formatSci(compactness(p.M, p.R));
      root.querySelector('#ss-ve').textContent =
        `${formatNumber(newtonianEscapeSpeed(p.M, p.R))} m/s (Newtonian)`;
    } else {
      root.querySelector('#ss-r').textContent = 'Horizon scale uses rₛ (no hard surface)';
      root.querySelector('#ss-c').textContent = '1 at r = rₛ (by definition of that radius)';
      root.querySelector('#ss-ve').textContent = 'Newtonian v_esc = c at r = rₛ (clue only)';
    }
  };
  bindRanges(root, update);
}

export function mountBrickEnergy(root) {
  if (!root) return;
  root.innerHTML = `
  <div class="app-shell">
    <h3 class="app-shell__title">Brick-and-Pulley Energy Lab</h3>
    <p class="muted">Idealized energy extractable by slowly lowering a brick toward a horizon (Brown’s thought experiment).</p>
    <div class="app-controls">
      <div>
        <label for="be-M">Black-hole mass (M☉)</label>
        <input type="range" id="be-M" min="1" max="100" value="10"/>
      </div>
      <div>
        <label for="be-r">Lowering radius / rₛ</label>
        <input type="range" id="be-r" min="1.05" max="20" step="0.05" value="2"/>
      </div>
      <div>
        <label for="be-m">Brick mass (kg)</label>
        <input type="range" id="be-m" min="1" max="100" value="10"/>
      </div>
    </div>
    <div class="app-panel">
      <div class="metric"><span class="label">r / rₛ</span><span class="value" id="be-rr">—</span></div>
      <div class="metric"><span class="label">Static factor √(1−rₛ/r)</span><span class="value" id="be-f">—</span></div>
      <div class="metric"><span class="label">Extractable fraction 1−√(1−rₛ/r)</span><span class="value" id="be-frac">—</span></div>
      <div class="metric"><span class="label">Ideal energy at infinity</span><span class="value" id="be-e">—</span></div>
      <div class="metric"><span class="label">Newtonian clue GM/(rc²)</span><span class="value" id="be-n">—</span></div>
    </div>
    <details class="rung" open><summary>Assumptions (required)</summary>
      <div class="rung-body"><ul class="clean">
        <li>Quasi-static lowering; r &gt; rₛ only</li>
        <li>Negligible rope mass and strength limits</li>
        <li>Negligible backreaction; nonrotating uncharged BH</li>
        <li>Classical treatment; no lowering through the horizon</li>
      </ul></div>
    </details>
  </div>`;

  const update = () => {
    const M = +root.querySelector('#be-M').value * SOLAR_MASS;
    const ratio = +root.querySelector('#be-r').value;
    const m = +root.querySelector('#be-m').value;
    const rs = schwarzschildRadius(M);
    const r = ratio * rs;
    const f = staticRedshiftFactor(M, r);
    const frac = extractableEnergyFraction(M, r);
    root.querySelector('#be-rr').textContent = formatNumber(ratio);
    root.querySelector('#be-f').textContent = formatNumber(f);
    root.querySelector('#be-frac').textContent = formatNumber(frac);
    root.querySelector('#be-e').textContent = Number.isFinite(frac)
      ? `${formatNumber(frac * m * C * C)} J`
      : '—';
    root.querySelector('#be-n').textContent = formatNumber((G * M) / (r * C * C));
  };
  bindRanges(root, update);
}

export function mountClockRedshift(root) {
  if (!root) return;
  root.innerHTML = `
  <div class="app-shell">
    <h3 class="app-shell__title">Gravitational Clock &amp; Redshift Lab</h3>
    <div class="app-controls">
      <div>
        <label for="cr-M">Mass (M☉)</label>
        <input type="range" id="cr-M" min="1" max="1e6" step="1" value="10"/>
      </div>
      <div>
        <label for="cr-re">Emitter r / rₛ (&gt; 1)</label>
        <input type="range" id="cr-re" min="1.05" max="50" step="0.05" value="2"/>
      </div>
      <div>
        <label for="cr-rate">Local pulse rate (Hz)</label>
        <input type="range" id="cr-rate" min="1" max="20" value="5"/>
      </div>
    </div>
    <div class="app-panel">
      <div class="metric"><span class="label">√(1−rₛ/r_e)</span><span class="value" id="cr-f">—</span></div>
      <div class="metric"><span class="label">Received rate at infinity (ideal)</span><span class="value" id="cr-rr">—</span></div>
      <div class="metric"><span class="label">E_∞ / E_local</span><span class="value" id="cr-er">—</span></div>
    </div>
    <p class="callout warning">Static-clock formula does <strong>not</strong> describe a freely falling observer at the horizon.</p>
  </div>`;

  const update = () => {
    const M = +root.querySelector('#cr-M').value * SOLAR_MASS;
    const ratio = +root.querySelector('#cr-re').value;
    const rate = +root.querySelector('#cr-rate').value;
    const rs = schwarzschildRadius(M);
    const r = ratio * rs;
    const f = staticRedshiftFactor(M, r);
    root.querySelector('#cr-f').textContent = formatNumber(f);
    root.querySelector('#cr-rr').textContent = Number.isFinite(f)
      ? `${formatNumber(rate * f)} Hz`
      : '—';
    root.querySelector('#cr-er').textContent = formatNumber(f);
  };
  bindRanges(root, update);
}

export function mountDualObserver(root) {
  if (!root) return;
  root.innerHTML = `
  <div class="app-shell">
    <h3 class="app-shell__title">Dual-Observer Horizon Crossing</h3>
    <p class="muted">Three linked stories: distant signals, causal sketch, infaller proper time.</p>
    <div class="app-controls">
      <div>
        <label for="do-t">Infall progress</label>
        <input type="range" id="do-t" min="0" max="100" value="0"/>
      </div>
      <button type="button" class="btn" id="do-play">Play / Pause</button>
      <button type="button" class="btn" id="do-step">Step</button>
    </div>
    <div class="grid-2">
      <div class="app-panel">
        <h4>Distant observer</h4>
        <p id="do-far"></p>
      </div>
      <div class="app-panel">
        <h4>Infalling observer</h4>
        <p id="do-in"></p>
      </div>
    </div>
    <div class="app-panel" style="margin-top:0.75rem;">
      <h4>Causal sketch</h4>
      <svg viewBox="0 0 320 160" width="100%">
        <line x1="160" y1="10" x2="160" y2="150" stroke="#a33b2d" stroke-dasharray="4 3"/>
        <text x="166" y="24" font-size="11" fill="#a33b2d">horizon</text>
        <path id="do-path" fill="none" stroke="#1f4e79" stroke-width="2"/>
        <circle id="do-dot" r="5" fill="#9a4a16"/>
      </svg>
      <p class="faint">Signals to infinity become later and redder; the infaller reaches the horizon in finite proper time. No permanently bright frozen body remains visible. Horizon ≠ solid surface.</p>
    </div>
  </div>`;

  let playing = false;
  let timer = null;

  const update = () => {
    const t = +root.querySelector('#do-t').value;
    const x = 40 + (t / 100) * 120;
    const y = 20 + (t / 100) * 110;
    root.querySelector('#do-path').setAttribute('d', `M40 20 Q100 40 ${x} ${y}`);
    root.querySelector('#do-dot').setAttribute('cx', x);
    root.querySelector('#do-dot').setAttribute('cy', y);
    if (t < 70) {
      root.querySelector('#do-far').textContent =
        `Signals arrive increasingly delayed and redshifted (t=${t}%). The image fades; it does not hang forever as a bright frozen person.`;
      root.querySelector('#do-in').textContent =
        'Proper time advances normally. Local physics is finite; no brick wall at the horizon.';
    } else if (t < 90) {
      root.querySelector('#do-far').textContent =
        'Asymptotic fading: last photons take arbitrarily long to climb out; the distant movie freezes and dims.';
      root.querySelector('#do-in').textContent =
        'Still finite proper time to the horizon. Crossing is locally uneventful for a large enough black hole (tides aside).';
    } else {
      root.querySelector('#do-far').textContent =
        'No ongoing bright signal from inside. Causal disconnection, not a material surface.';
      root.querySelector('#do-in').textContent =
        'Crossed (in this schematic). Singularity is a separate future issue — not the same as the horizon.';
    }
  };

  bindRanges(root, update);
  root.querySelector('#do-play').onclick = () => {
    playing = !playing;
    if (playing) {
      timer = setInterval(() => {
        const s = root.querySelector('#do-t');
        s.value = String(Math.min(100, +s.value + 2));
        update();
        if (+s.value >= 100) {
          playing = false;
          clearInterval(timer);
        }
      }, 80);
    } else clearInterval(timer);
  };
  root.querySelector('#do-step').onclick = () => {
    const s = root.querySelector('#do-t');
    s.value = String(Math.min(100, +s.value + 5));
    update();
  };
}

export function mountTidal(root) {
  if (!root) return;
  root.innerHTML = `
  <div class="app-shell">
    <h3 class="app-shell__title">Tidal-Force Scale Explorer</h3>
    <div class="app-controls">
      <div>
        <label for="tf-M">Black-hole mass (M☉)</label>
        <input type="range" id="tf-M" min="1" max="1e7" value="10"/>
      </div>
      <div>
        <label for="tf-L">Body height L (m)</label>
        <input type="range" id="tf-L" min="0.5" max="2.5" step="0.1" value="1.7"/>
      </div>
      <div>
        <label for="tf-r">Radius / rₛ</label>
        <input type="range" id="tf-r" min="1.01" max="100" step="0.01" value="1.01"/>
      </div>
    </div>
    <div class="app-panel">
      <div class="metric"><span class="label">Δa ≈ 2GML/r³</span><span class="value" id="tf-da">—</span></div>
      <div class="metric"><span class="label">Compared to g_earth</span><span class="value" id="tf-g">—</span></div>
      <p id="tf-msg" class="muted"></p>
    </div>
    <p class="faint">Larger black holes have <em>weaker</em> tides at their horizons. Comfort thresholds are not exact.</p>
  </div>`;

  const update = () => {
    const M = +root.querySelector('#tf-M').value * SOLAR_MASS;
    const L = +root.querySelector('#tf-L').value;
    const ratio = +root.querySelector('#tf-r').value;
    const r = ratio * schwarzschildRadius(M);
    const da = tidalDeltaA(M, L, r);
    root.querySelector('#tf-da').textContent = `${formatSci(da)} m/s²`;
    root.querySelector('#tf-g').textContent = formatNumber(da / 9.81);
    root.querySelector('#tf-msg').textContent =
      +root.querySelector('#tf-M').value > 1e5
        ? 'Supermassive: horizon tides can be mild; danger may wait deeper.'
        : 'Stellar-mass: horizon tides can be extreme (spaghettification near small holes).';
  };
  bindRanges(root, update);
}

export function mountOrbit(root) {
  if (!root) return;
  root.innerHTML = `
  <div class="app-shell">
    <h3 class="app-shell__title">Hidden Mass Orbit Inference</h3>
    <div class="app-controls">
      <div>
        <label for="or-a">Semi-major axis a (AU)</label>
        <input type="range" id="or-a" min="100" max="3000" value="1000"/>
      </div>
      <div>
        <label for="or-T">Period T (years)</label>
        <input type="range" id="or-T" min="1" max="50" step="0.1" value="16"/>
      </div>
    </div>
    <div class="app-panel">
      <div class="metric"><span class="label">Inferred M ≈ 4π²a³/(G T²)</span><span class="value" id="or-m">—</span></div>
      <div class="metric"><span class="label">In solar masses</span><span class="value" id="or-ms">—</span></div>
      <p class="muted">Orbital evidence constrains mass and compactness options; it does not by itself prove every property of an event horizon.</p>
    </div>
  </div>`;

  const AU = 1.495978707e11;
  const YR = 365.25 * 24 * 3600;
  const update = () => {
    const a = +root.querySelector('#or-a').value * AU;
    const T = +root.querySelector('#or-T').value * YR;
    const M = orbitalMass(a, T);
    root.querySelector('#or-m').textContent = `${formatSci(M)} kg`;
    root.querySelector('#or-ms').textContent = formatNumber(M / SOLAR_MASS);
  };
  bindRanges(root, update);
}

export function mountLightBending(root) {
  if (!root) return;
  root.innerHTML = `
  <div class="app-shell">
    <h3 class="app-shell__title">Light-Bending Experiment</h3>
    <div class="app-controls">
      <div>
        <label for="lb-M">Mass (M☉)</label>
        <input type="range" id="lb-M" min="0.1" max="10" step="0.1" value="1"/>
      </div>
      <div>
        <label for="lb-b">Impact parameter b (solar radii)</label>
        <input type="range" id="lb-b" min="1" max="20" step="0.1" value="1"/>
      </div>
    </div>
    <div class="app-panel">
      <div class="metric"><span class="label">α ≈ 4GM/(b c²)</span><span class="value" id="lb-a">—</span></div>
      <div class="metric"><span class="label">In arcseconds</span><span class="value" id="lb-as">—</span></div>
      <p class="faint">Weak-field approximation only — not a full lensing solver. Historic 1919 eclipse tests used starlight near the Sun.</p>
    </div>
  </div>`;

  const update = () => {
    const M = +root.querySelector('#lb-M').value * SOLAR_MASS;
    const b = +root.querySelector('#lb-b').value * SUN_RADIUS;
    const a = weakFieldDeflection(M, b);
    root.querySelector('#lb-a').textContent = `${formatSci(a)} rad`;
    root.querySelector('#lb-as').textContent = formatNumber(a * (180 / Math.PI) * 3600);
  };
  bindRanges(root, update);
}

export const LAB_MOUNTERS = {
  'mass-cancellation': null, // separate module
  elevator: mountElevator,
  'map-globe': mountMapGlobe,
  worldline: mountWorldline,
  'field-equation': mountFieldEquation,
  schwarzschild: mountSchwarzschildScale,
  brick: mountBrickEnergy,
  clock: mountClockRedshift,
  'dual-observer': mountDualObserver,
  tidal: mountTidal,
  orbit: mountOrbit,
  'light-bending': mountLightBending,
};
