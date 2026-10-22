import test from 'node:test';import assert from 'node:assert/strict';
import {passiveFixture,stepHeld} from './helpers/passiveFixture.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
function moving(options={}){const f=passiveFixture(options);assert.ok(f.session.passives?.enabled()||options.enabled===false,'session has no enabled passive');f.session.setPlayerMovement(f.actor.instanceId,{x:1,y:0});return f;}
test('real session crosses the exact threshold and changes only the remaining ordinary path',()=>{
 const {session:s,actor:a}=moving();stepHeld(s,1);const v=s.snapshot().passives.find(v=>v.instanceId===a.instanceId);
 const at=1/2.05;near(v.active.startTime,at);near(v.active.expiryTime,at+3);near(v.readyAt,at+6);near(a.x,1+(1-at)*2.7675);near(v.effectiveMoveSpeed,2.7675);
});
test('same held path is invariant to coarse and fine simulation partitions with exact active and cooldown boundaries',()=>{
 const coarse=moving(),fine=moving();stepHeld(coarse.session,6);
 for(let i=0;i<120;i++)stepHeld(fine.session,.05);
 near(coarse.actor.x,fine.actor.x);const a=coarse.session.snapshot().passives[0],b=fine.session.snapshot().passives[0];near(a.readyAt,b.readyAt);assert.equal(a.active,null);assert.equal(b.active,null);
 near(coarse.actor.abilityState.heavy.cooldownRemaining,93);near(fine.actor.abilityState.heavy.cooldownRemaining,93);
});
test('all tiers and both teams use the declared Tier passive multiplier and a pure snapshot',()=>{
 for(const tier of ['T0','T1','T2','T3'])for(const enemy of [false,true]){
  const {session:s,actor:a}=moving({tier,enemy});stepHeld(s,1);const before=JSON.stringify(s.passives.snapshot(s.elapsedSeconds));
  const v=s.snapshot().passives.find(v=>v.instanceId===a.instanceId);near(v.effectiveMoveSpeed/s.definitionForActor(a).stats.moveSpeed,{T0:1.35,T1:1.5,T2:1.65,T3:1.8}[tier]);s.snapshot();assert.equal(JSON.stringify(s.passives.snapshot(s.elapsedSeconds)),before);
 }
});
test('walls zero inputs external coordinates and skill displacement do not count as ordinary movement',()=>{
 const {session:s,actor:a}=moving();Object.assign(a,{x:s.arenaBounds.xMax,y:0});stepHeld(s,1);near(s.snapshot().passives[0].progressDistance,0);assert.equal(s.snapshot().passives[0].active,null);
 s.setPlayerMovement(a.instanceId,{x:0,y:0});Object.assign(a,{x:0,y:0});stepHeld(s,.2);near(s.snapshot().passives[0].progressDistance,0);
 Object.assign(s.actorById('e2'),{x:.5,y:0});Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});assert.equal(s.usePlayerAbility(a.instanceId,'special'),true);stepHeld(s,.4);near(s.snapshot().passives[0].progressDistance,0);
});
test('cap independent expiry KO restart and end cleanup use actual status state',()=>{
 const {session:s,actor:a}=moving();s.statuses.apply({sourceId:a.instanceId,targetId:a.instanceId,key:'tier',type:'movement',magnitude:1.1,duration:1.5},0);
 stepHeld(s,1);near(s.snapshot().passives[0].effectiveMoveSpeed,2.05*1.45);stepHeld(s,.6);near(s.snapshot().passives[0].effectiveMoveSpeed,2.7675);
 a.damage(a.maxHp);stepHeld(s,.01);assert.equal(s.snapshot().passives.some(v=>v.instanceId===a.instanceId),false);
 assert.equal(s.statuses.forActor(a.instanceId,s.elapsedSeconds).some(r=>r.key==='passive:P1.passive'),false);
 const f=moving();stepHeld(f.session,1);f.session.clearTransientCombat();assert.deepEqual(f.session.snapshot().passives,[]);assert.equal(f.session.statuses.records.size,0);
});
test('opted-out same actor baseline has no passive state or speed gain',()=>{
 const {session:s,actor:a}=moving({enabled:false});stepHeld(s,1);near(a.x,2.05);assert.deepEqual(s.snapshot().passives,[]);
});
test('ordinary AI motion earns the same passive without a player-only branch',()=>{
 const {session:s,actor:a}=passiveFixture();assert.ok(s.passives.enabled());s.clearPlayerMovement(a.instanceId);
 for(const other of s.actors)if(other!==a)s.holdPlayerControl(other.instanceId);
 s.step(1);assert.ok(s.snapshot().passives.find(v=>v.instanceId===a.instanceId).active);
});
test('same-time lethal queued hit wins before passive activation and leaves no ghost buff',async()=>{
 const {formalAbilityDefinitions}=await import('../src/roster/abilities.js');const {session:s,actor:a}=moving();a.damage(a.maxHp-1);
 Object.assign(s.actorById('e2'),{x:1.2,y:0});const at=1/2.05;
 s.pendingHits.push({actorId:'e2',targetId:a.instanceId,due:at,definition:formalAbilityDefinitions['P4.basic'],category:'basic',source:'ai',hitIndex:0,totalHits:1});
 stepHeld(s,1);assert.equal(a.hp,0);assert.equal(s.snapshot().passives.some(v=>v.instanceId===a.instanceId),false);assert.equal(s.statuses.forActor(a.instanceId,s.elapsedSeconds).length,0);
});
test('staged rush displacement and its recovery never count toward ordinary walking distance',()=>{
 const {session:s,actor:a}=passiveFixture();assert.ok(s.passives.enabled());Object.assign(a.abilityState.awakening,{phase:'ready',cooldownRemaining:0});s.holdPlayerControl(a.instanceId);
 assert.equal(s.usePlayerAbility(a.instanceId,'awakening',{facingX:1}),true);stepHeld(s,.65);near(s.snapshot().passives.find(v=>v.instanceId===a.instanceId).progressDistance,0);assert.equal(s.snapshot().passives.find(v=>v.instanceId===a.instanceId).active,null);
});
