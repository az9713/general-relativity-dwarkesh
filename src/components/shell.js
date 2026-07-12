import { LESSONS, ARCHIVE_PAGES } from '../utils/constants.js';
import { hrefTo, currentPageKey } from '../utils/paths.js';
import { getProgress, getPrefs, setPrefs, setLastLocation } from '../utils/storage.js';
import { openDrawer, closeDrawer } from './provenance.js';

function isArchivePage() {
  return /archive[\\/]/.test(window.location.pathname) || document.body.classList.contains('archive-theme');
}

function lessonStatus(lessonId) {
  const p = getProgress().lessons?.[lessonId];
  return p?.status || 'not-started';
}

function activeLessonId() {
  return document.body.dataset.lessonId || null;
}

function globalNavHtml() {
  const key = currentPageKey();
  const items = [
    { label: 'Lessons', href: 'index.html', match: () => key.includes('coincidence') || key === 'index.html' || key.startsWith('0') },
    { label: 'Visual Lab', href: 'visual-lab/index.html', match: () => key === 'index.html' && location.pathname.includes('visual-lab') },
    { label: 'Practice', href: 'practice/index.html', match: () => location.pathname.includes('practice') },
    { label: 'Reference', href: 'reference/index.html', match: () => location.pathname.includes('reference') },
    { label: 'Einstein Archive', href: 'archive/index.html', match: () => location.pathname.includes('archive') },
  ];

  return items
    .map((item) => {
      const href = hrefTo(item.href);
      const current =
        (item.label === 'Visual Lab' && location.pathname.includes('visual-lab')) ||
        (item.label === 'Practice' && location.pathname.includes('practice')) ||
        (item.label === 'Reference' && location.pathname.includes('reference')) ||
        (item.label === 'Einstein Archive' && location.pathname.includes('archive')) ||
        (item.label === 'Lessons' &&
          (location.pathname.includes('/lessons/') ||
            key === 'index.html' ||
            key === 'capstone.html'));
      return `<a href="${href}" ${current ? 'aria-current="page"' : ''}>${item.label}</a>`;
    })
    .join('');
}

function lessonRailHtml() {
  const active = activeLessonId();
  const indexCurrent = !active && !location.pathname.includes('archive') && currentPageKey() === 'index.html';
  const links = [
    `<a href="${hrefTo('index.html')}" class="${indexCurrent ? '' : ''}" ${indexCurrent ? 'aria-current="page"' : ''}><span class="num">•</span> Index</a>`,
    ...LESSONS.map((l) => {
      const status = lessonStatus(l.id);
      const isCurrent = active === l.id;
      const done = status === 'completed' ? ' done' : '';
      return `<a href="${hrefTo(l.href)}" class="${done}" ${isCurrent ? 'aria-current="page"' : ''} title="${l.title}"><span class="num">${l.number}</span> ${l.shortLabel}${status === 'completed' ? ' <span class="sr-only">completed</span>' : ''}</a>`;
    }),
  ];
  return links.join('');
}

