# 整角色規格表（全未來角色共用）

流程權威：docs/decisions/2026-10-23-whole-character-batch-workflow.md。建立角色專用spec與machine-readable proposal，填完整張表後一次供審，不能只交第一招；欄位未完成不得寫READY/PLAYER APPROVED。數值寫明current／proposed／approved／implemented及版本來源。

| 區段 | 必填資料 |
|---|---|
| 身分與保留 | ID、Type/Role、定位、已核准形象/base/Idle/Move/KO、尺度地標/anchor/ground/canonical/mirror及收據來源 |
| 屬性 | HP/ATK/DEF/移速/攻速、T0–T3全表、傷害/治療等倍率與基數，避免重複成長 |
| 五招總表 | Basic/Heavy/Special/Awakening/Passive名稱、觸發、對象/排序、命中/治療、射程/範圍、四Tier實際數字、施法/命中時間、持續/CD、刷新/疊層/封頂、AI/手控與敵我共用 |
| 同時存在 | 原Tier特性/被動是否同名、加算或MAX/各自到期、取消/空放/CD起點、同刻事件排序、KO/end/Pause/Restart/destroy |
| 真機制變更 | 舊來源前檢、真正未支援能力、保留/改動契約、共用資料opt-in與必要受影響相容範圍，禁止角色ID特例 |
| 素材庫 | 每招本體F1–F4或必要分段、F3/key pose、source/path/contact/recipient效果、Tier樣式、normal/slow/effects-off/mirror/Idle return與被動展示；列數量與所有權，不建立全局固定容量門檻 |
| 玩家文案 | Collection完整正式文案與CD/Tier數值來源；只寫玩法效果與世界觀，未實作不先宣稱生效；同版本完成Runtime與文案 |
| 驗收 | 整角規格、整包F3/被動樣式、整包GIF、整包Runtime驗證、一次正常CI/Pages/public發布與整角玩家驗收；每Gate版本/hash/原文收據 |

選用方案與取捨、所有尚未核准的設計、規格/素材/工程/發布狀態必須分開。內部仍依Basic→Heavy→Special→Awakening→Passive做切片，對外不逐招重複部署。已核准角色不因新流程重製；來源未變沿用證據。後續handoff單一完整、自足、可一鍵複製code block。
