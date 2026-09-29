import Phaser from 'phaser';
import { arenaToStage, ARENA_STAGE } from './arenaProjection.js';
import { createDemoBattleSession } from './demoBattle.js';
import { nearestSurvivingAlly } from '../combat/targeting.js';

const SIM_STEP_SECONDS = 0.05;
const ACTOR_VISUAL_RADIUS = 24;
const ALLY_SELECT_RADIUS = 36;
const JOYSTICK = Object.freeze({
  x: 70,
  y: 435,
  radius: 54,
  inputRadius: 30,
  knobRadius: 24,
  deadZone: 0.03,
  acquireRadius: 76,
});

export class ArenaScene extends Phaser.Scene {
  constructor() { super('Arena'); }

  create() {
    this.selectedKoFixture = new URLSearchParams(window.location.search).get('fixture') === 'ko';
    this.session = createDemoBattleSession();
    this.accumulatorSeconds = 0;
    this.actorViews = new Map();
    this.selectedId = 'a2';
    this.fixtureKoApplied = false;
    this.joystickPointerId = null;
    this.joystickVector = { x: 0, y: 0 };

    this.cameras.main.setBackgroundColor('#253648');
    this.cameras.main.stopFollow();
    this.cameras.main.setScroll(0, 0);
    this.cameras.main.setBounds(0, 0, ARENA_STAGE.width, ARENA_STAGE.height);

    this.add.rectangle(
      0, 0, ARENA_STAGE.width, ARENA_STAGE.height, 0x8E7B5A,
    ).setOrigin(0, 0);

    this.add.line(
      0, 0,
      ARENA_STAGE.width * 0.08, ARENA_STAGE.height / 2,
      ARENA_STAGE.width * 0.92, ARENA_STAGE.height / 2,
      0x5F513B, 0.55,
    ).setOrigin(0, 0);

    this.add.ellipse(
      ARENA_STAGE.width / 2,
      ARENA_STAGE.height / 2,
      280,
      170,
    ).setStrokeStyle(2, 0x5F513B, 0.55);

    const first = this.session.snapshot();
    for (const actor of [...first.allies, ...first.enemies]) {
      const allied = actor.instanceId.startsWith('a');
      const marker = this.add.circle(0, 0, ACTOR_VISUAL_RADIUS, allied ? 0x58c8dc : 0xee9475)
        .setStrokeStyle(3, allied ? 0xc6f6ff : 0xffd3bf);
      const label = this.add.text(0, 0, actor.instanceId.toUpperCase(), {
        fontFamily: 'sans-serif', fontSize: '18px', color: '#ffffff',
      }).setOrigin(0.5);

      if (allied) {
        marker.setInteractive(
          new Phaser.Geom.Circle(
            ACTOR_VISUAL_RADIUS,
            ACTOR_VISUAL_RADIUS,
            ALLY_SELECT_RADIUS,
          ),
          Phaser.Geom.Circle.Contains,
        );
        marker.on('pointerdown', () => this.selectAlly(actor.instanceId, this.session.snapshot()));
      }

      this.actorViews.set(actor.instanceId, { marker, label, allied });
    }

    this.createJoystick();
    this.applyFrame(first);
    this.selectAlly(this.selectedId, first);

    window.__arenaSmoke = {
      sceneReady: true,
      actorCount: this.actorViews.size,
      fixture: this.selectedKoFixture ? 'ko' : 'default',
      runtimeMode: 'live',
      cameraMode: 'fixed',
      stageWidth: ARENA_STAGE.width,
      stageHeight: ARENA_STAGE.height,
      get selectedId() { return window.__arenaSceneSelectedId ?? null; },
      get controlSource() { return window.__arenaSceneControlSource ?? 'ai'; },
    };
  }

  createJoystick() {
    this.joystickBase = this.add.circle(
      JOYSTICK.x,
      JOYSTICK.y,
      JOYSTICK.radius,
      0x101820,
      0.34,
    ).setStrokeStyle(2, 0xc6f6ff, 0.5).setDepth(20);

    this.joystickKnob = this.add.circle(
      JOYSTICK.x,
      JOYSTICK.y,
      JOYSTICK.knobRadius,
      0xc6f6ff,
      0.72,
    ).setDepth(21);

    this.joystickBase.setInteractive(
      new Phaser.Geom.Circle(JOYSTICK.radius, JOYSTICK.radius, JOYSTICK.acquireRadius),
      Phaser.Geom.Circle.Contains,
    );

    this.joystickBase.on('pointerdown', (pointer) => {
      if (!this.selectedId) return;
      this.joystickPointerId = pointer.id;
      this.updateJoystickFromPointer(pointer);
    });

    this.input.on('pointermove', (pointer) => {
      if (pointer.id !== this.joystickPointerId) return;
      this.updateJoystickFromPointer(pointer);
    });

    this.input.on('pointerup', (pointer) => {
      if (pointer.id !== this.joystickPointerId) return;
      this.releaseJoystick();
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.off('pointermove');
      this.input.off('pointerup');
    });
  }

