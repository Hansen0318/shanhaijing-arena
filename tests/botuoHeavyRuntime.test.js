import test from 'node:test';
import assert from 'node:assert/strict';
import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';
async function fixture({reduced=false,sign=1,tactical=true,whiff=false}={}){
 const s=createLabBattleSession(createLabConfig({allyTeam:['P2','P3','P4'],enemyTeam:['P1','P5','P2']}),{tacticalEnabled:tactical,rng:()=>.99});
 for(const a of s.actors){Object.assign(a,{x:8,y:5});s.cadence.set(a.instanceId,99);for(const cat of ['heavy','special','awakening'])Object.assign(a.abilityState[cat],{phase:'cooldown',cooldownRemaining:99});}
 const a=s.actorById('a1'),t=s.actorById('e1');Object.assign(a,{x:0,y:0});Object.assign(t,{x:sign*(whiff?8:.7),y:0});Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});
 const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport}),reducedMotion:reduced,project:v=>({x:250+v.x*72,y:274+v.y*72})});await p.prepare(Object.values(rosterCatalog));
 const paint=()=>{for(const e of s.drainCastEvents())p.cast(e,rosterCatalog[s.actorById(e.actorId).definitionId],s.elapsedSeconds);const frame=s.snapshot();for(const side of ['allies','enemies'])frame[side]=frame[side].map(actor=>({...actor,definitionId:s.actorById(actor.instanceId).definitionId}));p.render(frame,s.elapsedSeconds,rosterCatalog);};
 const step=dt=>{for(const actor of s.actors){s.holdPlayerControl(actor.instanceId);s.setPlayerMovement(actor.instanceId,{x:0,y:0});}s.step(dt);paint();};
 paint();return {s,a,t,p,scene,paint,step};
}
for(const tactical of [false,true])for(const reduced of [false,true])for(const sign of [-1,1])test(`Heavy A source/contact/scale/return tactical=${tactical} reduced=${reduced} facing=${sign}`,async()=>{
 const f=await fixture({tactical,reduced,sign}),{s,a,t,p,paint,step}=f,before=t.hp;
 s.executeAbility(a,'heavy','player',t,{facingX:sign});paint();
 let image=p.actorSprites.get(a.instanceId);assert.ok(image.texture.endsWith('botuo.heavyPoses'));
 assert.equal(image.displayWidth,175);assert.equal(image.displayHeight,162);assert.equal(image.flipX,sign<0);
 assert.equal(image.originY,151/162);assert.equal(p.stagedImpacts.size,tactical?0:1);
 if(tactical){assert.equal(image.frame,'0.0.175.162');step(.16);assert.equal(image.frame,reduced?'0.0.175.162':'175.0.175.162');assert.ok(p.actionEffects.get('a1').get('blade').visible);assert.equal(t.hp,before);step(.49);}
 assert.equal(image.frame,'350.0.175.162');assert.ok(t.hp<before);assert.equal(p.stagedImpacts.size,1);assert.equal(p.stagedImpactSprites.size,1);
 const hp=t.hp,alpha=[...p.stagedImpactSprites.values()][0].alpha;paint();assert.equal(t.hp,hp);assert.equal([...p.stagedImpactSprites.values()][0].alpha,alpha,'Pause paint frozen');
 step(.16);if(!reduced)assert.equal(image.frame,'525.0.175.162');assert.equal(p.stagedImpacts.size,1);
 step(.12);assert.equal(p.stagedImpacts.size,0);step(.04);assert.ok(image.texture.endsWith('botuo.battleIdle'),JSON.stringify({texture:image.texture,frame:image.frame,time:s.elapsedSeconds,active:p.actions.active.get('a1'),state:p.states.get('a1')}));
 a.x+=sign*.1;step(.01);assert.ok(image.texture.endsWith('botuo.battleMove'));p.destroy();assert.equal(f.scene.budget().bytes,0);
});
for(const sign of [-1,1])test(`Heavy A whiff facing=${sign} keeps outgoing effect but no contact/HP`,async()=>{
 const {s,a,t,p,paint,step,scene}=await fixture({sign,whiff:true}),hp=t.hp;
 s.executeAbility(a,'heavy','player',t,{facingX:sign});paint();
 assert.equal(p.actorSprites.get('a1').frame,'350.0.175.162');assert.equal(p.actorSprites.get('a1').flipX,sign<0);
 assert.ok(p.actionEffects.get('a1').get('blade').visible);assert.equal(p.stagedImpacts.size,0);assert.equal(t.hp,hp);
 step(.32);assert.equal(p.actionEffects.size,0);p.destroy();assert.equal(scene.budget().bytes,0);
});
test('Heavy observational resolve still paints true contact after an intervening valid Basic action',async()=>{
 const {s,a,t,p,paint,step}=await fixture();s.executeAbility(a,'heavy','player',t);paint();
 s.cadence.set(a.instanceId,0);s.executeAbility(a,'basic','ai',t);paint();step(.65);
 assert.ok([...p.stagedImpacts.values()].some(r=>r.descriptor.animation.source==='botuo.heavyPoses'),'confirmed Heavy contact survives unchanged Basic/Heavy simulation concurrency');
 assert.ok(p.actorSprites.get('a1').texture.endsWith('botuo.heavyPoses'));p.destroy();
});
