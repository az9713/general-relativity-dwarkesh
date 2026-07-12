import './styles/main.css';
import { mountShell } from './components/shell.js';
import { mountLessonPage } from './components/lessonPage.js';
import { renderMath } from './components/equations.js';
import { LESSONS } from './utils/constants.js';
import { getProgress } from './utils/storage.js';
import { hrefTo } from './utils/paths.js';
import { lessons } from './content/lessons.js';
import { misconceptions, flashcards, atlas } from './content/practice.js';
import {
  tenYearAscent,
  people,
  quantumSalon,
  turingShannon,
  nobelDossier,
  archiveMeta,
} from './content/archive.js';
import { provenanceBadge } from './components/provenance.js';
import { renderHomeFolio } from './components/homeFolio.js';
import { renderSeminarOpening } from './components/seminarOpening.js';
import { LESSON1_PLATES, renderBoardPlate } from './apps/boardPlates.js';
import { mountMassCancellation } from './apps/massCancellation.js';
import { LAB_MOUNTERS } from './apps/labs.js';
import {
  schwarzschildRadius,
  formatNumber,
} from './utils/math.js';
import { SOLAR_MASS } from './utils/constants.js';

function pageType() {
  return document.body.dataset.page || 'home';
}

function mountHome() {
  const main = document.getElementById('main');
  const progress = getProgress();
  const completed = LESSONS.filter((l) => progress.lessons?.[l.id]?.status === 'completed').length;

  main.innerHTML = renderHomeFolio(progress, completed);
  return;

  main.innerHTML = `
    <div class="hero">
      <h1>Essence of General Relativity</h1>
      <p class="lead">A concept-first course whose spine is Adam Brown’s lecture: from the mass coincidence to curved spacetime, black holes, and evidence — with every claim tagged by provenance.</p>
      <div class="hero-chain" aria-label="Conceptual chain">
        <span class="step">Mass equality</span><span class="arrow">→</span>
        <span class="step">Equivalence</span><span class="arrow">→</span>
        <span class="step">Geometry</span><span class="arrow">→</span>
        <span class="step">Field equation</span><span class="arrow">→</span>
        <span class="step">Horizons</span><span class="arrow">→</span>
        <span class="step">Evidence</span>
      </div>
      <p>
        <a class="btn btn-primary" href="${hrefTo('lessons/01-coincidence.html')}">Begin Lesson 1</a>
        <a class="btn" href="${hrefTo('review/capstone.html')}">Capstone review</a>
      </p>
      <p class="muted">Progress: ${completed} / ${LESSONS.length} lessons completed (stored locally).</p>
    </div>

    <section>
      <h2>Course map</h2>
      <div class="lesson-cards">
        ${LESSONS.map((l) => {
          const st = progress.lessons?.[l.id]?.status || 'not started';
          return `<a class="lesson-card" href="${hrefTo(l.href)}">
            <div class="num">Lesson ${l.number} · ${st}</div>
            <h3>${l.title}</h3>
            <p>${l.insight}</p>
            <p class="faint">~${l.minutes} min</p>
          </a>`;
        }).join('')}
      </div>
    </section>

    <section>
      <h2>Provenance legend</h2>
      <div class="legend">
        ${provenanceBadge({ type: 'transcript', title: 'Lecture', detail: 'Directly supported by Brown’s spoken lecture with timestamps.' })}
        ${provenanceBadge({ type: 'board-reconstruction', title: 'Board', detail: 'Inferred board content with confidence labels — never a facsimile claim.' })}
        ${provenanceBadge({ type: 'gr-supplement', title: 'Supplement', detail: 'Established GR background added for coherence.' })}
        ${provenanceBadge({ type: 'disputed', title: 'Disputed history', detail: 'Historical claims with contested interpretations.' })}
      </div>
    </section>

    <section class="grid-2">
      <div class="card">
        <h3 style="margin-top:0;">Visual Lab</h3>
        <p>Board plates and interactive applications in one place.</p>
        <a class="btn" href="${hrefTo('visual-lab/index.html')}">Open Visual Lab</a>
      </div>
      <div class="card">
        <h3 style="margin-top:0;">Einstein Archive</h3>
        <p>Ten-year ascent, constellation of people, quantum salon, near-encounters, Nobel dossier.</p>
        <a class="btn" href="${hrefTo('archive/index.html')}">Enter archive</a>
      </div>
    </section>

    <section>
      <h2>Source attribution</h2>
      <p class="muted">Physics spine grounded in Adam Brown’s conversation with Dwarkesh Patel. Board figures are reconstructions from transcript cues and standard pedagogy, not verified facsimiles of the original board. Historical appendices cite archival and scholarly classes of sources; anecdotes carry evidence status.</p>
    </section>
  `;
}

