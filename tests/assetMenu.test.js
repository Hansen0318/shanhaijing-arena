import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {bindMenuImage,decorateIdlePreview} from '../src/assets/menuImage.js';import {rosterCatalog} from '../src/roster/catalog.js';
test('broken menu image fallback terminates, never re-requests the same failed image',()=>{
 const image={removeAttribute(){this.src=null;}};bindMenuImage(image,{key:'new-art',path:'missing.png',width:32,height:32,fallback:'placeholder.actor-strip'});
 image.onerror();assert.match(image.src,/actor-strip/);image.onerror();assert.equal(image.hidden,true);assert.equal(image.src,null);
});

test('Team Select full-body previews consume authored idle sprite sheets when available',()=>{
 const menu=readFileSync(new URL('../src/assets/menuImage.js',import.meta.url),'utf8');
 const roster=readFileSync(new URL('../src/roster/view.js',import.meta.url),'utf8');
 assert.match(menu,/export function decorateIdlePreview/);
 assert.match(menu,/frames\.length<2/);
 assert.match(menu,/img\.animate\(keyframes/);
 assert.match(roster,/animationDescriptors\?\.battleIdle\?\.frames\?\.length>1\?decorateIdlePreview/);
});

test('Team Select idle preview executes the approved Botuo F1-to-F4 sprite sequence',()=>{
 const animations=[];
 const make=tag=>({tag,style:{},dataset:{},children:[],textContent:'',hidden:false,append(...items){this.children.push(...items);},replaceChildren(...items){this.children=items;this.textContent='';},removeAttribute(k){delete this[k];},animate:keyframes=>{animations.push(keyframes);return {};}});
 const document={defaultView:{matchMedia:()=>({matches:false})},createElement:make};
 const host=make('span');host.textContent='猼訑';decorateIdlePreview(host,rosterCatalog.P2,{document});
 assert.equal(host.dataset.menuAnimation,'battleIdle');assert.equal(host.dataset.assetKey,'botuo.battleIdle');
 const viewport=host.children.find(n=>n.tag==='span'),image=viewport.children.find(n=>n.tag==='img');
 assert.ok(image.src.endsWith('/assets/characters/botuo/battleIdle-4f.png'));
 assert.equal(animations.length,1);assert.deepEqual(animations[0].map(k=>k.transform),[
  'translate(0%,0%)','translate(-25%,0%)','translate(-50%,0%)','translate(-75%,0%)','translate(0%,0%)'
 ]);
});
