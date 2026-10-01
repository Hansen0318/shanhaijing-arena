import test from 'node:test';
import assert from 'node:assert/strict';
import { rosterCatalog } from '../src/roster/catalog.js';
import { runtimeCharacterDefinitions, demoCharacterDefinitions } from '../src/runtime/demoBattle.js';
import { encounterDefinitions } from '../src/campaign/encounterDefinitions.js';
test('owned P1-P5 moveSpeed is 1.8 with unchanged attackSpeed',()=>{
 assert.deepEqual(Object.keys(rosterCatalog),['P1','P2','P3','P4','P5']);
 for(const d of Object.values(rosterCatalog)){assert.equal(d.stats.moveSpeed,1.8);assert.equal(d.stats.attackSpeed,1);assert.ok(Object.isFrozen(d.stats));}
});
test('actual runtime stage enemy uses faster 1.6 definition, attackSpeed unchanged',()=>{
 assert.equal(runtimeCharacterDefinitions.enemy.stats.moveSpeed,1.6);
 assert.equal(encounterDefinitions.enemy.stats.moveSpeed,1.6);
 assert.equal(runtimeCharacterDefinitions.enemy.stats.attackSpeed,.9);
});
test('canonical headless ally4/enemy3.5 speeds remain unchanged',()=>{
 assert.equal(demoCharacterDefinitions.ally.stats.moveSpeed,4);assert.equal(demoCharacterDefinitions.enemy.stats.moveSpeed,3.5);
});
