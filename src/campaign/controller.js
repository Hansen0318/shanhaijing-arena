import {infoPage} from '../info/data.js';
import { characterProgress, upgradeTier } from '../acquisition/tier.js';
import { findChapter, findStage, orderedStages, nextStage } from './data.js';
import { initialProgress, devProgress, stageStatus, chapterStatus, recordVictory } from './progression.js';
import { initialAcquisition,completeAcquisition } from '../acquisition/model.js';
import { prototypeOwnership } from '../roster/catalog.js';
import { TeamSelection, isValidTeam } from '../roster/team.js';
export class CampaignController {
 constructor({persistence=null,teamPersistence=null,acquisitionPersistence=null,dev=false,ownership=null}={}) {
  this.persistence=dev ? null : persistence;
  this.progress=dev ? devProgress() : persistence?.load() ?? initialProgress();
  this.infoPageId=null;
  this.screen='chapters'; this.chapterId=null; this.selectedStageId=null; this.battleStageId=null; this.outcome=null;
  this.teamPersistence=dev?null:teamPersistence;
  this.dev=dev;this.fixtureOwnership=ownership;
  this.acquisitionPersistence=dev?null:acquisitionPersistence;
  this.acquisition=this.acquisitionPersistence?.load(this.progress) ?? initialAcquisition(this.progress.clearedStages);
  this.rewardResult=null;this.battleCompletionId=null;
  this.lastTeam=this.teamPersistence?.load() ?? [];this.teamSelection=null;this.battleTeam=null;
 }
 get ownership() {
  return this.fixtureOwnership ?? (this.dev?prototypeOwnership():{characterIds:[...this.acquisition.ownedCharacterIds]});
 }
 refreshTeamOwnership() {
  if(!this.teamSelection)return;
  this.teamSelection.ownership=this.ownership;
  const available=new Set(this.teamSelection.available),seen=new Set();
  // Refresh eligibility in place: removing a card must never move another slot.
  this.teamSelection.slots=this.teamSelection.slots.map(id=>{
   if(!available.has(id) || seen.has(id))return null;
   seen.add(id);return id;
  });
 }
 beginCompletion() {
  this.battleCompletionId=globalThis.crypto.randomUUID();this.rewardResult=null;
 }
 upgradeCharacter(characterId,expectedTier,requestId) {
  if(this.screen!=='collection')return {upgraded:false};
  const transaction=upgradeTier(this.acquisition,{characterId,expectedTier,requestId});
  if(transaction.upgraded){this.acquisition=transaction.state;this.acquisitionPersistence?.save(this.acquisition);}
  return transaction;
 }
 openLanding() {
  if(!['chapters','collection','info'].includes(this.screen))return false;
  this.screen='landing';return true;
 }
 openBattleMenu() {
  if(this.screen!=='landing')return false;
  this.screen='chapters';return true;
 }
 openCollection() {
  if(this.screen!=='landing')return false;
  this.screen='collection';return true;
 }
 openInfo() {
  if(this.screen!=='landing')return false;
  this.infoPageId=null;this.screen='info';return true;
 }
 openInfoPage(id) {
  if(this.screen!=='info' || !infoPage(id))return false;
  this.infoPageId=id;this.screen='info-page';return true;
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
  this.screen='battle';this.battleStageId=stage.stageId;this.outcome=null;this.beginCompletion();
  return {...stage,battleCompletionId:this.battleCompletionId,selectedTeam:[...this.battleTeam],rosterOwnership:this.ownership,tierByCharacterId:this.combatTierSnapshot()};
 }
 combatTierSnapshot(){return Object.freeze(Object.fromEntries(this.battleTeam.map(id=>[id,characterProgress(this.acquisition,id).tier??'T0'])));}
 finishBattle(id,outcome,completionId=this.battleCompletionId) {
  if(this.screen!=='battle' || completionId!==this.battleCompletionId || id!==this.battleStageId || !['victory','defeat','draw'].includes(outcome)) return false;
  this.screen='result';this.outcome=outcome;
  const transaction=completeAcquisition(this.acquisition,{stageId:id,completionId,outcome,reward:findStage(id).reward});
  this.rewardResult={state:transaction.state,grantedItems:transaction.grantedItems,unlockedCharacterIds:transaction.unlockedCharacterIds,shardCounts:transaction.shardCounts};
  if(outcome==='victory') {
   this.acquisition=transaction.state;
   // Persist receipts + inventory together before the independent Campaign clear write.
   this.acquisitionPersistence?.save(this.acquisition);
   this.progress=recordVictory(this.progress,id);this.persistence?.save(this.progress);
  }
  return true;
 }
 retryBattle() {
  if(this.screen!=='result') return null;
  return this.freshBattleConfig();
 }
 restartBattle() {
  if(this.screen!=='battle') return null;
  return this.freshBattleConfig();
 }
 freshBattleConfig() {
  const stage=findStage(this.battleStageId);
  if(!isValidTeam(this.battleTeam,stage,this.ownership))return null;
  this.screen='battle';this.outcome=null;this.beginCompletion();
  return {...stage,battleCompletionId:this.battleCompletionId,selectedTeam:[...this.battleTeam],rosterOwnership:this.ownership,tierByCharacterId:this.combatTierSnapshot()};
 }
 exitBattle() {
  if(!['battle','result'].includes(this.screen)) return false;
  // Cancellation deliberately bypasses finishBattle/recordVictory/storage.
  this.chapterId=findStage(this.battleStageId).chapterId;this.selectedStageId=this.battleStageId;
  this.screen='stages';this.outcome=null;this.rewardResult=null;return true;
 }
 nextPreview() {
  if(this.screen!=='result' || this.outcome!=='victory') return false;
  const next=nextStage(this.battleStageId);
  if(!next || stageStatus(this.progress,next.stageId)==='locked') return false;
  this.chapterId=next.chapterId;this.selectedStageId=next.stageId;this.screen='stages';return true;
 }
 back() {
  if(this.screen==='info-page'){this.infoPageId=null;this.screen='info';return true;}
  if(['collection','chapters','info'].includes(this.screen))return this.openLanding();
  if(this.screen==='team') {this.screen='stages';return true;}
  if(this.screen!=='stages') return false;
  this.screen='chapters'; return true;
 }
}
