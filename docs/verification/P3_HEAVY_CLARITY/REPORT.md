# Heavy 發射與命中清晰度修正

玩家已核准 release4b85526 的整體招式效果；精確收據保存在 docs/art/approved/chiru/heavy/runtime-v1/acceptance.json。本次依同一句玩家指示直接診斷、修正並驗證顯示清晰度，沒有把新修正冒稱為玩家已看過。

## 原因與修正

核准 PNG 保留水花柔邊透明度；非零alpha平均 charge208.27/column222.13/impact196.92，核心大部分≥230。但舊播放程式又將飛行浪柱乘上.75（reduced僅.35），reduced命中乘上.65，且命中即刻淡出。主要可控損失是額外程式透明度與過早淡出。

保留四張核准Runtime PNG及全部masters/收據bytes。共用launched-line播放改為charge.85/1、飛行浪柱alpha1；真命中爆浪alpha1保持120ms後130ms淡出，具獨立250ms生命週期，接續Basic不會截斷。減少動態仍使用固定lane、無延展動畫，但不額外降低可讀性。浪柱命中後保持100ms再50ms淡出，維持原結束時間。

角色尺度、anchor、懸浮下緣、canonical/mirror、有限lane與單target規則保持。cast鎖aim，release固定origin，release後350ms才真正結算；miss不畫target爆浪。沒有更改傷害、冷卻或動作時序。共享descriptor新增可選fullOpacityMs，僅新Heavy啟用；既有Basic/P1/P2資料與舊證據不改。

## 驗證

回歸先RED後GREEN；本機1129/1129與Build通過。正常CI、真Browser、Pages和公開bytes結果記錄於本目錄release.json；各原始報告與artifact指紋隨同保存。真Browser不等於實體手機測試。

保留整體Heavy核准；新清晰度版呈交玩家觀察。此工作不開始Special；同分支，PR#1保持open/unmerged，不動TD/main，不使用新branch/worktree或委派。

正常release `30423cccd448971ce0948dfefaaead1406762248` 已部署。CI1129/1129、Heavy native32/built4、Basic native32/built4、596來源guard、P1/P2相容及獨立P2均PASS。CI/local157逐bytes一致；公開157/157（3新檔下載核對＋154相同path/bytes/hash沿用）PASS。三個artifact SHA256/ZIP CRC通過；正常右向與reduced左向實際built截圖已自審，發射/命中實色核心清楚。

遊戲：https://hansen0318.github.io/shanhaijing-arena/?clarity=30423cc
隔離Lab：https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&clarity=30423cc
選赤鱬並用H重擊。整體Heavy核准保留，新清晰度版尚未收到玩家回饋。
