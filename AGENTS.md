# AGENTS.md

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





## 2026-10-22 — 疾行正常部署／公開149／149 PASS；唯一Gate：P1被動玩家驗收

Pages正常run39796107767 **completed/success**，deploy log明確Reported success；版本 `82257f9ea2fc6ad88e2ab3afe8241f270c550a1b`／tree `b63489cfb9dbf334bdf0956559e3747b36113c10`。CI/local/public全部149檔逐bytes及SHA256一致，證據 `docs/verification/P1_PASSIVE_RUNTIME/{run-final.json,release-deploy.log.gz,ci-build-inventory.json,public-fingerprints.json,release-status.json}`。之前QUEUED/WAITING/404為已解除歷史，不能再要求部署放行。完整1042/1042、Build、guard549、真P1native4/built2及P2相同來源native4/built2/scale10沿用，不重跑。新版本 https://hansen0318.github.io/shanhaijing-arena/?passive=82257f9 。

當前只請玩家驗P1鹿蜀「疾行」：一般持續走位觸發獨立「疾行+8%」牌及倒數，HUD移速2.05→2.214，2秒效果到期回原速/CD4秒；依實際Tier及其他增益顯示，總增益15%上限。視覺/數值已由實際Browser與截圖核對，但**尚未收到本次被動實機核准**。P1標DEPLOYED/ENGINEERING PASS/PLAYER PENDING，整角色不冒稱完整；玩家明確確認後保存新被動收據才開始P2厚甲，P2完成前P3技能BLOCKED。既有四招/base/美術核准不重開，普通Hit取消、全部保護/素材政策/單分支PR#1open-unmerged保持。最新handoff已重寫為唯一正確Gate。此切片純文件[skip ci]，沒有新Runtime、重跑測試/Browser或再次發布。


## 2026-10-22 — 最新外部Gate：Pages github-pages environment WAITING

取代上條QUEUED/無pending判斷：GitHub最新deploy job119883988676為 **waiting**；已取得 `docs/verification/P1_PASSIVE_RUNTIME/pending-deployments.json`，environment github-pages/id22885191201，wait_timer0、reviewers[]、**current_user_can_approve:false**。目前連線無法放行此環境Gate，沒有可用的部署核准寫入工具；不繞過環境保護、不另開發布或重跑測試。需有權限者查看 https://github.com/Hansen0318/shanhaijing-arena/actions/runs/39796107767 的Review deployments／環境保護原因並放行或排除阻擋。未從空reviewers推定具體保護規則，玩家開發/正常發布授權始終有效，無須重新核准計畫。build1042/1042、Build、guard549、驗證workflowSUCCESS及CI/local149/149保持；部署/public/實機PLAYER仍未完成。外部Gate完成後接續原job與完整公開比對，再P1被動驗收→P2厚甲→P3技能。既有四招/素材/普通Hit取消/單分支PR#1open-unmerged保持。


## 2026-10-22 — 疾行正常CI工程PASS／Pages deploy QUEUED

發布提交 `82257f9ea2fc6ad88e2ab3afe8241f270c550a1b`／tree `b63489cfb9dbf334bdf0956559e3747b36113c10`。正常Actions39796107767 build SUCCESS：完整1042/1042、Build、549項來源guard PASS；獨立驗證workflow39796107824 SUCCESS並嚴格沿用來源相同Browser證據。CI Pages artifact12432129680的149/149檔案與本機dist逐bytes一致。Pages deploy job119883988676仍QUEUED，deployment7254931808尚無success；pending_deployments空，沒有人工核准待辦。正式站新JS目前404，不能宣稱發布或公開指紋PASS，不要求玩家驗收舊版。原始CI完整log、CI/local inventory與 `release-status.json` 已保留。

下一合法步驟：觀察既有deploy工作完成；不重跑正常CI/Browser、不新增發布、不改來源。成功後才做149檔完整公開比對、docs-only更新，並請玩家只驗P1疾行badge/實際移速/倒數；實機核准後記收據才啟動P2厚甲。P3技能仍BLOCKED，既有四招與所有素材核准保持，PR#1 open/unmerged。這是外部發布等待，非缺少玩家執行授權。


## 2026-10-22 — 疾行工程驗證 PASS／正常發布 ACTIVE

完整測試1042/1042、Build、真Chromium native4/built2、852×393實際搖桿入口、實際速度與距離+8%、>=12CSSpx字體、6牌避碰及生命週期均PASS。P2共用路徑native4/built2/scale10使用Actions39793433740相同src/public證據，沒有重驗已核准技能。失敗觀測腳本與完整log保留；實際截圖可見疾行+8%、2.214及倒數。新完整來源綁定guard通過，篡改來源負向檢查拒絕後恢復原bytes再PASS；normal fullsuite/Build/Pages流程正進行，尚不宣稱部署或玩家驗收。詳見 `docs/verification/P1_PASSIVE_RUNTIME/WORK_LOG.md` 與release-evidence.json。P1被動PLAYER PENDING，之後才P2厚甲，再P3技能；不重問規格/計畫/執行核准。既有保護與單分支PR#1 open/unmerged保持。


## 2026-10-22 — 疾行Task1–3工程完成／Task4真驗證與發布 ACTIVE

已依核准計畫完成generic core、精確一般移動整合、P1data opt-in及獨立badge/HUD/Collection。Task2相關146/146PASS，Task3相關43/43與場景fixture遷移27/27PASS；BuildPASS。初次完整1039/1025/14fail已逐項定位為新增presenter/Canvas fixture及P1metadata斷言，原TAP與修正證據保留於 `docs/verification/P1_PASSIVE_RUNTIME/`；尚待Task4最終完整suite，不將局部通過冒稱完整PASS。本機Chromium下載失敗，保存完整log，下一步走同分支真Actions Browser及當前來源綁定normalCI/Pages；沒有部署或玩家可讀性PASS。

執行授權不再重問。已核准規格/計畫不改；P1仍待被動實測/發布/玩家驗收，P2厚甲與P3技能順序保持。全部master/receipt/GIF/尺度/anchor/ground/mirror及無關untracked保留；原branch/PR#1 open未merge，普通Hit取消，素材政策保持。恢復以WORK_LOG與最新HEAD優先，不重做Task1–3。只有真新缺陷才修正受影響範圍。

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

## 2026-10-22 — 鎮岳 DEPLOYED／ENGINEERING PASS／PLAYER PHONE PENDING

已依玩家「確認進度紀錄後繼續做到部署」完成正常Pages發布。Release HEAD `66e6c3c640c546ec90dbd5a79da06814db15d02f`／tree `5a818dac7b2596a0379ebe4240a422125b7d314f`；Actions#1097/run39779770526 build/job119827727902與deploy/job119828053592皆SUCCESS：完整1014/1014、Build、258檔source/evidence guard、Pages configure/upload/deploy全通過，沒有bounded bypass。台灣時間2026-10-22 20:37:39部署success。URL https://hansen0318.github.io/shanhaijing-arena/ 。發布後實抓本次149個built檔案，149/149 SHA256與本機built輸出一致（含index/CSS/runtime JS/鎮岳4PNG及全部public檔案），errors0。精確public.json、CIlogs與closure.json在docs/verification/P2_AWAKENING_RUNTIME/continuation/。

工程完成：全局無固定16MiB/required數量/reserve拒絕；49required18,336,992 decoded；保留單檔安全驗證、兩下載、完整pins/ready、真失敗/回收/destroy。鎮岳來源保真、實際正damage victims與status來源、instant0/F3及tactical900/819、T3真受益者/MAX/獨立到期，未改玩法數值或核准美術。Native4/built-mobile2、native scale10/50標記與雙向採樣證據已保存；Runtime來源未變的舊證據沿用。25舊失敗以來源重建明示遷移，原歷史TAP不改寫；最新全套1014真PASS。此docs-only checkpoint [skip ci]不改已部署Runtime。

下一個唯一玩家Gate：手機審核鎮岳招式、Idle/Move/施放比例、真命中爆破與對空、可用T3的真保護。未收到玩家實際確認，不寫PLAYER VERIFIED，不標整個P2完成。不主動重跑已通過Browser/CI/部署/149公開比對、不重做已核准素材；有具體新缺陷才定位必要受影響範圍。PR#1 open/unmerged，原feature分支，禁止main merge/替代分支/TD/P3；三個未追蹤暫存檔保持排除。下方歷史blocked/pending由本條取代。

## 2026-10-22 — 鎮岳工程驗證通過／正常 Pages 發布 NEXT

最新本機完整1014/1014 PASS、Build/91assetguard PASS；遠端normal preflight run39778334056也1014/1014+Build PASS，只因刻意缺release-evidence而阻擋Pages。新增scale run39778996130 SUCCESS，Idle/F1–F4×兩面10組、50個頭角/肩身/大護臂/腰帶/蹄部native標記有真像素、全部maxDelta<=1/mean<0.00001；Idle144、姿勢200logical canvas與核准密度/共同接地保持，沒有外框fit或角色放大。Idle整張160透明quad的max7差值保留為diagnostic；採用先前126case相同的原圖native-trim控制後max1、mean8.27e-7，未放寬閾值，F1–F4仍與原整cell直接比對。10截圖與JSON/artifact12425653464已保存，ZIPSHA2564601437893162be3a9181223d31d5889f5d07936526a951fce25d7c204ef1e7d已核對。F3/Idle/F1雙向截圖已目視檢查；完整對比見CONTINUATION.md。

release-evidence.json綁定258個完整src/public、驗證腳本及native/built/scale報告SHA256，guard本機PASS且強制完整清單及真報告case數；既有Browser4native/2built因Runtime未變沿用。依單人專案規則完成diff自審（非獨立審查），沒有src/public/核准原圖變更。下一步同feature分支正常完整CI→Pages→新公開指紋，不用bounded/skip繞過發布。玩家手機仍PENDING，P1/P2已核准範圍保護；下面25fail/比例待跑為歷史，不再重開。

## 2026-10-22 — 部署續行／既有25失敗明示遷移／本機1014 PASS

玩家「確認進度紀錄後繼續做到部署」已記錄。恢復7a62eeed4398b5ae44a8583fac913c7ee2a7a690後完成來源像素重建前置：32legacy資產57frames與原來源RGBA一致，3utility沿用原6frame證據。19個舊測試檔依已核准logical/physical分層、Basic250ms、既有事件metadata、真Frame回傳與正確敵對fixture遷移；不改src/public/核准原圖，不暗刪美術或玩法斷言。舊25失敗保留，詳細CONTINUATION.md及continuation/migration.json。

完整測試1014/1014 PASS、Build PASS；原SIGKILL worker現在4項均執行，總數+3，另+2驗證adapter測試。SIGKILL原根因仍不宣稱OOM。已成功native4/built2與8雙向採樣因Runtime未改而沿用；新增只做Idle/F1–F4多身體/配件標記的native校準workflow，待執行。正常full-suite不跳過；Pages前新增來源綁定證據guard，缺scale證據時明確阻擋，不提前部署。PR#1 open/unmerged、唯一feature分支；接著完成scale→真CI全通過→Pages→公開指紋，玩家手機仍PENDING。

## 2026-10-22 — 遠端真Browser PASS／正常CI25 FAIL／發布 Gate BLOCKED

Tested remote HEAD `06585e8c2ef7a7b0adc6fc5fe87f3ab11091bf2c`，tree `16eb15394ff45b77cb8210a5abba0b08ca08afd2`，PR#1 open/unmerged。正常Pages CI#1094/run39726905249實測1009/984pass/25fail，與本機25名稱完全相同，Test exit1、未到Pages，沒有部署。原生驗證run39726905423/job119652782291 SUCCESS：真Chromium WebGL4cases、真built campaign mobile-emulated2cases，正常/reduced、T3真victims/status、T0實際技能callback、Pause/destroy/restart PASS。四姿勢雙向共8native採樣maxDelta1/mean<0.00001。artifact12402494599 ZIP SHA2565eeddb2e197b22be9b998a8b334bdae83ba71dac616cdf089edc1cb1177d0e58，下載核對並保存JSON/截圖和CIlogs。

這不是整案完成、實體手機或PLAYER VERIFIED。F3戰場截圖已目視查看，但完整Idle多身體/配件標記native比例校準尚待完成，不能用source-exact或GIF替代。安全發布停在正常full-suite25項既有失敗Gate；沒有繞過CI、main merge或新分支。下一步處理有證據的必要測試遷移/真失敗與剩餘比例驗證，然後才評估Pages；不重跑已成功的來源未變Browser。詳細 `docs/verification/P2_AWAKENING_RUNTIME/REPORT.md` 和result.json。舊「Browser未跑／workflow待執行」已由本條取代，無需重問契約核准。

## 2026-10-22 — 鎮岳 Runtime 安裝／119 scoped PASS／全套25 FAIL／未部署

玩家「要接觸全部16mib限制，並紀錄，繼續，我確認妳繼續」已記錄於 `docs/verification/P2_AWAKENING_PREFLIGHT/executable-acceptance.json`；觀測／保真安裝契約 Gate CLOSED，不再要求重審。cache 預設 byte target 現為 null，移除最後16MiB閒置保留限制；scene無總量／required數量／optional reserve拒絕，64僅未使用cache entry回收目標，12MiB僅未pin scene回收目標。安全單檔驗證、兩下載、完整required、真失敗、destroy保留。

鎮岳 opt-in `area-observed` 共用事件：實際damage正值victims、action/epoch身份、實際boyi.team provenance；instant0→F3、tactical900/819，守群獨立到期/MAX，不改玩法數值。四份新來源精確PNG，49required／18,336,992 decoded。已核准400×320 cell的真實GROUND274，裁切(100,80)後root(100,194)、origin(.5,.97)，修正舊提案184，沒有改原圖／尺度；native/Idle多標記驗證仍待完成。

最新受影響119/119 PASS；全套1009/984 PASS/25 FAIL（exit1），Build/91assetguard PASS。25項均對應先前28項；本次明示遷移3項過時required容量／inventory斷言，不代表舊美術斷言通過。每項名稱、原因、完整TAP和RED在 `docs/verification/P2_AWAKENING_RUNTIME/{REPORT.md,result.json,full.tap}`；SIGKILL原因未知。原核准美術tracked diff為空，舊public素材未改。

本機無Chromium；新增同feature分支純驗證workflow取得真native/built/mobile證據，尚待遠端執行。它不部署、不替代正常full-suite；正常CI仍有發布阻擋，沒有Pages／公開指紋／手機PASS。下一步取得Actions證據；若有實際阻擋保存並停Gate，不繞過。PR#1保持open/unmerged，單人執行，不重做已核准美術或歷史Special164。此條取代下方舊contract待審／cache16MiB狀態。

## 2026-10-22 — Shared global residency IMPLEMENTED / scoped PASS / Browser BLOCKED
Player「核准，繼續」approved exact four-task plan; receipt `docs/verification/P2_AWAKENING_PREFLIGHT/global-residency-plan-acceptance.json`. Cache/scene no longer reject valid encounter images on16MiB/64-entry/131072reserve gates. Cache16MiB/64 are only inactive retention defaults; scene12MiB only reclaims unpinned textures. Per-image4MiB/2048/4194304, two transports, complete required pins/readiness, actual failures and scene teardown preserved. No character exception, Chiru split or approved-art/gameplay changes.
Tests: cache8/8, residency12/12, shared30/30; affected120/113pass/7existingfail; full993/965pass/28existingfail. Prior29→28 is the explicitly migrated all-five capacity assertion, not silently rewritten art acceptance; seven new tests account for total993. Exact names, reasons, TAP and RED evidence: `docs/verification/P2_AWAKENING_PREFLIGHT/global-residency-runtime/{REPORT.md,result.json}`. Build/87assetguard PASS. SIGKILL cause remains unknown.
Native/built/mobile Browser NOT RUN: no Chromium executable; standard browser install fails invalid/truncatedZIP, exit1, log saved. No Pages/public-fingerprint/phone PASS. Existing normal CI full-suite is required, no skip/bounded workflow bypass for this runtime delta. Self-review only per native-single-agent project rule.
NEXT: independently review updated `docs/verification/M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md` event/status/faithful-pack contract; fixed-cap shortfall there is historical/superseded. Shared-policy PASS is not Awakening installation or contract approval. Preserve all accepted sources/receipts/GIF, instant0/tactical900/819, true-victim impacts and actual boyi.team MAX/expiry semantics. Same feature branch/PR#1 open/unmerged; latest containing checkpoint supersedes old plan-pending/cap-still-active pointers. Unrelated untracked .C-pair-raw.png.0ssrYD preserved and excluded.

