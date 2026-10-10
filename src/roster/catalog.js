import {animationDescriptor} from '../assets/descriptors.js';
import {defaultCharacterAssets} from '../assets/manifest.js';
import {formalTierEffects} from './tierEffects.js';
import {formalAIProfiles} from './aiProfiles.js';
import {formalTierScalingProfiles} from './tierScalingProfiles.js';
import { createCharacterDefinition } from '../combat/character.js';
// Approved presentation only; all gameplay fields remain in the shared catalog.
const presentation={
 P1:{
  assets:Object.freeze({...defaultCharacterAssets,portraitSquare:'lushu.portrait',collectionArt:'lushu.identity',battleIdle:'lushu.battleIdle',battleMove:'lushu.battleMove'}),
  animationDescriptors:Object.freeze({battleIdle:animationDescriptor({
   source:'lushu.battleIdle',frames:[{x:0,y:0,width:96,height:128}],
   fps:2.5,loop:true,origin:[.5,691/724],scale:2,staticFrame:0,
  }),battleMove:animationDescriptor({
   source:'lushu.battleMove',frames:[0,96,192,288].map(x=>({x,y:0,width:96,height:128})),
   fps:18,loop:true,origin:[.5,691/724],scale:2,staticFrame:0,
  })}),
 },
 P2:{
  assets:Object.freeze({...defaultCharacterAssets,portraitSquare:'botuo.portrait',collectionArt:'botuo.identity',battleIdle:'botuo.battleIdle',battleMove:'botuo.battleMove'}),
  animationDescriptors:Object.freeze({battleIdle:animationDescriptor({
   source:'botuo.battleIdle',frames:[{x:0,y:0,width:160,height:160}],
   fps:2.5,loop:true,origin:[.5,158/160],scale:2,staticFrame:0,
  }),battleMove:animationDescriptor({
   source:'botuo.battleMove',frames:[0,160,320,480].map(x=>({x,y:0,width:160,height:160})),
   fps:12,loop:true,origin:[.5,158/160],scale:2,staticFrame:0,
  })}),
 },
 P3:{
  assets:Object.freeze({...defaultCharacterAssets,portraitSquare:'chiru.portrait',collectionArt:'chiru.identity',battleIdle:'chiru.battleIdle',battleMove:'chiru.battleMove'}),
  animationDescriptors:Object.freeze({battleIdle:animationDescriptor({
   source:'chiru.battleIdle',frames:[{x:0,y:0,width:160,height:160}],
   fps:2.5,loop:true,origin:[.5,1],scale:2,staticFrame:0,
  }),battleMove:animationDescriptor({
   source:'chiru.battleMove',frames:[0,160,320,480].map(x=>({x,y:0,width:160,height:160})),
   fps:10,loop:true,origin:[.5,1],scale:2,staticFrame:0,
  })}),
 },
};
const characters=[
 ['P1','鹿蜀','speed','attacker',245,18,5,2.05,1.15,'#477b9e','快速近戰切入與移位攻擊。','南山異獸，以迅捷與靈動著稱；戰場上善於快速切入與改變攻擊角度。','mobile_skirmisher'],
 ['P2','猼訑','power','tank',320,14,9,1.45,.85,'#9c5c42','前線承壓、自身減傷與近距範圍攻擊。','南山異獸，形象厚重而堅韌；在隊伍中擔任承受壓力、守護同伴的前線角色。','front_guard'],
 ['P3','赤鱬','blast','support',235,13,5,1.6,.95,'#7753a0','中距攻擊、低血量隊友治療與全隊回血。','水中異獸，以水流之力支援同伴；擅長在後方維持隊伍續戰能力。','rear_healer'],
 ['P4','九尾狐','blast','attacker',230,19,4,1.7,1.05,'#387665','中遠距爆發與目標區域傷害。','青丘代表性的異獸之一；在本作中定位為操使靈火、擅長遠距爆發的攻擊者。','ranged_burst'],
 ['P5','狌狌','power','attacker',285,17,7,1.85,1,'#916d32','近戰追擊與持續連擊。','具強烈獸性與追擊感的異獸；在本作中定位為持續貼身施壓的近戰鬥士。','aggressive_bruiser'],
];
export const rosterCatalog=Object.freeze(Object.fromEntries(characters.map(([id,name,type,role,maxHp,atk,def,moveSpeed,attackSpeed,color,combatSummary,lore,profile])=>[id,Object.freeze({
 ...createCharacterDefinition({id,name,type,role,stats:{maxHp,atk,def,moveSpeed,attackSpeed},abilities:{basic:`${id}.basic`,heavy:`${id}.heavy`,special:`${id}.special`,awakening:`${id}.awakening`,passives:[`${id}.passive`]}}),
 assets:defaultCharacterAssets,...presentation[id],tierEffects:formalTierEffects[id],tierScalingProfile:formalTierScalingProfiles[profile],portrait:Object.freeze({label:name,color}),combatSummary,lore,aiProfile:formalAIProfiles[profile],
 passiveMetadata:Object.freeze({definitionId:`${id}.passive`,implemented:false}),
})])));
export const prototypeOwnership=()=>({characterIds:Object.keys(rosterCatalog)});
