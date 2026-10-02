import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createDemoBattleSession } from '../src/runtime/demoBattle.js';
import { PreBattleGate } from '../src/runtime/preBattleGate.js';
import { BattleInterruption } from '../src/runtime/battleInterruption.js';
// Only the GPU-bound Phaser base is substituted; simulation and scene methods are real.
const source=readFileSync(new URL('../src/runtime/ArenaScene.js',import.meta.url),'utf8')
 .replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene');
const ArenaScene=vm.runInNewContext(`${source}\nArenaScene`,{Phaser:{Scene:class {}},ARENA_STAGE:{width:1120,height:540},PreBattleGate,window:{}});
function round(started=true) {
 const s=new ArenaScene();s.session=createDemoBattleSession();s.paused=false;
 s.battleStarted=started;s.preBattleGate=new PreBattleGate(started?0:3);
 s.accumulatorSeconds=0;s.selectedId='a2';s.joystickPointerId=null;s.joystickVector={x:0,y:0};
 s.joystickKnob={setPosition(){}};s.time={paused:false};
 s.countdownText={setText(){},setVisible(){}};s.actorViews=new Map();
 s.refreshHud=()=>{};
 s.tweens={scale:1,getGlobalTimeScale(){return this.scale;},setGlobalTimeScale(v){this.scale=v;},tick(){}};
 s.applyFrame=()=>{};s.renderCastEvents=()=>{};s.applyKoFixtureIfNeeded=()=>{};s.refreshSkillButtons=()=>{};
 return s;
}
test('Pause freezes actual elapsed time, HP, all actor positions and ability cooldowns; Resume advances',()=>{
 const s=round();s.advanceBattle(.25);s.session.usePlayerAbility('a2','heavy');
 s.paused=true;const frozen=s.session.snapshot();
 const abilities=structuredClone(s.session.actorById('a2').abilityState);
 for(let i=0;i<40;i++) s.update(0,250);
 assert.deepEqual(s.session.snapshot(),frozen);
 assert.deepEqual(s.session.actorById('a2').abilityState,abilities);
 s.paused=false;s.update(0,100);
 assert.ok(s.session.elapsedSeconds>frozen.elapsedSeconds);
});
test('Pause during countdown retains the remaining 3-second gate',()=>{
 const s=round(false);s.paused=true;
 for(let i=0;i<20;i++)s.update(0,250);
 assert.equal(s.preBattleGate.remaining,3);assert.equal(s.battleStarted,false);
 s.paused=false;s.update(0,250);assert.equal(s.preBattleGate.remaining,2.75);
});
test('toggle Pause clears held player movement, freezes presentation clock and preserves accumulator',()=>{
 const s=round();s.session.holdPlayerControl('a2');s.session.setPlayerMovement('a2',{x:1,y:0});
 s.joystickPointerId=2;s.joystickVector={x:1,y:0};s.accumulatorSeconds=.02;
 assert.equal(s.togglePause(),true);assert.equal(s.time.paused,true);
 assert.equal(s.joystickPointerId,null);assert.deepEqual({...s.joystickVector},{x:0,y:0});
 assert.equal(s.accumulatorSeconds,.02);
 assert.equal(s.togglePause(),false);assert.equal(s.time.paused,false);
 s.update(0,50);assert.equal(s.session.elapsedSeconds,.05);
});
test('paused portrait input cannot change selection',()=>{
 const s=round();s.paused=true;
 assert.equal(s.selectAlly('a1',s.session.snapshot()),false);assert.equal(s.selectedId,'a2');
});
test('orientation and Exit modal freeze real scene countdown, battle, cooldown and VFX clock',()=>{
 const s=round(),b=new BattleInterruption();b.attach(s);
 s.session.usePlayerAbility('a2','heavy');s.accumulatorSeconds=.02;
 b.setPortrait(true);const frozen=s.session.snapshot();const slot=structuredClone(s.session.actorById('a2').abilityState);
 for(let i=0;i<20;i++)s.update(0,100);
 assert.deepEqual(s.session.snapshot(),frozen);assert.deepEqual(s.session.actorById('a2').abilityState,slot);
 assert.equal(s.time.paused,true);assert.equal(s.tweens.scale,0);
 b.setPortrait(false);b.openExit();for(let i=0;i<20;i++)s.update(0,100);
 assert.deepEqual(s.session.snapshot(),frozen);assert.equal(s.time.paused,true);
 b.continueExit();assert.equal(s.time.paused,false);assert.equal(s.tweens.scale,1);
 s.update(0,100);assert.equal(s.session.elapsedSeconds,.1);
});
test('formal mitigation expiry and pending multi-hit freeze in actual paused scene; fresh Retry clears both',async()=>{
 const {createStageBattleSession}=await import('../src/campaign/battleFactory.js');const {findStage}=await import('../src/campaign/data.js');
 const config={...findStage('1-1'),selectedTeam:['P1','P2','P3'],enemyLineup:['P1','P2','P3']};
 const fresh=()=>createStageBattleSession(config,{rng:()=>.99});const s=round();s.session=fresh();
 s.session.enemies.forEach(a=>{a.x=1;a.y=0;});s.session.allies.forEach(a=>{a.x=0;a.y=0;});
 s.session.usePlayerAbility('a2','special');s.session.usePlayerAbility('a1','awakening');
 const remaining=s.session.pendingHits.length;s.paused=true;
 for(let i=0;i<40;i++)s.update(0,250);
 assert.equal(s.session.elapsedSeconds,0);assert.equal(s.session.statuses.damageMultiplier('a2',0),.75);assert.equal(s.session.pendingHits.length,remaining);
 s.session=fresh();assert.equal(s.session.pendingHits.length,0);assert.equal(s.session.statuses.mitigation.size,0);
});
