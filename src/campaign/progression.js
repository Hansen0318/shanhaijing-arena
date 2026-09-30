import { allStages, orderedChapters, findChapter, findStage, nextStage } from './data.js';
export function initialProgress() {
 const chapter=orderedChapters()[0], stage=chapter.stages[0];
 return {version:1, unlockedChapters:[chapter.chapterId], clearedChapters:[], unlockedStages:[stage.stageId], clearedStages:[]};
}
export function stageStatus(p,id) {
 if(!findStage(id) || !p.unlockedStages.includes(id)) return 'locked';
 return p.clearedStages.includes(id) ? 'cleared' : 'available';
}
export function chapterStatus(p,id) {
 if(!findChapter(id) || !p.unlockedChapters.includes(id)) return 'locked';
 return p.clearedChapters.includes(id) ? 'cleared' : 'available';
}
export function recordVictory(p,id) {
 if(stageStatus(p,id)==='locked' || p.clearedStages.includes(id)) return p;
 const result=structuredClone(p), stage=findStage(id), chapter=findChapter(stage.chapterId);
 result.clearedStages.push(id);
 if(chapter.stages.every(s=>result.clearedStages.includes(s.stageId))) result.clearedChapters.push(chapter.chapterId);
 const next=nextStage(id);
 if(next) {
  if(!result.unlockedStages.includes(next.stageId)) result.unlockedStages.push(next.stageId);
  if(!result.unlockedChapters.includes(next.chapterId)) result.unlockedChapters.push(next.chapterId);
 }
 return result;
}
// Reconstruct from wins only: never trust saved unlocked arrays or foreign IDs.
export function normalizeProgress(raw) {
 let p=initialProgress();
 if(raw?.version!==1 || raw?.devFixture || !Array.isArray(raw?.clearedStages)) return p;
 for(const stage of allStages()) {
  if(raw.clearedStages.includes(stage.stageId) && stageStatus(p,stage.stageId)!=='locked') p=recordVictory(p,stage.stageId);
 }
 return p;
}
export function devProgress() {
 return {...initialProgress(),devFixture:true,unlockedChapters:orderedChapters().map(c=>c.chapterId),unlockedStages:allStages().map(s=>s.stageId)};
}
