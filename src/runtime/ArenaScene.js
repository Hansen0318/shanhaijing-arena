import Phaser from 'phaser';
import { arenaToWorld, ARENA_WORLD } from './arenaProjection.js';
import { createDemoBattleFrames } from './demoBattle.js';
import { nearestSurvivingAlly } from '../combat/targeting.js';

export class ArenaScene extends Phaser.Scene {
  constructor() { super('Arena'); }

  create() {
    const selectedKoFixture = new URLSearchParams(window.location.search).get('fixture') === 'ko';
    this.frames = createDemoBattleFrames({ selectedKoFixture });
    this.frameIndex = 0;
    this.accumulator = 0;
    this.actorViews = new Map();
    this.selectedId = 'a2';

    this.cameras.main.setBackgroundColor('#1a2734');
    this.cameras.main.setBounds(0, 0, ARENA_WORLD.width, ARENA_WORLD.height);

    // The arena world itself fills the camera. There is no smaller framed battlefield
    // floating inside the viewport; future HUD/controls remain screen-space overlays.
    this.add.rectangle(
      ARENA_WORLD.width / 2,
      ARENA_WORLD.height / 2,
      ARENA_WORLD.width,
      ARENA_WORLD.height,
      0x253648,
    );

    // Subtle world-space orientation guides only; they move naturally with the camera.
    this.add.line(0, 0, 160, ARENA_WORLD.height / 2, ARENA_WORLD.width - 160, ARENA_WORLD.height / 2, 0x344a5f, 0.55)
      .setOrigin(0, 0);
    this.add.ellipse(ARENA_WORLD.width / 2, ARENA_WORLD.height / 2, 260, 150)
      .setStrokeStyle(2, 0x344a5f, 0.55);

    const first = this.frames[0];
    for (const actor of [...first.allies, ...first.enemies]) {
      const { x, y } = arenaToWorld(actor);
      const allied = actor.instanceId.startsWith('a');
      const marker = this.add.circle(x, y, 24, allied ? 0x58c8dc : 0xee9475)
        .setStrokeStyle(3, allied ? 0xc6f6ff : 0xffd3bf);
      const label = this.add.text(x, y - 42, actor.instanceId.toUpperCase(), {
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

    window.__arenaSmoke = {
      sceneReady: true,
      actorCount: this.actorViews.size,
      frameCount: this.frames.length,
      fixture: selectedKoFixture ? 'ko' : 'default',
      worldWidth: ARENA_WORLD.width,
      worldHeight: ARENA_WORLD.height,
      get selectedId() { return window.__arenaSceneSelectedId ?? null; },
    };
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

    const fallback = selected
      ? nearestSurvivingAlly(selected, frame.allies)
      : frame.allies.find((ally) => ally.hp > 0) ?? null;

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
      view.label.setPosition(position.x, position.y - 42).setAlpha(actor.hp > 0 ? 1 : 0.5);
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
