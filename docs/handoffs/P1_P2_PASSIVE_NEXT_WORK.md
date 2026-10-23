# P2 厚甲 — 新 Work 無縫接續

```text
[角色任務]
你是《山海經聯盟》的新Work。從GitHub最新權威恢復，直接接續P2猼訑獨立被動「厚甲」的第一個未完成步驟，持續推進；不要只回報恢復完成或再問能否開始。

[背景資訊]
Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927
PR：#1，保持open/unmerged。禁止merge main或另開分支。
恢復參考checkpoint：feb3c1182f0fd76c28c211aef232da21cf022511；此為核准前文件定位，不是最新HEAD，必須fetch最新remote。本次P1核准/交接文件所在commit才是更新checkpoint。
P1鹿蜀整角色COMPLETE／PLAYER VERIFIED，包含獨立被動疾行v2。玩家原文：「好我approved 紀錄github進度規則流程後。我創新的work 給我我要給新的work的prompts，讓她確認進度流程規則後 直接讓她繼續往下執行下一步 讓她無縫接軌開發，」。核准收據：docs/art/approved/lushu/passive/runtime-v2/acceptance.json。整角證據：docs/verification/P1_CHARACTER_CLOSURE.json。不得重問P1、重做美術或重驗四招。
已接受release：d1a39397562f2345bec0243ede82b6376f89684d；tree981276199ebe572d0481decfaff76349c8bb9a3d。遊戲：https://hansen0318.github.io/shanhaijing-arena/?passive=d1a3939
已完成證據：1047/1047、Build、P1真native16/built8、受影響P2native4/built2/scale10、正常Pages run39875078049成功、CI/local149檔一致，公開3個變更檔新取+146個相同檔沿用已驗證指紋，合計149項核對PASS。來源未變沿用，不因換Work重跑。
疾行v2已接受：T0/T1/T2/T3加速35/50/65/80%，持續3秒，觸發起CD6秒，2秒一般實際走位1單位觸發。戰場沒有被動文字、badge、被動HUD或連線。不要回退8%舊版或把舊PLAYER PENDING當現況。
P2既有Identity/static/Idle/Move/KO/尺度與Basic角擊、Heavy震嶺、Special守群、Awakening鎮岳皆保留已核准狀態；鎮岳runtime收據在docs/art/approved/botuo/awakening/runtime-v1/acceptance.json。P2只有獨立被動厚甲尚未完成。

[具體指令]
1. 先fetch最新remote，核對完整HEAD、tree、branch、PR、workingtree、最近commits；保留全部無關untracked，不能清理或提交它們。
2. 優先讀AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_P2_BOTUO_PASSIVE.md、docs/M5A_CHAPTER1_CONTENT_DRAFT.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、docs/verification/P2_AWAKENING_RUNTIME/REPORT.md、docs/verification/P2_CHARACTER_CLOSURE.md、docs/decisions/2026-10-22-passive-character-completion.md、docs/decisions/2026-10-23-passive-visibility-tier-revision.md、docs/decisions/2026-10-23-lushu-passive-player-acceptance.md、上述P1收據/結案，以及docs/verification/P1_PASSIVE_V2/{REPORT.md,status.json,release-evidence.json,public-fingerprints.json}。P2相容與舊結案只沿用其既有範圍，不視為厚甲已完成。
3. 立即進行P2厚甲真實機制前檢：核對src/roster/abilities.js、tierEffects.js、src/combat/passiveDefinition.js、passiveRuntime.js、statuses.js、statusSchema.js、tierEffectRuntime.js、combatResolver.js、Collection與既有守群/鎮岳契約。P2.passive目前implemented:false且effect空；HP/DEF與舊Tier效果不是獨立被動。現有獨立被動schema/runtime支援移動觸發與movement，防禦被動需按方案共用擴充，不設角色ID特例。
4. 依厚甲原定位「爭奪前線或接近隊友時獲得防禦收益」提出具體機制與T0–T3方案：觸發、受益對象、數值/持續/CD、與守群/鎮岳/MAX減傷共存、可辨識的真實傷害對照、無文字呈現、KO/end/restart/destroy清理。Tier成長與實際收益要夠明顯，不能只改文案或套P1百分比。依既有設計/審核/共用實作/必要驗證/正常發布/玩家驗收流程續行，不停在純恢復報告。任務順序與開始P2已授權；真正尚未展示的新觸發/數值方案不可冒寫PLAYER APPROVED，只在真正新設計Gate或具體阻擋停下，不重問既有核准。
5. 未改來源沿用證據；真Runtime改動才執行必要受影響測試、Build、真Browser/來源綁定guard、正常CI/Pages與公開比對，不能用舊P1收據覆蓋新來源。新素材只有必要時依既有流程審核，不能重畫已核准masters；沒有新美術需求則不硬塞四幀/GIF。
6. 每個完成切片更新WORK_PROGRESS、STATE、AGENTS、相關規格/規則/報告及handoff，同分支commit/push。純文件用[skip ci]；Runtime切片走正常發布。回報完整HEAD/tree/PR、已完成、真正剩餘Gate與下一合法步驟。

[約束條件]
- 固定順序：Basic→Heavy→Special→Awakening→Passive→整角色結案。當前P1已完成→P2厚甲→P2被動PLAYER VERIFIED後才可P3技能；本Work不得自行展開P3或TD。
- 全部後續Chat/Work/Codex交接指令必須放在單一完整、自足、可一鍵複製code block。
- 原生單人；不merge main、不新分支、不引入shanhaijing-td、不新增角色ID特例。
- 保護全部已核准P1/P2masters、收據、GIF、尺度、anchor、ground、右向canonical/左向mirror；普通Hit永久取消，不是下一待辦。
- 全部被動不在戰場顯示文字牌、被動HUD文字/數字或連線；Collection保留說明。獨立被動必須有明確且可辨識的T0–T3實際成長。
- 一般movement/outgoing增益上限15%保持；較高movement額度須顯式資料與安全驗證，已接受疾行額度95%不動。不能將移速額度套用減傷；鎮岳真傷害/真狀態、instant/tactical時序與MAX減傷契約保持。若新厚甲需要改既有契約，先明示具體變更及取捨，不偷偷改玩法。
- 全局素材無固定16MiB總量、required數量或131072-byte reserve拒絕門檻；保留逐檔安全、兩並行下載、完整required載入、所有權、回收、真實失敗及場景銷毀。
- 舊PHONE PENDING、29/28/25歷史失敗與舊容量規則不能當現況；新核准/新驗證優先。不重問、不重畫、不重跑來源未變的測試/Browser/部署/公開比對。
```
