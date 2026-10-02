import test from 'node:test';
import assert from 'node:assert/strict';
import * as collection from '../src/collection/model.js';
import { rosterCatalog } from '../src/roster/catalog.js';
import { initialAcquisition,completeAcquisition } from '../src/acquisition/model.js';
import { runtimeAbilityDefinitions } from '../src/runtime/demoBattle.js';
import { createAcquisitionPersistence } from '../src/acquisition/persistence.js';
test('all catalog definitions, initial ownership and universal shard inventory are read-only projections',()=>{
 const s=initialAcquisition();s.shardsByCharacterId.P1=8;s.shardsByCharacterId.P4=3;const before=structuredClone(s);
 const rows=collection.collectionEntries(s);assert.deepEqual(rows.map(r=>r.definition.id),Object.keys(rosterCatalog));assert.equal(rows[0].definition,rosterCatalog.P1);
 assert.deepEqual(rows.filter(r=>r.owned).map(r=>r.definition.id),['P1','P2','P3']);assert.equal(rows[0].shardLabel,'8 / 5');assert.equal(rows[3].shardLabel,'3 / 5');assert.equal(rows[4].owned,false);assert.deepEqual(s,before);
});
for(const [filter,expected] of [['all',['P1','P2','P3','P4','P5']],['power',['P2','P5']],['speed',['P1']],['blast',['P3','P4']]])test(`${filter} filter changes only visible definitions`,()=>{
 const s=initialAcquisition(),before=structuredClone(s);assert.deepEqual(collection.collectionEntries(s,{filter}).map(r=>r.definition.id),expected);assert.deepEqual(s,before);
});
test('unlock and owned shards are retained and reload displays the same authoritative progression',()=>{
 const s=initialAcquisition();s.shardsByCharacterId.P4=3;
 const tx=completeAcquisition(s,{stageId:'synthetic',completionId:'win',outcome:'victory',reward:{items:[{type:'characterShard',characterId:'P4',quantity:4,repeat:'repeatable'},{type:'characterShard',characterId:'P1',quantity:2,repeat:'repeatable'}]}});
 const map=new Map(),storage={setItem:(k,v)=>map.set(k,v),getItem:k=>map.get(k)??null};createAcquisitionPersistence(storage).save(tx.state);
 const rows=collection.collectionEntries(createAcquisitionPersistence(storage).load());assert.equal(rows[3].owned,true);assert.equal(rows[3].shardLabel,'2 / 5');assert.equal(rows[0].shardLabel,'2 / 5');
});
test('detail uses ability references/category and optional data-driven descriptions/lore without fabricated progression',()=>{
 const def={...rosterCatalog.P1,name:'Example',lore:'Optional introduction',abilities:{...rosterCatalog.P1.abilities,heavy:'heavy',passives:['passive-example']}};
 const abilities={...runtimeAbilityDefinitions,heavy:{...runtimeAbilityDefinitions.heavy,name:'Stone Strike',description:'A concise configured description'},'passive-example':{id:'passive-example',name:'Guard'}};
 const summary=collection.characterDetail(def,abilities);assert.equal(summary.name,'Example');assert.equal(summary.type,'speed');assert.equal(summary.role,'attacker');assert.equal(summary.lore,def.lore);
 assert.deepEqual(summary.abilities.find(a=>a.id==='heavy'),{id:'heavy',name:'Stone Strike',category:'heavy',description:'A concise configured description'});assert.equal(summary.abilities.at(-1).category,'passive');assert.equal(Object.hasOwn(summary,'tier'),false);
 const missing=collection.characterDetail({...rosterCatalog.P4,lore:undefined,abilities:{...rosterCatalog.P4.abilities,passives:[]}},runtimeAbilityDefinitions);assert.equal(missing.lore,null);assert.equal(missing.abilities.length,4);assert.equal(missing.abilities[0].id,rosterCatalog.P4.abilities.basic);assert.equal(missing.abilities[0].description,null);
});
