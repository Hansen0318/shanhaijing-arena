import test from 'node:test';import assert from 'node:assert/strict';
import {characterDetail} from '../src/collection/model.js';import {rosterCatalog} from '../src/roster/catalog.js';import {formalAbilityDefinitions} from '../src/roster/abilities.js';
test('Collection identifies implemented P1/P2 and all still-unimplemented independent passives honestly',()=>{
 for(const [id,d]of Object.entries(rosterCatalog)){
  const detail=characterDetail(d),passive=detail.abilities.find(a=>a.category==='passive');assert.equal(passive.implemented,['P1','P2'].includes(id));assert.equal(passive.statusLabel,['P1','P2'].includes(id)?'已實裝':'尚未實裝');assert.equal(d.passiveMetadata.implemented,formalAbilityDefinitions[passive.id].implemented);
  assert.equal(detail.abilities.filter(a=>a.category!=='passive').every(a=>!Object.hasOwn(a,'statusLabel')),true);
 }
 const p=characterDetail(rosterCatalog.P1).abilities.find(a=>a.category==='passive');for(const text of ['2 秒','1 單位','+35%','+50%','+65%','+80%','3 秒','6 秒','+15%','+95%'])assert.ok(p.description.includes(text));
});

test('Collection describes real defense Tier growth, trigger, duration and MAX honestly',()=>{const p=characterDetail(rosterCatalog.P2).abilities.find(a=>a.category==='passive');for(const text of ['20%','30%','40%','50%','4 秒','8 秒','2.2','2.4','最高值','無文字'])assert.ok(p.description.includes(text),text);});
