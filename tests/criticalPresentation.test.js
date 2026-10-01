import test from 'node:test';
import assert from 'node:assert/strict';
import { DamageNumbers } from '../src/runtime/damageNumbers.js';
function surface(){const texts=[],tweens=[];const scene={add:{text(x,y,text,style){const t={x,y,text,style,alpha:1,scaleX:1,scaleY:1,destroyed:false,setOrigin(){return this;},setDepth(){return this;},destroy(){this.destroyed=true;}};texts.push(t);return t;}},tweens:{add(config){const t={...config,removed:false,remove(){this.removed=true;}};tweens.push(t);return t;}}};return {scene,texts,tweens};}
const event=(category='basic',critical=false)=>({targetId:'e2',amount:17.08,position:{x:100,y:200},category,critical});
test('normal category emphasis grows Basic Heavy Special Awakening with short lifetime',()=>{
 const f=surface(),v=new DamageNumbers(f.scene,p=>p);v.render(['basic','heavy','special','awakening'].map(k=>event(k)));
 const sizes=f.texts.map(t=>parseInt(t.style.fontSize));assert.ok(sizes.every((n,i)=>i===0||n>sizes[i-1]));
 assert.deepEqual(sizes,[32,36,40,44]);
 assert.deepEqual(f.texts.map(t=>t.text),['17','17','17','17']);
 const fades=f.tweens.filter(t=>t.alpha===0);
 assert.ok(fades.every(t=>t.duration+t.delay>=800&&t.duration+t.delay<=1100));
 assert.ok(f.tweens.every(t=>!Object.hasOwn(t,'x')&&!Object.hasOwn(t,'y')));
 assert.ok(f.texts.every(text=>f.tweens.some(t=>t.targets===text&&t.scaleX>1&&t.yoyo)));
});
test('critical has larger warm outlined number, CRIT label, and brief scale pop',()=>{
 for(const category of ['basic','heavy','special','awakening']){
  const f=surface(),v=new DamageNumbers(f.scene,p=>p);v.render([event(category),event(category,true)]);
  assert.equal(f.texts.length,3);const [normal,crit,label]=f.texts;
  assert.equal(crit.text,normal.text);assert.ok(parseInt(crit.style.fontSize)>parseInt(normal.style.fontSize));
  assert.notEqual(crit.style.color,normal.style.color);assert.ok(crit.style.strokeThickness>normal.style.strokeThickness);
  assert.equal(label.text,'CRITICAL!');assert.ok(label.y<crit.y);
  assert.ok(parseInt(label.style.fontSize)>parseInt(crit.style.fontSize));
  assert.ok(f.tweens.every(t=>!Object.hasOwn(t,'x')&&!Object.hasOwn(t,'y')));
  assert.ok(f.tweens.filter(t=>t.alpha===0).every(t=>t.duration+t.delay<=1100));
  assert.ok(f.tweens.some(t=>t.targets===crit&&t.scaleX>1&&t.scaleY>1&&t.yoyo===true&&t.duration<=150));
 }
});
test('normal and crit completion clean labels and pop tweens without permanent clutter',()=>{
 const f=surface(),v=new DamageNumbers(f.scene,p=>p);v.render([event(),event('heavy',true)]);
 assert.equal(f.texts.length,3);
 for(const tween of f.tweens.filter(t=>t.alpha===0))tween.onComplete();
 assert.ok(f.texts.every(t=>t.destroyed));assert.equal(v.active.size,0);assert.equal(v.pops.size,0);
});
test('shutdown/restart cleans all normal, critical labels, pop tween and offsets',()=>{
 const f=surface(),v=new DamageNumbers(f.scene,p=>p);v.render([event(),event('special',true)]);
 assert.equal(f.texts.length,3);v.destroy();v.destroy();
 assert.ok(f.texts.every(t=>t.destroyed));assert.ok(f.tweens.every(t=>t.removed));
 assert.equal(v.active.size,0);assert.equal(v.pops.size,0);assert.equal(v.offsets.size,0);
});
test('invalid/no-damage events cannot create fake crit labels or text',()=>{
 const f=surface(),v=new DamageNumbers(f.scene,p=>p);
 v.render([{...event('heavy',true),amount:0},{...event('heavy',true),amount:NaN},{...event('heavy',true),position:{x:NaN,y:3}}]);
 assert.equal(f.texts.length,0);assert.equal(f.tweens.length,0);
});
