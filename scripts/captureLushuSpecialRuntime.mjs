// Actual shared simulation/presenter draw commands; not a browser recording.
import {writeFileSync} from 'node:fs';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from '../tests/helpers/assetScene.js';
import {makeWindupFixture} from '../tests/helpers/basicWindup.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {arenaToStage} from '../src/runtime/arenaProjection.js';
const scenarios=[];
for(const reducedMotion of [false,true])for(const sign of [1,-1]){
 const {session:s,actor:a,target:t}=makeWindupFixture();Object.assign(t,{x:sign*2,y:0});Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});
 const p=new AssetPresenter(assetScene(),{cache:createAssetCache({transport:pngTransport}),reducedMotion,project:arenaToStage});await p.prepare(Object.values(rosterCatalog));const start=arenaToStage(a),frames=[],damage=[],events=[];
 function paint(){damage.push(...s.drainDamageEvents());const es=s.drainCastEvents();events.push(...es);for(const e of es)p.cast(e,rosterCatalog[s.actorById(e.actorId).definitionId],s.elapsedSeconds);const snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(b=>({...b,definitionId:s.actorById(b.instanceId).definitionId}));p.render(snap,s.elapsedSeconds,rosterCatalog);
 const images=[['actor',p.actorSprites.get('a1')],['target',p.actorSprites.get(t.instanceId)],...[...(p.actionEffects.get('a1')??[])]];
 const objects=images.filter(([,o])=>o?.visible&&!o.destroyed).map(([kind,o])=>({kind,path:'public/'+[...p.textures.values()].find(v=>v.key===o.texture).asset.path,frame:o.frame?o.frame.split('.').map(Number):null,x:o.x-start.x+(sign>0?230:670),y:o.y-start.y+280,width:o.displayWidth,height:o.displayHeight,originX:o.originX,originY:o.originY,flipX:o.flipX,alpha:o.alpha,depth:o.depth}));frames.push({time:s.elapsedSeconds,actor:{x:a.x,y:a.y},targetHp:t.hp,objects});}
 paint();s.executeAbility(a,'special','player',t);paint();for(let i=0;i<42;i++){for(const b of s.actors)s.holdPlayerControl(b.instanceId);s.step(.02);paint();}scenarios.push({reducedMotion,sign,frames,damage,events});p.destroy();
}
writeFileSync('docs/art/candidates/lushu/special/runtime-v1/presenter-trace.json',JSON.stringify({kind:'Actual production draw-command reconstruction; NOT screen recording',stepMs:20,scenarios},null,2)+'\n');
