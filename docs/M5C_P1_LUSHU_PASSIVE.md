# P1 鹿蜀被動「疾行」— 機制前檢與方案討論

## 2026-10-23 — P1疾行v2 PLAYER VERIFIED／P1整角色COMPLETE；P2厚甲 ACTIVE

玩家直接回覆已部署疾行v2「好我approved 紀錄github進度規則流程後。我創新的work 給我我要給新的work的prompts，讓她確認進度流程規則後 直接讓她繼續往下執行下一步 讓她無縫接軌開發，」。新收據 `docs/art/approved/lushu/passive/runtime-v2/acceptance.json` 綁定release d1a39397562f2345bec0243ede82b6376f89684d/tree981276199ebe572d0481decfaff76349c8bb9a3d與呈交文件feb3c1182f0fd76c28c211aef232da21cf022511。P1獨立被動Gate CLOSED，不再要求相同實機/數值/文字/四招核准。既有base/四招核准加上本次新被動核准完成P1角色補完；行政結案 `docs/verification/P1_CHARACTER_CLOSURE.json`，不是新造整角裝置測試。原生自動化physicalPhone:false仍代表自動化來源，不能據此重開已接受玩家Gate。

P1 COMPLETE／PLAYER VERIFIED；P2只有獨立被動厚甲尚未完成，現在ACTIVE／MECHANISM PREFLIGHT NEXT。新Work須先fetch確認後直接做厚甲真機制核對與具體T0–T3方案，不能停在恢復報告或重問能否開始。P2厚甲原定位是前線/近隊友防禦收益，未展示的新觸發/減傷/時間/CD/非文字呈現尚無設計數值核准；依現有流程只在真正新設計Gate停下，不冒稱厚甲已實作。入口 `docs/M5C_P2_BOTUO_PASSIVE.md`、新決定 `docs/decisions/2026-10-23-lushu-passive-player-acceptance.md`、完整handoff `docs/handoffs/P2_BOTUO_PASSIVE_NEXT_WORK.md`（共享P1_P2入口同步）。P2被動PLAYER VERIFIED前P3技能BLOCKED。

流程固定Basic→Heavy→Special→Awakening→Passive→整角結案。被動須有明確且夠可辨識的T0–T3實際成長，不拿基礎Tier數值或既有四招Tier效果代替；戰場不顯示被動文字牌/被動HUD/連線，Collection保留說明。P1疾行35/50/65/80%、3秒/CD6秒及全部已核准P1/P2masters/收據/GIF/尺度/anchor/ground/mirror保持，普通Hit永久取消，鎮岳真傷害真狀態/instant/tactical/MAX契約保持。原分支/PR#1open-unmerged、原生單人、無角色ID特例與全局素材政策不變。

此切片純文件/新核准收據[skip ci]，來源guard549靜態雜湊通過；沿用已保存1047/1047、Build、P1native16/built8、P2受影響相容與正常Pages39875078049、公開149項核對（3新取+146相同指紋沿用），未重跑測試/Browser/Build/部署/公開下載。舊PLAYER PENDING、PHONE PENDING、歷史失敗/容量規則與P2舊範圍整角COMPLETE不得覆蓋最新核准/獨立被動義務。所有交接維持單一完整自足可複製code block。


## 2026-10-23 — 疾行v2已部署／公開149項核對PASS／PLAYER PENDING

正常Pages run39875078049 completed/success，完整1047/1047、Build、549項來源guard PASS；發布 d1a39397562f2345bec0243ede82b6376f89684d／tree981276199ebe572d0481decfaff76349c8bb9a3d。CI artifact12468545672 SHA256314426c6cc540c5790dfec968ff861475d4888b84ed19f5b71a22d618a68c7bb、ZIP CRC及CI/local149檔逐bytes相同。公開3個變更檔（index.html及兩個JS）新取bytes一致，146個相同路徑/bytes雜湊素材沿用既有v1成功公開指紋，完整149/149核對PASS；未重跑未變素材比對、測試或Browser。證據 docs/verification/P1_PASSIVE_V2/{status.json,run-final.json,ci-build-inventory.json,public-fingerprints.json,ci-build.log.gz,ci-deploy.log.gz}。

已移除戰場被動文字牌/HUD文字/連線。疾行T0/T1/T2/T3：+35/+50/+65/+80%，3秒/CD6秒；實際移速2.7675/3.321/3.9237/4.7232（未疊其他buff）。原生16/built8及P2受影響相容性均PASS。玩家要求的無文字/更大真增益/獨立被動Tier成長已實作並發布；只剩新版P1疾行玩家實機驗收，不能冒稱玩家已核准或P1整角色完成。遊戲 https://hansen0318.github.io/shanhaijing-arena/?passive=d1a3939 。P1被動驗收後保存新收據才啟動P2厚甲，兩者驗收後才可P3技能。已核准四招/base/全部美術尺度不重開，普通Hit取消，單分支PR#1open/unmerged及全局素材政策保持。此結案切片純文件[skip ci]，不重發來源相同的Runtime。


