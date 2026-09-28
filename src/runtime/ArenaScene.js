import Phaser from 'phaser';
import { arenaToStage, ARENA_STAGE } from './arenaProjection.js';
import { createDemoBattleSession } from './demoBattle.js';
import { nearestSurvivingAlly } from '../combat/targeting.js';

const SIM_STEP_SECONDS = 0.05;
const JOYSTICK = Object.freeze({
  x: 56,
  y: 466,
  radius: 50,
  inputRadius: 30,
  knobRadius: 22,
  deadZone: 0.03,
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

      this.actorViews.set(actor.instanceId, { marker, label, allied });
    }

    this.createJoystick();
    this.bindCanvasPointerInput();
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
      get lastInput() { return window.__arenaLastInput ?? null; },
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
  }

  clientToStage(clientX, clientY) {
    const rect = this.game.canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (ARENA_STAGE.width / rect.width),
      y: (clientY - rect.top) * (ARENA_STAGE.height / rect.height),
    };
  }

  bindCanvasPointerInput() {
    const documentTarget = document;

    const handleStageDown = (point, pointerId) => {
      const joystickDistance = Math.hypot(point.x - JOYSTICK.x, point.y - JOYSTICK.y);
      if (joystickDistance <= JOYSTICK.radius * 1.45 && this.selectedId) {
        this.joystickPointerId = pointerId;
        this.updateJoystickFromStagePoint(point);
        return true;
      }

      const frame = this.session.snapshot();
      for (const ally of frame.allies) {
        if (ally.hp <= 0) continue;
        const actorPoint = arenaToStage(ally);
        const hitRadius = 42;
        if (Math.hypot(point.x - actorPoint.x, point.y - actorPoint.y) <= hitRadius) {
          this.selectAlly(ally.instanceId, frame);
          return true;
        }
      }
      return false;
    };

    this.onTouchStart = (event) => {
      const touches = event.changedTouches;
      for (let index = 0; index < touches.length; index += 1) {
        const touch = touches.item ? touches.item(index) : touches[index];
        if (!touch) continue;
        const point = this.clientToStage(touch.clientX, touch.clientY);
        window.__arenaLastInput = { type: 'touchstart', x: point.x, y: point.y };
        if (handleStageDown(point, touch.identifier)) {
          event.preventDefault();
          break;
        }
      }
    };

    this.onTouchMove = (event) => {
      if (this.joystickPointerId === null) return;
      const touches = event.changedTouches;
      for (let index = 0; index < touches.length; index += 1) {
        const touch = touches.item ? touches.item(index) : touches[index];
        if (!touch || touch.identifier !== this.joystickPointerId) continue;
        const point = this.clientToStage(touch.clientX, touch.clientY);
        window.__arenaLastInput = { type: 'touchmove', x: point.x, y: point.y };
        this.updateJoystickFromStagePoint(point);
        event.preventDefault();
        break;
      }
    };

    this.onTouchEnd = (event) => {
      if (this.joystickPointerId === null) return;
      const touches = event.changedTouches;
      for (let index = 0; index < touches.length; index += 1) {
        const touch = touches.item ? touches.item(index) : touches[index];
        if (!touch || touch.identifier !== this.joystickPointerId) continue;
        window.__arenaLastInput = { type: 'touchend' };
        this.releaseJoystick();
        event.preventDefault();
        break;
      }
    };

    this.onDocumentPointerDown = (event) => {
      if (event.pointerType === 'touch') return;
      const handled = handleStageDown(
        this.clientToStage(event.clientX, event.clientY),
        event.pointerId,
      );
      if (handled) event.preventDefault();
    };

    this.onDocumentPointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      if (event.pointerId !== this.joystickPointerId) return;
      this.updateJoystickFromStagePoint(this.clientToStage(event.clientX, event.clientY));
      event.preventDefault();
    };

    this.onDocumentPointerUp = (event) => {
      if (event.pointerType === 'touch') return;
      if (event.pointerId !== this.joystickPointerId) return;
      this.releaseJoystick();
      event.preventDefault();
    };

    documentTarget.addEventListener('touchstart', this.onTouchStart, { capture: true, passive: false });
    documentTarget.addEventListener('touchmove', this.onTouchMove, { capture: true, passive: false });
    documentTarget.addEventListener('touchend', this.onTouchEnd, { capture: true, passive: false });
    documentTarget.addEventListener('touchcancel', this.onTouchEnd, { capture: true, passive: false });
    documentTarget.addEventListener('pointerdown', this.onDocumentPointerDown, { capture: true, passive: false });
    documentTarget.addEventListener('pointermove', this.onDocumentPointerMove, { capture: true, passive: false });
    documentTarget.addEventListener('pointerup', this.onDocumentPointerUp, { capture: true, passive: false });
    documentTarget.addEventListener('pointercancel', this.onDocumentPointerUp, { capture: true, passive: false });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      documentTarget.removeEventListener('touchstart', this.onTouchStart, true);
      documentTarget.removeEventListener('touchmove', this.onTouchMove, true);
      documentTarget.removeEventListener('touchend', this.onTouchEnd, true);
      documentTarget.removeEventListener('touchcancel', this.onTouchEnd, true);
      documentTarget.removeEventListener('pointerdown', this.onDocumentPointerDown, true);
      documentTarget.removeEventListener('pointermove', this.onDocumentPointerMove, true);
      documentTarget.removeEventListener('pointerup', this.onDocumentPointerUp, true);
      documentTarget.removeEventListener('pointercancel', this.onDocumentPointerUp, true);
    });
  }

  updateJoystickFromStagePoint(point) {
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
