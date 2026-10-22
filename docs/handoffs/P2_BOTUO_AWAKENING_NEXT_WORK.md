# P2 鎮岳 — Runtime 已安裝／驗證與發布 Gate 尚未完成

```text
【山海經聯盟 — P2 猼訑 Awakening「鎮岳」無縫接手】
[角色任務]
從最新GitHub接續鎮岳工程，取得真native/built/mobile驗證與正常CI證據；驗證支持發布才部署Pages供玩家手機審核。不重問已核准契約，不把準備好的browser腳本當PASS。遇實際阻擋保存證據停該Gate。

[背景資訊]
最新工程：full1014/1014、Build及native scale10case/50多標記PASS（run39778996130），同源前次native4/built2沿用。完整release-evidence.json綁258源/報告hash，guard本機PASS；normal preflight Test/Build PASS，缺receipt時正常阻擋Pages。接續最新正常發布CI/Pages與公開指紋，不重跑源未變Browser/已遷移25項；手機仍PENDING。CONTINUATION.md頂部比下方歷史狀態新；最新containing checkpoint/Actions優先。
玩家已再授權「確認進度紀錄後繼續做到部署」。最新continuation/CONTINUATION.md記錄25既有失敗逐項來源重建後遷移，本機full1014/1014+Build PASS；Runtime/原圖未改，所以前次Browser證據沿用。新增p2-awakening-scale純校準workflow待取得多標記native結果，normal Pages在新來源證據guard檢查前仍完整npm test、不繞過；缺release-evidence.json會阻擋，不等於新Runtime失敗。完成校準/receipt後才正常CI發布及公開指紋。下面舊25fail狀態是歷史；不要重做已完成遷移，先核對最新Actions及containing commit。
最新遠端測試HEAD06585e8c2ef7a7b0adc6fc5fe87f3ab11091bf2c/tree16eb15394ff45b77cb8210a5abba0b08ca08afd2；containing docs checkpoint可能更新HEAD但不改tested Runtime。正常CI#1094/run39726905249完成FAIL，1009/984/25、25名稱與本機一致、未部署。真Browser run39726905423 SUCCESS：native4/built-mobile2/8雙向RGBA採樣PASS，artifact12402494599下載SHA2565eeddb2e197b22be9b998a8b334bdae83ba71dac616cdf089edc1cb1177d0e58；CIlogs/JSON/截圖已保存。下方舊workflow待跑/本機無Browser描述僅指本機，已由此遠端證據取代。不要重跑源未變Browser。Idle多身體/配件native比例標記校準尚未完成，完整suite25失敗仍是發布阻擋；不可說PLAYER VERIFIED或提供舊URL假稱鎮岳已部署。
Repo Hansen0318/shanhaijing-arena，唯一branch feat/m0-combat-core-20260927；PR#1 open/unmerged。GitHub唯一權威，先fetch核對完整HEAD/tree/branch/PR/working tree/commits。base42880e7eb1b9fe668bcbc4362817ff4eaed06e04僅定位，最新containing checkpoint優先。
先讀AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、docs/verification/M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md、docs/verification/P2_AWAKENING_PREFLIGHT/executable-acceptance.json、docs/superpowers/plans/2026-10-22-p2-awakening-runtime.md、docs/verification/P2_AWAKENING_RUNTIME/{REPORT.md,result.json,packing.json}。
玩家「要接觸全部16mib限制，並紀錄，繼續，我確認妳繼續」已核准所呈觀測/保真安裝契約SHA256 de03b507cbea609da767c9518530c921925a349f9c27a4dde8e55f9ca522324d並要求連cache預設16MiB閒置保留target取消；receipt executable-acceptance.json。全局規格/計畫先前已核准，別重開Gate。現在cache maxBytes null、無總decoded/required數量/reserve拒絕；64僅未使用cache entry回收，scene12MiB僅回收未pin。單檔4MiB/2048/4194304、兩下載、完整required/ready、實際失敗與destroy保留。赤鱬KO十一片superseded，不實作。
鎮岳4新source-exactPNG已安裝，49required/18,336,992 decoded。原400×320 cell真GROUND274，crop(100,80)後root(100,194)/origin(.5,.97)，修正舊提案184而未改原圖。共用area-observed metadata攜action/epoch/實際正damage victims/真boyi.team來源，無角色ID例外。instant0直接F3，tacticalT0 900/T3 819；T3 radius2.832/13.5%/3.75s、守群獨立MAX；T0 coefficient1.70/radius2.2/CD14/windup0不改。普通Hit永久取消。
最新affected119/119 PASS；full1009/984pass/25fail(exit1)，Build91assetguard PASS。先前993/965/28到25，來自明示遷移3項過時required容量/inventory斷言，非舊美術全通過。25項名稱/原因/TAP/checksum及RED保存REPORT/result；SIGKILL原因未知。保留最初986/957/29，不用歷史五失敗代替；禁止改數字/skip ci/bounded workflow繞過normal full-suite發布Gate。
本機無Chromium，standard install invalid/truncatedZIP證據在先前global報告。新.github/workflows/p2-awakening-verification.yml只做同feature分支驗證：真Chromium執行scripts/checkBotuoAwakeningBrowser.mjs和--built，產物p2-awakening-browser-evidence；不部署、不替代normal CI。實際Actions狀態以最新remote為準。
P1 COMPLETE/P2Idle/Move/KO/Basic/Heavy與Special PLAYER VERIFIED保護。鎮岳F3/F1–F4/三VFX八GIFreceipt docs/art/approved/botuo/awakening/{f3-v2,poses-v1,visual-v1}/acceptance.json；來源/manifest/prompt/GIF docs/art/candidates/botuo/awakening/composite-review-v1/。tracked核准來源與舊public diff空；GIF非Runtime/手機證據。

[具體指令]
1. 核對最新remote/Actions後沿用已有證據。Native single-agent，不開子代理。不重跑無關Special164/歷史Browser/部署/公開比對。舊16機制probe有sourcehash約束，源改後不冒稱覆蓋新程式；新9真session案例已驗snapshot parity/timing/air/目標逃離新進/KO/MAX/獨立到期。
2. 取得真Browser/native/built/mobile結果，失敗先定位，不降低採樣閾值。核對RGBA/dimensions/ground/mirror、Phaser native採樣、Idle多個身體/裝備標記與一致密度；packing非此驗收。覆蓋真cast/damage/status、兩面/reduced/Pause/Move/old resolve/new action/KO/clear epoch/restart/destroy。腳本未執行不能寫PASS。
3. 本次回歸要修正；25既有失敗逐項保留對照。必要遷移須獨立機制/像素證據，不暗改為PASS。normal CI full-suite仍發布Gate，verification工作不是旁路。若阻擋，保存HEAD/tree/Actions/log原因並停Gate。
4. 驗證支持發布才依玩家既有部署意圖於同feature分支Pages發布，核對Actions/公開指紋，給實際URL等待手機審核。未實測不PLAYER VERIFIED，不把舊網站說成已含鎮岳。
5. 每完整切片更新WORK_PROGRESS/STATE/AGENTS/鎮岳spec/report/handoff，commit/push同分支；runtime正常CI，docs/art-only skip ci。回報完整HEAD/tree/PR/測試/部署/剩餘Gate。

[約束條件]
禁止merge main/替代分支/TD/P3/重畫重問核准美術。保護P1/P2尺度/anchor/ground/mirror/master/receipt/GIF。歷史指定.F1-initiation-master.png.cC3cw2與.target-impact-padded-v1.png.JS8JIB不加不刪；本機另有docs/art/candidates/lushu/awakening/vfx-review-v1/.C-pair-raw.png.0ssrYD及docs/art/candidates/lushu/awakening/composite-review-v1/.lushu-awakening-character-only.gif.5SQmfQ亦保留排除。所有後續Chat/Work/Codex接手指令完整置於單一自足可一鍵複製code block。
```
