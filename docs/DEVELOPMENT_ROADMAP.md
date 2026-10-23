# Development Roadmap — Post-M1

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


## 2026-10-23 — 疾行v2已部署／公開149項核對PASS／PLAYER PENDING

正常Pages run39875078049 completed/success，完整1047/1047、Build、549項來源guard PASS；發布 d1a39397562f2345bec0243ede82b6376f89684d／tree981276199ebe572d0481decfaff76349c8bb9a3d。CI artifact12468545672 SHA256314426c6cc540c5790dfec968ff861475d4888b84ed19f5b71a22d618a68c7bb、ZIP CRC及CI/local149檔逐bytes相同。公開3個變更檔（index.html及兩個JS）新取bytes一致，146個相同路徑/bytes雜湊素材沿用既有v1成功公開指紋，完整149/149核對PASS；未重跑未變素材比對、測試或Browser。證據 docs/verification/P1_PASSIVE_V2/{status.json,run-final.json,ci-build-inventory.json,public-fingerprints.json,ci-build.log.gz,ci-deploy.log.gz}。

已移除戰場被動文字牌/HUD文字/連線。疾行T0/T1/T2/T3：+35/+50/+65/+80%，3秒/CD6秒；實際移速2.7675/3.321/3.9237/4.7232（未疊其他buff）。原生16/built8及P2受影響相容性均PASS。玩家要求的無文字/更大真增益/獨立被動Tier成長已實作並發布；只剩新版P1疾行玩家實機驗收，不能冒稱玩家已核准或P1整角色完成。遊戲 https://hansen0318.github.io/shanhaijing-arena/?passive=d1a3939 。P1被動驗收後保存新收據才啟動P2厚甲，兩者驗收後才可P3技能。已核准四招/base/全部美術尺度不重開，普通Hit取消，單分支PR#1open/unmerged及全局素材政策保持。此結案切片純文件[skip ci]，不重發來源相同的Runtime。


## 2026-10-23 — 玩家直接執行修訂：疾行v2工程PASS／正常發布待完成

玩家拒絕舊版戰場文字與不明顯8%體感，明確要求直接執行，原文見 docs/verification/P1_PASSIVE_V2/authorization.json。依共用資料T0/T1/T2/T3疾行分別+35/+50/+65/+80%，3秒、觸發起CD6秒；2秒一般實際走位1單位門檻不變。戰場不建立任何被動文字/badge/HUD/連線，Collection仍說明T成長。一般movement與outgoing的15%上限保持；具明確額度之movement狀態可提高合計上限，疾行95%，無角色ID特例。全部核准四招/美術/尺度/anchor/ground/mirror/素材政策保持；普通Hit取消。

完整1047/1047、Build、P1實際native16/built8（四Tier、雙方/實際手機搖桿、無文字、真移動距離、到期/Pause/KO/end/Restart）、受影響P2 native4/built2/scale10 PASS。原生單人diff自審非獨立審查；較高增益有顯式資料與安全驗證，普通增益上限回歸通過。Browser腳本失敗原檔保留attempt1–4：錯誤重啟API、起點越界、面向前未同步畫面、built重啟後未等開場倒數；皆修正觀測腳本，未以放寬斷言/改產品迎合測試。新版報告量測實際有效2秒距離，另驗3秒到期。官方Chrome完整120231126bytes/ZIP CRC及SHA256驗證通過，CDN截斷失敗保留。

新版工程數值不是玩家實機核准；舊v1 spec/plan/receipts/GIF全部保持原bytes並由新decision記錄需求變更。舊來源證據不可套用v2；新版source-bound guard要求完整src/public/scripts/tests/依賴與24個真Browser案例、P2相容證據及最新指令。接續正常fullsuite/Build/guard/Pages及公開比對，不使用bounded或skip繞過Runtime發布。P1被動PLAYER PENDING，P2厚甲QUEUED，P3技能BLOCKED。詳見 docs/decisions/2026-10-23-passive-visibility-tier-revision.md 及 docs/verification/P1_PASSIVE_V2/。





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

## 2026-10-21 — Awakening VFX/GIF PLAYER APPROVED / execution preflight NEXT

Player「這個我確認OK，你紀錄github流程進度規則」accepts the normal GIF embedded in the preceding response and its linked visual-review package at `e1cdefa22c99aceae149a0a854210da9941c36e9`. Exact wording, primary normal GIF, seven linked GIFs, static reduced cue, three raw VFX and manifest/reference hashes are bound in `docs/art/approved/botuo/awakening/visual-v1/acceptance.json`. **PLAYER VFX/GIF VISUAL GATE CLOSED / APPROVED.** This records the presented package, not invented independent playback/device cases for every link. Old candidate/pending fields in frozen manifests/checkpoint/QA remain historical; authoritative latest approval is this receipt and progress entry. Do not ask again or regenerate accepted F1–F4/VFX/GIF.

NEXT unfinished Gate: Runtime preflight → shared cast/action/VFX/status ownership and timing contract → faithful packing and complete required-set capacity proposal → separate player contract review. None of those engineering proposals is approved by this visual acceptance. This request only records approval/process/progress; no engineering work, Runtime/build/Browser/deploy authorization or phone/whole-P2 acceptance inferred. Source/presentation assets, old receipts/manifests/scripts, gameplay and deployed Special remain unchanged.

