import {approvedRuntimeAsset} from './helpers/approvedRuntimeAsset.js';
import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
import {assetManifest} from '../src/assets/manifest.js';import {rosterCatalog} from '../src/roster/catalog.js';import {decodeRgbaPng,cropRgba} from './helpers/pngRgba.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';import {createAssetCache} from '../src/runtime/assetCache.js';import {assetScene,pngTransport} from './helpers/assetScene.js';
const png=p=>decodeRgbaPng(readFileSync(p)),sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
test('Heavy uses exact prepared padded cells with independent approved VFX',()=>{
 const a=assetManifest['lushu.battleHeavy'];assert.ok(a,'Heavy manifest key');const p='public/'+approvedRuntimeAsset(a).path;
 const original=png('docs/art/candidates/lushu/heavy/runtime-prep-v1/heavy-4f-128.png');assert.deepEqual(png(p).pixels,cropRgba(original,[0,31,512,85]));
 const im=png(p);assert.deepEqual([im.width,im.height],[512,85]);
 for(let i=0;i<4;i++){const c=cropRgba(im,[i*128,0,128,85]);let n=0;for(let y=0;y<85;y++)for(let x=0;x<128;x++)if(c[(y*128+x)*4+3]){assert.ok(x>=5&&x<123);n++;}assert.ok(n>1000);}
 const d=rosterCatalog.P1.actionDescriptors.heavy;assert.deepEqual(d.frameDurationsMs,[200,80,140,180]);assert.equal(d.impactFrame,2);assert.equal(d.contact.attach,'target');
 assert.deepEqual([approvedRuntimeAsset(assetManifest[d.blade.assetKey]).width,approvedRuntimeAsset(assetManifest[d.blade.assetKey]).height],[112,112]);assert.deepEqual([approvedRuntimeAsset(assetManifest[d.contact.assetKey]).width,approvedRuntimeAsset(assetManifest[d.contact.assetKey]).height],[128,86]);
 assert.equal(sha('docs/art/candidates/lushu/heavy/recovered-review-v1/lushu-heavy-review-v1.gif'),'c233bdbc464a62943950619ddbb56054870e4e7c51808b97c7d8b9775dfaa845');
});
test('Botuo KO optimized derivative preserves every nonzero pixel and both facing/ground transforms exactly',()=>{
 const path='public/assets/characters/botuo/battleKo.png';assert.equal(sha(path),'037829ec32333a0179414a9ee8ccb57b4eb3ddb83004aa93aea5c78914fc9c57');
 const original=png(path),a=approvedRuntimeAsset(assetManifest['botuo.battleKo']);assert.equal(a.path,'assets/characters/botuo/battleKo-trimmed.png');const cropped=png('public/'+a.path);
 assert.deepEqual([cropped.width,cropped.height],[512,331]);assert.deepEqual(cropped.pixels,cropRgba(original,[0,125,512,331]));
 for(let y=0;y<512;y++)if(y<125||y>=456)for(let x=0;x<512;x++)assert.equal(original.pixels[(y*512+x)*4+3],0);
 const d=rosterCatalog.P2.animationDescriptors.battleKo;assert.deepEqual(d.origin,[.5,280/331]);assert.equal(d.scale,2);
 for(const flip of [false,true])for(const [x,y] of [[2,1],[256,155],[509,329]]){
  const oldX=(flip?512-x-256:x-256)*144/512,newX=(flip?512-x-d.origin[0]*512:x-d.origin[0]*512)*144/512;
  const oldY=(y+125-405)*144/512,newY=(y-d.origin[1]*331)*144/512;
  assert.equal(oldX,newX);assert.ok(Math.abs(oldY-newY)<1e-10);
 }
});
test('all five characters plus Basic/Heavy remain loaded across repeated scenes with complete required ownership',async()=>{
 const cache=createAssetCache({transport:pngTransport});
 for(let i=0;i<8;i++){
  const scene=assetScene(),p=new AssetPresenter(scene,{cache});await p.prepare(i%2?Object.values(rosterCatalog).reverse():Object.values(rosterCatalog));
  assert.equal(p.textureBytes,19000920);assert.ok(p.textures.has('lushu.battleBasic'));assert.ok(p.textures.has('lushu.battleHeavy'));
  assert.equal(p.residency.snapshot().failed,0);assert.ok(Number.isFinite(scene.budget().peak));assert.ok(Number.isFinite(cache.diagnostics().highWaterBytes));p.destroy();assert.equal(scene.budget().bytes,0);
 }
});
test('protected Basic pixels and action descriptor remain unchanged',()=>{
 const m=JSON.parse(readFileSync('docs/art/approved/lushu/basic/review-v1/runtime-manifest.json'));for(const r of m.files)assert.equal(sha(r.path),r.sha256);
 assert.deepEqual(rosterCatalog.P1.actionDescriptors.basic.frameDurationsMs,[120,60,100,120]);assert.equal(rosterCatalog.P1.actionDescriptors.basic.animation.scale,2.4731182795698925);
});
