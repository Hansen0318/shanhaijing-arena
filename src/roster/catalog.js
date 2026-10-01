import { createCharacterDefinition } from '../combat/character.js';

// Identity and immutable combat data are independent of player ownership and battle slots.
const prototypes = [
 ['P1','power','tank',280,'#477b9e'],
 ['P2','speed','attacker',260,'#9c5c42'],
 ['P3','blast','support',240,'#7753a0'],
 ['P4','power','attacker',260,'#387665'],
 ['P5','speed','support',250,'#916d32'],
];
export const rosterCatalog = Object.freeze(Object.fromEntries(prototypes.map(([id,type,role,maxHp,color])=>[
 id,Object.freeze({
  ...createCharacterDefinition({id,name:id,type,role,
   stats:{maxHp,atk:16,def:6,moveSpeed:1.8,attackSpeed:1},
   abilities:{basic:'basic',heavy:'heavy',special:'special',awakening:'awakening',passives:[]},
  }),
  portrait:Object.freeze({label:id,color}),
  passiveMetadata:Object.freeze({label:'Passive placeholder',implemented:false}),
 }),
])));
export const prototypeOwnership = () => ({characterIds:Object.keys(rosterCatalog)});
