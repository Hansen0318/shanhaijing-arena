// Bounded observational BattleSession probe, not a new gameplay implementation.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createLabConfig} from '../../../src/dev/battleLab/config.js';
import {createLabBattleSession} from '../../../src/dev/battleLab/battleFactory.js';
const seed=JSON.parse(readFileSync(new URL('./static-seed.json',import.meta.url)));
const hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
for(const [p,h] of Object.entries(seed.sourceSha256))assert.equal(hash(p),h,p);
const cases=[];
function fixture(tactical=true,tier='T0'){
 const s=createLabBattleSession(createLabConfig({allyTeam:['P2','P3','P4'],enemyTeam:['P2','P5','P3'],allyTier:tier}),{seed:71,tacticalEnabled:tactical,rng:()=>.99});
 for(const a of s.actors){Object.assign(a,{x:9,y:1});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}
 const a=s.allies[0];Object.assign(a,{x:3,y:0});Object.assign(s.enemies[0],{x:4,y:0});Object.assign(s.enemies[1],{x:2,y:0});Object.assign(s.enemies[2],{x:8,y:0});
 Object.assign(s.allies[1],{x:4,y:0});Object.assign(s.allies[2],{x:8,y:1});Object.assign(a.abilityState.awakening,{phase:'ready',cooldownRemaining:0});
 return {s,a};
}
function advance(s,dt){for(const a of s.actors)s.holdPlayerControl(a.instanceId);s.step(dt);}
const events=s=>s.drainDamageEvents();
const protection=s=>[...s.statuses.records.values()].filter(r=>r.key==='boyi.team');
function cast(f,source){return source==='player'?f.s.usePlayerAbility(f.a.instanceId,'awakening'):f.s.executeAbility(f.a,'awakening','ai',f.s.enemies[0]);}
for(const tactical of [false,true])for(const source of ['player','ai']){
 const f=fixture(tactical),{s,a}=f;assert.equal(cast(f,source),true);const immediate=events(s);let resolved=immediate;
 if(tactical){assert.equal(immediate.length,0);assert.equal(s.threats.active(0)[0].impactAtMs,900);advance(s,.899);assert.equal(events(s).length,0);advance(s,.001);resolved=events(s);}
 assert.deepEqual(resolved.map(e=>e.targetId).sort(),['e1','e2']);assert.ok(resolved.every(e=>e.source===source&&e.category==='awakening'&&e.amount>0));
 assert.equal(s.pendingHits.length,0);assert.deepEqual([a.x,a.y],[3,0]);assert.equal(protection(s).length,0);
 cases.push({case:`T0 ${source} ${tactical?'tactical':'instant'}`,damageClockSeconds:s.elapsedSeconds,damageEvents:resolved,cooldownRemaining:a.abilityState.awakening.cooldownRemaining,protection:0});
}
// Locked cast-time circle survives caster/target motion; entrants are evaluated at resolve.
{
 const f=fixture(),{s,a}=f;cast(f,'player');const threat=s.threats.active(0)[0];assert.deepEqual(threat.geometry.center,{x:3,y:0});
 a.x=7;s.enemies[0].x=9;s.enemies[2].x=3.5;advance(s,.9);const hit=events(s);
 assert.deepEqual(hit.map(e=>e.targetId).sort(),['e2','e3']);cases.push({case:'locked center / escaping target / entering enemy',geometry:threat.geometry,casterAtResolve:{x:a.x,y:a.y},damageEvents:hit});
}
for(const tactical of [false,true]){
 const f=fixture(tactical,'T3');f.s.enemies.forEach(e=>e.x=9);assert.equal(cast(f,'player'),true);assert.equal(f.s.threats.active(0).length,0);assert.equal(events(f.s).length,0);assert.equal(protection(f.s).length,0);advance(f.s,1);assert.equal(events(f.s).length,0);assert.equal(protection(f.s).length,0);
 cases.push({case:`T3 player air / out of range ${tactical?'tactical':'instant'}`,cooldownConsumed:true,damageEvents:[],protection:0});
 const ai=fixture(tactical,'T3');ai.s.enemies.forEach(e=>e.x=9);assert.equal(cast(ai,'ai'),false);cases.push({case:`AI out-of-range ${tactical?'tactical':'instant'}`,castAccepted:false});
}
{
 const f=fixture(true,'T3'),{s,a}=f;cast(f,'player');const t=s.threats.active(0)[0];assert.equal(protection(s).length,0);s.enemies.forEach(e=>e.x=9);advance(s,t.impactAtMs/1000);assert.equal(events(s).length,0);assert.equal(protection(s).length,0);cases.push({case:'T3 tactical all escape => no post_cast protection',impactAtMs:t.impactAtMs,protection:0});
}
{
 const f=fixture(true,'T3'),{s,a}=f;cast(f,'player');const t=s.threats.active(0)[0];s.enemies[0].damage(99999);advance(s,t.impactAtMs/1000);assert.deepEqual(events(s).map(e=>e.targetId),['e2']);assert.equal(protection(s).length,2);cases.push({case:'locked target KO does not cancel surviving AoE victim',protected:protection(s)});
}
for(const tactical of [false,true]){
 const f=fixture(tactical,'T3'),{s,a}=f;
 Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});assert.ok(s.usePlayerAbility(a.instanceId,'special'));const special=[...s.statuses.records.values()];assert.equal(special.length,2);
 cast(f,'player');if(tactical){assert.equal(protection(s).length,0);const t=s.threats.active(0)[0];a.x=6;Object.assign(s.allies[1],{x:6.5,y:0});Object.assign(s.allies[2],{x:9,y:1});advance(s,(t.impactAtMs-.001)/1000);assert.equal(protection(s).length,0);advance(s,.000001);}
 const ps=protection(s);assert.deepEqual(ps.map(r=>r.targetId).sort(),['a1','a2']);assert.ok(ps.every(r=>r.magnitude===.135&&Math.abs(r.expiryTime-r.startTime-3.75)<1e-9));for(const r of special)assert.equal(s.statuses.records.get(r.id),r);
 const onset=s.elapsedSeconds,dm=s.statuses.damageMultiplier('a1',onset);assert.equal(dm,1-special.find(r=>r.targetId==='a1').magnitude);
 advance(s,3.749);assert.equal(protection(s).length,2);advance(s,.001);assert.equal(protection(s).length,0);assert.ok(s.statuses.records.has(special[0].id));
 cases.push({case:`T3 Special coexistence / ${tactical?'resolve-time recipient center':'instant'} / expiry`,onsetSeconds:onset,protection:ps,specialIdsPreserved:special.map(r=>r.id),effectiveSelfDamageMultiplier:dm,expiredAt:s.elapsedSeconds});
}
for(const ko of ['source','recipient']){
 const f=fixture(false,'T3'),{s,a}=f;cast(f,'player');assert.equal(protection(s).length,2);(ko==='source'?a:s.allies[1]).damage(99999);advance(s,.001);assert.equal(protection(s).length,ko==='source'?0:1);cases.push({case:`T3 ${ko} KO cleanup`,remaining:protection(s)});
}
{
 const f=fixture(true,'T3');cast(f,'player');f.a.damage(99999);advance(f.s,.9);assert.equal(events(f.s).length,0);assert.equal(protection(f.s).length,0);assert.equal(f.s.threats.records.size,0);cases.push({case:'source KO before tactical resolve cancels damage and protection'});
}
const report={status:'PASS',kind:'Representative real BattleSession mechanics probe; not full regression, Browser, runtime art or player acceptance',sourceCommit:'8d7fb0b863e45e8a247780632ab79955eb361ae8',command:'node docs/verification/P2_AWAKENING_PREFLIGHT/probe.mjs',staticSourceHashesUnchanged:true,sourceSha256:{...seed.sourceSha256,'src/combat/statuses.js':hash('src/combat/statuses.js'),'src/combat/ability.js':hash('src/combat/ability.js')},caseCount:cases.length,cases};
writeFileSync(new URL('./mechanics.json',import.meta.url),JSON.stringify(report,null,2)+'\n');console.log(`PASS ${cases.length} bounded cases; unchanged static seed source hashes; no production edits.`);
