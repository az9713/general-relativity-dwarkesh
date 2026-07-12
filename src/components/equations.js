import katex from 'katex';

export function renderMath(el) {
  if (!el) return;
  el.querySelectorAll('[data-math]').forEach((node) => {
    const tex = node.getAttribute('data-math');
    const display = node.getAttribute('data-display') === 'true';
    try {
      katex.render(tex, node, {
        throwOnError: false,
        displayMode: display,
        output: 'html',
      });
    } catch {
      node.textContent = tex;
    }
  });
}

export function mathSpan(tex, display = false) {
  return `<span data-math="${escapeHtml(tex)}" data-display="${display}"></span>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}
