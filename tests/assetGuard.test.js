import test from 'node:test';import assert from 'node:assert/strict';import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';
const api=await import('../scripts/checkAssets.js').catch(()=>({}));
test('build guard verifies actual dimensions/weight and rejects orphan/missing refs',()=>{
 assert.equal(typeof api.validateAssetFiles,'function');const root=mkdtempSync(join(tmpdir(),'arena-assets-'));
 try{writeFileSync(join(root,'a.svg'),'<svg width="32" height="32"></svg>');const manifest={a:{key:'a',type:'image',path:'a.svg',width:32,height:32,bytes:100}};
 assert.equal(api.validateAssetFiles({manifest,root,referencedKeys:['a']}).files,1);
 assert.throws(()=>api.validateAssetFiles({manifest,root,referencedKeys:[]}),/orphan/i);
 assert.throws(()=>api.validateAssetFiles({manifest,root,referencedKeys:['a','unknown']}),/reference/i);
 writeFileSync(join(root,'a.svg'),'<svg width="9000" height="32"></svg>');assert.throws(()=>api.validateAssetFiles({manifest,root,referencedKeys:['a']}),/dimension/i);
 }finally{rmSync(root,{recursive:true,force:true});}
});
test('current runtime inventory passes actual file guard',()=>{assert.equal(typeof api.validateCurrentAssets,'function');const result=api.validateCurrentAssets();assert.equal(result.files,40);assert.ok(result.bytes<160000);});
test('guard gathers ability-specific VFX and current stage battle references',()=>{
 assert.equal(typeof api.presentationReferences,'function');const refs=api.presentationReferences([{assets:{battleIdle:'idle'},abilities:{heavy:'h'}}],[{battleAssetKey:'stage'}],{h:{presentation:{vfx:{assetKey:'skill',animation:{source:'frames'}}}}});for(const key of ['idle','stage','skill','frames'])assert.ok(refs.includes(key));
});
