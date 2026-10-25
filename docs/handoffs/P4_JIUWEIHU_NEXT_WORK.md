```text
【山海經聯盟｜P4九尾狐Basic靈火F3已核准；直接做其餘姿勢／獨立VFX／GIF】
最高優先：所有後續交接指令必須單一完整、自足、可一鍵複製code block。

[角色任務]
接續Hansen0318/shanhaijing-arena。原生單人，直接完成第一未完Gate，不重問是否開始，不停在恢復報告。唯一分支feat/m0-combat-core-20260927，PR#1 open/unmerged，禁止merge main。不委派、不新branch/worktree、不動TD、不重置存檔、不動無關untracked。
GitHub最新remote唯一權威；先fetch最新HEAD，核對本機未push/tree。F3呈交定位819ae464ebcc721ea335b8d80998dcd606ab8d61；核准紀錄在後，不用舊SHA覆蓋新成果。CLI無認證用connected GitHub API，逐blob Git SHA/完整tree核對，expected-SHA非force更新ref。

[先讀最新入口]
AGENTS.md、WORK_PROGRESS.md、docs/STATE.md頂端、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md；docs/decisions/2026-10-23-restore-sequential-skill-workflow.md、2026-10-25-retire-schematic-under-formal-actions.md。
本角色：docs/superpowers/specs/2026-10-25-jiuweihu-whole-character-design.md；docs/verification/P4_CHARACTER_PREFLIGHT/{spec-acceptance.json,WORK_LOG.md,REPORT.md,baseline.json,proposal.json}；docs/art/approved/jiuweihu/basic/f3-v1/acceptance.json；docs/art/candidates/jiuweihu/basic/f3-v1/{basic-f3.png,prompt.txt,qa.json,manifest.json,REVIEW.md}。

[核准範圍／禁止重做]
玩家：「我審核ok，要新的work繼續執行，確認有紀錄，就提供prompts給work直接往下執行」。已核准上列Basic F3，SHA256 74f4a86bb8ae78ff8d805a400e8bdf8b023d86512fc6f0cb33b9beb62d1328b7。原圖1254×1254 RGBA1276964bytes、單臂前點/另一臂收腰、右向、無獨立FX；原PNG/prompt/QA/manifest/REVIEW保持，舊PENDING是呈交歷史，由收據覆蓋。不重生/重審F3或整角spec，不把核准當未見姿勢/VFX/GIF/Runtime核准。
P1/P2/P3 COMPLETE，P4 base/portrait/Collection/Idle/Move/KO已核准。原P3 1229/Build/native+built/正常Pages40163995446/public172及P4現況32probe/68來源綁定僅沿用原來源證據，不重跑/重下載。P3舊整包流程hash已核對且被逐招取代，不是未解決差異。若remote已有更晚有效成果/核准，沿用並接第一真正未完Gate。

[本Work唯一範圍：Basic動作／獨立VFX／GIF]
恢復checkpoint：2095215；已實際檢視F3/identity/Idle，remaining poses/VFX/GIF ACTIVE。接最新WORK_LOG第一未完Gate，不重做核准F3。
1. 實際檢視核准F3及public/assets/characters/jiuweihu/{identity,battleIdle}.png與尺度/packed-frame資料。保留狐形長吻、乳白/暖紅/黑金、九尾分組、配件側別、解剖尺度、anchor/ground、右canonical左mirror。沿F3用內建imagegen分別製作F1/F2/F4，不重畫F3、不做其他招式、不用同張變形冒充不同動作。
2. 製作獨立手部瞬發狐火及真target狐火裂花。Basic單手短促前點，不變成Heavy雙手推射/Special橫掃/Awakening高V。出手及命中各自清楚有力，符合Basic<Heavy<Special<Awakening同尺度可辨與華麗層級，禁止放大角色/真範圍。
3. Basic兩模式真命中0ms，係數/射程/暴擊/攻速/Tier照核准spec，不能因動作/VFX加真蓄力/飛行/延遲傷害。F3只是視覺key pose，不自動等於新命中時間。normal預覽清楚呈現0ms瞬發釋放/真接觸，其他動作為呈現跟隨/收勢；若展示預備姿勢須標示純美術示意，不冒充必經遊戲windup。miss無target爆花，不假造穿透/AoE/九連擊/被動效果。
4. 原F3有極淡alpha=1觸左/下邊，QA已記錄；原bytes不可裁掉/閾值刪除。需要時做保留全部原像素的透明padding/共同canvas衍生。四格同尺寸/共同anchor與ground，逐格核對alpha、四肢/尾/配件無裁切/鄰格污染，明暗底/左右mirror自查；不能把原始多格圖直接等分切片。
5. 提供normal、slow、noFX、左右mirror、Idle-return、miss、reduced及四Tier同尺度GIF；必要時另給VFX-only。全部明示美術模擬、非Runtime。編碼後完整解碼、核對duration/時序/尺寸/來源hash與像素邊界，不只檢查中間圖。
6. 保存原圖/衍生/manifest、frame geometry/時序、prompt、SHA256與最低必要素材QA，更新WORK_PROGRESS、STATE、本角色WORK_LOG與handoff，同分支commit/push。長工作前及短Gate保存checkpoint；容量不足先存第一未完Gate。這是docs/art預覽[skip ci]，不跑產品Build/Browser/Pages、不改src/public/Collection。

[停止點]
完成並提供可點開GIF連結，停待玩家GIF明確核准。不先Runtime/部署，不開始Heavy或P5。GIF核准後才Basic Runtime/必要真驗證/正常CI與Pages/public/玩家遊戲核准，再Heavy→Special→Awakening→Passive逐招同流程。
普通Hit永久取消；完整正式action貼圖已載入且TextureManager存在才退同record整層示意，缺來源才fallback，禁止ground-sigil膠囊/箭頭/方塊換皮。獨立場域/盾水膜/固定場地不誤刪。無16MiB固定總額，但逐檔安全/兩下載/required完整就緒/所有權回收保持。全部未改核准素材/數值/收據/尺度與存檔保護。
```
