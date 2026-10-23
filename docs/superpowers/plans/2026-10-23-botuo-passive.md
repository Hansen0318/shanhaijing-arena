# 厚甲共用被動 Implementation Plan

> For agentic workers: use superpowers:executing-plans，原生單人；使用者禁止subagents，使用別段自審並如實記錄。

Goal: 資料驅動防禦被動在真戰鬥減傷且供未來角色共用。
Architecture: 擴充passiveDefinition/Runtime為kind分流；沿用BattleStatuses/共用damage與contact順序。獨立無文字Graphics讀真snapshot。
Tech Stack: JavaScript ESM、node:test、Phaser4.2.1/Vite8.3.1、Playwright。
Spec: docs/superpowers/specs/2026-10-23-botuo-passive-design.md

## Global Constraints

同feature分支/PR#1open-unmerged、不新分支/不merge/不TD/不角色ID特例；P1/P2核准美術/尺度/ground/mirror/四招與普通Hit取消保持；全局素材政策保持。單人原目錄執行（指定單分支優先worktree預設）；方向+直接實作授權見decision，不再要求既定流程確認。

## Review Focus

1. 空間型不能破壞距離snapshot或無被動角色；Task1混合kind測試。
2. 同時刻damage先於新甲、到期不能多擋一擊；Task2排程傷害案例。
3. 三名P2各自CD/狀態，不以全域資料共享；Task1多instance。
4. 新形狀不能顯示被較強status蓋過的收益；Task3真MAX/到期。
5. 跨角色重命名/敵我皆生效；Task1匿名資料與Task2雙陣營。

## Task 1: 共用定義與狀態核心

Files: src/combat/passiveDefinition.js, passiveRuntime.js；tests/spatialPassive.test.js。
Interfaces: createPassiveDefinition(input)回不可變資料；PassiveRuntime.settle(now,{spatial=true,distance=true}), nextSpatialBoundary(start,end), hasSpatial()；snapshot分effectType，active.effective。
- [x] 寫RED：spatial-pressure/mitigation與四Tier表可接受，>50%/不完整/非法半徑拒絕；匿名角色兩條條件、控制、CD8/到期4、多instance、KO、clear、MAX蓋過。
- [x] node --test tests/spatialPassive.test.js 應因unsupported trigger失敗，保存log。
- [x] 實作kind分流，distance既有路徑不動；空間核心依actor團隊/座標，無ID分支。
- [x] node --test tests/spatialPassive.test.js tests/passiveDefinition.test.js tests/passiveRuntime.test.js tests/passiveRevision.test.js應全PASS；checkpoint。

## Task 2: 真Session與資料

Files: src/combat/battleSession.js, src/roster/abilities.js；tests/botuoPassiveSession.test.js, passiveCollection.test.js。
Interfaces: Session讀hasSpatial/nextSpatialBoundary；roster only P2 opt-in既定數值。
- [x] 寫RED：真P2四Tier/雙方HP差20/30/40/50%、接敵隊友/遠離不觸發、MAX/兩P2、同時刻致死/到期/CD、control/清理與P1不變。
- [x] node --test tests/botuoPassiveSession.test.js 應缺P2active而FAIL。
- [x] spatial將步進限50ms、passiveTick加入空間boundary，初始settle不提前空間啟動，data實裝與完整Collection描述。
- [x] 真Session/被動/P2守群鎮岳受影響測試PASS；更新Collection只改P2從未實裝至實裝的斷言，其他保留；checkpoint。

## Task 3: 無文字呈現

Files: src/runtime/passivePresenter.js；tests/spatialPassivePresentation.test.js。
Interfaces: render({views,actors,now})讀active.effective/presentation.guard-plates，actor project；destroy釋放。
- [x] RED測一到四組/隱藏被蓋過/KO/end/destroy、沒有Text/數字/HUD/連線/actor縮放。
- [x] 最小Graphics短弧片；P1依然無文字/no-op；tests PASS。

## Task 4: 真Browser、來源證據與正常發布

Files: scripts/checkBotuoPassiveBrowser.mjs, verifyBotuoPassiveRelease.mjs；tests/botuoPassiveReleaseEvidence.test.js；.github/workflows/m0-pages-preview.yml/p1-passive-verification.yml；docs/verification/P2_PASSIVE_RUNTIME/。
- [ ] 建來源guard RED測source tamper/不完整case/虛假數值，拒絕後GREEN。
- [ ] 完整npm test與npm run build；native四Tier雙方與built四Tier手機入口、真HP/MAX/CD/Pause/KO/end/restart/無文字/護甲形狀/正常及reduced；P1改動來源重新驗證、P2四招受影響相容，不重審美術。
- [ ] 完整src/public/scripts/tests/依賴/流程/Browser/核准來源綁定新guard；Pages改用新guard（舊證據凍結），禁止放寬檢查；來源篡改負向拒絕。
- [ ] 原生單人diff自審、修真正缺陷，push原分支正常完整CI/Pages/public新比對。工程通過才提供遊戲網址，留厚甲玩家驗收Gate。
