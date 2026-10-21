# P2 Special — all four poses approved; VFX/GIF review next

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

四姿勢已核准：docs/art/approved/botuo/special/poses-v1/acceptance.json。
玩家「這個可以，我approved 紀錄規則流程進度 github，有必要存下材料 然後繼續」核准45be0c0展示的四姿勢；early approval e49c3d1ea4151ff5d5aeba5f7643ec6e7a984bda。保護所有選定PNG/hash，不再生成或重問姿勢Gate。

目前唯一玩家Gate：docs/art/candidates/botuo/special/composite-review-v1/。
先讀README.md、review-manifest.json、verification-summary.json、SHA256SUMS.json。
已產出獨立activation-raw-v1.png與mitigation-state-raw-v1.png、F1-F4-safe-cell.png/等尺寸strip、正常/慢速/無FX/reduced/立即接技GIF，以及明暗/decoded/Heavy同Idle對照/T1實際受益者圖。五GIF完整解碼和pixel timeline roundtrip PASS；正常/慢速120frame RGB相同、holds3x；核准source未改。腳本scripts/prepareBotuoSpecialReview.py及prepareBotuoSpecialRecipientReview.py可重現。
新的VFX/GIF仍未獲玩家核准。未有新核准就展示現有正常/慢速/chain/無FX/reduced/T1材料並等待，不重新生成、不整合部署。若玩家核准特定預覽，先依實際展示範圍記錄exact file/hash/statement，不捏造未看過材料核准；接著依規則做executable presentation/status ownership契約與faithful packing，再進後續共用Runtime/必要測試/release/公開指紋/手機Gate。
預覽T0self狀態在cast400ms立即出現至4400ms；四姿勢各160ms只是美術節奏。即時chain依真實Special→Heavy同clock紀錄，身體動作可被下個合法技能替代、防護狀態不因此結束。Aura只跟實際actor root/位移，不跟Heavy圖片排版offset。T1圖依實際records僅self27.5%+一名隊友16.5%/4.32s，非全隊。不是實機錄影、Runtime或手機驗收。
姿勢包裝.126共同raw density/400×320cells/1600×320strip完整保留resizedRGBA、有padding/接地QA，但仍非最終Runtime尺度/anchor/容量fit證據。No src/public/workflow變更；既有證據沿用、不重跑P1/Basic/Heavy、不Build/deploy。

機制必須沿用：T0自身25%減傷4秒/CD8/coef0/windup0，所有Tier均即時；T1起已有post_cast護群，選附近一名存活隊友，非全隊。數值/AI/replace/strongest/expiry/KO/clear由Special文件和程式核對；不能新增傷害、吸收護盾、無敵、嘲諷、AoE或前搖，不能移除既有Tier受益者。cast hit=true代表utility生效，不代表傷害命中。
狀態VFX要獨立於短姿勢、依source/target/status真實生命週期，不鎖移動攻擊；可立即接其他ready技能，減傷不因接技消失；不為播完F1–F4新增等待或延遲減傷到F3。未來共用資料驅動實作，禁止P2-ID分支。
保持核准身份、配色、護臂、尺度/anchor/ground/mirror；不用外框高度縮放角色或放大角色增加強度。普通Hit CANCELLED、合法控制/KO保留；16MiB cap、131072reserve、Shared Dynamic Asset Residency不變。42required keys16622164bytes，reserve外23980bytes；首張master尚非runtime素材或容量適配證據。

無新核准就展示現有VFX/GIF候選並等待，不重做；有新授權只完成下一既有Gate。必要修改完成coherent slice後commit+push，更新進度/state/來源/審核範圍；docs/art-only用[skip ci]。回報最新remote HEAD、實際材料與下一個未完成Gate，不捏造裝置/測試/玩家驗收。
```
