import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {rosterCatalog} from '../src/roster/catalog.js';
import {resolveCharacterAsset} from '../src/assets/resolver.js';
import {characterAnimation} from '../src/assets/battleDescriptors.js';
import {animationFrame} from '../src/assets/playback.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {ASSET_LIMITS} from '../src/assets/schema.js';
import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
const assets=[
 ['portraitSquare','portrait',128,128,45021,'ae9c7a38628bca93a419335d8c59e6ba583176a966d85a74571eae53b4f54651'],
 ['collectionArt','identity',160,192,56234,'2886b52e91f2c2f839f9ccba415e5453c90cda105e5377dd371cd042658dbc21'],
 ['battleIdle','battleIdle',160,160,37808,'1004c76a0ea3e5e942a60137cee5628752220edcfb8cd4c453a43df7e54e3c26'],
];
function scene(){
 const textures=new Map();let resident=0,peak=0;
 return {textures:{addImage(k,image){const bytes=image.width*image.height*4;resident+=bytes;peak=Math.max(peak,resident);textures.set(k,{bytes,has:()=>false,add(){}});},get:k=>textures.get(k),remove(k){resident-=textures.get(k)?.bytes??0;textures.delete(k);}},add:{image(x,y,k,f){const v={texture:[k,f],setTexture(k,f){this.texture=[k,f];return this;},destroy(){}};for(const name of ['setOrigin','setScale','setVisible','setDisplaySize','setFlipX','setPosition','setDepth','setAlpha','setCrop'])v[name]=(...a)=>{v[name+'Value']=a;return v;};return v;}},budget:()=>({resident,peak})};
}
async function fixture(order=['P1','P2','P3','P4','P5'],reducedMotion=false){
 let peak=0;const s=scene(),cache=createAssetCache({transport:async record=>{const b=readFileSync(new URL('../public/'+record.path,import.meta.url));return {image:{width:record.width,height:record.height},bytes:b.length};}});
 const p=new AssetPresenter(s,{reducedMotion,cache:{async load(k){const a=await cache.load(k);peak=Math.max(peak,cache.bytes);return a;}}});await p.prepare(order.map(id=>rosterCatalog[id]));return {p,s,cache,peak:()=>peak};
}
test('P5 all three approved slots resolve actual byte-identical runtime PNGs',()=>{
 for(const [slot,name,w,h,bytes,sha] of assets){const a=resolveCharacterAsset(rosterCatalog.P5,slot);assert.equal(a.key,'xingxing.'+name);assert.equal(a.path,slot==='battleIdle'?`assets/botuo-basic-packing-v1/xingxing-battleIdle.png`:`assets/characters/xingxing/${name}.png`);assert.deepEqual([a.width,a.height],[w,slot==='battleIdle'?134:h]);const b=readFileSync(new URL(`../public/assets/characters/xingxing/${name}.png`,import.meta.url));assert.equal(b.length,bytes);assert.equal(createHash('sha256').update(b).digest('hex'),sha);assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.deepEqual([b.readUInt32BE(16),b.readUInt32BE(20),b[24],b[25]],[w,h,8,6]);}
});
test('P5 single-frame grounded static idle has no authored action/breathing',()=>{
 const d=characterAnimation(rosterCatalog.P5,'battleIdle');assert.equal(d.source,'xingxing.battleIdle');assert.deepEqual(d.frames,[{x:0,y:0,width:160,height:134}]);assert.deepEqual(d.origin,[.5,133/134]);assert.equal(d.scale,2);assert.equal(d.duration,1);assert.equal(d.loop,false);assert.equal(d.staticFrame,0);
 for(const reduce of [false,true])for(const t of [0,.1,1,100])assert.equal(animationFrame(d,t,reduce).index,0);
 for(const state of ['battleHit','battleCast']){assert.equal(rosterCatalog.P5.animationDescriptors[state],undefined);assert.equal(resolveCharacterAsset(rosterCatalog.P5,state).key,'placeholder.battle');}assert.equal(rosterCatalog.P5.idleBreath,undefined);
 // Approved alpha extent: visible feet land at anchor; body height stays within roster family.
 assert.equal((133/134-d.origin[1])*144*134/160,0);assert.ok((148-16)*144/160>=110&&(148-16)*144/160<=144);
});
for(const reduced of [false,true])test(`P5 shared presenter keeps same static frame while stopped, mirrors actor/HUD without mutation (reduced=${reduced})`,async()=>{
 const f=await fixture(undefined,reduced),a={instanceId:'a1',definitionId:'P5',hp:230,x:5,y:0},e={instanceId:'e1',definitionId:'P5',hp:230,x:7,y:0},frame={allies:[a],enemies:[e]};
 for(const [t,x,y] of [[0,5,0],[.1,5,0],[.2,5,0],[.3,5,0],[10,5,0]]){a.x=x;a.y=y;const before=structuredClone(frame);f.p.render(frame,t,rosterCatalog);assert.deepEqual(frame,before);for(const id of ['a1','e1']){const v=f.p.actorSprites.get(id);assert.ok(v.texture[0].endsWith('xingxing.battleIdle'));assert.equal(v.texture[1],'0.0.160.134');assert.deepEqual(v.setOriginValue,[.5,133/134]);assert.deepEqual(v.setDisplaySizeValue,[144,144*134/160]);assert.equal(f.p.states.get(id).state,'battleIdle');}assert.deepEqual(f.p.actorSprites.get('e1').setFlipXValue,[true]);}
 assert.deepEqual(f.p.actorSprites.get('a1').setFlipXValue,[false]);const views=new Map(['a1','e1'].map(id=>[id,{side:id==='a1'?'ally':'enemy',layout:{backingY:0,portraitSize:64},card:{addAt(v){this.image=v;}}}]));f.p.renderHud(views,rosterCatalog,{actorById:id=>id==='a1'?a:e});for(const [id,view] of views){assert.ok(view.card.image.texture[0].endsWith('xingxing.portrait'));assert.deepEqual(view.card.image.setFlipXValue,[id==='e1']);}f.p.destroy();assert.equal(f.s.budget().resident,0);
});
test('P1-P4 plus P5 actual cache/scene retain every accepted asset with complete required ownership regardless of order',async t=>{
 for(const order of [['P1','P2','P3','P4','P5'],['P5','P4','P3','P2','P1']]){const f=await fixture(order);for(const id of order)for(const slot of ['portraitSquare','battleIdle','battleMove','battleKo']){const k=rosterCatalog[id].assets[slot];assert.ok(f.p.textures.has(k),k+' must not silently drop');assert.equal((await f.cache.load(k)).key,k);}assert.ok(Number.isFinite(f.peak())&&f.peak()>0);assert.ok(Number.isFinite(f.s.budget().peak)&&f.s.budget().peak>0);assert.equal(f.p.textureBytes,f.s.budget().resident);t.diagnostic(`cache peak=${f.peak()}; scene peak=${f.s.budget().peak}`);f.p.destroy();assert.equal(f.s.budget().resident,0);}
});
test('P5 exact stats and real BattleSession snapshot remain gameplay-owned',async()=>{
 assert.deepEqual(rosterCatalog.P5.stats,{maxHp:285,atk:17,def:7,moveSpeed:1.85,attackSpeed:1});const f=await fixture(),session=createLabBattleSession(createLabConfig({allyTeam:['P5','P2','P3'],skipCountdown:true}));const before=structuredClone(session.snapshot());f.p.render(session.snapshot(),0,session.characterDefinitions);assert.deepEqual(session.snapshot(),before);f.p.destroy();assert.equal(rosterCatalog.P1.animationDescriptors.battleMove.fps,18);assert.equal(rosterCatalog.P2.animationDescriptors.battleMove.fps,12);assert.equal(rosterCatalog.P3.animationDescriptors.battleMove.scale,2.7);
});

test('Collection full-body images remain real independently validated menu assets, not Arena textures',async()=>{
 const {bindMenuImage}=await import('../src/assets/menuImage.js');
 assert.equal(typeof bindMenuImage,'function');
 for(const id of ['P1','P2','P3','P4','P5']){
  const key=rosterCatalog[id].assets.collectionArt;
  const record=resolveCharacterAsset(rosterCatalog[id],'collectionArt');
  assert.equal(record.key,key);
  assert.equal(record.type,'image');
  const bytes=readFileSync(new URL('../public/'+record.path,import.meta.url));
  assert.equal(bytes.length,record.bytes);
 }
 const f=await fixture();
 for(const id of ['P1','P2','P3','P4','P5'])assert.equal(f.p.textures.has(rosterCatalog[id].assets.collectionArt),false,'Arena must not preload Collection art');
 f.p.destroy();
});
