import test from 'node:test';import assert from 'node:assert/strict';
const api=await import('../src/runtime/passivePresentation.js').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
const view=(patch={})=>({instanceId:'a1',definitionId:'runner',label:'疾行',implemented:true,progressDistance:0,threshold:1,readyAt:4.5,active:{statusId:'s1',startTime:.5,expiryTime:2.5,contribution:.08},effectiveMoveSpeed:2.214,movementCapReached:false,...patch});
const overlap=(a,b)=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
test('real passive state gives distinct visible text, truthful cap and independent active/cooldown values',()=>{
 assert.equal(typeof api.passiveBadgeText,'function','independent passive UI not implemented');
 assert.equal(api.passiveBadgeText(view()),'疾行 +8%');assert.equal(api.passiveBadgeText(view({movementCapReached:true})),'疾行 · 移速上限15%');assert.equal(api.passiveBadgeText(view({active:null})), '');
 const text=api.passiveHudText(view(),1);assert.ok(text.includes('剩餘 1.5 秒'));assert.ok(text.includes('冷卻 3.5 秒'));assert.ok(text.includes('移速 2.214'));
 const ready=api.passiveHudText(view({active:null,readyAt:0,progressDistance:.4}),1);assert.ok(ready.includes('0.40/1.00'));assert.equal(ready.includes('剩餘'),false);
});
test('six overlapping formal actor badges fit actual mobile CSS pixels without covering HP face or reserved HUD',()=>{
 assert.equal(typeof api.layoutPassiveBadges,'function');const items=Array.from({length:6},(_,i)=>({instanceId:`unit-${i}`,text:i%2?'疾行 +8%':'疾行 · 移速上限15%',anchor:{x:560,y:300}}));
 const reservedRects=[{x:510,y:300,width:100,height:12},{x:490,y:320,width:140,height:100},{x:430,y:5,width:260,height:55},{x:0,y:0,width:125,height:335},{x:995,y:0,width:125,height:335}];
 for(const canvasRect of [{width:815.111,height:393},{width:1120,height:540}]){
  const layouts=api.layoutPassiveBadges({items,canvasRect,logicalSize:{width:1120,height:540},reservedRects});assert.equal(layouts.length,6);
  for(const box of layouts){assert.ok(box.cssFontSize>=12);assert.ok(box.x>=0&&box.y>=0&&box.x+box.width<=1120&&box.y+box.height<=540);assert.equal(reservedRects.some(r=>overlap(box,r)),false);assert.equal(layouts.some(b=>b!==box&&overlap(box,b)),false);}
  assert.deepEqual(layouts,api.layoutPassiveBadges({items:[...items].reverse(),canvasRect,logicalSize:{width:1120,height:540},reservedRects}));
 }
});
