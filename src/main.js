import { consumeProgressReset } from './campaign/devReset.js';
import { createRouteVisibility } from './runtime/routeVisibility.js';
import { browserAcquisitionPersistence,createAcquisitionPersistence } from './acquisition/persistence.js';
import Phaser from 'phaser';
import { ArenaScene } from './runtime/ArenaScene.js';
import { nextStage } from './campaign/data.js';
import { CampaignController } from './campaign/controller.js';
import { CampaignView } from './campaign/view.js';
import { browserPersistence,createPersistence } from './campaign/persistence.js';
import { browserTeamPersistence,createTeamPersistence } from './roster/persistence.js';
import { installViewportSync } from './runtime/viewportSync.js';
import { createBattleControls } from './runtime/battleControls.js';
import { createOrientationGate } from './runtime/orientationGate.js';
import { BattleInterruption } from './runtime/battleInterruption.js';
import { createExitDialog } from './runtime/exitDialog.js';
import './campaign/style.css';
import './roster/style.css';
import './collection/style.css';

const reset=consumeProgressReset(window);
const memoryOnly=reset.requested && !reset.cleared;
const query=new URLSearchParams(window.location.search);
const controller=new CampaignController({persistence:memoryOnly?createPersistence(null):browserPersistence(),teamPersistence:memoryOnly?createTeamPersistence(null):browserTeamPersistence(),acquisitionPersistence:memoryOnly?createAcquisitionPersistence(null):browserAcquisitionPersistence(),dev:query.get('campaignDev')==='unlock-all'});
const root=document.getElementById('campaign'), host=document.getElementById('game');
const routes=createRouteVisibility(root,host);
controller.openLanding();
if(reset.requested){controller.openBattleMenu();controller.openChapter('chapter-1');}
let game=null;
let viewport;
const interruption=new BattleInterruption();
const gate=createOrientationGate(window,document,root,host,document.getElementById('orientation-gate'),portrait=>{
 interruption.setPortrait(portrait);
 if(!portrait)viewport?.routeChanged();
});
viewport=installViewportSync(window,host,root,()=>{gate.sync();game?.scale.refresh();routes.sync();});
const dialog=createExitDialog(document,{
 onContinue:()=>{dialog.close();interruption.continueExit();},
 onRestart:()=>{const config=controller.restartBattle();if(config){dialog.close();startBattle(config);}},
 onExit:()=>{dialog.close();if(controller.exitBattle())returnToPreview();},
});
const controls=createBattleControls(host,{
 onPause:()=>interruption.toggleManual(),
 onExit:()=>{if(interruption.openExit())dialog.open();},
});
const view=new CampaignView(root,controller,{onStart:startBattle,onRender:()=>{routes.setBattle(false);viewport.routeChanged();}});
function startBattle(stageConfig=null) {
 interruption.detach();
 routes.setBattle(true);
 // Scene creation owns availability: first Phaser boot is asynchronous.
 controls.hide();viewport.routeChanged();
 const data={stageConfig,onSceneReady:scene=>interruption.attach(scene),onPlaybackChange:(paused,available)=>controls.update(paused,available,Boolean(stageConfig)),campaignActions:stageConfig ? {
  result:(id,outcome)=>controller.finishBattle(id,outcome,stageConfig.battleCompletionId)?controller.rewardResult:null,
  retry:()=>{const config=controller.retryBattle();if(config) startBattle(config);},
  exit:()=>{if(controller.exitBattle()) returnToPreview();},
  next:()=>{if(controller.nextPreview()) returnToPreview();},
  hasNext:()=>Boolean(nextStage(controller.battleStageId)),
 } : null};
 if(game) {game.scene.start('Arena',data);viewport.routeChanged();return;}
 game=new Phaser.Game({
  type:Phaser.AUTO,parent:'game',width:1120,height:540,backgroundColor:'#253648',
  scale:{mode:Phaser.Scale.NONE},input:{activePointers:4},scene:[],
  callbacks:{postBoot:instance=>{
   instance.scene.add('Arena',ArenaScene,false);
   if(!stageConfig || (controller.screen==='battle' && controller.battleStageId===stageConfig.stageId)) instance.scene.start('Arena',data);
   viewport.routeChanged();
  }},
 });
}
function returnToPreview() {
 interruption.detach();dialog.close();game.scene.stop('Arena');controls.hide();view.render();
}
// Explicit legacy diagnostic preserves standalone KO/Restart behavior.
if(query.get('fixture')==='ko') startBattle(); else view.render();
