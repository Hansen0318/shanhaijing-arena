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
test('installed49-key envelope retains required art, reserve and source-exact sampling derivatives',async()=>{
 for(const entry of [...proposal.legacyCandidates,...proposal.newAssets]){
  const record=assetManifest[entry.key];assert.ok(record?.path.startsWith('assets/special-runtime-v1/'),'approved candidate installed: '+entry.key);
  const bytes=readFileSync('public/'+record.path),fix=JSON.parse(readFileSync('docs/verification/P2_SPECIAL_RUNTIME/sampling-fix.json')).entries.find(e=>e.key===entry.key);
  assert.equal(createHash('sha256').update(readFileSync(entry.path)).digest('hex'),entry.sha256);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),fix?.runtimeSha256??entry.sha256);
  assert.equal(record.width,fix?.dimensions[0]??entry.width);assert.equal(record.height,fix?.dimensions[1]??entry.height);
 }
 const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport})});await p.prepare(Object.values(rosterCatalog));
 p.residency.setPins('new-utility',proposal.newAssets.map(e=>e.key));await p.loadKeys(proposal.newAssets.map(e=>e.key));
 assert.equal(p.textures.size,67);assert.equal(p.textureBytes,23091220);assert.ok(Number.isFinite(p.textureBytes));assert.equal(p.residency.snapshot().failed,0);assert.equal(p.residency.snapshot().evicted,0);
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

// Regression from real Chromium run1086/1087: bilinear taps escaped tight regions.
const samplingKeys=['botuo.battleIdle','jiuweihu.battleIdle','lushu.battleMove','botuo.battleMove','lushu.basicContact','lushu.heavyImpact','lushu.battleSpecial','lushu.awakeningCImpact','botuo.basicPoses'];
test('browser-affected physical frames retain one source-exact sampling texel on every side',()=>{
 for(const key of samplingKeys){
  const e=proposal.legacyCandidates.find(e=>e.key===key),p=specialRuntimePacking[key],original=decodeRgbaPng(readFileSync(e.source)),packed=decodeRgbaPng(readFileSync('public/'+p.record.path));
  for(let i=0;i<p.frames.length;i++){
   const f=p.frames[i],logical=p.logicalFrames[i],tx=f.trim[2],ty=f.trim[3],ox=logical.x+tx-(logical.trim?.[2]??0),oy=logical.y+ty-(logical.trim?.[3]??0);
   assert.ok(f.x>=1&&f.y>=1&&f.x+f.width<packed.width&&f.y+f.height<packed.height,`${key} ${i}: sampling gutter missing`);
   for(let y=-1;y<=f.height;y++)for(let x=-1;x<=f.width;x++){
    const sx=Math.max(0,Math.min(original.width-1,ox+x)),sy=Math.max(0,Math.min(original.height-1,oy+y));
    assert.deepEqual(packed.pixels.subarray(((f.y+y)*packed.width+f.x+x)*4,((f.y+y)*packed.width+f.x+x)*4+4),original.pixels.subarray((sy*original.width+sx)*4,(sy*original.width+sx)*4+4),`${key} ${i}: source sampling (${x},${y})`);
   }
  }
 }
});
