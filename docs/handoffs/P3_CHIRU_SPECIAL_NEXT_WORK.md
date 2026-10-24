# Special 回瀾已部署 — 玩家遊戲驗收NEXT

完整發布證據：docs/verification/P3_SPECIAL_RUNTIME/REPORT.md、release.json、WORK_LOG.md。最新GitHub優先，以下只定位當前已完成Gate。

```text
【山海經聯盟｜P3 赤鱬 Special 回瀾：已部署，等待玩家遊戲驗收】
Repository Hansen0318/shanhaijing-arena；唯一分支feat/m0-combat-core-20260927，PR#1保持open/unmerged，禁止merge main。
先fetch最新remote，核對AGENTS、WORK_PROGRESS、docs/STATE、此handoff與docs/verification/P3_SPECIAL_RUNTIME/REPORT.md、release.json、WORK_LOG.md。
發布版本de1b442414e09307dfc36c509bb533f0059f055d；正常Pages40066641696 build/deploy SUCCESS。1166/1166、Build、102素材guard、626新來源guard、Special/Basic/Heavy各native32+built4、P1/P2相容、CI/local160與公開160/160均PASS。
正式遊戲：https://hansen0318.github.io/shanhaijing-arena/?special=de1b442
隔離Lab：https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&special=de1b442
手機橫向，HEAL TEST→START→點赤鱬頭像→S施放回瀾。滿血手控仍耗CD，但沒有真正正治療就無recipient泉花。
目前唯一Gate＝玩家測試此版本並明確核准或提出具體修正。未收到玩家回覆不得建立Special Runtime acceptance或開始Awakening/Passive。工程PASS不等於PLAYER VERIFIED。不重做已完成F3/姿勢/VFX/GIF/Runtime/驗證/部署；來源未變不重跑。
若玩家核准，保存精確發布/來源hash核准收據，更新進度，再接Awakening第一未完Gate；若玩家回報問題，只修具體影響範圍，保留真失敗與必要新來源驗證。
保護所有approved masters/收據、P1/P2/Basic/Heavy、共同尺度/anchor/懸浮下緣/右canonical左mirror、玩家存檔；普通Hit永久取消。無固定16MiB總門檻，逐檔安全/兩下載/required就緒/所有權回收/destroy保持。
原生單人，不委派、不新branch/worktree、不動TD、不merge main。逐招Basic→Heavy→Special→Awakening→Passive；所有後續交接只用單一、自足、可一鍵複製code block。
```
