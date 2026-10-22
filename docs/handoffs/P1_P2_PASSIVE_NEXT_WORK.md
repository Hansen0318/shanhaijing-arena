# P1／P2 被動補完 — 當前接續指令

```text
【山海經聯盟 — P1疾行→P2厚甲補完】
[角色任務]
從最新GitHub接續P1被動疾行第一個未完成Gate；P1被動驗收後才能做P2厚甲，兩者完成後才可開P3角色技能。所有Chat/Work/Codex交接必須單一完整自足可一鍵複製code block。
[背景資訊]
Repository Hansen0318/shanhaijing-arena；唯一branch feat/m0-combat-core-20260927；PR#1保持open/unmerged，GitHub唯一權威。先fetch核對完整remote HEAD/tree/branch/PR/working tree；dd9f2d68115d9f29c25d202e4557a4484f73a520是補完決定前checkpoint，不能當最新。
先讀AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/CHARACTER_SYSTEM.md、docs/decisions/2026-10-22-passive-character-completion.md、docs/verification/P1_P2_PASSIVE_RECOVERY.json、docs/M5C_P1_LUSHU_PASSIVE.md。
最新玩家已授權補完順序及更新規則：Basic→Heavy→Special→Awakening→Passive→整角色結案。P1/P2四招/base核准全部保留，但FULL CHARACTER INCOMPLETE；五個獨立被動目前implemented:false/effect空。既有Tier機制不能冒充獨立被動完成，普通Hit永久取消。
[具體指令]
1. 當前唯一未完成Gate：P1疾行具體方案A的對話設計審核，見P1文件。提案為一般真走位2秒滾動窗累積1單位→移速+8%持續2秒，觸發起CD4秒且CD不累積；技能位移不算，T0–T3固定參數，現有移速增益最高+15%。所有數字為新提案、未核准。不得把本任務授權或順序核准當方案/書面規格/計畫核准。
2. 若最新GitHub已有新收據，從第一個真未完成Gate續行，不重問已核准事項；否則只呈交既有具體方案，不重做前檢。對話設計通過後依既有架構設計流程寫正式規格、審核、實作計畫；未達前置Gate不寫產品程式。
3. 必須共用資料驅動被動定義/條件/runtime/status，禁止P1/P2角色ID特例；manual/AI/兩隊同模擬時鐘，所有權與Pause/KO/Restart/結束/destroy保持。Collection狀態/描述須對應真實機能，不只把implemented改true。
4. 真Runtime變更才執行必要測試/正常CI/Build/Browser/Pages/公開核對與玩家被動驗收；不能用舊1014/149證據冒充新被動PASS，也不重做無影響的舊美術QA或四招核准。完成P1前不開始P2具體設計/實作，P3技能BLOCKED。
5. 更新WORK_PROGRESS/STATE/AGENTS/spec/report/handoff並同分支commit/push；純文件[skip ci]。回報完整HEAD/tree/PR與真剩餘Gate。Native single-agent，不自行委派子代理。
[約束條件]
禁止main merge、替代分支、TD、未到順序的P2/P3工程；保護全部已核准master/receipt/GIF/尺度/anchor/ground/mirror及無關untracked檔。全局無固定16MiB/required數量/131072reserve拒絕；保持逐檔安全、兩並行下載、完整required/所有權/回收/真失敗/destroy。鎮岳instant/tactical/真傷害真狀態/MAX/獨立到期與四招既有合約保持，僅在新被動明確核准範圍內增加效果。
```
