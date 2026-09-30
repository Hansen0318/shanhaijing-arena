import { ARENA_STAGE } from './arenaProjection.js';

export function portraitCardLayout(side, index) {
  return {
    x: side === 'ally' ? 72 : ARENA_STAGE.width - 72,
    y: 56 + index * 92,
    portraitSize: 84,
    backingY: 8,
    backingWidth: 84,
    backingHeight: 84,
    hpY: 41,
    hpWidth: 80,
    hpHeight: 18,
    top: -34,
    bottom: 50,
    selectedScale: 1.08,
  };
}
