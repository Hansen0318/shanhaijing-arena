// Presentation only. All drift/fade/pop tweens use the existing scene pause clock.
const CATEGORY_STYLES = Object.freeze({
  basic: { size:24, duration:900 },
  heavy: { size:28, duration:1000 },
  special: { size:32, duration:1050 },
  awakening: { size:36, duration:1100 },
});
const FALLBACK_STYLE = { size:28, duration:1000 };

export class DamageNumbers {
  constructor(scene, project) {
    this.scene = scene;
    this.project = project;
    this.active = new Map();
    this.pops = new Map();
    this.offsets = new Map();
  }

  floatText(x, y, value, size, duration, critical, pop = false) {
    const text = this.scene.add.text(x, y, value, {
      fontFamily:'sans-serif', fontSize:`${size}px`, fontStyle:'bold',
      color:critical ? '#ffd16a' : '#fff6cd',
      stroke:critical ? '#3a1808' : '#18212b', strokeThickness:critical ? 7 : 5,
    }).setOrigin(.5).setDepth(25);
    const tween = this.scene.tweens.add({ targets:text, y:y-32, alpha:0, duration,
      onComplete:() => {
        this.pops.get(text)?.remove();
        this.pops.delete(text);
        this.active.delete(text);
        text.destroy();
      },
    });
    this.active.set(text, tween);
    if (pop) {
      text.scaleX = text.scaleY = 1;
      this.pops.set(text, this.scene.tweens.add({ targets:text,
        scaleX:1.16, scaleY:1.16, duration:100, yoyo:true, ease:'Quad.Out',
        onComplete:() => this.pops.delete(text),
      }));
    }
  }

  render(events) {
    for (const event of events) {
      if (!Number.isFinite(event.amount) || event.amount <= 0 || !event.position
        || !Number.isFinite(event.position.x) || !Number.isFinite(event.position.y)) continue;
      const index = this.offsets.get(event.targetId) ?? 0;
      this.offsets.set(event.targetId, (index+1)%5);
      const point = this.project(event.position);
      const x = point.x + [-18,0,18,-9,9][index];
      const y = point.y - 33 - (index%3)*10;
      const style = Object.hasOwn(CATEGORY_STYLES, event.category)
        ? CATEGORY_STYLES[event.category] : FALLBACK_STYLE;
      const critical = event.critical === true;
      const size = critical ? Math.round(style.size*1.25) : style.size;
      this.floatText(x, y, String(Math.round(event.amount)), size, style.duration, critical, critical);
      if (critical) this.floatText(x, y-size*.7-12, 'CRIT!', 16, style.duration, true);
    }
  }

  destroy() {
    for (const tween of this.pops.values()) tween.remove();
    for (const [text,tween] of this.active) { tween.remove(); text.destroy(); }
    this.pops.clear();
    this.active.clear();
    this.offsets.clear();
  }
}
