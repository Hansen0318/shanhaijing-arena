import {BattleLabController} from '../src/dev/battleLab/controller.js';
import { createOrientationGate } from '../src/runtime/orientationGate.js';
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
function boot(search='',{runtimeLoad}={}){
 const map=new Map([[SAVE_KEY,'old'],[TEAM_SAVE_KEY,'old'],[ACQUISITION_SAVE_KEY,'old'],['other','safe']]);
 const root={style:{},hidden:false,firstElementChild:{inert:false,prepend(n){root.children.unshift(n);}},setAttribute(){}},host={style:{},hidden:false},win=new EventTarget(),vv=new EventTarget();Object.assign(vv,{width:844,height:390});
 Object.assign(win,{visualViewport:vv,location:{href:`https://example.test/arena/${search}`,search},history:{replaceState(s,t,url){win.location.href=url;win.location.search=new URL(url).search;}},localStorage:{getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)},requestAnimationFrame:()=>1,cancelAnimationFrame(){},setTimeout:()=>1,clearTimeout(){}});
 const gateNode={hidden:true},parent={children:[host,root,gateNode],insertBefore(n,a){this.children=this.children.filter(x=>x!==n);this.children.splice(a?this.children.indexOf(a):this.children.length,0,n);n.parentNode=this;}};
 host.parentNode=parent;host.nextSibling=root;root.parentNode=parent;host.remove=()=>{parent.children=parent.children.filter(x=>x!==host);host.parentNode=null;};
 root.children=[];root.prepend=n=>root.children.unshift(n);
 const doc={documentElement:{classList:{toggle(){}}},createElement:()=>({setAttribute(k,v){this[k]=v;}}),getElementById:id=>id==='campaign'?root:id==='orientation-gate'?gateNode:host};
 let controller,options,activeGame;
 class Game{constructor(config){activeGame=this;this.refreshes=0;this.loop={running:true,sleep(){this.running=false;},wake(){this.running=true;}};this.scale={refresh:()=>{this.refreshes++;host.hidden=false;host.style.visibility='visible';}};this.scene={start(){},stop(){},add(){}};this.boot=()=>config.callbacks.postBoot(this);}}
 const runtime={createArenaGame:({data,isCurrent,onBoot})=>new Game({callbacks:{postBoot:instance=>{if(isCurrent())instance.scene.start('Arena',data);onBoot(instance);}}})};
 const context={BattleLabController:class extends BattleLabController{constructor(){super();controller=this;}},BattleLabView:class{constructor(r,c,o){options=o;}render(){options.onRender();}},createBattleRuntimeLoader:()=>runtimeLoad??(()=>Promise.resolve(runtime)),consumeProgressReset,createRouteVisibility,createAcquisitionPersistence,createPersistence,createTeamPersistence,installViewportSync,BattleInterruption,URL,URLSearchParams,window:win,document:doc,CampaignController:class{constructor(opts){controller=new CampaignController(opts);return controller;}},CampaignView:class{constructor(r,c,o){options=o;}render(){options.onRender();}},browserPersistence:()=>createPersistence(win.localStorage),browserTeamPersistence:()=>createTeamPersistence(win.localStorage),browserAcquisitionPersistence:()=>createAcquisitionPersistence(win.localStorage),createOrientationGate,createBattleControls:()=>({hide(){},update(){}}),createExitDialog:()=>({close(){},open(){}}),Phaser:{Game,AUTO:0,Scale:{NONE:0}},ArenaScene:class{},nextStage:()=>null};
 const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');vm.runInNewContext(source,context);
 return {map,win,root,host,gateNode,controller,options,getGame:()=>activeGame};
}
test('actual app reset boots fresh Chapter1 and ordinary reload retains subsequent save',()=>{
 const e=boot('?resetProgress=1');assert.equal(e.controller.chapterId,'chapter-1');assert.equal(e.controller.selectedStageId,'1-1');assert.deepEqual(e.controller.progress.clearedStages,[]);assert.deepEqual(e.controller.ownership.characterIds,['P1','P2','P3']);assert.deepEqual([...e.map.keys()],['other']);assert.equal(e.win.location.search,'');
 e.map.set(SAVE_KEY,'subsequent');e.win.dispatchEvent(new Event('pageshow'));assert.equal(e.map.get(SAVE_KEY),'subsequent');assert.equal(consumeProgressReset(e.win).requested,false);
 const normal=boot();assert.equal(normal.map.get(SAVE_KEY),'old');assert.equal(normal.map.get(TEAM_SAVE_KEY),'old');assert.equal(normal.map.get(ACQUISITION_SAVE_KEY),'old');
});
test('actual app Campaign/Battle/Exit route authority survives Phaser refresh and pageshow',async()=>{
 const e=boot();assert.equal(e.host.hidden,true);assert.equal(e.root.hidden,false);
 e.controller.openBattleMenu();e.controller.openChapter('chapter-1');e.controller.openTeamSelect();for(const id of ['P1','P2','P3'])e.controller.teamSelection.toggle(id);await e.options.onStart(e.controller.startBattle());e.getGame().boot();assert.equal(e.host.hidden,false);assert.equal(e.root.hidden,true);
 e.controller.exitBattle();e.options.onRender();assert.equal(e.host.hidden,true);assert.equal(e.root.hidden,false);
 for(const [target,type] of [[e.win,'pageshow'],[e.win.visualViewport,'resize'],[e.win.visualViewport,'scroll']]){e.host.hidden=false;target.dispatchEvent(new Event(type));assert.equal(e.host.hidden,true);assert.equal(e.host.style.visibility,'hidden');assert.equal(e.root.hidden,false);}
});
test('runtime waits for battle entry; non-battle restoration never refreshes hidden canvas and sleeps renderer',async()=>{
 const e=boot();assert.equal(e.getGame(),undefined);
 e.controller.openBattleMenu();e.controller.openChapter('chapter-1');e.controller.openTeamSelect();for(const id of ['P1','P2','P3'])e.controller.teamSelection.toggle(id);
 await e.options.onStart(e.controller.startBattle());e.getGame().boot();
 e.controller.exitBattle();e.options.onRender();const game=e.getGame(),before=game.refreshes;
 for(const event of ['pageshow','resize','orientationchange'])e.win.dispatchEvent(new Event(event));
 assert.equal(game.refreshes,before);assert.equal(game.loop.running,false);assert.equal(e.host.hidden,true);
});
test('slow battle download leaves menu visible until runtime is ready, then only battle is shown',async()=>{
 let resolve,loads=0;const e=boot('',{runtimeLoad:()=>{loads++;return new Promise(r=>resolve=r);}});
 e.controller.openBattleMenu();e.controller.openChapter('chapter-1');e.controller.openTeamSelect();for(const id of ['P1','P2','P3'])e.controller.teamSelection.toggle(id);
 const pending=e.options.onStart(e.controller.startBattle());assert.equal(loads,1);assert.equal(e.host.hidden,true);assert.equal(e.root.hidden,false);assert.equal(e.root.firstElementChild.inert,true);
 e.win.dispatchEvent(new Event('resize'));assert.equal(e.root.firstElementChild.inert,true);
 resolve({createArenaGame:()=>({scale:{refresh(){}},loop:{running:true},scene:{start(){}}})});await pending;assert.equal(e.host.hidden,false);assert.equal(e.root.hidden,true);assert.equal(e.root.firstElementChild.inert,false);
});
test('failed battle download returns to usable preview with no canvas or progression write',async()=>{
 const e=boot('',{runtimeLoad:()=>Promise.reject(Error('offline'))});
 e.controller.openBattleMenu();e.controller.openChapter('chapter-1');e.controller.openTeamSelect();for(const id of ['P1','P2','P3'])e.controller.teamSelection.toggle(id);
 const config=e.controller.startBattle(),before=[...e.map];await e.options.onStart(config);
 assert.equal(e.root.firstElementChild.inert,false);assert.equal(e.controller.screen,'stages');assert.equal(e.host.parentNode,null);assert.equal(e.root.hidden,false);assert.equal(e.root.children[0].role,'alert');assert.deepEqual([...e.map],before);
});
test('route render invalidates a pending runtime entry and prevents late canvas attachment',async()=>{
 let resolve;const e=boot('',{runtimeLoad:()=>new Promise(r=>resolve=r)});
 e.controller.openBattleMenu();e.controller.openChapter('chapter-1');e.controller.openTeamSelect();for(const id of ['P1','P2','P3'])e.controller.teamSelection.toggle(id);
 const pending=e.options.onStart(e.controller.startBattle());e.controller.exitBattle();e.options.onRender();resolve({createArenaGame(){throw Error('stale boot');}});await pending;
 assert.equal(e.host.parentNode,null);assert.equal(e.root.hidden,false);assert.equal(e.controller.screen,'stages');
});
for(const screen of ['landing','chapters','stages','collection','info','guide','world','types'])test(`${screen} orientation/viewport/reload contract leaves no battle layers in DOM`,()=>{
 const e=boot();if(screen==='chapters'||screen==='stages'){e.controller.openBattleMenu();if(screen==='stages')e.controller.openChapter('chapter-1');}else if(screen==='collection')e.controller.openCollection();else if(['info','guide','world','types'].includes(screen)){e.controller.openInfo();if(screen!=='info')e.controller.openInfoPage(screen);}e.options.onRender();
 assert.equal(e.getGame(),undefined);
 for(const [width,height] of [[390,844],[844,390]]){Object.assign(e.win.visualViewport,{width,height});e.win.dispatchEvent(new Event('orientationchange'));assert.equal(e.gateNode.hidden,width>height);assert.equal(e.host.parentNode,null);assert.equal(e.host.hidden,true);assert.equal(e.root.hidden,false);assert.equal(e.root.inert,height>width);}
 e.win.dispatchEvent(new Event('pageshow'));assert.equal(e.controller.screen,['guide','world','types'].includes(screen)?'info-page':screen);assert.equal(e.host.parentNode,null);
 // Routes are not URL/save state: ordinary reload intentionally starts Landing.
 const reload=boot();assert.equal(reload.controller.screen,'landing');assert.equal(reload.host.parentNode,null);
});

