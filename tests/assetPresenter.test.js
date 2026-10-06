import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {createLabConfig} from '../src/dev/battleLab/config.js';import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';import {createAssetCache} from '../src/runtime/assetCache.js';import {rosterCatalog} from '../src/roster/catalog.js';import {assetManifest} from '../src/assets/manifest.js';import {characterAnimation} from '../src/assets/battleDescriptors.js';
const api=await import('../src/runtime/assetPresenter.js').catch(()=>({}));
function scene(){const objects=[];const textures=new Map();const make=()=>{const v=new Proxy({destroyed:false,destroy(){this.destroyed=true;}},{get:(o,k)=>k in o?o[k]:()=>v});objects.push(v);return v;};return {objects,add:{graphics:make,image:make},textures:{exists:k=>textures.has(k),addImage(k){textures.set(k,{add(){}});return textures.get(k);},remove:k=>textures.delete(k),get:k=>textures.get(k)},keys:textures};}
test('presenter owns loaded textures and discards stale completion after shutdown',async()=>{
 assert.equal(typeof api.AssetPresenter,'function');let resolve,calls=0;const cache=createAssetCache({transport:()=>{calls++;return new Promise(r=>resolve=r);}}),s=scene();
 const p=new api.AssetPresenter(s,{cache});const pending=p.loadKeys(['placeholder.actor-strip']);assert.equal(calls,1);p.destroy();resolve({image:{width:64,height:32},bytes:200});await pending;assert.equal(s.keys.size,0);
 const q=new api.AssetPresenter(s,{cache});await q.loadKeys(['placeholder.actor-strip']);assert.equal(calls,1);assert.equal(s.keys.size,1);q.destroy();assert.equal(s.keys.size,0);
});
test('formal cast/hit/KO rendering is presentation-only and bounded; clear destroys displays',async()=>{
 assert.equal(typeof api.AssetPresenter,'function');const session=createLabBattleSession(createLabConfig({scenarioId:'persistent-area',allyTier:'T3',skipCountdown:true}));const s=scene(),p=new api.AssetPresenter(s);const before=JSON.stringify(session.snapshot());
 p.prepare(Object.values(session.characterDefinitions),{});const frame=session.snapshot();p.render(frame,0,session.characterDefinitions);assert.equal(JSON.stringify(session.snapshot()),before);
 p.cast({actorId:'a2',category:'awakening',origin:{x:4,y:0},target:{x:7,y:0}},session.characterDefinitions[session.actorById('a2').definitionId],0);
 p.hit({targetId:'a1'},session.characterDefinitions[session.actorById('a1').definitionId],0);p.render(frame,.1,session.characterDefinitions);assert.ok(p.playback.active.size>0);
 const ko=structuredClone(frame);ko.allies[1].hp=0;p.render(ko,.2,session.characterDefinitions);assert.equal(p.playback.active.size,0);assert.equal(JSON.stringify(session.snapshot()),before);
 p.destroy();assert.ok(s.objects.every(o=>o.destroyed));assert.equal(p.states.size,0);
});
test('Lab inspection uses shared presenter without combat mutation',async()=>{
 assert.equal(typeof api.AssetPresenter,'function');const session=createLabBattleSession(createLabConfig()),p=new api.AssetPresenter(scene(),{cache:createAssetCache({transport:async record=>({image:{width:record.width,height:record.height},bytes:200})})});
 const frame=session.snapshot(),before=JSON.stringify(frame);await p.inspect(frame.allies[0].instanceId,session.characterDefinitions[session.actorById(frame.allies[0].instanceId).definitionId],'battleIdle',0);p.render(frame,.6,session.characterDefinitions);assert.equal(JSON.stringify(session.snapshot()),before);assert.equal(p.states.get('a1').descriptor.source,session.characterDefinitions[session.actorById(frame.allies[0].instanceId).definitionId].animationDescriptors?.battleIdle?.source??'placeholder.actor-strip');p.destroy();
});
test('unknown/failed image slots leave real combat running and retained session unchanged',async()=>{
 const session=createLabBattleSession(createLabConfig({scenarioId:'heal'})),p=new api.AssetPresenter(scene(),{cache:createAssetCache({transport:async()=>{throw Error('missing');}})});
 const defs=Object.fromEntries(Object.entries(session.characterDefinitions).map(([id,d])=>[id,{...d,assets:{...d.assets,battleIdle:'does-not-exist'}}]));await p.prepare([...session.allies,...session.enemies].map(a=>defs[a.definitionId]));
 let steps=0;while(session.result()==='running'&&steps++<1800){session.step(.05);p.render(session.snapshot(),session.elapsedSeconds,defs);}assert.notEqual(session.result(),'running');p.destroy();
});
function faithfulScene(){
 const s=scene(),created=[];const common=kind=>{const v={kind,destroyed:false,x:0,y:0,destroy(){this.destroyed=true;},setPosition(x,y){this.x=x;this.y=y;return this;}};for(const k of ['setDepth','setAlpha','setScale','setVisible','setRotation','setOrigin','setDisplaySize','setFlipX'])v[k]=()=>v;created.push(v);return v;};
 s.add.graphics=()=>{const v=common('graphics');for(const k of ['clear','lineStyle','lineBetween','strokeCircle','fillStyle','fillCircle'])v[k]=()=>v;return v;};s.add.image=()=>{const v=common('image');v.setTexture=()=>v;return v;};s.created=created;return s;
}
test('late flipbook texture replaces Graphics fallback with an image safely',async()=>{
 let resolve;const cache=createAssetCache({transport:()=>new Promise(r=>resolve=r)}),s=faithfulScene(),p=new api.AssetPresenter(s,{cache}),session=createLabBattleSession(createLabConfig()),character=session.characterDefinitions[session.allies[0].definitionId];
 const pending=p.loadKeys(['placeholder.actor-strip']);const ability={presentation:{vfx:{form:'flipbook',assetKey:'placeholder.actor-strip',duration:1,animation:{source:'placeholder.actor-strip',frames:[{x:0,y:0,width:32,height:32}],fps:2}}}};
 p.cast({actorId:'a1',category:'heavy',origin:{x:0,y:0},target:{x:1,y:0}},character,0,ability);p.render(session.snapshot(),0,session.characterDefinitions);const graphics=s.created.find(v=>v.kind==='graphics');
 resolve({image:{width:64,height:32},bytes:200});await pending;p.render(session.snapshot(),.1,session.characterDefinitions);assert.equal(graphics.destroyed,true);assert.ok(s.created.some(v=>v.kind==='image'));p.destroy();
});
test('encounter ability-only VFX/animation assets are planned, no unrelated ability load',async()=>{
 const loaded=[],p=new api.AssetPresenter(scene(),{cache:{async load(key){loaded.push(key);return {type:'procedural'};}}}),session=createLabBattleSession(createLabConfig()),character=session.characterDefinitions[session.allies[0].definitionId];
 await p.prepare([character],{}, {[character.abilities.heavy]:{presentation:{vfx:{form:'sprite',assetKey:'placeholder.actor-strip',animation:{source:'placeholder.actor-strip',fps:2}}}},unrelated:{presentation:{vfx:{assetKey:'unrelated.art'}}}});assert.ok(loaded.includes('placeholder.actor-strip'));assert.ok(!loaded.includes('unrelated.art'));
});
test('target-attached VFX follows target and cleans when target KO',()=>{
 const session=createLabBattleSession(createLabConfig()),s=faithfulScene(),p=new api.AssetPresenter(s),character=session.characterDefinitions[session.allies[0].definitionId],frame=session.snapshot();
 p.cast({actorId:'a1',targetId:'e1',category:'heavy',origin:{x:0,y:0},target:{x:10,y:-1}},character,0,{presentation:{vfx:{form:'ring',attach:'target',duration:1}}});frame.enemies[0].x=9;p.render(frame,.1,session.characterDefinitions);assert.equal([...p.displays.values()][0].x,9);
 frame.enemies[0].hp=0;p.render(frame,.2,session.characterDefinitions);assert.equal(p.playback.active.size,0);assert.equal(p.displays.size,0);p.destroy();
});

