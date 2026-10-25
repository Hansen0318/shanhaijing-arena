# 正式預警替換執行紀錄 — 2026-10-25

## 恢復與根因
- 最新 remote/本機起點 0f24cae19866eb51176c0d5f5a29c40d40c3e0bd；PR1 API open/unmerged；fresh clone、沒有未push舊工作。
- 已讀 AGENTS、WORK_PROGRESS、STATE、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、逐招 decision、當前handoff與來源盤點。最新紀錄優先於歷史段落。
- TelegraphPresenter 沒有 warning descriptor 路徑，12招正式動作成功仍無法退掉藍橘線框。前20招run40149990210已SUCCESS，但只證明cast/contact，不包含本新增warning修正。

## 直接授權範圍與實作選擇
玩家本次「確認進度流程規則，繼續修正，應該是vfx問題」延續已核准的正式VFX退示意至部署。原生單人、原分支，不委派/新branch/worktree/TD/main merge/存檔。
採獨立、明確註冊的程式向量預警來源 ground-sigil-v1：鹿蜀風紋／猼訑岩紋／赤鱬水紋。這是本次實作選擇，尚無玩家視覺/遊戲核准，絕不偽造美術收據。不是拿blade/contact存在當warning可用，也沒有改寫已核准PNG。P4/P5沒有warning來源，保留fallback；持續場域獨立保留原呈現。

## 契約
- src/assets/warningDescriptors.js 定義可解析的renderer/motif/雙陣營色/支援shape/mark數。
- src/runtime/formalWarnings.js 在arena座標取樣真circle/capsule含兩端，再投影；低底色完整承接危險區，分段亮邊與風/岩/水符紋取代矩形、端點圓框、中心線。
- TelegraphPresenter 僅對有效warning來源畫一份正式預警；缺失/未知/shape不支援/解析例外保持一份舊fallback。每幀clear，全局共用戰鬥clock；reduced只變透明/亮度、不縮動；destroy冪等。
- ArenaScene按sourceId→真definition→category取來源，不判P1/P2/P3 ID；角色資料只負責註冊。
- 不改戰鬥數值、命中範圍、延遲、治療、被動、盾/水膜、場地、角色尺度或approved bytes。

## 驗證與狀態
- 新測試先RED（red.tap）再GREEN；原9項測試PASS，另補來源例外/持續區域回歸。
- 首輪完整1229項：1227 PASS、2個歷史hash fixture失敗；first-suite-failures.tap.gz保留。previous-test-sources.json保留修改前原bytes，修歷史測試重建用快照，原收據/原hash/負向斷言保持；兩項修後PASS。
- 第二輪完整1229/1229 PASS；Build110素材PASS。最後新增例外/持續場域案後，第三輪完整1230/1230、Build PASS。
- 本機Chromium下載得到壞ZIP，無本機真Browser PASS；失敗log保留，沿正常CI真native/built。
- Browser driver新增96案：12明確來源×circle/lane×敵我×normal/reduced；實際WebGL讀pixel前後差異、clock變化、清理、缺來源fallback及六區同屏圖。與原20招真施放矩陣/游息32+4及四主動/P1/P2一起走正常CI。未實跑前不宣稱PASS。
- 第一未完Gate：推送coherent checkpoint→新來源正常CI及任何真失敗修復→Pages→CI/local/public精確指紋→呈交玩家。未有玩家新Runtime核准、P3未COMPLETE。
