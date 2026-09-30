import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { installViewportSync } from '../src/runtime/viewportSync.js';
import { createOrientationGate } from '../src/runtime/orientationGate.js';
import { BattleInterruption } from '../src/runtime/battleInterruption.js';
import { CampaignController } from '../src/campaign/controller.js';
import { createExitDialog } from '../src/runtime/exitDialog.js';

function scene() {
 return {paused:false,ticks:0,elapsed:0,ai:0,movement:0,cooldown:0,vfx:0,
  togglePause(){this.paused=!this.paused;return this.paused;},
  update(delta){this.ticks++;if(this.paused)return;this.elapsed+=delta;this.ai++;this.movement++;this.cooldown++;this.vfx++;}};
}
function viewport() {
 const win=new EventTarget(),vv=new EventTarget(),pending=new Map();let id=0;
 Object.assign(vv,{width:844,height:390,offsetLeft:0,offsetTop:0});
 Object.assign(win,{visualViewport:vv,innerWidth:844,innerHeight:390,
  requestAnimationFrame:fn=>{pending.set(++id,fn);return id;},cancelAnimationFrame:i=>pending.delete(i),
  setTimeout:fn=>{pending.set(++id,fn);return id;},clearTimeout:i=>pending.delete(i)});
 const root={style:{},inert:false,scrollTop:0,scrollLeft:0},host={style:{},inert:false};
 const gate={hidden:true,style:{}},classes=new Set(),doc={documentElement:{classList:{toggle:(key,on)=>on?classes.add(key):classes.delete(key)}}};
 return {win,vv,root,host,gate,doc,classes,pending};
}
test('portrait gate hides Arena/Campaign, blocks interaction and resumes the same battle in landscape',()=>{
 const e=viewport(),s=scene(),interruption=new BattleInterruption();interruption.attach(s);
 const gate=createOrientationGate(e.win,e.doc,e.root,e.host,e.gate,v=>interruption.setPortrait(v));
 const sync=installViewportSync(e.win,e.host,e.root,()=>gate.sync());
 s.update(.1);const before=s.elapsed;
 e.vv.width=390;e.vv.height=844;e.win.dispatchEvent(new Event('orientationchange'));
 assert.equal(e.gate.hidden,false);assert.equal(e.root.inert,true);assert.equal(e.host.inert,true);
 assert.ok(e.classes.has('orientation-portrait'));assert.equal(s.paused,true);
 for(let i=0;i<40;i++)s.update(.1);
 assert.deepEqual([s.elapsed,s.ai,s.movement,s.cooldown,s.vfx],[before,1,1,1,1]);
 e.vv.width=844;e.vv.height=390;e.win.dispatchEvent(new Event('orientationchange'));
 assert.equal(e.gate.hidden,true);assert.equal(e.root.inert,false);assert.equal(e.host.inert,false);
 assert.equal(s.paused,false);s.update(.1);assert.equal(s.elapsed,before+.1);
 sync.destroy();
});
test('repeated portrait and landscape restores exact viewport geometry without stale settlement drift',()=>{
 const e=viewport(),gate=createOrientationGate(e.win,e.doc,e.root,e.host,e.gate);
 const sync=installViewportSync(e.win,e.host,e.root,()=>gate.sync());
 const original={...e.host.style};
 for(let i=0;i<12;i++){
  e.vv.width=390;e.vv.height=844;e.win.dispatchEvent(new Event('resize'));
  e.vv.width=844;e.vv.height=390;sync.routeChanged();
  assert.deepEqual(e.host.style,original);assert.equal(e.pending.size,3);assert.equal(e.gate.hidden,true);
 }
 sync.destroy();
});
test('orientation and exit modal compose with manual Pause and do not catch up simulation',()=>{
 const s=scene(),b=new BattleInterruption();b.attach(s);s.update(.1);
 b.openExit();assert.equal(s.paused,true);for(let i=0;i<20;i++)s.update(.1);
 assert.equal(s.elapsed,.1);b.continueExit();assert.equal(s.paused,false);s.update(.1);assert.equal(s.elapsed,.2);
 b.toggleManual();assert.equal(s.paused,true);b.openExit();b.continueExit();assert.equal(s.paused,true);
 b.toggleManual();b.setPortrait(true);b.toggleManual();assert.equal(s.paused,true);
 b.setPortrait(false);assert.equal(s.paused,false);
});
test('exit before CLEAR never writes/unlocks; replay exit retains existing CLEAR',()=>{
 let writes=0;const persistence={load:()=>undefined,save:()=>{writes++;}};
 const c=new CampaignController({persistence});c.openChapter('chapter-1');c.startBattle();
 const s=scene(),b=new BattleInterruption();b.attach(s);b.openExit();
 assert.equal(c.exitBattle(),true);b.detach();
 assert.equal(c.screen,'stages');assert.deepEqual(c.progress.unlockedStages,['1-1']);assert.equal(writes,0);
 c.startBattle();c.finishBattle('1-1','victory');c.exitBattle();const prior=structuredClone(c.progress);
 c.startBattle();b.attach(scene());b.openExit();c.exitBattle();b.detach();
 assert.deepEqual(c.progress,prior);assert.equal(writes,1);
});
test('Stage Preview has START only and exit confirmation has exact copy and actions',()=>{
 const view=readFileSync(new URL('../src/campaign/view.js',import.meta.url),'utf8');
 const dialog=readFileSync(new URL('../src/runtime/exitDialog.js',import.meta.url),'utf8');
 assert.match(view,/start\.textContent='START'/);assert.doesNotMatch(view,/開始戰鬥/);
 for(const text of ['EXIT BATTLE?','Progress from this battle will not be saved.','CONTINUE','EXIT'])assert.ok(dialog.includes(text));
});
test('X confirmation blocks until CONTINUE or EXIT and exposes correct dialog controls',()=>{
 const elements=[];
 const createElement=tag=>{const el={tag,hidden:false,children:[],append(...children){this.children.push(...children);},setAttribute(key,value){this[key]=value;},focus(){this.focused=true;}};elements.push(el);return el;};
 const doc={createElement,body:{append(el){this.child=el;}}};
 let continued=0,exited=0;
 const modal=createExitDialog(doc,{onContinue:()=>{modal.close();continued++;},onExit:()=>{modal.close();exited++;}});
 modal.open();assert.equal(modal.visible,true);assert.equal(doc.body.child['className'],'exit-overlay');
 const panel=doc.body.child.children[0];assert.equal(panel.role,'dialog');assert.equal(panel['aria-modal'],'true');
 assert.equal(panel.children[0].textContent,'EXIT BATTLE?');
 assert.equal(panel.children[1].textContent,'Progress from this battle will not be saved.');
 const [keep,leave]=panel.children[2].children;
 assert.equal(keep.focused,true);keep.onclick();assert.equal(modal.visible,false);assert.equal(continued,1);
 modal.open();leave.onclick();assert.equal(modal.visible,false);assert.equal(exited,1);
});
