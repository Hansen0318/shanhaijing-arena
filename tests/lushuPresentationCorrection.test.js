import test from 'node:test';import assert from 'node:assert/strict';
import {rosterCatalog} from '../src/roster/catalog.js';
import {characterAnimation} from '../src/assets/battleDescriptors.js';
import {resolveCharacterAsset} from '../src/assets/resolver.js';
import {decoratePortrait} from '../src/assets/menuImage.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {installViewportSync} from '../src/runtime/viewportSync.js';
import {CollectionView} from '../src/collection/view.js';
import {CampaignView} from '../src/campaign/view.js';
import {CampaignController} from '../src/campaign/controller.js';
import {readFileSync} from 'node:fs';
function element(tag){return {tag,isConnected:true,children:[],dataset:{},style:{},className:'',textContent:'',scrollTop:0,scrollLeft:0,attributes:{},classList:{add(){}},append(...items){this.children.push(...items);},replaceChildren(...items){this.children=items;this.textContent='';},setAttribute(k,v){this.attributes[k]=v;},removeAttribute(k){delete this[k];},addEventListener(k,fn){this['on'+k]=fn;},focus(options){this.focusOptions=options;this.focused=true;this.onFocus?.(options);},remove(){this.removed=true;}};}
const walk=n=>[n,...n.children.flatMap(walk)],by=(r,p)=>walk(r).find(p);
const doc={createElement:element};
function viewport(root){const win=new EventTarget(),vv=new EventTarget(),jobs=new Map();let id=0;Object.assign(vv,{width:844,height:390,offsetLeft:7,offsetTop:21});Object.assign(win,{visualViewport:vv,requestAnimationFrame:fn=>{jobs.set(++id,fn);return id;},cancelAnimationFrame:id=>jobs.delete(id),setTimeout:fn=>{jobs.set(++id,fn);return id;},clearTimeout:id=>jobs.delete(id)});return {vv,jobs,sync:installViewportSync(win,{style:{}},root)};}
test('approved static portrait/full identity resolve through shared slots, retain fallback text on load failure',()=>{
 for(const slot of ['portraitSquare','collectionArt']){
  const a=resolveCharacterAsset(rosterCatalog.P1,slot);assert.equal(a.type,'image');assert.ok(!a.path.includes('battleIdle'));
  const png=readFileSync('public/'+a.path);assert.equal(png[25],6);
  const host=element('span');host.textContent='鹿蜀';decoratePortrait(host,rosterCatalog.P1,{document:doc,slot});
  const image=host.children.find(n=>n.tag==='img');assert.ok(image);assert.ok(image.src.endsWith(a.path));assert.equal(host.style.display,'grid');
  image.onload();assert.equal(host.children.find(n=>n.tag==='span').hidden,true);
  image.onerror();assert.equal(image.hidden,true);assert.equal(host.children.find(n=>n.tag==='span').hidden,false);
 }
 assert.equal(resolveCharacterAsset(rosterCatalog.P2,'portraitSquare').type,'procedural');
});
function scene(){const images=[],textures=new Map();return {images,textures:{addImage(k){textures.set(k,{has:()=>true});},get:k=>textures.get(k),remove:k=>textures.delete(k)},add:{image(){const v={};for(const k of ['setTexture','setOrigin','setScale','setVisible','setDisplaySize','setPosition','setDepth','setAlpha','setFlipX'])v[k]=(...a)=>{v[k.slice(3)]=a;return v;};v.destroy=()=>v.destroyed=true;images.push(v);return v;}}};}
test('static-first enlarged sprites mirror shared motion without moving actor/origin, retain facing at rest',async()=>{
 const s=scene(),p=new AssetPresenter(s,{reducedMotion:true,cache:{async load(key){const {assetManifest}=await import('../src/assets/manifest.js');const a=assetManifest[key];return a.type==='image'?{...a,image:{width:a.width,height:a.height}}:a;}}});
 await p.prepare([rosterCatalog.P1]);const a={instanceId:'a1',definitionId:'P1',x:5,y:2,hp:245},e={...a,instanceId:'e1',x:9},frame={allies:[a],enemies:[e]};
 p.render(frame,0,rosterCatalog);assert.deepEqual(p.actorSprites.get('a1').DisplaySize,[108,144]);assert.deepEqual(p.actorSprites.get('e1').DisplaySize,[108,144]);
 for(const [dx,flip] of [[.1,false],[-.2,true],[0,true],[.2,false]]){
  a.x+=dx;e.x+=dx;const before=structuredClone(frame);p.render(frame,.8,rosterCatalog);
  for(const actor of [a,e]){const image=p.actorSprites.get(actor.instanceId);assert.deepEqual(image.FlipX,[flip]);assert.deepEqual(image.Origin,[.5,691/724]);assert.deepEqual(image.Position,[actor.x,actor.y]);}
  assert.deepEqual(frame,before);
 }
 // Re-enable the same loop after static-size validation; all four mirrored cells survive.
 p.reducedMotion=false;a.x-=.1;p.render(frame,0,rosterCatalog);
 for(let i=0;i<4;i++){p.render(frame,i*.4+.001,rosterCatalog);const image=p.actorSprites.get('a1');assert.equal(image.Texture[1],`${i*96}.0.96.128`);assert.deepEqual(image.FlipX,[true]);}
 p.destroy();assert.equal(p.facings.size,0);assert.ok(s.images.every(i=>i.destroyed));
});
test('same-route Detail close preserves grid scroll/focus and normalizes only root plus visualViewport',()=>{
 const root=element('main'),page=element('section'),c=new CampaignController(),v=viewport(root);const view=new CollectionView(c,{document:doc,onViewportChange:()=>v.sync.surfaceChanged()});view.mount(page);
 const card=by(page,n=>n.dataset.characterId==='P1');view.grid.scrollTop=83;root.scrollTop=35;
 card.onclick();assert.equal(root.scrollTop,0);assert.equal(root.style.top,'21px');
 const detail=by(page,n=>n.className==='collection-detail-content');detail.scrollTop=250;root.scrollTop=40;
 card.onFocus=options=>{assert.deepEqual(options,{preventScroll:true});view.grid.scrollTop=0;};
 by(page,n=>n.dataset.action==='close-detail').onclick();assert.equal(view.grid.scrollTop,83);assert.equal(root.scrollTop,0);assert.equal(card.focused,true);assert.equal(view.browser.inert,false);
 assert.equal(view.scrollTop,83);assert.equal(detail.scrollTop,250);
 for(const job of v.jobs.values())job();assert.equal(view.grid.scrollTop,83);assert.equal(root.scrollTop,0);v.sync.destroy();
});
test('route normalization survives delayed focus/browser scroll while preserving internal scroller',()=>{
 const root=element('main'),internal=element('div'),v=viewport(root);internal.scrollTop=67;
 v.sync.routeChanged();root.scrollTop=99;root.scrollLeft=18;v.vv.offsetTop=8;
 for(const job of v.jobs.values())job();assert.equal(root.scrollTop,0);assert.equal(root.scrollLeft,0);assert.equal(root.style.top,'8px');assert.equal(internal.scrollTop,67);v.sync.destroy();
});
test('real Team/Stage/Chapter BACK routes invoke viewport reset and same-route Detail callback is wired',()=>{
 const old=globalThis.document;globalThis.document=doc;
 try{const c=new CampaignController(),root=element('main'),v=viewport(root);c.openLanding();const view=new CampaignView(root,c,{onRender:()=>v.sync.routeChanged(),onViewportChange:()=>v.sync.surfaceChanged()});view.render();
 by(root,n=>n.textContent==='BATTLE').onclick();by(root,n=>n.tag==='button'&&n.attributes['aria-label']?.startsWith('南山')).onclick();
 c.openTeamSelect();view.render();assert.equal(c.screen,'team');root.scrollTop=45;by(root,n=>n.tag==='button'&&n.textContent==='BACK').onclick();assert.equal(c.screen,'stages');assert.equal(root.scrollTop,0);
 root.scrollTop=54;by(root,n=>n.tag==='button'&&n.textContent==='BACK').onclick();assert.equal(c.screen,'chapters');assert.equal(root.scrollTop,0);
 by(root,n=>n.dataset.action==='chapters-back').onclick();by(root,n=>n.textContent==='COLLECTION').onclick();root.scrollTop=25;
 by(root,n=>n.dataset.characterId==='P1').onclick();assert.equal(root.scrollTop,0);root.scrollTop=43;by(root,n=>n.dataset.action==='close-detail').onclick();assert.equal(root.scrollTop,0);v.sync.destroy();
 }finally{globalThis.document=old;}
});
test('Team ally/enemy/bench and Collection card/Detail share static menu image binding',async()=>{
 const {renderTeamSelect}=await import('../src/roster/view.js');const {TeamSelection}=await import('../src/roster/team.js');
 const page=element('section'),team=new TeamSelection({stage:{enemyLineup:['P1','P2','P3']},saved:['P1','P2','P3']});renderTeamSelect(page,team,{document:doc,stageId:'1-1'});
 const portraits=walk(page).filter(n=>n.dataset.assetKey==='lushu.portrait');assert.equal(portraits.length,1);
 for(const host of portraits)assert.ok(host.children.some(n=>n.tag==='img'&&n.src.endsWith('/portrait.png')));
 const collection=element('section'),view=new CollectionView(new CampaignController(),{document:doc});view.mount(collection);
 assert.equal(walk(collection).filter(n=>n.dataset.assetKey==='lushu.portrait').length,1);
 by(collection,n=>n.dataset.characterId==='P1').onclick();const full=by(collection,n=>n.dataset.assetKey==='lushu.identity');assert.ok(full.children.some(n=>n.tag==='img'&&n.src.endsWith('/identity.png')));
 assert.equal(walk(collection).some(n=>n.tag==='img'&&n.src.includes('battleIdle')),false);
});
