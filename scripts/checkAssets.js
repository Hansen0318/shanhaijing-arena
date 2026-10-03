import {readFileSync,statSync} from 'node:fs';
import {resolve} from 'node:path';import {fileURLToPath} from 'node:url';
import {assetManifest,defaultCharacterAssets} from '../src/assets/manifest.js';import {ASSET_LIMITS} from '../src/assets/schema.js';
import {rosterCatalog} from '../src/roster/catalog.js';import {campaign} from '../src/campaign/data.js';import {grayboxAnimation} from '../src/assets/battleDescriptors.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
function dimensions(buffer,path){
 if(path.endsWith('.svg')){const text=buffer.toString();if(/<script|<foreignObject|\bon\w+\s*=|(?:href|url)\s*[=(]["']?https?:/i.test(text))throw Error('Unsafe external/active SVG');return {width:Number(text.match(/<svg[^>]*\bwidth=["'](\d+)["']/)?.[1]),height:Number(text.match(/<svg[^>]*\bheight=["'](\d+)["']/)?.[1])};}
 if(path.endsWith('.png')&&buffer.toString('hex',0,8)==='89504e470d0a1a0a')return {width:buffer.readUInt32BE(16),height:buffer.readUInt32BE(20)};
 if(path.endsWith('.webp')&&buffer.toString('ascii',8,12)==='WEBP'){
  const kind=buffer.toString('ascii',12,16);if(kind==='VP8X')return {width:buffer.readUIntLE(24,3)+1,height:buffer.readUIntLE(27,3)+1};if(kind==='VP8 ')return {width:buffer.readUInt16LE(26)&16383,height:buffer.readUInt16LE(28)&16383};if(kind==='VP8L'){const bits=buffer.readUInt32LE(21);return {width:(bits&16383)+1,height:((bits>>>14)&16383)+1};}
 }
 if(/\.jpe?g$/.test(path)&&buffer[0]===255&&buffer[1]===216){let pos=2;while(pos+9<buffer.length){if(buffer[pos]!==255)break;const marker=buffer[pos+1],length=buffer.readUInt16BE(pos+2);if([192,193,194,195,197,198,199,201,202,203,205,206,207].includes(marker))return {height:buffer.readUInt16BE(pos+5),width:buffer.readUInt16BE(pos+7)};if(length<2)break;pos+=2+length;}}
 throw Error('Unsupported/corrupt image dimensions: '+path);
}
export function validateAssetFiles({manifest,root,referencedKeys}){
 const used=new Set();for(const key of referencedKeys){let asset=manifest[key];if(!asset)throw Error('Missing asset reference: '+key);while(asset&&!used.has(asset.key)){used.add(asset.key);asset=manifest[asset.fallback];}}
 let files=0,bytes=0;for(const asset of Object.values(manifest)){
  if(!used.has(asset.key))throw Error('Orphan asset key: '+asset.key);if(asset.type!=='image')continue;
  const path=resolve(root,asset.path),size=statSync(path).size;if(size>asset.bytes||size>ASSET_LIMITS.bytes)throw Error('Asset file size budget: '+asset.key);
  const d=dimensions(readFileSync(path),path);if(d.width!==asset.width||d.height!==asset.height||d.width>ASSET_LIMITS.dimension||d.height>ASSET_LIMITS.dimension)throw Error('Asset dimension mismatch: '+asset.key);files++;bytes+=size;
 }return {files,bytes};
}
export function presentationReferences(characters,stages,abilities){
 const refs=[];const vfx=d=>{if(d?.assetKey)refs.push(d.assetKey);if(d?.animation?.source)refs.push(d.animation.source);};
 for(const c of characters){for(const value of Object.values(c.assets??{}))if(typeof value==='string')refs.push(value);else if(value)refs.push(...Object.values(value));for(const d of Object.values(c.animationDescriptors??{}))if(d.source)refs.push(d.source);for(const d of Object.values(c.vfxDescriptors??{}))vfx(d);}
 for(const a of Object.values(abilities))vfx(a.presentation?.vfx);for(const stage of stages)if(stage.battleAssetKey)refs.push(stage.battleAssetKey);return refs;
}
export function validateCurrentAssets(){
 const refs=[...Object.values(defaultCharacterAssets),grayboxAnimation.source,'placeholder.stage'];
 refs.push(...presentationReferences(Object.values(rosterCatalog),campaign.flatMap(c=>c.stages),formalAbilityDefinitions));
 for(const chapter of campaign)for(const path of [chapter.thumbnail,...chapter.stages.map(s=>s.previewImage)]){const record=Object.values(assetManifest).find(a=>a.path===path);if(!record)throw Error('Unmanifested preview: '+path);refs.push(record.key);}
 return validateAssetFiles({manifest:assetManifest,root:fileURLToPath(new URL('../public/',import.meta.url)),referencedKeys:refs.filter(Boolean)});
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log('Asset guard PASS',validateCurrentAssets());
