import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import vm from 'node:vm';
import {rosterCatalog} from '../src/roster/catalog.js';import {TeamSelection} from '../src/roster/team.js';import {renderTeamSelect} from '../src/roster/view.js';import {AssetPresenter} from '../src/runtime/assetPresenter.js';import {assetManifest} from '../src/assets/manifest.js';import {characterAnimation} from '../src/assets/battleDescriptors.js';import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';import {createLabConfig} from '../src/dev/battleLab/config.js';import {portraitCardLayout} from '../src/runtime/portraitCardLayout.js';import {battlePortrait} from '../src/roster/battlePresentation.js';
const node=tag=>({tag,classList:{add(){}},children:[],dataset:{},style:{},textContent:'',className:'',append(...n){this.children.push(...n);},replaceChildren(...n){this.children=n;this.textContent='';},setAttribute(k,v){this[k]=v;},removeAttribute(k){delete this[k];}});const walk=n=>[n,...n.children.flatMap(walk)];
test('upper 3v3 uses authored Idle previews when available, lower bench keeps portraits and actual Tier styling',()=>{
 const team=new TeamSelection({stage:{enemyLineup:['P1','P2','P3']},saved:['P1','P2','P3']}),page=node('main');renderTeamSelect(page,team,{document:{createElement:node},stageId:'1-1',tierByCharacterId:{P1:'T2'}});const all=walk(page);
 const upper=all.find(n=>n.className==='team-matchup'),lineup=walk(upper).filter(n=>n.className==='lineup-figure');assert.equal(lineup.length,6);
 const lushu=lineup.filter(n=>n.dataset.assetKey==='lushu.battleIdle'),botuo=lineup.filter(n=>n.dataset.assetKey==='botuo.battleIdle');assert.equal(lushu.length,2);assert.equal(botuo.length,2);assert.ok([...lushu,...botuo].every(n=>n.dataset.menuAnimation==='battleIdle'));
 assert.ok(walk(upper).some(n=>n.textContent==='VS'));assert.equal(walk(upper).some(n=>n.dataset.assetKey==='lushu.portrait'),false);
 const bench=all.find(n=>n.dataset.characterId==='P1');assert.equal(bench.dataset.tier,'T2');assert.ok(bench.style.backgroundImage.includes('linear-gradient'));assert.ok(walk(bench).some(n=>n.dataset.assetKey==='lushu.portrait'));
 all.find(n=>n.dataset.slot==='1').onclick();assert.equal(team.slots[0],null);assert.equal(team.canBattle,false);
});
function scene(){const images=[],textures=new Map();const make=()=>{const v={};for(const k of ['setTexture','setOrigin','setScale','setVisible','setDisplaySize','setPosition','setDepth','setAlpha','setFlipX','clear','lineStyle','strokeCircle','lineBetween','setRotation'])v[k]=(...a)=>{v[k.slice(3)]=a;return v;};v.destroy=()=>v.destroyed=true;return v;};return {images,add:{image(){const v=make();images.push(v);return v;},graphics:make},textures:{addImage(k){textures.set(k,{has:()=>true});},get:k=>textures.get(k),remove:k=>textures.delete(k)}};}
const cache={async load(key){const a=assetManifest[key];return a?.type==='image'?{...a,image:{}}:a??{type:'procedural'};}};
test('formal actor never vanishes during missing hit/cast/KO textures and follows current movement at the fixed origin',async()=>{
 const s=scene(),p=new AssetPresenter(s,{cache});await p.prepare([rosterCatalog.P1]);const actor={instanceId:'a1',definitionId:'P1',x:2,y:1,hp:245},f={allies:[actor],enemies:[]};p.render(f,0,rosterCatalog);
 p.hit({targetId:'a1'},rosterCatalog.P1,.1);actor.x=1.7;p.render(f,.2,rosterCatalog);const image=p.actorSprites.get('a1');assert.deepEqual(image.Visible,[true]);assert.deepEqual(image.Position,[1.7,1]);assert.deepEqual(image.Origin,[.5,691/724]);assert.deepEqual(image.DisplaySize,[108,144]);assert.deepEqual(image.FlipX,[true]);assert.equal(p.states.get('a1').state,'battleHit');
 p.setState('a1',characterAnimation(rosterCatalog.P1,'battleCast'),.2,'battleCast');p.render(f,.3,rosterCatalog);assert.deepEqual(image.Visible,[true]);p.render(f,.7,rosterCatalog);assert.equal(p.states.get('a1').state,'battleIdle');
 actor.hp=0;p.render(f,.8,rosterCatalog);assert.deepEqual(image.Visible,[true]);assert.deepEqual(image.Alpha,[.35]);assert.equal(p.states.get('a1').state,'battleKo');p.destroy();assert.ok(s.images.every(i=>i.destroyed));
});
test('real battle hit events retain both formal actors through a bounded deterministic combat run',async()=>{
 const session=createLabBattleSession(createLabConfig({skipCountdown:true})),s=scene(),p=new AssetPresenter(s,{cache});await p.prepare(Object.values(session.characterDefinitions));let hits=0,renders=0;
 for(let t=0;t<1000&&session.result()==='running';t++){
  session.step(.05);for(const event of session.drainDamageEvents()){hits++;p.hit(event,session.characterDefinitions[session.actorById(event.targetId).definitionId],session.elapsedSeconds);}
  const f=session.snapshot(),enrich=a=>({...a,definitionId:session.actorById(a.instanceId).definitionId});p.render({...f,allies:f.allies.map(enrich),enemies:f.enemies.map(enrich)},session.elapsedSeconds,session.characterDefinitions);
  for(const a of [...f.allies,...f.enemies])if(session.actorById(a.instanceId).definitionId==='P1'){assert.deepEqual(p.actorSprites.get(a.instanceId).Visible,[true]);renders++;}
 }assert.ok(hits>0);assert.ok(renders>10);p.destroy();
});
test('actual HUD creates no character name labels and retains six HP displays and selection states',()=>{
 const source=readFileSync('src/runtime/ArenaScene.js','utf8').replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene');const texts=[];const make=()=>{const v={children:[],width:0};for(const k of ['setDepth','setStrokeStyle','setOrigin','setInteractive','on','setScale','setAlpha'])v[k]=()=>v;v.add=n=>{v.children.push(...n);return v;};v.setText=t=>{v.text=t;return v;};return v;};
 const Arena=vm.runInNewContext(source+'\nArenaScene',{window:{},Phaser:{Scene:class{},Display:{Color:{HexStringToColor:()=>({color:1})}}},portraitCardLayout,battlePortrait,ARENA_STAGE:{width:1120},allyHud:a=>a.map(x=>({id:x.instanceId,hpText:'245 / 245',hpRatio:.8,alive:true,selected:x.instanceId==='a1'})),enemyHud:a=>a.map(x=>({id:x.instanceId,hpText:'245 / 245',hpRatio:.8,alive:true})),formatBattleTime:()=> '01:30'});
 const a=new Arena();a.session=createLabBattleSession(createLabConfig());a.add={container:make,rectangle:make,text(x,y,t){texts.push(t);return make();}};a.createHud();assert.equal(texts.some(t=>Object.values(rosterCatalog).some(c=>t.includes(c.name))),false);assert.equal(a.portraitViews.size,6);a.refreshHud(a.session.snapshot());for(const v of a.portraitViews.values()){assert.equal(v.hpText.text,'245 / 245');assert.ok(v.barFill.width>0);}
});

