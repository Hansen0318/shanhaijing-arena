import test from 'node:test';import assert from 'node:assert/strict';
const api=await import('../src/assets/descriptors.js').catch(()=>({}));const playback=await import('../src/assets/playback.js').catch(()=>({}));
test('animation descriptors validate bounded frames/regions/timing and immutable data',()=>{
 assert.equal(typeof api.animationDescriptor,'function');
 const input={source:'placeholder.actor-strip',frames:[{x:0,y:0,width:32,height:32},{x:32,y:0,width:32,height:32}],fps:2,loop:true,origin:[.5,.5],scale:1,staticFrame:0};
 const d=api.animationDescriptor(input);input.frames[0].x=99;assert.equal(d.frames[0].x,0);assert.ok(Object.isFrozen(d.frames));
 for(const extra of [{fps:0},{scale:NaN},{origin:[2,.5]},{frames:[{x:60,y:0,width:32,height:32}]},{staticFrame:9},{source:'missing'}])assert.throws(()=>api.animationDescriptor({...d,...extra}));
});
test('animation clock pauses naturally and reduced motion is static',()=>{
 assert.equal(typeof playback.animationFrame,'function');const d=api.animationDescriptor({source:'placeholder.actor-strip',frames:[{x:0,y:0,width:32,height:32},{x:32,y:0,width:32,height:32}],fps:2,loop:true});
 assert.equal(playback.animationFrame(d,.6).index,1);assert.equal(playback.animationFrame(d,.6,true).index,0);assert.equal(playback.animationFrame(d,.6).index,1);assert.equal(playback.animationFrame(d,1.1).index,0);
});
test('explicit locomotion policy cycles every frame at half cadence under reduced motion only',()=>{
 const d=api.animationDescriptor({source:'lushu.battleMove',frames:[0,96,192,288].map(x=>({x,y:0,width:96,height:128})),fps:9,loop:true});
 const normal=[0,.112,.223,.334,.445],reduced=[0,.223,.445,.667,.889];
 assert.deepEqual(normal.map(t=>playback.animationFrame(d,t,false,'locomotion').index),[0,1,2,3,0]);
 assert.deepEqual(reduced.map(t=>playback.animationFrame(d,t,true,'locomotion').index),[0,1,2,3,0]);
 assert.equal(playback.animationFrame(d,.112,true,'locomotion').index,0);
 assert.deepEqual(reduced.map(t=>playback.animationFrame(d,t,true).index),[0,0,0,0,0]);
 const once=api.animationDescriptor({...d,loop:false});
 assert.equal(playback.animationFrame(once,.5,true,'locomotion').finished,false);
 assert.equal(playback.animationFrame(once,.9,true,'locomotion').finished,true);
});
test('all generic VFX forms validate attach/layer/lifetime and reduced-motion projection',()=>{
 assert.equal(typeof api.vfxDescriptor,'function');
 for(const form of ['sprite','flipbook','burst','trail','ring','projectile','impact','persistent-area']){
  const d=api.vfxDescriptor({form,assetKey:'placeholder.vfx',duration:.4,scale:1,attach:'target',rotation:'facing',layer:15});assert.equal(d.form,form);
 }
 for(const extra of [{duration:Infinity},{duration:0},{attach:'wrong'},{layer:100},{assetKey:'missing'},{loop:true}])assert.throws(()=>api.vfxDescriptor({form:'burst',...extra}));
});
test('VFX is bounded, clock-owned, removed on owner KO and clear',()=>{
 assert.equal(typeof playback.VisualPlayback,'function');const p=new playback.VisualPlayback({maxActive:2});const d=api.vfxDescriptor({form:'ring',duration:.4});
 p.play('a',d,{x:1,y:2},0);p.play('b',d,{x:2,y:2},0);p.play('c',d,{x:3,y:2},0);assert.equal(p.active.size,2);
 p.update(.1,new Set(['b','c']));assert.equal(p.active.size,2);p.update(.1,new Set(['c']));assert.equal(p.active.size,1);p.update(.5,new Set(['c']));assert.equal(p.active.size,0);
 p.play('a',d,{x:0,y:0},1);p.clear();assert.equal(p.active.size,0);
});