## 2026-10-22 — Global residency implementation plan PLAYER APPROVED / TDD active

Player「核准，繼續」approves the concrete four-task plan linked at50dcd3a; exact SHA25616d36b5a209dc6c83fb240dad51f1fab17d0646f60a31cea7de4786e3d1ed067 and scope in `docs/verification/P2_AWAKENING_PREFLIGHT/global-residency-plan-acceptance.json`. Plan review CLOSED; execute shared-policy TDD on the same branch. Old pending entries below are historical. Do not infer engineering/contract/Pages/phone PASS. Preserve current986/957/29 baseline and accepted artwork/gameplay; later Awakening observational-contract Gate remains separate.

## 2026-10-22 — Recovery baseline reproduced: 986 / 957 PASS / 29 FAIL; plan review NEXT

Fresh fetch confirms source HEAD `bd9caac3509f1219dd5e23a517cc01eb0ba1b2e9`, tree `87767a5b6496dfc9b9c50c9fc5f4a92ec24e4cc3`, same feature branch; PR#1 open/unmerged. Fresh clone initially clean. Parallel and sequential full suites both exit1 with **986 tests /957 pass /29 fail**, identical failure names/order. Shared cache/residency/dynamic integration **23/23 PASS**. Full per-failure diagnosis, exact TAP, checksums and limitations: `docs/verification/P2_AWAKENING_PREFLIGHT/recovery-2026-10-22/{REPORT.md,baseline.json}`. This is the current baseline; older five-failure statements below are historical, not current results. One of29 is `lushuHeavyAssets.test.js` worker SIGKILL in both runs; kill cause unconfirmed, unexecuted assertions not PASS. Other failures include obsolete physical packing/path/count expectations, P2 Basic250ms, event metadata and invalid synthetic logical frames; no blanket harmlessness or release clearance.

Written global spec hash still matches approved receipt. Exact implementation plan SHA256 `16d36b5a209dc6c83fb240dad51f1fab17d0646f60a31cea7de4786e3d1ed067` remains **independent player review pending**, as required by its execution-handoff and existing project rules. Recovery prepared a concrete four-task plan review plus baseline migration caveats in REPORT.md; do not invent an approval receipt. NEXT: present `docs/superpowers/plans/2026-10-22-global-dynamic-asset-residency.md` for the required review. No src/public/tests/workflow/approved-art changes, no new Runtime/Build/Browser/native/mobile/Pages/public-fingerprint results. Awakening remains uninstalled; current16MiB/64/reserve gates still present. Deployment intent and all protected P1/P2 approvals remain; old Chiru KO split stays superseded. The two named untracked temporary files are absent in this fresh clone and were not touched. This is docs/evidence-only `[skip ci]`; preserve same branch/PR and do not repeat unchanged diagnostics after review unless sources change.


## 2026-10-22 — 全局動態素材書面規格 PLAYER APPROVED／新計畫待審

玩家在規格連結與「請審閱連結中的規格並確認是否核准」後明確回覆「我核准，確認紀錄github流程規則進度，在給我新的work要跟他說的，我要新的work無縫接軌接手後續」。核准綁定 `docs/superpowers/specs/2026-10-22-global-dynamic-asset-residency-design.md` SHA256 c47019288e6b6ceaf15b8c87872c5eb156518847fec3922eadab72df69e2141b，精確receipt `docs/verification/P2_AWAKENING_PREFLIGHT/global-residency-spec-acceptance.json`。**規格審核 CLOSED；後寫的實作計畫 `docs/superpowers/plans/2026-10-22-global-dynamic-asset-residency.md` 待獨立玩家審核。** 玩家要求新Work接手，按單人執行方向交接，並未授權跳過計畫審閱；目前無Runtime、Build、Browser、Pages或手機驗收。舊赤鱬KO拆圖方案superseded，當前程式仍有16MiB硬上限；玩家要的是全局動態政策及驗證後部署。保護全部既有已核准成果、PR#1 open/unmerged與唯一feature branch；下方歷史「書面規格待審」已由本條取代。

## 2026-10-22 — 全遊戲無固定總容量方向確認／新書面規格待審

玩家「應該要整體不限定容量，不是針對單一角色，妳繼續做到部署，我才能確認遊戲裡的招式是否ok」明確取代先前赤鱬 KO 分塊方向，對提出的共用動態 residency 無固定 decoded-byte 硬上限、保留單檔安全驗證／按場載入／閒置回收／失敗處理回覆「確認，繼續」。正式規格 `docs/superpowers/specs/2026-10-22-global-dynamic-asset-residency-design.md` **待玩家獨立書面審閱**；只確認對話設計，不代表文件／實作計畫／Runtime PASS。當前程式仍有16MiB cache/scene硬上限與64-entry、131072 reserve；本次未改 src/public/tests/已核准素材，沒有建置、Browser或部署。玩家授權的終點是驗證後部署供實際遊戲審核，不是立即發布。先前 KO 規格保留為 superseded 歷史，禁止實作其11片方案當前置條件。下一 Gate：書面規格審閱→實作計畫審閱→共用策略與鎮岳契約/忠實素材整合及驗證→Pages公開核對→玩家手機審核。PR#1維持 open/unmerged，唯一 feature 分支、GitHub權威；所有交接指令單一自足 code block。保護 P1/P2、取消普通 Hit、機制時序與五個歷史 full-suite failures。

## 2026-10-22 — 鎮岳容量方向核准、16MiB仍有效／書面設計審核 NEXT

Player replied「確認紀錄進度規則流程 目前應該沒有16mib限制吧，上次有取消過，用動態配置？現在要做什麼 部署到遊戲嗎，這樣我同意核准」to the prior Chiru KO lossless-split direction. Decision is recorded in `docs/verification/P2_AWAKENING_PREFLIGHT/capacity-direction-decision.json`; it approves investigating/documenting that direction, **not** the newly written full design, executable contract, Runtime or Pages. Current `src/assets/schema.js` still enforces 16MiB asset-cache and scene hard caps; dynamic encounter residency is also present, and `AssetResidency` still pins all required with 131072 optional reserve. Written 11-part single-atlas KO proposal `docs/superpowers/specs/2026-10-22-p2-awakening-capacity-design.md`: old6239904→modeled4505600 decoded, saves1734304; projected49 required16022192 + reserve131072 leaves623952. In-memory source RGBA reconstruction only; no actual atlas/native/encoded/residency PASS. NEXT written-spec player review, then implementation plan/selection only after approval; no src/public/build/Browser/deploy. Preserve all accepted art, source, gameplay, branch/PR, ordinary Hit cancellation, instant/tactical split and five historical full-suite failures. Newest entry supersedes old capacity-blocked-as-no-option status, not its evidence. Handoff remains one complete code block.

## 2026-10-22 — 鎮岳 execution preflight review / capacity blocked

Latest authoritative work is the **unapproved** `docs/verification/M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md` proposal. Actual shared cast/action/damage/status/residency inspection identifies true AoE-victim event association and `boyi.team` provenance gaps. Four proposed display-derivative source-exact trims add 1145272 decoded bytes to the unchanged 45-key/16611224-byte required inventory; with 131072 reserve the 49-key proposal exceeds the 16MiB hard cap by 1110352 bytes. Candidate dimensions are not installed packs or native-sampling/capacity PASS. Prove enough faithful old-key savings and all-required residency before integration, or stop for separate design decision. Await **independent player execution-contract review**; VFX/GIF visual acceptance at `docs/art/approved/botuo/awakening/visual-v1/acceptance.json` does not grant it. No Runtime/build/Browser/deploy, no repetition of unchanged 16 mechanics cases or Special evidence. Preserve original branch/PR, protected assets and receipts, ordinary Hit cancellation, MAX status semantics, instant0ms vs tactical900/819ms, five historical full-suite failures. Newest entries supersede historic pending notes. Canonical successor is `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md`, one self-contained copy block.

## 2026-10-21 — Awakening VFX/GIF PLAYER APPROVED / execution preflight NEXT

Player「這個我確認OK，你紀錄github流程進度規則」accepts the normal GIF embedded in the preceding response and its linked visual-review package at `e1cdefa22c99aceae149a0a854210da9941c36e9`. Exact wording, primary normal GIF, seven linked GIFs, static reduced cue, three raw VFX and manifest/reference hashes are bound in `docs/art/approved/botuo/awakening/visual-v1/acceptance.json`. **PLAYER VFX/GIF VISUAL GATE CLOSED / APPROVED.** This records the presented package, not invented independent playback/device cases for every link. Old candidate/pending fields in frozen manifests/checkpoint/QA remain historical; authoritative latest approval is this receipt and progress entry. Do not ask again or regenerate accepted F1–F4/VFX/GIF.

NEXT unfinished Gate: Runtime preflight → shared cast/action/VFX/status ownership and timing contract → faithful packing and complete required-set capacity proposal → separate player contract review. None of those engineering proposals is approved by this visual acceptance. This request only records approval/process/progress; no engineering work, Runtime/build/Browser/deploy authorization or phone/whole-P2 acceptance inferred. Source/presentation assets, old receipts/manifests/scripts, gameplay and deployed Special remain unchanged.

Preserve instant0ms vs tacticalT0 900ms/T3 819ms (no universal F1/F2 windup); caster-locked actual damage circle, true-victim contact only, air without fake hit/protection. T3 actual post_cast beneficiaries13.5%/3.75s with independent Special/MAX lifecycle remain. GIF10ms display rounding never modifies gameplay. Keep P1 COMPLETE and all P2 approved art/scale/ground/anchor/mirror, ordinary Hit CANCELLED, Shared Dynamic Asset Residency,16MiB cap/131072reserve/allrequired. Existing45textures16611224decoded/34920extra is inherited evidence, not a new Awakening capacity pass. No main merge/replacement branch/TD/P3.

This approval-only `[skip ci]` slice freshly checks saved package bytes/SHA256, receipt references/JSON and protected diff scope. Reuse8GIF/124frame QA,16mechanics cases and Special164/Browser/release/145CI/39public evidence without reruns; no full-suite/build/Browser/release, five historical full-suite failures remain. Same feature branch and PR#1 open/unmerged; actual fetched HEAD supersedes stale PR connector head snapshots. Canonical successor `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md` is one complete self-contained copy block.


## 2026-10-21 — Awakening VFX/GIF READY FOR PLAYER REVIEW / NOT APPROVED

Recovered actual git remote `60c1976522b2934fb23e505377f9f55c60d1c817`, same `feat/m0-combat-core-20260927`; PR#1 open/unmerged and connector HEAD agrees. New host executes normally. Searched old /workspace copies, no recoverable prepare_preview.py found; rebuilt deterministic assembly ONLY, no art regeneration. Initial tracked tree clean; unrelated untracked Lushu temporary file preserved, excluded from commit.

`docs/art/candidates/botuo/awakening/composite-review-v1/` now has exact source hash/bytes checks, full light/dark/edge QA, source-exact80px VFX padding, four independent400x320 transparent cells, one.126 source density with existing support-anchor family, no pose-height/head-only fit. Approved F1–F4/Idle/masters/receipts/old manifests unchanged. Author multi-landmark/equipment/limb inspection is documented in visual-review.json; not final Runtime calibration. Separate caster radial release / actual-victim burst / actual-recipient T3 cue remain independent PNGs.

Eight real GIFs: normal4.4s, slow13.2s, noFX4.4s, reduced4.4s, instant3s, air3s, T3tactical12s, T3instant12s; each includes both facings and exact Idle return where action is shown. Full independent on-disk decode:124 decoded frames total, quantized RGB timeline hashes and every duration PASS, disposal2, world mirror PASS, cell isolation/clear borders and exact padded-source RGBA PASS. Scripts prepare_preview.py / verify_preview.py; review-manifest.json / independent-verification.json / visual-review.json / source-reference-hashes.json retain evidence. Verifier initially sampled the unchanged ground line and readable state labels; corrected comparison regions, no artwork changed to satisfy checks.

TacticalT0 release900ms; instant0/air startF3 immediately, no new F1/F2 delay. Air has no victim contact/protection. T3 actual a1/a2 recipients from saved evidence only;3.75s expiry, independent Special5s expiry, MAX mitigation (self33.75%, ally20.25% while Special active), no unconditional team shield. GIF centiseconds display819/4569ms boundaries at820/4570ms (+1ms, never early); exact model times retained, not gameplay changes. Same Idle144px comparison: Awakening release50042 alpha>64 pixels vs Special31790/Heavy15103; contact2.096x Heavy art area, not damage/range/phone proof.

**NEXT ONLY: show actual normal GIF and slow/other file links; STOP for player VFX/GIF review. No player VFX/GIF acceptance exists.** Four-pose Gate remains CLOSED/APPROVED. Execution contract, Runtime, build, Browser, deployment remain NOT DONE. These are art reconstructions, not game recordings. Reused16 mechanics cases with unchanged source-hash checks, no simulation rerun; Special164/Browser/release/145CI/39public and all P1/P2 acceptance preserved, no repeated tests/release. No full suite run; five historical failures remain. Shared Dynamic Asset Residency,16MiB cap/131072reserve/allrequired stay unchanged; inherited45textures16611224decoded/34920extra is not a new capacity pass. Ordinary Hit permanently cancelled. No src/public/tests/workflow change, main merge/newbranch/P3/TD. Docs/art checkpoint[skip ci]. Canonical successor docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md remains one self-contained copy block.


## 2026-10-21 — Awakening VFX sources GENERATED / GIF assembly BLOCKED by host execution

Four-pose art is PLAYER APPROVED at bcd1a72bff55ce37fb6eea08b75fb9e41dc46e30; receipt docs/art/approved/botuo/awakening/poses-v1/acceptance.json. Exact accepted F1/F2/F3/F4 masters/boards/old manifests remain unchanged. New three independent imagegen sources and complete prompts are preserved in docs/art/candidates/botuo/awakening/composite-review-v1/: radial-release-raw.png, victim-impact-raw.png, team-mitigation-raw.png. Source SHA256/dimensions and actual partial alpha observations are in source-checkpoint.json. These are CANDIDATES, no VFX/GIF approval inferred.

ACTUAL BLOCKER: local exec_command stopped returning even for a read-only pwd; a subsequent apply_patch for prepare_preview.py also did not return. Waiting cells were terminated after nonresponse; no exit code/stderr or underlying outage cause established. This is NOT a code/test failure or completed preview. Remote GitHub tools remain available, so generated tool-result bytes/prompts are checkpointed directly without relying on the unavailable host. No source PNGs/GIFs fabricated.

NOT DONE: full light/dark/source-edge QA, equal-cell preview packing and normal/slow/noFX/mirrored/Idle-return/reduced/instant-air/T3-state GIF assembly/complete decode. prepare_preview.py write was attempted but not confirmed; on recovery first search existing local untracked work and reuse it if present, then verify. Do not claim source/VFX/GIF Gate PASS or ask player to approve a nonexistent animation. NEXT ONLY restore executable file processing, recover this source checkpoint plus local script, finish minimum art assembly/QA and show actual GIFs for visual review. No source regeneration or repeated pose approval.

Preserve actual instant0 vs tacticalT0 900ms/T3 819ms, single per-victim hit/caster-locked circle; T3boyi.team only after damage applied, actual nearby living recipients and3.75s own expiry, Special independent/MAX coexistence. Body F1 load cannot create a new universal delay. Candidate outgoing/contact/status are independent. Existing16mechanics and all Special/P1/P2 evidence reused without reruns. No gameplay/runtime/public/workflow change, build/Browser/deploy or full-suite run; five historical failures and16MiB+131072reserve/allrequired remain. Same feature branch/PR1 open-unmerged, no main merge/newbranch/P3/TD; docs/art source checkpoint[skip ci].


## 2026-10-21 — Awakening FOUR POSES PLAYER APPROVED / VFX-GIF NEXT

Player「我確認OK，紀錄規則流程進度，如有必要存下素材，然後繼續」accepts the presented four-pose set at921637d1948783c25621f76069251da9a111d89e. Receipt `docs/art/approved/botuo/awakening/poses-v1/acceptance.json` binds both reviewed boards and exact F1/F2/F3/F4 master hashes. Corrected F3 approval retained; all character masters/prompts/QA/padding/old manifests unchanged. Old pose-pending entries are historical. **FULL FOUR-POSE ART GATE CLOSED**, do not regenerate/reopen it.

