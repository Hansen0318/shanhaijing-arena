// Authored vector sources, separate from action/blade/contact artwork.
// Exact footprint and countdown always come from the combat threat record.
const motifs=new Set(['wind','stone','water']);
export function warningSet(motif,alliedColor){
 return Object.freeze(Object.fromEntries(['basic','heavy','special','awakening'].map((category,i)=>[category,Object.freeze({
  renderer:'ground-sigil-v1',motif,alliedColor,enemyColor:0xff6854,
  shapes:Object.freeze(['circle','lane']),marks:4+i*2,
 })])));
}
export const windWarnings=warningSet('wind',0x8ef4de);
export const stoneWarnings=warningSet('stone',0xf0cb75);
export const waterWarnings=warningSet('water',0x70deee);
export function resolveWarning(source,shape){
 if(source?.renderer!=='ground-sigil-v1'||!motifs.has(source.motif)||!source.shapes?.includes(shape)||
  ![source.alliedColor,source.enemyColor].every(c=>Number.isInteger(c)&&c>=0&&c<=0xffffff)||
  !Number.isInteger(source.marks)||source.marks<4||source.marks>12)return null;
 return source;
}
