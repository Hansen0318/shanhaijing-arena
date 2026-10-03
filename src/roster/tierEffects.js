import {createTierEffect,freezeEffectData} from '../combat/tierEffects.js';
const tiers=(T1,T2,T3)=>freezeEffectData(Object.fromEntries(Object.entries({T1,T2,T3}).map(([t,e])=>[t,e.map(createTierEffect)])));
const status=(id,name,category,type,magnitude,duration,extra={})=>({id,name,kind:'status',category,status:{type,magnitude,duration,tierScaling:{duration:true,strength:['mitigation','incoming'].includes(type)},...(extra.data?{data:extra.data}:{})},...extra});
const protection=(id,name,category,recipient,magnitude,duration,radius)=>({id,name,kind:'protect',category,recipient,radius,status:{type:'mitigation',magnitude,duration,tierScaling:{duration:true,strength:true}}});
export const formalTierEffects=freezeEffectData({
 P1:tiers([
  {id:'lushu.reach',name:'疾踏',kind:'range',category:'heavy',magnitude:1.1},
  {id:'lushu.approach',name:'疾踏',kind:'approach',category:'heavy',magnitude:1.1},
 ],[
  status('lushu.mobility','回身','special','movement',1.1,.8),
  status('lushu.avoidance','回身','special','avoidance',1,.25,{data:{dodgeableOnly:true}}),
 ],[
  {id:'lushu.final-angle',name:'逐影',kind:'damage',category:'awakening',magnitude:1.12,lastHit:true,condition:{kind:'changed_angle',minDistance:.35,minAngle:.2,within:4}},
 ]),
 P2:tiers([
  protection('boyi.ally','護群','special','threatened',.15,4,2.4),
 ],[
  status('boyi.stagger','震退','heavy','control',1,.35,{trigger:'hit',recipient:'target'}),
 ],[
  protection('boyi.team','鎮守','awakening','team',.1,3,2.4),
 ]),
 P3:tiers([
  {id:'chiru.low-heal',name:'回流',kind:'heal',category:'special',magnitude:1.1,condition:{kind:'low_hp',threshold:.35}},
 ],[
  {id:'chiru.rear-heal',name:'游息',kind:'heal',magnitude:1.05,condition:{kind:'rear_range',min:2,max:4.2}},
 ],[
  {...protection('chiru.support','澤被','awakening','team',.08,2,20),trigger:'cast'},
 ]),
 P4:tiers([
  {id:'fox.coverage',name:'狐火增幅',kind:'range',category:'special',magnitude:1.1},
 ],[
  {id:'fox.pressure',name:'惑心追獵',kind:'damage',magnitude:1.08,condition:{kind:'target_pressure',threshold:.35,radius:1.4}},
 ],[
  {id:'fox.residual',name:'青丘餘焰',kind:'area',category:'awakening',trigger:'hit',area:{tierScaling:{aoe:true},radius:.9,duration:3,interval:.5,eligibility:'enemy',behavior:'periodic',coefficient:.12}},
 ]),
 P5:tiers([
  status('xingxing.pressure','追勢','special','movement',1.12,1.2),
 ],[
  status('xingxing.stagger','撼勢','heavy','control',1,.3,{trigger:'hit',recipient:'target'}),
 ],[
  status('xingxing.commitment','狂鬥不退','awakening','mitigation',.12,.6,{trigger:'cast'}),
  status('xingxing.steadfast','狂鬥不退','awakening','steadfast',1,.6,{trigger:'cast'}),
 ]),
});
