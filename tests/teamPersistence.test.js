import test from 'node:test';
import assert from 'node:assert/strict';
import { createTeamPersistence, TEAM_SAVE_KEY } from '../src/roster/persistence.js';
import { CampaignController } from '../src/campaign/controller.js';
import { findStage } from '../src/campaign/data.js';
import { TeamSelection } from '../src/roster/team.js';
function storage() {const entries=new Map();return {entries,getItem:k=>entries.get(k)??null,setItem:(k,v)=>entries.set(k,v)};}
function enter(c) {c.openChapter('chapter-1');c.openTeamSelect();}
test('only valid full teams persist in their own versioned save; reload preserves order',()=>{
 const store=storage(),p=createTeamPersistence(store);
 assert.equal(p.save(['P1','P3']),false);assert.equal(p.save(['P1','P1','P5']),false);
 assert.equal(p.save(['P1','P3','P5']),true);assert.deepEqual(createTeamPersistence(store).load(),['P1','P3','P5']);
 assert.deepEqual([...store.entries.keys()],[TEAM_SAVE_KEY]);
 assert.deepEqual(JSON.parse(store.getItem(TEAM_SAVE_KEY)),{version:1,characterIds:['P1','P3','P5']});
});
test('unknown/prototype-property ids ignored and malformed/obsolete saves recover safely',()=>{
 const store=storage();
 for(const raw of ['bad JSON','null','[]','{"version":2,"characterIds":["P1","P3","P5"]}','{"version":1,"characterIds":"P1"}']) {
  store.setItem(TEAM_SAVE_KEY,raw);assert.deepEqual(createTeamPersistence(store).load(),[]);
 }
 store.setItem(TEAM_SAVE_KEY,JSON.stringify({version:1,characterIds:['P1','missing','P1','__proto__','P3']}));
 assert.deepEqual(createTeamPersistence(store).load(),['P1','P3']);
});
test('denied storage degrades to in-memory team and never prevents launch',()=>{
 const p=createTeamPersistence({getItem(){throw Error('denied');},setItem(){throw Error('quota');}});
 assert.deepEqual(p.load(),[]);assert.equal(p.save(['P1','P3','P5']),false);assert.deepEqual(p.load(),['P1','P3','P5']);
 const c=new CampaignController({teamPersistence:p});enter(c);assert.equal(c.teamSelection.canBattle,true);
 assert.deepEqual(c.startBattle().selectedTeam,['P1','P3','P5']);
});
test('BATTLE saves the valid team; partial edits and BACK do not overwrite it',()=>{
 const store=storage(),p=createTeamPersistence(store),c=new CampaignController({teamPersistence:p});enter(c);
 for(const id of ['P1','P3','P5'])c.teamSelection.toggle(id);c.startBattle();c.exitBattle();c.openTeamSelect();
 c.teamSelection.remove(1);c.back();
 const reload=new CampaignController({teamPersistence:createTeamPersistence(store)});enter(reload);
 assert.deepEqual(reload.teamSelection.slots,['P1','P3','P5']);
});
test('saved team is sanitized against new stage bans/ownership and cannot start illegally',()=>{
 const store=storage(),p=createTeamPersistence(store);p.save(['P1','P3','P5']);const stage=findStage('1-1'),old=stage.bannedCharacters;
 stage.bannedCharacters=['P3'];
 try {const c=new CampaignController({teamPersistence:p,ownership:{characterIds:['P1','P3','P5']}});enter(c);
  assert.deepEqual(c.teamSelection.slots,['P1','P5',null]);assert.equal(c.startBattle(),null);
 }finally{stage.bannedCharacters=old;}
});
test('dev fixture never reads/writes formal team save',()=>{
 const p={load(){throw Error('formal read');},save(){throw Error('formal write');}};
 const c=new CampaignController({dev:true,teamPersistence:p});enter(c);
 for(const id of ['P1','P3','P5'])c.teamSelection.toggle(id);assert.ok(c.startBattle());
});
test('multiple forced characters displace optional saved characters without displacing each other',()=>{
 const team=new TeamSelection({saved:['P1','P2','P3'],stage:{forcedCharacters:['P4','P5']}});
 assert.deepEqual(team.slots,['P1','P4','P5']);assert.equal(team.canBattle,true);
});
