import test from 'node:test';
import assert from 'node:assert/strict';
import { createBattleRuntimeLoader } from '../src/runtime/lazyBattleRuntime.js';
test('menu load never starts runtime; concurrent battle requests share one load and cache success',async()=>{
 let calls=0,resolve;const runtime={createArenaGame(){}};
 const load=createBattleRuntimeLoader(()=>{calls++;return new Promise(r=>resolve=r);});
 assert.equal(calls,0);const a=load(),b=load();assert.equal(calls,1);assert.equal(a,b);
 resolve(runtime);assert.equal(await a,runtime);assert.equal(await load(),runtime);assert.equal(calls,1);
});
test('failed runtime load may retry without permanently poisoning entry',async()=>{
 let calls=0;const runtime={};const load=createBattleRuntimeLoader(()=>++calls===1?Promise.reject(Error('offline')):Promise.resolve(runtime));
 await assert.rejects(load(),/offline/);assert.equal(await load(),runtime);assert.equal(calls,2);
});

test('stale Phaser boot sleeps after Phaser starts the loop following postBoot',async()=>{
 const {readFileSync}=await import('node:fs');const vm=await import('node:vm');
 let instance;
 const context={queueMicrotask, ArenaScene:class{},Phaser:{AUTO:0,Scale:{NONE:0},Game:class{
  constructor(config){instance=this;this.loop={running:false,sleep(){this.running=false;}};this.scene={add(){},start(){throw Error('stale scene');}};config.callbacks.postBoot(this);this.loop.running=true;}
 }}};
 const source=readFileSync(new URL('../src/runtime/battleRuntime.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replace('export function','function');
 vm.runInNewContext(source+'\ncreateArenaGame({data:{},isCurrent:()=>false,onBoot(){}});',context);
 assert.equal(instance.loop.running,true);await Promise.resolve();assert.equal(instance.loop.running,false);
});
