import {createScalingOptIn} from './tierScaling.js';
export const STATUS_TYPES=Object.freeze(['mitigation','incoming','outgoing','movement','avoidance','control','steadfast']);
export function validateStatus(input){
 if(!input||!STATUS_TYPES.includes(input.type)||!Number.isFinite(input.duration)||input.duration<=0||input.duration>30||!Number.isFinite(input.magnitude))throw new RangeError('Invalid status');
 const multiplier=['movement','outgoing'].includes(input.type),mitigation=['mitigation','incoming'].includes(input.type);
 if(multiplier&&(input.magnitude<1||input.magnitude>1.15)||mitigation&&(input.magnitude<0||input.magnitude>1)||!multiplier&&!mitigation&&input.magnitude!==1)throw new RangeError('Invalid status magnitude');
 if(input.policy!=null&&!['replace','strongest','stack'].includes(input.policy))throw new TypeError('Invalid status policy');
 if(input.maxStacks!=null&&(!Number.isInteger(input.maxStacks)||input.maxStacks<1||input.maxStacks>3))throw new RangeError('Invalid stack bound');
 createScalingOptIn(input.tierScaling,['duration','strength']);
 return input;
}
