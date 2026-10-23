import test from 'node:test';import assert from 'node:assert/strict';
import {rosterCatalog} from '../src/roster/catalog.js';import {assetManifest} from '../src/assets/manifest.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';import {makeWindupFixture} from './helpers/basicWindup.js';
function paint(f){const s=f.session;for(const e of s.drainCastEvents())f.p.cast(e,rosterCatalog[s.actorById(e.actorId).definitionId],s.elapsedSeconds);const snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));f.p.render(snap,s.elapsedSeconds,rosterCatalog);}
async function fixture(sign=1,reducedMotion=false){
 assert.ok(rosterCatalog.P3.actionDescriptors?.heavy,'approved Heavy action must be installed');
 const f=makeWindupFixture({allyTeam:['P3','P1','P4']});for(const a of f.session.actors){a.controlHandoff.resumeAfterMs=Infinity;f.session.holdPlayerControl(a.instanceId);f.session.setPlayerMovement(a.instanceId,{x:0,y:0});}
 Object.assign(f.target,{x:2*sign,y:0});f.scene=assetScene();f.p=new AssetPresenter(f.scene,{cache:createAssetCache({transport:pngTransport}),project:p=>({x:p.x*72,y:p.y*72}),reducedMotion});await f.p.prepare([rosterCatalog.P3]);paint(f);return f;
}
test('approved water action has equal cells, original timing and three required separate effects',()=>{
 const d=rosterCatalog.P3.actionDescriptors?.heavy;assert.ok(d,'missing water action');assert.deepEqual(d.frameDurationsMs,[200,150,400,200]);
 assert.equal(d.blade.attach,'line');assert.ok(d.anticipation);assert.equal(d.contact.attach,'target');
 for(const key of [d.animation.source,d.anticipation.assetKey,d.blade.assetKey,d.contact.assetKey])assert.equal(assetManifest[key].type,'image');
});
for(const sign of [-1,1])for(const reduced of [false,true])test(`real Session bridge source/line/target and Idle cleanup ${sign}/${reduced}`,async()=>{
 const f=await fixture(sign,reduced),s=f.session,a=f.actor,t=f.target,hp=t.hp;
 Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});const start=s.snapshot();assert.ok(s.executeAbility(a,'heavy','player',t));paint(f);
 assert.equal(t.hp,hp);assert.equal(f.p.actionEffects.get(a.instanceId).get('anticipation').visible,true);
 assert.ok(!f.p.actionEffects.get(a.instanceId).get('blade')?.visible);assert.ok(!f.p.actionEffects.get(a.instanceId).get('contact')?.visible);
 s.step(.35);paint(f);assert.equal(t.hp,hp);s.step(.35);paint(f);assert.ok(t.hp<hp);const map=f.p.actionEffects.get(a.instanceId),line=map.get('blade');
 assert.equal(line.visible,true);assert.ok(line.displayWidth>0);assert.equal(line.flipX,sign<0);assert.equal(map.get('anticipation').visible,false);assert.equal(map.get('contact').visible,true);
 assert.equal(f.p.actorSprites.get(a.instanceId).flipX,sign<0);assert.equal(s.drainDamageEvents().length,1);
 const frozen=[line.x,line.y,line.alpha];paint(f);assert.deepEqual([line.x,line.y,line.alpha],frozen);
 s.step(.25);paint(f);assert.equal(f.p.actions.active.size,0);assert.ok(f.p.actorSprites.get(a.instanceId).texture.endsWith('chiru.battleIdle'));
 f.p.destroy();assert.equal(f.scene.budget().bytes,0);assert.equal(f.p.residency.pins.size,0);assert.notDeepEqual(s.snapshot(),start);
});
test('water miss has visible line and no target splash; cancel clears all three layers',async()=>{
 const f=await fixture(),s=f.session,hp=f.target.hp;Object.assign(f.actor.abilityState.heavy,{phase:'ready',cooldownRemaining:0});s.executeAbility(f.actor,'heavy','player',f.target);paint(f);f.target.y=.6;s.step(.7);paint(f);
 assert.equal(f.target.hp,hp);assert.equal(f.p.actionEffects.get('a1').get('blade').visible,true);assert.ok(!f.p.actionEffects.get('a1').get('contact')?.visible);
 f.p.destroy();const c=await fixture();Object.assign(c.actor.abilityState.heavy,{phase:'ready',cooldownRemaining:0});c.session.executeAbility(c.actor,'heavy','player',c.target);paint(c);c.session.cancelAction('a1','control');paint(c);assert.equal(c.p.actions.active.size,0);assert.equal(c.p.actionEffects.size,0);c.p.destroy();
});
