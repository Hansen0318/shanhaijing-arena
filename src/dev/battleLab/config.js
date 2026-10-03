import {rosterCatalog} from '../../roster/catalog.js';
function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
const allyFormation=[{x:0,y:-1.1},{x:1.2,y:0},{x:0,y:1.1}],enemyFormation=[{x:10,y:-1.1},{x:8.8,y:0},{x:10,y:1.1}];
const nearAllies=[{x:3,y:-.8},{x:4,y:0},{x:3,y:.8}],nearEnemies=[{x:5.4,y:-.4},{x:5.4,y:0},{x:5.4,y:.4}];
export const LAB_SCENARIOS=freeze([
 {id:'normal',title:'NORMAL',description:'Standard formation, full HP, formal runtime defaults.',allyTeam:['P1','P2','P3'],enemyTeam:['P5','P1','P3']},
 {id:'low-hp',title:'LOW HP',description:'All allies start at 25% HP for survival and team-heal testing.',allyTeam:['P1','P2','P3'],enemyTeam:['P5','P1','P4'],allyHpRatios:[.25,.25,.25]},
 {id:'heal',title:'HEAL TEST',description:'Ally slot 1 starts at 25% HP; 赤鱬 in slot 3 can heal immediately.',allyTeam:['P1','P2','P3'],enemyTeam:['P1','P2','P5'],allyHpRatios:[.25,1,1],selectedSlot:2},
 {id:'aoe',title:'AOE TEST',description:'Clustered enemies in range of 九尾狐 slot 2. Test Special via the shared AoE resolver.',allyTeam:['P1','P4','P2'],enemyTeam:['P2','P2','P2'],allySpawnFormation:nearAllies,enemySpawnFormation:nearEnemies},
 {id:'types',title:'TYPE ADVANTAGE',description:'Matched lanes cover Power, Speed and Blast. Change Type case to compare all three relations.',allyTeam:['P2','P1','P4'],enemyTeam:['P1','P4','P2'],allySpawnFormation:[{x:3,y:-1.6},{x:3,y:0},{x:3,y:1.6}],enemySpawnFormation:[{x:5,y:-1.6},{x:5,y:0},{x:5,y:1.6}],typeCases:{advantage:['P1','P4','P2'],disadvantage:['P4','P2','P1'],same:['P2','P1','P4']}},
 {id:'mitigation',title:'MITIGATION TEST',description:'猼訑 slot 2 starts in front of nearby enemies; Special grants its formal temporary mitigation.',allyTeam:['P1','P2','P3'],enemyTeam:['P5','P1','P5'],allySpawnFormation:nearAllies,enemySpawnFormation:nearEnemies},
]);
export const labScenario=id=>LAB_SCENARIOS.find(s=>s.id===id);
export function createLabConfig(input={}){
 const scenario=labScenario(input.scenarioId??'normal');if(!scenario)throw new TypeError('Unknown Lab scenario');
 const typeCase=input.typeCase??'advantage';if(!['advantage','disadvantage','same'].includes(typeCase))throw new TypeError('Invalid Type case');
 const allyTeam=[...(input.allyTeam??scenario.allyTeam)],enemyTeam=[...(input.enemyTeam??scenario.typeCases?.[typeCase]??scenario.enemyTeam)];
 for(const team of [allyTeam,enemyTeam])if(team.length!==3||team.some(id=>!Object.hasOwn(rosterCatalog,id)))throw new TypeError('Lab requires three formal roster slots per side');
 const hpRatio=input.hpRatio??null;if(hpRatio!==null&&![1,.5,.25].includes(hpRatio))throw new RangeError('Lab HP ratio must be 100%, 50% or 25%');
 const controlMode=input.controlMode??'manual';if(!['manual','ai'].includes(controlMode))throw new TypeError('Invalid Lab control mode');
 return freeze({kind:'battle-lab',stageId:'dev-battle-lab',scenarioId:scenario.id,typeCase,battleDuration:90,
  allyTeam,enemyTeam,allyHpRatios:hpRatio===null?[...(scenario.allyHpRatios??[1,1,1])]:[hpRatio,hpRatio,hpRatio],enemyHpRatios:[1,1,1],
  allySpawnFormation:structuredClone(scenario.allySpawnFormation??allyFormation),enemySpawnFormation:structuredClone(scenario.enemySpawnFormation??enemyFormation),
  selectedAllyId:`a${(scenario.selectedSlot??1)+1}`,options:{skipCountdown:input.skipCountdown===true,allSkillsReady:input.allSkillsReady===true,controlMode},
 });
}
