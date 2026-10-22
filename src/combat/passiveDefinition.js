import {validateStatus} from './statusSchema.js';
import {freezeEffectData} from './tierEffects.js';
const positive=(v,label)=>{if(!Number.isFinite(v)||v<=0)throw new RangeError(`Invalid passive ${label}`);};
export function createPassiveDefinition(input){
 if(!input||!['id','name'].every(k=>typeof input[k]==='string'&&input[k].trim())||input.category!=='passive'||input.implemented!==true)throw new TypeError('Invalid implemented passive definition');
 const {trigger,effect,cooldownSeconds}=input;
 if(trigger?.kind!=='ordinary-distance')throw new TypeError('Unsupported passive trigger');
 positive(trigger.distance,'distance');positive(trigger.windowSeconds,'window');positive(cooldownSeconds,'cooldown');
 if(effect?.kind!=='status'||effect.type!=='movement')throw new TypeError('Unsupported passive effect');
 validateStatus(effect);
 if(cooldownSeconds<effect.duration)throw new RangeError('Passive cooldown must cover the active duration');
 const label=input.presentation?.label??input.name;
 if(typeof label!=='string'||!label.trim())throw new TypeError('Invalid passive label');
 return freezeEffectData({id:input.id,name:input.name,category:'passive',implemented:true,...(typeof input.description==='string'?{description:input.description}:{}),trigger:{kind:trigger.kind,distance:trigger.distance,windowSeconds:trigger.windowSeconds},cooldownSeconds,effect:{kind:'status',type:'movement',magnitude:effect.magnitude,duration:effect.duration},presentation:{label}});
}
