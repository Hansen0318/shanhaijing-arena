import test from 'node:test';
import assert from 'node:assert/strict';
const schema=await import('../src/assets/schema.js').catch(()=>({}));
test('manifest rejects duplicate keys, unresolved fallback and cycles',()=>{
 assert.equal(typeof schema.createAssetManifest,'function');
 const p={key:'fallback',type:'procedural',path:null};
 assert.throws(()=>schema.createAssetManifest([p,p]),/duplicate/i);
 assert.throws(()=>schema.createAssetManifest([{key:'a',type:'image',path:'a.png',width:32,height:32,bytes:100,fallback:'missing'}]),/fallback/i);
 assert.throws(()=>schema.createAssetManifest([{...p,key:'a',fallback:'b'},{...p,key:'b',fallback:'a'}]),/cycle/i);
});
test('manifest guards texture size, unsafe paths and metadata immutability',()=>{
 assert.equal(typeof schema.createAssetManifest,'function');
 const a={key:'a',type:'image',path:'assets/a.png',width:32,height:32,bytes:100,metadata:{tags:['placeholder']}};
 for(const change of [{width:4096},{bytes:5000000},{path:'../a.png'},{path:'https://other/a.png'},{height:NaN},{type:'audio'}])assert.throws(()=>schema.createAssetManifest([{...a,...change}]));
 const m=schema.createAssetManifest([a]);a.metadata.tags.push('mutated');assert.deepEqual(m.a.metadata.tags,['placeholder']);assert.ok(Object.isFrozen(m.a.metadata.tags));
});
test('central manifest and standard slots support future characters without ID branches',async()=>{
 assert.equal(schema.CHARACTER_SLOTS?.length,9);
 const {assetManifest,defaultCharacterAssets}=await import('../src/assets/manifest.js');
 const future={id:'future-20',assets:defaultCharacterAssets};
 for(const slot of schema.CHARACTER_SLOTS)assert.ok(assetManifest[future.assets[slot]]);
 const {rosterCatalog}=await import('../src/roster/catalog.js');for(const c of Object.values(rosterCatalog))for(const slot of schema.CHARACTER_SLOTS)assert.ok(assetManifest[c.assets[slot]]);
});
