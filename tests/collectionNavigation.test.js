import test from 'node:test';
import assert from 'node:assert/strict';
import { CampaignController } from '../src/campaign/controller.js';
test('Landing has sibling Campaign/Collection routes and browsing never writes progression or saved team',()=>{
 let writes=0;const c=new CampaignController({teamPersistence:{load:()=>['P1','P3','P2'],save(){writes++;}}});const before=structuredClone({acquisition:c.acquisition,progress:c.progress,lastTeam:c.lastTeam});
 c.openLanding();assert.equal(c.screen,'landing');assert.equal(c.openCollection(),true);assert.equal(c.screen,'collection');assert.equal(c.openCollection(),false);assert.equal(c.openBattleMenu(),false);assert.equal(c.back(),true);assert.equal(c.screen,'landing');
 assert.equal(c.openBattleMenu(),true);assert.equal(c.screen,'chapters');assert.equal(c.openCollection(),false);assert.equal(c.back(),true);assert.equal(c.screen,'landing');
 c.openBattleMenu();c.openChapter('chapter-1');c.openTeamSelect();c.teamSelection.remove(1);c.back();const team=[...c.teamSelection.slots];assert.equal(c.openCollection(),false);c.back();c.back();c.openCollection();c.back();assert.equal(c.screen,'landing');assert.deepEqual(c.teamSelection.slots,team);assert.deepEqual({acquisition:c.acquisition,progress:c.progress,lastTeam:c.lastTeam},before);assert.equal(writes,0);
});
test('Landing routes cannot interrupt Team Select, Battle or Result',()=>{
 const c=new CampaignController();c.openChapter('chapter-1');c.openTeamSelect();assert.equal(c.openCollection(),false);assert.equal(c.openLanding(),false);assert.equal(c.openBattleMenu(),false);for(const id of ['P1','P2','P3'])c.teamSelection.toggle(id);c.startBattle();assert.equal(c.openCollection(),false);assert.equal(c.openLanding(),false);c.finishBattle('1-1','victory');assert.equal(c.openCollection(),false);assert.equal(c.openLanding(),false);
});
