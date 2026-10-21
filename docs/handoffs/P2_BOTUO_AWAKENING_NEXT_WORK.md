# P2 鎮岳 — capacity direction approved / written design review pending

```text
【山海經聯盟 — P2 猼訑 Awakening「鎮岳」容量書面規格待審 NEXT】
[角色任務]
從最新 GitHub 恢復，先讀 docs/verification/P2_AWAKENING_PREFLIGHT/capacity-direction-decision.json、docs/superpowers/specs/2026-10-22-p2-awakening-capacity-design.md、docs/verification/M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md。玩家核准赤鱬 KO 無損分塊「方向」，剛寫出的完整書面設計尚待獨立審核。此 Gate 僅呈交設計、按玩家回覆修正並紀錄；不得把方向核准推成實作、容量 PASS、Runtime 或部署授權。

[背景資訊]
Repository Hansen0318/shanhaijing-arena；唯一分支 feat/m0-combat-core-20260927；PR #1 open/unmerged，保持不 merge。GitHub 唯一權威。設計前 HEAD bfb19e8d669c3f6ee52c08d8a726ca48248b25ea 只供定位；必須 git fetch 最新 remote，核對完整 HEAD/branch/PR/tree/latest commits，勿依 connector 舊快照回退。修改前讀 AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、本 handoff 和上述決定／設計／前檢；頂部最新有效紀錄優先。
P1 COMPLETE；P2 Idle/Move/KO/尺度/Basic/Heavy 核准；Special COMPLETE/PLAYER VERIFIED。Awakening 修正版 F3、整組 F1–F4 及八 GIF/三 VFX 的玩家視覺核准已存 docs/art/approved/botuo/awakening/{f3-v2,poses-v1,visual-v1}/acceptance.json。最新玩家視覺回覆「這個我確認OK，你紀錄github流程進度規則」僅核准所展示美術包，不是執行契約、Runtime/手機/部署核准。來源、prompt、review-manifest、QA/GIF/scripts 在 docs/art/candidates/botuo/awakening/composite-review-v1/，都是美術重建，不是實機。保護全部原 master/舊 receipt，不重畫、不重問，不用錯誤 key-pose-v1/extra-hoof 草稿。
本次前檢提案基於實際 src/combat/battleSession.js、tierEffectRuntime.js、statuses.js、src/assets/actionPlayback.js、src/runtime/{assetPresenter,statusEffects,assetResidency}.js、src/assets/manifest.js 和全 roster action descriptors。T0 coefficient1.70、caster-locked radius2.2、CD14s、windup0；instant0ms 從 F3、tactical T0 900ms/T3 819ms，無統一前搖。AoE resolve 的單一 target 不等於全部受害者，需從同次真實 positive damage 逐人呈現；對空無假 contact/status。T3 boyi.team 只在傷害成立後 post_cast，真實附近存活受益者 radius2.832、13.5%、3.75s；目前此 status 缺用於泛用圖層的 presentationSource。守群獨立到期、MAX 不相加，不能變成全隊預設護盾。
現有完整 required 實測重算 45 textures /16611224 decoded，16MiB hard cap、131072 reserve 外剩34920。「動態配置」已存在，但不是取消16MiB：僅每場按需載入，當場 required 全部釘選。四個鎮岳 display derivative 候選共1145272 bytes；原49 required/17756496 decoded超出1110352。玩家已回覆「確認紀錄進度規則流程 目前應該沒有16mib限制吧，上次有取消過，用動態配置？現在要做什麼 部署到遊戲嗎，這樣我同意核准」；前一答覆明定同意只核准赤鱬KO無損分塊方向、不代表Runtime/部署。最新設計將現有赤鱬KO 1244×1254 無損分為11片、同一張2048×550 atlas，唯讀RGBA重組相同；估計節省1734304，49 required16022192 + reserve131072後留623952。無正式 packed PNG、native採樣/實測容量PASS；新書面規格未經玩家審閱。

[具體指令]
1. 呈交剛保存的完整書面容量設計供玩家審核；如核准，綁定精確文件 SHA／玩家原文／範圍，之後寫實作計畫並由玩家選擇執行方式。若要求修訂，先改規格再待審；不能跳到 code／atlas 安裝。
2. 書面設計與計畫依序核准後，才以 TDD 製作可逆 KO atlas／泛用多區塊顯示並驗證原圖全 RGBA、左右鏡射、Idle/Move/KO尺度接地、Phaser native/gutter、全部49required與快取/scene高水位、64-entry及131072reserve。原 master/raw 不直接載 Runtime；若無法保真/容量不符，停止請求決策，禁升cap/降密度/少載required。
3. 鎮岳 cast/action/VFX/status 執行契約仍需獨立玩家審核；其後必要整合與局部測試、Build/Browser，Pages部署再由玩家獨立授權，公開hash與手機驗收最後進行。當前「這樣我同意核准」不是立即部署。沿用未變 docs/verification/P2_AWAKENING_PREFLIGHT/{static-seed.json,mechanics.json,probe.mjs} 16 案例與 Special 歷史164/Browser/部署/145CI/39公開比對，不因換 Work 重跑。五個歷史 full-suite failures 保留，不宣稱未執行全套 PASS。
4. 完成 coherent docs/art slice 才更新 WORK_PROGRESS.md、docs/STATE.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、AGENTS.md、本 handoff／必要 QA，docs/art-only commit [skip ci] push 同一 feature branch，回報完整 HEAD、PR/tree、驗證、未完成 Gate。兩個既有無關未追蹤暫存 .F1-initiation-master.png.cC3cw2 與 .target-impact-padded-v1.png.JS8JIB 不加入、不刪改。

[約束條件]
Shared Dynamic Asset Residency、16MiB cap、131072 reserve、全部 required 不變；普通 Hit Reaction 永久取消，普通傷害不打斷技能。禁新命中/位移/震退/無敵/DoT，禁改傷害/CD/Tier/AI/Targeting/控制，禁主線 merge/替代分支/TD/P3、未授權部署。所批准視覺只屬美術重建。歷史 pending 快照不能推翻較新 receipt；每次接手指令必須完整置於單一、自足、可一鍵複製的 code block。
```