function mountVisualLab() {
  const main = document.getElementById('main');
  main.innerHTML = `
    <h1>Visual Lab</h1>
    <p class="lead">Reconstructed board plates and interactive scientific mini-applications. Same components as embedded in lessons.</p>
    <h2>Lesson 1 board plates</h2>
    <div id="plates">${renderSeminarOpening()}</div>
    <h2>Applications</h2>
    <div id="lab-mass"></div>
    <div id="lab-elevator"></div>
    <div id="lab-map"></div>
    <div id="lab-world"></div>
    <div id="lab-field"></div>
    <div id="lab-ss"></div>
    <div id="lab-brick"></div>
    <div id="lab-clock"></div>
    <div id="lab-dual"></div>
    <div id="lab-tidal"></div>
    <div id="lab-orbit"></div>
    <div id="lab-light"></div>
  `;
  const equalityToggle = document.getElementById('equality-toggle');
  equalityToggle?.addEventListener('click', () => {
    const on = equalityToggle.getAttribute('aria-pressed') !== 'true';
    equalityToggle.setAttribute('aria-pressed', String(on));
    equalityToggle.textContent = on ? 'Hide equality' : 'Show equality';
    document.getElementById('seminar-board')?.classList.toggle('equality-on', on);
  });
  mountMassCancellation(document.getElementById('lab-mass'));
  LAB_MOUNTERS.elevator(document.getElementById('lab-elevator'));
  LAB_MOUNTERS['map-globe'](document.getElementById('lab-map'));
  LAB_MOUNTERS.worldline(document.getElementById('lab-world'));
  LAB_MOUNTERS['field-equation'](document.getElementById('lab-field'));
  LAB_MOUNTERS.schwarzschild(document.getElementById('lab-ss'));
  LAB_MOUNTERS.brick(document.getElementById('lab-brick'));
  LAB_MOUNTERS.clock(document.getElementById('lab-clock'));
  LAB_MOUNTERS['dual-observer'](document.getElementById('lab-dual'));
  LAB_MOUNTERS.tidal(document.getElementById('lab-tidal'));
  LAB_MOUNTERS.orbit(document.getElementById('lab-orbit'));
  LAB_MOUNTERS['light-bending'](document.getElementById('lab-light'));
  renderMath(main);
}

function mountPractice() {
  const main = document.getElementById('main');
  main.innerHTML = `
    <h1>Practice</h1>
    <p class="lead">Misconception clinic, flashcards, and links back into lessons.</p>
    <h2>Misconception clinic</h2>
    <div id="misc"></div>
    <h2>Flashcards</h2>
    <div id="cards" class="grid-2"></div>
    <p><button type="button" class="btn" id="export-hint">CSV export</button>
    <span class="faint"> Use <code>npm run export:flashcards</code> for a file, or copy below.</span></p>
    <pre id="csv" class="card" style="overflow:auto;display:none;"></pre>
    <h2>Lesson question banks</h2>
    <ul class="clean">
      ${LESSONS.map((l) => `<li><a href="${hrefTo(l.href)}#practice">Lesson ${l.number} practice</a></li>`).join('')}
    </ul>
  `;
  document.getElementById('misc').innerHTML = misconceptions
    .map(
      (m) => `
    <div class="misconception">
      <p><strong>Claim:</strong> ${m.claim}</p>
      <p><strong>Correction:</strong> ${m.correction}</p>
      <p class="faint">Related: ${m.lessonId}</p>
    </div>`
    )
    .join('');
  document.getElementById('cards').innerHTML = flashcards
    .map(
      (c) => `
    <details class="rung"><summary>${c.front}</summary><div class="rung-body">${c.back}</div></details>`
    )
    .join('');
  document.getElementById('export-hint')?.addEventListener('click', () => {
    const csv = ['front,back', ...flashcards.map((c) => `"${c.front.replace(/"/g, '""')}","${c.back.replace(/"/g, '""')}"`)].join('\n');
    const pre = document.getElementById('csv');
    pre.style.display = 'block';
    pre.textContent = csv;
  });
}

