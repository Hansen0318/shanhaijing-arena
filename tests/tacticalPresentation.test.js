import test from 'node:test';import assert from 'node:assert/strict';
import {telegraphProjection,TelegraphPresenter} from '../src/runtime/telegraphs.js';import {arenaToStage} from '../src/runtime/arenaProjection.js';
import {LAB_SCENARIOS,createLabConfig} from '../src/dev/battleLab/config.js';import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
const threat={id:'t',sourceTeamId:'enemies',createdAtMs:0,impactAtMs:900,geometry:{shape:'circle',origin:{x:0,y:0},center:{x:2,y:0},radius:1.6}};
test('projection matches locked danger geometry and clock progression, paused clock is identical',()=>{
 const a=telegraphProjection(threat,450,arenaToStage);assert.deepEqual(a.center,arenaToStage({x:2,y:0}));assert.ok(a.radiusX>0&&a.radiusY>0);assert.equal(a.progress,.5);assert.deepEqual(telegraphProjection(threat,450,arenaToStage),a);assert.equal(telegraphProjection(threat,900,arenaToStage).progress,1);
});
test('presenter freezes on same clock and shutdown removes entire warning layer',()=>{
 const calls=[];const g=new Proxy({destroyed:false,destroy(){this.destroyed=true;}},{get(o,k){return k in o?o[k]:(...args)=>{calls.push([k,...args]);return g;};}});const p=new TelegraphPresenter({add:{graphics:()=>g}},arenaToStage);
 calls.length=0;p.render([threat],450);const first=JSON.stringify(calls);calls.length=0;p.render([threat],450);assert.equal(JSON.stringify(calls),first);p.destroy();assert.equal(g.destroyed,true);
});
test('four tactical Lab presets use formal data, useful initial conditions and independent isolated sessions',()=>{
 for(const id of ['dodge','telegraph','healer-retreat','ranged-kite']){
  assert.ok(LAB_SCENARIOS.some(s=>s.id===id));const c=createLabConfig({scenarioId:id}),s=createLabBattleSession(c);assert.equal(s.tacticalEnabled,true);assert.equal(c.reward,undefined);assert.equal(s.chapterId,undefined);
 }
 const h=createLabBattleSession(createLabConfig({scenarioId:'healer-retreat'}));assert.ok(h.allies[2].hp/h.allies[2].maxHp<.32);
 const r=createLabBattleSession(createLabConfig({scenarioId:'ranged-kite'}));assert.ok(Math.hypot(r.allies[1].x-r.enemies[0].x,r.allies[1].y-r.enemies[0].y)<2.4);
});
