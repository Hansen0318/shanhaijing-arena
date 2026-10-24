import test from 'node:test';import assert from 'node:assert/strict';
import {characterDetail} from '../src/collection/model.js';import {rosterCatalog} from '../src/roster/catalog.js';import {formalAbilityDefinitions} from '../src/roster/abilities.js';
test('Collection identifies implemented P1/P2/P3 and all still-unimplemented independent passives honestly',()=>{
 for(const [id,d]of Object.entries(rosterCatalog)){
  const detail=characterDetail(d),passive=detail.abilities.find(a=>a.category==='passive');assert.equal(passive.implemented,['P1','P2','P3'].includes(id));assert.equal(passive.statusLabel,['P1','P2','P3'].includes(id)?null:'尚未開放');assert.equal(d.passiveMetadata.implemented,formalAbilityDefinitions[passive.id].implemented);
  assert.equal(detail.abilities.filter(a=>a.category!=='passive').every(a=>!Object.hasOwn(a,'statusLabel')),true);
 }
 const p=characterDetail(rosterCatalog.P1).abilities.find(a=>a.category==='passive');for(const text of ['2 秒','1 單位','+35%','+50%','+65%','+80%','3 秒','6 秒'])assert.ok(p.description.includes(text));
});

test('Collection describes real defense Tier growth, trigger, duration and MAX honestly',()=>{const p=characterDetail(rosterCatalog.P2).abilities.find(a=>a.category==='passive');for(const text of ['20%','30%','40%','50%','4 秒','8 秒','最高值'])assert.ok(p.description.includes(text),text);});
test('P3 Collection distinguishes automatic 游息 from T2 清流 while retaining active percentages',()=>{const d=characterDetail(rosterCatalog.P3);assert.match(d.abilities.find(a=>a.category==='passive').description,/8%／12%／16%／20%/);for(const category of ['special','awakening'])assert.match(d.abilities.find(a=>a.category===category).description,/清流/);});
