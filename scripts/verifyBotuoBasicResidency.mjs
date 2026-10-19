// Actual cache/presenter, real PNG headers, decoder/draw boundary doubles only.
import assert from 'node:assert/strict';import {writeFileSync,mkdirSync} from 'node:fs';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';import {createAssetCache} from '../src/runtime/assetCache.js';import {rosterCatalog} from '../src/roster/catalog.js';import {assetManifest} from '../src/assets/manifest.js';import {assetScene,pngTransport} from '../tests/helpers/assetScene.js';
const cases=[];
for(const reverse of [false,true]){
 const cache=createAssetCache({transport:pngTransport});
 for(let restart=0;restart<3;restart++){
  const scene=assetScene(),p=new AssetPresenter(scene,{cache,reducedMotion:Boolean(restart%2)}),defs=Object.values(rosterCatalog);if(reverse)defs.reverse();await p.prepare(defs);await p.whenIdle();
  const residency=p.residency.snapshot(),actual=scene.budget(),decoded=cache.diagnostics();assert.equal(residency.estimatedLiveBytes,16639660);assert.equal(actual.bytes,residency.estimatedLiveBytes);assert.ok(residency.hardBytes-actual.bytes>=131072);assert.equal(residency.evicted,0);assert.equal(residency.failed,0);assert.equal(p.textures.size,39);assert.ok(decoded.highWaterBytes<=16777216);
  const keys=[...p.textures.keys()];for(const key of keys)assert.equal((await cache.load(key)).key,key);
  p.destroy();assert.equal(scene.budget().bytes,0);assert.ok(scene.objects.every(o=>o.destroyed));cases.push({reverse,restart,reducedMotion:Boolean(restart%2),residency,cache:decoded,actual,required:keys,cleanupBytes:scene.budget().bytes});
 }
}
const files=cases[0].required.map(key=>{const a=assetManifest[key];return {key,path:a.path,width:a.width,height:a.height,decodedBytes:a.width*a.height*4};});assert.equal(files.reduce((n,f)=>n+f.decodedBytes,0),16639660);
const report={status:'MEASURED / AUTOMATED RESIDENCY PASS / NOT DEPLOYED',scope:'Real cache, residency and presenter; actual PNG headers with doubled image decoder and Phaser draw APIs. No browser pixels, GPU memory, FPS or device acceptance claim.',baselineBytes:16630060,restoredStaticExtraBytes:9600,requiredBytes:16639660,hardBytes:16777216,headroomBytes:137556,optionalReserveBytes:131072,extraAboveReserveBytes:6484,files,cases};mkdirSync('docs/verification/P2_STATIC_SCALE',{recursive:true});writeFileSync('docs/verification/P2_STATIC_SCALE/residency.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({requiredBytes:report.requiredBytes,cases:cases.length,keys:files.length,reserve:report.optionalReserveBytes,extraAboveReserve:report.extraAboveReserveBytes,cleanup:'zero'}));
