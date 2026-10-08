import test from 'node:test';
import assert from 'node:assert/strict';
import {rosterCatalog} from '../src/roster/catalog.js';
import {assetManifest} from '../src/assets/manifest.js';
import {resolveCharacterAsset,encounterAssetKeys} from '../src/assets/resolver.js';
import {animationFrame} from '../src/assets/playback.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';

// Only the external renderer/decoder is doubled; state selection and playback are real.
async function fixture({missingMove=false,reducedMotion=false}={}){
 const textures=new Map(),sprites=[];
 const scene={textures:{addImage(key){textures.set(key,{has:()=>false,add(){}});},get:key=>textures.get(key),remove:key=>textures.delete(key)},add:{image(x,y,key,frame){const image={texture:[key,frame],setTexture(k,f){this.texture=[k,f];return this;},destroy(){}};for(const method of ['setOrigin','setScale','setVisible','setDisplaySize','setFlipX','setPosition','setDepth','setAlpha'])image[method]=(...args)=>{image[method+'Value']=args;return image;};sprites.push(image);return image;}}};
 const loaded=[],cache={async load(key){loaded.push(key);const a=assetManifest[key];return {...a,...(a?.type==='image'&&!(missingMove&&key==='lushu.battleMove')?{image:{width:a.width,height:a.height}}:{})};}};
 const p=new AssetPresenter(scene,{cache,reducedMotion});await p.prepare([rosterCatalog.P1,rosterCatalog.P2,rosterCatalog.P3]);
 const actor={instanceId:'a1',definitionId:'P1',x:2,y:0,hp:245},frame={allies:[actor],enemies:[]};
 return {p,actor,frame,loaded,sprites,render:now=>p.render(frame,now,rosterCatalog)};
}
test('approved move slot is encounter-loaded with four isolated canonical cells and static idle preserved',async()=>{
 const asset=resolveCharacterAsset(rosterCatalog.P1,'battleMove');assert.equal(asset.key,'lushu.battleMove');assert.equal(asset.path,'assets/characters/lushu/battleMove-4f.png');assert.deepEqual([asset.width,asset.height],[384,128]);
 const d=rosterCatalog.P1.animationDescriptors.battleMove;assert.deepEqual(d.frames,[0,96,192,288].map(x=>({x,y:0,width:96,height:128})));
 assert.deepEqual([0,.112,.223,.334,.445].map(t=>animationFrame(d,t).index),[0,1,2,3,0]);
 assert.equal(rosterCatalog.P1.animationDescriptors.battleIdle.frames.length,1);
 assert.deepEqual(d.origin,[.5,691/724]);assert.equal(d.scale,2);assert.ok(encounterAssetKeys([rosterCatalog.P1]).includes('lushu.battleMove'));
 const f=await fixture();assert.ok(f.loaded.includes('lushu.battleMove'));f.p.destroy();
});
test('actual presenter switches on XY displacement, loops, freezes duplicate time, stops immediately and mirrors',async()=>{
 const f=await fixture();f.render(0);const image=f.sprites[0];assert.ok(image.texture[0].endsWith('lushu.battleIdle'));
 f.actor.x+=.1;f.render(.1);assert.ok(image.texture[0].endsWith('lushu.battleMove'));assert.equal(image.texture[1],'0.0.96.128');
 for(const [time,x] of [[.212,96],[.323,192],[.434,288],[.545,0]]){f.actor.x+=.1;f.render(time);assert.equal(image.texture[1],`${x}.0.96.128`);}
 f.render(.545);assert.ok(image.texture[0].endsWith('lushu.battleMove'));assert.equal(image.texture[1],'0.0.96.128');
 const before=structuredClone(f.frame);f.render(.6);assert.ok(image.texture[0].endsWith('lushu.battleIdle'));assert.equal(image.texture[1],'0.0.96.128');assert.deepEqual(f.frame,before);
 f.actor.y+=.1;f.render(.7);assert.ok(image.texture[0].endsWith('lushu.battleMove'));assert.deepEqual(image.setDisplaySizeValue,[108,144]);assert.deepEqual(image.setOriginValue,[.5,691/724]);
 f.actor.x-=.1;f.render(.8);assert.deepEqual(image.setFlipXValue,[true]);assert.deepEqual(image.setPositionValue,[f.actor.x,f.actor.y]);
 f.actor.hp=0;f.actor.x-=.1;f.render(.9);assert.ok(image.texture[0].endsWith('lushu.battleIdle'));f.p.destroy();assert.equal(f.p.facings.size,0);
});
test('missing move safely retains static idle; unauthored characters unchanged; reduced-motion remains static',async()=>{
 for(const options of [{missingMove:true},{reducedMotion:true}]){const f=await fixture(options);f.render(0);f.actor.x+=1;f.render(.1);f.actor.x+=1;f.render(.3);const image=f.sprites[0];assert.equal(image.texture[1],'0.0.96.128');assert.ok(image.texture[0].endsWith(options.missingMove?'lushu.battleIdle':'lushu.battleMove'));f.p.destroy();}
 for(const [id,key] of [['P2','botuo.battleIdle'],['P3','chiru.battleIdle']]){const f=await fixture();f.actor.definitionId=id;f.render(0);f.actor.x+=1;f.render(.1);assert.ok(f.sprites[0].texture[0].endsWith(key));f.p.destroy();}
});
