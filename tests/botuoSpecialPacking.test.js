import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {assetManifest} from '../src/assets/manifest.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';
import {decodeRgbaPng,cropRgba} from './helpers/pngRgba.js';
import {specialRuntimePacking} from '../src/assets/specialRuntimePacking.js';
const proposal=JSON.parse(readFileSync('docs/art/candidates/botuo/special/runtime-pack-v1/packing-manifest.json'));
test('six new installed frames restore exact independent logical review controls',()=>{
 const refs=JSON.parse(readFileSync('docs/verification/P2_SPECIAL_RUNTIME/native-reference/manifest.json'));
 for(const r of refs){const p=specialRuntimePacking[r.key],f=p.frames[r.frame],im=decodeRgbaPng(readFileSync('public/'+p.record.path)),reference=decodeRgbaPng(readFileSync(r.path)),[w,h,x,y]=f.trim,out=Buffer.alloc(w*h*4),bytes=cropRgba(im,[f.x,f.y,f.width,f.height]);
  for(let j=0;j<f.height;j++)bytes.copy(out,((y+j)*w+x)*4,j*f.width*4,(j+1)*f.width*4);
  assert.deepEqual(out,reference.pixels,`${r.key} ${r.frame}`);assert.equal(createHash('sha256').update(readFileSync(r.source)).digest('hex'),r.sourceSha256);
 }assert.equal(refs.length,6);
});
test('installed physical adapter restores every legacy logical RGBA frame byte for byte',()=>{
 let count=0;
 for(const e of proposal.legacyCandidates){
  const original=decodeRgbaPng(readFileSync(e.source)),p=specialRuntimePacking[e.key],packed=decodeRgbaPng(readFileSync('public/'+p.record.path));
  assert.equal(createHash('sha256').update(readFileSync(e.source)).digest('hex'),e.sourceSha256);
  p.logicalFrames.forEach((logical,i)=>{
   const f=p.frames[i],ow=logical.trim?.[0]??logical.width,oh=logical.trim?.[1]??logical.height;
   const expected=Buffer.alloc(ow*oh*4),actual=Buffer.alloc(ow*oh*4);
   for(const [im,r,out] of [[original,logical,expected],[packed,f,actual]]){
    const bytes=cropRgba(im,[r.x,r.y,r.width,r.height]),ox=r.trim?.[2]??0,oy=r.trim?.[3]??0;
    for(let y=0;y<r.height;y++)bytes.copy(out,((oy+y)*ow+ox)*4,y*r.width*4,(y+1)*r.width*4);
   }
   assert.deepEqual(actual,expected,`${e.key} frame ${i}`);count++;
  });
 }
 assert.equal(count,57);
});
test('installed 45-key envelope retains all required art with reserve and exact candidate bytes',async()=>{
 for(const entry of [...proposal.legacyCandidates,...proposal.newAssets]){
  const record=assetManifest[entry.key];assert.ok(record?.path.startsWith('assets/special-runtime-v1/'),'approved candidate installed: '+entry.key);
  const bytes=readFileSync('public/'+record.path);assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256);
  assert.equal(record.width,entry.width);assert.equal(record.height,entry.height);
 }
 const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport})});await p.prepare(Object.values(rosterCatalog));
 p.residency.setPins('new-utility',proposal.newAssets.map(e=>e.key));await p.loadKeys(proposal.newAssets.map(e=>e.key));
 assert.equal(p.textures.size,45);assert.equal(p.textureBytes,16562336);assert.ok(p.textureBytes+131072<=16777216);assert.equal(p.residency.snapshot().failed,0);assert.equal(p.residency.snapshot().evicted,0);
 p.destroy();assert.equal(scene.budget().bytes,0);
});
test('logical body frame names, scale and origin survive native physical packing in both facings',async()=>{
 const scene=assetScene(),calls=[];const add=scene.textures.addImage;scene.textures.addImage=(key,im)=>{const t=add(key,im);t.add=(name,...region)=>({setTrim(...trim){calls.push({key,name,region,trim});}});return t;};
 const p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport})});await p.loadKeys(['botuo.battleIdle','botuo.heavyPoses']);
 const d=rosterCatalog.P2.actionDescriptors.heavy.animation;
 p.imageFor('body',d,0,p.actorSprites,'decorative',2);const call=calls.find(c=>c.key.endsWith('botuo.heavyPoses'));
 assert.equal(call.name,'350.0.175.162');assert.deepEqual(call.region.slice(1),Object.values(proposal.legacyCandidates.find(e=>e.key==='botuo.heavyPoses').frames[2]).slice(0,4));
 const expected=proposal.legacyCandidates.find(e=>e.key==='botuo.heavyPoses').frames[2];assert.deepEqual(call.trim,[...expected.trim,expected.width,expected.height]);
 assert.equal(p.actorSprites.get('body').originY,151/162);assert.equal(d.scale,175/72);
 p.destroy();
});
test('static effects restore original logical dimensions with native trim rather than fitting cropped bounds',async()=>{
 const scene=assetScene(),calls=[];const add=scene.textures.addImage;scene.textures.addImage=(key,im)=>{const t=add(key,im);t.add=(name,...args)=>({setTrim(...trim){calls.push(trim);}});return t;};
 const p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport})});await p.loadKeys(['botuo.specialState']);
 assert.equal(typeof p.effectImage,'function');const im=p.effectImage('botuo.specialState');assert.ok(im.frame);assert.deepEqual(calls[0].slice(0,2),[224,234]);p.destroy();
});
