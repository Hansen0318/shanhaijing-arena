import Phaser from 'phaser';
import { arenaToStage, ARENA_STAGE } from './arenaProjection.js';
import { createDemoBattleSession } from './demoBattle.js';
import { nearestSurvivingAlly } from '../combat/targeting.js';
import { hitTestCircle, joystickVectorFromPoint } from './arenaInput.js';

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
          const point = { x: marker.x, y: marker.y };
          this.debugState.phaser = 'actor-down';
          this.debugState.phaserPoint = point;
          this.selectAlly(actor.instanceId, this.session.snapshot());
          this.refreshInputDebugOverlay();
        });
      }

      this.actorViews.set(actor.instanceId, { marker, label, allied });
    }

    this.createJoystick();
    this.createInputDebugOverlay();
    this.bindPhaserInput();
    this.bindDiagnosticDomInput();
    this.applyFrame(first);
    this.selectAlly(this.selectedId, first);

    window.__arenaSmoke = {
      sceneReady: true,
      actorCount: this.actorViews.size,
      fixture: this.selectedKoFixture ? 'ko' : 'default',
      runtimeMode: 'live',
      cameraMode: 'fixed',
      inputMode: 'phaser',
      stageWidth: ARENA_STAGE.width,
      stageHeight: ARENA_STAGE.height,
      get selectedId() { return window.__arenaSceneSelectedId ?? null; },
      get controlSource() { return window.__arenaSceneControlSource ?? 'ai'; },
      get lastInput() { return window.__arenaLastInput ?? null; },
    };
  }

  createInputDebugOverlay() {
    this.inputDebugText = this.add.text(12, 12, 'DOM: idle\nPhaser: idle', {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 6, y: 4 },
    }).setDepth(1000).setScrollFactor(0);

    this.debugState = {
      dom: 'idle',
      phaser: 'idle',
      domPoint: null,
      phaserPoint: null,
    };
    this.refreshInputDebugOverlay();
  }

  refreshInputDebugOverlay() {
    if (!this.inputDebugText) return;
    const domPoint = this.debugState.domPoint
      ? `(${Math.round(this.debugState.domPoint.x)}, ${Math.round(this.debugState.domPoint.y)})`
      : '-';
    const phaserPoint = this.debugState.phaserPoint
      ? `(${Math.round(this.debugState.phaserPoint.x)}, ${Math.round(this.debugState.phaserPoint.y)})`
      : '-';

    this.inputDebugText.setText([
      `DOM: ${this.debugState.dom} ${domPoint}`,
      `Phaser: ${this.debugState.phaser} ${phaserPoint}`,
      `Selected: ${this.selectedId ?? 'none'}`,
      `Stick: ${this.joystickPointerId ?? 'none'}`,
    ]);
  }

  bindDiagnosticDomInput() {
    const canvas = this.game.canvas;

    this.onDiagnosticTouchStart = (event) => {
      const touch = event.changedTouches?.[0];
      if (!touch) return;
      this.debugState.dom = 'touchstart';
      this.debugState.domPoint = { x: touch.clientX, y: touch.clientY };
      this.refreshInputDebugOverlay();
    };

    this.onDiagnosticPointerDown = (event) => {
      this.debugState.dom = 'pointerdown';
      this.debugState.domPoint = { x: event.clientX, y: event.clientY };
      this.refreshInputDebugOverlay();
    };
    this.onDiagnosticPointerMove = (event) => {
      if (!event.buttons && event.pointerType !== 'touch') return;
      this.debugState.dom = 'move';
      this.debugState.domPoint = { x: event.clientX, y: event.clientY };
      this.refreshInputDebugOverlay();
    };
    this.onDiagnosticPointerUp = (event) => {
      this.debugState.dom = 'up';
      this.debugState.domPoint = { x: event.clientX, y: event.clientY };
      this.refreshInputDebugOverlay();
    };

    canvas.addEventListener('touchstart', this.onDiagnosticTouchStart, { passive: true });
    canvas.addEventListener('pointerdown', this.onDiagnosticPointerDown);
    canvas.addEventListener('pointermove', this.onDiagnosticPointerMove);
    canvas.addEventListener('pointerup', this.onDiagnosticPointerUp);
    canvas.addEventListener('pointercancel', this.onDiagnosticPointerUp);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      canvas.removeEventListener('touchstart', this.onDiagnosticTouchStart);
      canvas.removeEventListener('pointerdown', this.onDiagnosticPointerDown);
      canvas.removeEventListener('pointermove', this.onDiagnosticPointerMove);
      canvas.removeEventListener('pointerup', this.onDiagnosticPointerUp);
      canvas.removeEventListener('pointercancel', this.onDiagnosticPointerUp);
    });
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
      const point = { x: pointer.x, y: pointer.y };
      this.debugState.phaser = 'stick-down';
      this.debugState.phaserPoint = point;
      this.updateJoystickFromStagePoint(point);
      this.refreshInputDebugOverlay();
    });
  }

  pointerPoint(pointer) {
    return { x: pointer.x, y: pointer.y };
  }

  bindPhaserInput() {
    this.input.setTopOnly(true);

    this.inputDebugZone = this.add.zone(
      ARENA_STAGE.width / 2,
      ARENA_STAGE.height / 2,
      ARENA_STAGE.width,
      ARENA_STAGE.height,
    ).setInteractive().setDepth(-1000);

    this.inputDebugZone.on('pointerdown', (pointer) => {
      this.debugState.phaser = 'zone-down';
      this.debugState.phaserPoint = { x: pointer.x, y: pointer.y };
      this.refreshInputDebugOverlay();
    });

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
    if (!pointer.isDown) return;
    const point = this.pointerPoint(pointer);
    this.debugState.phaser = 'move';
    this.debugState.phaserPoint = point;
    this.refreshInputDebugOverlay();
    if (pointer.id !== this.joystickPointerId) return;
    window.__arenaLastInput = { type: 'pointermove', x: point.x, y: point.y };
    this.updateJoystickFromStagePoint(point);
  }

  handlePointerUp(pointer) {
    this.debugState.phaser = 'up';
    this.debugState.phaserPoint = { x: pointer.x, y: pointer.y };
    this.refreshInputDebugOverlay();
    if (pointer.id !== this.joystickPointerId) return;
    window.__arenaLastInput = { type: 'pointerup', x: pointer.x, y: pointer.y };
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
    this.refreshInputDebugOverlay();
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
