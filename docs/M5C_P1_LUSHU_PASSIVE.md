# P1 鹿蜀被動「疾行」— 機制前檢與方案討論

## 2026-10-22 — 疾行已實裝／工程PASS／正常發布進行中

核准的規格與計畫原檔保持，所有舊proposal/pending文字為歷史。現已實作共用資料驅動被動：2秒內一般實際走位1單位，移速+8%維持2秒，觸發起CD4秒；技能位移不計、CD不累積，總移速增益上限15%。獨立狀態牌/倒數、HUD實際速度與進度/CD、Collection真實已實裝狀態完成。1042/1042、Build、真native4/built2、受影響P2相容native4/built2/scale10 PASS；實測2.05→2.214及距離+8%，手機尺寸實際截圖文字可辨識。發布與玩家狀態以 `docs/verification/P1_PASSIVE_RUNTIME/REPORT.md` 最新條目為準；玩家實機驗收尚未收到，不宣稱整角色完整。


## 2026-10-22 — 疾行實作計畫 PLAYER APPROVED／原生單人實作 ACTIVE

玩家「好我確認繼續」核准已呈交計畫，精確SHA256與原文見 `docs/verification/P1_PASSIVE_DESIGN/plan-acceptance.json`。正式規格與計畫皆已核准，**不再重問規格/計畫/執行方式/既定驗證後發布意願**。同branch/PR#1 open未merge，原生單人依四任務執行；驗證後正常Pages發布供P1被動玩家審核，玩家驗收本身仍待實際確認。

現在開始Task1不可變被動定義/rolling-distance與status核心的RED→GREEN，進度與裁決持續寫入 `docs/verification/P1_PASSIVE_RUNTIME/WORK_LOG.md`。本條目只記錄執行授權，不宣稱Runtime/Browser/Build/部署PASS。P1四招及美術尺度保護；P1被動驗收後才做P2厚甲，兩者完成前P3技能BLOCKED。普通Hit取消、共用資料驅動/全局素材政策與所有無關untracked保持；不main merge/替代分支/TD/角色ID特例。最新狀態以WORK_LOG及後續同分支checkpoint為準。

## 2026-10-22 — 疾行書面規格 PLAYER APPROVED／實作計畫待審

玩家「好繼續」直接回覆已呈交的正式規格，精確核准收據 `docs/verification/P1_PASSIVE_DESIGN/spec-acceptance.json` 綁定 `docs/superpowers/specs/2026-10-22-lushu-passive-design.md` 原SHA256；書面規格Gate CLOSED，不再重問。規格原檔/舊direction receipt保留不改，其舊REVIEW PENDING是歷史狀態。已完成 `docs/superpowers/plans/2026-10-22-lushu-passive.md` 四切片計畫及靜態自審；**下一唯一Gate：玩家審閱實作計畫**，不是再審規格。

計畫：1不可變被動定義/rolling-distance狀態核心；2一般移動分段與戰鬥事件整合/P1opt-in；3獨立可見badge/HUD/誠實Collection；4真native/built/受影響P2相容性證據、完整normal CI/Build/來源綁定guard/Pages/公開比對，最後P1被動玩家驗收。原生單人執行方式已定，不再次詢問或委派subagents。計畫尚未核准，不把規格同意擴大成未展示計畫已批准。

本次只有核准記錄/實作計畫/進度/handoff [skip ci]；沒有產品程式/依賴安裝/新測試/Build/Browser/部署/可讀性PASS。P1 ACTIVE／未完整，P2厚甲等P1被動驗收後，兩者完成前P3技能BLOCKED。保留全體已核准美術/四招/尺度與無關untracked、原branch/PR#1 open未merge、普通Hit取消及全局素材政策。舊1014/149只能沿用原範圍，不代表新被動PASS。接手索引 `docs/handoffs/P1_P2_PASSIVE_NEXT_WORK.md` 已更新到計畫審閱；交接仍單一完整自足code block。

## 2026-10-22 — 疾行方向續行／可辨識要求入規格／書面規格待審

玩家「確認視覺和數值有明顯可看得出來，若確認沒錯，就記錄繼續」記於 `docs/verification/P1_PASSIVE_DESIGN/direction-confirmation.json`：方案A依原2秒窗/1單位/+8%/2秒效果/CD4秒推進書面規格，附帶實際視覺及數值必須可辨識條件；不是已實測PASS或新文件核准。已完成正式規格 `docs/superpowers/specs/2026-10-22-lushu-passive-design.md`，**下一唯一Gate：書面規格審閱**，不重問已呈交方案A或角色順序。

fresh純資料投影：T0一般移速2.05→2.214，同條件有效2秒距離4.1→4.428（+0.328）；T0–T3投影保存於 `docs/verification/P1_PASSIVE_DESIGN/numerical-projection.json`，不是Session/Browser驗證，不能宣稱肉眼已明顯。發現現有MOB在正式角色view.label隨hasFormalArt隱藏，因此新規格要求獨立「疾行 +8%」狀態牌、真expiry時間條及HUD實際移速/進度/CD；觸及總15%上限須誠實顯示上限，不假稱額外+8%。新UI細節在書面規格內待審，未實作。

此切片純docs/投影/條件確認[skip ci]，無Runtime/美術/測試/Build/Browser/部署；未寫新被動或宣稱P1完成。P1仍ACTIVE、P2厚甲QUEUED、兩者PASSIVE PLAYER VERIFIED前P3技能BLOCKED。全部四招/base已核准成果、普通Hit取消、單分支/PR#1 open未merge與共用素材政策保持。後續依書面規格審閱→實作計畫審閱/原生單人執行→真驗證/發布/玩家驗收。接手索引 `docs/handoffs/P1_P2_PASSIVE_NEXT_WORK.md` 已移至新Gate，所有交接單一完整自足code block。舊proposal pending文字為前一切片歷史。

