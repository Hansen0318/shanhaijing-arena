# P2 厚甲 — 僅剩玩家驗收

```text
從最新GitHub接續Hansen0318/shanhaijing-arena；唯一feat/m0-combat-core-20260927、PR#1open/unmerged，先fetch核對完整HEAD/tree/status，保留無關untracked。所有後續Chat/Work/Codex交接必須是一個完整、自足、可一鍵複製code block。原生單人，不委派、不main merge/新分支/TD/角色ID特例。
讀AGENTS、WORK_PROGRESS、docs/STATE、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、docs/M5C_P2_BOTUO_PASSIVE.md與docs/verification/P2_PASSIVE_RUNTIME/{REPORT.md,WORK_LOG.md,status.json,release-evidence.json,run-final.json,ci-build-inventory.json,public-fingerprints.json}。
厚甲已工程實作與部署，release1f6b47b4e30a867b1b8d294c69fdeaedc51f0b98/tree33fb1eab6d61b3f419e812de97b38fd19e651aa8。正常Pages39881533879/full1065/Build/guard599 SUCCESS，驗證workflow39881533921SUCCESS，CI/local149逐bytes相同，公開149/149（3fresh+146相同指紋沿用）PASS。遊戲https://hansen0318.github.io/shanhaijing-arena/?passive=1f6b47b 。最新文件HEAD可晚於release，不能因此重發或重驗。
已完成共用spatial-pressure/mitigation、P2真自身減傷20/30/40/50%、4秒/CD8秒、無文字護甲1/2/3/4組、MAX/獨立到期、接敵/近接敵隊友、KO/end/restart/destroy。真Session匿名/不同角色ID與不同被動ID仍實際減傷，未來各角色仍需真效果/Tier/清理/來源驗證/發布/玩家驗收；不能只新增名字、拿基礎HP/DEF或未知未實裝效果充數。
目前唯一Gate=玩家只驗厚甲護甲呈現/接敵耐打感/Tier增強。先查玩家對本已部署版本是否已有明確核准；未收到則呈交連結與最小範圍並停等，不假稱PLAYER VERIFIED。收到核准則保存精確原文/版本/證據hash收據、更新進度規則並依P1方式彙整P2整角色結案；不得捏造逐裝置或全部Tier測量。存在新缺陷才修受影響範圍。P1與P2原四招/Identity/static/Idle/Move/KO/比例/anchor/ground/canonical右向與左向mirror/全部masters收據GIF不重做、不重驗；普通Hit永久取消。P2被動PLAYER VERIFIED前P3技能BLOCKED，不自行展開P3/TD。
來源未變沿用全部已通過測試/Build/Browser/正常CI/Pages/public證據；新Runtime變更不得拿舊P1或本次舊來源PASS覆蓋，使用新來源guard/scripts/verifyBotuoPassiveRelease.mjs。P1疾行35/50/65/80%、3秒/CD6秒、95%明確額度保持；普通movement/outgoing15%不動，減傷不套移速額度。守群/鎮岳真傷害/真狀態/instant/tactical/MAX保持。全局素材無固定16MiB/required數量/reserve拒絕，保留逐檔安全/兩下載/完整required/所有權/回收/真失敗/destroy。每切片更新並原分支commit/push，純文件[skip ci]。
```
