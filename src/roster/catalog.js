import {windWarnings,stoneWarnings,waterWarnings} from '../assets/warningDescriptors.js';
import {chiruAwakeningAction} from '../assets/chiruAwakeningRuntime.js';
import {chiruSpecialAction} from '../assets/chiruSpecialRuntime.js';
import {chiruHeavyAction} from '../assets/chiruHeavyRuntime.js';
import {chiruBasicAction} from '../assets/chiruBasicRuntime.js';
import {formalAbilityDefinitions} from './abilities.js';
import {botuoHeavyAction} from '../assets/botuoHeavyRuntime.js';
import {botuoSpecialAction} from '../assets/botuoSpecialRuntime.js';
import {botuoAwakeningAction} from '../assets/botuoAwakeningRuntime.js';
import {repackAnimationRows,repackActionEffectRows} from '../assets/runtimePacking.js';
import {calibrateActionBody,calibrateAnimationBody} from '../assets/actionCalibration.js';
import {animationDescriptor as validateAnimationDescriptor,actionDescriptor as validateActionDescriptor} from '../assets/descriptors.js';
import {defaultCharacterAssets} from '../assets/manifest.js';
import {formalTierEffects} from './tierEffects.js';
import {formalAIProfiles} from './aiProfiles.js';
import {formalTierScalingProfiles} from './tierScalingProfiles.js';
import { createCharacterDefinition } from '../combat/character.js';
// Approved presentation only; all gameplay fields remain in the shared catalog.
// Lossless empty-row packing preserves pixel density, authored pivots and effect coordinates.
function packedAction(input,top,height){
 const a=input.animation,oldHeight=a.frames[0].height,oldCh=input.coordinateSize[1],shift=top*oldCh/oldHeight;
 return actionDescriptor({...input,animation:{...a,frames:a.frames.map(f=>({...f,height})),origin:[a.origin[0],(a.origin[1]*oldHeight-top)/height]},coordinateSize:[input.coordinateSize[0],oldCh*height/oldHeight],...Object.fromEntries(['blade','contact'].map(kind=>[kind,{...input[kind],offset:[input[kind].offset[0],input[kind].offset[1]-(input[kind].attach==='target'?0:shift)]}]))});
}
function packedAnimation(input,top,height){
 const a=input,oldHeight=a.frames[0].height;
 return animationDescriptor({...a,frames:a.frames.map(f=>({...f,height})),origin:[a.origin[0],(a.origin[1]*oldHeight-top)/height],scale:a.scale*Math.max(a.frames[0].width,height)/Math.max(a.frames[0].width,oldHeight)});
}
const actionDescriptor=input=>validateActionDescriptor(repackActionEffectRows(input));
const animationDescriptor=input=>validateAnimationDescriptor(repackAnimationRows(input));
const botuoIdleAnimation=animationDescriptor({source:'botuo.battleIdle',frames:[{x:0,y:0,width:160,height:160}],fps:2.5,loop:true,origin:[.5,158/160],scale:2,staticFrame:0});
const presentation={
 P1:{
  warningDescriptors:windWarnings,
  actionDescriptors:Object.freeze({basic:packedAction({
   animation:{source:'lushu.battleBasic',frames:[0,128,256,384].map(x=>({x,y:0,width:128,height:128})),duration:.4,loop:false,staticFrame:2,origin:[.5,.8369846715109296],scale:2.4731182795698925},
   frameDurationsMs:[120,60,100,120],impactFrame:2,coordinateSize:[384,384],
   blade:{assetKey:'lushu.basicBlade',offset:[176,65],size:[192,160],layer:4},
   contact:{assetKey:'lushu.basicContact',offset:[262,91],size:[169,113],layer:6},
  },10,101),heavy:packedAction({"animation":{"source":"lushu.battleHeavy","frames":[{"x":0,"y":0,"width":128,"height":128},{"x":128,"y":0,"width":128,"height":128},{"x":256,"y":0,"width":128,"height":128},{"x":384,"y":0,"width":128,"height":128}],"duration":0.6,"loop":false,"staticFrame":2,"origin":[0.5,0.8760471715109296],"scale":2.4731182795698925},"frameDurationsMs":[200,80,140,180],"coordinateSize":[256,256],"blade":{"assetKey":"lushu.heavyWind","offset":[42.5,-22.5],"size":[345,345],"layer":6,"holdAfterResolveMs":260},"contact":{"assetKey":"lushu.heavyImpact","offset":[-183.75,-197.5],"size":[367.5,245],"layer":7,"attach":"target","retainOnNextCast":true},"impactFrame":2},31,85),special:packedAction({"animation":{"source":"lushu.battleSpecial","frames":[{"x":0,"y":0,"width":80,"height":80},{"x":80,"y":0,"width":80,"height":80},{"x":160,"y":0,"width":80,"height":80},{"x":240,"y":0,"width":80,"height":80}],"duration":0.76,"loop":false,"staticFrame":2,"origin":[0.375,0.8133930272432843],"scale":2.9},"frameDurationsMs":[200,120,200,240],"impactFrame":2,"coordinateSize":[80,80],"blade":{"assetKey":"lushu.specialWind","offset":[-16.367816091954026,-28.568404563832274],"size":[128.73563218390805,107.27969348659005],"layer":6,"holdAfterResolveMs":280},"contact":{"assetKey":"lushu.specialImpact","offset":[-67.04980842911878,-66.85823754789273],"size":[134.09961685823757,93.86973180076629],"layer":7,"attach":"target","retainOnNextCast":true}},10,59),awakening:actionDescriptor({"kind":"staged","animation":{"source":"lushu.battleAwakening","frames":[{"x":0,"y":0,"width":128,"height":128},{"x":128,"y":0,"width":128,"height":128},{"x":256,"y":0,"width":128,"height":128},{"x":384,"y":0,"width":128,"height":128},{"x":512,"y":0,"width":128,"height":128}],"duration":0.61,"loop":false,"staticFrame":3,"origin":[0.5,0.93125],"scale":2.327272727272727},"coordinateSize":[320,320],"durationMs":610,"recoveryStartMs":470,"phaseFrames":[0,1,2,3,4],"frameDurationsMs":[80,55,145,190,140],"stages":[{"blade":{"assetKey":"lushu.awakeningASource","offset":[-155.25559105431307,61.26411075612356],"size":[520,329],"layer":6,"opacity":0.85},"contact":{"assetKey":"lushu.awakeningAImpact","offset":[-188.00312012480498,-235.94383775351014],"size":[308,248],"layer":7,"attach":"target"},"contactHoldMs":80,"startMs":80,"endMs":135},{"blade":{"assetKey":"lushu.awakeningBSource","offset":[-104.62043795620437,85.0],"size":[349,264],"layer":6,"opacity":0.85},"contact":{"assetKey":"lushu.awakeningBImpact","offset":[-208.4016393442623,-284.8360655737705],"size":[385,352],"layer":7,"attach":"target"},"contactHoldMs":90,"startMs":135,"endMs":280},{"blade":{"assetKey":"lushu.awakeningCSource","offset":[-363.97388059701495,-229.48134328358213],"size":[847,879],"layer":6,"opacity":0.85},"contact":{"assetKey":"lushu.awakeningCImpact","offset":[-348.125,-436.25],"size":[678,654],"layer":7,"attach":"target"},"contactHoldMs":130,"startMs":280,"endMs":470}]}) }),
  assets:Object.freeze({...defaultCharacterAssets,portraitSquare:'lushu.portrait',collectionArt:'lushu.identity',battleIdle:'lushu.battleIdle',battleMove:'lushu.battleMove',battleKo:'lushu.battleKo'}),
  animationDescriptors:Object.freeze({battleIdle:animationDescriptor({
   source:'lushu.battleIdle',frames:[{x:0,y:0,width:96,height:128}],
   fps:2.5,loop:true,origin:[.5,691/724],scale:2,staticFrame:0,
  }),battleMove:animationDescriptor({
   source:'lushu.battleMove',frames:[0,96,192,288].map(x=>({x,y:0,width:96,height:91})),
   fps:18,loop:true,origin:[.5,0.9578653390808087],scale:1.5,staticFrame:0,
  }),battleKo:animationDescriptor({
   source:'lushu.battleKo',frames:[{x:0,y:0,width:512,height:472}],
   duration:1,loop:false,origin:[.5,375/472],scale:2,staticFrame:0,
  })}),
 },
 P2:{
  warningDescriptors:stoneWarnings,
  actionDescriptors:Object.freeze({basic:actionDescriptor(calibrateActionBody({
   animation:{source:'botuo.basicPoses',frames:[0,158,316,474].map(x=>({x,y:0,width:158,height:143})),duration:.57,loop:false,staticFrame:2,origin:[35/158,142.2/143],scale:158/72},
   frameDurationsMs:[160,90,160,160],impactFrame:2,coordinateSize:[158,143],
   blade:{assetKey:'botuo.basicSource',offset:[47,-10],size:[146,114],layer:4,startMs:160,holdAfterResolveMs:200},
   contact:{assetKey:'botuo.basicContact',offset:[-52,-144.2],size:[105,115],layer:6,attach:'target',retainOnNextCast:true,durationMs:200},
  },{reference:botuoIdleAnimation,referenceSpan:25,actionSpan:20,referenceFoot:158,actionFoot:126})),heavy:actionDescriptor(botuoHeavyAction),special:actionDescriptor(botuoSpecialAction),awakening:actionDescriptor(botuoAwakeningAction)}),
  assets:Object.freeze({...defaultCharacterAssets,portraitSquare:'botuo.portrait',collectionArt:'botuo.identity',battleIdle:'botuo.battleIdle',battleMove:'botuo.battleMove',battleKo:'botuo.battleKo'}),
  animationDescriptors:Object.freeze({battleIdle:botuoIdleAnimation,battleMove:animationDescriptor(calibrateAnimationBody({
   // Approved Move and static body share the 160-unit authoring grid.
   // A posed skull length is not a whole-body size ruler.
   source:'botuo.battleMove',frames:[0,160,320,480].map(x=>({x,y:0,width:160,height:160})),
   fps:12,loop:true,origin:[.5,158/160],scale:2,staticFrame:0,
  },{reference:botuoIdleAnimation,referenceSpan:160,sourceSpan:160,referenceFoot:158,sourceFoot:156})),battleKo:animationDescriptor({
   source:'botuo.battleKo',frames:[{x:0,y:0,width:512,height:331}],
   duration:1,loop:false,origin:[.5,280/331],scale:2,staticFrame:0,
  })}),
 },
 P3:{
  warningDescriptors:waterWarnings,
  actionDescriptors:Object.freeze({basic:actionDescriptor(chiruBasicAction),heavy:actionDescriptor(chiruHeavyAction),special:actionDescriptor(chiruSpecialAction),awakening:actionDescriptor(chiruAwakeningAction)}),
  assets:Object.freeze({...defaultCharacterAssets,portraitSquare:'chiru.portrait',collectionArt:'chiru.identity',battleIdle:'chiru.battleIdle',battleMove:'chiru.battleMove',battleKo:'chiru.battleKo'}),
  animationDescriptors:Object.freeze({battleIdle:animationDescriptor({
   source:'chiru.battleIdle',frames:[{x:0,y:0,width:160,height:160}],
   fps:2.5,loop:true,origin:[.5,1],scale:2,staticFrame:0,
  }),battleMove:packedAnimation({
   source:'chiru.battleMove',frames:[0,160,320,480].map(x=>({x,y:0,width:160,height:160})),
   fps:10,loop:true,origin:[.5,1],scale:2.7,staticFrame:0,
  },42,118),battleKo:animationDescriptor({
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
  }),battleKo:packedAnimation({
   source:'jiuweihu.battleKo',frames:[{x:0,y:0,width:512,height:512}],
   duration:1,loop:false,origin:[.5,397/512],scale:2,staticFrame:0,
  },47,438)}),
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
 passiveMetadata:Object.freeze({definitionId:`${id}.passive`,implemented:formalAbilityDefinitions[`${id}.passive`]?.implemented===true}),
})])));
export const prototypeOwnership=()=>({characterIds:Object.keys(rosterCatalog)});
