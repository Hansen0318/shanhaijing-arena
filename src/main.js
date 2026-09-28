import Phaser from 'phaser';
import { ArenaScene } from './runtime/ArenaScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 540,
  backgroundColor: '#253648',
  // Keep one immutable 960x540 game surface.
  // Browser CSS alone scales this canvas proportionally to fit the screen.
  scale: { mode: Phaser.Scale.NONE },
  scene: [ArenaScene],
});
