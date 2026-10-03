import test from 'node:test';import assert from 'node:assert/strict';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createBattleSession} from '../src/combat/battleSession.js';import {createAbilityDefinition} from '../src/combat/ability.js';
import {rosterCatalog} from '../src/roster/catalog.js';import {formalAbilityDefinitions} from '../src/roster/abilities.js';
import {resolveTierAbilities,resolveTierProjection} from '../src/combat/tierEffects.js';
test('future range opt-out keeps actual AI preferred band synchronized with resolved Basic range',()=>{
 const def={...rosterCatalog.P4,aiProfile:{...rosterCatalog.P4.aiProfile,preferredRangeMin:4.2,preferredRangeMax:4.2}},base={...formalAbilityDefinitions['P4.basic'],tierScaling:{attackRange:false}};
 const defs={...formalAbilityDefinitions,'P4.basic':base},p=resolveTierProjection(def,'T3',defs);
 assert.equal(p.aiProfile.preferredRangeMax,4.2);
 const lab=createLabBattleSession(createLabConfig({allyTeam:['P4','P4','P4'],enemyTeam:['P4','P4','P4']}));
 const s=createBattleSession({allies:lab.allies,enemies:lab.enemies,characterDefinitions:{...rosterCatalog,P4:def},abilityDefinitions:defs,tierByActorId:{a1:'T3'},tacticalEnabled:true});
 assert.equal(s.definitionForActor(s.allies[0]).aiProfile.preferredRangeMin,4.2);assert.equal(s.actorAbilityDefinitions.get('a1')['P4.basic'].range,4.2);
});
test('delayed mobile Basic starts cadence at cast and cannot flood threats between impacts',()=>{
 const lab=createLabBattleSession(createLabConfig({allyTeam:['P1','P1','P1'],enemyTeam:['P1','P1','P1']}));
 const basic=createAbilityDefinition({...formalAbilityDefinitions['P1.basic'],telegraph:{telegraphMs:300,dodgeable:false,commitment:'mobile',dangerRadius:.5}});
 const s=createBattleSession({allies:lab.allies,enemies:lab.enemies,characterDefinitions:rosterCatalog,abilityDefinitions:{...formalAbilityDefinitions,'P1.basic':basic},tierByActorId:{a1:'T3'},tacticalEnabled:true,rng:()=>.99});
 s.allies[0].x=0;s.allies[0].y=0;s.enemies[0].x=1;s.enemies[0].y=0;
 for(const a of s.actors)for(const k of ['heavy','special','awakening']){a.abilityState[k].phase='cooldown';a.abilityState[k].cooldownRemaining=20;}
 for(let i=0;i<10;i++){for(const a of s.actors)if(a.instanceId!=='a1')s.holdPlayerControl(a.instanceId);s.step(.01);}
 assert.equal([...s.threats.records.values()].filter(t=>t.sourceId==='a1').length,1);assert.ok(s.cadence.get('a1')>.5);
 assert.equal(s.executeAbility(s.allies[0],'basic','ai',s.enemies[0]),false,'same cadence execution API also rejects a second Basic');
});
test('explicit geometry opt-outs and zero weights cannot shrink accepted base geometry on upgrade',()=>{
 const def={...rosterCatalog.P1,tierEffects:{},tierScalingProfile:{aoeScaleWeight:0,mobilityDistanceScaleWeight:0}};
 const optOut=createAbilityDefinition({...formalAbilityDefinitions['P1.special'],tierScaling:{aoe:false,mobility:false},effect:{coefficient:1,areaRadius:8,movement:{kind:'engage',distance:5,stopDistance:.5}}});
 for(const tier of ['T0','T1','T2','T3']){const a=resolveTierAbilities(resolveTierProjection(def,tier),{'P1.special':optOut})['P1.special'];assert.equal(a.effect.areaRadius,8);assert.equal(a.effect.movement.distance,5);const z=resolveTierAbilities(resolveTierProjection(def,tier),{'P1.special':{...optOut,tierScaling:{aoe:true,mobility:true}}})['P1.special'];assert.equal(z.effect.areaRadius,8);assert.equal(z.effect.movement.distance,5);}
});