Preserve instant0ms vs tacticalT0 900ms/T3 819ms (no universal F1/F2 windup); caster-locked actual damage circle, true-victim contact only, air without fake hit/protection. T3 actual post_cast beneficiaries13.5%/3.75s with independent Special/MAX lifecycle remain. GIF10ms display rounding never modifies gameplay. Keep P1 COMPLETE and all P2 approved art/scale/ground/anchor/mirror, ordinary Hit CANCELLED, Shared Dynamic Asset Residency,16MiB cap/131072reserve/allrequired. Existing45textures16611224decoded/34920extra is inherited evidence, not a new Awakening capacity pass. No main merge/replacement branch/TD/P3.

This approval-only `[skip ci]` slice freshly checks saved package bytes/SHA256, receipt references/JSON and protected diff scope. Reuse8GIF/124frame QA,16mechanics cases and Special164/Browser/release/145CI/39public evidence without reruns; no full-suite/build/Browser/release, five historical full-suite failures remain. Same feature branch and PR#1 open/unmerged; actual fetched HEAD supersedes stale PR connector head snapshots. Canonical successor `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md` is one complete self-contained copy block.


## 2026-10-21 — P2 Special COMPLETE / PLAYER VERIFIED; Awakening key-pose NEXT

Player explicitly approves the presented deployed Special and requests GitHub progress/process/rules plus a seamless new Work handoff. Exact statement/version/scope is in `docs/art/approved/botuo/special/runtime-v1/acceptance.json`, bound to536685401cfa0805b5836b057a27dd0692c46879 and its presented URL. Special runtime/phone Gate CLOSED / PLAYER VERIFIED; no itemized device case matrix/FPS/GPU/hash measurements invented. P1 COMPLETE and P2accepted Idle/Move/KO/scale/Basic/Heavy remain protected. WholeP2 is NOT complete.

Reuse unchanged Special164scoped/build/87guard, Browser4WebGL/126sampling/16chain/2built, deploymentActions1092,145CI/local and39complete public-hash evidence. Current slice only records acceptance, process and handoff; no src/public/scripts/tests/workflow/approved-art changes, engineering rerun or redeployment. Existing45required16611224decoded/16MiB cap/131072reserve/34920extra and five historical full-suite failures remain inherited evidence. Receipt, release.json/RELEASE.md and Special WORK_LOG distinguish art/GIF/contract/runtime/engineering/deploy/player gates; old phone/deploy/contract-pending pointers are historical, not tasks to repeat.

NEXT bounded new Work: P2 Awakening「鎮岳」missing actual mechanics evidence → differentiated action → ONE character-only F3/key-pose candidate → STOP for player review. Read `docs/M5C_P2_BOTUO_AWAKENING_ACTION.md` and `docs/verification/P2_AWAKENING_PREFLIGHT/static-seed.json`; read-only catalog/Tier recovery is prepared, not actual gameplay verification or approved design. T0caster AoE2.2/coefficient1.7/CD14, windup0 vs tactical telegraph900ms; preserve true Tier timing, T3post_cast team protection and accepted Special coexistence. Do not carry Special's deployment/art approval into unseen Awakening. Canonical successor `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md`, always ONE complete self-contained copyable prompt. No main merge/alternate branch/TD/P3, no repeated Special art/engineering/release, no Awakening F1-F4/VFX/GIF/Runtime/deploy before later gates. Docs-only checkpoint[skip ci]; latest docsHEAD is newer than live releaseSHA.


## 2026-10-21 — P2 Special DEPLOYED / PUBLIC VERIFIED / PHONE NEXT

Scoped「授權部署」receipt and final release record `docs/verification/P2_SPECIAL_RUNTIME/release.json`:536685401cfa0805b5836b057a27dd0692c46879 / Actions1092 run39593187720 build+deploySUCCESS;164bounded/Build/87guardPASS;145actualCI/local files and39complete public-fileSHA256matches. Browser1091 reused through machine-checked exact source/evidence equality, no new art/gameplay or Browser replay. NEXT only player Special phone acceptance at the release.testUrl; no wholeP2/Awakening/P3/main merge/newbranch or unchanged redeploy. Older authorization/contract/visual pending pointers are historical. Core WORK_PROGRESS/STATE top entries and Special WORK_LOG/RELEASE.md carry exact evidence/limits.

## 2026-10-21 — P2 Special BROWSER PASS / RELEASE AUTHORIZATION NEXT / NOT DEPLOYED

Actual tested feature `50edd53b69010ad9b5f700c3282cb2e8acb29c6a`, Actions #1091 / run39563136667:164/164 scoped tests, build/87-file guard4614620encoded bytes PASS;4controlled Chromium/Phaser WebGL cases(normal/reduced×left/right),126native sampling comparisons,16same-clock Basic/Heavy/other legal skill/Move chaining subcases and2actual built mobile-emulation Campaign→Stage→Team→Arena cases PASS,22captures,0page errors. Reports `docs/verification/P2_SPECIAL_RUNTIME/{browser-gate,browser-verification,built-entry,ci-jobs}.json`; ledger WORK_LOG.md,4inspected screenshots retained, artifact12328207752. Native-original max<=1LSB;2BasicF3UV-rounding cases match independently retiled ORIGINAL pixels exactly(0delta), with strict control mean bound.

Fixed real tight-atlas linear-filter edge clamp/neighbor bleed through9source-exact physical derivatives/mapping, not new art or actor resizing. All63logicalRGBA frames, accepted sources/GIFs/receipts/logical geometry/FPS and combat/Tier/CD/AI remain unchanged.45required textures16611224decoded +131072reserve leaves34920bytes; cleanup0. Independent review resolved fixture's mutable-sprite stale-event assertion and verified exact derivatives; source/status ownership, stale ordering, immediate mitigation/chaining, expiry/KO/clear/Restart remain effective. Prior unaffected local/mechanics/player evidence reused; no full suite rerun and five historical failures unchanged.