  pointerToStage(pointer) {
    const rect = this.game.canvas.getBoundingClientRect();
    const event = pointer.event;

    const touch =
      event?.changedTouches?.[0] ??
      event?.touches?.[0] ??
      null;

    const clientX = Number.isFinite(touch?.clientX)
      ? touch.clientX
      : Number.isFinite(event?.clientX)
        ? event.clientX
        : rect.left + pointer.x;

    const clientY = Number.isFinite(touch?.clientY)
      ? touch.clientY
      : Number.isFinite(event?.clientY)
        ? event.clientY
        : rect.top + pointer.y;

    return {
      x: (clientX - rect.left) * (ARENA_STAGE.width / rect.width),
      y: (clientY - rect.top) * (ARENA_STAGE.height / rect.height),
    };
  }

  updateJoystickFromPointer(pointer) {
    const point = this.pointerToStage(pointer);
    const dx = point.x - JOYSTICK.x;
    const dy = point.y - JOYSTICK.y;
    const distance = Math.hypot(dx, dy);
    const rawMagnitude = Math.min(1, distance / JOYSTICK.inputRadius);
    const magnitude = rawMagnitude <= JOYSTICK.deadZone
      ? 0
      : (rawMagnitude - JOYSTICK.deadZone) / (1 - JOYSTICK.deadZone);

    if (distance <= 0.001 || magnitude <= 0) {
      this.joystickVector = { x: 0, y: 0 };
      this.joystickKnob.setPosition(JOYSTICK.x, JOYSTICK.y);
      return;
    }

    const nx = dx / distance;
    const ny = dy / distance;
    this.joystickVector = { x: nx * magnitude, y: ny * magnitude };
    this.joystickKnob.setPosition(
      JOYSTICK.x + nx * JOYSTICK.radius * magnitude,
      JOYSTICK.y + ny * JOYSTICK.radius * magnitude,
    );
  }

  releaseJoystick() {
    if (this.selectedId) this.session.clearPlayerMovement(this.selectedId);
    this.joystickPointerId = null;
    this.joystickVector = { x: 0, y: 0 };
    this.joystickKnob.setPosition(JOYSTICK.x, JOYSTICK.y);
  }

  selectAlly(id, frame) {
    const actor = frame.allies.find((ally) => ally.instanceId === id && ally.hp > 0);
    if (!actor) return false;

    if (this.selectedId && this.selectedId !== id) {
      this.session.clearPlayerMovement(this.selectedId);
    }

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

    this.releaseJoystick();
    this.selectedId = null;
    window.__arenaSceneSelectedId = null;
    this.refreshSelectionVisuals();
  }

  applyFrame(frame) {
    for (const actor of [...frame.allies, ...frame.enemies]) {
      const view = this.actorViews.get(actor.instanceId);
      const position = arenaToStage(actor);
      view.marker.setPosition(position.x, position.y).setAlpha(actor.hp > 0 ? 1 : 0.35);
      view.label.setPosition(position.x, position.y - 42).setAlpha(actor.hp > 0 ? 1 : 0.5);
    }
    this.ensureLivingSelection(frame);
    this.refreshSelectionVisuals();

    const selected = this.selectedId ? this.session.actorById(this.selectedId) : null;
    window.__arenaSceneControlSource = selected
      ? selected.controlHandoff.controlSource(this.session.elapsedSeconds * 1000)
      : 'none';
  }

  applyKoFixtureIfNeeded() {
    if (!this.selectedKoFixture || this.fixtureKoApplied || this.session.elapsedSeconds < 1) return;
    const a2 = this.session.actorById('a2');
    if (a2 && a2.hp > 0) a2.damage(a2.maxHp);
    this.fixtureKoApplied = true;
  }

  update(_time, deltaMs) {
    this.accumulatorSeconds += Math.min(deltaMs / 1000, 0.25);

    while (this.accumulatorSeconds >= SIM_STEP_SECONDS && this.session.result() === 'running') {
      this.accumulatorSeconds -= SIM_STEP_SECONDS;

      if (this.joystickPointerId !== null && this.selectedId) {
        this.session.setPlayerMovement(this.selectedId, this.joystickVector);
      }

      this.session.step(SIM_STEP_SECONDS);
      this.applyKoFixtureIfNeeded();
    }

    this.applyFrame(this.session.snapshot());
  }
}