## 2026-10-23 — 玩家直接執行修訂：疾行v2工程PASS／正常發布待完成

玩家拒絕舊版戰場文字與不明顯8%體感，明確要求直接執行，原文見 docs/verification/P1_PASSIVE_V2/authorization.json。依共用資料T0/T1/T2/T3疾行分別+35/+50/+65/+80%，3秒、觸發起CD6秒；2秒一般實際走位1單位門檻不變。戰場不建立任何被動文字/badge/HUD/連線，Collection仍說明T成長。一般movement與outgoing的15%上限保持；具明確額度之movement狀態可提高合計上限，疾行95%，無角色ID特例。全部核准四招/美術/尺度/anchor/ground/mirror/素材政策保持；普通Hit取消。

完整1047/1047、Build、P1實際native16/built8（四Tier、雙方/實際手機搖桿、無文字、真移動距離、到期/Pause/KO/end/Restart）、受影響P2 native4/built2/scale10 PASS。原生單人diff自審非獨立審查；較高增益有顯式資料與安全驗證，普通增益上限回歸通過。Browser腳本失敗原檔保留attempt1–4：錯誤重啟API、起點越界、面向前未同步畫面、built重啟後未等開場倒數；皆修正觀測腳本，未以放寬斷言/改產品迎合測試。新版報告量測實際有效2秒距離，另驗3秒到期。官方Chrome完整120231126bytes/ZIP CRC及SHA256驗證通過，CDN截斷失敗保留。

新版工程數值不是玩家實機核准；舊v1 spec/plan/receipts/GIF全部保持原bytes並由新decision記錄需求變更。舊來源證據不可套用v2；新版source-bound guard要求完整src/public/scripts/tests/依賴與24個真Browser案例、P2相容證據及最新指令。接續正常fullsuite/Build/guard/Pages及公開比對，不使用bounded或skip繞過Runtime發布。P1被動PLAYER PENDING，P2厚甲QUEUED，P3技能BLOCKED。詳見 docs/decisions/2026-10-23-passive-visibility-tier-revision.md 及 docs/verification/P1_PASSIVE_V2/。





## 2026-10-22 — 疾行正常部署／公開149／149 PASS；唯一Gate：P1被動玩家驗收

Pages正常run39796107767 **completed/success**，deploy log明確Reported success；版本 `82257f9ea2fc6ad88e2ab3afe8241f270c550a1b`／tree `b63489cfb9dbf334bdf0956559e3747b36113c10`。CI/local/public全部149檔逐bytes及SHA256一致，證據 `docs/verification/P1_PASSIVE_RUNTIME/{run-final.json,release-deploy.log.gz,ci-build-inventory.json,public-fingerprints.json,release-status.json}`。之前QUEUED/WAITING/404為已解除歷史，不能再要求部署放行。完整1042/1042、Build、guard549、真P1native4/built2及P2相同來源native4/built2/scale10沿用，不重跑。新版本 https://hansen0318.github.io/shanhaijing-arena/?passive=82257f9 。

當前只請玩家驗P1鹿蜀「疾行」：一般持續走位觸發獨立「疾行+8%」牌及倒數，HUD移速2.05→2.214，2秒效果到期回原速/CD4秒；依實際Tier及其他增益顯示，總增益15%上限。視覺/數值已由實際Browser與截圖核對，但**尚未收到本次被動實機核准**。P1標DEPLOYED/ENGINEERING PASS/PLAYER PENDING，整角色不冒稱完整；玩家明確確認後保存新被動收據才開始P2厚甲，P2完成前P3技能BLOCKED。既有四招/base/美術核准不重開，普通Hit取消、全部保護/素材政策/單分支PR#1open-unmerged保持。最新handoff已重寫為唯一正確Gate。此切片純文件[skip ci]，沒有新Runtime、重跑測試/Browser或再次發布。


## 2026-10-22 — 最新外部Gate：Pages github-pages environment WAITING

取代上條QUEUED/無pending判斷：GitHub最新deploy job119883988676為 **waiting**；已取得 `docs/verification/P1_PASSIVE_RUNTIME/pending-deployments.json`，environment github-pages/id22885191201，wait_timer0、reviewers[]、**current_user_can_approve:false**。目前連線無法放行此環境Gate，沒有可用的部署核准寫入工具；不繞過環境保護、不另開發布或重跑測試。需有權限者查看 https://github.com/Hansen0318/shanhaijing-arena/actions/runs/39796107767 的Review deployments／環境保護原因並放行或排除阻擋。未從空reviewers推定具體保護規則，玩家開發/正常發布授權始終有效，無須重新核准計畫。build1042/1042、Build、guard549、驗證workflowSUCCESS及CI/local149/149保持；部署/public/實機PLAYER仍未完成。外部Gate完成後接續原job與完整公開比對，再P1被動驗收→P2厚甲→P3技能。既有四招/素材/普通Hit取消/單分支PR#1open-unmerged保持。


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