2026-10-22 Asia/Taipei — **DESIGN PROPOSAL / NOT PLAYER APPROVED / NOT IMPLEMENTED**。

## 已授權任務與事實

玩家已決定角色順序Basic→Heavy→Special→Awakening→Passive，先補P1、驗收後補P2，兩者完成前不開P3。此文件完成P1前檢並呈交具體機制選擇；不是對未展示數值的核准收據，也不是實作計畫。恢復HEAD dd9f2d68115d9f29c25d202e4557a4484f73a520／tree2aaec9b933cf2caaecd48106a295f241936ffcd7；PR#1 open/unmerged。

`src/roster/abilities.js`、`catalog.js`：P1.passive疾行的effect為空、implemented:false；其他四個獨立被動同樣未實作。`docs/M5A_CHAPTER1_CONTENT_DRAFT.md` 的原設計是獎勵改變位置/目標，不是站樁持續加成。M5B明示未指定T0條件數值；不能從名稱推導既有加成。

既有TierEffectRuntime有changed_angle條件，但證據只由特定reposition技能產生，不能當作完整一般移動歷程。P1T3逐影是覺醒末段條件傷害；不是P1.passive，不改寫為被動。BattleSession使用同一引擎處理manual/AI，`movementMultiplier`已接到一般移動速度，BattleStatuses已有movement、expiry、KO/clear、最高額外15%的移速增益上限。這些是可重用接點，不是新增被動已生效的證據。

## 路徑與三種候選

此工作屬 **Architectural**：新增跨角色共用的獨立被動定義、條件追蹤、生命周期及Collection狀態契約，不能僅把implemented改為true或套用Tier名字。先審核對話設計，再寫完整規格；按既有流程審閱規格與實作計畫後才寫產品程式。

| 候選 | 行為 | 取捨 |
| --- | --- | --- |
| **A（建議）：移動觸發短暫加速** | 一般實際走位達門檻後，短暫提升移動速度 | 符合原走位定位；沿用movement狀態；不碰四招傷害、CD、攻擊判定 |
| B：切換目標後下一次攻擊強化 | 目標轉換後對新目標給一次傷害加成 | 需定義自動換目標、目標KO、空放/多段消耗，並與T3逐影釐清，影響傷害鏈較多 |
| C：常駐固定加速 | 進場即常駐移速提升 | 容易理解，但不獎勵走位且容易混淆既有T0移速與真正被動，不建議 |

## A 的具體待審方案（全數為新提案）

- 自T0起獲得被動；不另外消耗技能按鈕或資源，不新增施放動作。
- 存活角色在**2秒滾動視窗**內，由一般移動實際走過的路程累積達**1.0競技場單位**，獲得**移速+8%，持續2秒**。
- 觸發後有**4秒內置冷卻**，從觸發瞬間起算；期間不累積下次門檻、不延長/堆疊狀態；冷卻結束以空進度重新累積。未達門檻的樣本隨2秒視窗到期移出。
- 一般移動包括手動搖桿與AI的真實一般移動；碰牆未移動不算。技能自帶衝刺/位移、teleport、spawn、外部座標重置及動畫位移都不算，保護已核准的四招路徑與速度。
- 以實際運動分段/模擬時鐘判定門檻時間；跨越觸發/到期/冷卻時刻須分段計算，避免同一路徑因step大小改變結果。渲染幀率、Pause和snapshot不得推進被動時間或重複觸發。
- T0–T3先保持相同門檻/+8%/2秒/4秒；不另加未定的被動升階成長。與其他movement增益使用現有相加且最高+15%的政策，既有Tier傷害/位移合約不更改。
- KO、戰鬥結束、Restart/新session及scene銷毀清除被動進度/狀態；控制禁止移動時無路程累積，現有有效增益按戰鬥時間到期，不另加無敵/免控。
- Collection說明應明寫觸發/數值/時間；僅P1被動實際完成後改其implemented，P2–P5保持未完成。戰場可重用現有movement狀態MOB標記，不把該共用標記冒充疾行獨有圖示；若要新圖示/特效，另列具體視覺審核，不重畫角色。

數值理由：這些是首次驗證候選，不是既有平衡結論。選+8%是低於現有movement最高+15%的保守初始提案；2秒/4秒建立有限時間窗與冷卻，原M5A沒有提供數字。必須玩家審核後才能鎖定，不宣稱已平衡或已測試。

## 預計共用接點與最小驗收範圍

- 被動定義/驗證：ability reference→generic trigger/effect data；不以角色ID分支。
- Session-owned passive runtime：一般真位移樣本、門檻/冷卻/到期與清理，接入既有status/movement；不另建第二套HP/傷害或UI時鐘。
- Collection model/view：顯示真實已啟用/未實作狀態及核准後描述。
- 必要工程驗證：未達/恰達門檻、2秒窗、4秒CD、分段step一致性、manual/AI/兩隊、碰牆/技能位移排除、Tier/status上限、Pause/KO/Restart/結束、未opt-in roster不變及Collection文字真實性。Runtime變更之後才執行受影響測試與正常CI/Build/發布，不重跑來源未變的舊美術QA。
- 玩家驗收：部署後只確認疾行實際走位觸發、加速/到期與既有角色呈現無回退；不要求重新核准四招/GIF。

## 現在停點

P1方案A待玩家對話設計審核；目前無新程式、安裝依賴、測試、Build、Browser或部署。核准此方案後寫正式可審閱規格，不能宣稱尚不存在的規格/計畫已核准。P2厚甲只排隊，P1驗收完成後才開始其具體機制設計；P3仍禁止。
