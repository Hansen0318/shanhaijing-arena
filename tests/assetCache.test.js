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
 assert.equal(typeof api.createAssetCache,'function');const cache=api.createAssetCache({manifest:m,maxEntries:1,maxBytes:100,transport:async()=>({image:{width:8,height:8},bytes:50})});await cache.load('a');await cache.load('b');assert.equal(cache.size,1);assert.equal((await cache.load('missing')).type,'procedural');
});
