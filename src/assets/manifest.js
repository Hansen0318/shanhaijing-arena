import {createAssetManifest,CHARACTER_SLOTS} from './schema.js';
const entries=[
 {key:'lushu.portrait',type:'image',path:'assets/characters/lushu/portrait-face.png',width:128,height:128,bytes:35172,fallback:'placeholder.portrait'},
 {key:'lushu.identity',type:'image',path:'assets/characters/lushu/identity.png',width:144,height:192,bytes:35708,fallback:'placeholder.portrait'},
 {key:'lushu.battleIdle',type:'image',path:'assets/characters/lushu/battleIdle-4f.png',width:384,height:128,bytes:70848,fallback:'placeholder.battle'},
 {key:'botuo.portrait',type:'image',path:'assets/characters/botuo/portrait.png',width:128,height:128,bytes:32501,fallback:'placeholder.portrait'},
 {key:'botuo.identity',type:'image',path:'assets/characters/botuo/identity.png',width:160,height:192,bytes:14098,fallback:'placeholder.portrait'},
 {key:'botuo.battleIdle',type:'image',path:'assets/characters/botuo/battleIdle-4f.png',width:640,height:160,bytes:31355,fallback:'placeholder.battle'},
 {key:'chiru.portrait',type:'image',path:'assets/characters/chiru/portrait.png',width:128,height:128,bytes:39490,fallback:'placeholder.portrait'},
 {key:'chiru.identity',type:'image',path:'assets/characters/chiru/identity.png',width:160,height:192,bytes:53023,fallback:'placeholder.portrait'},
 {key:'chiru.battleIdle',type:'image',path:'assets/characters/chiru/battleIdle.png',width:160,height:160,bytes:44131,fallback:'placeholder.battle'},
 {key:'placeholder.portrait',type:'procedural',path:null},
 {key:'placeholder.battle',type:'procedural',path:null},
 {key:'placeholder.vfx',type:'procedural',path:null},
 {key:'placeholder.stage',type:'procedural',path:null},
 {key:'placeholder.actor-strip',type:'image',path:'assets/pipeline/actor-strip.svg',width:64,height:32,bytes:400,fallback:'placeholder.battle'},
];
// Existing engineering preview inventory, not new Chapter content.
for(let chapter=1;chapter<=6;chapter++){
 entries.push({key:`chapter.${chapter}.preview`,type:'image',path:`campaign/chapter-${chapter}.svg`,width:640,height:300,bytes:4096,fallback:'placeholder.stage'});
 for(let stage=1;stage<=5;stage++)entries.push({key:`stage.${chapter}-${stage}.preview`,type:'image',path:`campaign/stage-${chapter}-${stage}.svg`,width:640,height:300,bytes:4096,fallback:'placeholder.stage'});
}
export const assetManifest=createAssetManifest(entries);
export const defaultCharacterAssets=Object.freeze(Object.fromEntries(CHARACTER_SLOTS.map(slot=>[slot,slot==='portraitSquare'||slot==='collectionArt'?'placeholder.portrait':slot.endsWith('Vfx')?'placeholder.vfx':'placeholder.battle'])));
