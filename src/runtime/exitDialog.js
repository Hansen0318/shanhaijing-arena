export function createExitDialog(doc,{onContinue,onExit}) {
 const overlay=doc.createElement('div');overlay.className='exit-overlay';overlay.hidden=true;
 const panel=doc.createElement('div');panel.className='exit-panel';panel.setAttribute('role','dialog');
 panel.setAttribute('aria-modal','true');panel.setAttribute('aria-labelledby','exit-title');
 const title=doc.createElement('h2');title.id='exit-title';title.textContent='EXIT BATTLE?';
 const message=doc.createElement('p');message.textContent='Progress from this battle will not be saved.';
 const actions=doc.createElement('div');actions.className='exit-actions';
 const keep=doc.createElement('button');keep.type='button';keep.textContent='CONTINUE';keep.onclick=onContinue;
 const leave=doc.createElement('button');leave.type='button';leave.textContent='EXIT';leave.onclick=onExit;
 actions.append(keep,leave);panel.append(title,message,actions);overlay.append(panel);doc.body.append(overlay);
 return {open(){overlay.hidden=false;keep.focus();},close(){overlay.hidden=true;},get visible(){return !overlay.hidden;}};
}