**Gates:** PLAYER ART/GIF/EXECUTION CONTRACT APPROVED; RUNTIME INTEGRATED; LOCAL PASS; BROWSER PASS; NOT DEPLOYED; PLAYER PHONE PENDING. Configure Pages/upload/deploy all SKIPPED. **NEXT ONLY explicit player authorization for scoped Pages deployment**, then release/public fingerprint and focused phone acceptance. Current instruction does NOT authorize deployment. Stop at this Release Gate; no repeated browser/art/GIF/contract gates without changed source or genuine defect. No main merge/replacement branch/TD/P2Awakening development/P3. Existing legal Awakening was exercised only for chaining. Latest docs commit may be newer than tested source; fetch remote. Successor `docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md`, always one complete self-contained copyable block.


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

## 2026-10-18 — P2 Basic ENGINEERING PASS / NOT DEPLOYED

Current Work scope packaging/integration/necessary verification/build completed against recovered d40abb0. Packing checkpoint2f1de8669d183653dcf0ab4f75bc92489266a02c; final checkpoint is containing feature commit, fetch latest. PLAYER ART APPROVED + PLAYER EXECUTABLE CONTRACT APPROVED / ENGINEERING PASS / NOT DEPLOYED / NOT PLAYER VERIFIED. P1 COMPLETE and ordinary Hit CANCELLED remain closed.

Accepted-density poses/independent FX integrated through shared250ms action path; F3body160ms/contact200ms independent, HP/text/contact same true resolve. Original art/receipts retained. Exact blank-row derivatives preserve both-facing world placement. Full required scene/cache16,630,060bytes,131,072reserve retained plus16,084extra; no evictions. 220/220 directly affected tests + Build/asset guard PASS; six cold/warm/Restart residency cases, independent review0 Critical/Important. Not browser/GPU/phone evidence. Full evidence docs/verification/M5C_P2_BOTUO_BASIC_RUNTIME.md/.json; residency/provenance/logs linked there.

STOP / NEXT GATE: explicit scoped release authorization, then only remaining required render/browser release checks → feature Pages/public fingerprint → targeted P2 phone acceptance. No automatic deploy/main merge/Heavy/P3, repeated art/GIF/250ms approval or full P1 rerun. Checkpoints [skip ci]; successor docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md.

## 2026-10-18 19:43+08:00 — P2 Basic executable250ms contract PLAYER APPROVED

Player「如果這樣是符合邏輯的話，我同意」at2026-10-18T19:43:23+08:00 accepts the explained250ms real-windup recommendation from feature preflight `3acdc848d39b13793e10a511422a64860b9dd91e`. Rationale verified in existing preflight: current Basic resolves immediately, accepted visual contact is240ms, and normal50ms steps resolve both240/250ms at250ms. Acceptance receipt: `docs/art/approved/botuo/basic/executable-v1/acceptance.json`. **PLAYER EXECUTABLE CONTRACT APPROVED / NOT IMPLEMENTED**, separate from immutable visual acceptance. Do not ask for timing or art approval again unless actual scope changes.

Approved bounded contract: fixed250ms real windup T0–T3; F1/F2/F3/F4=160/90/160/160ms; same actual resolve owns HP/text/contact; source160ms throughresolve+200ms, hit-only contact200ms independent of F3body160ms. Preserve coefficient/range/crit/Tier/cadence-at-start/no displacement; target escapes miss, ordinary damage does not cancel, existing legal controls/KO/new skill cancellation remains. Details and historical evidence: `docs/verification/M5C_P2_BOTUO_BASIC_PREFLIGHT.md`.

**NEXT: high-fidelity source-preserving runtime packing, then minimum shared/data integration and affected checks.** Rejected low-density PLANNING assets stay rejected. Keep16MiB cap and131,072byte reserve, no approved pixel loss/regeneration or P1 retest/review. Player also asked「接下來呢？先跟我說」at19:42:16: this slice records the decision and explains the next steps only; it does not claim implementation, build, release authorization, deployment or phone acceptance. Do not deploy this docs-only checkpoint (`[skip ci]`). P1 COMPLETE / ordinary Hit CANCELLED; no Heavy/P3/main merge. Latest feature HEAD is the containing commit; fetch again. Canonical successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`.

## 2026-10-18 — P2 Basic GIF PLAYER APPROVED / real250ms timing proposal pending

Player19:23:19+08:00「我審核ok，紀錄github相關流程規則進度，然後繼續」(repeated19:23:43) accepts presented four poses + independent VFX + normal/slow GIF. **PLAYER VISUAL APPROVED**, immutable receipt `docs/art/approved/botuo/basic/composite-v1/acceptance.json`, published `b7c0df68d5a85de844d35d4892413ec4dc345bfd`. Source-preserving GIF checkpoint `45c8d52402004af7bfea9ddef9d2f366b6fcff3a` has the identical tree to local presented1319da6. Preserve original PNG/GIF/prompts/receipts; historical candidate metadata is superseded for accepted visual scope only. Do not repeat art/GIF review.

**Continued: bounded runtime preflight measured**, `docs/verification/M5C_P2_BOTUO_BASIC_PREFLIGHT.md/.json`.16 direct production-session source/tactical/faction/direction cases +4Tiers +4misses confirm current one immediate0ms real hit/unphased cast/no action token.12 sandbox-only proposed240/250ms/cancel/escape/ordinary-damage probes: normal50ms simulation resolves both due choices at250ms. **Propose fixed250ms real windup T0–T3**, F1/F2/F3/F4=160/90/160/160ms, real HP/text/contact on actual resolve, no fake delay; target escape misses, ordinary damage continues, legal control/KO/new skill cancels without cadence refund. Preserve coeff/range/crit/Tier/cadence/no displacement. Exact source/contact/body lifetimes and minimum integration delta in report.

All-five required16,552,840bytes under16,777,216, reserve131,072 retained.89,856byte low-density probe technically fits but visibly softens approved art and is **REJECTED / NOT SELECTED**; actual high-fidelity packing remains engineering work. No budget increase or approved source edits. Full RGBA crop proof/quality comparison retained under `docs/verification/P2_BASIC_RUNTIME_PACK_PROBE/`; no PLANNING files enter runtime. **NEXT genuine gate: player accepts/revises proposed250ms executable contract**, not art reapproval. No runtime implementation/ENGINEERING PASS/build/deploy/player-phone PASS. P1 COMPLETE, ordinary Hit CANCELLED, protected sources unchanged. No P3/Heavy/main merge; `[skip ci]`; successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`. Latest HEAD is containing feature commit; fetch again.

