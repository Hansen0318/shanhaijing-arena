import {createLabConfig} from '../../src/dev/battleLab/config.js';import {createLabBattleSession} from '../../src/dev/battleLab/battleFactory.js';
export function makeWindupFixture({tier='T0',tacticalEnabled=false,rng=()=>.99,allyTeam=['P1','P3','P4']}={}){
 const session=createLabBattleSession(createLabConfig({allyTeam,enemyTeam:['P2','P5','P3'],allyTier:tier}),{tacticalEnabled,rng});
 // This fixture isolates accepted windup/contact chronology from the new defense passive.
 for(const a of session.actors)if(a.definitionId==='P2')session.passives.clearActor(a.instanceId);
 const actor=session.actorById('a1'),target=session.actorById('e1');
 for(const a of session.actors){for(const category of ['heavy','special','awakening'])Object.assign(a.abilityState[category],{phase:'cooldown',cooldownRemaining:99});session.cadence.set(a.instanceId,99);}
 Object.assign(actor,{x:0,y:0});Object.assign(target,{x:.65,y:0});session.cadence.set(actor.instanceId,0);
 return {session,actor,target};
}
