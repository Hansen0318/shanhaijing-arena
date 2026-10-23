# Development Playbook

## 2026-10-23 — 赤鱬整角規格已核准；整包F3／被動樣式ACTIVE

玩家直接回覆已呈交整角規格「紀錄進度流程規則就繼續」。已保存精確範圍收據docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json，綁定spec/proposal/baseline/流程decision四項hash與呈交checkpoint2d7730cb12587269bd43f69166d4b24554b724a2；規格設計Gate CLOSED，不重問同一張表/數值/時序/原生執行方式。原spec/proposal bytes保留，其舊DESIGN PENDING文字為審核前歷史，由新收據取代；未展示F3/被動樣式/GIF/Runtime仍未核准。

原生單人整包計畫docs/superpowers/plans/2026-10-23-chiru-whole-character.md與WORK_LOG已建立/自審，按已核准流程直接進Task1：四招獨立透明右向本體F3候選＋游息雙魚回流效果樣式→集中整包審核。先保存核准checkpoint，再依已核准identity/Idle生成候選，不改approved masters或P3產品資料。計畫是既定規格的執行分解，不插額外plan批准Gate、不委派或另開branch/worktree；自審非獨立review。

全局後續固定整角規格一次審→四招F3/被動樣式整包審→其餘姿勢/獨立VFX/整包GIF審→Basic/Heavy/Special/Awakening/Passive內部整合→必要驗證→一次正常CI/Pages/public發布→整角驗收，不逐招重發。Collection被動介紹與真實實作同版本就緒；未實作前仍尚未開放，介紹只寫玩法效果。所有現有/未來被動VFX/Tier/真受益者/完整清理、原P1/P2 COMPLETE及全部美術/尺度/時序/MAX/素材/15%/疾行顯式95%/Hit取消保護保持。

此為收據/計畫/進度checkpoint[skip ci]，未生新素材、未寫Runtime或部署；guard585來源靜態及收據hash核對，既有1070/Build/Browser/Pages/public149來源未變沿用，不重跑。原分支PR#1open/unmerged，保留全部無關untracked不提交/修改，無main merge/新分支/TD/角色ID特例。最新Task1 ledger與handoff接續第一個真正未完成素材，不重做32案前檢或重審規格。



## 2026-10-23 — 全未來角色改整包流程；P3整角色規格v1待整表審閱

玩家「好，紀錄進度流程和修改流程讓未來角色開發可一樣的方式開發 後，繼續」已核准整角色規格一次審→整包四招F3/被動樣式→整包GIF→整包實作驗證→一次正常部署/整角驗收。全局權威docs/decisions/2026-10-23-whole-character-batch-workflow.md，流程收據docs/verification/CHARACTER_BATCH_WORKFLOW/acceptance.json，共用模板docs/templates/CHARACTER_SPEC_TEMPLATE.md。內部仍Basic→Heavy→Special→Awakening→Passive切片/commit，不逐招重複發布/玩家遊戲驗收。此決定取代舊分招排隊/部署節點，保留F3先於其餘姿勢、素材品質與已核准保護；P1/P2 COMPLETE不重做。

已繼續完成P3全角色真機制前檢32個既有headless Session PASS與完整spec：docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md，數據docs/verification/P3_CHARACTER_PREFLIGHT/{baseline.json,proposal.json,REPORT.md}。五招/四Tier/素材/文案一次定義，計畫16本體pose+12獨立FX組；既有赤鱬identity/Idle已檢視、Move/KO/尺度沿用。發現現行治療基數非當前maxHp、T2與被動同名、Heavy兩模式時間不同及T3cast即護盾；提案明示變更：回瀾25/30/35/40%、潤澤16/20/24/30%按目標當前maxHp；獨立游息後排≥2、4.2內HP≤60%最低者（含自己）8/12/16/20%即時治療/CD8；新時序與共用能力擴充詳spec。

**當前唯一Gate=玩家一次審整張赤鱬規格。流程已核准，新數值/時序/素材尚未核准、未實作。** 不重問能否開始或執行方式，不只停在流程紀錄；未審表前不產新F3/GIF/Runtime/Pages。Collection正式文案已納入同表，現有P3被動仍尚未開放，未來真實作同版本同步介紹，不先冒寫效果生效；不能拿同名Tier modifier當被動。全現有/未來被動VFX/Tier/真事件/完整清理及玩家介面純玩法文案硬規則保持。

原生單人自審非獨立review；純文件/前檢[skip ci]，src/public/scripts/tests/依賴/workflows不變、guard585靜態PASS，沿用1070/Build/真Browser/Pages39902216798/公開149，不重測/重部署/下載未變來源。保護全部masters/收據/GIF/尺度/anchor/ground/canonical/mirror、P1/P2數值/時序/MAX、普通15%/疾行顯式95%與素材無固定總量/數量/reserve門檻及逐檔/兩下載/required/回收/destroy。原分支PR#1open/unmerged、無main merge/新分支/TD/角色ID特例、保留無關untracked。最新handoff docs/handoffs/P3_CHIRU_WHOLE_CHARACTER_NEXT_WORK.md；所有交接單一完整自足code block。



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


## 2026-10-23 — P2厚甲真機制前檢完成／新方案審核待回覆

恢復/fetch HEAD d6c18d8280adba78962eadb21e38dcb5e6e49962／tree c6209eb16fe5e7aa9ac9a7ee9294e3477a3d202c；原分支feat/m0-combat-core-20260927、PR#1 open/unmerged、初始working tree乾淨。已完成roster/獨立passive/status/Tier/combat/Collection/呈現真來源核對與四Tier減傷投影，詳 `docs/verification/P2_PASSIVE_PREFLIGHT/REPORT.md`（docs內相對路徑按repo root解析）。

新A候選：自身與敵人≤2.2單位，或隊友≤2.4單位且該隊友有敵人≤2.2；自身減傷T0/T1/T2/T3=20/30/40/50%，4秒、觸發起CD8秒；MAX不加算、各自到期、隊友保護與四招契約不改。無文字琥珀護甲弧片1/2/3/4組、比例不變。這些為未核准候選，P2.passive仍implemented:false；不是Runtime/體感/發布PASS。**目前唯一Gate：玩家審閱新觸發、數值、共存與無文字呈現方向。** 不再重做前檢，不重問能否開始P2；核准後依既有規格/計畫/原生單人流程推進。

P1整角色COMPLETE與既有P2四招/美術/尺度/anchor/ground/mirror/全部收據保持，普通Hit永久取消；P2被動PLAYER VERIFIED前P3技能BLOCKED。此切片只有docs/純數值probe，[skip ci]，無src/public/tests/scripts/依賴/workflow修改；舊來源證據沿用其原範圍、不重跑測試/Build/Browser/部署/公開比對。來源靜態檢查見P2_PASSIVE_PREFLIGHT/audit.json。最新checkpoint為含本條目之commit，必須fetch取得完整HEAD/tree。handoff：docs/handoffs/P2_BOTUO_PASSIVE_NEXT_WORK.md。


## 2026-10-23 — P1疾行v2 PLAYER VERIFIED／P1整角色COMPLETE；P2厚甲 ACTIVE

玩家直接回覆已部署疾行v2「好我approved 紀錄github進度規則流程後。我創新的work 給我我要給新的work的prompts，讓她確認進度流程規則後 直接讓她繼續往下執行下一步 讓她無縫接軌開發，」。新收據 `docs/art/approved/lushu/passive/runtime-v2/acceptance.json` 綁定release d1a39397562f2345bec0243ede82b6376f89684d/tree981276199ebe572d0481decfaff76349c8bb9a3d與呈交文件feb3c1182f0fd76c28c211aef232da21cf022511。P1獨立被動Gate CLOSED，不再要求相同實機/數值/文字/四招核准。既有base/四招核准加上本次新被動核准完成P1角色補完；行政結案 `docs/verification/P1_CHARACTER_CLOSURE.json`，不是新造整角裝置測試。原生自動化physicalPhone:false仍代表自動化來源，不能據此重開已接受玩家Gate。

P1 COMPLETE／PLAYER VERIFIED；P2只有獨立被動厚甲尚未完成，現在ACTIVE／MECHANISM PREFLIGHT NEXT。新Work須先fetch確認後直接做厚甲真機制核對與具體T0–T3方案，不能停在恢復報告或重問能否開始。P2厚甲原定位是前線/近隊友防禦收益，未展示的新觸發/減傷/時間/CD/非文字呈現尚無設計數值核准；依現有流程只在真正新設計Gate停下，不冒稱厚甲已實作。入口 `docs/M5C_P2_BOTUO_PASSIVE.md`、新決定 `docs/decisions/2026-10-23-lushu-passive-player-acceptance.md`、完整handoff `docs/handoffs/P2_BOTUO_PASSIVE_NEXT_WORK.md`（共享P1_P2入口同步）。P2被動PLAYER VERIFIED前P3技能BLOCKED。

流程固定Basic→Heavy→Special→Awakening→Passive→整角結案。被動須有明確且夠可辨識的T0–T3實際成長，不拿基礎Tier數值或既有四招Tier效果代替；戰場不顯示被動文字牌/被動HUD/連線，Collection保留說明。P1疾行35/50/65/80%、3秒/CD6秒及全部已核准P1/P2masters/收據/GIF/尺度/anchor/ground/mirror保持，普通Hit永久取消，鎮岳真傷害真狀態/instant/tactical/MAX契約保持。原分支/PR#1open-unmerged、原生單人、無角色ID特例與全局素材政策不變。

此切片純文件/新核准收據[skip ci]，來源guard549靜態雜湊通過；沿用已保存1047/1047、Build、P1native16/built8、P2受影響相容與正常Pages39875078049、公開149項核對（3新取+146相同指紋沿用），未重跑測試/Browser/Build/部署/公開下載。舊PLAYER PENDING、PHONE PENDING、歷史失敗/容量規則與P2舊範圍整角COMPLETE不得覆蓋最新核准/獨立被動義務。所有交接維持單一完整自足可複製code block。


## 2026-10-22 — 疾行書面規格 PLAYER APPROVED／實作計畫待審

玩家「好繼續」直接回覆已呈交的正式規格，精確核准收據 `docs/verification/P1_PASSIVE_DESIGN/spec-acceptance.json` 綁定 `docs/superpowers/specs/2026-10-22-lushu-passive-design.md` 原SHA256；書面規格Gate CLOSED，不再重問。規格原檔/舊direction receipt保留不改，其舊REVIEW PENDING是歷史狀態。已完成 `docs/superpowers/plans/2026-10-22-lushu-passive.md` 四切片計畫及靜態自審；**下一唯一Gate：玩家審閱實作計畫**，不是再審規格。

計畫：1不可變被動定義/rolling-distance狀態核心；2一般移動分段與戰鬥事件整合/P1opt-in；3獨立可見badge/HUD/誠實Collection；4真native/built/受影響P2相容性證據、完整normal CI/Build/來源綁定guard/Pages/公開比對，最後P1被動玩家驗收。原生單人執行方式已定，不再次詢問或委派subagents。計畫尚未核准，不把規格同意擴大成未展示計畫已批准。

本次只有核准記錄/實作計畫/進度/handoff [skip ci]；沒有產品程式/依賴安裝/新測試/Build/Browser/部署/可讀性PASS。P1 ACTIVE／未完整，P2厚甲等P1被動驗收後，兩者完成前P3技能BLOCKED。保留全體已核准美術/四招/尺度與無關untracked、原branch/PR#1 open未merge、普通Hit取消及全局素材政策。舊1014/149只能沿用原範圍，不代表新被動PASS。接手索引 `docs/handoffs/P1_P2_PASSIVE_NEXT_WORK.md` 已更新到計畫審閱；交接仍單一完整自足code block。

## 2026-10-22 — 疾行方向續行／可辨識要求入規格／書面規格待審

