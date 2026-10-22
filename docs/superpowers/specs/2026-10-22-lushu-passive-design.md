# P1 鹿蜀「疾行」獨立被動 — 共用機制與可辨識呈現規格

日期：2026-10-22 Asia/Taipei。**WRITTEN SPEC REVIEW PENDING / NOT IMPLEMENTED / VISUAL UNVERIFIED**。

## 1. 目的、授權與範圍

玩家已授權P1疾行→P2厚甲補完，並回覆「確認視覺和數值有明顯可看得出來，若確認沒錯，就記錄繼續」。這允許沿已呈交方案A推進規格，附帶實際可辨識要求；不代表未來視覺方案/書面規格/計畫/Runtime已核准或已通過。本規格具體化該要求供一次書面審閱，不能以先前對話代替本文件審核。

目標是讓玩家知道疾行何時真的生效、加速多少、何時到期，並讓同條件移動對照可量測。P1已有base/Idle/Move/KO/四招全部核准保持。只增加獨立被動與其真實狀態顯示；不改四招傷害/CD/施放時序/技能位移/尺度/anchor/ground/mirror。P2只排隊、P3技能仍禁止，普通Hit永久取消。順序Basic→Heavy→Special→Awakening→Passive→完整結案保持。

## 2. 機制契約

### 2.1 觸發與計時

- 從T0起具備，T0–T3使用相同參數：一般真實走位在2秒滾動時間窗內累積1.0競技場單位，觸發movement multiplier1.08，持續2秒；內置冷卻4秒，自觸發時起算。
- 冷卻期間不累積新的路程、不刷新或疊加疾行；到期重新以空進度累積。觸發會清空舊累積。只有一般行走、AI追擊/撤退/避讓/走位所產生的真實平移計入；manual與AI、友軍與敵軍共用。
- 記錄一般運動的實際分段路徑長度，不用起終點直線替代轉彎路程。碰牆裁切後未前進部分不算；搖桿輸入但零位移不算。技能衝刺/位移/staged rush、出生、teleport、場景重置、外部座標修正及畫面/鏡頭/動畫位移不算。
- 以session模擬時鐘追蹤piecewise linear ordinary-motion segments與各自時間/路程；視窗只積分(time−2,time]內且在冷卻後的部分。觸發、舊樣本剪除點、狀態到期與冷卻邊界為分段邊界；在本段首次達1.0的最早時刻觸發，再用加速值積分後續運動。不得整個delta都吃新buff，也不得延至下一個paint才啟動。
- 數值採共享時間比較容差，距離誤差門檻不得大到提早觸發；寫入一次觸發事件並用唯一身份去重。相同一般運動路徑在粗/細step分割下，觸發時間、位移、狀態期滿、冷卻與事件數在預先固定的數值容差內一致。
- 有效期間[start,start+2)，冷卻[start,start+4)；剛好期滿不可留殘效，剛好CD結束的後續路程開始算。Pause不走模擬時間；snapshot/render不變更狀態。受控而不能行走時不累積，但已生效狀態照模擬時間到期，不另加免控或停止CD。

### 2.2 效果、Tier與清理

- 只影響既有一般移動的movement multiplier，不修改base stats、攻擊間隔/傷害/CD、技能衝刺距離/速度/路徑、AI決策或碰撞規則；移速變動導致自然追擊位置改變是新增被動的合法結果。
- 疾行的1.08固定、2秒固定，不啟用未核准的額外Tier數值成長。現有Tier base moveSpeed成長保留。既有多movement狀態加成相加、最多+15%的政策不改，不採倍乘。
- 有其他movement增益時，顯示區分「疾行貢獻+8%」與「實際移速」，不得說每次都額外快8%；受總上限影響的實際值必須依真status aggregate計算。
- KO、戰鬥結束、新session/Restart/destroy清除該instance全部進度、CD及被動狀態/視覺。狀態若被既有清理或容量策略移除，badge立即以真狀態消失，不能用UI本地timer繼續假加速或自動重補冷卻內效果。

