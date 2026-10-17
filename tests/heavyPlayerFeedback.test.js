import test from 'node:test';
import assert from 'node:assert/strict';
import {makeWindupFixture} from './helpers/basicWindup.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {arenaToStage} from '../src/runtime/arenaProjection.js';

function fixture(){
 let draws=0;const f=makeWindupFixture({rng:()=>{draws++;return .99;}}),s=f.session;
 for(const e of s.enemies)Object.assign(e,{x:10,y:0});
 Object.assign(f.actor.abilityState.heavy,{phase:'ready',cooldownRemaining:0});
 return {...f,draws:()=>draws,step(dt){for(const a of s.actors)s.holdPlayerControl(a.instanceId);s.step(dt);}};
}
for(const facingX of [-1,1])test(`manual Heavy air swing uses phased animation facing ${facingX}, spends cooldown and never acquires a later target`,()=>{
 const f=fixture(),s=f.session,a=f.actor,position={x:a.x,y:a.y},hp=s.actors.map(a=>a.hp);
 assert.equal(s.usePlayerAbility(a.instanceId,'heavy',{facingX}),true);
 const [start]=s.drainCastEvents();assert.equal(start.phase,'start');assert.equal(start.targetId,null);assert.equal(Math.sign(start.attackTarget.x-start.attackOrigin.x),facingX);
 assert.equal(s.pendingActions.size,1);assert.equal(a.abilityState.heavy.cooldownRemaining,3);
 assert.equal(s.usePlayerAbility(a.instanceId,'heavy',{facingX}),false);
 // A target walking into the empty swing must not create a fake acquired hit.
 f.target.x=.5;f.step(.279);assert.equal(s.drainDamageEvents().length,0);f.step(.001);
 const [resolved]=s.drainCastEvents();assert.equal(resolved.phase,'resolve');assert.equal(resolved.actionId,start.actionId);assert.equal(resolved.hit,false);assert.equal(resolved.targetId,null);
 assert.deepEqual(s.actors.map(a=>a.hp),hp);assert.deepEqual({x:a.x,y:a.y},position);assert.equal(f.draws(),0);assert.equal(s.pendingActions.size,0);
});
test('air swing still cancels on control and spends the original cooldown',()=>{
 const f=fixture(),s=f.session;s.usePlayerAbility('a1','heavy');s.drainCastEvents();s.statuses.apply({sourceId:'e1',targetId:'a1',type:'control',magnitude:1,duration:.5},0);f.step(.28);
 assert.equal(s.drainCastEvents()[0].phase,'cancel');assert.equal(s.drainDamageEvents().length,0);assert.ok(f.actor.abilityState.heavy.cooldownRemaining>0);
});
for(const facingX of [-1,1])test(`air swing renders the supplied wind PNG above actor, returns to Idle, no impact facing ${facingX}`,async()=>{
 const f=fixture(),s=f.session,p=new AssetPresenter(assetScene(),{cache:createAssetCache({transport:pngTransport}),project:arenaToStage});await p.prepare(Object.values(rosterCatalog));
 const paint=()=>{for(const e of s.drainCastEvents())p.cast(e,rosterCatalog.P1,s.elapsedSeconds);const snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));p.render(snap,s.elapsedSeconds,rosterCatalog);};
 s.usePlayerAbility('a1','heavy',{facingX});paint();assert.ok(p.actorSprites.get('a1').texture.endsWith('lushu.battleHeavy'));
 f.step(.2);paint();const actor=p.actorSprites.get('a1'),wind=p.actionEffects.get('a1')?.get('blade');
 assert.ok(wind?.visible,'wind must exist even without a target');assert.ok(wind.texture.endsWith('lushu.heavyWind'));assert.ok(wind.depth>actor.depth,'sweep cannot be hidden behind character');
 assert.equal(actor.flipX,facingX<0);assert.equal(wind.flipX,facingX<0);assert.ok(wind.displayWidth>=150,'independent FX retains readable footprint after body correction');
 const effectScale=72*2.4731182795698925/256,source=arenaToStage(f.actor);
 assert.ok(Math.abs(wind.displayWidth-230*1.5*effectScale)<1e-8,'approved 1.5x sweep width');
 assert.ok(Math.abs(wind.displayHeight-230*1.5*effectScale)<1e-8,'approved 1.5x sweep height');
 assert.ok(Math.abs(wind.x-source.x-facingX*87*effectScale)<1e-8,'enlargement preserves sweep horizontal center in either facing');
 assert.ok(Math.abs(wind.y-source.y-(150-rosterCatalog.P1.actionDescriptors.heavy.animation.origin[1]*256)*effectScale)<1e-8,'enlargement preserves sweep height');
 assert.ok(actor.displayHeight<=180,'Heavy cannot inflate the crouched body to standing height');
 f.step(.08);paint();assert.equal(p.actorSprites.get('a1').frame,'256.0.128.128');assert.ok(!p.actionEffects.get('a1')?.get('contact')?.visible);
 f.step(.32);paint();assert.ok(p.actorSprites.get('a1').texture.endsWith('lushu.battleIdle'));assert.equal(p.actionEffects.size,0);p.destroy();
});
test('Heavy stays grounded after body-scale correction and contact centers on target torso',async()=>{
 const f=fixture(),s=f.session;f.target.x=2;const p=new AssetPresenter(assetScene(),{cache:createAssetCache({transport:pngTransport}),project:arenaToStage});await p.prepare(Object.values(rosterCatalog));
 const d=rosterCatalog.P1.actionDescriptors.heavy,idle=rosterCatalog.P1.animationDescriptors.battleIdle;
 const scale=72*d.animation.scale/128,idleScale=144/128;
 assert.ok(d.animation.scale<=2.5,'reject crouching-height enlargement');assert.ok(Math.abs((112-d.animation.origin[1]*128)*scale-(122-idle.origin[1]*128)*idleScale)<1e-8);
 s.usePlayerAbility('a1','heavy');for(const e of s.drainCastEvents())p.cast(e,rosterCatalog.P1,0);f.step(.28);for(const e of s.drainCastEvents())p.cast(e,rosterCatalog.P1,.28);
 const snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));p.render(snap,.28,rosterCatalog);
 const contact=p.actionEffects.get('a1').get('contact'),target=arenaToStage(f.target);assert.ok(contact.visible);assert.ok(contact.texture.endsWith('lushu.heavyImpact'));assert.ok(target.y-contact.y>=45&&target.y-contact.y<=75,'contact is at torso height rather than feet');assert.ok(contact.depth>5);
 const effectScale=72*2.4731182795698925/256;
 assert.ok(Math.abs(contact.displayWidth-210*1.75*effectScale)<1e-8,'approved 1.75x impact width');
 assert.ok(Math.abs(contact.displayHeight-140*1.75*effectScale)<1e-8,'approved 1.75x impact height');
 assert.ok(Math.abs(contact.x-target.x)<1e-8);assert.ok(Math.abs(contact.y-target.y+75*effectScale)<1e-8,'enlargement preserves actual target-contact center');p.destroy();
});
for(const flipX of [true,false])test(`actual Arena Heavy button forwards displayed facing flipX=${flipX} into an empty swing`,async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
 const source=readFileSync('src/runtime/ArenaScene.js','utf8').replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene');
 class Circle{}Circle.Contains=()=>true;
 const Arena=vm.runInNewContext(source+'\nArenaScene',{Phaser:{Scene:class{},Geom:{Circle}},window:{},ARENA_STAGE:{width:1120,height:540}}),arena=new Arena(),f=fixture();
 const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport})});await p.prepare(Object.values(rosterCatalog));p.facings.set('a1',{flipX});
 arena.add={...scene.add,text:()=>scene.add.image(),circle:()=>{const o=scene.add.image();o.handlers={};o.setStrokeStyle=o.setInteractive=()=>o;o.on=(name,fn)=>{o.handlers[name]=fn;return o;};return o;}};
 Object.assign(arena,{session:f.session,selectedId:'a1',battleStarted:true,visualAssets:p,damageNumbers:{render(){},renderHeal(){}},refreshSkillButtons(){},applyFrame(){}});
 arena.createSkillButtons();arena.skillButtons.get('heavy').base.handlers.pointerdown();assert.equal(p.actions.active.get('a1').flipX,flipX);assert.equal(f.session.pendingActions.get('a1').targetId,null);p.destroy();
});
