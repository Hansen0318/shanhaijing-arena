## 2026-10-24 — Heavy清晰版 PLAYER APPROVED／COMPLETE；新Work直接接Special回瀾

玩家「確認ok，紀錄，接下來我要開新的work無縫接軌接手下面的，確認好進度規則流程，就給我prompts，我要他讀取後直接做下面的」明確核准已呈交release30423cc清晰版。精確hash收據 docs/art/approved/chiru/heavy/clarity-v1/acceptance.json；原整體Heavy/runtime-v1與所有美術收據保持。Basic及Heavy已PLAYER VERIFIED；P3整角未完成。新Work直接執行Special「回瀾」第一未完Gate：沿核准spec做必要差異核對→一張F3角色關鍵姿勢候選→呈交停待玩家核准。獨立接手入口 docs/handoffs/P3_CHIRU_SPECIAL_NEXT_WORK.md。

本次首次輪到Special，完整解碼發現 whole-character/f3-batch-v1/special-f3.png 與 originals/special-f3.png 均損壞；原檔/manifest不動，證據 docs/verification/P3_SPECIAL_PREFLIGHT/WORK_LOG.md。新Work可依approved identity/Idle與核准spec重建單張Special F3，不能用截斷解碼假通過；沒有有效既有候選則不要求玩家審壞圖。不得重畫已核准Basic/Heavy或重跑已完成Heavy測試/Build/Browser/Pages。

最新全局逐招Basic→Heavy→Special→Awakening→Passive，單招F3→其餘動作/獨立VFX→GIF核准→Runtime/真驗證→正常Pages→玩家核准保持。全角色無FX可辨動作、Basic<Heavy<Special<Awakening視覺層級；治療用真受益者/泉花回流語言，不能套攻擊爆浪。保護approved masters/收據/尺度/anchor/懸浮下緣/右canonical左mirror與P1/P2；無固定16MiB限制，逐檔安全/required/回收保持。原生單人、同分支PR#1open/unmerged，不委派/新branch/worktree/TD/main merge。本次只有收據/文件[skip ci]，不改產品來源、不重跑已通過檢查。下方Heavy待觀察/不開始Special屬歷史，由本節覆蓋。

## 2026-10-24 — Heavy整體核准已記錄；發射／命中清晰度修正已部署

玩家整體Heavy核准收據 docs/art/approved/chiru/heavy/runtime-v1/acceptance.json 保持；本次直接授權的清晰度修正release30423cccd448971ce0948dfefaaead1406762248已正常部署。主要原因是程式額外alpha（flight.75/reduced.35、reduced hit.65）與命中立即淡出，核准PNG柔邊保留。現在flight與真hit主體alpha1，hit保持120ms後130ms淡出、獨立250ms生命週期可跨接續Basic；減動保持固定lane但不再變淡。四張Runtime PNG及全部核准masters/收據bytes、尺度/anchor/ground/左右鏡像保持；350ms真結算/單target有限lane/miss無爆浪/傷害時序保持。

正常Pages40039766197 build120707823374/deploy120708921318 SUCCESS；1129/1129、Build、596來源guard、Heavy native32/built4與Basic native32/built4 PASS；P1相容40039766198及獨立P240039766209 SUCCESS。CI/local157逐bytes與公開157/157（3fresh＋154同path/bytes/hash沿用）PASS，三artifact SHA256/ZIP CRC PASS。證據 docs/verification/P3_HEAVY_CLARITY/{REPORT.md,release.json,release-jobs.json,release-evidence.json,browser/,basic-compatibility/,p1p2-compatibility/,ci-local-build.json,public-fingerprints.json}；舊P3_HEAVY_RUNTIME證據不改。

本次工作已完成，呈交清晰版 https://hansen0318.github.io/shanhaijing-arena/?clarity=30423cc （Lab加battleLab=1），赤鱬H重擊。整體Heavy已核准，不重問；新清晰版未冒稱玩家看過，先等此版觀察回饋，未開始Special。來源未變不重跑suite/Build/Browser/Pages。原生單人、原分支PR#1 open/unmerged，不委派/新branch/worktree/TD/main merge；本次純紀錄checkpoint[skip ci]。下方ACTIVE及舊玩家遊戲核准待回覆屬歷史，由本節覆蓋。

