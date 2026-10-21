# P2 Special — F3 approved; full four-pose player review next

```text
接續 Hansen0318/shanhaijing-arena。
唯一分支 feat/m0-combat-core-20260927；既有 PR#1 維持open/unmerged。
GitHub是唯一權威；先fetch最新remote/HEAD/PR/working tree。文件所在commit是本次checkpoint，不能當成部署SHA。
所有後續給玩家的新Chat/Work/Codex指令都必須放在單一完整、自足、可一鍵複製的code block。
禁止merge main、另開替代分支、TD玩法、P2Awakening或P3。

先讀AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、docs/M5C_P2_BOTUO_SPECIAL_ACTION.md與docs/art/candidates/botuo/special/key-pose-v1/{README.md,verification.json,mechanics-snapshot.json,SHA256SUMS.json}。

保護P1 COMPLETE、P2Idle/Move/Basic尺度CLOSED、Basic/KO/Heavy COMPLETE / PLAYER VERIFIED；Heavy所有核准PNG/GIF/VFX/契約/工程/手機紀錄不重做。Heavy部署acf454741757f58efa980fdcd03f028a472e87a3保持；這次docs/art/probe沒有重新部署。既有136affected/build/WebGL/trim/built入口/public證據沿用；五個已知suite failures不宣稱通過，不重播P1/Basic驗收。

已完成：真實Special32組施放、8生命週期、2AI機會、4成對減傷resolver核對；四技能動作差異設計；一張防護成立角色候選、prompt/refs/SHA256/透明padding及明暗QA已存GitHub。只增加docs/art與read-only probe，沒有Runtime改動。

已核准F3：docs/art/approved/botuo/special/f3-v1/acceptance.json。
玩家「好這個我確認ok，紀錄下來後繼續」核准已展示Special防護關鍵姿勢與既有立即接技/持續減傷說明。
F3 SHA25600dc78f20e09da6f8c55b67497653046cb5c7aa6253df2ffaa3d7b41c7bdf8a6；原圖不可重畫。Early approval checkpointa9ea66955702b0b0b0e6e852f6de00e004d12c40。

目前唯一玩家Gate：docs/art/candidates/botuo/special/poses-v1/four-pose-review.png。
先讀該目錄README.md、verification.json、SHA256SUMS.json及prompts/revisions；深色QA在同目錄。
選定F1-initiation-master.png、F2-inward-master.png、F4-release-master.png仍是CANDIDATES，和原核准F3合成四姿勢對照供審核。三張superseded-chest-drift.png是被排除的服裝偏差歷史稿，不可當核准素材或後續身份reference。修正版為低位開放→內收抬臂→核准高位護胸→放下收勢；不重做核准F3。
所有selected sources/PNG-alpha/明暗QA及40px in-memory padding/diff檢查完成。0.44共同raw-pixel顯示比例只是美術對照，不是Runtime尺度/anchor/容量證據。沒有strip/GIF/VFX/Runtime/deploy。
無新核准就展示現有四姿勢並等待，不重新生成。若玩家明確核准四姿勢，先記錄實際文字/選定sources/hash與範圍，再做獨立施放VFX和實際受益者持續狀態VFX，之後依規則做完整預覽並停在GIF審核；不可推論VFX/GIF/時序/Runtime/手機已核准。

機制必須沿用：T0自身25%減傷4秒/CD8/coef0/windup0，所有Tier均即時；T1起已有post_cast護群，選附近一名存活隊友，非全隊。數值/AI/replace/strongest/expiry/KO/clear由Special文件和程式核對；不能新增傷害、吸收護盾、無敵、嘲諷、AoE或前搖，不能移除既有Tier受益者。cast hit=true代表utility生效，不代表傷害命中。
狀態VFX要獨立於短姿勢、依source/target/status真實生命週期，不鎖移動攻擊；可立即接其他ready技能，減傷不因接技消失；不為播完F1–F4新增等待或延遲減傷到F3。未來共用資料驅動實作，禁止P2-ID分支。
保持核准身份、配色、護臂、尺度/anchor/ground/mirror；不用外框高度縮放角色或放大角色增加強度。普通Hit CANCELLED、合法控制/KO保留；16MiB cap、131072reserve、Shared Dynamic Asset Residency不變。42required keys16622164bytes，reserve外23980bytes；首張master尚非runtime素材或容量適配證據。

無新核准就展示現有候選並等待，不重做；有新授權只完成下一既有Gate。必要修改完成coherent slice後commit+push，更新進度/state/來源/審核範圍；docs/art-only用[skip ci]。回報最新remote HEAD、實際材料與下一個未完成Gate，不捏造裝置/測試/玩家驗收。
```