玩家「確認視覺和數值有明顯可看得出來，若確認沒錯，就記錄繼續」記於 `docs/verification/P1_PASSIVE_DESIGN/direction-confirmation.json`：方案A依原2秒窗/1單位/+8%/2秒效果/CD4秒推進書面規格，附帶實際視覺及數值必須可辨識條件；不是已實測PASS或新文件核准。已完成正式規格 `docs/superpowers/specs/2026-10-22-lushu-passive-design.md`，**下一唯一Gate：書面規格審閱**，不重問已呈交方案A或角色順序。

fresh純資料投影：T0一般移速2.05→2.214，同條件有效2秒距離4.1→4.428（+0.328）；T0–T3投影保存於 `docs/verification/P1_PASSIVE_DESIGN/numerical-projection.json`，不是Session/Browser驗證，不能宣稱肉眼已明顯。發現現有MOB在正式角色view.label隨hasFormalArt隱藏，因此新規格要求獨立「疾行 +8%」狀態牌、真expiry時間條及HUD實際移速/進度/CD；觸及總15%上限須誠實顯示上限，不假稱額外+8%。新UI細節在書面規格內待審，未實作。

此切片純docs/投影/條件確認[skip ci]，無Runtime/美術/測試/Build/Browser/部署；未寫新被動或宣稱P1完成。P1仍ACTIVE、P2厚甲QUEUED、兩者PASSIVE PLAYER VERIFIED前P3技能BLOCKED。全部四招/base已核准成果、普通Hit取消、單分支/PR#1 open未merge與共用素材政策保持。後續依書面規格審閱→實作計畫審閱/原生單人執行→真驗證/發布/玩家驗收。接手索引 `docs/handoffs/P1_P2_PASSIVE_NEXT_WORK.md` 已移至新Gate，所有交接單一完整自足code block。舊proposal pending文字為前一切片歷史。

## 2026-10-22 — PLAYER OVERRIDE：被動列入完整交付；P1 疾行 → P2 厚甲補完

**最新玩家決定優先，取代下方P1/P2整角色COMPLETE／無剩餘Gate結論。** 未來角色技能順序固定 **Basic → Heavy → Special → Awakening → Passive（被動）→ 整角色結案**。既有identity/static/Idle/Move/KO及四招美術、機制、Runtime、玩家驗收保持；普通Hit永久取消。獨立被動須完成具體規格、共用資料驅動實作、必要驗證、部署及玩家驗收才算完整，基礎HP/DEF/移速或既有Tier效果不能代替被動完成。

當前補完順序：**P1鹿蜀「疾行」ACTIVE／機制設計審核準備 → P1被動驗收完成 → P2猼訑「厚甲」QUEUED → P2被動驗收完成 → 才可開始P3角色技能**。本次指令已授權P1/P2補完工作及規則變更，不必重問順序；未提供的觸發/數值/效果設計仍須依既有設計審核流程，不把任務授權當成尚未展示方案的核准。P1/P2改標 **FOUR ACTIVE SKILLS PLAYER VERIFIED / PASSIVE INCOMPLETE / FULL CHARACTER INCOMPLETE**，不退回已完成四招Gate。

權威決定 `docs/decisions/2026-10-22-passive-character-completion.md`；當前進度/來源證據 `docs/verification/P1_P2_PASSIVE_RECOVERY.json`；P1首個具體候選與取捨 `docs/M5C_P1_LUSHU_PASSIVE.md`。P2只排隊、不並行開發。P3既有base/Move/KO不重做，角色技能仍BLOCKED；本次未開始P3。舊P2_CHARACTER_CLOSURE.json與P1/P2結案條目保留為舊範圍歷史，不能證明新完整標準已達成。

同branch feat/m0-combat-core-20260927／PR#1 open/unmerged。此切片只有規則/規格討論/進度/handoff [skip ci]；無Runtime/新被動實作、測試/Build/Browser/部署。既有1014/1014與149/149只沿用其原來源範圍，未來真被動Runtime變更須重取受影響驗證及正常發布證據，不可拿舊PASS覆蓋。全部已核准master/receipt/GIF/尺度/anchor/ground/mirror、全局無固定總量容量政策與逐檔/兩下載/完整required/回收/真失敗/destroy保留；無main merge/替代分支/TD/角色ID特例。唯一當前接手索引 `docs/handoffs/P1_P2_PASSIVE_NEXT_WORK.md`，所有交接單一自足可複製code block。

## 2026-10-22 — P2 猼訑整角色結案 CLOSED／既有玩家驗收彙整

**P2 COMPLETE BY EXISTING PLAYER ACCEPTANCE EVIDENCE AND CURRENT SCOPE。** 已完成 `docs/verification/P2_CHARACTER_CLOSURE.md` 整角色義務核對；機器可讀證據 `docs/verification/P2_CHARACTER_CLOSURE.json`。恢復HEAD `84e53ff3b7cd8dd60d9e5cdb97b7169d048f22b9`／tree `924e25a4b39249b62145ba682df0bcaaffe6e193`，原feature分支、PR#1 open/unmerged。Identity/static/Idle/Move/KO已驗收基線、尺度收據與Basic角擊／Heavy震嶺／Special守群／Awakening鎮岳四份Runtime玩家收據均有依據；未發現真正缺少的非Hit義務。普通Hit永久取消。依本次玩家「若證據已齊，整理結案」指令及既有P1行政結案方式彙整，不新造整角實機核准、不要求重驗技能。

本次fresh static audit：鎮岳收據7/7綁定雜湊、release-evidence完整258/258來源/報告雜湊一致；已接受release `66e6c3c640c546ec90dbd5a79da06814db15d02f`至恢復HEAD的src/public/tests/scripts/.github/package檔案差異為空；保存的149/149公開指紋紀錄內部一致。既有1014/1014、Build、native4/built2、scale10/50與正常Pages沿用，非本次重跑。舊PHONE PENDING及29/28/25失敗是保留歷史。全局無固定16MiB總量/required數量/131072reserve拒絕；保留逐檔安全、兩並行下載、完整required、所有權/回收/真實失敗/destroy，以及鎮岳既有時序/MAX/真傷害真狀態契約。

P1與P2當前角色範圍皆CLOSED；**P2無剩餘Gate，下一合法步驟是回報結案後等待新明確範圍。** 路線圖下一角色為P3赤鱬，僅標示順序，未啟動其恢復/設計/素材/Runtime工作。禁止自動展開P3/TD、main merge、替代分支、角色ID特例或來源未變的重測/重部署。此次純文件 `[skip ci]`，保護全部masters/收據/GIF/尺度/anchor/ground/mirror與實際觀測到的無關untracked檔；diff自審，非獨立審查。唯一後續交接索引維持 `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md`，內文已改為結案後待範圍，不再安排本次已完成核對；所有交接仍單一自足可複製code block。含本條目的commit才是新checkpoint，fetch分支取得完整HEAD/tree。

## 2026-10-22 — 鎮岳 COMPLETE／PLAYER VERIFIED／P2 整角結案核對 NEXT

玩家「好確認OK核准，紀錄GITHUB規則流程進度，我要開新的work，要讓他無縫接軌，給我prompts我要跟他說的」直接接受上一則已部署鎮岳URL與聚焦審核交付。精確範圍/原文/版本見 `docs/art/approved/botuo/awakening/runtime-v1/acceptance.json`，接受release66e6c3c640c546ec90dbd5a79da06814db15d02f，呈交docs89ca19bf80eaf7de31e5a440d61e6948db8ae7be。鎮岳玩家審核Gate CLOSED，不再要求同一手機/姿勢/VFX/GIF/契約核准。不捏造逐項T3、全部面向、實體裝置/FPS/GPU結果，也不把此次整體確認冒充所有遊戲驗收。

P1 COMPLETE；P2既有Idle/Move/KO/尺度與Basic/Heavy/Special核准保持，現在四招皆有runtime玩家收據。下一個最小工作為 `docs/verification/P2_CHARACTER_CLOSURE.md` 的整角色結案核對：沿用既有證據，只識別真正缺少的非Hit義務；沒有缺口就整理結案，不重做招式/美術或新造測試矩陣。普通Hit永久取消，絕不是下一任務。全角色結案不由本次單招核准自動推定；若需獨立整角sign-off只提一次具體範圍。未另獲範圍前禁止P3/TD/新角色工程。

沿用既有1014/1014、Build、native4/built2、scale10/50標記、Actions1097/run39779770526及149/149公開指紋，不因換Work重跑。全局無固定16MiB/required數量/reserve拒絕已生效，單檔4MiB/2048/4194304、兩下載、完整pins/ready/實際失敗/回收/destroy保持。此次僅docs/新receipt [skip ci]，不改Runtime/public/測試/已核准素材，不重新部署。原發布closure.json裡當時的PHONE PENDING保留為歷史，最新核准以新receipt為準。原feature分支/PR#1 open未merge，三個untracked暫存檔排除。唯一交接 `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md`，單一完整自足code block。

## 2026-10-22 — Global policy implemented; separate Awakening contract NEXT

Plan approved by「核准，繼續」and implementation checkpoint recorded in `verification/P2_AWAKENING_PREFLIGHT/global-residency-runtime/REPORT.md`. Total decoded-byte/required-count/reserve admission gates are removed globally; keep individual guards, two transports, full required ownership and real failure handling. Cache defaults are soft inactive-reference retention only. Shared30/30 and Build PASS; full993/965/28 remains FAIL, Browser blocked by missing Chromium/invalidZIP installation. No release or phone acceptance. Later fixed-cap/plan-pending text is historical; original plan/spec/art receipts remain frozen. Next independent contract is the current addendum of `verification/M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md`; no new art/KO split or repeated approved Gates.

## 2026-10-22 — Written global policy APPROVED / plan review

Player expressly approved the linked written global decoded-byte residency specification (SHA256 c47019288e6b6ceaf15b8c87872c5eb156518847fec3922eadab72df69e2141b); scope and exact quote `docs/verification/P2_AWAKENING_PREFLIGHT/global-residency-spec-acceptance.json`. A separate TDD implementation plan now exists at `docs/superpowers/plans/2026-10-22-global-dynamic-asset-residency.md` and must be shown to the player before runtime execution. Native single-agent Work handoff is `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md`; current code and public build remain unchanged. Do not misread historical fixed-cap rules below as the newly approved policy being installed, nor infer plan/contract/phone acceptance. Docs-only [skip ci].

## 2026-10-22 — 全局容量新方向／書面審核

玩家明確要求全遊戲無固定總decoded-byte上限，非單一角色赤鱬KO拆圖，並要求完成驗證後部署供遊戲內確認；對共用策略回覆「確認，繼續」。新 `docs/superpowers/specs/2026-10-22-global-dynamic-asset-residency-design.md` 是待獨立書面審閱的規格；下方舊16MiB硬規則、KO拆圖NEXT等是當時程式與決策的歷史紀錄，不能覆蓋此新方向，也不能反過來宣稱現有程式已移除硬上限。新政策須經規格審閱→計畫審閱→TDD共用實作，保留單檔guard、按場全required、真失敗處理／釋放，並在鎮岳契約與真瀏覽器／Build驗證後才Pages及公開指紋。舊方案不實作；核准來源／機制／PR仍受保護。此次docs-only[skip ci]，沒有Runtime或部署。

## 2026-10-21 — Awakening VFX/GIF PLAYER APPROVED / execution preflight NEXT

Player「這個我確認OK，你紀錄github流程進度規則」accepts the normal GIF embedded in the preceding response and its linked visual-review package at `e1cdefa22c99aceae149a0a854210da9941c36e9`. Exact wording, primary normal GIF, seven linked GIFs, static reduced cue, three raw VFX and manifest/reference hashes are bound in `docs/art/approved/botuo/awakening/visual-v1/acceptance.json`. **PLAYER VFX/GIF VISUAL GATE CLOSED / APPROVED.** This records the presented package, not invented independent playback/device cases for every link. Old candidate/pending fields in frozen manifests/checkpoint/QA remain historical; authoritative latest approval is this receipt and progress entry. Do not ask again or regenerate accepted F1–F4/VFX/GIF.

