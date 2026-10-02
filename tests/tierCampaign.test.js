import test from 'node:test';
import assert from 'node:assert/strict';
import {CampaignController} from '../src/campaign/controller.js';
import {initialProgress,recordVictory} from '../src/campaign/progression.js';
import {createAcquisitionPersistence} from '../src/acquisition/persistence.js';
import {normalizeAcquisition} from '../src/acquisition/model.js';
import {characterProgress} from '../src/acquisition/tier.js';
function victory(c,id){c.selectStage(id);c.openTeamSelect();for(const x of ['P1','P2','P3'])if(!c.teamSelection.slots.includes(x))c.teamSelection.toggle(x);const battle=c.startBattle();assert.ok(battle);c.finishBattle(id,'victory',battle.battleCompletionId);c.exitBattle();}
test('normal Campaign Chapter2 first/replay farming and Tier upgrades share persisted authoritative ledger, lineup stays intact',()=>{
 let progress=initialProgress();for(let i=1;i<=5;i++)progress=recordVictory(progress,`1-${i}`);
 const map=new Map(),storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)},p=createAcquisitionPersistence(storage);p.save(normalizeAcquisition({version:1,shardsByCharacterId:{P1:10}}));
 const c=new CampaignController({persistence:{load:()=>progress,save:s=>{progress=s;}},acquisitionPersistence:p,teamPersistence:{load:()=>['P1','P3','P2'],save(){}}});c.openChapter('chapter-2');victory(c,'2-1');assert.equal(characterProgress(c.acquisition,'P1').available,13);for(let i=2;i<=5;i++)victory(c,`2-${i}`);const lineup=[...c.lastTeam];c.back();c.back();c.openCollection();const before=characterProgress(c.acquisition,'P1');assert.equal(c.upgradeCharacter('P1','T0','upgrade-campaign').upgraded,true);assert.equal(characterProgress(c.acquisition,'P1').available,before.available-5);c.back();c.openBattleMenu();c.openChapter('chapter-2');const old=characterProgress(c.acquisition,'P1').available;victory(c,'2-5');assert.equal(characterProgress(c.acquisition,'P1').available,old+1);assert.equal(characterProgress(c.acquisition,'P1').tier,'T1');assert.deepEqual(c.lastTeam,lineup);const reload=new CampaignController({persistence:{load:()=>progress},acquisitionPersistence:createAcquisitionPersistence(storage)});assert.deepEqual(reload.acquisition,c.acquisition);assert.equal(characterProgress(reload.acquisition,'P1').available,old+1);
});
