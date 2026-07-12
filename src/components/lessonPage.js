import { lessons } from '../content/lessons.js';
import { LESSONS } from '../utils/constants.js';
import { provenanceBadge } from './provenance.js';
import { renderMath } from './equations.js';
import { renderLessonNav } from './shell.js';
import { mountMassCancellation } from '../apps/massCancellation.js';
import { LAB_MOUNTERS } from '../apps/labs.js';
import { markLessonStatus, getProgress } from '../utils/storage.js';
import { hrefTo } from '../utils/paths.js';
import { renderSeminarOpening } from './seminarOpening.js';

const APP_MOUNT = {
  'mass-cancellation': mountMassCancellation,
  ...LAB_MOUNTERS,
};

export function mountLessonPage(lessonId) {
  const lesson = lessons[lessonId];
  if (!lesson) return;

  const main = document.getElementById('main');
  if (!main) return;

  const meta = LESSONS.find((l) => l.id === lessonId);
  const idx = LESSONS.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? LESSONS[idx - 1] : null;
  const next = idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null;

  markLessonStatus(lessonId, 'in-progress');

  const bq = lesson.brownQuestion;
  let html = `
    <div class="breadcrumb">
      <a href="${hrefTo('index.html')}">Course Index</a> / Lesson ${lesson.number} / ${lesson.title}
    </div>
    <header class='folio-lesson-header'>
      <a class='folio-prevnext prev' href='${hrefTo(prev ? prev.href : 'index.html')}'>Previous<span>${prev ? prev.shortLabel : 'Course index'}</span></a>
      <a class='folio-prevnext next' href='${hrefTo(next ? next.href : 'review/capstone.html')}'>Next<span>${next ? next.shortLabel : 'Capstone review'}</span></a>
      <p class='folio-kicker'>Seminar folio · lesson ${lesson.number}</p>
      <div class="meta-row">
        <span>Lesson ${lesson.number}</span>
        <span>~${lesson.minutes} min</span>
        <span id="lesson-status-label"></span>
      </div>
      <h1>${lesson.title}</h1>
      <p class="lead insight">${lesson.insight}</p>
    </header>

    <div class='folio-lesson-grid'>
    <aside class='folio-margin'>
      <section><h2>From the lecture</h2><p>Lesson ${lesson.number} · ${bq.start}–${bq.end}</p><p>Transcript-grounded; board figures are labeled reconstructions.</p></section>
    <nav class="toc" aria-label="Lesson sections">
      <strong>In this lesson</strong>
      <ol>
        ${lesson.sections.map((s) => `<li><a href="#${s.id}">${s.title}</a></li>`).join('')}
        <li><a href="#math-rungs">Mathematics rungs</a></li>
        <li><a href="#practice">Practice</a></li>
        <li><a href="#teach-back">Teach-back</a></li>
      </ol>
    </nav>

    <section><h2>Adam Brown</h2><p>“${bq.text}”</p></section>
    </aside>
    <article class='folio-reading'>
      ${lessonId === 'lesson-1' ? renderSeminarOpening() : ''}

    <section class="section-block" id="brown-question">
      <h2>Brown's question</h2>
      <div class="callout">
        <p style="margin:0;font-size:1.1rem;">“${bq.text}”</p>
        <p style="margin:0.5rem 0 0;">
          ${provenanceBadge({ type: 'transcript', start: bq.start, end: bq.end, title: "Brown's framing question", detail: bq.text })}
        </p>
      </div>
      <div class="prediction-box card" style="margin-top:1rem;">
        <h3 style="margin-top:0;">Your prediction</h3>
        <p class="muted">Before reading on, jot what you already think — one or two sentences.</p>
        <textarea id="lesson-prediction" aria-label="Lesson prediction"></textarea>
        <button type="button" class="btn" id="save-lesson-pred">Save note locally</button>
        <p class="faint" id="pred-saved" hidden>Saved in this browser.</p>
      </div>
    </section>
  `;

  for (const section of lesson.sections) {
    html += `<section class="section-block" id="${section.id}">
      <h2>${section.title}</h2>`;
    if (section.provenance) {
      html += `<p>${provenanceBadge({
        type: section.provenance.type,
        start: section.provenance.start,
        end: section.provenance.end,
        title: section.title,
        detail: section.provenance.detail || '',
      })}</p>`;
    }
    html += section.html;
    if (section.app) {
      html += `<div id="app-${section.app}" data-app="${section.app}"></div>`;
    }
    html += `</section>`;
  }

  html += `
    <section class="section-block" id="math-rungs">
      <h2>Three-rung mathematics</h2>
      <div class="math-rungs">
        <details class="rung" open>
          <summary>Rung A — Words &amp; pictures</summary>
          <div class="rung-body"><p>${lesson.mathRungs.a}</p></div>
        </details>
        <details class="rung">
          <summary>Rung B — Algebra</summary>
          <div class="rung-body"><p>${lesson.mathRungs.b}</p></div>
        </details>
        <details class="rung">
          <summary>Rung C — Optional theory window</summary>
          <div class="rung-body"><p>${lesson.mathRungs.c}</p></div>
        </details>
      </div>
    </section>

    <section class="section-block" id="practice">
      <h2>Practice</h2>
      <div id="practice-root"></div>
    </section>

    <section class="section-block" id="teach-back">
      <h2>Teach-back</h2>
      <div class="card">
        <p>${lesson.teachBack}</p>
        <textarea id="teachback" aria-label="Teach-back response" placeholder="Explain in your own words…"></textarea>
        <button type="button" class="btn btn-primary" id="complete-lesson">Mark lesson complete</button>
        <p class="faint" id="complete-msg" hidden>Progress saved. Continue when ready.</p>
      </div>
    </section>

    </article></div>

    <div class="connections">
      <h3>Connections</h3>
      <div class="chip-row">
        <a class="chip" href="${hrefTo('visual-lab/index.html')}">Visual Lab</a>
        <a class="chip" href="${hrefTo('practice/index.html')}">Practice clinic</a>
        <a class="chip" href="${hrefTo('reference/index.html')}">Reference &amp; math</a>
        ${prev ? `<a class="chip" href="${hrefTo(prev.href)}">Prerequisite: Lesson ${prev.number}</a>` : ''}
        ${next ? `<a class="chip" href="${hrefTo(next.href)}">Next: Lesson ${next.number}</a>` : `<a class="chip" href="${hrefTo('review/capstone.html')}">Capstone review</a>`}
      </div>
    </div>

    <nav class="lesson-nav" id="lesson-nav" aria-label="Lesson previous and next"></nav>
  `;

  main.innerHTML = html;
  const equalityToggle = document.getElementById('equality-toggle');
  equalityToggle?.addEventListener('click', () => {
    const board = document.getElementById('seminar-board');
    const on = equalityToggle.getAttribute('aria-pressed') !== 'true';
    equalityToggle.setAttribute('aria-pressed', String(on));
    equalityToggle.textContent = on ? 'Hide equality' : 'Show equality';
    board?.classList.toggle('equality-on', on);
  });
  renderLessonNav({
    prev: prev ? { href: prev.href, title: `Lesson ${prev.number}: ${prev.shortLabel}` } : null,
    next: next ? { href: next.href, title: `Lesson ${next.number}: ${next.shortLabel}` } : null,
  });

  // Apps
  main.querySelectorAll('[data-app]').forEach((node) => {
    const key = node.dataset.app;
    const mount = APP_MOUNT[key];
    if (typeof mount === 'function') mount(node);
  });

  // Practice questions
  const practiceRoot = document.getElementById('practice-root');
  practiceRoot.innerHTML = lesson.questions
    .map(
      (q, i) => `
    <div class="practice-item" data-qid="${q.id}">
      <p><strong>${i + 1}.</strong> ${q.prompt}</p>
      <div class="choices">
        ${q.choices
          .map(
            (c, j) =>
              `<button type="button" class="btn choice" data-idx="${j}">${c}</button>`
          )
          .join('')}
      </div>
      <div class="feedback" role="status"></div>
    </div>`
    )
    .join('');

  practiceRoot.querySelectorAll('.practice-item').forEach((item) => {
    const q = lesson.questions.find((x) => x.id === item.dataset.qid);
    item.querySelectorAll('.choice').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.idx;
        item.querySelectorAll('.choice').forEach((b) => {
          b.classList.remove('correct', 'incorrect');
          b.disabled = true;
        });
        const ok = idx === q.answer;
        btn.classList.add(ok ? 'correct' : 'incorrect');
        item.querySelectorAll('.choice')[q.answer].classList.add('correct');
        const fb = item.querySelector('.feedback');
        fb.classList.add('show');
        fb.innerHTML = `<strong>${ok ? 'Good.' : 'Not quite.'}</strong> ${q.explain}
          <p style="margin:0.5rem 0 0;"><button type="button" class="btn btn-ghost retry">Try again</button></p>`;
        fb.querySelector('.retry')?.addEventListener('click', () => {
          item.querySelectorAll('.choice').forEach((b) => {
            b.disabled = false;
            b.classList.remove('correct', 'incorrect');
          });
          fb.classList.remove('show');
          fb.innerHTML = '';
        });
      });
    });
  });

  document.getElementById('save-lesson-pred')?.addEventListener('click', () => {
    document.getElementById('pred-saved').hidden = false;
  });

  document.getElementById('complete-lesson')?.addEventListener('click', () => {
    markLessonStatus(lessonId, 'completed', 'teach-back');
    document.getElementById('complete-msg').hidden = false;
    document.getElementById('lesson-status-label').textContent = 'Completed';
  });

  const st = getProgress().lessons?.[lessonId]?.status;
  if (st === 'completed') {
    document.getElementById('lesson-status-label').textContent = 'Completed';
  } else {
    document.getElementById('lesson-status-label').textContent = 'In progress';
  }

  renderMath(main);

  // Focus main heading for accessibility after navigation
  main.querySelector('h1')?.setAttribute('tabindex', '-1');
  main.querySelector('h1')?.focus({ preventScroll: true });
}
