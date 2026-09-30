import test from 'node:test';
import assert from 'node:assert/strict';
import { installViewportSync } from '../src/runtime/viewportSync.js';
function environment() {
 const win=new EventTarget(), vv=new EventTarget();
 Object.assign(vv,{width:800,height:360,offsetLeft:12,offsetTop:24});
 const pending=new Map();let id=0;
 Object.assign(win,{visualViewport:vv,innerWidth:844,innerHeight:390,
  requestAnimationFrame:fn=>{pending.set(++id,fn);return id;},cancelAnimationFrame:i=>pending.delete(i),
  setTimeout:fn=>{pending.set(++id,fn);return id;},clearTimeout:i=>pending.delete(i)});
 const host={style:{}},root={style:{},scrollTop:95,scrollLeft:10};
 return {win,host,root,pending};
}
test('Campaign and Arena use the same visible viewport including Safari offsets',()=>{
 const e=environment();const sync=installViewportSync(e.win,e.host,e.root);
 sync.routeChanged();
 assert.equal(e.root.style.width,'800px');assert.equal(e.root.style.height,'360px');
 assert.equal(e.root.style.left,'12px');assert.equal(e.root.style.top,'24px');
 assert.equal(e.root.scrollTop,0);assert.equal(e.root.scrollLeft,0);
 assert.equal(e.host.style.height,'360px');
 assert.ok(Math.abs(parseFloat(e.host.style.width)-746.6666667)<.001);
});
test('route return remeasures viewport even without resize and cancels stale settlement work',()=>{
 const e=environment();const sync=installViewportSync(e.win,e.host,e.root);
 for(let i=0;i<6;i++){
  e.win.visualViewport.height=320+i;e.root.scrollTop=80;
  sync.routeChanged();assert.equal(e.root.style.height,`${320+i}px`);assert.equal(e.root.scrollTop,0);
  assert.equal(e.pending.size,3);
 }
 e.win.visualViewport.height=390;
 for(const fn of [...e.pending.values()])fn();
 assert.equal(e.root.style.height,'390px');
});
test('visual viewport scroll/resize and pageshow refresh layout and input bounds; detach removes listeners',()=>{
 const e=environment();let measured=0;
 const sync=installViewportSync(e.win,e.host,e.root,()=>measured++);
 const before=measured;e.win.visualViewport.offsetTop=7;e.win.visualViewport.dispatchEvent(new Event('scroll'));
 assert.equal(e.root.style.top,'7px');assert.ok(measured>before);
 e.win.visualViewport.height=330;e.win.dispatchEvent(new Event('pageshow'));assert.equal(e.root.style.height,'330px');
 sync.destroy();const last=measured;e.win.dispatchEvent(new Event('resize'));assert.equal(measured,last);
});
