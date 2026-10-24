# P3 赤鱬 Special「回瀾」接續入口

```text
接手 Hansen0318/shanhaijing-arena；先fetch最新remote。
唯一分支 feat/m0-combat-core-20260927，PR#1保持open/unmerged，禁止merge main。

先讀 AGENTS.md、WORK_PROGRESS.md與docs/STATE.md最新段落、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、本handoff、docs/decisions/2026-10-23-restore-sequential-skill-workflow.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md、docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json、docs/verification/P3_SPECIAL_PREFLIGHT/WORK_LOG.md，以及docs/art/candidates/chiru/special/f3-v2/REVIEW.md和manifest.json。

P1/P2 COMPLETE；P3 Basic/Heavy/Heavy清晰版已PLAYER VERIFIED，不重做。P3整角未完成。
已完成：Special必要真機制差異、四核准形象實際檢視，以及單張F3 v2 imagegen重建／原圖／完整prompt／manifest／hash／透明padding／靜態等尺度QA。參考恢復SHA7c72f4c只供定位，最新remote優先。
候選 docs/art/candidates/chiru/special/f3-v2/special-f3.png
SHA256 f301c9a1e8ed67f6e3b481063d9f6841e826f608f4f523fc3d9d243bd8277290。
原圖 originals/special-f3.png SHA256 ef464c46993491ebd913e65a90e4f7253c0f5dedd1912e758191f6acc64053b5。
原圖淡alpha至左界，候選只加128px透明padding，完整像素保持。严格PNG/RGBA/alpha/roundtrip/reference hash及深淺底/等尺度作者自審已完成；不是Runtime或實體手機證明。不要重生現有候選、反覆檢查舊batch損壞圖或重跑相同來源QA。

唯一下一Gate：呈交這一張Special F3後停待玩家明確核准或具體修正。尚無Special美術acceptance。只有後續玩家明確核准才存精確hash收據，再做本招其餘動作/獨立VFX與GIF；目前不做F1/F2/F4、VFX/GIF、Runtime或部署。

核准設計仍有效：支援治療；掌前水環內收再托起，明確區別Basic前射、Heavy雙手推環。320ms重新選範圍20內含自身存活隊友，最低HP比例，同值穩定instanceId；按受益者當前maxHp的25/30/35/40%，封頂缺血。CD7/6.44/5.88/5.04秒，既有條件modifier加算上限15%；F1/F2/F3/F4=200/120/200/240ms。僅真正amount>0在受益者腳下/懸浮下緣顯示泉花；滿血手動可耗CD、不畫假治療。Runtime目前仍是舊instant/基準maxHP×caster healing scale，未接新規格，不能冒稱已實作。

固定Basic→Heavy→Special→Awakening→Passive；每招F3核准→其餘動作/獨立VFX→GIF核准→Runtime/真驗證→正常Pages→玩家核准→收據/checkpoint→下一招。全角色無FX可辨動作，Basic<Heavy<Special<Awakening，支援不用假攻擊爆浪。
原生單人，不委派/新branch/worktree/TD/main merge。保護所有approved masters/收據/P1/P2/Basic/Heavy/scale/anchor/懸浮下緣/右canonical左mirror。普通Hit取消；無固定16MiB總容量門檻，逐檔安全/required就緒/所有權/回收/destroy保持。Collection只放玩法。
未改產品不重跑suite/Build/Browser/Pages；文件/美術checkpoint [skip ci]，每短Gate更新WORK_PROGRESS/STATE/本招WORK_LOG/handoff，commit/push同分支。所有後續交接指令單一、自足、可一鍵複製code block。
```
