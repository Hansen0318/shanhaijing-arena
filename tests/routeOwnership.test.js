import test from 'node:test';
import assert from 'node:assert/strict';
import * as route from '../src/runtime/routeVisibility.js';
import { installViewportSync } from '../src/runtime/viewportSync.js';
import { readFileSync } from 'node:fs';
test('non-battle owner detaches canvas host, battle alone reconnects it in the original position',()=>{
 const root={style:{}},host={style:{},hidden:false};const parent={children:[host,root],insertBefore(n,a){this.children=this.children.filter(x=>x!==n);this.children.splice(a?this.children.indexOf(a):this.children.length,0,n);n.parentNode=this;}};
 host.parentNode=parent;host.nextSibling=root;root.parentNode=parent;host.remove=()=>{parent.children=parent.children.filter(x=>x!==host);host.parentNode=null;};
 const owner=route.createRouteVisibility(root,host);
 assert.deepEqual(parent.children,[root]);assert.equal(host.hidden,true);
 owner.setBattle(true);assert.deepEqual(parent.children,[host,root]);
 owner.setBattle(false);owner.sync();assert.deepEqual(parent.children,[root]);
});
test('route owner hides stale game on initial Campaign, render, pageshow and Safari viewport events',()=>{
 const root={style:{},hidden:true},host={style:{visibility:'visible'},hidden:false};
 const owner=route.createRouteVisibility(root,host);assert.equal(host.hidden,true);assert.equal(root.hidden,false);
 const win=new EventTarget(),vv=new EventTarget();Object.assign(vv,{width:844,height:390});Object.assign(win,{visualViewport:vv,requestAnimationFrame:()=>1,cancelAnimationFrame(){},setTimeout:()=>1,clearTimeout(){}});
 const viewport=installViewportSync(win,host,root,()=>owner.sync());
 for(const [target,event] of [[win,'pageshow'],[win,'resize'],[vv,'resize'],[vv,'scroll']]){host.hidden=false;host.style.visibility='visible';target.dispatchEvent(new Event(event));assert.equal(host.hidden,true);assert.equal(host.style.visibility,'hidden');assert.equal(root.hidden,false);}
 owner.setBattle(true);assert.equal(root.hidden,true);assert.equal(host.hidden,false);assert.equal(host.style.visibility,'visible');win.dispatchEvent(new Event('pageshow'));assert.equal(host.hidden,false);
 owner.setBattle(false);viewport.routeChanged();assert.equal(host.hidden,true);assert.equal(root.hidden,false);viewport.destroy();
});
test('battle host starts hidden even before the entry module executes',()=>{
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');assert.match(html,/<div id="game" hidden/);assert.match(html,/#game\[hidden\].*display:\s*none/);
});
