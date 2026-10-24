# 游息STYLE已玩家核准；新Work直接接GIF Gate

```text
【山海經聯盟｜P3 赤鱬 Passive「游息」STYLE已核准／接續GIF】

[角色任務]
從GitHub最新權威狀態恢復，直接沿已核准游息樣式完成GIF Gate的可審核成果。不重問是否開始，不停在接手報告。原生單人、不委派。

[背景資訊]
Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927；PR #1保持open／unmerged，禁止merge main。
呈交樣式checkpoint：aeff9d6c075b150814914bc55a8fefa33f77e72a，僅供定位，先fetch最新remote，不覆蓋新成果；先核對並恢復本機未push工作。
玩家已明確核准雙魚受益者STYLE、同尺度四Tier短回流紋及靜態位置。精確收據：docs/art/approved/chiru/passive/style-v2/acceptance.json。該收據所在最新remote commit是核准交接checkpoint。舊manifest／REVIEW的PENDING僅呈交歷史，不重畫、不重審原數值表或STYLE。
P1／P2 COMPLETE，P3 Basic／Heavy／清晰版／Special／Awakening已玩家核准；潤澤收據docs/art/approved/chiru/awakening/runtime-v1/acceptance.json。Passive只有STYLE獲准，尚未GIF／Runtime／部署；P3整角未完成。

[具體指令]
1. 先讀AGENTS.md、WORK_PROGRESS.md／docs/STATE.md最新段落、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/decisions/2026-10-23-restore-sequential-skill-workflow.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、本handoff、docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md第5節及docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json。再讀STYLE收據與docs/verification/P3_PASSIVE_PREFLIGHT/{WORK_LOG.md,runtime-readonly.json,candidate-recovery.json,style-verification.json}。
2. 沿用docs/art/candidates/chiru/passive/style-v2/的originals/paired-fish.png、paired-fish-padded.png、paired-fish-display.png、T0–T3-strokes.png與T0–T3-style.png、manifest.json、prompt.txt及prepare_preview.py。逐hash核對收據後沿用，不重新生成或覆寫；舊whole-character損壞候選/原圖與失敗證據保持。核准Idle cell亦已綁定hash；尺度/chestX158/hoverY203不變，不按特效外框放大角色。
3. 機制差異前檢已保存，沿用當前maxHp治療、正heal event與共用生命週期能力；本輪只做GIF，不提前寫Runtime。真正缺口為共用rear-support條件選人、instant-heal獨立CD與受益者雙魚呈現；不能把T2 chiru.rear-heal modifier當獨立被動，未來Runtime依核准spec僅將顯示名改清流，保持ID/條件/幅度。
4. 核准契約：戰鬥中、caster存活可行動未受控、有存活敵人、距最近敵人≥2.0；固定4.2內存活同隊HP≤60%（含自身），最低HP/maxHp優先，同值穩定instanceId。一次即時治療一位當前maxHp×8/12/16/20%，缺血封頂、不吃主動healing scale/回流/清流、不復活/暴擊/循環。真正amount>0才啟動獨立8秒CD並顯示真受益者印記；先傷害/KO→主動→重新檢查被動。此為已核准契約，不要求重審。
5. 製作四Tier正常/減少動態GIF，保持雙魚與1/2/3/4組短回流紋同尺度可辨。正常650ms內收散去；reduced為靜態紋片淡出；650ms僅視覺壽命，不是持續治療或減傷。展示左右/Idle、caster與他人受益者分離/自療、無正治療不畫、650ms到期、受益者KO/casterKO/end/Restart/destroy所需的預覽清理情境；可合理合併比較，不強制固定GIF數量。逐項明示是腳本情境美術模擬，不能冒稱真Runtime/清理工程PASS。被動不新造F1–F4／F3主動施法動作，不改角色本體。
6. 保存原圖、衍生/時間線/來源hash、完整GIF解碼與各幀duration/安全邊界/左右/回Idle/到期檢查，展示可辨清晰預覽。完成後呈交並停待玩家GIF明確核准；STYLE核准不等於未見GIF/Runtime核准。不直接Runtime或部署。
7. 素材處理前與長工作前保存coherent checkpoint；更新WORK_PROGRESS、STATE、本招WORK_LOG與handoff，同分支commit/push。CLI無認證用已連線GitHub API；逐blob Git SHA及完整tree核對，不把截斷內容當成功。遇阻擋先保存成果/真失敗證據/唯一下一步；不靜默重做。來源未變不重跑已完成四主動測試/Build/Browser/Pages。

[約束條件]
不新branch/worktree、不動TD、不merge main、不重置玩家存檔；普通Hit永久取消。保護全部approved masters/收據bytes及P1/P2/P3四主動的行為/尺度/anchor/懸浮下緣/右canonical左mirror。無固定16MiB總額，逐檔安全/兩下載/required完整就緒/真失敗處理/所有權回收保持。被動真受益者VFX、可辨Tier/reduced-motion/expiry/KO/casterKO/end/Restart/destroy是最終Runtime必要要求，不加戰場被動文字牌/連線。Collection真實作完成才更新純玩法文案。本輪只完成GIF Gate可審成果，停待玩家核准。所有後續交接保持單一、自足、可一鍵複製code block。
```
