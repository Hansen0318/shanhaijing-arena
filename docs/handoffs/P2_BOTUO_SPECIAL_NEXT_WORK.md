# P2 Special — EXECUTION CONTRACT REVIEW / 未整合Runtime

```text
【角色任務】
接手Hansen0318/shanhaijing-arena，恢復P2猼訑Special「守群」執行契約審核Gate。先讀最新GitHub，避免重做前檢或已核准視覺。

【背景資訊】
GitHub唯一權威；唯一分支feat/m0-combat-core-20260927，PR#1維持open/unmerged。先fetch核對remote HEAD/branch/PR/working tree；9e685823c892843132b53c36ca897cdb625fc76c為本次前檢的恢復起點，不是永遠最新，前檢成果在後續含此指令的commit。
Special F3、四姿勢、VFX與五GIF視覺包已核准，receipt在docs/art/approved/botuo/special/{f3-v1,poses-v1,composite-v1}/acceptance.json；不重畫、不重問視覺Gate。P1 COMPLETE、P2 Idle/Move/Basic尺度CLOSED、Basic/KO/Heavy PLAYER VERIFIED。Heavy live acf454741757f58efa980fdcd03f028a472e87a3保持。

【具體指令】
1. 讀AGENTS.md、WORK_PROGRESS.md最新CURRENT HANDOFF POINTER、docs/STATE.md、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、DEVELOPMENT_ROADMAP、M5C_ART_ANIMATION_VFX、CHARACTER_ACTION_ART_WORKFLOW、M5C_P2_BOTUO_HEAVY_ACTION、M5C_P2_BOTUO_SPECIAL_ACTION及Special三份receipt。
2. 讀docs/verification/M5C_P2_BOTUO_SPECIAL_PREFLIGHT.md全文，docs/verification/P2_SPECIAL_PREFLIGHT/{source-reuse,current-required,current-descriptors,packing-checks,capacity,candidate-residency,landmarks,transition-measurements,review-status}.json及QA圖；候選docs/art/candidates/botuo/special/runtime-pack-v1/{README.md,packing-manifest.json,SHA256SUMS.json}。原source/prompt/QA/GIF仍在key-pose-v1/poses-v1/composite-review-v1，沿用原hash。
3. 當前完成：12機制來源hash相同，沿用32direct/8lifecycle/2AI/4paired-damage與Heavy既有136affected/部署/公開fingerprint/玩家證據。47舊inventory hash、6新與57舊logical frame RGBA反貼/雙向座標檢查；42key現況及45key候選各兩種載入次序，真cache/residency guards（decoder/upload double）0fail/0evict/cleanup0。沒有build/full suite/browser/phone或Runtime整合。
4. 提案守群utility gesture四張160ms可被下一合法技能/Move立即取代；reduced F3最多160ms；獨立activation320ms；持續圖跟真實source/target/status/Tier生命週期，actor root offset(0,-88)，不跟Heavy layout。可選presentationSource和事件觀察metadata解決source-ability ownership；generic資料驅動，沒有P2身份分支。戰鬥時序/機制差異為零。完整精確契約以該preflight文件§3為準。
5. 忠實候選：同200×200 logical cells、root(100,184)、scale200/72、origin(.5,.92)，完整保存核准review raster，不再降密度。32個舊key只提供零RGBA空白候選，不動正式source；P3/P4/P5已完成Move packs不重做。42原required全保留＋3新key＝45keys16562336bytes，＋131072reserve＝16693408/16777216，額外83808bytes。完整尺寸/集合/cache/upload/reservations見capacity/candidate-residency；無gutter需未來真Phaser native-trim取樣。候選不等於實際renderer或GPU證據。
6. 若沒有玩家針對此精確契約與packing-manifest的後續明確核准，只交付具體審核文件與QA並停止，不重跑已存前檢、不開始Runtime。若已有後續明確核准，先依最新GitHub receipt確認scope，綁文件/manifest SHA256與玩家原文，再接最小必要共用utility/action/status-provenance/reconciler與logical-region packing整合；不得把本handoff或舊視覺核准當作executable approval。部署仍須另外核對scope，不能直接部署。

【約束條件】
本次停止點是契約審核。T0 self25%4秒CD8、coef0/windup0；T1+真實單一存活隊友、立即生效/立即接ready技能與Move、MAX/refresh/expiry/source及recipient KO/離場/Pause/Restart/scene cleanup照既有語義。hit=true是utility，不是攻擊接觸。160ms不能變前搖/global CD/延後減傷/動作鎖。
Heavy A原Tier650ms戰術resolve及即時/落空0msF3、傷害/CD/range/AI/控制/命中/取消/FX不改。普通Hit CANCELLED，ordinary damage不打斷。身份/服裝/配色/角/護臂/尺度/接地/Anchor/鏡射保持，不攻擊放大或Move縮小。無全隊防護/吸收盾/無敵/嘲諷/傷害/AoE/假爆炸。
16MiB+131072reserve/Shared Dynamic Asset Residency保持，不排除required、不提高cap、不擅降清晰度；32個候選只是物理表示，不重做舊核准藝術。保留五個suite failures，不聲稱全suite PASS，不捏造device/FPS/GPU/逐檔玩家驗收。未改程式不重跑build/full suite/P1/Basic/Heavy，docs/art-only checkpoint用[skip ci]。
禁止main merge、替代分支、TD、P2 Awakening/P3。任何有意更動真實機制/時序或無法保持契約者先列差異回審。所有未來handoff維持單一完整自足可一鍵複製code block。
```
