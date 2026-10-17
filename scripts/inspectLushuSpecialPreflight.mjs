// Read-only art preflight: actual campaign mechanics, no runtime/data mutation.
import assert from 'node:assert/strict';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
const cases=[];
for(const sign of [1,-1])for(const source of ['player','ai']){
 const s=createStageBattleSession({...findStage('1-1'),selectedTeam:['P1','P2','P3'],enemyLineup:['P2','P5','P3']},{tacticalEnabled:false,rng:()=>.99});
 const a=s.actorById('a1'),t=s.actorById('e1');Object.assign(a,{x:0,y:0});Object.assign(t,{x:2*sign,y:0});
 const before={time:s.elapsedSeconds,x:a.x,y:a.y,targetHp:t.hp};
 assert.equal(s.executeAbility(a,'special',source,t),true);
 const events=s.drainCastEvents(),damage=s.drainDamageEvents();
 assert.equal(damage.length,1);assert.ok(damage[0].amount>0);assert.equal(s.elapsedSeconds,before.time);assert.equal(s.pendingActions.size,0);
 assert.ok(Math.abs(a.x-sign*.65/Math.SQRT2)<1e-9);assert.ok(Math.abs(a.y-sign*.65/Math.SQRT2)<1e-9);assert.equal(a.abilityState.special.cooldownRemaining,6);
 cases.push({source,facing:sign,before,after:{time:s.elapsedSeconds,x:a.x,y:a.y,targetHp:t.hp,cooldown:a.abilityState.special.cooldownRemaining},events,damage});
}
console.log(JSON.stringify({scope:'Read-only actual campaign preflight, not art/runtime acceptance',ability:formalAbilityDefinitions['P1.special'],cases},null,2));
