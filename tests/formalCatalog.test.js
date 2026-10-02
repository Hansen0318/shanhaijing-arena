import test from 'node:test';
import assert from 'node:assert/strict';
import { rosterCatalog } from '../src/roster/catalog.js';
import * as formal from '../src/roster/abilities.js';
const rows=[['P1','鹿蜀','speed','attacker',245,18,5,2.05,1.15,3,6,12],['P2','猼訑','power','tank',320,14,9,1.45,.85,4,8,14],['P3','赤鱬','blast','support',235,13,5,1.6,.95,4,7,14],['P4','九尾狐','blast','attacker',230,19,4,1.7,1.05,3.5,7,13],['P5','狌狌','power','attacker',285,17,7,1.85,1,3,6,12]];
const names=[['踏角','逐風衝','迴蹄','南山奔襲','疾行'],['角擊','震嶺','守群','鎮岳','厚甲'],['水矢','湧浪','回瀾','潤澤','游息'],['靈火','狐焰','九焰散華','青丘幻火','惑心'],['裂爪','撼地','追獵','狂鬥','鬥性']];
test('P1–P5 remain the complete stable save identities',()=>assert.deepEqual(Object.keys(rosterCatalog),rows.map(r=>r[0])));
rows.forEach(([id,name,type,role,maxHp,atk,def,moveSpeed,attackSpeed,h,s,a],i)=>{
 test(`${id} approved identity and exact T0 stats`,()=>{const d=rosterCatalog[id];assert.deepEqual([d.name,d.type,d.role],[name,type,role]);assert.deepEqual(d.stats,{maxHp,atk,def,moveSpeed,attackSpeed});assert.equal(d.portrait.label,name);assert.ok(d.lore);assert.ok(d.combatSummary);});
 test(`${id} unique immutable kit with exact names and cooldowns`,()=>{const d=rosterCatalog[id];['basic','heavy','special','awakening','passive'].forEach((category,j)=>{const ability=formal.formalAbilityDefinitions[category==='passive'?d.abilities.passives[0]:d.abilities[category]];assert.equal(ability.name,names[i][j]);assert.equal(ability.category,category);assert.ok(Object.isFrozen(ability));assert.ok(Object.isFrozen(ability.effect));if(j<4){assert.equal(ability.cooldown,[0,h,s,a][j]);assert.throws(()=>{ability.maxRange=100;},TypeError);}});});
});
