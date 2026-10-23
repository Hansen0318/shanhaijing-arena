# P2 猼訑獨立被動「厚甲」— 接續入口

## 2026-10-23 — 玩家確認VFX／Collection OK，P1與P2整角完成

玩家最新原文「好我確認OK繼續是什麼」「我確認OK，紀錄進度流程規則 接下來是什麼」直接驗收release32424075b5c91844187fc80a566a9140c7e955d6/treeab0a6733ff312d48fef3979e1e0697aaaf74a6de之新增疾行風痕與Collection修正文案；新收據docs/art/approved/lushu/passive/runtime-v3-vfx/acceptance.json，10項證據hash綁定，原收據不改。最新決定docs/decisions/2026-10-23-passive-vfx-copy-player-acceptance.md，整合結案docs/verification/P1_P2_PASSIVE_VFX_CLOSURE.json。P1/P2 COMPLETE／PLAYER VERIFIED，新增呈現Gate CLOSED，不重問同版本風痕/文案/厚甲或已核准四招。下方PENDING/須確認風痕為歷史。

全現有及未來被動完成必須有相符真狀態VFX、獨立Tier真成長/可辨識、reduced-motion提示與expiry/KO/end/Restart/destroy清理；戰場不放被動文字牌/HUD數字/連線或放大角色。所有玩家介面只寫玩法效果/必要數字及世界觀，不混入開發規則。固定Basic→Heavy→Special→Awakening→Passive→整角結案。既有masters/收據/GIF/尺度/anchor/ground/右向canonical左向mirror/數值/MAX/時序保持；普通Hit永久取消、全局素材無固定總量/數量/reserve拒絕門檻，逐檔安全/兩下載/required/所有權/回收/真失敗/destroy保持。

下一路線圖項目P3赤鱬Basic「水矢」，P1/P2被動先決條件已解除；建議下一任務是核對已核准P3形象與真機制/命中/射程/時序/Tier→差異化動作設計→單張本體F3審核，再依流程其餘姿勢/VFX/GIF/Runtime/驗證/正常發布/玩家驗收。本次只有紀錄核准及回報下一步，未開始P3實作/製圖，不能把進度詢問當成未展示設計或新素材核准。

純文件/收據[skip ci]，新來源guard585靜態核對、核准證據hash通過；Runtime未變沿用1070/1070、Build、P1native16/built8、P2native16/built8、Collection5+5、正常Pages39902216798及公開149/149，不重跑/重部署/重下載。原生單人、同feat/m0-combat-core-20260927、PR#1open/unmerged、保留無關untracked，不main merge/新分支/TD/角色ID特例；所有handoff仍單一完整自足code block。



## 2026-10-23 — VFX與文案修正已發布；P2整角結案／只待新增P1風痕確認

Release32424075b5c91844187fc80a566a9140c7e955d6／treeab0a6733ff312d48fef3979e1e0697aaaf74a6de，正常Pages#1105/run39902216798 build120246115913+deploy120246346745 SUCCESS；CI完整1070/1070、Build、585guard PASS。驗證workflow39902216942 SUCCESS，精確沿用本次新來源Browser證據；既有P2覺醒workflow39902216764被src/**自動觸發且SUCCESS，非手動重跑。artifact12479621205 SHA256b5c8ed9085784394daa83a9ebc42d1c41dbdaed3dcd95028efb696a28e9df058、ZIP CRC與CI/local149逐bytes一致；公開149/149（3新取+146相同path/bytes/hash指紋沿用）PASS，證據docs/verification/PASSIVE_VFX_COPY_REVISION/。

Collection已直接修正P1/P2及尚未開放被動來源，只呈現玩法效果/Tier數字/持續CD，移除開發規則/安全額度/已實裝。所有玩家介面禁止工程規則混入文案；全現有與未來被動完成必須有對應真status VFX、獨立Tier成長/辨識、reduced-motion可讀與到期/KO/end/Restart/destroy清理。厚甲琥珀護甲保持；疾行新增青色風痕1/2/3/4組，全部既有數值/時序/MAX/美術尺度不變。新decision為全局硬規則，不只適用P2，未來未知效果仍須擴充共用系統及實證，不宣稱已實裝。

