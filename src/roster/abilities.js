import {createPassiveDefinition} from '../combat/passiveDefinition.js';
import { createAbilityDefinition } from '../combat/ability.js';
const categories=['basic','heavy','special','awakening'];
const names=[['踏角','逐風衝','迴蹄','南山奔襲','疾行'],['角擊','震嶺','守群','鎮岳','厚甲'],['水矢','湧浪','回瀾','潤澤','游息'],['靈火','狐焰','九焰散華','青丘幻火','惑心'],['裂爪','撼地','追獵','狂鬥','鬥性']];
const cooldowns=[[0,3,6,12],[0,4,8,14],[0,4,7,14],[0,3.5,7,13],[0,3,6,12]];
const coefficients=[[1,1.4,1.3,2.2],[1,1.3,0,1.7],[1,1.25,0,0],[1,1.5,1.35,2.5],[1,1.45,1.3,2.3]];
// [minimum, preferred, maximum] in shared arena units, immutable first-playtest seeds.
const ranges=[[[0,.65,1.25],[0,.9,3],[0,.85,2.6],[0,1,3]],[[0,.7,1.4],[0,.8,1.8],[0,0,2.2],[0,1,2.2]],[[.6,2.4,3.8],[.8,2.8,4.2],[0,0,20],[0,0,20]],[[.8,2.8,4.2],[1,3,4.6],[1,3.2,4.6],[1.2,3.5,5]],[[0,.65,1.25],[0,.8,1.8],[0,.8,3],[0,.8,2]]];
const descriptions=[['近距角蹄攻擊。','短距切入後重擊。','斜向移位後攻擊。','三段奔襲，總係數 2.20。','走位時觸發疾行，短暫提升移動速度。'],['近距角擊。','近距重擊；升至 T2 後可短暫震退敵人。','自身獲得 25% 減傷，持續 4 秒。','自身周圍範圍傷害，係數 1.70。','接敵時獲得厚甲，短暫降低受到的傷害。'],['射出水矢，攻擊前方一名敵人。','凝聚水流後釋放湧浪，重擊前方一名敵人。','治療生命比例最低的存活隊員（含自身），依 T0／T1／T2／T3 恢復其生命上限的 25%／30%／35%／40%。自 T1 起，目標生命不高於 35% 時治療量提高 10%。自 T2 起，與最近存活敵人保持 2～4.2 單位距離時提高 5%；治療加成最多 15%。冷卻依 Tier 為 7／6.44／5.88／5.04 秒。','治療全體存活隊員（含自身），依 T0／T1／T2／T3 各恢復生命上限的 16%／20%／24%／30%。自 T2 起，與最近存活敵人保持 2～4.2 單位距離時，治療量提高 5%。T3 另為 20 單位內存活隊員提供 10.8% 減傷，持續 2.5 秒；多種減傷取最高值。冷卻依 Tier 為 14／12.88／11.76／10.08 秒。不復活倒下隊員。','尚未開放。'],['中遠距靈火。','集中火焰重擊。','目標周圍範圍傷害，各目標係數 1.35。','遠距單體爆發，係數 2.50。','尚未開放。'],['近距爪擊。','近距重擊。','短距追擊後攻擊。','四段近戰攻擊，總係數 2.30。','尚未開放。']];
// First playtest timing only; coefficients, range, crit and cooldown stay unchanged.
const telegraphs={
 'P2.heavy':{telegraphMs:650,dangerRadius:.7},
 'P2.awakening':{telegraphMs:900,dangerRadius:2.2},
 'P3.heavy':{telegraphMs:350,projectileTravelMs:350,dangerShape:'lane',dangerRadius:.45},
 'P4.heavy':{telegraphMs:450,projectileTravelMs:200,dangerShape:'lane',dangerRadius:.45},
 'P4.special':{telegraphMs:900,dangerRadius:1.6},
 'P4.awakening':{telegraphMs:650,projectileTravelMs:250,dangerRadius:.7},
};
const entries=[];
for(let i=0;i<5;i++) {
 const characterId=`P${i+1}`;
 for(let j=0;j<4;j++) {
  const category=categories[j],id=`${characterId}.${category}`, [minRange,preferredRange,maxRange]=ranges[i][j];
  const effect={coefficient:coefficients[i][j]},ai={priority:[0,20,30,40][j]};let targetingRule='enemy';
  if(i===0&&j===1)effect.movement=Object.freeze({kind:'engage',distance:1.6,stopDistance:.65});
  if(i===0&&j===2)effect.movement=Object.freeze({kind:'reposition',distance:.65});
  if(i===4&&j===2)effect.movement=Object.freeze({kind:'engage',distance:1.8,stopDistance:.65});
  if((i===0||i===4)&&j===3){effect.hits=i===0?3:4;effect.hitInterval=.12;}
  if(i===1&&j===2){targetingRule='self';Object.assign(effect,{kind:'mitigation',reduction:.25,duration:4});}
  if(i===1&&j===3){effect.areaRadius=2.2;effect.areaCenter='caster';ai.minTargets=1;}
  if(i===2&&j===2){targetingRule='lowest_hp_ally';Object.assign(effect,{kind:'heal',maxHpFraction:.25,healBasis:'current-max-hp',tierMaxHpFractions:{T0:.25,T1:.30,T2:.35,T3:.40}});ai.hpThreshold=.65;}
  if(i===2&&j===3){targetingRule='team_ally';Object.assign(effect,{kind:'heal',maxHpFraction:.16,healBasis:'current-max-hp',tierMaxHpFractions:{T0:.16,T1:.20,T2:.24,T3:.30}});ai.hpThreshold=.8;ai.minTargets=2;}
  if(i===3&&j===2){effect.areaRadius=1.6;effect.areaCenter='target';ai.minTargets=2;}
  const crit=j===0?[true,.1,1.5]:j===1?[true,.2,1.75]:j===2&&effect.coefficient>0?[true,.15,1.75]:[false,0,1];
  entries.push([id,createAbilityDefinition({id,name:names[i][j],description:descriptions[i][j],category,...(i===2&&j>=2?{resolvePolicy:'reselect-allies'}:{}),...(i===1&&j===1?{presentation:{actionLifecycle:'existing-impact'}}:i===1&&j===2?{presentation:{actionLifecycle:'utility-observed'}}:i===1&&j===3?{presentation:{actionLifecycle:'area-observed'}}:{}),...(i===0&&j===3?{stagedAction:{segments:[{startMs:80,centerMs:110,endMs:135,coefficient:.4,overrun:.65},{startMs:135,centerMs:260,endMs:280,coefficient:.7,overrun:1.10},{startMs:280,centerMs:420,endMs:470,coefficient:1.1,overrun:.65}],recoveryMs:610,maxDistance:4,emptyDistance:1,sourceRadius:.30,targetRadius:.25}}:{}),...(i===2&&j===0?{resolveGeometry:{kind:'locked-line',halfWidth:.12}}:i===2&&j===1?{resolveGeometry:{kind:'locked-line',halfWidth:.45,travelMs:350}}:{}),windupMs:i===2&&j===1?350:i===2&&j===0?180:i===2&&j===2?320:i===2&&j===3?600:i===1&&j===0?250:i===0?(j===0?180:j===1?280:j===2?320:0):0,tierScaling:{aoe:effect.areaRadius!=null||telegraphs[id]?.dangerShape==='lane',mobility:effect.movement!=null,status:effect.kind==='mitigation',windup:telegraphs[id]!=null},telegraph:telegraphs[id]?{dodgeable:true,dangerShape:'circle',commitment:'locked',interruptible:false,...telegraphs[id]}:null,cooldown:cooldowns[i][j],minRange,preferredRange,maxRange,targetingRule,effect,ai,canCrit:crit[0],critChance:crit[1],critMultiplier:crit[2]})]);
 }
 const id=`${characterId}.passive`;entries.push([id,i===0?createPassiveDefinition({id,name:names[i][4],category:'passive',implemented:true,description:'2 秒內移動 1 單位，觸發疾行。移動速度依 T0／T1／T2／T3 提升 +35%／+50%／+65%／+80%，持續 3 秒，冷卻 6 秒。',trigger:{kind:'ordinary-distance',distance:1,windowSeconds:2},cooldownSeconds:6,tierMagnitudes:{T0:1.35,T1:1.5,T2:1.65,T3:1.8},effect:{kind:'status',type:'movement',magnitude:1.35,duration:3,data:{movementBonusCap:.95}},presentation:{label:names[i][4],style:'speed-streaks'}}):i===1?createPassiveDefinition({id,name:names[i][4],category:'passive',implemented:true,description:'接近敵人，或靠近正在接敵的隊友時，獲得厚甲。自身受到的傷害依 T0／T1／T2／T3 降低 20%／30%／40%／50%，持續 4 秒，冷卻 8 秒。同時有多種減傷效果時，取最高值。',trigger:{kind:'spatial-pressure',enemyRadius:2.2,allyRadius:2.4,allyEnemyRadius:2.2},cooldownSeconds:8,tierMagnitudes:{T0:.2,T1:.3,T2:.4,T3:.5},effect:{kind:'status',type:'mitigation',magnitude:.2,duration:4},presentation:{style:'guard-plates'}}):i===2?createPassiveDefinition({id,name:names[i][4],category:'passive',implemented:true,description:'與最近存活敵人保持至少 2 單位距離時，自動治療 4.2 單位內生命不高於 60%、生命比例最低的存活隊員（含自身）。依 T0／T1／T2／T3 恢復其生命上限的 8%／12%／16%／20%，冷卻 8 秒。實際恢復生命才進入冷卻；不復活隊員，不受主動治療加成影響。',trigger:{kind:'rear-support',enemyMinDistance:2,recipientRange:4.2,recipientMaxHpRatio:.6},cooldownSeconds:8,tierMagnitudes:{T0:.08,T1:.12,T2:.16,T3:.20},effect:{kind:'instant-heal',magnitude:.08},presentation:{style:'paired-fish',duration:.65,assetKeys:['chiru.passiveT0','chiru.passiveT1','chiru.passiveT2','chiru.passiveT3'],size:[180,144],offset:[0,0]}}):Object.freeze({id,name:names[i][4],category:'passive',description:descriptions[i][4],effect:Object.freeze({}),implemented:false})]);
}
export const formalAbilityDefinitions=Object.freeze(Object.fromEntries(entries));
