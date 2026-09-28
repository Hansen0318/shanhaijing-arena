import Phaser from 'phaser';
import { arenaToStage, ARENA_STAGE } from './arenaProjection.js';
import { createDemoBattleSession } from './demoBattle.js';
import { nearestSurvivingAlly } from '../combat/targeting.js';
import { hitTestCircle, joystickVectorFromPoint } from './arenaInput.js';
import { CanvasTouchAdapter } from './canvasTouchAdapter.js';

const SIM_STEP_SECONDS = 0.05;
const JOYSTICK = Object.freeze({
  x: 56,
  y: 466,
  radius: 50,
  inputRadius: 30,
  knobRadius: 22,
  deadZone: 0.03,
  acquireRadius: 72,
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
      0, 0, ARENA_STAGE.width, ARENA_STAGE.height, 0x253648,
    ).setOrigin(0, 0);

    this.add.line(
      0, 0,
      ARENA_STAGE.width * 0.08, ARENA_STAGE.height / 2,
      ARENA_STAGE.width * 0.92, ARENA_STAGE.height / 2,
      0x344a5f, 0.55,
    ).setOrigin(0, 0);

    this.add.ellipse(
      ARENA_STAGE.width / 2,
      ARENA_STAGE.height / 2,
      280,
      170,
    ).setStrokeStyle(2, 0x344a5f, 0.55);

    const first = this.session.snapshot();
    for (const actor of [...first.allies, ...first.enemies]) {
      const allied = actor.instanceId.startsWith('a');
      const marker = this.add.circle(0, 0, 24, allied ? 0x58c8dc : 0xee9475)
        .setStrokeStyle(3, allied ? 0xc6f6ff : 0xffd3bf);
      const label = this.add.text(0, 0, actor.instanceId.toUpperCase(), {
        fontFamily: 'sans-serif', fontSize: '18px', color: '#ffffff',
      }).setOrigin(0.5);

      if (allied) {
        marker.setInteractive({ useHandCursor: true });
        marker.on('pointerdown', () => {
          this.selectAlly(actor.instanceId, this.session.snapshot());
        });
      }

      this.actorViews.set(actor.instanceId, { marker, label, allied });
    }

    this.createJoystick();
    this.bindPhaserInput();
    this.bindCanvasTouchInput();
    this.applyFrame(first);
    this.selectAlly(this.selectedId, first);

    window.__arenaSmoke = {
      sceneReady: true,
      actorCount: this.actorViews.size,
      fixture: this.selectedKoFixture ? 'ko' : 'default',
      runtimeMode: 'live',
      cameraMode: 'fixed',
      inputMode: 'canvas-touch-adapter+phaser-desktop',
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
      this.updateJoystickFromStagePoint({ x: pointer.x, y: pointer.y });
    });
  }

  bindCanvasTouchInput() {
    this.touchAdapter = new CanvasTouchAdapter({
      canvas: this.game.canvas,
      logicalWidth: ARENA_STAGE.width,
      logicalHeight: ARENA_STAGE.height,
      onStart: (point, touchId) => {
        if (this.selectedId && hitTestCircle(point, JOYSTICK, JOYSTICK.acquireRadius)) {
          this.joystickPointerId = `touch:${touchId}`;
          this.updateJoystickFromStagePoint(point);
          return true;
        }

        const frame = this.session.snapshot();
        for (const ally of frame.allies) {
          if (ally.hp <= 0) continue;
          const actorPoint = arenaToStage(ally);
          if (hitTestCircle(point, actorPoint, 42)) {
            this.selectAlly(ally.instanceId, frame);
            return true;
          }
        }
        return false;
      },
      onMove: (point, touchId) => {
        if (this.joystickPointerId !== `touch:${touchId}`) return false;
        this.updateJoystickFromStagePoint(point);
        return true;
      },
      onEnd: (_point, touchId) => {
        if (this.joystickPointerId !== `touch:${touchId}`) return false;
        this.releaseJoystick();
        return true;
      },
    });

    this.touchAdapter.start();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.touchAdapter.stop());
  }

  pointerPoint(pointer) {
    return { x: pointer.x, y: pointer.y };
  }

  bindPhaserInput() {
    this.input.on('pointermove', this.handlePointerMove, this);
    this.input.on('pointerup', this.handlePointerUp, this);
    this.input.on('pointerupoutside', this.handlePointerUp, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.off('pointermove', this.handlePointerMove, this);
      this.input.off('pointerup', this.handlePointerUp, this);
      this.input.off('pointerupoutside', this.handlePointerUp, this);
    });
  }

  handlePointerMove(pointer) {
    if (!pointer.isDown || pointer.id !== this.joystickPointerId) return;
    this.updateJoystickFromStagePoint(this.pointerPoint(pointer));
  }

  handlePointerUp(pointer) {
    if (pointer.id !== this.joystickPointerId) return;
    this.releaseJoystick();
  }

  updateJoystickFromStagePoint(point) {
    const vector = joystickVectorFromPoint(point, JOYSTICK);
    this.joystickVector = { x: vector.x, y: vector.y };

    if (vector.magnitude <= 0) {
      this.joystickKnob.setPosition(JOYSTICK.x, JOYSTICK.y);
      return;
    }

    this.joystickKnob.setPosition(
      JOYSTICK.x + vector.x * JOYSTICK.radius,
      JOYSTICK.y + vector.y * JOYSTICK.radius,
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
