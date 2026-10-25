# P4 九尾狐真機制前檢 — 2026-10-25

## 結果與邊界

已完成本次設計前檢，**新規格 PLAYER REVIEW PENDING，產品未實作**。最新恢復HEAD b7d696a56c1547de43b09afbe21e7a0e3f24c384、tree9fdafb6ec864167861be72f00b1de03b483761e7；connected API確認PR#1 open/unmerged。本工作區fresh clone原分支，初始無本機未push或無關untracked；未新建branch/worktree，不委派，不動TD/main/存檔。

入口：`docs/superpowers/specs/2026-10-25-jiuweihu-whole-character-design.md`。完整數字：`baseline.json`與`proposal.json`。current / proposed / approved / implemented分開；沒有新acceptance。P1/P2/P3 COMPLETE保持。

## 實際查核

- 已讀最新AGENTS、WORK_PROGRESS、STATE頂端、ROADMAP、PLAYBOOK、BOUNDARIES、CHARACTER_ACTION_ART_WORKFLOW、M5C_ART_ANIMATION_VFX、逐招與退示意決策、P3 closure/acceptance audit與兩份最後核准收據、P4 handoff及既有P4 static/move/KO文件。較新玩家結案紀錄覆蓋舊PENDING。
- 完整Git tree3011項且非truncated，未見更晚P4技能spec/核准/action成果；P4只有已核准base，不重做。
- catalog P4.actionDescriptors不存在，P4.passive implemented:false/effect:{}，T2惑心追獵是8%條件傷害modifier，非獨立被動。
- `preflight.mjs`呼叫真`resolveTierProjection/resolveTierAbilities`輸出四Tier全部屬性、射程、CD、crit、預警與範圍，非手抄數字。相關68檔逐Git blob SHA與原HEAD一致，baseline保存完整綁定。
- `node docs/verification/P4_CHARACTER_PREFLIGHT/preflight.mjs`：32隔離現況施放PASS（四Tier×兩模式×四主動），確認正傷害事件數、真impact時間、T3餘焰建立/未開放passive及transient clear。只測本次實際疑點，不跑P1–P3舊suite。
- 全四主動windupMs皆0；Heavy/Special/Awakening僅tactical mode使用telegraph delay；Basic兩模式0ms。不能為新畫面私自新增蓄勢或飛行結算。
- T3餘焰是fixed area，.5秒起跳、到期前共5脈衝、sourceKO清場；不是跟身DoT，也不是覺醒原主傷變AoE。
- P4 Idle/Move/KO實際manifest經無損packing，必須保留framePacking/runtimePacking而非拿trim尺寸重新fit。

## 真呼叫與必要新差異

roster abilities→ability validation；catalog→tierEffects.resolveTierProjection/resolveTierAbilities→BattleSession.actorAbilityDefinitions。AI與手控共用BattleSession.executeAbility→即時applyAbilityEffects或ThreatLedger/delayedImpacts→applyResolvedDamage→combatResolver→既有Tier hit/area。PersistentAreas.tick→applyAreaPulse使用residual倍率/禁crit，不再觸發hit。PassiveRuntime目前只支援ordinary-distance、spatial-pressure、rear-support，**不支援hit事件或target control**。

BattleStatuses已支援control/steadfast與source/target所有權及各自到期。須新增資料opt-in的positive direct damage被動候選queue、獨立Tier duration/CD、真status/target snapshot和VFX，明確排除殘焰/遞迴、零傷/擊殺/免疫與同刻KO。現有control對pending與delayed路徑有具體時點差異，規格5.5已明定新惑心契約與受影響驗證，不以telegraph metadata假稱免疫。這是後續Passive工程範圍，本次未改源碼。

呈現路徑為`src/runtime/{ArenaScene,assetPresenter,passivePresenter,telegraphs}.js`與battleDescriptors；Scene Pause凍結session/播放時鐘。四主動需要不改真結算的觀察式action事件，T3餘焰需要獨立area/pulse來源。正式素材載入才退同record示意，不能刪獨立area/盾水膜/場地。

## 驗證範圍與下一Gate

本次只新增docs內前檢腳本/JSON/spec與進度文件，`[skip ci]`。沒有Build/Browser/Pages、素材生成、新被動驗證或手機實測；不把32現況probe稱為新Runtime PASS。P3原1229/Build/正常Pages40163995446/public172證據僅作原來源不變沿用，沒有重跑/重下載。

唯一下一Gate：玩家審核整份五招/T0–T3提案。收到明確核准後保存精確spec/proposal/baseline hash收據，接Basic靈火單張F3；其餘逐招完成才下一招。不重問是否開始P4，不跳新設計審核。
