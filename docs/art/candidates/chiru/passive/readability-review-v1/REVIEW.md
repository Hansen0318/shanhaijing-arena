# 游息可讀性修正版：薄荷綠亮邊＋亮白雙魚

**待玩家核准本次修正版視覺/GIF。全部為腳本美術模擬，並非Runtime錄影或實機證據；尚未整合／部署。**

優先看前3項。混戰比較上方原版、下方修正版；兩個852×393模擬視窗保留相同角色、位置、藍色水系特效、尺度與背景。第二位前線猼訑是唯一受益者，後排赤鱬沒有假標記。薄荷綠只畫角色外緣，不全身染色；雙魚亮白，維持青綠水感。魚印改前景層以避免被本體遮住，仍在預警與HP之下。

|預覽|檢視項目|
|---|---|
|[手機混戰原版／修正版](crowded-comparison.gif)|同尺度、相同背景下的辨識差異|
|[四Tier normal](tiers-normal.gif)|T0–T3同尺度1／2／3／4組短紋、650ms內收淡出|
|[四Tier reduced](tiers-reduced.gif)|原位靜態紋片，只淡出|
|[手機混戰 reduced 對照](crowded-reduced.gif)|相同場景的reduced呈現|
|[雙魚與短紋單獨檢視](vfx-only.gif)|僅此頁放大檢查魚形，四Tier仍同倍率|
|[左右與Idle](directions-idle.gif)|右canonical、左精確mirror，保持原Idle|
|[他人受益](other-recipient.gif)|標記只在隊友B，caster A無標記|
|[自療／零治療](self-zero.gif)|自身正治療有印，zero無印|
|[受益者KO](recipient-ko.gif)|腳本模擬附著立即清理|
|[caster KO](caster-ko.gif)|腳本模擬擁有者殘留清理|
|[end／Restart／destroy／650ms](lifecycle.gif)|腳本模擬退場，包含重複destroy示例|

靜態入口：[同尺度對照](crowded-comparison.png)。normal時間線：400ms開始（age0），600ms開始內收，1050ms（age650）完全清除；單次示例1800ms循環。reduced完全不平移／縮放，只改alpha。每輪是一個正治療美術示例，不代表持續治療、持續盾或額外tick。

## 來源與製作

原`style-v2`雙魚及1–4組短紋，沿PNG確定性色映射；不覆寫任何approved master／舊收據，不重生、不從GIF擷取。新PNG alpha與原圖逐byte相同；角色原像素、尺寸、anchor保持。`idle-rim-reference-only.png`僅是顯示方案參考，不能當作Runtime固定Idle替身；Runtime須沿真受益者當前可見frame產生輪廓，含Move／Action／mirror。

重建：先執行repo root下的`node docs/verification/P3_PASSIVE_RUNTIME/readability-revision/audit.mjs`，再執行本目錄`prepare_review.py`與`verify_review.py`。來源、hash、規格、時間線見`manifest.json`、`timeline.json`、`verification.json`與`encoded-verification.json`。最後`SHA256SUMS.json`涵蓋整個審核包。

原生單人自審，沒有委派或獨立review。11GIF／119編碼幀完整解碼、絕對時間像素核對與313檢查通過；已檢視onset、600ms、650ms與混戰對照。這些檢查證明審核素材完整及腳本顯示一致，不證明遊戲治療、Pause、CD或清理已通過新Runtime。

## 下一步

等待玩家明確核准本次修正版視覺/GIF。核准後才整合最小Runtime差異、完成正式來源成功解析後退示意與缺來源fallback、必要真native/built／相容／手機Collection驗證、正常CI/Pages及CI-local-public指紋。部署已授權，不另詢部署意願；部署後仍需玩家實際遊戲核准，P3未COMPLETE。
