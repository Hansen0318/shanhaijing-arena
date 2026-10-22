# P2 鎮岳 — 新 Work 交接／全局素材實作計畫待審

```text
【山海經聯盟 — 新 Work：P2 猼訑「鎮岳」全局動態素材→整合→部署接手】
[角色任務]
從最新 GitHub 無縫恢復。第一個未完成 Gate 是向玩家呈交「全遊戲無固定總 decoded-byte 上限」的實作計畫，取得獨立核准；其後依計畫TDD共用素材管理，審定鎮岳觀測契約、保真整合與必要驗證，通過後部署 Pages，給玩家在真遊戲中審招。不要將書面規格核准推成計畫／程式／部署核准。

[背景資訊]
Repo Hansen0318/shanhaijing-arena；唯一branch feat/m0-combat-core-20260927；PR#1 open/unmerged，禁止合併main／另開替代分支。GitHub唯一權威。恢復來源remote bd9caac3509f1219dd5e23a517cc01eb0ba1b2e9；最新docs checkpoint為含本交接的commit，必須fetch，不把該來源SHA當最新；原接手參考remote f2b79112b5c79cc841e80daa9dff12380aff8623；這不是最新保證。修改前 git fetch、核對完整remote HEAD、branch、PR、tree、working tree、最近commits，頂部最新有效紀錄優先。
讀 AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、docs/superpowers/specs/2026-10-22-global-dynamic-asset-residency-design.md、docs/superpowers/plans/2026-10-22-global-dynamic-asset-residency.md、docs/verification/P2_AWAKENING_PREFLIGHT/global-residency-spec-acceptance.json、docs/verification/M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md、本交接。
玩家原文「應該要整體不限定容量，不是針對單一角色，妳繼續做到部署，我才能確認遊戲裡的招式是否ok」確立全局方向及驗證後部署意圖；玩家在正式書面規格連結後「我核准，確認紀錄github流程規則進度，在給我新的work要跟他說的，我要新的work無縫接軌接手後續」核准全局書面規格 SHA256 c47019288e6b6ceaf15b8c87872c5eb156518847fec3922eadab72df69e2141b。核准收據如上。剛寫的實作計畫尚未獨立給玩家審閱，下一Gate先呈交並取得核准。使用單人原生執行方式；不自行啟用子代理。
目前 src/assets/schema.js、src/runtime/assetCache.js、src/runtime/assetResidency.js 仍有16MiB固定hard cap／64entry及131072 optional reserve。新政策未實作；不得宣稱已取消。赤鱬KO十一片規格是被新方向取代的歷史方案，不要安裝、不要改核准KO。既有45required16611224與預估49required17756496屬舊上限算術，不是設備RAM量測。
P1 COMPLETE；P2 Idle/Move/KO/Basic/Heavy核准，Special COMPLETE/PLAYER VERIFIED。鎮岳 F3、F1–F4、三VFX／八GIF 已玩家核准，收據 docs/art/approved/botuo/awakening/{f3-v2,poses-v1,visual-v1}/acceptance.json。素材、完整prompt/hash/QA/scripts在 docs/art/candidates/botuo/awakening/composite-review-v1/。不要重畫/重問，不用錯誤v1或extra-hoof草稿。機制證據 docs/verification/P2_AWAKENING_PREFLIGHT/{static-seed.json,mechanics.json,probe.mjs} 的16案例沿用未變來源；Special歷史164/Browser/部署/145CI/39public不因換Work重跑。

[具體指令]
0. 已完成本次GitHub恢復與未改程式基線診斷：兩次full suite（平行／順序）均986/957pass/29fail，共用局部23/23PASS。讀docs/verification/P2_AWAKENING_PREFLIGHT/recovery-2026-10-22/REPORT.md與baseline.json，沿用來源未變證據，不因換Work重跑。實作計畫hash16d36b5a209dc6c83fb240dad51f1fab17d0646f60a31cea7de4786e3d1ed067仍待獨立玩家審核。SIGKILL原因尚未確認，不聲稱OOM或未執行斷言通過。
1. 首先呈交已保存的全局計畫，說清楚共用cache/scene residency/required整合、真載入失敗與測試範圍；等待玩家獨立審核。若修訂，先更新計畫再確認。不要在計畫核准前更動產品程式。
2. 核准計畫後按單人TDD順序執行：失敗測試→看見預期RED→最小實作→GREEN。移除全遊戲固定總decoded-byte及required count硬門檻，保留每檔4MiB encoded/2048 dimension/4194304 pixels、兩同時下載、完整required pin/readiness、Inactive LRU、場景解構/重啟、cache與scene估算診斷。真實network/decode/Phaser allocation失敗不能當ready。不能換成32MiB或單一角色特例，不丟原required。
3. 全局策略有證據後獨立審定 docs/verification/M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md 的共享 cast/action/true-victim/T3 status觀測契約，安裝鎮岳來源精確的姿勢及三獨立VFX衍生貼圖，驗證RGBA/座標/共同接地/Idle多標記尺度/雙向鏡射/Phaser native。T0 coefficient1.70、caster-radius2.2、CD14、windup0；instant0從F3，tactical T0 900ms/T3 819ms，不增加統一前搖。逐個真實正傷害victim才命中爆破；對空無假命中/假保護。T3 boyi.team只在實際傷害後依附近存活真受益者radius2.832、13.5%/3.75s；與守群狀態獨立到期、MAX不相加。普通Hit永久取消，不改傷害/CD/Tier/AI/targeting/位移/控制。
4. 按受影響測試、全suite逐項報告目前29項基線失敗（完整名單／原因見recovery-2026-10-22/baseline.json）、Build與真built-app Chromium/native/移動viewport驗證，不把動畫GIF當遊戲錄影或手機證據。若明確阻擋，保護scope，紀錄原因並停在相應Gate；不得強行部署。若驗證足夠，玩家已明示驗證後部署意圖：在同feature branch按Pages workflow發布，確認Actions及公開檔案指紋與測試版一致，提供URL待玩家真機視覺審核。未經玩家回覆不可記PLAYER VERIFIED。
5. 各coherent slice更新 WORK_PROGRESS.md、docs/STATE.md、AGENTS.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、handoff及驗證報告，commit/push同一feature分支；docs/art-only [skip ci]，Runtime提交遵照CI。回報完整HEAD、PR/tree、實際測試與未完成Gate。

[約束條件]
保護P1及所有已核准P2 masters/receipts/GIF/尺度/anchor/ground/mirror；不重跑無關Special證據，不聲稱未跑全suite PASS。目前基線986/957pass/29fail；逐項原因及兩次原始TAP已保存在docs/verification/P2_AWAKENING_PREFLIGHT/recovery-2026-10-22/，舊五項是歷史，不可當目前基線。禁止main merge、替代branch、TD、P3。兩個現有未追蹤暫存 docs/art/candidates/botuo/special/poses-v1/.F1-initiation-master.png.cC3cw2 及 docs/art/candidates/lushu/special/vfx-review-v1/.target-impact-padded-v1.png.JS8JIB 不加不刪。所有下一份 Chat／Work／Codex 接手指令，完整放在單一、自足、可一鍵複製的 code block。
```
