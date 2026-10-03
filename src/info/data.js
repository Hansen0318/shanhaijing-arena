// Read-only documentation of the current game. No progression or battle dependencies.
export const INFO_PAGES=Object.freeze([
 Object.freeze({id:'guide',title:'GAME GUIDE',media:'Controls illustration',sections:Object.freeze([
  Object.freeze({heading:'THE ARENA',text:'Fight in 3v3 real-time battles. AI controls characters automatically. Select an ally to take manual control; the joystick moves the selected character.'}),
  Object.freeze({heading:'CONTROLS',text:'Basic is automatic. Use the Heavy, Special and Awakening buttons for skills. Release manual control and AI resumes immediately.'}),
  Object.freeze({heading:'VICTORY',text:'Win by KO of all enemies. At the 90-second timeout, remaining team HP% determines the result; equal HP% is a draw.'}),
  Object.freeze({heading:'YOUR COLLECTION',text:'Win stages to collect character shards. Collect 5 shards to recruit a new character automatically at T0. Available shards can upgrade owned characters: T0 → T1 → T2 → T3, costing 5 / 10 / 15 shards respectively. T3 is the current maximum.'}),
 ])}),
 Object.freeze({id:'world',title:'WORLD',media:'World illustration',sections:Object.freeze([
  Object.freeze({heading:'CLASSIC OF MOUNTAINS AND SEAS',text:'Creatures from the Classic of Mountains and Seas / 山海經 gather in the Arena. They come from different mountains, waters and mythic regions.'}),
  Object.freeze({heading:'YOUR JOURNEY',text:'Form a team of three creatures, explore different regions and battle rival creatures. Collect shards and recruit new creatures to broaden your team.'}),
 ])}),
 Object.freeze({id:'types',title:'TYPE MATCHUP',media:'Type illustration',relations:Object.freeze(['Power beats Speed','Speed beats Blast','Blast beats Power']),multipliers:Object.freeze(['Advantage ×1.15','Disadvantage ×0.85','Same Type ×1.00']),note:'Type advantage helps, but character role, skills, positioning and team composition still matter.'}),
]);
export const infoPage=id=>INFO_PAGES.find(page=>page.id===id);
