# P3 赤鱬 Heavy 湧浪 — F3 approved / next poses and GIF

## 2026-10-23 — Heavy 湧浪 F3 v3 PLAYER APPROVED；新 Work 接續其餘姿勢與獨立 VFX/GIF

玩家原文：「我核准，紀錄規則進度流程，我會開新的work接手」。明確核准呈交checkpoint 5c555d9586a71ea6b0aa1e471c871dc4fd1144f2 的單張 Heavy F3 v3。精確收據 docs/art/approved/chiru/heavy/f3-v3/acceptance.json，圖源 docs/art/candidates/chiru/heavy/f3-v3/heavy-f3.png，SHA256 8943837f65e321bc2bd7290280af829801e9735cf3e3033300ba991314e694f6。F3 Gate CLOSED，不重畫、不重問；v2與舊batch不採用但保留。候選manifest的舊PENDING為呈交歷史，由新收據覆蓋，原檔/manifest不改。

唯一下一工作：沿此核准F3製作Heavy F1/F2/F4及三組獨立VFX（壓縮水環、粗浪柱、真命中爆浪），安全等尺度/共同anchor/懸浮下緣正規化，提供normal/slow/noFX/miss/mirror/Idle-return與適用reduced預覽。展示單招GIF後停待玩家核准；本次核准不含尚未展示姿勢、FX、GIF、Heavy Runtime或部署。新Work先讀 docs/handoffs/P3_CHIRU_HEAVY_NEXT_WORK.md；不重做Basic/P1/P2、不重做已完成前檢、不恢復整角批次。

全角色硬規則保持：無FX也能辨別Basic/Heavy/Special/Awakening動作；同角色同手機尺度Basic<Heavy<Special<Awakening，出手FX與真受擊FX分別清楚、逐級更大華麗、形狀/節奏各異，治療/防禦用正確非傷害語言；不靠擴大角色、改命中範圍或假爆破達成。Heavy前向單target有限lane、鎖定aim；F3發射點為蓄勢350/337.75/325.5/305.9ms，350ms後真結算，未命中不畫target爆浪；F1/F2按200:150分配蓄勢，F3 400ms、F4 200ms。沿用已核准spec及逐招decision。

同分支feat/m0-combat-core-20260927、PR#1 open/unmerged、不main merge/新branch/worktree/TD/委派；保護所有approved masters/收據/尺度/anchor/ground/右向canonical左向mirror、P1/P2、普通Hit取消與無固定16MiB限制及逐檔安全/回收。此次只存收據/流程/進度，產品未改，不重跑Runtime測試/Build/部署。下方舊F3 PENDING和整包待辦為歷史。


## 新 Work 自足接手指令

Repository: Hansen0318/shanhaijing-arena
唯一分支: feat/m0-combat-core-20260927；PR #1 open/unmerged。GitHub最新HEAD為權威，呈交F3 checkpoint 5c555d9586a71ea6b0aa1e471c871dc4fd1144f2 僅供定位，必須fetch最新。

先讀 AGENTS.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、WORK_PROGRESS.md與docs/STATE.md最新段落、docs/decisions/2026-10-23-restore-sequential-skill-workflow.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md、docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json、本交接與docs/art/approved/chiru/heavy/f3-v3/acceptance.json。舊整包流程由新逐招decision取代；原數值/時序spec核准仍有效。

P1/P2 COMPLETE，Basic發布已核准；Heavy F3 v3已核准。下載核准F3並完整解碼，核對收據hash；以public/assets/characters/chiru/{battleIdle.png,identity.png}保持形象。不重畫F3、不重審規格或Basic，不採用被拒v2/受損舊batch，不重做已完成前檢。

直接接續F1/F2/F4與獨立壓縮水環、粗浪柱、真命中爆浪。保留彎曲高低雙臂、跨身弧形發力、扭身與反向鰭尾，關閉FX也與Basic單手直推可辨。Heavy特效大於Basic，不擴大角色/命中幾何，不複製放大同一FX。遵守核准Heavy時間線與單target命中/落空。先檢查來源完整性、透明邊界、相同角色地標尺度、common anchor/懸浮下緣、無裁切/串幀與左右配件；不以圖片畫布大小作角色尺度證據。核准F3原圖不可刪像素，正規化使用可追溯派生檔並記hash。

生成Heavy角色動作+獨立VFX normal/slow/noFX/miss/mirror/Idle-return與適用reduced GIF；保留原圖、prompts、manifest、重建script和明暗底QA。正常速度/手機尺度對照已核准Basic，分別檢視出手和真命中VFX，發射不提前扣血、miss無target爆破。這些是美術預覽，不是遊戲實錄或Runtime驗證。

完成後將來源/QA/進度/WORK_LOG/handoff保存同分支checkpoint並讀回核對，呈交GIF給玩家，停待核准。本次不整合Heavy Runtime、不部署、不開始Special；尚未展示素材不視為approved。如遇具體素材阻擋，記錄並修復當前Gate，不以容量問題擴成整角批次。

原生單人、不委派/新branch/worktree/merge main/TD。保護approved masters/收據/P1/P2/Basic/scale/anchor/ground/mirror；普通Hit取消，無固定16MiB上限，逐檔安全/required/回收清理仍守。只跑當前素材必要檢查；未改產品不重跑suite/Build/Browser/Pages，文件/美術checkpoint用[skip ci]。所有後續交接提示必須單一自足可複製code block。
