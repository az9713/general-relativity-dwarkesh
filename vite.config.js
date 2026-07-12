import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readdirSync, statSync } from 'node:fs';

/** Collect learner-facing HTML entries while excluding generated and private folders. */
function htmlEntries(root = resolve(__dirname)) {
  const entries = {};
  const excludedDirectories = new Set([
    'node_modules',
    'dist',
    'mcps',
    '.git',
    '.ignore',
    '.agents',
    '.codex',
    'audit-current',
  ]);
  function walk(dir, prefix = '') {
    for (const name of readdirSync(dir)) {
      if (excludedDirectories.has(name)) continue;
      const full = resolve(dir, name);
      const rel = prefix ? `${prefix}/${name}` : name;
      if (statSync(full).isDirectory()) walk(full, rel);
      else if (name.endsWith('.html')) {
        const key = rel.replace(/\.html$/, '').replace(/[\\/]/g, '-');
        entries[key] = full;
      }
    }
  }
  walk(root);
  return entries;
}

export default defineConfig({
  root: '.',
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: htmlEntries(),
    },
  },
  server: {
    open: '/index.html',
  },
});
