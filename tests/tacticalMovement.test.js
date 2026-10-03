import test from 'node:test';import assert from 'node:assert/strict';
import {createAIProfile} from '../src/combat/aiProfiles.js';
import {decideTacticalIntent,safePosition} from '../src/combat/tactics.js';
const bounds={xMin:-2,xMax:12,yMin:-2,yMax:2};
const actor=(x=0,hp=100)=>({instanceId:'a1',teamId:'allies',x,y:0,hp,maxHp:100});
const ctx=(p,state={},nowMs=0,a=actor(),enemies=[{...actor(3),instanceId:'e1',teamId:'enemies'}])=>({actor:a,enemies,allies:[a],target:enemies[0],profile:p,state,nowMs,bounds,speed:2,threats:[],random:()=>.1,baseIntent:{kind:'move',movement:'approach',targetId:'e1'}});
test('tactical destination holds and seeded lateral side reproduces without frame randomness',()=>{
 const p=createAIProfile({lateralVariation:.9}),s={};const a=decideTacticalIntent(ctx(p,s));const dest=a.destination;
 assert.notEqual(dest.y,0);assert.equal(decideTacticalIntent({...ctx(p,s,100),random:()=>{throw Error('frame RNG');}}).destination,dest);
 assert.deepEqual(decideTacticalIntent(ctx(p,{})),a);
});
test('kite hysteresis applies only profile tendency and exits beyond settle band',()=>{
 const p=createAIProfile({preferredRangeMin:2,preferredRangeMax:3,kiteTendency:1}),s={};
 assert.equal(decideTacticalIntent(ctx(p,s,0,actor(),[actor(1)])).tacticalState,'kite');
 assert.equal(decideTacticalIntent(ctx(p,s,900,actor(),[actor(2.1)])).tacticalState,'kite');
 assert.notEqual(decideTacticalIntent(ctx(p,s,1800,actor(),[actor(2.6)])).tacticalState,'kite');
 assert.notEqual(decideTacticalIntent(ctx(createAIProfile({kiteTendency:0}),{},0,actor(),[actor(.2)])).tacticalState,'kite');
});
test('retreat/recover uses HP hysteresis and finite timeout/cooloff rather than permanent loop',()=>{
 const p=createAIProfile({retreatHpThreshold:.3,reengageHpThreshold:.6,dangerRadius:.5}),s={};
 assert.equal(decideTacticalIntent(ctx(p,s,0,actor(0,20))).tacticalState,'retreat');
 assert.ok(['retreat','recover/support'].includes(decideTacticalIntent(ctx(p,s,900,actor(0,40))).tacticalState));
 assert.equal(decideTacticalIntent(ctx(p,s,1800,actor(0,80))).tacticalState,'regroup');
 const t={};decideTacticalIntent(ctx(p,t,0,actor(0,20)));assert.equal(decideTacticalIntent(ctx(p,t,3100,actor(0,20))).tacticalState,'regroup');
});
test('safe candidates honor bounds and leave circle/lane when materially safer',()=>{
 const a=actor(),g={shape:'circle',center:{x:0,y:0},radius:.5};const c=safePosition({...ctx(createAIProfile()),geometry:g,step:1});assert.ok(c);assert.ok(Math.hypot(c.x,c.y)>.5);assert.ok(c.y>=bounds.yMin&&c.y<=bounds.yMax);
 assert.equal(safePosition({...ctx(createAIProfile()),bounds:{xMin:0,xMax:0,yMin:0,yMax:0},geometry:g,step:1}),null);
});
test('evade requires dodgeable/reaction/willingness/movement/commitment and reachable safe point',()=>{
 const p=createAIProfile({evadeTendency:1,evadeReactionMs:100});const t={id:'t1',sourceTeamId:'enemies',dodgeable:true,createdAtMs:0,impactAtMs:1000,geometry:{shape:'circle',center:{x:0,y:0},radius:.5},severity:1};
 const c={...ctx(p),nowMs:150,threats:[t]};assert.equal(decideTacticalIntent(c).tacticalState,'evade');
 for(const change of [{threats:[{...t,dodgeable:false}]},{nowMs:20},{nowMs:950},{profile:createAIProfile({evadeTendency:0})},{committed:true},{speed:0}])assert.notEqual(decideTacticalIntent({...c,state:{},...change}).tacticalState,'evade');
});
