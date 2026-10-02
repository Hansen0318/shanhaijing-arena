import { rosterCatalog } from '../roster/catalog.js';
const characterName=id=>rosterCatalog[id]?.name ?? id;
import { normalizeReward } from './model.js';
import { characterProgress } from './tier.js';
export function stageRewardRows(stage,acquisition) {
 const claimed=acquisition?.claimedStageIds?.includes(stage.stageId);
 return normalizeReward(stage.reward).map(item=>({...item,label:`${characterName(item.characterId)} Shard ×${item.quantity}`,
  status:item.repeat==='repeatable'?'REPEATABLE':claimed?'CLAIMED':'FIRST CLEAR'}));
}
export function resultRewardLines(transaction) {
 if(!transaction?.grantedItems?.length)return [];
 const totals=new Map();
 for(const item of normalizeReward({items:transaction.grantedItems}))totals.set(item.characterId,(totals.get(item.characterId)??0)+item.quantity);
 return [...totals].map(([id,quantity])=>`${characterName(id)} Shard +${quantity}   ${characterProgress(transaction.state,id).progressLabel}${transaction.unlockedCharacterIds.includes(id)?`   ${characterName(id)} UNLOCKED`:''}`);
}
