import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {rosterCatalog} from '../src/roster/catalog.js';
import {characterAnimation} from '../src/assets/battleDescriptors.js';
import {animationFrame} from '../src/assets/playback.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
const sha='4394bec8581c79e5b6753dcbeafa63fcf8664482d66a457d03b825c40adbb169';
test('P4 approved color-preserving Move has four isolated160 cells at10fps and unchanged Idle',()=>{
 const d=characterAnimation(rosterCatalog.P4,'battleMove');assert.equal(d.source,'jiuweihu.battleMove');assert.deepEqual(d.frames,[0,160,320,480].map(x=>({x,y:0,width:160,height:133})));assert.equal(d.fps,10);assert.equal(d.loop,true);assert.deepEqual(d.origin,[.5,132/133]);assert.equal(d.scale,2);
 const b=readFileSync('public/assets/characters/jiuweihu/battleMove-4f.png');assert.equal(b.length,128061);assert.equal(createHash('sha256').update(b).digest('hex'),sha);assert.deepEqual([b.readUInt32BE(16),b.readUInt32BE(20),b[25]],[640,160,6]);assert.equal(createHash('sha256').update(readFileSync('public/assets/characters/jiuweihu/battleIdle.png')).digest('hex'),'394497ffa5314a4559fee10d58d799fab9be59b282a31bb3ffebb02670ed6640');
 for(const reduced of [false,true]){const rate=reduced?5:10;assert.deepEqual([0,1,2,3,4].map(i=>animationFrame(d,i/rate+.001,reduced,'locomotion').index),[0,1,2,3,0]);}
});
for(const reduced of [false,true])test(`P4 actual presenter XY/full-cycle/duplicate-time/stop/mirror purity reduced=${reduced}`,async()=>{
 const textures=new Map(),scene={textures:{addImage:k=>textures.set(k,{has:()=>false,add(){}}),get:k=>textures.get(k),remove:k=>textures.delete(k)},add:{image(x,y,k,f){const v={texture:[k,f],setTexture(k,f){this.texture=[k,f];return this;},destroy(){}};for(const method of ['setOrigin','setScale','setVisible','setDisplaySize','setFlipX','setPosition','setDepth','setAlpha'])v[method]=(...args)=>{v[method+'Value']=args;return v;};return v;}}};
 const cache=createAssetCache({transport:async r=>({image:{width:r.width,height:r.height},bytes:readFileSync('public/'+r.path).length})}),p=new AssetPresenter(scene,{cache,reducedMotion:reduced});await p.prepare([rosterCatalog.P4]);const a={instanceId:'a1',definitionId:'P4',hp:230,x:5,y:0},frame={allies:[a],enemies:[]};p.render(frame,0,rosterCatalog);const v=p.actorSprites.get('a1');assert.ok(v.texture[0].endsWith('jiuweihu.battleIdle'));a.y+=.1;p.render(frame,.1,rosterCatalog);
 const rate=reduced?5:10,observed=[];for(let i=0;i<5;i++){a.x-=.01;const now=.1+i/rate+.001,before=structuredClone(frame);p.render(frame,now,rosterCatalog);p.render(frame,now,rosterCatalog);assert.deepEqual(frame,before);observed.push(v.texture[1]);assert.deepEqual(v.setFlipXValue,[true]);assert.deepEqual(v.setDisplaySizeValue,[144,144*133/160]);assert.deepEqual(v.setOriginValue,[.5,132/133]);assert.deepEqual(v.setPositionValue,[a.x,a.y]);}assert.deepEqual(observed,[0,160,320,480,0].map(x=>`${x}.0.160.133`));
 p.render(frame,2,rosterCatalog);assert.ok(v.texture[0].endsWith('jiuweihu.battleIdle'));assert.equal(v.texture[1],'0.0.160.137');assert.equal(rosterCatalog.P4.stats.moveSpeed,1.7);p.destroy();
});
