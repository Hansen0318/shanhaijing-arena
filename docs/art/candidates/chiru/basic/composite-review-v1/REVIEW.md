# 赤鱬 Basic 水矢 — 單招動作＋VFX GIF 審核

狀態：F3 v2 已核准；其餘姿勢、VFX 與 GIF 待玩家審核。

- `chiru-basic-normal.gif`：正常速度，右向後接左向鏡像。
- `chiru-basic-slow.gif`：動作三倍慢速，Idle 停留不變。
- `chiru-basic-noFX.gif`：只看四張本體動作。
- `chiru-basic-miss.gif`：落空仍有水矢，沒有目標水花。
- `chiru-basic-reduced.gif`：降低閃光強度，無額外鏡頭或粒子運動。
- `poses-light-dark-QA.png`：核准Idle與F1–F4明暗底比對。

動作400ms=120/60/100/120ms；180ms進F3時水矢與命中水花同時出現，沒有慢速飛行。預覽的十字是目標示意，沒有模擬扣HP或宣稱真實命中；新Runtime尚未整合。右向canonical，整個世界一次鏡像；來源完全保留、僅等比縮放/位置正規化/透明合成。相同四動作縮放倍率.13，胸口/眼睛/尾部下緣/水環人工地標記錄於script及manifest；這不是實際Runtime anchor或手機驗證。

只核准本次展示的動作、獨立VFX與GIF；收到玩家明確核准才保存這些檔案精確hash收據，進Basic Runtime。不得啟動Heavy。此包無src/public/遊戲數值改動、無新部署。

重建：`python docs/art/candidates/chiru/basic/composite-review-v1/prepare_preview.py`（Pillow）。GIF逐幀解碼與量化像素/時序往返、RGBA/邊界/完整原圖保留、F3與Idle hash保護皆由腳本斷言；所有新圖由imagegen產生，prompts.json保留完整提示詞。