NEXT: independent caster-centered radial earth/pressure release, real-victim contact and actual-recipient T3 mitigation cue; safely package approved art and create normal/slow/effects-off/both-facing/Idle-return/reduced and instant-path previews for player VFX/GIF review. Largest Awakening spectacle at unchanged actor scale, visibly stronger/different than Heavy/Special. No extra damage/hits/displacement/ground-hit/DoT/shield/invulnerability. T0 instant0 vs tactical900ms/T3tactical819ms remain existing different paths; no universal new load delay. Target contact only on actual hit; T3boyi.team only on successful post_cast, actual recipients/lifetime3.75s, not unconditional whole-team aura; Special coexistence must survive.

Review timing/choreography is presentation proposal, not executable contract/Runtime acceptance. Reuse unchanged16mechanics/Special engineering/release; no full-suite/build/Browser/deploy. STOP after new VFX/GIF review material, no integration/release until later explicit gates. Samebranch/PR1 open-unmerged, protected P1/all acceptedP2,16MiB+131072reserve/allrequired and five historical failures retained, no main merge/newbranch/P3/TD. Save approval-first checkpoint[skip ci] before generating new VFX.


## 2026-10-21 — Awakening FOUR-POSE ART CANDIDATES / PLAYER REVIEW PENDING

Corrected F3 v2 PLAYER ART APPROVED is durably recorded at cddb7047195884a80a07c4a75a1ec492c7baf5fd and `docs/art/approved/botuo/awakening/f3-v2/acceptance.json`; exact F3 source/master unchanged. New `docs/art/candidates/botuo/awakening/poses-v1/` contains three independent F1 raised-load/F2 downstroke/F4 recovery masters, complete prompts/reference hashes, exact-RGBA48px padding, alpha QA, inspected light/dark full-four review and manifest/reproduction script. No four-up generation, no VFX/GIF. Original F3 reused, rejected v1/extra-hoof draft never used.

Author inspection traces viewer-left shoulder/arm to large beast-face guard and viewer-right arm to small guard; two arms/two legs/two hooves per frame. Common .38 source-pixel board scale with support translations, no pose-height/single-head fit. Static board is not runtime density/ground/pivot/foot-lock proof; F4's authored recovery stance narrows. All new poses are CANDIDATES, not player-approved. New art has not changed existing actor layout or gameplay.

**NEXT ONLY: show full-four review and wait for player acceptance of F1/F2/F4/whole-pose sequence. F3 gate stays CLOSED.** Do not create VFX/GIF/executable timing/Runtime/deploy before that next art approval. F1 load is presentation design only, not a new windup/lock; instant/tactical damage, locked AoE and T3 actual post_cast/resolve-time recipient semantics remain from existing16cases, not rerun. ExistingSpecial164/Browser/deploy/145CI/39public/P1/all approvedP2 unchanged and reused, no build/full-suite/browser/release. Same feature branch/PR1 open/unmerged; no main merge/newbranch/P3/TD, ordinaryHit cancelled,16MiB+131072reserve/allrequired retained and five historicalsuitefailures preserved. Docs/art-only[skip ci].


## 2026-10-21 — Awakening corrected F3 v2 PLAYER APPROVED / remaining poses NEXT

Player「我確認ok，妳紀錄後繼續」accepts the presented corrected F3 at ee5870600543e154902e244f9e6da749cde9f266. Receipt `docs/art/approved/botuo/awakening/f3-v2/acceptance.json` binds exact F3-candidate SHA2563122654ff5bfde5a5ecbca0e41269b7ad4f8015a3dcf350cbdb0f8ef886f1eb4 and original master. **F3 DESIGN / PLAYER ART APPROVED**; do not regenerate it or repeat its approval. Candidate manifest's old pending state is historical, not a competing current status. Rejected v1 and extra-hoof draft remain forbidden references.

NEXT authorized established pose stage: individual F1 load (large correct-arm bracer lifted outward/up, knees flexed), F2 downward intermediate (bracer descends diagonally, deeper weight compression), exact approved F3 low release, F4 recovery (torso/hips rise, bracer eases toward low guard). These are authored visual candidates, not added windup/lock/damage/displacement or approved unseen art. Keep right-facing identity, viewer-left shoulder -> large bracer / viewer-right arm -> small bracer for these views; trace anatomical ownership, two arms/two legs/two hooves. Use approved identity/battleIdle and this accepted F3 only. No head/bounds-based scale fit.

After remaining poses, inspect each in light/dark and full four-pose review, then STOP for player pose approval. No VFX/GIF/executable contract/Runtime/deploy before later gates. Existing16 mechanics cases/Special evidence/P1/all accepted P2 unchanged and reused; no engineering reruns. Same feature branch/PR1 open/unmerged, no main merge/newbranch/P3/TD;16MiB+131072reserve/all required retained; five historical suite failures remain. Approval-only checkpoint[skip ci] first, before new generation.


## 2026-10-21 — Awakening v1 REJECTED: equipment sides; corrected F3 v2 REVIEW PENDING

Player reports「妳有讀取確認的戰場角色形象呢，因為妳這個圖片和形象的配件左右不分」. Confirmed v1 swaps large/small bracers relative to approved identity/battleIdle. Previous author visual QA was incomplete; alpha/padding checks were never anatomical-laterality proof. V1 is REJECTED / NOT A DOWNSTREAM REFERENCE (`key-pose-v1/rejection.json`), original bytes/manifest preserved. No player approval existed or is inferred.

Corrected ONE F3 candidate: `docs/art/candidates/botuo/awakening/key-pose-v2/F3-candidate.png`, SHA256 `3122654ff5bfde5a5ecbca0e41269b7ad4f8015a3dcf350cbdb0f8ef886f1eb4`. Uses only approved identity.png/battleIdle.png for side authority. Traced viewer-left shoulder/arm -> large beast-face bracer; viewer-right arm -> small wrist bracer, head still faces right (not flipped). A rejected intermediate had a third center hoof; preserved as draft-extra-hoof.png and removed by a separate generative edit. Final light/dark visuals inspected: two arms, two legs/two hooves, no VFX. Prompts/source/history/reference hashes/alpha/padding/visual-review.json preserved in v2; generative cleanup is not pixel-exact preservation of draft.

**NEXT ONLY player review of v2 identity/equipment/downward pose.** V1 and rejected intermediate must not seed later art. Trace asymmetrical equipment from shoulder through elbow to wrist, count limbs and check facing on light/dark backgrounds before calling a candidate visually ready. Screen-left/right mapping describes this pose only; preserve anatomical arm ownership across all future poses and whole-actor runtime mirrors. No prior approved Heavy/Special/P1 art changed or reopened. Existing16 mechanics cases and all Special evidence reused without reruns. No new gameplay/other frames/VFX/GIF/Runtime/build/Browser/deploy. Same feature branch/PR1, no main merge/new branch/P3/TD, budgets and five historical suite failures retained. Docs/art correction uses[skip ci].


## 2026-10-21 — P2 Awakening ONE F3 CANDIDATE / PLAYER REVIEW PENDING

Recovered remote `8d7fb0b863e45e8a247780632ab79955eb361ae8`, same `feat/m0-combat-core-20260927`, PR #1 open/unmerged, initial tracked/untracked tree clean. Special COMPLETE / PLAYER VERIFIED and all P1/P2 accepted materials remain protected. No newer Awakening art or acceptance existed at recovery.

NEW: `docs/verification/P2_AWAKENING_PREFLIGHT/probe.mjs` runs real BattleSession representative cases; `mechanics.json` records **16 cases PASS**, with unchanged static-seed source hashes. Player/AI shared entry, instant/tactical T0 damage, locked cast center with moved/escaping/entering actors, air cast and AI rejection, T3 hit-conditioned protection, resolve-time recipients, Special coexistence/MAX mitigation, expiry and source/recipient KO covered. Controlled actors/explicit AI execution are not a free-running AI policy or Browser/device test. No gameplay source modified.

ONE generated character-only downward-release F3 master and exact-RGBA 48px padded candidate saved in `docs/art/candidates/botuo/awakening/key-pose-v1/` with prompt, four reference hashes, alpha data, inspected light/dark QA and reproducible preparation. Candidate SHA256 `c80951a05975ff765b60e6a82736ad09f5b19c08360e2ab8d86f37f004821652`. **CANDIDATE ONLY / NOT PLAYER APPROVED**. Wide low base, flexed knees, downward beast-bracer and rear counterbalance distinguish Basic horn strike, Heavy forward bash and Special upright inward guard without VFX. Raw source alpha1 edge noise is retained; no source cleaning/redraw or pose-height fitting. This is not final runtime density/anchor/residency proof.

**STOP / NEXT ONLY: player review of this exact F3 design/identity/equipment/downward pose.** No F1/F2/F4, VFX, GIF, executable contract, Runtime or deploy. After approval, record the exact statement/hash before the next separately authorized art stage. No acceptance inferred from engineering success. Reuse unchanged Special164/Browser/release/145CI/39public and45required16611224decoded/16MiB+131072reserve+34920extra evidence, not rerun. Five historical full-suite failures retained; no full suite/build/Browser run or release in this docs/art-only `[skip ci]` slice. No main merge/new branch/P3/TD/ordinary Hit reaction. Latest containing commit is a docs/art checkpoint, not a new public release. Canonical successor remains `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md`, with one self-contained copy block.


## 2026-10-21 — P2 Special COMPLETE / PLAYER VERIFIED; Awakening key-pose NEXT

Player explicitly approves the presented deployed Special and requests GitHub progress/process/rules plus a seamless new Work handoff. Exact statement/version/scope is in `docs/art/approved/botuo/special/runtime-v1/acceptance.json`, bound to536685401cfa0805b5836b057a27dd0692c46879 and its presented URL. Special runtime/phone Gate CLOSED / PLAYER VERIFIED; no itemized device case matrix/FPS/GPU/hash measurements invented. P1 COMPLETE and P2accepted Idle/Move/KO/scale/Basic/Heavy remain protected. WholeP2 is NOT complete.

Reuse unchanged Special164scoped/build/87guard, Browser4WebGL/126sampling/16chain/2built, deploymentActions1092,145CI/local and39complete public-hash evidence. Current slice only records acceptance, process and handoff; no src/public/scripts/tests/workflow/approved-art changes, engineering rerun or redeployment. Existing45required16611224decoded/16MiB cap/131072reserve/34920extra and five historical full-suite failures remain inherited evidence. Receipt, release.json/RELEASE.md and Special WORK_LOG distinguish art/GIF/contract/runtime/engineering/deploy/player gates; old phone/deploy/contract-pending pointers are historical, not tasks to repeat.

NEXT bounded new Work: P2 Awakening「鎮岳」missing actual mechanics evidence → differentiated action → ONE character-only F3/key-pose candidate → STOP for player review. Read `docs/M5C_P2_BOTUO_AWAKENING_ACTION.md` and `docs/verification/P2_AWAKENING_PREFLIGHT/static-seed.json`; read-only catalog/Tier recovery is prepared, not actual gameplay verification or approved design. T0caster AoE2.2/coefficient1.7/CD14, windup0 vs tactical telegraph900ms; preserve true Tier timing, T3post_cast team protection and accepted Special coexistence. Do not carry Special's deployment/art approval into unseen Awakening. Canonical successor `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md`, always ONE complete self-contained copyable prompt. No main merge/alternate branch/TD/P3, no repeated Special art/engineering/release, no Awakening F1-F4/VFX/GIF/Runtime/deploy before later gates. Docs-only checkpoint[skip ci]; latest docsHEAD is newer than live releaseSHA.


## 2026-10-21 — P2 Special DEPLOYED / PUBLIC VERIFIED / PLAYER PHONE NEXT

Player「授權部署」authorized scoped release536685401cfa0805b5836b057a27dd0692c46879. Actions1092/run39593187720 build119198973026/deploy119199183277SUCCESS;164/164scoped+Build/87guard4614620bytesPASS. Exact runtime/evidence-hash checks reuse Browser50edd53/Actions1091(4WebGL/126sampling/16chain/2built/22captures/0errors), no Browser replay. Actual Pages artifact12342149128/source-proof12342448845:145local/CI complete files identical;39complete public files(index+2JS+CSS+35Runtime PNGs)SHA256match. Reports `docs/verification/P2_SPECIAL_RUNTIME/{release,public-fingerprint,ci-build-inventory,release-ci-jobs}.json`, RELEASE.md/WORK_LOG.md. Original art/GIF/receipts/gameplay unchanged;45required16611224decoded/16MiB+131072reserve+34920extra preserved. Existing five full-suite failures remain, no full-suitePASS claim.

**NEXT ONLY player phone review:** https://hansen0318.github.io/shanhaijing-arena/?v=536685401cfa0805b5836b057a27dd0692c46879 . Test immediate Special→readyHeavy/Move with continuing defense, true expiry/KO/Pause/Restart cleanup, consistent IdleMoveAttack size/both facings. **NOT PLAYER VERIFIED / NOT wholeP2 COMPLETE** until explicit confirmation. No repeat unchanged deployment/Browser/art/GIF/contract, no Awakening/P3/main merge/newbranch/TD. P1/P2prior player approvals protected. This supersedes old no-deployment/authorization-pending pointers; browser-gate.json remains the historical snapshot. Evidence-only closure[skip ci]; latest docsHEAD can be newer than deployedSHA. Single self-contained successor `docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md`.

## 2026-10-21 — P2 Special DEPLOYMENT AUTHORIZED / RELEASE PENDING

Player explicitly replies 「授權部署」 to the scoped Special Pages release question. Receipt `docs/verification/P2_SPECIAL_RUNTIME/release-authorization.json` binds recovered169f1059c3b199132cdb2f109ab326cdec613367 and Browser-tested50edd53b69010ad9b5f700c3282cb2e8acb29c6a / Actions1091. This supersedes the older no-authorization stop for this exact release only; no deployment/phone PASS claimed yet. Production/runtime/art/GIF/accepted receipts remain unchanged. One-shot `[botuo special release]` runs the existing164bounded checks/build, checks exact tested runtime sources and evidence hashes, preserves actual build inventory, then permits existing Pages stages. Browser results reused without replay. NEXT release Actions/artifact/public fingerprints then focused phone review. No main merge/newbranch/Awakening/P3/TD. Older Browser Gate evidence remains valid.

## 2026-10-21 — P2 Special BROWSER PASS / RELEASE AUTHORIZATION NEXT / NOT DEPLOYED

Actual tested feature `50edd53b69010ad9b5f700c3282cb2e8acb29c6a`, Actions #1091 / run39563136667:164/164 scoped tests, build/87-file guard4614620encoded bytes PASS;4controlled Chromium/Phaser WebGL cases(normal/reduced×left/right),126native sampling comparisons,16same-clock Basic/Heavy/other legal skill/Move chaining subcases and2actual built mobile-emulation Campaign→Stage→Team→Arena cases PASS,22captures,0page errors. Reports `docs/verification/P2_SPECIAL_RUNTIME/{browser-gate,browser-verification,built-entry,ci-jobs}.json`; ledger WORK_LOG.md,4inspected screenshots retained, artifact12328207752. Native-original max<=1LSB;2BasicF3UV-rounding cases match independently retiled ORIGINAL pixels exactly(0delta), with strict control mean bound.

Fixed real tight-atlas linear-filter edge clamp/neighbor bleed through9source-exact physical derivatives/mapping, not new art or actor resizing. All63logicalRGBA frames, accepted sources/GIFs/receipts/logical geometry/FPS and combat/Tier/CD/AI remain unchanged.45required textures16611224decoded +131072reserve leaves34920bytes; cleanup0. Independent review resolved fixture's mutable-sprite stale-event assertion and verified exact derivatives; source/status ownership, stale ordering, immediate mitigation/chaining, expiry/KO/clear/Restart remain effective. Prior unaffected local/mechanics/player evidence reused; no full suite rerun and five historical failures unchanged.

**Gates:** PLAYER ART/GIF/EXECUTION CONTRACT APPROVED; RUNTIME INTEGRATED; LOCAL PASS; BROWSER PASS; NOT DEPLOYED; PLAYER PHONE PENDING. Configure Pages/upload/deploy all SKIPPED. **NEXT ONLY explicit player authorization for scoped Pages deployment**, then release/public fingerprint and focused phone acceptance. Current instruction does NOT authorize deployment. Stop at this Release Gate; no repeated browser/art/GIF/contract gates without changed source or genuine defect. No main merge/replacement branch/TD/P2Awakening development/P3. Existing legal Awakening was exercised only for chaining. Latest docs commit may be newer than tested source; fetch remote. Successor `docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md`, always one complete self-contained copyable block.


## 2026-10-21 — Special Browser sampling defect isolated / fix verification ACTIVE / NO DEPLOY

