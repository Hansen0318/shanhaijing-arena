// Read-only, reproducible current-behavior evidence; not a new runtime feature.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {ActionPlayback} from '../src/assets/actionPlayback.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {ASSET_LIMITS} from '../src/assets/schema.js';

const evidence=[];
for(const source of ['player','ai'])for(const tacticalEnabled of [true,false])for(const x of [2,-2]){
 const s=createStageBattleSession({...findStage('1-1'),selectedTeam:['P1','P2','P3']},{seed:41,tacticalEnabled});
 const a=s.actorById('a1'),e=s.actorById('e1');a.x=0;a.y=0;e.x=x;e.y=0;
 for(const id of ['e2','e3']){s.actorById(id).x=8;s.actorById(id).y=1;}
 const before={time:s.elapsedSeconds,actorX:a.x,targetHp:e.hp};
 assert.equal(s.executeAbility(a,'heavy',source,e),true);
 const casts=s.drainCastEvents(),damage=s.drainDamageEvents();
 assert.equal(s.elapsedSeconds,before.time);assert.ok(e.hp<before.targetHp);
 assert.ok(Math.abs(a.x-Math.sign(x)*1.35)<1e-9);assert.equal(casts.length,1);assert.equal(damage.length,1);
 assert.equal(casts[0].phase,undefined);assert.equal(casts[0].actionId,undefined);
 assert.equal(a.abilityState.heavy.cooldownRemaining,3);
 const playback=new ActionPlayback();playback.handle(casts[0],rosterCatalog.P1.actionDescriptors.basic);
 assert.equal(playback.active.size,0);
 evidence.push({source,tacticalEnabled,targetX:x,before,after:{time:s.elapsedSeconds,actorX:a.x,targetHp:e.hp,cooldownRemaining:a.abilityState.heavy.cooldownRemaining},castEvents:casts,damageEvents:damage,existingPhasedPlaybackStarted:false});
}
const textures=new Map();
const scene={textures:{addImage(key,image){textures.set(key,{image,has:()=>false,add(){}});},get:key=>textures.get(key),remove:key=>textures.delete(key)},add:{}};
const cache=createAssetCache({transport:async rec=>{
 const b=readFileSync(new URL('../public/'+rec.path,import.meta.url));
 assert.equal(b.readUInt32BE(16),rec.width);assert.equal(b.readUInt32BE(20),rec.height);
 return {image:{width:rec.width,height:rec.height},bytes:b.length};
}});
const presenter=new AssetPresenter(scene,{cache});
await presenter.prepare(Object.values(rosterCatalog));
const requiredBaseline=presenter.textureBytes;assert.equal(requiredBaseline,16763144);
const prep=JSON.parse(readFileSync(new URL('../docs/art/candidates/lushu/heavy/runtime-prep-v1/runtime-prep-manifest.json',import.meta.url)));
const baselineFiles=[...presenter.textures.entries()].map(([key,record])=>({key,decodedBytes:record.asset.width*record.asset.height*4}));
presenter.destroy();
const sourceFiles=['src/roster/abilities.js','src/combat/ability.js','src/combat/battleSession.js','src/combat/abilityMovement.js','src/assets/actionPlayback.js','src/runtime/assetPresenter.js'];
const output={status:'PREFLIGHT VERIFIED / ENGINEERING DESIGN REQUIRED',ability:formalAbilityDefinitions['P1.heavy'],
 observations:evidence,protectedSourceHashes:Object.fromEntries(sourceFiles.map(path=>[path,createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex')])),
 budget:{requiredBaseline,baselineFiles,hardLimit:ASSET_LIMITS.cacheBytes,additionalHeavy:prep.budget.additionalHeavyRuntimeBytes,naiveRequiredTotal:requiredBaseline+prep.budget.additionalHeavyRuntimeBytes,naiveAllPinnedFits:false},
 conclusion:'Heavy moves and damages in one call at unchanged simulation time, cooldown begins immediately. Cast has no phased action identity, so current four-pose ActionPlayback does not start. Accepted preview F3 begins280ms after F1; cannot preserve both full anticipation and immediate damage without an explicit real-timing decision. Added assets exceed existing16MiB if all stay pinned. No product source changes.'};
writeFileSync(new URL('../docs/art/candidates/lushu/heavy/runtime-prep-v1/timing-residency-preflight.json',import.meta.url),JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({cases:evidence.length,immediateMovementAndDamage:'CONFIRMED',existingPhasedPlayback:'DOES NOT START',requiredBaseline,extra:prep.budget.additionalHeavyRuntimeBytes,hardLimit:ASSET_LIMITS.cacheBytes},null,2));