test('all four Tier borders are distinct and Collection reads earned Tier without modifying acquisition',async()=>{
 const {TIER_BORDER_COLORS,decorateSmallCard}=await import('../src/assets/cardPresentation.js');assert.equal(TIER_BORDER_COLORS.T0,'#ffffff');assert.equal(new Set(Object.values(TIER_BORDER_COLORS)).size,4);
 for(const tier of ['T0','T1','T2','T3']){const card=node('button');decorateSmallCard(card,rosterCatalog.P1,tier);assert.equal(card.style.borderColor,TIER_BORDER_COLORS[tier]);assert.equal(card.dataset.tier,tier);assert.ok(card.style.backgroundImage.indexOf('35%')<card.style.backgroundImage.indexOf('80%'));}
 const {CollectionView}=await import('../src/collection/view.js'),{CampaignController}=await import('../src/campaign/controller.js');const c=new CampaignController();c.acquisition.shardsByCharacterId.P1=30;c.acquisition.spentShardsByCharacterId.P1=30;c.acquisition.tierByCharacterId.P1='T3';const before=JSON.stringify(c.acquisition);
 const doc={createElement(tag){const n=node(tag);n.replaceChildren=(...v)=>n.children=v;n.addEventListener=()=>{};return n;}},page=doc.createElement('main'),v=new CollectionView(c,{document:doc});v.mount(page);const card=walk(page).find(n=>n.dataset.characterId==='P1');assert.equal(card.dataset.tier,'T3');assert.equal(card.style.borderColor,TIER_BORDER_COLORS.T3);assert.equal(JSON.stringify(c.acquisition),before);
});

