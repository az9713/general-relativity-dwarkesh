import { STORAGE_KEYS } from './constants.js';

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function read(key, fallback) {
  try {
    if (typeof localStorage === 'undefined') return fallback;
    return safeParse(localStorage.getItem(key), fallback);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    if (typeof localStorage === 'undefined') return false;
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function getProgress() {
  return read(STORAGE_KEYS.progress, {
    lessons: {},
    lastLocation: null,
    completedApps: {},
    mastery: {},
  });
}

export function setProgress(partial) {
  const next = { ...getProgress(), ...partial };
  write(STORAGE_KEYS.progress, next);
  return next;
}

export function markLessonStatus(lessonId, status, sectionId = null) {
  const progress = getProgress();
  const prev = progress.lessons[lessonId] || { status: 'not-started', sections: {} };
  progress.lessons[lessonId] = {
    ...prev,
    status,
    updatedAt: new Date().toISOString(),
    lastSection: sectionId || prev.lastSection || null,
  };
  if (sectionId) progress.lessons[lessonId].sections[sectionId] = true;
  progress.lastLocation = {
    lessonId,
    sectionId,
    href: null,
    at: new Date().toISOString(),
  };
  write(STORAGE_KEYS.progress, progress);
  return progress;
}

export function setLastLocation(href, label) {
  const progress = getProgress();
  progress.lastLocation = {
    href,
    label,
    at: new Date().toISOString(),
  };
  write(STORAGE_KEYS.progress, progress);
  return progress;
}

export function getPrefs() {
  return read(STORAGE_KEYS.prefs, {
    reducedMotion: false,
    plainArchive: false,
    fontScale: 1,
  });
}

export function setPrefs(partial) {
  const next = { ...getPrefs(), ...partial };
  write(STORAGE_KEYS.prefs, next);
  return next;
}

export function savePrediction(id, text) {
  const all = read(STORAGE_KEYS.predictions, {});
  all[id] = { text, at: new Date().toISOString() };
  write(STORAGE_KEYS.predictions, all);
  return all[id];
}

export function getPrediction(id) {
  const all = read(STORAGE_KEYS.predictions, {});
  return all[id] || null;
}
