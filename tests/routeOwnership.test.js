import test from 'node:test';
import assert from 'node:assert/strict';
import * as route from '../src/runtime/routeVisibility.js';
import { installViewportSync } from '../src/runtime/viewportSync.js';
import { readFileSync } from 'node:fs';
test('route owner hides stale game on initial Campaign, render, pageshow and Safari viewport events',()=>{
 const root={style:{},hidden:true},host={style:{visibility:'visible'},hidden:false};
 const owner=route.createRouteVisibility(root,host);assert.equal(host.hidden,true);assert.equal(root.hidden,false);
 const win=new EventTarget(),vv=new EventTarget();Object.assign(vv,{width:844,height:390});Object.assign(win,{visualViewport:vv,requestAnimationFrame:()=>1,cancelAnimationFrame(){},setTimeout:()=>1,clearTimeout(){}});
 const viewport=installViewportSync(win,host,root,()=>owner.sync());
 for(const [target,event] of [[win,'pageshow'],[win,'resize'],[vv,'resize'],[vv,'scroll']]){host.hidden=false;host.style.visibility='visible';target.dispatchEvent(new Event(event));assert.equal(host.hidden,true);assert.equal(host.style.visibility,'hidden');assert.equal(root.hidden,false);}
 owner.setBattle(true);assert.equal(root.hidden,true);assert.equal(host.hidden,false);assert.equal(host.style.visibility,'visible');win.dispatchEvent(new Event('pageshow'));assert.equal(host.hidden,false);
 owner.setBattle(false);viewport.routeChanged();assert.equal(host.hidden,true);assert.equal(root.hidden,false);viewport.destroy();
});
test('application ties Campaign renders, battle launch and viewport settlement to same route owner',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.match(main,/onRender:\(\)=>\{routes.setBattle\(false\);viewport.routeChanged\(\);\}/);
 assert.match(main,/routes.setBattle\(true\)/);assert.match(main,/game\?\.scale.refresh\(\);routes.sync\(\)/);
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');assert.match(html,/<div id="game" hidden/);assert.match(html,/#game\[hidden\].*display:\s*none/);
});
