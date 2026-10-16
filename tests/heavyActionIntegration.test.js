import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {readFileSync} from 'node:fs';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';import {createAssetCache} from '../src/runtime/assetCache.js';import {rosterCatalog} from '../src/roster/catalog.js';import {ActionPlayback} from '../src/assets/actionPlayback.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';import {makeWindupFixture} from './helpers/basicWindup.js';
async function fixture(reducedMotion=false,sign=1){
 const f=makeWindupFixture(),scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport}),reducedMotion,project:a=>({x:a.x*40,y:a.y*40})});
 await p.prepare(Object.values(rosterCatalog));Object.assign(f.target,{x:2*sign,y:0});Object.assign(f.actor.abilityState.heavy,{phase:'ready',cooldownRemaining:0});
 return {...f,scene,p,step(dt){for(const a of f.session.actors)f.session.holdPlayerControl(a.instanceId);f.session.step(dt);}};
}
function paint(f,drain=true){
 const s=f.session,damage=drain?s.drainDamageEvents():[];for(const e of damage)f.p.hit(e,rosterCatalog[s.actorById(e.targetId).definitionId],s.elapsedSeconds);
 if(drain)for(const e of s.drainCastEvents())f.p.cast(e,rosterCatalog[s.actorById(e.actorId).definitionId],s.elapsedSeconds);
 const before=s.snapshot(),visual={...before};for(const side of ['allies','enemies'])visual[side]=before[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));
 f.p.render(visual,s.elapsedSeconds,rosterCatalog);assert.deepEqual(s.snapshot(),before);return damage;
}
const contact=f=>f.p.actionEffects.get('a1')?.get('contact');
for(const reduced of [false,true])for(const sign of [1,-1])test(`Heavy bridge real hit/F3/target contact/Idle agree reduced=${reduced}, direction=${sign}`,async()=>{
 const f=await fixture(reduced,sign),s=f.session,hp=f.target.hp;s.executeAbility(f.actor,'heavy','player',f.target);paint(f);
 assert.equal(f.p.actorSprites.get('a1').frame,'0.0.128.128');assert.ok(!contact(f)?.visible);
 f.step(.2);paint(f);assert.equal(f.p.actorSprites.get('a1').frame,reduced?'0.0.128.128':'128.0.128.128');assert.equal(f.target.hp,hp);
 f.step(.079);paint(f);assert.ok(!contact(f)?.visible);assert.equal(f.target.hp,hp);
 f.step(.001);const damage=paint(f);assert.equal(damage.length,1);assert.equal(f.p.actorSprites.get('a1').frame,'256.0.128.128');assert.ok(contact(f).visible);assert.equal(contact(f).actionId,damage[0].actionId);assert.equal(contact(f).flipX,sign<0);
 assert.ok(Math.abs(contact(f).x-f.target.x*40)<1e-9,'impact center is actual target, not source-attached slash');
 assert.equal(f.p.playback.active.size,0,'no duplicate procedural burst');
 const frozen=[f.p.actorSprites.get('a1').frame,contact(f).x,contact(f).alpha];paint(f);assert.deepEqual([f.p.actorSprites.get('a1').frame,contact(f).x,contact(f).alpha],frozen);
 f.step(.14);paint(f);assert.equal(f.p.actorSprites.get('a1').frame,reduced?'0.0.96.128':'384.0.128.128');assert.ok(!contact(f)?.visible);
 f.step(.18);paint(f);assert.ok(f.p.actorSprites.get('a1').texture.endsWith('lushu.battleIdle'));assert.equal(f.p.actions.active.size,0);assert.equal(f.p.actionEffects.size,0);f.p.destroy();
});
test('actual Arena bridge routes Heavy HP feedback and F3 through the same resolved event',async()=>{
 const f=await fixture(),source=readFileSync('src/runtime/ArenaScene.js','utf8').replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene');
 const Arena=vm.runInNewContext(source+'\nArenaScene',{Phaser:{Scene:class{}},window:{},ARENA_STAGE:{width:1120,height:540}}),arena=new Arena(),numbers=[];
 arena.session=f.session;arena.visualAssets=f.p;arena.damageNumbers={render:es=>numbers.push(...es),renderHeal(){}};
 f.session.executeAbility(f.actor,'heavy','player',f.target);arena.renderCastEvents();paint(f,false);assert.equal(numbers.length,0);
 f.step(.279);arena.renderCastEvents();paint(f,false);assert.equal(numbers.length,0);assert.ok(!contact(f)?.visible);
 f.step(.001);arena.renderCastEvents();paint(f,false);assert.equal(numbers.length,1);assert.equal(contact(f).actionId,numbers[0].actionId);assert.equal(f.p.actorSprites.get('a1').frame,'256.0.128.128');f.p.destroy();
});
for(const kind of ['miss','control','sourceKO','clear'])test(`Heavy ${kind} never leaves false contact or stale effects`,async()=>{
 const f=await fixture(),s=f.session;s.executeAbility(f.actor,'heavy','player',f.target);paint(f);
 if(kind==='miss')f.target.x=9;else if(kind==='control')s.statuses.apply({sourceId:'e1',targetId:'a1',type:'control',magnitude:1,duration:.5},0);else if(kind==='sourceKO')f.actor.damage(f.actor.hp);else s.clearTransientCombat({preserveEvents:true});
 f.step(.28);assert.equal(paint(f).length,0);assert.ok(!contact(f)?.visible);if(kind!=='miss')assert.equal(f.p.actionEffects.size,0);
 f.p.destroy();assert.equal(f.scene.budget().bytes,0);assert.ok(f.scene.objects.every(o=>o.destroyed));
});
test('Basic and Heavy from two P1 actors coexist within finite budget, then KO clears both',async()=>{
 const f=await fixture(),p=f.p,defs=rosterCatalog,frame={allies:[{instanceId:'one',definitionId:'P1',x:0,y:0,hp:1}],enemies:[{instanceId:'two',definitionId:'P1',x:2,y:0,hp:1}]};
 for(const [actorId,category,x,targetX,resolvedAt] of [['one','basic',0,2,.18],['two','heavy',2,0,.28]]){
  p.cast({actorId,category,actionId:actorId,phase:'start',startedAt:0,origin:{x,y:0},target:{x:targetX,y:0}},defs.P1,0);
  p.cast({actorId,category,actionId:actorId,phase:'resolve',resolvedAt,hit:true,target:{x:targetX,y:0}},defs.P1,resolvedAt);
 }
 p.render(frame,.28,defs);assert.equal(p.actions.active.size,2);assert.ok(p.actorSprites.get('one').texture.endsWith('lushu.battleBasic'));assert.ok(p.actorSprites.get('two').texture.endsWith('lushu.battleHeavy'));
 assert.ok(p.actionEffects.get('two').get('contact').visible);assert.ok(f.scene.budget().peak<=16777216);
 frame.allies[0].hp=0;frame.enemies[0].hp=0;p.render(frame,.29,defs);assert.equal(p.actions.active.size,0);assert.equal(p.actionEffects.size,0);p.destroy();
});
test('target attachment copies real resolved coordinates and rejects old action tokens',()=>{
 const p=new ActionPlayback(),d=rosterCatalog.P1.actionDescriptors.heavy;
 p.handle({actorId:'a',actionId:'one',phase:'start',startedAt:0,origin:{x:0,y:0},target:{x:2,y:0}},d);
 const e={actorId:'a',actionId:'one',phase:'resolve',resolvedAt:.28,hit:true,target:{x:1.9,y:.1}};p.handle(e,d);e.target.x=99;
 assert.deepEqual(p.sample('a',.28).contactTarget,{x:1.9,y:.1});p.handle({...e,actionId:'stale',target:{x:50,y:50}},d);assert.equal(p.sample('a',.28).contactTarget.x,1.9);
});
