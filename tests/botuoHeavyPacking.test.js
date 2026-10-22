import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {decodeRgbaPng,cropRgba} from './helpers/pngRgba.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';
const path='docs/verification/P2_HEAVY_RUNTIME_PACK.json';
test('Heavy packing retains every approved pose pixel and legacy Move logical canvas in both directions',()=>{
 assert.ok(existsSync(path),'verified Heavy runtime packing report exists');
 const r=JSON.parse(readFileSync(path)),sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
 for(const entry of r.legacy){
  assert.equal(sha(entry.input),entry.inputSha256);assert.equal(sha(entry.output),entry.sha256);
  const original=decodeRgbaPng(readFileSync(entry.input)),packed=decodeRgbaPng(readFileSync(entry.output));
  const current=rosterCatalog[entry.character].animationDescriptors.battleMove;
  assert.equal(current.scale,entry.descriptor.scale);assert.deepEqual(current.origin,entry.descriptor.origin);
  for(let i=0;i<current.frames.length;i++){
   const f=current.frames[i],old=entry.descriptor.frames[i],[lw,lh,x,y]=f.trim;
   assert.equal(lw,old.width);assert.equal(lh,old.height);
   const restored=Buffer.alloc(lw*lh*4),cell=cropRgba(packed,[f.x,f.y,f.width,f.height]);
   for(let row=0;row<f.height;row++)cell.copy(restored,((row+y)*lw+x)*4,row*f.width*4,(row+1)*f.width*4);
   assert.deepEqual(restored,cropRgba(original,[old.x,old.y,old.width,old.height]));
   for(const flip of [-1,1])for(const [px,py] of [[0,0],[f.width-1,f.height-1]]){
    const density=72*current.scale/Math.max(lw,lh);
    assert.equal(flip*(x+px-lw*current.origin[0])*density,flip*(x+px-old.width*entry.descriptor.origin[0])*density);
    assert.equal((y+py-lh*current.origin[1])*density,(y+py-old.height*entry.descriptor.origin[1])*density);
   }
  }
 }
 const strip=decodeRgbaPng(readFileSync(r.poses.output));
 for(let i=0;i<4;i++){
  const original=decodeRgbaPng(readFileSync(r.poses.sources[i])),[x,y,right,bottom]=r.poses.crop,w=right-x,h=bottom-y;
  const cell=cropRgba(strip,[i*w,0,w,h]),restored=Buffer.alloc(original.pixels.length);
  for(let row=0;row<h;row++)cell.copy(restored,((row+y)*original.width+x)*4,row*w*4,(row+1)*w*4);
  assert.deepEqual(restored,original.pixels,'full original review RGBA, including transparent RGB');
 }
});
test('complete all-five required Heavy encounter preserves every pin in either load order',async()=>{
 assert.ok(rosterCatalog.P2.actionDescriptors.heavy,'P2 Heavy data is integrated');
 for(const reverse of [false,true]){
  const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport})});
  const ds=Object.values(rosterCatalog);if(reverse)ds.reverse();await p.prepare(ds);await p.whenIdle();
  const r=p.residency.snapshot();assert.equal(r.failed,0);assert.equal(r.pinned,p.textures.size);assert.equal(r.reservedBytes,0);
  assert.ok(r.highWaterBytes>0);assert.equal(scene.budget().bytes,r.estimatedLiveBytes);
  assert.ok(p.textures.has('botuo.heavyPoses'));assert.ok(p.textures.has('botuo.heavySource'));assert.ok(p.textures.has('botuo.heavyContact'));
  for(const d of ds)for(const slot of ['portraitSquare','battleIdle','battleMove','battleKo'])assert.ok(p.textures.has(d.assets[slot]));
  p.destroy();assert.equal(scene.budget().bytes,0);
 }
});
