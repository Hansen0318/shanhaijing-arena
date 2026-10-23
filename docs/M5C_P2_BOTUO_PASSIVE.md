# P2 猼訑獨立被動「厚甲」— 接續入口

2026-10-23：ACTIVE / MECHANISM PREFLIGHT NEXT / NUMERICAL DESIGN NOT YET APPROVED。

P1疾行v2已PLAYER VERIFIED，見 `docs/art/approved/lushu/passive/runtime-v2/acceptance.json`。玩家要求新Work確認最新GitHub後直接續行P2厚甲，不重問既有授權、不停在純恢復報告。

## 已核對事實與下一個具體產出

- `src/roster/abilities.js`：P2.passive厚甲仍implemented:false、effect為空。基礎HP/DEF不是厚甲已實裝。
- `docs/M5A_CHAPTER1_CONTENT_DRAFT.md`：厚甲原定位是爭奪前線或接近隊友時的防禦收益，沒有已核准觸發/減傷/持續時間/CD數值。
- `src/roster/tierEffects.js`：P2現有Tier護群/震退/鎮守是既有四招進階效果，不能改名充當厚甲。
- `src/combat/passiveDefinition.js`／`passiveRuntime.js`：現有獨立被動只支援ordinary-distance→movement狀態及四Tier倍率表。P2防禦被動需要按實際規格擴充共用條件/效果，不可套角色ID特例或修改P1已核准行為。
- `src/combat/statuses.js`：已有mitigation/incoming狀態、MAX減傷、到期/KO/clear。守群與鎮岳已有核准收據及真狀態契約，厚甲必須明確說明共存、優先與上限，避免有名無實或重複疊加破壞平衡。

新Work立即完成：讀規則與原始碼→必要真機制前檢→具體厚甲方案（觸發、受益對象、T0–T3成長、強度/持續時間/CD、MAX共存、真實減傷對照、無文字呈現、生命週期）→依既有設計與實作流程續行。只在真正尚未審核的新設計Gate或具體外部阻擋停下，不重開已核准技能/美術/比例、不重問可否開始P2。

## 保護與驗證範圍

P1 COMPLETE／PLAYER VERIFIED；P2 Basic/Heavy/Special/Awakening、Identity/static/Idle/Move/KO/尺度核准保持。普通Hit永久取消。P2被動驗收後才可P3技能；不自行展開P3或TD。所有被動不得在戰場顯示文字牌/被動HUD/連線，Collection說明保留；Tier成長要有實際可辨識變化，數值依角色設計，不照抄疾行。

現有1047/1047、Build、P1native16/built8、P2相容native4/built2/scale10、Pages與公開149項核對只沿用原來源；P2真正改Runtime後才做必要受影響驗證與正常發布。保留masters/收據/GIF/尺度/anchor/ground/mirror、單分支PR#1open-unmerged、無角色ID特例、全局無固定總量容量及逐檔安全/兩下載/完整required/所有權/回收/真失敗/destroy。
