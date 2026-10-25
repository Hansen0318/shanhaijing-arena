import {animationDescriptor,vfxDescriptor,actionDescriptor} from './descriptors.js';
import {resolveCharacterAsset} from './resolver.js';
export {INSPECTION_SLOTS} from './inspectionSlots.js';
export const grayboxAnimation=animationDescriptor({source:'placeholder.actor-strip',frames:[{x:0,y:0,width:32,height:32},{x:32,y:0,width:32,height:32}],fps:2,loop:true,staticFrame:0});
const defaults=Object.freeze({basic:{form:'burst',duration:.32,scale:.5},heavy:{form:'ring',duration:.32,scale:1},special:{form:'projectile',duration:.32,scale:.6},awakening:{form:'burst',duration:.48,scale:1.4}});
export function characterAction(character,category){const input=character?.actionDescriptors?.[category];return input?actionDescriptor(input):null;}
export function characterActionAssetKeys(character,category){
 const action=characterAction(character,category);if(!action)return [];
 const keys=[action.animation.source];
 const visit=value=>{if(!value||typeof value!=='object')return;for(const [key,v]of Object.entries(value)){if(key==='assetKey')keys.push(v);else visit(v);}};
 visit(action);return [...new Set(keys)];
}
export function characterAnimation(character,state){
 try{return animationDescriptor(character?.animationDescriptors?.[state]??{source:resolveCharacterAsset(character,state).key,loop:state==='battleIdle',duration:state==='battleIdle'?1:.4});}
 catch{return animationDescriptor({source:'placeholder.battle',duration:.4});}
}
export function characterVfx(character,category,ability=null){
 try{return vfxDescriptor(ability?.presentation?.vfx??character?.vfxDescriptors?.[category]??{...defaults[category],assetKey:resolveCharacterAsset(character,`${category}Vfx`).key,rotation:'facing'});}
 catch{return vfxDescriptor(defaults[category]??{});}
}
