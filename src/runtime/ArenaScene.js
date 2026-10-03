import {TelegraphPresenter} from './telegraphs.js';
import {createLabBattleSession} from '../dev/battleLab/battleFactory.js';
import { resultRewardLines } from '../acquisition/presentation.js';
import Phaser from 'phaser';
import { arenaToStage, ARENA_STAGE } from './arenaProjection.js';
import { createDemoBattleSession } from './demoBattle.js';
import { createStageBattleSession } from '../campaign/battleFactory.js';
import { nearestSurvivingAlly } from '../combat/targeting.js';
import { allyHud, enemyHud, formatBattleTime } from './battleHud.js';
import { portraitCardLayout } from './portraitCardLayout.js';
import { battlePortrait } from '../roster/battlePresentation.js';
import { castVisual } from './castVfx.js';
import { DamageNumbers } from './damageNumbers.js';
import { PreBattleGate } from './preBattleGate.js';

const SIM_STEP_SECONDS = 0.05;
const ACTOR_VISUAL_RADIUS = 24;
const JOYSTICK = Object.freeze({
  x: 70,
  y: 435,
  radius: 54,
  inputRadius: 30,
  knobRadius: 24,
  deadZone: 0.03,
  acquireRadius: 76,
});

const SKILL_BUTTONS = Object.freeze({
  heavy: Object.freeze({
    x: ARENA_STAGE.width - 202,
    y: 454,
    radius: 42,
    label: 'H',
    color: 0xd9923b,
  }),
  special: Object.freeze({
    x: ARENA_STAGE.width - 126,
    y: 344,
    radius: 42,
    label: 'S',
    color: 0x4e91d9,
  }),
  awakening: Object.freeze({
    x: ARENA_STAGE.width - 58,
    y: 452,
    radius: 50,
    label: 'A',
    color: 0xc94a46,
  }),
});

export class ArenaScene extends Phaser.Scene {
  constructor() { super('Arena'); }

  init(data = {}) {
    this.labConfig = data.labConfig ?? null;
    this.labActions = this.labConfig ? data.labActions ?? null : null;
    this.stageConfig = this.labConfig ? null : data.stageConfig ?? null;
    this.manualControlEnabled = !this.labConfig || this.labConfig.options.controlMode === 'manual';
    this.campaignActions = this.labConfig ? null : data.campaignActions ?? null;
    this.onPlaybackChange = data.onPlaybackChange ?? (() => {});
    this.onSceneReady = data.onSceneReady ?? (() => {});
  }

  create() {
    this.selectedKoFixture = !this.labConfig && new URLSearchParams(window.location.search).get('fixture') === 'ko';
    this.session = this.labConfig ? createLabBattleSession(this.labConfig) : this.stageConfig ? createStageBattleSession(this.stageConfig) : createDemoBattleSession();
    this.accumulatorSeconds = 0;
    this.actorViews = new Map();
    this.damageNumbers = new DamageNumbers(this,arenaToStage);
    this.telegraphs = new TelegraphPresenter(this,arenaToStage);
    this.events.once('shutdown',()=>this.telegraphs.destroy());
    this.events.once('shutdown',()=>this.damageNumbers.destroy());
    this.selectedId = this.labConfig?.selectedAllyId ?? 'a2';
    this.fixtureKoApplied = false;
    this.preBattleGate = new PreBattleGate(this.labConfig?.options.skipCountdown ? 0 : undefined);
    this.preBattleRemaining = this.preBattleGate.remaining;
    this.battleStarted = Boolean(this.labConfig?.options.skipCountdown);
    this.paused = false;
    this.time.paused = false;
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
      const identity=battlePortrait(this.session,actor.instanceId);
      const marker = this.add.circle(0, 0, ACTOR_VISUAL_RADIUS, Phaser.Display.Color.HexStringToColor(identity.color).color)
        .setStrokeStyle(3, allied ? 0xc6f6ff : 0xffd3bf);
      const label = this.add.text(0, 0, identity.label, {
        fontFamily: 'sans-serif', fontSize: '18px', color: '#ffffff', align:'center',
      }).setOrigin(0.5);

      this.actorViews.set(actor.instanceId, { marker, label, allied });
    }

