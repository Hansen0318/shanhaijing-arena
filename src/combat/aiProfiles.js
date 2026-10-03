const defaults={tag:'default',aggression:.5,preferredRangeMin:.6,preferredRangeMax:1.1,lateralVariation:.2,kiteTendency:0,retreatHpThreshold:0,reengageHpThreshold:.6,dangerRadius:.6,allyHealHpThreshold:.65,evadeTendency:.3,evadeReactionMs:180,protectAllyWeight:0,weakenedTargetWeight:.3,typeAdvantageWeight:.2,skillOpportunityWeight:.3};
export function createAIProfile(input={}) {
 const p={...defaults,...input,targetWeights:Object.freeze({distance:1,threat:.2,isolation:.1,...input.targetWeights})};
 if(typeof p.tag!=='string'||!p.tag)throw new TypeError('Profile tag required');
 for(const [k,v] of Object.entries(p))if(k!=='tag'&&k!=='targetWeights'&&(!Number.isFinite(v)||v<0))throw new RangeError(`Invalid profile ${k}`);
 for(const k of ['aggression','lateralVariation','kiteTendency','retreatHpThreshold','reengageHpThreshold','allyHealHpThreshold','evadeTendency'])if(p[k]>1)throw new RangeError(`Invalid profile ${k}`);
 for(const v of Object.values(p.targetWeights))if(!Number.isFinite(v)||v<0)throw new RangeError('Invalid target weight');
 if(p.preferredRangeMin>p.preferredRangeMax||p.retreatHpThreshold>=p.reengageHpThreshold)throw new RangeError('Invalid profile hysteresis');
 return Object.freeze(p);
}
