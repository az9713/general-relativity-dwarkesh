import { hrefTo } from '../utils/paths.js';

export function renderSeminarOpening() {
  return `
<section class='seminar-opening' aria-labelledby='seminar-board-title'>
  <div class='seminar-board' id='seminar-board' style="background-image:url('${hrefTo('assets/seminar-chalkboard.png')}')">
    <div class='board-caption' id='seminar-board-title'>Board reconstruction · teaching redraw · high confidence</div>
    <div class='board-argument'>
      <div class='board-step'><h3>1 · Inertial response</h3><div class='eq' data-math='F = m_i a' data-display='true'></div><p><span class='mass-i'>mᵢ</span> measures resistance to acceleration.</p></div>
      <div class='board-step'><h3>2 · Gravitational force</h3><div class='eq' data-math='F_g = \\frac{GMm_g}{r^2}' data-display='true'></div><p><span class='mass-g'>mᵍ</span> measures coupling to gravity.</p></div>
      <div class='board-step'><h3>3 · Empirical equality</h3><div class='equality-layer'><div class='eq' data-math='m_i = m_g' data-display='true'></div><p>Experiment says these distinct roles have equal magnitude.</p></div></div>
    </div>
    <div class='board-result'><div class='eq' data-math='m_i a = \\frac{GMm_g}{r^2} \\;\\Longrightarrow\\; a = \\frac{GM}{r^2}' data-display='true'></div><p>The acceleration no longer knows which test body is falling.</p></div>
  </div>
  <div class='seminar-board-controls'><span>Lay the empirical equality over the argument</span><button type='button' class='switch-button' id='equality-toggle' aria-pressed='false'>Show equality</button></div>
  <div class='chronograph' aria-label='Free-fall chronograph'>
    <div class='chrono-body'><strong>Test body A</strong><span>1 kg</span><small>gravitational force 9.81 N</small></div>
    <div class='chrono-body'><strong>Test body B</strong><span>10 kg</span><small>gravitational force 98.1 N</small></div>
    <div class='chrono-reading'><strong>Shared acceleration</strong><output>9.81 m/s²</output><small>same trajectory in vacuum</small></div>
  </div>
  <div class='einstein-prompt'><img src='${hrefTo('assets/einstein-engraving.png')}' alt='Engraved illustration of Albert Einstein'/><div><h2>What surprised Einstein?</h2><p>Gravity pulls ten times harder on the ten-kilogram body—yet its inertia is also ten times greater. Why should nature arrange those two roles to match exactly?</p></div><a class='btn' href='#s1-cancel'>Reveal the insight</a></div>
</section>
  `;
}

/* seminar-opening-end */