Recovered5775c0bad6a6f8cc0b52c7974c9897ee603f1dd3; PR1 open/unmerged, samefeature branch. Actions1086/1087 actual built-entry2cases PASS, but native sampling gate FAIL. Original zero-gutter copies reproduce the differences; one source-exact sampling texel removes edge-clamp/neighbor bleed. Smallest correction changes only9 Runtime atlas derivatives/physical mappings and deterministic installer; original art/GIF/receipts/logical canvas/scale/origin/FPS/gameplay untouched. New required45keys16611224decoded+131072reserve leaves34920bytes. Source-neighborhood regression RED→GREEN;53affected checks and build/guard results in `docs/verification/P2_SPECIAL_RUNTIME/`. Browser strict thresholds remain unchanged, next probe verifies126native comparisons plus utility/chaining/ownership/cleanup and actual built entry. NOT BrowserPASS/deployed/phone verified. Prior local161checks remain reusable outside changed sampling/capacity. No main merge/newbranch/Awakening/P3/TD. Release requires separate explicit player authorization.



## 2026-10-21 — Special Runtime INTEGRATED / local scoped verification PASS / native browser NEXT

執行契約與32貼圖包裝核准已存 executable-v1/acceptance.json，沿用不重問。共用utility觀察、source/status ownership、logical-region adapter及35份忠實PNG已實作；詳細ledger `docs/verification/P2_SPECIAL_RUNTIME/WORK_LOG.md`，完整required集合/容量與本地證據在同目錄。45required/16562336decoded，131072reserve外83808bytes；原source/Heavy契約與機制不變。獨立審查發現stale事件排序及terminal清理，已加RED→GREEN回歸修正。Native Phaser sampling/actual built entry尚待真瀏覽器證據，不等於手機或玩家Runtime驗收。未部署，Heavy live acf454741757f58efa980fdcd03f028a472e87a3；五個歷史suite failures保持。NEXT僅必要工程/browser verification；禁止自動Pages部署、main merge/替代分支/Awakening/P3/TD。較舊pending視覺/契約條目為歷史。


## 2026-10-21 — Special EXECUTION CONTRACT / PACKING PLAYER APPROVED; shared integration active

玩家直接回覆工程契約及32份舊貼圖無損包裝的確認問題：「號，確認紀錄流程規則後 繼續」。receipt `docs/art/approved/botuo/special/executable-v1/acceptance.json` 綁定既有前檢文件及packing-manifest SHA256；視覺/動作/工程契約/包裝核准均CLOSED，不再重問。NEXT執行 `docs/plans/2026-10-21-p2-special-runtime.md`；進度與測試ledger `docs/verification/P2_SPECIAL_RUNTIME/WORK_LOG.md`。保留立即減傷/接ready技與Move，獨立activation/status ownership、真實source/recipient/Tier、16MiB+131072reserve和全部required；無機制時序變更。僅核准接續共用Runtime整合及必要驗證，未聲稱工程PASS或授權部署/手機/全P2完成。舊pending條目為歷史；不重畫、不merge main/開替代分支/Awakening/P3/TD。


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


## 2026-10-21 (Asia/Taipei) — Special VISUAL PACKAGE PLAYER APPROVED / ENGINEERING PREFLIGHT NEXT

玩家原文：「目前這個我approved，紀錄流程進度規則在github，我要開新的work，要讓他無縫接軌，要跟他說什麼」。核准綁定已完成的 composite-review-v1 視覺包；receipt：`docs/art/approved/botuo/special/composite-v1/acceptance.json`，素材 checkpoint `d1deccff2e4337af71995bb2901ad99052012fd5`。四姿勢、獨立施放/持續狀態 VFX、五種 GIF 與 QA/來源/prompt/hash 已保存，沿用不重畫、不重問相同視覺 Gate。核准依玩家對目前成果的整體確認；不聲稱逐檔播放、裝置測項或實機驗收。下方舊 PENDING 條目及候選包內當時的狀態為歷史，由此最新 receipt 取代；保留原 manifest/checksums 不改寫歷史。

**下一個未完成 Gate：Runtime 前檢、共用可執行 presentation/status ownership 契約與 faithful packing/容量方案。** 先提出具體可審核契約再進必要共用 Runtime 整合。即時減傷、可立即接 ready 技能/移動、真實 source/recipient/status 生命週期必須保留；160ms 美術 frame hold 不成為前搖、全域 CD 或鎖姿勢。現有 T1+ 單一隊友受益不能改成全隊或被移除。短動作可被合法後續技能取代，狀態 VFX 不因此結束，跟 actor root 而非身體圖片排版 offset。

16MiB decoded texture/cache cap、131072bytes reserve、Shared Dynamic Asset Residency 不變；42 required keys /16622164bytes，reserve 外僅23980bytes。目前 review packing 不是最終尺度/anchor/容量通過證明；需多個解剖/裝備/接地標記、雙向與完整 residency 實測，不可外框高度 fit、放大角色或擅降清晰度。新 Runtime/可執行時序/部署/手機及整個 P2 均未核准。

此次只保存素材、核准與交接文件，無 production/src/public/workflow 或既有核准素材變更，沒有部署。既有機制與 Heavy 測試證據沿用；五個已知 suite failures 保留，不宣稱全 suite PASS。Heavy COMPLETE / PLAYER VERIFIED，live acf454741757f58efa980fdcd03f028a472e87a3 不變。禁止 P2 Awakening/P3、main merge、替代分支、TD。新 Work 唯一自足接手指令：`docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md`；所有後續接手指令維持單一完整可複製 code block。

## 2026-10-21 — Special FOUR POSES APPROVED / VFX + FIVE GIFS PLAYER REVIEW

Player「這個可以，我approved 紀錄規則流程進度 github，有必要存下材料 然後繼續」accepts displayed45be0c0four-pose board. Exact PNG/hash receipt `docs/art/approved/botuo/special/poses-v1/acceptance.json`; early approval checkpointe49c3d1ea4151ff5d5aeba5f7643ec6e7a984bda saved before new VFX. F1–F4 masters/prompts/QA/history already durable; none regenerated or overwritten. Previous pose-pending entries below are historical.

**CURRENT PLAYER GATE:** `docs/art/candidates/botuo/special/composite-review-v1/` contains normal/slow/character-only/reduced/instant-chain GIFs, independent activation/state PNGs, same-Idle Heavy/Special comparison, T1 actual-recipient study, light/dark/decoded QA, manifests/checksums and preparation scripts under scripts/. All NEW VFX/GIF are CANDIDATES / NOT PLAYER APPROVED. Exact materials and limitations in README.md, review-manifest.json, verification-summary.json. Normal/slow120fully decoded frames exact RGB, all holds3x; all5GIFs fully decoded and pixel timeline roundtrip PASS.4equal400×320cells/1600×320strip; full resizedRGBA retained, generous margins, source hashes unchanged, rounded ground residual0.0.126uniform raw-source density reuses accepted Heavy review policy, NOT final runtime body-density/anchor/budget proof. No height-fitting or new art substituted.

Defense: larger layered gold/ivory horn-shaped transient activation320×260 plus independent calmer segmented open state224×234, compared against Heavy source230×154 with exact same144×144Idle. No enemy damage/contact/absorption/invulnerability/team-AoE invented. T0 self status starts at previewcast400ms, ends4400ms from actual4s record, independent of illustrative160ms pose holds. Separate instant-chain reconstruction uses real SAME-clock Special→Heavy evidence; gesture can be superseded while state persists through Heavy/Move. Aura follows actor root/world movement, never body-picture layout offsets; a preview coupling issue was found/fixed before final review. T1 study reuses actual status records: self27.5% and ONEally16.5% for4.32s; thirdally no aura. P3/P4 static images reused solely for this recipient illustration, no source/character development.

Only docs/art and reproducible preview scripts; no src/public/workflow/oldapproved changes, runtime/residency fit claim/build/browser/deploy/phone acceptance. Prior32direct/8lifecycle/2AI/4paired damage and136Heavyengineering/public evidence reused unchanged; known5suite failures retained, no full-suitePASS. Liveacf4547/16MiB+131072reserve/42keys16622164bytes/23980extra unchanged. New high-resolution review assets are not gameplay-loaded. Checkpoint[skip ci]; latestremote is containing feature commit.

**NEXT ONLY:** player reviews actual supplied VFX/GIF/chain/reduced/recipient material. On explicit visual approval bind exact reviewed hashes/statement; then settle faithful executable observational presentation/source-status ownership and packing before any shared Runtime integration/release/phone gates. Do not infer new timing, forced-pose completion, wholeP2 approval or device results; do not reapprove/regenerate accepted poses. No P2Awakening/P3/main merge/newbranch/TD. Current successor docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md; future instructions one complete self-contained copyable block.

## 2026-10-21 — Special F3 APPROVED / F1-F2-F4 CANDIDATES READY

Player「好這個我確認ok，紀錄下來後繼續」accepts the displayed Special protective key pose/design after immediate Special→Heavy with ongoing mitigation explanation. Receipt `docs/art/approved/botuo/special/f3-v1/acceptance.json` binds exact F3 SHA25600dc78f20e09da6f8c55b67497653046cb5c7aa6253df2ffaa3d7b41c7bdf8a6/reviewed92ce4db. Early approval checkpointa9ea66955702b0b0b0e6e852f6de00e004d12c40 pushed before new generation. PR1 open/unmerged, samefeature branch. Prior first-pose-pending entries below are historical.

**CURRENT PLAYER GATE:** `docs/art/candidates/botuo/special/poses-v1/four-pose-review.png` (dark QA alongside). New individual F1 low/open initiation, F2 inward lifting transition, F4 open/lowered recovery are CANDIDATES; exact accepted F3 reused without new generation. Built-in Imagegen sources/prompts, three initial torso-costume-drift drafts (SUPERSEDED/EXCLUDED), targeted correction prompts, selected source hashes/PNG-alpha/full decode/40px in-memory exact padding and same0.44raw-pixel-scale light/dark boards in poses-v1. Different equipment projections/small costume details remain player art judgment, not exact-pixel identity or runtime calibration. All full source pixels retained; no height-based character fit, runtime-normalized strip or GIF produced.

Existing mechanism retained: immediate Special mitigation allows available subsequent skills/movement while status persists. Prior32direct/8lifecycle/2AI/4paired-damage evidence unchanged and reused, including SAME-clock Special→Heavy. Preview sequence roles do not authorize a startup/global cooldown, hold-to-protect, delay untilF3 or forced completion before next skill. Persistent status VFX must stay independent of short body action and survive legal later skills until true expiry/cleanup; no fake damage/contact. T0 self25%4s/CD8/windup0, existing T1+one-ally protection/control/KO retained.

Only docs/art changed; src/public/workflows/oldapproved sources unchanged. PNG/hash/QA/protected-path/diff checks PASS, no unchanged runtime tests/build/browser/deploy/P1/Basic/Heavy replay. Heavy COMPLETE/PLAYER VERIFIED, liveacf4547,16MiB+131072reserve/42keys16622164bytes/23980extra retained; new masters are not loaded or budget-fit claims. Five known suite failures retained, no whole-suite PASS. This checkpoint[skip ci]; latest remote is containing feature commit, fetch again.

**NEXT ONLY:** player reviews selected F1/F2/F4 alongside accepted F3. After explicit pose acceptance record exact sources/statement before independent activation+actual-recipient state VFX and preview Gate. No VFX/GIF/newtiming/runtime/phone or wholeP2 approval inferred; no P2Awakening/P3/main merge/replacement branch/TD. Canonical successor docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md; all future instructions one self-contained copyable block.

## 2026-10-21 — P2 Special 守群 FIRST PROTECTIVE KEY POSE / PLAYER REVIEW PENDING

Recovered feature remote8eb5e2b4814f86d4710a23b3a5e0346428ecd9f3, PR1 open/unmerged; main16f73932 inspected, not merged. Explicit bounded task authorizes actual mechanics → motion differentiation → one independent protective candidate, then STOP for player. Details: `docs/M5C_P2_BOTUO_SPECIAL_ACTION.md`; current successor `docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md`.

**CURRENT GATE:** review `docs/art/candidates/botuo/special/key-pose-v1/F3-protection-master.png`, SHA25600dc78f20e09da6f8c55b67497653046cb5c7aa6253df2ffaa3d7b41c7bdf8a6;1222×1287RGBA1256843bytes. Upright centered inward high bracer closure, opposite small-bracer hand supports, both hooves planted; no VFX. F3 means protection established, not damage contact. Built-in Imagegen refs approved identity/Idle/Heavy equipment; prompt/source hashes/PNG-alpha40px exact padding/light-dark QA recorded alongside. New pixels remain candidate; no approval inherited. No Special acceptance receipt/GIF/timing/runtime/phone sign-off.

`node scripts/inspectBotuoSpecialPreflight.mjs` PASS:32 real direct cases,8 lifecycle cases,2 shared AI opportunity probes,4 paired damage-resolver comparisons. Snapshot source-hashed. T0 self25%4s/CD8/windup0; T1+ **existing** post_cast selects one nearby living ally (not whole team), mitigation16.5/18/20.25% while self27.5/30/33.75%, duration4.32/4.6/5s. Same source-target-key replaces; strongest mitigation wins; KO source/recipient cleanup, expiry/clear/new session, movement/ordinary damage preserved. Cast hit=true means applied utility, not damage. No authored Special action or source-aware status VFX exists yet; future shared generic recipient/status ownership needed, no P2-ID branch. Static scene cleanup traced separately, not browser proof.

PNG/alpha/source/QA/protected-path and diff checks scoped to this docs/art/probe slice; no production/src/public/approved/workflow edits, build/deploy/browser or full/P1/Basic/Heavy replay. Heavy COMPLETE / PLAYER VERIFIED retained, liveacf4547 unchanged; prior136affected/build/browser/public evidence reused, existing5suite failures retained.16MiB+131072reserve/42keys16622164bytes/23980extra unchanged; master not runtime-loaded or asserted to fit. Containing feature commit is latest checkpoint; refresh remote. Checkpoint[skip ci].

**NEXT ONLY:** player reviews this exact Special key pose/design. If explicitly accepted, record source/hash/statement before individual remaining poses → independent cast/status VFX → all preview gates → executable/shared integration/release/phone gates. No unseen-art approval, P2Awakening/P3/main merge/replacement branch/TD. All successor instructions one complete self-contained copy block.

## 2026-10-21 (Asia/Taipei) — P2 Heavy PASS / PLAYER VERIFIED; Special 守群 NEXT

Player「我確認完成ok，進度流程規則紀錄github，然後或要新創一個work，要他無縫接軌，開發後續，要跟他說什麼」explicitly confirms the completed Heavy after the supplied test URL. **P2 猼訑 Heavy「震嶺」COMPLETE / PLAYER VERIFIED**. Receipt: `docs/art/approved/botuo/heavy/runtime-v1/acceptance.json`. Accepted source `acf454741757f58efa980fdcd03f028a472e87a3`; release URL https://hansen0318.github.io/shanhaijing-arena/?v=acf454741757f58efa980fdcd03f028a472e87a3 . Binding follows the presented version; no independent device bundle hash, exact approval clock time or itemized device-case/FPS/GPU-memory report was supplied. Previous Heavy phone-pending/stop-before-Special statements below are historical and superseded for this new continuation scope.

Preserve approved F1–F4/GIF/source/contact, executable A, P1 COMPLETE, P2 Idle/Move/Basic size/Basic/KO and generic ordinary Hit CANCELLED. Reuse unchanged prior136affected/build/84guard,8WebGL/24trim/2built-entry,110CI-local/15public-file evidence; none rerun and no redeployment in this acceptance-only slice.42required keys16622164bytes;16MiB cap +131072reserve+23980extra retained. A keeps existing Tier-scaled650ms tactical resolve, immediate/whiff0msF3 and true-hit contact; no gameplay/art changes.

**NEXT authorized New Work:** P2 Special「守群」actual mechanics/state/Tier recovery → distinct protective choreography → key-pose player art review, then only the existing approved-art/VFX/GIF/executable/integration/release/phone gates. Catalog T0 is self-target,25% mitigation for4s,CD8s,coefficient0,windup0; preserve actual Tier/status/AI/expiry semantics. The name does not authorize team protection, damage/AoE, invulnerability or a new startup delay. Protective state VFX follows actual recipient/status lifecycle; no fake damage burst. Stronger Special spectacle must come from protective shape/layering/readability, not actor enlargement or invented mechanics. Special art/timing/runtime/phone gates remain UNAPPROVED. No P2 Awakening/P3/main merge/replacement branch/TD import. Current handoff: `docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md`; every successor instruction one complete self-contained copy block. Newest docs commit is not a new deployed source. This checkpoint uses[skip ci].

