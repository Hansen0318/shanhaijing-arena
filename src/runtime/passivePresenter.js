// Passive state remains in the session; it creates no battlefield labels or HUD.
export class PassivePresenter {
 constructor(){this.badges=new Map();this.layouts=[];this.closed=false;}
 render(){}
 destroy(){this.closed=true;this.badges.clear();this.layouts=[];}
}