## 3. 明顯但不冒充傷害的視覺與數值

### 3.1 目前確切問題

`src/runtime/statusPresentation.js`只提供通用MOB字樣；`ArenaScene.js`把它拼入view.label，但正式角色hasFormalArt會隱藏整個label。不能沿用這條路徑後宣稱玩家看得見被動。現有portrait/HUD/HP契約保持，不能恢復正式角色姓名/debug標籤當修正。

### 3.2 新增共用被動狀態牌（本書面規格提案）

- 用獨立於placeholder姓名的共用status presentation，資料驅動呈現，只在真實疾行狀態有效時顯示於來源角色HP bar上方。左右兩隊、兩面、普通/Reduce Motion都可見。
- 高對比深底、淺青邊線與白字「疾行 +8%」（未觸及總上限時）；若與其他移速狀態合計觸及15%上限，改顯示「疾行 · 移速上限15%」，不暗示仍能額外快8%。搭配同色水平剩餘時間條，長度由真expiry/session clock計算；不得僅用顏色、MOB或短暫閃光表示。不拉伸角色、不覆蓋臉/HP，不用全屏閃爍/震動/受擊爆破/護盾暗示。
- 最小可測mobile viewport採既有852×393；狀態文字投影後至少12CSS px，邊界內clamp/垂直讓位維持HP清楚且不重疊重要HUD。字體/標籤大小單獨依viewport調整，禁止放大actor或改戰場尺度來達標；6人重疊場景須檢查標籤排序與遮擋。
- 狀態生效即顯示；到期/KO/清理即消失。Reduce Motion保留相同靜態文字與時間條，只有剩餘量更新，不需要閃爍或粒子。短暫觸發動效不是驗收必要項。
- 選中角色的HUD增加共用passive詳情槽：顯示「疾行」、未啟動時的走位進度、有效剩餘秒數/冷卻剩餘秒數，以及實際一般移速。只消費session提供的唯讀snapshot，不自行估計戰鬥數值；CD期間「有效剩餘」與「CD剩餘」可同時存在，不能將未到CD的expiry誤標成ready。
- 所有常態遊戲面文字避免debug/implementation名詞；PLAYER可見「疾行 +8%」「剩餘 1.5 秒」「冷卻 3.5 秒」「移速 2.214」及觸發進度；不顯示raw IDs或engine欄位名。
- Collection的被動區顯示真實狀態與完整條件/時間；未實作P2–P5顯示「尚未實裝」，不提前啟用。只有完成P1 Runtime後才同步P1 definition/catalog兩處implemented狀態，不能只改文字。
- 本切片不重畫角色、不生成PNG/GIF；所需狀態牌/時間條為共用文字與UI幾何，不新增master/角色姿勢或假攻擊動作。若後續要求額外美術/獨有圖示，另經既有素材Gate。

### 3.3 數值基準與可辨識限制

保存的`docs/verification/P1_PASSIVE_DESIGN/numerical-projection.json`只做catalog/Tier純投影，不是session或Browser實測。無其他增益、碰牆/停步/技能位移下，2秒直線位移：

| Tier | 原移速 | 疾行移速 | 原2秒位移 | 疾行2秒位移 | 差值 |
| --- | ---: | ---: | ---: | ---: | ---: |
| T0 | 2.05 | 2.214 | 4.1 | 4.428 | 0.328 |
| T1 | 2.214 | 2.39112 | 4.428 | 4.78224 | 0.35424 |
| T2 | 2.378 | 2.56824 | 4.756 | 5.13648 | 0.38048 |
| T3 | 2.624 | 2.83392 | 5.248 | 5.66784 | 0.41984 |

公式speed=TierMoveSpeed×1.08；distance=speed×2。這證明候選數值有非零差異，不能保證肉眼感覺「明顯」。不能因8%看起來不明顯而私改15%或延長時間；先用文字/時間條/實際移速與同條件對照證明效果，再玩家驗收。若仍未達要求，保存具體差異/遮擋證據並提出最小呈現或數值修訂供審，不偽造PASS。

