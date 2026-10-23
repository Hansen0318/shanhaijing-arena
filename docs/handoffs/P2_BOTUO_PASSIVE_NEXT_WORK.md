# P2 厚甲 — 目前新設計審核 Gate

```text
[角色任務]
從GitHub最新狀態接續《山海經聯盟》P2猼訑獨立被動「厚甲」。所有後續Chat/Work/Codex交接必須是一個完整、自足、可一鍵複製code block。原生單人執行。

[背景資訊]
Repo Hansen0318/shanhaijing-arena；唯一分支feat/m0-combat-core-20260927；PR#1保持open/unmerged。先fetch核對完整HEAD/tree/branch/PR/working tree與最近commits，保留全部無關untracked。前檢基線d6c18d8280adba78962eadb21e38dcb5e6e49962只是定位，含本handoff的後續commit才是更新checkpoint。GitHub唯一權威。
P1整角色COMPLETE/PLAYER VERIFIED，收據docs/art/approved/lushu/passive/runtime-v2/acceptance.json、結案docs/verification/P1_CHARACTER_CLOSURE.json。P2四招/Identity/static/Idle/Move/KO/尺度已核准保持，僅厚甲未完成。普通Hit永久取消。P3技能BLOCKED至P2被動玩家驗收。

[具體指令]
先讀AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_P2_BOTUO_PASSIVE.md、docs/verification/P2_PASSIVE_PREFLIGHT/{REPORT.md,status.json,numerical-projection.json,audit.json}。必要時依來源指紋讀原始碼；不要重跑已完成前檢或舊P1/P2驗證。
厚甲前檢已完成，共用passive目前只有ordinary-distance/movement；P2.passive仍implemented:false。新A候選：自身有存活敵人≤2.2單位，或存活隊友≤2.4單位且該隊友有存活敵人≤2.2；只保護自身，T0/T1/T2/T3減傷20/30/40/50%，持續4秒，觸發起CD8秒；不刷新/疊層，離開後保留餘時。MAX共存，T0與守群重疊只取25%，高Tier厚甲蓋過較弱自身減傷但不改隊友保護。琥珀護甲弧片1/2/3/4組、靜態且無文字/連線/被動HUD，只有厚甲是MAX有效貢獻時顯示。詳REPORT有控制/取樣/同時刻傷害/清理與驗證要求。
目前唯一Gate是新設計方向審核。先查是否已有玩家對本候選的後續回覆；沒有則呈交候選並停待該審核，不重問開始P2。收到核准則保存精確原文/範圍/文件hash，依既有正式spec→計畫→共用實作→必要驗證→正常CI/Pages/公開比對→厚甲玩家驗收流程續行；不把方向核准當成未展示文件或Runtime驗收。執行方式已定原生單人，不再詢問、不委派。每個完成切片更新進度/規則/報告/handoff，同分支commit/push；純文件[skip ci]。

[約束條件]
禁止merge main、另開分支、TD、角色ID特例。保護全部已核准masters/收據/GIF/尺度/anchor/ground/右向canonical與左向runtime mirror。厚甲無新美術需求，不強制四幀/GIF。維持守群/鎮岳數值、真傷害/真狀態、instant/tactical與MAX，若需要修改先明示新契約。
P1疾行35/50/65/80%、3秒/CD6秒、2秒一般移動1單位與95%明確額度保持；普通movement/outgoing15%不動，不能把movement額度套到減傷。被動完整四Tier表不得再乘Tier曲線。
全局素材無固定16MiB總量/required數量/131072reserve拒絕，保留逐檔安全/兩下載/完整required/所有權/回收/真失敗/destroy。舊PHONE PENDING/29/28/25歷史失敗/舊容量規則不作現況。
舊1047/1047、Build、P1native16/built8、P2相容native4/built2/scale10、Pages39875078049與149公開指紋只沿用其原來源；真Runtime修改才取得新來源綁定必要驗證、正常發布與公開比對，不用舊P1證據覆蓋厚甲。純算術投影不宣稱新Session/Browser/玩家體感PASS。
```
