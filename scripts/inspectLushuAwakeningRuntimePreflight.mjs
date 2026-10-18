// Read-only executable probe. Proposed geometry is isolated math, NOT combat implementation.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
import {resolveTierProjection,resolveTierAbilities} from '../src/combat/tierEffects.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {arenaToStage} from '../src/runtime/arenaProjection.js';
import {createCharacterState} from '../src/combat/character.js';
import {resolveDamage} from '../src/combat/combatResolver.js';
import {DEFAULT_ARENA_BOUNDS as bounds} from '../src/combat/battleSession.js';
const hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const cases=[];
for(const team of ['a','e'])for(const source of ['player','ai'])for(const tacticalEnabled of [false,true])for(const sign of [-1,1]){
 const s=createStageBattleSession({...findStage('1-1'),selectedTeam:['P1','P2','P3'],enemyLineup:['P1','P2','P3']},{tacticalEnabled,rng:()=>.99});
 for(const a of s.actors){s.holdPlayerControl(a.instanceId);Object.assign(a,{x:10,y:1.9});}
 const a=s.actorById(team+'1'),t=s.actorById((team==='a'?'e':'a')+'1');
 Object.assign(a,{x:4,y:0});Object.assign(t,{x:4+sign*2,y:0});
 const initial=t.hp;assert.equal(s.executeAbility(a,'awakening',source,t),true);
 const casts=s.drainCastEvents();assert.equal(casts[0].phase,undefined);
 const observations=[{ms:0,events:s.drainDamageEvents()}];
 for(let i=0;i<6;i++){for(const actor of s.actors)s.holdPlayerControl(actor.instanceId);s.step(.05);const events=s.drainDamageEvents().filter(e=>e.actorId===a.instanceId);if(events.length)observations.push({ms:Math.round(s.elapsedSeconds*1000),events});}
 assert.deepEqual(observations.map(r=>r.ms),[0,150,250]);assert.equal(a.x,4);assert.equal(a.y,0);assert.equal(observations.flatMap(r=>r.events).length,3);
 cases.push({team,source,tacticalEnabled,sign,damageAtMs:observations.map(r=>r.ms),amounts:observations.flatMap(r=>r.events.map(e=>e.amount)),position:[a.x,a.y],initialHp:initial,finalHp:t.hp,actionId:casts[0].actionId??null});
}
const textures=new Map(),scene={textures:{addImage(k,image){const v={image,has:()=>false,add(){}};textures.set(k,v);return v;},get:k=>textures.get(k),remove:k=>textures.delete(k)}};
const cache=createAssetCache({transport:async r=>{const b=readFileSync('public/'+r.path);assert.equal(b.readUInt32BE(16),r.width);assert.equal(b.readUInt32BE(20),r.height);return {image:{width:r.width,height:r.height},bytes:b.length};}});
const presenter=new AssetPresenter(scene,{cache});await presenter.prepare(Object.values(rosterCatalog));
const budget={scene:presenter.residency.snapshot(),cache:cache.diagnostics(),files:[...presenter.textures].map(([key,v])=>({key,path:'public/'+v.asset.path,width:v.asset.width,height:v.asset.height,encodedBytes:readFileSync('public/'+v.asset.path).length,decodedBytes:v.asset.width*v.asset.height*4}))};
assert.equal(presenter.textureBytes,16775432);assert.equal(presenter.residency.reservedBytes,0);presenter.destroy();assert.equal(textures.size,0);
const tiers=['T0','T1','T2','T3'].map(tier=>{const p=resolveTierProjection(rosterCatalog.P1,tier,formalAbilityDefinitions),a=resolveTierAbilities(p,formalAbilityDefinitions)['P1.awakening'];return {tier,moveSpeed:p.stats.moveSpeed,cooldown:a.cooldown,range:a.range,damageScale:p.scales.damage,canCrit:a.canCrit};});
// Relative linear motion: earliest swept point/circle intersection in one slice.
function toi(a,b,t0,t1,r=.55){const x=a.x-t0.x,y=a.y-t0.y,dx=b.x-a.x-(t1.x-t0.x),dy=b.y-a.y-(t1.y-t0.y),c=x*x+y*y-r*r;if(c<=0)return 0;const q=dx*dx+dy*dy;if(q===0)return null;const z=x*dx+y*dy,disc=z*z-q*c;if(disc<0)return null;const u=(-z-Math.sqrt(disc))/q;return u>=0&&u<=1?u:null;}
const sweepCases=[
 {name:'stationary-crossing',a:{x:0,y:0},b:{x:3,y:0},t0:{x:2,y:0},t1:{x:2,y:0},hit:true},
 {name:'escaped-before-overlap',a:{x:0,y:0},b:{x:3,y:0},t0:{x:2,y:1},t1:{x:2,y:1.2},hit:false},
 {name:'moving-crossing',a:{x:0,y:0},b:{x:3,y:0},t0:{x:1.5,y:-1},t1:{x:1.5,y:1},hit:true},
 {name:'tangent',a:{x:0,y:0},b:{x:3,y:0},t0:{x:2,y:.55},t1:{x:2,y:.55},hit:true},
 {name:'outside-by-0.000001',a:{x:0,y:0},b:{x:3,y:0},t0:{x:2,y:.550001},t1:{x:2,y:.550001},hit:false},
].map(c=>{const u=toi(c.a,c.b,c.t0,c.t1);assert.equal(u!==null,c.hit);return {...c,toiFraction:u};});
// Probe independent geometry masks; no damage is applied here.
const masks=Array.from({length:8},(_,n)=>{const actual=[0,1,2].map(i=>toi({x:0,y:0},{x:3,y:0},{x:2,y:n&(1<<i)?0:1},{x:2,y:n&(1<<i)?0:1})!==null);assert.equal(actual.reduce((n,v,i)=>n+(v?1<<i:0),0),n);return {bitsHit0To2:actual.map(Number).join(''),coefficientSum:actual.reduce((s,v,i)=>s+(v?[.4,.7,1.1][i]:0),0)};});
function clipRay(s,u,length){let t=length;for(const [k,min,max] of [['x',bounds.xMin,bounds.xMax],['y',bounds.yMin,bounds.yMax]])if(u[k]>0)t=Math.min(t,(max-s[k])/u[k]);else if(u[k]<0)t=Math.min(t,(min-s[k])/u[k]);t=Math.max(0,t);return {x:s.x+u.x*t,y:s.y+u.y*t,length:t};}
const edgeCases=[];for(const s of [{x:bounds.xMax-.1,y:0},{x:bounds.xMin+.1,y:0},{x:5,y:1.9},{x:5,y:-1.9}])for(const u of [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:Math.SQRT1_2,y:Math.SQRT1_2}]){const end=clipRay(s,u,3.65);assert.ok(end.x>=bounds.xMin-1e-9&&end.x<=bounds.xMax+1e-9&&end.y>=bounds.yMin-1e-9&&end.y<=bounds.yMax+1e-9);edgeCases.push({s,u,end});}
const z=arenaToStage({x:0,y:0}),x=arenaToStage({x:1,y:0}),y=arenaToStage({x:0,y:1});
const route=[];for(const sign of [1,-1]){
 let x=5-sign,tx=5+sign;const rows=[];
 for(const [i,start,center,end,overrun] of [[0,80,110,135,.65],[1,135,260,280,1.10],[2,280,420,470,.65]]){
  const from=x,dir=Math.sign(tx-x)||sign,length=Math.abs(tx-x),u=toi({x:from,y:0},{x:tx,y:0},{x:tx,y:0},{x:tx,y:0});
  rows.push({hitIndex:i,startMs:start,centerMs:center,endMs:end,fromX:from,centerX:tx,overrun,finishX:tx+dir*overrun,approachSpeed:length/((center-start)/1000),stationaryContactMs:start+(u??1)*(center-start)});x=tx+dir*overrun;
 }
 route.push({sign,rows});
}
const hypotheticalWeightedDamage=Object.values(rosterCatalog).map(d=>{
 const attacker=createCharacterState(rosterCatalog.P1,{instanceId:'probe-a',teamId:'a',x:0,y:0}),defender=createCharacterState(d,{instanceId:'probe-t',teamId:'t',x:0,y:0});
 const amounts=[.4,.7,1.1].map(coefficient=>resolveDamage({attacker,defender,attackerDefinition:rosterCatalog.P1,defenderDefinition:d,abilityDefinition:{...formalAbilityDefinitions['P1.awakening'],effect:{coefficient}},rng:()=>.99}).amount);
 return {targetId:d.id,targetHp:d.stats.maxHp,amounts,hpPercent:amounts.map(a=>100*a/d.stats.maxHp)};
});
const evidence={scope:'READ-ONLY BASELINE AND ISOLATED PROPOSAL MATH; NOT IMPLEMENTED ENGINEERING PASS',hypotheticalWeightedDamage,routeExamples:route,sourceHead:'a82d544028ba5e701a159b6bddb7d0ed9dfe44f4',cases,tiers,bounds,projection:{xPixelsPerUnit:x.x-z.x,yPixelsPerUnit:y.y-z.y},budget,sweepCases,masks,edgeCases,tickQuantization:{stepMs:50,deadlinesMs:[80,110,135,260,280,420,470,610],observedAtMs:[100,150,150,300,300,450,500,650]},sourceHashes:Object.fromEntries(['src/combat/battleSession.js','src/combat/ability.js','src/combat/abilityMovement.js','src/assets/actionPlayback.js','src/assets/descriptors.js','src/runtime/assetPresenter.js','src/runtime/castVfx.js','src/runtime/ArenaScene.js','src/runtime/assetCache.js','src/runtime/assetResidency.js','src/roster/catalog.js','src/roster/abilities.js','src/assets/manifest.js'].map(p=>[p,hash(p)]))};
writeFileSync('docs/verification/M5C_P1_AWAKENING_RUNTIME_PREFLIGHT.json',JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify({baselineCases:cases.length,currentDamageAtMs:cases[0].damageAtMs,baselineDecoded:budget.scene.estimatedLiveBytes,freeBytes:16777216-budget.scene.estimatedLiveBytes,cachePeak:budget.cache.highWaterBytes,sweepCases:sweepCases.length,hitMasks:masks.length,edgeCases:edgeCases.length,tiers}));
