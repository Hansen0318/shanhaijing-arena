import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as presentation from '../src/acquisition/presentation.js';
import { CampaignController } from '../src/campaign/controller.js';
import { CampaignView } from '../src/campaign/view.js';
function element(tag){const el={tag,children:[],dataset:{},style:{},disabled:false,className:'',append(...x){this.children.push(...x);},replaceChildren(...x){this.children=x;},setAttribute(k,v){this[k]=v;},addEventListener(k,v){this[`on${k}`]=v;}};el.classList={add:x=>el.className+=' '+x};return el;}
const walk=n=>[n,...n.children.flatMap(walk)];
const reward={items:[{type:'characterShard',characterId:'P1',quantity:2,repeat:'firstClear'},{type:'characterShard',characterId:'P4',quantity:1,repeat:'repeatable'}]};
test('stage reward rows share normalized definition; CLAIMED changes only firstClear even for owned characters',()=>{
 assert.equal(typeof presentation.stageRewardRows,'function');
 const stage={stageId:'s',reward};assert.deepEqual(presentation.stageRewardRows(stage,{claimedStageIds:[]}).map(r=>[r.label,r.status]),[['P1 Shard ×2','FIRST CLEAR'],['P4 Shard ×1','REPEATABLE']]);
 assert.deepEqual(presentation.stageRewardRows(stage,{claimedStageIds:['s']}).map(r=>r.status),['CLAIMED','REPEATABLE']);
});
test('result uses only actual authoritative grants and explicit unlock IDs, aggregates multi-items by character',()=>{
 assert.equal(typeof presentation.resultRewardLines,'function');
 assert.deepEqual(presentation.resultRewardLines(null),[]);assert.deepEqual(presentation.resultRewardLines({grantedItems:[],shardCounts:{P4:5},unlockedCharacterIds:['P4']}),[]);
 const lines=presentation.resultRewardLines({grantedItems:[...reward.items,{...reward.items[1],quantity:2}],shardCounts:{P1:2,P4:5},unlockedCharacterIds:['P4']});
 assert.deepEqual(lines,['P1 Shard +2   2 / 5','P4 Shard +3   5 / 5   P4 UNLOCKED']);
});
test('actual Stage Preview renders firstClear/CLAIMED and repeatable quantities; ownership refresh filters bench',()=>{
 const prev=globalThis.document;globalThis.document={createElement:element};
 try {
  const c=new CampaignController(),root=element('main'),view=new CampaignView(root,c);c.openChapter('chapter-1');view.render();
  assert.ok(walk(root).some(n=>n.textContent==='P4 Shard ×2'));assert.ok(walk(root).some(n=>n.textContent==='FIRST CLEAR'));
  c.openTeamSelect();for(const id of ['P1','P2','P3'])c.teamSelection.toggle(id);c.startBattle();c.finishBattle('1-1','victory');c.exitBattle();view.render();assert.ok(walk(root).some(n=>n.textContent==='CLAIMED'));
  c.openTeamSelect();view.render();assert.deepEqual(walk(root).filter(n=>n.dataset.characterId).map(n=>n.dataset.characterId),['P1','P2','P3']);
  c.acquisition.shardsByCharacterId.P4=5;c.acquisition.ownedCharacterIds.push('P4');view.render();assert.ok(walk(root).some(n=>n.dataset.characterId==='P4'));
  walk(root).find(n=>n.dataset.filter==='power').onclick();assert.deepEqual(walk(root).filter(n=>n.dataset.characterId).map(n=>n.dataset.characterId),['P1','P4']);
 }finally{globalThis.document=prev;}
});
function scene(){const source=readFileSync(new URL('../src/runtime/ArenaScene.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene');const Arena=vm.runInNewContext(source+'\nArenaScene',{Phaser:{Scene:class{}},ARENA_STAGE:{width:1120,height:540},resultRewardLines:presentation.resultRewardLines});const s=new Arena();
 const visual=()=>{const v={visible:true,text:'',style:{},setDepth(){return this;},setVisible(b){this.visible=b;return this;},setOrigin(){return this;},setInteractive(){return this;},setStrokeStyle(){return this;},setText(t){this.text=t;return this;},setY(y){this.y=y;return this;},setFontSize(n){this.style.fontSize=n;return this;},add(){return this;},on(){return this;},disableInteractive(){}};return v;};s.add={container:visual,rectangle:visual,text:(x,y,text,style)=>Object.assign(visual(),{x,y,text,style})};s.releaseJoystick=()=>{};s.onPlaybackChange=()=>{};return s;}
test('actual Arena result consumes transaction once; empty defeat/draw never show fake reward; fresh result clears',()=>{
 assert.equal(typeof presentation.resultRewardLines,'function');
 const s=scene();let calls=0;const tx={grantedItems:[reward.items[1]],shardCounts:{P4:5},unlockedCharacterIds:['P4']};s.session={stageId:'1-3'};s.campaignActions={result:()=>{calls++;return tx;},hasNext:()=>true};s.createResultView();s.showResult('victory');assert.equal(calls,1);assert.match(s.rewardText.text,/P4 Shard \+1/);assert.match(s.rewardText.text,/P4 UNLOCKED/);s.showResult('victory');assert.equal(calls,1);
 for(const outcome of ['defeat','draw']){s.campaignActions.result=()=>({grantedItems:[],unlockedCharacterIds:[],shardCounts:{P4:5}});s.createResultView();s.showResult(outcome);assert.equal(s.rewardText.visible,false);assert.equal(s.rewardText.text,'');}
});
