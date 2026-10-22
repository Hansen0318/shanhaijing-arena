import test from 'node:test';import assert from 'node:assert/strict';
const api=await import('../src/combat/passiveMotion.js').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
const bounds={xMin:0,xMax:2,yMin:0,yMax:3};
test('ordinary motion splits at actual wall and goal arrival rather than spreading clipped distance over a whole frame',()=>{
 assert.equal(typeof api.ordinaryMotionSegments,'function','ordinary-motion planner missing');
 const segments=api.ordinaryMotionSegments({from:{x:1,y:1},motion:{vector:{x:1,y:1},bounds},start:0,end:2,speed:Math.SQRT2});
 assert.deepEqual(segments.map(s=>[s.start,s.end,s.from.x,s.from.y,s.to.x,s.to.y]),[[0,1,1,1,2,2],[1,2,2,2,2,3]]);
 const goal=api.ordinaryMotionSegments({from:{x:0,y:0},motion:{goal:{x:1,y:0},bounds},start:0,end:1,speed:2});
 assert.deepEqual(goal.map(s=>[s.end,s.to.x]),[[.5,1],[1,1]]);
});
test('clipping and earliest passive boundary use real segment time and stable actors',()=>{
 assert.equal(typeof api.clipOrdinarySegment,'function');const s={kind:'ordinary',start:2,end:4,from:{x:0,y:0},to:{x:4,y:0}};
 assert.deepEqual(api.clipOrdinarySegment(s,3),{...s,end:3,to:{x:2,y:0}});
 const runtime={nextBoundary:(id)=>id==='z'?3:2.5};assert.equal(api.nextPassiveMotionBoundary({runtime,segments:new Map([['z',s],['a',s]]),now:2,end:4}),2.5);
});
