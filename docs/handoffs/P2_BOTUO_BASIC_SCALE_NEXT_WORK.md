# Mobile viewport repair deployed — phone and Basic size review pending

```text
【山海經聯盟 — 整頁比例修正已部署；手機驗收待確認】
公開逐位元核對因host proxy CONNECT逾時BLOCKED；CI Pages與local15files一致，publicVerification=false，不能寫公開fingerprint PASS。Actions部署成功不等於公開bytes已驗證，亦無理由重部署；連線恢復時可只補公開讀取。
GitHub唯一權威：Hansen0318/shanhaijing-arena，feat/m0-combat-core-20260927，PR1 open/unmerged；先確認最新remote。所有接手指令單一完整自足code block。最新checkpoint為包含本檔的文件commit；不要建替代分支或merge main。
先讀AGENTS/WORK_PROGRESS/STATE頂部及docs/verification/MOBILE_VIEWPORT_FIX.md、MOBILE_VIEWPORT/release/mobile-viewport.json、public-fingerprint.json，保護PROJECT_BOUNDARIES與既有流程。
玩家回報整頁放大裁切、無法遊戲，不是Basic尺寸核准。已獨立修正visualViewport scale與CSS layout座標不一致，並修正scroll Event誤開pageshow高度clamp。未更動角色/技能/存檔/圖資。source50f303db304f427ca80c1c9c4e0b0b101859b392已DEPLOYED：https://hansen0318.github.io/shanhaijing-arena/?v=50f303d 。Actions39202217431 build117897526482/deploy117898058327 SUCCESS，54/54+Build/81asset guard；local input4/4。Chromium/WebKit真實built-app6情境39截圖PASS；含縮放1.5/2/3、旋轉/重載/選單返回、zoom3真實選隊進戰鬥/畫布頭像a1/Pause/Exit/返回。不是實體iOS/FPS/全部觸控或Basic驗收。不要重跑無變動驗證、重部署或再放大角色。
NEXT只等玩家手機確認整頁選單完整、可進戰鬥及退出，再確認猼訑Basic從Idle/Move→攻擊→返回比例；兩項修正尚未PLAYER VERIFIED。收到明確回覆後以原話/版本/範圍記錄，不能把CI等同玩家驗收。若新缺陷，僅針對對應範圍調查。
Heavy製作暫停；HeavyF3已PLAYER APPROVED，receipt docs/art/approved/botuo/heavy/f3-v1/acceptance.json及master0049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206不動；不重審。P1 COMPLETE、一般Hit取消、普通傷害不中斷、合法控制/KO、250ms及Tier/16MiB+131072reserve保護。Basic先前身體校準22.5px與source/contact獨立世界尺寸保留。不要新Heavy姿勢/P3/main merge。
永久規則：整頁viewport缺陷與角色地標密度分開診斷；direct Arena fixture不是實際手機UI證明。改viewport要驗實際built入口路由、scale/offset/旋轉/重載、變換後canvas命中和body層modal，gate失敗不得部署。文件closure[skip ci]，docsHEAD比部署source新不代表要重部署。
```
