export const FULL_AI_RESUME_MS = 0;

export class ControlHandoff {
  constructor({ resumeAfterMs = FULL_AI_RESUME_MS } = {}) {
    this.resumeAfterMs = resumeAfterMs;
    this.lastPlayerInputAt = Number.NEGATIVE_INFINITY;
  }

  registerPlayerInput(nowMs) {
    this.lastPlayerInputAt = nowMs;
  }

  isPlayerOverrideActive(nowMs) {
    return nowMs - this.lastPlayerInputAt <= this.resumeAfterMs;
  }

  controlSource(nowMs) {
    return this.isPlayerOverrideActive(nowMs) ? 'player' : 'ai';
  }
}
