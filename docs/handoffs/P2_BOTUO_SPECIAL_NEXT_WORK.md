# P2 Special — DEPLOYED / PUBLIC VERIFIED / Player phone Gate

```text
【角色任務】
接手 Hansen0318/shanhaijing-arena，從最新 GitHub 恢復 P2 猼訑 Special「守群」；只接續第一個未完成 Gate。任何後續新 Chat/Work/Codex 指令都必須單一、完整、自足、可一鍵複製。

【背景資訊】
唯一分支 feat/m0-combat-core-20260927；既有 PR#1 open/unmerged。GitHub 唯一權威。先 fetch，核對完整 remote HEAD、branch、PR、working tree、最新 commits。已發布 Runtime 536685401cfa0805b5836b057a27dd0692c46879，Browser 參考50edd53b69010ad9b5f700c3282cb2e8acb29c6a，均僅供定位，不當作永遠最新。最新 docs HEAD 可以較新。
P1 COMPLETE、P2 尺度/Basic/Heavy PLAYER VERIFIED。Special ART/GIF/EXECUTION CONTRACT APPROVED、RUNTIME INTEGRATED、LOCAL PASS、BROWSER PASS、DEPLOYED、PUBLIC VERIFIED；PLAYER PHONE PENDING。玩家已明確「授權部署」，不能再把舊NoDeploy或授權pending當成當前狀態。測試連結：https://hansen0318.github.io/shanhaijing-arena/?v=536685401cfa0805b5836b057a27dd0692c46879

【具體指令】
1. 讀最新 AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md，最新有效頂部紀錄優先。
2. 讀 docs/verification/P2_SPECIAL_RUNTIME/{release,release-authorization,public-fingerprint,ci-build-inventory,release-ci-jobs,browser-gate}.json 與 WORK_LOG.md、RELEASE.md；Special 核准 receipt 在 docs/art/approved/botuo/special/{composite-v1,visual-reconfirmation-v1,executable-v1}/acceptance.json。原始Browser/authorization檔案是當時狀態的快照，以最新release/STATE頂部為準。
3. 沿用 Actions#1091/run39563136667：164/164 scoped tests、build/87guard PASS，4真WebGL/126native sampling/16立即接技子案例、2實際built app、22截圖、0page errors PASS。45required/16611224decoded、16MiB cap/131072reserve/34920extra、cleanup0。9Runtime sampling包裝修正保留原像素/63logical frames；2BasicF3單色階UV差異與獨立原圖retile完全匹配。原圖/GIF/核准契約、未變來源的舊驗證與玩家接受證據不重做。
4. 沿用Actions1092/run39593187720 build119198973026/deploy119199183277SUCCESS；164release checks/Build/87guardPASS，exact Browser source/hash proofPASS。實際Pages artifact12342149128與proof12342448845，145local/CI檔案全相同，39complete公開檔案SHA256吻合。不得為換Work重部署或重做已有效的驗證。
5. 第一個未完成 Gate 是玩家手機驗收。給上述實際Special連結與三項清單：守群後立即接readyHeavy/Move仍保有光環；到期/KO/Pause/Restart正確；IdleMoveAttack大小與雙向效果正常。沒有玩家明確回覆，不得宣稱PLAYER VERIFIED；有真實缺陷才依玩家範圍最小診斷/修正。確認驗收後，才按最新指令保存精確玩家原文/發布SHA並推進；本handoff不自行授權Awakening。
6. 最少更新 WORK_PROGRESS.md、docs/STATE.md、Special WORK_LOG 與必要 release evidence，commit並推到原feature branch；文件-only checkpoint用[skip ci]避免自動部署。回報完整HEAD/PR/tree、實際checks、來源/差異、證據路徑與下一Gate。

【約束條件】
部署與公開驗證已完成，停在玩家手機Gate；本handoff不授權重部署。禁止main merge/替代分支/TD/P2Awakening開發/P3/新美術/GIF或已完成工程重做。普通Hit永久取消；傷害不打斷普通技能。保留即時防護與立即合法接技/Move、source/status ownership與stale-event ordering、真實受益對象/Tier/防護係數/持續時間/CD/AI/Targeting/KO/expiry/cleanup。動作與狀態生命週期分離；Utility不得產生假傷害/接觸。不得新增P2身份Runtime特例、提高容量、排除required或縮放已核准角色。五個歷史full-suite failures保留，不宣稱未執行完整suite PASS。Browser與Deployment成功不是玩家手機/FPS/GPU記憶體驗收。
```
