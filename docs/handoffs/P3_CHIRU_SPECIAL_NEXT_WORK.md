# P3 赤鱬 Special「回瀾」新 Work 接手

```text
接手《山海經聯盟》P3 赤鱬 Special「回瀾」。直接執行第一個未完成Gate，不重問是否開始。

Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927
PR #1 保持open/unmerged，禁止merge main。
Heavy清晰版release：30423cccd448971ce0948dfefaaead1406762248
已保存發布證據checkpoint：10f6f94754d2c2b194a160a7f2c3994340243a22
以上僅供定位；必須先fetch最新remote，以最新收據與文件為權威，不以舊checkpoint覆蓋。

先讀：
AGENTS.md
WORK_PROGRESS.md、docs/STATE.md最新段落
 docs/DEVELOPMENT_PLAYBOOK.md
 docs/PROJECT_BOUNDARIES.md
 docs/handoffs/P3_CHIRU_SPECIAL_NEXT_WORK.md
 docs/decisions/2026-10-23-restore-sequential-skill-workflow.md
 docs/CHARACTER_ACTION_ART_WORKFLOW.md
 docs/M5C_ART_ANIMATION_VFX.md
 docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md
 docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json
 docs/art/approved/chiru/heavy/clarity-v1/acceptance.json
 docs/verification/P3_HEAVY_CLARITY/{REPORT.md,release.json}
 docs/verification/P3_SPECIAL_PREFLIGHT/WORK_LOG.md
 docs/art/M5C_B_CHIRU_VISUAL_SPEC.md
 docs/art/candidates/chiru/whole-character/f3-batch-v1/manifest.json與Special原prompt
並定位、實際檢視已核准identity/Idle及Basic/Heavy動作，核對左右配件、比例、anchor、懸浮下緣與招式差異。

已完成：P1/P2 COMPLETE/PLAYER VERIFIED；P3 Basic與Heavy（含新清晰版）已獲明確玩家核准、收據與hash保存。Heavy1129/1129、Build、真Browser、正常Pages、公開157檔核對已通過。不重做前檢/素材/測試/Build/Browser/部署，不重問Heavy核准。P3整角尚未完成。

唯一下一Gate：Special回瀾單張F3玩家美術審核。
先核對已核准spec與目前真Runtime，只補本招必要差異；原spec數值/Tier核准仍有效，不重審整張表。舊spec內整包審核/一次發布段落已被逐招decision取代。
既有special-f3.png及originals/special-f3.png已實際完整解碼失敗，證據在Special WORK_LOG。保留原檔/manifest，不反覆檢查同一損壞、不用截斷載入假通過。直接使用imagegen依核准identity/Idle、現有Special prompt與本招規格重建一張Special F3候選；保存新目錄的原圖、prompt、manifest/hash與必要解碼/透明/尺度QA，呈交圖片後停待玩家明確核准。這次不做F1/F2/F4、完整VFX/GIF、Runtime或部署。

Special已核准設計：治療範圍20內、含自身存活隊友的最低HP比例者，同值穩定instanceId；320ms真結算時重新判定合法最低者。按受益者當前maxHp的25/30/35/40%（T0–T3），封頂缺血；CD7/6.44/5.88/5.04秒。既有T1低血量+10%、T2距最近敵人2.0–4.2的+5%加算上限15%，不自行改數值。AI最低HP≤65%才嘗試；滿血手動可消耗CD但不畫不存在的正治療受益VFX。
F1/F2/F3/F4=200/120/200/240ms：掌前水環內收再托起；真受益者腳下/懸浮下緣泉環抬起，僅真amount>0顯示治療泉花。F3是支援治療托環動作，與Basic前射、Heavy雙手前推明確不同，不能套攻擊爆浪。上述是核准設計，不表示Special已實作。

固定流程：Basic→Heavy→Special→Awakening→Passive；每招F3核准→其餘動作/獨立VFX→單招GIF核准→Runtime/真驗證→正常Pages→玩家核准→hash收據/checkpoint→下一招。不得恢復整角批次或越過審核。
全角色無FX可辨動作，同手機等尺度Basic<Heavy<Special<Awakening逐級明顯華麗；治療/防禦須用正確非傷害語言。發射/命中或施法/受益者效果清楚，減少動態不靠額外半透明犧牲辨識；僅真事件出現受益者效果。

原生單人，不委派、不新branch/worktree、不動TD。保護所有approved masters/收據、P1/P2、Basic/Heavy、尺度/anchor/懸浮下緣、右向canonical與左向mirror；普通Hit永久取消。無固定16MiB容量門檻，逐檔安全、required就緒、所有權/回收/destroy保持。Collection只放玩法效果，不能寫工程限制。
未改產品不重跑suite/Build/Browser/Pages；純文件/美術checkpoint用[skip ci]。每個短Gate保存WORK_PROGRESS/STATE/本招WORK_LOG/交接，同分支commit/push。所有後續交接指令維持單一、自足、可一鍵複製code block。
```
