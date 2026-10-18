import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {rosterCatalog} from '../src/roster/catalog.js';
import {characterAnimation} from '../src/assets/battleDescriptors.js';
import {animationFrame} from '../src/assets/playback.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';
const sha='ae8c3c2c8504d999eb14d8790ee4ebcf74680f96e12a01c178d5de124992290f';
test('P5 approved color-preserving Move has four losslessly repacked560x440 cells at10fps and unchanged Idle',()=>{
 const d=characterAnimation(rosterCatalog.P5,'battleMove');assert.equal(d.source,'xingxing.battleMove');assert.deepEqual(d.frames,[[0,0],[560,0],[0,414],[560,414]].map(([x,y])=>({x,y,width:560,height:414})));assert.equal(d.fps,10);assert.equal(d.loop,true);assert.deepEqual(d.origin,[.5,413/414]);assert.equal(d.scale,2.25);
 const b=readFileSync('public/assets/characters/xingxing/battleMove-4f.png');assert.equal(b.length,1008507);assert.equal(createHash('sha256').update(b).digest('hex'),sha);assert.deepEqual([b.readUInt32BE(16),b.readUInt32BE(20),b[25]],[1120,880,6]);assert.equal(createHash('sha256').update(readFileSync('public/assets/characters/xingxing/battleIdle.png')).digest('hex'),'1004c76a0ea3e5e942a60137cee5628752220edcfb8cd4c453a43df7e54e3c26');
 for(const reduced of [false,true]){const rate=reduced?5:10;assert.deepEqual([0,1,2,3,4].map(i=>animationFrame(d,i/rate+.001,reduced,'locomotion').index),[0,1,2,3,0]);}
});
for(const reduced of [false,true])test(`P5 actual presenter XY/full-cycle/duplicate-time/stop/mirror purity reduced=${reduced}`,async()=>{
 const textures=new Map(),scene={textures:{addImage:k=>textures.set(k,{has:()=>false,add(){}}),get:k=>textures.get(k),remove:k=>textures.delete(k)},add:{image(x,y,k,f){const v={texture:[k,f],setTexture(k,f){this.texture=[k,f];return this;},destroy(){}};for(const method of ['setOrigin','setScale','setVisible','setDisplaySize','setFlipX','setPosition','setDepth','setAlpha'])v[method]=(...args)=>{v[method+'Value']=args;return v;};return v;}}};
 const cache=createAssetCache({transport:async r=>({image:{width:r.width,height:r.height},bytes:readFileSync('public/'+r.path).length})}),p=new AssetPresenter(scene,{cache,reducedMotion:reduced});await p.prepare([rosterCatalog.P5]);const a={instanceId:'a1',definitionId:'P5',hp:285,x:5,y:0},frame={allies:[a],enemies:[]};p.render(frame,0,rosterCatalog);const v=p.actorSprites.get('a1');assert.ok(v.texture[0].endsWith('xingxing.battleIdle'));a.y+=.1;p.render(frame,.1,rosterCatalog);
 const rate=reduced?5:10,observed=[];for(let i=0;i<5;i++){a.x-=.01;const now=.1+i/rate+.001,before=structuredClone(frame);p.render(frame,now,rosterCatalog);p.render(frame,now,rosterCatalog);assert.deepEqual(frame,before);observed.push(v.texture[1]);assert.deepEqual(v.setFlipXValue,[true]);assert.deepEqual(v.setDisplaySizeValue,[162,162*414/560]);assert.deepEqual(v.setOriginValue,[.5,413/414]);assert.deepEqual(v.setPositionValue,[a.x,a.y]);}assert.deepEqual(observed,['0.0.560.414','560.0.560.414','0.414.560.414','560.414.560.414','0.0.560.414']);
 p.render(frame,2,rosterCatalog);assert.ok(v.texture[0].endsWith('xingxing.battleIdle'));assert.equal(v.texture[1],'0.0.160.134');assert.equal(rosterCatalog.P5.stats.moveSpeed,1.85);
 const session=createStageBattleSession({...findStage('1-1'),selectedTeam:['P5','P2','P3']});
 const renderSession=()=>{const before=structuredClone(session.snapshot()),snap=session.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(actor=>({...actor,definitionId:session.actorById(actor.instanceId).definitionId}));p.render(snap,session.elapsedSeconds,rosterCatalog);assert.deepEqual(session.snapshot(),before);};
 renderSession();const seen=new Set();for(let i=0;i<22;i++){session.holdPlayerControl('a1');session.setPlayerMovement('a1',{x:1,y:0});session.step(.05);renderSession();seen.add(p.actorSprites.get('a1').texture[1]);}
 assert.equal(seen.size,4);session.holdPlayerControl('a1');session.setPlayerMovement('a1',{x:0,y:0});session.step(.05);renderSession();assert.ok(p.actorSprites.get('a1').texture[0].endsWith('xingxing.battleIdle'));assert.equal(session.characterDefinitions.P5.stats.moveSpeed,1.85);p.destroy();
});

test('P5 movement pixels ground every pose and keep visible height near accepted static Idle',()=>{
 const d=characterAnimation(rosterCatalog.P5,'battleMove');
 for(const height of [412,401,409,411]){const visible=72*d.scale*height/560;assert.ok(Math.abs(visible-118.8)<3);}
 assert.equal((413/414-d.origin[1])*72*d.scale*414/560,0);
});