test('upper and Collection retire formal placeholder names while lower roster preserves name and Type',async()=>{
 const page=node('main'),team=new TeamSelection({stage:{enemyLineup:['P1','P2','P3']},saved:['P1','P2','P3']});renderTeamSelect(page,team,{document:{createElement:node},stageId:'1-1'});
 const all=walk(page),upper=all.find(n=>n.className==='team-matchup');
 for(const host of walk(upper).filter(n=>n.dataset.formalArt==='true')){assert.equal(walk(host).some(n=>n.className==='matchup-identity'),false);const animated=walk(host).find(n=>n.dataset.menuAnimation==='battleIdle'),surface=animated??host,img=walk(surface).find(n=>n.tag==='img');assert.ok(img);if(animated){img.onerror();assert.ok(animated.dataset.assetKey.endsWith('.identity'));assert.ok(walk(animated).some(n=>n.tag==='img'));}else{const fallback=walk(host).find(n=>n.tag==='span'&&n.hidden===true);assert.ok(fallback);img.onload?.();assert.equal(fallback.hidden,true);img.onerror();assert.equal(fallback.hidden,false);}}
 const p1=all.find(n=>n.dataset.characterId==='P1');assert.ok(walk(p1).some(n=>n.className==='matchup-identity'));assert.ok(walk(p1).some(n=>n.textContent==='鹿蜀'));assert.ok(walk(p1).some(n=>n['aria-label']==='Type: Speed'));assert.ok(walk(p1).some(n=>n.tag==='img'&&n.src.endsWith('portrait.png')));
 const p2=all.find(n=>n.dataset.characterId==='P2');assert.ok(walk(p2).some(n=>n.className==='matchup-identity'));
 const {CollectionView}=await import('../src/collection/view.js'),{CampaignController}=await import('../src/campaign/controller.js');const doc={createElement(tag){const n=node(tag);n.replaceChildren=(...v)=>n.children=v;n.addEventListener=()=>{};return n;}},collection=doc.createElement('main');new CollectionView(new CampaignController(),{document:doc}).mount(collection);
 const formalP1=walk(collection).find(n=>n.dataset.characterId==='P1'),formalP2=walk(collection).find(n=>n.dataset.characterId==='P2'),placeholder=walk(collection).find(n=>n.dataset.characterId==='P3');
 assert.equal(walk(formalP1).some(n=>n.className==='collection-name'),false);assert.equal(walk(formalP2).some(n=>n.className==='collection-name'),false);assert.ok(walk(placeholder).some(n=>n.className==='collection-name'&&n.textContent==='赤鱬'));
});


test('future formal KO slot and animation descriptor replace static idle fallback without a new PNG',async()=>{
 for(const customDescriptor of [false,true]){
  const s=scene(),p=new AssetPresenter(s,{cache}),character={...rosterCatalog.P1,assets:{...rosterCatalog.P1.assets,battleKo:'lushu.identity'},animationDescriptors:{...rosterCatalog.P1.animationDescriptors,...(customDescriptor?{battleKo:{...rosterCatalog.P1.animationDescriptors.battleIdle,loop:false,staticFrame:3}}:{})}};
  await p.prepare([character]);const actor={instanceId:'a1',definitionId:'P1',x:2,y:1,hp:245},frame={allies:[actor],enemies:[]};p.render(frame,0,{P1:character});actor.hp=0;const before=JSON.stringify(frame);p.render(frame,.1,{P1:character});const image=p.actorSprites.get('a1');
  assert.equal(p.states.get('a1').state,'battleKo');assert.equal(p.states.get('a1').descriptor.source,customDescriptor?'lushu.battleIdle':'lushu.identity');
  if(customDescriptor){p.render(frame,1.3,{P1:character});assert.equal(image.Texture[1],'288.0.96.128');}else assert.ok(image.Texture[0].endsWith('lushu.identity'));
  assert.deepEqual(image.Visible,[true]);assert.deepEqual(image.Alpha,[.35]);assert.deepEqual(image.Position,[2,1]);assert.equal(JSON.stringify(frame),before);p.destroy();assert.ok(s.images.every(i=>i.destroyed));
 }
});
