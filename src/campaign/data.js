// M1 placeholders only. UI and unlock order consume this model, never chapter numbers.
const formation = side => [-1, 0, 1].map((y,i) => ({x: side === 'ally' ? (i === 1 ? 1.2 : 0) : (i === 1 ? 8.8 : 10), y}));
export const campaign = Array.from({length:6}, (_, index) => {
  const n = index + 1, chapterId = `chapter-${n}`;
  return {
    chapterId, chapterNumber:n, title:`Chapter ${n}`, displayOrder:n,
    thumbnail:`campaign/chapter-${n}.svg`,
    unlockRequirement:n === 1 ? null : { clearedChapterId:`chapter-${n-1}` },
    stages:Array.from({length:5}, (_, s) => {
      const stageNumber = s + 1, stageId = `${n}-${stageNumber}`;
      return {
        stageId, chapterId, stageNumber, title:`Encounter ${stageId}`, displayOrder:stageNumber,
        previewImage:`campaign/stage-${stageId}.svg`, battlefieldId:'graybox-sand',
        allyConfig:{teamReference:'graybox-allies', lineup:['ally','ally','ally']},
        enemyLineup:['enemy','enemy','enemy'],
        allySpawnFormation:formation('ally'), enemySpawnFormation:formation('enemy'),
        battleDuration:90, stageType:'prototype',
        allowedRoster:null,forcedCharacters:[],bannedCharacters:[],
        finale:{isFinal:stageNumber === 5, bossId:null}, reward:{items:[]},
        unlockRequirement:stageNumber === 1 ? {chapterId} : {clearedStageId:`${n}-${stageNumber-1}`},
      };
    }),
  };
});
export const orderedChapters = (chapters = campaign) => [...chapters].sort((a,b) => a.displayOrder-b.displayOrder);
export function chapterRows(chapters = campaign) {
  const ordered = orderedChapters(chapters), rows = [];
  for (let i=0;i<ordered.length;i+=5) rows.push(ordered.slice(i,i+5));
  return rows;
}
export const findChapter = id => campaign.find(c => c.chapterId === id) ?? null;
export const orderedStages = chapter => [...chapter.stages].sort((a,b) => a.displayOrder-b.displayOrder);
export const allStages = () => orderedChapters().flatMap(orderedStages);
export const findStage = id => allStages().find(s => s.stageId === id) ?? null;
export function nextStage(id) {
  const stages = allStages(), index = stages.findIndex(s => s.stageId === id);
  return index < 0 ? null : stages[index+1] ?? null;
}