## 2026-10-20 — Heavy A DEPLOYED / PUBLIC VERIFIED / PHONE REVIEW NEXT

Release `acf454741757f58efa980fdcd03f028a472e87a3` / Actions39438531259: build118681911254 and deploy118682767756 SUCCESS.136affected tests +Build/84guard4336374bytes PASS;8real WebGL actions,24original-native-trim comparisons,2actual built mobile-entry/HP/Pause/Restart/cleanup cases PASS,50captures,0page errors. Public15complete files SHA256 match tested local/actualCI, all110local built files equal actual Pages artifact. Records docs/verification/P2_HEAVY_RUNTIME/{release,public-fingerprint,ci-build-inventory,engineering}.json. This docs-only checkpoint does not redeploy. Earlier pending sections are historical.

Approved F1–F4/GIF/source/contact retained; A original gameplay/Tier timing preserved.42required keys16622164bytes,16MiB cap/131072reserve+23980extra; sourceRGBA/logical scale/anchor/mirror exact. Independent review no blockers; prior browser fixture and native-quad diagnostics retained. P1COMPLETE/P2Basic/size/KO approvals preserved; no wholeP1 replay or full-suite PASS claim. NEXT ONLY player physical-phone Heavy test: https://hansen0318.github.io/shanhaijing-arena/?v=acf454741757f58efa980fdcd03f028a472e87a3 . Check in-rangeHeavy/whiff/source-vs-contact, Idle/Move scale/return, both directions and Pause/Restart/KO. **NOT PLAYER PHONE VERIFIED**; await scoped sign-off before later gates. No Special/Awakening/P3/main merge/new art/repeated pose or GIF approval.

## 2026-10-20 — Heavy A ENGINEERING / REAL BROWSER PASS; release next

Exact approved GIF/F1–F4/source/contact and player A preserved-timing integration verified. Probe0cba0c43de9ed9cb99effeeee1fd899609f4de95 / Actions39437790482 build118679314649 SUCCESS;136affected/build/84file4336374byte guard PASS. Real WebGL8action cases,24native-trim controls and2actual built mobile-entry cases PASS;50captures,0page errors. Independent review no blocking defects. Reports docs/verification/P2_HEAVY_RUNTIME/ and docs/art/approved/botuo/heavy/runtime-v1/. Prior diagnostic failures retained; paused selection was fixture bug. Native trimmed-quad rasterization differs2–15levels from full quad even on original texture; packed vs original native-trim control<=1channel, mean<.00001. Exact originalRGBA/world canvas/scale/anchor/flip preserved; no source loss/resampling or relaxed unexplained visual gate.

42required keys16622164bytes,16MiB+131072reserve+23980extra preserved; all portraits/Idle/Move/KO pinned, cleanup0. A maintains true Tier650ms tactical timing; immediate/whiff entersF3 at0ms. No new combat locks/damage/AI/range/CD/targeting changes. Current live0fe44b3 not Heavy. NEXT authorized same-gated[botuo heavy release] Pages, actual artifact/public fingerprints, then scoped phone Heavy test. NOT PLAYER PHONE VERIFIED; no Special/Awakening/P3/main merge/new art or repeated approvals.

## 2026-10-20 — Heavy A RUNTIME LOCAL PASS / CI BROWSER PROBE next

Player A receipt closes executable decision. Generic existing-impact observational lifecycle preserves real hit/CD/AI/movement/target geometry; immediate paths enterF3 at0ms, tactical F1/F2→actualTierresolve→F3/F4. Exact approved cells and independent source/contact installed, no regenerated art. Pure-damage hit unaffected; real resolve catch-up handles intervening legal casts without simulation locks or duplicate damage.

136affected tests PASS +Build/84guard4336374bytes PASS. Lossless native-trim metadata onP3/P4/P5 Move retains everyRGBA pixel, old logical canvas/scale/origin/FPS/flip; originals untouched. Full42required keys16622164bytes, 16MiB cap +131072reserve preserved with23980extra;0failures/evictions/cleanup0. No P2Idle/Move/Basic/KO/P1art changes, old five suite failures documented, no wholeP1 replay/fullsuite PASS claim.

Report docs/verification/M5C_P2_BOTUO_HEAVY_RUNTIME.md and P2_HEAVY_RUNTIME/. Local Chromium download ZIP truncated, so real browser pending. NEXT CI[botuo heavy probe]runs136affected/build +8realWebGL action cases +24native-trim comparisons +2actualbuiltmobile-entry/Pause/Restart/cleanup cases, uploads evidence and SKIPS Pages. Inspect evidence/fix before same-gated[botuo heavy release]deployment/public fingerprints/phone handoff. Current source0fe44b3 still live; NOT deployed/PLAYERPHONEVERIFIED. No Special/Awakening/P3/main merge; successor single copy block.


## 2026-10-20 — Heavy EXECUTABLE A PLAYER APPROVED / integration in progress

Player「A」explicitly selects the explained preserved-timing contract at230400a. Receipt `docs/art/approved/botuo/heavy/executable-v1/acceptance.json`. Tactical in-range F1→F2 until existing Tier-scaled actual resolve→F3→F4; non-tactical immediate hit/manual whiff startsF3/source→F4, omits anticipation. Do not ask A/B or GIF approval again, add320ms/250ms delay, alter true HP/CD/AI/geometry/Tier controls or fake contact. Current user already authorizes integration/minimum engineering/build/browser/release/Pages/fingerprint. Not yet implemented/deployed/phone-verified.

NEXT shared observational presentation lifecycle + source-preserving runtime pack + affected tests. Read-only measurement finds per-frame zero-RGBA trim can recover capacity without resampling accepted art, requiring generic frame trim metadata and both-facing pixel/world/native-Phaser proof. Keep16MiB+131072reserve and visible Portrait/Idle/Move/KO protection, no P2-ID branch. P1 COMPLETE/P2Basic/size/KO/approvedHeavy sources/GIF protected. No Special/Awakening/P3/main merge. Previous executable-choice-pending entries are historical.


## 2026-10-20 — Heavy recovery VERIFIED / executable presentation decision pending

Exact delivered normal/slow GIF + source/contact VFX now recovered with hash-bound visual receipt; normal truncation repaired byte-exactly, not regenerated. `scripts/verifyBotuoHeavyRecovery.py` PASS. Read-only production preflight `scripts/inspectBotuoHeavyPreflight.mjs`:16direct/4Tier/6outcome/2residency-order probes PASS. No production source or art edits. Full decision/evidence: `docs/verification/M5C_P2_BOTUO_HEAVY_PREFLIGHT.md` + `P2_HEAVY_RECOVERY/{executable-preflight,packing-measurement}.json`.

True tactical hit is Tier-scaled650/633.75/617.5/591.5ms; non-tactical/air casts0ms; all events unphased. Preview contact320ms is not live timing permission. **NEXT exact player choice:** A preserve gameplay timings, tactical full poses, immediate paths beginF3/source→F4 (omit anticipation); B separately authorize/review real320ms immediate-path windup while preserving tactical timing. A recommended under user no-gameplay-change rule; neither silently selected. No repeat pose/GIF approval or release permission request. Existing user authorizes integration/deploy once contract satisfied.

Current39keys16,639,660bytes, reserve131,072 leaves6,484; faithful review-raster example717,456additionalbytes does not fit. Need shared residency/transparent-only engineering, no cap raise/clarity reduction/required-key eviction. No runtime implementation/build/browser/Pages/fingerprint/phone PASS in this slice. Live prior source0fe44b3 unchanged, NOT Heavy test release. P1/P2Basic/size/KO closed, no Special/Awakening/P3/main merge. Handoff updated; future prompts one complete copyable block.


## 2026-10-20 — Heavy delivered GIF RECOVERED / PLAYER VISUAL APPROVED / executable preflight next

Recovered the predecessor's uncommitted review batch from `/workspace/scratch/6e415327749c/shanhaijing-arena` at c563cfd, without copying its stale progress files. Prior assistant delivery2026-10-20T13:06:06Z names exact normal/slow sandbox paths; player statement「work有提供heavy的gif參考，我確認核准會讓新的work繼續」is now bound in `docs/art/approved/botuo/heavy/composite-v1/acceptance.json`. Four pose acceptance hashes and two independent VFX hashes match. Normal SHA256 `2f72bc4f16cc35af773c805bdf97eb6a89f819f11d3ad0d1b9f78b35bc1cb001`; slow `a81180a5eabb7df2116776dc27714ffd985c179f863ddf865c19fa2693cf3724`. No new artwork or preview substituted.

Normal on predecessor disk/index was truncated717501bytes/SHA9ea0723a…e1fa2ee7, failing full Pillow decode at frame34. Complete slow772380bytes36frames matches original manifest. Reverse only all36 GIF graphic-control delays /3: exact original normal772380bytes/SHA2f72bc4f…bc1cb001 recovered; truncated file is its exact prefix. Normal/slow decoded36frames identical RGB, total6720/20160ms, all delays3x. Archive truncated `.bin`, historical decode failure, original stale checksum manifest and corrected recovered checksums under `docs/verification/P2_HEAVY_RECOVERY/`. Reproduce read-only `python scripts/verifyBotuoHeavyRecovery.py`; do not rerun prepare over accepted preview. Historical candidate status/checksum text is superseded by receipt and recovered checksums, retained as evidence.

Attachment visual mapping:7C033…F1;61C375…selectedF2;17F84…F3;2033…selectedF4;F302…superseded costume-drift F4 (EXCLUDED);D412…four-pose board. Attachment order is not F1–F4; JPEGs never replace official PNGs. Exact uploaded hashes/comparison scope recorded. Pose/VFX/GIF art approval CLOSED; companion no-FX/reduced files archived without inventing independent approval. No PLAYER PHONE VERIFIED inference.

NEXT measure real Heavy tactical/Tier/non-tactical/manual-whiff event lifecycle and complete live required residency, then settle executable contract before production integration. Preview contact320ms after action start is not authorized gameplay delay. Preserve T0range1.8/CD4/coeff1.30/single-hit/no-displacement, existing Tier controls, P1 COMPLETE/P2size PLAYER VERIFIED/Basic/KO and16MiB+131072reserve. User authorizes missing integration/release only within these gates. No src/public changes, build/deploy or repeat P1/Basic tests in this recovery-only checkpoint; current source release0fe44b3 remains live. No main merge/replacement branch/P3/Special/Awakening. Successor instructions one complete copyable block.


## 2026-10-20 19:57 +08:00 — Heavy FOUR POSES PLAYER APPROVED / VFX + GIF next

Player「好，妳繼續」responds to the displayed four-pose board and explicit F1/F2/F4 art-review gate at fffad484da54c8ca59f88c394ba870116a953a7a. Selected F1/F2/F4 PLAYER ART APPROVED; existing F3 approval retained, superseded drafts excluded. Exact hash-bound receipt: `docs/art/approved/botuo/heavy/poses-v1/acceptance.json`. Prior pose-review-pending entries are historical. P2 size defect remains PLAYER VERIFIED.

NEXT independent amber/angular forward bracer pressure source + broader stone-like true-target burst, visibly stronger than accepted Basic at same actor display size; preserve approved actor pixels/body size and no projectile/AoE/gameplay inference. Package approved poses reproducibly using multiple anatomy/equipment/ground landmarks; create normal/slow/no-FX/both-facing/Idle-return composite GIF, clearly preview timing only. VFX/GIF are NOT PLAYER APPROVED. Stop for composite review before runtime integration/deploy; actual Heavy650ms tactical telegraph is Tier-scaled, not universal windup or Basic250ms. Preserve16MiB+131072reserve/Guard, P1 COMPLETE/Basic/KO, ordinary Hit canceled; no main merge/P3. Docs/art-only[skip ci], current source0fe44b3 deployment unchanged. All successor prompts single complete self-contained copyable block.

## 2026-10-20 — Heavy F1/F2/F4 CANDIDATES READY / FOUR-POSE PLAYER REVIEW

P2 size acceptance is recorded at `bc866bcf0ebb15ae3e373d72268987bd96d525fb`; size blocker remains closed. Continued to the first unfinished art gate: built-in Imagegen individual F1 load, F2 chest-level intermediate bracer strike, F4 lowered-guard recovery. Immutable approved F3 reused by path/hash only. Full sources/prompts/revisions/verification/reproducible light-dark review board: `docs/art/candidates/botuo/heavy/poses-v1/`. F2 initial draft too close to F3 and F4 costume drift preserved as superseded, not approved references; corrected selected candidates inspected.

PNG decode/alpha/hash checks PASS; selected sources have at most alpha1 at outer edges, solid anatomy fully interior. Separate40px padding derivatives preserve exact full RGBA crop-back; no source cleanup/overwrite. Four-pose board uses same0.28 raw-source-pixel scale, not pose-height fitting; **not runtime anatomical-density/ground/timing proof**. F2/F4 projected proportions/equipment and motion continuity remain player review scope. F3 exact SHA2560049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206 unchanged. No src/public/gameplay/approved receipt edits, no new runtime tests/build/deploy; docs/art-only[skip ci]. Prior release0fe44b3 remains live.

NEXT ONLY review F1/F2/F4 alongside existing approved F3. **CANDIDATES / NOT PLAYER ART APPROVED**. Required gate `docs/CHARACTER_ACTION_ART_WORKFLOW.md` §2: show full four-pose sequence for player review; pose acceptance precedes deterministic accepted-art packaging/VFX/GIF/runtime. Do not infer unseen-pose approval from size sign-off or continuation. After explicit pose approval proceed independent source/contact VFX, then GIF review; no P3/main merge. Current successor remains single self-contained block in `docs/handoffs/P2_BOTUO_HEAVY_NEXT_CHAT.md`.

## 2026-10-20 19:26 +08:00 — P2 SIZE PLAYER VERIFIED / Heavy remaining poses resumed

Player explicitly confirms「正常了，ok，紀錄進度和流程規則，然後繼續」following the phone review link for source release `0fe44b3c5eed46402d0394af6dff128a72be7393`. **P2 Idle/Move/Basic actor-size defect CLOSED / PLAYER VERIFIED; Heavy size blocker lifted.** Receipt: `docs/verification/P2_MOVE_BODY/player-acceptance.json`. This links the scoped sign-off to the supplied release; player did not supply a device bundle hash. Earlier size-review pending/Heavy-paused statements below are history. No unrelated physical-device behavior is inferred.

NEXT: retain approved Heavy F3 SHA256 `0049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206`, author individual F1 anticipation / F2 intermediate forward bracer strike / F4 recovery, then show full four poses for player review. No new F3 generation/reapproval; no unseen-pose/VFX/GIF/timing/runtime approval inferred. Follow pose review → separate source/contact VFX → normal/slow/no-effects/both-facing/Idle-return GIF review → executable-contract review → integration/release → phone acceptance. Current art slice does not change deployed runtime.

Permanent scale rule: use approved body/equipment authoring density and ground anchor, inspect multiple stable anatomy/equipment landmarks plus actual built-app transitions. Neither canvas bounds, crouched height, a single projected skull span nor descriptor conformance establishes visual scale. Preserve P2 Move density0.9/display144×139.5/foot0 and original static baseline; do not restore25/32whole-body shrink. Separate character and VFX transforms. P1 COMPLETE/accepted P2 Basic/KO/art protected; ordinary Hit canceled, damage does not interrupt skill. Keep16MiB cap/131072reserve, gameplay/Tier/timing/AI/save/rewards unchanged. No P3/TD/main merge/replacement branch. Docs/art-only checkpoints[skip ci], no unchanged redeploy; fetch current feature HEAD and put all successor instructions in one self-contained copyable block.

## 2026-10-20 — P2 Move body-size correction DEPLOYED / PHONE REVIEW PENDING

Player12:43 confirms ready/Idle and fighting size normal, only Move shrinks (IMG_2688/2689). Root confirmed: previous25/32posed-face calibration applied0.78125to the entire Move body. **Do not restore that invalid calibration or treat descriptor agreement as visual acceptance.** Source fix `0fe44b3c5eed46402d0394af6dff128a72be7393` restores original approved Move body authoring density0.9/display144×139.5 for160×155packed cells, preserving foot0 and original pixels/cadence. Idle/Basic/KO and P1/P3–P5 catalog deep-equal prior. Generic renderer/calibration code unchanged, no character branch/extra post-render multiplier. Report `docs/verification/P2_MOVE_BODY_FIX.md` supersedes earlier pending/no-repro claims for this Move-size scope.

