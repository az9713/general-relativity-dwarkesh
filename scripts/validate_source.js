import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceDir = path.join(root, 'source');
const errors = [];
const warnings = [];

function readJson(name) {
  const filePath = path.join(sourceDir, name);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing ${name}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    errors.push(`Invalid JSON in ${name}: ${error.message}`);
    return null;
  }
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function uniqueIds(records, label) {
  const ids = new Set();
  for (const record of records ?? []) {
    if (!record.id) errors.push(`${label} record missing id`);
    if (ids.has(record.id)) errors.push(`Duplicate ${label} id: ${record.id}`);
    ids.add(record.id);
  }
  return ids;
}

const registry = readJson('source_registry.json');
const fragments = readJson('timestamp_fragments.json');
const units = readJson('argument_units.json');
const claims = readJson('claims.json');
const boards = readJson('board_reconstructions.json');

if (registry) {
  const rawPath = path.join(root, registry.primarySource.rawPath);
  if (fs.existsSync(rawPath)) {
    const raw = fs.readFileSync(rawPath);
    if (sha256(raw) !== registry.primarySource.rawSha256) errors.push('Raw transcript SHA-256 changed');
  } else {
    warnings.push('Raw transcript is local-only and was not supplied; skipped raw SHA-256 verification');
  }
  const normalized = fs.readFileSync(path.join(root, registry.primarySource.normalizedPath), 'utf8');
  if (normalized.includes('\r')) errors.push('Normalized transcript contains CR line endings');
  if (normalized.normalize('NFC') !== normalized) errors.push('Normalized transcript is not NFC');
}

const fragmentIds = uniqueIds(fragments, 'fragment');
const unitIds = uniqueIds(units, 'argument unit');
const claimIds = uniqueIds(claims, 'claim');
const boardIds = uniqueIds(boards, 'board reconstruction');

for (let index = 1; index < (fragments?.length ?? 0); index += 1) {
  if (fragments[index].seconds < fragments[index - 1].seconds) {
    errors.push(`Timestamp fragments out of order at ${fragments[index].id}`);
  }
}

const coveredFragmentIds = new Set();
for (const unit of units ?? []) {
  for (const id of unit.fragmentIds ?? []) {
    if (!fragmentIds.has(id)) errors.push(`${unit.id} references missing fragment ${id}`);
    if (coveredFragmentIds.has(id)) errors.push(`Fragment ${id} appears in more than one argument unit`);
    coveredFragmentIds.add(id);
  }
  if (!unit.lessonId) errors.push(`${unit.id} missing lessonId`);
  if (!unit.timestampStart || !unit.timestampEnd) errors.push(`${unit.id} missing timestamp range`);
  if (!unit.title || !unit.summary) errors.push(`${unit.id} missing title or summary`);
}

for (const id of fragmentIds) {
  if (!coveredFragmentIds.has(id)) errors.push(`Fragment ${id} is not assigned to an argument unit`);
}

for (let index = 1; index < (units?.length ?? 0); index += 1) {
  if (units[index].startSeconds <= units[index - 1].startSeconds) errors.push(`Argument units out of order at ${units[index].id}`);
  if (units[index].startSeconds <= units[index - 1].endSeconds) errors.push(`Argument units overlap at ${units[index].id}`);
}

const allowedProvenance = new Set(['transcript', 'board-reconstruction', 'gr-supplement']);
for (const claim of claims ?? []) {
  if (!allowedProvenance.has(claim.provenanceType)) errors.push(`${claim.id} has invalid provenanceType`);
  for (const id of claim.argumentUnitIds ?? []) {
    if (!unitIds.has(id)) errors.push(`${claim.id} references missing argument unit ${id}`);
  }
  if (claim.provenanceType === 'transcript' && (!claim.timestampStart || !claim.timestampEnd)) {
    errors.push(`${claim.id} is transcript-derived but lacks timestamps`);
  }
  if (!claim.statement) errors.push(`${claim.id} missing statement`);
}

const allowedConfidence = new Set(['high', 'medium', 'low']);
for (const board of boards ?? []) {
  if (!allowedConfidence.has(board.confidence)) errors.push(`${board.id} has invalid confidence`);
  if (!(board.transcriptClues?.length > 0)) errors.push(`${board.id} lacks transcript clues`);
  if (!board.likelyBoardContent || !board.teachingRedraw || !board.uncertainty) {
    errors.push(`${board.id} lacks required reconstruction fields`);
  }
  for (const id of board.argumentUnitIds ?? []) {
    if (!unitIds.has(id)) errors.push(`${board.id} references missing argument unit ${id}`);
  }
}

if ((units?.length ?? 0) < 20) warnings.push('Fewer than 20 argument units; segmentation may be too coarse');
if ((claims?.length ?? 0) < 30) warnings.push('Fewer than 30 claims; claim map may be incomplete');
if ((boards?.length ?? 0) < 10) warnings.push('Fewer than 10 board reconstructions; board map may be incomplete');

console.log(JSON.stringify({
  ok: errors.length === 0,
  counts: {
    fragments: fragments?.length ?? 0,
    argumentUnits: units?.length ?? 0,
    claims: claims?.length ?? 0,
    boardReconstructions: boards?.length ?? 0,
  },
  errors,
  warnings,
}, null, 2));

process.exitCode = errors.length === 0 ? 0 : 1;
