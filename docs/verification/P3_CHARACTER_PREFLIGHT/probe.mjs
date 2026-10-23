// Read-only characterization of the existing shared runtime; no proposed design is installed.
import assert from 'node:assert/strict';
import {writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createLabBattleSession} from '../../../src/dev/battleLab/battleFactory.js';
import {createLabConfig} from '../../../src/dev/battleLab/config.js';
const rows=[];
for(const tier of ['T0','T1','T2','T3'])for(const tacticalEnabled of [false,true]){
 const row={tier,tacticalEnabled,cases:[]};
 for(const category of ['basic','heavy','special','awakening']){
  const s=createLabBattleSession(createLabConfig({allyTeam:['P3','P1','P2'],enemyTeam:['P1','P4','P5'],allyTier:tier,enemyTier:tier,skipCountdown:true}),{tacticalEnabled,rng:()=>.99});
  for(const [i,a]of s.actors.entries()){a.x=i<3?0:11;a.y=i%3;s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}
  const a=s.actorById('a1'),patient=s.actorById('a2'),enemy=s.actorById('e1');Object.assign(a,{x:0,y:0});Object.assign(patient,{x:.5,y:0});Object.assign(enemy,{x:3,y:0});patient.damage(patient.maxHp*.9);
  s.cadence.set(a.instanceId,0);Object.assign(a.abilityState[category],{phase:'ready',cooldownRemaining:0});
  const def=s.actorAbilityDefinitions.get(a.instanceId)['P3.'+category],before={patient:patient.hp,enemy:enemy.hp};
  assert.equal(s.executeAbility(a,category,'player',enemy),true);
  const immediate={heal:patient.hp-before.patient,damage:before.enemy-enemy.hp};
  const due=[...s.delayedImpacts.values()].map(x=>x.threat.impactAtMs/1000);
  if(due.length){for(const actor of s.actors)s.holdPlayerControl(actor.instanceId);s.step(Math.max(...due)-s.elapsedSeconds+.001);}
  const result={category,definition:def,stats:s.definitionForActor(a).stats,scales:s.tierProjections.get(a.instanceId).scales,patientMaxHp:patient.maxHp,immediate,final:{heal:patient.hp-before.patient,damage:before.enemy-enemy.hp},due,mitigation:[...s.statuses.records.values()].filter(r=>r.type==='mitigation').map(r=>({magnitude:r.magnitude,duration:r.expiryTime-r.startTime}))};
  if(category==='basic'||category==='heavy')assert.ok(result.final.damage>0);else assert.ok(result.final.heal>0);
  if(category==='heavy'&&tacticalEnabled){assert.equal(immediate.damage,0);assert.ok(due[0]>0);}else assert.deepEqual(due,[]);
  assert.equal(s.abilityDefinitions['P3.passive'].implemented,false);row.cases.push(result);
 }
 rows.push(row);
}
const paths=['src/roster/catalog.js','src/roster/abilities.js','src/roster/tierEffects.js','src/roster/tierScalingProfiles.js','src/combat/tierEffects.js','src/combat/tierScaling.js','src/combat/tierEffectRuntime.js','src/combat/battleSession.js','src/combat/effectTargeting.js','src/combat/passiveDefinition.js','src/combat/passiveRuntime.js','src/collection/model.js'];
const report={status:'PASS',scope:'Existing P3 real headless Session, four Tiers × instant/tactical × four skills; not Browser/art/new-design validation',sourceHead:'56c6e3f9454c4394d82dbaeda2f101d69f4973c4',runtimeChanged:false,physicalPhone:false,cases:32,rows,sourceSha256:Object.fromEntries(paths.map(p=>[p,createHash('sha256').update(readFileSync(p)).digest('hex')]))};
writeFileSync('docs/verification/P3_CHARACTER_PREFLIGHT/baseline.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,cases:32,newPassiveImplemented:false}));
