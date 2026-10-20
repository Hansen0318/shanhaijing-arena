# P2 Move scale repair deployed — targeted phone review pending

```text
【山海經聯盟 — P2 Move縮小已修正部署；手機驗收待確認】
GitHub唯一權威：Hansen0318/shanhaijing-arena；branch feat/m0-combat-core-20260927；PR1 open/unmerged。禁止替代分支、merge main、TD玩法。任何後續Chat/Work/Codex接手指令必須單一完整、自足、可一鍵複製區塊。
先fetch最新remote，核對HEAD/PR/tree；讀AGENTS、WORK_PROGRESS、STATE頂部、PROJECT_BOUNDARIES、docs/verification/P2_MOVE_BODY_FIX.md。最新docs checkpoint為包含本檔的commit，不把舊checkpoint當永久最新。
玩家2026-10-20 12:43確認準備/待機與打架大小正常，只有Move縮小，提供IMG_2688/2689。根因是先前Move25/32臉長校準將全身縮成78.125%；不能再沿用錯誤描述器測試宣稱身體比例正常。現在只修P2 Move資料恢復原始核准身體繪製density0.9/display144×139.5/foot0，四幀原圖、Idle/Basic/VFX/KO及其他角色資料不改；共用renderer/calibration code未改，無角色特例。不同姿勢臉部投影長度不能單獨當全身尺寸尺，也不能只因canvas相同就假定比例正確。
Source release0fe44b3c5eed46402d0394af6dff128a72be7393已部署。Actions39371658550 build118460665060/deploy118461659898 SUCCESS。115affected+Build/81guard通過；獨立量體回歸old-data RED→GREEN；Basic實際Chromium4cases44截圖、手機Chromium/WebKit6cases、實際built入口P1–P5 trace4cases/32sequences/880samples/24KO及Retry/Restart/Exit通過，舊presenter均closed/0bytes。公開16完整檔案等於CI/local SHA256，104local build檔案等於Pages產物。完整gzip追蹤、release/public JSON與QA在docs/verification/P2_MOVE_BODY/。全套未重跑，五個舊失敗保留；16MiB+131072reserve/39required keys16,639,660bytes不變。
測試網址 https://hansen0318.github.io/shanhaijing-arena/?v=0fe44b3c5eed46402d0394af6dff128a72be7393 。目前ENGINEERING PASS/DEPLOYED/NOT PLAYER VERIFIED。NEXT只等玩家測猼訑ready→Move→stop→Basic→Move，確認移動不再縮小；未明確確認不得解除阻擋或恢復Heavy。若仍有新缺陷，只針對相同版本的Move與實際身體地標追查，不重跑無變動的廣泛測試或重部署同一source。不可把舊2d83ef6或c99256f的診斷當成這次修正release。
保護P1 COMPLETE、P2 Basic已核准動作/VFX、HeavyF3 receipt docs/art/approved/botuo/heavy/f3-v1/acceptance.json。一般Hit取消、普通傷害不中斷技能。不得製作Heavy/P3/新圖或merge main。玩家確認後記錄原話/版本/範圍，再依現行流程恢復下一個未完成關卡。文件closure[skip ci]不代表新source部署。
```
