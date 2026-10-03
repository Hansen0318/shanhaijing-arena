import { runtimeCharacterDefinitions } from '../runtime/demoDefinitions.js';
import { rosterCatalog } from '../roster/catalog.js';
// Single immutable lookup shared by encounter preview and battle instantiation.
export const encounterDefinitions=Object.freeze({...runtimeCharacterDefinitions,...rosterCatalog});
export function stageEnemyDefinitions(stage) {
 if(!Array.isArray(stage?.enemyLineup))throw new TypeError('Stage enemy lineup required');
 return stage.enemyLineup.map(id=>{
  if(!Object.hasOwn(encounterDefinitions,id))throw new TypeError('Unknown stage enemy definition');
  return encounterDefinitions[id];
 });
}
