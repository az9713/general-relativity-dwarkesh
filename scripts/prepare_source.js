import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const rawPath = path.join(root, 'transcript.txt');
const sourceDir = path.join(root, 'source');
const normalizedPath = path.join(sourceDir, 'transcript.normalized.txt');
const fragmentsPath = path.join(sourceDir, 'timestamp_fragments.json');
const registryPath = path.join(sourceDir, 'source_registry.json');

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function timestampToSeconds(value) {
  const parts = value.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  throw new Error(`Unsupported timestamp: ${value}`);
}

function secondsToTimestamp(total) {
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    : `${minutes}:${String(seconds).padStart(2, '0')}`;
}

const rawBuffer = fs.readFileSync(rawPath);
let decoded = rawBuffer.toString('utf8');
if (decoded.charCodeAt(0) === 0xfeff) decoded = decoded.slice(1);
const normalized = decoded.replace(/\r\n?/g, '\n').normalize('NFC').replace(/\s*$/, '\n');

fs.mkdirSync(sourceDir, { recursive: true });
fs.writeFileSync(normalizedPath, normalized, 'utf8');

const lines = normalized.split('\n');
const timestampPattern = /^(\d{1,2}:\d{2}(?::\d{2})?)$/;
const fragments = [];
let lastAcceptedSeconds = -1;

for (let index = 0; index < lines.length; index += 1) {
  const match = lines[index].trim().match(timestampPattern);
  if (!match) continue;

  const timestamp = match[1];
  const seconds = timestampToSeconds(timestamp);
  // YouTube page text appended an unrelated next-video timestamp after the
  // 1:38:19 end of the interview. Stop when timestamps regress.
  if (seconds < lastAcceptedSeconds) break;
  const textLines = [];
  let endIndex = index + 1;
  while (endIndex < lines.length && !lines[endIndex].trim().match(timestampPattern)) {
    if (lines[endIndex].trim()) textLines.push(lines[endIndex].trim());
    endIndex += 1;
  }

  const text = textLines.join(' ').replace(/\s+/g, ' ').trim();
  fragments.push({
    id: `fragment-${String(fragments.length + 1).padStart(4, '0')}`,
    timestamp,
    seconds,
    sourceLineStart: index + 1,
    sourceLineEnd: Math.max(index + 1, endIndex),
    text,
  });
  lastAcceptedSeconds = seconds;
  index = endIndex - 1;
}

for (let index = 0; index < fragments.length; index += 1) {
  fragments[index].nextTimestamp = fragments[index + 1]?.timestamp ?? null;
  fragments[index].nextSeconds = fragments[index + 1]?.seconds ?? null;
}

fs.writeFileSync(fragmentsPath, `${JSON.stringify(fragments, null, 2)}\n`, 'utf8');

const chapterPattern = /^(\d{2}:\d{2}:\d{2})\s+[–-]\s+(.+)$/;
const chapters = lines
  .map((line) => line.trim().match(chapterPattern))
  .filter(Boolean)
  .map((match, index) => ({
    id: `chapter-${String(index + 1).padStart(2, '0')}`,
    timestamp: match[1],
    seconds: timestampToSeconds(match[1]),
    title: match[2].trim(),
  }));

const wordCount = normalized.trim().split(/\s+/).filter(Boolean).length;
const registry = {
  schemaVersion: 1,
  primarySource: {
    id: 'brown-dwarkesh-gr-transcript',
    type: 'youtube-transcript',
    title: 'Adam Brown explains general relativity and black holes',
    videoUrl: lines.find((line) => /^https:\/\/www\.youtube\.com\//.test(line.trim()))?.trim() ?? null,
    rawPath: 'transcript.txt',
    normalizedPath: 'source/transcript.normalized.txt',
    rawSha256: sha256(rawBuffer),
    normalizedSha256: sha256(Buffer.from(normalized, 'utf8')),
    encoding: 'UTF-8',
    normalizedLineEndings: 'LF',
    lineCount: lines.length - 1,
    wordCount,
    timestampFragmentCount: fragments.length,
    firstTeachingTimestamp: fragments[0]?.timestamp ?? null,
    lastTeachingTimestamp: fragments.at(-1)?.timestamp ?? null,
    chapters,
  },
  derivedArtifacts: [
    {
      id: 'normalized-transcript',
      path: 'source/transcript.normalized.txt',
      derivedFrom: 'brown-dwarkesh-gr-transcript',
      transformation: 'UTF-8 decode, NFC normalization, LF line endings, terminal newline',
    },
    {
      id: 'timestamp-fragments',
      path: 'source/timestamp_fragments.json',
      derivedFrom: 'normalized-transcript',
      transformation: 'Exact timestamp-line parsing with source line spans',
    },
  ],
  generatedBy: 'scripts/prepare_source.js',
};

fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({
  rawSha256: registry.primarySource.rawSha256,
  normalizedSha256: registry.primarySource.normalizedSha256,
  lineCount: registry.primarySource.lineCount,
  wordCount,
  timestampFragments: fragments.length,
  chapters: chapters.length,
  firstTimestamp: fragments[0]?.timestamp,
  lastTimestamp: fragments.at(-1)?.timestamp,
  normalizedDurationEnd: secondsToTimestamp(fragments.at(-1)?.seconds ?? 0),
}, null, 2));
