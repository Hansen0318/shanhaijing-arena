// Pure T0-relative projection. No controller, storage, renderer or roster identity.
export const TIER_SCALE_FIELDS=Object.freeze(['hp','damage','healing','moveSpeed','attackSpeed','cooldown','windup','attackRange','aoe','mobilityDistance','buffDuration','defenseEffect','controlDuration','supportRange','persistentMagnitude']);
const row=v=>Object.freeze(Object.fromEntries(TIER_SCALE_FIELDS.map((k,i)=>[k,v[i]])));
export const TIER_POWER_CURVE=Object.freeze({
 T0:row([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),
 T1:row([1.5,1.45,1.45,1.08,1.1,.92,.95,1.05,1.04,1.06,1.08,1.1,1.08,1.05,1.45]),
 T2:row([2.25,2.05,2.05,1.16,1.22,.84,.9,1.1,1.08,1.12,1.15,1.2,1.15,1.1,2.05]),
 T3:row([3.75,3.2,3.2,1.28,1.4,.72,.82,1.18,1.15,1.2,1.25,1.35,1.25,1.18,3.2]),
});
export const TIER_SAFETY=Object.freeze({cooldown:.75,basicInterval:.25,windupMs:300,dodgeWindowMs:350,controlDuration:.5,avoidanceDuration:.4,steadfastDuration:1,mitigation:.5,aoeRadius:6,supportRange:20,mobilityDistance:4});
export function createTierScalingProfile(input={}){
 if(!input||typeof input!=='object'||Array.isArray(input))throw new TypeError('Invalid TierScalingProfile');
 const keys=TIER_SCALE_FIELDS.map(k=>k+'ScaleWeight');
 for(const [k,v] of Object.entries(input))if(!keys.includes(k)||!Number.isFinite(v)||v<0||v>1)throw new RangeError('Tier scale weights must be known fields in0–1');
 return Object.freeze(Object.fromEntries(keys.map(k=>[k,input[k]??1])));
}
export function resolveTierScaling(tier='T0',input={}){
 if(!Object.hasOwn(TIER_POWER_CURVE,tier))throw new TypeError('Invalid combat Tier');
 const p=createTierScalingProfile(input),curve=TIER_POWER_CURVE[tier];
 return Object.freeze(Object.fromEntries(TIER_SCALE_FIELDS.map(k=>[k,1+(curve[k]-1)*p[k+'ScaleWeight']])));
}
export function resolveTierStats(definition,scales){
 const s=definition.stats;
 return Object.freeze({...s,maxHp:s.maxHp*scales.hp,moveSpeed:s.moveSpeed*scales.moveSpeed,attackSpeed:s.attackSpeed*scales.attackSpeed});
}
