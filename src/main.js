import Phaser from 'phaser';
import { ArenaScene } from './runtime/ArenaScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 540,
  backgroundColor: '#17212b',
  // Landscape mobile is the canonical presentation. ENVELOP keeps the 16:9
  // game canvas undistorted while covering the available viewport; excess
  // content is cropped rather than leaving unused bars around the battlefield.
  scale: { mode: Phaser.Scale.ENVELOP, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [ArenaScene],
});