NEXT unfinished Gate: Runtime preflight → shared cast/action/VFX/status ownership and timing contract → faithful packing and complete required-set capacity proposal → separate player contract review. None of those engineering proposals is approved by this visual acceptance. This request only records approval/process/progress; no engineering work, Runtime/build/Browser/deploy authorization or phone/whole-P2 acceptance inferred. Source/presentation assets, old receipts/manifests/scripts, gameplay and deployed Special remain unchanged.

Preserve instant0ms vs tacticalT0 900ms/T3 819ms (no universal F1/F2 windup); caster-locked actual damage circle, true-victim contact only, air without fake hit/protection. T3 actual post_cast beneficiaries13.5%/3.75s with independent Special/MAX lifecycle remain. GIF10ms display rounding never modifies gameplay. Keep P1 COMPLETE and all P2 approved art/scale/ground/anchor/mirror, ordinary Hit CANCELLED, Shared Dynamic Asset Residency,16MiB cap/131072reserve/allrequired. Existing45textures16611224decoded/34920extra is inherited evidence, not a new Awakening capacity pass. No main merge/replacement branch/TD/P3.

This approval-only `[skip ci]` slice freshly checks saved package bytes/SHA256, receipt references/JSON and protected diff scope. Reuse8GIF/124frame QA,16mechanics cases and Special164/Browser/release/145CI/39public evidence without reruns; no full-suite/build/Browser/release, five historical full-suite failures remain. Same feature branch and PR#1 open/unmerged; actual fetched HEAD supersedes stale PR connector head snapshots. Canonical successor `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md` is one complete self-contained copy block.


## 2026-10-21 — Special MOTION/GIF APPROVAL RECONFIRMED / next unfinished contract gate

玩家在normal GIF展示、slow/instant-chain連結及Special四姿勢／Heavy接技區別說明後，回覆「ok 我approved ，紀錄github進度流程規則，繼續繼續」。已保存追加receipt `docs/art/approved/botuo/special/visual-reconfirmation-v1/acceptance.json`，綁定原normal/slow/chain檔案hash；原視覺包receipt、四姿勢、source/prompt/QA/GIF完全不變。**Special動作與GIF視覺核准CLOSED，不再重問或重製。** 不聲稱每檔獨立播放、裝置或Runtime已驗收。

按實際展示範圍記錄此次視覺核准；目前獨立未完成Gate仍是 `docs/verification/M5C_P2_BOTUO_SPECIAL_PREFLIGHT.md` §1/§3共用utility/status契約與§4–5無損packing/容量方案。文件SHA256 da54ad3cbc8bdd710064dfb1632771730105a14dba54855a9ef3b6037eddcc82，packing-manifest SHA256 e1963cebddba3d146a2eeb25a2cde105dad9d9cd53eb3b66baf918216dd79132。不得把對動作/GIF的同意擴大為32個舊貼圖候選與工程契約已核准；確認該獨立範圍後才能建立executable receipt、進必要共用Runtime整合。現成前檢不重做，下一步不是再次做GIF。

本次只做核准/規則/進度文件，[skip ci]，無src/public/tests/scripts/workflow/既有核准素材修改、build/full-suite/browser/部署；沿用既有來源與機制證據，五個suite failures保持。Heavy live acf454741757f58efa980fdcd03f028a472e87a3、16MiB/131072reserve/Shared Dynamic Asset Residency及P1/P2既有驗收保持。只核對本次receipt的GIF/契約/manifest hash、JSON、受保護路徑與diff，不重跑工程檢查。恢復來源d02d22bb0382b4c21bad083a3af96094be346dd2；最新checkpoint為含本條目的feature commit，重新fetch。唯一後續指令仍為docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md，保持單一完整自足code block。


## CURRENT HANDOFF POINTER — 2026-10-21 — Special EXECUTION CONTRACT REVIEW / Runtime NOT INTEGRATED

已從 remote `9e685823c892843132b53c36ca897cdb625fc76c` 恢復，PR#1 open/unmerged，初始工作目錄乾淨；同分支，未merge main。**下一個未完成 Gate 已推進至共用utility/status ownership執行契約審核**：`docs/verification/M5C_P2_BOTUO_SPECIAL_PREFLIGHT.md`。玩家核准前停在此處，沒有executable acceptance，沒有Runtime整合或部署。Special F3/四姿勢/視覺包與P1 COMPLETE、P2尺寸CLOSED、Basic/KO/Heavy已核准紀錄保持；下方舊preflight-next/art-pending是歷史。

提案：成功Special同clock減傷並可立即接ready技能/Move；四張160ms短gesture可被下一合法動作取代，獨立320ms activation與真實recipient-status圖不因此消失。新增可選ability/effect來源metadata，generic reconciler按session/status/source/target身份管理，跟actor root而非Heavy layout offset；不把utility hit=true當攻擊命中，不改傷害/CD/range/Tier/AI/控制/KO/刷新MAX/到期。禁止P2身份特例。新metadata/schema/呈現窗口全為提案，不能視為已安裝或已核准。

實物候選`docs/art/candidates/botuo/special/runtime-pack-v1/packing-manifest.json`，QA/量測/完整required集合在`docs/verification/P2_SPECIAL_PREFLIGHT/`。保留核准review raster，不再降密度；共用200×200邏輯格/root(100,184)/origin(.5,.92)，只裁四通道皆零空白，原400×320 review與source不變。32個舊key提供零RGBA候選pack（不改正式素材、不重做美術），不重做P3/P4/P5既有Move packs。42required全保留＋3新key，回收946948bytes、新增887120bytes，候選45key16562336bytes＋131072reserve＝16693408/16777216，reserve外83808bytes。無gutter取樣須在核准後做真Phaser native-trim比較；不能僅換PNG或將CPU投影稱為實機尺度證明。

實際檢查：12來源hash完全相同，沿用32direct/8lifecycle/2AI/4paired-damage與Heavy既有工程/公開/玩家證據；47舊inventory檔hash、6新與57舊logical-frame RGBA反貼/鏡向/座標檢查；目前42key及候選45key各兩種載入次序，真cache/residency guards、decoder/upload double，0fail/0evict、cleanup0。沒有build/full suite/browser/phone；五個舊suite failures保留。候選完整cache/upload/reservations/reserve證據見candidate-residency.json；不宣稱GPU記憶體。Heavy live `acf454741757f58efa980fdcd03f028a472e87a3` 不變。

本次僅docs/art，使用[skip ci]。最新checkpoint是含本條目的feature commit（提交後fetch remote取得完整SHA），不是新部署。**NEXT ONLY：玩家審核前檢文件§1/§3契約與§4–5包裝容量；核准後先綁定文件/manifest hash與玩家原文，再必要共用Runtime整合。** 不重問視覺、不開始Awakening/P3、main merge/替代分支/TD。唯一後續指令`docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md`，維持單一完整自足code block。


## 2026-10-21 (Asia/Taipei) — P2 Heavy PASS / PLAYER VERIFIED; Special 守群 NEXT

Player「我確認完成ok，進度流程規則紀錄github，然後或要新創一個work，要他無縫接軌，開發後續，要跟他說什麼」explicitly confirms the completed Heavy after the supplied test URL. **P2 猼訑 Heavy「震嶺」COMPLETE / PLAYER VERIFIED**. Receipt: `docs/art/approved/botuo/heavy/runtime-v1/acceptance.json`. Accepted source `acf454741757f58efa980fdcd03f028a472e87a3`; release URL https://hansen0318.github.io/shanhaijing-arena/?v=acf454741757f58efa980fdcd03f028a472e87a3 . Binding follows the presented version; no independent device bundle hash, exact approval clock time or itemized device-case/FPS/GPU-memory report was supplied. Previous Heavy phone-pending/stop-before-Special statements below are historical and superseded for this new continuation scope.

Preserve approved F1–F4/GIF/source/contact, executable A, P1 COMPLETE, P2 Idle/Move/Basic size/Basic/KO and generic ordinary Hit CANCELLED. Reuse unchanged prior136affected/build/84guard,8WebGL/24trim/2built-entry,110CI-local/15public-file evidence; none rerun and no redeployment in this acceptance-only slice.42required keys16622164bytes;16MiB cap +131072reserve+23980extra retained. A keeps existing Tier-scaled650ms tactical resolve, immediate/whiff0msF3 and true-hit contact; no gameplay/art changes.

**NEXT authorized New Work:** P2 Special「守群」actual mechanics/state/Tier recovery → distinct protective choreography → key-pose player art review, then only the existing approved-art/VFX/GIF/executable/integration/release/phone gates. Catalog T0 is self-target,25% mitigation for4s,CD8s,coefficient0,windup0; preserve actual Tier/status/AI/expiry semantics. The name does not authorize team protection, damage/AoE, invulnerability or a new startup delay. Protective state VFX follows actual recipient/status lifecycle; no fake damage burst. Stronger Special spectacle must come from protective shape/layering/readability, not actor enlargement or invented mechanics. Special art/timing/runtime/phone gates remain UNAPPROVED. No P2 Awakening/P3/main merge/replacement branch/TD import. Current handoff: `docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md`; every successor instruction one complete self-contained copy block. Newest docs commit is not a new deployed source. This checkpoint uses[skip ci].

## 2026-10-20 19:26 +08:00 — P2 SIZE PLAYER VERIFIED / Heavy remaining poses resumed

Player explicitly confirms「正常了，ok，紀錄進度和流程規則，然後繼續」following the phone review link for source release `0fe44b3c5eed46402d0394af6dff128a72be7393`. **P2 Idle/Move/Basic actor-size defect CLOSED / PLAYER VERIFIED; Heavy size blocker lifted.** Receipt: `docs/verification/P2_MOVE_BODY/player-acceptance.json`. This links the scoped sign-off to the supplied release; player did not supply a device bundle hash. Earlier size-review pending/Heavy-paused statements below are history. No unrelated physical-device behavior is inferred.

NEXT: retain approved Heavy F3 SHA256 `0049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206`, author individual F1 anticipation / F2 intermediate forward bracer strike / F4 recovery, then show full four poses for player review. No new F3 generation/reapproval; no unseen-pose/VFX/GIF/timing/runtime approval inferred. Follow pose review → separate source/contact VFX → normal/slow/no-effects/both-facing/Idle-return GIF review → executable-contract review → integration/release → phone acceptance. Current art slice does not change deployed runtime.

Permanent scale rule: use approved body/equipment authoring density and ground anchor, inspect multiple stable anatomy/equipment landmarks plus actual built-app transitions. Neither canvas bounds, crouched height, a single projected skull span nor descriptor conformance establishes visual scale. Preserve P2 Move density0.9/display144×139.5/foot0 and original static baseline; do not restore25/32whole-body shrink. Separate character and VFX transforms. P1 COMPLETE/accepted P2 Basic/KO/art protected; ordinary Hit canceled, damage does not interrupt skill. Keep16MiB cap/131072reserve, gameplay/Tier/timing/AI/save/rewards unchanged. No P3/TD/main merge/replacement branch. Docs/art-only checkpoints[skip ci], no unchanged redeploy; fetch current feature HEAD and put all successor instructions in one self-contained copyable block.

## 2026-10-19 — Mobile viewport fix DEPLOYED / PHONE REVIEW PENDING

Public exact-byte verification BLOCKED by host proxy CONNECT timeout (not evidence of a site outage); downloaded actual CI Pages artifact matches local build15/15 files. See public-fingerprint.json: publicVerification=false. Deployment success and browser gate PASS are independently established; do not misreport public hashes or redeploy unchanged code for this network failure.

Player reports whole-page enlargement/clipping and unusable game (IMG_2661/2662); this is not actor-scale approval. Actual built-app diagnostic reproduced the menu failure at visual page scale2/3: visualViewport shrank while CSS-vw typography retained layout width. Fix shares logical viewport and inverse visible transform across Campaign/Arena/Orientation/Exit, and prevents scroll Event from enabling reload-only height stabilization. No actor/art/combat/save/Tier/memory changes; no zoom-prohibition meta.