function mountReference() {
  const main = document.getElementById('main');
  main.innerHTML = `
    <h1>Reference</h1>
    <h2>Concept atlas</h2>
    <div class="grid-2">
      ${atlas.map((a) => `<div class="card"><h3 style="margin-top:0;">${a.title}</h3><p>${a.body}</p></div>`).join('')}
    </div>
    <h2>Mathematics companion (equation cards)</h2>
    <div class="equation-card">
      <h3 style="margin-top:0;">Schwarzschild radius</h3>
      <div class="eq" data-math="r_s = 2GM/c^2" data-display="true"></div>
      <p><strong>Question:</strong> At what radial scale does the Schwarzschild horizon sit?</p>
      <p><strong>Example:</strong> For 10 M<sub>☉</sub>, r_s ≈ ${formatNumber(schwarzschildRadius(10 * SOLAR_MASS) / 1000)} km.</p>
      <p class="faint"><strong>Misuse:</strong> Applying static formulas to free-fall horizon crossing without comment.</p>
    </div>
    <div class="equation-card">
      <h3 style="margin-top:0;">Einstein field equation</h3>
      <div class="eq" data-math="G_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}" data-display="true"></div>
      <p><strong>Question:</strong> How are geometry and stress-energy related locally?</p>
      <p class="faint">Interpreted, not fully derived, in this course.</p>
    </div>
    <div class="equation-card">
      <h3 style="margin-top:0;">Static redshift factor</h3>
      <div class="eq" data-math="\\sqrt{1-r_s/r}" data-display="true"></div>
      <p>Domain: static observers with r &gt; r_s only.</p>
    </div>
    <div class="equation-card">
      <h3 style="margin-top:0;">Weak-field light deflection</h3>
      <div class="eq" data-math="\\alpha \\approx 4GM/(b c^2)" data-display="true"></div>
    </div>
    <h2>Glossary (compact)</h2>
    <ul class="clean">
      <li><strong>Event horizon</strong> — causal boundary; not a material shell.</li>
      <li><strong>Geodesic</strong> — straightest path given the geometry; free fall for test bodies.</li>
      <li><strong>Proper time</strong> — time along a worldline measured by a clock on that worldline.</li>
      <li><strong>Stress-energy</strong> — source content including energy, momentum, pressure, stress.</li>
      <li><strong>Equivalence (local)</strong> — free fall removes gravity locally; tides limit global equivalence.</li>
    </ul>
  `;
  renderMath(main);
}

function mountArchiveIndex() {
  const main = document.getElementById('main');
  main.innerHTML = `
    <p class="running-title">Private-press scientific biography · Evidence-labeled</p>
    <h1>${archiveMeta.title}</h1>
    <p class="lead">${archiveMeta.subtitle}</p>
    <p class="marginalia">${archiveMeta.note}</p>
    <div class="lesson-cards">
      <a class="lesson-card" href="${hrefTo('archive/ten-year-ascent.html')}"><div class="num">Appendix A</div><h3>The Ten-Year Ascent</h3><p>1905–1915 path to the field equations.</p></a>
      <a class="lesson-card" href="${hrefTo('archive/constellation.html')}"><div class="num">Appendix B</div><h3>Einstein's Constellation</h3><p>Friends, rivals, collaborators — relationship strengths from evidence.</p></a>
      <a class="lesson-card" href="${hrefTo('archive/quantum-salon.html')}"><div class="num">Appendix C</div><h3>The Quantum Salon</h3><p>Founder and critic; Solvay 1927 seating sketch.</p></a>
      <a class="lesson-card" href="${hrefTo('archive/turing-shannon.html')}"><div class="num">Appendix D</div><h3>Turing &amp; Shannon</h3><p>Near-encounters with correct evidence labels.</p></a>
      <a class="lesson-card" href="${hrefTo('archive/nobel-dossier.html')}"><div class="num">Appendix E</div><h3>Nobel Dossier</h3><p>The prize he won — and comparison with Curie done carefully.</p></a>
    </div>
  `;
}