## 2026-10-18 — P2 Basic composite GIF CANDIDATE / PLAYER REVIEW PENDING

Player at2026-10-18T17:22:42+08:00:「好接下來是做gif給我確認嗎，是的話就給我連結看」, following「未完成就繼續」, explicitly authorizes advancing the presented pose set into a GIF preview. This supersedes the prior stop-before-GIF pointer for **preview production only**. Do not fabricate a separate per-pose approval statement: F3 remains explicitly PLAYER ART APPROVED; F1/F2v2/F4 are authorized preview inputs, with their final visual acceptance pending composite review. No runtime/deploy authority inferred.

Completed at recovered feature `dec02b2786b8d3829a5b4cb0b01350e62023a9bd`: two new independent Basic horn-force/source and crushed-stone/contact VFX; deterministic full-canvas safe cells using author-selected skull-height density/common XY scaling and hoof baseline; normal/3×slow composite, character-only normal/slow, static reduced-cue preview, both directions and approved Idle return. Sources/prompts/QA/manifest/checksums: `docs/art/candidates/botuo/basic/composite-review-v1/`; reproduce `python scripts/prepareBotuoBasicReview.py`. Normal GIF SHA256 `55c70c31141da605ee16f558bc6c9629c1ceeab73acb3314a2b3066d1c98ae9d`; slow `8f9fd7662e54565ff6fdfe5e709fd4862f0e3b819a85bfe7c777dec4829ab553`. Normal2800ms/slow8400ms include both directions and Idle; decoded minimum holds40/120ms, exact paletted pixel/timeline roundtrip PASS. Character cells preserve every resized source pixel with >=35px alpha padding; masters/approved sources unchanged.

**GIF/VFX CANDIDATE / PLAYER REVIEW PENDING. NEXT: player reviews linked normal/slow GIF for obvious body articulation, independent outgoing/contact visibility, identity/scale/grounding, left/right and Idle return.** Preview F1/F2/F3/F4=160/80/160/160ms, contact240ms after visual action start, is not an approved gameplay delay; real Basic remains windup0ms. Neutral marker is schematic, no real HP/damage/collision proof. No runtime integration/ENGINEERING PASS/build/deploy/phone acceptance. Existing16MiB limits/reserve and accepted P1/P2 base/Move/KO remain protected, generic Hit stays CANCELLED. Source-to-Idle scaling/visible-ground alignment are review transforms, not runtime descriptor edits. Checkpoint `[skip ci]`, no main merge/P3. Updated successor: `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`. Always fetch latest containing feature commit on recovery.

## 2026-10-18 — P2 Basic F3 PLAYER APPROVED / F1-F2-F4 CANDIDATES

Player at2026-10-18T15:36:06+08:00:「好f3我approved，繼續，要確保未來動畫東西要足夠明顯」. **F3 PLAYER ART APPROVED**, exact immutable source19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36; receipt `docs/art/approved/botuo/basic/f3-v1/acceptance.json`, checkpoint `cfd2b22c56e995a528909af08a5a491e490c3afa`. F1 rear load, F2v2 forward release, F4 guarded recovery now **ART CANDIDATES / PLAYER REVIEW PENDING** at `docs/art/candidates/botuo/basic/phase-poses-v1/`. Static four-pose light/dark/small-size comparison, individual prompts, originals, rejected F2v1 history, reproducible PNG/alpha/bounds/hash report retained. Latest feature checkpoint is the containing commit; fetch remote again.

**Permanent visibility requirement:** articulated load/release/contact/recovery must be clearly different with effects OFF; review normal-speed and small/mobile-scale playback later, never assume a large still proves battlefield visibility. Caster/source effects and real-target impact must each be unmistakable, with Basic<Heavy<Special<Awakening escalation and distinct signatures; reduced motion retains readable static cues. Achieve this with pose/silhouette/value/independent FX and appropriate existing event-owned finite holds, not actor enlargement, invented hits/range, or unapproved HP/cast timing changes. Current static QA is a uniform source-scale study, not actual phone proof.