test('actual app boots Landing and both sibling routes remain hidden-arena through restoration without save writes',()=>{
 const e=boot(),before=[...e.map];assert.equal(e.controller.screen,'landing');
 for(const route of ['chapters','collection']){assert.equal(route==='chapters'?e.controller.openBattleMenu():e.controller.openCollection(),true);e.options.onRender();assert.equal(e.controller.screen,route);for(const [target,type] of [[e.win,'pageshow'],[e.win.visualViewport,'resize'],[e.win.visualViewport,'scroll']]){e.host.hidden=false;target.dispatchEvent(new Event(type));assert.equal(e.host.hidden,true);assert.equal(e.root.hidden,false);}e.controller.back();e.options.onRender();assert.equal(e.controller.screen,'landing');}assert.deepEqual([...e.map],before);
});

for(const [width,height] of [[568,320],[667,300],[844,390],[932,430]])test(`Landing restoration at ${width}x${height} keeps viewport owner and saves intact`,()=>{
 const e=boot(),before=[...e.map];Object.assign(e.win.visualViewport,{width,height,offsetLeft:3,offsetTop:7});
 for(const [target,type] of [[e.win,'pageshow'],[e.win,'orientationchange'],[e.win,'resize'],[e.win.visualViewport,'resize'],[e.win.visualViewport,'scroll']]){e.host.hidden=false;target.dispatchEvent(new Event(type));assert.equal(e.controller.screen,'landing');assert.equal(e.root.style.width,`${width}px`);assert.equal(e.root.style.height,`${height}px`);assert.equal(e.root.style.left,'3px');assert.equal(e.root.style.top,'7px');assert.equal(e.host.hidden,true);assert.equal(e.host.style.visibility,'hidden');assert.equal(e.root.hidden,false);}
 assert.deepEqual([...e.map],before);
});

test('battleLab=1 bypasses all formal reset/persistence/migration and menu never boots game',()=>{
 const e=boot('?battleLab=1&resetProgress=1&campaignDev=unlock-all&fixture=ko');assert.equal(e.controller.screen,'lab');assert.equal(e.getGame(),undefined);assert.deepEqual([...e.map],[[SAVE_KEY,'old'],[TEAM_SAVE_KEY,'old'],[ACQUISITION_SAVE_KEY,'old'],['other','safe']]);assert.ok(e.win.location.search.includes('resetProgress=1'));assert.equal(e.controller.persistence,undefined);assert.equal(e.host.parentNode,null);
});
