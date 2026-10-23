# 2026-10-23 — 玩家撤銷整角色批次開發；恢復逐招完整開發與驗收（最新全局決策）

## 玩家直接指令與優先順序
玩家：「之前要一次全部完成角色的技能開發vfx，這個是規則 我要撤除，恢復之前的 basic heavy special awaikenijg passive 的技能是單一完成後接續開發技能的方式，不然現在一起開發，work會容量不夠，妳把規則流程進度更新修改後紀錄github，然後會在開新的chat和work繼續開發」。

**此決策明確取代** docs/decisions/2026-10-23-whole-character-batch-workflow.md 之「同時製作四招F3+被動樣式、整包GIF、整包Runtime、一次部署/整角玩家驗收」要求。舊決策與核准收據保留作歷史，不刪除、不改寫既有玩家原文。任何以舊整包計畫描述的待辦均按本決策重新分段；不能把歷史舊標題/舊PENDING當最新執行規則。

## 新的正式工作單位：一個技能完整做完，再下一個
固定順序：Basic → Heavy → Special → Awakening → Passive。每招**獨立且完整**執行：
1. 從最新版GitHub真規格/現有Runtime/已核准本體與美術核對該招；既有P3整角spec核准仍有效，不重審原表。
2. 只針對當前招使用現成候選F3/key pose（如已有），完成單招玩家美術審核；確認後完成該招其餘動作F1–F4及所需獨立VFX，保存不可變approved receipts/hash；無效或未核准候選不可直接接入Runtime。
3. 製作並提供該招「角色動作＋起手/飛行/接觸/命中或治療/餘波」可辨GIF供玩家核准；不虛構不存在的階段，尊重真機制/時序/對象，保護已核准素材。
4. 只整合當前招真Runtime及Tier/instant/tactical/冷卻/中斷/命中/效果與生命週期，資料驅動且無角色ID特例。Passive必須真被動、獨立Tier、實際受益者VFX、正確清理與同版本Collection玩法文案。
5. 只驗證當前改動及受影響回歸（適用時完整suite/Build/native+built Browser/source guard），正常CI/Pages/public發布單招可玩版本，交玩家遊戲體驗驗收。收到玩家核准後保存精確收據與checkpoint，才啟動下一招。
6. 每一招拆短Task/Gate，每次工作會話更新 WORK_PROGRESS、STATE、WORK_LOG、handoff，commit/push同分支；即使Work容量/上下文不足，新Work按最新GitHub恢復第一未完Gate，**不等五招一起完成**。每招結束為自然handoff點，禁止無謂重做已通過內容。

## P3 赤鱬起點
- P1鹿蜀、P2猼訑 COMPLETE / PLAYER VERIFIED；不重做。
- P3整角色正式規格 docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md 已有玩家核准收據 docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json；數值/時序/Tier/Collection仍依核准規格，**流程撤銷不等於撤回規格核准**。
- 先前已生成四招F3與游息候選 docs/art/candidates/chiru/whole-character/f3-batch-v1/{basic-f3.png,heavy-f3.png,special-f3.png,awakening-f3.png,passive-style.png}，manifest/prompts/originals/review一併保留。全部仍是 CANDIDATE / PLAYER REVIEW PENDING，未獲美術核准；**不得再以整包Gate綁住Basic，亦不得重生現有候選**。
- 新首個未完成Gate：只呈交 **Basic 水矢 basic-f3.png** 與核准 identity/Idle 作外觀/左右配件/比例核對，向玩家取得Basic F3核准或具體修正。其餘四項候選原封不動排隊，等對應技能進行時再審。之後Basic其餘姿勢→單招VFX/GIF→單招Runtime/驗證/正常發布/玩家驗收，再Heavy、Special、Awakening、Passive。
- 既有整包計畫 docs/superpowers/plans/2026-10-23-chiru-whole-character.md 是歷史計畫，執行粒度/部署Gate由本決策取代；不因已核准舊spec擅自宣稱F3/GIF/Runtime已通過。

## 永久保留硬規則
單分支 feat/m0-combat-core-20260927；PR#1 open/unmerged；GitHub唯一權威，每次先查最新HEAD；原生單人，不新branch/worktree、不合main/不動TD、不動無關untracked；普通Hit永久取消；右向canonical/左向mirror，尺度/anchor/ground、approved masters/收據/GIF與P1/P2完整保護。所有現有/未來被動真VFX、可辨Tier、真受益者/reduced-motion/expiry/KO/end/Restart/destroy完整清理，戰場無被動文字牌/HUD數字/連線/擴大角色，Collection只寫玩法效果。普通15%/P1顯式疾行95%規則及P2 MAX/時序不變。全局沒有固定16MiB容量/素材數量/reserve拒絕門檻；逐檔安全、兩次下載/required完整就緒、所有權/回收/destroy仍生效。實際產品有變才重新跑相符來源的必要驗證/正常發布，文檔checkpoint使用[skip ci]。新Chat/Work/Codex交接一律一個完整自足可複製code block。
