// Documentation-only numerical probe. Run from repository root; no BattleSession or browser claim.
import {writeFileSync} from 'node:fs';
import {rosterCatalog} from '../../../src/roster/catalog.js';
import {formalAbilityDefinitions as abilities} from '../../../src/roster/abilities.js';
import {resolveTierProjection,resolveTierAbilities} from '../../../src/combat/tierEffects.js';
import {BattleStatuses} from '../../../src/combat/statuses.js';
import {resolveDamage} from '../../../src/combat/combatResolver.js';
import {createCharacterState} from '../../../src/combat/character.js';
const rows=[];
for(const [i,tier] of ['T0','T1','T2','T3'].entries()){
 const projection=resolveTierProjection(rosterCatalog.P2,tier,abilities),special=resolveTierAbilities(projection,abilities)['P2.special'],reduction=[.2,.3,.4,.5][i];
 const damage=values=>{
  const statuses=new BattleStatuses();values.forEach((magnitude,j)=>statuses.apply({sourceId:'defender',targetId:'defender',key:'projection-'+j,type:'mitigation',magnitude,duration:4},0));
  const defender=createCharacterState(rosterCatalog.P2,{instanceId:'defender',teamId:'ally',x:0,y:0});
  const before=defender.hp;
  const result=resolveDamage({attacker:{},defender,attackerDefinition:{type:'power',stats:{atk:109}},defenderDefinition:{type:'power',stats:{def:9}},abilityDefinition:{effect:{coefficient:1},canCrit:false},damageMultiplier:statuses.damageMultiplier('defender',0)});
  if(Math.abs(before-defender.hp-result.amount)>1e-8)throw Error('HP projection mismatch');return result.amount;
 };
 rows.push({tier,passiveReduction:reduction,duration:4,cooldown:8,normalizedUnmitigatedDamage:damage([]),passiveOnlyDamage:damage([reduction]),specialReduction:special.effect.reduction,specialDuration:special.effect.duration,specialOnlyDamage:damage([special.effect.reduction]),combinedDamage:damage([reduction,special.effect.reduction]),existingProtection:projection.effects.filter(e=>e.kind==='protect')});
}
const output={status:'PURE NUMERICAL PROJECTION / NOT NEW PASSIVE RUNTIME OR BROWSER EVIDENCE',method:'Existing CharacterState, BattleStatuses and resolveDamage; equal type, non-critical ATK109 minus DEF9 = 100. Hypothetical self-only statuses inserted for projection; P2.passive remains unimplemented. No session trigger or rendered cue tested.',rows};
writeFileSync(new URL('./numerical-projection.json',import.meta.url),JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify(rows.map(({tier,passiveOnlyDamage,specialOnlyDamage,combinedDamage})=>({tier,passiveOnlyDamage,specialOnlyDamage,combinedDamage}))));
