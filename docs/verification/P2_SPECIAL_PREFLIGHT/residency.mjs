// Candidate allocation measurement: real guards/cache, doubled PNG decode/Phaser upload.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {assetManifest} from '../../../src/assets/manifest.js';
import {createAssetCache} from '../../../src/runtime/assetCache.js';
import {AssetResidency} from '../../../src/runtime/assetResidency.js';
import {assetScene} from '../../../tests/helpers/assetScene.js';
const dir='docs/verification/P2_SPECIAL_PREFLIGHT/';
const capacity=JSON.parse(readFileSync(dir+'capacity.json'));
const list=capacity.fullRequired,byKey=new Map(list.map(e=>[e.key,e]));
const manifest={...assetManifest};
for(const e of list)manifest[e.key]={key:e.key,type:'image',path:'assets/special-contract-v1/'+e.key.replaceAll('.','-')+'.png',width:e.width,height:e.height,bytes:e.bytes,fallback:'placeholder.battle'};
const results=[];
for(const reverse of [false,true]){
 const scene=assetScene(),cache=createAssetCache({manifest,transport:async record=>{
  const e=byKey.get(record.key),path=e.path.startsWith('docs/')?e.path:'public/'+e.path;
  const png=readFileSync(path);assert.equal(png.readUInt32BE(16),record.width);assert.equal(png.readUInt32BE(20),record.height);
  return {image:{width:record.width,height:record.height},bytes:png.length};
 }});
 const residency=new AssetResidency(scene,{cache});
 const keys=list.map(e=>e.key);if(reverse)keys.reverse();residency.setPins('encounter',keys);
 await Promise.all(keys.map(k=>residency.load(k)));
 const measured=residency.snapshot(),decodedCache=cache.diagnostics(),uploadDouble=scene.budget();
 assert.equal(measured.loaded,45);assert.equal(measured.failed,0);assert.equal(measured.evicted,0);
 assert.equal(measured.pinned,45);assert.equal(measured.estimatedLiveBytes,capacity.requiredDecodedBytes);
 assert.equal(decodedCache.estimatedLiveBytes,capacity.requiredDecodedBytes);
 assert.equal(uploadDouble.bytes,capacity.requiredDecodedBytes);
 assert.ok(measured.highWaterReservedBytes+capacity.reserveBytes<=capacity.hardBytes);
 assert.ok(decodedCache.highWaterBytes+capacity.reserveBytes<=capacity.hardBytes);
 residency.destroy();cache.trim(0);
 assert.equal(scene.budget().bytes,0);assert.equal(cache.bytes,0);
 results.push({reverse,measured,decodedCache,uploadDouble,cleanupSceneBytes:scene.budget().bytes,cleanupCacheBytes:cache.bytes});
}
writeFileSync(dir+'candidate-residency.json',JSON.stringify({status:'OFFLINE CANDIDATE GUARDS PASS / NO RUNTIME INTEGRATION',results,scope:'Full 45-key simultaneous pins, real shared cache and residency with actual packed PNG dimensions. Image decode and texture manager doubled. These are not actual GPU allocations, browser rendering or integrated presenter results.'},null,2)+'\n');
console.log(JSON.stringify({orders:2,requiredKeys:45,requiredDecodedBytes:capacity.requiredDecodedBytes,includingReserve:capacity.includingReserve,extra:capacity.extraAfterReserve,failed:0,evicted:0,cleanupBytes:0}));