function mountTenYear() {
  const main = document.getElementById('main');
  main.innerHTML = `
    <p class="folio">Appendix A</p>
    <h1>${tenYearAscent.title}</h1>
    <p class="lead">${tenYearAscent.subtitle}</p>
    <div class="timeline">
      ${tenYearAscent.chapters
        .map(
          (c) => `
        <div class="timeline-item">
          <div class="year">${c.year} · ${c.title}</div>
          <p>${c.body}</p>
          <p>${provenanceBadge({ type: c.status === 'documented' ? 'documented' : c.status, title: c.title, detail: c.body + ' Sources: ' + c.sources.join('; ') })}</p>
        </div>`
        )
        .join('')}
    </div>
  `;
}

function mountConstellation() {
  const main = document.getElementById('main');
  main.innerHTML = `
    <p class="folio">Appendix B</p>
    <h1>Einstein's Constellation</h1>
    <p class="lead">Friends, rivals, collaborators, protégés, and difficult allies — edge strength reflects evidence, not fame.</p>
    <div class="person-grid">
      ${people
        .map(
          (p) => `
        <article class="person-card" id="${p.id}">
          <h3>${p.name}</h3>
          <p class="faint">${p.lifespan}</p>
          <div>${p.relations.map((r) => `<span class="relation-tag">${r}</span>`).join('')}</div>
          <p><strong>Scientific connection:</strong> ${p.scientific}</p>
          <p><strong>Friction:</strong> ${p.friction}</p>
          <p class="status-tag">${p.anecdoteStatus}</p>
          <p class="faint">Sources: ${p.sources.join('; ')}</p>
        </article>`
        )
        .join('')}
    </div>
    <p class="muted">Additional figures named in the plan (Tagore, Du Bois, Robeson, Queen Elisabeth, Rutherford, von Neumann, Szilard, Russell, de Sitter, Lemaître, Bose, Dirac, Lorentz, Planck, …) follow the same template: no unsupported friendship edges. Expand profiles using CPAE, Nobel archives, and peer-reviewed history before elevating anecdotes.</p>
  `;
}

function mountQuantum() {
  const main = document.getElementById('main');
  main.innerHTML = `
    <p class="folio">Appendix C</p>
    <h1>${quantumSalon.title}</h1>
    <p class="lead">${quantumSalon.subtitle}</p>
    <h2>Contribution timeline</h2>
    <div class="timeline">
      ${quantumSalon.timeline.map((t) => `<div class="timeline-item"><div class="year">${t.year}</div><p>${t.item}</p></div>`).join('')}
    </div>
    <h2>How to read Einstein on quantum theory</h2>
    <ul class="clean">${quantumSalon.interpretation.map((i) => `<li>${i}</li>`).join('')}</ul>
    <h2>1927 Solvay seating sketch (interactive)</h2>
    <p class="faint">Pedagogical selectable roster — not a claim of exact chair coordinates. Click a participant.</p>
    <div class="solvay-grid" id="solvay"></div>
    <div class="card" id="solvay-detail"><p>Select a participant.</p></div>
  `;
  const grid = document.getElementById('solvay');
  grid.innerHTML = quantumSalon.solvay1927
    .map(
      (s, i) =>
        `<button type="button" class="solvay-seat" data-i="${i}" aria-pressed="false"><strong>${s.name}</strong><br/>${s.nobel}</button>`
    )
    .join('');
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.solvay-seat');
    if (!btn) return;
    grid.querySelectorAll('.solvay-seat').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    const s = quantumSalon.solvay1927[+btn.dataset.i];
    document.getElementById('solvay-detail').innerHTML = `
      <h3 style="margin-top:0;">${s.name}</h3>
      <p>Age in 1927 (approx.): ${s.age}</p>
      <p>${s.note}</p>
      <p>Nobel: ${s.nobel}</p>
      <p>Quantum stance (compressed): ${s.stance}</p>
      <p class="faint">Statuses are historical compressions for learning — expand via Solvay proceedings and biographies for research use.</p>`;
  });
}

function mountTuring() {
  const main = document.getElementById('main');
  main.innerHTML = `
    <p class="folio">Appendix D</p>
    <h1>${turingShannon.title}</h1>
    <div class="card">
      <h2 style="margin-top:0;">Alan Turing</h2>
      <p>${turingShannon.turing.body}</p>
      <p class="status-tag">${turingShannon.turing.label}</p>
      <p>${provenanceBadge({ type: 'near-encounter', title: 'Turing–Einstein', detail: turingShannon.turing.body + ' ' + turingShannon.turing.sources.join('; ') })}</p>
    </div>
    <div class="card" style="margin-top:1rem;">
      <h2 style="margin-top:0;">Claude Shannon</h2>
      <p>${turingShannon.shannon.body}</p>
      <p class="status-tag">${turingShannon.shannon.label}</p>
      <p>${provenanceBadge({ type: 'first-person-recollection', title: 'Shannon–Einstein', detail: turingShannon.shannon.body })}</p>
    </div>
  `;
}

