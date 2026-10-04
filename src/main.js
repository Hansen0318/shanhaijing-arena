import {BattleLabController} from './dev/battleLab/controller.js';
import {BattleLabView} from './dev/battleLab/view.js';
import './dev/battleLab/style.css';
import { consumeProgressReset } from './campaign/devReset.js';
import { createRouteVisibility } from './runtime/routeVisibility.js';
import { browserAcquisitionPersistence,createAcquisitionPersistence } from './acquisition/persistence.js';
import { createBattleRuntimeLoader } from './runtime/lazyBattleRuntime.js';
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
import './info/style.css';

const query=new URLSearchParams(window.location.search);
const labRequested=query.get('battleLab')==='1';
const reset=labRequested?{requested:false,cleared:false}:consumeProgressReset(window);
const memoryOnly=reset.requested && !reset.cleared;
const controller=labRequested?new BattleLabController():new CampaignController({persistence:memoryOnly?createPersistence(null):browserPersistence(),teamPersistence:memoryOnly?createTeamPersistence(null):browserTeamPersistence(),acquisitionPersistence:memoryOnly?createAcquisitionPersistence(null):browserAcquisitionPersistence(),dev:query.get('campaignDev')==='unlock-all'});
const root=document.getElementById('campaign'), host=document.getElementById('game');
const routes=createRouteVisibility(root,host);
if(!labRequested)controller.openLanding();
if(reset.requested){controller.openBattleMenu();controller.openChapter('chapter-1');}
let game=null;
let entryRequest=0;
let loadingContent=null;
function releaseLoadingContent(){if(loadingContent)loadingContent.inert=false;loadingContent=null;}
const loadRuntime=createBattleRuntimeLoader();
let viewport;
const interruption=new BattleInterruption();
const gate=createOrientationGate(window,document,root,host,document.getElementById('orientation-gate'),portrait=>{
 interruption.setPortrait(portrait);
 if(!portrait)viewport?.routeChanged();
});
viewport=installViewportSync(window,host,root,()=>{gate.sync();routes.sync();if(routes.battle && !host.inert)game?.scale.refresh();else if(!routes.battle)game?.loop.sleep();routes.sync();});
const dialog=createExitDialog(document,{
 onContinue:()=>{dialog.close();interruption.continueExit();},
 onRestart:()=>{const config=controller.restartBattle();if(config){dialog.close();startBattle(config);}},
 onExit:()=>{dialog.close();if(controller.exitBattle())returnToPreview();},
});
const controls=createBattleControls(host,{
 onPause:()=>interruption.toggleManual(),
 onExit:()=>{if(interruption.openExit())dialog.open();},
});
const View=labRequested?BattleLabView:CampaignView;
const view=new View(root,controller,{onStart:startBattle,onViewportChange:()=>viewport.surfaceChanged(),onRender:()=>{entryRequest++;releaseLoadingContent();root.setAttribute('aria-busy','false');dialog.close();controls.hide();game?.loop.sleep();routes.setBattle(false);viewport.routeChanged();}});
async function startBattle(stageConfig=null) {
 const request=++entryRequest;
 root.setAttribute('aria-busy','true');
 loadingContent=root.firstElementChild;
 if(loadingContent)loadingContent.inert=true;
 const launchButton=root.querySelector?.('.battle');
 if(launchButton){launchButton.disabled=true;launchButton.textContent='LOADING…';}
 let runtime;
 try { if(!game)runtime=await loadRuntime(); }
 catch(error) {
  if(request!==entryRequest)return;
  releaseLoadingContent();
  root.setAttribute('aria-busy','false');
  if(controller.exitBattle())view.render();
  const message=document.createElement('p');message.setAttribute('role','alert');message.textContent='Battle could not load. Please try START again.';(root.firstElementChild??root).prepend(message);
  return;
 }
 if(request!==entryRequest || (stageConfig && controller.screen!=='battle'))return;
 releaseLoadingContent();
 root.setAttribute('aria-busy','false');
 interruption.detach();
 routes.setBattle(true);
 // Scene creation owns availability: first Phaser boot is asynchronous.
 controls.hide();viewport.routeChanged();
 const labConfig=labRequested?stageConfig:null;
 const data={stageConfig:labRequested?null:stageConfig,labConfig,labActions:labConfig?{
  result:outcome=>controller.finishBattle(outcome),
  retry:()=>{const config=controller.retryBattle();if(config)startBattle(config);},
  back:()=>{if(controller.exitBattle())returnToPreview();},
 }:null,onSceneReady:scene=>interruption.attach(scene),onPlaybackChange:(paused,available)=>controls.update(paused,available,Boolean(stageConfig)),campaignActions:!labRequested && stageConfig ? {
  result:(id,outcome)=>controller.finishBattle(id,outcome,stageConfig.battleCompletionId)?controller.rewardResult:null,
  retry:()=>{const config=controller.retryBattle();if(config) startBattle(config);},
  exit:()=>{if(controller.exitBattle()) returnToPreview();},
  next:()=>{if(controller.nextPreview()) returnToPreview();},
  hasNext:()=>Boolean(nextStage(controller.battleStageId)),
 } : null};
 if(game) {game.scene.start('Arena',data);game.loop.wake();viewport.routeChanged();return;}
 game=runtime.createArenaGame({data,isCurrent:()=>request===entryRequest && (!stageConfig || (controller.screen==='battle' && controller.battleStageId===stageConfig.stageId)),onBoot:()=>viewport.routeChanged()});
}
function returnToPreview() {
 interruption.detach();dialog.close();game.scene.stop('Arena');controls.hide();view.render();
}
// Explicit legacy diagnostic preserves standalone KO/Restart behavior.
if(!labRequested&&query.get('fixture')==='ko') startBattle(); else view.render();
