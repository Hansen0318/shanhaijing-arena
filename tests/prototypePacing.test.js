import test from 'node:test';
import assert from 'node:assert/strict';
import { rosterCatalog } from '../src/roster/catalog.js';
import { runtimeCharacterDefinitions, demoCharacterDefinitions } from '../src/runtime/demoBattle.js';
import { encounterDefinitions } from '../src/campaign/encounterDefinitions.js';
test('formal P1-P5 movement/cadence are character-specific immutable T0 data',()=>{
 assert.deepEqual(Object.keys(rosterCatalog),['P1','P2','P3','P4','P5']);
 const expected=[[2.05,1.15],[1.45,.85],[1.6,.95],[1.7,1.05],[1.85,1]];Object.values(rosterCatalog).forEach((d,i)=>{assert.deepEqual([d.stats.moveSpeed,d.stats.attackSpeed],expected[i]);assert.ok(Object.isFrozen(d.stats));});
});
test('actual runtime stage enemy uses faster 1.6 definition, attackSpeed unchanged',()=>{
 assert.equal(runtimeCharacterDefinitions.enemy.stats.moveSpeed,1.6);
 assert.equal(encounterDefinitions.enemy.stats.moveSpeed,1.6);
 assert.equal(runtimeCharacterDefinitions.enemy.stats.attackSpeed,.9);
});
test('canonical headless ally4/enemy3.5 speeds remain unchanged',()=>{
 assert.equal(demoCharacterDefinitions.ally.stats.moveSpeed,4);assert.equal(demoCharacterDefinitions.enemy.stats.moveSpeed,3.5);
});
