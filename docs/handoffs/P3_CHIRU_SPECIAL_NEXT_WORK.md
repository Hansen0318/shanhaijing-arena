## 2026-10-24 — 新 Work 恢復本機完整成果；修復兩個截斷衍生檔

先fetch確認remote9c222a24f06c0a01b65ad5dd041b6e7e009afc38與PR#1 open/unmerged；找到上一Work本機未push提交fb64842，採fast-forward恢復51檔，未重生任何姿勢或FX。嚴格解碼發現recipient-padded-master.png與special-vs-heavy.gif已在該commit內截斷（hash符合舊checksums，故僅hash不足以證明可解碼）。完整originals與核准F3均可嚴格解碼，依既有prepare_preview.py確定性重建，修復兩個衍生檔並更新checksums；原提交保留於本機歷史，遠端保存有效最終樹。

新驗證：54檔hash、所有PNG/GIF完整逐幀解碼、11GIF逐像素時序往返與protected sources hash PASS。核准F3／原圖／收據與產品來源完全保持；無suite/Build/Browser/Pages。原分支、單人、無main merge。唯一下一Gate仍是呈交Special GIF等待玩家核准；不把本次接手授權當成未看過GIF的核准，不Runtime/部署/下一招。

# P3 Special 回瀾 — GIF ready / player review next

```text
【山海經聯盟｜P3赤鱬Special「回瀾」GIF審核Gate】
Repository Hansen0318/shanhaijing-arena；唯一分支feat/m0-combat-core-20260927；PR#1open/unmerged，禁止main merge。
先fetch最新remote。9c222a24f06c0a01b65ad5dd041b6e7e009afc38是原圖checkpoint，完整GIF以包含本handoff的最新remote為準，不用舊SHA覆蓋。
先讀AGENTS.md、WORK_PROGRESS.md與docs/STATE.md最新段落、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、逐招decision、Special WORK_LOG及docs/art/candidates/chiru/special/composite-review-v1/REVIEW.md/manifest.json/checksums.json。
F3 v3已核准，收據docs/art/approved/chiru/special/f3-v3/acceptance.json保持；F1/F2/F4、兩類獨立VFX及11GIF已完成必要作者美術QA並保存。不得重畫、重生、重做相同QA，不重問F3。F2-attempt1保留但不採用。
唯一下一步：呈交REVIEW的normal/slow/noFX/Heavy等尺度對照、滿血零治療與其餘GIF，等待玩家明確核准或修正。沒有GIF核准前不整合Runtime、不部署、不開始Awakening/Passive；本handoff不是未見GIF的核准。
GIF是明示美術模擬：200/120/200/240ms，320ms正amount才有recipient泉花；滿血0只caster嘗試環。既有產品仍是舊instant／基準maxHp×caster healing scale，未實作新契約，不宣稱真驗證。玩家核准後才保存精確新GIF收據，接後續Runtime Gate：範圍20存活含自身、320ms重選最低HP比例、stable instanceId、受益者當前maxHp×25/30/35/40%、封頂缺血、CD7/6.44/5.88/5.04秒、modifier加算上限15%、AI65%與取消/lifecycle；不重審既有spec數值。
Basic→Heavy→Special→Awakening→Passive逐招完整流程；單人原分支、不委派/新branch/worktree/TD/main merge。全部approved masters/收據/P1/P2/Basic/Heavy與尺度/anchor/懸浮下緣/右canonical左mirror保護；普通Hit取消，無固定16MiB總門檻、逐檔安全/required/所有權回收destroy保持，Collection只寫玩法。純文件/美術[skip ci]，未改產品不重跑suite/Build/Browser/Pages。後續交接仍單一自足code block。
```