Release50f303db304f427ca80c1c9c4e0b0b101859b392 DEPLOYED: https://hansen0318.github.io/shanhaijing-arena/?v=50f303d . Actions39202217431 build117897526482/deploy117898058327 SUCCESS. Scoped54/54 + Build/81-file guard PASS; additional local arenaInput4/4 PASS. Actual Chromium/WebKit6mobile-emulation cases/39screenshots PASS, including landscape/short/portrait→landscape/reload/menu returns, Chromium zoom1.5/2/3/restoration and real Chapter→Stage→Team→Battle→canvas portrait a1 selection→Pause→Exit→menu at zoom3. Three representative release screenshots inspected and retained. These are not physical iOS/touch/FPS or Basic size acceptance. Evidence docs/verification/MOBILE_VIEWPORT_FIX.md and MOBILE_VIEWPORT/{probe,release,public-fingerprint.json}.

NEXT ONLY player phone check of whole-page fit/menu/battle/Exit and prior Basic size continuity; both fixes remain NOT PLAYER VERIFIED. Heavy production paused; HeavyF3 approval, P1 COMPLETE and other prior acceptance protected. No new art/P3/main merge or unchanged redeploy. Permanent release rule: direct Arena fixture is not actual mobile app UI proof; viewport/layout changes require real built-app navigation, scale/offset/rotation/reload, transformed canvas pointer and body-modal coverage before deployment. Diagnose page geometry separately from actor landmarks. Every successor prompt one self-contained copyable block; latest containing feature docs commit is authoritative, docs-only closure[skip ci]. Older “NEXT ONLY Basic review” entries below are superseded by this critical UI defect scope.

## 2026-10-19 — Basic size correction DEPLOYED / PLAYER SIZE REVIEW PENDING

Scoped release4607a6bee2675ddf812c5387d787e128969ea684 is DEPLOYED. Actions39179339552 build117828553702/deploy117828757017 SUCCESS; scoped67/67 + Build/guard81/81 PASS. Actual Chromium/Phaser WebGL normal/reduced×left/right4cases/24screenshots PASS; six inspected/retained screenshots. Body177.75×160.875 matches22.5px reference landmark, foot/mirror/true250ms hit/miss/source/contact/Idle/Pause/direct-destroy validated. Controlled fixture is not automatic AI/UI/mobile/FPS/GPU proof. Existing gameplay/cadence/Tier/art/FX geometry,39required keys16,630,060bytes+131,072reserve retained.

Public15files(index+2JS+CSS+11runtime PNGs) exact bytes match downloaded actual CI Pages artifact12155054593 and local build. Large transfers reconstructed from complete HTTP Range parts, not sampled hashes. Live https://hansen0318.github.io/shanhaijing-arena/?v=4607a6b . Evidence docs/verification/M5C_P2_BOTUO_BASIC_BODY_SCALE_RELEASE.md and P2_BASIC_BODY_SCALE/release.json,public-fingerprint.json,browser/. Heavy F3 receipt remains PLAYER APPROVED; P1 COMPLETE and old Basic acceptance other than this reported defect stay protected.

NEXT ONLY targeted player review: 猼訑Basic size continuity from Idle/Move through attack and back. **NOT PLAYER VERIFIED for this size correction until explicit confirmation.** Do not redo F3/art/GIF/250ms/fullP1 or redeploy unchanged release; do not start Heavy poses/P3/main merge. After player confirms, record scoped size-fix acceptance and resume already-approved HeavyF3→remaining poses. This evidence-only closure uses[skip ci]; docsHEAD can be newer than deployed source. Fetch latest containing feature commit; current successor docs/handoffs/P2_BOTUO_BASIC_SCALE_NEXT_WORK.md, every successor in one complete copyable block. Older pending entries below are historical.

## 2026-10-19 — Basic body-scale correction ENGINEERING PASS / NOT DEPLOYED

Heavy F3 is PLAYER ART APPROVED; receipt docs/art/approved/botuo/heavy/f3-v1/acceptance.json and approval/priority remote07a51545853796a0cf69e52cecfd1bf835d99344. Continue to protect it; do not repeat F3 review. Player-reported Basic shrinking took priority over remaining Heavy art.

Root: accepted action review used20px skull span without matching accepted Idle22.5px world landmark. Explicit opt-in shared data calibration now matches22.5px, keeps foot−16.2px and both-facing support, and preserves independent source/contact world size/position/timing. No regenerated source/GIF/receipt, no combat/CD/250ms/Tier/collision change. Other four character definitions and P2 Idle/Move/KO/stats deep-equal baseline. Future actions must calibrate stable body landmarks in actual renderer units before runtime, never infer size from frame dimensions or fit crouched height to Idle. Full workflow lesson and evidence: docs/verification/M5C_P2_BOTUO_BASIC_BODY_SCALE_FIX.md.

RED4/4 reproduced density defect; GREEN4/4; affected67/67 PASS, Build/guard81/81 PASS; six residency cases39keys/16,630,060bytes +131,072reserve retained. Static descriptor comparison inspected, not gameplay capture. Updated real Chromium checker NOT RUN here (executable absent); old browser/phone acceptance is not size-fix evidence. **FIX IMPLEMENTED / ENGINEERING CHECKS PASS / NOT DEPLOYED / PLAYER SIZE FIX REVIEW PENDING.** Current publicdb451cd unchanged. Next: scoped real-browser verification/release authorization, deploy/fingerprint then targeted size review before Heavy continuation. No full P1 rerun/new art/P3/main merge or accidental art/docs deployment; [skip ci]. Latest checkpoint is containing feature commit, fetch again. Current successor docs/handoffs/P2_BOTUO_BASIC_SCALE_NEXT_WORK.md; all successor instructions one complete copyable block.

## 2026-10-19 — Heavy F3 PLAYER APPROVED / Basic size defect PRIORITY

Player explicitly approves the presented Heavy F3 and requests GitHub recording before and after fixing Basic whole-character shrinking. Immutable approval: docs/art/approved/botuo/heavy/f3-v1/acceptance.json, source0049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206. **F3 DESIGN / PLAYER ART APPROVED**, not remaining poses/VFX/GIF/timing/runtime approval. Prior F3 pending text is historical.

**NEXT PRIORITY: diagnose and correct P2 Basic size continuity against accepted Idle/Move; Heavy production paused.** Concrete new player defect authorizes affected inspection/fix/minimum checks; do not reopen unrelated Basic or P1 acceptance. Preserve approved pixels, grounded anchor, mirror, actual250ms timing/HP/FX/CD/Tier and16MiB+reserve. Confirm body landmarks/density across Idle→F1–F4→Idle/Move instead of trusting canvas dimensions or lower crouched silhouette height. New fix is not deployed/player-verified until separately evidenced. Existing deployment db451cd remains unchanged. No new Heavy poses/P3/main merge. Checkpoint[skip ci].

## 2026-10-19 — P2 Heavy 震嶺 F3 DESIGN CANDIDATE / PLAYER REVIEW PENDING

Player「好繼續」continues after Basic PASS/PLAYER VERIFIED. Recovered feature4d849f760adb2219fcb12b4b710b71507948ebff / PR1 open/unmerged. Mechanics/Tier and approved identity recovered; ONE new character-only F3 forward beast-bracer bash candidate produced, visibly distinct from accepted low horn Basic. Master SHA2560049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206. Exact references/prompt/alpha/QA: docs/art/candidates/botuo/heavy/key-pose-v1/. Source alpha1 at left edge preserved;40px padding has exact RGBA roundtrip and clear outer borders. PNG/QA/protected-path checks only; no new runtime/tests/build/deploy/phone evidence. Candidate is NOT PLAYER APPROVED.

Spec/mechanics and four-skill distinction: docs/M5C_P2_BOTUO_HEAVY_ACTION.md. Existing Heavy tactical telegraph650ms is Tier-scaled, not Basic250ms or universal windup; non-tactical/empty paths are immediate today. Later preflight must map actual lifecycle before changing it. No timing/collision/extra-hit changes. VFX must remain independent source/true-hit contact and clearly visible; body remains distinct with VFX off. Future Special/Awakening direction is reservation only, not production authority.

NEXT ONLY player review of this F3 design/identity/equipment/grounded forward bash, then accepted-art remaining poses → independent VFX/GIF gates. P1 COMPLETE, P2 base/Idle/Move/KO/Basic PLAYER VERIFIED and old art/receipts protected; ordinary Hit CANCELLED. Existing db451cd deployment unchanged. Required16,630,060+reserve131,072 remains PRIOR Basic evidence, not Heavy residency approval. No P3/main merge/deploy; [skip ci]. Latest checkpoint is containing feature commit; fetch remote. Current successor docs/handoffs/P2_BOTUO_HEAVY_NEXT_CHAT.md; all successor instructions in one complete self-contained copyable block. Older pending/next-gate text below is historical.

## 2026-10-19 — P2 Basic PASS / PLAYER VERIFIED — runtime acceptance CLOSED

Player「好，我測試過了，basic approved，妳紀錄github相關流程紀錄和規則」explicitly confirms the deployed P2 猼訑 Basic「角擊」after the pending phone-review handoff. **PLAYER ART APPROVED / PLAYER EXECUTABLE CONTRACT APPROVED / ENGINEERING PASS / DEPLOYED / PASS — PLAYER VERIFIED.** Accepted runtime `db451cda0e396736b170d0196d32655649303a36`, presented URL https://hansen0318.github.io/shanhaijing-arena/?v=db451cd ; recovery baseline `2bf0ff55ddf69f73eb6ca7f1e34e16b5648590bb`. New immutable receipt: `docs/art/approved/botuo/basic/runtime-v1/acceptance.json`.

This closes overall scoped player acceptance, not an itemized report of facings/reduced motion/Pause/Restart, device/browser identity, FPS or GPU memory. Exact approval time was not provided; 2026-10-19 is the recording date in Asia/Taipei. Reuse existing engineering220/220, Build/guard, Chromium4cases/24screenshots and public15-file fingerprint evidence; none rerun for this documentation closure. Prior deployment evidence remains immutable and its then-pending status is historical, superseded by this receipt.

**Permanent recovery/acceptance rule:** bind the exact player statement to the presented release SHA/URL and skill scope; keep art, executable contract, engineering, deployment and player acceptance distinct. Newest closure overrides older pending pointers; do not reopen completed Basic art/GIF/250ms/runtime/phone gates or repeat tests/deploy without a concrete new defect or changed scope. Preserve approved sources/older receipts, P1 COMPLETE, P2 base/Idle/Move/KO and ordinary Hit CANCELLED. Ordinary damage does not interrupt attacks/casts/movement; legal control/KO remains. Maintain visible independent outgoing/contact FX and readable body motion with FX off for future skills; Basic<Heavy<Special<Awakening escalation does not authorize changing actor size, hit geometry or timings.

**NEXT unfinished gate:** P2 Heavy「震嶺」existing-mechanics/approved-identity recovery → design/choreography → F3-first art review, then remaining poses/independent VFX/GIF → scoped integration/release → player review. Basic approval is not Heavy art approval, whole-P2 completion or permission to bypass later gates. This slice only records acceptance/process/rules and stops; no Heavy production, P3, main merge or deployment. Use `[skip ci]`; documentation HEAD may be newer than deployed runtime. Latest checkpoint is this entry's containing feature commit; fetch again. Successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`, every subsequent handoff in one complete self-contained copyable code block.

## 2026-10-18 — P2 Basic DEPLOYED / real browser PASS / PLAYER PHONE PENDING

Player「好，繼續」authorized scoped release. Release db451cda0e396736b170d0196d32655649303a36; Actions39127557379 build117675784662/deploy117675979008 SUCCESS,220/220 affected checks + Build/guard PASS. Actual Chromium/Phaser normal/reduced ×left/right4cases/24screenshots, hit/miss/source/contact/F3/F4/Pause/direct-destroy PASS. Screenshots inspected; no live UI/automaticAI/browser-FPS/GPU/mobile acceptance inferred. Prior actualAI/player tests remain separate engineering evidence.

