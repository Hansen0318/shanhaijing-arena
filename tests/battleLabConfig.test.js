import test from 'node:test';
import assert from 'node:assert/strict';
import {createLabConfig,LAB_SCENARIOS} from '../src/dev/battleLab/config.js';
import {BattleLabController} from '../src/dev/battleLab/controller.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {isValidTeam} from '../src/roster/team.js';
import {getTypeMultiplier} from '../src/combat/typeMultiplier.js';
test('six data-driven presets contain only formal roster references and immutable local setup',()=>{
 assert.deepEqual(LAB_SCENARIOS.map(x=>x.title),['NORMAL','LOW HP','HEAL TEST','AOE TEST','TYPE ADVANTAGE','MITIGATION TEST','DODGE TEST','TELEGRAPH TEST','HEALER RETREAT','RANGED KITE','TIER COMPARISON','STATUS / CONTROL TEST','PERSISTENT AREA TEST']);
 for(const preset of LAB_SCENARIOS){const c=createLabConfig({scenarioId:preset.id});assert.equal(c.kind,'battle-lab');assert.ok(Object.isFrozen(c));assert.ok(Object.isFrozen(c.allyTeam));assert.equal(c.battleDuration,90);for(const id of [...c.allyTeam,...c.enemyTeam])assert.ok(rosterCatalog[id]);assert.equal(c.reward,undefined);assert.equal(c.chapterId,undefined);}
});
test('Lab duplicate slots are independent and normal team uniqueness remains protected',()=>{
 const c=createLabConfig({allyTeam:['P3','P3','P3'],enemyTeam:['P2','P2','P2']});assert.deepEqual(c.allyTeam,['P3','P3','P3']);assert.equal(isValidTeam(c.allyTeam),false);assert.throws(()=>createLabConfig({enemyTeam:['missing','P1','P2']}));assert.throws(()=>createLabConfig({allyTeam:['P1']}));
});
test('HP options override Lab ally setup only; low/heal/AoE/mitigation are useful initial states',()=>{
 assert.deepEqual(createLabConfig({scenarioId:'low-hp'}).allyHpRatios,[.25,.25,.25]);const heal=createLabConfig({scenarioId:'heal'});assert.ok(heal.allyTeam.includes('P3'));assert.equal(heal.allyHpRatios[0],.25);assert.equal(heal.allyHpRatios[2],1);
 const aoe=createLabConfig({scenarioId:'aoe'});assert.ok(aoe.allyTeam.includes('P4'));for(const p of aoe.enemySpawnFormation)assert.ok(Math.hypot(p.x-aoe.enemySpawnFormation[0].x,p.y-aoe.enemySpawnFormation[0].y)<1.6);
 assert.equal(createLabConfig({scenarioId:'mitigation'}).allyTeam[1],'P2');
 for(const r of [1,.5,.25]){const c=createLabConfig({scenarioId:'heal',hpRatio:r});assert.deepEqual(c.allyHpRatios,[r,r,r]);assert.deepEqual(c.enemyHpRatios,[1,1,1]);}assert.throws(()=>createLabConfig({hpRatio:0}));
});
test('Type case pairs cover canonical advantage/disadvantage/same without multiplier edits',()=>{
 for(const [typeCase,m] of [['advantage',1.15],['disadvantage',.85],['same',1]]){const c=createLabConfig({scenarioId:'types',typeCase});for(let i=0;i<3;i++)assert.equal(getTypeMultiplier(rosterCatalog[c.allyTeam[i]].type,rosterCatalog[c.enemyTeam[i]].type),m);}
});
test('local Lab controller validates settings, retries immutable config and exits without persistence capability',()=>{
 const c=new BattleLabController();assert.equal(c.screen,'lab');assert.equal(c.setTeam('allies',0,'P5'),true);assert.equal(c.setTeam('enemies',2,'P4'),true);assert.equal(c.setTeam('allies',4,'P1'),false);assert.equal(c.setTeam('enemies',1,'missing'),false);
 c.setScenario('heal');c.setOption('skipCountdown',true);c.setOption('allSkillsReady',true);c.setOption('controlMode','ai');const config=c.startBattle();assert.equal(config.options.controlMode,'ai');assert.equal(config.options.skipCountdown,true);assert.equal(config.options.allSkillsReady,true);assert.equal(c.setScenario('aoe'),false);
 assert.equal(c.finishBattle('victory'),true);assert.equal(c.rewardResult,undefined);assert.equal(c.retryBattle(),config);assert.equal(c.restartBattle(),config);assert.equal(c.exitBattle(),true);assert.equal(c.screen,'lab');assert.equal(c.lastConfig,config);assert.equal(c.persistence,undefined);assert.equal(c.acquisition,undefined);
});
