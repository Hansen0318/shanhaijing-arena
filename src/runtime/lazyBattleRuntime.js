// Menus never request the Phaser/runtime graph. Failed downloads remain retryable.
export function createBattleRuntimeLoader(importRuntime=()=>import('./battleRuntime.js')) {
 let pending=null;
 return ()=>pending??=importRuntime().catch(error=>{pending=null;throw error;});
}
