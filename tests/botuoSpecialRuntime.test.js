import test from 'node:test';
import assert from 'node:assert/strict';
import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';
import {UtilityPlayback} from '../src/assets/utilityPlayback.js';
import {botuoSpecialAction} from '../src/assets/botuoSpecialRuntime.js';
test('same-clock sequence rejects stale utility and offensive observations',()=>{
 const p=new UtilityPlayback(),event=(n,time=1)=>({actorId:'a',presentationId:`utility.${n}`,eventSequence:n,eventAt:time,hit:true});
 assert.equal(p.observe(event(2),botuoSpecialAction,1),true);
 assert.equal(p.observe(event(1),botuoSpecialAction,1),false);
 p.observe({...event(1,.5),category:'heavy'},null,1);
 assert.equal(p.sample('a',1).actionId,'a.utility.2');
 p.observe({...event(3),category:'heavy'},null,1);
 assert.equal(p.sample('a',1),null);
});
async function fixture({tier='T0',reduced=false,side='allies',sign=1}={}){
 const s=createLabBattleSession(createLabConfig({allyTeam:['P2','P3','P4'],enemyTeam:['P2','P3','P4'],allyTier:tier,enemyTier:tier}),{tacticalEnabled:false,rng:()=>.99});
 for(const a of s.actors){Object.assign(a,{x:10,y:10});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}
 const a=s.actorById(side==='allies'?'a1':'e1'),ally=s.actorById(side==='allies'?'a2':'e2'),enemy=s.actorById(side==='allies'?'e1':'a1');Object.assign(a,{x:0,y:0});Object.assign(ally,{x:1,y:0});Object.assign(enemy,{x:sign*.7,y:0});Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});
 const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport}),reducedMotion:reduced,project:v=>({x:250+v.x*72,y:274+v.y*72})});await p.prepare(Object.values(rosterCatalog));
 const frame=()=>{const f=s.snapshot();for(const side of ['allies','enemies'])f[side]=f[side].map(v=>({...v,definitionId:s.actorById(v.instanceId).definitionId}));return f;};
 const paint=()=>{for(const e of s.drainCastEvents())p.cast(e,rosterCatalog[s.actorById(e.actorId).definitionId],e.eventAt??s.elapsedSeconds);const f=frame();p.render(f,s.elapsedSeconds,rosterCatalog,s.statuses);p.renderOverlays(f,rosterCatalog,s.statuses,s.elapsedSeconds);};
 paint();p.facings.set(a.instanceId,{x:a.x,y:a.y,now:0,moving:false,flipX:sign<0});return {s,a,ally,enemy,p,scene,paint,frame};
}
const authored=p=>[...p.overlaySprites.entries()].filter(([k])=>k.startsWith('source-status.'));
test('presenter rejects stale offensive starts without replacing a newer utility body',async()=>{
 const {s,a,p,paint}=await fixture();s.elapsedSeconds=1;s.executeAbility(a,'special','player');const [e]=s.drainCastEvents();
 p.cast({...e,eventSequence:2},rosterCatalog.P2,1);
 p.cast({...e,presentationId:undefined,category:'heavy',phase:'start',actionId:'old-heavy',eventAt:.5,startedAt:.5,dueAt:1.15,eventSequence:1},rosterCatalog.P2,1);
 paint();assert.equal(p.actions.active.size,0);assert.ok(p.actorSprites.get(a.instanceId).texture.endsWith('botuo.specialPoses'));p.destroy();
});
test('transient cleanup clears surviving utility owners at frozen clock and rejects queued old events',async()=>{
 const {s,a,p,paint}=await fixture();s.executeAbility(a,'special','player');const events=[...s.castEvents];paint();
 assert.equal(p.utilitySprites.size,1);s.clearTransientCombat();paint();
 assert.equal(p.utility.gestures.size,0);assert.equal(p.utilitySprites.size,0);assert.equal(authored(p).length,0);
 assert.ok(p.actorSprites.get(a.instanceId).texture.endsWith('botuo.battleIdle'));
 for(const e of events)p.cast(e,rosterCatalog.P2,0);paint();assert.equal(p.utilitySprites.size,0);p.destroy();
});
for(const reduced of [false,true])for(const side of ['allies','enemies'])for(const sign of [-1,1])test(`utility gesture/source/status are independent ${side} reduced=${reduced} facing=${sign}`,async()=>{
 const f=await fixture({reduced,side,sign}),{s,a,p,paint}=f;
 assert.ok(s.executeAbility(a,'special','player'));paint();assert.ok(p.actorSprites.get(a.instanceId).texture.endsWith('botuo.specialPoses'));
 assert.equal(p.actorSprites.get(a.instanceId).displayWidth,200);assert.equal(p.actorSprites.get(a.instanceId).flipX,sign<0);assert.equal(authored(p).length,1);assert.equal(p.utilitySprites.size,1);assert.equal(p.stagedImpacts.size,0);
 const aura=authored(p)[0][1];assert.equal(aura.x,250);assert.equal(aura.y,186);assert.equal(aura.displayWidth,224);assert.equal(aura.flipX,sign<0);
 const before=s.statuses.damageMultiplier(a.instanceId,0);a.x+=sign*.1;s.elapsedSeconds=.01;paint();assert.ok(p.actorSprites.get(a.instanceId).texture.endsWith('botuo.battleMove'));assert.equal(s.statuses.damageMultiplier(a.instanceId,.01),before);assert.equal(aura.x,250+sign*7.2);assert.equal(p.utilitySprites.size,1);
 s.elapsedSeconds=.32;paint();assert.equal(p.utilitySprites.size,0);assert.equal(authored(p).length,1);s.elapsedSeconds=4;paint();assert.equal(authored(p).length,0);p.destroy();assert.equal(f.scene.budget().bytes,0);
});
test('same-clock Special→Heavy immediately supersedes gesture, retains defense and only real Heavy contact',async()=>{
 const {s,a,enemy,p,paint}=await fixture();s.executeAbility(a,'special','player');const record=s.statuses.forActor(a.instanceId,0)[0];Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});s.executeAbility(a,'heavy','player',enemy);paint();
 assert.ok(p.actorSprites.get(a.instanceId).texture.endsWith('botuo.heavyPoses'));assert.equal(p.utility.gestures.size,0);assert.equal(p.utilitySprites.size,1);assert.equal(authored(p).length,1);assert.equal(p.stagedImpacts.size,1);assert.equal(s.statuses.forActor(a.instanceId,0)[0],record);
 const aura=authored(p)[0][1];assert.equal(aura.x,250);assert.equal(aura.y,186);p.destroy();
});
test('T1 actual non-source recipient, refresh identity, source KO, leave/reentry and paused renders reconcile',async()=>{
 const {s,a,ally,p,paint,frame}=await fixture({tier:'T1'});s.executeAbility(a,'special','player');paint();assert.equal(authored(p).length,2);assert.ok(authored(p).some(([k])=>k.includes(ally.instanceId)));
 const first=s.statuses.forActor(a.instanceId,0)[0],image=authored(p).find(([k])=>k.includes(a.instanceId))[1];paint();assert.equal(image.destroyed,false);
 Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});s.elapsedSeconds=1;s.executeAbility(a,'special','player');paint();assert.equal(image.destroyed,true);assert.notEqual(s.statuses.forActor(a.instanceId,1)[0].id,first.id);
 const hidden=frame();hidden.allies=hidden.allies.filter(v=>v.instanceId!==a.instanceId);p.renderOverlays(hidden,rosterCatalog,s.statuses,1);assert.equal(authored(p).length,0);paint();assert.equal(authored(p).length,2);
 a.damage(a.hp);paint();assert.equal(authored(p).length,0);assert.equal(p.utilitySprites.size,0);p.destroy();
});
test('same observation is idempotent and reduced gesture has no animation lock',async()=>{
 const {s,a,p,paint}=await fixture({reduced:true});s.executeAbility(a,'special','player');const [e]=s.drainCastEvents();p.cast(e,rosterCatalog.P2,0);p.cast(e,rosterCatalog.P2,0);paint();assert.equal(p.utility.activations.size,1);
 assert.equal(p.actorSprites.get(a.instanceId).frame,'400.0.200.200');s.elapsedSeconds=.16;paint();assert.ok(p.actorSprites.get(a.instanceId).texture.endsWith('botuo.battleIdle'));assert.equal(authored(p).length,1);p.destroy();
});
test('generic sprite effects retain pre-pack logical footprint rather than cropped texture aspect',async()=>{
 const {p,a,frame}=await fixture();p.cast({actorId:a.instanceId,category:'heavy',origin:{x:0,y:0},target:{x:1,y:0}},rosterCatalog.P2,0,{presentation:{vfx:{form:'sprite',assetKey:'lushu.basicBlade',duration:.5}}});p.render(frame(),0,rosterCatalog);
 const image=[...p.displays.values()][0];assert.equal(image.displayWidth,80);assert.ok(Math.abs(image.displayHeight-80*81/97)<1e-9);assert.ok(image.frame);p.destroy();
});
