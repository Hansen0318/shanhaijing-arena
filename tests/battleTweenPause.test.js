import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
// Exercise Phaser's real wall-clock bookkeeping and Tween implementation.
const TweenManager = require('../node_modules/phaser/src/tweens/TweenManager.js');
const EventEmitter = require('eventemitter3');
const source = readFileSync(new URL('../src/runtime/ArenaScene.js', import.meta.url), 'utf8')
  .replace(/^import .*;\n/gm, '').replace('export class ArenaScene', 'class ArenaScene');
const ArenaScene = vm.runInNewContext(`${source}\nArenaScene`, {
  Phaser: { Scene: class {} }, ARENA_STAGE: { width: 1120, height: 540 }, window: {},
});

test('Resume preserves an active VFX tween across a 400ms pause and advances only the next frame', () => {
  let now = 1000;
  const originalNow = Date.now;
  Date.now = () => now;
  try {
    const scene = new ArenaScene();
    scene.session = { result: () => 'running' };
    scene.paused = false;
    scene.time = { paused: false };
    scene.releaseJoystick = () => {};
    scene.refreshSkillButtons = () => {};
    scene.tweens = new TweenManager({ sys: { events: new EventEmitter() } });
    scene.tweens.start();
    const effect = { alpha: 1 };
    let completed = 0;
    scene.tweens.add({ targets: effect, alpha: 0, duration: 320,
      onComplete: () => { completed++; } });
    now += 16;
    scene.tweens.update();
    now += 16;
    scene.tweens.update();
    const frozenAlpha = effect.alpha;
    assert.ok(frozenAlpha > 0 && frozenAlpha < 1);

    scene.togglePause();
    now += 400;
    scene.tweens.update();
    assert.equal(effect.alpha, frozenAlpha);
    scene.togglePause();
    assert.equal(effect.alpha, frozenAlpha);
    now += 16;
    scene.tweens.update();
    assert.equal(completed, 0, 'paused wall time must not complete the effect on Resume');
    assert.ok(Math.abs(effect.alpha - (frozenAlpha - 16 / 320)) < 1e-10,
      'the resumed tween must advance by only the following 16ms frame');
  } finally {
    Date.now = originalNow;
  }
});

test('floating damage tween freezes with Pause/orientation clock and cleans up',async()=>{
 const {DamageNumbers}=await import('../src/runtime/damageNumbers.js');
 let now=1000;const originalNow=Date.now;Date.now=()=>now;
 try {
  const scene=new ArenaScene();scene.session={result:()=> 'running'};scene.paused=false;scene.time={paused:false};scene.releaseJoystick=()=>{};scene.refreshSkillButtons=()=>{};
  scene.tweens=new TweenManager({sys:{events:new EventEmitter()}});scene.tweens.start();let label;
  scene.add={text(x,y,text){label={x,y,alpha:1,text,destroyed:false,setOrigin(){return this;},setDepth(){return this;},destroy(){this.destroyed=true;}};return label;}};
  const numbers=new DamageNumbers(scene,p=>p);numbers.render([{targetId:'e1',amount:10,position:{x:100,y:100}}]);
  for(let i=0;i<3;i++){now+=16;scene.tweens.update();}const frozen={y:label.y,alpha:label.alpha};scene.togglePause();now+=1200;scene.tweens.update();assert.deepEqual({y:label.y,alpha:label.alpha},frozen);assert.equal(label.destroyed,false);
  scene.togglePause();now+=16;scene.tweens.update();assert.ok(label.y<frozen.y);assert.equal(label.destroyed,false);numbers.destroy();assert.equal(label.destroyed,true);assert.equal(numbers.active.size,0);
 }finally{Date.now=originalNow;}
});
