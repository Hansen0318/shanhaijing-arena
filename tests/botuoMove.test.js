import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {inflateSync} from 'node:zlib';
import {rosterCatalog} from '../src/roster/catalog.js';
import {assetManifest} from '../src/assets/manifest.js';
import {resolveCharacterAsset,encounterAssetKeys} from '../src/assets/resolver.js';
import {animationFrame} from '../src/assets/playback.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {findStage} from '../src/campaign/data.js';

// Renderer/decoder doubles only: use actual catalog, loading, presenter and session.
async function fixture(reducedMotion=false){
 const textures=new Map();
 const scene={textures:{addImage(key){textures.set(key,{has:()=>false,add(){}});},get:key=>textures.get(key),remove:key=>textures.delete(key)},add:{image(x,y,key,frame){const image={texture:[key,frame],setTexture(k,f){this.texture=[k,f];return this;},destroy(){}};for(const method of ['setOrigin','setScale','setVisible','setDisplaySize','setFlipX','setPosition','setDepth','setAlpha'])image[method]=(...args)=>{image[method+'Value']=args;return image;};return image;}}};
 const loaded=[],cache={async load(key){loaded.push(key);const a=assetManifest[key];return {...a,...(a?.type==='image'?{image:{width:a.width,height:a.height}}:{})};}};
 const p=new AssetPresenter(scene,{cache,reducedMotion});await p.prepare([rosterCatalog.P1,rosterCatalog.P2,rosterCatalog.P3]);
 const actor={instanceId:'a2',definitionId:'P2',x:2,y:0,hp:320},frame={allies:[actor],enemies:[]};
 return {p,actor,frame,loaded,render:now=>p.render(frame,now,rosterCatalog)};
}

test('P2 approved Move resolves and preloads four 160-square cells at 12fps without changing static idle',async()=>{
 const a=resolveCharacterAsset(rosterCatalog.P2,'battleMove');assert.equal(a.key,'botuo.battleMove');
 assert.equal(a.path,'assets/characters/botuo/battleMove-4f.png');assert.deepEqual([a.width,a.height,a.bytes],[640,160,158292]);assert.equal(a.fallback,'placeholder.battle');
 const d=rosterCatalog.P2.animationDescriptors.battleMove;assert.deepEqual(d.frames,[0,160,320,480].map(x=>({x,y:0,width:160,height:160})));
 assert.equal(d.source,a.key);assert.equal(d.fps,12);assert.equal(d.loop,true);assert.equal(d.staticFrame,0);assert.deepEqual(d.origin,[.5,158/160]);assert.equal(d.scale,2);
 assert.equal(rosterCatalog.P2.animationDescriptors.battleIdle.frames.length,1);
 assert.ok(encounterAssetKeys([rosterCatalog.P2]).includes(a.key));const f=await fixture();assert.ok(f.loaded.includes(a.key));f.p.destroy();
});

for(const reduced of [false,true])test(`P2 actual presenter cycles all four frames at ${reduced?6:12}fps and stops immediately`,async()=>{
 const f=await fixture(reduced),fps=reduced?6:12;f.render(0);const image=f.p.actorSprites.get('a2');assert.ok(image.texture[0].endsWith('botuo.battleIdle'));
 const seen=[];for(let i=0;i<=4;i++){
  f.actor.y+=.1;const before=structuredClone(f.frame),now=.1+(i?i/fps+.001:0);f.render(now);seen.push(image.texture[1]);
  assert.ok(image.texture[0].endsWith('botuo.battleMove'));assert.equal(image.texture[1],`${(i%4)*160}.0.160.160`);
  assert.deepEqual(image.setOriginValue,[.5,158/160]);assert.deepEqual(image.setDisplaySizeValue,[144,144]);assert.deepEqual(image.setPositionValue,[f.actor.x,f.actor.y]);assert.deepEqual(f.frame,before);
  f.render(now);assert.equal(image.texture[1],seen.at(-1));assert.ok(image.texture[0].endsWith('botuo.battleMove'));
 }
 assert.equal(new Set(seen).size,4);f.render(1.1);assert.ok(image.texture[0].endsWith('botuo.battleIdle'));assert.equal(image.texture[1],'0.0.160.160');
 f.actor.x-=.1;f.render(1.2);assert.deepEqual(image.setFlipXValue,[true]);f.actor.x+=.1;f.render(1.3);assert.deepEqual(image.setFlipXValue,[false]);
 f.actor.y-=.1;f.render(1.4);assert.ok(image.texture[0].endsWith('botuo.battleMove'));f.p.destroy();
});

