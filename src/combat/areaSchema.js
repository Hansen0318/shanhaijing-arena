import {validateStatus} from './statusSchema.js';
import {createScalingOptIn} from './tierScaling.js';
export function validateArea(input){
 if(!input||!Number.isFinite(input.radius)||input.radius<=0||input.radius>20||!Number.isFinite(input.duration)||input.duration<=0||input.duration>10||!Number.isFinite(input.interval)||input.interval<.2||!['enemy','ally','all'].includes(input.eligibility)||!['periodic','impact'].includes(input.behavior))throw new RangeError('Invalid bounded area data');
 if(input.coefficient!=null&&(!Number.isFinite(input.coefficient)||input.coefficient<=0||input.coefficient>1))throw new RangeError('Invalid area coefficient');
 createScalingOptIn(input.tierScaling,['aoe']);
 if(input.status)validateStatus(input.status);if(!input.coefficient&&!input.status)throw new TypeError('Area requires effect');return input;
}