**NEXT ONLY: player reviews F1/F2v2/F4; F3 is closed.** Then accepted-pixel safe normalization + independent VFX + normal/slow/effects-off/mirrored/Idle-return GIF review. No VFX/GIF/runtime/deploy acceptance inferred. Basic still windup0ms/one real immediate hit; any timing change needs separate exact approval. P1 COMPLETE, generic Hit CANCELLED, all P1 and P2 base/Move/KO assets protected. Actual checks: PNG decode, visible-edge/border-alpha/hash/opaque QA, whitespace/protected paths; raw alpha1 border noise preserved/reported, no full-alpha-clear or runtime-ready claim. No suite/build/Pages rerun. `[skip ci]`, no main merge/P3. Current spec `docs/M5C_P2_BOTUO_BASIC_ACTION.md`; successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`.

## 2026-10-18 — P2 猼訑 Basic F3 CANDIDATE / PLAYER REVIEW PENDING

Recovery fetched feature `39f7d2b50202c93798ef7d3cf38a57ee8388fcaa`, clean branch `feat/m0-combat-core-20260927`, PR #1 open/unmerged; checkpoint is the containing feature commit (resolve remote ref again). **P1 COMPLETE BY EXISTING ACCEPTANCE EVIDENCE; ordinary Hit CANCELLED / NOT REQUIRED.** Preserve all P1 approvals; no repeat tests/deploy/device sign-off. P2 Concept/portrait/collection/static Idle/static runtime/Move/KO accepted; static Idle only. No prior approved P2 action/VFX/GIF found; runtime has no P2 actionDescriptors.

**Current first unfinished gate: Basic「角擊」ONE F3 player art review.** Built-in imagegen candidate from approved identity/Idle/Move: `docs/art/candidates/botuo/basic/key-pose-v1/F3-contact-master.png`, SHA256 `19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36`. Prompt, PNG/alpha/hash verification, opaque light/dark QA preserved beside source; low-alpha noise reported, no source cleanup claimed. **ART CANDIDATE, NOT PLAYER ART APPROVED / NOT INTEGRATED / NOT DEPLOYED.** No F1/F2/F4, new VFX or GIF yet.

Contract, base acceptance inventory, four-skill proposed motion differentiation and timing caveat: `docs/M5C_P2_BOTUO_BASIC_ACTION.md`. Basic T0 is single-target coefficient1.00/range1.4/windup0/no displacement; no P1 windup copied or HP delay. Existing Tier effects/control protected. Chat owns art/review preparation; Work runtime remains blocked until explicit pose/GIF and any material timing approvals. **STOP for player F3 review**, not Heavy/P3. Full self-contained successor: `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`. Existing accepted deployment remains8e2f5e0; no suite/build/Pages/public verification rerun. Candidate/docs-only checkpoint uses `[skip ci]`; no main merge, no protected source/public/receipt changes.

## 2026-10-18 — P1 鹿蜀 full-character evidence audit / closure

**P1 character scope CLOSED — existing evidence accepted, no additional ordinary Hit gate.** This is an administrative scope closure in response to player instruction 「P1 整體完成狀態盤點與結案是下一步嗎？妳直接執行可以嗎」, not a new in-game test or a new deployment. Coverage: approved identity/static/Idle and player-verified grounded locomotion (see M5C art/animation workflow), P1 static KO **PASS / PLAYER VERIFIED** (M5C_ART_ANIMATION_VFX.md §7B, 2026-10-12), P1 Basic「踏角」 player verified, Heavy「逐風衝」 player verified, Special「迴蹄」 phone verified and Awakening「南山奔襲」 player verified 2026-10-18 at deployed source `8e2f5e049095017d7350b1d0d61e96527ab21e44`, receipt `docs/art/approved/lushu/awakening/runtime-v1/acceptance.json`. Ordinary Hit Reaction explicitly **CANCELLED / NOT REQUIRED** as of 2026-10-18; its unapproved candidate is ABANDONED, never integrated.

**Conclusion:** no unresolved P1 character presentation/ability art/Hit requirement identified in the current acceptance records. P1 character milestone is **COMPLETE BY EXISTING PLAYER ACCEPTANCE EVIDENCE AND CURRENT SCOPE**; do not misstate that a fresh end-to-end phone run, global regression, new Actions build or redeploy occurred. Prior approvals continue to carry their original tested scope; this closure is not a new numeric performance claim. Only regression-test a previously accepted mechanic if future changes actually impact it. No changes to gameplay/source/assets/approved receipts; no main merge. **NEXT milestone: P2 猼訑 character-first active skill art/actions, starting at first incomplete gate after checking its already accepted base/static/move/KO evidence.** Do not redo any previously approved P2 base, locomotion or KO. Use Chat-first source/art recovery and player candidate approval before runnable integration. Do not import TD gameplay. A successor prompt must be one complete self-contained code block.


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


> Planning source of truth for the next bounded milestones. This roadmap records product sequencing only; each milestone still requires its own implementation handoff, tests, deployment, and player smoke.

## Locked sequencing rule

Do not start a later milestone by bypassing the data/contracts required by the earlier one.

Current order:

1. **M2 — Team Select / Roster Skeleton** — complete
2. **M3 — Shard / Reward / Character Unlock Loop** — complete
3. **M4A — Collection / Roster Hub** — complete
4. **M4B — Tier Upgrade / Character Growth** — complete
5. **M4C — Main Menu / Landing Visual Polish** — complete
6. **M5A — Formal Chapter 1 Content Definition** — complete
7. **M5B — Formal Character / Stage Data Integration** — complete
8. **INFO Hub** — complete
9. **M6A — Developer Battle Lab** — complete
10. **M6B — Combat Tactical AI / Telegraph / Dodge Batch** — complete
11. **M6C — Tier Combat Effects / Shared Status Primitives** — complete / player verified
12. **M5C — Art / Animation / VFX Integration** — M5C-A Asset Pipeline engineering pass / player smoke pending; production art integration separately authorized
13. Audio pass after core flow and visual timing are stable

M3 depends on M2 roster ownership/team-selection contracts.  
M4 depends on M3 shard inventory/unlock/reward contracts.
All Campaign chapters/stages share one reward schema; later chapters are content data, not separate progression mechanisms.

## M2 — Team Select / Roster Skeleton

Goal: insert a reusable roster/team layer between Stage Preview and Arena.

Flow:

Chapter Select
→ Stage Select / Preview
→ START
→ Team Select
→ choose exactly 3 owned/available characters
→ BATTLE
→ existing 3v3 Arena
→ Result

Requirements:
- data-driven character catalog;
- runtime battle slots A1/A2/A3 remain slots, not permanent character IDs;
- exactly three unique characters per team;
- selected character definitions feed HP/stats/abilities/portrait metadata into the existing battle;
- slot 2 remains the front spawn; formation belongs to slots, not character IDs;
- Team Select BACK returns to the same Stage Preview;
- last valid team can be restored;
- stage config can later express allowed/forced/banned characters;
- ownership is separate from immutable character definition data;
- prototype may expose several placeholder characters for engineering smoke;
- no formal character art, reward economy, fragments, tiers, or audio.

Acceptance gate before M3:
- engineering tests/build/deploy pass;
- Stage Preview → Team Select → Battle → Result works;
- selected team maps correctly into A1/A2/A3;
- retry/re-entry preserves a valid team;
- iPhone player smoke should be performed before expanding into reward/unlock systems.

## M3 — Shard / Reward / Character Unlock Loop

Status: **COMPLETE / superseded by accepted M4+ progression work**. Canonical implementation/acceptance: `M3_SHARD_REWARD_UNLOCK.md`.

Goal: give Campaign stages meaningful visible rewards and connect victories to roster growth.

Stage Preview must be able to show:
- which character shard(s) can be earned;
- shard quantity/range or fixed quantity;
- first-clear-only vs repeatable reward metadata when later required;
- special/finale reward presentation.

Core progression:
- Victory may award configured character shards.
- Defeat / Draw / unfinished Exit award no clear-based unlock.
- Shards are stored outside combat core.
- Character ownership is derived from progression/unlock state, not from battle slot IDs.
- Newly unlocked characters become available to M2 Team Select.

Planned initial shard unlock rule:
- collect **5 shards** to unlock the character at the first usable tier.

Chapter finale concept:
- stage 5 is the harder finale/boss/recruit-value stage;
- it may award higher-value shards;
- some stronger character shards may be exclusive to that chapter/finale;
- exact balance, drop rates, and named characters remain content decisions, not hard-coded architecture.

Important:
- reward tables must be data-driven per stage;
- Stage Preview should explain the reward before the player enters battle;
- cleared stages stay replayable for shard farming when their reward definition allows it;
- do not implement full economy/shop/gacha in M3.

## M4A — Collection / Roster Hub

Goal: give the player a dedicated roster/collection view for inspecting all characters and current acquisition state before adding upgrade actions.

Collection requirements:
- full-page roster/collection screen, separate from battle Team Select;
- larger character cards than Team Select because the purpose is inspection, not rapid lineup selection;
- filters/tabs may reuse the existing ALL / Power / Speed / Blast model;
- show both owned and locked characters;
- owned characters use normal presentation;
- locked/unowned characters remain visible but are clearly dimmed;
- every card shows character identity, current Tier label when defined, and current shard inventory;
- locked characters still show current shard progress toward unlock;
- clicking/tapping a character card opens a read-only Character Detail view/modal;
- Character Detail may show name, Type/Role, shard count/progress, current Tier, abilities, future Level data when defined, and a concise Shanhaijing lore/introduction;
- formal character art/idle animation is not required for M4A; placeholder portraits remain acceptable;
- do not duplicate Team Select semantics. Team Select remains for choosing exactly three combatants; Collection is for inspection/progression visibility.

M4A must consume the existing M3 acquisition/ownership state. It must not create a second shard inventory or alternate ownership model.

## M4B — Tier Upgrade / Character Growth

Goal: add the actual progression action after M4A makes current state visible.

Canonical Tier model after player correction:
- newly obtained character starts at T0;
- T0 -> T1: 5 available shards;
- T1 -> T2: 10 available shards;
- T2 -> T3: 15 available shards;
- T3: current maximum.

Recruitment and Tier upgrade must consume/account for shards separately so the same 5 shards cannot both recruit and immediately pay for T0 -> T1. Preserve historical earned totals with explicit spent/consumed accounting and carry excess forward.

Collection cards should show available / next requirement rather than a bare shard count; Character Detail owns the enabled/disabled upgrade action.

Visual identity:
- square roster portrait/card;
- card border color distinguishes Tier;
- battle portrait/card may also display a small star row beneath HP to communicate character level/grade when that level system is formally defined;
- Tier, star/level, and rarity must remain separate concepts unless explicitly unified later.

Do not use stars as a second uncontrolled progression system before its meaning is defined.

## M4C — Main Menu / Landing Visual Polish

**PASS / PLAYER VERIFIED.** Static prototype full-screen mountain/sun hero, title treatment and clean primary/secondary buttons are the accepted Landing baseline. Later INFO adds a third sibling entry without replacing this baseline.

Fixed hierarchy:
- BATTLE -> Chapter Select
- COLLECTION -> Collection
- Both top-level BACK paths -> Landing

Navigation/progression/combat remained unchanged in M4C. Release evidence: `docs/verification/M4C_MAIN_MENU_LANDING.md`. Player acceptance is complete; later milestones supersede its historical STOP.

## Formal content after progression skeletons

After M2–M4 are stable:
- replace placeholder roster/stage images with formal Shanhaijing character and Chapter content;
- define actual Chapter 1 stage enemies/rewards/finale character;
- formal portraits/sprites;
- skill icons and VFX;
- animation;
- stage/background art;
- HUD polish.

## Audio timing

Do not prioritize final audio during M2–M4.

Later audio pass:
- UI click/select;
- stage start;
- Basic/Heavy/Special/Awakening;
- hit / KO;
- Victory / Defeat;
- Pause / Resume;
- Chapter/menu BGM;
- battle BGM;
- volume / mute.

Where practical, preserve clean event hooks such as battleStart, skillCast, hit, ko, victory, and defeat so audio can attach later without changing combat logic.

## Protected boundaries

- Do not import tower-defense gameplay rules.
- Combat core remains shared by AI/player control.
- Campaign, roster ownership, shard inventory, tier progression, and persistence remain outside combat state.
- Character definition data is immutable; ownership/tier/shards are player progression state.
- Placeholder content must be replaceable without rewriting navigation or combat.
- Each milestone stops after engineering/deploy evidence and player smoke; do not automatically start the next milestone.


## M5A — Formal Chapter 1 Content Definition

Status: **CONTENT APPROVED / COMPLETE**.

Goal: replace engineering placeholders with an approved formal Chapter1 content sheet before Work changes runtime data.

Define:
- real character identities and display names;
- Type / Role;
- base combat identity;
- Basic / Heavy / Special / Awakening / Passive concepts;
- per-ability range/targeting intent;
- future AI-profile tendencies such as engage/ranged/kite/support/retreat thresholds;
- Chapter1 five stage enemy lineups;
- firstClear / repeatable shard reward tables;
- Chapter1 finale/boss/recruit identity;
- short Shanhaijing lore copy;
- required portrait/sprite/idle/VFX asset slots.

Do not tune final numeric balance yet. Use relative intent and bounded prototype values until player approves the content sheet.

## M5B — Formal Character / Stage Data Integration

After M5A approval, Work maps the approved content into the existing data-driven catalog, stage configs, rewards, Collection detail and battle definitions. Preserve existing engine contracts; no bespoke per-character combat engine.

## M5C — Art / Animation / VFX Integration
### Player-approved production reorder — 2026-10-07

Before resuming the remaining Chapter1 static character concepts, validate the motion/action pipeline on the three characters whose static runtime presentation is already player-verified.

Authoritative short-term order:
1. 鹿蜀 locomotion vertical slice;
2. 猼訑 locomotion vertical slice;
3. 赤鱬 locomotion vertical slice;
4. player/runtime verification of the three reusable locomotion archetypes;
5. Basic action micro-animation + matching Basic VFX vertical slice for those characters;
6. only after the Basic action/VFX pipeline is stable, expand to Heavy / Special / Awakening;
7. then return to 九尾狐 Concept and later 狌狌.

This reorder does not reopen idle breathing. Idle presentation remains static. Locomotion/action/VFX remain presentation-only and must not change authoritative movement, collision, targeting, AI, telegraph geometry, ability timing or combat math.



After formal data is stable, replace placeholders with approved visual assets in bounded slices. Current idle presentation remains static. Later motion work is split into creature-appropriate locomotion animation plus state-specific attack/cast micro-animation paired with skill VFX. AI tactical variation may be introduced alongside formal character profiles when needed, but must remain shared-engine/profile-driven.


## INFO Hub

Status: **PASS / PLAYER VERIFIED**. Evidence: `verification/INFO_HUB.md`.

Landing sibling destinations:
- BATTLE
- COLLECTION
- INFO

INFO initial pages:
- GAME GUIDE
- WORLD
- TYPE MATCHUP

Canonical content/visual specification: `docs/INFO_HUB.md`.

The Type Matchup page uses an icon-only triangular diagram for the three Types with text/multipliers below. Current live combat relation remains Power > Speed > Blast > Power, advantage x1.15, disadvantage x0.85, same x1.00.

INFO should be implemented as a bounded UI/documentation slice, separate from combat balance and AI work.

## Future Tactical AI — Dodge / Telegraph Reaction

After formal attack telegraphs exist, AI may gain limited threat reaction and evasive repositioning for explicitly dodgeable attacks. This belongs to the shared tactical-AI/profile system, not bespoke character logic. See `docs/AI_SYSTEM.md`.

Do not start this merely because INFO describes combat. Player manual movement remains the current way to evade attacks.


## Development acceleration policy

Canonical workflow: `docs/DEVELOPMENT_ACCELERATION.md`.

Future work should prefer coherent batch milestones with internal checkpoints and automated regression rather than player-visible micro-slices for every small change.

## M6A — Developer Battle Lab

Status: **PASS / PLAYER VERIFIED**. Evidence: `docs/verification/M6A_DEVELOPER_BATTLE_LAB.md`.

Goal:
- create a dev-only isolated combat test harness to reduce repeated setup time for future character, ability, AI, Type, healing, AoE and Tier-behavior testing.

Required capabilities may include:
- ally lineup selection;
- enemy lineup selection;
- scenario presets;
- optional HP overrides;
- all-skills-ready mode;
- countdown skip;
- AI-only vs manual-control mode;
- direct launch into battle.

Hard isolation:
- no Campaign clear writes;
- no shard/reward writes;
- no unlock writes;
- no Tier writes;
- no saved-team mutation;
- no normal progression receipts;
- not visible in normal player navigation.

## M6B — Combat Tactical AI / Telegraph / Dodge Batch

Status: **PASS / PLAYER VERIFIED**. Canonical spec: `docs/M6B_COMBAT_TACTICAL_AI.md`; evidence: `docs/verification/M6B_COMBAT_TACTICAL_AI.md`. A–E complete and player accepted the current tactical/telegraph baseline.

Implement one coherent tactical-combat milestone rather than many micro-slices.

Scope:
- telegraph / dodgeable ability metadata;
- threat detection;
- safe-position scoring;
- sidestep / backstep / diagonal evasive reposition;
- healer retreat / recover / re-engage;
- ranged spacing / kite behavior;
- bruiser / tank tactical differentiation;
- Chapter1 character tactical profiles.

Rules:
- shared/profile-driven engine;
- no character-ID-specific tactical branches;
- deterministic/seeded where variation exists;
- AI must not dodge perfectly;
- player manual movement remains the current natural dodge path;
- do not add a dedicated dodge button unless separately approved.



## M6C — Tier Combat Effects / Shared Status Primitives

Status: **ENGINEERING PASS / PLAYER SMOKE PENDING**. A–E complete,512/512 tests/build/review/Actions/Pages/public verified. Canonical spec: `docs/M6C_TIER_COMBAT_EFFECTS.md`.

After M6B acceptance, connect the existing T0→T3 progression to combat through reusable, data-driven shared primitives.

Scope includes:
- read-only Tier projection into battle;
- generic status/modifier lifecycle;
- mitigation/movement/avoidance/control;
- ally protection;
- conditional low-HP / isolated-target modifiers;
- persistent area effects;
- approved Chapter1 T1/T2/T3 mechanic mappings;
- Battle Lab Tier comparison presets.

Current five characters are validation content only. Future characters must reuse the same primitives through data; no character-ID branches.



## M6C-B — Tier Power Curve Rebalance

Status: **ENGINEERING PASS / PLAYER SMOKE PENDING**. Actions/Pages/public verified; one focused fixed-seed T0–T3 comparison remains. Canonical spec: `docs/M6C_B_TIER_POWER_CURVE.md`.

Player feedback: M6C mechanic differentiation is correct but the raw Tier power jump is too subtle. Add a generic cumulative `TierScalingProfile` covering HP, damage/healing, bounded combat-tempo stats, attack range, AoE, mobility distance, buff/debuff duration and defensive-effect strength. Per-character weights reinforce role identity while the engine remains future-character-safe. Preserve M6C identity mechanics, progression costs/accounting, AI, telegraph authority and M5C-A asset pipeline.


## M5C-B — Formal Asset Batch Integration

Status: **IN PROGRESS — shared presentation baseline PASS / PLAYER VERIFIED; 鹿蜀 and 猼訑 formal identity/static-runtime accepted; idle breathing withdrawn; 赤鱬 Concept is the next active gate.** Canonical specs: `docs/M5C_B_FORMAL_ASSET_BATCH.md` and `docs/M5C_B_ACCEPTED_PRESENTATION_BASELINE.md`.

M5C-A pipeline and M6C-B balance are accepted. Continue character-by-character static formal art through the gated process. 鹿蜀 and 猼訑 static presentation are accepted. Next: 赤鱬 Concept → Battle Simplification → Static Asset Pack → Static Runtime Readability. Current Idle remains static. Later locomotion is archetype-driven (ground / flight / aquatic-hover as appropriate), and ability action micro-animation is authored together with matching VFX.

### KO early gate closure — 2026-10-12

By explicit player reorder, static KO presentation for the already verified P1/P2/P3 characters was completed before resuming the remaining Chapter1 character-production pipeline. All three KO states are now **PASS / PLAYER VERIFIED**.

Current corrected sequence after re-reading the authoritative concept matrix:
1. 九尾狐 Concept direction → player approval;
2. 九尾狐 required base visual presentation gates;
3. 狌狌 Concept direction → player approval;
4. 狌狌 required base visual presentation gates;
5. only then resume the Basic action micro-animation + matching Basic VFX vertical slice, unless the player explicitly reorders again.

This supersedes the temporary interpretation that Basic/VFX should start immediately after P1/P2/P3 KO closure.

### Character-first temporary completion sequence — 2026-10-13

This supersedes the earlier temporary ordering that would move from P4 static presentation directly to P5 Concept.

For each remaining Chapter1 character, production now closes the character through three stages before advancing:
1. complete static identity/runtime presentation;
2. complete locomotion and player verification;
3. complete static KO/death presentation and player verification.

Only then move to the next unfinished character.

Current order:
- P4 九尾狐 locomotion → P4 KO → then P5 狌狌 Concept/static → P5 locomotion → P5 KO.

Basic/Heavy/Special/Awakening action/VFX work remains deferred until this character-first temporary-completion pass is finished, unless the player explicitly reorders again.

## CURRENT OVERRIDING CHARACTER-COMPLETE DELIVERY ORDER — 2026-10-16

**Player-authoritative change, supersedes older cross-roster Basic-first/Heavy-second sequencing.** The delivery unit is a fully playable character, not a skill category across the whole roster. Finish all action visuals and matching VFX for P1 before P2; then P3, P4, P5. For each character: approved identity/static/Move/KO (already player-verified P1–P5) → Basic action + matching VFX → Heavy action + VFX → Special action + VFX → Awakening action + VFX → Hit reaction and character-wide regression/iPhone acceptance. The Basic/Heavy/Special/Awakening ordering can follow skill dependencies where appropriate; no jumping to another character while the current character's complete kit is unfinished unless player explicitly reprioritizes. Future new characters complete the same character-specific pipeline before accepted as fully delivered; player-visible reviews can be smaller slices without reopening approved older art.

**Immediate gate:** P1 鹿蜀 Basic action/VFX visual ACCEPTED by player 2026-10-16 (not an assertion that all optional Pause/Restart/KO device checks were individually performed); proceed Chat-first to recover P1 Heavy `逐風衝` combat, approved equipment and visual specs before designing Heavy action + corresponding VFX. Keep Basic source/timing protected; no gameplay rewrite or main merge.