玩家「確認好我就approved目前」之厚甲VFX/全局規則前提已確認並存精確收據docs/art/approved/botuo/passive/runtime-v1/acceptance.json，要求文案修正亦已部署。14/14既有base/四招/新被動收據與證據hash一致，P2行政整角結案docs/verification/P2_CHARACTER_CLOSURE_WITH_PASSIVE.json；不重問厚甲、P2四招/裝置或捏造逐Tier量測。原P1機制/四招/美術核准保留；新增青色風痕尚未被玩家看到/核准，只此新增呈現Gate待觀察，不能寫新VFX PLAYER APPROVED。P3仍BLOCKED，不自行展開P3/TD。

遊戲https://hansen0318.github.io/shanhaijing-arena/?passive=3242407 。下一合法步驟只呈交新增P1風痕與精簡文案供觀察；有新缺陷才修受影響範圍，來源未變不重跑測試/Browser/Build/部署/公開下載。此次為發布後行政文件[skip ci]；原分支/PR#1open-unmerged、原生單人、保留所有核准masters/收據/GIF/scale/anchor/ground/mirror/無關untracked、普通Hit永久取消與素材政策保持。固定Basic→Heavy→Special→Awakening→Passive(真效果+Tier+VFX+清理+驗證+發布+玩家驗收)→整角結案，所有handoff單一完整自足code block。下方舊PENDING/發布NEXT為歷史，以本節和最新收據為準。



## 2026-10-23 — 全角色被動VFX／玩家文案硬規則，呈現修正驗證ACTIVE

玩家確認厚甲既有護甲VFX並要求全現有/未來角色遵守；精確原文與規則在docs/decisions/2026-10-23-passive-vfx-player-copy.md，P2既有release1f6b47b之條件核准收據docs/art/approved/botuo/passive/runtime-v1/acceptance.json。仍必須完成本次Collection文案修正發布；不冒稱未展示的新P1風痕/新文案已經玩家驗收。舊P1機制/四招/美術核准不重開。

所有現有與未來被動完成必須含符合技能、真status同步、Tier可辨、reduced-motion可讀、到期/KO/end/Restart/destroy清除的VFX；禁止戰場被動文字/HUD/數字/連線或放大角色。所有玩家介面只寫世界觀、玩法與必要效果資訊，工程限制/審核/包裝/安全額度/「不顯示文字」等只放docs與測試。直接修正來源，不做文字過濾。已提供技能不顯示「已實裝」，未開放顯示「尚未開放」。

已修正P1/P2及未開放被動Collection文案，新增通用movement/speed-streaks，P1青色風痕1/2/3/4組；P2琥珀護甲維持。數值/時序/MAX/美術尺度保持、無角色ID特例。RED4→GREEN12，完整1069/1069、Build PASS；真native/built P1/P2與手機Collection驗證進行中，細節docs/verification/PASSIVE_VFX_COPY_REVISION/WORK_LOG.md。新來源guard/正常CI與Pages/公開核對NEXT；這是中間checkpoint，尚未發布。

固定Basic→Heavy→Special→Awakening→Passive(真效果+Tier+VFX+清理+驗證+發布+玩家驗收)→整角結案。P3技能仍BLOCKED。原生單人、原分支feat/m0-combat-core-20260927、PR#1open/unmerged，保護所有既有收據/master/GIF/anchor/ground/mirror與無關untracked；普通Hit永久取消，全局素材政策與兩下載/required/安全/回收保持。來源未變沿用其範圍、不重做既有四招/尺度驗證；新呈現來源不能用舊guard掩蓋。所有handoff單一完整自足code block。


## 2026-10-23 — 厚甲已部署／CI與公開149核對PASS／只待厚甲玩家驗收

