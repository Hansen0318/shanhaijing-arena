# P2 鎮岳 — 共用政策已實作／觀測契約審閱 NEXT

```text
【山海經聯盟 — P2 猼訑 Awakening「鎮岳」無縫接手】
[角色任務]
從最新GitHub恢復；共用無固定總容量政策已完成程式與局部驗證。第一個未完成Gate是鎮岳觀測事件／狀態／保真安裝契約獨立審閱。先讀最新receipt與玩家回覆；若已核准，直接接續必要工程，不重問已關閉Gate。尚未核准時，呈交已完成具體契約材料，依實際範圍處理。

[背景資訊]
Repo Hansen0318/shanhaijing-arena；唯一branch feat/m0-combat-core-20260927；PR#1 open/unmerged。禁止main merge、替代分支、TD、P3。GitHub唯一權威；先fetch核對完整HEAD/tree/branch/PR/working tree/recent commits，不能把舊checkpoint當最新。
讀AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、docs/verification/M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md（頂部新addendum優先）、docs/verification/P2_AWAKENING_PREFLIGHT/global-residency-runtime/{REPORT.md,result.json}及本交接。
全局規格SHA256 c47019288e6b6ceaf15b8c87872c5eb156518847fec3922eadab72df69e2141b已核准；實作計畫SHA25616d36b5a209dc6c83fb240dad51f1fab17d0646f60a31cea7de4786e3d1ed067於玩家「核准，繼續」後已核准，receipt global-residency-plan-acceptance.json。不可重開這兩Gate。
src/assets/schema.js、src/runtime/assetCache.js、src/runtime/assetResidency.js已移除總decoded-byte/required-count拒絕門檻。cache16MiB/64僅閒置引用保留目標；scene12MiB僅回收未pin貼圖。無131072reserve門檻，無單角色例外，禁止實作被取代的赤鱬KO十一片。原圖未動。
局部30/30；affected120/113pass/7既有fail；完整993/965pass/28既有fail；Build/87assetguard PASS。先前986/957/29的29→28，來自明示遷移一項過時容量斷言；其餘28與原基線名稱一致。所有名稱原因與原始TAP/RED紀錄保存，不以歷史五項或局部PASS取代全套。SIGKILL原因未知，未執行斷言不可說PASS。來源未變就沿用，不因換Work重跑。
Browser阻擋：本機Playwright沒有Chromium執行檔；standard install chromium --only-shell下載invalid/truncatedZIP，exit1，browser-install.log已保存。真Phaser/built-app/mobile未跑；沒有鎮岳安裝／部署／公開指紋或手機驗收。CI正常full-suite，不用skip ci或既有bounded release/probe繞過全局變更。
P1 COMPLETE；P2Idle/Move/KO/Basic/Heavy與Special PLAYER VERIFIED皆保護。鎮岳F3/F1–F4/三VFX八GIF已核准，receipts docs/art/approved/botuo/awakening/{f3-v2,poses-v1,visual-v1}/acceptance.json；素材prompt/manifest/QA/GIF/script位於docs/art/candidates/botuo/awakening/composite-review-v1/，不重畫不重問。

[具體指令]
1. 保存實際後續核准範圍。全局計畫已關閉；獨立鎮岳契約尚無核准receipt時，先呈交頂部更新後preflight契約，不再要求容量節省或重做已核准美術。Native single-agent執行，不自行啟用子代理。
2. 契約核准後，TDD共享觀測lifecycle／action身份與真實damage victim關聯、boyi.team來源metadata及按真status管理VFX；不重推碰撞受益者或假HP。instant0ms直接F3；tacticalT0 900ms/T3 819ms，不加統一前搖。對空可釋放但無假命中/保護；T3正傷害後才以實際附近存活受益者radius2.832/13.5%/3.75s，與守群獨立到期、MAX不相加。T0coeff1.70/radius2.2/CD14/windup0不改；普通Hit永久取消。
3. 安裝已核准姿勢／三獨立VFX之來源精確衍生貼圖，原master/receipt/display/GIF保持；驗證RGBA（含透明RGB）、logical/physical座標、gutter/native採樣、共同接地、Idle多個身體/裝備標記、兩側鏡射與招式不變比例。所有49required完整pin與ready；每檔4MiB/2048/4194304、兩並行下載、真失敗、閒置回收及destroy不可退步。
4. 補受影響單元／完整測試逐項結果、Build及真built-app/native/mobile viewport驗證。先取得可用Browser環境，保存失敗；別用GIF或Node renderer double冒充。源未變之16機制及Special164/歷史Browser/部署/公開比對沿用。
5. 驗證支持發布才按玩家既有驗證後部署意圖，在同feature branch經Pages Actions與公開檔案指紋核對，交付實際URL等待手機審核；未回覆不可PLAYER VERIFIED。實際阻擋保存證據停相應Gate。
6. 每完整切片更新WORK_PROGRESS/STATE/AGENTS/鎮岳規格/驗證/handoff，同分支commit/push；docs/art-only skip ci，Runtime正常CI。回報完整remote HEAD/tree/PR、測試失敗、Browser/部署/下一Gate。不要合併main。

[約束條件]
保護所有既有核准P1/P2尺度/anchor/ground/mirror/pixels/receipts。兩指定歷史未追蹤暫存.F1-initiation-master.png.cC3cw2及.target-impact-padded-v1.png.JS8JIB不加不刪；本機另有docs/art/candidates/lushu/awakening/vfx-review-v1/.C-pair-raw.png.0ssrYD，亦保留不加入。不能繞過真失敗、人工改數字假PASS。所有後續Chat/Work/Codex接手指令完整放在單一、自足、可一鍵複製的code block。
```
