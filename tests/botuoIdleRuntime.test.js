import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {rosterCatalog} from '../src/roster/catalog.js';
import {assetManifest} from '../src/assets/manifest.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {characterAnimation} from '../src/assets/battleDescriptors.js';
const Frame=createRequire(import.meta.url)('../node_modules/phaser/src/textures/Frame.js');

function runtimeScene(){
 const textures=new Map();
 return {textures:{addImage(key,image){const t={source:[image],frames:new Map(),has(name){return this.frames.has(name);},add(name,...region){this.frames.set(name,new Frame(this,name,...region));}};textures.set(key,t);},get:key=>textures.get(key),remove:key=>textures.delete(key)},add:{image(x,y,key,name){
  const sprite={x,y,setTexture(key,name){this.frame=textures.get(key).frames.get(name);return this;},setOrigin(x,y){this.origin=[x,y];return this;},setDisplaySize(w,h){this.size=[w,h];return this;},setPosition(x,y){this.x=x;this.y=y;return this;},destroy(){}};
  for(const method of ['setScale','setVisible','setFlipX','setDepth','setAlpha'])sprite[method]=()=>sprite;
  return sprite.setTexture(key,name);
 }}};
}

test('formal idle presentation is intentionally static F1 while keeping runtime frame architecture',async()=>{
 const d=characterAnimation(rosterCatalog.P2,'battleIdle');
 assert.equal(d.frames.length,1);
 assert.deepEqual(d.frames[0],{x:0,y:0,width:160,height:160});
 assert.equal(d.staticFrame,0);
 const scene=runtimeScene(),asset=assetManifest['botuo.battleIdle'];
 const presenter=new AssetPresenter(scene,{cache:{async load(){return {...asset,image:{width:asset.width,height:asset.height}};}}});
 await presenter.loadKeys([asset.key]);
 const actor={instanceId:'a2',definitionId:'P2',x:314,y:275,hp:320},snapshot={allies:[actor],enemies:[]};
 for(const t of [0,.4,.8,1.2,3]){
  presenter.render(snapshot,t,rosterCatalog);
  const s=presenter.actorSprites.get('a2');
  assert.deepEqual([s.frame.cutX,s.frame.cutY,s.frame.cutWidth,s.frame.cutHeight],[0,0,160,160]);
  assert.deepEqual(s.origin,[.5,158/160]);
  assert.deepEqual([s.x,s.y],[314,275]);
 }
 presenter.destroy();
});

test('Lushu and Botuo formal idle descriptors are both static F1 in the current presentation phase',()=>{
 const l=characterAnimation(rosterCatalog.P1,'battleIdle'),b=characterAnimation(rosterCatalog.P2,'battleIdle');
 assert.equal(l.frames.length,1);assert.deepEqual(l.frames[0],{x:0,y:0,width:96,height:128});
 assert.equal(b.frames.length,1);assert.deepEqual(b.frames[0],{x:0,y:0,width:160,height:160});
});
