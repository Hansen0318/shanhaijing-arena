# 赤鱬 Passive「游息」GIF 審核 v1

**PLAYER GIF REVIEW PENDING。全部為腳本美術模擬，非遊戲錄影、真 heal/CD/生命週期工程 PASS。**

STYLE 已核准，精確來源及收據 hash 見 manifest.json；原圖、四Tier紋片、Idle bytes 均不改。

| GIF | 審核內容 |
|---|---|
| [tiers-normal.gif](tiers-normal.gif) | T0–T3 同尺度 1／2／3／4 組，650ms內收消散 |
| [tiers-reduced.gif](tiers-reduced.gif) | 同Tier原位靜態紋片，僅淡出 |
| [vfx-only.gif](vfx-only.gif) | 獨立特效放大檢視，四Tier等倍率；非角色放大 |
| [directions-idle.gif](directions-idle.gif) | 右canonical／左精確mirror，固定核准Idle與到期復原 |
| [other-recipient.gif](other-recipient.gif) | A施法者無印，B同隊不同instance才有受益印記 |
| [self-zero.gif](self-zero.gif) | 自療有印／零治療全程無印 |
| [recipient-ko.gif](recipient-ko.gif) | +300ms腳本受益者KO，清其印記 |
| [caster-ko.gif](caster-ko.gif) | +300ms腳本casterKO，清其擁有的他人印記 |
| [lifecycle.gif](lifecycle.gif) | end／Restart／destroy及650ms到期；重複destroy示意 |

每循環1800ms：400ms Idle→正治療腳本事件→650ms印記→750ms無印Idle。正常前200ms保留完整核准輪廓，再內收到0.72倍並淡出；reduced不移動、不旋轉、不縮放。角色320×260原cell、chestX158、hoverY203，右向FX cell200×160放(58,123)、左向放(62,123)。650ms僅視覺，不是持續治療或減傷。沒有新增施法動作或戰場文字牌／連線；所有標註是審核頁邊註記。

Pillow完整解碼9GIF／97編碼幀；逐幀duration及編碼後絕對時間像素核對；224組alpha邊界與左右取樣；encoded-verification.json的46項像素／不可變來源檢查通過。檢視各組起始／中段／到期，四Tier與受益者位置清楚，沒有角色裁切。這是原生單人自審，非獨立review。

限制：KO以腳本移除actor示意，不新增KO姿勢；Restart只示意乾淨Idle，不證明CD已重設；無真Runtime、事件同步、手機viewport或FPS驗證。產品／Collection／既有四主動來源未改，未測Build/Browser/Pages、未部署。

**唯一下一步：玩家明確核准本組GIF。未收到核准前不進Runtime，不建立GIF acceptance。**

可重現：python docs/art/candidates/chiru/passive/composite-review-v1/prepare_gifs.py；再執行同目錄verify_review.py。來源、衍生、時間線及hash均保存在本目錄。SHA256SUMS.json涵蓋所有本組檔案（不含自身）。
