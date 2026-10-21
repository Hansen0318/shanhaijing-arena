# P2 Special — Browser PASS / Release authorization Gate

```text
【角色任務】
接手 Hansen0318/shanhaijing-arena，從最新 GitHub 恢復 P2 猼訑 Special「守群」；只接續第一個未完成 Gate。任何後續新 Chat/Work/Codex 指令都必須單一、完整、自足、可一鍵複製。

【背景資訊】
唯一分支 feat/m0-combat-core-20260927；既有 PR#1 open/unmerged。GitHub 唯一權威。先 fetch，核對完整 remote HEAD、branch、PR、working tree、最新 commits。已測 Runtime 參考 50edd53b69010ad9b5f700c3282cb2e8acb29c6a，僅供定位，不當作永遠最新。最新 docs HEAD 可以較新。
P1 COMPLETE、P2 尺度/Basic/Heavy PLAYER VERIFIED。Special ART/GIF/EXECUTION CONTRACT APPROVED、RUNTIME INTEGRATED、LOCAL PASS、BROWSER PASS；NOT DEPLOYED、PLAYER PHONE PENDING。當前公開版仍是 Heavy acf454741757f58efa980fdcd03f028a472e87a3，不可要求玩家在它上面測 Special。

【具體指令】
1. 讀最新 AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md，最新有效頂部紀錄優先。
2. 讀 docs/verification/P2_SPECIAL_RUNTIME/{browser-gate,browser-verification,built-entry,ci-jobs,sampling-fix,sampling-review}.json 與 WORK_LOG.md、docs/plans/2026-10-21-p2-special-runtime.md；Special 核准 receipt 在 docs/art/approved/botuo/special/{composite-v1,visual-reconfirmation-v1,executable-v1}/acceptance.json。
3. 沿用 Actions#1091/run39563136667：164/164 scoped tests、build/87guard PASS，4真WebGL/126native sampling/16立即接技子案例、2實際built app、22截圖、0page errors PASS。45required/16611224decoded、16MiB cap/131072reserve/34920extra、cleanup0。9Runtime sampling包裝修正保留原像素/63logical frames；2BasicF3單色階UV差異與獨立原圖retile完全匹配。原圖/GIF/核准契約、未變來源的舊驗證與玩家接受證據不重做。
4. 第一個未完成 Gate 是「玩家明確授權 Pages 部署」。若最新 GitHub 或當前玩家指令沒有這項明確授權，到此停止並回報。不得把繼續Browser、契約/美術核准或本handoff當成部署授權。
5. 只有存在正式 scoped 部署授權，才綁定玩家原文與範圍，再檢查現有工作流程及必要 release checks，部署同一已測Runtime、保存真實CI結果與完整公開檔案fingerprint，給玩家一份精簡手機驗收清單。不得重播未變的美術/契約/Browser工程或整套遊戲。Deployment成功不等於PLAYER VERIFIED。
6. 最少更新 WORK_PROGRESS.md、docs/STATE.md、Special WORK_LOG 與必要 release evidence，commit並推到原feature branch；文件-only checkpoint用[skip ci]避免自動部署。回報完整HEAD/PR/tree、實際checks、來源/差異、證據路徑與下一Gate。

【約束條件】
本handoff未授權部署；無授權停在Release Gate。禁止main merge/替代分支/TD/P2Awakening開發/P3/新美術/GIF或已完成工程重做。普通Hit永久取消；傷害不打斷普通技能。保留即時防護與立即合法接技/Move、source/status ownership與stale-event ordering、真實受益對象/Tier/防護係數/持續時間/CD/AI/Targeting/KO/expiry/cleanup。動作與狀態生命週期分離；Utility不得產生假傷害/接觸。不得新增P2身份Runtime特例、提高容量、排除required或縮放已核准角色。五個歷史full-suite failures保留，不宣稱未執行完整suite PASS。Browser PASS不是玩家手機/FPS/GPU記憶體驗收。
```