DEPLOYED: Actions39371658550 build118460665060/deploy118461659898 SUCCESS. Local115affected +Build/81guard PASS; independent bulk regression RED old data→GREEN. Basic Chromium4cases44screenshots, actual mobile Chromium/WebKit6cases, actual built-entry P1–P5 trace4cases/32sequences/880samples/24KO/Retry/Restart/Exit PASS; four old presenters closed/0bytes. Public16complete files exact SHA256 match CI/local;104local build files equal Pages artifact. Evidence/trace/QA in P2_MOVE_BODY/. Full suite not rerun; five existing failures remain documented.16MiB/131072reserve and39required keys16,639,660bytes unchanged. No new art/gameplay/FX/KO/other actor changes.

NEXT ONLY player phone Move-size review at https://hansen0318.github.io/shanhaijing-arena/?v=0fe44b3c5eed46402d0394af6dff128a72be7393 : ready→Move→stop→Basic→Move. **ENGINEERING PASS / DEPLOYED / NOT PLAYER VERIFIED**. Heavy stays paused until explicit scoped sign-off; P1 COMPLETE and HeavyF3 approval protected; no P3/main merge. Preserve original approved body density only after comparing actual body/equipment/poses; neither equal canvas bounds nor posed skull length alone establishes size. New handoffs single complete copyable block, latest docs checkpoint is containing commit, fetch fresh. Evidence closure[skip ci], not a new source release.


## 2026-10-20 12:43 — player isolates Move shrinking / correction release pending

Player confirms countdown/Idle and fighting size normal; **only Move is too small**, with IMG_2688/2689 phone evidence. This supersedes old next-only phone-review/descriptor-conformance reasoning. Root: prior Move face25/32 normalization shrank entire approved body by21.875%; a renderer matching that bad descriptor was not proof of correct body scale. Fix only P2 Move authoring-density data back to0.9 (144×139.5 packed frame), retain grounded foot0/origin153/155. Original PNGs, Idle/Basic/VFX/KO and P1/P3–P5 all protected; full catalog deep-equality outside P2 Move verified. No renderer character exception or post-render multiplier. Authoring-grid/body/equipment comparison, not posed skull length or silhouette-height fitting, owns this correction.

Report `docs/verification/P2_MOVE_BODY_FIX.md`, measurements/old-new source board in `P2_MOVE_BODY/`. Independent equipment-area regression RED on old data→GREEN;115affected PASS +Build/81guard PASS. Existing decoded39keys16,639,660bytes/16MiB+131072reserve unchanged; five old full-suite failures retained, not rerun. REAL BROWSER/DEPLOY/PUBLIC PENDING, NOT PLAYER VERIFIED. Release gates existing Basic raster +6mobile entry cases +4case actual built-entry P1–P5 trace before Pages; `[move body release]` adds no bypass. Continue only measured release/fingerprint/scoped P2 phone review; no Heavy/P3/new art/main merge. Latest checkpoint is containing commit; fetch fresh.


## 2026-10-20 — scale diagnostics complete / existing release verified / PHONE SIZE REVIEW PENDING

Authoritative report: `docs/verification/P2_STATIC_SCALE_EXECUTABLE.md`; summary/complete compressed trace/public fingerprints in `docs/verification/P2_STATIC_SCALE/`. Existing static correction **already DEPLOYED** at `2d83ef6c2a753a77a92b2c2379dace4663866dee` (Actions39247774008); public16/16 complete files exact match CI/local,104/104 local built files equal actual Pages artifact. Previous deployment-pending entries are historical. User's earlier phone-loaded SHA remains unknown; do not assume stale cache or acceptance.

Final test-only probe403176fb5a864fde538c4f8a916d8be99d68e247 / Actions39346391924 build118380181357 SUCCESS, deploy SKIPPED. Actual built campaign entry/UI/countdown, real session Basic and movement retreat>2units (minimum3.4775), normal/reduced×both directions:4cases/32actor-sequences/880samples acrossP1–P5,24real KO actors, four result-Retry and in-battle-Restart zero-byte cleanup/Exit PASS. No residual actor/parent/VFX multiplier reproduced. P2 before/after Idle exact144×144/source/origin, authored face22.5/foot0. This is **DIAGNOSTIC PASS / FIELD DEFECT OPEN / NOT PLAYER VERIFIED**, not independent full-body anatomy or physical iOS proof. P1 non-Basic completed evidence reused; no full P1 replay. Fresh affected115/115 +Build/81guard PASS; full suite not rerun and five prior failures remain named in static-fix report.16MiB/131072reserve unchanged.

No production source/art/VFX/gameplay/KO changes or new deployment; only diagnostics/evidence. Invalid initial getter-hp KO probe and subsequent result-vs-battle navigation timeout are disclosed in report; only final actual-damage/Retry trace owns complete evidence. NEXT ONLY targeted player P2 phone review at https://hansen0318.github.io/shanhaijing-arena/?v=2d83ef6 . If it still fails, isolate time-aligned source frames plus face/trunk/equipment/limb/ground landmarks, not a guessed scale. Do not declare fixed/resume Heavy before player confirms. HeavyF3 protected; P1 COMPLETE closed; no P3/art generation/main merge. Evidence closure[skip ci], latest HEAD is containing commit; successor instructions one complete self-contained code block.


## 2026-10-20 Chat-first scale-defect gate — user reports post-attack growth / move-away shrink

Player still observes P2 猼訑 actor **enlarge immediately after attack and shrink upon moving away from an enemy**. This supersedes any earlier assumed acceptance of size correction. **Do not claim the 2026-10-19 static-baseline engineering fix solved this field defect, or claim it was deployed without reading fresh HEAD/Actions.** The known 2026-10-19 correction already restores original static PNG, calibrates Move & Basic to 22.5-world facial landmark and foot=0. It passed 115 affected tests + build, while browser/deploy/physical player verification were pending at the time of that report. Reuse that patch, do not remake it.

**Chat-only technical diagnosis/preflight:** symptoms are compatible with persistent actor scale/state selection errors; distinguish (a) canonical static asset being replaced after cast, (b) Move/Idle/Basic/attack descriptors each having different authored landmark densities, (c) wrong actor root scale/origin surviving completion, (d) renderer accidentally applying VFX transforms to character sprite, (e) asset fallback/cold-load/restart differences, and (f) CSS viewport zoom (a separate previously addressed bug). Do not assume a single root without **time-aligned actual app** evidence. Character's on-screen silhouette height is not a valid scale invariant for crouched/lunging frames. Compare face/cranial landmark, trunk thickness, equipment proportions, foot baseline and the transform matrices/texture keys while distinguishing opponent proximity from attack/idle transitions.

**Remaining executable-only work for Work:** fetch current HEAD and release provenance; instrument actor draw/state switch at IDLE→MOVE4→BASIC4→IDLE and at target approach/retreat; save timestamps/frame labels, source texture dimensions, normalized landmark pixels, world display scale, origin and parent transforms; reproduce failure in *built* app UI with actual enemy nearby, then add a targeted RED regression, patch the **shared data-driven** descriptor/calibration only if truly needed, verify GREEN & unaffected actor/FX values. Check P1–P5 with same diagnostic harness, **do not modify accepted art or force same size across different characters**. Check normal/mirrored/reduced, KO, restart, real mobile viewport navigation. Run targeted tests/build/cache/real-browser verification; deploy only a changed tested release, record fingerprint vs blocked connectivity separately. Ask for only the affected P2 size correction phone sign-off. P2 Heavy remains paused, approved Heavy F3 protected; P1 COMPLETE remains closed; no new art, no main merge.

**Stop condition:** do not call a geometry proxy or CI screenshot PLAYER VERIFIED. If actual source matches approved scale but no repro is observed in fixture, record missing real-device evidence and isolate the discrepancy rather than gratuitously modifying source. If current HEAD already fixed it, avoid a no-op redeploy; compare the user's reported page/source version and provide a target-built-app URL. This Chat entry contains **design/preflight only**: no runtime modifications, tests, CI or deployment were executed by Chat.


## 2026-10-19 — P2 STATIC-BASELINE SIZE DEFECT / correction release pending

Player IMG_2674/2675/2676 reports Idle/Move/attack size mismatch and explicitly requires the pre-animation static size. This is NOT acceptance of previous Basic/body or viewport fixes. Root and correction: docs/verification/P2_STATIC_SCALE_FIX.md. Restore exact originally approved static PNG (27c65e3f…a0d2b8) and144×144 canvas, align Move/Basic face22.5world and foot0 with shared data calibration, preserve all source bytes/gameplay/independentFX. Previous Idle strip F1 was smaller than original static; do not mix its density with another source. Retired-F1 regeneration binding excluded.

Engineering115/115 affected tests + Build/81guard PASS; full927:922PASS/5preexisting FAIL explicitly named in report (baseline925/6FAIL).39keys16,639,660bytes +131,072reserve retained with6,484extra; no cap raise. Corrected actual-browser continuity/release checks pending; no player PASS. Heavy paused, P1 COMPLETE and F3 approval protected, no P3/main merge. NEXT verify/deploy exact correction, inspect actual static→Move4→Basic4→Idle raster and real app mobile UI, then targeted player phone review. Prior phone-only handoff is superseded by this new defect. GitHub remains authoritative; all successor prompts one complete code block.

## 2026-10-19 — Mobile viewport fix DEPLOYED / PHONE REVIEW PENDING

Public exact-byte verification BLOCKED by host proxy CONNECT timeout (not evidence of a site outage); downloaded actual CI Pages artifact matches local build15/15 files. See public-fingerprint.json: publicVerification=false. Deployment success and browser gate PASS are independently established; do not misreport public hashes or redeploy unchanged code for this network failure.

Player reports whole-page enlargement/clipping and unusable game (IMG_2661/2662); this is not actor-scale approval. Actual built-app diagnostic reproduced the menu failure at visual page scale2/3: visualViewport shrank while CSS-vw typography retained layout width. Fix shares logical viewport and inverse visible transform across Campaign/Arena/Orientation/Exit, and prevents scroll Event from enabling reload-only height stabilization. No actor/art/combat/save/Tier/memory changes; no zoom-prohibition meta.

Release50f303db304f427ca80c1c9c4e0b0b101859b392 DEPLOYED: https://hansen0318.github.io/shanhaijing-arena/?v=50f303d . Actions39202217431 build117897526482/deploy117898058327 SUCCESS. Scoped54/54 + Build/81-file guard PASS; additional local arenaInput4/4 PASS. Actual Chromium/WebKit6mobile-emulation cases/39screenshots PASS, including landscape/short/portrait→landscape/reload/menu returns, Chromium zoom1.5/2/3/restoration and real Chapter→Stage→Team→Battle→canvas portrait a1 selection→Pause→Exit→menu at zoom3. Three representative release screenshots inspected and retained. These are not physical iOS/touch/FPS or Basic size acceptance. Evidence docs/verification/MOBILE_VIEWPORT_FIX.md and MOBILE_VIEWPORT/{probe,release,public-fingerprint.json}.

NEXT ONLY player phone check of whole-page fit/menu/battle/Exit and prior Basic size continuity; both fixes remain NOT PLAYER VERIFIED. Heavy production paused; HeavyF3 approval, P1 COMPLETE and other prior acceptance protected. No new art/P3/main merge or unchanged redeploy. Permanent release rule: direct Arena fixture is not actual mobile app UI proof; viewport/layout changes require real built-app navigation, scale/offset/rotation/reload, transformed canvas pointer and body-modal coverage before deployment. Diagnose page geometry separately from actor landmarks. Every successor prompt one self-contained copyable block; latest containing feature docs commit is authoritative, docs-only closure[skip ci]. Older “NEXT ONLY Basic review” entries below are superseded by this critical UI defect scope.

## 2026-10-19 — Basic size correction DEPLOYED / PLAYER SIZE REVIEW PENDING

Scoped release4607a6bee2675ddf812c5387d787e128969ea684 is DEPLOYED. Actions39179339552 build117828553702/deploy117828757017 SUCCESS; scoped67/67 + Build/guard81/81 PASS. Actual Chromium/Phaser WebGL normal/reduced×left/right4cases/24screenshots PASS; six inspected/retained screenshots. Body177.75×160.875 matches22.5px reference landmark, foot/mirror/true250ms hit/miss/source/contact/Idle/Pause/direct-destroy validated. Controlled fixture is not automatic AI/UI/mobile/FPS/GPU proof. Existing gameplay/cadence/Tier/art/FX geometry,39required keys16,630,060bytes+131,072reserve retained.

Public15files(index+2JS+CSS+11runtime PNGs) exact bytes match downloaded actual CI Pages artifact12155054593 and local build. Large transfers reconstructed from complete HTTP Range parts, not sampled hashes. Live https://hansen0318.github.io/shanhaijing-arena/?v=4607a6b . Evidence docs/verification/M5C_P2_BOTUO_BASIC_BODY_SCALE_RELEASE.md and P2_BASIC_BODY_SCALE/release.json,public-fingerprint.json,browser/. Heavy F3 receipt remains PLAYER APPROVED; P1 COMPLETE and old Basic acceptance other than this reported defect stay protected.

NEXT ONLY targeted player review: 猼訑Basic size continuity from Idle/Move through attack and back. **NOT PLAYER VERIFIED for this size correction until explicit confirmation.** Do not redo F3/art/GIF/250ms/fullP1 or redeploy unchanged release; do not start Heavy poses/P3/main merge. After player confirms, record scoped size-fix acceptance and resume already-approved HeavyF3→remaining poses. This evidence-only closure uses[skip ci]; docsHEAD can be newer than deployed source. Fetch latest containing feature commit; current successor docs/handoffs/P2_BOTUO_BASIC_SCALE_NEXT_WORK.md, every successor in one complete copyable block. Older pending entries below are historical.

## 2026-10-19 — Basic size-fix scoped release AUTHORIZED / pending

Player「完成了嗎，未完成就繼續」at08:05:55+08:00 responds to explicit browser→deploy→fingerprint→size-review next step. Continue that bounded release from3f85dd5; no new art/Heavy production/main merge. Existing feature/PR1 Pages pipeline flags[botuo basic release][botuo body scale] run only67affected checks, Build/guard and updated real Chromium checker before deploy. Evidence/authorization: docs/verification/M5C_P2_BOTUO_BASIC_BODY_SCALE_RELEASE.md. Release/browser/public/phone results remain pending until measured. Prior engineering, F3 approval, other character acceptance and16MiB/reserve protected. Evidence closure[skip ci]; latestcheckpoint is containing commit, fetch again.

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

## 2026-10-18 — P2 Basic composite GIF CANDIDATE / PLAYER REVIEW PENDING

Player at2026-10-18T17:22:42+08:00:「好接下來是做gif給我確認嗎，是的話就給我連結看」, following「未完成就繼續」, explicitly authorizes advancing the presented pose set into a GIF preview. This supersedes the prior stop-before-GIF pointer for **preview production only**. Do not fabricate a separate per-pose approval statement: F3 remains explicitly PLAYER ART APPROVED; F1/F2v2/F4 are authorized preview inputs, with their final visual acceptance pending composite review. No runtime/deploy authority inferred.

Completed at recovered feature `dec02b2786b8d3829a5b4cb0b01350e62023a9bd`: two new independent Basic horn-force/source and crushed-stone/contact VFX; deterministic full-canvas safe cells using author-selected skull-height density/common XY scaling and hoof baseline; normal/3×slow composite, character-only normal/slow, static reduced-cue preview, both directions and approved Idle return. Sources/prompts/QA/manifest/checksums: `docs/art/candidates/botuo/basic/composite-review-v1/`; reproduce `python scripts/prepareBotuoBasicReview.py`. Normal GIF SHA256 `55c70c31141da605ee16f558bc6c9629c1ceeab73acb3314a2b3066d1c98ae9d`; slow `8f9fd7662e54565ff6fdfe5e709fd4862f0e3b819a85bfe7c777dec4829ab553`. Normal2800ms/slow8400ms include both directions and Idle; decoded minimum holds40/120ms, exact paletted pixel/timeline roundtrip PASS. Character cells preserve every resized source pixel with >=35px alpha padding; masters/approved sources unchanged.

**GIF/VFX CANDIDATE / PLAYER REVIEW PENDING. NEXT: player reviews linked normal/slow GIF for obvious body articulation, independent outgoing/contact visibility, identity/scale/grounding, left/right and Idle return.** Preview F1/F2/F3/F4=160/80/160/160ms, contact240ms after visual action start, is not an approved gameplay delay; real Basic remains windup0ms. Neutral marker is schematic, no real HP/damage/collision proof. No runtime integration/ENGINEERING PASS/build/deploy/phone acceptance. Existing16MiB limits/reserve and accepted P1/P2 base/Move/KO remain protected, generic Hit stays CANCELLED. Source-to-Idle scaling/visible-ground alignment are review transforms, not runtime descriptor edits. Checkpoint `[skip ci]`, no main merge/P3. Updated successor: `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`. Always fetch latest containing feature commit on recovery.

