import {approvedRuntimeAsset} from './helpers/approvedRuntimeAsset.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {inflateSync} from 'node:zlib';
import {rosterCatalog} from '../src/roster/catalog.js';
import {assetManifest} from '../src/assets/manifest.js';
import {resolveCharacterAsset} from '../src/assets/resolver.js';
import {characterAnimation} from '../src/assets/battleDescriptors.js';
import {animationFrame} from '../src/assets/playback.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';
import {ASSET_LIMITS} from '../src/assets/schema.js';

// Only external renderer and decoder are doubled; catalog/state/playback/session are real.
async function fixture(reducedMotion=false){
 const textures=new Map(),loaded=[];
 const scene={textures:{addImage(key){textures.set(key,{has:()=>false,add(){}});},get:key=>textures.get(key),remove:key=>textures.delete(key)},add:{image(){const image={setTexture(key,frame){this.texture=[key,frame];return this;},destroy(){}};for(const method of ['setOrigin','setScale','setVisible','setDisplaySize','setFlipX','setPosition','setDepth','setAlpha'])image[method]=(...args)=>{image[method+'Value']=args;return image;};return image;}}};
 const cache={async load(key){loaded.push(key);const a=assetManifest[key];return {...a,...(a?.type==='image'?{image:{width:a.width,height:a.height}}:{})};}};
 const p=new AssetPresenter(scene,{cache,reducedMotion});await p.prepare([rosterCatalog.P1,rosterCatalog.P2,rosterCatalog.P3]);
 const actor={instanceId:'a3',definitionId:'P3',x:3,y:0,hp:235},frame={allies:[actor],enemies:[]};
 return {p,actor,frame,loaded,render:now=>p.render(frame,now,rosterCatalog)};
}

test('approved P3 KO resolves, preloads inside the shared budget and is one static grounded frame',async()=>{
 const a=approvedRuntimeAsset(resolveCharacterAsset(rosterCatalog.P3,'battleKo'));assert.equal(a.key,'chiru.battleKo');assert.equal(a.path,'assets/characters/chiru/battleKo.png');assert.deepEqual([a.width,a.height,a.bytes],[1254,1254,905147]);assert.equal(a.fallback,'placeholder.battle');
 const d=characterAnimation(rosterCatalog.P3,'battleKo');assert.equal(d.source,a.key);assert.deepEqual(d.frames,[{x:0,y:0,width:1254,height:1254}]);assert.equal(d.duration,1);assert.equal(d.loop,false);assert.equal(d.staticFrame,0);assert.deepEqual(d.origin,[.5,980/1254]);assert.equal(d.scale,2);
 for(const reduced of [false,true])for(const elapsed of [0,.1,1,10])assert.equal(animationFrame(d,elapsed,reduced).index,0);
 const f=await fixture();assert.ok(f.loaded.includes(a.key));assert.ok(f.p.textures.has(a.key));assert.ok(Number.isFinite(f.p.textureBytes)&&f.p.textureBytes>0);f.p.destroy();assert.equal(f.p.textureBytes,0);
});

for(const reduced of [false,true])for(const left of [false,true])test(`KO freezes last ${left?'left':'right'} facing, alpha/anchor and static state (reduced=${reduced})`,async()=>{
 const f=await fixture(reduced);f.render(0);f.actor.x+=left?-.1:.1;f.render(.1);const image=f.p.actorSprites.get('a3');assert.ok(image.texture[0].endsWith('chiru.battleMove'));assert.deepEqual(image.setFlipXValue,[left]);
 f.actor.hp=0;const before=structuredClone(f.frame);for(const now of [.2,1.2,10,100]){f.render(now);assert.ok(image.texture[0].endsWith('chiru.battleKo'));assert.equal(image.texture[1],'0.0.1254.1254');assert.deepEqual(image.setFlipXValue,[left]);assert.deepEqual(image.setOriginValue,[.5,980/1254]);assert.deepEqual(image.setDisplaySizeValue,[144,144]);assert.deepEqual(image.setPositionValue,[f.actor.x,f.actor.y]);assert.deepEqual(image.setAlphaValue,[.35]);assert.equal(f.p.states.get('a3').state,'battleKo');assert.deepEqual(f.frame,before);}
 assert.equal(rosterCatalog.P3.stats.moveSpeed,1.6);f.p.destroy();
});

test('real dead BattleSession actor remains gameplay-owned while actual presenter selects static KO',async()=>{
 const f=await fixture(),s=createStageBattleSession({...findStage('1-1'),selectedTeam:['P3','P1','P2']});
 const render=()=>{const before=structuredClone(s.snapshot()),snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));f.p.render(snap,s.elapsedSeconds,rosterCatalog);assert.deepEqual(s.snapshot(),before);};
 render();s.holdPlayerControl('a1');s.setPlayerMovement('a1',{x:-1,y:0});s.step(.05);render();const a=s.actorById('a1');a.damage(a.maxHp);const position=[a.x,a.y];render();
 for(let i=0;i<3;i++){s.step(.05);render();assert.deepEqual([a.x,a.y],position);assert.ok(f.p.actorSprites.get('a1').texture[0].endsWith('chiru.battleKo'));assert.deepEqual(f.p.actorSprites.get('a1').setFlipXValue,[true]);}
 assert.equal(s.characterDefinitions.P3.stats.moveSpeed,1.6);f.p.destroy();
});

test('approved KO PNG bytes are untouched; visible ground contact aligns without cropping the source',()=>{
 const b=readFileSync(new URL('../public/assets/characters/chiru/battleKo.png',import.meta.url));assert.equal(b.length,905147);assert.equal(createHash('sha256').update(b).digest('hex'),'f97e369fe2c6ae2d0fff1c51c96e487279b4bbe1e614925a7d1c2c4dc2a2796d');assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.equal(b[24],8);assert.equal(b[25],6);assert.equal(b[28],0);
 const chunks=[];for(let p=8;p<b.length;){const n=b.readUInt32BE(p);if(b.toString('ascii',p+4,p+8)==='IDAT')chunks.push(b.subarray(p+8,p+8+n));p+=n+12;}
 const raw=inflateSync(Buffer.concat(chunks)),stride=1254*4,pixels=Buffer.alloc(stride*1254);
 const paeth=(a,b,c)=>{const p=a+b-c,da=Math.abs(p-a),db=Math.abs(p-b),dc=Math.abs(p-c);return da<=db&&da<=dc?a:db<=dc?b:c;};
 for(let y=0;y<1254;y++)for(let x=0;x<stride;x++){const filter=raw[y*(stride+1)],left=x>=4?pixels[y*stride+x-4]:0,up=y?pixels[(y-1)*stride+x]:0,ul=y&&x>=4?pixels[(y-1)*stride+x-4]:0;assert.ok(filter<=4);pixels[y*stride+x]=(raw[y*(stride+1)+1+x]+[0,left,up,Math.floor((left+up)/2),paeth(left,up,ul)][filter])&255;}
 let minX=1254,minY=1254,maxX=-1,maxY=-1;for(let y=0;y<1254;y++)for(let x=0;x<1254;x++)if(pixels[(y*1254+x)*4+3]>64){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}
 assert.deepEqual([minX,minY,maxX+1,maxY+1],[12,366,1240,980]);const d=rosterCatalog.P3.animationDescriptors.battleKo;assert.ok(Math.abs((maxY+1)/1254-d.origin[1])*144<.01);assert.ok((maxX+1-minX)*144/1254>133);assert.ok((maxY+1-minY)*144/1254<80,'low ground-rest silhouette, unlike living hover');
});
