// A presentation gate; simulation/countdown are not advanced while it is closed.
export class SceneAssetGate {
 constructor(onChange=()=>{}){this.state='idle';this.error=null;this.attempt=0;this.onChange=onChange;}
 get ready(){return this.state==='ready';}
 async start(load){
  if(this.state==='closed')return;
  const attempt=++this.attempt;this.state='loading';this.error=null;this.onChange(this.state);
  try{await load();if(this.state==='closed'||attempt!==this.attempt)return;this.state='ready';}
  catch(error){if(this.state==='closed'||attempt!==this.attempt)return;this.error=error;this.state='error';}
  this.onChange(this.state);
 }
 destroy(){this.attempt++;this.state='closed';this.onChange=()=>{};}
}
