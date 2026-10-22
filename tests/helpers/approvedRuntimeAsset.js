// Verification adapter only: prove installed physical pixels before exposing the
// immutable pre-pack logical source to older geometry/identity assertions.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {assetManifest} from '../../src/assets/manifest.js';
import {specialRuntimePacking} from '../../src/assets/specialRuntimePacking.js';
import {decodeRgbaPng,cropRgba} from './pngRgba.js';
const proposal=JSON.parse(readFileSync('docs/art/candidates/botuo/special/runtime-pack-v1/packing-manifest.json'));
const digest=b=>createHash('sha256').update(b).digest('hex');
export function approvedRuntimeAsset(asset){
 const entry=proposal.legacyCandidates.find(e=>e.key===asset.key);
 if(!entry)return asset;
 const pack=specialRuntimePacking[asset.key],raw=readFileSync(entry.source),source=decodeRgbaPng(raw),physical=decodeRgbaPng(readFileSync('public/'+asset.path));
 assert.equal(digest(raw),entry.sourceSha256,asset.key+' approved source identity');
 assert.equal(asset.path,pack.record.path);assert.deepEqual([physical.width,physical.height],[asset.width,asset.height]);
 const restored=Buffer.alloc(source.pixels.length);
 for(let i=0;i<pack.frames.length;i++){
  const f=pack.frames[i],logical=pack.logicalFrames[i],pixels=cropRgba(physical,[f.x,f.y,f.width,f.height]);
  const x=logical.x+(f.trim?.[2]??0)-(logical.trim?.[2]??0),y=logical.y+(f.trim?.[3]??0)-(logical.trim?.[3]??0);
  for(let row=0;row<f.height;row++)pixels.copy(restored,((y+row)*source.width+x)*4,row*f.width*4,(row+1)*f.width*4);
 }
 assert.equal(restored.length,source.pixels.length);assert.equal(digest(restored),digest(source.pixels),asset.key+' every reconstructed RGBA byte');
 return {...asset,path:entry.source.replace(/^public\//,''),width:source.width,height:source.height,bytes:raw.length};
}
export function approvedRuntimeImage(key){const asset=approvedRuntimeAsset(assetManifest[key]);return decodeRgbaPng(readFileSync('public/'+asset.path));}
