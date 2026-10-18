// Read-only production-session and residency measurement. No runtime change.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {assetManifest} from '../src/assets/manifest.js';
import {ActionPlayback} from '../src/assets/actionPlayback.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from '../tests/helpers/assetScene.js';

function fixture({tier='T0',side='allies',tacticalEnabled=true,direction=1}={}){
 const s=createLabBattleSession(createLabConfig({allyTeam:['P2','P3','P4'],enemyTeam:['P2','P5','P3'],allyTier:tier,enemyTier:tier}),{tacticalEnabled,rng:()=>.99});
 for(const a of s.actors){a.x=10;a.y=1;for(const cat of ['heavy','special','awakening'])Object.assign(a.abilityState[cat],{phase:'cooldown',cooldownRemaining:99});s.cadence.set(a.instanceId,99);}
 const a=s.actorById(side==='allies'?'a1':'e1'),t=s.actorById(side==='allies'?'e1':'a1');
 Object.assign(a,{x:0,y:0});Object.assign(t,{x:direction*.7,y:0});s.cadence.set(a.instanceId,0);
 return {s,a,t};
}
const direct=[];
for(const source of ['player','ai'])for(const tacticalEnabled of [false,true])for(const side of ['allies','enemies'])for(const direction of [-1,1]){
 const {s,a,t}=fixture({side,tacticalEnabled,direction});
 const before={time:s.elapsedSeconds,hp:t.hp,x:a.x,y:a.y};
 assert.equal(s.executeAbility(a,'basic',source,t),true);
 const casts=s.drainCastEvents(),damage=s.drainDamageEvents();
 assert.equal(s.elapsedSeconds,before.time);assert.ok(t.hp<before.hp);assert.equal(a.x,before.x);assert.equal(a.y,before.y);
 assert.equal(casts.length,1);assert.equal(damage.length,1);assert.equal(damage[0].eventAt,0);
 assert.equal(casts[0].phase,undefined);assert.equal(casts[0].actionId,undefined);assert.equal(s.pendingActions.size,0);
 assert.equal(s.cadence.get(a.instanceId),1/.85);
 const playback=new ActionPlayback();playback.handle(casts[0],{kind:'nonstaged'});assert.equal(playback.active.size,0);
 assert.equal(s.executeAbility(a,'basic',source,t),false);
 direct.push({source,tacticalEnabled,side,direction,before,after:{time:s.elapsedSeconds,hp:t.hp,x:a.x,y:a.y,cadence:s.cadence.get(a.instanceId)},cast:casts[0],damage:damage[0],existingPhasedPlaybackStarted:false});
}
const tiers=[];
for(const tier of ['T0','T1','T2','T3']){
 const {s,a,t}=fixture({tier});const definition=s.actorAbilityDefinitions.get(a.instanceId)['P2.basic'];
 const stats=s.definitionForActor(a).stats,before=t.hp;
 assert.equal(definition.windupMs,0);assert.equal(s.executeAbility(a,'basic','ai',t),true);
 tiers.push({tier,definition,stats,cadence:s.cadence.get(a.instanceId),damage:before-t.hp,event:s.drainDamageEvents()[0]});
}
const misses=[];
for(const source of ['player','ai'])for(const side of ['allies','enemies']){
 const {s,a,t}=fixture({side});t.x=8;const before=t.hp,ok=s.executeAbility(a,'basic',source,t);
 assert.equal(t.hp,before);assert.equal(s.drainDamageEvents().length,0);assert.equal(s.pendingActions.size,0);
 const casts=s.drainCastEvents();assert.equal(ok,source==='player');
 if(source==='player')assert.equal(casts[0].hit,false);else assert.equal(casts.length,0);
 misses.push({source,side,accepted:ok,casts,targetHpUnchanged:true});
}
// Sandbox-only data opt-in probes. Neither catalog nor source files are changed.
const proposedTiming=[];
for(const windupMs of [240,250])for(const outcome of ['hit','escape','ordinary_damage','source_ko','target_ko','new_skill']){
 const {s,a,t}=fixture();const table=s.actorAbilityDefinitions.get(a.instanceId);
 s.actorAbilityDefinitions.set(a.instanceId,{...table,'P2.basic':Object.freeze({...table['P2.basic'],windupMs})});
 const before=t.hp;assert.equal(s.executeAbility(a,'basic','ai',t),true);
 const start=s.drainCastEvents();assert.equal(start[0].phase,'start');assert.equal(t.hp,before);
 if(outcome==='escape')t.x=8;
 if(outcome==='ordinary_damage')a.damage(1);
 if(outcome==='source_ko')a.damage(a.hp);
 if(outcome==='target_ko')t.damage(t.hp);
 if(outcome==='new_skill'){
  Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});
  assert.equal(s.executeAbility(a,'special','player',a),true);
 }
 const casts=[],damage=[];
 for(let i=0;i<6;i++){
  for(const actor of s.actors){s.holdPlayerControl(actor.instanceId);s.setPlayerMovement(actor.instanceId,{x:0,y:0});}
  s.step(.05);casts.push(...s.drainCastEvents());damage.push(...s.drainDamageEvents());
 }
 const basicDamage=damage.filter(e=>e.actorId===a.instanceId&&e.category==='basic');
 const resolves=casts.filter(e=>e.actorId===a.instanceId&&e.category==='basic'&&e.phase==='resolve');
 const cancels=casts.filter(e=>e.actorId===a.instanceId&&e.category==='basic'&&e.phase==='cancel');
 const expectsHit=['hit','ordinary_damage'].includes(outcome);
 assert.equal(basicDamage.length,expectsHit?1:0);
 if(expectsHit)assert.ok(Math.abs(basicDamage[0].eventAt-.25)<1e-9);
 if(['escape'].includes(outcome)){assert.equal(resolves.length,1);assert.equal(resolves[0].hit,false);}
 if(['source_ko','target_ko','new_skill'].includes(outcome))assert.equal(cancels.length,1);
 proposedTiming.push({windupMs,outcome,kind:'IN-MEMORY PROPOSAL, NOT INSTALLED/APPROVED',start,castEvents:casts,damageEvents:basicDamage,
                      firstActualHitMs:basicDamage.length?Math.round(basicDamage[0].eventAt*1000):null,cadenceAfter300ms:s.cadence.get(a.instanceId)});
}
const pack=JSON.parse(readFileSync('docs/verification/P2_BASIC_RUNTIME_PACK_PROBE/manifest.json'));
const candidateRecords=pack.files.map((file,i)=>({key:['preflight.botuo.basicPoses','preflight.botuo.basicSource','preflight.botuo.basicContact'][i],type:'image',path:file.path,width:file.size[0],height:file.size[1],bytes:file.bytes,fallback:i?'placeholder.vfx':'placeholder.battle'}));
const candidateBytes=candidateRecords.reduce((n,a)=>n+a.width*a.height*4,0);
const budget=[];
for(const reverse of [false,true]){
 const scene=assetScene(),manifest={...assetManifest,...Object.fromEntries(candidateRecords.map(r=>[r.key,r]))};
 const cache=createAssetCache({manifest,transport:async r=>{
  if(!r.key.startsWith('preflight.'))return pngTransport(r);
  const b=readFileSync(r.path);return {image:{width:b.readUInt32BE(16),height:b.readUInt32BE(20)},bytes:b.length};
 }});
 const p=new AssetPresenter(scene,{cache});const defs=Object.values(rosterCatalog);if(reverse)defs.reverse();
 await p.prepare(defs);await p.whenIdle();
 const baseline={scene:p.residency.snapshot(),cache:cache.diagnostics(),actualScene:scene.budget(),files:[...p.textures].map(([key,v])=>({key,width:v.asset.width,height:v.asset.height,decodedBytes:v.asset.width*v.asset.height*4}))};
 const originalKeys=[...p.textures.keys()],keys=candidateRecords.map(r=>r.key);p.residency.setPins('planning-probe',keys);
 await p.loadKeys(reverse?[...keys].reverse():keys);
 const after={scene:p.residency.snapshot(),cache:cache.diagnostics(),actualScene:scene.budget()};
 for(const key of [...originalKeys,...keys])assert.ok(p.textures.has(key));
 assert.equal(after.scene.estimatedLiveBytes,baseline.scene.estimatedLiveBytes+candidateBytes);
 assert.equal(after.actualScene.bytes,after.scene.estimatedLiveBytes);
 assert.ok(after.scene.hardBytes-after.scene.estimatedLiveBytes>=after.scene.optionalReserveBytes);
 assert.equal(after.cache.failed,0);p.destroy();assert.equal(scene.budget().bytes,0);
 budget.push({reverse,baseline,planningCandidateAfter:after,remainingBytes:after.scene.hardBytes-after.scene.estimatedLiveBytes,cleanupBytes:scene.budget().bytes});
}
const protectedPaths=['src/roster/abilities.js','src/roster/catalog.js','src/combat/ability.js','src/combat/battleSession.js','src/assets/actionPlayback.js','src/runtime/assetPresenter.js','src/runtime/assetResidency.js','src/runtime/assetCache.js'];
const sourceHead=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const output={status:'PREFLIGHT MEASURED / EXECUTABLE TIMING DECISION PENDING',sourceHead,
 scope:'Actual production session/direct executeAbility player/ai source flags; not UI/automatic-AI/browser/device verification. Residency uses real cache/presenter and actual public/probe PNG headers with doubled decoder/draw API; probe files remain under docs, no runtime files or visual quality PASS claim.',
 ability:formalAbilityDefinitions['P2.basic'],directCases:direct,tierCases:tiers,outOfRangeCases:misses,proposedTiming,budget,
 planningCandidate:{records:candidateRecords,additionalDecodedBytes:candidateBytes,notSelected:true,qualityRejectedAtThisDensity:true,visualComparison:'docs/verification/P2_BASIC_RUNTIME_PACK_PROBE/density-comparison.png'},
 protectedHashes:Object.fromEntries(protectedPaths.map(p=>[p,createHash('sha256').update(readFileSync(p)).digest('hex')])),
 acceptedPreview:{relativeContactMs:240,phaseMs:[160,80,160,160],totalActionMs:560,sourceRelativeWindowMs:[160,440],contactRelativeWindowMs:[240,440]},
 proposedContract:{status:'PLAYER DECISION PENDING',fixedWindupMs:250,reason:'Existing normal50ms simulation resolves nominal240ms at250ms; choose an exact existing-tick boundary rather than modify the shared clock.',previewContactMs:240,differenceFromPreviewMs:10,tiers:'fixed T0-T3',phases:[160,90,160,160],actionEndMs:570,sourceWindowMs:[160,450],targetWindowMs:[250,450]},
 conclusion:'Immediate P2 Basic emits one unphased cast and one immediate real damage event, no pending action; existing ActionPlayback cannot start from that event. In-memory240/250ms proposals both resolve at250ms on normal50ms steps. Proposed exact250ms windup changes gameplay and needs separate explicit approval. Low-density texture probe fits metadata residency but visibly blurs accepted art and is REJECTED, not an integration solution. Higher-fidelity packing remains engineering work; no budget increase or approved-source edits authorized.'};
writeFileSync('docs/verification/M5C_P2_BOTUO_BASIC_PREFLIGHT.json',JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({sourceHead,directCases:direct.length,tierCases:tiers.length,outOfRangeCases:misses.length,inMemoryTimingCases:proposedTiming.length,currentRealHitMs:0,acceptedPreviewHitMs:240,proposedExactHitMs:250,required:budget[0].baseline.scene.estimatedLiveBytes,headroom:budget[0].baseline.scene.hardBytes-budget[0].baseline.scene.estimatedLiveBytes,reserve:budget[0].baseline.scene.optionalReserveBytes,planningAddition:candidateBytes,planningRemaining:budget[0].remainingBytes,actualRuntimeChanged:false},null,2));
