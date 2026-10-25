```text
【最高優先：所有後續交接指令必須單一完整、自足、可一鍵複製code block】

[當前 Gate]
R2 local1251/Build/native32/built4 PASS; R3 final normal CI/Pages/public175 ACTIVE. Initial CI40182915206 failed legacy formal-count12 vs13; generic verifier fixed, original observations preserved. Read docs/verification/P4_BASIC_RUNTIME/WORK_LOG.md first and resume first incomplete Gate.

[角色任務]
接續Hansen0318/shanhaijing-arena。玩家已核准P4九尾狐Basic「靈火」四姿勢／獨立VFX／8GIF，直接完成Basic Runtime、必要真驗證及正常Pages部署，呈交遊戲驗收。原生單人，不重問開始或部署，不停在恢復報告。

[背景資訊與恢復]
GitHub最新remote唯一權威。唯一分支feat/m0-combat-core-20260927，PR#1保持open/unmerged，禁止merge main。先fetch最新HEAD、比對本機未push及tree；核准呈交定位d31d2ed06dc2fe5d3fbd41ed9151f66fa3a41aa3不是最新HEAD，不覆蓋較新成果。CLI無認證用connected GitHub API，逐blob Git SHA/完整tree核對，expected-SHA非force更新ref。
先讀AGENTS.md、WORK_PROGRESS.md及docs/STATE.md頂端、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md；docs/decisions/2026-10-23-restore-sequential-skill-workflow.md及2026-10-25-retire-schematic-under-formal-actions.md。
本角色：docs/superpowers/specs/2026-10-25-jiuweihu-whole-character-design.md；docs/verification/P4_CHARACTER_PREFLIGHT/{spec-acceptance.json,WORK_LOG.md,REPORT.md,baseline.json,proposal.json}；docs/art/approved/jiuweihu/basic/{f3-v1,composite-review-v1}/acceptance.json；docs/art/candidates/jiuweihu/basic/composite-review-v1/{REVIEW.md,manifest.json,qa.json,SHA256SUMS,prepare_preview.py}及其PNG/GIF/時序。

[Chat已完成／核准範圍]
49份呈交檔精確hash已綁定新收據，F3/其餘姿勢/兩組獨立FX/8GIF皆PLAYER APPROVED；不重生/重審或改原候選文件。原PENDING是歷史，由新收據覆蓋。487素材檢查/112解碼幀通過只屬美術預覽，不是新Runtime證據。P1–P3 COMPLETE，P4 base/Idle/Move/KO/spec保護；P4整角未完成。
Work只承接不可替代的遊戲整合／真renderer校準／必要工程驗證與正常發布。

[具體指令：唯一實作範圍]
1. 沿既有共用能力補Basic觀察式start/resolve/actionId與descriptor opt-in、優化runtime PNG、四姿勢及獨立出手/真target FX。先核對現行差異，不重做已有效成果；禁止角色ID特例，不提前實作惑心或其餘招。
2. 兩模式Basic真命中皆0ms。係數/射程/暴擊/RNG/Tier/cadence/選人/空放/傷害邏輯保持；出手與命中花依真事件同刻呈現，miss/無真命中無target花。不新增蓄力、飛行、延遲傷害、群傷或技能鎖。核准視覺順序F3→F2→F1→F4，各140/90/90/140ms只跟隨/收勢，後續合法動作可覆蓋，不改攻速；結束回原靜態Idle/實際Move。
3. 用核准Idle/Move解剖地標、共同ground/anchor與右canonical左mirror校準真正renderer大小；preview .115不是最終Runtime scale，260×220 cells也不是可直接當原160格尺寸。不得按尾焰包圍框fit、任意放大/縮小角色或改原圖。沿用packing/trim/frame契約，保留原alpha=1的padded masters；遊戲用PNG，不載入GIF/高解析原圖。完整正式貼圖載入且TextureManager存在才撤同record整層示意，缺來源才一份fallback；獨立場域/盾水膜/固定場地不誤刪，禁止ground-sigil換皮。
4. 同版本Collection只同步已實作Basic純玩法文案；其餘招/尚未開放被動不提前宣稱完成。維持逐檔安全/兩下載/required完整就緒/所有權回收，無16MiB固定總額。
5. 最低必要新驗證：兩模式×四Tier即時傷害/cadence不變；hit/miss/真target事件、右左/normal-reduced、Idle/Move→action→返回的真解剖尺度/ground/FX位置、完整載入退示意/缺來源fallback、多instance與Pause/KO/取消/end/Restart/destroy清理。跑直接受影響測試及Build；只在共用來源有實際變動時補受影響既有角色相容，精確來源不變的舊證據沿用，不重跑全專案盤點。依專案正常CI要求取得native+built真畫面/事件證據，不以美術GIF替代。
6. 正常CI/Pages成功後核對CI/local/public精確bytes/hash；未變公開來源依既有精確證據規則沿用。提供實際遊戲網址與最小玩家操作，停待Basic遊戲核准。部署已授權；工程PASS/已部署不是玩家驗收，不建立未見Runtime acceptance，不開始Heavy/P5。

[約束與中斷]
不委派、不新branch/worktree、不動TD、不合main、不重置存檔、不動無關untracked；全部核准masters/收據/尺度/ground/anchor/mirror/數值保護，普通Hit永久取消。長工作前與每短Gate同步WORK_PROGRESS/STATE/本角色WORK_LOG/handoff並commit/push，容量不足先保存第一未完Gate；純收據文件[skip ci]、產品發布走正常CI，不能跳過必要檢查。若remote已有較新Runtime/核准，直接從第一真正未完Gate恢復，不覆蓋或重做。
```
