# 整角色規格／整包素材審核／一次部署 — 全局流程修訂

> **SUPERSEDED 2026-10-23:** 玩家已撤銷整包F3/GIF/Runtime/一次部署的執行流程，最新權威為 [逐招開發決策](../2026-10-23-restore-sequential-skill-workflow.md)。P3規格核准仍有效；Basic→Heavy→Special→Awakening→Passive逐招完成、發布、驗收；先審已存在的水矢F3。保留本文作歷史，不按其中整包Gate執行。


## 已核准的流程變更

玩家先提出「我想要一次定義出這個角色的所有需要的技能素材，數值，記得先確認passive技能的敘述要更新在collection，和實作…類似角色屬性的database或是表格…一次確認好…一次部署…全部一起確認」。助理提出整角規格一次審、四招F3與被動樣式集中審、整包GIF審、全部整合驗證後一次部署與整角驗收。玩家直接回覆：「好，紀錄進度流程和修改流程讓未來角色開發可一樣的方式開發 後，繼續」。

這是對上述流程及繼續P3整包規格工作的授權，適用赤鱬及未來每位角色。不是尚未展示的新數值/素材/Runtime已核准。

## 從此採用的流程

1. **整角色前檢與規格總表**：先核對已核准形象/base與真Runtime，列角色屬性、Basic/Heavy/Special/Awakening/Passive全部觸發/對象/數值/T0–T3/命中或治療/持續/CD/刷新疊加/時序/互動/AI與所有素材清單、VFX受益對象及Collection正式文案。區分保留現況、提案變更、未實作。玩家一次審整表。
2. **整包關鍵姿勢審核**：依已核准整角規格製作四招F3/key pose與被動VFX樣式總覽，集中展示。被動不需要虛構施放動作；已核准base/Idle/Move/KO不重畫。先F3再其餘姿勢的保護規則保留，審核粒度改為整角色一包。
3. **整包動畫審核**：完成其餘姿勢、獨立source/path/contact或recipient VFX、四招及被動/Tier展示GIF，集中比較差異、效果強度、命中/落空或真受益對象、尺度/anchor/ground/mirror，玩家一次審整包。
4. **整包實作與必要驗證**：沿Basic→Heavy→Special→Awakening→Passive次序安排內部工作與checkpoint，採共用資料/條件/效果，不加角色ID特例。此排序不再表示每招都要獨立發布或要求重複玩家遊戲驗收。Collection與同一版本的實際效果一起更新。
5. **一次正常部署與整角驗收**：全部技能、獨立被動、Collection與素材就緒後，完整必要測試/Build/真Browser/來源綁定guard/正常CI與Pages/公開比對，一次呈交整角色遊戲版本驗收。內部進度可以多次commit，不為每招製造公開部署。只有新缺陷才局部修正/補發，未變證據沿用。
6. **整角結案與下一角**：保存精確核准原文/版本/hash收據、進度規則與單一完整自足handoff。未核准的新設計/美術/遊戲版本不可假稱已核准。P1/P2既有已完成成果不因流程改變重新跑一遍。

## 共用資料與被動文案硬規則

沿用GitHub中角色/技能/Tier資料，不另架外部DB。機器可讀整角proposal記錄數字與素材需求，玩家Markdown總表提供審核；核准後以共用資料及一致性檢查連接實際Runtime與Collection。不能把文件提案當成遊戲已生效；未實作被動維持「尚未開放」，整包Runtime完成時同步正式效果文案。Collection只寫玩法/世界觀/必要數字，工程限制/審核/安全額度/已實裝等只放docs/測試。

每個現有/未來被動必須真效果、獨立可辨T0–T3成長、對應真狀態/真受益對象VFX、reduced-motion提示及完整清理，不能用同名Tier效果/基礎屬性/文案代替。戰場禁止被動文字牌/HUD數字/連線、不能放大角色。舊分招流程中與本決定衝突的逐招設計排隊/發布節點，由本整包流程取代；原素材品質、真實機制與核准保護不變。

## 固定邊界

原生單人、同feat/m0-combat-core-20260927與PR#1open/unmerged，不main merge/另開分支/TD/角色ID特例；普通Hit永久取消。保護全部核准masters/收據/GIF/尺度/anchor/ground/canonical右向/左向mirror、P1/P2真數值/時序/MAX。素材無固定16MiB總量/required數量/reserve拒絕門檻，逐檔安全/兩下載/完整required/所有權/回收/真失敗/destroy保留。來源未變不重跑驗證/部署/公開下載。

## 本切片與下一Gate

P1/P2維持COMPLETE／PLAYER VERIFIED。P3整角色整包規格ACTIVE，第一份具體提案docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md；待玩家整表審閱，不只做Basic。不開始素材生成、共用Runtime新效果或Pages發布。這次流程/規格文件及原生既有機制前檢採[skip ci]，不是產品來源變更。
