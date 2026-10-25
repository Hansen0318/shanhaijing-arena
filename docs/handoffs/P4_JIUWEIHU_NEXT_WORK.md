```text
【最高優先：所有後續交接指令必須單一完整、自足、可一鍵複製code block】
[角色任務]
接續Hansen0318/shanhaijing-arena。P4九尾狐Basic「靈火」Runtime與正常Pages已完成，唯一下一Gate＝呈交已部署遊戲、停待玩家Basic遊戲驗收。不要重做已完成整合或把工程PASS當玩家核准。
[背景資訊]
GitHub最新remote唯一權威；唯一分支feat/m0-combat-core-20260927，PR#1保持open/unmerged，不merge main。先fetch最新HEAD、核對本機未push/tree及無關untracked，任何定位SHA不是最新保證。成功發布270aea17a1e65954d1ceba06898a707ee4aac675/treec70e381052611ccabb38d7e3b9908cc950eb64b0；正常Pages40183802821/build121140287488/deploy121143484524 SUCCESS，同SHA獨立P1/P2相容SUCCESS。
先讀最新AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、docs/verification/P4_BASIC_RUNTIME/{WORK_LOG.md,REPORT.md,release.json,release-jobs.json,release-runs.json,release-evidence.json,ci-local-build.json,public-fingerprints.json}；本角色spec docs/superpowers/specs/2026-10-25-jiuweihu-whole-character-design.md、前檢WORK_LOG與spec收據、docs/art/approved/jiuweihu/basic/composite-review-v1/acceptance.json保持。
[具體指令]
1. 已完成1251測試、Build/113 guard、P4真native32/built4、共用來源受影響P1/P2/P3相容、CI/local/public175（6fresh+169精確沿用）；來源未變不再跑工程/Browser/部署/公開下載。原候選PENDING是歷史，由既有美術收據覆蓋；工程發布不是玩家Runtime核准，尚無Runtime acceptance。
2. 已實作兩模式0ms真Basic/actionId/真target獨立花；miss無target花，傷害/射程/暴擊/RNG/Tier/cadence/選人不變。四姿勢F3→F2→F1→F4 140/90/90/140ms只收勢、可被合法新動作覆蓋、回原Idle/實際Move；正常FX230ms/reduced靜態140ms。真解剖密度.9/ground/anchor/右canonical左mirror保護，260×220預覽不是原160格，不按尾焰fit；遊戲使用3張優化PNG。
3. 直接提供 https://hansen0318.github.io/shanhaijing-arena/?basic=270aea1 ，隔離驗收 https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&basic=270aea1 。橫向→ALLY TEAM任一slot選九尾狐→START→點其頭像→接敵看自動靈火，切左右與移動/停下驗證返回。停待玩家Basic遊戲明確核准；不重問是否開始，不建立未見Runtime acceptance，不開始Heavy/P5/惑心。若收到具體回饋，只修該實際問題並走必要新驗證/正常發布；若remote已有更新核准，按最新有效收據接第一未完Gate，不覆蓋或重做。
[約束條件]
P1–P3 COMPLETE，P4整角未完成；全部核准原圖/收據/數值/尺度/存檔保護。原生單人，不委派、不新branch/worktree、不動TD、不merge main、不重置存檔、不動無關untracked。普通Hit永久取消；完整正式貼圖已載入且TextureManager存在才撤同record整層示意，缺來源保留一份fallback，禁止ground-sigil換皮，不誤刪獨立場域/盾水膜/固定場地；逐檔安全/兩下載/required完整就緒/所有權回收維持。長工作前與短Gate同步WORK_PROGRESS/STATE/角色WORK_LOG/handoff並commit/push，純文件[skip ci]、新產品走正常流程。CLI無認證用connected GitHub API，逐blob Git SHA/完整tree核對，expected-SHA非force更新ref。容量不足先保存第一未完Gate。
```
