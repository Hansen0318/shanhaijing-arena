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
 e.win.visualViewport.height=350;e.win.dispatchEvent(new Event('pageshow'));assert.equal(e.root.style.height,'350px');
 sync.destroy();const last=measured;e.win.dispatchEvent(new Event('resize'));assert.equal(measured,last);
});

test('pageshow clamps a transient short Safari visual viewport without changing Arena canvas sizing',()=>{
 const e=environment();const sync=installViewportSync(e.win,e.host,e.root);
 Object.assign(e.win.visualViewport,{height:220,offsetTop:24});e.win.dispatchEvent(new Event('pageshow'));
 assert.equal(e.root.style.height,'366px');
 assert.equal(e.root.style.top,'24px');
 assert.equal(e.host.style.height,'220px');
 // Ordinary resize remains visualViewport-owned after the reload stabilization path.
 e.win.visualViewport.height=330;e.win.dispatchEvent(new Event('resize'));
 assert.equal(e.root.style.height,'330px');assert.equal(e.host.style.height,'330px');
 sync.destroy();
});

for(const zoom of [1.5,2,3])test(`page scale ${zoom} retains one stable logical UI and fits its transformed bounds into the visual viewport`,()=>{
 const e=environment(),vars=new Map();e.win.document={documentElement:{style:{setProperty:(k,v)=>vars.set(k,v)}}};
 Object.assign(e.win,{innerWidth:852,innerHeight:330});
 Object.assign(e.win.visualViewport,{width:852/zoom,height:330/zoom,scale:zoom,offsetLeft:17,offsetTop:9});
 const sync=installViewportSync(e.win,e.host,e.root);
 assert.equal(e.root.style.width,'852px');assert.equal(e.root.style.height,'330px');
 assert.equal(e.root.style.left,'17px');assert.equal(e.root.style.top,'9px');
 assert.equal(e.root.style.transform,`scale(${1/zoom})`);assert.equal(e.root.style.transformOrigin,'0 0');
 assert.ok(Math.abs(parseFloat(e.root.style.width)/zoom-e.win.visualViewport.width)<1e-9);
 assert.equal(e.host.style.height,'330px');assert.equal(e.host.style.transform,e.root.style.transform);
 assert.ok(Math.abs(parseFloat(e.host.style.left)-(17+(852-1120*330/540)/(2*zoom)))<1e-9);
 assert.equal(vars.get('--app-vp-width'),'852px');assert.equal(vars.get('--app-vp-height'),'330px');assert.equal(vars.get('--app-vp-transform'),`scale(${1/zoom})`);
 assert.equal(vars.get('--app-vp-left'),'17px');assert.equal(vars.get('--app-vp-top'),'9px');
 e.win.dispatchEvent(new Event('pageshow'));assert.equal(e.root.style.height,'330px');
 Object.assign(e.win.visualViewport,{scale:1,width:852,height:330,offsetLeft:0,offsetTop:0});e.win.dispatchEvent(new Event('resize'));
 assert.equal(e.root.style.transform,'none');assert.equal(e.host.style.transform,'none');assert.equal(e.root.style.width,'852px');sync.destroy();
});
test('zoomed width-constrained Arena remains vertically centered in the visible viewport',()=>{
 const e=environment();Object.assign(e.win,{innerWidth:600,innerHeight:400});
 Object.assign(e.win.visualViewport,{width:300,height:200,scale:2,offsetLeft:10,offsetTop:20});
 const sync=installViewportSync(e.win,e.host,e.root);
 assert.equal(e.host.style.width,'600px');assert.equal(e.host.style.left,'10px');
 assert.ok(Math.abs(parseFloat(e.host.style.height)-289.2857142857143)<1e-9);
 assert.ok(Math.abs(parseFloat(e.host.style.top)-47.67857142857143)<1e-9);sync.destroy();
});
test('viewport scroll events cannot accidentally enable the pageshow-only root-height clamp',()=>{
 const e=environment();const sync=installViewportSync(e.win,e.host,e.root);
 e.win.visualViewport.height=220;e.win.visualViewport.dispatchEvent(new Event('scroll'));
 assert.equal(e.root.style.height,'220px');sync.destroy();
});
