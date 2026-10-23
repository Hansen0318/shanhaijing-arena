## 2026-10-23 — Heavy F3 v2 未通過動作區別；玩家授權直接重新設計 v3

玩家指出「動作和basic有點像」，隨後明確指示「要重新設計Heavy的F3設定的話，你就直接開始」。f3-v2不是approved，保留原圖與manifest作歷史，不整合Runtime。依全局無FX也能辨招與Basic<Heavy<Special<Awakening視覺層級，v3改為明顯軀幹扭轉、雙臂高低錯位彎曲、跨身弧形壓送水環；下身/鰭尾反向後甩，避免沿用Basic直線推掌。只是本體釋放動作改案，攻擊仍向前有限lane，數值/範圍/時間/目標不變，不新增地面砸擊或AoE。

v3來源與完整生成prompt/manifest在 docs/art/candidates/chiru/heavy/f3-v3/；只呈交單張F3，仍需玩家美術核准。下一Gate=玩家審核v3，再其餘姿勢/獨立FX/GIF；不得把直接重新設計授權當作新圖核准。Basic已核准、P1/P2與全部masters/尺度/anchor/ground保持；產品來源未改，不重測/Build/部署。單分支PR#1 open/unmerged，逐招流程保持。

# Heavy recovery

## 2026-10-23 — 玩家核准 Basic 發布；接續 Heavy 湧浪 F3 單招審核

玩家本次原文「妳確認目前這個github的進度流程規則的所有相關文件，要從妳開始繼續開發，我應該approve basic，確認接下來是做heavy，是的話繼續」。依此保存 Basic release266114c46406e39c8501ccad370ce69bfe34f236 的直接核准與接續指示，收據 docs/art/approved/chiru/basic/runtime-v1/acceptance.json；不推稱未回報的實機型號或逐Tier量測。Basic已核准範圍結案，P3整角尚未完成。

第一未完成Gate改為 Heavy「湧浪」F3 玩家美術審核。舊batch heavy-f3.png及originals/heavy-f3.png均無法完整解碼，保留原檔；重建單招候選與證據在 docs/art/candidates/chiru/heavy/f3-v2/。依核准identity/Idle維持右向、配件側別與簡化畫風，雙手前推、粗浪柱/真命中爆浪後續獨立製作；新圖仍CANDIDATE，未核准F1/F2/F4、GIF、Heavy Runtime或部署。

沿用已核准整角spec與逐招全局decision：Basic→Heavy→Special→Awakening→Passive；F3審核→其餘動作/獨立VFX→GIF審核→Runtime/真驗證→正常Pages→玩家核准。Heavy單target、鎖定aim、蓄勢350/337.75/325.5/305.9ms＋350ms真結算，F3發射不提前扣血，miss無target爆浪。保護全部approved masters/收據/P1/P2/scale/anchor/ground、普通Hit取消、無固定16MiB上限與安全清理；同分支PR#1 open/unmerged，不新branch/worktree/委派/TD/main merge。此次只有文件及候選圖，不改產品來源，不重跑已通過Basic測試或部署。舊PENDING與整包待辦由本節覆蓋，歷史保留。


Read candidate manifest and REVIEW.md. Present only Heavy F3; obtain explicit approval. Do not regenerate valid candidates or redo Basic.
