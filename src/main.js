import Phaser from 'phaser';
import { ArenaScene } from './runtime/ArenaScene.js';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 540,
  backgroundColor: '#253648',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    activePointers: 3,
  },
  scene: [ArenaScene],
});

// iOS browser chrome can change the real visible host rect after load/orientation.
// The outer host publishes a viewport-sync event; Phaser owns all canvas scaling
// and input transforms inside that host.
const refreshScale = () => game.scale.refresh();
window.addEventListener('arena-viewport-sync', refreshScale);
window.addEventListener('pageshow', refreshScale);
requestAnimationFrame(refreshScale);
