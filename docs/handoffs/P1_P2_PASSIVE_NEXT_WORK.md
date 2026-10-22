# P1／P2 被動補完 — 當前接續指令

```text
【山海經聯盟 — P1疾行→P2厚甲補完】
[角色任務]
從最新GitHub接續P1被動疾行第一個未完成Gate；P1被動驗收後才能做P2厚甲，兩者完成後才可開P3角色技能。所有Chat/Work/Codex交接必須單一完整自足可一鍵複製code block。
[背景資訊]
Repository Hansen0318/shanhaijing-arena；唯一branch feat/m0-combat-core-20260927；PR#1保持open/unmerged，GitHub唯一權威。先fetch核對完整remote HEAD/tree/branch/PR/working tree；dd9f2d68115d9f29c25d202e4557a4484f73a520是補完決定前checkpoint，不能當最新。
先讀AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/CHARACTER_SYSTEM.md、docs/decisions/2026-10-22-passive-character-completion.md、docs/verification/P1_P2_PASSIVE_RECOVERY.json、docs/M5C_P1_LUSHU_PASSIVE.md、docs/superpowers/specs/2026-10-22-lushu-passive-design.md及docs/verification/P1_PASSIVE_DESIGN/{direction-confirmation,numerical-projection}.json。
最新玩家已授權補完順序及更新規則：Basic→Heavy→Special→Awakening→Passive→整角色結案。P1/P2四招/base核准全部保留，但FULL CHARACTER INCOMPLETE；五個獨立被動目前implemented:false/effect空。既有Tier機制不能冒充獨立被動完成，普通Hit永久取消。
[具體指令]
1. 當前唯一未完成Gate：P1疾行正式書面規格審閱，docs/superpowers/specs/2026-10-22-lushu-passive-design.md。玩家已回覆「確認視覺和數值有明顯可看得出來，若確認沒錯，就記錄繼續」，精確條件收據docs/verification/P1_PASSIVE_DESIGN/direction-confirmation.json；不重問原方案A或順序，但不能冒充新寫規格/計畫已核准。規格保留2秒窗/1單位/+8%/2秒/CD4秒/不算技能位移，新增正式角色可見的獨立badge/時間條與HUD實際移速/進度/CD待審；觸及15%上限需誠實標示。數值純投影T0 2.05→2.214、2秒多0.328，不是Runtime/視覺PASS。原MOB在正式角色隱藏，不能靠它聲稱已可見。
2. 若最新GitHub已有書面規格新收據，從第一個真未完成Gate續行；否則只呈交已完成的書面規格，不重做前檢/投影。書面規格核准後建立並審閱實作計畫，原生單人執行；未達前置Gate不寫產品程式。部署後才取得真Renderer/built-app對照、實際增益/到期與玩家可辨識驗收；不把本次條件確認寫成無條件視覺PASS。
3. 必須共用資料驅動被動定義/條件/runtime/status，禁止P1/P2角色ID特例；manual/AI/兩隊同模擬時鐘，所有權與Pause/KO/Restart/結束/destroy保持。Collection狀態/描述須對應真實機能，不只把implemented改true。
4. 真Runtime變更才執行必要測試/正常CI/Build/Browser/Pages/公開核對與玩家被動驗收；不能用舊1014/149證據冒充新被動PASS，也不重做無影響的舊美術QA或四招核准。完成P1前不開始P2具體設計/實作，P3技能BLOCKED。
5. 更新WORK_PROGRESS/STATE/AGENTS/spec/report/handoff並同分支commit/push；純文件[skip ci]。回報完整HEAD/tree/PR與真剩餘Gate。Native single-agent，不自行委派子代理。
[約束條件]
禁止main merge、替代分支、TD、未到順序的P2/P3工程；保護全部已核准master/receipt/GIF/尺度/anchor/ground/mirror及無關untracked檔。全局無固定16MiB/required數量/131072reserve拒絕；保持逐檔安全、兩並行下載、完整required/所有權/回收/真失敗/destroy。鎮岳instant/tactical/真傷害真狀態/MAX/獨立到期與四招既有合約保持，僅在新被動明確核准範圍內增加效果。
```