Release1f6b47b4e30a867b1b8d294c69fdeaedc51f0b98／tree33fb1eab6d61b3f419e812de97b38fd19e651aa8，正常Pages#1104/run39881533879 build+deploySUCCESS，CI完整1065/1065、Build、599guard PASS；verification39881533921SUCCESS、來源完全相同Browser證據沿用。artifact12470144586 SHA25627f047b593a84a0e0de67729e7742fc4692c1f1f6c37e3d44e4faa1de7b0dc4e/ZIPCRC及CI/local149檔逐bytes一致；公開149/149（3新取+146相同指紋沿用）PASS。全部證據docs/verification/P2_PASSIVE_RUNTIME/。

厚甲真實自身減傷T0/T1/T2/T3=20/30/40/50%、4秒/CD8秒；敵人≤2.2，或隊友≤2.4且其敵人≤2.2；MAX不加算、各自到期，無文字護甲1/2/3/4組。匿名/重新命名角色與被動真Session已證明通用資料驅動，不看P2 ID。未來角色仍需自己的真效果/Tier/清理/來源驗證/發布/玩家驗收才完整，不得只新增文案或假稱未知效果已支援。

遊戲https://hansen0318.github.io/shanhaijing-arena/?passive=1f6b47b 。**唯一剩餘Gate：厚甲玩家驗收**，只看接敵護甲/耐打感與Tier成長；未收到本版本核准，不寫PLAYER VERIFIED或P2整角色COMPLETE。P1已結案與P2四招/所有已核准美術尺度/時序/MAX/素材政策保持，不重驗；普通Hit取消，P3技能仍BLOCKED。原分支/PR#1open-unmerged、原生單人自審、無main merge/新分支/TD/角色ID特例。此次純發布紀錄[skip ci]、Runtime來源未變，不重跑測試/Build/Browser/部署/公開下載。


## 2026-10-23 — 厚甲本機工程PASS／正常發布ACTIVE

完整1065/1065、Build/149檔、厚甲真native16/built8、P1新來源native16/built8、P2受影響native4/built2/scale10與新來源guard599/真篡改負向/恢復均PASS。共用空間減傷/四Tier/無文字護甲真實生效，future-guardian與重新命名被動的真Session仍減HP20%，無角色ID特例。未來每角仍需自己真效果/Tier/清理/發布/玩家驗收，不能只靠文案或基礎數值。

工程報告docs/verification/P2_PASSIVE_RUNTIME/REPORT.md及WORK_LOG.md保留7項初始失敗的來源遷移與Browser fixture修正，最新全PASS；原生單人自審非獨立review。已核准四招/美術/尺度/ground/anchor/mirror、P1疾行/既有MAX與素材政策保持，普通Hit取消。正常發布採新guard，不拿舊P1來源證據覆蓋厚甲。

目前CI/Pages/public尚待實際完成，玩家厚甲驗收PENDING、P2整角色未完整、P3技能BLOCKED。下一合法步驟：原分支正常CI/Build/Pages與149公開比對，不重跑來源未變的本機測試/Browser或重審美術。PR#1保持open/unmerged；不merge main/新分支/TD。此Runtime發布候選走正常CI，非skip/bounded繞過。


## 2026-10-23 — 厚甲方向確認／共用防禦被動已實作，真Browser與發布NEXT

玩家「確認其他未來整體角色開發真的會有效果，就繼續實作」確認厚甲方向並直接授權實作，精確原文/範圍見docs/decisions/2026-10-23-botuo-passive-execution.md、P2_PASSIVE_RUNTIME/authorization.json；不重問開始/執行方式或額外流程核准，不冒稱未展示文件逐項獲准。正式spec/原生單人plan已補齊。

共用spatial-pressure→mitigation、匿名角色/雙陣營/多instance/Tier表、P2厚甲20/30/40/50%、4秒/CD8秒、MAX/各自到期與無文字琥珀護甲弧片已實作；來源kind/data驅動、沒有角色ID特例。未來每角必須真效果、獨立Tier、狀態/清理、來源驗證、發布與玩家驗收才算完成；未支援的新類型必須擴充共用系統，不承諾未來角色已生效。P1/P2核准四招/美術/比例/時序/素材政策、普通Hit取消、原分支PR#1open/unmerged、P3技能BLOCKED保持。

