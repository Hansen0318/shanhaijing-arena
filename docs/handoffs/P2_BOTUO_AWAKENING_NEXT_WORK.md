# P2 鎮岳 — 全局動態素材書面規格待審

```text
【山海經聯盟 — P2 猼訑「鎮岳」無縫接手】
[角色任務]
從最新 GitHub 恢復；呈交全遊戲動態素材管理書面規格供玩家獨立審閱。玩家核准文件後才寫實作計畫並另行審閱；完成必要共用 Runtime、忠實鎮岳整合、驗證後部署，交玩家實際遊戲審核。不可把先前對話設計核准當成尚未展示的書面規格／計畫核准。

[背景資訊]
Repository Hansen0318/shanhaijing-arena；唯一分支 feat/m0-combat-core-20260927；PR #1 open/unmerged；GitHub 唯一權威。參考基底6fd6fcffebe10a38061b89b0b2f2b70626d3eaa1，必須 fetch 最新 remote HEAD、branch/PR/tree/status/commits。讀 AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、本檔；最新頂部有效紀錄優先。
玩家先說「應該要整體不限定容量，不是針對單一角色，妳繼續做到部署，我才能確認遊戲裡的招式是否ok」，對提出的全局無固定總decoded-byte硬上限、保留單檔驗證／按場載入／回收／失敗處理，答「確認，繼續」。正式規格 docs/superpowers/specs/2026-10-22-global-dynamic-asset-residency-design.md 尚待獨立審閱。舊 docs/superpowers/specs/2026-10-22-p2-awakening-capacity-design.md 赤鱬 KO 十一片方案已被明確取代、未實作；保護原素材，不拆。程式仍是16MiB/64entry及131072reserve，這是當前現實而非新政策已落地。先前45 required16611224、四張候選1145272、49 required17756496的算術是舊規則的歷史量測，不是新容量／實機通過。
P1 COMPLETE；P2 Idle/Move/KO/Basic/Heavy 已核准，Special COMPLETE/PLAYER VERIFIED。鎮岳F3及四姿勢、三獨立VFX／八GIF視覺已玩家核准，receipts docs/art/approved/botuo/awakening/{f3-v2,poses-v1,visual-v1}/acceptance.json；source/prompt/manifest/QA/GIF/scripts 保護於 docs/art/candidates/botuo/awakening/composite-review-v1/。不重畫、不重問。執行前檢 docs/verification/M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md 的觀測契約尚未獨立核准；其固定容量阻擋由新容量方向取代。舊16真實機制案例及source hashes見 docs/verification/P2_AWAKENING_PREFLIGHT/{static-seed.json,mechanics.json,probe.mjs}。

[具體指令]
1. 讓玩家審閱新全局書面規格；如核准，綁定文件SHA、玩家原文和範圍，才按寫計畫流程製作可審閱實作計畫。這次「確認，繼續」核准的是前一則聊天展示的架構方向，不是這份後寫文件。若修訂先保存再審。驗證後部署意圖已獲玩家明示，但不能部署未驗證程式。
2. 計畫獲核准後 TDD 更改共用schema/cache/scene residency/presenter：移除固定全局decoded-byte硬門檻而非換較大常數，保留單檔驗證、全部required完整ready、兩請求併發、按場所有權、可回收inactive、failure/teardown/diagnostics。不得以procedural fallback偽稱required成功或以單一角色特例解決。原Chiru KO及全部核准像素不改。
3. 獨立審核鎮岳共享 cast/action/真受擊逐人 VFX/T3真實狀態契約並安裝忠實衍生包，校驗RGBA/尺寸/座標/原檔hash/Phaser native鏡射與Idle尺度。T0係數1.70/半徑2.2/CD14/風起0；instant0不等F1/F2，tacticalT0 900ms/T3 819ms；對空無假命中／假保護。T3boyi.team僅正傷害後真附近存活受益者13.5%/3.75s/radius2.832，與守群獨立/MAX不相加。普通Hit永久取消，普通傷害不斷技能；不改傷害/CD/Tier/AI/targeting/控制。
4. 測新全局超舊16MiB／64entry、guard/failed load、兩場切換及teardown；鎮岳instant/tactical/air/多目標/KO/重啟/reduced/雙向，完整required、源像素、Build及真瀏覽器。全suite若執行，逐項報告既有五個失敗而不偽稱PASS。原Special164/Browser/部署/145CI/39public及鎮岳16案例沿用未變來源證據，受影響才局部重跑。
5. 測試及原生瀏覽器證據確立後，依玩家已明示的部署意圖在同 feature branch 觸發Pages、確認Actions及公開指紋與測試版一致，提供實際URL讓玩家手機審招；未經玩家實際回覆不得寫PLAYER VERIFIED。更新WORK_PROGRESS/STATE/AGENTS/行動規格/handoff，code commit遵照CI流程；docs-only [skip ci]。回報完整HEAD、PR/tree、測試、部署與未完成Gate。

[約束條件]
唯一feature branch，PR#1保持open/unmerged；禁main merge、新替代分支、TD/P3。保護P1/P2核准素材、masters、receipts、比例/anchor/ground/mirror與遊戲機制；勿重跑無關Special164、舊部署與公開比對。兩個歷史未追蹤暫存 docs/art/candidates/botuo/special/poses-v1/.F1-initiation-master.png.cC3cw2、docs/art/candidates/lushu/special/vfx-review-v1/.target-impact-padded-v1.png.JS8JIB 不加不刪。任何後續 Chat／Work／Codex 接手指令，完整置於單一自足、可一鍵複製的 code block。
```