Public15files(index+2JS+CSS+11new runtime PNGs) byte-exact SHA256 match actual CI Pages artifact. Live https://hansen0318.github.io/shanhaijing-arena/?v=db451cd . Evidence docs/verification/M5C_P2_BOTUO_BASIC_RELEASE.md/.json, M5C_P2_BOTUO_BASIC_PUBLIC_FINGERPRINT.json, P2_BASIC_BROWSER/. Original art/receipts/GIFs unchanged; required16,630,060bytes/16MiB with131,072reserve retained. P1 COMPLETE, ordinary Hit CANCELLED remain protected.

NEXT ONLY targeted P2 phone review: body and independent outgoing/contact clarity, real HP/numbers synchronization, both-facing Idle return, Pause/Restart. NOT PLAYER VERIFIED until explicit confirmation. Do not reopen art/GIF/250ms, repeat full P1 or release, start Heavy/P3, merge main or deploy docs-only closure. [skip ci] evidence checkpoint may be newer than release SHA; latest checkpoint is containing feature commit, fetch again. Successor docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md.

## 2026-10-18 19:43+08:00 — P2 Basic executable250ms contract PLAYER APPROVED

Player「如果這樣是符合邏輯的話，我同意」at2026-10-18T19:43:23+08:00 accepts the explained250ms real-windup recommendation from feature preflight `3acdc848d39b13793e10a511422a64860b9dd91e`. Rationale verified in existing preflight: current Basic resolves immediately, accepted visual contact is240ms, and normal50ms steps resolve both240/250ms at250ms. Acceptance receipt: `docs/art/approved/botuo/basic/executable-v1/acceptance.json`. **PLAYER EXECUTABLE CONTRACT APPROVED / NOT IMPLEMENTED**, separate from immutable visual acceptance. Do not ask for timing or art approval again unless actual scope changes.

Approved bounded contract: fixed250ms real windup T0–T3; F1/F2/F3/F4=160/90/160/160ms; same actual resolve owns HP/text/contact; source160ms throughresolve+200ms, hit-only contact200ms independent of F3body160ms. Preserve coefficient/range/crit/Tier/cadence-at-start/no displacement; target escapes miss, ordinary damage does not cancel, existing legal controls/KO/new skill cancellation remains. Details and historical evidence: `docs/verification/M5C_P2_BOTUO_BASIC_PREFLIGHT.md`.

**NEXT: high-fidelity source-preserving runtime packing, then minimum shared/data integration and affected checks.** Rejected low-density PLANNING assets stay rejected. Keep16MiB cap and131,072byte reserve, no approved pixel loss/regeneration or P1 retest/review. Player also asked「接下來呢？先跟我說」at19:42:16: this slice records the decision and explains the next steps only; it does not claim implementation, build, release authorization, deployment or phone acceptance. Do not deploy this docs-only checkpoint (`[skip ci]`). P1 COMPLETE / ordinary Hit CANCELLED; no Heavy/P3/main merge. Latest feature HEAD is the containing commit; fetch again. Canonical successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`.

## 2026-10-18 — P2 Basic GIF PLAYER APPROVED / real250ms timing proposal pending

Player19:23:19+08:00「我審核ok，紀錄github相關流程規則進度，然後繼續」(repeated19:23:43) accepts presented four poses + independent VFX + normal/slow GIF. **PLAYER VISUAL APPROVED**, immutable receipt `docs/art/approved/botuo/basic/composite-v1/acceptance.json`, published `b7c0df68d5a85de844d35d4892413ec4dc345bfd`. Source-preserving GIF checkpoint `45c8d52402004af7bfea9ddef9d2f366b6fcff3a` has the identical tree to local presented1319da6. Preserve original PNG/GIF/prompts/receipts; historical candidate metadata is superseded for accepted visual scope only. Do not repeat art/GIF review.

**Continued: bounded runtime preflight measured**, `docs/verification/M5C_P2_BOTUO_BASIC_PREFLIGHT.md/.json`.16 direct production-session source/tactical/faction/direction cases +4Tiers +4misses confirm current one immediate0ms real hit/unphased cast/no action token.12 sandbox-only proposed240/250ms/cancel/escape/ordinary-damage probes: normal50ms simulation resolves both due choices at250ms. **Propose fixed250ms real windup T0–T3**, F1/F2/F3/F4=160/90/160/160ms, real HP/text/contact on actual resolve, no fake delay; target escape misses, ordinary damage continues, legal control/KO/new skill cancels without cadence refund. Preserve coeff/range/crit/Tier/cadence/no displacement. Exact source/contact/body lifetimes and minimum integration delta in report.

All-five required16,552,840bytes under16,777,216, reserve131,072 retained.89,856byte low-density probe technically fits but visibly softens approved art and is **REJECTED / NOT SELECTED**; actual high-fidelity packing remains engineering work. No budget increase or approved source edits. Full RGBA crop proof/quality comparison retained under `docs/verification/P2_BASIC_RUNTIME_PACK_PROBE/`; no PLANNING files enter runtime. **NEXT genuine gate: player accepts/revises proposed250ms executable contract**, not art reapproval. No runtime implementation/ENGINEERING PASS/build/deploy/player-phone PASS. P1 COMPLETE, ordinary Hit CANCELLED, protected sources unchanged. No P3/Heavy/main merge; `[skip ci]`; successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`. Latest HEAD is containing feature commit; fetch again.

## 2026-10-18 — P2 Basic F3 PLAYER APPROVED / F1-F2-F4 CANDIDATES

Player at2026-10-18T15:36:06+08:00:「好f3我approved，繼續，要確保未來動畫東西要足夠明顯」. **F3 PLAYER ART APPROVED**, exact immutable source19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36; receipt `docs/art/approved/botuo/basic/f3-v1/acceptance.json`, checkpoint `cfd2b22c56e995a528909af08a5a491e490c3afa`. F1 rear load, F2v2 forward release, F4 guarded recovery now **ART CANDIDATES / PLAYER REVIEW PENDING** at `docs/art/candidates/botuo/basic/phase-poses-v1/`. Static four-pose light/dark/small-size comparison, individual prompts, originals, rejected F2v1 history, reproducible PNG/alpha/bounds/hash report retained. Latest feature checkpoint is the containing commit; fetch remote again.

**Permanent visibility requirement:** articulated load/release/contact/recovery must be clearly different with effects OFF; review normal-speed and small/mobile-scale playback later, never assume a large still proves battlefield visibility. Caster/source effects and real-target impact must each be unmistakable, with Basic<Heavy<Special<Awakening escalation and distinct signatures; reduced motion retains readable static cues. Achieve this with pose/silhouette/value/independent FX and appropriate existing event-owned finite holds, not actor enlargement, invented hits/range, or unapproved HP/cast timing changes. Current static QA is a uniform source-scale study, not actual phone proof.

