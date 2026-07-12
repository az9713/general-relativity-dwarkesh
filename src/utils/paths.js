/**
 * Resolve relative asset/navigation links from any nested page depth.
 * Pages live at /, /lessons/, /visual-lab/, /practice/, /reference/, /archive/, /review/.
 */
export function depthPrefix() {
  const path = window.location.pathname.replace(/\\/g, '/');
  // Count how many directories deep we are under the site root.
  // Works for both file:// and http:// vite paths.
  const parts = path.split('/').filter(Boolean);
  // Drop the filename
  if (parts.length && parts[parts.length - 1].includes('.')) parts.pop();
  // Heuristic: known top-level folders under project root
  const roots = new Set([
    'lessons',
    'visual-lab',
    'practice',
    'reference',
    'archive',
    'review',
    'src',
    'dist',
  ]);
  // Find last occurrence of a known section folder
  let depth = 0;
  for (let i = parts.length - 1; i >= 0; i--) {
    if (roots.has(parts[i])) {
      depth = parts.length - i;
      break;
    }
  }
  // If we're inside one of those folders, depth is 1 (or more for nested)
  if (depth === 0 && parts.length > 0) {
    // index at root
    depth = 0;
  }
  return depth === 0 ? './' : '../'.repeat(depth);
}

export function hrefTo(relativeFromRoot) {
  const clean = relativeFromRoot.replace(/^\.\//, '');
  return depthPrefix() + clean;
}

export function currentPageKey() {
  const path = window.location.pathname.replace(/\\/g, '/');
  const file = path.split('/').pop() || 'index.html';
  return file;
}
