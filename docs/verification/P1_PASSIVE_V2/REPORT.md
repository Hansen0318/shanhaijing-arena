# P1 疾行v2

## 2026-10-23 — 玩家直接執行修訂：疾行v2工程PASS／正常發布待完成

玩家拒絕舊版戰場文字與不明顯8%體感，明確要求直接執行，原文見 docs/verification/P1_PASSIVE_V2/authorization.json。依共用資料T0/T1/T2/T3疾行分別+35/+50/+65/+80%，3秒、觸發起CD6秒；2秒一般實際走位1單位門檻不變。戰場不建立任何被動文字/badge/HUD/連線，Collection仍說明T成長。一般movement與outgoing的15%上限保持；具明確額度之movement狀態可提高合計上限，疾行95%，無角色ID特例。全部核准四招/美術/尺度/anchor/ground/mirror/素材政策保持；普通Hit取消。

完整1047/1047、Build、P1實際native16/built8（四Tier、雙方/實際手機搖桿、無文字、真移動距離、到期/Pause/KO/end/Restart）、受影響P2 native4/built2/scale10 PASS。原生單人diff自審非獨立審查；較高增益有顯式資料與安全驗證，普通增益上限回歸通過。Browser腳本失敗原檔保留attempt1–4：錯誤重啟API、起點越界、面向前未同步畫面、built重啟後未等開場倒數；皆修正觀測腳本，未以放寬斷言/改產品迎合測試。新版報告量測實際有效2秒距離，另驗3秒到期。官方Chrome完整120231126bytes/ZIP CRC及SHA256驗證通過，CDN截斷失敗保留。

新版工程數值不是玩家實機核准；舊v1 spec/plan/receipts/GIF全部保持原bytes並由新decision記錄需求變更。舊來源證據不可套用v2；新版source-bound guard要求完整src/public/scripts/tests/依賴與24個真Browser案例、P2相容證據及最新指令。接續正常fullsuite/Build/guard/Pages及公開比對，不使用bounded或skip繞過Runtime發布。P1被動PLAYER PENDING，P2厚甲QUEUED，P3技能BLOCKED。詳見 docs/decisions/2026-10-23-passive-visibility-tier-revision.md 及 docs/verification/P1_PASSIVE_V2/。
