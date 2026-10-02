import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { CampaignController } from '../src/campaign/controller.js';
import { createPersistence,SAVE_KEY } from '../src/campaign/persistence.js';
import { createTeamPersistence,TEAM_SAVE_KEY } from '../src/roster/persistence.js';
import { createAcquisitionPersistence,ACQUISITION_SAVE_KEY } from '../src/acquisition/persistence.js';
import { consumeProgressReset } from '../src/campaign/devReset.js';
import { createRouteVisibility } from '../src/runtime/routeVisibility.js';
import { installViewportSync } from '../src/runtime/viewportSync.js';
import { BattleInterruption } from '../src/runtime/battleInterruption.js';
function boot(search=''){
 const map=new Map([[SAVE_KEY,'old'],[TEAM_SAVE_KEY,'old'],[ACQUISITION_SAVE_KEY,'old'],['other','safe']]);
 const root={style:{},hidden:false},host={style:{},hidden:false},win=new EventTarget(),vv=new EventTarget();Object.assign(vv,{width:844,height:390});
 Object.assign(win,{visualViewport:vv,location:{href:`https://example.test/arena/${search}`,search},history:{replaceState(s,t,url){win.location.href=url;win.location.search=new URL(url).search;}},localStorage:{getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)},requestAnimationFrame:()=>1,cancelAnimationFrame(){},setTimeout:()=>1,clearTimeout(){}});
 let controller,options,activeGame;
 class Game{constructor(config){activeGame=this;this.scale={refresh(){host.hidden=false;host.style.visibility='visible';}};this.scene={start(){},stop(){},add(){}};this.boot=()=>config.callbacks.postBoot(this);}}
 const context={consumeProgressReset,createRouteVisibility,createAcquisitionPersistence,createPersistence,createTeamPersistence,installViewportSync,BattleInterruption,URL,URLSearchParams,window:win,document:{getElementById:id=>id==='campaign'?root:host},CampaignController:class{constructor(opts){controller=new CampaignController(opts);return controller;}},CampaignView:class{constructor(r,c,o){options=o;}render(){options.onRender();}},browserPersistence:()=>createPersistence(win.localStorage),browserTeamPersistence:()=>createTeamPersistence(win.localStorage),browserAcquisitionPersistence:()=>createAcquisitionPersistence(win.localStorage),createOrientationGate:()=>({sync(){}}),createBattleControls:()=>({hide(){},update(){}}),createExitDialog:()=>({close(){},open(){}}),Phaser:{Game,AUTO:0,Scale:{NONE:0}},ArenaScene:class{},nextStage:()=>null};
 const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');vm.runInNewContext(source,context);
 return {map,win,root,host,controller,options,getGame:()=>activeGame};
}
test('actual app reset boots fresh Chapter1 and ordinary reload retains subsequent save',()=>{
 const e=boot('?resetProgress=1');assert.equal(e.controller.chapterId,'chapter-1');assert.equal(e.controller.selectedStageId,'1-1');assert.deepEqual(e.controller.progress.clearedStages,[]);assert.deepEqual(e.controller.ownership.characterIds,['P1','P2','P3']);assert.deepEqual([...e.map.keys()],['other']);assert.equal(e.win.location.search,'');
 e.map.set(SAVE_KEY,'subsequent');e.win.dispatchEvent(new Event('pageshow'));assert.equal(e.map.get(SAVE_KEY),'subsequent');assert.equal(consumeProgressReset(e.win).requested,false);
 const normal=boot();assert.equal(normal.map.get(SAVE_KEY),'old');assert.equal(normal.map.get(TEAM_SAVE_KEY),'old');assert.equal(normal.map.get(ACQUISITION_SAVE_KEY),'old');
});
test('actual app Campaign/Battle/Exit route authority survives Phaser refresh and pageshow',()=>{
 const e=boot();assert.equal(e.host.hidden,true);assert.equal(e.root.hidden,false);
 e.controller.openBattleMenu();e.controller.openChapter('chapter-1');e.controller.openTeamSelect();for(const id of ['P1','P2','P3'])e.controller.teamSelection.toggle(id);e.options.onStart(e.controller.startBattle());e.getGame().boot();assert.equal(e.host.hidden,false);assert.equal(e.root.hidden,true);
 e.controller.exitBattle();e.options.onRender();assert.equal(e.host.hidden,true);assert.equal(e.root.hidden,false);
 for(const [target,type] of [[e.win,'pageshow'],[e.win.visualViewport,'resize'],[e.win.visualViewport,'scroll']]){e.host.hidden=false;target.dispatchEvent(new Event(type));assert.equal(e.host.hidden,true);assert.equal(e.host.style.visibility,'hidden');assert.equal(e.root.hidden,false);}
});

test('actual app boots Landing and both sibling routes remain hidden-arena through restoration without save writes',()=>{
 const e=boot(),before=[...e.map];assert.equal(e.controller.screen,'landing');
 for(const route of ['chapters','collection']){assert.equal(route==='chapters'?e.controller.openBattleMenu():e.controller.openCollection(),true);e.options.onRender();assert.equal(e.controller.screen,route);for(const [target,type] of [[e.win,'pageshow'],[e.win.visualViewport,'resize'],[e.win.visualViewport,'scroll']]){e.host.hidden=false;target.dispatchEvent(new Event(type));assert.equal(e.host.hidden,true);assert.equal(e.root.hidden,false);}e.controller.back();e.options.onRender();assert.equal(e.controller.screen,'landing');}assert.deepEqual([...e.map],before);
});
