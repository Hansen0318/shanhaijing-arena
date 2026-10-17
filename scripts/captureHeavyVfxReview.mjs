// Real production simulation + presenter draw commands. Not a browser recording.
import {readFileSync,writeFileSync,unlinkSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from '../tests/helpers/assetScene.js';
import {arenaToStage} from '../src/runtime/arenaProjection.js';
const baseline=process.argv.includes('--baseline'),root=fileURLToPath(new URL('../',import.meta.url)),out=root+'docs/art/candidates/lushu/heavy/playback-proof-v1/';mkdirSync(out,{recursive:true});
const baselineCommit='4a7615daafd67ec11c18662d36ec562a2e43e368',temporary=new URL('../src/runtime/heavyVfxBaseline.tmp.mjs',import.meta.url);let Presenter=AssetPresenter;
try{
 if(baseline){writeFileSync(temporary,execFileSync('git',['show',baselineCommit+':src/runtime/assetPresenter.js'],{cwd:root}));Presenter=(await import(temporary.href)).AssetPresenter;}
 const scenarios=[];
 for(const [name,sign,manual] of baseline?[['auto-right',1,false]]:[['isolated-right',1,true],['isolated-left',-1,true],['auto-right',1,false]]){
  const s=createStageBattleSession({...findStage('1-1'),selectedTeam:['P1','P2','P3'],enemyLineup:['P2','P5','P3']},{tacticalEnabled:false,rng:()=>.99});const a=s.actorById('a1'),t=s.actorById('e1');Object.assign(a,{x:0,y:0});for(const [i,e] of s.enemies.entries())Object.assign(e,{x:i?10:2*sign,y:i?1:0});
  const p=new Presenter(assetScene(),{cache:createAssetCache({transport:pngTransport}),project:arenaToStage});await p.prepare([...new Set(s.actors.map(a=>s.characterDefinitions[a.definitionId]))]);
  const frames=[],events=[],damage=[],start=arenaToStage(a);
  function paint(label){const ds=s.drainDamageEvents();damage.push(...ds);for(const d of ds)p.hit(d,s.characterDefinitions[s.actorById(d.targetId).definitionId],s.elapsedSeconds);
   const es=s.drainCastEvents();events.push(...es);for(const e of es)p.cast(e,s.characterDefinitions[s.actorById(e.actorId).definitionId],s.elapsedSeconds);
   const snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));p.render(snap,s.elapsedSeconds,s.characterDefinitions);
   const images=[['actor',p.actorSprites.get('a1')],['target',p.actorSprites.get('e1')],...[...(p.actionEffects.get('a1')??[])]];
   const objects=images.filter(([,o])=>o?.visible&&!o.destroyed).map(([kind,o])=>{const entry=[...p.textures.values()].find(v=>v.key===o.texture);return {kind,path:'public/'+entry.asset.path,frame:o.frame?o.frame.split('.').map(Number):null,x:o.x-start.x+(sign>0?150:410),y:o.y-start.y+245,width:o.displayWidth,height:o.displayHeight,originX:o.originX,originY:o.originY,flipX:o.flipX,alpha:o.alpha,depth:o.depth,...(o.actionId?{actionId:o.actionId}:{})};});
   frames.push({label,time:s.elapsedSeconds,actor:{x:a.x,y:a.y,hp:a.hp},target:{x:t.x,y:t.y,hp:t.hp},objects});
  }
  paint('Idle');s.usePlayerAbility('a1','heavy',{facingX:sign});paint('Start');for(let i=0;i<50;i++){for(const b of s.actors)if(manual||b!==a)s.holdPlayerControl(b.instanceId);s.step(.02);paint('Playback');}
  scenarios.push({name,sign,manualHeld:manual,frames,events:events.filter(e=>e.actorId==='a1'),damage:damage.filter(d=>d.actorId==='a1')});p.destroy();
 }
 writeFileSync(out+(baseline?'trace-before.json':'trace-current.json'),JSON.stringify({kind:'Production simulation and presenter draw-command reconstruction; NOT screen recording',baselineCommit,version:baseline?'before':'current',stepMs:20,scenarios},null,2)+'\n');
 console.log('Captured',baseline?'before':'current',scenarios.length,'scenarios');
}finally{if(baseline)unlinkSync(temporary);}