## 4. 共用元件、介面與所有權

- **不可變定義層**：獨立passive schema/validator，解析character.abilities.passives中的definition；具備implemented與generic trigger/effect/presentation metadata。第一個通用trigger為ordinary distance in window，effects用既有status資料。未opt-in/未implemented不執行；拒絕非有限/不合法視窗、距離、duration、CD或倍率。
- **Session-owned PassiveRuntime**：每個actor instance獨立保存rolling segments/last evaluation/readyAt/active status identity；只由authoritative ordinary-motion hook傳入time/裁切後segments，切開技能位移來源。不能用每幀actor終點差混入技能衝刺。持有instanceId/session identity而不是character ID switch，兩隊和手動AI均走相同路徑。
- **BattleStatuses/一般移動**：唯一效果擁有者為既有statuses，以actor/passive reference身份綁定；複用movementMultiplier的上限與到期，不產生第二套base stats或重複buff。step interval採被動deadline與movement threshold分段，保護既有staged action的精確hit時序。
- **唯讀呈現投影**：輸出來源instance、localized label、declared contribution、真實effective speed、active identity/start/expiry、readyAt與progress。HUD、戰場badge、Collection都從同一定義/狀態建構；若狀態不存在不可顯示active。不得從效果牌反向修改simulation。
- **錯誤與生命週期**：無效definition直接驗證失敗；未實作被動保留誠實描述，不默默當已啟用。scene teardown取消引用與清空UI物件；重新進入/Restart不得重播上一場被動或沿用CD。無固定總容量政策與逐檔安全/兩下載/完整required/ownership/reclaim/fail/destroy保持。

## 5. 必要驗收與發布

1. 定義驗證及Session行為：未達/剛達門檻、2秒窗局部剪裁、CD與到期邊界、轉彎分段路程、粗細step一致、manual/AI/兩隊、碰牆與技能位移排除、Pause/KO/Restart/結束/清理。
2. T0–T3：無其他buff時實測一般移速倍率1.08；其他movement加成及15%上限一致；所有未opt-in角色、既有Tier效果與P1四招時序/傷害/技能位移保持。共享生命週期/時間排程修改須依真影響跑正常回歸，不能拿舊1014全綠替代新Runtime驗證。
3. 真實renderer/built app：正式P1的獨立badge在852×393可讀，左右/兩隊/normal/reduced均出現正確文字與倒數，expiry/KO即移除；HUD數值由真session狀態生成；6人重疊不遮住HP/主要HUD。不得用繪圖重建或GIF代替實際Browser結果。
4. 同條件移動對照使用相同初始座標、控制、Tier與模擬時鐘，在有效2秒內記錄baseline與passive的距離、renderer位置/速度；控制測試可將threshold設為極大而保留同角色/同四招，透過generic test definition完成，不加產品P1例外。對照fixture不是正式場景玩家驗收。
5. 使用正常同分支CI/Build/Pages，更新source-bound release evidence guard以綁定真新增驗證與變更來源，發布後依實際檔案核對。舊證據保留原作用域，不繞過guard、不改舊收據結果。
6. 玩家只需驗收疾行的可見啟動/數值/持續/到期與既有角色無回退；真確認後才標P1 PASSIVE PLAYER VERIFIED / FULL CHARACTER COMPLETE，再做P2厚甲。P3角色技能待P2也驗收後才開。

## 6. 當前Gate與停止條件

此規格已進行靜態自審：定義、觸發/到期/CD邊界、技能位移排除、status cap、顯示與真值來源均有具體契約；數值投影與原資料/公式核對。沒有寫產品程式、安裝依賴、跑Runtime測試/Build/Browser或部署，也沒有視覺/玩家驗收PASS。

下一個唯一Gate：玩家審閱這份完整書面規格（尤其新增獨立badge/HUD與可辨識驗收）。書面規格通過後才建立實作計畫並按既有流程選擇執行；原生單人模式，不自派子代理。本次對話確認不再重問方案A/角色順序，但不能冒充新寫規格或尚不存在計畫已核准。
