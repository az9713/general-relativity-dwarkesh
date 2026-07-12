import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { flashcards } from '../src/content/practice.js';

const rows = ['front,back'];
for (const c of flashcards) {
  const f = `"${String(c.front).replace(/"/g, '""')}"`;
  const b = `"${String(c.back).replace(/"/g, '""')}"`;
  rows.push(`${f},${b}`);
}
const out = resolve(import.meta.dirname, '..', 'public', 'flashcards.csv');
writeFileSync(out, rows.join('\n'), 'utf8');
console.log(`Wrote ${flashcards.length} cards to public/flashcards.csv`);
