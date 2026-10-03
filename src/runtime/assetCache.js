import {ASSET_LIMITS} from '../assets/schema.js';
import {assetManifest} from '../assets/manifest.js';
import {resolveAsset,assetUrl} from '../assets/resolver.js';
export function createAssetCache({manifest=assetManifest,transport=browserImageTransport,maxEntries=ASSET_LIMITS.cacheEntries,maxBytes=ASSET_LIMITS.cacheBytes}={}){
 if(!Number.isInteger(maxEntries)||maxEntries<1||maxEntries>ASSET_LIMITS.cacheEntries||!Number.isInteger(maxBytes)||maxBytes<1||maxBytes>ASSET_LIMITS.cacheBytes)throw new RangeError('Invalid cache budget');
 const cache=new Map(),pending=new Map(),queue=[];let bytes=0,active=0;
 function runTransport(record){if(active>=2)return new Promise((resolve,reject)=>queue.push(()=>runTransport(record).then(resolve,reject)));active++;const release=()=>{active--;queue.shift()?.();};try{return Promise.resolve(transport(record)).finally(release);}catch(error){release();return Promise.reject(error);}}
 async function request(key){
  const record=resolveAsset(key,{manifest});if(record.type!=='image')return record;
  if(cache.has(record.key)){const value=cache.get(record.key);cache.delete(record.key);cache.set(record.key,value);return value;}
  if(pending.has(record.key))return pending.get(record.key);
  if(pending.size>=ASSET_LIMITS.cacheEntries)return resolveAsset(record.fallback,{manifest});
  const promise=(async()=>{try{
   const loaded=await runTransport(record);const width=loaded.image?.naturalWidth??loaded.image?.width,height=loaded.image?.naturalHeight??loaded.image?.height;
   if(!Number.isInteger(width)||!Number.isInteger(height)||width<=0||height<=0||width>ASSET_LIMITS.dimension||height>ASSET_LIMITS.dimension||width*height>ASSET_LIMITS.pixels||width!==record.width||height!==record.height||!Number.isInteger(loaded.bytes)||loaded.bytes<=0||loaded.bytes>ASSET_LIMITS.bytes||loaded.bytes>record.bytes||loaded.bytes>maxBytes)throw Error('Decoded asset budget/metadata mismatch');
   const residentBytes=width*height*4;if(residentBytes>maxBytes)throw Error('Decoded memory budget exceeded');const value=Object.freeze({...record,...loaded,residentBytes});
   while(cache.size>=maxEntries||bytes+residentBytes>maxBytes){const oldest=cache.keys().next().value;if(oldest===undefined)break;bytes-=cache.get(oldest).residentBytes;cache.delete(oldest);}
   cache.set(record.key,value);bytes+=residentBytes;return value;
  }catch{const fallback=resolveAsset(record.fallback,{manifest,failed:new Set([record.key])});return fallback.type==='image'?request(fallback.key):fallback;}finally{pending.delete(record.key);}})();pending.set(record.key,promise);return promise;
 }
 return {load:request,get size(){return cache.size;},get bytes(){return bytes;}};
}
export async function browserImageTransport(record){
 const response=await fetch(assetUrl(record),{signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error('Asset download failed');
 const declared=Number(response.headers.get('content-length'));if(declared>ASSET_LIMITS.bytes||declared>record.bytes)throw Error('Asset size exceeded');
 const blob=await response.blob();if(blob.size>ASSET_LIMITS.bytes||blob.size>record.bytes)throw Error('Asset size exceeded');
 const url=URL.createObjectURL(blob);try{const image=new Image();await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=url;});return {image,bytes:blob.size};}finally{URL.revokeObjectURL(url);}
}
export const battleAssetCache=createAssetCache();
