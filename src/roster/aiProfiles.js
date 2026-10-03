import {createAIProfile} from '../combat/aiProfiles.js';
export const formalAIProfiles=Object.freeze({
 mobile_skirmisher:createAIProfile({tag:'mobile_skirmisher',aggression:.75,preferredRangeMin:.7,preferredRangeMax:1.15,lateralVariation:.95,kiteTendency:0,evadeTendency:.8,evadeReactionMs:120,dangerRadius:.5,weakenedTargetWeight:.7}),
 front_guard:createAIProfile({tag:'front_guard',aggression:.6,preferredRangeMin:.55,preferredRangeMax:1.15,lateralVariation:.15,kiteTendency:0,evadeTendency:.22,evadeReactionMs:260,protectAllyWeight:3,dangerRadius:.6,targetWeights:{distance:1,threat:1,isolation:0}}),
 rear_healer:createAIProfile({tag:'rear_healer',aggression:.3,preferredRangeMin:2.1,preferredRangeMax:3.2,lateralVariation:.3,kiteTendency:.65,retreatHpThreshold:.32,reengageHpThreshold:.62,dangerRadius:1.25,allyHealHpThreshold:.65,evadeTendency:.65,evadeReactionMs:180,protectAllyWeight:.3}),
 ranged_burst:createAIProfile({tag:'ranged_burst',aggression:.6,preferredRangeMin:2.4,preferredRangeMax:3.6,lateralVariation:.6,kiteTendency:.9,dangerRadius:1.3,evadeTendency:.65,evadeReactionMs:170,skillOpportunityWeight:1.3}),
 aggressive_bruiser:createAIProfile({tag:'aggressive_bruiser',aggression:.95,preferredRangeMin:.45,preferredRangeMax:.95,lateralVariation:.2,kiteTendency:0,evadeTendency:.3,evadeReactionMs:220,weakenedTargetWeight:1.2}),
});
