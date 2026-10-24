# 潤澤已正常部署；等待玩家遊戲驗收

```text
【山海經聯盟｜P3 赤鱬 Awakening「潤澤」已部署／玩家遊戲驗收 PENDING】

[角色任務]
從 GitHub 最新狀態恢復，只接續玩家對已發布潤澤的遊戲驗收／具體修正。不要重做已完成工程，不開始 Passive，不把本交接當作玩家核准。

[背景資訊]
Repository Hansen0318/shanhaijing-arena；唯一分支feat/m0-combat-core-20260927；PR#1保持open/unmerged，不merge main。
實際發布SHA f886207aeaba1f12f6598ffc8fc54b03c8c46646。文件HEAD可以更新，先fetch最新remote，不用舊checkpoint覆蓋最新成果；先恢復未push本機成果。
正常Pages40088794102 build120857037423/deploy120857587430 SUCCESS；1198/1198、Build/106素材guard、來源664、CI/local/public164一致PASS。P1/P2獨立workflow40088794098/40088794115 SUCCESS。P1/P2 COMPLETE及P3 Basic/Heavy/Special既有玩家核准保護；潤澤僅工程PASS／已部署，玩家遊戲驗收PENDING，P3整角未完成。

[具體指令]
1. 讀AGENTS.md、WORK_PROGRESS.md／docs/STATE.md最新段落、本handoff、docs/verification/P3_AWAKENING_RUNTIME/{REPORT.md,WORK_LOG.md,release.json,release-evidence.json,ci-build-inventory.json,public-fingerprints.json,browser/reuse-proof.json}，以及本招兩份美術核准收據。逐招流程維持Basic→Heavy→Special→Awakening→Passive。
2. 唯一下一步呈交 https://hansen0318.github.io/shanhaijing-arena/?awakening=f886207 。隔離Lab：https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&awakening=f886207 。橫向→LOW HP→Ally Tier T3→START→選赤鱬頭像→A，觀察真治療、多受益者泉花、回Idle與水膜到期。等待玩家明確核准或具體修正；未核准不存Runtime acceptance、不開始Passive。
3. 潤澤真Runtime已完成：兩模式600ms對當時全體存活同隊含自身各一次，當前maxHp×16/20/24/30%，不舊scale／復活／暴擊；CD14/12.88/11.76/10.08；T2後排2.0–4.2+5%；Special低血+10%不套；T3於600ms範圍20、10.8%減傷2.5秒、MAX／各自到期；AI至少2位HP≤80%。核准動作360/240/300/300ms、1200ms回原Idle；正amount才泉花，真保護水膜回Idle後持續。不要重建或重審有效素材／數值表。
4. Browser證據：真潤澤native32/built4和前三招相容來自40087764606，全部產品／相關driver／validator精確hash一致，由reuse-proof及正常CI檢查；不假稱本次重新跑過相同P3來源。發布freshP1 native16/built8、P2 native4/built2。P2原64≠60舊inventory斷言已修，真失敗已保存。完整原始截圖在來源run的artifacts12557947601／12558141351；發布完整artifact12557309499，Pages12557608387，archive digests在REPORT/release.json及proof。需要本機完整截圖guard時先用GitHub API下載相應archive、核SHA256/ZIP CRC再恢復，不用缺檔冒稱失敗或重跑相同來源。
5. 若玩家提出具體問題，保存可重現證據，只修受影響範圍，同分支checkpoint／必要驗證／正常CI／Pages／公開版本核對；不繞關卡。若明確核准此潤澤release，才保存綁定精確發布／素材／驗證的Runtime核准收據與進度，再依最新逐招規則接Passive第一未完成Gate。此刻尚無該核准，不提前執行。

[約束條件]
原生單人、不委派、不新branch/worktree、不動TD、不merge main、不重置存檔；普通Hit永久取消。保護全部approved masters／收據bytes及P1/P2／Basic/Heavy/Special行為、尺度／anchor／懸浮下緣／右canonical左mirror。無固定16MiB總額；逐檔安全／兩下載／required完整就緒／真失敗及所有權回收保持。Collection只寫實際玩法。工程PASS／已部署／玩家驗收PENDING必須明確區分，不宣稱未測實機／FPS。所有後續交接維持單一、自足、可一鍵複製code block。
```
