import Phaser from 'phaser';
import { arenaToWorld } from './arenaProjection.js';
import { createDemoBattleFrames } from './demoBattle.js';

export class ArenaScene extends Phaser.Scene {
  constructor() { super('Arena'); }

  create() {
    this.frames = createDemoBattleFrames();
    this.frameIndex = 0;
    this.accumulator = 0;
    this.actorViews = new Map();

    this.cameras.main.setBackgroundColor('#17212b');
    this.cameras.main.setBounds(0, 0, 1120, 620);
    this.add.rectangle(555, 270, 760, 320, 0x253648).setStrokeStyle(2, 0x526579);

    const first = this.frames[0];
    for (const actor of [...first.allies, ...first.enemies]) {
      const { x, y } = arenaToWorld(actor);
      const allied = actor.instanceId.startsWith('a');
      const marker = this.add.circle(x, y, 22, allied ? 0x58c8dc : 0xee9475)
        .setStrokeStyle(3, allied ? 0xc6f6ff : 0xffd3bf);
      const label = this.add.text(x, y - 38, actor.instanceId.toUpperCase(), {
        fontFamily: 'sans-serif', fontSize: '18px', color: '#ffffff',
      }).setOrigin(0.5);
      this.actorViews.set(actor.instanceId, { marker, label });
    }

    this.cameras.main.startFollow(this.actorViews.get('a2').marker, true, 0.08, 0.08);
    this.applyFrame(first);
    // Read-only smoke metadata for the bounded runtime check.
    window.__arenaSmoke = { sceneReady: true, actorCount: this.actorViews.size, frameCount: this.frames.length };
  }

  applyFrame(frame) {
    for (const actor of [...frame.allies, ...frame.enemies]) {
      const view = this.actorViews.get(actor.instanceId);
      const position = arenaToWorld(actor);
      view.marker.setPosition(position.x, position.y).setAlpha(actor.hp > 0 ? 1 : 0.35);
      view.label.setPosition(position.x, position.y - 38).setAlpha(actor.hp > 0 ? 1 : 0.5);
    }
  }

  update(_time, deltaMs) {
    if (this.frameIndex >= this.frames.length - 1) return;
    this.accumulator += deltaMs;
    while (this.accumulator >= 250 && this.frameIndex < this.frames.length - 1) {
      this.accumulator -= 250;
      this.applyFrame(this.frames[++this.frameIndex]);
    }
  }
}
