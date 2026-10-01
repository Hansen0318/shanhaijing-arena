import test from 'node:test';
import assert from 'node:assert/strict';
import { createAbilityDefinition } from '../src/combat/ability.js';
const input = { id:'test', category:'heavy', cooldown:3, range:2, targetingRule:'enemy' };

test('optional crit settings default to disabled and remain immutable', () => {
  const d=createAbilityDefinition(input);
  assert.deepEqual([d.canCrit,d.critChance,d.critMultiplier],[false,0,1]);
  assert.throws(()=>{d.critChance=1;},TypeError);
});
test('crit settings are independent per definition, not category', () => {
  const a=createAbilityDefinition({...input,canCrit:true,critChance:.2,critMultiplier:1.75});
  const b=createAbilityDefinition({...input,id:'other',canCrit:false,critChance:1,critMultiplier:.5});
  assert.deepEqual([a.canCrit,a.critChance,a.critMultiplier],[true,.2,1.75]);
  assert.deepEqual([b.canCrit,b.critChance,b.critMultiplier],[false,1,.5]);
});
test('critChance rejects non-probabilities',()=>{
  for(const critChance of [-.1,1.1,NaN,Infinity,'0.1',null])
    assert.throws(()=>createAbilityDefinition({...input,critChance}),/critChance/);
});
test('critMultiplier must be positive finite',()=>{
  for(const critMultiplier of [0,-1,NaN,Infinity,'1.5',null])
    assert.throws(()=>createAbilityDefinition({...input,critMultiplier}),/critMultiplier/);
});
test('canCrit must be a boolean',()=>{
  for(const canCrit of [1,'true',null])
    assert.throws(()=>createAbilityDefinition({...input,canCrit}),/canCrit/);
});
test('probability endpoints are valid',()=>{
  for(const critChance of [0,1]) assert.equal(createAbilityDefinition({...input,critChance}).critChance,critChance);
});
test('seeded RNG has reproducible independent state and validated uint32 seeds',async()=>{
  const module=await import('../src/combat/seededRandom.js').catch(()=>({}));
  assert.equal(typeof module.createSeededRandom,'function');
  const a=module.createSeededRandom(123),b=module.createSeededRandom(123),c=module.createSeededRandom(124);
  const sequence=r=>Array.from({length:40},()=>r());
  const first=sequence(a);
  assert.deepEqual(first,sequence(b));assert.notDeepEqual(first,sequence(c));
  assert.ok(first.every(n=>n>=0&&n<1));
  assert.deepEqual(first,sequence(module.createSeededRandom(123)));
  for(const seed of [-1,1.2,NaN,2**32,'123'])assert.throws(()=>module.createSeededRandom(seed),/seed/);
});
