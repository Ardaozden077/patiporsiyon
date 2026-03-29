import { initialDb } from './defaultState';

const LS_KEY = 'patiporsiyon_pro_v2';

function getStorage() {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  return window.localStorage;
}

export function readDb() {
  try {
    const storage = getStorage();
    if (!storage) return initialDb();
    const raw = storage.getItem(LS_KEY);
    if (!raw) return initialDb();
    const parsed = JSON.parse(raw);
    return { ...initialDb(), ...parsed };
  } catch {
    return initialDb();
  }
}

export function writeDb(nextDb) {
  try {
    const storage = getStorage();
    if (!storage) return;
    storage.setItem(LS_KEY, JSON.stringify(nextDb));
  } catch {
    // Deliberately swallow storage quota/private mode errors in demo mode.
  }
}
