# P3 赤鱬 Passive 游息 — Runtime／Pages 工程完成

狀態：工程／正常發布 PASS；玩家遊戲驗收 PENDING。未建立 Runtime 玩家 acceptance，P3 整角仍未結案。

- Release：b414e9f079a985e4bf23283ffa5067abf5af9ac3
- 正常 Pages：[40105519923](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/40105519923)，build120906364692／deploy120909116317 SUCCESS。
- 遊戲：https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&passive=b414e9f

## 實作
共用資料 opt-in rear-support → instant-heal，無 P3 ID 分支。最近存活敵人≥2、固定4.2內同隊含自己HP≤60%、最低HP/maxHp及穩定instanceId；當前maxHp×8/12/16/20%，缺血封頂。正amount才真事件／獨立8秒CD／受益者token，不吃主動modifier、不暴擊／復活／循環。傷害／KO→主動→被動重檢，含區間起點；各instance獨立、不排隊補發。

核准PNG無損衍生四Tier貼圖（合計69129 encoded bytes／512000 decoded bytes），保留同尺度雙魚與1/2/3/4組紋、650ms內收／reduced靜態淡出。只附真受益者；受益者KO／casterKO／到期／end／Restart／destroy清理，已治療不回滾；無持續治療或減傷。沿用正式Idle、尺度、懸浮下緣及左右mirror；沒有新增F1–F4、被動文字牌或連線。所有權掛既有required／兩下載／逐檔安全及回收機制。

Collection為已實作純玩法；T2 chiru.rear-heal 顯示名清流，ID／條件／幅度不變，與獨立游息清楚區分。842份原始候選／核准美術與收據bytes未變；P1/P2/P3四主動玩法保持。

## 真驗證

| 項目 | 相符來源結果 |
|---|---|
| 全套 Node tests | 1221/1221 PASS；含匿名資料、四Tier／敵我／多instance、距離／HP門檻、選人、當前maxHp、正零治療／CD、同刻KO與主動先結算、控制及生命週期 |
| Build／素材guard | PASS；110素材／6391136 encoded bytes |
| 游息 true native／built | 32／4 PASS：核准PNG、左右、normal/reduced、同尺度Idle、他療／自療／zero、Pause、650ms、兩端KO、end／Restart／重複destroy |
| Basic／Heavy清晰版／Special／Awakening | 各native32／built4 current-source PASS |
| 主流程P1／P2相容 | P1 native16／built8，P2 native4／built2 PASS |
| 獨立完整P1/P2被動／Collection相容 | workflow40105520061 SUCCESS，九份報告PASS；原始ZIP hash／CRC已核對 |
| 本機重驗來源guard | Special/Basic/Heavy650、Awakening/P1/P2685、Passive574 PASS |
| CI／當前Build／公開網站 | 168/168逐bytes及SHA256完全一致；公開168全部fresh HTTP重新下載 |

舊主動測試透過test utility明確隔離新增被動，原數值／動作斷言不變；另有真Session共存與同刻排序測試。舊收據guard在測試暫存目錄恢復原bytes，不修改歷史收據。前幾輪真失敗及其根因／修正保存在failures/與WORK_LOG。由於共用產品來源改變，四主動／P1／P2已取得新證據；沒有用舊GIF／舊來源冒充。後續純文件保存使用[skip ci]。

來源guard以唯讀artifact staging root重驗；新相容報告保存在本招compatibility/，舊核准驗證路徑原封保持。全部artifact ZIP hash／CRC PASS。自審依玩家原生單人限制執行，未委派；重要問題均經RED→GREEN修正，無未解或延後項。未聲稱實體iPhone／FPS或玩家遊戲核准。

## 玩家最小測試
1. 手機橫向開啟上述隔離Lab。選 HEAL TEST，Ally Tier 設 T3，按 START。
2. 不按主動技能，觀察受傷隊友自動回血與雙魚／四組回流紋，短暫後散去。
3. Restart，再以 T0 比較一組紋與較少回血；確認 Pause／重開後沒有殘留。

唯一下一Gate：玩家遊戲核准；未收到前不標P3 COMPLETE、不建立Runtime acceptance、不開始下一角色。
