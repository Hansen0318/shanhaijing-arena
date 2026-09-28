import Phaser from 'phaser';
import { ArenaScene } from './runtime/ArenaScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 540,
  backgroundColor: '#17212b',
  // Match the actual browser viewport instead of scaling a fixed 16:9 canvas.
  // This avoids FIT letterboxing and ENVELOP over-zoom/cropping on mobile.
  scale: { mode: Phaser.Scale.RESIZE },
  scene: [ArenaScene],
});
