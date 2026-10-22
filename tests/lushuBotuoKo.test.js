import {approvedRuntimeAsset} from './helpers/approvedRuntimeAsset.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {inflateSync} from 'node:zlib';
import {rosterCatalog} from '../src/roster/catalog.js';
import {resolveCharacterAsset} from '../src/assets/resolver.js';
import {characterAnimation} from '../src/assets/battleDescriptors.js';
import {animationFrame} from '../src/assets/playback.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {ASSET_LIMITS} from '../src/assets/schema.js';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';

const cases=[
 {id:'P1',name:'lushu',bytes:150698,sha:'03c4e5a75546e8dc67044f42a9ce958bba829e423561e60a2665d7494bf77aff',bottom:385,bbox:[10,176,508,385],speed:2.05},
 {id:'P2',name:'botuo',bytes:157440,sha:'037829ec32333a0179414a9ee8ccb57b4eb3ddb83004aa93aea5c78914fc9c57',bottom:405,bbox:[5,187,511,405],speed:1.45},
];

// Decode/renderer boundaries only are doubled. Actual PNG metadata, cache,
// encounter preparation, presenter, frame selection and BattleSession are used.
async function fixture(id='P1',reducedMotion=false,order=['P1','P2','P3']){
 const textures=new Map();let sceneBytes=0,scenePeak=0,cachePeak=0;
 const scene={textures:{addImage(key,image){const bytes=image.width*image.height*4;sceneBytes+=bytes;scenePeak=Math.max(scenePeak,sceneBytes);textures.set(key,{bytes,has:()=>false,add(){}});},get:key=>textures.get(key),remove(key){sceneBytes-=textures.get(key)?.bytes??0;textures.delete(key);}},add:{image(x,y,key,frame){const image={texture:[key,frame],setTexture(k,f){this.texture=[k,f];return this;},destroy(){}};for(const method of ['setOrigin','setScale','setVisible','setDisplaySize','setFlipX','setPosition','setDepth','setAlpha'])image[method]=(...args)=>{image[method+'Value']=args;return image;};return image;}}};
 const cache=createAssetCache({transport:async record=>{
  const bytes=readFileSync(new URL('../public/'+record.path,import.meta.url));
  return {image:{width:record.width,height:record.height},bytes:bytes.length};
 }});
 const cacheBoundary={async load(key){const value=await cache.load(key);cachePeak=Math.max(cachePeak,cache.bytes);return value;}};
 const p=new AssetPresenter(scene,{cache:cacheBoundary,reducedMotion});await p.prepare(order.map(id=>rosterCatalog[id]));
 const actor={instanceId:'a1',definitionId:id,x:3,y:0,hp:rosterCatalog[id].stats.maxHp??320},frame={allies:[actor],enemies:[]};
 return {p,cache,actor,frame,render:now=>p.render(frame,now,rosterCatalog),budget:()=>({cachePeak,scenePeak,sceneBytes})};
}

