# 赤鱬 Special「回瀾」— 動作／獨立VFX／GIF審核

**F3 v3 PLAYER APPROVED；新F1/F2/F4、VFX與GIF PLAYER REVIEW PENDING。**

本頁全部為美術模擬，不是遊戲錄影、Runtime事件或手機實測。未修改產品、未部署、未開始Awakening／Passive。

## 請先看

- [正常速度：正治療](chiru-special-normal.gif)
- [三倍慢速](chiru-special-slow.gif)
- [只有本體動作／無獨立FX](chiru-special-noFX.gif)
- [Heavy與Special等尺度、同施法起點對照](special-vs-heavy.gif)
- [Heavy與Special無FX動作對照](special-vs-heavy-noFX.gif)
- [各招自身高峰對照：Heavy700ms／Special400ms](comparison-own-peaks.png)

## 完整預覽

| 預覽 | 內容 |
|---|---|
| [滿血零治療](chiru-special-zero-heal.gif) | 施法水環仍出現，無受益者泉花，amount=0。 |
| [左向mirror](chiru-special-left-mirror.gif) | 整個場景鏡像；配件/施法水環/實際受益者一起鏡像。 |
| [Idle返回](chiru-special-idle-return.gif) | 760ms回原核准Idle，水環/泉花清除；延長Idle停留方便核對。 |
| [Reduced](chiru-special-reduced.gif) | 固定水環與泉花，保持主體不透明；取消擴張抬升，最後80ms有限淡出。 |
| [390px小圖](chiru-special-phone-390.gif) | 約48px角色高度的靜態顯示尺度，非實體手機證據。 |
| [獨立VFX](chiru-special-fx-only.gif) | 隱藏兩個角色，分開看caster水環與recipient泉花。 |

## 動作與素材

F1低位單手內收→F2屈肘向上托水→F3核准高托／低展→F4單臂下收→原核准Idle。200／120／200／240ms，320ms進入F3。與Basic水平單手前射、Heavy雙手推環區別；未採用F2-attempt1（太接近F3），但保留原圖與prompt歷史。

本體保持原有小型持水focus；完整VFX是另外的透明點陣PNG，沒有烘入角色。施法直立內收抬升水環、真受益者下緣恢復泉花，中央留空保持頭部可讀。Special的250px直立施法環與310px泉花作為本次場面候選；最終動作/效果層級由玩家判定，未冒稱已通過遊戲觀察。

正治療示例：T0，caster900/1000、recipient B400/1000；320ms示範B恢復250到650/1000，泉花只附著B。滿血示例兩者1000/1000，真amount=0、只有caster嘗試水環。本頁不重做Runtime選取測試、不宣稱已實作320ms重選或新治療公式。完整T0–T3核准契約仍見spec及Special WORK_LOG。

## 尺度與QA

- [本體明暗底](poses-light-dark-QA.png)／[獨立FX明暗底](fx-light-dark-QA.png)／[合成明暗底](composite-light-dark-QA.png)。
- 角色固定320×260 RGBA cell，chestX158／hoverY203；四張相等cell與strip反貼、雙mirror與完整來源像素padding反貼通過。
- F3沿用核准原圖與.13審核倍率，無重繪、變形或重新著色。新生成姿勢的頭冠原生像素跨度比F3大，依頭／軀幹地標等比正規化（有效倍率F1 .112、F2 .108、F3 .13、F4 .12；原圖頭冠審核跨度約64–66px）。不能按最高水環、整張畫布或全身高度fit而放大角色；各張只用單一等比縮放，無局部變形。完整地標／轉換見manifest。
- 原圖含到原生邊緣的微弱alpha；alpha>16可見輪廓均在原生邊界內。全部RGBA像素保留，新增128px padding，不刪角色顏色或假裝原圖已滿足padding。
- 原圖、F3收據、prompts、各hash、1510×1510本體padding masters、獨立FXpadding masters、每GIF時序與重建腳本齊備。PNG verify/full load、RGBA／透明邊界、11GIF完整解碼與逐邏輯時段像素／時長比對通過。這是作者必要美術QA，不等於玩家核准。
- Heavy對照使用既有核准姿勢／獨立FX與後續清晰版alpha1／命中120ms保持規則做美術重建，原檔未改；不是遊戲畫面。GIF用共同施法起點；另外提供各招自身高峰靜圖避免只比不同phase。

重建：`python docs/art/candidates/chiru/special/composite-review-v1/prepare_preview.py`。所需Python/Pillow，不啟動產品。`manifest.json`與`checksums.json`記錄來源、輸出、時序、限制。

## 停止條件

現在只呈交本招GIF，等待玩家明確核准或修正。沒有新GIF acceptance、不整合Special Runtime、不部署、不開始下一招。P1/P2、Basic/Heavy及全部approved masters/收據保持；原分支、PR#1open/unmerged、單人、不新branch/worktree、不委派/TD/main merge。無產品變更，不重跑suite/Build/Browser/Pages。
