export class PreBattleGate {
  constructor(seconds = 3) {
    this.remaining = seconds;
  }

  display() {
    return String(Math.ceil(this.remaining));
  }

  advance(deltaSeconds, onStart, onBattleFrame) {
    if (this.remaining > 0) {
      this.remaining = Math.max(0, this.remaining - deltaSeconds);
      if (this.remaining === 0) onStart();
      return;
    }
    onBattleFrame();
  }
}