```text
接手Hansen0318/shanhaijing-arena，唯一branch feat/m0-combat-core-20260927，PR#1維持open/unmerged，禁止merge main。先fetch最新remote，不用舊checkpoint覆蓋。
先讀AGENTS.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、WORK_PROGRESS.md與docs/STATE.md最新段落、本交接、docs/decisions/2026-10-23-restore-sequential-skill-workflow.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md，以及Heavy F3-v3/composite-review-v1/runtime-v1 acceptance收據與docs/verification/P3_HEAVY_CLARITY/{REPORT.md,release.json}。
玩家已明確核准整體Heavy，精確hash收據已保存。另直接授權發射/命中清晰度修正；release30423cc已正常Pages部署與全部必要驗證PASS，四張PNG不改；flight/hit alpha1、hit120ms保持＋130ms淡出、獨立250ms生命週期跨接續Basic。舊Runtime證據與收據不可改。
目前呈交 https://hansen0318.github.io/shanhaijing-arena/?clarity=30423cc （Lab加battleLab=1），赤鱬H重擊。等待新清晰度版觀察回饋，不重問整體Heavy核准；沒有未完成工程，不重跑suite/Build/Browser/Pages，不自行開始Special。若玩家新指令要求接續，依最新逐招Gate推進Basic→Heavy→Special→Awakening→Passive。
原生單人，不委派/新branch/worktree/TD/main merge。保護approved masters/收據/尺度/anchor/懸浮下緣/右canonical左mirror；Heavy單target有限lane、發射後350ms真結算、miss無target爆浪保持。純文件/美術checkpoint用[skip ci]；所有後續交接指令維持單一、自足、可一鍵複製code block。
```

## 2026-10-24 — Heavy 整體遊戲招式 PLAYER APPROVED；清晰度修正 ACTIVE

玩家「整體招式效果我approved，紀錄，另外解決發射和擊中的效果不夠清楚，看起來像半透明，是圖片關係還是什麼，確認後直接改然後紀錄」核准release4b85526整體Heavy並直接授權修正發射/命中清晰度。收據 docs/art/approved/chiru/heavy/runtime-v1/acceptance.json 保留精確範圍與hash；不撤回整體核准，也不冒稱新清晰版已被看過。先完成此修正，不開始Special。診斷與執行ledger docs/verification/P3_HEAVY_CLARITY/WORK_LOG.md：PNG柔邊透明＋程式flight.75/reduced.35、hit立即fade/reduced.65造成偏淡；保留全部核准圖片bytes與尺度，只修共用launched-line播放alpha/hold，reduced減動不再額外降透明。傷害/真命中350ms延遲/有限lane/miss規則不變。必要新來源驗證、正常部署與新紀錄直接執行。舊「唯一玩家遊戲核准待回覆」已由本節及收據覆蓋。原生單人、同分支PR#1open/unmerged、不新branch/worktree/委派/TD/main merge；純記錄checkpoint[skip ci]。

## 2026-10-24 — Heavy 湧浪已正常部署；唯一下一Gate＝玩家遊戲驗收

Release `4b8552650798a5bc5a23c6b411a40ef86abadcaf` / tree `a726b44da2cb27875c19e88e4dabe07aaa1a55d7`；正常Pages#1110/run40037402312、build120700424740與deploy120701557955 SUCCESS。完整1124/1124、Build、99素材guard、588來源guard PASS；Heavy真native32/built4、Basic相容native32/built4 PASS。CI/local157逐bytes一致，公開157/157（7fresh＋150同path/bytes/hash沿用）PASS；3份artifact SHA256與ZIP CRC PASS。P1相容workflow40037402283 SUCCESS，涵蓋P1/P2被動、P2覺醒native4/built2/尺度與Collection；獨立P2workflow40037402354亦已SUCCESS；所有必要流程完成，相同來源的驗證不重跑。完整證據 docs/verification/P3_HEAVY_RUNTIME/{release.json,release-jobs.json,release-evidence.json,browser/,basic-compatibility/,p1p2-compatibility/,ci-local-build.json,public-fingerprints.json}。

已核准Heavy動作／壓縮水環／粗浪柱／真命中爆浪接入正常遊戲。單target有限lane，cast鎖aim，發射固定origin/clamp，發射後350ms才真結算，miss無target爆浪；四Tier及兩模式同契約，普通走位/鏡像/懸浮anchor/共同尺度保持。已修復無其他planner時coarse step把release推遲至contact的真Browser缺陷，RED→GREEN regression與失敗證據保留attempts/。全部approved masters/舊收據/P1/P2/Basic保持，無Special/TD/新branch/worktree/委派/main merge。

