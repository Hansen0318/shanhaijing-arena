// Independent reasons to stop the scene must not override a player's Pause.
export class BattleInterruption {
 constructor() {this.scene=null;this.manualPaused=false;this.portrait=false;this.exitOpen=false;}
 attach(scene) {this.scene=scene;this.manualPaused=false;this.exitOpen=false;this.sync();}
 detach() {this.scene=null;this.manualPaused=false;this.exitOpen=false;}
 sync() {
  if(!this.scene || (this.scene.session && this.scene.session.result()!=='running'))return;
  const stopped=this.manualPaused||this.portrait||this.exitOpen;
  if(this.scene.paused!==stopped)this.scene.togglePause();
 }
 toggleManual() {if(this.exitOpen||this.portrait||!this.scene)return;this.manualPaused=!this.manualPaused;this.sync();}
 setPortrait(value) {this.portrait=Boolean(value);this.sync();}
 openExit() {if(!this.scene||this.exitOpen)return false;this.exitOpen=true;this.sync();return true;}
 continueExit() {this.exitOpen=false;this.sync();}
}
