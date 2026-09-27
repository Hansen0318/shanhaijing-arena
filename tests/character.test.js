import test from 'node:test';
import assert from 'node:assert/strict';
import { ControlHandoff } from '../src/combat/controlHandoff.js';
import {
  createCharacterDefinition, createCharacterState, applyDamage, applyHealing,
  isCharacterKO, canCharacterAct, canSelectCharacter,
} from '../src/combat/character.js';

const details = (type = 'power', role = 'tank') => ({
  id: 'guardian', name: 'Guardian', type, role,
  stats: { maxHp: 100, atk: 15, def: 8, moveSpeed: 3, attackSpeed: 1.2 },
  abilities: { basic: 'strike', heavy: 'crush', special: 'guard', awakening: 'roar', passives: ['hide'] },
});

test('definition is immutable and independent of its source and battle state', () => {
  const input = details();
  const definition = createCharacterDefinition(input);
  input.stats.maxHp = 999;
  input.abilities.passives.push('new');
  assert.equal(definition.stats.maxHp, 100);
  assert.deepEqual(definition.abilities.passives, ['hide']);
  assert.ok(Object.isFrozen(definition));
  assert.ok(Object.isFrozen(definition.stats));
  assert.ok(Object.isFrozen(definition.abilities.passives));
  const state = createCharacterState(definition, { instanceId: 'a1', teamId: 'allies', x: 2, y: 5 });
  applyDamage(state, 30);
  assert.equal(definition.stats.maxHp, 100);
  assert.equal(state.hp, 70);
  assert.throws(() => { state.hp = 1000; }, TypeError);
  assert.throws(() => { state.maxHp = 1000; }, TypeError);
  assert.equal(state.hp, 70);
});

test('each actor initializes with full HP, independent ability slots and handoff', () => {
  const definition = createCharacterDefinition(details());
  const ally = createCharacterState(definition, { instanceId: 'a1', teamId: 'allies', x: 2, y: 5 });
  const enemy = createCharacterState(definition, { instanceId: 'e1', teamId: 'enemies', x: 8, y: 9 });
  assert.equal(ally.instanceId, 'a1');
  assert.equal(ally.definitionId, definition.id);
  assert.equal(enemy.teamId, 'enemies');
  assert.deepEqual([ally.hp, ally.maxHp, ally.x, ally.y, ally.targetId], [100, 100, 2, 5, null]);
  assert.deepEqual(Object.keys(ally.abilityState).sort(), ['awakening', 'basic', 'heavy', 'special']);
  assert.deepEqual(ally.abilityState.basic, { definitionId: 'strike', cooldownRemaining: 0, phase: 'ready', targetId: null });
  assert.ok(ally.controlHandoff instanceof ControlHandoff);
  ally.abilityState.basic.phase = 'executing';
  assert.equal(enemy.abilityState.basic.phase, 'ready');
});

test('damage and healing clamp within zero and maximum HP', () => {
  const state = createCharacterState(createCharacterDefinition(details()), { instanceId: 'a', teamId: 'allies', x: 0, y: 0 });
  assert.equal(applyDamage(state, 40), 60);
  assert.equal(applyHealing(state, 200), 100);
  assert.equal(applyDamage(state, 500), 0);
  assert.equal(isCharacterKO(state), true);
});

test('KO is terminal: no action, selection or healing, even after another heal', () => {
  const state = createCharacterState(createCharacterDefinition(details()), { instanceId: 'a', teamId: 'allies', x: 0, y: 0 });
  assert.equal(canCharacterAct(state), true);
  assert.equal(canSelectCharacter(state), true);
  applyDamage(state, 100);
  assert.equal(canCharacterAct(state), false);
  assert.equal(canSelectCharacter(state), false);
  assert.equal(applyHealing(state, 80), 0);
  assert.equal(state.hp, 0);
});

test('type and role are independent for all nine combinations', () => {
  for (const type of ['power', 'speed', 'blast']) {
    for (const role of ['tank', 'attacker', 'support']) {
      const definition = createCharacterDefinition(details(type, role));
      assert.deepEqual([definition.type, definition.role], [type, role]);
    }
  }
});

test('invalid identifiers, coordinates and HP amounts are rejected', () => {
  const definition = createCharacterDefinition(details());
  assert.throws(() => createCharacterState(definition, { instanceId: '', teamId: 'allies', x: 0, y: 0 }));
  assert.throws(() => createCharacterState(definition, { instanceId: 'a', teamId: 'allies', x: Infinity, y: 0 }));
  const state = createCharacterState(definition, { instanceId: 'a', teamId: 'allies', x: 0, y: 0 });
  assert.throws(() => applyDamage(state, -1));
  assert.throws(() => applyHealing(state, NaN));
});
