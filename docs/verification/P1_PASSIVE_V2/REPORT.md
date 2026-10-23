# P1 疾行v2

## 2026-10-23 — 疾行v2已部署／公開149項核對PASS／PLAYER PENDING

正常Pages run39875078049 completed/success，完整1047/1047、Build、549項來源guard PASS；發布 d1a39397562f2345bec0243ede82b6376f89684d／tree981276199ebe572d0481decfaff76349c8bb9a3d。CI artifact12468545672 SHA256314426c6cc540c5790dfec968ff861475d4888b84ed19f5b71a22d618a68c7bb、ZIP CRC及CI/local149檔逐bytes相同。公開3個變更檔（index.html及兩個JS）新取bytes一致，146個相同路徑/bytes雜湊素材沿用既有v1成功公開指紋，完整149/149核對PASS；未重跑未變素材比對、測試或Browser。證據 docs/verification/P1_PASSIVE_V2/{status.json,run-final.json,ci-build-inventory.json,public-fingerprints.json,ci-build.log.gz,ci-deploy.log.gz}。

已移除戰場被動文字牌/HUD文字/連線。疾行T0/T1/T2/T3：+35/+50/+65/+80%，3秒/CD6秒；實際移速2.7675/3.321/3.9237/4.7232（未疊其他buff）。原生16/built8及P2受影響相容性均PASS。玩家要求的無文字/更大真增益/獨立被動Tier成長已實作並發布；只剩新版P1疾行玩家實機驗收，不能冒稱玩家已核准或P1整角色完成。遊戲 https://hansen0318.github.io/shanhaijing-arena/?passive=d1a3939 。P1被動驗收後保存新收據才啟動P2厚甲，兩者驗收後才可P3技能。已核准四招/base/全部美術尺度不重開，普通Hit取消，單分支PR#1open/unmerged及全局素材政策保持。此結案切片純文件[skip ci]，不重發來源相同的Runtime。


## 2026-10-23 — 玩家直接執行修訂：疾行v2工程PASS／正常發布待完成

玩家拒絕舊版戰場文字與不明顯8%體感，明確要求直接執行，原文見 docs/verification/P1_PASSIVE_V2/authorization.json。依共用資料T0/T1/T2/T3疾行分別+35/+50/+65/+80%，3秒、觸發起CD6秒；2秒一般實際走位1單位門檻不變。戰場不建立任何被動文字/badge/HUD/連線，Collection仍說明T成長。一般movement與outgoing的15%上限保持；具明確額度之movement狀態可提高合計上限，疾行95%，無角色ID特例。全部核准四招/美術/尺度/anchor/ground/mirror/素材政策保持；普通Hit取消。

完整1047/1047、Build、P1實際native16/built8（四Tier、雙方/實際手機搖桿、無文字、真移動距離、到期/Pause/KO/end/Restart）、受影響P2 native4/built2/scale10 PASS。原生單人diff自審非獨立審查；較高增益有顯式資料與安全驗證，普通增益上限回歸通過。Browser腳本失敗原檔保留attempt1–4：錯誤重啟API、起點越界、面向前未同步畫面、built重啟後未等開場倒數；皆修正觀測腳本，未以放寬斷言/改產品迎合測試。新版報告量測實際有效2秒距離，另驗3秒到期。官方Chrome完整120231126bytes/ZIP CRC及SHA256驗證通過，CDN截斷失敗保留。

新版工程數值不是玩家實機核准；舊v1 spec/plan/receipts/GIF全部保持原bytes並由新decision記錄需求變更。舊來源證據不可套用v2；新版source-bound guard要求完整src/public/scripts/tests/依賴與24個真Browser案例、P2相容證據及最新指令。接續正常fullsuite/Build/guard/Pages及公開比對，不使用bounded或skip繞過Runtime發布。P1被動PLAYER PENDING，P2厚甲QUEUED，P3技能BLOCKED。詳見 docs/decisions/2026-10-23-passive-visibility-tier-revision.md 及 docs/verification/P1_PASSIVE_V2/。
