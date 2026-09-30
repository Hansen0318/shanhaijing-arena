import { initialProgress, normalizeProgress } from './progression.js';
export const SAVE_KEY='shanhaijing-arena.campaign.v1';
export function createPersistence(storage) {
 return {
  load() { try {return normalizeProgress(JSON.parse(storage?.getItem(SAVE_KEY) ?? 'null'));} catch {return initialProgress();} },
  save(progress) { try { if(!storage || progress.devFixture) return false; storage.setItem(SAVE_KEY,JSON.stringify(normalizeProgress(progress))); return true;} catch {return false;} },
 };
}
export function browserPersistence() {
 try { return createPersistence(window.localStorage); } catch { return createPersistence(null); }
}
