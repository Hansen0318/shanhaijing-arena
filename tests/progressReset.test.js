import test from 'node:test';
import assert from 'node:assert/strict';
import * as reset from '../src/campaign/devReset.js';
import { SAVE_KEY } from '../src/campaign/persistence.js';
import { ACQUISITION_SAVE_KEY,createAcquisitionPersistence } from '../src/acquisition/persistence.js';
import { TEAM_SAVE_KEY,createTeamPersistence } from '../src/roster/persistence.js';
import { CampaignController } from '../src/campaign/controller.js';
import { createPersistence } from '../src/campaign/persistence.js';
function environment(search='?resetProgress=1&keep=yes'){
 const map=new Map([[SAVE_KEY,'old'],[ACQUISITION_SAVE_KEY,'old'],[TEAM_SAVE_KEY,'old'],['other','preserved']]);
 const win={location:{href:`https://example.test/arena/${search}#chapter`},history:{replaceState(state,title,url){win.location.href=url;}},localStorage:{removeItem:k=>map.delete(k),getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)}};return {win,map};
}
test('explicit reset clears only three saves, consumes trigger and leaves fresh normal roster/team',()=>{
 const {win,map}=environment();assert.deepEqual(reset.consumeProgressReset(win),{requested:true,cleared:true});assert.deepEqual([...map.keys()],['other']);assert.equal(new URL(win.location.href).search,'?keep=yes');assert.equal(new URL(win.location.href).hash,'#chapter');
 const c=new CampaignController({persistence:createPersistence(win.localStorage),teamPersistence:createTeamPersistence(win.localStorage),acquisitionPersistence:createAcquisitionPersistence(win.localStorage)});assert.deepEqual(c.progress.clearedStages,[]);assert.deepEqual(c.ownership.characterIds,['P1','P2','P3']);assert.deepEqual(c.acquisition.shardsByCharacterId,{P1:0,P2:0,P3:0,P4:0,P5:0});assert.deepEqual(c.teamSelection?.slots??[],[]);
 win.localStorage.setItem(SAVE_KEY,'new-save');assert.equal(reset.consumeProgressReset(win).requested,false);assert.equal(map.get(SAVE_KEY),'new-save');
});
for(const search of ['', '?resetProgress=0','?resetProgress=true'])test(`normal URL ${search} never touches saves`,()=>{
 const {win,map}=environment(search),before=[...map];assert.deepEqual(reset.consumeProgressReset(win),{requested:false,cleared:false});assert.deepEqual([...map],before);
});
test('denied storage reset consumes trigger and reports memory-only fallback; history failure prevents wipe',()=>{
 const {win}=environment();win.localStorage={removeItem(){throw Error('denied');}};assert.deepEqual(reset.consumeProgressReset(win),{requested:true,cleared:false});assert.equal(new URL(win.location.href).searchParams.has('resetProgress'),false);
 const e=environment();e.win.history.replaceState=()=>{throw Error('denied history');};assert.deepEqual(reset.consumeProgressReset(e.win),{requested:false,cleared:false});assert.ok(e.map.has(SAVE_KEY));
});
