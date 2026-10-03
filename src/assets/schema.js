export const CHARACTER_SLOTS=Object.freeze(['portraitSquare','collectionArt','battleIdle','battleHit','battleKo','basicVfx','heavyVfx','specialVfx','awakeningVfx']);
export const ASSET_LIMITS=Object.freeze({bytes:4*1024*1024,dimension:2048,pixels:4194304,cacheBytes:16*1024*1024,cacheEntries:64});
export function immutable(value){const copy=structuredClone(value);function freeze(v){if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v);}return v;}return freeze(copy);}
export function createAssetManifest(entries){
 const result=Object.create(null);
 for(const entry of entries){
  if(!entry||!/^[-\w.]+$/.test(entry.key??''))throw new TypeError('Invalid asset key');
  if(Object.hasOwn(result,entry.key))throw new TypeError('Duplicate asset key');
  if(!['image','procedural'].includes(entry.type))throw new TypeError('Invalid asset type');
  if(entry.type==='image'){
   if(typeof entry.path!=='string'||!/^[-\w/]+\.(svg|png|webp|jpg|jpeg)$/.test(entry.path)||entry.path.startsWith('/')||entry.path.split('/').includes('..'))throw new TypeError('Invalid asset path');
   for(const field of ['width','height','bytes'])if(!Number.isInteger(entry[field])||entry[field]<=0)throw new TypeError('Invalid asset dimensions/bytes');
   if(entry.width>ASSET_LIMITS.dimension||entry.height>ASSET_LIMITS.dimension||entry.width*entry.height>ASSET_LIMITS.pixels||entry.bytes>ASSET_LIMITS.bytes)throw new RangeError('Asset budget exceeded');
  }else if(entry.path!=null)throw new TypeError('Procedural asset cannot load a file');
  result[entry.key]=immutable(entry);
 }
 for(const entry of Object.values(result)){const seen=new Set();let current=entry;while(current?.fallback){if(seen.has(current.key))throw new TypeError('Fallback cycle');seen.add(current.key);current=result[current.fallback];if(!current)throw new TypeError('Unresolved fallback key');}}
 return Object.freeze(result);
}