for(const c of cases){
 const h=c.id==='P2'?331:472,oy=c.id==='P2'?280/331:375/472,sy=c.id==='P2'?125:10;
 test(`${c.id} runtime KO manifest/descriptor is a single static grounded 512 frame`,()=>{
  const a=approvedRuntimeAsset(resolveCharacterAsset(rosterCatalog[c.id],'battleKo'));assert.equal(a.key,c.name+'.battleKo');assert.equal(a.path,`assets/characters/${c.name}/battleKo-trimmed.png`);assert.deepEqual([a.width,a.height,a.bytes],[512,h,readFileSync('public/'+a.path).length]);assert.equal(a.fallback,'placeholder.battle');
  const d=characterAnimation(rosterCatalog[c.id],'battleKo');assert.equal(d.source,a.key);assert.deepEqual(d.frames,[{x:0,y:0,width:512,height:h}]);assert.deepEqual(d.origin,[.5,oy]);assert.equal(d.scale,2);assert.equal(d.duration,1);assert.equal(d.loop,false);assert.equal(d.staticFrame,0);
  for(const reduced of [false,true])for(const now of [0,.5,1,100])assert.equal(animationFrame(d,now,reduced).index,0);
 });
 for(const reduced of [false,true])for(const left of [false,true])test(`${c.id} HP0 keeps static KO / saved ${left?'left':'right'} facing (reduced=${reduced})`,async()=>{
  const f=await fixture(c.id,reduced);f.render(0);const image=f.p.actorSprites.get('a1');assert.ok(image.texture[0].endsWith(c.name+'.battleIdle'));
  f.actor.x+=left?-.1:.1;f.render(.1);assert.ok(image.texture[0].endsWith(c.name+'.battleMove'));assert.deepEqual(image.setFlipXValue,[left]);
  f.actor.hp=0;const before=structuredClone(f.frame);for(const now of [.2,1.2,10,100]){f.render(now);assert.ok(image.texture[0].endsWith(c.name+'.battleKo'));assert.equal(image.texture[1],`0.0.512.${h}`);assert.deepEqual(image.setFlipXValue,[left]);assert.deepEqual(image.setOriginValue,[.5,oy]);assert.deepEqual(image.setDisplaySizeValue,[144,144*h/512]);assert.deepEqual(image.setPositionValue,[f.actor.x,f.actor.y]);assert.deepEqual(image.setAlphaValue,[.35]);assert.equal(f.p.states.get('a1').state,'battleKo');assert.deepEqual(f.frame,before);}
  assert.equal(rosterCatalog[c.id].stats.moveSpeed,c.speed);f.p.destroy();assert.equal(f.budget().sceneBytes,0);
 });
 test(`${c.id} actual BattleSession dead coordinates/snapshot/moveSpeed remain gameplay-owned`,async()=>{
  const f=await fixture(c.id),s=createStageBattleSession({...findStage('1-1'),selectedTeam:[c.id,...['P1','P2','P3'].filter(id=>id!==c.id)]});
  const render=()=>{const before=structuredClone(s.snapshot()),snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));f.p.render(snap,s.elapsedSeconds,rosterCatalog);assert.deepEqual(s.snapshot(),before);};
  render();s.holdPlayerControl('a1');s.setPlayerMovement('a1',{x:-1,y:0});s.step(.05);render();const actor=s.actorById('a1');actor.damage(actor.maxHp);const position=[actor.x,actor.y];render();
  for(let i=0;i<3;i++){s.step(.05);render();assert.deepEqual([actor.x,actor.y],position);assert.ok(f.p.actorSprites.get('a1').texture[0].endsWith(c.name+'.battleKo'));assert.deepEqual(f.p.actorSprites.get('a1').setFlipXValue,[true]);}
  assert.equal(s.characterDefinitions[c.id].stats.moveSpeed,c.speed);f.p.destroy();
 });
 test(`${c.id} exact approved derivative pixels ground the silhouette without source edits`,()=>{
  const b=readFileSync(new URL(`../public/assets/characters/${c.name}/battleKo.png`,import.meta.url));assert.equal(b.length,c.bytes);assert.equal(createHash('sha256').update(b).digest('hex'),c.sha);assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.deepEqual([b.readUInt32BE(16),b.readUInt32BE(20),b[24],b[25],b[28]],[512,512,8,6,0]);
  const chunks=[];for(let p=8;p<b.length;){const n=b.readUInt32BE(p);if(b.toString('ascii',p+4,p+8)==='IDAT')chunks.push(b.subarray(p+8,p+8+n));p+=n+12;}
  const raw=inflateSync(Buffer.concat(chunks)),stride=512*4,pixels=Buffer.alloc(stride*512),paeth=(a,b,c)=>{const p=a+b-c,da=Math.abs(p-a),db=Math.abs(p-b),dc=Math.abs(p-c);return da<=db&&da<=dc?a:db<=dc?b:c;};
  for(let y=0;y<512;y++)for(let x=0;x<stride;x++){const filter=raw[y*(stride+1)],left=x>=4?pixels[y*stride+x-4]:0,up=y?pixels[(y-1)*stride+x]:0,ul=y&&x>=4?pixels[(y-1)*stride+x-4]:0;assert.ok(filter<=4);pixels[y*stride+x]=(raw[y*(stride+1)+1+x]+[0,left,up,Math.floor((left+up)/2),paeth(left,up,ul)][filter])&255;}
  let minX=512,minY=512,maxX=-1,maxY=-1;for(let y=0;y<512;y++)for(let x=0;x<512;x++)if(pixels[(y*512+x)*4+3]>64){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}
  assert.deepEqual([minX,minY,maxX+1,maxY+1],c.bbox);const d=rosterCatalog[c.id].animationDescriptors.battleKo;assert.ok(Math.abs((maxY+1-sy)/h-d.origin[1])*144*h/512<.01);assert.ok((maxX+1-minX)*144/512>130);assert.ok((maxY+1-minY)*144/512<70);
 });
}

test('P1/P2/P3 actual cache and scene preload every KO regardless of order',async t=>{
 for(const order of [['P1','P2','P3'],['P3','P2','P1'],['P2','P3','P1'],['P1','P2','P3','P1','P2','P3']]){
  const f=await fixture('P1',false,order);for(const key of ['lushu.battleKo','botuo.battleKo','chiru.battleKo']){assert.ok(f.p.textures.has(key),`${key} not silently dropped`);assert.equal((await f.cache.load(key)).key,key);}
  const peak=f.budget();assert.ok(Number.isFinite(peak.cachePeak)&&peak.cachePeak>0);assert.ok(Number.isFinite(peak.scenePeak)&&peak.scenePeak>0);assert.equal(f.cache.bytes,peak.cachePeak);assert.equal(f.p.textureBytes,peak.scenePeak);assert.equal(peak.sceneBytes,peak.scenePeak);
  t.diagnostic(`${order.join('/')} cache peak=${peak.cachePeak}; scene peak=${peak.scenePeak}`);f.p.destroy();assert.equal(f.budget().sceneBytes,0);
 }
});
