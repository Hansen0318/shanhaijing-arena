import { ControlHandoff } from './controlHandoff.js';

const TYPES = new Set(['power', 'speed', 'blast']);
const ROLES = new Set(['tank', 'attacker', 'support']);
const ACTIVE_ABILITIES = ['basic', 'heavy', 'special', 'awakening'];

function nonempty(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new TypeError(`${label} must be a nonempty string`);
  return value;
}

function finite(value, label, positive = false) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || (positive && value === 0)) {
    throw new RangeError(`${label} must be a ${positive ? 'positive' : 'nonnegative'} finite number`);
  }
  return value;
}

export function createCharacterDefinition(input) {
  nonempty(input?.id, 'id');
  nonempty(input?.name, 'name');
  if (!TYPES.has(input.type)) throw new TypeError('Unknown character type');
  if (!ROLES.has(input.role)) throw new TypeError('Unknown character role');
  const stats = input.stats ?? {};
  const abilities = input.abilities ?? {};
  for (const key of ACTIVE_ABILITIES) nonempty(abilities[key], `${key} ability reference`);
  if (!Array.isArray(abilities.passives)) throw new TypeError('passives must be an array');
  abilities.passives.forEach((id) => nonempty(id, 'passive ability reference'));

  return Object.freeze({
    id: input.id, name: input.name, type: input.type, role: input.role,
    stats: Object.freeze({
      maxHp: finite(stats.maxHp, 'maxHp', true),
      atk: finite(stats.atk, 'atk'), def: finite(stats.def, 'def'),
      moveSpeed: finite(stats.moveSpeed, 'moveSpeed'),
      attackSpeed: finite(stats.attackSpeed, 'attackSpeed', true),
    }),
    abilities: Object.freeze({
      basic: abilities.basic, heavy: abilities.heavy,
      special: abilities.special, awakening: abilities.awakening,
      passives: Object.freeze([...abilities.passives]),
    }),
  });
}

class CharacterState {
  #hp;
  #maxHp;

  constructor(definition, { instanceId, teamId, x, y }) {
    this.instanceId = nonempty(instanceId, 'instanceId');
    this.teamId = nonempty(teamId, 'teamId');
    if (typeof x !== 'number' || !Number.isFinite(x) || typeof y !== 'number' || !Number.isFinite(y)) {
      throw new TypeError('Position must contain finite numeric x and y');
    }
    this.definitionId = definition.id;
    this.#hp = this.#maxHp = definition.stats.maxHp;
    this.x = x;
    this.y = y;
    this.targetId = null;
    this.abilityState = Object.fromEntries(ACTIVE_ABILITIES.map((category) => [category, {
      definitionId: definition.abilities[category], cooldownRemaining: 0, phase: 'ready', targetId: null,
    }]));
    this.controlHandoff = new ControlHandoff();
  }

  get hp() { return this.#hp; }
  get maxHp() { return this.#maxHp; }

  damage(amount) {
    finite(amount, 'damage');
    this.#hp = Math.max(0, this.#hp - amount);
    if (this.#hp === 0) this.targetId = null;
    return this.#hp;
  }

  heal(amount) {
    finite(amount, 'healing');
    if (this.#hp === 0) return 0;
    this.#hp = Math.min(this.#maxHp, this.#hp + amount);
    return this.#hp;
  }
}

export function createCharacterState(definition, spawn) {
  return new CharacterState(definition, spawn);
}

export function isCharacterKO(state) {
  return state.hp <= 0;
}

export function canCharacterAct(state) {
  return !isCharacterKO(state);
}

export function canSelectCharacter(state) {
  return !isCharacterKO(state);
}

export function applyDamage(state, amount) {
  return state.damage(amount);
}

export function applyHealing(state, amount) {
  return state.heal(amount);
}
