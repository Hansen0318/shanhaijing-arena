import test from 'node:test';
import assert from 'node:assert/strict';
import { rosterCatalog, prototypeOwnership } from '../src/roster/catalog.js';
import { TeamSelection, isValidTeam, availableRoster } from '../src/roster/team.js';
import { createCharacterDefinition } from '../src/combat/character.js';

test('five stable independent immutable definitions fulfill the existing contract',()=>{
 assert.deepEqual(Object.keys(rosterCatalog),['P1','P2','P3','P4','P5']);
 for(const [id,definition] of Object.entries(rosterCatalog)) {
  assert.equal(definition.id,id);assert.deepEqual(createCharacterDefinition(definition).stats,definition.stats);
  assert.ok(Object.isFrozen(definition));assert.ok(definition.portrait.color);assert.equal(definition.passiveMetadata.implemented,false);
 }
 assert.notEqual(rosterCatalog.P1.stats,rosterCatalog.P2.stats);
 const owned=prototypeOwnership();owned.characterIds.pop();assert.equal(Object.keys(rosterCatalog).length,5);assert.equal(prototypeOwnership().characterIds.length,5);
});
test('select up to three unique characters, remove without shifting and refill first empty slot',()=>{
 const team=new TeamSelection();assert.equal(team.canBattle,false);
 assert.equal(team.toggle('P1'),true);team.toggle('P3');assert.equal(team.canBattle,false);
 team.toggle('P5');assert.equal(team.canBattle,true);assert.equal(team.toggle('P2'),false);
 assert.deepEqual(team.slots,['P1','P3','P5']);team.toggle('P3');assert.deepEqual(team.slots,['P1',null,'P5']);
 team.toggle('P2');assert.deepEqual(team.slots,['P1','P2','P5']);team.remove(0);assert.deepEqual(team.slots,[null,'P2','P5']);
 assert.equal(team.toggle('missing'),false);assert.equal(team.toggle('__proto__'),false);assert.equal(team.remove(8),false);
});
test('invalid saved ids and duplicates restore safely, ownership stays separate',()=>{
 const team=new TeamSelection({saved:['P1','missing','P1','P3']});assert.deepEqual(team.slots,['P1','P3',null]);
 assert.equal(team.canBattle,false);assert.equal(isValidTeam(['P1','P1','P2']),false);
 assert.equal(isValidTeam(['P1','P3','P5']),true);
 assert.deepEqual(availableRoster({}, {characterIds:['P2','unknown']}),['P2']);
 assert.equal(isValidTeam(['P1','P3','P5'],{}, {characterIds:['P1','P3']}),false);
});
test('allowed, banned, forced restrictions filter saved teams and prevent illegal launch',()=>{
 const stage={allowedRoster:['P1','P2','P3','P4'],bannedCharacters:['P3'],forcedCharacters:['P4']};
 const team=new TeamSelection({stage,saved:['P1','P3','P5']});assert.deepEqual(team.slots,['P1','P4',null]);
 assert.equal(team.toggle('P3'),false);assert.equal(team.toggle('P5'),false);assert.equal(team.toggle('P4'),false);
 team.toggle('P2');assert.equal(team.canBattle,true);assert.equal(isValidTeam(['P1','P2','P3'],stage),false);
 assert.equal(isValidTeam(['P1','P2','P4'],stage),true);
 assert.equal(isValidTeam(['P1','P2','P4'],{forcedCharacters:['unknown']}),false);
 assert.equal(new TeamSelection({stage:{forcedCharacters:['P4'],bannedCharacters:['P4']}}).canBattle,false);
 assert.equal(isValidTeam(['P1','P2','P3'],{forcedCharacters:['P1','P2','P3','P4']}),false);
 assert.deepEqual(availableRoster({allowedRoster:[]}),[]);
});
