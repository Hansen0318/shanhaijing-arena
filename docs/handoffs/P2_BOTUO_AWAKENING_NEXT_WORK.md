# P2 Awakening — VFX/GIF approved; execution preflight next

```text
【山海經聯盟 — P2 猼訑 Awakening「鎮岳」視覺已核准／工程前檢與契約審核 NEXT】
Repository Hansen0318/shanhaijing-arena；唯一分支 feat/m0-combat-core-20260927；PR#1保持open/unmerged。GitHub唯一權威；先fetch最新remote，核對完整HEAD/branch/PR/tree/commits，不用舊PR快照回退。最新checkpoint是含本紀錄的feature commit；視覺核准來源e1cdefa22c99aceae149a0a854210da9941c36e9不是永遠最新。
先讀AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md與本文件，頂部最新有效核准優先。
已完成：P1 COMPLETE；P2 Idle/Move/KO/尺度/Basic/Heavy沿用核准；Special COMPLETE/PLAYER VERIFIED。鎮岳修正版F3與整組F1–F4均已核准，receipts docs/art/approved/botuo/awakening/{f3-v2,poses-v1}/acceptance.json。不得重畫或重問姿勢；poses receipt.sources內舊playerApproved:false不覆蓋整組status及玩家原文。禁key-pose-v1及extra-hoof草稿作reference。
新完成來源QA→安全包裝→獨立合成→完整GIF解碼，目錄docs/art/candidates/botuo/awakening/composite-review-v1/。先讀README、source-checkpoint.json、review-manifest.json、qa.json、independent-verification.json、visual-review.json、source-reference-hashes.json、SHA256SUMS.json。三份raw PNG與完整prompt未變，原hash/bytes已校對；80px VFX exact padding，四姿勢400x320透明等格，共同.126密度/接地family，未依高度/單一頭部fit。
實際檔：botuo-awakening-normal.gif、-slow.gif、-noFX.gif、-reduced.gif、-instant.gif、-air.gif、-T3-tactical.gif、-T3-instant.gif。全部同prefix botuo-awakening；正常4.4s、慢速13.2s、instant/air3s、T3各12s；每檔雙向。124解碼幀、量化像素timeline/全部時長、mirror、padding/隔格PASS。prepare_preview.py確定性組裝、verify_preview.py獨立檔案驗證。另有reduced-static-cue.png及明暗/Idle/同尺度技能比較/實際解碼QA板。
玩家現已回覆「這個我確認OK，你紀錄github流程進度規則」。視覺VFX/GIF Gate CLOSED/PLAYER APPROVED；receipt docs/art/approved/botuo/awakening/visual-v1/acceptance.json綁定來源e1cdefa22c99aceae149a0a854210da9941c36e9、實際內嵌normal GIF與七個連結GIF、靜態提示、三VFX原圖及manifest/reference hashes。不是每檔獨立播放／手機案例紀錄；不擴大為工程契約或Runtime核准。舊manifest/source-checkpoint/QA pending為歷史快照，不能覆蓋此新receipt，不要修改舊文件或重問、重製已核准素材。
第一未完成Gate：Runtime前檢→共用cast/action/VFX/status所有權與時序執行契約→保真packing／完整required集合容量方案→獨立玩家契約審核。未來若被要求接續，先完成具體可審核材料，再停待契約核准；不先Runtime／build／Browser／部署。此次核准回覆只要求記錄，未執行工程或另授權部署。先查找是否已有前檢，沿用未變證據，不因換Work重跑原16案例／Special檢查／GIF組裝解碼。只在實際缺陷或來源改變時修正受影響項目。
機制不變：T0 coefficient1.70、caster-locked radius2.2、CD14s、windup0；instant0ms直接F3，tacticalT0 900ms/T3 819ms；不能為播完F1/F2延遲傷害。對空僅施放表現、無假target burst/防護。T3 boyi.team只在實際傷害成立後post_cast、真正附近存活受益者；radius2.832、13.5%、3.75s。預覽actual a1/a2、a3 excluded，位置為示意。守群獨立5s到期，T3 self33.75%/ally20.25%，與Awakening取MAX不相加。GIF只能10ms，819/4569ms顯示820/4570ms(+1ms)，實際模型未改。不得新增命中/位移/震退/無敵/DoT或改CD/Tier/AI/targeting/控制。
沿用docs/verification/P2_AWAKENING_PREFLIGHT/{static-seed.json,mechanics.json,probe.mjs}既有16案例；來源hash已確認未變，未重跑。Special164/Browser/release/145CI/39公開證據與P1/P2驗收保護，不重跑、不重新部署。
已核准內容仍為美術重建預覽，不是遊戲錄影/Runtime/手機驗收。未做工程契約、Runtime、build、Browser、部署；五個歷史full-suite failures保留，不宣稱full-suite PASS。Shared Dynamic Asset Residency、16MiB cap、131072bytes reserve、全部required保持；既有45textures/16611224decoded/34920extra不是新容量通過。新master不直接載Runtime。普通Hit永久取消、普通傷害不中斷技能。
舊host阻擋未在新環境重現；已搜尋舊workspace無prepare_preview.py可回收，所以重建確定性組裝而未重畫素材。初始1個無關未追蹤Lushu暫存檔保留，不加入本次提交。
禁止merge main、替代分支、TD、P3、未授權Runtime/部署；docs/art-only用[skip ci]。更新WORK_PROGRESS/STATE/action/必要manifest/handoff後commit/push原feature。所有後續Chat/Work/Codex接手指令只能一個完整自足可一鍵複製code block。
```
