import test from 'node:test';
import assert from 'node:assert/strict';
// Namespace lookup makes RED fail on the missing behavior, rather than an import error.
import * as model from '../src/acquisition/model.js';
const reward=(characterId='P4',quantity=2,repeat='firstClear')=>({items:[{type:'characterShard',characterId,quantity,repeat}]});
const grant=(state,{stageId='s1',completionId='b1',outcome='victory',items=reward()}={})=>model.completeAcquisition(state,{stageId,completionId,outcome,reward:items});
test('normal initial acquisition owns exactly P1/P2/P3, all catalog IDs have zero inventory',()=>{
 assert.equal(typeof model.initialAcquisition,'function');
 const s=model.initialAcquisition();assert.deepEqual(s.ownedCharacterIds,['P1','P2','P3']);
 assert.deepEqual(s.shardsByCharacterId,{P1:0,P2:0,P3:0,P4:0,P5:0});
});
test('reward normalization accepts multiple valid items and excludes unknown IDs/invalid quantities/semantics',()=>{
 assert.equal(typeof model.normalizeReward,'function');
 const good=reward().items[0];
 assert.deepEqual(model.normalizeReward({items:[good,{...good,characterId:'P1',repeat:'repeatable'},
 {...good,characterId:'bad'},{...good,characterId:'toString'},{...good,quantity:0},{...good,quantity:1.2},{...good,quantity:-1},{...good,quantity:'2'},{...good,type:'coins'},{...good,repeat:'daily'}]}),[good,{...good,characterId:'P1',repeat:'repeatable'}]);
 assert.deepEqual(model.normalizeReward(null),[]);
});
test('firstClear grants once, duplicate and later replay are empty authoritative transactions',()=>{
 assert.equal(typeof model.completeAcquisition,'function');
 const before=model.initialAcquisition(),a=grant(before);assert.equal(before.shardsByCharacterId.P4,0);
 assert.equal(a.shardCounts.P4,2);assert.deepEqual(a.grantedItems,reward().items);assert.deepEqual(a.unlockedCharacterIds,[]);
 assert.equal(grant(a.state).grantedItems.length,0);
 assert.equal(grant(a.state,{completionId:'b2'}).grantedItems.length,0);
});
test('repeatable is once per completion including delayed duplicates; threshold retains all shards',()=>{
 assert.equal(typeof model.completeAcquisition,'function');
 let state=model.initialAcquisition();
 for(let i=1;i<=6;i++){
  const r=grant(state,{completionId:`b${i}`,items:reward('P4',1,'repeatable')});state=r.state;
  assert.equal(r.shardCounts.P4,i);assert.deepEqual(r.unlockedCharacterIds,i===5?['P4']:[]);
 }
 assert.ok(state.ownedCharacterIds.includes('P4'));assert.equal(grant(state,{completionId:'b1',items:reward('P4',1,'repeatable')}).shardCounts.P4,6);
});
test('owned P1 shards accumulate without consuming/discarding; first-clear set precedes repeatable set',()=>{
 assert.equal(typeof model.completeAcquisition,'function');
 const items={items:[...reward('P1',3).items,...reward('P4',1,'repeatable').items]};
 const a=grant(model.initialAcquisition(),{items});const b=grant(a.state,{items,completionId:'b2'});
 assert.equal(b.shardCounts.P1,3);assert.equal(b.shardCounts.P4,1);assert.ok(b.state.ownedCharacterIds.includes('P1'));assert.equal(b.grantedItems.length,1);
});
for(const outcome of ['defeat','draw','running','exit','restart','retry'])test(`${outcome} never grants or records claims`,()=>{
 assert.equal(typeof model.completeAcquisition,'function');
 const before=model.initialAcquisition(),r=grant(before,{outcome});assert.deepEqual(r.state,before);assert.deepEqual(r.grantedItems,[]);
});
test('normalization initializes obsolete/malformed states and sanitizes catalog counts and receipts',()=>{
 assert.equal(typeof model.normalizeAcquisition,'function');
 for(const raw of [null,[],{version:99},'bad'])assert.deepEqual(model.normalizeAcquisition(raw,['1-1']).claimedStageIds,['1-1']);
 const s=model.normalizeAcquisition({version:1,shardsByCharacterId:{P1:3,P2:-1,P3:2.8,P4:5,P5:'9',bad:99},claimedStageIds:['s1',null,'s1'],completedBattleIds:['b1',null,'b1']});
 assert.deepEqual(s.shardsByCharacterId,{P1:3,P2:0,P3:0,P4:5,P5:0});assert.deepEqual(s.ownedCharacterIds,['P1','P2','P3','P4']);assert.deepEqual(s.claimedStageIds,['s1']);assert.deepEqual(s.completedBattleIds,['b1']);
});
test('pre-M3 cleared stages initialize CLAIMED with no retroactive grant; empty identity cannot grant',()=>{
 assert.equal(typeof model.initialAcquisition,'function');
 const s=model.initialAcquisition(['s1']);assert.equal(grant(s).grantedItems.length,0);assert.equal(s.shardsByCharacterId.P4,0);
 for(const field of ['stageId','completionId'])assert.equal(grant(model.initialAcquisition(),{[field]:''}).grantedItems.length,0);
});

const multiReward={items:[...reward('P4',3).items,...reward('P2',2).items,...reward('P2',1,'repeatable').items]};
test('multi-character first clear grants independent quantities, replay grants only owned P2 subset',()=>{
 const first=grant(model.initialAcquisition(),{items:multiReward});
 assert.deepEqual(first.grantedItems,multiReward.items.slice(0,2));
 assert.equal(first.shardCounts.P4,3);assert.equal(first.shardCounts.P2,2);
 const replay=grant(first.state,{items:multiReward,completionId:'b2'});
 assert.deepEqual(replay.grantedItems,[multiReward.items[2]]);
 assert.equal(replay.shardCounts.P4,3);assert.equal(replay.shardCounts.P2,3);
 assert.ok(replay.state.ownedCharacterIds.includes('P2'));
 assert.deepEqual(grant(replay.state,{items:multiReward}).state,replay.state);
 assert.deepEqual(grant(replay.state,{items:multiReward,completionId:'b2'}).state,replay.state);
});
test('first-clear set excludes unrelated repeatable characters too; invalid first-clear entries do not suppress valid repeatable',()=>{
 const mixed={items:[...reward('P4',3).items,...reward('P1',2,'repeatable').items]};
 assert.deepEqual(grant(model.initialAcquisition(),{items:mixed}).grantedItems,[mixed.items[0]]);
 const sanitized={items:[...reward('unknown',3).items,...reward('P1',2,'repeatable').items]};
 assert.deepEqual(grant(model.initialAcquisition(),{items:sanitized}).grantedItems,[sanitized.items[1]]);
});
