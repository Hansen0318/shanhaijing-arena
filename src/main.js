import Phaser from 'phaser';
import { ArenaScene } from './runtime/ArenaScene.js';
import { CampaignController } from './campaign/controller.js';
import { CampaignView } from './campaign/view.js';
import { browserPersistence } from './campaign/persistence.js';
import './campaign/style.css';

const query=new URLSearchParams(window.location.search);
const controller=new CampaignController({persistence:browserPersistence(),dev:query.get('campaignDev')==='unlock-all'});
const root=document.getElementById('campaign'), host=document.getElementById('game');
let game=null;
const view=new CampaignView(root,controller,{onStart:startBattle});
function startBattle(stageConfig=null) {
 root.hidden=true;host.style.visibility='visible';
 const data={stageConfig};
 if(game) {game.scene.start('Arena',data);return;}
 game=new Phaser.Game({
  type:Phaser.AUTO,parent:'game',width:1120,height:540,backgroundColor:'#253648',
  scale:{mode:Phaser.Scale.NONE},input:{activePointers:4},scene:[],
  callbacks:{postBoot:instance=>instance.scene.add('Arena',ArenaScene,true,data)},
 });
}
// Explicit legacy diagnostic preserves standalone KO/Restart behavior.
if(query.get('fixture')==='ko') startBattle(); else view.render();
