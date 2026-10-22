import {RESIDENCY_LIMITS} from '../assets/schema.js';
import {resolveAsset} from '../assets/resolver.js';

// One owner per scene. Pins describe presentation consumers, never combat state.
export class AssetResidency {
 constructor(scene,{cache,prefix='',softBytes=RESIDENCY_LIMITS.softBytes,onEvict=()=>{}}={}){
  if(!Number.isSafeInteger(softBytes)||softBytes<0)throw new RangeError('Invalid residency soft target');
  Object.assign(this,{scene,cache,prefix,softBytes,onEvict});
  this.textures=new Map();this.pins=new Map();this.pending=new Map();this.closed=false;this.bytes=0;this.reservedBytes=0;
  this.counters={requested:0,loaded:0,evicted:0,failed:0,highWaterBytes:0,loadOrder:[]};
 }
 record(key){return this.cache.record?.(key)??resolveAsset(key);}
 setPins(owner,keys){if(!this.closed)this.pins.set(owner,new Set(keys));}
 pinned(key){return [...this.pins.values()].some(keys=>keys.has(key));}
 release(owner){this.pins.delete(owner);this.reclaim();}
 touch(key){const value=this.textures.get(key);if(value){this.textures.delete(key);this.textures.set(key,value);}return value;}
 remove(key){const value=this.textures.get(key);if(!value)return;this.onEvict(key,value);this.scene.textures?.remove(value.key);this.textures.delete(key);this.bytes-=value.asset.width*value.asset.height*4;this.counters.evicted++;}
 evictOne(){for(const key of this.textures.keys())if(!this.pinned(key)){this.remove(key);return true;}return false;}
 reclaim(){while(this.bytes+this.reservedBytes>this.softBytes&&this.evictOne()){};}
 load(key,{required=true}={}){
  if(this.closed)return Promise.resolve(null);
  this.counters.requested++;
  if(this.textures.has(key))return Promise.resolve(this.touch(key));
  if(this.pending.has(key))return this.pending.get(key);
  const record=this.record(key);
  if(record.key!==key){this.counters.failed++;return Promise.reject(Error('Unknown asset key: '+key));}
  if(record.type!=='image')return Promise.resolve(null);
  const size=record.width*record.height*4;
  const task=(async()=>{
   let reserved=false;
   try{
    // Reclaim inactive textures before allocation, never reject or evict pins.
    while(this.bytes+this.reservedBytes+size>this.softBytes&&this.evictOne()){}
    this.reservedBytes+=size;reserved=true;
    this.counters.highWaterReservedBytes=Math.max(this.counters.highWaterReservedBytes??0,this.bytes+this.reservedBytes);
    const asset=await this.cache.load(key);
    if(this.closed)return null;
    if(!asset.image||asset.key!==key||asset.width!==record.width||asset.height!==record.height)throw Error('Required image load failed: '+key);
    const textureKey=this.prefix+key;
    try{if(typeof this.scene.textures?.addImage!=='function')throw Error('Texture manager unavailable');const texture=this.scene.textures.addImage(textureKey,asset.image);if(texture===null||texture===false)throw Error('Texture allocation failed');}
    catch(error){this.scene.textures?.remove(textureKey);throw error;}
    const value={key:textureKey,asset};this.textures.set(key,value);this.bytes+=size;
    this.counters.loaded++;this.counters.highWaterBytes=Math.max(this.counters.highWaterBytes,this.bytes);
    this.counters.loadOrder.push(key);if(this.counters.loadOrder.length>128)this.counters.loadOrder.shift();
    return value;
   }catch(error){if(!this.closed)this.counters.failed++;throw error;}
   finally{if(reserved)this.reservedBytes-=size;this.pending.delete(key);}
  })();
  this.pending.set(key,task);
  // A synchronous allocation failure still needs to release the dedupe entry.
  task.finally(()=>{if(this.pending.get(key)===task)this.pending.delete(key);}).catch(()=>{});
  return task;
 }
 snapshot(){return {...this.counters,loadOrder:[...this.counters.loadOrder],estimatedLiveBytes:this.bytes,reservedBytes:this.reservedBytes,pending:this.pending.size,pinned:[...this.textures.keys()].filter(k=>this.pinned(k)).length,softBytes:this.softBytes,closed:this.closed};}
 destroy(){if(this.closed)return;this.closed=true;this.pins.clear();for(const key of [...this.textures.keys()])this.remove(key);}
}