function archiveRailHtml() {
  return ARCHIVE_PAGES.map((p) => {
    const current = location.pathname.replace(/\\/g, '/').endsWith(p.href.replace(/^\.\//, '')) ||
      (p.id === 'archive-index' && /archive\/(index\.html)?$/.test(location.pathname.replace(/\\/g, '/')));
    return `<a href="${hrefTo(p.href)}" ${current ? 'aria-current="page"' : ''}>${p.label}</a>`;
  }).join('');
}

export function mountShell() {
  const prefs = getPrefs();
  document.documentElement.dataset.reducedMotion = String(
    prefs.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  document.documentElement.dataset.plainArchive = String(!!prefs.plainArchive);
  document.documentElement.style.setProperty('--font-scale', String(prefs.fontScale || 1));

  const root = document.getElementById('site-shell');
  if (!root) return;

  const archive = isArchivePage();
  if (archive) document.body.classList.add('archive-theme');

  root.innerHTML = `
    <aside class='folio-spine' aria-hidden='true'>
      <span class='the'>The</span><strong>1915</strong><span class='title'>Seminar<br/>Folio</span>
      <span class='rule'></span><small>A concept-first course in General Relativity</small>
      <small class='volume'>Private press · Vol. I</small>
    </aside>
    <a class="skip-link" href="#main">Skip to main content</a>
    <header class="site-header">
      <div class="site-header__inner">
        <a class='site-mark' href='${hrefTo('index.html')}'>The <span>1915</span> Seminar Folio</a>
        <span class='site-submark'>A concept-first course in General Relativity</span>
        <button type="button" class="btn btn-ghost mobile-nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="global-nav">Menu</button>
        <nav class="global-nav" id="global-nav" aria-label="Primary">
          ${globalNavHtml()}
        </nav>
        <div class="header-actions">
          <a class='btn btn-ghost' id='resume-link' href='${hrefTo('index.html')}'>My notes</a>
          <button type="button" class="btn btn-ghost" id="settings-btn" aria-expanded="false" aria-controls="settings-panel">Settings</button>
        </div>
      </div>
      <div class="settings-panel" id="settings-panel" hidden>
        <h2 style="margin-top:0;font-size:1rem;">Accessibility &amp; preferences</h2>
        <label><input type="checkbox" id="pref-reduced" ${prefs.reducedMotion ? 'checked' : ''}/> Reduce motion</label>
        <label style="margin-top:0.5rem;"><input type="checkbox" id="pref-plain" ${prefs.plainArchive ? 'checked' : ''}/> Plain archive reading mode</label>
        <label style="margin-top:0.5rem;">Text size
          <input type="range" id="pref-font" min="0.9" max="1.25" step="0.05" value="${prefs.fontScale || 1}"/>
        </label>
        <p class="faint" style="margin:0.75rem 0 0;">Progress is stored only in this browser (localStorage).</p>
      </div>
    </header>
    <div class="lesson-rail-wrap">
      <nav class="lesson-rail" aria-label="Lessons">${lessonRailHtml()}</nav>
      ${archive ? `<nav class="archive-rail" aria-label="Einstein Archive">${archiveRailHtml()}</nav>` : ''}
    </div>
  `;

  // Drawer host
  if (!document.getElementById('prov-drawer')) {
    const drawerHost = document.createElement('div');
    drawerHost.innerHTML = `
      <div class="drawer-backdrop" id="drawer-backdrop" hidden></div>
      <aside class="drawer" id="prov-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" hidden>
        <div class="drawer__header">
          <h2 id="drawer-title" style="margin:0;font-size:1.05rem;">Source</h2>
          <button type="button" class="btn btn-ghost" id="drawer-close" aria-label="Close source drawer">Close</button>
        </div>
        <div class="drawer__body" id="drawer-body"></div>
      </aside>
      <a class="btn back-top" id="back-top" href="#main">Top</a>
    `;
    document.body.appendChild(drawerHost);
  }

  const nav = document.getElementById('global-nav');
  const toggle = document.getElementById('nav-toggle');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  const settingsBtn = document.getElementById('settings-btn');
  const settingsPanel = document.getElementById('settings-panel');
  settingsBtn?.addEventListener('click', () => {
    const isOpen = !settingsPanel.classList.contains('open');
    settingsPanel.classList.toggle('open', isOpen);
    settingsPanel.hidden = !isOpen;
    settingsBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.getElementById('pref-reduced')?.addEventListener('change', (e) => {
    const reducedMotion = e.target.checked;
    setPrefs({ reducedMotion });
    document.documentElement.dataset.reducedMotion = String(reducedMotion);
  });
  document.getElementById('pref-plain')?.addEventListener('change', (e) => {
    const plainArchive = e.target.checked;
    setPrefs({ plainArchive });
    document.documentElement.dataset.plainArchive = String(plainArchive);
  });
  document.getElementById('pref-font')?.addEventListener('input', (e) => {
    const fontScale = Number(e.target.value);
    setPrefs({ fontScale });
    document.documentElement.style.setProperty('--font-scale', String(fontScale));
  });

  const progress = getProgress();
  const resume = document.getElementById('resume-link');
  if (progress.lastLocation?.href) {
    resume.href = progress.lastLocation.href.startsWith('http') || progress.lastLocation.href.startsWith('/')
      ? progress.lastLocation.href
      : hrefTo(progress.lastLocation.href.replace(/^\.\//, ''));
    resume.title = progress.lastLocation.label || 'Resume';
  } else {
    resume.href = hrefTo('lessons/01-coincidence.html');
  }

  // Record location
  const pageLabel = document.title;
  const rel = location.pathname.split('/').slice(-2).join('/');
  const hrefGuess = location.pathname.includes('/lessons/')
    ? `lessons/${currentPageKey()}`
    : location.pathname.includes('/archive/')
      ? `archive/${currentPageKey()}`
      : location.pathname.includes('/visual-lab/')
        ? `visual-lab/${currentPageKey()}`
        : location.pathname.includes('/practice/')
          ? `practice/${currentPageKey()}`
          : location.pathname.includes('/reference/')
            ? `reference/${currentPageKey()}`
            : location.pathname.includes('/review/')
              ? `review/${currentPageKey()}`
              : currentPageKey();
  setLastLocation(hrefGuess, pageLabel);

  document.getElementById('drawer-close')?.addEventListener('click', closeDrawer);
  document.getElementById('drawer-backdrop')?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Provenance badge clicks (delegated)
  document.addEventListener('click', (e) => {
    const badge = e.target.closest('[data-provenance]');
    if (badge) {
      e.preventDefault();
      openDrawer(badge.dataset);
    }
  });

  const backTop = document.getElementById('back-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) backTop?.classList.add('show');
    else backTop?.classList.remove('show');
  }, { passive: true });

  // Center active lesson in rail
  const current = document.querySelector('.lesson-rail a[aria-current="page"]');
  current?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'instant' in window ? 'instant' : 'auto' });
}

export function renderLessonNav({ prev, next }) {
  const el = document.getElementById('lesson-nav');
  if (!el) return;
  const prevHtml = prev
    ? `<a class="prev" href="${hrefTo(prev.href)}"><span class="label">← Previous</span><span class="title">${prev.title}</span></a>`
    : `<a class="prev" href="${hrefTo('index.html')}"><span class="label">← Previous</span><span class="title">Course Index</span></a>`;
  const nextHtml = next
    ? `<a class="next" href="${hrefTo(next.href)}"><span class="label">Next →</span><span class="title">${next.title}</span></a>`
    : `<a class="next" href="${hrefTo('review/capstone.html')}"><span class="label">Next →</span><span class="title">Capstone Review</span></a>`;
  el.innerHTML = `
    ${prevHtml}
    <a class="index" href="${hrefTo('index.html')}"><span class="label">Course</span><span class="title">Index</span></a>
    ${nextHtml}
  `;
}
