import {createTierScalingProfile} from '../combat/tierScaling.js';
// Five validation archetypes. Full HP growth for all; role weights tune the shared curve.
export const formalTierScalingProfiles=Object.freeze({
 mobile_skirmisher:createTierScalingProfile({healingScaleWeight:.35,defenseEffectScaleWeight:.5,supportRangeScaleWeight:.5,persistentMagnitudeScaleWeight:.5}),
 front_guard:createTierScalingProfile({damageScaleWeight:.85,healingScaleWeight:.3,moveSpeedScaleWeight:.35,attackSpeedScaleWeight:.55,cooldownScaleWeight:.7,windupScaleWeight:.5,attackRangeScaleWeight:.65,aoeScaleWeight:.65,mobilityDistanceScaleWeight:.4,persistentMagnitudeScaleWeight:.5}),
 rear_healer:createTierScalingProfile({damageScaleWeight:.65,moveSpeedScaleWeight:.75,attackSpeedScaleWeight:.6,windupScaleWeight:.7,attackRangeScaleWeight:.8,aoeScaleWeight:.6,mobilityDistanceScaleWeight:.7,controlDurationScaleWeight:.5,persistentMagnitudeScaleWeight:.75}),
 ranged_burst:createTierScalingProfile({healingScaleWeight:.3,moveSpeedScaleWeight:.65,attackSpeedScaleWeight:.8,mobilityDistanceScaleWeight:.55,buffDurationScaleWeight:.65,defenseEffectScaleWeight:.5,controlDurationScaleWeight:.4,supportRangeScaleWeight:.5}),
 aggressive_bruiser:createTierScalingProfile({healingScaleWeight:.3,moveSpeedScaleWeight:.85,cooldownScaleWeight:.85,windupScaleWeight:.6,aoeScaleWeight:.6,buffDurationScaleWeight:.8,defenseEffectScaleWeight:.8,supportRangeScaleWeight:.5,persistentMagnitudeScaleWeight:.75}),
});
