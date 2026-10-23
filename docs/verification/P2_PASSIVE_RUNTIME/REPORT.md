# 厚甲 — LOCAL ENGINEERING PASS / NORMAL RELEASE NEXT / PLAYER PENDING

2026-10-23 Asia/Taipei。恢復基線2f855f7721d787c43636b8f34fd633db345e71c2，原生單人，同feature分支/PR#1open-unmerged。玩家直接實作授權見authorization.json與decision。工程checkpoint d3604926385e1f57bfd001f11f145bb6feb6df6f已保存，後續本提交為新驗證/發布候選；最終完整HEAD/tree由含本檔commit取得。

## 已實作

- 通用spatial-pressure/mitigation資料，不看角色ID或名稱。距敵≤2.2，或距隊友≤2.4且隊友距敵≤2.2，自身20/30/40/50%減傷、4秒/CD8秒。控制中不新觸發，離開保留、到期/冷卻獨立，敵我與手控AI同路徑。
- MAX共存，不加算、不覆寫守群/鎮岳狀態。T0重疊守群只25%；高Tier甲蓋過較弱自身減傷，隊友保護不動。事件排序保留同時刻傷害先於新甲，不回溯，KO/end/restart/destroy清理。
- 真status snapshot驅動無文字琥珀護甲弧片，1/2/3/4組，只有有效最高減傷才顯示。靜態/reduced-motion一致；沒有被動文字牌/HUD/數字/連線，不改actor尺寸/anchor/ground/mirror。Collection已實裝與完整Tier說明。
- 未來角色必須完整定義與實際戰鬥效果/獨立Tier/清理/來源驗證/發布/玩家驗收，才算完成。真Session將角色改名future-guardian、被動改名future-guardian.shell仍真扣HP減20%，證明資料opt-in可重用；不表示所有尚未設計的未來效果已支援。

## 新來源實際驗證

| 驗證 | 結果 |
|---|---|
| 全套 npm test | 1065/1065 PASS，full-final.log.gz |
| npm run build | PASS，build-final.log.gz；149個built檔案 |
| 厚甲真Chromium native | 16案 PASS：四Tier×雙陣營×normal/reduced |
| 厚甲實際built手機入口 | 8案 PASS：四Tier×normal/reduced，852×393、原app route及joystick callback |
| P1新來源相容 | native16 / built8 PASS；數值35/50/65/80%保持，3秒/CD6秒/95%額度不動 |
| P2既有鎮岳/守群受影響 | native4/built2 PASS，真傷害/狀態/instant/tactical/MAX/收據與素材保持 |
| P2原生多標記尺度 | 2組×5狀態=10案 PASS，body/ground/鏡射來源無改 |
| 新來源guard | 599個來源/報告/截圖/指令雜湊綁定PASS；真src暫改負向拒絕、恢復後PASS |
| 靜態/diff | 單人分別自審、git diff --check PASS；無獨立reviewer、無新main merge |

native.json/built-entry.json包含實際baselineDamage、actualDamage、真status起止/CD、重觸發時間、plate真存在/蓋過隱藏/恢復、真HP、Pause/KO/end/restart及畫面截圖。正常減傷比0.8/0.7/0.6/0.5。源狀態各Tier真時間0→4、ready8。geometryBefore/After均保持同狀態Display144×144/origin(.5,.9875)；不是拿Move外框與Idle混比。實際native T3正常截圖已開啟目視：存活站姿、側邊琥珀弧片、HP條及既有HUD可見、沒有被動文字；角色與靠近敵人局部重疊是fixture接敵位置，不當成完全獨立輪廓校準。

## 失敗與遷移，完整保留

- full-first.log.gz：1060/1053/7fail。metadata2處仍P2false；windup/staged隔離fixture3案受到真減傷/步進影響；tierStatus空status假設與新甲衝突；tactical精確浮點6.100000000000003/6.1。原傷害/排序/時序/空狀態斷言保留，舊單位fixture排除新P2被動，新組合由專測驗證；tactical只改1e-9容差。最新1065全PASS，不把初始失敗刪除或豁免。
- attempt1/2/3及browser-native*.log.gz：尺度觀測fixture將重新定位後保留的Move狀態與Idle比較；重複同時刻paint依原Pause契約不重設stride。最後新session fixture清空僅測試用的facings/states，避免前場Move/KO觀測殘留；產品素材、比例與presenter演算法未改。重取最終16/8真報告與截圖，未放寬幾何斷言。最後時間戳記版由真status取得duration/CD/segments，而非回填常數。
- P1 Browser僅更新Restart觀測：空間型不需要distance專有progressDistance，仍要求所有被動readyAt0且未active；舊文字/速度/到期等斷言保持。這是測試schema遷移，不改P1效果。

## 正常發布與玩家Gate

尚待原feature分支正常完整CI/Build/599guard/Pages與公開149項核對。m0-pages-preview改用新verifyBotuoPassiveRelease，不繞過Test/Build/部署；舊P1收據/舊guard/發布證據凍結保留，不能套用新來源。驗證workflow使用相同新guard精確沿用本次證據，來源不符則重新真Browser；不因換Work重跑來源未變的測試。

發布後只請玩家檢查厚甲接敵/護甲辨識/耐打感與Tier差異。此處沒有physical phone、玩家體感或P2整角色COMPLETE宣稱。P1 COMPLETE、P2四招/全部核准美術保持；普通Hit永久取消；P2被動PLAYER VERIFIED前P3技能BLOCKED。全局素材政策不變。
