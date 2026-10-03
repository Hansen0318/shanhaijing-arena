import {TelegraphPresenter,statusMarks} from '../src/runtime/telegraphs.js';
import { createRouteVisibility } from '../src/runtime/routeVisibility.js';
import { consumeProgressReset } from '../src/campaign/devReset.js';
import { prototypeOwnership } from '../src/roster/catalog.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {CampaignController} from '../src/campaign/controller.js';
import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {BattleInterruption} from '../src/runtime/battleInterruption.js';
import {createExitDialog} from '../src/runtime/exitDialog.js';
import {PreBattleGate} from '../src/runtime/preBattleGate.js';
import {DamageNumbers} from '../src/runtime/damageNumbers.js';
import {createDemoBattleSession} from '../src/runtime/demoBattle.js';
import {battlePortrait} from '../src/roster/battlePresentation.js';
import {arenaToStage} from '../src/runtime/arenaProjection.js';
import {EventEmitter} from 'node:events';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {createLabConfig} from '../src/dev/battleLab/config.js';
function arena(){const source=readFileSync(new URL('../src/runtime/ArenaScene.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene');const visual=()=>{const p=new Proxy({alpha:1,destroyed:false,destroy(){this.destroyed=true;}},{get(o,k){return k in o?o[k]:()=>p;}});return p;};const win={location:{search:''}};
 const Arena=vm.runInNewContext(source+'\nArenaScene',{Phaser:{Scene:class{},Display:{Color:{HexStringToColor:()=>({color:0})}}},ARENA_STAGE:{width:1120,height:540},window:win,URLSearchParams,createLabBattleSession,createStageBattleSession,createDemoBattleSession,battlePortrait,PreBattleGate,DamageNumbers,TelegraphPresenter,statusMarks,arenaToStage});
 const s=new Arena();s.events=new EventEmitter();s.time={paused:false};s.cameras={main:visual()};s.add={graphics:visual,rectangle:visual,line:visual,ellipse:visual,circle:visual,text:visual};
 s.tweens={add:()=>({remove(){this.removed=true;}}),getGlobalTimeScale:()=>1,setGlobalTimeScale(){},tick(){}};
 for(const method of ['createHud','createJoystick','createSkillButtons','createPreBattleCountdown','createResultView','applyFrame','refreshHud','refreshSkillButtons','releaseJoystick'])s[method]=()=>{};
 return s;
}

test('Lab skip countdown and AI-only are scene-local; Campaign defaults remain intact',()=>{
 const s=arena();let joystick=0,skills=0;s.createJoystick=()=>joystick++;s.createSkillButtons=()=>skills++;
 s.init({labConfig:createLabConfig({scenarioId:'heal',skipCountdown:true,controlMode:'ai'})});s.create();
 assert.equal(s.session.allies[0].hp/s.session.allies[0].maxHp,.25);assert.equal(s.battleStarted,true);assert.equal(s.preBattleGate.remaining,0);
 assert.equal(s.selectedId,'a3');assert.equal(joystick,0);assert.equal(skills,0);assert.equal(s.selectAlly('a1',s.session.snapshot()),false);
 const n=arena();n.init();n.create();assert.equal(n.battleStarted,false);assert.equal(n.preBattleGate.remaining,3);assert.equal(n.manualControlEnabled,true);
});
test('Lab manual uses shared session execution and fresh retry resets HP/CD/timer',()=>{
 const c=createLabConfig({scenarioId:'heal',skipCountdown:true}),s=arena();s.init({labConfig:c});s.create();
 assert.equal(s.manualControlEnabled,true);assert.equal(s.selectAlly('a3',s.session.snapshot()),true);
 const old=s.session;const before=old.allies[0].hp;assert.equal(old.usePlayerAbility('a3','special'),true);old.step(.5);assert.ok(old.allies[0].hp>before);
 old.elapsedSeconds=10;s.events.emit('shutdown');s.init({labConfig:c});s.create();assert.notEqual(s.session,old);assert.equal(s.session.elapsedSeconds,0);assert.equal(s.session.allies[0].hp/s.session.allies[0].maxHp,.25);
});
test('Lab result owns only retry/back, rejects campaign callbacks and grants no reward',()=>{
 const s=arena();let result='',retry=0,back=0;
 s.init({labConfig:createLabConfig(),campaignActions:{result(){throw Error('formal write');}},labActions:{result:r=>result=r,retry:()=>retry++,back:()=>back++}});
 s.create();let texts=[];const visual=()=>{const o={visible:true,on(event,fn){this.action=fn;return this;},setVisible(v){this.visible=v;return this;},setText(v){this.text=v;return this;}};const p=new Proxy(o,{get:(o,k)=>k in o?o[k]:()=>p});return p;};
 s.add.container=visual;s.add.rectangle=visual;s.add.text=(x,y,text)=>{texts.push(text);return visual();};
 Object.getPrototypeOf(s).createResultView.call(s);assert.deepEqual([...s.resultButtons.keys()],['RETRY','BACK TO LAB']);
 s.showResult('victory');assert.equal(result,'victory');assert.equal(s.rewardText.visible,false);assert.equal(s.campaignActions,null);
 s.resultButtons.get('RETRY').button.action();s.resultButtons.get('BACK TO LAB').button.action();assert.equal(retry,1);assert.equal(back,1);
});
test('actual Arena pause freezes threat clock; restart/retry clears warnings and impact jobs',()=>{
 const c=createLabConfig({scenarioId:'aoe',skipCountdown:true}),s=arena();s.init({labConfig:c});s.create();
 s.session.usePlayerAbility('a2','special');const old=s.session,warning=old.threats.active(0),presenter=s.telegraphs;
 assert.equal(warning.length,1);s.togglePause();s.update(0,1000);assert.equal(old.elapsedSeconds,0);assert.deepEqual(old.threats.active(0),warning);
 s.events.emit('shutdown');s.init({labConfig:c});s.create();assert.notEqual(s.telegraphs,presenter);assert.equal(s.session.threats.active(0).length,0);assert.equal(s.session.delayedImpacts.size,0);assert.equal(s.paused,false);
});
