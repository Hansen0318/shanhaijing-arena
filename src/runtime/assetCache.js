import {ASSET_LIMITS,CACHE_RETENTION_DEFAULTS} from '../assets/schema.js';
import {assetManifest} from '../assets/manifest.js';
import {resolveAsset,assetUrl} from '../assets/resolver.js';
export function createAssetCache({manifest=assetManifest,transport=browserImageTransport,maxEntries=CACHE_RETENTION_DEFAULTS.entries,maxBytes=CACHE_RETENTION_DEFAULTS.bytes}={}){
 if(!Number.isSafeInteger(maxEntries)||maxEntries<0||maxBytes!==null&&(!Number.isSafeInteger(maxBytes)||maxBytes<0))throw new RangeError('Invalid cache retention target');
 const cache=new Map(),pending=new Map(),queue=[];let bytes=0,active=0,highWaterBytes=0,loadedCount=0,failedCount=0;
 function runTransport(record){if(active>=2)return new Promise((resolve,reject)=>queue.push(()=>runTransport(record).then(resolve,reject)));active++;const release=()=>{active--;queue.shift()?.();};try{return Promise.resolve(transport(record)).finally(release);}catch(error){release();return Promise.reject(error);}}
 async function request(key){
  const record=resolveAsset(key,{manifest});if(record.type!=='image')return record;
  if(cache.has(record.key)){const value=cache.get(record.key);cache.delete(record.key);cache.set(record.key,value);return value;}
  if(pending.has(record.key))return pending.get(record.key);
  const promise=(async()=>{try{
   const loaded=await runTransport(record);const width=loaded.image?.naturalWidth??loaded.image?.width,height=loaded.image?.naturalHeight??loaded.image?.height;
   if(!Number.isInteger(width)||!Number.isInteger(height)||width<=0||height<=0||width>ASSET_LIMITS.dimension||height>ASSET_LIMITS.dimension||width*height>ASSET_LIMITS.pixels||width!==record.width||height!==record.height||!Number.isInteger(loaded.bytes)||loaded.bytes<=0||loaded.bytes>ASSET_LIMITS.bytes||loaded.bytes>record.bytes)throw Error('Decoded asset guard/metadata mismatch');
   const residentBytes=width*height*4,value=Object.freeze({...record,...loaded,residentBytes});
   cache.set(record.key,value);bytes+=residentBytes;highWaterBytes=Math.max(highWaterBytes,bytes);
   // Dropping a cache reference never destroys an image owned by a live scene.
   while(cache.size>maxEntries||maxBytes!==null&&bytes>maxBytes){const oldest=cache.keys().next().value;bytes-=cache.get(oldest).residentBytes;cache.delete(oldest);}
   loadedCount++;return value;
  }catch{failedCount++;const fallback=resolveAsset(record.fallback,{manifest,failed:new Set([record.key])});return fallback.type==='image'?request(fallback.key):fallback;}finally{pending.delete(record.key);}})();pending.set(record.key,promise);return promise;
 }
 function trim(targetBytes=0){if(!Number.isInteger(targetBytes)||targetBytes<0)throw new RangeError('Invalid trim target');for(const [key,value] of cache){if(bytes<=targetBytes)break;cache.delete(key);bytes-=value.residentBytes;}}
 return {load:request,record:key=>resolveAsset(key,{manifest}),trim,diagnostics:()=>({estimatedLiveBytes:bytes,highWaterBytes,loaded:loadedCount,failed:failedCount,pending:pending.size,active,queued:queue.length}),get size(){return cache.size;},get bytes(){return bytes;}};
}
export async function browserImageTransport(record){
 const response=await fetch(assetUrl(record),{signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error('Asset download failed');
 const declared=Number(response.headers.get('content-length'));if(declared>ASSET_LIMITS.bytes||declared>record.bytes)throw Error('Asset size exceeded');
 const blob=await response.blob();if(blob.size>ASSET_LIMITS.bytes||blob.size>record.bytes)throw Error('Asset size exceeded');
 const url=URL.createObjectURL(blob);try{const image=new Image();await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=url;});return {image,bytes:blob.size};}finally{URL.revokeObjectURL(url);}
}
export const battleAssetCache=createAssetCache();
