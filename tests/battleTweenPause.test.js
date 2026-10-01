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

test('normal and critical number/label/pop freeze with Pause/orientation clock and clean up',async()=>{
 const {DamageNumbers}=await import('../src/runtime/damageNumbers.js');
 let now=1000;const originalNow=Date.now;Date.now=()=>now;
 try {
  const scene=new ArenaScene();scene.session={result:()=> 'running'};scene.paused=false;scene.time={paused:false};scene.releaseJoystick=()=>{};scene.refreshSkillButtons=()=>{};
  scene.tweens=new TweenManager({sys:{events:new EventEmitter()}});scene.tweens.start();const texts=[];
  scene.add={text(x,y,text){const label={x,y,alpha:1,scaleX:1,scaleY:1,text,destroyed:false,setOrigin(){return this;},setDepth(){return this;},destroy(){this.destroyed=true;}};texts.push(label);return label;}};
  const numbers=new DamageNumbers(scene,p=>p);numbers.render([{targetId:'e1',amount:10,category:'basic',critical:false,position:{x:100,y:100}},{targetId:'e2',amount:25,category:'heavy',critical:true,position:{x:150,y:100}}]);
  assert.equal(texts.length,3);
  const states=()=>texts.map(t=>({y:t.y,alpha:t.alpha,scaleX:t.scaleX,scaleY:t.scaleY}));
  for(let i=0;i<3;i++){now+=16;scene.tweens.update();}const frozen=states();scene.togglePause();now+=1200;scene.tweens.update();assert.deepEqual(states(),frozen);assert.ok(texts.every(t=>!t.destroyed));
  scene.togglePause();for(let i=0;i<12;i++){now+=16;scene.tweens.update();}assert.ok(texts.every((t,i)=>t.y===frozen[i].y));assert.ok(texts.every((t,i)=>t.alpha<frozen[i].alpha));assert.ok(texts.every(t=>!t.destroyed));numbers.destroy();assert.ok(texts.every(t=>t.destroyed));assert.equal(numbers.active.size,0);assert.equal(numbers.pops.size,0);
 }finally{Date.now=originalNow;}
});
