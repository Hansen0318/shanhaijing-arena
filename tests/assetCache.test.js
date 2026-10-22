import test from 'node:test';import assert from 'node:assert/strict';import {createAssetManifest} from '../src/assets/schema.js';
const api=await import('../src/runtime/assetCache.js').catch(()=>({}));
const m=createAssetManifest([{key:'p',type:'procedural',path:null},{key:'a',type:'image',path:'a.png',width:8,height:8,bytes:50,fallback:'p'},{key:'b',type:'image',path:'b.png',width:8,height:8,bytes:50,fallback:'p'}]);
test('cache is idle until requested and shares decode across concurrent/retry loads',async()=>{
 assert.equal(typeof api.createAssetCache,'function');let calls=0;const cache=api.createAssetCache({manifest:m,transport:async()=>{calls++;return {image:{width:8,height:8},bytes:50};}});
 assert.equal(calls,0);const [a,b]=await Promise.all([cache.load('a'),cache.load('a')]);assert.equal(a,b);assert.equal(calls,1);assert.equal(await cache.load('a'),a);assert.equal(calls,1);await cache.load('p');assert.equal(calls,1);
});
test('failed downloads/unsafe decoded dimensions fall back and can retry',async()=>{
 assert.equal(typeof api.createAssetCache,'function');let fail=true;const cache=api.createAssetCache({manifest:m,transport:async()=>{if(fail)throw Error('offline');return {image:{width:8,height:8},bytes:50};}});
 assert.equal((await cache.load('a')).key,'p');fail=false;assert.equal((await cache.load('a')).key,'a');
 const huge=api.createAssetCache({manifest:m,transport:async()=>({image:{width:99999,height:8},bytes:50})});assert.equal((await huge.load('a')).key,'p');
});
test('cache bounds resident images and handles unknown keys without crashing',async()=>{
 assert.equal(typeof api.createAssetCache,'function');const cache=api.createAssetCache({manifest:m,maxEntries:1,maxBytes:512,transport:async()=>({image:{width:8,height:8},bytes:50})});await cache.load('a');await cache.load('b');assert.equal(cache.size,1);assert.equal((await cache.load('missing')).type,'procedural');
});
test('resident memory budget counts decoded pixels and bounds parallel decode',async()=>{
 const cache=api.createAssetCache({manifest:m,maxBytes:300,transport:async()=>({image:{width:8,height:8},bytes:50})});await cache.load('a');await cache.load('b');assert.equal(cache.size,1);assert.equal(cache.bytes,256);
 const manifest=createAssetManifest([...Object.values(m),{...m.a,key:'c',path:'c.png'}]);let running=0,maximum=0;const releases=[];
 const q=api.createAssetCache({manifest,transport:()=>{running++;maximum=Math.max(maximum,running);return new Promise(r=>releases.push(()=>{running--;r({image:{width:8,height:8},bytes:50});}));}});const pending=Promise.all(['a','b','c'].map(k=>q.load(k)));assert.equal(releases.length,2);releases.shift()();await new Promise(r=>setImmediate(r));while(releases.length)releases.shift()();await pending;assert.equal(maximum,2);
});
test('image fallback chain actually loads and caches the valid secondary image',async()=>{
 const manifest=createAssetManifest([{key:'p',type:'procedural',path:null},{key:'a',type:'image',path:'a.png',width:8,height:8,bytes:100,fallback:'b'},{key:'b',type:'image',path:'b.png',width:8,height:8,bytes:100,fallback:'p'}]);const calls=[];
 const cache=api.createAssetCache({manifest,transport:async r=>{calls.push(r.key);if(r.key==='a')throw Error('missing');return {image:{width:8,height:8},bytes:50};}});
 const value=await cache.load('a');assert.ok(value.image);assert.equal(value.key,'b');assert.deepEqual(calls,['a','b']);await cache.load('b');assert.deepEqual(calls,['a','b']);
});
test('a valid decoded image larger than retention target still resolves as its image',async()=>{
 const cache=api.createAssetCache({manifest:m,maxBytes:1,transport:async()=>({image:{width:8,height:8},bytes:50})});
 const value=await cache.load('a');assert.equal(value.key,'a');assert.ok(value.image);assert.equal(value.residentBytes,256);
 assert.equal(cache.bytes,0,'inactive decoded image is not retained above target');assert.equal(cache.diagnostics().failed,0);
});
test('more than64 distinct pending requests all resolve with only two transports',async()=>{
 const manifest=createAssetManifest([{key:'p',type:'procedural'},...Array.from({length:70},(_,i)=>({key:'image'+i,type:'image',path:'image'+i+'.png',width:8,height:8,bytes:50,fallback:'p'}))]);
 let running=0,peak=0,calls=0;
 const cache=api.createAssetCache({manifest,transport:async()=>{calls++;running++;peak=Math.max(peak,running);await new Promise(r=>setImmediate(r));running--;return {image:{width:8,height:8},bytes:50};}});
 const values=await Promise.all(Array.from({length:70},(_,i)=>cache.load('image'+i)));
 for(let i=0;i<70;i++){assert.equal(values[i].key,'image'+i);assert.ok(values[i].image);}
 assert.equal(calls,70);assert.equal(peak,2);assert.equal(cache.diagnostics().pending,0);assert.equal(cache.diagnostics().failed,0);
 for(let i=0;i<70;i++)assert.equal((await cache.load('image'+i)).key,'image'+i);
});
test('retention targets above former limits are accepted without weakening individual guards',async()=>{
 const cache=api.createAssetCache({manifest:m,maxEntries:70,maxBytes:20*1024*1024,transport:async()=>({image:{width:8,height:8},bytes:51})});
 assert.equal((await cache.load('a')).key,'p','actual encoded bytes still obey record metadata');
 for(const maxBytes of [NaN,Infinity,-1])assert.throws(()=>api.createAssetCache({maxBytes}),RangeError);
});
test('default cache retains a complete32MiB working set without a16MiB byte target',async()=>{
 const manifest=createAssetManifest(['one','two'].map(key=>({key,type:'image',path:key+'.png',width:2048,height:2048,bytes:50})));
 const cache=api.createAssetCache({manifest,transport:async()=>({image:{width:2048,height:2048},bytes:50})});
 await cache.load('one');await cache.load('two');assert.equal(cache.size,2);assert.equal(cache.bytes,33554432);cache.trim();assert.equal(cache.bytes,0);
});
