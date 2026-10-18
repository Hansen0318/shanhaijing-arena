import test from 'node:test';
import assert from 'node:assert/strict';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';
import {arenaToStage} from '../src/runtime/arenaProjection.js';
import {actionDescriptor} from '../src/assets/descriptors.js';
import {rosterCatalog} from '../src/roster/catalog.js';
async function fixture(reducedMotion=false){
 const s=createStageBattleSession({...findStage('1-1'),selectedTeam:['P1','P2','P3'],enemyLineup:['P2','P5','P3']},{tacticalEnabled:false,rng:()=>.99});
 const a=s.actorById('a1');Object.assign(a,{x:0,y:0});for(const [i,e] of s.enemies.entries())Object.assign(e,{x:i?10:2,y:i?1:0});
 const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport}),project:arenaToStage,reducedMotion});await p.prepare([...new Set(s.actors.map(a=>s.characterDefinitions[a.definitionId]))]);
 const events=[],damage=[];
 function paint(){damage.push(...s.drainDamageEvents());const es=s.drainCastEvents();events.push(...es);for(const e of es)p.cast(e,s.characterDefinitions[s.actorById(e.actorId).definitionId],s.elapsedSeconds);const snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));p.render(snap,s.elapsedSeconds,s.characterDefinitions);}
 function step(dt){for(const b of s.actors)if(b!==a)s.holdPlayerControl(b.instanceId);s.step(dt);}
 return {s,a,p,scene,events,damage,paint,step};
}
for(const reduced of [false,true])test(`campaign Heavy impact survives real AI next-cast before the same paint, reduced=${reduced}`,async()=>{
 const f=await fixture(reduced),{s,p}=f;s.usePlayerAbility('a1','heavy');f.paint();const token=f.events[0].actionId;
 for(let i=0;i<5;i++){f.step(.05);f.paint();} // t=.25
 f.step(.05);f.step(.05); // real hit t=.30, then AI Awakening before paint at .35
 f.paint();assert.ok(f.events.some(e=>e.actorId==='a1'&&e.category==='awakening'&&e.phase==='start'));
 const contact=()=>[...p.stagedImpactSprites.values()].find(image=>image.actionId===token)??p.actionEffects.get('a1')?.get('contact');
 assert.ok(contact()?.visible,'confirmed Heavy impact was erased by immediate AI cast');assert.equal(contact().actionId,token);assert.ok(contact().texture.endsWith('lushu.heavyImpact'));
 assert.equal(f.damage.filter(d=>d.actionId===token).length,1,'presentation must not create extra hits');
 const frozen={alpha:contact().alpha,x:contact().x,y:contact().y};f.paint();assert.deepEqual({alpha:contact().alpha,x:contact().x,y:contact().y},frozen);
 f.step(.05);f.paint();assert.equal(contact().actionId,token);assert.ok(contact().visible&&contact().alpha>0&&contact().alpha<1,'real hit must retain its authored140ms window');
 f.step(.05);f.paint();assert.ok(!contact()?.visible||contact().actionId!==token,'old Heavy impact must expire at its original endpoint');p.destroy();assert.equal(f.scene.budget().bytes,0);
});
test('completed retained impact cleans up immediately on KO and destruction',async()=>{
 const f=await fixture(),{s,p}=f;s.usePlayerAbility('a1','heavy');f.paint();for(let i=0;i<7;i++)f.step(.05);f.paint();assert.ok([...p.stagedImpactSprites.values()].some(x=>x.visible)||p.actionEffects.get('a1')?.get('contact')?.visible);
 f.a.damage(f.a.hp);f.paint();assert.equal(p.pendingImpactViews.has('a1'),false);assert.equal(p.actionEffects.has('a1'),false);assert.equal(p.stagedImpacts.size,0);p.destroy();assert.ok(f.scene.objects.every(o=>o.destroyed));
});
test('impact-retention policy is opt-in data; Basic descriptor and validation remain protected',()=>{
 const d=rosterCatalog.P1.actionDescriptors.heavy;assert.equal(d.contact.retainOnNextCast,true);assert.equal(rosterCatalog.P1.actionDescriptors.basic.contact.retainOnNextCast,undefined);
 for(const value of [1,'true',null])assert.throws(()=>actionDescriptor({...d,contact:{...d.contact,retainOnNextCast:value}}));
});
