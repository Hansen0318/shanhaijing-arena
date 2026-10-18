import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {readFileSync} from 'node:fs';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';import {createAssetCache} from '../src/runtime/assetCache.js';import {rosterCatalog} from '../src/roster/catalog.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';import {makeWindupFixture} from './helpers/basicWindup.js';import {arenaToStage} from '../src/runtime/arenaProjection.js';
async function fixture(reducedMotion=false,sign=1,tier='T0'){
 const f=makeWindupFixture({tier}),scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport}),reducedMotion,project:arenaToStage});
 await p.prepare(Object.values(rosterCatalog));Object.assign(f.actor,{x:4,y:0});Object.assign(f.target,{x:4+2*sign,y:0});Object.assign(f.actor.abilityState.awakening,{phase:'ready',cooldownRemaining:0});
 return {...f,p,scene,step(dt){for(const a of f.session.actors)f.session.holdPlayerControl(a.instanceId);f.session.step(dt);}};
}
function paint(f,{drain=true}={}){const s=f.session,damage=drain?s.drainDamageEvents():[];if(drain)for(const event of s.drainCastEvents())f.p.cast(event,rosterCatalog[s.actorById(event.actorId).definitionId],event.eventAt??s.elapsedSeconds);const snapshot=s.snapshot(),frame={...snapshot};for(const side of ['allies','enemies'])frame[side]=snapshot[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));f.p.render(frame,s.elapsedSeconds,rosterCatalog);assert.deepEqual(s.snapshot(),snapshot);return damage;}
for(const reduced of [false,true])for(const sign of [1,-1])test(`real Awakening displacement,body,source,target/HP events reduced=${reduced} sign=${sign}`,async()=>{
 const f=await fixture(reduced,sign),s=f.session,descriptor=rosterCatalog.P1.actionDescriptors.awakening;
 s.executeAbility(f.actor,'awakening','player',f.target);paint(f);assert.equal(f.p.actorSprites.get('a1').frame,'0.0.128.128');let count=0,hp=f.target.hp;
 for(const [i,begin,hitAt] of [[0,.08,.10175],[1,.135,.15423076923076923],[2,.28,.35]]){
  f.step(begin-s.elapsedSeconds);assert.equal(paint(f).length,0);const wind=f.p.actionEffects.get('a1').get('blade');assert.ok(wind.visible);assert.ok(wind.texture.endsWith(descriptor.stages[i].blade.assetKey));
  assert.equal(f.p.actorSprites.get('a1').frame,`${(i+1)*128}.0.128.128`);assert.equal(wind.flipX,sign*(i===1?-1:1)<0);
  f.step(hitAt-s.elapsedSeconds);const damage=paint(f);assert.equal(damage.length,1);count++;assert.equal(damage[0].hitIndex,i);assert.ok(Math.abs(damage[0].eventAt-hitAt)<1e-8);assert.ok(f.target.hp<hp);hp=f.target.hp;
  const image=[...f.p.stagedImpactSprites.values()].find(o=>o.actionId===damage[0].actionId&&o.hitIndex===i);assert.ok(image?.visible);assert.equal(image.eventAt,damage[0].eventAt);assert.ok(image.texture.endsWith(descriptor.stages[i].contact.assetKey));
  const pose=f.p.actorSprites.get('a1');assert.equal(pose.x,arenaToStage(f.actor).x);assert.equal(pose.originX,.5);assert.equal(pose.originY,.93125);
 }
 assert.equal(count,3);f.step(.47-s.elapsedSeconds);paint(f);assert.equal(f.p.actorSprites.get('a1').frame,'512.0.128.128');assert.ok(!f.p.actionEffects.get('a1').get('blade').visible);f.step(.61-s.elapsedSeconds);paint(f);assert.equal(f.p.actions.active.size,0);assert.equal(f.p.stagedImpacts.size,0);assert.ok(f.p.actorSprites.get('a1').texture.endsWith('lushu.battleIdle'));f.p.destroy();assert.equal(f.scene.budget().bytes,0);
});
test('actual Arena bridge retains each batched hit identity/time without replacing live third-pose body',async()=>{
 const f=await fixture(),source=readFileSync('src/runtime/ArenaScene.js','utf8').replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene');
 const Arena=vm.runInNewContext(source+'\nArenaScene',{Phaser:{Scene:class{}},window:{},ARENA_STAGE:{width:1120,height:540}}),arena=new Arena(),numbers=[];Object.assign(arena,{session:f.session,visualAssets:f.p,damageNumbers:{render:events=>numbers.push(...events),renderHeal(){}}});
 f.session.executeAbility(f.actor,'awakening','player',f.target);arena.renderCastEvents();f.step(.36);arena.renderCastEvents();paint(f,{drain:false});assert.deepEqual(numbers.map(e=>e.hitIndex),[0,1,2]);assert.equal(f.p.stagedImpactSprites.size,3);assert.equal(f.p.actorSprites.get('a1').frame,'384.0.128.128');
 for(const event of numbers){const image=[...f.p.stagedImpactSprites.values()].find(o=>o.hitIndex===event.hitIndex);assert.equal(image.actionId,event.actionId);assert.equal(image.eventAt,event.eventAt);}
 f.step(.01);paint(f);assert.equal(f.p.stagedImpacts.size,1);f.p.destroy();
});
for(const [tier,cd,range] of [['T0',12,3],['T1',11.04,3.15],['T2',10.08,3.3],['T3',8.64,3.54]])test(`Awakening ${tier} preserves projected cooldown/range and independent weights`,async()=>{
 const f=await fixture(false,1,tier),s=f.session,ability=s.actorAbilityDefinitions.get('a1')['P1.awakening'];assert.ok(Math.abs(ability.cooldown-cd)<1e-9);assert.ok(Math.abs(ability.range-range)<1e-9);assert.deepEqual(ability.stagedAction.segments.map(s=>s.coefficient),[.4,.7,1.1]);assert.equal(ability.canCrit,false);
 s.executeAbility(f.actor,'awakening','player',f.target);assert.ok(Math.abs(f.actor.abilityState.awakening.cooldownRemaining-cd)<1e-9);paint(f);f.step(.61);assert.equal(paint(f).length,3);assert.ok(Math.abs(f.actor.abilityState.awakening.cooldownRemaining-(cd-.61))<1e-8);f.p.destroy();
});
