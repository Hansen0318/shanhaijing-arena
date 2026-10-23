import test from 'node:test';import assert from 'node:assert/strict';
import {rosterCatalog} from '../src/roster/catalog.js';import {formalAbilityDefinitions} from '../src/roster/abilities.js';import {makeWindupFixture} from './helpers/basicWindup.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';import {createAssetCache} from '../src/runtime/assetCache.js';import {assetScene,pngTransport} from './helpers/assetScene.js';
export function fixture(options={}){return makeWindupFixture({...options,allyTeam:['P2','P3','P4']});}
function hold(f){for(const a of f.session.actors){f.session.holdPlayerControl(a.instanceId);f.session.setPlayerMovement(a.instanceId,{x:0,y:0});}}
function step(f,t){hold(f);f.session.step(t);}
export function paint(f){const s=f.session,damage=s.drainDamageEvents(),casts=s.drainCastEvents();for(const e of damage)f.p.hit(e,rosterCatalog[s.actorById(e.targetId).definitionId],s.elapsedSeconds);for(const e of casts)f.p.cast(e,rosterCatalog[s.actorById(e.actorId).definitionId],s.elapsedSeconds);const frame=s.snapshot();for(const side of ['allies','enemies'])frame[side]=frame[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));f.p.render(frame,s.elapsedSeconds,rosterCatalog);return {damage,casts};}
async function visual(reducedMotion=false){const f=fixture();f.scene=assetScene();f.p=new AssetPresenter(f.scene,{cache:createAssetCache({transport:pngTransport}),reducedMotion});await f.p.prepare(Object.values(rosterCatalog));return f;}
const contacts=f=>[...f.p.stagedImpactSprites.values()].filter(x=>x.visible&&!x.destroyed);
for(const reduced of [false,true])for(const direction of [-1,1])test('P2 Basic retains Idle skull density, planted foot and approved independent FX '+reduced+'/'+direction,async()=>{
 const f=await visual(reduced);f.target.x=direction*.65;paint(f);
 const idle=f.p.actorSprites.get('a1'),idleDensity=idle.displayWidth/160;
 // Same forehead-to-muzzle landmark convention: accepted Idle y18..43;
 // accepted action review normalized each authored skull to20px.
 const expectedSkull=25*idleDensity,foot=(158-idle.originY*160)*idle.displayHeight/160;
 f.session.executeAbility(f.actor,'basic','ai',f.target);paint(f);
 const poses=[];
 for(const time of [0,.16,.25,.41]){
  if(time>f.session.elapsedSeconds)step(f,time-f.session.elapsedSeconds);paint(f);
  const body=f.p.actorSprites.get('a1');
  if(!body.texture.endsWith('botuo.basicPoses'))continue;
  poses.push(body.frame);const density=body.displayWidth/158;
  assert.ok(Math.abs(20*density-expectedSkull)<1e-9,'action skull must match accepted Idle, not arbitrary20px');
  assert.ok(Math.abs((126-body.originY*143)*body.displayHeight/143-foot)<1e-9,'calibration preserves world foot');
  assert.ok(Math.abs(((direction<0?158-35:35)-body.originX*158)*density)<1e-9,'calibration preserves mirrored support X');
  if(time===.16){const fx=f.p.actionEffects.get('a1').get('blade');assert.equal(fx.displayWidth,146);assert.equal(fx.displayHeight,114);assert.ok(Math.abs(fx.x-direction*85)<1e-9);assert.ok(Math.abs(fx.y+95.2)<1e-9);}
  if(time===.25){const fx=contacts(f)[0];assert.equal(fx.displayWidth,105);assert.equal(fx.displayHeight,115);assert.ok(Math.abs(fx.x-(f.target.x+direction*.5))<1e-9);assert.ok(Math.abs(fx.y+86.7)<1e-9);}
 }
 assert.equal(new Set(poses).size,reduced?2:4);
 step(f,.57-f.session.elapsedSeconds);paint(f);assert.ok(f.p.actorSprites.get('a1').texture.endsWith('botuo.battleIdle'));assert.equal(f.p.actorSprites.get('a1').displayWidth,144);
 f.session.holdPlayerControl('a1');f.session.setPlayerMovement('a1',{x:direction,y:0});f.session.step(.05);paint(f);assert.ok(f.p.actorSprites.get('a1').texture.endsWith('botuo.battleMove'));assert.equal(f.p.actorSprites.get('a1').displayWidth,144);
 f.p.destroy();assert.equal(f.scene.budget().bytes,0);
});
for(const tier of ['T0','T1','T2','T3'])test('P2 '+tier+' locked 250ms real windup; one damage/resolve and cadence at start',()=>{
 const f=fixture({tier}),s=f.session,hp=f.target.hp;const def=s.actorAbilityDefinitions.get('a1')['P2.basic'];assert.equal(def.windupMs,250);
 assert.equal(s.executeAbility(f.actor,'basic','ai',f.target),true);assert.equal(f.target.hp,hp);assert.equal(s.drainCastEvents()[0].phase,'start');assert.equal(s.cadence.get('a1'),1/s.definitionForActor(f.actor).stats.attackSpeed);
 step(f,.2);assert.equal(f.target.hp,hp);step(f,.05);const d=s.drainDamageEvents(),r=s.drainCastEvents().find(e=>e.phase==='resolve');assert.equal(d.length,1);assert.equal(d[0].eventAt,.25);assert.equal(d[0].actionId,r.actionId);assert.equal(r.resolvedAt,.25);assert.ok(f.target.hp<hp);assert.equal(f.actor.x,0);assert.equal(f.actor.y,0);
});
for(const outcome of ['escape','ordinary','sourceKO','targetKO','control','newSkill'])test('P2 actual '+outcome+' preserves hit/cancel contract',()=>{
 const f=fixture(),s=f.session;assert.equal(s.executeAbility(f.actor,'basic','ai',f.target),true);s.drainCastEvents();
 if(outcome==='escape')f.target.x=8;if(outcome==='ordinary')f.actor.damage(1);if(outcome==='sourceKO')f.actor.damage(f.actor.hp);if(outcome==='targetKO')f.target.damage(f.target.hp);
 if(outcome==='control')s.cancelBasicAction('a1','control');
 if(outcome==='newSkill'){Object.assign(f.actor.abilityState.special,{phase:'ready',cooldownRemaining:0});assert.equal(s.executeAbility(f.actor,'special','player',f.actor),true);}
 step(f,.25);assert.equal(s.drainDamageEvents().filter(e=>e.actorId==='a1').length,outcome==='ordinary'?1:0);const ev=s.drainCastEvents().filter(e=>e.category==='basic');assert.ok(ev.some(e=>e.phase===(['ordinary','escape'].includes(outcome)?'resolve':'cancel')));if(outcome==='escape')assert.equal(ev.find(e=>e.phase==='resolve').hit,false);assert.ok(s.cadence.get('a1')>0);
});
for(const reduced of [false,true])for(const direction of [-1,1])test('P2 visual real hit, independent contact/body, Pause/cleanup '+reduced+'/'+direction,async()=>{
 const f=await visual(reduced);f.target.x=direction*.65;paint(f);assert.equal(f.session.executeAbility(f.actor,'basic','ai',f.target),true);paint(f);assert.equal(f.p.actorSprites.get('a1').frame,'0.0.158.143');
 step(f,.16);paint(f);const blade=f.p.actionEffects.get('a1').get('blade');assert.ok(blade.visible);assert.equal(f.p.actorSprites.get('a1').flipX,direction<0);assert.equal(contacts(f).length,0);
 step(f,.09);const result=paint(f);assert.equal(result.damage.length,1);assert.equal(f.p.actorSprites.get('a1').frame,'316.0.158.143');assert.equal(contacts(f).length,1);assert.equal(contacts(f)[0].actionId,result.damage[0].actionId);
 const snapshot=JSON.stringify([contacts(f)[0].x,contacts(f)[0].y,contacts(f)[0].alpha]);paint(f);paint(f);assert.equal(JSON.stringify([contacts(f)[0].x,contacts(f)[0].y,contacts(f)[0].alpha]),snapshot);
 step(f,.16);paint(f);assert.notEqual(f.p.actorSprites.get('a1').frame,'316.0.158.143');assert.equal(contacts(f).length,1,'contact persists after F3');step(f,.04);paint(f);assert.equal(contacts(f).length,0);step(f,.12);paint(f);assert.equal(f.p.actions.active.size,0);
 f.p.destroy();f.p.destroy();assert.equal(f.scene.budget().bytes,0);assert.equal(f.p.stagedImpacts.size,0);assert.ok(f.scene.objects.every(o=>o.destroyed));
});
test('P2 accepted source/descriptor and full required residency preserve complete ownership',async()=>{
 assert.equal(formalAbilityDefinitions['P2.basic'].windupMs,250);const d=rosterCatalog.P2.actionDescriptors.basic;assert.deepEqual(d.frameDurationsMs,[160,90,160,160]);assert.equal(d.blade.startMs,160);assert.equal(d.contact.durationMs,200);
 const f=await visual();assert.equal(f.p.textureBytes,19000920);assert.equal(f.p.residency.snapshot().pinned,f.p.textures.size);assert.equal(f.scene.budget().bytes,19000920);assert.equal(f.p.residency.snapshot().evicted,0);f.p.destroy();assert.equal(f.scene.budget().bytes,0);
});
for(const tacticalEnabled of [false,true])for(const side of ['allies','enemies'])for(const direction of [-1,1])test('real automatic AI decision → P2 shared action '+tacticalEnabled+'/'+side+'/'+direction,()=>{
 const f=fixture({tacticalEnabled}),s=f.session,actor=s.actorById(side==='allies'?'a1':'e1'),target=s.actorById(side==='allies'?'e1':'a1');
 for(const a of s.actors){Object.assign(a,{x:12,y:3});if(a!==actor){s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});}}
 Object.assign(actor,{x:0,y:0});Object.assign(target,{x:direction*.65,y:0});s.cadence.set(actor.instanceId,0);s.cadence.set(target.instanceId,99);
 const events=[],damage=[];for(let i=0;i<7;i++){s.step(.05);events.push(...s.drainCastEvents());damage.push(...s.drainDamageEvents());}
 const start=events.find(e=>e.actorId===actor.instanceId&&e.phase==='start'&&e.category==='basic'),resolve=events.find(e=>e.actionId===start?.actionId&&e.phase==='resolve');assert.ok(start,'actual AI starts Basic');assert.ok(resolve);assert.ok(Math.abs(resolve.resolvedAt-start.startedAt-.25)<1e-9);assert.equal(start.source,'ai');assert.equal(damage.filter(e=>e.actionId===start.actionId).length,1);
});
test('real player skill API cancels automatic pending Basic; movement remains engine owned',()=>{
 const f=fixture(),s=f.session;for(const a of s.actors)if(a!==f.actor){s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});}s.step(.05);assert.equal(s.pendingActions.get('a1')?.category,'basic');s.holdPlayerControl('a1');s.setPlayerMovement('a1',{x:0,y:1});s.step(.05);assert.ok(f.actor.y>0,'no animation movement lock');Object.assign(f.actor.abilityState.special,{phase:'ready',cooldownRemaining:0});assert.equal(s.usePlayerAbility('a1','special'),true);assert.ok(s.drainCastEvents().some(e=>e.category==='basic'&&e.phase==='cancel'&&e.reason==='new_ability'));assert.ok(s.cadence.get('a1')>0);
});
test('range recheck keeps original target and consumes no miss RNG',()=>{
 let rngCalls=0;const f=fixture({rng:()=>{rngCalls++;return 0;}}),s=f.session;assert.equal(s.executeAbility(f.actor,'basic','ai',f.target),true);const calls=rngCalls;f.target.x=8;const other=s.actorById('e2');Object.assign(other,{x:.5,y:0});const hp=other.hp;step(f,.25);assert.equal(other.hp,hp);assert.equal(rngCalls,calls);assert.equal(s.drainDamageEvents().length,0);
});
test('actual status control cancels pending Basic without cadence refund',()=>{
 const f=fixture(),s=f.session;s.executeAbility(f.actor,'basic','ai',f.target);s.statuses.apply({sourceId:'e1',targetId:'a1',type:'control',magnitude:1,duration:.5},0);step(f,.25);assert.equal(s.drainDamageEvents().length,0);assert.ok(s.drainCastEvents().some(e=>e.phase==='cancel'&&e.reason==='control'));assert.ok(s.cadence.get('a1')>0);
});
test('confirmed 200ms contact survives next non-phased skill without taking over body',async()=>{
 const f=await visual();f.session.executeAbility(f.actor,'basic','ai',f.target);paint(f);step(f,.25);paint(f);const id=contacts(f)[0].actionId;Object.assign(f.actor.abilityState.special,{phase:'ready',cooldownRemaining:0});assert.equal(f.session.usePlayerAbility('a1','special'),true);paint(f);assert.equal(contacts(f)[0].actionId,id);assert.equal(f.p.actions.active.size,0);step(f,.1);paint(f);assert.equal(contacts(f).length,1);step(f,.1);paint(f);assert.equal(contacts(f).length,0);f.p.destroy();
});
test('critical text consumes same real Arena resolve as HP and contact',async()=>{
 const {default:vm}=await import('node:vm');const {readFileSync}=await import('node:fs');const f=await visual();f.session.random=()=>0;
 const source=readFileSync('src/runtime/ArenaScene.js','utf8').replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene'),Arena=vm.runInNewContext(source+'\nArenaScene',{Phaser:{Scene:class{}},window:{},ARENA_STAGE:{width:1120,height:540}}),arena=new Arena(),numbers=[];
 arena.session=f.session;arena.visualAssets=f.p;arena.damageNumbers={render:events=>numbers.push(...events),renderHeal(){}};
 f.session.executeAbility(f.actor,'basic','ai',f.target);arena.renderCastEvents();paint(f);assert.equal(numbers.length,0);step(f,.25);arena.renderCastEvents();paint(f);assert.equal(numbers.length,1);assert.equal(numbers[0].critical,true);assert.equal(numbers[0].eventAt,.25);assert.equal(contacts(f)[0].actionId,numbers[0].actionId);f.p.destroy();
});
for(const tier of ['T0','T3'])test('automatic repeated P2 casts retain projected cadence and one hit per action '+tier,()=>{
 const f=fixture({tier}),s=f.session;for(const a of s.actors)if(a!==f.actor){s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});a.x=12;a.y=2;}Object.assign(f.target,{x:.65,y:0});const events=[],damage=[];
 for(let i=0;i<90;i++){s.step(.05);events.push(...s.drainCastEvents());damage.push(...s.drainDamageEvents());}
 const starts=events.filter(e=>e.actorId==='a1'&&e.phase==='start'&&e.category==='basic'),resolves=events.filter(e=>e.actorId==='a1'&&e.phase==='resolve'&&e.category==='basic');assert.ok(starts.length>=4);const cadence=1/s.definitionForActor(f.actor).stats.attackSpeed;
 for(let i=1;i<starts.length;i++){const elapsed=starts[i].startedAt-starts[i-1].startedAt;assert.ok(elapsed+1e-9>=cadence);assert.ok(elapsed<cadence+.051);}
 for(const e of resolves)assert.equal(damage.filter(d=>d.actionId===e.actionId).length,1);assert.equal(s.actorAbilityDefinitions.get('a1')['P2.basic'].effect.movement,undefined);assert.ok(Math.abs(f.actor.x)<=s.definitionForActor(f.actor).stats.moveSpeed*s.elapsedSeconds);
});
test('P2 returns to current Move after body recovery and source KO cleans every owned cue',async()=>{
 const f=await visual();f.session.executeAbility(f.actor,'basic','ai',f.target);paint(f);step(f,.25);paint(f);step(f,.32);paint(f);f.session.holdPlayerControl('a1');f.session.setPlayerMovement('a1',{x:0,y:1});f.session.step(.05);paint(f);assert.ok(f.p.actorSprites.get('a1').texture.endsWith('botuo.battleMove'));f.session.cadence.set('a1',0);f.session.executeAbility(f.actor,'basic','ai',f.target);paint(f);step(f,.25);paint(f);assert.ok(contacts(f).length);f.actor.damage(f.actor.hp);paint(f);assert.equal(contacts(f).length,0);assert.equal(f.p.bladeAfterglows.size,0);assert.equal(f.p.actions.active.size,0);f.p.destroy();
});
test('opt-in source/contact schema is bounded and old P1 defaults stay absent',async()=>{
 const {actionDescriptor}=await import('../src/assets/descriptors.js');const d=rosterCatalog.P2.actionDescriptors.basic;
 for(const bad of [-1,1.5,1001,NaN]){assert.throws(()=>actionDescriptor({...d,blade:{...d.blade,startMs:bad}}));assert.throws(()=>actionDescriptor({...d,contact:{...d.contact,durationMs:bad}}));}
 assert.throws(()=>actionDescriptor({...d,contact:{...d.contact,durationMs:0}}));for(const category of ['basic','heavy','special']){assert.equal(rosterCatalog.P1.actionDescriptors[category].contact.durationMs,undefined);assert.equal(rosterCatalog.P1.actionDescriptors[category].blade.startMs,undefined);}
});
for(const direction of [-1,1])test('actual rendered noncentral action pivot retains approved skull density/foot and mirror '+direction,async()=>{
 const f=await visual();f.target.x=direction*.65;paint(f);const idle=f.p.actorSprites.get('a1'),foot=(158-idle.originY*160)*idle.displayHeight/160;assert.ok(Math.abs(foot)<1e-9);
 f.session.executeAbility(f.actor,'basic','ai',f.target);paint(f);const image=f.p.actorSprites.get('a1');assert.equal(image.displayWidth,177.75);assert.equal(image.displayHeight,160.875);assert.ok(Math.abs((126-image.originY*143)*image.displayHeight/143-foot)<1e-9);const pixelX=direction<0?158-35:35;assert.ok(Math.abs(pixelX-image.originX*158)<1e-9);f.p.destroy();
});
