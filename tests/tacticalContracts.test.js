import test from 'node:test';import assert from 'node:assert/strict';
import {createAIProfile} from '../src/combat/aiProfiles.js';
import {createTelegraph,ThreatLedger,containsDanger} from '../src/combat/threats.js';
test('profile validates immutable complete data including hysteresis thresholds',()=>{
 const p=createAIProfile({tag:'test',retreatHpThreshold:.3,reengageHpThreshold:.6});assert.ok(Object.isFrozen(p));assert.ok(Object.isFrozen(p.targetWeights));assert.ok(p.preferredRangeMin<=p.preferredRangeMax);
 for(const bad of [{aggression:NaN},{evadeTendency:2},{preferredRangeMin:4,preferredRangeMax:2},{retreatHpThreshold:.6,reengageHpThreshold:.3},{evadeReactionMs:-1},{targetWeights:{distance:NaN}}])assert.throws(()=>createAIProfile(bad));
});
test('telegraph validates actual reaction window and non-dodgeable default',()=>{
 assert.equal(createTelegraph(),null);assert.throws(()=>createTelegraph({dodgeable:true,telegraphMs:0}));assert.throws(()=>createTelegraph({telegraphMs:500,dangerShape:'banana'}));
 const t=createTelegraph({telegraphMs:600,dodgeable:true,dangerShape:'circle',dangerRadius:1});assert.ok(Object.isFrozen(t));assert.equal(t.commitment,'locked');
});
test('clock ledger locks geometry, expires exactly once and new instance starts clean',()=>{
 const l=new ThreatLedger(),actor={instanceId:'a1',teamId:'allies',x:0,y:0},target={instanceId:'e1',x:2,y:0};
 const definition={category:'heavy',effect:{},telegraph:createTelegraph({telegraphMs:500,dodgeable:true,dangerShape:'circle',dangerRadius:.8})};
 const t=l.create(actor,target,definition,100);target.x=8;assert.equal(t.impactAtMs,600);assert.ok(containsDanger({x:2,y:0},t.geometry));assert.ok(!containsDanger(target,t.geometry));
 assert.equal(l.active(599).length,1);assert.equal(l.active(599).length,1);assert.equal(l.takeDue(600).length,1);assert.equal(l.takeDue(600).length,0);assert.equal(new ThreatLedger().active(0).length,0);
});
test('projectile lane geometry uses finite locked segment rather than infinite line',()=>{
 const g={shape:'lane',origin:{x:0,y:0},center:{x:3,y:0},radius:.4};assert.ok(containsDanger({x:2,y:.2},g));assert.ok(!containsDanger({x:5,y:0},g));assert.ok(!containsDanger({x:2,y:1},g));
});
