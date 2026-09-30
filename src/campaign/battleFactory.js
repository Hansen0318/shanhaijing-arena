import { createCharacterState } from '../combat/character.js';
import { createBattleSession } from '../combat/battleSession.js';
import { runtimeCharacterDefinitions, demoAbilityDefinitions } from '../runtime/demoBattle.js';
export function createStageBattleSession(config) {
 if(!config?.stageId || !config.chapterId) throw new TypeError('Stage identity required');
 // The protected M0 core resolves at 90s. Other encounter durations are future scope.
 if(config.battleDuration!==90) throw new RangeError('Graybox template requires the protected 90-second limit');
 const team=(lineup,formation,prefix,teamId)=>lineup.map((id,index)=>{
  const definition=runtimeCharacterDefinitions[id], spawn=formation[index];
  if(!definition || !spawn || !Number.isFinite(spawn.x) || !Number.isFinite(spawn.y)) throw new TypeError('Invalid stage lineup/formation');
  return createCharacterState(definition,{instanceId:`${prefix}${index+1}`,teamId,...spawn});
 });
 const session=createBattleSession({
  allies:team(config.allyConfig.lineup,config.allySpawnFormation,'a','allies'),
  enemies:team(config.enemyLineup,config.enemySpawnFormation,'e','enemies'),
  characterDefinitions:runtimeCharacterDefinitions,abilityDefinitions:demoAbilityDefinitions,maxSeconds:config.battleDuration,
 });
 session.stageId=config.stageId;session.chapterId=config.chapterId;session.battlefieldId=config.battlefieldId;
 return session;
}
