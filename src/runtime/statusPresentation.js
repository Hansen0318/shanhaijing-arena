const marks=Object.freeze({movement:'MOB',avoidance:'EVA',control:'STG',steadfast:'RES'});
export function statusMarks(statuses){const types=new Set(statuses.map(s=>s.type));return Object.entries(marks).filter(([type])=>types.has(type)).map(([,mark])=>mark).join(' · ');}
