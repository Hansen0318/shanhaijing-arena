import test from 'node:test';
import assert from 'node:assert/strict';
import { CampaignController } from '../src/campaign/controller.js';
test('Collection opens from Campaign and back restores route/stage/team without save writes',()=>{
 let writes=0;const c=new CampaignController({teamPersistence:{load:()=>['P1','P3','P2'],save(){writes++;}}});const before=structuredClone({acquisition:c.acquisition,progress:c.progress,lastTeam:c.lastTeam});
 assert.equal(c.openCollection(),true);assert.equal(c.screen,'collection');assert.equal(c.openCollection(),false);assert.equal(c.back(),true);assert.equal(c.screen,'chapters');
 c.openChapter('chapter-1');c.openTeamSelect();c.teamSelection.remove(1);c.back();const team=[...c.teamSelection.slots];assert.equal(c.openCollection(),true);c.back();assert.equal(c.screen,'stages');assert.equal(c.selectedStageId,'1-1');assert.deepEqual(c.teamSelection.slots,team);assert.deepEqual({acquisition:c.acquisition,progress:c.progress,lastTeam:c.lastTeam},before);assert.equal(writes,0);
});
test('Collection cannot interrupt Team Select, Battle or Result',()=>{
 const c=new CampaignController();c.openChapter('chapter-1');c.openTeamSelect();assert.equal(c.openCollection(),false);for(const id of ['P1','P2','P3'])c.teamSelection.toggle(id);c.startBattle();assert.equal(c.openCollection(),false);c.finishBattle('1-1','victory');assert.equal(c.openCollection(),false);
});