test('P2 reduced cadence is half normal; decorative fallback and P1 contract remain intact',async()=>{
 const d=rosterCatalog.P2.animationDescriptors.battleMove;assert.ok(d);
 for(const [reduced,fps] of [[false,12],[true,6]])assert.deepEqual([0,1,2,3,4].map(i=>animationFrame(d,i/fps+1e-5,reduced,'locomotion').index),[0,1,2,3,0]);
 assert.equal(animationFrame(d,.09,false,'locomotion').index,1);assert.equal(animationFrame(d,.09,true,'locomotion').index,0);assert.equal(animationFrame(d,.5,true).index,0);
 assert.equal(rosterCatalog.P1.animationDescriptors.battleMove.fps,18);assert.equal(rosterCatalog.P1.stats.moveSpeed,2.05);
});

test('real P2 BattleSession snapshots, coordinates and moveSpeed remain gameplay-owned in both modes',async()=>{
 for(const reduced of [false,true]){
  const f=await fixture(reduced),s=createStageBattleSession({...findStage('1-1'),selectedTeam:['P2','P1','P3']});assert.equal(s.characterDefinitions.P2.stats.moveSpeed,1.45);
  const render=()=>{const before=structuredClone(s.snapshot()),snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));f.p.render(snap,s.elapsedSeconds,rosterCatalog);assert.deepEqual(s.snapshot(),before);assert.equal(s.characterDefinitions.P2.stats.moveSpeed,1.45);};
  render();const seen=new Set();for(let i=0;i<22;i++){s.holdPlayerControl('a1');s.setPlayerMovement('a1',{x:1,y:0});s.step(.05);render();seen.add(f.p.actorSprites.get('a1').texture[1]);}
  assert.deepEqual([...seen],['0.0.160.160','160.0.160.160','320.0.160.160','480.0.160.160']);
  s.holdPlayerControl('a1');s.setPlayerMovement('a1',{x:0,y:0});s.step(.05);render();assert.ok(f.p.actorSprites.get('a1').texture[0].endsWith('botuo.battleIdle'));f.p.destroy();
 }
});

test('approved PNG bytes and decoded per-cell padding/baseline prevent neighboring-frame bleed',()=>{
 const b=readFileSync(new URL('../public/assets/characters/botuo/battleMove-4f.png',import.meta.url));assert.equal(b.length,158292);assert.equal(createHash('sha256').update(b).digest('hex'),'fd9083cacfc38d1eb1fd17e5749615e9a51781a83f0d3dfa3759c1de41c5f26b');
 assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.equal(b.readUInt32BE(16),640);assert.equal(b.readUInt32BE(20),160);assert.equal(b[24],8);assert.equal(b[25],6);assert.equal(b[28],0);
 const chunks=[];for(let p=8;p<b.length;){const n=b.readUInt32BE(p);if(b.toString('ascii',p+4,p+8)==='IDAT')chunks.push(b.subarray(p+8,p+8+n));p+=n+12;}
 const raw=inflateSync(Buffer.concat(chunks)),stride=640*4,pixels=Buffer.alloc(stride*160);
 const paeth=(a,b,c)=>{const p=a+b-c,da=Math.abs(p-a),db=Math.abs(p-b),dc=Math.abs(p-c);return da<=db&&da<=dc?a:db<=dc?b:c;};
 for(let y=0;y<160;y++){const filter=raw[y*(stride+1)];assert.ok(filter<=4);for(let x=0;x<stride;x++){const left=x>=4?pixels[y*stride+x-4]:0,up=y?pixels[(y-1)*stride+x]:0,ul=y&&x>=4?pixels[(y-1)*stride+x-4]:0;pixels[y*stride+x]=(raw[y*(stride+1)+1+x]+[0,left,up,Math.floor((left+up)/2),paeth(left,up,ul)][filter])&255;}}
 const bottoms=[],cellHashes=[];for(let cell=0;cell<4;cell++){
  let min=160,max=-1,bottom=-1;const bytes=[];
  for(let y=0;y<160;y++){bytes.push(pixels.subarray(y*stride+cell*640,y*stride+(cell+1)*640));for(let x=0;x<160;x++)if(pixels[(y*640+cell*160+x)*4+3]){min=Math.min(min,x);max=Math.max(max,x);bottom=Math.max(bottom,y);}}
  assert.ok(min>0&&max<159,`cell ${cell+1} transparent side padding`);assert.ok(bottom<159);bottoms.push(bottom);cellHashes.push(createHash('sha256').update(Buffer.concat(bytes)).digest('hex'));
 }
 assert.equal(new Set(bottoms).size,1);assert.equal(new Set(cellHashes).size,4);
});