Task1 RED→GREEN22/22；Task2真Session/P1距離22/22，原fixture遷移後受影響68/68；Task3無文字Graphics/cleanup15/15。完整first1060/1053/7fail原始保留，已按來源定位metadata/舊fixture/浮點斷言遷移，未刪除原遊戲斷言。最新完整測試與下一步以docs/verification/P2_PASSIVE_RUNTIME/WORK_LOG.md為準。尚未Browser/Build/新來源guard/Pages/公開比對/玩家驗收PASS；checkpoint不是發布。下一步完成Task4必要真驗證與正常發布，不重做前檢或重審四招/美術。


2026-10-23：MECHANISM PREFLIGHT COMPLETE / NEW DESIGN REVIEW PENDING / NOT IMPLEMENTED。

P1疾行v2已PLAYER VERIFIED，見 `docs/art/approved/lushu/passive/runtime-v2/acceptance.json`。玩家要求新Work確認最新GitHub後直接續行P2厚甲，不重問既有授權、不停在純恢復報告。

## 最新已完成切片：厚甲A候選待審

真實來源核對與具體候選：`verification/P2_PASSIVE_PREFLIGHT/REPORT.md`；來源指紋 `status.json`、既有resolver純數值投影 `numerical-projection.json`。A建議：敵人≤2.2單位，或隊友≤2.4且該隊友有敵人≤2.2時，自身獲得T0/T1/T2/T3減傷20/30/40/50%，4秒、觸發起CD8秒。保留MAX與各自到期，無隊友被動減傷。無文字琥珀護甲短弧片，1/2/3/4組、不放大角色。尚未核准/實作/Browser/發布，不冒寫PLAYER APPROVED。

**目前唯一Gate是上述新設計審核，機制前檢已完成，不重做。** 通過後依既有正式規格/計畫/原生單人共用實作流程續行。下方原入口任務保留為恢復歷史，不能把「前檢NEXT」當現況。

## 已核對事實與下一個具體產出

- `src/roster/abilities.js`：P2.passive厚甲仍implemented:false、effect為空。基礎HP/DEF不是厚甲已實裝。
- `docs/M5A_CHAPTER1_CONTENT_DRAFT.md`：厚甲原定位是爭奪前線或接近隊友時的防禦收益，沒有已核准觸發/減傷/持續時間/CD數值。
- `src/roster/tierEffects.js`：P2現有Tier護群/震退/鎮守是既有四招進階效果，不能改名充當厚甲。
- `src/combat/passiveDefinition.js`／`passiveRuntime.js`：現有獨立被動只支援ordinary-distance→movement狀態及四Tier倍率表。P2防禦被動需要按實際規格擴充共用條件/效果，不可套角色ID特例或修改P1已核准行為。
- `src/combat/statuses.js`：已有mitigation/incoming狀態、MAX減傷、到期/KO/clear。守群與鎮岳已有核准收據及真狀態契約，厚甲必須明確說明共存、優先與上限，避免有名無實或重複疊加破壞平衡。

新Work立即完成：讀規則與原始碼→必要真機制前檢→具體厚甲方案（觸發、受益對象、T0–T3成長、強度/持續時間/CD、MAX共存、真實減傷對照、無文字呈現、生命週期）→依既有設計與實作流程續行。只在真正尚未審核的新設計Gate或具體外部阻擋停下，不重開已核准技能/美術/比例、不重問可否開始P2。

## 保護與驗證範圍

P1 COMPLETE／PLAYER VERIFIED；P2 Basic/Heavy/Special/Awakening、Identity/static/Idle/Move/KO/尺度核准保持。普通Hit永久取消。P2被動驗收後才可P3技能；不自行展開P3或TD。所有被動不得在戰場顯示文字牌/被動HUD/連線，Collection說明保留；Tier成長要有實際可辨識變化，數值依角色設計，不照抄疾行。

現有1047/1047、Build、P1native16/built8、P2相容native4/built2/scale10、Pages與公開149項核對只沿用原來源；P2真正改Runtime後才做必要受影響驗證與正常發布。保留masters/收據/GIF/尺度/anchor/ground/mirror、單分支PR#1open-unmerged、無角色ID特例、全局無固定總量容量及逐檔安全/兩下載/完整required/所有權/回收/真失敗/destroy。
