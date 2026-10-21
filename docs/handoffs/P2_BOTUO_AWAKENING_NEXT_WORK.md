# P2 鎮岳 — execution contract review pending / capacity blocked

```text
【山海經聯盟 — P2 猼訑 Awakening「鎮岳」執行契約審核／容量阻擋 NEXT】
[角色任務]
從最新 GitHub 恢復，先讀具體前檢提案 docs/verification/M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md。提案尚未玩家核准，容量未過。若玩家此輪只審核，記錄原文與具體範圍後再繼續；未核准前不得整合 Runtime。若要求完善容量，先在 docs/art/verification 候選範圍找出真正足額、可逆且保留 Phaser native 採樣的舊 required 再包裝，以完整 49-key 集合驗證，另行呈交玩家；不可把估算當 PASS。

[背景資訊]
Repository Hansen0318/shanhaijing-arena；唯一分支 feat/m0-combat-core-20260927；PR #1 open/unmerged，保持不 merge。GitHub 唯一權威。前檢來源 HEAD 6983ee15fe768874924c28ccd72227e47041ada8 只供定位；必須 git fetch 最新 remote，核對完整 HEAD/branch/PR/tree/latest commits，勿依 connector 舊快照回退。修改前讀 AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、本 handoff 和上述前檢；頂部最新有效紀錄優先。
P1 COMPLETE；P2 Idle/Move/KO/尺度/Basic/Heavy 核准；Special COMPLETE/PLAYER VERIFIED。Awakening 修正版 F3、整組 F1–F4 及八 GIF/三 VFX 的玩家視覺核准已存 docs/art/approved/botuo/awakening/{f3-v2,poses-v1,visual-v1}/acceptance.json。最新玩家視覺回覆「這個我確認OK，你紀錄github流程進度規則」僅核准所展示美術包，不是執行契約、Runtime/手機/部署核准。來源、prompt、review-manifest、QA/GIF/scripts 在 docs/art/candidates/botuo/awakening/composite-review-v1/，都是美術重建，不是實機。保護全部原 master/舊 receipt，不重畫、不重問，不用錯誤 key-pose-v1/extra-hoof 草稿。
本次前檢提案基於實際 src/combat/battleSession.js、tierEffectRuntime.js、statuses.js、src/assets/actionPlayback.js、src/runtime/{assetPresenter,statusEffects,assetResidency}.js、src/assets/manifest.js 和全 roster action descriptors。T0 coefficient1.70、caster-locked radius2.2、CD14s、windup0；instant0ms 從 F3、tactical T0 900ms/T3 819ms，無統一前搖。AoE resolve 的單一 target 不等於全部受害者，需從同次真實 positive damage 逐人呈現；對空無假 contact/status。T3 boyi.team 只在傷害成立後 post_cast，真實附近存活受益者 radius2.832、13.5%、3.75s；目前此 status 缺用於泛用圖層的 presentationSource。守群獨立到期、MAX 不相加，不能變成全隊預設護盾。
現有完整 required 實測重算 45 textures /16611224 decoded，16MiB hard cap、131072 reserve 外剩34920。提案四個 source-exact「已審 display derivative」裁切矩形 621×147、482×229、239×257、202×115，共1145272 bytes；假設所有舊 key 保持，49 required /17756496 decoded，reserve 後超出1110352 bytes。沒有生成正式 packed PNG，沒有 source-master 重建、native 採樣、完整新容量 PASS。至少回收1110352額外 bytes（gutter 變大還要更多），否則停待另一個設計決策。不得偷降密度、移除 required、升 cap 或改 optional reserve。

[具體指令]
1. 如玩家確認契約，精確綁定前檢文件 SHA/其原文與審核範圍；不可把「方向核准」說成容量通過或 Runtime 授權。玩家如要求修訂，先具體修訂前檢，並待獨立核准。未獲明確核准，僅讀取/提出方案；不得 src/public/build/Browser/部署。
2. 若獲授權解容量，先驗證候選新貼圖每一原審核 display derivative 的 RGBA 與映射，四姿勢共用尺度/接地、四肢配件、雙向/Idle；原 master/raw 不直接載 Runtime。來源透明 alpha-zero RGB、1px gutter、Phaser native UV 需真正檢查。舊 45 key 逐一尋找可逆零 RGBA pack，保持所有原邏輯 frame/pixel、scale、anchor 與 UV 邊界。列出每個輸入/輸出 hash/尺寸/位址；全 49 required、decoded/cache/scene 高水位、64-entry、reserve 算術必須通過才可報 capacity PASS；若做不到請明報阻擋。
3. 獨立契約獲批且容量已具體解決後，另問/遵循下一個 Runtime Gate 才可做 TDD 整合、局部測試與真實 Browser；本交接不授權提前做。沿用未變 docs/verification/P2_AWAKENING_PREFLIGHT/{static-seed.json,mechanics.json,probe.mjs} 16 案例與 Special 歷史164/Browser/部署/145CI/39公開比對，不因換 Work 重跑。五個歷史 full-suite failures 保留，不宣稱未執行全套 PASS。
4. 完成 coherent docs/art slice 才更新 WORK_PROGRESS.md、docs/STATE.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、AGENTS.md、本 handoff／必要 QA，docs/art-only commit [skip ci] push 同一 feature branch，回報完整 HEAD、PR/tree、驗證、未完成 Gate。兩個既有無關未追蹤暫存 .F1-initiation-master.png.cC3cw2 與 .target-impact-padded-v1.png.JS8JIB 不加入、不刪改。

[約束條件]
Shared Dynamic Asset Residency、16MiB cap、131072 reserve、全部 required 不變；普通 Hit Reaction 永久取消，普通傷害不打斷技能。禁新命中/位移/震退/無敵/DoT，禁改傷害/CD/Tier/AI/Targeting/控制，禁主線 merge/替代分支/TD/P3、未授權部署。所批准視覺只屬美術重建。歷史 pending 快照不能推翻較新 receipt；每次接手指令必須完整置於單一、自足、可一鍵複製的 code block。
```
