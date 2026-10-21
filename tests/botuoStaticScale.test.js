import test from 'node:test';
import assert from 'node:assert/strict';
import {rosterCatalog} from '../src/roster/catalog.js';
import {assetManifest} from '../src/assets/manifest.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

test('P2 countdown/Idle uses the exact pre-animation static source and original 144px canvas',async()=>{
 const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport})});
 await p.prepare([rosterCatalog.P2]);
 const actor={instanceId:'a1',definitionId:'P2',x:4,y:0,hp:320},frame={allies:[actor],enemies:[]};
 p.render(frame,0,rosterCatalog);const image=p.actorSprites.get('a1');
 assert.equal(assetManifest['botuo.battleIdle'].path,'assets/special-runtime-v1/botuo-battleIdle.png');assert.equal(assetManifest['botuo.battleIdle'].logicalWidth,160);
 assert.equal(createHash('sha256').update(readFileSync('public/assets/characters/botuo/battleIdle.png')).digest('hex'),'27c65e3f1633f4e5959e62b2fbb72df7bf47e6e8324425af24943b53d8a0d2b8');
 assert.equal(image.displayWidth,144);assert.equal(image.displayHeight,144);
 assert.equal((158-image.originY*160)*image.displayHeight/160,0,'original hoof plane is actor anchor');
 p.destroy();
});

test('P2 Move preserves approved body authoring density instead of shrinking to a pose-dependent skull span',async()=>{
 const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport})});
 await p.prepare([rosterCatalog.P2]);
 const actor={instanceId:'a1',definitionId:'P2',x:4,y:0,hp:320},frame={allies:[actor],enemies:[]};
 p.render(frame,0,rosterCatalog);actor.x+=.1;p.render(frame,.1,rosterCatalog);
 const image=p.actorSprites.get('a1');
 const study=JSON.parse(readFileSync('docs/verification/P2_MOVE_BODY/measurements.json'));
 const pack=JSON.parse(readFileSync('docs/art/candidates/botuo/special/runtime-pack-v1/packing-manifest.json')).legacyCandidates.find(e=>e.key==='botuo.battleMove');
 assert.equal(createHash('sha256').update(readFileSync(pack.source)).digest('hex'),study.sourceMoveSha256);
 const sampling=JSON.parse(readFileSync('docs/verification/P2_SPECIAL_RUNTIME/sampling-fix.json')).entries.find(e=>e.key==='botuo.battleMove');
 assert.equal(sampling.candidateSha256,pack.sha256);assert.equal(createHash('sha256').update(readFileSync('public/'+assetManifest['botuo.battleMove'].path)).digest('hex'),sampling.runtimeSha256);
 assert.ok(Math.min(...study.movePigmentPixels)*(image.displayWidth/160)**2>=study.idlePigmentPixels*.9**2*.95,'equipment-region pigment area exposes body shrink independently of posed skull height');
 assert.equal(image.displayWidth/160,.9,'Move body uses the same approved authoring density as static Idle');
 assert.ok(Math.abs((153-image.originY*155)*image.displayHeight/155)<1e-9,'no foot-plane jump');
 actor.x-=.1;p.render(frame,.2,rosterCatalog);assert.equal(image.flipX,true);
 p.render(frame,.3,rosterCatalog);assert.equal(image.displayHeight,144,'stop returns to canonical static');
 p.destroy();
});
