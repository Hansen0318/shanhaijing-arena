import test from 'node:test';
import assert from 'node:assert/strict';
import { createCharacterDefinition, createCharacterState, applyDamage } from '../src/combat/character.js';
import { createAbilityDefinition, startAbility, finishAbility } from '../src/combat/ability.js';
import { decideAIIntent } from '../src/combat/ai.js';

const characterDef = () => createCharacterDefinition({
  id: 'fighter',
  name: 'Fighter',
  type: 'power',
  role: 'attacker',
  stats: { maxHp: 100, atk: 20, def: 5, moveSpeed: 4, attackSpeed: 1.5 },
  abilities: { basic: 'basic', heavy: 'heavy', special: 'special', awakening: 'awakening', passives: [] },
});

const actor = (id, team, x = 0, y = 0) =>
  createCharacterState(characterDef(), { instanceId: id, teamId: team, x, y });

const ability = (id, category, cooldown, range, priority = 0) =>
  createAbilityDefinition({
    id, category, cooldown, range, targetingRule: 'enemy',
    effect: { coefficient: 1 }, ai: { priority },
  });

const definitions = () => ({
  basic: ability('basic', 'basic', 0, 2, 0),
  heavy: ability('heavy', 'heavy', 4, 4, 20),
  special: ability('special', 'special', 7, 5, 30),
  awakening: ability('awakening', 'awakening', 12, 6, 40),
});

test('KO actor stays idle', () => {
  const a = actor('a', 'allies');
  applyDamage(a, 100);
  const intent = decideAIIntent({ actor: a, enemies: [actor('e', 'enemies', 1, 0)], abilityDefinitions: definitions(), nowMs: 0 });
  assert.deepEqual(intent, { kind: 'idle', reason: 'ko', targetId: null });
});

test('player override suppresses AI for the active input instant and AI resumes immediately after', () => {
  const a = actor('a', 'allies');
  const e = actor('e', 'enemies', 1, 0);
  a.controlHandoff.registerPlayerInput(1000);
  assert.equal(decideAIIntent({ actor: a, enemies: [e], abilityDefinitions: definitions(), nowMs: 1000 }).reason, 'player_override');
  assert.equal(decideAIIntent({ actor: a, enemies: [e], abilityDefinitions: definitions(), nowMs: 1001 }).kind, 'ability');
});

test('living current target is retained', () => {
  const a = actor('a', 'allies');
  const current = actor('current', 'enemies', 4, 0);
  const closer = actor('closer', 'enemies', 1, 0);
  const intent = decideAIIntent({ actor: a, enemies: [current, closer], currentTarget: current, abilityDefinitions: definitions(), nowMs: 0 });
  assert.equal(intent.targetId, 'current');
});

test('KO current target falls back to nearest living enemy', () => {
  const a = actor('a', 'allies');
  const dead = actor('dead', 'enemies', 1, 0);
  const near = actor('near', 'enemies', 2, 0);
  const far = actor('far', 'enemies', 8, 0);
  applyDamage(dead, 100);
  const intent = decideAIIntent({ actor: a, enemies: [dead, far, near], currentTarget: dead, abilityDefinitions: definitions(), nowMs: 0 });
  assert.equal(intent.targetId, 'near');
});

test('no living enemy returns idle', () => {
  const a = actor('a', 'allies');
  const dead = actor('dead', 'enemies', 1, 0);
  applyDamage(dead, 100);
  assert.deepEqual(
    decideAIIntent({ actor: a, enemies: [dead], abilityDefinitions: definitions(), nowMs: 0 }),
    { kind: 'idle', reason: 'no_target', targetId: null },
  );
});

test('highest valid positive-priority non-Basic ability wins', () => {
  const a = actor('a', 'allies');
  const e = actor('e', 'enemies', 3, 0);
  const intent = decideAIIntent({ actor: a, enemies: [e], abilityDefinitions: definitions(), nowMs: 0 });
  assert.deepEqual(intent, { kind: 'ability', category: 'awakening', definitionId: 'awakening', targetId: 'e' });
});

test('equal priority uses Awakening then Special then Heavy tie order', () => {
  const defs = definitions();
  defs.awakening = ability('awakening', 'awakening', 12, 6, 10);
  defs.special = ability('special', 'special', 7, 5, 10);
  defs.heavy = ability('heavy', 'heavy', 4, 4, 10);
  const a = actor('a', 'allies');
  const e = actor('e', 'enemies', 2, 0);
  assert.equal(decideAIIntent({ actor: a, enemies: [e], abilityDefinitions: defs, nowMs: 0 }).category, 'awakening');
});

test('cooling or out-of-range prioritized abilities are skipped and Basic falls back', () => {
  const defs = definitions();
  const a = actor('a', 'allies');
  const e = actor('e', 'enemies', 1, 0);

  a.abilityState.awakening.phase = 'cooldown';
  a.abilityState.awakening.cooldownRemaining = 5;
  a.abilityState.special.phase = 'cooldown';
  a.abilityState.special.cooldownRemaining = 4;
  a.abilityState.heavy.phase = 'cooldown';
  a.abilityState.heavy.cooldownRemaining = 3;

  const intent = decideAIIntent({ actor: a, enemies: [e], abilityDefinitions: defs, nowMs: 0 });
  assert.equal(intent.category, 'basic');
});

test('move intent is returned when target is outside all usable ability ranges', () => {
  const a = actor('a', 'allies');
  const e = actor('e', 'enemies', 20, 0);
  const intent = decideAIIntent({ actor: a, enemies: [e], abilityDefinitions: definitions(), nowMs: 0 });
  assert.deepEqual(intent, { kind: 'move', targetId: 'e', x: 20, y: 0 });
});

test('emitted AI ability intent executes through shared startAbility API', () => {
  const defs = definitions();
  const a = actor('a', 'allies');
  const e = actor('e', 'enemies', 3, 0);
  const intent = decideAIIntent({ actor: a, enemies: [e], abilityDefinitions: defs, nowMs: 0 });
  const slot = a.abilityState[intent.category];
  const definition = defs[intent.definitionId];
  assert.equal(startAbility({ caster: a, slot, definition, target: e, source: 'ai' }), true);
  assert.equal(slot.phase, 'executing');
  assert.equal(finishAbility({ caster: a, slot, definition }), true);
});

test('nonpositive AI priorities do not preempt Basic', () => {
  const defs = definitions();
  defs.awakening = ability('awakening', 'awakening', 12, 6, 0);
  defs.special = ability('special', 'special', 7, 5, -1);
  defs.heavy = ability('heavy', 'heavy', 4, 4, 0);
  const a = actor('a', 'allies');
  const e = actor('e', 'enemies', 1, 0);
  assert.equal(decideAIIntent({ actor: a, enemies: [e], abilityDefinitions: defs, nowMs: 0 }).category, 'basic');
});
