import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {allyHud,enemyHud} from '../src/runtime/battleHud.js';
import {arenaToStage,ARENA_STAGE} from '../src/runtime/arenaProjection.js';

// Execute the production scene method with display doubles; no second HP implementation.
const source=readFileSync(new URL('../src/runtime/ArenaScene.js',import.meta.url),'utf8').replace(/^import .*;\r?$/gm,'').replace('export class ArenaScene','class ArenaScene');
const context={Phaser:{Scene:class{},CANVAS:1},arenaToStage,ARENA_STAGE,battlePortrait:()=>({label:'actor'}),statusMarks:()=>'',window:{}};
vm.createContext(context);vm.runInContext(source+'\nthis.Scene=ArenaScene;',context);
function display(){const d={};for(const method of ['clear','fillStyle','fillGradientStyle','fillRect','lineStyle','strokeRect','setVisible','setAlpha','setPosition','setFillStyle','setText','setStrokeStyle'])d[method]=function(...args){(this.calls??=[]).push([method,...args]);return this;};return d;}
test('actual Arena applyFrame synchronizes overhead and side HUD HP for damage and KO without actor mutation',()=>{
 const actors=[{instanceId:'a1',definitionId:'P1',x:2,y:1,hp:245,maxHp:245},{instanceId:'e1',definitionId:'P1',x:8,y:-1,hp:245,maxHp:245},{instanceId:'a2',definitionId:'P2',x:3,y:0,hp:100,maxHp:100}];
 const views=new Map(actors.map(a=>[a.instanceId,{allied:a.instanceId.startsWith('a'),markerColor:1,marker:display(),label:display(),hpBar:display()}]));
 const art={visible:true,displayHeight:144,displayWidth:108,originY:.953};
 const scene={game:{renderer:{type:1}},session:{actorById:id=>actors.find(a=>a.instanceId===id),elapsedSeconds:1,characterDefinitions:{},statuses:{damageMultiplier:()=>1,forActor:()=>[]},threats:{active:()=>[]},areas:{records:new Map()}},actorViews:views,visualAssets:{actorSprites:new Map([['a1',art],['e1',art]]),render(){},renderOverlays(){},renderHud(){}},telegraphs:{render(){}},selectedId:null,ensureLivingSelection(){},refreshSelectionVisuals(){},refreshSkillButtons(){},showResult(){},refreshHud(frame){this.cards=[...allyHud(frame.allies,null),...enemyHud(frame.enemies)];}};
 for(const renderer of [1,2])for(const ratio of [1,.4,0]){
  scene.game.renderer.type=renderer;
  for(const view of views.values())view.hpBar.calls=[];
  for(const actor of actors)actor.hp=actor.maxHp*ratio;
  const before=JSON.stringify(actors),frame={allies:actors.filter(a=>a.instanceId.startsWith('a')).map(a=>({...a})),enemies:actors.filter(a=>a.instanceId.startsWith('e')).map(a=>({...a})),result:'running'};
  context.Scene.prototype.applyFrame.call(scene,frame);
  assert.equal(JSON.stringify(actors),before);
  for(const actor of actors){const view=views.get(actor.instanceId),calls=view.hpBar.calls,fill=calls.filter(c=>c[0]==='fillRect').at(-1),border=calls.filter(c=>c[0]==='strokeRect').at(-1),gradient=calls.filter(c=>c[0]==='fillGradientStyle').at(-1),card=scene.cards.find(c=>c.id===actor.instanceId);
   const hpFills=calls.filter(c=>c[0]==='fillRect').slice(1);
   const paintedWidth=hpFills.length?Math.max(...hpFills.map(c=>c[1]+c[3]))-hpFills[0][1]:0;
   assert.ok(Math.abs(paintedWidth/(border[3]-2)-card.hpRatio)<1e-12);
   if(renderer===1)for(let i=1;i<hpFills.length;i++)assert.ok(hpFills[i-1][1]+hpFills[i-1][3]>hpFills[i][1],'Canvas strips overlap to avoid scaling seams');
   if(ratio>0&&renderer===1)assert.ok(calls.filter(c=>c[0]==='fillStyle'&&c[1]!==0x111820).length>=2,'Canvas gradient needs explicit colored fills');
   assert.equal(calls.filter(c=>c[0]==='setVisible').at(-1)[1],ratio>0);
   assert.deepEqual(gradient.slice(1,5),view.allied?[0x69cbff,0x2875d8,0x69cbff,0x2875d8]:[0xff8178,0xb82a38,0xff8178,0xb82a38]);
   const position=arenaToStage(actor);assert.equal(border[1]+1+(border[3]-2)/2,position.x);
   if(actor.definitionId==='P1')assert.ok(border[2]+1+8<position.y-art.displayHeight*art.originY,'bar clears formal head');
   else assert.ok(border[2]+1+8<position.y-24,'bar clears placeholder');
  }
 }
});
