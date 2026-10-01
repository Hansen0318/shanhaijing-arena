// Mulberry32: each battle owns its generator; no wall-clock or global random state.
export const DEFAULT_BATTLE_SEED = 0x5348414e;

export function createSeededRandom(seed = DEFAULT_BATTLE_SEED) {
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) {
    throw new RangeError('seed must be a uint32 integer');
  }
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
