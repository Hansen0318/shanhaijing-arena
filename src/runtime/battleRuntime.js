import Phaser from 'phaser';
import { ArenaScene } from './ArenaScene.js';
export function createArenaGame({data,isCurrent,onBoot}) {
 return new Phaser.Game({
  type:Phaser.AUTO,parent:'game',width:1120,height:540,backgroundColor:'#253648',
  scale:{mode:Phaser.Scale.NONE},input:{activePointers:4},scene:[],
  callbacks:{postBoot:instance=>{
   instance.scene.add('Arena',ArenaScene,false);
   if(isCurrent())instance.scene.start('Arena',data);
   // Phaser starts its loop after postBoot; enforce stale-entry sleep afterward.
   queueMicrotask(()=>{if(!isCurrent())instance.loop.sleep();});
   onBoot(instance);
  }},
 });
}
