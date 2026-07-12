import { PROVENANCE_LABELS } from '../utils/constants.js';

let lastFocus = null;

export function provenanceBadge(opts) {
  const {
    type = 'transcript',
    start = '',
    end = '',
    confidence = '',
    title = '',
    detail = '',
    clues = '',
  } = opts;
  const label = PROVENANCE_LABELS[type] || type;
  const attrs = [
    `data-provenance="${type}"`,
    `data-prov="${type}"`,
    start ? `data-start="${escapeAttr(start)}"` : '',
    end ? `data-end="${escapeAttr(end)}"` : '',
    confidence ? `data-confidence="${escapeAttr(confidence)}"` : '',
    title ? `data-title="${escapeAttr(title)}"` : '',
    detail ? `data-detail="${escapeAttr(detail)}"` : '',
    clues ? `data-clues="${escapeAttr(clues)}"` : '',
  ]
    .filter(Boolean)
    .join(' ');
  return `<button type="button" class="badge" ${attrs} aria-haspopup="dialog">${label}${start ? ` · ${start}${end ? '–' + end : ''}` : ''}</button>`;
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

export function openDrawer(dataset) {
  const drawer = document.getElementById('prov-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const body = document.getElementById('drawer-body');
  const title = document.getElementById('drawer-title');
  if (!drawer || !body) return;

  lastFocus = document.activeElement;
  const type = dataset.provenance || dataset.prov || 'transcript';
  const label = PROVENANCE_LABELS[type] || type;
  title.textContent = dataset.title || label;

  const parts = [];
  parts.push(`<p><strong>Class:</strong> ${label}</p>`);
  if (dataset.start) {
    parts.push(
      `<p><strong>Timestamp:</strong> ${dataset.start}${dataset.end ? ' – ' + dataset.end : ''}</p>`
    );
  }
  if (dataset.confidence) {
    parts.push(`<p><strong>Board confidence:</strong> ${dataset.confidence}</p>`);
  }
  if (dataset.detail) {
    parts.push(`<p>${dataset.detail}</p>`);
  }
  if (dataset.clues) {
    parts.push(`<p><strong>Transcript clues:</strong> ${dataset.clues}</p>`);
  }
  parts.push(
    `<p class="faint">Inferred board content is never presented as a facsimile of Adam Brown's original board. GR supplements are established background added for coherence.</p>`
  );
  body.innerHTML = parts.join('');

  drawer.hidden = false;
  backdrop.hidden = false;
  requestAnimationFrame(() => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
  });
  document.getElementById('drawer-close')?.focus();
}

export function closeDrawer() {
  const drawer = document.getElementById('prov-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer) return;
  drawer.classList.remove('open');
  backdrop?.classList.remove('open');
  setTimeout(() => {
    drawer.hidden = true;
    if (backdrop) backdrop.hidden = true;
    lastFocus?.focus?.();
  }, 200);
}
