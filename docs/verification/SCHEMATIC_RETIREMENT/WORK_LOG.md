# 2026-10-25 — 玩家IMG_2864：正式水浪下仍有示意幾何，直接修正

起點remote edf530970e2e8e18d8291241827f05f0b51d2308；原分支/PR1 open-unmerged。先fetch/核對當前AGENTS/STATE/WORK_PROGRESS及最新玩家截圖，原生單人、不委派/新branch/worktree/TD/main merge/存檔。

## 根因與授權修正
玩家明確回報「妳沒有改…好像是heavy的圖像vfx…確認後直接改正」。前38cdd8c的實作只把舊框換成ground-sigil-v1的分段膠囊/三角/方塊，仍是正式水浪下的示意圖，未達玩家要求。舊工程PASS只證明那一版畫得出，不是退示意或玩家核准。本次最新指令修正該實作：撤掉這套未核准向量來源與註冊，正式動作/技能貼圖完整成功載入後，直接由已核准本體/蓄勢/飛行/命中圖承接視覺，不再額外畫幾何表示危險區。真threat ledger、範圍、時序及傷害邏輯保持。

## 實作
- characterActionAssetKeys共用提取真action的本體與所有effect/狀態圖；prepare與替代判斷同一來源清單。
- AssetPresenter.formalActionSource驗證可解析descriptor、每個真貼圖已載入且Phaser TextureManager中存在；不是僅看角色ID、asset名、descriptor存在或自訂箭頭renderer。缺任一來源/null/無效/未知時回傳null。
- TelegraphPresenter只對真action-assets來源跳過同record整個示意層（capsule/circle/中心線/箭頭/方塊）；沒有新畫另一套示意。缺來源留一份fallback；持續場域仍獨立保留。Arena按sourceId→真definition/category→loaded來源共用解析。
- 全部核准PNG/收據/尺度/赤鱬四主動/游息機制/P1P2/盾水膜/場地不改。

## 驗證
新五案先RED（red.tap）再GREEN；連同戰術預警既有四案9/9 PASS。涵蓋Heavy全時段零示意繪製指令、完整真貼圖與TextureManager存在檢查、逐一缺圖fallback、20招資料共用及持續場域/Pause/清理。首次完整1229案/1227PASS/2歷史hash fixture FAIL保存first-suite-failures.tap.gz；補最新修改前來源快照，原收據與篡改負向斷言不變，兩案單獨PASS。最新完整與Build以local-validation和CI為準。

真Browser改驗96案「正式圖已載入且新增幾何paintedPixels=0／commandBuffer等於clear」，實際缺水浪貼圖才恢復fallback；另新增真tactical BattleSession赤鱬Heavy蓄勢/飛行/命中/收招四個實際截圖，證明水浪與真damage存在、同幀geometry=0。不是另一組空場假效果圖。必須跑新來源正常CI/相容/Pages/public，舊96案畫出箭頭的PASS不可沿用。

目前未宣稱新真Browser/部署/玩家核准；P3未COMPLETE。唯一下一Gate為正常CI真圖與必要修復、正常Pages/CI-local-public，再呈交玩家。
