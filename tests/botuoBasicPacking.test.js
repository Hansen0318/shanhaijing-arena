import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {decodeRgbaPng,cropRgba} from './helpers/pngRgba.js';
import {assetManifest} from '../src/assets/manifest.js';
import {rosterCatalog} from '../src/roster/catalog.js';
const report='docs/verification/P2_BASIC_RUNTIME_ASSETS.json';
test('P2 high fidelity packing preserves accepted RGBA, legacy pixels and both-facing world placement',()=>{
 assert.ok(existsSync(report),'source-preserving runtime packing report exists');
 const r=JSON.parse(readFileSync(report));
 for(const a of r.files){
  const bytes=readFileSync(a.source);assert.equal(createHash('sha256').update(bytes).digest('hex'),a.sourceSha256);
  const original=decodeRgbaPng(bytes),packed=decodeRgbaPng(readFileSync(a.output));
  if(a.kind==='legacy'){
   const d=rosterCatalog[a.character].animationDescriptors[a.slot];
   for(let i=0;i<a.oldDescriptor.frames.length;i++){
    const old=a.oldDescriptor,of=old.frames[i],nf=d.frames[i];
    assert.deepEqual(cropRgba(packed,[nf.x,nf.y,nf.width,nf.height]),cropRgba(original,[of.x,of.y+a.top,of.width,a.packedHeight]));
    // Every removed RGBA byte is zero, including transparent RGB.
    const cell=cropRgba(original,[of.x,of.y,of.width,of.height]);
    for(let y=0;y<of.height;y++)if(y<a.top||y>=a.top+a.packedHeight)assert.ok(cell.subarray(y*of.width*4,(y+1)*of.width*4).every(v=>v===0));
    for(const flip of [false,true])for(const [x,y] of [[0,0],[nf.width/2,nf.height/2],[nf.width-1,nf.height-1]]){
     const before=72*old.scale/Math.max(of.width,of.height),after=72*d.scale/Math.max(nf.width,nf.height);
     assert.ok(Math.abs((flip?-1:1)*(x-of.width*old.origin[0])*before-(flip?-1:1)*(x-nf.width*d.origin[0])*after)<1e-9);
     assert.ok(Math.abs((y+a.top-of.height*old.origin[1])*before-(y-nf.height*d.origin[1])*after)<1e-9);
    }
   }
  }
 }
 assert.equal(r.additionDecodedBytes,476380);assert.equal(r.savedDecodedBytes,399160);
 for(const f of r.poseCells){
  const original=decodeRgbaPng(readFileSync(f.source)),packed=decodeRgbaPng(readFileSync(r.poses));
  const restored=Buffer.alloc(original.width*original.height*4),cell=cropRgba(packed,[f.index*158,0,158,143]);
  for(let y=0;y<143;y++)cell.copy(restored,((y+148)*400+100)*4,y*158*4,(y+1)*158*4);
  assert.deepEqual(restored,original.pixels,'exact accepted review pixels, no downsample');
 }
});
test('lossless existing C-source repack preserves RGBA and both-facing effect placement',()=>{
 const r=JSON.parse(readFileSync(report)),a=r.files.find(f=>f.kind==='legacy-effect');
 const old=decodeRgbaPng(readFileSync(a.source)),packed=decodeRgbaPng(readFileSync(a.output));
 assert.deepEqual(packed.pixels,cropRgba(old,[0,36,93,26]));
 for(let y=0;y<96;y++)if(y<36||y>=62)assert.ok(old.pixels.subarray(y*93*4,(y+1)*93*4).every(v=>v===0));
 const spec=rosterCatalog.P1.actionDescriptors.awakening.stages[2].blade;
 for(const flip of [false,true])for(const [x,y] of [[0,0],[46,13],[92,25]]){
  assert.ok(Math.abs((flip?-1:1)*(-363.97388059701495+x*847/93)-(flip?-1:1)*(spec.offset[0]+x*spec.size[0]/93))<1e-9);
  assert.ok(Math.abs(-229.48134328358213+(y+36)*879/96-(spec.offset[1]+y*spec.size[1]/26))<1e-9);
 }
});
