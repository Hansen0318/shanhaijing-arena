// Read-only preflight; saves evidence, never product code or deployed assets.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {ASSET_LIMITS} from '../src/assets/schema.js';
const root=new URL('../',import.meta.url);
const digest=path=>createHash('sha256').update(readFileSync(new URL(path,root))).digest('hex');
const acceptance=JSON.parse(readFileSync(new URL('docs/art/approved/lushu/special/review-v2/acceptance.json',root)));
for(const file of acceptance.files)assert.equal(digest(file.path),file.sha256);
const cases=[];
for(const source of ['player','ai'])for(const tacticalEnabled of [true,false])for(const sign of [1,-1]){
 const s=createStageBattleSession({...findStage('1-1'),selectedTeam:['P1','P2','P3'],enemyLineup:['P2','P5','P3']},{tacticalEnabled,rng:()=>.99});
 const a=s.actorById('a1'),target=s.actorById('e1');Object.assign(a,{x:0,y:0});Object.assign(target,{x:2*sign,y:0});
 const before={at:s.elapsedSeconds,x:a.x,y:a.y,hp:target.hp};
 assert.equal(s.executeAbility(a,'special',source,target),true);
 const casts=s.drainCastEvents(),damage=s.drainDamageEvents();
 assert.equal(damage.length,1);assert.equal(s.elapsedSeconds,before.at);assert.equal(s.pendingActions.size,0);
 assert.ok(Math.abs(a.x-sign*.65/Math.SQRT2)<1e-9);assert.ok(Math.abs(a.y-sign*.65/Math.SQRT2)<1e-9);
 assert.equal(a.abilityState.special.cooldownRemaining,6);assert.equal(casts[0].phase,undefined);
 cases.push({source,tacticalEnabled,sign,before,after:{at:s.elapsedSeconds,x:a.x,y:a.y,hp:target.hp,cooldown:a.abilityState.special.cooldownRemaining},damageCount:damage.length,phasedActionStarted:false});
}
const textures=new Map();
const scene={textures:{addImage(key,image){textures.set(key,{image,has:()=>false,add(){}});},get:key=>textures.get(key),remove:key=>textures.delete(key)},add:{}};
const cache=createAssetCache({transport:async record=>{
 const b=readFileSync(new URL('public/'+record.path,root));
 assert.equal(b.readUInt32BE(16),record.width);assert.equal(b.readUInt32BE(20),record.height);
 return {image:{width:record.width,height:record.height},bytes:b.length};
}});
const presenter=new AssetPresenter(scene,{cache});await presenter.prepare(Object.values(rosterCatalog));
const required=presenter.textureBytes;assert.equal(required,16748808);
const baselineFiles=[...presenter.textures.entries()].map(([key,record])=>({key,decodedBytes:record.asset.width*record.asset.height*4}));presenter.destroy();
const proposal={characterStrip:{width:512,height:128},sourceVfx:{width:112,height:112},contactVfx:{width:128,height:86}};
const additional=Object.values(proposal).reduce((sum,r)=>sum+r.width*r.height*4,0);
const evidence={status:'GIF/VFX APPROVED / READ-ONLY PREFLIGHT PASS / REAL TIMING AND RESIDENCY DESIGN REQUIRED',
 approval:'docs/art/approved/lushu/special/review-v2/acceptance.json',ability:formalAbilityDefinitions['P1.special'],cases,
 protectedSources:Object.fromEntries(['src/roster/abilities.js','src/combat/battleSession.js','src/assets/actionPlayback.js','src/runtime/assetPresenter.js','src/roster/catalog.js','src/assets/manifest.js'].map(p=>[p,digest(p)])),
 timing:{actualWindupMs:0,approvedPreviewContactMs:320,sharedPendingActionSupportsOptInWindup:true,realTimingApproved:false,
 recommended:'Explicit real320ms windup: spend cooldown at start; existing shared resolve performs diagonal reposition and one hit together at320ms, with F3/target impact/HP at that same real resolve.'},
 budget:{hardLimit:ASSET_LIMITS.cacheBytes,requiredBaseline:required,freeBytes:ASSET_LIMITS.cacheBytes-required,baselineFiles,
 exampleDerivativeDimensions:proposal,exampleAdditionalDecodedBytes:additional,naiveTotal:required+additional,
 naiveFits:required+additional<=ASSET_LIMITS.cacheBytes,
 policy:'Do not publish high-resolution review cells, enlarge16MiB, degrade art to fit28KiB, or alter another approved character as an unreviewed workaround. Measure a bounded exact-pixel packaging or shared action-residency solution before integration.'},
 conclusion:'Approval closes art/GIF gates and authorizes scoped deployment. It does not specify actual320ms timing. Existing Special remains immediate and emits no phased actionId, so accepted full anticipation and real contact cannot both be matched without a material timing decision. No product/runtime source changed.'};
writeFileSync(new URL('docs/art/candidates/lushu/special/review-v2/integration-preflight.json',root),JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify({acceptedHashesVerified:acceptance.files.length,cases:cases.length,actualWindupMs:0,previewWindupMs:320,budget:evidence.budget},null,2));
