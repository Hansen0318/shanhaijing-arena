// Read-only real session/event and complete required-residency measurements.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from '../tests/helpers/assetScene.js';

function fixture({tier='T0',side='allies',tacticalEnabled=true,direction=1}={}){
 const s=createLabBattleSession(createLabConfig({allyTeam:['P2','P3','P4'],enemyTeam:['P2','P5','P3'],allyTier:tier,enemyTier:tier}),{tacticalEnabled,rng:()=>.99});
 for(const actor of s.actors){
  Object.assign(actor,{x:10,y:10});
  for(const category of ['heavy','special','awakening'])Object.assign(actor.abilityState[category],{phase:'cooldown',cooldownRemaining:99});
  s.cadence.set(actor.instanceId,99);
 }
 const a=s.actorById(side==='allies'?'a1':'e1'),t=s.actorById(side==='allies'?'e1':'a1');
 Object.assign(a,{x:0,y:0});Object.assign(t,{x:direction*.7,y:0});
 Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});
 return {s,a,t};
}
function advance(s,seconds){
 for(const a of s.actors){s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});}
 s.step(seconds);
}
const direct=[];
for(const source of ['player','ai'])for(const tacticalEnabled of [false,true])for(const side of ['allies','enemies'])for(const direction of [-1,1]){
 const {s,a,t}=fixture({side,tacticalEnabled,direction}),before=t.hp;
 assert.equal(s.executeAbility(a,'heavy',source,t),true);
 const start=s.drainCastEvents(),startDamage=s.drainDamageEvents();
 assert.equal(s.pendingActions.size,0);
 assert.equal(a.abilityState.heavy.cooldownRemaining,4);
 if(tacticalEnabled){
  assert.equal(t.hp,before);assert.equal(start.length,0);assert.equal(s.delayedImpacts.size,1);
 }else{
  assert.ok(t.hp<before);assert.equal(start.length,1);assert.equal(start[0].phase,undefined);assert.equal(startDamage.length,1);
 }
 const casts=[...start],damage=[...startDamage];
 for(let i=0;i<14;i++){advance(s,.05);casts.push(...s.drainCastEvents());damage.push(...s.drainDamageEvents());}
 assert.equal(damage.length,1);assert.equal(casts.length,1);
 assert.equal(casts[0].actionId,undefined);assert.equal(casts[0].phase,undefined);
 assert.equal(a.x,0);assert.equal(a.y,0);
 assert.ok(Math.abs(damage[0].eventAt-(tacticalEnabled?.65:0))<1e-9);
 direct.push({source,tacticalEnabled,side,direction,startEvents:start,startDamage,casts,damage,sourcePosition:[a.x,a.y],targetHpLoss:before-t.hp});
}
const tiers=[];
for(const tier of ['T0','T1','T2','T3']){
 const {s,a,t}=fixture({tier}),d=s.actorAbilityDefinitions.get(a.instanceId)['P2.heavy'];
 assert.equal(d.windupMs,0);assert.equal(s.executeAbility(a,'heavy','player',t),true);
 const threat=[...s.delayedImpacts.values()][0].threat;
 assert.equal(threat.impactAtMs,d.telegraph.telegraphMs);
 const casts=[],damage=[];
 for(let i=0;i<80;i++){advance(s,.01);casts.push(...s.drainCastEvents());damage.push(...s.drainDamageEvents());}
 assert.equal(damage.length,1);assert.equal(casts.length,1);
 tiers.push({tier,definition:d,scheduledMs:threat.impactAtMs,actualHitMs:damage[0].eventAt*1000,cast:casts[0],damage:damage[0]});
}
const outcomes=[];
for(const outcome of ['air_cast','ai_out_of_range','escape','ordinary_damage','source_ko','target_ko']){
 const {s,a,t}=fixture(),before=t.hp;
 if(['air_cast','ai_out_of_range'].includes(outcome))t.x=8;
 const accepted=s.executeAbility(a,'heavy',outcome==='ai_out_of_range'?'ai':'player',t);
 assert.equal(accepted,outcome!=='ai_out_of_range');
 if(outcome==='escape')t.x=8;
 if(outcome==='ordinary_damage')a.damage(1);
 if(outcome==='source_ko')a.damage(a.hp);
 if(outcome==='target_ko')t.damage(t.hp);
 const casts=s.drainCastEvents(),damage=s.drainDamageEvents();
 for(let i=0;i<14;i++){advance(s,.05);casts.push(...s.drainCastEvents());damage.push(...s.drainDamageEvents());}
 assert.equal(damage.length,outcome==='ordinary_damage'?1:0);
 if(outcome==='air_cast'){assert.equal(casts.length,1);assert.equal(casts[0].hit,false);assert.equal(casts[0].actionId,undefined);}
 outcomes.push({outcome,accepted,casts,damage,hpBefore:before,hpAfter:t.hp,pending:s.delayedImpacts.size});
}
const residency=[];
for(const reverse of [false,true]){
 const scene=assetScene(),cache=createAssetCache({transport:pngTransport}),p=new AssetPresenter(scene,{cache});
 const definitions=Object.values(rosterCatalog);if(reverse)definitions.reverse();
 await p.prepare(definitions);await p.whenIdle();
 const snapshot=p.residency.snapshot(),actual=scene.budget();
 assert.equal(snapshot.estimatedLiveBytes,actual.bytes);
 assert.equal(snapshot.hardBytes,16777216);assert.equal(snapshot.optionalReserveBytes,131072);
 assert.equal(snapshot.failed,0);
 const keys=[...p.textures.keys()];p.destroy();assert.equal(scene.budget().bytes,0);
 residency.push({reverse,snapshot,cache:cache.diagnostics(),actual,keys,availableAfterReserve:snapshot.hardBytes-snapshot.estimatedLiveBytes-snapshot.optionalReserveBytes,cleanupBytes:scene.budget().bytes});
}
const protectedPaths=['src/roster/abilities.js','src/roster/catalog.js','src/combat/ability.js','src/combat/battleSession.js','src/assets/actionPlayback.js','src/runtime/assetPresenter.js','src/runtime/assetResidency.js','src/assets/manifest.js'];
const output={status:'PREFLIGHT PASS / EXECUTABLE PRESENTATION CONTRACT UNSET / NOT INTEGRATED OR DEPLOYED',sourceHead:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),scope:'Production-session direct probes, not automatic AI/UI/browser/phone proof. Real cache/presenter with actual PNG headers; decoder/Phaser allocation boundary doubled.',direct,tiers,outcomes,residency,protectedHashes:Object.fromEntries(protectedPaths.map(p=>[p,createHash('sha256').update(readFileSync(p)).digest('hex')])),conclusion:'All Heavy events currently unphased; tactical start emits no cast event and resolves after Tier-scaled telegraph. Non-tactical hits and player out-of-range casts emit immediately. Shared phased playback cannot consume these as approved full anticipation-before-hit. Do not infer approval to shift real damage or copy Basic250ms. Preserve existing target geometry/control/cancellation and all protected paths pending explicit contract selection.'};
writeFileSync('docs/verification/P2_HEAVY_RECOVERY/executable-preflight.json',JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({direct:direct.length,tiers:tiers.map(t=>({tier:t.tier,scheduledMs:t.scheduledMs,actualHitMs:t.actualHitMs})),outcomes:outcomes.length,requiredBytes:residency[0].snapshot.estimatedLiveBytes,availableAfterReserve:residency[0].availableAfterReserve,productionChanged:false},null,2));
