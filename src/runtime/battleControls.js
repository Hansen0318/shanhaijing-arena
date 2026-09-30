const pauseIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16M17 4v16" stroke="currentColor" stroke-width="5"/></svg>';
const resumeIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v18l16-9z" fill="currentColor"/></svg>';
const exitIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" stroke="currentColor" stroke-width="3"/></svg>';
export function createBattleControls(host,{onPause,onExit}) {
 const root=document.createElement('div');root.className='battle-controls';root.hidden=true;
 const pause=document.createElement('button'),exit=document.createElement('button');
 pause.type=exit.type='button';pause.onclick=onPause;exit.onclick=onExit;
 exit.innerHTML=exitIcon;exit.setAttribute('aria-label','Exit');exit.title='Exit';
 root.append(pause,exit);host.append(root);
 return {
  update(paused,available,canExit=true){
   root.hidden=!available;
   pause.innerHTML=paused?resumeIcon:pauseIcon;
   pause.setAttribute('aria-label',paused?'Resume':'Pause');pause.title=paused?'Resume':'Pause';
   pause.setAttribute('aria-pressed',String(paused));exit.hidden=!canExit;
  },
  hide(){root.hidden=true;},
 };
}
