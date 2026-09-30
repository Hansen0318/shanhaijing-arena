import { findChapter, findStage, orderedStages, nextStage } from './data.js';
import { initialProgress, devProgress, stageStatus, chapterStatus, recordVictory } from './progression.js';
import { prototypeOwnership } from '../roster/catalog.js';
import { TeamSelection, isValidTeam } from '../roster/team.js';
export class CampaignController {
 constructor({persistence=null,teamPersistence=null,dev=false,ownership=prototypeOwnership()}={}) {
  this.persistence=dev ? null : persistence;
  this.progress=dev ? devProgress() : persistence?.load() ?? initialProgress();
  this.screen='chapters'; this.chapterId=null; this.selectedStageId=null; this.battleStageId=null; this.outcome=null;
  this.teamPersistence=dev?null:teamPersistence;
  this.ownership=ownership;this.lastTeam=this.teamPersistence?.load() ?? [];this.teamSelection=null;this.battleTeam=null;
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
 openTeamSelect() {
  if(this.screen!=='stages' || stageStatus(this.progress,this.selectedStageId)==='locked') return false;
  const stage=findStage(this.selectedStageId);
  if(stage?.chapterId!==this.chapterId) return false;
  this.teamSelection=new TeamSelection({stage,ownership:this.ownership,saved:this.lastTeam});
  this.screen='team';return true;
 }
 startBattle() {
  const stage=findStage(this.selectedStageId);
  if(this.screen!=='team' || !stage || stage.chapterId!==this.chapterId
   || stageStatus(this.progress,stage.stageId)==='locked'
   || !isValidTeam(this.teamSelection?.slots,stage,this.ownership))return null;
  this.battleTeam=Object.freeze([...this.teamSelection.slots]);this.lastTeam=[...this.battleTeam];
  this.teamPersistence?.save(this.lastTeam);
  this.screen='battle';this.battleStageId=stage.stageId;this.outcome=null;
  return {...stage,selectedTeam:[...this.battleTeam],rosterOwnership:this.ownership};
 }
 finishBattle(id,outcome) {
  if(this.screen!=='battle' || id!==this.battleStageId || !['victory','defeat','draw'].includes(outcome)) return false;
  this.screen='result';this.outcome=outcome;
  if(outcome==='victory') {this.progress=recordVictory(this.progress,id);this.persistence?.save(this.progress);}
  return true;
 }
 retryBattle() {
  if(this.screen!=='result') return null;
  const stage=findStage(this.battleStageId);
  if(!isValidTeam(this.battleTeam,stage,this.ownership))return null;
  this.screen='battle';this.outcome=null;
  return {...stage,selectedTeam:[...this.battleTeam],rosterOwnership:this.ownership};
 }
 exitBattle() {
  if(!['battle','result'].includes(this.screen)) return false;
  // Cancellation deliberately bypasses finishBattle/recordVictory/storage.
  this.chapterId=findStage(this.battleStageId).chapterId;this.selectedStageId=this.battleStageId;
  this.screen='stages';this.outcome=null;return true;
 }
 nextPreview() {
  if(this.screen!=='result' || this.outcome!=='victory') return false;
  const next=nextStage(this.battleStageId);
  if(!next || stageStatus(this.progress,next.stageId)==='locked') return false;
  this.chapterId=next.chapterId;this.selectedStageId=next.stageId;this.screen='stages';return true;
 }
 back() {
  if(this.screen==='team') {this.screen='stages';return true;}
  if(this.screen!=='stages') return false;
  this.screen='chapters'; return true;
 }
}
