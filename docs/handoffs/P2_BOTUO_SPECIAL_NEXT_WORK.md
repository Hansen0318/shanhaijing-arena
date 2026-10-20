# P2 Special — first protective key pose awaiting player review

```text
接續 Hansen0318/shanhaijing-arena。
唯一分支 feat/m0-combat-core-20260927；既有 PR#1 維持open/unmerged。
GitHub是唯一權威；先fetch最新remote/HEAD/PR/working tree。文件所在commit是本次checkpoint，不能當成部署SHA。
所有後續給玩家的新Chat/Work/Codex指令都必須放在單一完整、自足、可一鍵複製的code block。
禁止merge main、另開替代分支、TD玩法、P2Awakening或P3。

先讀AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、docs/M5C_P2_BOTUO_SPECIAL_ACTION.md與docs/art/candidates/botuo/special/key-pose-v1/{README.md,verification.json,mechanics-snapshot.json,SHA256SUMS.json}。

保護P1 COMPLETE、P2Idle/Move/Basic尺度CLOSED、Basic/KO/Heavy COMPLETE / PLAYER VERIFIED；Heavy所有核准PNG/GIF/VFX/契約/工程/手機紀錄不重做。Heavy部署acf454741757f58efa980fdcd03f028a472e87a3保持；這次docs/art/probe沒有重新部署。既有136affected/build/WebGL/trim/built入口/public證據沿用；五個已知suite failures不宣稱通過，不重播P1/Basic驗收。

已完成：真實Special32組施放、8生命週期、2AI機會、4成對減傷resolver核對；四技能動作差異設計；一張防護成立角色候選、prompt/refs/SHA256/透明padding及明暗QA已存GitHub。只增加docs/art與read-only probe，沒有Runtime改動。

目前唯一玩家Gate：
docs/art/candidates/botuo/special/key-pose-v1/F3-protection-master.png
SHA256 00dc78f20e09da6f8c55b67497653046cb5c7aa6253df2ffaa3d7b41c7bdf8a6
1222×1287 RGBA，1256843bytes。
審核直立居中、護臂向胸口收攏、另一手由下支撐、雙蹄接地的防護姿勢與核准角色身份；F3不是攻擊命中。這張仍是CANDIDATE，未獲玩家核准，不生成剩餘姿勢/VFX/GIF或整合部署，除非最新GitHub新增明確驗收。
若玩家明確核准此已展示圖，先記錄實際文字、source/hash與範圍，再製作其餘獨立姿勢並停在下一美術Gate；不重新生成此圖或重問相同Gate。

機制必須沿用：T0自身25%減傷4秒/CD8/coef0/windup0，所有Tier均即時；T1起已有post_cast護群，選附近一名存活隊友，非全隊。數值/AI/replace/strongest/expiry/KO/clear由Special文件和程式核對；不能新增傷害、吸收護盾、無敵、嘲諷、AoE或前搖，不能移除既有Tier受益者。cast hit=true代表utility生效，不代表傷害命中。
狀態VFX要獨立於短姿勢、依source/target/status真實生命週期，不鎖移動攻擊；未來共用資料驅動實作，禁止P2-ID分支。
保持核准身份、配色、護臂、尺度/anchor/ground/mirror；不用外框高度縮放角色或放大角色增加強度。普通Hit CANCELLED、合法控制/KO保留；16MiB cap、131072reserve、Shared Dynamic Asset Residency不變。42required keys16622164bytes，reserve外23980bytes；首張master尚非runtime素材或容量適配證據。

無新核准就展示現有候選並等待，不重做；有新授權只完成下一既有Gate。必要修改完成coherent slice後commit+push，更新進度/state/來源/審核範圍；docs/art-only用[skip ci]。回報最新remote HEAD、實際材料與下一個未完成Gate，不捏造裝置/測試/玩家驗收。
```
