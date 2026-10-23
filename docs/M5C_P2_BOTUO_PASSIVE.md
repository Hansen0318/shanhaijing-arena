# P2 猼訑獨立被動「厚甲」— 接續入口

## 2026-10-23 — 厚甲方向確認／共用防禦被動已實作，真Browser與發布NEXT

玩家「確認其他未來整體角色開發真的會有效果，就繼續實作」確認厚甲方向並直接授權實作，精確原文/範圍見docs/decisions/2026-10-23-botuo-passive-execution.md、P2_PASSIVE_RUNTIME/authorization.json；不重問開始/執行方式或額外流程核准，不冒稱未展示文件逐項獲准。正式spec/原生單人plan已補齊。

共用spatial-pressure→mitigation、匿名角色/雙陣營/多instance/Tier表、P2厚甲20/30/40/50%、4秒/CD8秒、MAX/各自到期與無文字琥珀護甲弧片已實作；來源kind/data驅動、沒有角色ID特例。未來每角必須真效果、獨立Tier、狀態/清理、來源驗證、發布與玩家驗收才算完成；未支援的新類型必須擴充共用系統，不承諾未來角色已生效。P1/P2核准四招/美術/比例/時序/素材政策、普通Hit取消、原分支PR#1open/unmerged、P3技能BLOCKED保持。

Task1 RED→GREEN22/22；Task2真Session/P1距離22/22，原fixture遷移後受影響68/68；Task3無文字Graphics/cleanup15/15。完整first1060/1053/7fail原始保留，已按來源定位metadata/舊fixture/浮點斷言遷移，未刪除原遊戲斷言。最新完整測試與下一步以docs/verification/P2_PASSIVE_RUNTIME/WORK_LOG.md為準。尚未Browser/Build/新來源guard/Pages/公開比對/玩家驗收PASS；checkpoint不是發布。下一步完成Task4必要真驗證與正常發布，不重做前檢或重審四招/美術。


2026-10-23：MECHANISM PREFLIGHT COMPLETE / NEW DESIGN REVIEW PENDING / NOT IMPLEMENTED。

P1疾行v2已PLAYER VERIFIED，見 `docs/art/approved/lushu/passive/runtime-v2/acceptance.json`。玩家要求新Work確認最新GitHub後直接續行P2厚甲，不重問既有授權、不停在純恢復報告。

## 最新已完成切片：厚甲A候選待審

真實來源核對與具體候選：`verification/P2_PASSIVE_PREFLIGHT/REPORT.md`；來源指紋 `status.json`、既有resolver純數值投影 `numerical-projection.json`。A建議：敵人≤2.2單位，或隊友≤2.4且該隊友有敵人≤2.2時，自身獲得T0/T1/T2/T3減傷20/30/40/50%，4秒、觸發起CD8秒。保留MAX與各自到期，無隊友被動減傷。無文字琥珀護甲短弧片，1/2/3/4組、不放大角色。尚未核准/實作/Browser/發布，不冒寫PLAYER APPROVED。

**目前唯一Gate是上述新設計審核，機制前檢已完成，不重做。** 通過後依既有正式規格/計畫/原生單人共用實作流程續行。下方原入口任務保留為恢復歷史，不能把「前檢NEXT」當現況。

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
