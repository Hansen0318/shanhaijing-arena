import {readFileSync} from 'node:fs';
// Only the external Phaser/image decoder boundary is doubled.
export async function pngTransport(record){const b=readFileSync('public/'+record.path);return {image:{width:b.readUInt32BE(16),height:b.readUInt32BE(20)},bytes:b.length};}
export function assetScene(){
 const keys=new Map(),objects=[];let bytes=0,peak=0;
 function image(x=0,y=0,texture,frame){const o={x,y,texture,frame,visible:true,alpha:1,destroyed:false,destroy(){this.destroyed=true;this.visible=false;}};
  for(const [method,fields] of Object.entries({setPosition:['x','y'],setTexture:['texture','frame'],setOrigin:['originX','originY'],setDisplaySize:['displayWidth','displayHeight'],setFlipX:['flipX'],setDepth:['depth'],setAlpha:['alpha'],setVisible:['visible'],setScale:['scale'],setRotation:['rotation']}))o[method]=(...values)=>{fields.forEach((f,i)=>o[f]=values[i]);return o;};
  for(const k of ['setCrop','clear','lineStyle','lineBetween','strokeCircle','fillStyle','fillCircle'])o[k]=()=>o;objects.push(o);return o;
 }
 return {keys,objects,budget:()=>({bytes,peak}),add:{image,graphics:()=>image()},textures:{addImage(key,im){bytes+=im.width*im.height*4;peak=Math.max(peak,bytes);const frames=new Set();const t={image:im,has:f=>frames.has(f),add:f=>frames.add(f)};keys.set(key,t);return t;},get:k=>keys.get(k),remove(k){const t=keys.get(k);if(t)bytes-=t.image.width*t.image.height*4;keys.delete(k);}}};
}
