import {createLabConfig,labScenario} from './config.js';
import {rosterCatalog} from '../../roster/catalog.js';
// Deliberately has no Campaign, acquisition, persistence or storage capability.
export class BattleLabController{
 constructor(){this.screen='lab';this.outcome=null;this.lastConfig=null;this.draft={scenarioId:'normal',allyTeam:['P1','P2','P3'],enemyTeam:['P5','P1','P3'],hpRatio:null,skipCountdown:false,allSkillsReady:false,controlMode:'manual',typeCase:'advantage',allyTier:'T0',enemyTier:'T0',t0Baseline:false};}
 setScenario(id){const s=labScenario(id);if(this.screen!=='lab'||!s)return false;this.draft={...this.draft,scenarioId:id,allyTeam:[...s.allyTeam],enemyTeam:[...(s.typeCases?.[this.draft.typeCase]??s.enemyTeam)],hpRatio:null};return true;}
 setTeam(side,index,id){if(this.screen!=='lab'||!['allies','enemies'].includes(side)||!Number.isInteger(index)||index<0||index>2||!Object.hasOwn(rosterCatalog,id))return false;this.draft[side==='allies'?'allyTeam':'enemyTeam'][index]=id;return true;}
 setOption(key,value){if(this.screen!=='lab')return false;try{createLabConfig({...this.draft,[key]:value});}catch{return false;}if(!['hpRatio','skipCountdown','allSkillsReady','controlMode','typeCase','allyTier','enemyTier','t0Baseline'].includes(key))return false;this.draft[key]=value;if(key==='typeCase'){const cases=labScenario(this.draft.scenarioId).typeCases;if(cases)this.draft.enemyTeam=[...cases[value]];}return true;}
 startBattle(){if(this.screen!=='lab')return null;this.lastConfig=createLabConfig(this.draft);this.screen='battle';this.outcome=null;this.battleStageId=this.lastConfig.stageId;return this.lastConfig;}
 finishBattle(outcome){if(this.screen!=='battle'||!['victory','defeat','draw'].includes(outcome))return false;this.screen='result';this.outcome=outcome;return true;}
 retryBattle(){if(!['battle','result'].includes(this.screen)||!this.lastConfig)return null;this.screen='battle';this.outcome=null;return this.lastConfig;}
 restartBattle(){return this.screen==='battle'?this.retryBattle():null;}
 exitBattle(){if(!['battle','result'].includes(this.screen))return false;this.screen='lab';this.outcome=null;return true;}
}
