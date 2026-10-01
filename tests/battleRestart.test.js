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
function launch(){let writes=0,teamWrites=0;const c=new CampaignController({persistence:{load:()=>undefined,save:()=>writes++},teamPersistence:{load:()=>['P1','P3','P5'],save:()=>teamWrites++}});c.openChapter('chapter-1');c.openTeamSelect();const config=c.startBattle();return {c,config,writes:()=>writes,teamWrites:()=>teamWrites};}
const el=tag=>({tag,children:[],append(...items){this.children.push(...items);},setAttribute(k,v){this[k]=v;},focus(){}});
test('X menu orders CONTINUE / RESTART / EXIT and dispatches their independent handlers',()=>{
 const doc={createElement:el,body:el('body')};let action='';const dialog=createExitDialog(doc,{onContinue:()=>action='continue',onRestart:()=>action='restart',onExit:()=>action='exit'});
 dialog.open();const panel=doc.body.children[0].children[0],buttons=panel.children[2].children;
 assert.deepEqual(buttons.map(n=>n.textContent),['CONTINUE','RESTART','EXIT']);
 for(const [index,want] of ['continue','restart','exit'].entries()){buttons[index].onclick();assert.equal(action,want);}
});
test('running-stage Restart preserves frozen team/stage, writes no progress or team save, and rejects other routes',()=>{
 const e=launch(),before=structuredClone(e.c.progress),oldTeam=e.c.battleTeam,config=e.c.restartBattle();
 assert.equal(e.c.screen,'battle');assert.equal(e.c.outcome,null);assert.equal(e.c.battleTeam,oldTeam);
 assert.equal(config.stageId,'1-1');assert.deepEqual(config.selectedTeam,['P1','P3','P5']);assert.notEqual(config.selectedTeam,e.c.battleTeam);
 assert.deepEqual(e.c.progress,before);assert.equal(e.writes(),0);assert.equal(e.teamWrites(),1);
 config.selectedTeam.reverse();assert.deepEqual(e.c.battleTeam,['P1','P3','P5']);
 e.c.exitBattle();assert.equal(e.c.restartBattle(),null);assert.equal(e.c.screen,'stages');
 e.c.openTeamSelect();assert.equal(e.c.restartBattle(),null);
 e.c.startBattle();e.c.finishBattle('1-1','defeat');assert.equal(e.c.restartBattle(),null);assert.deepEqual(e.c.retryBattle().selectedTeam,['P1','P3','P5']);
});
// Only renderer and external scene scheduler are substituted. Real ArenaScene.create,
// BattleSession, damage presenter, gate and interruption lifecycle execute below.
function arena(){const source=readFileSync(new URL('../src/runtime/ArenaScene.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene');const visual=()=>{const p=new Proxy({alpha:1,destroyed:false,destroy(){this.destroyed=true;}},{get(o,k){return k in o?o[k]:()=>p;}});return p;};const win={location:{search:''}};
 const Arena=vm.runInNewContext(source+'\nArenaScene',{Phaser:{Scene:class{},Display:{Color:{HexStringToColor:()=>({color:0})}}},ARENA_STAGE:{width:1120,height:540},window:win,URLSearchParams,createStageBattleSession,createDemoBattleSession,battlePortrait,PreBattleGate,DamageNumbers,arenaToStage});
 const s=new Arena();s.events=new EventEmitter();s.time={paused:false};s.cameras={main:visual()};s.add={rectangle:visual,line:visual,ellipse:visual,circle:visual,text:visual};
 s.tweens={add:()=>({remove(){this.removed=true;}}),getGlobalTimeScale:()=>1,setGlobalTimeScale(){},tick(){}};
 for(const method of ['createHud','createJoystick','createSkillButtons','createPreBattleCountdown','createResultView','applyFrame','refreshHud','refreshSkillButtons','releaseJoystick'])s[method]=()=>{};
 return s;
}
test('Restart runs fresh Arena create: all HP/CD/targets/AI/timer/countdown/formation/transients reset and damage cleans up',()=>{
 const e=launch(),s=arena(),b=new BattleInterruption();s.init({stageConfig:e.config,onSceneReady:scene=>b.attach(scene)});s.create();const old=s.session,oldNumbers=s.damageNumbers,first=old.snapshot();
 old.allies[0].damage(50);old.allies[1].damage(999);old.allies[0].abilityState.special.cooldownRemaining=8;old.allies[0].abilityState.special.phase='cooldown';old.allies[0].targetId='e1';old.targetIds.set('a1','e1');old.aiPreparation.set('a1',{category:'special',targetId:'e1'});old.playerMovement.set('a1',{x:1,y:0});old.castEvents.push({});old.damageEvents.push({});old.elapsedSeconds=23;s.selectedId='a3';s.preBattleGate.advance(3,()=>{},()=>{});s.battleStarted=true;
 oldNumbers.render([{targetId:'e1',amount:10,position:{x:2,y:0}}]);const text=[...oldNumbers.active.keys()][0];assert.equal(text.destroyed,false);
 b.toggleManual();b.openExit();assert.equal(s.paused,true);
 b.detach();s.events.emit('shutdown');s.init({stageConfig:e.c.restartBattle(),onSceneReady:scene=>b.attach(scene)});s.create();
 assert.notEqual(s.session,old);assert.notEqual(s.damageNumbers,oldNumbers);assert.equal(text.destroyed,true);assert.equal(oldNumbers.active.size,0);assert.equal(oldNumbers.offsets.size,0);
 assert.deepEqual(s.session.snapshot(),first);assert.equal(s.selectedId,'a2');assert.equal(s.preBattleGate.remaining,3);assert.equal(s.preBattleGate.display(),'3');assert.equal(s.battleStarted,false);assert.equal(s.paused,false);assert.equal(s.time.paused,false);
 assert.equal(s.session.aiPreparation.size,6);for(const value of s.session.aiPreparation.values())assert.deepEqual(value,{});
 for(const actor of s.session.actors){assert.equal(actor.targetId,null);for(const slot of Object.values(actor.abilityState)){assert.equal(slot.cooldownRemaining,0);assert.equal(slot.phase,'ready');assert.equal(slot.targetId,null);}}
 assert.ok([...s.session.targetIds.values()].every(v=>v===null));assert.equal(s.session.castEvents.length,0);assert.equal(s.session.damageEvents.length,0);assert.equal(s.damageNumbers.active.size,0);
 assert.equal(s.session.allies[1].x,1.2);assert.equal(s.session.enemies[1].x,8.8);assert.equal(e.writes(),0);
});
test('CONTINUE keeps same state/prior manual Pause; fresh Restart clears old menu/Pause but preserves orientation reason',()=>{
 const e=launch(),s=arena(),b=new BattleInterruption();s.init({stageConfig:e.config,onSceneReady:x=>b.attach(x)});s.create();s.session.elapsedSeconds=7;const session=s.session;
 b.openExit();b.continueExit();assert.equal(s.session,session);assert.equal(s.session.elapsedSeconds,7);assert.equal(s.paused,false);
 b.toggleManual();b.openExit();b.continueExit();assert.equal(s.paused,true);assert.equal(s.session,session);
 b.openExit();b.setPortrait(true);b.detach();s.events.emit('shutdown');s.init({stageConfig:e.c.restartBattle(),onSceneReady:x=>b.attach(x)});s.create();
 assert.equal(s.paused,true);assert.equal(b.manualPaused,false);assert.equal(b.exitOpen,false);assert.equal(s.session.elapsedSeconds,0);
 b.setPortrait(false);assert.equal(s.paused,false);assert.equal(s.preBattleGate.remaining,3);
 b.openExit();assert.equal(e.c.exitBattle(),true);b.detach();assert.equal(e.c.selectedStageId,'1-1');assert.equal(e.c.screen,'stages');assert.equal(e.writes(),0);assert.deepEqual(e.c.progress.unlockedStages,['1-1']);
});
test('actual app Restart callback closes X and schedules Arena with the same config, without routing away',()=>{
 const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
 const controller=new CampaignController({teamPersistence:{load:()=>['P1','P3','P5'],save(){}}});controller.openChapter('chapter-1');controller.openTeamSelect();
 const root={hidden:false},host={style:{}},doc={getElementById:id=>id==='campaign'?root:host};let viewOptions,menu,closed=0,starts=[];
 class Game {constructor(config){this.scale={refresh(){}};this.scene={start:(key,data)=>starts.push({key,data}),add(){},stop(){throw Error('Restart must not exit');}};this.boot=()=>config.callbacks.postBoot(this);}}
 const context={Phaser:{Game,Scale:{NONE:0},AUTO:0},ArenaScene:class{},nextStage:()=>null,CampaignController:class{constructor(){return controller;}},CampaignView:class{constructor(r,c,options){viewOptions=options;}render(){}},browserPersistence:()=>null,browserTeamPersistence:()=>null,installViewportSync:()=>({routeChanged(){}}),BattleInterruption,createOrientationGate:()=>({sync(){}}),createBattleControls:()=>({hide(){},update(){}}),createExitDialog:(d,options)=>{menu=options;return {close(){closed++;},open(){}};},document:doc,window:{location:{search:''}},URLSearchParams};
 vm.runInNewContext(source+'\nglobalThis.getGame=()=>game;',context);
 viewOptions.onStart(controller.startBattle());context.getGame().boot();assert.equal(starts.length,1);
 const first=starts[0].data.stageConfig;menu.onRestart();assert.equal(starts.length,2);assert.equal(starts[1].key,'Arena');assert.equal(closed,1);
 assert.deepEqual(starts[1].data.stageConfig,first);assert.equal(controller.screen,'battle');assert.equal(root.hidden,true);assert.equal(host.style.visibility,'visible');
});
