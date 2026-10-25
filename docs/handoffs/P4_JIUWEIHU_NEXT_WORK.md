```text
【山海經聯盟｜P4九尾狐規格v1已呈交；只接第一個真正未完成Gate】
最高優先：所有後續交接指令必須單一完整、自足、可一鍵複製code block。

[角色任務]
接續Hansen0318/shanhaijing-arena，GitHub最新remote唯一權威。原生單人，不委派、不新branch/worktree、不動TD/存檔/無關untracked。唯一分支feat/m0-combat-core-20260927，PR#1 open/unmerged，禁止merge main。
先fetch最新remote HEAD並核對本機未push與tree。前檢baseline b7d696a56c1547de43b09afbe21e7a0e3f24c384只是定位，規格成果在後；不得用舊SHA覆蓋新成果。CLI無認證用connected GitHub API，逐blob Git SHA/完整tree核對、expected-SHA非force更新ref。

[恢復入口]
讀最新AGENTS、WORK_PROGRESS、STATE頂端、DEVELOPMENT_ROADMAP、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、CHARACTER_ACTION_ART_WORKFLOW、M5C_ART_ANIMATION_VFX，以及decisions/2026-10-23-restore-sequential-skill-workflow.md、2026-10-25-retire-schematic-under-formal-actions.md。
本角色入口：docs/superpowers/specs/2026-10-25-jiuweihu-whole-character-design.md；docs/verification/P4_CHARACTER_PREFLIGHT/{REPORT.md,WORK_LOG.md,baseline.json,proposal.json,current-source-probes.json}。核對是否已有更新spec或spec-acceptance；較新有效成果優先，不重做。

[已完成與保護]
P1/P2/P3 COMPLETE；P3最後d346798已玩家核准，closure與最後兩份acceptance保持。原1229/Build/native+built/正常Pages40163995446/public172保留，不因新會話重跑/下載。舊整包流程hash已在原SHA恢復、被逐招決策取代，不是未解決差異。
P4既有portrait/Collection/Idle/Move/KO已核准，不重畫/重審。當前無formal actionDescriptors，獨立passive尚未實作。前檢已完成68相關source Git blob綁定與32個P4現況隔離施放PASS，完整真四Tier投影及兩模式時序已保存；來源未變不重跑。不能把current probe當新被動/Browser/手機驗證。

[最新唯一Gate：Basic靈火F3玩家美術審核]
既有有效候選docs/art/candidates/jiuweihu/basic/f3-v1/basic-f3.png已呈交，SHA256 74f4a86bb8ae78ff8d805a400e8bdf8b023d86512fc6f0cb33b9beb62d1328b7；讀同目錄REVIEW/prompt/qa。不要重生此候選或直接做其他姿勢/VFX/GIF/Runtime/部署。先依最新remote核對是否已有本圖acceptance；沒有則呈交F3等待玩家明確核准。收到核准才存本PNG hash收據，沿此圖做其餘Basic動作/獨立VFX/GIF，不重審整角spec。原圖極淡alpha=1觸左/下邊已記錄，尚未Runtime包裝，後續確定性padding/common-anchor處理不得刪改原圖。以下F3 NEXT為生成前歷史，本段優先。

[已核准規格／生成前紀錄]
玩家「好我確認，紀錄後繼續」已核准ea1b9e1呈交規格及隨後視覺要求說明。spec-acceptance.json綁定原spec/proposal/baseline hash；原PENDING是歷史，不重問同表核准。唯一下一工作是Basic靈火單張本體F3（單手短促前點、另一臂收身、九尾低幅偏後），沿既有identity/Idle/配件側別/原尺度製作並呈交玩家。未核准新F3，不能做其餘姿勢/VFX/GIF/Runtime/部署或Heavy。若已有更晚候選/核准則沿用，依WORK_LOG接第一未完Gate。以下未核准規格段落僅為呈交時歷史，已由本收據覆蓋。

[原規格呈交歷史]
規格v1是PROPOSED / PLAYER REVIEW PENDING，尚無玩家核准或acceptance。若最新remote仍此狀態，呈交具體五招提案並等待新設計審核，不製作F3/GIF/Runtime/部署，不重問是否開始P4、不只報告已讀規則。
提案保留四主動既有數值/射程/CD/兩模式時序；Basic兩模式0ms，其他三招戰術延遲、非戰術0ms，不因畫面改真結算。T3固定餘焰半徑1.035/3秒/.5間隔/到期前5次，非跟身灼燒。
新獨立惑心：四主動直接正傷害後，控制一名仍存活真受擊敵人，T0–T3 .2/.3/.4/.5秒，成功建立control才CD8秒，開戰ready；排除餘焰/遞迴/零傷/擊殺/免疫。實際target/status的1/2/3/4狐焰瓣依真狀態到期，無文字牌。完整同刻、排序、控制對pending/delayed/area、steadfast、多instance與清理契約見spec5.5–7。T2原惑心追獵只是8% modifier，顯示名孤焰追獵提案待審，ID/條件/幅度不改。
若玩家在新會話明確核准此份已展示規格，先保存精確spec/proposal/baseline hash與原文收據；不要重問同版核准，直接接Basic靈火單張F3。規格核准不是未見美術/GIF/Runtime核准。

[核准後逐招]
Basic→Heavy→Special→Awakening→Passive；每招F3/樣式核准→其他姿勢與獨立VFX→GIF核准→Runtime/必要真驗證→正常CI/Pages/public→玩家遊戲核准→精確收據，才下一招。不同時生成四招F3，不等五招一起發布；P4完成前不開P5。
四招無FX輪廓/施力/節奏明顯不同，Basic<Heavy<Special<Awakening同手機尺度逐級大場面；保護approved masters/收據/GIF/PNG/解剖尺度/anchor/ground/右canonical左mirror與packed frame metadata，不依trim外框重新fit。普通Hit永久取消。
正式action完整真貼圖已載入且TextureManager存在才退同record整層示意，缺來源才fallback；禁止ground-sigil膠囊/箭頭/方塊換皮。獨立餘焰/盾水膜/固定場地不可誤刪。傷害、真geometry/時序不由美術改寫。
被動真觸發/獨立Tier/真效果與真target VFX/normal-reduced/expiry/sourceKO/targetKO/end/Pause/Restart/destroy完整；Collection只寫實際玩法，未實作仍尚未開放。無16MiB固定總額，逐檔安全/兩下載/required完整就緒/所有權回收保持。
每短Gate更新WORK_PROGRESS、STATE、本角色WORK_LOG及本handoff，同分支commit/push。純文件/收據/設計[skip ci]，不Build/Browser/Pages；只有新來源、具體疑點及直接受影響範圍做最低必要驗證。上下文不足先保存第一未完Gate，不重新前檢或重做已過內容。
```
