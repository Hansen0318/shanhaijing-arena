import { ARENA_STAGE } from './arenaProjection.js';

export function portraitCardLayout(side, index) {
  return {
    x: side === 'ally' ? 72 : ARENA_STAGE.width - 72,
    y: 56 + index * 92,
    portraitSize: 70,
    backingY: 0,
    backingWidth: 70,
    backingHeight: 70,
    hpY: 43,
    hpWidth: 70,
    hpHeight: 14,
    top: -35,
    bottom: 50,
    selectedScale: 1.08,
  };
}
