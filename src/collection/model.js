import { rosterCatalog } from '../roster/catalog.js';
import { characterProgress } from '../acquisition/tier.js';
import { runtimeAbilityDefinitions } from '../runtime/demoBattle.js';
export function collectionEntries(acquisition,{filter='all',catalog=rosterCatalog,ownership=null}={}) {
 const owned=new Set(ownership?.characterIds ?? acquisition.ownedCharacterIds);
 return Object.values(catalog).filter(d=>filter==='all'||d.type===filter).map(definition=>{
  const shards=acquisition.shardsByCharacterId[definition.id] ?? 0, isOwned=owned.has(definition.id);
  const progress=characterProgress(acquisition,definition.id);
  return {...progress,definition,owned:isOwned,shards,tier:isOwned?(progress.tier ?? 'T1'):null,shardLabel:progress.progressLabel};
 });
}
const title=value=>value.charAt(0).toUpperCase()+value.slice(1);
export function characterDetail(definition,abilityCatalog=runtimeAbilityDefinitions) {
 const refs=Object.entries(definition.abilities).filter(([category])=>category!=='passives');
 for(const id of definition.abilities.passives ?? [])refs.push(['passive',id]);
 return {name:definition.name,type:definition.type,role:definition.role,lore:typeof definition.lore==='string'?definition.lore:null,
  abilities:refs.filter(([,id])=>typeof id==='string').map(([category,id])=>{
   const ability=abilityCatalog[id];
   return {id,name:ability?.name ?? title(id),category:ability?.category ?? category,description:typeof ability?.description==='string'?ability.description:null};
  })};
}
