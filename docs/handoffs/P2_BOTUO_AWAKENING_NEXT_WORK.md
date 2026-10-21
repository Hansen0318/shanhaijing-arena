# P2 Awakening 鎮岳 — bounded mechanics and one key-pose review

```text
【山海經聯盟 — 新 Work：P2 猼訑 Awakening「鎮岳」】

[角色任務]
從 GitHub 最新狀態恢復，沿用已核准成果，只接續鎮岳的第一個未完成 Gate：必要真實機制核對 → 動作差異設計 → 一張角色本體 F3／關鍵姿勢候選圖，展示後停待玩家審核。
所有未來 Chat／Work／Codex 接手指令，必須完整放在單一、自足、可一鍵複製的 code block。

[背景資訊]
Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927
既有 PR：#1，保持 open／unmerged。
GitHub 是唯一權威；先 fetch 最新 remote，核對完整 HEAD、branch、PR、working tree、最新 commits。不可將舊 checkpoint 當最新。

P1 鹿蜀 COMPLETE。P2 尺度／Idle／Move／KO／Basic／Heavy 均沿用既有核准。
P2 Special「守群」已 COMPLETE／PLAYER VERIFIED。玩家核准的是發布版本536685401cfa0805b5836b057a27dd0692c46879；驗收收據：docs/art/approved/botuo/special/runtime-v1/acceptance.json。
目前公開版本仍為上述 Special。新的文件 HEAD 可以較新，不代表另一次部署。禁止重新要求 Special 審核、重做美術／GIF／工程或重部署。
整個 P2 尚未完成；鎮岳未有核准姿勢、GIF、工程契約或 Runtime。

[具體指令]
1. 修改前讀最新：AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md。以頂部最新有效紀錄為準，舊 pending 不得覆蓋新驗收。
2. 讀 docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、docs/verification/P2_AWAKENING_PREFLIGHT/static-seed.json，以及 Special 的 runtime-v1 收據和 docs/verification/P2_SPECIAL_RUNTIME/{release.json,WORK_LOG.md}。
3. 前一 Work 已完成 Special 玩家驗收紀錄、證據沿用盤點、鎮岳唯讀 catalog／T0–T3 投影與 source hashes。未變來源直接沿用，不重做這些靜態準備。Special 的164檢查、Browser、部署、145檔CI比對／39檔公開雜湊均是既有證據，本次不重跑。
4. 僅補尚缺的實際 BattleSession 機制證據：玩家／AI、tactical／即時／對空路徑；真正傷害時點、AoE中心／鎖定幾何／受益對象，以及T3防護與守群共存、到期／KO。只跑足以釐清動作設計的代表案例，不擴成全套回歸。
5. 保留真實機制：T0 coefficient1.70、caster-centered radius2.2、CD14s、windupMs0；tactical telegraph900ms是另一條既有路徑，不得新增統一900ms前搖。各Tier投影見已存JSON。T3 boyi.team是既有post_cast團隊減傷，不能當無條件開招即全隊護盾；測量實際觸發／範圍／時間。不得新增hit、位移、震退、無敵、DoT或修改傷害／CD／Tier／AI／Targeting／控制。
6. 依既有四技差異矩陣設計鎮岳；寬低重心／向下全身發力／徑向表達是既有保留方向，非已核准姿勢。須與Basic低角擊、Heavy向前護臂重擊、Special直立內收防護明確不同。使用已核准 identity.png、battleIdle.png（public/assets/characters/botuo/）及 Heavy／Special acceptance 指向的原始參考；保留羊臉、角、配色、披肩、紅腰帶及大小護臂，不用舊灰色形象。
7. 先檢查是否已有較新有效候選或核准；沒有才用既有 imagegen 流程製作「一張」無VFX的獨立F3／關鍵姿勢候選。保存source、prompt、reference hashes、alpha／明暗背景QA及manifest到 docs/art/candidates/botuo/awakening/key-pose-v1/。不可生成四格合圖，亦不可把候選寫成核准。無可用生成環境就如實BLOCKED，不假稱完成。
8. 完成 coherent slice 更新 WORK_PROGRESS.md、docs/STATE.md、Awakening action文件及必要證據，commit／push原feature branch；docs／art-only用[skip ci]。回報完整HEAD、PR／tree、沿用與新做事項、證據路徑，直接展示真正候選圖，然後停止。

[約束條件]
本次只到一張F3候選的玩家審核。不得提前製作F1／F2／F4、VFX、GIF、Runtime或部署；Special的核准不延伸至未見的鎮岳成果。
保護P1及全部已核准P2素材、原始masters、receipts、GIF、尺度／anchor／ground／mirror；不要依外框高度或單一頭部跨度重新縮放角色。
一般Hit Reaction永久取消，普通受傷不打斷技能；保留傷害／數字／技能與命中特效／真實狀態／KO。動畫與戰鬥／狀態生命週期分離，不新增角色ID特例。
維持Shared Dynamic Asset Residency、16MiB cap、131072bytes reserve與全部required；目前45textures／16611224decoded／reserve外34920bytes是既有證據，新master不直接進Runtime。
禁止merge main、替代分支、TD、P3、重做已完成Gate。五個歷史full-suite failures保留，不宣稱未執行的全suite PASS，不把工程成功當玩家驗收。
授權範圍內無實際阻擋就持續做到候選圖審核Gate；不要只回報計畫或另給玩家拼接指令。
```
