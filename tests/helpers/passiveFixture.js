import {createLabBattleSession} from '../../src/dev/battleLab/battleFactory.js';
import {createLabConfig} from '../../src/dev/battleLab/config.js';
export function passiveFixture({tier='T0',enabled=true,enemy=false}={}){
 const session=createLabBattleSession(createLabConfig({allyTeam:['P1','P2','P3'],enemyTeam:['P1','P4','P5'],allyTier:tier,enemyTier:tier,skipCountdown:true}),{tacticalEnabled:false,rng:()=>.99});
 if(!enabled)session.passives?.clear();
 for(const [i,a]of session.actors.entries()){
  Object.assign(a,{x:10,y:i<3?1.8:-1.8});session.holdPlayerControl(a.instanceId);session.setPlayerMovement(a.instanceId,{x:0,y:0});session.cadence.set(a.instanceId,99);
  for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});
 }
 const actor=session.actorById(enemy?'e1':'a1');Object.assign(actor,{x:0,y:0});return {session,actor};
}

export function stepHeld(session,dt){for(const a of session.actors)session.holdPlayerControl(a.instanceId);return session.step(dt);}
