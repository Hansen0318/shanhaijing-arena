import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {readFileSync} from 'node:fs';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';import {createLabConfig} from '../src/dev/battleLab/config.js';
test('actual Arena cooldown ring uses selected actor resolved duration, starts full at high Tier',()=>{
 const source=readFileSync('src/runtime/ArenaScene.js','utf8').replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene');
 const Scene=vm.runInNewContext(source+'\nArenaScene',{Phaser:{Scene:class{},Math:{Clamp:(v,min,max)=>Math.max(min,Math.min(max,v))}},ARENA_STAGE:{width:1120,height:540}});
 const s=new Scene();s.session=createLabBattleSession(createLabConfig({allyTier:'T3'}),{tacticalEnabled:false});s.selectedId='a1';s.battleStarted=true;s.paused=false;s.session.usePlayerAbility('a1','heavy');
 let angle,text;const visual={setFillStyle(){},setStrokeStyle(){},setAlpha(){},setVisible(){},setColor(){},setText(t){text=t;},clear(){},lineStyle(){},beginPath(){},arc(x,y,r,start,end){angle=end-start;},strokePath(){}};
 s.skillButtons=new Map([['heavy',{base:visual,icon:visual,cooldownText:visual,ring:visual,config:{x:1,y:1,radius:10,color:0}}]]);
 s.refreshSkillButtons();assert.ok(Math.abs(angle-Math.PI*2)<1e-9,`angle ${angle}`);assert.equal(text,'3');
});
