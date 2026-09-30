import { createCharacterState } from '../combat/character.js';
import { createBattleSession } from '../combat/battleSession.js';
import { runtimeCharacterDefinitions, demoAbilityDefinitions } from '../runtime/demoBattle.js';
import { rosterCatalog, prototypeOwnership } from '../roster/catalog.js';
import { isValidTeam } from '../roster/team.js';
export function createStageBattleSession(config) {
 if(!config?.stageId || !config.chapterId) throw new TypeError('Stage identity required');
 // The protected M0 core resolves at 90s. Other encounter durations are future scope.
 if(config.battleDuration!==90) throw new RangeError('Graybox template requires the protected 90-second limit');
 if(!isValidTeam(config.selectedTeam,config,config.rosterOwnership ?? prototypeOwnership()))throw new TypeError('Exactly three eligible owned characters required');
 const definitions={...runtimeCharacterDefinitions,...rosterCatalog};
 const team=(lineup,formation,prefix,teamId)=>lineup.map((id,index)=>{
  const definition=Object.hasOwn(definitions,id)?definitions[id]:null, spawn=formation[index];
  if(!definition || !spawn || !Number.isFinite(spawn.x) || !Number.isFinite(spawn.y)) throw new TypeError('Invalid stage lineup/formation');
  return createCharacterState(definition,{instanceId:`${prefix}${index+1}`,teamId,...spawn});
 });
 const session=createBattleSession({
  allies:team(config.selectedTeam,config.allySpawnFormation,'a','allies'),
  enemies:team(config.enemyLineup,config.enemySpawnFormation,'e','enemies'),
  characterDefinitions:definitions,abilityDefinitions:demoAbilityDefinitions,maxSeconds:config.battleDuration,
 });
 session.stageId=config.stageId;session.chapterId=config.chapterId;session.battlefieldId=config.battlefieldId;
 return session;
}
