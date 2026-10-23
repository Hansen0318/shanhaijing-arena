import {approvedRuntimeAsset} from './helpers/approvedRuntimeAsset.js';
import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
import {assetManifest} from '../src/assets/manifest.js';import {rosterCatalog} from '../src/roster/catalog.js';import {decodeRgbaPng,cropRgba} from './helpers/pngRgba.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';import {createAssetCache} from '../src/runtime/assetCache.js';import {assetScene,pngTransport} from './helpers/assetScene.js';
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex'),png=p=>decodeRgbaPng(readFileSync(p));
test('Special loads four safe authored frames and distinct approved independent effects',()=>{
 const d=rosterCatalog.P1.actionDescriptors.special;assert.ok(d,'Special authored descriptor');assert.deepEqual(d.frameDurationsMs,[200,120,200,240]);assert.equal(d.contact.attach,'target');assert.equal(d.contact.retainOnNextCast,true);assert.equal(d.blade.holdAfterResolveMs,280);
 const a=assetManifest[d.animation.source],im=png('public/'+approvedRuntimeAsset(a).path);assert.deepEqual([im.width,im.height],[320,59]);
 const original=png('public/assets/characters/lushu/battleSpecial-4f.png');assert.deepEqual(im.pixels,cropRgba(original,[0,10,320,59]));
 for(let y=0;y<80;y++)if(y<10||y>=69)for(let x=0;x<320;x++)for(let channel=0;channel<4;channel++)assert.equal(original.pixels[(y*320+x)*4+channel],0,'only zero RGBA rows removed');
 for(let i=0;i<4;i++){const c=cropRgba(im,[i*80,0,80,59]);for(let y=0;y<59;y++)for(let x=0;x<80;x++)if(c[(y*80+x)*4+3])assert.ok(x>=4&&x<76);}
 const accepted=JSON.parse(readFileSync('docs/art/approved/lushu/special/review-v2/acceptance.json'));for(const f of accepted.files)assert.equal(sha(f.path),f.sha256);
});
test('P1 transparent-row Move/KO derivatives retain all original pixels and exact display transforms',()=>{
 for(const [slot,name,top,height,oldH,oldOrigin,oldScale] of [['battleMove','battleMove-4f.png',35,91,128,691/724,2],['battleKo','battleKo.png',10,472,512,385/512,2]]){
  const original=png('public/assets/characters/lushu/'+name),a=assetManifest[rosterCatalog.P1.assets[slot]],trim=png('public/'+approvedRuntimeAsset(a).path),d=rosterCatalog.P1.animationDescriptors[slot];
  assert.equal(trim.height,height);assert.deepEqual(trim.pixels,cropRgba(original,[0,top,original.width,height]));
  for(let y=0;y<oldH;y++)if(y<top||y>=top+height)for(let x=0;x<original.width;x++)assert.equal(original.pixels[(y*original.width+x)*4+3],0);
  const w=slot==='battleMove'?96:512;for(const flip of [false,true])for(const [x,y] of [[10,2],[w/2,height/2],[w-3,height-2]]){
   const oldPx=72*oldScale/Math.max(w,oldH),newPx=72*d.scale/Math.max(w,height);
   assert.ok(Math.abs((flip?-1:1)*(x-w/2)*oldPx-(flip?-1:1)*(x-d.origin[0]*w)*newPx)<1e-10);
   assert.ok(Math.abs((y+top-oldOrigin*oldH)*oldPx-(y-d.origin[1]*height)*newPx)<1e-10);
  }
 }
});
test('all-five Basic Heavy Special required textures remain fully resident across scenes',async()=>{
 const cache=createAssetCache({transport:pngTransport});for(let i=0;i<3;i++){const scene=assetScene(),p=new AssetPresenter(scene,{cache});await p.prepare(Object.values(rosterCatalog));assert.equal(p.textureBytes,19000920);assert.ok(p.textures.has('lushu.battleSpecial'));assert.ok(p.residency.snapshot().failed===0);assert.ok(Number.isFinite(scene.budget().peak));assert.ok(Number.isFinite(cache.diagnostics().highWaterBytes));p.destroy();assert.equal(scene.budget().bytes,0);}
});
