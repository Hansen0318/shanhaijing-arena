import { createAbilityDefinition } from '../combat/ability.js';
const categories=['basic','heavy','special','awakening'];
const names=[['踏角','逐風衝','迴蹄','南山奔襲','疾行'],['角擊','震嶺','守群','鎮岳','厚甲'],['水矢','湧浪','回瀾','潤澤','游息'],['靈火','狐焰','九焰散華','青丘幻火','惑心'],['裂爪','撼地','追獵','狂鬥','鬥性']];
const cooldowns=[[0,3,6,12],[0,4,8,14],[0,4,7,14],[0,3.5,7,13],[0,3,6,12]];
const coefficients=[[1,1.4,1.3,2.2],[1,1.3,0,1.7],[1,1.25,0,0],[1,1.5,1.35,2.5],[1,1.45,1.3,2.3]];
// [minimum, preferred, maximum] in shared arena units, immutable first-playtest seeds.
const ranges=[[[0,.65,1.25],[0,.9,3],[0,.85,2.6],[0,1,3]],[[0,.7,1.4],[0,.8,1.8],[0,0,2.2],[0,1,2.2]],[[.6,2.4,3.8],[.8,2.8,4.2],[0,0,20],[0,0,20]],[[.8,2.8,4.2],[1,3,4.6],[1,3.2,4.6],[1.2,3.5,5]],[[0,.65,1.25],[0,.8,1.8],[0,.8,3],[0,.8,2]]];
const descriptions=[['近距角蹄攻擊。','短距切入後重擊。','斜向移位後攻擊。','三段奔襲，總係數 2.20。','疾行定位由 T0 移動速度與切入招式呈現；進階條件效果保留設計。'],['近距角擊。','近距重擊；控制效果保留後續。','自身獲得 25% 減傷，持續 4 秒。','自身周圍範圍傷害，係數 1.70。','厚甲定位由 T0 HP／DEF 呈現；進階條件效果保留設計。'],['中距水矢。','中距水流重擊。','治療最低 HP 比例存活隊友，恢復其最大 HP 的 25%。','全體存活隊友各恢復最大 HP 的 16%；不復活。','游息定位由支援距離與回血條件呈現；進階條件效果保留設計。'],['中遠距靈火。','集中火焰重擊。','目標周圍範圍傷害，各目標係數 1.35。','遠距單體爆發，係數 2.50。','惑心條件效果保留設計，尚未啟用額外戰鬥加成。'],['近距爪擊。','近距重擊。','短距追擊後攻擊。','四段近戰攻擊，總係數 2.30。','鬥性定位由追擊與連擊呈現；進階條件效果保留設計。']];
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
  if(i===2&&j===2){targetingRule='lowest_hp_ally';Object.assign(effect,{kind:'heal',maxHpFraction:.25});ai.hpThreshold=.65;}
  if(i===2&&j===3){targetingRule='team_ally';Object.assign(effect,{kind:'heal',maxHpFraction:.16});ai.hpThreshold=.8;ai.minTargets=2;}
  if(i===3&&j===2){effect.areaRadius=1.6;effect.areaCenter='target';ai.minTargets=2;}
  const crit=j===0?[true,.1,1.5]:j===1?[true,.2,1.75]:j===2&&effect.coefficient>0?[true,.15,1.75]:[false,0,1];
  entries.push([id,createAbilityDefinition({id,name:names[i][j],description:descriptions[i][j],category,tierScaling:{aoe:effect.areaRadius!=null||telegraphs[id]?.dangerShape==='lane',mobility:effect.movement!=null,status:effect.kind==='mitigation',windup:telegraphs[id]!=null},telegraph:telegraphs[id]?{dodgeable:true,dangerShape:'circle',commitment:'locked',interruptible:false,...telegraphs[id]}:null,cooldown:cooldowns[i][j],minRange,preferredRange,maxRange,targetingRule,effect,ai,canCrit:crit[0],critChance:crit[1],critMultiplier:crit[2]})]);
 }
 const id=`${characterId}.passive`;entries.push([id,Object.freeze({id,name:names[i][4],category:'passive',description:descriptions[i][4],effect:Object.freeze({}),implemented:false})]);
}
export const formalAbilityDefinitions=Object.freeze(Object.fromEntries(entries));