function mountNobel() {
  const main = document.getElementById('main');
  main.innerHTML = `
    <p class="folio">Appendix E</p>
    <h1>${nobelDossier.title}</h1>
    <h2>Einstein</h2>
    <ul class="clean">${nobelDossier.einstein.map((x) => `<li>${x}</li>`).join('')}</ul>
    <h2>Marie Curie comparison</h2>
    <ul class="clean">${nobelDossier.curie.map((x) => `<li>${x}</li>`).join('')}</ul>
    <div class="callout warning"><strong>Ranking warning:</strong> Nobel totals are not lifetime scientific rankings.</div>
    <h2>Committee simulation</h2>
    <p class="muted">Choose with only then-available institutional instincts — then reveal the historical arc. No single counterfactual is “objectively correct.”</p>
    <div id="nobel-sim"></div>
  `;
  const host = document.getElementById('nobel-sim');
  host.innerHTML = nobelDossier.simYears
    .map(
      (sim, i) => `
    <div class="nobel-sim" style="margin-bottom:1rem;" data-i="${i}">
      <h3>Year ${sim.year}</h3>
      <p>${sim.prompt}</p>
      <div class="options">
        ${sim.options.map((o, j) => `<button type="button" class="btn choice" data-j="${j}">${o}</button>`).join('')}
      </div>
      <div class="feedback" id="nf-${i}"></div>
    </div>`
    )
    .join('');
  host.querySelectorAll('.nobel-sim').forEach((box) => {
    const sim = nobelDossier.simYears[+box.dataset.i];
    box.querySelectorAll('.choice').forEach((btn) => {
      btn.addEventListener('click', () => {
        const fb = box.querySelector('.feedback');
        fb.classList.add('show');
        fb.innerHTML = `<p><strong>Your selection:</strong> ${btn.textContent}</p><p><strong>Historical note:</strong> ${sim.historical}</p>`;
      });
    });
  });
}

function mountCapstone() {
  const main = document.getElementById('main');
  main.innerHTML = `
    <h1>Capstone Review</h1>
    <p class="lead">Reconstruct the full argument from mass equality to curved spacetime, black holes, and evidence — in your own words.</p>
    <ol class="clean">
      <li>Why is mᵢ = m_g surprising compared with electric charge?</li>
      <li>How does free fall motivate the equivalence idea, and why is it local?</li>
      <li>What does it mean to say free fall is geodesic motion?</li>
      <li>What do the two sides of Einstein’s equation represent?</li>
      <li>Why is the horizon a causal boundary rather than a shell?</li>
      <li>How do distant and infalling accounts fit together?</li>
      <li>Name independent evidence channels for compact objects / GR in the strong field.</li>
    </ol>
    <textarea id="capstone" placeholder="Write your teach-back of the whole chain…" style="min-height:12rem;"></textarea>
    <p style="margin-top:1rem;">
      <a class="btn" href="${hrefTo('archive/index.html')}">Optional: Einstein Archive</a>
      <a class="btn btn-primary" href="${hrefTo('index.html')}">Return to course index</a>
    </p>
  `;
}

function boot() {
  mountShell();
  const type = pageType();
  const lessonId = document.body.dataset.lessonId;

  if (type === 'home') mountHome();
  else if (type === 'lesson' && lessonId) mountLessonPage(lessonId);
  else if (type === 'visual-lab') mountVisualLab();
  else if (type === 'practice') mountPractice();
  else if (type === 'reference') mountReference();
  else if (type === 'archive-index') mountArchiveIndex();
  else if (type === 'archive-ten-year') mountTenYear();
  else if (type === 'archive-constellation') mountConstellation();
  else if (type === 'archive-quantum') mountQuantum();
  else if (type === 'archive-turing') mountTuring();
  else if (type === 'archive-nobel') mountNobel();
  else if (type === 'capstone') mountCapstone();
  else mountHome();

  renderMath(document.getElementById('main'));
}

boot();
