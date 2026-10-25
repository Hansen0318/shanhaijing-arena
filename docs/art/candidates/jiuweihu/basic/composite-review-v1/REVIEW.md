# 九尾狐 Basic「靈火」動作與獨立VFX：玩家審核

狀態：**PLAYER GIF REVIEW PENDING**。F3既有核准保持；這些新姿勢、FX與GIF尚未核准。全部是可重現的美術模擬，非遊戲錄影／真傷害／手機效能驗證。

先看 [normal](jiuweihu-basic-normal.gif)、[slow](jiuweihu-basic-slow.gif)、[noFX](jiuweihu-basic-noFX.gif)。各支均含右canonical與完整左右mirror，收勢後回既有靜態Idle。

| 情境 | GIF |
|---|---|
| 正常速度、出手＋命中 | [normal](jiuweihu-basic-normal.gif) |
| 三倍播放時間、邏輯時間保持 | [slow](jiuweihu-basic-slow.gif) |
| 純本體輪廓 | [noFX](jiuweihu-basic-noFX.gif) |
| 落空只有出手，無target裂花 | [miss](jiuweihu-basic-miss.gif) |
| 減少動態、短靜態提示後Idle | [reduced](jiuweihu-basic-reduced.gif) |
| T0–T3同尺度、不虛構額外Basic效果 | [four-Tier](jiuweihu-basic-four-tier.gif) |
| 獨立出手與target特效 | [VFX-only](jiuweihu-basic-vfx-only.gif) |
| 兩instance錯開施放與各自到期 | [multi-instance](jiuweihu-basic-multi-instance.gif) |

## 時序與素材

Basic兩模式真結算維持0ms。審核用Idle等待450ms後，0ms直接F3＋出手/命中；依序F3 140ms、F2 90ms、F1 90ms、F4 140ms，總460ms只是視覺跟隨/收勢。出手及命中同刻亮起、獨立位置/來源，沒有飛行物或新增必經windup；灰色十字僅為美術target定位。slow只延長播放，並不更改邏輯時點。T0–T3的Basic沒有額外核准火焰族，故使用同素材/尺度，遊戲中的傷害/射程/攻速差異留待Runtime。

F3原圖與核准收據不改；F1/F2/F4沿既有e287e158來源。全圖padding masters保留每個原RGBA像素含alpha=1邊緣；四格260×220，source等比.115，以腰飾/完整足底地標對齊共同ground190，不依尾部包圍框fit。Idle為原160格來源、相同地面。這是美術校準，真renderer的解剖/anchor核對在Runtime再做。不得把本表當Runtime尺寸或工程通過證據。

獨立hand-release原圖左向，確定性鏡像衍生右向；原圖不改。原生單人已檢視明暗底/縮小輪廓/完整右左與編碼後接觸圖；首次火焰root偏近臉，已改為左側24%根部接指尖並重跑全部487檢查。完整8GIF112幀逐時像素/時長/尺寸核對PASS。詳manifest.json、qa.json、各GIF.timeline.json、SHA256SUMS與prepare_preview.py。

## 停止點

只待玩家GIF核准。未改src/public/Collection、未Runtime/Build/Browser/Pages、未開始Heavy/P5。玩家核准後保存本次實際呈交hash收據，才接Basic Runtime及必要真驗證／正常發布／玩家遊戲核准；不能把「繼續」自行轉成未見成果核准。
