import {rosterCatalog} from '../../roster/catalog.js';
import {formalAbilityDefinitions} from '../../roster/abilities.js';
import {createCharacterState} from '../../combat/character.js';
import {createBattleSession} from '../../combat/battleSession.js';
// Imported by the deferred Arena runtime, never by the Lab menu.
export function createLabBattleSession(config,{seed=config?.battleSeed??1,rng,tacticalEnabled=true}={}) {
 if(config?.kind!=='battle-lab'||config.battleDuration!==90)throw new TypeError('Isolated Lab config required');
 const team=(ids,formation,ratios,prefix,teamId)=>{
  if(ids?.length!==3||formation?.length!==3||ratios?.length!==3)throw new TypeError('Three Lab slots required');
  return ids.map((id,i)=>{
   if(!Object.hasOwn(rosterCatalog,id)||!Number.isFinite(ratios[i])||ratios[i]<=0||ratios[i]>1)throw new TypeError('Invalid Lab slot');
   const actor=createCharacterState(rosterCatalog[id],{instanceId:`${prefix}${i+1}`,teamId,...formation[i]});
   actor.damage(actor.maxHp*(1-ratios[i]));return actor;
  });
 };
 const session=createBattleSession({allies:team(config.allyTeam,config.allySpawnFormation,config.allyHpRatios,'a','allies'),enemies:team(config.enemyTeam,config.enemySpawnFormation,config.enemyHpRatios,'e','enemies'),characterDefinitions:rosterCatalog,abilityDefinitions:formalAbilityDefinitions,maxSeconds:90,seed,rng,tacticalEnabled,tierByActorId:Object.fromEntries([...['a1','a2','a3'].map(id=>[id,config.allyTier??'T0']),...['e1','e2','e3'].map(id=>[id,config.enemyTier??'T0'])])});
 session.stageId=config.stageId;
 if(config.options.allSkillsReady)for(const actor of session.actors)for(const category of ['heavy','special','awakening']){
  Object.assign(actor.abilityState[category],{cooldownRemaining:0,phase:'ready',targetId:null});
 }
 return session;
}
