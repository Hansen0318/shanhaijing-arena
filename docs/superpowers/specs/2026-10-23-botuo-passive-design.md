# 厚甲共用防禦被動規格

授權：docs/decisions/2026-10-23-botuo-passive-execution.md；方向來源docs/verification/P2_PASSIVE_PREFLIGHT/REPORT.md。本文件將已呈交方向精確化供直接實作，非捏造額外書面核准。

## 效果與資料

createPassiveDefinition支援ordinary-distance/movement既有路徑與spatial-pressure/mitigation新路徑；空間trigger={kind,enemyRadius:2.2,allyRadius:2.4,allyEnemyRadius:2.2}，平面中心距離<=半徑，僅存活異隊敵人/同隊且排除自身隊友。任一敵人在enemyRadius，或隊友在allyRadius且敵人在其allyEnemyRadius即滿足。只自身受益。control中不新觸發、已有甲保留。4秒/CD8秒觸發起算、不刷新/疊層，離開保留餘時，CD好可再次觸發。T0/T1/T2/T3=20/30/40/50%，完整表直接取值，不再套Tier倍數/CD縮短。schema將被動減傷限制[0,.5]，有限正半徑<=20、完整單調Tier表，movement cap既有規則不變。

獨立key passive:<ability id>，MAX共存並各自到期，基礎DEF/四招/鎮岳時序及隊友狀態不動。不能用P2 ID或名稱分支。未知新觸發/效果拒絕，不能默默顯示已實裝。

## 時序

空間判斷在權威模擬取樣與CD邊界，無staged時最多50ms、staged時沿用10ms。advancePlannedMotion起點先只settle距離型；空間型透過既有contact queue的passiveTick結算，已排程的同時刻傷害先於passiveTick。新增空間nextBoundary對ready且條件成立給now，未ready給CD邊界；控制期間不產生零長度忙迴圈。已結算傷害不回溯。外部極細delta允許現有模擬精度內差異；一般固定路徑coarse/fine差異不超50ms，數值不因renderFPS改變。P1距離演算法/分段/35/50/65/80%/3秒/CD6秒/95%cap保持。

## 真狀態與呈現

snapshot有effectType/triggerKind。距離型既有欄位保持；空間型不假造progressDistance/effectiveMoveSpeed。active含真statusId/start/expiry/contribution與effective（等於當前MAX），guard-plates樣式僅mitigation可宣告，固定琥珀色/四Tier1..4組、固定外框且不改actor transform。PassivePresenter用Phaser Graphics短弧片在角色兩側畫靜態描邊，無Text/牌/HUD/數字/連線/地面圈，與四招素材呈現隔離；有效MAX（含並列）才畫，不存在/被蓋過/KO/結束立即隱藏。reduced motion同靜態形狀；now只取session clock，Pause不計時。角色/HP原有呈現不變。

KO清除被動record與entry；條件用隊友/敵人KO不回收已取得4秒甲。end清空；Restart新session/epoch新CD；destroy釋放Graphics與引用，不能用view計時改戰鬥狀態。Collection依實際implemented與完整description顯示。

## 未來角色及驗證

資料opt-in，匿名角色不同ID共用核心、敵我/手控AI一致；未實裝的被動保持false。每角獨立真效果/Tier/狀態/清理/發布/玩家驗收是完成門檻。新條件仍須擴充通用能力，不能承諾尚不存在效果。

RED→GREEN：schema安全/不可變/非P2資料、兩觸發邊界/KO/控制/多instance、真Session四Tier實扣HP與MAX/獨立到期、同時刻致死/CD/到期/Restart、Collection、無文字Graphics與清理；P1及P2原四招受影響回歸。完整suite/Build/真native與built手機入口、source-bound新guard正常Pages/CI與public bytes才算工程交付；最終玩家只驗厚甲體感，不重驗已接受四招。