    this.createHud();
    this.skillButtons = null;
    this.joystickKnob = null;
    if (this.manualControlEnabled) { this.createJoystick(); this.createSkillButtons(); }
    this.createPreBattleCountdown();
    this.createResultView();
    this.applyFrame(first);
    this.selectAlly(this.selectedId, first, true);
    this.onPlaybackChange(false, true);
    this.onSceneReady(this);

    window.__arenaSmoke = {
      stageId: this.session.stageId ?? null,
      chapterId: this.session.chapterId ?? null,
      sceneReady: true,
      actorCount: this.actorViews.size,
      fixture: this.selectedKoFixture ? 'ko' : 'default',
      runtimeMode: 'live',
      cameraMode: 'fixed',
      stageWidth: ARENA_STAGE.width,
      stageHeight: ARENA_STAGE.height,
      get selectedId() { return window.__arenaSceneSelectedId ?? null; },
      get controlSource() { return window.__arenaSceneControlSource ?? 'ai'; },
      skillButtons: ['heavy', 'special', 'awakening'],
      get battleStarted() { return window.__arenaBattleStarted ?? false; },
    };
  }

  createResultView() {
    this.resultLayer = this.add.container(0, 0).setDepth(50).setVisible(false);
    const shade = this.add.rectangle(0, 0, ARENA_STAGE.width, ARENA_STAGE.height, 0x172735, 0.76)
      .setOrigin(0, 0).setInteractive();
    this.resultText = this.add.text(ARENA_STAGE.width / 2, 214, '', {
      fontFamily: 'sans-serif', fontSize: '67px', fontStyle: 'bold', color: '#ffffff',
      stroke: '#20262d', strokeThickness: 7,
    }).setOrigin(0.5);
    this.rewardText = this.add.text(ARENA_STAGE.width / 2, 238, '', {
      fontFamily:'sans-serif',fontSize:'30px',fontStyle:'bold',color:'#ffe0a0',
      align:'center',wordWrap:{width:940},
    }).setOrigin(.5,0).setVisible(false);
    this.resultLayer.add([shade,this.resultText,this.rewardText]);
    const actions=this.labActions ? [
      ['RETRY',420,()=>this.labActions.retry()],
      ['BACK TO LAB',700,()=>this.labActions.back()],
    ] : this.campaignActions ? [
      ['NEXT STAGE',330,()=>this.campaignActions.next()],
      ['RETRY',560,()=>this.campaignActions.retry()],
      ['EXIT',790,()=>this.campaignActions.exit()],
    ] : [['RESTART',ARENA_STAGE.width/2,()=>this.scene.restart()]];
    this.resultButtons=new Map();
    for(const [label,x,callback] of actions) {
      const button=this.add.rectangle(x,338,210,70,0x4e91d9).setStrokeStyle(3,0xffffff).setInteractive();
      const text=this.add.text(x,338,label,{fontFamily:'sans-serif',fontSize:'25px',fontStyle:'bold',color:'#ffffff'}).setOrigin(.5);
      button.on('pointerdown',callback);this.resultLayer.add([button,text]);this.resultButtons.set(label,{button,text});
    }
  }

  showResult(result) {
    if (result === 'running' || this.resultLayer.visible) return;
    this.releaseJoystick();
    this.onPlaybackChange(false, false);
    if (this.labActions) this.labActions.result(result);
    const transaction=this.campaignActions?.result(this.session.stageId,result);
    const rewardLines=!this.labConfig && result==='victory'?resultRewardLines(transaction):[];
    this.rewardText.setText(rewardLines.join('\n')).setVisible(rewardLines.length>0);
    if(rewardLines.length) {
      this.resultText.setY(155);
      this.rewardText.setY(rewardLines.length>1?198:250).setFontSize(rewardLines.length>3?20:28);
      // Phaser measures wrapped lines; reserve the action band even for multi-item data.
      this.rewardText.setScale(Math.min(1,(294-this.rewardText.y)/Math.max(1,this.rewardText.height)));
    }
    const next=this.resultButtons.get('NEXT STAGE');
    if(next) {
      const visible=result==='victory' && this.campaignActions.hasNext();
      next.button.setVisible(visible);next.text.setVisible(visible);
      if(!visible) next.button.disableInteractive();
    }
    this.resultText.setText(result.toUpperCase());
    this.resultLayer.setVisible(true);
  }

  renderCastEvents() {
    this.damageNumbers?.render(this.session.drainDamageEvents());
    this.damageNumbers?.renderHeal(this.session.drainHealEvents());
    for (const event of this.session.drainCastEvents()) {
      const visual = castVisual(event, arenaToStage);
      const effect = this.add.graphics().setPosition(visual.origin.x, visual.origin.y).setDepth(15);
      const { x, y } = visual.direction;
      if (event.category === 'basic') {
        effect.lineStyle(5, 0xfff2b0, 0.95);
        effect.lineBetween(x * 10 - y * 12, y * 10 + x * 12, x * 20 + y * 12, y * 20 - x * 12);
      } else if (event.category === 'heavy') {
        effect.fillStyle(0xffae4a, 0.27).fillCircle(0, 0, 43);
        effect.lineStyle(6, 0xffd36c, 0.95).strokeCircle(0, 0, 43);
        effect.lineBetween(x * 12 - y * 31, y * 12 + x * 31, x * 35 + y * 31, y * 35 - x * 31);
      } else if (event.category === 'special') {
        effect.lineStyle(6, 0x6adaff, 0.95).strokeCircle(0, 0, 25);
        if (visual.ranged) {
          effect.lineStyle(7, 0xa5ebff, 0.95).lineBetween(0, 0, x * visual.length, y * visual.length);
          effect.fillStyle(0xe1f8ff).fillCircle(x * visual.length, y * visual.length, 10);
        }
      } else if (event.category === 'awakening') {
        effect.fillStyle(0xffe894, 0.21).fillCircle(0, 0, 60);
        effect.lineStyle(7, 0xffe894, 0.96).strokeCircle(0, 0, 60);
        for (let i = 0; i < 8; i += 1) {
          const angle = i * Math.PI / 4;
          effect.lineBetween(Math.cos(angle) * 35, Math.sin(angle) * 35,
            Math.cos(angle) * 72, Math.sin(angle) * 72);
        }
        if (visual.ranged) {
          effect.lineStyle(9, 0xffe894, 0.8).lineBetween(0, 0, x * visual.length, y * visual.length);
        }
      }
      this.tweens.add({ targets: effect, alpha: 0, scale: 1.16,
        duration: event.category === 'awakening' ? 480 : 320,
        onComplete: () => effect.destroy() });
    }
  }

  createHud() {
    this.portraitViews = new Map();
    for (const [side, ids] of [['ally', ['a1', 'a2', 'a3']], ['enemy', ['e1', 'e2', 'e3']]]) {
      for (const [index, id] of ids.entries()) {
        const layout = portraitCardLayout(side, index);
        const identity=battlePortrait(this.session,id);
        const card = this.add.container(layout.x, layout.y).setDepth(30);
        const backing = this.add.rectangle(0, layout.backingY,
          layout.backingWidth, layout.backingHeight, 0x172735, 0.88)
          .setStrokeStyle(2, 0x8ca7ad);
        const portrait = this.add.rectangle(0, layout.backingY,
          layout.portraitSize, layout.portraitSize,
          Phaser.Display.Color.HexStringToColor(identity.color).color)
          .setStrokeStyle(2, side === 'ally' ? 0xc6f6ff : 0xffd3bf);
        const name = this.add.text(0, layout.backingY, identity.label, {
          fontFamily: 'sans-serif', fontSize: identity.label.includes('\n')?'19px':'23px', fontStyle: 'bold', color: '#ffffff', align:'center',
        }).setOrigin(0.5);
        const barBack = this.add.rectangle(0, layout.hpY, layout.hpWidth, layout.hpHeight, 0x4a2020);
        const barFill = this.add.rectangle(-layout.hpWidth / 2, layout.hpY,
          layout.hpWidth, layout.hpHeight, 0xc94749).setOrigin(0, 0.5);
        const hpText = this.add.text(0, layout.hpY, '', {
          fontFamily: 'sans-serif', fontSize: '13px', fontStyle: 'bold', color: '#ffffff',
          stroke: '#2a1c20', strokeThickness: 2,
        }).setOrigin(0.5);
        card.add([backing, portrait, name, barBack, barFill, hpText]);
        if (side === 'ally' && this.manualControlEnabled) {
          portrait.setInteractive();
          portrait.on('pointerdown', () => this.selectAlly(id, this.session.snapshot()));
        }
        this.portraitViews.set(id, { card, backing, portrait, barFill, hpText, layout });
      }
    }

    this.timerText = this.add.text(ARENA_STAGE.width / 2, 35, '', {
      fontFamily: 'sans-serif', fontSize: '38px', fontStyle: 'bold', color: '#ffffff',
      stroke: '#20262d', strokeThickness: 4,
    }).setOrigin(0.5).setDepth(32);
  }

  refreshHud(frame) {
    for (const card of [...allyHud(frame.allies, this.selectedId), ...enemyHud(frame.enemies)]) {
      const view = this.portraitViews.get(card.id);
      view.barFill.width = view.layout.hpWidth * card.hpRatio;
      view.hpText.setText(card.hpText);
      view.card.setScale(card.selected ? view.layout.selectedScale : 1);
      view.backing.setStrokeStyle(card.selected ? 4 : 2, card.selected ? 0xffffff : 0x8ca7ad);
      view.portrait.setStrokeStyle(card.selected ? 4 : 2,
        card.selected ? 0xffffff : card.id.startsWith('a') ? 0xc6f6ff : 0xffd3bf);
      view.card.setAlpha(card.alive ? 1 : 0.48);
    }
    this.timerText.setText(formatBattleTime(frame.elapsedSeconds, this.session.maxSeconds));
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
      if (this.paused || !this.battleStarted || !this.selectedId || this.session.result() !== 'running') return;
      this.joystickPointerId = pointer.id;
      this.session.holdPlayerControl(this.selectedId);
      this.updateJoystickFromPointer(pointer);
    });

    this.input.on('pointermove', (pointer) => {
      if (this.paused || pointer.id !== this.joystickPointerId) return;
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



  createPreBattleCountdown() {
    this.countdownText = this.add.text(
      ARENA_STAGE.width / 2,
      ARENA_STAGE.height / 2 - 8,
      this.preBattleGate.display(),
      {
        fontFamily: 'sans-serif',
        fontSize: '76px',
        fontStyle: 'bold',
        color: '#ffffff',
        stroke: '#20262d',
        strokeThickness: 8,
      },
    ).setOrigin(0.5).setDepth(40);

    window.__arenaBattleStarted = this.battleStarted;
    this.countdownText.setVisible(!this.battleStarted);
  }

  updatePreBattleCountdown(deltaSeconds) {
    this.preBattleGate.advance(deltaSeconds, () => {
      this.battleStarted = true;
      window.__arenaBattleStarted = true;
      this.countdownText.setVisible(false);
      this.accumulatorSeconds = 0;
      this.refreshSkillButtons();
    }, () => this.advanceBattle(deltaSeconds));
    this.preBattleRemaining = this.preBattleGate.remaining;
    if (!this.battleStarted) this.countdownText.setText(this.preBattleGate.display());
  }

  createSkillButtons() {
    this.skillButtons = new Map();

    for (const [category, config] of Object.entries(SKILL_BUTTONS)) {
      const base = this.add.circle(
        config.x,
        config.y,
        config.radius,
        config.color,
        0.92,
      ).setStrokeStyle(3, 0xe9edf1, 0.9).setDepth(20);

      base.setInteractive(
        new Phaser.Geom.Circle(config.radius, config.radius, config.radius + 8),
        Phaser.Geom.Circle.Contains,
      );

      const icon = this.add.text(config.x, config.y - 1, config.label, {
        fontFamily: 'sans-serif',
        fontSize: category === 'awakening' ? '30px' : '26px',
        fontStyle: 'bold',
        color: '#ffffff',
      }).setOrigin(0.5).setDepth(22);

      const cooldownText = this.add.text(config.x, config.y + 2, '', {
        fontFamily: 'sans-serif',
        fontSize: category === 'awakening' ? '26px' : '23px',
        fontStyle: 'bold',
        color: '#ffffff',
        stroke: '#111111',
        strokeThickness: 4,
      }).setOrigin(0.5).setDepth(24);

      const ring = this.add.graphics().setDepth(23);

      base.on('pointerdown', () => {
        if (this.paused || !this.battleStarted || !this.selectedId || this.session.result() !== 'running') return;
        const used = this.session.usePlayerAbility(this.selectedId, category);
        if (used) {
          this.renderCastEvents();
          this.applyFrame(this.session.snapshot());
        }
      });

      this.skillButtons.set(category, {
        base,
        icon,
        cooldownText,
        ring,
        config,
      });
    }

    this.refreshSkillButtons();
  }

  refreshSkillButtons() {
    if (!this.skillButtons) return;

    const actor = this.selectedId ? this.session.actorById(this.selectedId) : null;
    const usableActor = actor && actor.hp > 0;

    for (const [category, view] of this.skillButtons) {
      const slot = usableActor ? actor.abilityState[category] : null;
      const definition = slot ? this.session.abilityDefinitions[slot.definitionId] : null;
      const cooling = Boolean(slot && definition && slot.phase === 'cooldown' && slot.cooldownRemaining > 0);
      const ready = Boolean(!this.paused && this.battleStarted && usableActor && slot && definition && slot.phase === 'ready');

      view.base.setFillStyle(view.config.color, ready ? 0.92 : 0.34);
      view.base.setStrokeStyle(3, ready ? 0xe9edf1 : 0x7d8389, ready ? 0.9 : 0.7);
      view.icon.setAlpha(ready ? 1 : 0.28);
      view.cooldownText.setText(cooling ? String(Math.max(1, Math.ceil(slot.cooldownRemaining))) : '');

      view.ring.clear();
      const ringRadius = view.config.radius + 6;

      view.ring.lineStyle(5, 0x20262d, 0.68);
      view.ring.beginPath();
      view.ring.arc(view.config.x, view.config.y, ringRadius, 0, Math.PI * 2);
      view.ring.strokePath();

      if (cooling && definition.cooldown > 0) {
        const ratio = Phaser.Math.Clamp(slot.cooldownRemaining / definition.cooldown, 0, 1);
        const start = -Math.PI / 2;
        const end = start + Math.PI * 2 * ratio;
        view.ring.lineStyle(5, 0xf4f6f8, 0.95);
        view.ring.beginPath();
        view.ring.arc(view.config.x, view.config.y, ringRadius, start, end);
        view.ring.strokePath();
      } else if (ready) {
        view.ring.lineStyle(5, 0xf4f6f8, 0.95);
        view.ring.beginPath();
        view.ring.arc(view.config.x, view.config.y, ringRadius, 0, Math.PI * 2);
        view.ring.strokePath();
      }
    }
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
      this.joystickKnob?.setPosition(JOYSTICK.x, JOYSTICK.y);
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
    this.joystickKnob?.setPosition(JOYSTICK.x, JOYSTICK.y);
  }

  selectAlly(id, frame, automatic = false) {
    if (this.manualControlEnabled === false && !automatic) return false;
    if (this.paused) return false;
    const actor = frame.allies.find((ally) => ally.instanceId === id && ally.hp > 0);
    if (!actor) return false;

    if (this.selectedId && this.selectedId !== id) {
      this.session.clearPlayerMovement(this.selectedId);
    }

    this.selectedId = id;
    window.__arenaSceneSelectedId = id;
    this.refreshSelectionVisuals();
    this.refreshHud(frame);
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
      this.selectAlly(fallback.instanceId, frame, true);
      return;
    }

    this.releaseJoystick();
    this.selectedId = null;
    window.__arenaSceneSelectedId = null;
    this.refreshSelectionVisuals();
  }

  applyFrame(frame) {
    this.telegraphs.render(this.session.threats.active(this.session.elapsedSeconds*1000),this.session.elapsedSeconds*1000);
    for (const actor of [...frame.allies, ...frame.enemies]) {
      const view = this.actorViews.get(actor.instanceId);
      const position = arenaToStage(actor);
      view.marker.setPosition(position.x, position.y).setAlpha(actor.hp > 0 ? 1 : 0.35);
      const identity=battlePortrait(this.session,actor.instanceId);
      const guarded=this.session.statuses.damageMultiplier(actor.instanceId,this.session.elapsedSeconds)<1;
      view.label.setText?.(`${identity.label}${guarded&&actor.hp>0?' ◈':''}`);
      view.label.setPosition(position.x, position.y - 42).setAlpha(actor.hp > 0 ? 1 : 0.5);
    }
    this.ensureLivingSelection(frame);
    this.refreshSelectionVisuals();
    this.refreshSkillButtons();
    this.refreshHud(frame);
    this.showResult(frame.result);

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
    if (this.paused) return;
    const deltaSeconds = Math.min(deltaMs / 1000, 0.25);
    const wasStarted = this.battleStarted;
    this.updatePreBattleCountdown(deltaSeconds);
    if (!wasStarted) {
      this.applyFrame(this.session.snapshot());
    }
  }

  advanceBattle(deltaSeconds) {
    if (this.paused) return;
    this.accumulatorSeconds += deltaSeconds;

    while (this.accumulatorSeconds >= SIM_STEP_SECONDS && this.session.result() === 'running') {
      this.accumulatorSeconds -= SIM_STEP_SECONDS;

      if (this.joystickPointerId !== null && this.selectedId) {
        this.session.holdPlayerControl(this.selectedId);
        this.session.setPlayerMovement(this.selectedId, this.joystickVector);
      }

      this.session.step(SIM_STEP_SECONDS);
      this.applyKoFixtureIfNeeded();
    }

    this.renderCastEvents();
    this.applyFrame(this.session.snapshot());
  }

  togglePause() {
    if (this.session.result() !== 'running') return this.paused;
    this.paused = !this.paused;
    if (this.paused) {
      this.releaseJoystick();
      this.resumeTweenScale = this.tweens.getGlobalTimeScale();
      this.tweens.setGlobalTimeScale(0);
    } else {
      // Rebase Phaser's wall clock while progress is still frozen. Simply
      // resumeAll() would add the paused interval to the next VFX update.
      this.tweens.tick();
      this.tweens.setGlobalTimeScale(this.resumeTweenScale);
    }
    this.time.paused = this.paused;
    this.refreshSkillButtons();
    this.onPlaybackChange?.(this.paused, true);
    return this.paused;
  }
}
