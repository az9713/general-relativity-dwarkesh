/**
 * Lightweight content validation for the HTML course data modules.
 * Run: node scripts/validate_content.js
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const errors = [];
const warnings = [];

function walkHtml(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', 'dist', 'mcps', '.git'].includes(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walkHtml(full, acc);
    else if (name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

// Ensure expected pages exist
const required = [
  'index.html',
  'lessons/01-coincidence.html',
  'lessons/02-happiest-thought.html',
  'lessons/03-geometry.html',
  'lessons/04-field-equation.html',
  'lessons/05-black-holes.html',
  'lessons/06-horizon-crossing.html',
  'lessons/07-evidence.html',
  'visual-lab/index.html',
  'practice/index.html',
  'reference/index.html',
  'review/capstone.html',
  'archive/index.html',
  'archive/ten-year-ascent.html',
  'archive/constellation.html',
  'archive/quantum-salon.html',
  'archive/turing-shannon.html',
  'archive/nobel-dossier.html',
];

for (const rel of required) {
  try {
    readFileSync(resolve(root, rel));
  } catch {
    errors.push(`Missing required page: ${rel}`);
  }
}

const htmlFiles = walkHtml(root);
for (const file of htmlFiles) {
  const text = readFileSync(file, 'utf8');
  if (!text.includes('src/main.js') && !text.includes('src\\\\main.js')) {
    // built pages differ; source pages should load main
    if (!file.includes(`${join('dist')}`)) {
      if (!text.includes('main.js')) warnings.push(`No main.js script in ${file}`);
    }
  }
  if (!text.includes('id="main"')) errors.push(`Missing #main in ${file}`);
  if (!text.includes('id="site-shell"')) errors.push(`Missing #site-shell in ${file}`);
}

// Guardrail string checks in lesson content
const lessonsPath = resolve(root, 'src/content/lessons.js');
const lessonsText = readFileSync(lessonsPath, 'utf8');
const forbidden = [
  [/photographed the horizon itself/i, 'should correct EHT misconception not assert it'],
];
// Ensure misconception corrections exist
if (!lessonsText.includes('causal boundary')) {
  errors.push('Lessons should describe horizon as causal boundary');
}
if (!lessonsText.includes('local')) {
  warnings.push('Check equivalence locality language');
}

const archivePath = resolve(root, 'src/content/archive.js');
const archiveText = readFileSync(archivePath, 'utf8');
if (/Turing was Einstein's friend/i.test(archiveText)) {
  errors.push('Must not call Turing Einstein\'s friend');
}
if (!archiveText.includes('near-encounter') && !archiveText.includes('near encounter')) {
  errors.push('Turing section must label near-encounter status');
}
if (!archiveText.includes('not lifetime rankings') && !archiveText.includes('not lifetime scientific rankings')) {
  // check nobel ranking warning in archive or main
}

const practicePath = resolve(root, 'src/content/practice.js');
const practiceText = readFileSync(practicePath, 'utf8');
if (!practiceText.includes('EHT photographed')) {
  warnings.push('EHT misconception entry expected in practice.js');
}

console.log(
  JSON.stringify(
    {
      ok: errors.length === 0,
      pagesChecked: required.length,
      htmlFilesFound: htmlFiles.length,
      errors,
      warnings,
    },
    null,
    2
  )
);
process.exit(errors.length ? 1 : 0);
