# P2 Basic PLAYER VERIFIED / next unfinished gate: P2 Heavy design and art

```text
【山海經聯盟 — P2 猼訑 Basic 驗收結案】
所有後續 Chat／Work／Codex 接手指令必須放在單一完整、自足、可一鍵複製 code block。
GitHub 是唯一權威。Repository Hansen0318/shanhaijing-arena；active branch feat/m0-combat-core-20260927；PR #1 open/unmerged。先 fetch 最新 remote，確認 branch／HEAD／PR／工作目錄與近期 commits，保護既有修改，不建立取代分支、不 merge main、不引入 TD。
最新 checkpoint 是包含本檔的 feature commit，必須重新 fetch。已部署並獲驗收 runtime db451cda0e396736b170d0196d32655649303a36；https://hansen0318.github.io/shanhaijing-arena/?v=db451cd 。較新的文件 HEAD 不代表需要重部署。
先讀 AGENTS.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、WORK_PROGRESS.md 與 docs/STATE.md 頂部、docs/DEVELOPMENT_ROADMAP.md、docs/DEVELOPMENT_ACCELERATION.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_P2_BOTUO_BASIC_ACTION.md；以及 docs/art/approved/botuo/basic/runtime-v1/acceptance.json、composite-v1/acceptance.json、executable-v1/acceptance.json、docs/verification/M5C_P2_BOTUO_BASIC_PLAYER_ACCEPTANCE.md、M5C_P2_BOTUO_BASIC_RELEASE.md/.json、M5C_P2_BOTUO_BASIC_PUBLIC_FINGERPRINT.json。
玩家原話「好，我測試過了，basic approved，妳紀錄github相關流程紀錄和規則」。P2 Basic 狀態為 PLAYER ART APPROVED／PLAYER EXECUTABLE CONTRACT APPROVED／ENGINEERING PASS／DEPLOYED／PASS — PLAYER VERIFIED。這是整體範圍核准，不捏造左右、reduced-motion、Pause/Restart 的逐項回報或裝置/FPS/GPU數據。舊 pending 只是歷史；不重做美術、GIF、250ms 契約、測試、部署或手機驗收，除非具體新缺陷或實質改動。
P1 COMPLETE BY EXISTING ACCEPTANCE EVIDENCE。普通 Hit 永久取消，普通受傷不中斷攻擊/施法/移動；合法控制與 KO 保留。P2 已核准形象、靜態 Idle、Move、KO、Basic 與所有舊 receipt／原圖／GIF 保護。F2 使用 v2，低密度 PLANNING 淘汰。保真 runtime pack 與39個 required keys 保留；現有16630060/16777216 bytes，加131072 reserve，不升預算或靜默卸載。
Basic 契約保持：T0–T3固定250ms；F1/F2/F3/F4=160/90/160/160ms；真實resolve同事件 HP/傷害與Critical數字/contact；source160ms至resolve+200ms；只在實際命中時contact200ms，獨立於F3body160ms。鎖原目標，resolve重查range，落空不換目標/假命中；普通傷害不取消，合法取消不退cadence，不新增動畫操作鎖。共用資料驅動，不做角色ID特判，P1預設不變。
下一個未完成 Gate 是 P2 Heavy「震嶺」：先恢復現有技能機制、Tier與核准裝備形象，確認動作/多段與真實命中事件設計，再按 F3-first 美術審核→其餘姿勢→獨立出招/命中特效及GIF核准→明確範圍整合/部署→玩家驗收。Basic核准不代表Heavy美術核准或P2整體完成；不得跳Gate或開始P3。本次僅記錄驗收已完成；若玩家只要求進度，回報下一Gate，不擅自產圖或部署。
未來技能保留空放動作與自身出招特效；未命中不產生目標命中特效/HP/傷害數字。角色動作關閉VFX仍可辨識，獨立source/contact清楚，Basic<Heavy<Special<Awakening逐級明顯，不用放大角色或改命中幾何偷渡。
文件與驗收checkpoint使用[skip ci]，commit+push同一feature branch，non-force核對remote。保留工程/部署/玩家驗收證據區別；不因文件更新重跑已完成檢查或部署。
```
