export function clientToLogicalPoint(clientX, clientY, rect, logicalWidth, logicalHeight) {
  if (!rect || rect.width <= 0 || rect.height <= 0) {
    throw new RangeError('Canvas rect must have positive width and height');
  }
  return {
    x: (clientX - rect.left) * (logicalWidth / rect.width),
    y: (clientY - rect.top) * (logicalHeight / rect.height),
  };
}

export class CanvasTouchAdapter {
  constructor({ canvas, logicalWidth, logicalHeight, onStart, onMove, onEnd }) {
    this.canvas = canvas;
    this.logicalWidth = logicalWidth;
    this.logicalHeight = logicalHeight;
    this.onStart = onStart;
    this.onMove = onMove;
    this.onEnd = onEnd;
    this.activeTouchId = null;

    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }

  pointFromTouch(touch) {
    return clientToLogicalPoint(
      touch.clientX,
      touch.clientY,
      this.canvas.getBoundingClientRect(),
      this.logicalWidth,
      this.logicalHeight,
    );
  }

  start() {
    this.eventTarget = document;
    this.eventTarget.addEventListener('touchstart', this.handleStart, { capture: true, passive: false });
    this.eventTarget.addEventListener('touchmove', this.handleMove, { capture: true, passive: false });
    this.eventTarget.addEventListener('touchend', this.handleEnd, { capture: true, passive: false });
    this.eventTarget.addEventListener('touchcancel', this.handleEnd, { capture: true, passive: false });
  }

  stop() {
    if (this.eventTarget) {
      this.eventTarget.removeEventListener('touchstart', this.handleStart, true);
      this.eventTarget.removeEventListener('touchmove', this.handleMove, true);
      this.eventTarget.removeEventListener('touchend', this.handleEnd, true);
      this.eventTarget.removeEventListener('touchcancel', this.handleEnd, true);
    }
    this.eventTarget = null;
    this.activeTouchId = null;
  }

  handleStart(event) {
    if (event.target !== this.canvas) return;
    const touches = event.changedTouches;
    for (let index = 0; index < touches.length; index += 1) {
      const touch = touches.item ? touches.item(index) : touches[index];
      if (!touch) continue;
      if (this.activeTouchId === null) this.activeTouchId = touch.identifier;
      if (touch.identifier !== this.activeTouchId) continue;
      const handled = this.onStart?.(this.pointFromTouch(touch), touch.identifier) === true;
      if (handled) event.preventDefault();
      return;
    }
  }

  handleMove(event) {
    if (this.activeTouchId === null) return;
    if (event.target !== this.canvas) return;
    const touches = event.changedTouches;
    for (let index = 0; index < touches.length; index += 1) {
      const touch = touches.item ? touches.item(index) : touches[index];
      if (!touch || touch.identifier !== this.activeTouchId) continue;
      const handled = this.onMove?.(this.pointFromTouch(touch), touch.identifier) === true;
      if (handled) event.preventDefault();
      return;
    }
  }

  handleEnd(event) {
    if (this.activeTouchId === null) return;
    if (event.target !== this.canvas) return;
    const touches = event.changedTouches;
    for (let index = 0; index < touches.length; index += 1) {
      const touch = touches.item ? touches.item(index) : touches[index];
      if (!touch || touch.identifier !== this.activeTouchId) continue;
      const handled = this.onEnd?.(this.pointFromTouch(touch), touch.identifier) === true;
      this.activeTouchId = null;
      if (handled) event.preventDefault();
      return;
    }
  }
}
