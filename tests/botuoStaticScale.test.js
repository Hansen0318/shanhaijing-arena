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
 assert.equal(assetManifest['botuo.battleIdle'].path,'assets/characters/botuo/battleIdle.png');
 assert.equal(createHash('sha256').update(readFileSync('public/assets/characters/botuo/battleIdle.png')).digest('hex'),'27c65e3f1633f4e5959e62b2fbb72df7bf47e6e8324425af24943b53d8a0d2b8');
 assert.equal(image.displayWidth,144);assert.equal(image.displayHeight,144);
 assert.equal((158-image.originY*160)*image.displayHeight/160,0,'original hoof plane is actor anchor');
 p.destroy();
});

test('P2 Move uses static skull density and grounded feet, not equal sprite canvas scale',async()=>{
 const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport})});
 await p.prepare([rosterCatalog.P2]);
 const actor={instanceId:'a1',definitionId:'P2',x:4,y:0,hp:320},frame={allies:[actor],enemies:[]};
 p.render(frame,0,rosterCatalog);actor.x+=.1;p.render(frame,.1,rosterCatalog);
 const image=p.actorSprites.get('a1');
 assert.ok(Math.abs(32*image.displayWidth/160-22.5)<1e-9,'32px Move face must equal original 25px static face at0.9 density');
 assert.ok(Math.abs((153-image.originY*155)*image.displayHeight/155)<1e-9,'no foot-plane jump');
 actor.x-=.1;p.render(frame,.2,rosterCatalog);assert.equal(image.flipX,true);
 p.render(frame,.3,rosterCatalog);assert.equal(image.displayHeight,144,'stop returns to canonical static');
 p.destroy();
});
