import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from '../tests/helpers/assetScene.js';
import {arenaToStage} from '../src/runtime/arenaProjection.js';
const s=createStageBattleSession({...findStage('1-1'),selectedTeam:['P1','P2','P3'],enemyLineup:['P2','P5','P3']},{tacticalEnabled:false,rng:()=>.99}),a=s.actorById('a1'),t=s.actorById('e1');
Object.assign(a,{x:0,y:0});for(const [i,b] of s.enemies.entries())Object.assign(b,{x:i?10:2,y:i?1:0});
const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport}),project:arenaToStage});await p.prepare([...new Set(s.actors.map(a=>s.characterDefinitions[a.definitionId]))]);
const events=[],frames=[];
function paint(){const es=s.drainCastEvents();for(const e of es){if(e.actorId==='a1')events.push(e);p.cast(e,s.characterDefinitions[s.actorById(e.actorId).definitionId],s.elapsedSeconds);}const snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));p.render(snap,s.elapsedSeconds,s.characterDefinitions);const images=p.actionEffects.get('a1');frames.push({time:s.elapsedSeconds,texture:p.actorSprites.get('a1')?.texture.split('.').slice(-2).join('.'),blade:images?.get('blade')?.visible??false,contact:images?.get('contact')?.visible??false,alpha:images?.get('contact')?.alpha??0});}
s.usePlayerAbility('a1','heavy');paint();for(let i=0;i<35;i++){for(const b of s.actors)if(b!==a)s.holdPlayerControl(b.instanceId);s.step(.02);paint();}
console.log(JSON.stringify({events:events.map(e=>({category:e.category,phase:e.phase??'immediate',at:e.resolvedAt??e.startedAt,hit:e.hit})),visibleFrames:frames.filter(f=>f.blade||f.contact),counts:{all:frames.length,wind:frames.filter(f=>f.blade).length,contact:frames.filter(f=>f.contact).length}},null,2));p.destroy();