## 2026-10-18 — P2 Basic F3 PLAYER APPROVED / F1-F2-F4 CANDIDATES

Player at2026-10-18T15:36:06+08:00:「好f3我approved，繼續，要確保未來動畫東西要足夠明顯」. **F3 PLAYER ART APPROVED**, exact immutable source19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36; receipt `docs/art/approved/botuo/basic/f3-v1/acceptance.json`, checkpoint `cfd2b22c56e995a528909af08a5a491e490c3afa`. F1 rear load, F2v2 forward release, F4 guarded recovery now **ART CANDIDATES / PLAYER REVIEW PENDING** at `docs/art/candidates/botuo/basic/phase-poses-v1/`. Static four-pose light/dark/small-size comparison, individual prompts, originals, rejected F2v1 history, reproducible PNG/alpha/bounds/hash report retained. Latest feature checkpoint is the containing commit; fetch remote again.

**Permanent visibility requirement:** articulated load/release/contact/recovery must be clearly different with effects OFF; review normal-speed and small/mobile-scale playback later, never assume a large still proves battlefield visibility. Caster/source effects and real-target impact must each be unmistakable, with Basic<Heavy<Special<Awakening escalation and distinct signatures; reduced motion retains readable static cues. Achieve this with pose/silhouette/value/independent FX and appropriate existing event-owned finite holds, not actor enlargement, invented hits/range, or unapproved HP/cast timing changes. Current static QA is a uniform source-scale study, not actual phone proof.

