import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {rosterCatalog} from '../src/roster/catalog.js';
import {resolveCharacterAsset} from '../src/assets/resolver.js';
import {characterAnimation} from '../src/assets/battleDescriptors.js';
import {animationFrame} from '../src/assets/playback.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {ASSET_LIMITS} from '../src/assets/schema.js';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';

const sha='e9bf9bbd3684aeb45422d53046eb2c7fd218da058ee9f48d582ac54a6a5ae4e8';
async function fixture(reducedMotion=false,order=['P1','P2','P3','P4','P5']){
 const textures=new Map();let resident=0,scenePeak=0,cachePeak=0;
 const scene={textures:{addImage(k,image){const bytes=image.width*image.height*4;resident+=bytes;scenePeak=Math.max(scenePeak,resident);textures.set(k,{bytes,has:()=>false,add(){}});},get:k=>textures.get(k),remove(k){resident-=textures.get(k)?.bytes??0;textures.delete(k);}},add:{image(x,y,key,frame){const v={texture:[key,frame],setTexture(k,f){this.texture=[k,f];return this;},destroy(){}};for(const m of ['setOrigin','setScale','setVisible','setDisplaySize','setPosition','setDepth','setAlpha','setFlipX'])v[m]=(...args)=>{v[m+'Value']=args;return v;};return v;}}};
 const cache=createAssetCache({transport:async r=>({image:{width:r.width,height:r.height},bytes:readFileSync('public/'+r.path).length})});
 const p=new AssetPresenter(scene,{reducedMotion,cache:{async load(k){const a=await cache.load(k);cachePeak=Math.max(cachePeak,cache.bytes);return a;}}});
 await p.prepare(order.map(id=>rosterCatalog[id]));
 return {p,cache,budget:()=>({resident,scenePeak,cachePeak})};
}
test('P5 approved lossless KO resolves exact RGBA PNG and a single static crop-corrected descriptor',()=>{
 const a=resolveCharacterAsset(rosterCatalog.P5,'battleKo');assert.equal(a.key,'xingxing.battleKo');assert.equal(a.path,'assets/botuo-basic-packing-v1/xingxing-battleKo.png');assert.deepEqual([a.width,a.height],[480,279]);
 const b=readFileSync('public/assets/characters/xingxing/battleKo.png');assert.equal(createHash('sha256').update(b).digest('hex'),sha);assert.deepEqual(b,readFileSync('docs/art/approved/xingxing/battleKo-480x288.png'));assert.deepEqual([b.readUInt32BE(16),b.readUInt32BE(20),b[24],b[25]],[480,288,8,6]);
 const d=characterAnimation(rosterCatalog.P5,'battleKo');assert.equal(d.source,a.key);assert.deepEqual(d.frames,[{x:0,y:0,width:480,height:279}]);assert.deepEqual(d.origin,[236/480,276/279]);assert.equal(d.scale,1.875);assert.equal(d.duration,1);assert.equal(d.loop,false);assert.equal(d.staticFrame,0);
 for(const reduced of [false,true])for(const now of [0,.1,1,100])assert.equal(animationFrame(d,now,reduced).index,0);
});
for(const reduced of [false,true])for(const left of [false,true])test(`P5 HP0 preserves static grounded KO and last facing left=${left}, reduced=${reduced}`,async()=>{
 const f=await fixture(reduced),actor={instanceId:'a1',definitionId:'P5',x:3,y:2,hp:285},frame={allies:[actor],enemies:[]};f.p.render(frame,0,rosterCatalog);actor.x+=left?-.1:.1;f.p.render(frame,.1,rosterCatalog);
 const v=f.p.actorSprites.get('a1');assert.ok(v.texture[0].endsWith('xingxing.battleMove'));actor.hp=0;const before=structuredClone(frame);
 for(const now of [.2,1,10,100]){f.p.render(frame,now,rosterCatalog);assert.ok(v.texture[0].endsWith('xingxing.battleKo'));assert.equal(v.texture[1],'0.0.480.279');assert.deepEqual(v.setOriginValue,[236/480,276/279]);assert.deepEqual(v.setDisplaySizeValue,[135,135*279/480]);assert.deepEqual(v.setFlipXValue,[left]);assert.deepEqual(v.setPositionValue,[actor.x,actor.y]);assert.deepEqual(v.setAlphaValue,[.35]);assert.equal(f.p.states.get('a1').state,'battleKo');assert.deepEqual(frame,before);}
 // Phaser flips about the frame center while retaining the display-origin offset.
 // Canonical pixels retain exact 512-canvas positions; flipX shifts them 2.25px horizontally.
 // Both facings preserve scale and the exact vertical ground-contact position.
 for(const [x,y] of [[4,8],[475,279],[236,279]]){const currentX=(left?1-x/480-v.setOriginValue[0]:x/480-v.setOriginValue[0])*v.setDisplaySizeValue[0],priorX=(left?1-(x+20)/512-.5:(x+20)/512-.5)*144;assert.ok(Math.abs(currentX-priorX-(left?2.25:0))<1e-10);assert.ok(Math.abs((y/279-v.setOriginValue[1])*v.setDisplaySizeValue[1]-((y+152)/512-428/512)*144)<1e-10);}
 assert.equal(rosterCatalog.P5.stats.moveSpeed,1.85);f.p.destroy();assert.equal(f.budget().resident,0);
});
test('all five Portrait/Idle/Move/KO textures remain present in real cache and scene with complete pins',async t=>{
 for(const order of [['P1','P2','P3','P4','P5'],['P5','P4','P3','P2','P1']]){const f=await fixture(false,order);for(const id of order)for(const slot of ['portraitSquare','battleIdle','battleMove','battleKo']){const key=rosterCatalog[id].assets[slot];assert.ok(f.p.textures.has(key),key+' must not silently drop');assert.equal((await f.cache.load(key)).key,key);}const b=f.budget();assert.ok(Number.isFinite(b.scenePeak)&&b.scenePeak>0);assert.ok(Number.isFinite(b.cachePeak)&&b.cachePeak>0);assert.equal(f.p.residency.snapshot().pinned,f.p.textures.size);assert.equal(f.p.textureBytes,b.resident);t.diagnostic(`${order}: cache=${b.cachePeak}, scene=${b.scenePeak}`);f.p.destroy();assert.equal(f.budget().resident,0);}
});
test('real P5 BattleSession KO freezes gameplay coordinates and presenter leaves snapshots unchanged',async()=>{
 const f=await fixture(),s=createStageBattleSession({...findStage('1-1'),selectedTeam:['P5','P1','P2']});
 const render=()=>{const before=structuredClone(s.snapshot()),snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));f.p.render(snap,s.elapsedSeconds,rosterCatalog);assert.deepEqual(s.snapshot(),before);};
 render();s.holdPlayerControl('a1');s.setPlayerMovement('a1',{x:-1,y:0});s.step(.05);render();const a=s.actorById('a1');a.damage(a.maxHp);const pos=[a.x,a.y];render();
 for(let i=0;i<3;i++){s.step(.05);render();assert.deepEqual([a.x,a.y],pos);assert.ok(f.p.actorSprites.get('a1').texture[0].endsWith('xingxing.battleKo'));assert.deepEqual(f.p.actorSprites.get('a1').setFlipXValue,[true]);}assert.equal(s.characterDefinitions.P5.stats.moveSpeed,1.85);f.p.destroy();
});