**唯一下一步：呈交 https://hansen0318.github.io/shanhaijing-arena/?heavy=4b85526 （隔離Lab：https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&heavy=4b85526 ），請玩家選赤鱬並用H重擊實測。** 工程/部署PASS，不代表Heavy遊戲PLAYER VERIFIED；沒有Runtime acceptance收據，不開始Special。玩家本次GIF核准收據 docs/art/approved/chiru/heavy/composite-review-v1/acceptance.json 保持，不把動畫核准擴成未玩過的遊戲核准。來源未變不重跑suite/Build/Browser/Pages。此次為發布證據/進度checkpoint[skip ci]，仍同分支PR#1open/unmerged；逐招Basic→Heavy→Special→Awakening→Passive保持，所有後續交接提示單一自足可複製code block。

## 2026-10-24 — Heavy GIF PLAYER APPROVED；Runtime / 部署 ACTIVE

玩家明確「我確認了heavy動畫，我核准，繼續部署讓我測試遊戲嗎，是的話就開始」，後續「未完成就繼續」。精確收據 docs/art/approved/chiru/heavy/composite-review-v1/acceptance.json 綁定 b5ba0bc 的既有姿勢/FX/9GIF。GIF Gate CLOSED，直接Heavy Runtime/必要驗證/正常部署；遊戲玩家驗收尚未完成，不開始Special。單target有限lane、鎖定aim、發射後350ms真結算、miss無target爆浪與所有既有保護保持。前次本機未push內容被暫存清理，此次恢復並用連線API checkpoint。

## 2026-10-23 — Heavy 湧浪動作／獨立VFX／9種GIF已保存；玩家GIF審核NEXT

沿用已核准F3 v3，完整解碼/hash通過，原檔及收據未改。新F1/F2/F4、壓縮水環/粗浪柱/單target爆浪、normal/slow/noFX/miss/mirror/Idle-return/reduced及兩種Basic等尺度對照位於 docs/art/candidates/chiru/heavy/composite-review-v1/REVIEW.md。原圖/prompts/manifest/tier timeline/重建script/明暗底QA/逐GIF時序與checksums齊備；共同.13尺度/chestX158/hoverY203、安全邊界及RGBA/鏡像/strip反貼、9GIF解碼/hash/播放時長/像素時序核對通過。作者視覺自審，非Runtime或實機證明。

T0 350ms發射、再350ms後700ms contact；F3 400ms、F4 200ms，miss無target爆浪；T1-T3精確小數時序另存JSON，不宣稱GIF可表示小數ms。noFX保留核准本體原有持環像素，只關閉獨立FX。全角色視覺層級/動作辨識與前向有限lane單target契約保持。

**唯一下一Gate：呈交已完成Heavy GIF，等待玩家明確核准。** 玩家最新「完成的話然後紀錄 我要開新的work接手」是保存/交接指示，不是尚未展示GIF的核准；不得存新美術acceptance、整合Heavy Runtime/部署/開始Special。接手先讀 docs/handoffs/P3_CHIRU_HEAVY_NEXT_WORK.md 與REVIEW，不重畫F3/新姿勢/FX或重跑已完成檢查。收到明確GIF核准後才存精確收據並接Heavy Runtime。

P1/P2/Basic及全部approved masters/收據/尺度/anchor/ground保持，普通Hit取消、無固定16MiB上限與逐檔安全/required/回收保持。原生單人，同feat/m0-combat-core-20260927、PR#1 open/unmerged，不委派/新branch/worktree/merge main/TD。此次僅文件與候選美術[skip ci]；無產品變更，不重跑suite/Build/Browser/Pages。原圖保存checkpoint d739b922c10a0eb580f4a64654e6434518fcf8e0；完整成果checkpoint為包含本節之最新remote commit，接手必須fetch。

# 新 Work 接續入口

Repository Hansen0318/shanhaijing-arena；branch feat/m0-combat-core-20260927；PR #1 open/unmerged。
先fetch最新remote並讀AGENTS.md、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、WORK_PROGRESS/STATE最新段落、本文件、逐招decision、CHARACTER_ACTION_ART_WORKFLOW、M5C_ART_ANIMATION_VFX、原角色spec/spec acceptance、Heavy F3 v3 receipt和composite-review-v1/REVIEW.md、manifest.json、checksums.json。
第一未完成Gate是玩家GIF審核，不是重新生成素材。直接展示既存GIF，未獲明確核准不得Runtime/部署/Special。若玩家另有明確對本包核准，記錄精確範圍收據後依逐招流程接Heavy Runtime；不可由F3核准或交接指令推定GIF通過。所有硬規則與保護範圍遵循上節及最新GitHub；歷史F3下一姿勢待辦已完成，由本節覆蓋。

---
歷史（保留）：

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
