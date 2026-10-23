import test from 'node:test';import assert from 'node:assert/strict';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {createLabConfig} from '../src/dev/battleLab/config.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
function fixture({tier='T0',side='ally',tactical=false}={}){
 const s=createLabBattleSession(createLabConfig({allyTeam:['P2','P1','P3'],enemyTeam:['P2','P4','P5'],allyTier:tier,enemyTier:tier,skipCountdown:true}),{tacticalEnabled:tactical,rng:()=>.99});
 for(const [i,a]of s.actors.entries()){Object.assign(a,{x:i<3?-9:9,y:1.8});s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}
 const a=s.actorById(side==='ally'?'a1':'e1'),enemy=s.actorById(side==='ally'?'e2':'a2');Object.assign(a,{x:0,y:0});return {s,a,enemy};
}
const view=(s,a)=>s.snapshot().passives.find(v=>v.instanceId===a.instanceId);
const step=(s,dt)=>{for(const a of s.actors)s.holdPlayerControl(a.instanceId);return s.step(dt);};
function hit(s,a,enemy){const before=a.hp;s.applyResolvedDamage(enemy,a,s.definitionForActor(enemy),s.definitionForActor(a),s.actorAbilityDefinitions.get(enemy.instanceId)[s.definitionForActor(enemy).abilities.basic],'basic','ai');return before-a.hp;}
test('real combat damage and actual HP reflect four Tier reductions on both teams',()=>{
 for(const tier of ['T0','T1','T2','T3'])for(const side of ['ally','enemy']){const f=fixture({tier,side}),control=fixture({tier,side});f.enemy.x=1;step(f.s,.01);assert.ok(view(f.s,f.a)?.active,'P2 independent passive must activate');const baseline=hit(control.s,control.a,control.enemy),actual=hit(f.s,f.a,f.enemy);near(actual/baseline,{T0:.8,T1:.7,T2:.6,T3:.5}[tier]);near(view(f.s,f.a).active.startTime,0);}
});
test('real condition branches, control, leaving area and independent CD/expiry',()=>{
 const {s,a,enemy}=fixture();step(s,.1);assert.equal(view(s,a).active,null);const ally=s.actorById('a2');Object.assign(ally,{x:2.4,y:0});Object.assign(enemy,{x:4.6,y:0});s.statuses.apply({sourceId:enemy.instanceId,targetId:a.instanceId,type:'control',magnitude:1,duration:.1},s.elapsedSeconds);step(s,.05);assert.equal(view(s,a).active,null);step(s,.1);assert.ok(view(s,a).active);const start=view(s,a).active.startTime;Object.assign(ally,{x:-9,y:1.8});Object.assign(enemy,{x:9,y:1.8});step(s,4);assert.equal(view(s,a).active,null);near(view(s,a).readyAt,start+8);enemy.x=1;enemy.y=0;step(s,4);assert.ok(view(s,a).active);near(view(s,a).active.startTime,start+8);
});
test('MAX preserves active skills, independent expiry and separate actor ownership',()=>{
 const {s,a,enemy}=fixture({tier:'T3'});enemy.x=1;step(s,.01);s.statuses.applyMitigation(a.instanceId,.3375,5,s.elapsedSeconds);s.statuses.apply({sourceId:a.instanceId,targetId:a.instanceId,key:'boyi.team',type:'mitigation',magnitude:.135,duration:3.75},s.elapsedSeconds);near(s.statuses.damageMultiplier(a.instanceId,s.elapsedSeconds),.5);step(s,4);near(s.statuses.damageMultiplier(a.instanceId,s.elapsedSeconds),.6625);assert.equal(view(s,s.actorById('e1')).active,null);
});
test('same-time lethal damage beats a newly ready spatial activation with no ghost status',()=>{
 for(const due of [0,8]){const {s,a,enemy}=fixture();enemy.x=1;if(due){step(s,7.99);assert.equal(view(s,a).active,null);}a.damage(a.hp-1);const definition={...s.actorAbilityDefinitions.get(enemy.instanceId)['P4.basic'],effect:{coefficient:100},range:20};s.pendingHits.push({actorId:enemy.instanceId,targetId:a.instanceId,due,definition,category:'basic',source:'ai',hitIndex:0,totalHits:1});step(s,due? .02:.01);assert.equal(a.hp,0);assert.equal(view(s,a),undefined);assert.equal(s.statuses.forActor(a.instanceId,s.elapsedSeconds).length,0);}
});
test('exact expiry damage has no stale mitigation and live control does not cancel acquired armor',()=>{
 const {s,a,enemy}=fixture();enemy.x=1;step(s,.01);s.statuses.apply({sourceId:enemy.instanceId,targetId:a.instanceId,type:'control',magnitude:1,duration:.2},s.elapsedSeconds);assert.ok(view(s,a).active);const definition={...s.actorAbilityDefinitions.get(enemy.instanceId)['P4.basic'],effect:{coefficient:1},range:20};const baseline=fixture(),expected=hit(baseline.s,baseline.a,baseline.enemy);s.pendingHits.push({actorId:enemy.instanceId,targetId:a.instanceId,due:4,definition,category:'basic',source:'ai',hitIndex:0,totalHits:1});const hp=a.hp;step(s,3.99);near(hp-a.hp,expected);assert.equal(view(s,a).active,null);
});
test('coarse/fine input partitions, KO/end and recreated session remain bounded and clean',()=>{
 const a=fixture(),b=fixture();a.enemy.x=b.enemy.x=1;step(a.s,8.2);for(let i=0;i<164;i++)step(b.s,.05);near(view(a.s,a.a).readyAt,view(b.s,b.a).readyAt);a.a.damage(a.a.hp);step(a.s,.01);assert.equal(view(a.s,a.a),undefined);b.s.clearTransientCombat();assert.equal(b.s.statuses.records.size,0);assert.deepEqual(b.s.snapshot().passives,[]);const fresh=fixture();assert.equal(view(fresh.s,fresh.a).readyAt,0);assert.equal(view(fresh.s,fresh.a).active,null);
});
test('renamed future character and passive references produce real HP mitigation without P2 runtime identity',()=>{
 const f=fixture(),base=f.s.characterDefinitions.P2,alias={...base,id:'future-guardian',name:'未來角色測試',abilities:{...base.abilities,passives:['future-guardian.shell']}},definitions={...f.s.characterDefinitions,'future-guardian':alias},abilityDefinitions={...f.s.abilityDefinitions,'future-guardian.shell':{...f.s.abilityDefinitions['P2.passive'],id:'future-guardian.shell',name:'獨立護甲測試'}};
 const actors=f.s.actors.map(a=>new a.constructor(a.instanceId===f.a.instanceId?alias:definitions[a.definitionId],{instanceId:a.instanceId,teamId:a.teamId,x:a.x,y:a.y}));
 const s=new f.s.constructor({allies:actors.slice(0,3),enemies:actors.slice(3),characterDefinitions:definitions,abilityDefinitions,rng:()=>.99,tacticalEnabled:false});
 for(const a of actors){s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}
 const a=s.actorById(f.a.instanceId),enemy=s.actorById(f.enemy.instanceId);enemy.x=1;enemy.y=0;step(s,.01);assert.equal(a.definitionId,'future-guardian');assert.equal(view(s,a).definitionId,'future-guardian.shell');const control=fixture(),baseline=hit(control.s,control.a,control.enemy);near(hit(s,a,enemy)/baseline,.8);
});
