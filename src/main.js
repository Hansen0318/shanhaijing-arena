import Phaser from 'phaser';
import { ArenaScene } from './runtime/ArenaScene.js';
import { nextStage } from './campaign/data.js';
import { CampaignController } from './campaign/controller.js';
import { CampaignView } from './campaign/view.js';
import { browserPersistence } from './campaign/persistence.js';
import { installViewportSync } from './runtime/viewportSync.js';
import { createBattleControls } from './runtime/battleControls.js';
import './campaign/style.css';

const query=new URLSearchParams(window.location.search);
const controller=new CampaignController({persistence:browserPersistence(),dev:query.get('campaignDev')==='unlock-all'});
const root=document.getElementById('campaign'), host=document.getElementById('game');
let game=null;
const viewport=installViewportSync(window,host,root,()=>game?.scale.refresh());
const controls=createBattleControls(host,{
 onPause:()=>game?.scene.getScene('Arena')?.togglePause(),
 onExit:()=>{if(controller.exitBattle()) returnToPreview();},
});
const view=new CampaignView(root,controller,{onStart:startBattle,onRender:()=>viewport.routeChanged()});
function startBattle(stageConfig=null) {
 root.hidden=true;host.style.visibility='visible';
 // Scene creation owns availability: first Phaser boot is asynchronous.
 controls.hide();viewport.routeChanged();
 const data={stageConfig,onPlaybackChange:(paused,available)=>controls.update(paused,available,Boolean(stageConfig)),campaignActions:stageConfig ? {
  result:(id,outcome)=>controller.finishBattle(id,outcome),
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
 game.scene.stop('Arena');controls.hide();host.style.visibility='hidden';view.render();
}
// Explicit legacy diagnostic preserves standalone KO/Restart behavior.
if(query.get('fixture')==='ko') startBattle(); else view.render();
