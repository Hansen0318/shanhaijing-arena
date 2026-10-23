# SDD ledger — plan: docs/superpowers/plans/2026-10-23-chiru-whole-character.md

## 2026-10-23 — 最新玩家指令：撤銷整包開發，恢復逐招完整流程（最高優先）

**權威最新決策：** `docs/decisions/2026-10-23-restore-sequential-skill-workflow.md`。玩家明確撤銷2026-10-23舊整角「同時四招F3＋被動樣式／整包GIF／整包Runtime／一次發布」要求，因Work容量與對話長度限制，恢復 **Basic → Heavy → Special → Awakening → Passive**；每一招各自完成F3審核→其他動作/獨立VFX→GIF審核→Runtime/真驗證→正常Pages部署→玩家實機核准→保存收據與GitHub checkpoint，**才繼續下一招**。可跨多個短Work，不能等五招才發布。過去同日整包計畫、handoff、decision為歷史，與本新決策衝突處以本節和新decision為準。

**現在的唯一未完成Gate：P3 赤鱬 Basic「水矢」現有F3候選的單招玩家審核。** GitHub `docs/art/candidates/chiru/whole-character/f3-batch-v1/basic-f3.png` 已存在（連同manifest/original/prompts/review），候選尚未PLAYER APPROVED；先讀來源並對比核准identity/Idle後**只展示水矢F3**，不得再要求四招與被動同批審核。Heavy/回瀾/潤澤/游息四項已生成候選保持不動，待該招輪到時再個別審核，不重生。P3完整spec數值/Tier/時序/Collection已由玩家核准，其原收據保持有效，不因流程改動要求重審；尚無P3 GIF/Runtime/新部署。P1/P2 COMPLETE／PLAYER VERIFIED，不重做。

同一分支 `feat/m0-combat-core-20260927`、PR#1 open/unmerged、不合main、不新分支/TD、GitHub latest HEAD優先；保護所有approved masters/收據/GIF/scale/anchor/ground/canonical右向、左向mirror、普通Hit永久取消，保持全局被動真效果/Tier/VFX/正確清理、Collection純玩法、P1/P2數值/MAX、無固定16MiB容量限額與逐檔安全/required/回收規則。每招結束寫入STATE/WORK_PROGRESS/ledger/handoff、同分支commit/push；純文件[skip ci]；交接指令一個完整自足可複製code block。此次僅改規則與進度，**沒有**新增核准、產品程式/素材變更、Runtime測試或Pages部署。


2026-10-23 Asia/Taipei。恢復2d7730cb12587269bd43f69166d4b24554b724a2/tree241991de4576180da5d62bd2355f854a76ef1aaf，PR#1open/unmerged，產品未改。玩家回覆整角規格「紀錄進度流程規則就繼續」，按直接回覆範圍保存spec/proposal核准，不捏造逐項再述或未知素材核准。

Task1 ACTIVE: receipt/plan checkpoint → four separate F3 candidate generations + passive style → visual/alpha/provenance checks → one batch review entry. No product/runtime deployment yet.

Ruling: user已選原生單人、原branch與整包流程，故沿原workspace執行，不新建worktree/branch、不委派reviewer、不插新的plan/execution-method批准Gate。此為使用者既定指令優先；代價是原生自審並非獨立review，所有新素材仍按真正Gate交玩家審。

Pre-flight interfaces: Task3 timeline emits castId/epoch/recipient events → Task4 passive uses positive-heal recipient/event identity → Task5 presentation/Collection consumes accepted data and events → Task6 exact-source proof. Field names and generation/settlement ownership一致。Task1/2 accepted image hashes gate Task5 asset ingestion; candidate art cannot be consumed as accepted runtime art.

Unrelated untracked files remain excluded: botuo heavy .source-pressure-raw-v1.png.szUcob SHA2561ed6b424b70657e2ff050094f38c979bff070a31d09cd2c459221d9c99b70521；lushu basic .lushu-basic-vfx-review-v1-slow.gif.jOfvwS SHA25654f89ee99958c49872ea9b081863665d1a33425b7c3cd8863cee8ecb17bb34ac。No delete/stage/alter.

Task1 recovery: db85a1c29e7e32e7f803c78f4f1883f05f68a340/tree771ab35f49e890e5144990a7528151c4e5a7440b, PR1 open/unmerged; fresh clone clean. Receipt four bound hashes verified; identity/Idle visually inspected; no candidate directory exists. Saved task1-checkpoint.json before generation. Historical untracked mentioned above belong to predecessor workspace; absent here, nothing removed. No preflight/runtime suite repeated.

## 2026-10-23 — P3 四招F3／游息候選已保存，待集中玩家審核

恢復HEAD eb0ed0b50c97914cb434b7e9c5a48439adedeb3c；PR#1 open/unmerged。Task1五張候選與原檔、prompts、manifest、review.html/REVIEW.md在docs/art/candidates/chiru/whole-character/f3-batch-v1/。四張右向本體：水矢單手前推、湧浪雙手重推、回瀾托掌、潤澤高展；游息獨立雙魚效果。只增加透明畫布邊距，原始像素/檔案保留。作者自審不是玩家PASS；候選尚未核准，無GIF/Runtime/部署。

規格核准收據四hash與identity/Idle兩hash核對PASS；production來源相對恢復HEAD保持不變，既有P1/P2/Move/KO/尺度/Hit取消與素材安全政策不變。無關untracked不提交。未重跑前檢/測試/Build/Browser/CI/Pages。

唯一下一Gate：呈交五項候選供玩家集中審核；未獲核准不進Task2其餘姿勢/VFX/GIF。GitHub最新commit即本紀錄所在checkpoint，後續fetch取完整SHA；原branch不merge/不新branch/不委派。

Task1 authoring completed; PLAYER REVIEW PENDING. No Task2 started.
