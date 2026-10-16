import {animationDescriptor,actionDescriptor} from '../assets/descriptors.js';
import {defaultCharacterAssets} from '../assets/manifest.js';
import {formalTierEffects} from './tierEffects.js';
import {formalAIProfiles} from './aiProfiles.js';
import {formalTierScalingProfiles} from './tierScalingProfiles.js';
import { createCharacterDefinition } from '../combat/character.js';
// Approved presentation only; all gameplay fields remain in the shared catalog.
const presentation={
 P1:{
  actionDescriptors:Object.freeze({basic:actionDescriptor({
   animation:{source:'lushu.battleBasic',frames:[0,128,256,384].map(x=>({x,y:0,width:128,height:128})),duration:.4,loop:false,staticFrame:2,origin:[.5,.8369846715109296],scale:2.4731182795698925},
   frameDurationsMs:[120,60,100,120],impactFrame:2,coordinateSize:[384,384],
   blade:{assetKey:'lushu.basicBlade',offset:[176,65],size:[192,160],layer:4},
   contact:{assetKey:'lushu.basicContact',offset:[262,91],size:[169,113],layer:6},
  }),heavy:actionDescriptor({"animation":{"source":"lushu.battleHeavy","frames":[{"x":0,"y":0,"width":128,"height":128},{"x":128,"y":0,"width":128,"height":128},{"x":256,"y":0,"width":128,"height":128},{"x":384,"y":0,"width":128,"height":128}],"duration":0.6,"loop":false,"staticFrame":2,"origin":[0.5,0.8760471715109296],"scale":2.4731182795698925},"frameDurationsMs":[200,80,140,180],"coordinateSize":[256,256],"blade":{"assetKey":"lushu.heavyWind","offset":[100,35],"size":[230,230],"layer":6},"contact":{"assetKey":"lushu.heavyImpact","offset":[-105,-145],"size":[210,140],"layer":7,"attach":"target"},"impactFrame":2}) }),
  assets:Object.freeze({...defaultCharacterAssets,portraitSquare:'lushu.portrait',collectionArt:'lushu.identity',battleIdle:'lushu.battleIdle',battleMove:'lushu.battleMove',battleKo:'lushu.battleKo'}),
  animationDescriptors:Object.freeze({battleIdle:animationDescriptor({
   source:'lushu.battleIdle',frames:[{x:0,y:0,width:96,height:128}],
   fps:2.5,loop:true,origin:[.5,691/724],scale:2,staticFrame:0,
  }),battleMove:animationDescriptor({
   source:'lushu.battleMove',frames:[0,96,192,288].map(x=>({x,y:0,width:96,height:128})),
   fps:18,loop:true,origin:[.5,691/724],scale:2,staticFrame:0,
  }),battleKo:animationDescriptor({
   source:'lushu.battleKo',frames:[{x:0,y:0,width:512,height:512}],
   duration:1,loop:false,origin:[.5,385/512],scale:2,staticFrame:0,
  })}),
 },
 P2:{
  assets:Object.freeze({...defaultCharacterAssets,portraitSquare:'botuo.portrait',collectionArt:'botuo.identity',battleIdle:'botuo.battleIdle',battleMove:'botuo.battleMove',battleKo:'botuo.battleKo'}),
  animationDescriptors:Object.freeze({battleIdle:animationDescriptor({
   source:'botuo.battleIdle',frames:[{x:0,y:0,width:160,height:160}],
   fps:2.5,loop:true,origin:[.5,158/160],scale:2,staticFrame:0,
  }),battleMove:animationDescriptor({
   source:'botuo.battleMove',frames:[0,160,320,480].map(x=>({x,y:0,width:160,height:160})),
   fps:12,loop:true,origin:[.5,158/160],scale:2,staticFrame:0,
  }),battleKo:animationDescriptor({
   source:'botuo.battleKo',frames:[{x:0,y:0,width:512,height:331}],
   duration:1,loop:false,origin:[.5,280/331],scale:2,staticFrame:0,
  })}),
 },
 P3:{
  assets:Object.freeze({...defaultCharacterAssets,portraitSquare:'chiru.portrait',collectionArt:'chiru.identity',battleIdle:'chiru.battleIdle',battleMove:'chiru.battleMove',battleKo:'chiru.battleKo'}),
  animationDescriptors:Object.freeze({battleIdle:animationDescriptor({
   source:'chiru.battleIdle',frames:[{x:0,y:0,width:160,height:160}],
   fps:2.5,loop:true,origin:[.5,1],scale:2,staticFrame:0,
  }),battleMove:animationDescriptor({
   source:'chiru.battleMove',frames:[0,160,320,480].map(x=>({x,y:0,width:160,height:160})),
   fps:10,loop:true,origin:[.5,1],scale:2.7,staticFrame:0,
  }),battleKo:animationDescriptor({
   source:'chiru.battleKo',frames:[{x:0,y:0,width:1254,height:1254}],
   duration:1,loop:false,origin:[.5,980/1254],scale:2,staticFrame:0,
  })}),
 },
 P4:{
  assets:Object.freeze({...defaultCharacterAssets,portraitSquare:'jiuweihu.portrait',collectionArt:'jiuweihu.identity',battleIdle:'jiuweihu.battleIdle',battleMove:'jiuweihu.battleMove',battleKo:'jiuweihu.battleKo'}),
  animationDescriptors:Object.freeze({battleIdle:animationDescriptor({
   source:'jiuweihu.battleIdle',frames:[{x:0,y:0,width:160,height:160}],
   duration:1,loop:false,origin:[.5,151/160],scale:2,staticFrame:0,
  }),battleMove:animationDescriptor({
   source:'jiuweihu.battleMove',frames:[0,160,320,480].map(x=>({x,y:0,width:160,height:160})),
   fps:10,loop:true,origin:[.5,151/160],scale:2,staticFrame:0,
  }),battleKo:animationDescriptor({
   source:'jiuweihu.battleKo',frames:[{x:0,y:0,width:512,height:512}],
   duration:1,loop:false,origin:[.5,397/512],scale:2,staticFrame:0,
  })}),
 },
 P5:{
  assets:Object.freeze({...defaultCharacterAssets,portraitSquare:'xingxing.portrait',collectionArt:'xingxing.identity',battleIdle:'xingxing.battleIdle',battleMove:'xingxing.battleMove',battleKo:'xingxing.battleKo'}),
  animationDescriptors:Object.freeze({battleIdle:animationDescriptor({
   source:'xingxing.battleIdle',frames:[{x:0,y:0,width:160,height:160}],
   duration:1,loop:false,origin:[.5,148/160],scale:2,staticFrame:0,
  }),battleMove:animationDescriptor({
   source:'xingxing.battleMove',frames:[[0,0],[560,0],[0,440],[560,440]].map(([x,y])=>({x,y,width:560,height:440})),
   fps:10,loop:true,origin:[.5,426/440],scale:2.25,staticFrame:0,
  }),battleKo:animationDescriptor({
   source:'xingxing.battleKo',frames:[{x:0,y:0,width:480,height:288}],
   duration:1,loop:false,origin:[236/480,279/288],scale:1.875,staticFrame:0,
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
