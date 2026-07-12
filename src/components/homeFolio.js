import { LESSONS } from '../utils/constants.js';
import { hrefTo } from '../utils/paths.js';
import { provenanceBadge } from './provenance.js';

export function renderHomeFolio(progress, completed) {
  return `
<section class='lesson-home-hero'>
  <div><p class='folio-kicker'>Private-press scientific course · evidence-labeled</p><h1>Essence of General Relativity</h1><p class='lead'>Follow one conceptual thread from Einstein’s most suspicious coincidence to curved spacetime, horizons, and nature’s verdict.</p><p><a class='btn btn-primary' href='${hrefTo('lessons/01-coincidence.html')}'>Begin the first seminar</a> <a class='btn' href='${hrefTo('review/capstone.html')}'>Open the capstone</a></p></div>
  <aside class='home-volume-note'><div class='folio-number'>I</div><h2>The argument, not a survey</h2><p>Seven linked seminars grounded in Adam Brown’s lecture. Board writing is reconstructed and confidence-labeled; added GR background is marked separately.</p><p class='faint'>Progress · ${completed} of ${LESSONS.length} seminars complete</p></aside>
</section>
<nav class='argument-chain' aria-label='Course argument'><span>Mass equality</span><span>Equivalence</span><span>Geometry</span><span>Field equation</span><span>Horizons</span><span>Evidence</span></nav>
<section><p class='folio-kicker'>Course map</p><h2>Seven seminars, one chain of reasoning</h2><div class='folio-course-map'>
${LESSONS.map((lesson) => { const status=progress.lessons?.[lesson.id]?.status || 'not started'; return `<a class='folio-lesson-row' href='${hrefTo(lesson.href)}'><span class='folio-num'>${lesson.number}</span><h3>${lesson.title}</h3><p>${lesson.insight}</p><span class='status'>${status} · ~${lesson.minutes} min</span></a>`; }).join('')}
</div></section>
<section class='folio-supplements' aria-label='Course companions'>
  <article><p class='folio-kicker'>Laboratory</p><h3>Visual experiments</h3><p>Manipulate equivalence, worldlines, redshift, tides, and evidence rather than merely reading about them.</p><a href='${hrefTo('visual-lab/index.html')}'>Enter the Visual Lab</a></article>
  <article><p class='folio-kicker'>Practice</p><h3>Retrieval and diagnosis</h3><p>Prediction prompts, misconception checks, flashcards, and teach-back exercises make the chain durable.</p><a href='${hrefTo('practice/index.html')}'>Open practice</a></article>
  <article><p class='folio-kicker'>Appendices</p><h3>The Einstein Archive</h3><p>Friends, rivals, quantum debates, Nobel history, Turing and Shannon—every anecdote carries an evidence status.</p><a href='${hrefTo('archive/index.html')}'>Enter the archive</a></article>
</section>
<section><h2>How to read the evidence</h2><div class='legend'>${provenanceBadge({type:'transcript',title:'Lecture',detail:'Directly supported by Brown’s spoken lecture with timestamps.'})}${provenanceBadge({type:'board-reconstruction',title:'Board reconstruction',detail:'Inferred teaching redraw with an explicit confidence label.'})}${provenanceBadge({type:'gr-supplement',title:'GR supplement',detail:'Established background added for coherence.'})}${provenanceBadge({type:'disputed',title:'Disputed history',detail:'A historical interpretation for which the evidence does not support a simple verdict.'})}</div><p class='muted'>The transcript is the course spine. Reconstructions never claim to reproduce Brown’s board exactly, and historical material distinguishes documents, recollections, near-encounters, and contested stories.</p></section>
  `;
}

/* home-folio-end */
