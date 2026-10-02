import test from 'node:test';
import assert from 'node:assert/strict';
import {initialAcquisition,normalizeAcquisition,completeAcquisition} from '../src/acquisition/model.js';
import {characterProgress,upgradeTier} from '../src/acquisition/tier.js';
import {createAcquisitionPersistence,ACQUISITION_SAVE_KEY} from '../src/acquisition/persistence.js';
const save=(earned,spent=0,tier='T0')=>({version:3,shardsByCharacterId:{P1:earned},spentShardsByCharacterId:{P1:spent},tierByCharacterId:{P1:tier}});
const upgrade=(state,expectedTier,requestId='action')=>upgradeTier(state,{characterId:'P1',expectedTier,requestId});
test('baseline grants start T0 without acquisition charge',()=>{
 const s=initialAcquisition();for(const id of ['P1','P2','P3']){assert.equal(s.tierByCharacterId[id],'T0');assert.equal(s.spentShardsByCharacterId[id],0);}for(const id of ['P4','P5'])assert.equal(s.tierByCharacterId[id],null);
});
for(const id of ['P4','P5'])test(`${id} reaches5 and recruits T0 with acquisition spend once`,()=>{
 const before=normalizeAcquisition({version:1,shardsByCharacterId:{[id]:4}});
 const tx=completeAcquisition(before,{stageId:'7-1',completionId:'recruit',outcome:'victory',reward:{items:[{type:'characterShard',characterId:id,quantity:1,repeat:'repeatable'}]}});
 assert.deepEqual(tx.unlockedCharacterIds,[id]);const p=characterProgress(tx.state,id);assert.equal(p.tier,'T0');assert.equal(p.earned,5);assert.equal(p.spent,5);assert.equal(p.available,0);assert.equal(p.canUpgrade,false);assert.deepEqual(normalizeAcquisition(tx.state),tx.state);
});
for(const [tier,spent,available,requirement,enabled] of [
 ['T0',0,4,5,false],['T0',0,5,5,true],['T0',0,10,5,true],
 ['T1',5,9,10,false],['T1',5,10,10,true],['T2',15,14,15,false],['T2',15,15,15,true],
])test(`${tier} available${available}/${requirement} eligibility`,()=>{
 const p=characterProgress(save(spent+available,spent,tier),'P1');assert.equal(p.tier,tier);assert.equal(p.progressLabel,`${available} / ${requirement}`);assert.equal(p.canUpgrade,enabled);
});
for(const [from,spent,available,cost,to,label,left] of [
 ['T0',0,10,5,'T1','5 / 10',5],['T1',5,18,10,'T2','8 / 15',8],['T2',15,20,15,'T3','MAX',5],
])test(`${from} spends exactly${cost} and preserves excess`,()=>{
 const raw=save(spent+available,spent,from),before=structuredClone(raw),tx=upgrade(raw,from);assert.equal(tx.upgraded,true);assert.equal(tx.consumed,cost);const p=characterProgress(tx.state,'P1');assert.equal(p.tier,to);assert.equal(p.available,left);assert.equal(p.spent,spent+cost);assert.equal(p.earned,spent+available);assert.equal(p.progressLabel,label);assert.deepEqual(raw,before);assert.equal(upgrade(tx.state,from,'stale-new-id').upgraded,false);assert.equal(upgrade(tx.state,to).upgraded,false);if(to==='T3')assert.equal(upgrade(tx.state,to,'noT4').upgraded,false);
});
test('prototype v2 resets every owned Tier to T0 but preserves actual spent and receipts once',()=>{
 const raw={version:2,shardsByCharacterId:{P1:30,P2:15,P3:4,P4:20,P5:5},spentShardsByCharacterId:{P1:15,P2:5,P3:0,P4:10,P5:5},tierByCharacterId:{P1:'T3',P2:'T2',P3:'T1',P4:'T2',P5:'T1'},completedUpgradeIds:['old-action'],completedBattleIds:['win'],claimedStageIds:['2-1']};
 const s=normalizeAcquisition(raw);assert.equal(s.version,3);assert.deepEqual(Object.values(s.tierByCharacterId),['T0','T0','T0','T0','T0']);assert.deepEqual(s.shardsByCharacterId,raw.shardsByCharacterId);assert.deepEqual(s.spentShardsByCharacterId,raw.spentShardsByCharacterId);assert.deepEqual(s.completedUpgradeIds,['old-action']);assert.deepEqual(s.completedBattleIds,['win']);assert.deepEqual(s.claimedStageIds,['2-1']);assert.deepEqual(normalizeAcquisition(s),s);assert.equal(characterProgress(s,'P4').available,10);
});
test('v2 implied upgrade spend is preserved when its ledger is missing, no free promotion',()=>{
 const s=normalizeAcquisition({version:2,shardsByCharacterId:{P1:20,P4:20},tierByCharacterId:{P1:'T3',P4:'T2'}});assert.equal(s.tierByCharacterId.P1,'T0');assert.equal(s.spentShardsByCharacterId.P1,15);assert.equal(s.tierByCharacterId.P4,'T0');assert.equal(s.spentShardsByCharacterId.P4,10);assert.deepEqual(normalizeAcquisition(s),s);
});
test('migration writes schema3 once, reload preserves subsequent upgrades and unrelated saves',()=>{
 const map=new Map([[ACQUISITION_SAVE_KEY,JSON.stringify({version:2,shardsByCharacterId:{P1:30,P4:5},spentShardsByCharacterId:{P1:5,P4:5},tierByCharacterId:{P1:'T2',P4:'T1'}})],['campaign','clears'],['team','lineup']]);let writes=0;const storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>{writes++;map.set(k,v);}};
 let s=createAcquisitionPersistence(storage).load();assert.equal(s.tierByCharacterId.P1,'T0');assert.equal(characterProgress(s,'P1').available,25);assert.equal(writes,1);assert.deepEqual(createAcquisitionPersistence(storage).load(),s);assert.equal(writes,1);
 const p=createAcquisitionPersistence(storage);s=upgrade(s,'T0').state;p.save(s);assert.equal(characterProgress(s,'P1').progressLabel,'20 / 10');assert.deepEqual(createAcquisitionPersistence(storage).load(),s);assert.equal(writes,2);assert.equal(map.get('campaign'),'clears');assert.equal(map.get('team'),'lineup');assert.equal(characterProgress(s,'P4').available,0);
});
test('malformed higher Tier cannot fabricate progression or negative available; denied migration remains usable',()=>{
 for(const value of ['T4',{toString:null},['T2'],null,4,'T3']){const s=normalizeAcquisition({...save(40),tierByCharacterId:{P1:value}});assert.equal(s.tierByCharacterId.P1,'T0');assert.equal(s.spentShardsByCharacterId.P1,0);}
 const raw={version:2,shardsByCharacterId:{P1:20,P4:5},spentShardsByCharacterId:{P1:5,P4:999},tierByCharacterId:{P1:'T2'}},p=createAcquisitionPersistence({getItem:()=>JSON.stringify(raw),setItem(){throw Error('denied');}});const s=p.load();assert.equal(s.tierByCharacterId.P1,'T0');assert.equal(characterProgress(s,'P4').available,0);const tx=upgrade(s,'T0');assert.equal(tx.upgraded,true);assert.equal(p.save(tx.state),false);assert.deepEqual(p.load(),tx.state);
});
test('MAX repeatable reward increases available without changing Tier or spent, duplicate completion rejected',()=>{
 const s=normalizeAcquisition(save(35,30,'T3')),request={stageId:'7-2',completionId:'farm',outcome:'victory',reward:{items:[{type:'characterShard',characterId:'P1',quantity:2,repeat:'repeatable'}]}};const tx=completeAcquisition(s,request),p=characterProgress(tx.state,'P1');assert.equal(p.tier,'T3');assert.equal(p.available,7);assert.equal(p.spent,30);assert.equal(p.progressLabel,'MAX');assert.deepEqual(completeAcquisition(tx.state,request).state,tx.state);
});
