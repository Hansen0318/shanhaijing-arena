import test from 'node:test';
import assert from 'node:assert/strict';
import * as persistence from '../src/acquisition/persistence.js';
import { initialAcquisition,completeAcquisition } from '../src/acquisition/model.js';
import { createPersistence,SAVE_KEY } from '../src/campaign/persistence.js';
import { createTeamPersistence,TEAM_SAVE_KEY } from '../src/roster/persistence.js';
import { initialProgress,recordVictory } from '../src/campaign/progression.js';
const store=()=>{const map=new Map();return {map,getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};};
const earn=(s,id='P1',n=3)=>completeAcquisition(s,{stageId:'synthetic',completionId:`${id}-${n}`,outcome:'victory',reward:{items:[{type:'characterShard',characterId:id,quantity:n,repeat:'repeatable'}]}}).state;
test('owned P1 and newly unlocked P4 shards and receipts survive a new persistence instance',()=>{
 assert.equal(typeof persistence.createAcquisitionPersistence,'function');
 const storage=store(),p=persistence.createAcquisitionPersistence(storage),s=earn(earn(p.load()),'P4',5);
 assert.equal(p.save(s),true);assert.deepEqual(persistence.createAcquisitionPersistence(storage).load(),s);
 const parsed=JSON.parse(storage.getItem(persistence.ACQUISITION_SAVE_KEY));assert.equal(parsed.version,3);
});
test('missing acquisition migrates pre-M3 clears without touching Campaign or team saves',()=>{
 assert.equal(typeof persistence.createAcquisitionPersistence,'function');
 const storage=store(),cp=createPersistence(storage),tp=createTeamPersistence(storage);
 cp.save(recordVictory(initialProgress(),'1-1'));tp.save(['P1','P3','P5']);const oldCampaign=storage.getItem(SAVE_KEY),oldTeam=storage.getItem(TEAM_SAVE_KEY);
 const p=persistence.createAcquisitionPersistence(storage),s=p.load(cp.load());assert.deepEqual(s.claimedStageIds,['1-1']);assert.equal(s.shardsByCharacterId.P4,0);assert.deepEqual(s.ownedCharacterIds,['P1','P2','P3']);p.save(s);
 assert.equal(storage.getItem(SAVE_KEY),oldCampaign);assert.equal(storage.getItem(TEAM_SAVE_KEY),oldTeam);assert.deepEqual(tp.load(),['P1','P3','P5']);assert.deepEqual(cp.load().clearedStages,['1-1']);
});
for(const raw of ['{broken',JSON.stringify({version:0,shardsByCharacterId:{P4:9}}),JSON.stringify({version:99}),JSON.stringify({version:1,shardsByCharacterId:{P1:4,P4:5,bad:100,P5:-2},ownedCharacterIds:['bad']})])test(`storage safely normalizes ${raw}`,()=>{
 assert.equal(typeof persistence.createAcquisitionPersistence,'function');
 const storage=store();storage.setItem(persistence.ACQUISITION_SAVE_KEY,raw);const s=persistence.createAcquisitionPersistence(storage).load({clearedStages:['1-1']});
 assert.deepEqual(s.claimedStageIds,['1-1']);assert.ok(!Object.hasOwn(s.shardsByCharacterId,'bad'));assert.equal(s.shardsByCharacterId.P5,0);
 if(raw.includes('"P1":4')){assert.equal(s.shardsByCharacterId.P1,4);assert.ok(s.ownedCharacterIds.includes('P4'));}
});
for(const storage of [null,{getItem(){throw Error('denied');},setItem(){throw Error('denied');}},{getItem:()=>null,setItem(){throw Error('quota');}}])test('denied/unavailable writes retain same-instance in-memory inventory',()=>{
 assert.equal(typeof persistence.createAcquisitionPersistence,'function');
 const p=persistence.createAcquisitionPersistence(storage),s=earn(p.load());assert.equal(p.save(s),false);assert.deepEqual(p.load(),s);const copy=p.load();copy.shardsByCharacterId.P1=0;assert.equal(p.load().shardsByCharacterId.P1,3);
});
