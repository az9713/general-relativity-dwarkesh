import { formatNumber } from '../utils/math.js';
import { getPrediction, savePrediction } from '../utils/storage.js';

const G = 6.6743e-11;

/**
 * Mass Cancellation Lab — Lesson 1 required application.
 */
export function mountMassCancellation(root) {
  if (!root) return;

  const pred = getPrediction('mass-cancellation-l1');

  root.innerHTML = `
    <div class="app-shell" id="mass-cancellation-lab">
      <h3 class="app-shell__title">Mass Cancellation Lab</h3>
      <p class="muted">Explore why equal inertial and gravitational mass makes free-fall acceleration independent of the test body.</p>

      <div class="prediction-box card" id="mc-prediction-box" ${pred ? 'hidden' : ''}>
        <h4 style="margin-top:0;">Prediction (before controls)</h4>
        <p>A 1&nbsp;kg object and a 10&nbsp;kg object are released at the same location in vacuum. Gravity pulls ten times harder on the 10&nbsp;kg object. Which one accelerates faster, and why?</p>
        <textarea id="mc-prediction" aria-label="Your prediction">${pred?.text || ''}</textarea>
        <button type="button" class="btn btn-primary" id="mc-save-pred">Save prediction &amp; explore</button>
      </div>

      <div id="mc-lab" ${pred ? '' : 'hidden'}>
        <div class="app-controls">
          <div>
            <label for="mc-M">Source mass M (kg) — e.g. Earth ~ 6×10²⁴</label>
            <input type="range" id="mc-M" min="22" max="26" step="0.1" value="24.78"/>
            <div class="faint" id="mc-M-label"></div>
          </div>
          <div>
            <label for="mc-mi">Test inertial mass m<sub>i</sub> (kg)</label>
            <input type="range" id="mc-mi" min="0.1" max="20" step="0.1" value="1"/>
            <div class="faint" id="mc-mi-label"></div>
          </div>
          <div>
            <label for="mc-mg">Test gravitational mass m<sub>g</sub> (kg)</label>
            <input type="range" id="mc-mg" min="0.1" max="20" step="0.1" value="1"/>
            <div class="faint" id="mc-mg-label"></div>
          </div>
          <div>
            <label>
              <input type="checkbox" id="mc-lock" checked/>
              Lock real-world equality m<sub>i</sub> = m<sub>g</sub>
            </label>
            <label style="margin-top:0.5rem;">
              <input type="checkbox" id="mc-electric"/>
              Compare with electric charge-to-mass ratio
            </label>
            <div id="mc-q-wrap" hidden>
              <label for="mc-q">Charge q (arbitrary units)</label>
              <input type="range" id="mc-q" min="0.1" max="10" step="0.1" value="1"/>
            </div>
          </div>
        </div>

        <div class="app-display">
          <div class="app-panel">
            <h4>Falling test bodies</h4>
            <div class="fall-viz" aria-hidden="true">
              <div class="body body-a" id="mc-body-a"></div>
              <div class="body body-b" id="mc-body-b"></div>
              <div class="ground"></div>
            </div>
            <p class="faint" id="mc-anim-caption">Positions update with acceleration (illustrative, not to scale).</p>
          </div>
          <div class="app-panel">
            <h4>Live values</h4>
            <div class="metric"><span class="label">Force on A (1 kg baseline)</span><span class="value" id="mc-f-a">—</span></div>
            <div class="metric"><span class="label">Force on B (current m<sub>g</sub>)</span><span class="value" id="mc-f-b">—</span></div>
            <div class="metric"><span class="label">Acceleration of A</span><span class="value" id="mc-a-a">—</span></div>
            <div class="metric"><span class="label">Acceleration of B</span><span class="value" id="mc-a-b">—</span></div>
            <div class="metric"><span class="label">m<sub>g</sub> / m<sub>i</sub></span><span class="value" id="mc-ratio">—</span></div>
            <div class="metric" id="mc-e-row" hidden><span class="label">Electric a ∝ q/m<sub>i</sub></span><span class="value" id="mc-e-a">—</span></div>
          </div>
        </div>

        <div class="callout" id="mc-observe">
          <strong>Observation:</strong> <span id="mc-observe-text"></span>
        </div>
        <details class="rung">
          <summary>Why?</summary>
          <div class="rung-body">
            <p>Newton’s second law: <span data-math="F = m_i a"></span>. Newtonian gravity: <span data-math="F_g = G M m_g / r^2"></span>.</p>
            <p>Combining: <span data-math="a = (m_g / m_i)\\, G M / r^2"></span>. When <span data-math="m_i = m_g"></span>, the test-body masses cancel and <span data-math="a = G M / r^2"></span>.</p>
            <p>That equality is an <em>empirical fact</em>, not a definition forced by Newtonian mechanics. Electric charge is independent of inertial mass, so accelerations in an electric field depend on <span data-math="q/m_i"></span>.</p>
          </div>
        </details>
        <details class="rung">
          <summary>Assumptions &amp; limitations</summary>
          <div class="rung-body">
            <ul class="clean">
              <li>Newtonian weak-field treatment (not GR)</li>
              <li>Test bodies do not appreciably affect the source</li>
              <li>Vacuum; same release event and initial velocity</li>
              <li>Nongravitational forces neglected</li>
              <li>Equality of inertial and gravitational mass is an empirical input</li>
              <li>Unlocked inequality is a <strong>hypothetical universe</strong>, not real measured physics</li>
            </ul>
          </div>
        </details>
        <div class="card" style="margin-top:1rem;">
          <h4 style="margin-top:0;">Transfer question</h4>
          <p>If two electrically charged particles have the same charge but different inertial masses, should they have the same acceleration in the same electric field? Explain the contrast with gravity.</p>
        </div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem;">
          <button type="button" class="btn" id="mc-reset">Reset</button>
          <button type="button" class="btn btn-ghost" id="mc-show-pred">Show my prediction</button>
        </div>
        <p class="faint" id="mc-pred-view" hidden></p>
      </div>
    </div>
  `;

  const $ = (id) => root.querySelector(id);
  const r = 6.371e6; // fixed Earth radius for force scale
  let raf = 0;
  let t0 = performance.now();

  function M() {
    return 10 ** Number($('#mc-M').value);
  }
  function mi() {
    return Number($('#mc-mi').value);
  }
  function mg() {
    return Number($('#mc-mg').value);
  }

  function syncLock() {
    if ($('#mc-lock').checked) {
      $('#mc-mg').value = $('#mc-mi').value;
      $('#mc-mg').disabled = true;
    } else {
      $('#mc-mg').disabled = false;
    }
  }

  function update() {
    syncLock();
    const mass = M();
    const mI = mi();
    const mG = mg();
    $('#mc-M-label').textContent = `${formatNumber(mass)} kg`;
    $('#mc-mi-label').textContent = `${formatNumber(mI)} kg`;
    $('#mc-mg-label').textContent = `${formatNumber(mG)} kg`;

    const fA = (G * mass * 1) / (r * r);
    const fB = (G * mass * mG) / (r * r);
    const aA = fA / 1;
    const aB = fB / mI;
    const ratio = mG / mI;

    $('#mc-f-a').textContent = `${formatNumber(fA)} N`;
    $('#mc-f-b').textContent = `${formatNumber(fB)} N`;
    $('#mc-a-a').textContent = `${formatNumber(aA)} m/s²`;
    $('#mc-a-b').textContent = `${formatNumber(aB)} m/s²`;
    $('#mc-ratio').textContent = formatNumber(ratio);

    const electric = $('#mc-electric').checked;
    $('#mc-q-wrap').hidden = !electric;
    $('#mc-e-row').hidden = !electric;
    if (electric) {
      const q = Number($('#mc-q').value);
      $('#mc-e-a').textContent = formatNumber(q / mI);
    }

    if ($('#mc-lock').checked) {
      $('#mc-observe-text').textContent =
        'With mᵢ = mᵍ locked, changing the test mass changes the force but not the acceleration. Both bodies share the same a.';
    } else if (Math.abs(ratio - 1) < 0.02) {
      $('#mc-observe-text').textContent =
        'mᵢ ≈ mᵍ even though unlocked — accelerations match. This is the real-world case, but it is not forced by the form of F = ma alone.';
    } else {
      $('#mc-observe-text').textContent =
        'Hypothetical universe: mᵍ/mᵢ ≠ 1, so gravitational acceleration depends on the test body. Real gravity does not behave this way.';
    }

    // Animation positions from acceleration ratio
    const reduced = document.documentElement.dataset.reducedMotion === 'true';
    if (reduced) {
      $('#mc-body-a').style.top = '40%';
      $('#mc-body-b').style.top = '40%';
      $('#mc-anim-caption').textContent = 'Reduced motion: static comparison positions.';
    }
  }

  function animate(now) {
    if (document.documentElement.dataset.reducedMotion === 'true') return;
    const mass = M();
    const mI = mi();
    const mG = mg();
    const aA = (G * mass * 1) / (r * r) / 1;
    const aB = (G * mass * mG) / (r * r) / mI;
    const t = ((now - t0) / 1000) % 2.5;
    // Map acceleration to fall distance (clamped)
    const scale = 0.8;
    const yA = Math.min(75, 8 + 0.5 * aA * scale * t * t);
    const yB = Math.min(75, 8 + 0.5 * aB * scale * t * t);
    $('#mc-body-a').style.top = `${yA}%`;
    $('#mc-body-b').style.top = `${yB}%`;
    raf = requestAnimationFrame(animate);
  }

  $('#mc-save-pred')?.addEventListener('click', () => {
    const text = $('#mc-prediction').value.trim();
    if (!text) {
      $('#mc-prediction').focus();
      return;
    }
    savePrediction('mass-cancellation-l1', text);
    $('#mc-prediction-box').hidden = true;
    $('#mc-lab').hidden = false;
    t0 = performance.now();
    update();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(animate);
  });

  ['mc-M', 'mc-mi', 'mc-mg', 'mc-q'].forEach((id) => {
    $(`#${id}`)?.addEventListener('input', () => {
      if (id === 'mc-mi' && $('#mc-lock').checked) $('#mc-mg').value = $('#mc-mi').value;
      update();
    });
  });
  $('#mc-lock')?.addEventListener('change', update);
  $('#mc-electric')?.addEventListener('change', update);
  $('#mc-reset')?.addEventListener('click', () => {
    $('#mc-M').value = 24.78;
    $('#mc-mi').value = 1;
    $('#mc-mg').value = 1;
    $('#mc-lock').checked = true;
    $('#mc-electric').checked = false;
    t0 = performance.now();
    update();
  });
  $('#mc-show-pred')?.addEventListener('click', () => {
    const p = getPrediction('mass-cancellation-l1');
    const view = $('#mc-pred-view');
    if (p) {
      view.hidden = false;
      view.textContent = `Your prediction: ${p.text}`;
    }
  });

  if (pred) {
    update();
    raf = requestAnimationFrame(animate);
  }

  // keyboard: ranges are natively keyboard operable
}