test('battle HUD portraits use shared side-based mirroring, not character-specific logic',()=>{
 const source=readFileSync(new URL('../src/runtime/assetPresenter.js',import.meta.url),'utf8');
 const arena=readFileSync(new URL('../src/runtime/ArenaScene.js',import.meta.url),'utf8');
 assert.match(arena,/portraitViews\.set\(id, \{ card, backing, portrait, barFill, hpText, layout, side \}\)/);
 assert.match(source,/setFlipX\(view\.side==='enemy'\)/);
 assert.doesNotMatch(source,/definitionId.*setFlipX/);
});

test('executed formal HUD rendering keeps ally canonical, mirrors enemy, and reuses owned portraits',async()=>{
 const {rosterCatalog}=await import('../src/roster/catalog.js');const s=scene(),images=[];
 s.add.image=()=>{const image={setOrigin(x,y){this.origin=[x,y];return this;},setCrop(x,y,w,h){this.crop=[x,y,w,h];return this;},setDisplaySize(w,h){this.size=[w,h];return this;},setFlipX(flip){this.flip=flip;return this;},destroy(){this.destroyed=true;}};images.push(image);return image;};
 const cache=createAssetCache({transport:async record=>({image:{width:record.width,height:record.height},bytes:200})}),p=new api.AssetPresenter(s,{cache});await p.loadKeys(['lushu.portrait']);
 const makeView=side=>({side,layout:{backingY:0,portraitSize:64},card:{addAt(image,index){assert.equal(index,2);this.image=image;}}}),views=new Map([['a1',makeView('ally')],['e1',makeView('enemy')]]);
 const actor={definitionId:'P1',x:5,y:2,hp:245},session={actorById:()=>actor},before=structuredClone(actor);
 p.renderHud(views,rosterCatalog,session);p.renderHud(views,rosterCatalog,session);
 assert.equal(images.length,2);assert.equal(views.get('a1').card.image.flip,false);assert.equal(views.get('e1').card.image.flip,true);
 assert.ok(images.every(image=>Math.abs(image.size[0]*image.crop[2]/128-64)<1e-9&&Math.abs(image.size[1]*image.crop[3]/128-64)<1e-9),'visible crop fills the HUD square');assert.ok(images.every(image=>image.crop[2]===Math.round(128*.82)&&image.crop[3]===Math.round(128*.82)));assert.deepEqual(actor,before);
 p.destroy();assert.ok(images.every(image=>image.destroyed));assert.equal(p.hudSprites.size,0);
});

