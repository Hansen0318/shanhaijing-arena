// Read-only production-path probes. No gameplay or presentation implementation.
import assert from 'node:assert/strict';
import {writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {decideAIIntent} from '../src/combat/ai.js';

function fixture(tier='T0',side='allies',tacticalEnabled=true){
 const s=createLabBattleSession(createLabConfig({allyTeam:['P2','P3','P4'],enemyTeam:['P2','P5','P3'],allyTier:tier,enemyTier:tier}),{tacticalEnabled,rng:()=>.99});
 for(const [i,a] of s.actors.entries()){
  Object.assign(a,{x:20+i*5,y:10});
  for(const category of ['heavy','special','awakening'])Object.assign(a.abilityState[category],{phase:'cooldown',cooldownRemaining:99});
  s.cadence.set(a.instanceId,99);s.holdPlayerControl(a.instanceId);
 }
 const a=s.actorById(side==='allies'?'a1':'e1'),ally=s.actorById(side==='allies'?'a2':'e2');
 Object.assign(a,{x:0,y:0});Object.assign(ally,{x:1,y:0});
 Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});
 return {s,a,ally};
}
const ready=a=>Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});
const direct=[];
for(const tier of ['T0','T1','T2','T3'])for(const side of ['allies','enemies'])for(const source of ['player','ai'])for(const tactical of [false,true]){
 const {s,a,ally}=fixture(tier,side,tactical),d=s.actorAbilityDefinitions.get(a.instanceId)['P2.special'];
 const hp=s.actors.map(a=>a.hp),pos=s.actors.map(a=>[a.x,a.y]);
 assert.equal(s.executeAbility(a,'special',source),true);
 assert.equal(d.targetingRule,'self');assert.equal(d.effect.coefficient,0);assert.equal(d.windupMs,0);assert.equal(d.telegraph,null);
 assert.equal(s.pendingActions.size,0);assert.equal(s.delayedImpacts.size,0);assert.deepEqual(s.actors.map(a=>a.hp),hp);assert.deepEqual(s.actors.map(a=>[a.x,a.y]),pos);
 assert.equal(a.abilityState.special.cooldownRemaining,d.cooldown);assert.equal(s.drainDamageEvents().length,0);
 const casts=s.drainCastEvents();assert.equal(casts.length,1);assert.equal(casts[0].targetId,a.instanceId);assert.equal(casts[0].hit,true);assert.equal(casts[0].phase,undefined);
 const self=s.statuses.forActor(a.instanceId,0);assert.equal(self.length,1);assert.equal(self[0].magnitude,d.effect.reduction);assert.equal(self[0].expiryTime,d.effect.duration);
 const protectedAlly=s.statuses.forActor(ally.instanceId,0);assert.equal(protectedAlly.length,tier==='T0'?0:1);
 assert.ok(Math.abs(s.statuses.damageMultiplier(a.instanceId,0)-(1-d.effect.reduction))<1e-12);
 direct.push({tier,side,source,tactical,cooldown:d.cooldown,selfReduction:d.effect.reduction,duration:d.effect.duration,aiOpportunityRange:d.range,casts,statuses:[...s.statuses.records.values()]});
}
const lifecycle=[];
{
 const {s,a,ally}=fixture('T1');s.executeAbility(a,'special','player');
 const first=[...s.statuses.records.values()];s.elapsedSeconds=1;ready(a);s.executeAbility(a,'special','player');
 const refreshed=[...s.statuses.records.values()];assert.equal(refreshed.length,2);assert.ok(refreshed.every(r=>r.startTime===1));assert.ok(refreshed.every(r=>!first.some(f=>f.id===r.id)));
 // Controlled fixture makes a second legal cast available early, solely to inspect replace policy.
 const until=refreshed[0].expiryTime;assert.equal(s.statuses.forActor(a.instanceId,until-1e-6).length,1);assert.equal(s.statuses.forActor(a.instanceId,until).length,0);
 s.statuses.expire(until);assert.equal(s.statuses.records.size,0);assert.equal(s.statuses.mitigation.size,0);
 lifecycle.push({case:'refresh-replace-and-expiry',first,refreshed,expiryTime:until,remaining:0,fixture:'clock and cooldown readiness controlled, not natural overlap'});
}
for(const outcome of ['source-ko','recipient-ko','clear-restart','move','ordinary-damage','control-after-activation']){
 const {s,a,ally}=fixture('T1');s.executeAbility(a,'special','player');s.drainCastEvents();
 if(outcome==='source-ko')a.damage(a.hp);
 if(outcome==='recipient-ko')ally.damage(ally.hp);
 if(outcome==='clear-restart'){s.clearTransientCombat();assert.equal(s.statuses.records.size,0);assert.equal(fixture('T1').s.statuses.records.size,0);}
 if(outcome==='move')s.setPlayerMovement(a.instanceId,{x:1,y:0});
 if(outcome==='ordinary-damage')a.damage(1);
 if(outcome==='control-after-activation')s.statuses.apply({sourceId:'e1',targetId:a.instanceId,key:'probe-control',type:'control',magnitude:1,duration:.2},0);
 if(outcome!=='clear-restart')s.step(.05);
 const records=[...s.statuses.records.values()];
 if(outcome==='source-ko')assert.equal(records.length,0);
 if(outcome==='recipient-ko'){assert.equal(records.length,1);assert.equal(records[0].targetId,a.instanceId);}
 if(outcome==='move'){assert.ok(a.x>0);assert.equal(records.length,2);}
 if(['ordinary-damage','control-after-activation'].includes(outcome))assert.equal(records.filter(r=>r.type==='mitigation').length,2);
 lifecycle.push({case:outcome,records,position:[a.x,a.y]});
}
const ai=[];
{
 const {s,a}=fixture('T0','allies',false),enemy=s.actorById('e1');
 Object.assign(enemy,{x:.7,y:0});
 assert.equal(s.executeAbility(a,'special','player'),true);
 const before=[...s.statuses.records.values()];
 Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});
 const hp=enemy.hp;
 assert.equal(s.executeAbility(a,'heavy','player',enemy),true);
 assert.ok(enemy.hp<hp);assert.equal(s.elapsedSeconds,0);
 assert.deepEqual([...s.statuses.records.values()],before);
 assert.equal(s.statuses.damageMultiplier(a.instanceId,0),.75);
 lifecycle.push({case:'special-then-heavy-same-clock',at:s.elapsedSeconds,enemyHpLoss:hp-enemy.hp,records:[...s.statuses.records.values()],casts:s.drainCastEvents()});
}
for(const near of [false,true]){
 const {s,a}=fixture();const enemy=s.actorById('e1');Object.assign(enemy,{x:near?1:10,y:0});
 // Release the fixture's held player control before asking the real shared AI.
 a.controlHandoff.releasePlayerControl(0);
 const intent=decideAIIntent({actor:a,enemies:s.enemies,allies:s.allies,abilityDefinitions:s.actorAbilityDefinitions.get(a.instanceId),currentTarget:enemy,nowMs:1});
 assert.equal(intent.category==='special',near);ai.push({near,intent});
}
const damage=[];
for(const tier of ['T0','T1','T2','T3']){
 const results=[];
 for(const guarded of [false,true]){
  const {s,a}=fixture(tier),enemy=s.actorById('e1');
  if(guarded)s.executeAbility(a,'special','player');
  const amount=s.applyResolvedDamage(enemy,a,s.definitionForActor(enemy),s.definitionForActor(a),s.actorAbilityDefinitions.get(enemy.instanceId)['P2.heavy'],'heavy','player');
  results.push(amount);
 }
 const {s,a}=fixture(tier),d=s.actorAbilityDefinitions.get(a.instanceId)['P2.special'];
 assert.ok(Math.abs(results[1]-results[0]*(1-d.effect.reduction))<1e-9);
 damage.push({tier,unguarded:results[0],guarded:results[1],multiplier:1-d.effect.reduction});
}
const paths=['src/roster/abilities.js','src/roster/catalog.js','src/roster/tierEffects.js','src/roster/tierScalingProfiles.js','src/combat/battleSession.js','src/combat/statuses.js','src/combat/tierEffects.js','src/combat/tierEffectRuntime.js','src/combat/ai.js','src/runtime/statusPresentation.js','src/runtime/ArenaScene.js','src/runtime/assetPresenter.js'];
const report={status:'READ-ONLY MECHANICS PREFLIGHT PASS; NO ART/RUNTIME ACCEPTANCE',sourceCheckpoint:'8eb5e2b4814f86d4710a23b3a5e0346428ecd9f3',directCases:direct.length,direct,lifecycle,ai,damage,sources:paths.map(path=>({path,sha256:createHash('sha256').update(readFileSync(path)).digest('hex')})),limitations:['No rendered status VFX, browser, build or phone verification.','Cleanup callbacks/despawn behavior additionally traced statically; status records do not autonomously detect arbitrary actor-array removal.','Cast event hit=true means mitigation applied, not a damage hit.','Manual cooldown/clock manipulation only in the isolated refresh fixture.']};
writeFileSync('docs/art/candidates/botuo/special/key-pose-v1/mechanics-snapshot.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,directCases:direct.length,lifecycle:lifecycle.length,ai:ai.length,tiers:direct.filter(r=>r.side==='allies'&&r.source==='player'&&r.tactical).map(r=>({tier:r.tier,cooldown:r.cooldown,reduction:r.selfReduction,duration:r.duration,range:r.aiOpportunityRange,ally:r.statuses.find(s=>s.key==='boyi.ally')}))},null,2));
