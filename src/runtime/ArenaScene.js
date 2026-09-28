import Phaser from 'phaser';
import { arenaToViewport } from './arenaProjection.js';
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

    this.cameras.main.setBackgroundColor('#253648');
    this.cameras.main.stopFollow();
    this.cameras.main.setScroll(0, 0);

    this.arenaBackground = this.add.rectangle(0, 0, 1, 1, 0x253648).setOrigin(0, 0);
    this.centerLine = this.add.line(0, 0, 0, 0, 1, 0, 0x344a5f, 0.55).setOrigin(0, 0);
    this.centerEllipse = this.add.ellipse(0, 0, 1, 1).setStrokeStyle(2, 0x344a5f, 0.55);

    const first = this.frames[0];
    for (const actor of [...first.allies, ...first.enemies]) {
      const allied = actor.instanceId.startsWith('a');
      const marker = this.add.circle(0, 0, 24, allied ? 0x58c8dc : 0xee9475)
        .setStrokeStyle(3, allied ? 0xc6f6ff : 0xffd3bf);
      const label = this.add.text(0, 0, actor.instanceId.toUpperCase(), {
        fontFamily: 'sans-serif', fontSize: '18px', color: '#ffffff',
      }).setOrigin(0.5);

      if (allied) {
        marker.setInteractive({ useHandCursor: true });
        marker.on('pointerdown', () => this.selectAlly(actor.instanceId, this.frames[this.frameIndex]));
      }

      this.actorViews.set(actor.instanceId, { marker, label, allied });
    }

    this.handleViewportResize(this.scale.gameSize);
    this.scale.on('resize', this.handleViewportResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.handleViewportResize, this);
    });

    this.applyFrame(first);
    this.selectAlly(this.selectedId, first);

    window.__arenaSmoke = {
      sceneReady: true,
      actorCount: this.actorViews.size,
      frameCount: this.frames.length,
      fixture: selectedKoFixture ? 'ko' : 'default',
      cameraMode: 'fixed',
      get viewportWidth() { return window.innerWidth; },
      get viewportHeight() { return window.innerHeight; },
      get selectedId() { return window.__arenaSceneSelectedId ?? null; },
    };
  }

  handleViewportResize(gameSize) {
    const width = Math.max(1, Math.round(gameSize.width));
    const height = Math.max(1, Math.round(gameSize.height));

    this.cameras.main.setSize(width, height);
    this.cameras.main.setScroll(0, 0);
    this.arenaBackground.setSize(width, height);

    this.centerLine.setTo(
      width * 0.08,
      height / 2,
      width * 0.92,
      height / 2,
    );
    this.centerEllipse
      .setPosition(width / 2, height / 2)
      .setSize(Math.min(width * 0.28, 280), Math.min(height * 0.34, 170));

    if (this.frames?.[this.frameIndex]) {
      this.applyFrame(this.frames[this.frameIndex]);
    }
  }

  project(actor) {
    return arenaToViewport(actor, {
      width: this.scale.gameSize.width,
      height: this.scale.gameSize.height,
    });
  }

  selectAlly(id, frame) {
    const actor = frame.allies.find((ally) => ally.instanceId === id && ally.hp > 0);
    if (!actor) return false;

    this.selectedId = id;
    window.__arenaSceneSelectedId = id;
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
    this.refreshSelectionVisuals();
  }

  applyFrame(frame) {
    for (const actor of [...frame.allies, ...frame.enemies]) {
      const view = this.actorViews.get(actor.instanceId);
      const position = this.project(actor);
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
