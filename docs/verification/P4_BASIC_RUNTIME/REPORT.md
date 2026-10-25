# P4 Basic「靈火」Runtime — 已部署，等待玩家遊戲驗收

發布 `270aea17a1e65954d1ceba06898a707ee4aac675`，正常 Pages [40183802821](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/40183802821) build121140287488/deploy121143484524 SUCCESS。P1/P2獨立相容workflow同SHA亦SUCCESS；PR#1維持open/unmerged。

## 已完成

- 正常CI 1251/1251、Build/113素材guard PASS；P4真native32/built4（兩模式/四Tier/左右/normal-reduced/實際Campaign入口、頭像callback與自動Basic）PASS。
- 真0ms傷害/actionId與獨立出手/真target爆花；miss不顯示target花。原傷害、暴擊/RNG、射程、Tier、cadence、選人均保持；22新契約及受影響來源相容通過。
- 核准F3→F2→F1→F4，各140/90/90/140ms只跟隨收勢，合法新動作可覆蓋，正常460ms/reduced140ms回原Idle/實際Move。Pause、control、cancel、KO、epoch/end、Restart及destroy完整所有權清理。
- 真renderer .9 screen-pixels/logical-pixel按核准Idle/Move解剖與足底校準，左右mirror/指尖root/真target位置通過；18實際native/built截圖保存且已檢視。初始packing.json的renderer-PENDING由本真證據覆蓋，原核准文件歷史不重寫。
- 三張優化PNG139169 encoded bytes /507976 decoded bytes，共同crop [48,40,176,160]可逐RGBA還原核准safe cells。原masters/49份核准證據bytes不變；遊戲不載GIF/高解析原圖，不按尾焰外框fit。完整正式來源存在才退對應示意，缺來源保留fallback；獨立場域/盾/固定場地不變。
- Collection只更新已實作Basic；惑心仍尚未開放。無新普通Hit、無存檔變更。

## 發布證據

`release.json`、`release-jobs.json`、`release-runs.json`綁定實際成功流程；`ci-artifact.json`記錄P4 artifact12594784088及SHA256 `80906632fca5328b9c505141a4f647f2bb64bb0a1fe1cb4046ffacf4b1c3ed83`，下載ZIP hash/CRC核對PASS。

`release-evidence.json`綁598檔；CI與本機578個非browser來源一致，CI native32/built4報告保存於ci-browser。CI/local175份build指紋完全相同，公開175/175全部相符：6變更檔HTTP200新下載、169相同path/bytes/hash沿用既有公開證據，詳`ci-local-build.json`與`public-fingerprints.json`。未重下載未變公開來源。

共用來源實際變動，因此正常流程補P1/P2/P3相容，guard665/700/597 PASS；同SHA獨立P1 workflow40183802878/P2 workflow40183803056 SUCCESS。第一輪固定正式素材12→13、P2貼圖68→71舊快照失敗保存於WORK_LOG及first-ci-chiru-native.json；驗證器改逐招對照descriptor、記憶體只遷移3PNG/507976byte精確delta，無Runtime/舊角色改版或繞過測試。

原生單人自審，依玩家不委派約束沒有獨立review；未聲稱實體手機/FPS。尚未收到玩家Basic Runtime核准，沒有建立Runtime acceptance；P1–P3 COMPLETE，P4整角未完成。

## 唯一下一 Gate

[正常遊戲](https://hansen0318.github.io/shanhaijing-arena/?basic=270aea1)／[隔離驗收](https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&basic=270aea1)。橫向→ALLY TEAM任一slot選九尾狐→START→點九尾狐頭像→接敵觀察自動靈火，切左右、移動與停下確認回Move/Idle。Basic沒有專用按鈕。

停待玩家明確Basic遊戲驗收；工程PASS/已部署不是玩家核准，不開始Heavy/P5/惑心。來源未變不重跑已完成檢查或部署。
