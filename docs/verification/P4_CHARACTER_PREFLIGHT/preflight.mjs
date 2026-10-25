// Read-only current-source projection and bounded P4 timing probes; no proposed runtime.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {rosterCatalog} from '../../../src/roster/catalog.js';
import {formalAbilityDefinitions as definitions} from '../../../src/roster/abilities.js';
import {resolveTierProjection,resolveTierAbilities} from '../../../src/combat/tierEffects.js';
import {createCharacterState} from '../../../src/combat/character.js';
import {createBattleSession} from '../../../src/combat/battleSession.js';
const directory=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(directory,'../../..');
const reference='b7d696a56c1547de43b09afbe21e7a0e3f24c384',categories=['basic','heavy','special','awakening'];
const tiers=['T0','T1','T2','T3'],p4=rosterCatalog.P4;
const projections=tiers.map(tier=>{const p=resolveTierProjection(p4,tier,definitions),a=resolveTierAbilities(p,definitions);return {tier,stats:p.stats,scales:p.scales,aiProfile:p.aiProfile,effects:p.effects,basicIntervalSeconds:Math.max(.25,1/p.stats.attackSpeed),abilities:Object.fromEntries(categories.map(c=>[c,a[`P4.${c}`]]))};});
const tracked=execFileSync('git',['ls-tree','-r',reference,'--','src/combat','src/roster','src/assets','src/runtime/ArenaScene.js','src/runtime/passivePresenter.js','src/runtime/assetPresenter.js','src/campaign/battleFactory.js','src/dev/battleLab/battleFactory.js'],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
const sourceBindings=tracked.map(line=>{const [metadata,file]=line.split('\t'),sha=metadata.split(' ')[2];const actual=execFileSync('git',['hash-object',file],{cwd:root,encoding:'utf8'}).trim();assert.equal(actual,sha,file);return {path:file,gitBlobSha:sha};});
const baseline={schemaVersion:1,status:'CURRENT_IMPLEMENTED_BASELINE_NOT_NEW_APPROVAL',reference,characterId:'P4',formalActionDescriptors:p4.actionDescriptors??null,passive:definitions['P4.passive'],baseAnimationDescriptors:p4.animationDescriptors,assets:p4.assets,projections,sourceBindings};
const probes=[];
for(const row of projections)for(const tacticalEnabled of [false,true])for(const category of categories){
 const team=(prefix,teamId,coordinates)=>coordinates.map(([x,y],i)=>createCharacterState(p4,{instanceId:prefix+(i+1),teamId,x,y}));
 const allies=team('a','allies',[[0,0],[0,3],[0,-3]]),enemies=team('e','enemies',[[3,0],[3.2,.2],[6,3]]);
 const session=createBattleSession({allies,enemies,characterDefinitions:rosterCatalog,abilityDefinitions:definitions,tacticalEnabled,rng:()=>.99,tierByActorId:{a1:row.tier}});
 for(const a of session.actors){session.cadence.set(a.instanceId,999);for(const slot of Object.values(a.abilityState)){slot.phase='cooldown';slot.cooldownRemaining=999;}}
 const caster=allies[0],target=enemies[0];Object.assign(caster.abilityState[category],{phase:'ready',cooldownRemaining:0});session.cadence.set(caster.instanceId,0);
 assert.equal(session.executeAbility(caster,category,'player',target),true);
 const ability=row.abilities[category],dueMs=tacticalEnabled&&ability.telegraph?ability.telegraph.telegraphMs+ability.telegraph.projectileTravelMs:0;
 const atStart=session.drainDamageEvents();assert.equal(atStart.length>0,dueMs===0);
 let events=atStart;
 if(dueMs>0){session.cadence.set(caster.instanceId,999);for(const a of session.actors)session.holdPlayerControl(a.instanceId);session.step(dueMs/1000-.000001);assert.equal(session.drainDamageEvents().length,0);for(const a of session.actors)session.holdPlayerControl(a.instanceId);session.step(.000001);events=session.drainDamageEvents();assert(events.length>0);}
 assert.equal(events.length,category==='special'?2:1);
 const area=session.areas.records.size;assert.equal(area,row.tier==='T3'&&category==='awakening'?1:0);
 probes.push({tier:row.tier,tacticalEnabled,category,expectedImpactMs:dueMs,damageEvents:events.map(e=>({targetId:e.targetId,amount:e.amount,critical:e.critical,eventAt:e.eventAt})),residualAreaCount:area,passiveViews:session.snapshot().passives.length});
 session.clearTransientCombat();assert.equal(session.areas.records.size+session.threats.records.size+session.pendingActions.size+session.statuses.records.size,0);
}
fs.writeFileSync(path.join(directory,'baseline.json'),JSON.stringify(baseline,null,2)+'\n');
fs.writeFileSync(path.join(directory,'current-source-probes.json'),JSON.stringify({reference,scope:'32 isolated current P4 casts; no browser, proposed passive or device verification',passed:probes.length,probes},null,2)+'\n');
console.log(JSON.stringify({sourceBindings:sourceBindings.length,currentP4CastProbes:probes.length,status:'PASS'}));
