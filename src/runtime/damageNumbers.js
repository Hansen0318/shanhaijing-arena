// Presentation only. Phaser's existing scene TweenManager owns the pause clock.
export class DamageNumbers {
  constructor(scene, project) {
    this.scene=scene;this.project=project;this.active=new Map();this.offsets=new Map();
  }
  render(events) {
    for(const event of events) {
      if(!Number.isFinite(event.amount) || event.amount<=0 || !event.position
        || !Number.isFinite(event.position.x) || !Number.isFinite(event.position.y))continue;
      const index=this.offsets.get(event.targetId)??0;
      this.offsets.set(event.targetId,(index+1)%5);
      const point=this.project(event.position);
      const x=point.x+[-18,0,18,-9,9][index],y=point.y-33-(index%3)*10;
      const text=this.scene.add.text(x,y,String(Math.round(event.amount)),{
        fontFamily:'sans-serif',fontSize:'28px',fontStyle:'bold',color:'#fff6cd',
        stroke:'#18212b',strokeThickness:5,
      }).setOrigin(.5).setDepth(25);
      const tween=this.scene.tweens.add({targets:text,y:y-32,alpha:0,duration:1000,
        onComplete:()=>{this.active.delete(text);text.destroy();}});
      this.active.set(text,tween);
    }
  }
  destroy() {
    for(const [text,tween] of this.active){tween.remove();text.destroy();}
    this.active.clear();this.offsets.clear();
  }
}
