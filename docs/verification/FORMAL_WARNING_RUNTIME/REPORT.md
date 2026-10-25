# 正式預警替換 — 發布報告（2026-10-25）

狀態：ENGINEERING / NORMAL PAGES COMPLETE；玩家遊戲驗收PENDING，P3未COMPLETE。

發布來源38cdd8c607a74f304b66dc31b9b983f443048bc5；tree baabc4421d7148371c3443e90f2cc5b9c2b68038。正常Pages run40160079507／build121069659769／deploy121072012132全部SUCCESS。獨立P1 run40160079501、P2 run40160079436均SUCCESS。

## 實際修改
TelegraphPresenter原本沒有正式warning來源，因此cast/contact成功也仍留下藍橘膠囊線框。現按sourceId→真角色資料→category解析獨立ground-sigil-v1向量來源：鹿蜀風紋、猼訑岩紋、赤鱬水紋。完整真circle/lane capsule含兩端先在arena取樣再投影；危險範圍底色、分段亮邊、敵我色與共用impact clock由正式預警承接。成功來源只畫一份，舊矩形／端點圓框／中心線退出；缺失／無效／未知renderer／不支援shape／來源例外保留一份fallback。P4/P5尚無正式warning、獨立持續場域與盾水膜/固定場地不誤刪。

本次向量樣式是實作選擇，未假稱玩家核准新樣式；沒有重生核准PNG或建立玩家Runtime acceptance。所有approved art/收據、公用PNG及戰鬥邏輯與恢復起點完全相同，見protected-sources.json。

## 驗證
- 完整1231/1231 PASS、Build110素材/6378266編碼bytes PASS。
- 新預警native96／built96：12明確來源×circle/lane×敵我×normal/reduced，實際WebGL readPixels逐案有像素差異（最少7165 pixels）、clock變化、清理；缺來源fallback保留。六區同屏圖在evidence/passive/browser/；是明示工程比較，非實機/玩家遊戲核准。
- 游息native32/built4 PASS；包含受益者當前Move/Action亮邊、魚印前景、四Tier/左右/敵我/normal-reduced/自他療/zero、多instance/到期/KO/end/Restart/destroy。
- 20招真施放／載入／可見正式或fallback／無雙疊／清理矩陣，native與built均PASS；12招有正式動作、8招fallback。
- Basic/Heavy/Special/Awakening各native32/built4 PASS；P1native16/built8、P2native4/built2 PASS。
- 三組來源guard 659/694/585 PASS，下載CI artifacts後於隔離docs副本以本機相同src/public/scripts/tests重新驗證；原歷史收據與證據沒有被覆寫。4份artifact SHA256與ZIP CRC全部PASS，詳artifacts.json。
- CI Pages tar與本機172檔bytes/SHA256完全相符；公開172檔全部fresh下載亦逐檔相符。不是沿用舊發布fingerprint。

## 實際失敗與修復
首輪新增測試RED→GREEN保留red.tap。完整suite初輪2個歷史hash fixture失敗，原stdout壓縮存first-suite-failures.tap.gz；歷史重建改用原bytes快照，不放寬原收據/篡改負向斷言。發布前自審新增glyph起點超界測試真RED，再縮入真邊界GREEN，見glyph-red.tap/glyph-green.tap。原bb0fc51/run40159904514由新來源取代而cancelled，不拿它當最終證據。本機Chromium壞ZIP失敗保留，真Browser由正常CI完成。

## 下一步
遊戲：https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&vfx=38cdd8c
橫向→HEAL TEST→Ally Tier T3→START，觀察游息真受益者薄荷綠亮邊／亮白雙魚，及鹿蜀／猼訑／赤鱬的正式預警；Restart/T0比較。未開發P4/P5仍是必要fallback，不能誤報已全數刪光。玩家核准後才建立精確Runtime收據與P3結案；不開始下一角色，不重跑來源未變的本次工程／部署。原生單人，同分支PR1 open/unmerged，不委派/新branch/worktree/TD/main merge/重置存檔。下一次仍先fetch最新GitHub。
