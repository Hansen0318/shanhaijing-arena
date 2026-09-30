import { findChapter, findStage, orderedStages } from './data.js';
import { initialProgress, devProgress, stageStatus, chapterStatus } from './progression.js';
export class CampaignController {
 constructor({persistence=null,dev=false}={}) {
  this.persistence=dev ? null : persistence;
  this.progress=dev ? devProgress() : persistence?.load() ?? initialProgress();
  this.screen='chapters'; this.chapterId=null; this.selectedStageId=null; this.battleStageId=null; this.outcome=null;
 }
 openChapter(id) {
  if(!['chapters','stages'].includes(this.screen) || chapterStatus(this.progress,id)==='locked') return false;
  this.chapterId=id; this.selectedStageId=orderedStages(findChapter(id)).find(s=>stageStatus(this.progress,s.stageId)!=='locked').stageId;
  this.screen='stages'; return true;
 }
 selectStage(id) {
  const stage=findStage(id);
  if(this.screen!=='stages' || stage?.chapterId!==this.chapterId || stageStatus(this.progress,id)==='locked') return false;
  this.selectedStageId=id; return true;
 }
 startBattle() {
  if(this.screen!=='stages' || stageStatus(this.progress,this.selectedStageId)==='locked') return null;
  const stage=findStage(this.selectedStageId);
  if(stage.chapterId!==this.chapterId) return null;
  this.screen='battle'; this.battleStageId=stage.stageId; this.outcome=null; return stage;
 }
 back() {
  if(this.screen!=='stages') return false;
  this.screen='chapters'; return true;
 }
}
