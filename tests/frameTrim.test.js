import test from 'node:test';
import assert from 'node:assert/strict';
import {animationDescriptor} from '../src/assets/descriptors.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';
import {rosterCatalog} from '../src/roster/catalog.js';

test('trim rejects atlas geometry extending beyond its preserved logical cell',()=>{
 const input={source:'xingxing.battleMove',frames:[{x:0,y:0,width:100,height:100,trim:[560,414,500,30]}],duration:1};
 assert.throws(()=>animationDescriptor(input),/trim/i);
});
test('trim uses native Phaser logical canvas while preserving actor display scale and facing',async()=>{
 const scene=assetScene(),calls=[];
 const addImage=scene.textures.addImage;scene.textures.addImage=(key,im)=>{const texture=addImage(key,im),add=texture.add;texture.add=(name,...args)=>{add(name);return {setTrim(...trim){calls.push({name,args,trim});}};};return texture;};
 const p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport})});
 await p.loadKeys(['xingxing.battleMove']);
 const animation=animationDescriptor({source:'xingxing.battleMove',frames:[{x:0,y:0,width:100,height:100,trim:[560,414,20,30]}],fps:10,loop:true,origin:[.5,413/414],scale:2.25});
 const d={...rosterCatalog.P5,animationDescriptors:{battleIdle:animation,battleMove:animation}};
 const frame={allies:[{instanceId:'actor',definitionId:'trim',hp:1,x:0,y:0}],enemies:[]};
 p.render(frame,0,{trim:d});
 const image=p.actorSprites.get('actor');
 assert.deepEqual(calls[0].trim,[560,414,20,30,100,100]);
 assert.equal(image.displayWidth,162);assert.ok(Math.abs(image.displayHeight-162*414/560)<1e-9);
 frame.allies[0].x=-1;p.render(frame,.1,{trim:d});assert.equal(image.flipX,true);
 assert.equal(image.originY,413/414);p.destroy();
});