test('battle HUD uses shared face-first crop and preserves side-based enemy mirroring',()=>{
 const source=readFileSync(new URL('../src/runtime/assetPresenter.js',import.meta.url),'utf8');
 assert.match(source,/cropW=Math\.max\(1,Math\.round\(sourceW\*\.82\)\)/);
 assert.match(source,/cropY=Math\.round\(\(sourceH-cropH\)\*\.35\)/);
 assert.match(source,/setCrop\?\.\(cropX,cropY,cropW,cropH\)/);
 assert.match(source,/setFlipX\(view\.side==='enemy'\)/);
});

test('missing living transient art keeps authored idle moving instead of freezing frame zero',()=>{
 const source=readFileSync(new URL('../src/runtime/assetPresenter.js',import.meta.url),'utf8');
 assert.match(source,/elapsed=formalState\?now-state\.start:actor\.hp>0\?now:0/);
 assert.match(source,/KO fallback remains static/);
});

test('Botuo living missing Hit/Cast art keeps idle frames advancing while KO fallback stays static',async()=>{
 const textures=new Map(),images=[];
 const scene={textures:{addImage(k){const t={frames:new Set(),has(f){return this.frames.has(f);},add(f){this.frames.add(f);}};textures.set(k,t);return t;},get:k=>textures.get(k),remove:k=>textures.delete(k)},add:{image(){const v={setTexture(k,f){this.texture=[k,f];return this;}};for(const k of ['setOrigin','setScale','setVisible','setDisplaySize','setFlipX','setPosition','setDepth','setAlpha'])v[k]=()=>v;v.destroy=()=>{};images.push(v);return v;},graphics(){const v={};for(const k of ['setPosition','setDepth','setAlpha','setScale','clear','lineStyle','lineBetween','fillStyle','fillCircle','strokeCircle'])v[k]=()=>v;v.destroy=()=>{};return v;}}};
 const cache={async load(key){const a=assetManifest[key];return key==='botuo.battleIdle'?{...a,image:{width:a.width,height:a.height}}:{...a};}};
 const p=new api.AssetPresenter(scene,{cache});await p.loadKeys(['botuo.battleIdle']);
 const actor={instanceId:'a2',definitionId:'P2',x:2,y:1,hp:320},frame={allies:[actor],enemies:[]},defs={P2:rosterCatalog.P2};
 p.render(frame,0,defs);const sprite=p.actorSprites.get('a2');assert.equal(sprite.texture[1],'0.0.160.160');
 p.hit({targetId:'a2'},rosterCatalog.P2,.05);p.render(frame,.41,defs);assert.equal(sprite.texture[1],'160.0.160.160');
 p.setState('a2',characterAnimation(rosterCatalog.P2,'battleCast'),.5,'battleCast');p.render(frame,.81,defs);assert.equal(sprite.texture[1],'320.0.160.160');
 actor.hp=0;p.render(frame,1.21,defs);assert.equal(sprite.texture[1],'0.0.160.160');
 p.destroy();
});