**NEXT ONLY: player reviews F1/F2v2/F4; F3 is closed.** Then accepted-pixel safe normalization + independent VFX + normal/slow/effects-off/mirrored/Idle-return GIF review. No VFX/GIF/runtime/deploy acceptance inferred. Basic still windup0ms/one real immediate hit; any timing change needs separate exact approval. P1 COMPLETE, generic Hit CANCELLED, all P1 and P2 base/Move/KO assets protected. Actual checks: PNG decode, visible-edge/border-alpha/hash/opaque QA, whitespace/protected paths; raw alpha1 border noise preserved/reported, no full-alpha-clear or runtime-ready claim. No suite/build/Pages rerun. `[skip ci]`, no main merge/P3. Current spec `docs/M5C_P2_BOTUO_BASIC_ACTION.md`; successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`.

## 2026-10-18 — PLAYER DECISION: cancel ordinary Hit Reaction, preserve uninterrupted abilities

Player explicitly rejects ordinary on-hit pose/animation: being damaged must **not** switch into a hurt/recoil stance or interrupt an ongoing attack/cast/movement. Concurrent hit recoil and offensive VFX clutter combat readability. **Cancel the entire P1 ordinary Hit Reaction production/review/GIF/integration/deploy gate**, and remove it from mandatory P1 completion criteria. Do not create equivalent per-character ordinary Hit animation for P2–P5 by default. This supersedes older “Hit next” handoffs/proposals, including KO>Cast>Hit>Move>Idle and two-100ms poses; those are HISTORY / REJECTED, not pending tasks.

Work-generated candidate `docs/art/candidates/lushu/hit/key-pose-v1/` is **ABANDONED / REJECTED BY SCOPE**, never player-approved; **do not promote, render additional poses, QA/GIF, integrate, or deploy**. Preserve existing immutable evidence/history if necessary rather than silently deleting it, but mark obsolete in documentation. If Work is still running a Hit task, stop that task and do not merge/use its products. Do not roll back or touch player-approved Basic/Heavy/Special/Awakening and their runtime/receipts. This is a **design and scope change only**, not an implementation claim.

At actual damage, preserve authoritative HP subtraction, damage/critical numbers, skill/contact VFX, normal attack/cast/movement animation uninterrupted; lethal damage still transitions to existing KO/death behavior. No stun, knockback, interruption or invulnerability is added by damage alone. Distinguish explicit ability-defined crowd-control, if any, from removed **generic hurt pose**: do not silently remove approved mechanics.

**NEXT:** skip ordinary Hit and perform **P1 whole-character closure audit** using existing accepted evidence (not re-run Awakening or all earlier player gates). Read current roadmap/acceptance matrices to inventory any remaining non-Hit obligations (including existing KO/Idle/Move status) and run only missing checks if needed; ask player for *one scoped final P1 sign-off* only if genuine acceptance requirement remains. After explicit P1 complete, follow character-first roadmap to P2 猼訑, starting with repository-approved identity/first missing art gate. No main merge; no shanhaijing-td gameplay. Keep Chat-first, minimal Work, generic data-driven architecture. New Chat/Work handoffs must be single self-contained copyable code blocks. This entry overrides conflicting old pointers, not historical receipts.


## 2026-10-18 — Awakening PASS / PLAYER VERIFIED — runtime acceptance closed

Player on 2026-10-18: 「我測試確認ok，核准，紀錄github相關規則進度流程」, responding to the deployed Awakening phone-review handoff. **P1 鹿蜀 Awakening「南山奔襲」: ENGINEERING PASS / DEPLOYED / PASS — PLAYER VERIFIED.** This closes the scoped player/phone acceptance gate for runtime `8e2f5e049095017d7350b1d0d61e96527ab21e44`, live https://hansen0318.github.io/shanhaijing-arena/?v=8e2f5e0 . Baseline docs checkpoint: `8e528a49c9d5defb8958891a4b05a991689b1c45`. Immutable runtime receipt: `docs/art/approved/lushu/awakening/runtime-v1/acceptance.json`.

Recorded engineering/release evidence remains Actions #1067 / run39097029256, 879/879 tests, build/asset guard, real Chromium four cases/28 screenshots and 17 public-file SHA256 matches. Those are prior release results, not rerun for this documentation update. The player's statement confirms overall scoped acceptance; it does not supply individual checklist observations, device/browser model, FPS or measured GPU memory. Preserve this distinction in future recovery.

Permanent acceptance flow: bind the exact player statement to the presented deployed SHA/URL and scope; keep visual approval, executable-contract approval, engineering evidence, deployment evidence and player acceptance separate. Read the newest authoritative entry/receipt before older history; do not reopen or repeat completed Awakening gates without a new defect or changed scope. Preserve all approved sources/GIFs/older receipts and historical pending entries, which this entry supersedes only for Awakening.

**NEXT unfinished milestone: P1 Hit reaction, then character-wide regression/player acceptance**, following the character-first roadmap. Whole-P1 completion and P2 remain unclosed. This request records acceptance/rules/progress/workflow only; it does not implement that next milestone. Keep feature branch `feat/m0-combat-core-20260927` / PR1, no main merge. Evidence-only checkpoints use `[skip ci]`; docs HEAD may be newer than the deployed runtime SHA. Successor prompts remain one complete copyable block.

## 2026-10-18 — Awakening DEPLOYED / real browser PASS / PLAYER PHONE PENDING

Player「好，確認紀錄進度規則和流程，沒問題就然後繼續」at12:17:25+08:00 authorized the scoped verification/release. **P1 Awakening「南山奔襲」integrated and DEPLOYED** from8e2f5e049095017d7350b1d0d61e96527ab21e44. Actions#1067/39097029256 build117585501848 and deploy117585692920 SUCCESS;879/879 tests, build and asset guard PASS. Actual Chromium/Phaser WebGL verification4 cases(normal/reduced motion ×left/right),28 screenshots, real3 hit identities/times and complete direct-destroy cleanup PASS. Screenshots inspected; this is fixed-simulation-time browser rendering, not phone/FPS/GPU-memory acceptance.

Public17 files(index+3 JS/CSS+13 runtime PNGs) exact-byte SHA256 match release build. JS:index-D7Qjj1EB.js,battleRuntime-Bt34mgQY.js;CSS:index-DcqtNRF0.css. Live: https://hansen0318.github.io/shanhaijing-arena/?v=8e2f5e0 . Fingerprints:`docs/verification/M5C_P1_AWAKENING_PUBLIC_FINGERPRINT.json`; release evidence:`docs/verification/M5C_P1_AWAKENING_RELEASE.md`; real browser JSON+6 representative screenshots:`docs/verification/P1_AWAKENING_BROWSER/`; full28-shot artifact12124838038. Required decoded scene/cache16,552,840/16,777,216 bytes;131,072 optional reserve retained. Approved sources/GIFs/receipts untouched, no cap raise or art regeneration.

First browser release attempt1066 correctly blocked deployment on direct Game.destroy cleanup; generic Arena ownCleanup now handles shutdown/destroy exactly once. Permanent lifecycle rule: scene-owned session/presenter/FX/numbers/load gate cleanup must cover both events, remove paired listener on first event and pass real destruction/Restart checks. Never weaken a failing release gate or infer phone approval from CI.

**NEXT ONLY: player phone review** of first-rush speed,3distinct source/contact VFX, independent realHP steps/escape/empty cast, actor size/left-right/Idle return and Pause/Restart. No claim of phone acceptance, no P1 fully verified/Hit reaction/new art/P2 or main merge. Do not repeat preflight/approved art/runtime integration/deployment. Evidence-only closure uses[skip ci], so latest docs HEAD may be newer than deployed runtime SHA. Every successor prompt remains one complete copyable block; fetch current remote on recovery. Older not-deployed/pending entries below are history.


## 2026-10-18 — scoped Awakening release authorized / browser gate and deployment pending

Player at2026-10-18T12:17:25+08:00: 「好，確認紀錄進度規則和流程，沒問題就然後繼續」, responding to completed integration112f0d3943aa74d59798dfe67d14cab694b6a671 and next steps browser check→Pages deployment→phone acceptance. **Scoped verification/deployment authorized**, no repeated art/contract approval required. Integration877/877/build/source/cache evidence stays recorded; this is not deployment/phone PASS.

Release uses existing feature branch/PR1/Pages pipeline, never main merge. One-shot commit flag `[awakening browser]` opts into real Chromium/Phaser pose/source/contact/mirror/reduced-motion/Idle/teardown checks before Configure Pages/upload/deploy; failure prevents release. Browser tool is pinned and installed outside the repository; production dependencies/source/assets unchanged. Browser evidence is uploaded as `awakening-browser-verification`; deterministic render samples are not device FPS or phone acceptance. This host has no Chromium; its download returns a zero-size/invalid archive, so do not claim local browser PASS. CI is the executable browser environment.

NEXT inspect exact release Actions jobs, browser evidence/screenshots, deployment result and public JS/CSS/all13 runtime PNG fingerprints; record exact SHA/URLs/outcomes. Phone remains player-owned and P1 is not declared fully verified from CI alone. No new art/P2/Hit reactions/main merge. After release use `[skip ci]` for evidence-only closure to avoid unintended redeploy. Historical NOT DEPLOYED entries remain prior checkpoints; only later evidence may close deployment. Every successor prompt stays one complete copyable block.


## 2026-10-18 — approved Awakening runtime integrated / automated verification PASS / NOT DEPLOYED

Player executable acceptance: 「好確認，繼續」2026-10-18T10:10+08:00, against preflight fa29a9c; later status question confirms this work is integrating the accepted animation into the game. **Runtime integration IMPLEMENTED;877/877 automated tests, build, asset guard and diff checks PASS.** Shared staged actions now drive three real ray-clipped displacements, boundary-only locked-target re-aim, independent relative swept hits0.40/0.70/1.10, no miss HP/RNG/target FX, cancellation and true event-owned body/source/target feedback. Default50ms is preserved outside actual staged windows; action intervals<=10ms and exact event/status/area boundaries. Existing defense/crit/Tier contracts preserved.

Five approved poses + six independent accepted source/contact VFX use deterministic runtime derivatives. Six legacy packs remove only proven blank outer rows/unused Botuo static cells; original source bytes/GIFs/receipts untouched and both-facing world placement verified. Required scene/cache/reservation peak16,552,840/16,777,216 bytes;224,376 headroom;optional reserve131,072 retained. No image generation, cap increase or required-art eviction.

Evidence: `docs/verification/M5C_P1_AWAKENING_RUNTIME.md`, `.json`, `P1_AWAKENING_RUNTIME_ASSETS.json`; recovery plan `docs/plans/2026-10-18-p1-awakening-runtime.md`. Fresh reviewer identified source-texture reuse, queued/telegraph time ties and readiness-triggered global10ms stepping; all fixed with RED→GREEN regressions, including periodic-area tie and legacy Heavy-contact/body overlap. Eight isolated production-session/presenter traces cover player/AI, both factions and both directions; real Tier and Arena bridge tests pass. These are NOT browser pixels/GPU/mobile proof.

**NOT DEPLOYED / BROWSER VISUAL + PHONE PENDING.** Feature checkpoint uses `[skip ci]`; PR1 remains open and no main merge/P2/Hit-reaction work. NEXT: review integrated runtime presentation/raster/cadence on the actual game, settle scoped feature deployment, then publish/fingerprint and player phone smoke. Do not regenerate/reopen approved art/GIF/real contract or redo implementation/preflight; recover latest remote and continue only this remaining release/device delta. Every successor prompt must remain a single complete copyable block. Historical pending/old-runtime statements below are superseded by this top entry.


## 2026-10-18 — executable contract PLAYER APPROVED / runtime integration authorized

Player at 2026-10-18T10:10+08:00: 「好確認，繼續」, in direct response to the runtime preflight proposal at `fa29a9caa04a9b91b69169def720327b3c1f1476`. **Executable contract and source-preserving packing path PLAYER APPROVED; implementation authorized.** This supersedes the prior decision-pending stop, not historical evidence or the visual receipt.

Binding contract: `docs/verification/M5C_P1_AWAKENING_RUNTIME_PREFLIGHT.md` Section2 in full: anticipation80ms; starts80/135/280, center-arrivals110/260/420, follow-through ends135/280/470, recovery610ms; real swept-overlap HP/contact times, not fixed preview accents; source/target radii.30/.25;4-unit leg cap, overruns.65/1.10/.65; locked-target boundary-only re-aim, ray truncation at arena boundary, empty/escape/death/cancel policies, shared <=10ms chronological action-window stepping. Fixed coefficients.40/.70/1.10,total2.20,T0 CD12 and existing Tier/defense/crit semantics. No miss damage/RNG/target FX, no P1 engine exceptions. Implement approved-source runtime derivatives and measured lossless legacy packing without changing visible world placement or raising16MiB cap; keep128KiB optional reserve.

Visual sources/GIFs/receipts/history remain immutable. Integration tests/build/review must establish actual engineering evidence; this approval itself is **NOT ENGINEERING PASS / NOT DEPLOYED / PHONE PENDING**. Continue implementation, no P2/main merge. Use `[skip ci]` checkpoints until integration is verified and release scope is settled; preflight did not grant deployment. Do not reopen this accepted contract or re-request the same approval. Next: approved runtime integration; then scoped release and player phone verification.


## 2026-10-18 — v3 GIF PLAYER APPROVED / runtime preflight next

Player: 「我審核OK，你紀錄github相關進度流程規則，然後我要換新的work繼續做，你要給我prompts給新的work，無縫接軌，是嗎?是的話就繼續」, responding to corrected v3 normal/slow/comparison at d8e895ad9d86aaef2e2d15a82e54e13f275d79ca. **Five poses + independent three-phase VFX/composite visual playback PLAYER APPROVED.** Exact immutable paths/hashes/scope: `docs/art/approved/lushu/awakening/composite-v3/acceptance.json`. Approved binaries remain at their versioned source paths; the folder name candidates is historical, the acceptance receipt is authoritative. Do not regenerate or overwrite approved bytes. Older pending statements below are historical.

Accepted visual preview: contacts110/260/420ms,recovery610ms, first rush30ms. Per AGENTS separate timing-scope rule, GIF review does not separately approve real actor displacement/collision geometry/re-aim/arena behavior or changing the prior explicit real combat contract150/300/460ms,total650ms. New Work measures the executable delta and presents a concrete revised real timing/geometry contract before changing mechanics; do not reopen approved art/GIF. Fixed coeff0.40/0.70/1.10,total2.20,CD12, three independent at-most-once swept hits, defense/crit/Tier; no false HP or target hit FX on whiff.

**RUNTIME NOT IMPLEMENTED / ENGINEERING NOT PASSED / NOT DEPLOYED / PHONE PENDING.** Existing code still immediate/+120/+240ms equal damage and no triple dash; preview is scripted illustration. NEXT bounded Work: recover latest GitHub, inspect shared combat/action/VFX/cache/renderer, measure legal paths/hurtboxes, source-to-runtime scale/anchor/mirror and16MiB residency; record executable plan and exact remaining contract decision. No gameplay changes/deploy in this preflight slice. Canonical handoff/static findings: `docs/handoffs/P1_AWAKENING_V3_NEXT_WORK.md`. Preserve Basic/Heavy/Special; no P2/main merge. Checkpoint [skip ci].

Permanent rules: bind exact statement, hashes and scope; keep visual acceptance / real timing-geometry approval / ENGINEERING PASS / DEPLOYED / PHONE VERIFIED separate. Decode all review GIF holds >=20ms; comparison and normal must share sample times/directions/Idle holds. File duration alone does not prove device wall-clock playback. Keep all previous sources/versions immutable.


## 2026-10-18 — first-rush speed revision requested; prior GIF not accepted

Player2026-10-18T09:12:07+08:00: 「進度流程規則先紀錄到github相關資料文件，第一段要改更快」. Record35971db assets/provenance/checks before revision. **Five character poses remain PLAYER APPROVED; VFX/GIF remain CANDIDATE / PLAYER REVIEW PENDING.** This revision request is not acceptance of the prior GIF or permission to integrate/deploy.

Create a versioned PREVIEW candidate only: retain80ms anticipation, shorten first visible rush80–150ms (70ms) to80–110ms (30ms). After first contact advance the remaining timeline40ms, preserving all later segment/impact/recovery durations: contact110/260/420ms, recovery610ms. No inserted pause or slower second segment. These exact new numbers are executor-selected candidates, NOT player-approved replacement combat timing. Prior real design150/300/460ms,total650ms remains recorded until separate exact contract acceptance; current runtime remains unimplemented old behavior. Keep coeff0.40/0.70/1.10,total2.20,CD12 and independent collision semantics.

Preserve v1 GIFs/approved art/VFX source bytes; no image regeneration or changed character scale, path, effect shapes/sizes or damage. Publish v2 normal/slow and before-after speed comparison, record hashes/timeline/actual GIF checks and wait for player review. Timing-only requests must not be promoted into unseen asset/GIF/runtime approval. No P2/main merge/deploy; checkpoint [skip ci].


## 2026-10-18 — all five Awakening character poses player approved

Player at2026-10-18T08:47:38+08:00 「我確認ok」accepts poses1/2/3/5 on the five-pose review at951dac8; terminal F3/pose4 was approved earlier. Receipt and exact approved source hashes: `docs/art/approved/lushu/awakening/phase-poses-v1/acceptance.json`. **ALL FIVE CHARACTER POSES PLAYER APPROVED; VFX/GIF NOT YET APPROVED.** Preserve all shown source bytes; do not regenerate poses. Continue source-preserving common skull-density/ground/anchor normalization, independent three-stage escalating VFX and normal/slow/mirrored/effects-off/Idle-return composite GIF review. Distinguish real runtime from illustrative preview; no actual implementation/deploy/phone acceptance or P2/main merge. Approved gameplay contract is unchanged and remains unimplemented. Old pose-review-pending entries below are historical.


## 2026-10-18 — terminal F3 likeness approved; pose production continues

Player at 2026-10-18T06:47:26+08:00: 「好這個f3的形象我審核通過，紀錄github進度和相關流程規則，依照規則繼續」. Exact shown master SHA256 `c736acca0da5fb5b6c7824a8dfb4bfb2719cf2ce99af74c54dde21773821f3d0` is copied byte-for-byte to `docs/art/approved/lushu/awakening/terminal-f3-v1/F3-terminal-master.png`; receipt: `docs/art/approved/lushu/awakening/terminal-f3-v1/acceptance.json`. **F3 LIKENESS / IDENTITY PLAYER APPROVED; CONTINUATION AUTHORIZED.** This preserves the shown terminal pose; no approval of unseen phase poses, VFX, GIF, alpha changes, runtime, deploy or phone smoke is inferred. This entry supersedes older F3-not-produced/player-pending status below; those remain historical.

Continue with deterministic source-preserving transparent padding and independent character-only candidates: anticipation → first-rush contact → second return/crossing contact → exact approved terminal F3 → recovery. This is an authoring/review plan, not a new gameplay contract or acceptance of unshown poses. Extra key poses are justified by three separate contacts; do not force one generic four-pose loop. Contacts150/300/460ms, full650ms, coeff0.40/0.70/1.10 and CD12 remain design approved but unimplemented. After pose review, independent escalating VFX and composite normal/slow/mirrored/effects-off/Idle-return GIF require explicit player acceptance before runtime. No deploy/P2/main merge.

Source has invisible alpha1–8 noise; preserve immutable master. Padding must preserve every source RGBA pixel; if noise remains inside original canvas, report it rather than claim it was cleaned. No source redesign or regenerative repair of this approved F3. Runtime readiness remains a later shared-scale/anchor/budget gate. Checkpoint with [skip ci] to prevent art-only changes auto-deploying.


## Player-approved P1 Awakening three-rush gameplay contract — 2026-10-17

Player「好 可以 確認紀錄github流程規則進度，然後繼續」explicitly approves the previously presented **real** three-contact schedule **150 / 300 / 460 ms from cast** and **650 ms full playback including recovery**, plus **three independent path-swept collision checks**, each at most once. Design-approved T0 hit coefficients **0.40 / 0.70 / 1.10** sum **2.20**, cooldown **12s**, no extra attack, no guaranteed contact or target impact FX on whiff. Three segments are 起衝突進 → 折返追擊 → 終結奔襲. Third segment remains independently damaging if first/second missed, and third terminal-contact F3 is the first art candidate **only after the three-phase choreography is specified**. Authoritative details: `docs/M5C_P1_LUSHU_AWAKENING_ACTION.md`.

**Status distinction:** PLAYER DESIGN APPROVED / NOT IMPLEMENTED / NO F3 ART YET. Existing runtime still immediate +120/+240ms, equal 2.20/3, range checks and no three-rush displacement. Proposed segment-boundary re-aim, target-lock, swept capsule and arena clamp are implementation preflight choices requiring geometry measurements, not license to change damage geometry/retargeting beyond this approval. Keep generic shared pipeline, AI/player parity, legacy Tier, critical/defense, 16MiB budget, accepted Basic/Heavy/Special, no P2/main merge. A design approval does not authorize bypassing the **art F3 → full poses/VFX/GIF approval → runtime integration/deploy → phone smoke** gates.



## P1 Awakening approved independent hit weighting — 2026-10-17

Player「好我同意 妳把這些紀錄到github相關文件然後繼續」approves the proposed **design** for 「南山奔襲」: three individually collision-qualified hits with increasing *base coefficients* **0.40 / 0.70 / 1.10**, sum **2.20** (T0 baseline), not conditional combos. Third hit must retain coefficient1.10 if hits1/2 miss; no guaranteed hit, no fake HP, no fake target burst. Only real collision at each event can generate that hit's damage and target-attached impact VFX. First VFX smallest, second intermediate, final largest and most distinct; on phone compare independently rendered damage text, true HP bar steps and effects, and preserve existing defense/crit/Tier semantics. Actual visible HP significance is **not verified** until combat/phone test; visual legibility is not permission to change HP or give invulnerability. This supersedes equal-per-hit coefficient as a **future implementation requirement**, not a claim runtime already changed: current `battleSession.js` divides 2.20 evenly and checks later hits by range, not path collision; current ability lacks triple displacement. Keep 3 hits, CD12, total2.20; change timing/travel/hit geometry only after separate fully specified contract and approval. Multi-hit weight arrays must use generic shared data-driven schema, no P1 conditional runtime exceptions. Do not generate terminal F3 until choreography/real mechanics constraints reviewed; do not modify Basic/Heavy/Special/P2/main.



## Player-approved multi-impact Awakening design-first gate — 2026-10-17

Player「好可以，妳確認這個架構流程後，把他整理到github進度流程和硬規則，確保可給別人無縫接軌進度，然後繼續進行」approves the **design sequencing** for P1 鹿蜀「南山奔襲」: first specify all three fast collision phases (initial rush, return/crossing rush, terminal strongest rush), their travel paths, unique body poses, actual three hit/VFX correspondences and ending; **only after design review** create the key **third/terminal-impact F3** candidate, then earlier phase poses, independent effects and composite GIF for explicit player acceptance. F3-first within the pose-production stage does **not** mean F3 before full ability choreography. Do not treat this as approval of any generated image, numerical displacement/timing, GIF, runtime, or deploy. The existing P1.awakening has three damage hits but no active movement and zero windup; real movement or hit-timing changes need a separately approved gameplay contract before implementation. This rule generalizes to future multi-stage/multi-hit abilities: choreography and engine events must be mapped **before** a single key-pose image is authored. Canonical bounded spec: `docs/M5C_P1_LUSHU_AWAKENING_ACTION.md`. Preserve P1 Basic/Heavy/Special acceptance, no P2 or main merge.



## Approved action timing and source-preserving residency

Record visual/GIF approval separately from actual combat timing approval, including exact statement and scope. Once both are explicit, continue the authorized integration/deployment without reopening completed gates. Bind authored contact frame, displacement, real HP/RNG event, target VFX and post_cast effects to the same shared resolve actionId; never fake synchronization by delaying only HP text. T0 constants and existing Tier scaling are separate contracts. Runtime derivatives may remove only proven fully transparent outer rows and downsample approved sources under a recorded deterministic policy; keep originals/GIFs immutable, preserve visible-pixel world placement in both directions and test noncentral authored-action origins against actual renderer flip semantics. Fit every required asset in the existing cache cap; never silently evict required art or raise the cap. Engineering/deploy evidence does not imply phone acceptance. P1 Special320ms approval2026-10-17T14:45:48+08:00 is the current bounded case; it grants no new skill/character or main merge.


## Purpose
This playbook defines the durable development workflow for Shanhaijing Arena. It is project-wide and independent of any one milestone.

## Action art → GIF → runtime gate

Canonical method: `docs/CHARACTER_ACTION_ART_WORKFLOW.md`, player-approved process2026-10-15; P1 engineering/deployment complete, player attack-visual feedback positive2026-10-16, unreported device checks pending. Its reusable case-study table and zero-context successor index preserve exact assets/scripts, accepted timing decisions and release evidence; do not redo completed P1 gates or infer approval for another attack. Recover exact GitHub identity, review F3 first, then four distinct poses; author VFX separately, preserve accepted pixels during safe equal-cell packaging, and obtain explicit composite GIF approval **before** action runtime integration or deployment. Keep source PNGs/versions/metadata/checksums/GIF and acceptance history in GitHub + self-contained handoff ZIP. A successor resumes the first unfinished review gate, not a fresh redesign. Process approval is not approval of generated art or proof of a working battlefield animation.

## A0. Mandatory rule refresh before action
Before planning or executing any substantial project action, first recover the current hard rules and authoritative state from GitHub. At minimum read `AGENTS.md`, this playbook, the current handoff/state pointers when progress matters, and the spec governing the proposed action. Do this before offering implementation advice, preparing assets, editing the repo, choosing tests, or writing a Work handoff.

Do not assume a previous recovery is still current when the repo may have changed. The purpose is to make every recommendation start from the same authoritative constraints rather than from chat memory.

## A. Chat-first stage
Chat should complete the maximum safe work before Work is opened:
1. clarify/lock the player-visible requirement;
2. inspect GitHub state and relevant code/specs;
3. identify the smallest change surface;
4. complete static analysis, documentation, asset planning, and bounded edits that do not require a full runtime;
5. define acceptance criteria;
6. decide the minimum sufficient engineering verification;
7. define the specific player-owned smoke, if any;
8. only then create the smallest Work task.

## A1. Character-first temporary completion
For the current Chapter1 character-production phase, do not hop to the next unfinished character after static art alone. Complete the active character through:
1. approved static identity/runtime presentation;
2. approved locomotion/runtime verification;
3. approved static death/KO/runtime verification.

Only then mark that character temporarily complete and move to the next roster character. Basic/Heavy/Special/Awakening action animation, Hit and VFX are not part of this temporary-completion checkpoint unless the player explicitly changes the order.

## B. Work entry / recovery
Work must:
1. inspect latest remote main;
2. read `AGENTS.md`;
3. read this playbook;
4. read the CURRENT HANDOFF POINTER in `WORK_PROGRESS.md`;
5. read `docs/STATE.md` and only relevant specs;
6. recover the recorded active branch/PR/checkpoint if one exists;
7. inspect actual HEAD/status/diff;
8. continue from the first unfinished item.

Do not create a replacement implementation merely because the Work session is new.

## C. Work scope rule
Work owns only the irreducible executable delta.
Examples:
- iterative multi-file implementation;
- dependency/build integration;
- executable test/debug loop;
- browser/runtime diagnostics when they are technically necessary;
- merge/deploy/release steps when Work owns the substantial implementation.

Work should not redo:
- already locked design;
- static analysis already completed by Chat;
- documentation already completed by Chat;
- player-owned usability/visual smoke;
- unaffected historical regression.

Work handoffs should be one compact prompt, not a verbose recap. GitHub carries prior context. Include only: the exact unresolved executable delta, protected baseline, minimum checks, deploy/stop condition, and any player-smoke handoff. Do not provide a long version followed by a short version.

Before writing that prompt, Chat must have already completed all safe Chat-owned work and reduced the task to the irreducible Work-only delta. **Every player-facing handoff/instruction intended for a new Chat, Work, Codex, or another execution session must be delivered as exactly one complete self-contained copyable code block.** This includes new-Chat recovery prompts, not only Work prompts. Do not split required context across prose and separate blocks, and do not provide competing long/short versions. Successor-Chat prompts must state this one-click-copy rule near the top so it propagates to the next handoff. When a prepared ZIP/package already contains the canonical handoff, give one short copyable instruction that tells the destination to recover and follow the packaged handoff; do not duplicate competing instructions.

## D. Safe checkpoint flow
For substantial tasks:
- checkpoint after first coherent implementation;
- checkpoint before long-running runtime/browser verification;
- checkpoint immediately if token/session/environment risk increases;
- update progress docs before ending an incomplete session;
- push the branch so the next session can recover remotely.

A checkpoint is not a PASS claim.

## E. Verification ladder
Choose the smallest sufficient scope based on change impact.

### A — static/local
Use for docs, isolated data, naming, or non-runtime bounded edits.

### B — targeted
Default for small code changes. Test only touched modules and directly affected contracts.

### C — impacted regression
Use when a shared subsystem changes. Test its dependency surface.

### D — full regression/runtime
Use only for broad/shared architectural changes, dependency upgrades, release infrastructure, large refactors, or when targeted evidence is insufficient.

Escalate only when evidence shows broader coupling.

## F. Player smoke
Prefer player smoke for subjective or device-realistic acceptance:
- game feel;
- touch controls;
- camera comfort;
- visual/VFX readability;
- balance feel;
- device layout;
- focused end-to-end confirmation.

Provide a short changed-scope checklist. Do not ask the player to replay unrelated content.

## G. Status language
- ENGINEERING PASS
- ENGINEERING PASS / PLAYER SMOKE PENDING
- PASS / PLAYER VERIFIED
- FAIL / INCOMPLETE
- RELEASE BLOCKED

Keep checkpoint, engineering verification, player acceptance, merge state, and deployment state separate.

## H. Release closure
Unless explicitly checkpoint-only:
1. finish the owned implementation;
2. run minimum sufficient engineering checks;
3. review the actual diff;
4. merge to main when safe;
5. deploy if a public delivery pipeline exists;
6. verify the changed public surface at the minimum sufficient level;
7. update `docs/STATE.md` and `WORK_PROGRESS.md`;
8. record the exact next action or player-smoke checklist.

## I. Handoff completeness
A handoff is complete only when GitHub contains enough information for a zero-context successor to answer:
- What milestone are we in?
- Which branch/PR/checkpoint is active?
- What is already done?
- What evidence has passed?
- What is still pending?
- What must not be redone?
- What is the one next exact step?

## Self-contained ZIP handoff contract (player-approved 2026-10-14)
For asset/file handoffs from Chat to Work, Chat MUST prepare one self-contained ZIP including every required approved asset, necessary supporting files, checksums/manifest, and **START_HERE.md + WORK_HANDOFF.md** with complete bounded execution instructions (GitHub zero-context recovery, protected baselines, exact executable delta, tests, release/stop gate and player verification). Work must not need the player to paste a second lengthy prompt or manually assemble files. A new successor Chat must check this rule before every handoff. Do not put outdated or competing prompts in the package.
When a Work environment actually opens the attachment, it should extract the ZIP and read START_HERE.md then WORK_HANDOFF.md, then refresh GitHub and execute the authorized task. **Attaching ZIP alone does not guarantee that a new Work session starts or reads it automatically**; this depends on the product workflow. If the environment requires an initial instruction, provide ONE minimal copyable code block: "解壓縮附件 ZIP，先讀 START_HERE.md 與 WORK_HANDOFF.md，依最新 GitHub 硬規則執行；完成後停止。" Never claim zero-click autonomous execution without verification. No unattended background work unless the platform explicitly supports it.

## Approved multi-frame normalization — required pre-GIF process (player verified 2026-10-14)
When a player approves four poses as the art source, preserve that exact image and do not regenerate it merely to repair layout. A visually good four-pose collage is NOT automatically a sprite strip. Never create GIFs from naïve equal-width slices. **Chat owns the full safe preparation whenever available**: (1) identify each independent entire silhouette and its source bounds, separating any neighboring components/pixels; (2) remove background or fringe only by a color-faithful process that never deletes character colors; (3) individually extract the four frames, preserving fists, claws, tail, accessories and outline; (4) normalize into exactly four equal-sized transparent RGBA cells with generously clear horizontal/vertical safety padding; (5) align a common grounded baseline while keeping each full actor inside cell bounds; (6) inspect per-cell nonzero-alpha bbox, compare on light/dark backgrounds and ensure no neighboring-frame bleed/clipping/discolored fringe; (7) only then derive an animated GIF preview from the normalized cells, and obtain explicit player approval before Work integration. Runtime must animate `battleMove` only while moving, return to previously approved single-frame `battleIdle` when stopped, use the existing mirror contract, and preserve gameplay/stat/collision coordinates. Do not mistake alpha mode or even a successful crop for visual/no-bleed proof. Record exact approved source, normalized derivative hashes/cell geometry and PASS boundaries in progress/state. A Chat→Work package must include approved source, four separated PNGs, normalized strip, review GIF, manifest/checksums and complete START_HERE/WORK_HANDOFF; Work gets only integration/tests/deploy and phone-smoke handoff.

## Character-complete sequential production rule — player updated 2026-10-16

**Mandatory / supersedes older category-across-roster batches.** Deliver one character's full visual skill kit before beginning another: approved Concept → portrait/collection/battleIdle → locomotion → static KO → Basic action/VFX → Heavy action/VFX → Special action/VFX → Awakening action/VFX → Hit/reactions → character-wide player phone smoke. Earlier gates already accepted do not repeat; each action still uses `docs/CHARACTER_ACTION_ART_WORKFLOW.md` F3-first pose, four poses, separate VFX, safe GIF approval, shared runtime, tests/deploy, device smoke. Data-driven shared renderer/runtime remains reusable for all characters, never character-specific branching. Review/ship bounded substeps but do not abandon an unfinished character for another character's same skill category. Follow explicit player reordering if later supplied. P1 Basic visuals player-confirmed on 2026-10-16; next P1 Heavy, with remaining device checks not falsely marked PASS. Preserve no-main-merge and original art source rules.

## Mandatory action-power visual escalation — player rule 2026-10-16

**2026-10-17 player clarification:** effect size must be visibly larger and easier to recognize at real phone battle scale, not merely described as stronger. Review BOTH outgoing weapon/light effects and target impact bursts separately. Heavy < Special < Awakening must show a clear successive increase in effect footprint and emphasis, while retaining different motion/VFX signatures. Canonical requirement: `docs/M5C_ART_ANIMATION_VFX.md` → "Large, unmistakable cast and impact VFX". Do not enlarge the actor, invent attack range/damage, or label unproduced skills complete.

For each character's four active categories, **Basic < Heavy < Special < Awakening** in perceived impact, animation commitment and spectacle. This is a **relative visual hierarchy**, not a new damage formula or numerical guarantee: individual ability data (including defensive/heal skills) remain authoritative. Preserve readability, role/species identity and mobile performance.

- **Basic:** fast, compact, readable signature strike, brief contact flash/trail; little screen occupation.
- **Heavy:** stronger anticipation, forceful acceleration/weight transfer and a clearly more substantial hit, brighter/broader weapon trail, impact burst and modest recoil/shock accent.
- **Special:** distinct signature character/ability expression and richer, layered VFX with greater spatial presence, appropriate to actual targeting and gameplay function; utility/healing skills convey stronger potency without fake damage.
- **Awakening:** most dramatic ultimate action and VFX payoff; strongest anticipation/release, unmistakable silhouette, staged/layered burst, persistent-but-bounded aftermath. Do not obscure HUD, targets or critical warnings, nor add unearned hit geometry or extra damage.

For all four tiers, **animation body mechanics must escalate together with VFX** (pose breadth, windup/follow-through, weapon/limb energy, timing), not merely a larger recolored particle sprite. Judge each new skill against the preceding approved skill of the same character in a side-by-side GIF/small-screen comparison. Keep character identity, weapon, scale/anchor, right-facing mirror, existing combat data/timing and actual hit synchronization unchanged unless the player explicitly approves a separate gameplay/timing change. FX complexity is constrained by scene residency, accessibility/reduced-motion, frame budget and target readability. For future characters use the same hierarchy and review gate. Do not copy identical effects across species or damage-only assumptions into support/defense.

## Mandatory within-character attack motion differentiation — PLAYER HARD RULE 2026-10-16

**Basic / Heavy / Special / Awakening MUST have immediately distinguishable bodily movements, silhouettes, attack vectors and timing signatures, even with VFX turned off.** The existing escalating power/spectacle hierarchy is additional, not a substitute. Do not produce the same four poses with just recolored/larger effects, faster playback or extra particles. These categories are distinguishable by the character's actual articulated motion and relationship to its ability's validated gameplay mechanics.

Required art review for every character before completing the four skills:
- Build a **four-skill motion differentiation matrix** describing each skill's stance/center of gravity, anticipation, primary limb/weapon path, facing/target vector, release/contact pose, follow-through and rhythm, with the real ability data as authority. Use distinct primary silhouette and action grammar per skill.
- Show each skill's player-preview GIF **both character-only (effects hidden) and with independent VFX** at actual phone battle scale. If testers cannot identify the skill by body movement alone (or its actual support/defense gesture), revise poses before approving effects or integration.
- Preserve exact approved identity, weapon, visual proportions, animation safety and state transitions. Do not add fake hit count/target/path/projectile/teleport/area, nor edit stats/AI/range/real damage timing without a separate player-approved combat change. Power feel escalates Basic < Heavy < Special < Awakening, while distinguishing attack type independently.
- For P1 鹿蜀 starting differentiation proposals, **Basic「踏角」** is the deployed compact grounded horn/hoof/weapon strike; **Heavy「逐風衝」** must uniquely emphasize a forward engage→planted forceful collision/weapon blow, with unmistakably different F3 and silhouette; **Special「迴蹄」** must emphasize a diagonal reposition followed by a rotational/turning hoof strike (no invented extra move/hit); **Awakening「南山奔襲」** must uniquely portray the existing three successive rushing hits, with staged peak burst and strongest overall payoff. Validate the latter two against real ability timing and source prior to making art; these are design directions, not preapproved poses or extra gameplay.
- Develop the current character's full four-skill kit before starting the next character; existing accepted Basic stays intact. No new art is approved simply by recording this rule.

## Distinct ability-specific VFX and target-bound persistent status effects — PLAYER HARD RULE (2026-10-16)

Every individual ability has its own immediately readable **VFX signature**, driven by ability definition and actual combat event/state—not merely a recolor/size increase of shared explosions. Basic < Heavy < Special < Awakening must escalate dramatic release, layered impact and visual scale where appropriate, while maintaining different shape, trajectory, element/material, rhythm and contact geometry for each move. Strong explosion/burst/impact feel is required for damaging power moves where justified. Support, defense, healing, buffs and debuffs receive appropriately striking protective/healing/condition visuals, not fake damage explosions.

**Three presentation phases must remain distinct:** (1) caster-side startup/charge/travel/release effect follows actual validated action; (2) impact VFX belongs to actual hit/landing/affected targets; (3) sustained **target-bound status VFX** stays anchored to the affected unit for exactly the *actual active state* and ends upon state expiry, cleanse, KO/despawn, scene switch or cancel as appropriate. Examples: burn flames/embers on the enemy, poison violet-green fume/droplets, bleed wound pulses, slow/chill ice/snow, shield aura, regeneration/heal halo. Periodic damage numbers and pulses occur only when the simulation actually applies periodic HP ticks, **not** at arbitrary animation intervals; hit count/stacking/refresh, immunity, partial resist, target switching and state visibility need data contracts and tests. Multiple effects must be legible and bounded, no opaque HUD masking, no confusion with team colors/critical numbers. Respect reduced-motion, frame/texture budgets and mirroring; effects never persist as orphan sprites after target death/scene exit.

**No invented gameplay:** The current roster ability data does not broadly define burn/poison/DoT status merely because a fire/water/venom-themed attack exists. An ability that applies no persistent status must show only its approved cast/impact visuals. Introduce DoT/status mechanics only in a separately player-approved combat milestone, then use generic event/state-driven target attachment. The VFX architecture should support future data-driven target statuses without character-ID specials.

**Per-skill player review gate:** record skill identity, offensive/support type, unique motion silhouette, VFX signature shape/color/trajectory/layering, attach point (caster/projectile/target/world), onset event, impact confirmation, linger/expiry source, Basic<Heavy<Special<Awakening comparison, effects-off and effects-on GIF, phone readability and reduced-motion. Do not reuse the identical effect for different abilities under a different name.
