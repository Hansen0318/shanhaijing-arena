import Phaser from 'phaser';
import { arenaToWorld } from './arenaProjection.js';
import { createDemoBattleFrames } from './demoBattle.js';
import { nearestSurvivingAlly } from '../combat/targeting.js';

export class ArenaScene extends Phaser.Scene {
  constructor() { super('Arena'); }

  create() {
    this.frames = createDemoBattleFrames();
    this.frameIndex = 0;
    this.accumulator = 0;
    this.actorViews = new Map();
    this.selectedId = 'a2';

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

      if (allied) {
        marker.setInteractive({ useHandCursor: true });
        marker.on('pointerdown', () => this.selectAlly(actor.instanceId, this.frames[this.frameIndex]));
      }

      this.actorViews.set(actor.instanceId, { marker, label, allied });
    }

    this.applyFrame(first);
    this.selectAlly(this.selectedId, first);

    // Read-only smoke metadata for bounded runtime checks.
    window.__arenaSmoke = {
      sceneReady: true,
      actorCount: this.actorViews.size,
      frameCount: this.frames.length,
      get selectedId() { return window.__arenaSceneSelectedId ?? null; },
    };
  }

  actorSnapshot(frame, id) {
    return [...frame.allies, ...frame.enemies].find((actor) => actor.instanceId === id) ?? null;
  }

  selectAlly(id, frame) {
    const actor = frame.allies.find((ally) => ally.instanceId === id && ally.hp > 0);
    if (!actor) return false;

    this.selectedId = id;
    window.__arenaSceneSelectedId = id;
    const view = this.actorViews.get(id);
    this.cameras.main.startFollow(view.marker, true, 0.08, 0.08);
    this.refreshSelectionVisuals();
    return true;
  }

  refreshSelectionVisuals() {
    for (const [id, view] of this.actorViews) {
      if (!view.allied) continue;
      view.marker.setStrokeStyle(
        id === this.selectedId ? 6 : 3,
        id === this.selectedId ? 0xffffff : 0xc6f6ff,
      );
    }
  }

  ensureLivingSelection(frame) {
    const selected = frame.allies.find((ally) => ally.instanceId === this.selectedId) ?? null;
    if (selected && selected.hp > 0) return;

    const fallback = selected ? nearestSurvivingAlly(selected, frame.allies) : frame.allies.find((ally) => ally.hp > 0) ?? null;
    if (fallback) {
      this.selectAlly(fallback.instanceId, frame);
      return;
    }

    this.selectedId = null;
    window.__arenaSceneSelectedId = null;
    this.cameras.main.stopFollow();
    this.refreshSelectionVisuals();
  }

  applyFrame(frame) {
    for (const actor of [...frame.allies, ...frame.enemies]) {
      const view = this.actorViews.get(actor.instanceId);
      const position = arenaToWorld(actor);
      view.marker.setPosition(position.x, position.y).setAlpha(actor.hp > 0 ? 1 : 0.35);
      view.label.setPosition(position.x, position.y - 38).setAlpha(actor.hp > 0 ? 1 : 0.5);
    }
    this.ensureLivingSelection(frame);
    this.refreshSelectionVisuals();
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