**NEXT ONLY: player reviews F1/F2v2/F4; F3 is closed.** Then accepted-pixel safe normalization + independent VFX + normal/slow/effects-off/mirrored/Idle-return GIF review. No VFX/GIF/runtime/deploy acceptance inferred. Basic still windup0ms/one real immediate hit; any timing change needs separate exact approval. P1 COMPLETE, generic Hit CANCELLED, all P1 and P2 base/Move/KO assets protected. Actual checks: PNG decode, visible-edge/border-alpha/hash/opaque QA, whitespace/protected paths; raw alpha1 border noise preserved/reported, no full-alpha-clear or runtime-ready claim. No suite/build/Pages rerun. `[skip ci]`, no main merge/P3. Current spec `docs/M5C_P2_BOTUO_BASIC_ACTION.md`; successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`.

## 2026-10-18 — Current P2 Basic art gate / protected closure

P1 is COMPLETE BY EXISTING ACCEPTANCE EVIDENCE, generic Hit CANCELLED / NOT REQUIRED. P2 accepted identity/static Idle/Move/KO stay protected; actual approved gold beast-face bracer/red sash images supersede older unaccepted gray/plain-guard suggestions. Current first unfinished gate is Basic「角擊」ONE F3 **ART CANDIDATE / PLAYER REVIEW PENDING** at `docs/art/candidates/botuo/basic/key-pose-v1/`; source SHA256 `19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36`. Read `docs/M5C_P2_BOTUO_BASIC_ACTION.md` and current top WORK_PROGRESS/STATE; do not follow historical P1 Hit/P2 Idle/Move-pending pointers. No remaining poses/VFX/GIF/runtime/deploy before the corresponding player gates. Current Basic remains immediate single hit, no P1 windup inheritance; preserve real Tier controls. No main merge/P3, no repeated accepted tests/deploy. Successor handoff: `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md` (one complete code block).

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
This repository is a new game project: **Shanhaijing Arena**. It is independent from `shanhaijing-td`.

These rules are permanent for substantial Chat / Work / Codex development unless the user explicitly changes them.

## 0. Mandatory pre-action rule refresh
Before Chat, Work, or Codex analyzes, recommends, edits, generates assets, prepares a handoff, or decides verification scope for any substantial project task, it must first re-read the current project hard rules from GitHub and recover the latest authoritative state relevant to that action.

Minimum pre-action check:
1. read the latest `AGENTS.md`;
2. read `docs/DEVELOPMENT_PLAYBOOK.md`;
3. read `docs/PROJECT_BOUNDARIES.md` when scope/architecture contamination could matter;
4. read the top CURRENT HANDOFF POINTER in `WORK_PROGRESS.md` and AUTHORITATIVE CURRENT STATE in `docs/STATE.md` when the action depends on current progress;
5. read only the relevant current spec(s) for the proposed action;
6. only after that decide what Chat can finish itself, what remains executable-only, and what should be handed to Work.

Do not rely on conversation memory, an earlier prompt, or a previous recovery when newer GitHub state may exist. If the hard rules or authoritative state changed, the latest repo state wins unless the player explicitly overrides it.

**Chat-first must be applied before every Work handoff, not merely at milestone start.** Chat must finish every safe task available to it first, including rule/spec updates, GitHub inspection, static/code analysis, asset preparation, exact source-delta preparation, and bounded repo edits. A Work prompt may be produced only after the remaining task has been reduced to the smallest irreducible executable/runtime delta.

**All player-facing handoff/instruction prompts must be one-click copyable.** Whenever Chat gives the player text intended to be pasted into a new Chat, Work, Codex, or another execution session, it must provide exactly one complete self-contained copyable code block for that destination. Do not split the instruction across prose plus multiple blocks, do not provide long/short competing versions, and do not make the player manually reconstruct missing context. This applies to new-Chat recovery prompts as well as Work prompts. Put this requirement near the top of successor prompts so the next Chat preserves the same behavior when it later produces another handoff.

## 1. Operating model
- **User / Product Owner**: final decisions and acceptance.
- **Chat**: game design, visual direction, specifications, defect analysis, acceptance criteria, bounded repo edits that can be independently verified.
- **Work**: substantial implementation, integration, executable test/debug loops, browser/runtime smoke, optimization, Git operations, deployment.
- **GitHub**: single source of truth. Conversation memory is not authoritative.

## 2. Chat-first delegation / minimum Work scope
**Token/session efficiency is a hard rule.** Before delegating anything to Work, Chat must complete the maximum safe, order-independent scope it can reliably do with available GitHub, file, image, reasoning, and bounded-edit tools.

Typical Chat-owned work:
- requirements/specification and decision locking;
- GitHub inspection and state comparison;
- architecture decisions;
- documentation/hard-rule updates;
- root-cause narrowing;
- static/code review;
- asset inventory, visual direction, image/static inspection;
- bounded repository edits that can be independently verified without a full runtime;
- preparation of exact acceptance criteria and the smallest Work handoff.

Work receives **only the irreducible executable delta** that genuinely needs its environment, for example:
- checked-out repository + iterative multi-file implementation;
- dependency installation/build tooling;
- executable TDD/debug loops after substantial code changes;
- browser/runtime/devtools verification that cannot be delegated to the player;
- long-running integration/optimization;
- merge/deploy when Work owns a substantial implementation.

If a task mixes Chat-owned and Work-only parts, Chat finishes its part first and then hands Work only the unresolved engineering delta. Do not send Work to rediscover design, repeat documentation, redo static analysis, or execute broad checks merely for convenience.

## 2A. Runtime-safe multi-frame sprite normalization
For any authored multi-frame battle sprite strip (locomotion, action/cast, hit, KO, or future flipbook animation), a visually acceptable raw strip is not automatically runtime-ready.

If any frame silhouette approaches a cell boundary, frame spacing is ambiguous, or neighboring-frame bleed cannot be ruled out, Chat must prepare and verify a **runtime-safe normalized derivative before runtime integration**:
1. use the player-approved strip/source as the only art source;
2. isolate each frame's intended character silhouette and remove pixels belonging to neighboring frames;
3. apply one uniform scale policy across the sequence unless the approved animation explicitly requires otherwise;
4. place each frame into its own fixed cell with transparent safety padding;
5. preserve the approved frame order and the intended shared anchor/baseline family;
6. inspect every cell independently, including alpha bounds / edge clearance, and confirm no horn, fin, hair, fur, cloth, weapon, limb, VFX fragment, or other body part leaks from an adjacent frame;
7. generate review animation previews only from the normalized safe strip when normalization was required;
8. do not hand the asset to Work or integrate it into the repo until the no-bleed check passes.

Normalization is an asset-preparation step, not a redesign. It must not invent new poses, change character identity, alter gameplay coordinates/speed/geometry, or reorder approved frames.

## 2B. Character-first temporary completion order
For Chapter1 playable-character production, finish one character through its current base-presentation lifecycle before starting the next unfinished roster character.

A character is only **temporarily complete** when all three stages below are player-verified:
1. **identity/static presentation** — Concept → portraitSquare → collectionArt → Battle Simplification → static battleIdle → Static Runtime Readability;
2. **locomotion** — creature-appropriate move animation authored from the approved battle identity, runtime-safe normalized when needed, integrated, deployed, and player-verified;
3. **death / KO** — approved static death/KO image, integrated through the shared battleKo path, deployed, and player-verified.

Only after stages 1–3 are closed may production advance to the next unfinished roster character, unless the player explicitly reorders the sequence.

This temporary-completion rule does **not** require Basic / Heavy / Special / Awakening action animation, Hit reaction, or VFX. Those remain later shared gates unless separately authorized.

## 3. Mandatory zero-context bootstrap
A new Chat / Work / Codex session must be able to continue without the player reconstructing the previous conversation.

Before substantial work:
1. inspect/sync latest remote `main`;
2. read this `AGENTS.md`;
3. read `docs/DEVELOPMENT_PLAYBOOK.md`;
4. read `docs/PROJECT_BOUNDARIES.md`;
5. read the **CURRENT HANDOFF POINTER** at the top of `WORK_PROGRESS.md`;
6. read `docs/STATE.md`;
7. read only the system specs relevant to the next action;
8. inspect any recorded active feature branch / PR / safe checkpoint;
9. continue from the first unfinished item only.

Do not ask the player to restate prior decisions unless canonical repo documents are genuinely missing or contradictory.
If `docs/STATE.md` names an accepted/player-verified baseline document, that baseline is a mandatory relevant spec for recovery and supersedes older historical handoff entries for the same presentation/scope. Do not regress to an earlier provisional version merely because it appears later in a long history section.

## 4. Recovery: never redo completed work
After interruption or when starting a new Work:
1. check whether the recorded feature branch exists remotely;
2. inspect branch / HEAD / status / diff;
3. recover the latest safe checkpoint;
4. reuse recorded PASS evidence unless a later change can materially invalidate it;
5. continue from the first unfinished item only.

Do not reimplement committed/pushed work merely because the session is new.

## 5. Safe push checkpoints are mandatory
For multi-step or long-running work, do not keep substantial completed work only in a local workspace.

Create `commit + push` checkpoints when applicable:
1. design/spec or preflight completed;
2. deterministic/core implementation completed;
3. major integration slice completed;
4. before long browser/runtime smoke;
5. whenever session/token/environment interruption risk increases.

A checkpoint is recoverability evidence, **not** a completion/PASS claim.

## 6. Session/token exhaustion procedure
If a Work/Codex session may end before completion:
- stop starting new scope;
- preserve the coherent current state;
- update `WORK_PROGRESS.md` with:
  - active branch;
  - latest safe checkpoint SHA;
  - completed work;
  - remaining work;
  - tests/checks actually run and results;
  - known failures/root cause;
  - exact next step;
- commit/push that state before stopping whenever the environment permits.

If push is impossible, explicitly report that work may exist only locally. Recovery must locate and push it before new development continues.

## 7. Progress documentation is mandatory
`WORK_PROGRESS.md` is the compact project handoff record.
`docs/STATE.md` is the canonical milestone/scope state.

After every meaningful implementation slice, update them before handing off.

At minimum record:
- current milestone;
- current branch / PR;
- completed items;
- locked decisions affected;
- pending items;
- actual verification results;
- known blockers/defects;
- exact next action.

A stale progress/state file is a handoff defect.

## 8. Decision hierarchy
1. Latest explicit user decision.
2. Accepted ADRs / locked decisions in `docs/decisions/`.
3. Current canonical system specs under `docs/`.
4. Existing implementation.

If implementation conflicts with a higher-priority source, stop and report the conflict instead of inventing a new rule.

## 9. Scope discipline
Current milestone is defined in `docs/STATE.md`.

For M0, do not add campaign UI, progression, shards, Tier upgrades, story content, or a large roster unless `docs/STATE.md` explicitly moves the milestone forward.

Avoid unrelated refactors during feature work.

## 10. Engineering architecture rules
- This is a new game architecture; do **not** port tower-defense gameplay assumptions or code.
- `docs/PROJECT_BOUNDARIES.md` is mandatory and defines the contamination firewall.
- Keep systems modular: Character, Controller, Ability, Targeting, Movement, Status, Camera, Team, Battle.
- Player input overrides AI immediately.
- When valid manual combat input is released, full AI control resumes immediately (0s), per the accepted M0/M2 baseline.
- Selected character, camera target, and skill HUD remain unchanged during that handoff.
- No AUTO/MANUAL indicator is shown.
- Basic attack is automatic and has no dedicated player button in v1.
- Prefer data-driven character/ability definitions over hard-coded per-character logic.
- AI and player input must feed the same shared character/ability systems; do not create duplicated manual/AI combat engines.
- Add machine-checkable tests for deterministic rules where practical.

## 11. Verification vs player-owned smoke
Keep engineering verification and player acceptance separate.

**Player smoke is the default for checks the player can efficiently perform on the real device/build**, especially:
- game feel / fun;
- touch-control feel;
- camera comfort;
- visual readability;
- animation/VFX clarity;
- balance feel;
- device-specific layout;
- short end-to-end play confirmation after a localized change.

Work should not spend session/token budget duplicating player-owned smoke unless:
- the user explicitly asks Work to do it;
- an automated/browser check is required to diagnose a defect;
- release cannot be considered technically safe without that runtime evidence.

When player smoke is appropriate, Work/Chat should deploy or provide a testable build and give the player a **small targeted checklist for the changed scope**, not ask them to replay unrelated content.

Use precise status labels:
- **ENGINEERING PASS**: all required engineering checks owned by the executor passed.
- **ENGINEERING PASS / PLAYER SMOKE PENDING**: engineering checks pass and only targeted player/device acceptance remains.
- **PASS / PLAYER VERIFIED**: the required player smoke was actually confirmed.
- **FAIL / INCOMPLETE**: a required engineering check failed or required executor-owned verification could not be completed.
- **RELEASE BLOCKED**: engineering passed but merge/deploy cannot be completed due to a concrete blocker.

Never claim player-verified visual/gameplay success before the player actually confirms it.

## 12. Risk-based verification: test only what the change can break
Verification scope must be proportional to change impact. **Do not automatically run the entire test suite or full game flow for every small edit.**

Use the smallest sufficient layer:
- **Level A — static / local check**: documentation, isolated data, naming, or a trivially bounded helper with no shared runtime effect.
- **Level B — targeted tests**: default for small/local code changes. Run tests covering the touched module plus directly affected contracts.
- **Level C — impacted regression**: use when a shared subsystem changes. Test the affected dependency surface, not unrelated gameplay.
- **Level D — full regression / broad runtime smoke**: reserve for changes to shared architecture, battle lifecycle, persistence/progression, build/release infrastructure, dependency upgrades, large refactors, or when narrower evidence cannot establish safety.

Rules:
- A previously recorded PASS remains reusable evidence when later changes cannot materially affect that verified scope.
- Do not rerun a full suite merely because the session restarted.
- Do not replay the whole game when only one bounded mechanic changed.
- If a targeted test fails in a way suggesting wider coupling, escalate the verification scope.
- Before final release, use the minimum release checks appropriate to the actual changed surface; a full regression is not ceremonial.

For M0, the eventual complete prototype release must have evidence for:
- 3v3 battle completion without player input;
- manual override and immediate 0s AI-resume;
- KO/team switching/victory-defeat;
- type-counter correctness;
- stable landscape runtime for the integrated combat surface.
This does **not** mean every intermediate edit must rerun all of them.

## 13A. Current branch / merge policy
- The current project is intentionally continuing on the recorded long-lived feature branch / PR while milestone work remains in progress.
- Recover and continue the branch/PR named in the CURRENT HANDOFF POINTER.
- Do **not** merge to `main` merely because a new Work session starts.
- Merge to `main` only when the current handoff explicitly authorizes it or the player approves milestone consolidation/release.
- Feature-branch Pages/public verification may continue when that is the recorded release path.

## 13. Default delivery flow
Unless the user explicitly requests feature-branch-only / no-merge / no-deploy:
1. implement on a safe feature branch;
2. create safe pushed checkpoints;
3. run required targeted/regression checks;
4. perform whole-branch review;
5. merge verified work to `main`;
6. deploy/release if the project has a configured public build pipeline;
7. verify the deployed build for the changed scope;
8. update `docs/STATE.md` and `WORK_PROGRESS.md` with release state and next action.

If the project does not yet have deployment configured, record that fact; do not invent a release claim.

## 14. Change traceability
For non-trivial changes identify:
- requirement/decision affected;
- files/systems changed;
- tests added/updated;
- known risks.

## 15. Art / asset rules
- **Player VFX size/readability escalation (2026-10-17):** read `docs/M5C_ART_ANIMATION_VFX.md` section "Large, unmistakable cast and impact VFX". Basic < Heavy < Special < Awakening must be immediately distinguishable in actual phone-scale effect footprint and impact emphasis, without enlarging the character or changing hit geometry. P1 Heavy corrected source33a0f21 is player-verified on2026-10-17; preserve this baseline. Next P1 Special must satisfy the same escalation/readability gates. Engineering PASS alone is never player effect-size acceptance.
- **Action art / VFX / GIF review workflow:** read `docs/CHARACTER_ACTION_ART_WORKFLOW.md` before authoring an attack animation. The player approved its staged process: F3 identity/weapon/pose review → four poses → independent VFX + composite GIF approval → explicitly scoped runtime integration/deploy → iPhone acceptance. Do not skip approval gates or promote candidate/process approval into asset approval. P1 engineering/deployment and the player's positive attack-visual feedback are recorded in that workflow and docs/verification/M5C_B_LUSHU_BASIC_RUNTIME.md; unreported device checks stay pending. Successors must read its reproducible case-study/recovery index and never reopen completed gates from historical pending text; preserve exact accepted pixels during deterministic packaging, not regeneration.
- Mobile readability over fine detail.
- **Roster-wide visual rendering language is locked.** All current and future playable-character formal art must stay within the accepted simplified 2D cel-shaded language: clean readable shape separation, controlled linework, flat/stepped shading, strong silhouette, limited micro-detail, and mobile-first readability. Do not switch a new character to photorealism, painterly/thick-rendered illustration, 3D-rendered/game-model aesthetics, watercolor, sketch-only linework, or another incompatible rendering system unless the player explicitly authorizes a project-wide art-direction change. Consistency applies across portraitSquare, collectionArt, battleIdle and later battle-state assets; detail density may differ by surface, but the rendering language must remain recognizably the same roster.
- **Default playable-character body plan is humanoid / anthropomorphic**, not a literal quadruped or natural-animal body. This is a production hard rule so locomotion, hit/KO/cast states, shared animation hooks, equipment handling, mirroring, and future character integration remain consistent.
- Preserve each Shanhaijing creature's defining identity through creature traits layered onto the humanoid silhouette: head/face treatment, horns/antlers, ears, tails, wings, fur/feather/scale patterns, skin coloration, markings, claws/hooves, appendages, or other canonical traits.
- **Humanoid body plan does not mean a shared human face template.** Default playable heads/faces should use a **species-derived mythic anthropomorphic face**: begin from the creature's species/skull/muzzle/eye/ear/jaw structure, then stylize it for expression and character acting. Avoid a roster of human faces differentiated only by ears, horns, hair or color.
- For repeated species families (for example multiple snake-, bovine-, boar-, deer/horse-, bird-, fox/canine-derived characters), add a second layer of **creature-specific facial morphology**: vary skull proportion, muzzle length/width, brow/eye placement, ear shape, horn topology, jaw, tusks/fangs, scales/markings and special organs so characters remain distinct even before costume/color.
- Facial anthropomorphism should preserve expressive acting for idle/hit/KO/cast/portrait use without collapsing the design back to a normal human face or a fully naturalistic animal head. Body-plan consistency and head/face morphology diversity are separate production rules.
- Clothing, armor, props, tools and weapons are **not restricted to the classical text**. They may be invented to communicate gameplay identity, Type, Role and ability language, as long as the creature remains recognizable.
- Visual gameplay language should reinforce mechanics where useful. Examples are non-exclusive: Blast characters may use explosive/energy-projecting devices or volatile motifs; Speed characters may use light gear, streamlined weapons or mobility-focused accessories; Power characters may use heavier weapons/gauntlets/armor or mass/impact motifs; flying characters may use wings, aerial gear or light silhouettes. Do not force every character into the same prop template.
- Prefer a shared humanoid action-animation vocabulary across the roster: locomotion, hit, KO, cast/attack anticipation and recovery should be reusable in structure even when the creature-specific motion differs. Current idle presentation is intentionally static; do not add breathing/idle loops unless the player explicitly reopens that gate.

- **Locomotion animation must match the creature/body fantasy while reusing shared runtime contracts.** Do not move formal characters as static images sliding across the arena once their locomotion gate is opened. Grounded humanoids use visible leg/foot steps plus coordinated arm/torso follow-through; winged/aerial characters use flight animation such as wing beats/glide/body pitch rather than fake walking; aquatic/fish-derived anthropomorphic characters may use a documented hover/float locomotion archetype with the body suspended above the ground, using fins/tail/clothing/body-wave follow-through instead of footfalls. Other future locomotion families may be added only as reusable data-driven archetypes. Movement animation must not change combat movement speed, collision, targeting, telegraph geometry or authoritative actor coordinates.
- **Action animation and VFX are paired presentation layers.** When a Basic/Heavy/Special/Awakening visual gate opens, author the short attack/cast body motion and the corresponding VFX timing together so anticipation, release/impact and recovery read as one move. VFX never changes gameplay hit geometry/timing by itself, and action animation never owns combat logic.
- Do not let decorative equipment obscure the creature-defining traits or the mobile combat silhouette.
- **Concept-detail and battle-detail are separate tiers.** Portrait / Collection / concept art may carry richer costume, material and ornament detail. Battle sprites must be deliberately simplified for mobile readability rather than downscaled copies of the concept sheet.
- **Character art production uses mandatory gated stages.** For every current/future playable character: Concept approval → Battle Simplification → Static Asset Pack (`portraitSquare`, `collectionArt`, static `battleIdle`) → Static Runtime Readability PASS → roster/batch comparison → later battle-action micro-animation (`battleCast` / attack action, and reaction states when authorized) + corresponding Skill VFX. **Idle breathing animation is currently removed from the production plan.** Do not author or integrate breathing/idle loops unless the player explicitly reopens that gate.
- **Generate only the asset owned by the current gate.** During character art authoring, do not generate composite/multi-panel sheets that include future-gate assets (for example Idle frames while only static `battleIdle` is authorized). Each gate produces/reviews one explicitly requested asset at a time from the latest approved character reference. Preview boards may be used only when the gate itself explicitly requests a board; otherwise they are invalid for production acceptance.
- **Approved character identity is the sole visual source for downstream assets.** Once concept/battle-simplification identity is approved, later `portraitSquare`, `collectionArt`, `battleIdle`, animation and VFX derivatives must preserve that approved face/species morphology, silhouette, palette family and equipment identity. Do not re-randomize/redesign the character between gates.
- **Static readability must stand on its own.** Animation, glow, trails, VFX, or constant secondary motion must never be used to rescue an unreadable static silhouette. If a static battle asset is unclear, simplify shapes, strengthen value/color separation, improve negative space, or reduce detail first.
- **Do not solve battle readability by progressively enlarging characters.** Keep the accepted shared presentation scale/layout unless a verified global layout change is required. Fix unreadable art through silhouette, color/value contrast, line/detail reduction, and composition before considering scale changes.
- Every playable character, present and future, must pass a **battle-readability simplification gate** before production battle assets are locked. At intended runtime size, identity must remain readable from large shapes first: body silhouette, head/species shape, major appendage(s), primary color blocks, one or two defining markings/props. Fine seams, small jewelry, tiny straps, dense hair/fur strokes and micro-ornament cannot carry identity-critical information.
- Battle detail budget is reusable across the roster: prefer few large color blocks, few broad markings, compact equipment, limited trailing elements, separated limbs/appendages and a clean outer contour. If downscaling causes head/weapon/tail/limbs to merge into one visual mass, simplify before integration.
- Each character must define an **identity priority hierarchy** for battle art. Lower-priority details are removed before higher-priority creature/role cues. This rule applies to Chapter1 and all future characters/archetypes.
- Prototype assets may be placeholders.
- **Placeholder retirement is asset-driven and roster-wide.** Prototype labels/cards/circles/rings/debug identifiers may be used only while the corresponding formal asset is unavailable.
- Once a formal asset resolves successfully for a surface/state, that formal asset must replace the placeholder on that surface; do not stack formal art with temporary SLOT/E1/E2 FRONT/A1/E1/name/debug labels, graybox body dots/rings, or equivalent development scaffolding unless that label is part of the final approved UI.
- This applies equally to allies/enemies and to every current/future character through shared asset/presentation logic; never implement character-ID-specific exceptions.
- Placeholder-only characters must still retain the fallback until their formal asset exists.
- **Battle HUD portrait facing is side-relative and roster-wide.** Ally-side portrait/card art uses the canonical portrait orientation; enemy-side portrait/card art is its horizontal mirror so opposing HUD cards face inward relative to each other. Implement by HUD side/presentation state, never by character ID. This applies to all current and future characters and does not replace the separate in-arena dynamic facing rule.
- **Portrait-card framing is face-first and roster-wide.** Wherever a square character portrait/card is used (battle HUD, Team Select lower roster, Collection grid, and future equivalent compact cards), frame primarily the head/face plus a small amount of neck/upper shoulder so identity is immediate. The face should occupy most of the square. Minor cropping of ears, horns, hair, ornaments or other peripheral appendages is acceptable when necessary, but eyes/muzzle/primary facial structure must remain clearly readable. Do not show a small full bust inside the square merely to preserve every accessory. Character Detail/full-body identity art is a separate surface and is not forced into this crop.
- **Approved Team Select full-body identity art is protected presentation and currently static.** The upper Team Select / matchup full-body preview must continue to use the approved `collectionArt` identity image with no breathing/idle transform. Do not substitute a battle sprite sheet, battleIdle frame, or lower-resolution battle asset. Arena idle is also currently static on the approved F1 presentation; later action-state animation (for example cast/attack) may temporarily replace that static idle only when its gate is explicitly authorized.
- **In-arena actor HP bars are roster-wide combat UI.** Every living battlefield actor carries an overhead HP bar positioned above the visible actor silhouette: ally bars use a blue gradient; enemy bars use a red gradient. The ratio must be derived from the same live actor HP/maxHP state used by the side HUD cards so the overhead bar and card can never disagree. This is presentation-only and must not create a second HP state or alter combat math. KO actors may hide the overhead bar.
- **Stage Select layout is data-driven and stage-wide.** Every current and future stage uses the accepted shared layout: text-free large preview image; right information stack ordered as chapter title → stage id/title → reward rows; chapter/stage labels larger than reward text; BACK lower-left; START lower-right; stage cards below; no new outer vertical scroll. Never special-case Stage 1-1 or a specific chapter for presentation.
- Do not produce final roster art before the combat prototype passes.
- Approved production art must not be regenerated/restyled merely because a new session begins.
- **Master/source assets and runtime assets are separate.** High-resolution PNGs may be retained as editable/archive masters, but gameplay must consume optimized runtime derivatives sized to the actual display footprint. Do not ship generated high-resolution source art directly when a smaller lossless/visually equivalent runtime asset is sufficient.
- Runtime optimization must preserve animation contracts: frames in one loop keep a common canvas geometry/origin unless the animation system explicitly supports stable per-frame pivots. Do not independently tight-crop frames if that creates anchor drift.
- Before integrating a new character animation, record source dimensions, runtime dimensions, encoded file size when practical, decoded texture footprint, frame count, and whether lazy/on-demand loading remains within the existing M5C-A cache/guard budgets. Optimize for mobile load time and memory without sacrificing the accepted small-scale readability.

## 16. Work handoff contract
Every Work handoff must be deliberately small.

Before creating a Work task, Chat should state internally/record in the handoff:
1. what Chat already completed;
2. the exact capability gap that requires Work;
3. the smallest implementation delta Work owns;
4. the minimum sufficient engineering checks;
5. which acceptance checks are delegated to the player;
6. where Work must checkpoint if interrupted.

A Work task must not contain broad phrases such as "fully test everything" or "recheck the whole game" unless the actual change impact justifies that scope.
A Work handoff must also be concise and execution-focused. Do not repeat long background already recoverable from GitHub, do not provide both a long and short version, and do not ask the player whether they want a shorter prompt. Give one compact, precise prompt containing only the unresolved Work-owned delta, exact constraints, minimum checks, and stop condition.

**Player-copyability is a hard requirement.** When Chat provides a Work prompt to the player, present exactly one final handoff prompt in a single copyable code block (or equivalent single-copy UI block) so the player can copy it in one action. Do not split the executable instructions across prose plus multiple prompt blocks. Supporting explanation may appear outside the block, but the block itself must be complete and self-sufficient. If a ZIP/package contains the canonical handoff file, prefer telling the player to attach that package and provide one short copyable launch instruction rather than duplicating a second long prompt.

## 17. Interruption protection / recoverability
For any substantial Work task:
- create the feature branch or recover the existing one before new implementation;
- push an early coherent checkpoint instead of waiting for final completion;
- checkpoint again before long browser/runtime steps;
- if session/token capacity becomes uncertain, stop adding scope and push immediately;
- update `WORK_PROGRESS.md` with latest remote SHA, completed work, remaining work, actual verification evidence, known failures, and the single next exact step;
- on the next session, recovery of the existing remote checkpoint happens before any reimplementation.

If push fails or the environment dies before push, the next session must first search the existing workspace/reflog/local branch for recoverable work and push it. Never silently start over.

## Self-contained ZIP handoff contract (player-approved 2026-10-14)
For asset/file handoffs from Chat to Work, Chat MUST prepare one self-contained ZIP including every required approved asset, necessary supporting files, checksums/manifest, and **START_HERE.md + WORK_HANDOFF.md** with complete bounded execution instructions (GitHub zero-context recovery, protected baselines, exact executable delta, tests, release/stop gate and player verification). Work must not need the player to paste a second lengthy prompt or manually assemble files. A new successor Chat must check this rule before every handoff. Do not put outdated or competing prompts in the package.
When a Work environment actually opens the attachment, it should extract the ZIP and read START_HERE.md then WORK_HANDOFF.md, then refresh GitHub and execute the authorized task. **Attaching ZIP alone does not guarantee that a new Work session starts or reads it automatically**; this depends on the product workflow. If the environment requires an initial instruction, provide ONE minimal copyable code block: "解壓縮附件 ZIP，先讀 START_HERE.md 與 WORK_HANDOFF.md，依最新 GitHub 硬規則執行；完成後停止。" Never claim zero-click autonomous execution without verification. No unattended background work unless the platform explicitly supports it.

## Approved multi-frame normalization — required pre-GIF process (player verified 2026-10-14)
When a player approves four poses as the art source, preserve that exact image and do not regenerate it merely to repair layout. A visually good four-pose collage is NOT automatically a sprite strip. Never create GIFs from naïve equal-width slices. **Chat owns the full safe preparation whenever available**: (1) identify each independent entire silhouette and its source bounds, separating any neighboring components/pixels; (2) remove background or fringe only by a color-faithful process that never deletes character colors; (3) individually extract the four frames, preserving fists, claws, tail, accessories and outline; (4) normalize into exactly four equal-sized transparent RGBA cells with generously clear horizontal/vertical safety padding; (5) align a common grounded baseline while keeping each full actor inside cell bounds; (6) inspect per-cell nonzero-alpha bbox, compare on light/dark backgrounds and ensure no neighboring-frame bleed/clipping/discolored fringe; (7) only then derive an animated GIF preview from the normalized cells, and obtain explicit player approval before Work integration. Runtime must animate `battleMove` only while moving, return to previously approved single-frame `battleIdle` when stopped, use the existing mirror contract, and preserve gameplay/stat/collision coordinates. Do not mistake alpha mode or even a successful crop for visual/no-bleed proof. Record exact approved source, normalized derivative hashes/cell geometry and PASS boundaries in progress/state. A Chat→Work package must include approved source, four separated PNGs, normalized strip, review GIF, manifest/checksums and complete START_HERE/WORK_HANDOFF; Work gets only integration/tests/deploy and phone-smoke handoff.
