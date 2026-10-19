# Basic size-fix release / player-review gate

```text
【山海經聯盟 — P2 Basic 比例修正接手】
所有後續接手指令只有一個完整、自足、可一鍵複製code block。GitHub唯一權威。
Repo Hansen0318/shanhaijing-arena；branch feat/m0-combat-core-20260927；PR1 open/unmerged。先fetch最新remote/確認HEAD/PR/status，不建取代分支、不merge main、不引入TD。checkpoint是包含本檔的feature commit，不假設永遠最新。
讀AGENTS.md、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、WORK_PROGRESS/STATE頂部、M5C_P2_BOTUO_BASIC_ACTION、CHARACTER_ACTION_ART_WORKFLOW、docs/verification/M5C_P2_BOTUO_BASIC_BODY_SCALE_FIX.md及P2_BASIC_BODY_SCALE/measurement.json與logs。
玩家已核准Heavy F3，immutable receipt docs/art/approved/botuo/heavy/f3-v1/acceptance.json；原圖0049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206不動。核准/優先修Basic的remote紀錄07a51545853796a0cf69e52cecfd1bf835d99344。舊candidate本地d31e055內容已包含於07a5154的相同tree，d31e055不是最新remote checkpoint。禁止重審F3或先做Heavy後續姿勢。
Basic新缺陷：原動作頭部20px未對齊Idle22.5px。已用共用opt-in calibrateActionBody與P2資料校準為1.125display px/source px；腳底−16.2px、support35與左右面向不變。角色frame177.75x160.875，圖片仍158x143不重畫、不加貼圖；獨立source/contact世界尺寸位置、250ms真實HP/數字/FX事件/CD/Tier全不變。P1/P3/P4/P5 deep-equal；P2Idle/Move/KO/stats不變。
已完成RED4/4→GREEN4/4；直接受影響67/67、build/guard81/81；6cold/warm/Restart、39required keys、16630060bytes/16MiB+131072reserve、zero cleanup。比較圖是descriptor geometry，不是遊戲截圖。禁止把舊220/220或舊browser/mobile驗收冒充新修正結果，不重跑整套P1或改核准美術。
尚未做新Chromium/Phaser呈現、部署、公開fingerprint或玩家比例確認。主機Chromium executable不存在，scripts/checkBotuoBasicBrowser.mjs已加尺寸/landmark assertions但未執行。當前公開版仍db451cd。下一個Gate是明確scoped release授權後，在既有CI跑更新checker/必要受影響測試/build，部署feature并核對公開指紋，交玩家只確認比例與Idle/Move返回。沒有新release授權時不自行deploy。
優先完成此比例缺陷確認後，才接Heavy剩餘姿勢→獨立VFX/GIF→後續各Gate。P1 COMPLETE、Basic舊核准其餘範圍、普通Hit CANCELLED、所有原圖receipt與16MiB/reserve繼續保護。未來每招記錄同一角色穩定身體地標/實際顯示density/腳底/mirror/VFX座標，不用frame大小或蹲姿總高度代替身體比例。檢查證據/文件checkpoint[skip ci]，commit+push既有分支並核對remote；不因docs HEAD較新就部署。
```
