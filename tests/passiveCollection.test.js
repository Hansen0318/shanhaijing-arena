import test from 'node:test';import assert from 'node:assert/strict';
import {characterDetail} from '../src/collection/model.js';import {rosterCatalog} from '../src/roster/catalog.js';import {formalAbilityDefinitions} from '../src/roster/abilities.js';
test('Collection identifies implemented P1 and all still-unimplemented independent passives honestly',()=>{
 for(const [id,d]of Object.entries(rosterCatalog)){
  const detail=characterDetail(d),passive=detail.abilities.find(a=>a.category==='passive');assert.equal(passive.implemented,id==='P1');assert.equal(passive.statusLabel,id==='P1'?'已實裝':'尚未實裝');assert.equal(d.passiveMetadata.implemented,formalAbilityDefinitions[passive.id].implemented);
  assert.equal(detail.abilities.filter(a=>a.category!=='passive').every(a=>!Object.hasOwn(a,'statusLabel')),true);
 }
 const p=characterDetail(rosterCatalog.P1).abilities.find(a=>a.category==='passive');for(const text of ['2 秒','1 單位','+35%','+50%','+65%','+80%','3 秒','6 秒','+15%','+95%'])assert.ok(p.description.includes(text));
});
