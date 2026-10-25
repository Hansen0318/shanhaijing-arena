# 赤鱬Heavy示意層真正撤除 — 2026-10-25

**ENGINEERING / NORMAL PAGES / PUBLIC COMPLETE；玩家遊戲核准PENDING，P3未COMPLETE。**

發布d346798cadf12efeada0f11e15f72c62a4d78eb6／tree aa874382636b8bda2bea0d803c7d367d37254ac7。正常Pages run40163995446/build121081184936/deploy121083539138 SUCCESS；獨立P1 40163995418與P2 40163995443 SUCCESS。

## 玩家截圖與真正根因
IMG_2864顯示已核准的赤鱬水浪與爆浪，同時仍有藍色膠囊/箭頭與琥珀方塊。它們是前38cdd8c新寫的ground-sigil-v1，不是正式水浪未載入。前次只換了示意外觀，沒有完成玩家要求，舊96案「幾何畫得出」PASS不可當退示意或玩家核准。依最新玩家直接改正要求，撤掉未核准向量來源/註冊/程式；由真正已載入的核准本體/蓄勢/飛行/命中圖片承接，不再另畫幾何。

## 修正
characterActionAssetKeys共用列出正式動作及全部effect/status貼圖；prepare與替代判斷使用同一清單。AssetPresenter.formalActionSource驗證descriptor成功解析、每張真圖片已載入且Phaser TextureManager仍存在。符合才讓TelegraphPresenter跳過該record整層示意；缺圖/無效/未知/僅有名稱/僅有descriptor/程序renderer不算正式來源，保留一份fallback。所有現有/未來角色共用，沒有P3 ID例外。

不是把示意重新畫成其他樣式。ground-sigil-v1及warningDescriptors已不在編譯後遊戲中；actual formalActionSource門檻在，見compiled-retirement.json。P4/P5未開發action、獨立持續場域與正式盾水膜/場地仍各自保留來源；固定褐色場地線不是Heavy特效。

## 真驗證
- 完整1229/1229、Build110素材/6378266編碼bytes PASS。新來源5案與原戰術4案9/9先RED→GREEN，舊style專用7案由新退示意5案取代，非刪除失敗案例。首輪2個歷史fixture失敗保存gzip，修改前原bytes快照補齊後負向篡改斷言仍有效。
- 新native96/built96：12正式action×circle/lane×敵我×normal/reduced。真正WebGL讀pixels，所有案新增示意像素=0、commandBuffer等於clear；實際移除水浪貼圖才恢復fallback，恢復真貼圖後撤掉fallback。
- 真tactical BattleSession赤鱬Heavy，蓄勢150ms／飛行500ms／命中705ms／收招1100ms各有native/built截圖。飛行時真threat仍在且mode=formal-action，正式heavyColumn可見，geometry為零；命中後heavyImpact可見且target真HP降低，回收正確。8張未改截圖與JSON在evidence/passive/browser/；這是隔離工程場景，其他技能冷卻固定99以防干擾，不是玩家手機驗收。
- 游息native32/built4、20招真execute/載入/可見/無雙疊/清理native+built、四主動各native32/built4、P1native16/built8與P2native4/built2全部PASS。
- 下載4份CI artifact均SHA256與ZIP CRC PASS，於隔離docs副本用本機相同產品來源重驗guard657/692/589全部PASS；舊收據/證據不覆寫。
- CI Pages artifact與local172檔bytes/SHA256一致。公開3個實際變更檔（index.html與兩個新JS）全部fresh下載相符；169個路徑/bytes/hash均不變，逐項綁定前次已fresh的公開及CI proof沿用。public172/172 PASS，完整來源與proof hash在public-fingerprints.json，不冒稱本次172全fresh。
- 與起點edf5309比較：全部approved art/收據/public PNG與src/combat逐bytes不變；沒有改命中範圍、threat ledger、治療、時序或數值。游息亮邊/雙魚與全部核准本體保持。

## 結果與下一步
遊戲：https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&vfx=d346798
玩家橫向進戰鬥後選赤鱬、用H重擊，看水浪下的膠囊/箭頭/方塊已退出。此版工程與部署完成，但未保存新Runtime acceptance、不標P3 COMPLETE、不開始下一角色；僅等玩家遊戲核准或實際新回饋。來源未變不重跑已通過測試/Build/Browser/Pages/public。原生單人、同分支PR1 open/unmerged，不委派/新branch/worktree/TD/main merge/重置存檔。每次接續先fetch最新GitHub。
