## 2026-10-24 — 再確認：動作差異與大場面必須同時成立

玩家「special的嗎？動作和之前技能差別不大，是蓄力一樣，打出技能不同？」及「確認硬規則有寫技能的動作要夠差異化和明顯大場面，繼續修改f3」。既有全局硬規則明文要求四招在無獨立FX時也能立即辨認本體動作、輪廓、施力方向與節奏；不能共用相似持珠蓄力姿勢，再只換出手效果。Basic<Heavy<Special<Awakening同手機等尺度逐級擴大視覺場面，施法/真命中或真受益者效果須分別清楚、強烈且具招式特徵；治療/防禦用正確非傷害語言，不造假爆浪/受益事件、不放大角色/數值/判定。具體原條款：CHARACTER_ACTION_ART_WORKFLOW.md的Mandatory within-character attack motion differentiation與Mandatory action-power visual escalation；M5C_ART_ANIMATION_VFX.md的Large, unmistakable cast and impact VFX。規則已存在，本節是玩家再次強調與執行修正，非新玩法。

Special v2未獲美術核准、依玩家意見修正，原檔/manifest不改。v3單臂由下向上高托至額頭上方，另一臂向下後展至腹/髖側，形成上下對角輪廓；本體S曲線與尾鰭內捲，與Basic水平前射、Heavy雙手推環分開，亦保留Awakening雙臂高V的差異。v3仍是CANDIDATE，先審F3；完整治療泉花/施法大場面與同尺度FX比較是F3核准後的獨立VFX/GIF義務，不能用本張角色圖冒稱已完成。入口 docs/art/candidates/chiru/special/f3-v3/REVIEW.md；玩家核准前不做其餘姿勢/FX/GIF/Runtime/部署。

## 2026-10-24 — Heavy清晰版 PLAYER APPROVED／COMPLETE；新Work直接接Special回瀾

玩家「確認ok，紀錄，接下來我要開新的work無縫接軌接手下面的，確認好進度規則流程，就給我prompts，我要他讀取後直接做下面的」明確核准已呈交release30423cc清晰版。精確hash收據 docs/art/approved/chiru/heavy/clarity-v1/acceptance.json；原整體Heavy/runtime-v1與所有美術收據保持。Basic及Heavy已PLAYER VERIFIED；P3整角未完成。新Work直接執行Special「回瀾」第一未完Gate：沿核准spec做必要差異核對→一張F3角色關鍵姿勢候選→呈交停待玩家核准。獨立接手入口 docs/handoffs/P3_CHIRU_SPECIAL_NEXT_WORK.md。

本次首次輪到Special，完整解碼發現 whole-character/f3-batch-v1/special-f3.png 與 originals/special-f3.png 均損壞；原檔/manifest不動，證據 docs/verification/P3_SPECIAL_PREFLIGHT/WORK_LOG.md。新Work可依approved identity/Idle與核准spec重建單張Special F3，不能用截斷解碼假通過；沒有有效既有候選則不要求玩家審壞圖。不得重畫已核准Basic/Heavy或重跑已完成Heavy測試/Build/Browser/Pages。

最新全局逐招Basic→Heavy→Special→Awakening→Passive，單招F3→其餘動作/獨立VFX→GIF核准→Runtime/真驗證→正常Pages→玩家核准保持。全角色無FX可辨動作、Basic<Heavy<Special<Awakening視覺層級；治療用真受益者/泉花回流語言，不能套攻擊爆浪。保護approved masters/收據/尺度/anchor/懸浮下緣/右canonical左mirror與P1/P2；無固定16MiB限制，逐檔安全/required/回收保持。原生單人、同分支PR#1open/unmerged，不委派/新branch/worktree/TD/main merge。本次只有收據/文件[skip ci]，不改產品來源、不重跑已通過檢查。下方Heavy待觀察/不開始Special屬歷史，由本節覆蓋。

## 2026-10-23 — Heavy 湧浪 F3 v3 PLAYER APPROVED；新 Work 接續其餘姿勢與獨立 VFX/GIF

玩家原文：「我核准，紀錄規則進度流程，我會開新的work接手」。明確核准呈交checkpoint 5c555d9586a71ea6b0aa1e471c871dc4fd1144f2 的單張 Heavy F3 v3。精確收據 docs/art/approved/chiru/heavy/f3-v3/acceptance.json，圖源 docs/art/candidates/chiru/heavy/f3-v3/heavy-f3.png，SHA256 8943837f65e321bc2bd7290280af829801e9735cf3e3033300ba991314e694f6。F3 Gate CLOSED，不重畫、不重問；v2與舊batch不採用但保留。候選manifest的舊PENDING為呈交歷史，由新收據覆蓋，原檔/manifest不改。

唯一下一工作：沿此核准F3製作Heavy F1/F2/F4及三組獨立VFX（壓縮水環、粗浪柱、真命中爆浪），安全等尺度/共同anchor/懸浮下緣正規化，提供normal/slow/noFX/miss/mirror/Idle-return與適用reduced預覽。展示單招GIF後停待玩家核准；本次核准不含尚未展示姿勢、FX、GIF、Heavy Runtime或部署。新Work先讀 docs/handoffs/P3_CHIRU_HEAVY_NEXT_WORK.md；不重做Basic/P1/P2、不重做已完成前檢、不恢復整角批次。

全角色硬規則保持：無FX也能辨別Basic/Heavy/Special/Awakening動作；同角色同手機尺度Basic<Heavy<Special<Awakening，出手FX與真受擊FX分別清楚、逐級更大華麗、形狀/節奏各異，治療/防禦用正確非傷害語言；不靠擴大角色、改命中範圍或假爆破達成。Heavy前向單target有限lane、鎖定aim；F3發射點為蓄勢350/337.75/325.5/305.9ms，350ms後真結算，未命中不畫target爆浪；F1/F2按200:150分配蓄勢，F3 400ms、F4 200ms。沿用已核准spec及逐招decision。

同分支feat/m0-combat-core-20260927、PR#1 open/unmerged、不main merge/新branch/worktree/TD/委派；保護所有approved masters/收據/尺度/anchor/ground/右向canonical左向mirror、P1/P2、普通Hit取消與無固定16MiB限制及逐檔安全/回收。此次只存收據/流程/進度，產品未改，不重跑Runtime測試/Build/部署。下方舊F3 PENDING和整包待辦為歷史。

## 2026-10-23 — 玩家核准 Basic 發布；接續 Heavy 湧浪 F3 單招審核

玩家本次原文「妳確認目前這個github的進度流程規則的所有相關文件，要從妳開始繼續開發，我應該approve basic，確認接下來是做heavy，是的話繼續」。依此保存 Basic release266114c46406e39c8501ccad370ce69bfe34f236 的直接核准與接續指示，收據 docs/art/approved/chiru/basic/runtime-v1/acceptance.json；不推稱未回報的實機型號或逐Tier量測。Basic已核准範圍結案，P3整角尚未完成。

第一未完成Gate改為 Heavy「湧浪」F3 玩家美術審核。舊batch heavy-f3.png及originals/heavy-f3.png均無法完整解碼，保留原檔；重建單招候選與證據在 docs/art/candidates/chiru/heavy/f3-v2/。依核准identity/Idle維持右向、配件側別與簡化畫風，雙手前推、粗浪柱/真命中爆浪後續獨立製作；新圖仍CANDIDATE，未核准F1/F2/F4、GIF、Heavy Runtime或部署。

沿用已核准整角spec與逐招全局decision：Basic→Heavy→Special→Awakening→Passive；F3審核→其餘動作/獨立VFX→GIF審核→Runtime/真驗證→正常Pages→玩家核准。Heavy單target、鎖定aim、蓄勢350/337.75/325.5/305.9ms＋350ms真結算，F3發射不提前扣血，miss無target爆浪。保護全部approved masters/收據/P1/P2/scale/anchor/ground、普通Hit取消、無固定16MiB上限與安全清理；同分支PR#1 open/unmerged，不新branch/worktree/委派/TD/main merge。此次只有文件及候選圖，不改產品來源，不重跑已通過Basic測試或部署。舊PENDING與整包待辦由本節覆蓋，歷史保留。

## 2026-10-23 — Basic 水矢已正常部署；唯一剩餘Gate=玩家遊戲驗收

Release266114c46406e39c8501ccad370ce69bfe34f236/treeb6289ff292bd6de351ada7260c3bc8ae54963bf4，正常Pages#1106/run39942845654 build120378242516＋deploy120379282819 SUCCESS。完整1096/1096、Build、95素材guard、新555來源guard、CI真native32/built4 PASS；P1被動39942845637/P2覺醒39942845643相容workflow SUCCESS。CI artifact SHA256/ZIP CRC通過，CI/local153逐bytes一致；公開153/153（7新下載＋146相同path/bytes/hash沿用）PASS。證據docs/verification/P3_BASIC_RUNTIME/{REPORT.md,release.json,release-jobs.json,release-evidence.json,browser/,public-fingerprints.json}。

水矢180ms真有限線命中/落空與凝水/水矢/真命中水花已在正常遊戲；核准F3/姿勢/FX/GIF原圖、尺度/anchor/ground及P1/P2保持。此為工程/發布PASS，**Basic尚未PLAYER VERIFIED，不是整角COMPLETE**。唯一下一步：呈交 https://hansen0318.github.io/shanhaijing-arena/?basic=266114c （隔離Lab：https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&basic=266114c ）供玩家實際驗收；未收到本版本明確核准，不存Runtime acceptance、不開始Heavy。來源未改不重跑本次已通過驗證或部署。

已核准美術精確收據docs/art/approved/chiru/basic/composite-review-v1/acceptance.json（玩家「我確認 紀錄 繼續」）只覆蓋GIF/動作/FX，不能取代遊戲驗收。全局逐招Basic→Heavy→Special→Awakening→Passive保持，不恢復整包。PR#1 open/unmerged、同分支，不merge/新branch/worktree/TD/角色ID特例、普通Hit取消、無16MiB固定上限與逐檔安全/兩下載/required/回收/destroy保持。此次只補發布證據與最新進度[skip ci]，不改產品來源。

# Character action art, VFX and animation review workflow

## 2026-10-23 — 最新玩家指令：撤銷整包開發，恢復逐招完整流程（最高優先）

**權威最新決策：** `docs/decisions/2026-10-23-restore-sequential-skill-workflow.md`。玩家明確撤銷2026-10-23舊整角「同時四招F3＋被動樣式／整包GIF／整包Runtime／一次發布」要求，因Work容量與對話長度限制，恢復 **Basic → Heavy → Special → Awakening → Passive**；每一招各自完成F3審核→其他動作/獨立VFX→GIF審核→Runtime/真驗證→正常Pages部署→玩家實機核准→保存收據與GitHub checkpoint，**才繼續下一招**。可跨多個短Work，不能等五招才發布。過去同日整包計畫、handoff、decision為歷史，與本新決策衝突處以本節和新decision為準。

**現在的唯一未完成Gate：P3 赤鱬 Basic「水矢」現有F3候選的單招玩家審核。** GitHub `docs/art/candidates/chiru/whole-character/f3-batch-v1/basic-f3.png` 已存在（連同manifest/original/prompts/review），候選尚未PLAYER APPROVED；先讀來源並對比核准identity/Idle後**只展示水矢F3**，不得再要求四招與被動同批審核。Heavy/回瀾/潤澤/游息四項已生成候選保持不動，待該招輪到時再個別審核，不重生。P3完整spec數值/Tier/時序/Collection已由玩家核准，其原收據保持有效，不因流程改動要求重審；尚無P3 GIF/Runtime/新部署。P1/P2 COMPLETE／PLAYER VERIFIED，不重做。

同一分支 `feat/m0-combat-core-20260927`、PR#1 open/unmerged、不合main、不新分支/TD、GitHub latest HEAD優先；保護所有approved masters/收據/GIF/scale/anchor/ground/canonical右向、左向mirror、普通Hit永久取消，保持全局被動真效果/Tier/VFX/正確清理、Collection純玩法、P1/P2數值/MAX、無固定16MiB容量限額與逐檔安全/required/回收規則。每招結束寫入STATE/WORK_PROGRESS/ledger/handoff、同分支commit/push；純文件[skip ci]；交接指令一個完整自足可複製code block。此次僅改規則與進度，**沒有**新增核准、產品程式/素材變更、Runtime測試或Pages部署。


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

## 2026-10-21 — Awakening VFX/GIF PLAYER APPROVED / execution preflight NEXT

Player「這個我確認OK，你紀錄github流程進度規則」accepts the normal GIF embedded in the preceding response and its linked visual-review package at `e1cdefa22c99aceae149a0a854210da9941c36e9`. Exact wording, primary normal GIF, seven linked GIFs, static reduced cue, three raw VFX and manifest/reference hashes are bound in `docs/art/approved/botuo/awakening/visual-v1/acceptance.json`. **PLAYER VFX/GIF VISUAL GATE CLOSED / APPROVED.** This records the presented package, not invented independent playback/device cases for every link. Old candidate/pending fields in frozen manifests/checkpoint/QA remain historical; authoritative latest approval is this receipt and progress entry. Do not ask again or regenerate accepted F1–F4/VFX/GIF.

NEXT unfinished Gate: Runtime preflight → shared cast/action/VFX/status ownership and timing contract → faithful packing and complete required-set capacity proposal → separate player contract review. None of those engineering proposals is approved by this visual acceptance. This request only records approval/process/progress; no engineering work, Runtime/build/Browser/deploy authorization or phone/whole-P2 acceptance inferred. Source/presentation assets, old receipts/manifests/scripts, gameplay and deployed Special remain unchanged.

Preserve instant0ms vs tacticalT0 900ms/T3 819ms (no universal F1/F2 windup); caster-locked actual damage circle, true-victim contact only, air without fake hit/protection. T3 actual post_cast beneficiaries13.5%/3.75s with independent Special/MAX lifecycle remain. GIF10ms display rounding never modifies gameplay. Keep P1 COMPLETE and all P2 approved art/scale/ground/anchor/mirror, ordinary Hit CANCELLED, Shared Dynamic Asset Residency,16MiB cap/131072reserve/allrequired. Existing45textures16611224decoded/34920extra is inherited evidence, not a new Awakening capacity pass. No main merge/replacement branch/TD/P3.

This approval-only `[skip ci]` slice freshly checks saved package bytes/SHA256, receipt references/JSON and protected diff scope. Reuse8GIF/124frame QA,16mechanics cases and Special164/Browser/release/145CI/39public evidence without reruns; no full-suite/build/Browser/release, five historical full-suite failures remain. Same feature branch and PR#1 open/unmerged; actual fetched HEAD supersedes stale PR connector head snapshots. Canonical successor `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md` is one complete self-contained copy block.


## 2026-10-21 — Asymmetric equipment ownership QA correction

Awakening v1 was rejected by player for swapping bracer sides despite prior author visual QA. Alpha/border/hash checks do not verify anatomy. Before presenting a new pose, trace each approved asymmetric accessory from its shoulder through elbow/wrist, verify exactly two arms/legs for this humanoid and actual facing, and compare light/dark views with approved identity/battleIdle. Screen position alone is insufficient when limbs cross or viewpoint changes. Preserve anatomical accessory ownership; runtime whole-actor mirroring is not swapping accessories between arms. Prior approved art is not reopened by this correction. See current action/progress and key-pose-v1/rejection.json; corrected v2 is still PLAYER REVIEW PENDING, not accepted.


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


## 2026-10-21 (Asia/Taipei) — Special VISUAL PACKAGE PLAYER APPROVED / ENGINEERING PREFLIGHT NEXT

玩家原文：「目前這個我approved，紀錄流程進度規則在github，我要開新的work，要讓他無縫接軌，要跟他說什麼」。核准綁定已完成的 composite-review-v1 視覺包；receipt：`docs/art/approved/botuo/special/composite-v1/acceptance.json`，素材 checkpoint `d1deccff2e4337af71995bb2901ad99052012fd5`。四姿勢、獨立施放/持續狀態 VFX、五種 GIF 與 QA/來源/prompt/hash 已保存，沿用不重畫、不重問相同視覺 Gate。核准依玩家對目前成果的整體確認；不聲稱逐檔播放、裝置測項或實機驗收。下方舊 PENDING 條目及候選包內當時的狀態為歷史，由此最新 receipt 取代；保留原 manifest/checksums 不改寫歷史。

**下一個未完成 Gate：Runtime 前檢、共用可執行 presentation/status ownership 契約與 faithful packing/容量方案。** 先提出具體可審核契約再進必要共用 Runtime 整合。即時減傷、可立即接 ready 技能/移動、真實 source/recipient/status 生命週期必須保留；160ms 美術 frame hold 不成為前搖、全域 CD 或鎖姿勢。現有 T1+ 單一隊友受益不能改成全隊或被移除。短動作可被合法後續技能取代，狀態 VFX 不因此結束，跟 actor root 而非身體圖片排版 offset。

16MiB decoded texture/cache cap、131072bytes reserve、Shared Dynamic Asset Residency 不變；42 required keys /16622164bytes，reserve 外僅23980bytes。目前 review packing 不是最終尺度/anchor/容量通過證明；需多個解剖/裝備/接地標記、雙向與完整 residency 實測，不可外框高度 fit、放大角色或擅降清晰度。新 Runtime/可執行時序/部署/手機及整個 P2 均未核准。

此次只保存素材、核准與交接文件，無 production/src/public/workflow 或既有核准素材變更，沒有部署。既有機制與 Heavy 測試證據沿用；五個已知 suite failures 保留，不宣稱全 suite PASS。Heavy COMPLETE / PLAYER VERIFIED，live acf454741757f58efa980fdcd03f028a472e87a3 不變。禁止 P2 Awakening/P3、main merge、替代分支、TD。新 Work 唯一自足接手指令：`docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md`；所有後續接手指令維持單一完整可複製 code block。

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


## 2026-10-20 — Player approves Work-shown P2 Heavy GIF; artifact binding required before implementation

Player states: 「work有提供heavy的gif參考，我確認核准會讓新的work繼續」. **Player approval of the specific Heavy preview GIF actually shown by the preceding Work is acknowledged.** This does **not** authorize guessing which unseen file/version was shown, nor bypassing source provenance. At Chat audit, current feature docs only establish F1/F2/F4 + F3 **art approval** (`docs/art/approved/botuo/heavy/poses-v1/acceptance.json`), and current handoff says VFX/GIF next; the shown Work GIF's exact GitHub path, bytes, GIF SHA256, frames/durations, VFX sources/receipts and display link are **not yet identified in authoritative GitHub**. Its approved scope must be bound to the exact preview by incoming Work, retrieving predecessor's output/artifact and comparing to committed assets; do not fabricate a receipt or mark unknown VFX/runtime player-approved.

**NEXT BOUNDED WORK:** fresh remote/PR/HEAD recovery, identify exactly which Heavy GIF the player just approved, copy/archive approved immutable visual preview with SHA256/provenance, validate normal/slow/no-FX/right+mirror/Idle return as applicable and actual approved images without alteration. If proven, record scoped `PLAYER GIF APPROVED` receipt and protect those exact VFX/art sources; then begin only missing Heavy runtime integration and necessary engineering/deploy within GitHub's distinct executable-contract review/authorization gate. Preserve P2 size `PLAYER VERIFIED`, P1 COMPLETE, approved P2 Basic/KO/Heavy F1–F4, T0 Heavy range1.8 CD4 coefficient1.30 one-target single real hit no displacement, strategic telegraph Tier-scaled650ms distinct from Basic250ms, 16MiB+131072 reserve, generic architecture/no normal Hit reactions. If exact GIF cannot be recovered, report provenance blocker instead of recreating it or falsely claiming authoritative GIF approval. No P3/main merge. All successor instructions one self-contained block.


## 2026-10-20 19:57 +08:00 — Heavy FOUR POSES PLAYER APPROVED / VFX + GIF next

Player「好，妳繼續」responds to the displayed four-pose board and explicit F1/F2/F4 art-review gate at fffad484da54c8ca59f88c394ba870116a953a7a. Selected F1/F2/F4 PLAYER ART APPROVED; existing F3 approval retained, superseded drafts excluded. Exact hash-bound receipt: `docs/art/approved/botuo/heavy/poses-v1/acceptance.json`. Prior pose-review-pending entries are historical. P2 size defect remains PLAYER VERIFIED.

NEXT independent amber/angular forward bracer pressure source + broader stone-like true-target burst, visibly stronger than accepted Basic at same actor display size; preserve approved actor pixels/body size and no projectile/AoE/gameplay inference. Package approved poses reproducibly using multiple anatomy/equipment/ground landmarks; create normal/slow/no-FX/both-facing/Idle-return composite GIF, clearly preview timing only. VFX/GIF are NOT PLAYER APPROVED. Stop for composite review before runtime integration/deploy; actual Heavy650ms tactical telegraph is Tier-scaled, not universal windup or Basic250ms. Preserve16MiB+131072reserve/Guard, P1 COMPLETE/Basic/KO, ordinary Hit canceled; no main merge/P3. Docs/art-only[skip ci], current source0fe44b3 deployment unchanged. All successor prompts single complete self-contained copyable block.

## 2026-10-20 19:26 +08:00 — P2 SIZE PLAYER VERIFIED / Heavy remaining poses resumed

Player explicitly confirms「正常了，ok，紀錄進度和流程規則，然後繼續」following the phone review link for source release `0fe44b3c5eed46402d0394af6dff128a72be7393`. **P2 Idle/Move/Basic actor-size defect CLOSED / PLAYER VERIFIED; Heavy size blocker lifted.** Receipt: `docs/verification/P2_MOVE_BODY/player-acceptance.json`. This links the scoped sign-off to the supplied release; player did not supply a device bundle hash. Earlier size-review pending/Heavy-paused statements below are history. No unrelated physical-device behavior is inferred.

NEXT: retain approved Heavy F3 SHA256 `0049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206`, author individual F1 anticipation / F2 intermediate forward bracer strike / F4 recovery, then show full four poses for player review. No new F3 generation/reapproval; no unseen-pose/VFX/GIF/timing/runtime approval inferred. Follow pose review → separate source/contact VFX → normal/slow/no-effects/both-facing/Idle-return GIF review → executable-contract review → integration/release → phone acceptance. Current art slice does not change deployed runtime.

Permanent scale rule: use approved body/equipment authoring density and ground anchor, inspect multiple stable anatomy/equipment landmarks plus actual built-app transitions. Neither canvas bounds, crouched height, a single projected skull span nor descriptor conformance establishes visual scale. Preserve P2 Move density0.9/display144×139.5/foot0 and original static baseline; do not restore25/32whole-body shrink. Separate character and VFX transforms. P1 COMPLETE/accepted P2 Basic/KO/art protected; ordinary Hit canceled, damage does not interrupt skill. Keep16MiB cap/131072reserve, gameplay/Tier/timing/AI/save/rewards unchanged. No P3/TD/main merge/replacement branch. Docs/art-only checkpoints[skip ci], no unchanged redeploy; fetch current feature HEAD and put all successor instructions in one self-contained copyable block.

## Scale regression lesson — approved body density, not pose-dependent skull length

The2026-10-20 P2 phone report confirms that renderer/descriptor agreement can still faithfully render a wrong-sized actor. Prior25/32face-span calibration reduced the whole Move body despite original body pixels already using the approved static authoring unit. That conversion is retired for P2 Move; release/evidence: `verification/P2_MOVE_BODY_FIX.md`. Compare original body/equipment/limb proportions across all poses at actual rendered size before choosing any anatomical ruler; foreshortening, mane and face posture can alter projected facial length. Equal source canvas size alone is also insufficient. Keep approved sources immutable; repair source-specific data through shared contracts, preserve grounded support and independent FX, and prove a regression fails the player-visible bad configuration rather than asserting it as expected. P2 Idle/Basic size is normal per player; Move correction remains phone-review pending, not blanket art or whole-character approval.


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

## 2026-10-18 — PLAYER DECISION: cancel ordinary Hit Reaction, preserve uninterrupted abilities

Player explicitly rejects ordinary on-hit pose/animation: being damaged must **not** switch into a hurt/recoil stance or interrupt an ongoing attack/cast/movement. Concurrent hit recoil and offensive VFX clutter combat readability. **Cancel the entire P1 ordinary Hit Reaction production/review/GIF/integration/deploy gate**, and remove it from mandatory P1 completion criteria. Do not create equivalent per-character ordinary Hit animation for P2–P5 by default. This supersedes older “Hit next” handoffs/proposals, including KO>Cast>Hit>Move>Idle and two-100ms poses; those are HISTORY / REJECTED, not pending tasks.

Work-generated candidate `docs/art/candidates/lushu/hit/key-pose-v1/` is **ABANDONED / REJECTED BY SCOPE**, never player-approved; **do not promote, render additional poses, QA/GIF, integrate, or deploy**. Preserve existing immutable evidence/history if necessary rather than silently deleting it, but mark obsolete in documentation. If Work is still running a Hit task, stop that task and do not merge/use its products. Do not roll back or touch player-approved Basic/Heavy/Special/Awakening and their runtime/receipts. This is a **design and scope change only**, not an implementation claim.

At actual damage, preserve authoritative HP subtraction, damage/critical numbers, skill/contact VFX, normal attack/cast/movement animation uninterrupted; lethal damage still transitions to existing KO/death behavior. No stun, knockback, interruption or invulnerability is added by damage alone. Distinguish explicit ability-defined crowd-control, if any, from removed **generic hurt pose**: do not silently remove approved mechanics.

**NEXT:** skip ordinary Hit and perform **P1 whole-character closure audit** using existing accepted evidence (not re-run Awakening or all earlier player gates). Read current roadmap/acceptance matrices to inventory any remaining non-Hit obligations (including existing KO/Idle/Move status) and run only missing checks if needed; ask player for *one scoped final P1 sign-off* only if genuine acceptance requirement remains. After explicit P1 complete, follow character-first roadmap to P2 猼訑, starting with repository-approved identity/first missing art gate. No main merge; no shanhaijing-td gameplay. Keep Chat-first, minimal Work, generic data-driven architecture. New Chat/Work handoffs must be single self-contained copyable code blocks. This entry overrides conflicting old pointers, not historical receipts.


## 2026-10-18 — current authorized Hit reaction slice

P1 Hit now has one unapproved key-pose candidate, not an attack F3 or four-frame sequence. Read `docs/M5C_P1_LUSHU_HIT_REACTION.md` and its key-pose manifest. Latest player task explicitly requires Hit-specific design/key pose → required poses/safe preparation → GIF → approval → scoped integration/release → player acceptance. Do not copy attack timings/frame count or generate remaining poses before key-pose acceptance. This scoped clarification preserves every earlier accepted attack and its sources; no new permanent rule/AGENTS edit is needed.

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


## 2026-10-18 — v3 browser-safe GIF correction / PLAYER REVIEW PENDING

Player reported normal GIF slower than comparison and requested corrected review files. Decoded v2 normal has twelve10ms holds; GIF players may clamp these to100ms, stretching1920ms to3000ms. Previous checks verified encoded time only, not player wall-clock playback. V2 is retained as historical evidence and superseded for speed review.

V3 `docs/art/candidates/lushu/awakening/composite-review-v3/` derives only from decoded immutable v1/v2 GIFs. Every decoded hold is >=20ms; normal and comparison share exact sample times, both directions,350ms Idle holds and1920ms total. Slow is5760ms. Discrete20/30ms sampling retains80→110ms first rush and exact110/260/420 contact samples; recovery610ms is a candidate contract only. No new poses, source-art/VFX changes, approved actual-timing changes, runtime/deploy or engineering/phone PASS. Browser-safe timing checks do not claim wall-clock measurement on the player's device.

Reproduce/verify: `python scripts/repairLushuAwakeningGifTiming.py`; output `verification.json` records every decoded hold, source hashes and total duration. Permanent review rule: verify decoded minimum frame hold >=20ms and use matching sampling, direction count and Idle holds between speed-review GIFs. File duration alone is insufficient evidence of playback speed. NEXT: player reviews corrected normal/slow/comparison and explicitly accepts VFX/GIF and exact candidate timing before runtime. No P2/main merge; art-only checkpoint [skip ci].


## 2026-10-18 — faster first-rush v2 preview ready, player review pending

Requested revision recorded first at e46d29c. V2 retains80ms anticipation, compresses first travel70→30ms; the remaining original timeline is advanced40ms without changing its phase durations. **Candidate** contact110/260/420ms,recovery610ms; original real-design150/300/460ms,total650ms is NOT silently superseded. These exact new numbers need separate player acceptance before real gameplay changes. Coeff0.40/0.70/1.10,total2.20,CD12 unchanged; no extra hits.

Review assets: `docs/art/candidates/lushu/awakening/composite-review-v2/` normal/3x-slow/character-only/VFX-only/whiff GIFs, before-after first rush comparison, source/padding/event metadata and decoded contact proof. Reproduce `python scripts/prepareLushuAwakeningComposite.py --fast-opening`; verify `python scripts/verifyLushuAwakeningReview.py --fast-opening`. V1 GIFs, approved pose sources, normalized pose cells and VFX source records remain unchanged. Six corresponding decoded contact crops have mean absolute RGB error<0.10/255 (quantization only); later contact intervals150/160ms preserved. All5 v2 GIF hashes/decode/frame count/total duration checked; visible bounds/approved-source protection PASS. Before-after export list-duration TypeError was fixed, rerun passed; no source/runtime change.

**POSES PLAYER APPROVED / SPEED-V2 + VFX/GIF CANDIDATE / PLAYER REVIEW PENDING.** Normal total1920ms and slow5760ms include both directions and350ms Idle hold each. These are illustrative scripted previews, not combat/HP/physical collision tests. No runtime implementation/ENGINEERING PASS/deploy/phone acceptance. NEXT player reviews first-rush speed and VFX/GIF; no new runtime task until acceptance and exact timing contract decision. Preserve Basic/Heavy/Special; no P2/main merge; commit [skip ci].


## 2026-10-18 — first-rush speed revision requested; prior GIF not accepted

Player2026-10-18T09:12:07+08:00: 「進度流程規則先紀錄到github相關資料文件，第一段要改更快」. Record35971db assets/provenance/checks before revision. **Five character poses remain PLAYER APPROVED; VFX/GIF remain CANDIDATE / PLAYER REVIEW PENDING.** This revision request is not acceptance of the prior GIF or permission to integrate/deploy.

Create a versioned PREVIEW candidate only: retain80ms anticipation, shorten first visible rush80–150ms (70ms) to80–110ms (30ms). After first contact advance the remaining timeline40ms, preserving all later segment/impact/recovery durations: contact110/260/420ms, recovery610ms. No inserted pause or slower second segment. These exact new numbers are executor-selected candidates, NOT player-approved replacement combat timing. Prior real design150/300/460ms,total650ms remains recorded until separate exact contract acceptance; current runtime remains unimplemented old behavior. Keep coeff0.40/0.70/1.10,total2.20,CD12 and independent collision semantics.

Preserve v1 GIFs/approved art/VFX source bytes; no image regeneration or changed character scale, path, effect shapes/sizes or damage. Publish v2 normal/slow and before-after speed comparison, record hashes/timeline/actual GIF checks and wait for player review. Timing-only requests must not be promoted into unseen asset/GIF/runtime approval. No P2/main merge/deploy; checkpoint [skip ci].


## 2026-10-18 — Awakening independent VFX and composite GIF review ready

All five character poses are PLAYER APPROVED (receipt at a353773; `docs/art/approved/lushu/awakening/phase-poses-v1/acceptance.json`). Exact approved sources remain immutable. New review-only assets: `docs/art/candidates/lushu/awakening/vfx-review-v1/` (three distinct source/impact pairs; C first clipped candidate retained separately and replaced) and `composite-review-v1/` (normal,3x slow, character-only,VFX-only,whiff GIFs, each with both directions and approved Idle return). Reproduce with `python scripts/prepareLushuAwakeningComposite.py`; verify with `python scripts/verifyLushuAwakeningReview.py`.

**POSES PLAYER APPROVED / VFX + GIF CANDIDATE / PLAYER REVIEW PENDING.** Full-canvas uniform-XY skull-density normalization, common pelvis/ground family, exact resized source insertion,16px cell margins; independent VFX split-rejoin and source contour checks;5 GIF hashes/decode/frame-count/total duration checks PASS. Actual GIF contact proof150/300/460ms and mirrored1150/1300/1460ms inspected. Effects size uses significant-alpha content, preserving full original asset, with source caps350/400/450 and impact caps180/270/400. Original low-alpha noise retained, no cleanup claim. One truncated B impact derivative was detected, deterministically re-extracted and decoded, then atomic exact-byte writes checked; no damaged derivative accepted.

**PREVIEW ONLY:** scripted route/contacts, no combat simulation/HP/damage implementation. Runtime still old0/+120/+240ms equal split/no triple dash; no ENGINEERING PASS/deploy/phone verification. NEXT: explicit player review of independent effects and normal/slow composite GIFs; only after acceptance proceed to separately bounded runtime preparation and geometry decisions. Keep real design150/300/460ms,650ms,coeff0.40/0.70/1.10,CD12; preserve Basic/Heavy/Special, no P2/main merge. Commit [skip ci] prevents automatic Pages deployment. Older pending pose text below is historical.


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



**2026-10-17T14:59+08:00 — P1 SPECIAL DEPLOYED / ENGINEERING PASS / PLAYER PHONE PENDING.** Source67c45ebb5e09fe0e70d3d271bc2c1b0322a50dc6 implements approved REAL320ms move+one hit+F3/target burst through shared pipeline, preserving T0 CD6 and existing Tier scaling. Approved F1–F4/GIF/VFX originals unchanged; source-preserving runtime PNGs and transparent-only P1 Move/KO crops fit16,775,432/16,777,216 bytes. Local828/828/build/guard PASS; independent final review no Critical/Important. Actions#1034/39011872100 build117335937679 and deploy117336027166 SUCCESS. Public16files exact-byte match: index-8JGZpf69.js / battleRuntime-Bb3b-o-u.js / index-DcqtNRF0.css plus action assets. Evidence: docs/verification/M5C_B_LUSHU_SPECIAL_RUNTIME.md and special/runtime-v1/PUBLIC_FINGERPRINT.json. Current closure is docs-only. NEXT only player phone review https://hansen0318.github.io/shanhaijing-arena/?v=67c45eb for left/right large distinct source sweep + real-target burst,320ms sync, empty swing, actor size and Idle/Basic return. No phone PASS, new skill/character or main merge. Earlier timing/implementation/deploy pending entries are historical.


**2026-10-17T14:45:48+08:00 — P1 SPECIAL REAL320ms APPROVED / IMPLEMENTATION IN PROGRESS.** Player「好，我確認， 繼續，並紀錄進度和流程 如果要整合到硬規則相關資料，就整合」accepts real320ms startup and existing feature deployment scope. Acceptance: `docs/art/approved/lushu/special/review-v2/acceptance.json`. Earlier timing/GIF pending gates below are historical, do not reopen. Shared pending-action pipeline now opts Special into320ms: reposition, one real hit, F3/contact and Tier post_cast effects resolve together; T0 CD6/.65 unchanged, existing Tier scaling retained. Deterministic approved-source80px cells plus separate source/target PNGs; P1 Move/KO only lose outer fully transparent rows with exact visible-pixel/ground transforms, originals retained. All-five required16,775,432/16,777,216 bytes; no cap increase. Independent review found left-facing noncentral action-origin drift; reproduced RED and fixed generically for authored actions, preserving established locomotion/KO policy. NEXT finish full checks/visual projection, feature CI/Pages/public fingerprint, then player phone review. No deployment or phone PASS claimed yet; no main merge.


## Special GIF acceptance and retained deployment authority — 2026-10-17

Player14:22:27 explicitly approved full Special composite GIF/VFX and continuing through deployment. Bind exact files and statement in `docs/art/approved/lushu/special/review-v2/acceptance.json`; accepted poses/FX/GIF are immutable and no duplicate review/publication approval is needed. The previous missing-source and preview-only gates are closed. Preserve review-v2 reproducible packaging, receipt, manifest, checksums and visual/timeline proof.

Apply the existing timing rule: the accepted320ms preview contact does not by itself specify real320ms simulation delay. Read-only8case campaign preflight confirms actual0ms Special and the existing generic pending-action path. Seek only the material real-timing choice; ordinary source-preserving implementation, testing and feature deployment are already authorized after that choice. Current residency needs an under16MiB solution before adding required assets. Exact measured evidence and concrete320ms contract: `docs/verification/M5C_B_LUSHU_SPECIAL_INTEGRATION_PREFLIGHT.md`. Never treat preflight or deployment authorization as completed gameplay/phone acceptance.

## Special exact-source recovery and reproducible composite — 2026-10-17

Player reattached the previously accepted F1–F4 after a missing-originals handoff gap. Exact originals and statement/hash binding: `docs/art/approved/lushu/special/recovered-inputs-v1/receipt.json`. F3 is byte-identical to the earlier accepted file. Preserve the source receipt and old gap as history; never recreate an accepted pose to fill missing storage. `scripts/prepareLushuSpecialComposite.py` packages the full canvases with one explicit skull-width density policy, common XY scale, shared support-foot baseline and generous cell padding; metadata records each source's measurement/scale rather than fitting a crouched silhouette to standing height. Original pixels/bytes are preserved in masters, derived cells downsample explicitly.

Four-pose character-only and independent-VFX normal/slow composite GIFs now exist under `docs/art/candidates/lushu/special/review-v2/`. They include normal/mirrored direction and original approved Idle return; full decode verifies held/coalesced GIF durations and pixel timeline. This is reproducible asset-preparation evidence, not player GIF acceptance or installed gameplay. The320ms preview contact does not authorize changing immediate0ms Special simulation. Current next gate is explicit composite/VFX review, then separately scoped timing/runtime work. No other-character/skill promotion or main merge.

## Phone-scale VFX enlargement acceptance — player clarification 2026-10-17

Canonical requirement: `docs/M5C_ART_ANIMATION_VFX.md` → "Large, unmistakable cast and impact VFX". Before closing a skill, compare outgoing light/sweep AND real-target impact separately against the preceding skill at the same actual phone display scale. Basic < Heavy < Special < Awakening must be immediately apparent in effect size and impact emphasis, with distinct skill-specific motion and VFX. Never enlarge the actor or damage geometry to meet this requirement. Preserve original art, mirror/grounding, finite budgets and true-hit-only contact. P1 Heavy corrected source33a0f21 is player-verified on2026-10-17 (M5C_B_LUSHU_HEAVY_PLAYER_ACCEPTANCE.json); earlier size/visibility rejections are historical and must not reopen accepted work. Special/Awakening authored visuals remain unfinished and must follow the existing review gates under this stronger rule.

## 可重用的完整製作歷程與接手索引 — 2026-10-16

P1 Basic 已完成工程驗證與部署，玩家回覆「這樣不錯」，肯定本次攻擊動畫／效果。本流程可作為後續角色的製作方法；不代表其他角色的形象、攻擊、美術或戰鬥時序自動獲准。KO／Pause／Restart 等未逐項回報項目維持待確認。下方舊日期的 pending／proposal 是歷史階段；當前狀態以最新 WORK_PROGRESS.md、STATE.md、驗證紀錄為準。

| 階段 | 本次正確做法／需保存的成果 | 唯一可追溯來源 |
| --- | --- | --- |
| 形象 Recovery | 只用核准 identity、battleIdle；先核對臉／角／體型／服裝／尾巴／小型武器 | public/assets/characters/lushu/identity.png、battleIdle-4f.png |
| 關鍵姿勢 | 先單獨完成 F3 命中姿勢並讓玩家審核，再逐張做 F1 蓄勢、F2 出手、F4 收勢；不靠一次四格自由生成鎖定形象 | docs/art/approved/lushu/basic/；候選與失敗歷史保留在 docs/art/candidates/lushu/basic/ |
| 特效分層 | 角色圖不烘焙刀光；blade sweep 在角色後、真實命中 contact spark 在前；保留效果原圖與生成提示詞 | approved/lushu/basic/review-v1/ 的 blade-sweep-raw-v1.png、contact-spark-raw-v1.png；候選同目錄有提示詞 |
| 安全包裝 | 接受後保留原 PNG；固定透明格、統一縮放與接地 family，逐格確認武器／角／尾巴完整及 alpha 邊界，不直接切四格拼貼 | docs/art/candidates/lushu/basic/review-v1/prepare_review.py、REVIEW_NOTES.md、review-manifest.json、SHA256SUMS.json |
| GIF 審核 | 先交正常／慢速、正向／鏡射與 Idle return 合成預覽；玩家核准後才進 runtime；GIF 只作審核材料 | docs/art/approved/lushu/basic/review-v1/acceptance.json 與 normal/slow GIF |
| 時序契約 | 先查真實 Basic 傷害時點；本次玩家選 B，明確授權實際 180ms 前搖。禁止只延遲 HP／傷害字製造同步，也不得將 P1 的數值直接套用別人 | docs/superpowers/specs/2026-10-15-shared-basic-windup-design.md、對應 plans/ 文件 |
| Runtime 素材 | 確認預算再製作核准來源的縮放衍生；P1 Idle 僅無損擷取原 F1，原 strip 不動；runtime 不使用 GIF | scripts/prepareLushuBasicAssets.py、approved/lushu/basic/review-v1/runtime-manifest.json、public/assets/characters/lushu/ 新4張 PNG |
| 共用整合 | BattleSession 發出 start/resolve/cancel；ActionPlayback 等真實 resolve 才播 F3；AssetPresenter 分開畫角色／刀光／命中。資料驅動，沒有引擎角色 ID 特例 | src/combat/battleSession.js、src/assets/actionPlayback.js、src/assets/descriptors.js、src/runtime/assetPresenter.js、src/roster/catalog.js |
| 工程驗證／發布 | 先測載入、預算、時序、落空／取消、KO、鏡射、reduced、Restart／切場，再 Build、CI、Pages 與公開逐檔比對；記錄來源 commit 與裝置驗收界線 | docs/verification/M5C_B_LUSHU_BASIC_RUNTIME.md、M5C_B_LUSHU_BASIC_PUBLIC_FINGERPRINT.json |

**關鍵教訓**：一次四格生成曾出現形象漂移、姿勢不清、武器／邊界問題；不把失敗候選當 reference。改用核准 GitHub identity＋已接受的單張 F3 作逐姿勢製作，先完成玩家審核，再用可重現腳本包裝。每次檢查實際寫出的 PNG 能完整解碼，原檔／hash／候選／核准／runtime 衍生分開保存。玩家不必重傳本專案已保存的四張圖才能接續。

**不能盲抄的 P1 數值**：120/60/100/120ms、180ms windup、128格尺寸、origin/scale、特效附著位置是本次核准資料，不是所有角色的固定模板。後續招式必須重新對應核准形象、武器與真實技能契約；一般流程與共用管線才是重用的部分。16MiB 安全上限與動態 residency 保留，不能為了新增圖片提高上限或忽略必要貼圖失敗。

**零上下文接手**：先最新 remote/branch/PR/HEAD → AGENTS/playbook/boundaries → WORK_PROGRESS/STATE → 本文件 → 當前招式的 approved 素材／acceptance／manifest → 實作設計與驗證證據。從第一個未完成 gate 接續，不根據下方歷史 pending 文字重開已完成任務。Chat 先完成可做的檢查、素材準備與規格，Work 只接剩餘 executable delta；若另開 Work 包，遵守已有 START_HERE.md＋WORK_HANDOFF.md＋核准素材／checksums 的完整 ZIP，以及單一可一鍵複製 handoff 規則。沒有新授權就停在當前驗收，不自行開始其他角色攻擊。


Final execution2026-10-15: ENGINEERING PASS / PLAYER IPHONE PENDING. Deployed source7e7ae7371bbcade8434fe4e3771ebb5c65eab7a3, targeted94/local+CI751/build/guard PASS, Actions#1004/38758231891 PagesSUCCESS,33public files exact-byte match. Evidence/rulings: docs/verification/M5C_B_LUSHU_BASIC_RUNTIME.md; fingerprints adjacent JSON. Plan/art/GIF/B gates resolved. STOP for iPhone, no new actions/VFX/main merge.

Status: **PLAYER-APPROVED PROCESS / FIRST P1 SLICE VALIDATION PENDING — 2026-10-15**.

The player explicitly approved this sequence after reviewing its explanation: key contact pose → four poses → composite GIF with independent effects → player approval → shared runtime integration/tests/deploy → iPhone acceptance. This approves the **process**, not any generated image, VFX design, runtime change or claim that the method is already production-proven. First implementation is P1 Lushu Basic only. Broader-character reuse follows successful validation or explicit player direction.

## 1. Recover before acting

Read current GitHub branch/PR/HEAD, AGENTS, DEVELOPMENT_PLAYBOOK, PROJECT_BOUNDARIES, CURRENT HANDOFF POINTER, docs/STATE, accepted character presentation and the relevant action spec/data. GitHub is authoritative; do not reconstruct identity from conversation. Keep feature branch feat/m0-combat-core-20260927 / PR#1; never merge main without explicit approval.

Identify exact approved art paths and hashes before editing. For current Lushu only identity sources are public/assets/characters/lushu/identity.png and battleIdle-4f.png. Prior rejected drafts are not identity references. A generated candidate is not automatically an approved reference.

## 2. Pose review gates

1. **F3 contact key pose first**: one complete transparent figure. Preserve approved head/face/antlers, body proportions, clothing/colors, markings, tail and the exact compact weapon/equipment. Articulate joints/torso/legs for a real grounded attack; do not substitute whole-sprite wobble. Inspect, show to player and **wait for explicit identity/weapon/pose acceptance** before extending to remaining poses.
2. **F1/F2/F4**: author individual complete poses from the approved identity and accepted F3 visual solution. F1 anticipation/load, F2 clearly intermediate strike, F3 contact/follow-through, F4 recovery/return. Check each against the same source; preserve scale and ground family. Show full four-pose sequence for player review. Do not classify four similar idle positions as attack animation.
3. Keep each candidate's revision/hash/status. Do not guarantee generated edits lock original pixels; actual segmentation/layered editing requires real layer extraction and occlusion/joint repair. If image identity is wrong, correct the affected pose before packing or VFX.

## 3. Character and VFX are separate assets

Author the character without baked-in slash light/particles. Blade arc/trail and contact flash/shards are separate transparent effects with independent origin/attachment, lifetime, scale and layers. The player requests visually elaborate effects; exact shape/color/strength still needs review. Effects must retain character/HUD/ally-enemy readability and reflect the actual weapon/ability.

Four character key poses do not force VFX to four frames. Add a needed character in-between only after preview evidence and art review, not by inventing interpolated anatomy. Reduced-motion behavior must be considered before integration. No new damage, extra hits, projectiles or attack range may be inferred from visual effects.

## 4. Deterministic packaging of accepted art

After pose acceptance, retain exact accepted source PNGs. Extract each entire silhouette, remove neighboring fragments or unintended background without erasing character colors, then place on equal transparent cells with one uniform scale policy and common anchor/ground family. Preserve weapon tips, antlers, tail, hands and feet. Inspect alpha, all cell bounds and light/dark backgrounds. Do not simply slice arbitrary four-up collages.

**Do not regenerate approved art to fix packing.** Use reproducible layout/crop/padding operations on the accepted pixels. This is packaging, not permission for new poses or character redesign. No frame may contain neighboring-frame bleed or clipped anatomy/equipment.

## 5. GIF approval BEFORE runtime integration/deployment

Create a composite GIF/animation preview from the safely packed accepted character poses and independent VFX. Give the player a readable attack sequence, checking windup/strike/contact/recovery, weapon continuity, ground, tail, left/right presentation and ending back in the correct Idle/Move pose. Assign frame timing for the preview and label it preview timing, not an approved combat-timing change.

**WAIT for explicit player GIF acceptance before integrating or deploying.** Earlier identity/static/locomotion/KO approval and a process approval are not GIF approval. If player requests correction, preserve accepted work and correct only the affected pose/effect/timing. The game consumes PNG/frame metadata and shared engine playback; GIF is a review artifact.

## 6. Future engineering gate

After approved GIF and explicitly scoped engineering authorization: implement data-driven shared action/VFX playback, match actual cast/hit events without shifting damage or cadence to fit the preview, preserve movement/gameplay/AI/Tier/rewards, protect KO/interruptions/pause/mirroring/reduced motion/return-to-Idle-or-Move, and use shared dynamic residency. Run appropriate checks, build/CI/Pages/public fingerprint, then stop for player iPhone acceptance. Never treat a nice GIF as proof of actual event sync or phone readability.

Explicit scope exception2026-10-15T22:18:37+08:00: player selected B, actual180ms P1 Basic windup. This overrides immediate resolution only for the opted-in Basic; do not infer permission for different damage/cadence/stat changes. Detailed contract docs/superpowers/specs/2026-10-15-shared-basic-windup-design.md was accepted22:33:01+08:00. Its implementation plan now awaits review; A/B and written-design gates are resolved.

## 7. Durable handoff contract

No need for the player to re-upload our own retained materials. Save candidate/accepted versions to distinct GitHub art paths; never overwrite approved/runtime art with a candidate. Keep source PNGs, each accepted frame, normalized sheet, independent VFX, composite GIF, manifest/checksums, frame geometry/anchors/preview timing, origin/reference paths and revision/status history. A future Work package must contain START_HERE.md and WORK_HANDOFF.md plus those assets and explicit acceptance evidence, no reliance on transient scratch or conversation images.

Update WORK_PROGRESS and STATE at meaningful checkpoints: exact active revision, what was accepted/rejected, checks actually done, next one unfinished gate, protected scope and stop boundary. Any new Chat/Work prompt must be one complete self-contained copyable code block. Chat finishes safe preparation first; Work receives only the remaining executable delta.

## Current first slice

P1 Lushu Basic. **All four character poses are PLAYER APPROVED** (full-sequence acceptance2026-10-15T21:43:37+08:00), archived unchanged at docs/art/approved/lushu/basic/. Accepted source hashes and approval statement are in docs/art/candidates/lushu/basic/Basic-four-pose-review-v1.json. Do not regenerate these poses.

Safe full-canvas uniform packaging, independent blade/contact VFX candidates and normal/slow composite GIFs are prepared in docs/art/candidates/lushu/basic/review-v1/. REVIEW_NOTES.md records actual checks and limitations; review-manifest.json records complete geometry/hashes/timing and SHA256SUMS.json covers checkpoint contents. Four384-square cells, common visible baseline320, minimum39px nonzero-alpha clearance; normal GIF8frames/1600ms includes400ms action plus Idle holds, mirroring and actual approved Idle F1 return. Timing is preview-only.

**Current2026-10-15T22:33:01+08:00: four poses/GIF/VFX, B and written shared-windup design are PLAYER APPROVED.** Art/hashes remain under docs/art/approved/lushu/basic/review-v1/acceptance.json. Reviewed contract docs/superpowers/specs/2026-10-15-shared-basic-windup-design.md governs lifecycle, actual damage timing, accessibility and protected assets. **Next is player confirmation of docs/superpowers/plans/2026-10-15-shared-basic-windup.md, then native executing-plans implementation in this Work.** Do not reopen A/B, art/design approval or executor selection. No implementation/tests/build/deploy/phone PASS yet. First full slice remains production-validation pending; no main merge.

## Mandatory action-power visual escalation — player rule 2026-10-16

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

## Recovered GIF acceptance and successor rule — 2026-10-16

When a player confirms an explicitly linked recovered GIF/VFX, archive the exact statement/time and reviewed file SHA256 in acceptance metadata and update the top progress/state pointers. This closes only the visual gates actually shown; do not regenerate accepted poses/effects or restart F3/four-pose/GIF review because a new session begins. Receipt alone is not acceptance. Keep original recovery observations as dated history; latest explicit acceptance supersedes historical pending pointers.

A recovered GIF may lack its original assembly script, transparent cells or transform manifest. Record those gaps honestly: visual approval is not proof of source-to-GIF byte provenance, clean alpha, padding, budget or gameplay hit synchronization. Reconstruct only deterministic source-preserving packaging from accepted source art, inspect it and record exact derivatives/geometry/checksums. Material pose/effect changes need review; unchanged approved art does not need a duplicate approval gate. Never extract runtime character sprites from a composited GIF or generate replacement art just to fill missing packaging.

Heavy preview loading duration is not a gameplay timing decision. Inspect the real ability/event path and resolve any timing mismatch in the integration design before changing simulation; no fake HP delay or silent Basic timing reuse. Runtime engineering, feature deployment and player phone gameplay acceptance remain separate gates. Current P1 Heavy visual acceptance: docs/art/candidates/lushu/heavy/recovered-review-v1/acceptance.json (2026-10-16T20:33:23+08:00). No main merge.

## Pre-integration synchronization and residency evidence — 2026-10-16

Before adding another accepted action to the shared renderer, measure the actual ability lifecycle and current all-required decoded residency. An approved preview timing is not an authorized gameplay delay. Existing phased Basic playback does not imply immediate Heavy emits start/resolve/cancel events. Record missing lifecycle contracts and seek an explicit timing decision before shifting real hits; never delay HP/damage text alone. Account for new action/VFX textures against the complete live required set, cache and upload reservations. Optional LRU does not rescue an over-budget set whose every key is pinned. Preserve finite16MiB and design shared readiness/pin transitions; do not raise limits or modify another approved character as an unreviewed workaround. Keep preparation, engineering verification, deployment and player phone acceptance separate. Evidence for current Heavy: docs/art/candidates/lushu/heavy/runtime-prep-v1/README.md.

## Shared action ownership and lossless packaging evidence — Heavy2026-10-16

Independent action-effect images belong to actionId/category; when a new action replaces one on the same actor, destroy/rebind previous effect images. Test actual same-actor Basic→Heavy and Heavy→Basic, not just two different actors. A batched render must show the last real resolved impact once even if a later valid action has already started; preserve simulation/HP/CD/input timestamps, do not invent an animation lock. Repeat renders at the same simulation time must remain visually frozen, and an impact sampled after playback expiry must still clean up.

A budget fix may use deterministic lossless removal of fully transparent canvas rows while preserving the approved original file. Prove complete nonzero-alpha retention, exact pixel equality and adjusted origin/display transforms for BOTH mirror directions. Keeping full logical width avoids the center-of-flip shift caused by asymmetric horizontal trimming. This is packaging, not new character artwork or permission to alter colors/pose. Required decoded/cache/reservation peaks still need actual measurement. Current Heavy uses a512x331 Botuo KO derivative, original512x512 retained, same144px display width/scale2, origin[.5,280/331]; all-five+Basic+Heavy16748808bytes under unchanged16MiB.


## Runtime regression lessons — P1 Heavy player feedback (2026-10-16)

- Do not fit a crouched/wide action's full silhouette height to standing Idle height: that inflates the actual head/torso. Compare head/body size against the approved action/Idle at real display scale, use one authored pixel-scale policy across all action cells, and separately align grounded baseline. Preserve masters.
- Asset presence, manifest pinning and automated tests do not prove visible VFX. Inspect real presenter coordinates, draw order, direction and body-height contact; player phone acceptance remains separate. Keep VFX independently layered when correcting body scale.
- For an opted-in manual empty Heavy swing, run the authored action lifecycle and sweep in current displayed facing, spend the existing cooldown, and resolve as a miss. No fabricated target, acquire-on-resolve, damage, movement or contact burst. This does not authorize changes to other abilities' mechanics.
- Include the actual skill-button-to-session-facing bridge in regression coverage; direct session calls alone cannot prove the control forwards the correct direction.

Case evidence: docs/verification/M5C_B_LUSHU_HEAVY_FEEDBACK.md.


## Real cast-chain VFX visibility — Heavy defect 2026-10-17

Asset hashes, dimensions, isolated manual-control previews and a single successful paint do not establish battlefield VFX readability. Reproduce the actual campaign factory with every skill ready and immediate AI handoff. Test multiple simulation steps per paint: a phased real hit followed by an immediate/nonphased cast can erase both active action and pending impact before rendering. A one-frame safeguard is insufficient for readable impact.

Completed impact retention must be an explicit reusable presentation policy, bounded by the original authored hold, actual confirmed hit and owner lifecycle. Preserve core damage/CD/input/AI timestamps, reject stale tokens, freeze Pause, clear KO/scene teardown and never manufacture air-hit bursts. P1 Heavy opts in; Basic's data/policy is unchanged. Retained Heavy F3 can temporarily cover a subsequent Basic's anticipation frames; record that visual priority rather than claiming all new poses stay visible.

Give the player standalone supplied VFX, character-only/VFX-only/composite normal+slow GIFs, and actual cast-chain before/after evidence with reproducible traces and hashes. Label draw-command reconstruction separately from real browser/screen recording and phone acceptance. Current evidence: docs/art/candidates/lushu/heavy/playback-proof-v1/README.md.

## Preview acceptance and battlefield evidence (2026-10-17)

Bind each player preview acceptance to exact source/derivative hashes and the actual statement. Approval of a source board or reconstructed GIF approves that preview scope only. Keep a separate battlefield defect status until the current deployed build is demonstrated using actual input, actual cast/resolve events, required texture registration and visible real-renderer output in both directions. Generic VFX visibility is not evidence of authored Heavy PNG visibility. Reuse verified deployments and fixes; do not make another size/code/art change without a reproduced cause. If browser timing prevents the Heavy frame capture, record that precise limitation and keep device acceptance open. Never label a reconstruction a screen recording.

## Reduced-motion skill readability and separate release trails (2026-10-17)

Do not silently hide an accepted skill-identifying effect in reduced-motion mode. Use a brief static release cue instead of moving trails, with no new flash/strobe, repeated hit or damage implication. Source sweep and target-hit contact have separate finite presentation lifetimes; making a sweep readable must not prolong the impact/character pose, cooldown, cast windup or simulation. Measure normal and reduced-mode source-sweep visibility independently from contact; include whiffs, both directions, following AI casts, Pause and KO cleanup. Heavy currently opts into260ms static/fading blade afterglow via shared data; Basic retains its approved existing behavior. A code-proven reduced-mode hiding path does not prove that the player enabled that OS setting.

## Heavy player closure and successor rule — 2026-10-17

Heavy source33a0f21 is now player-verified; see M5C_B_LUSHU_HEAVY_PLAYER_ACCEPTANCE.json. Earlier Heavy runtime/size rejection statements above are historical. Preserve accepted art and corrections. Bind a device acceptance to the exact deployed source, wording and changed scope; do not turn a general confirmation into a fabricated per-device/per-case matrix. Reuse engineering evidence when code has not changed. Continue P1 Special through F3 review first; preview timing never changes immediate Special gameplay without a separately approved timing contract.

## Transparent candidate diagnosis — actual compositing (2026-10-17)

For generated RGBA candidates, inspect actual alpha values and composite on opaque light/dark backgrounds. Colored RGB under alpha0 is invisible and must not be mistaken for rendered glow by an RGB-only thumbnail. Check complete silhouette and transparent outer borders; keep source hash and a reproducible QA derivative. Alpha/background QA is separate from player pose approval and safe equal-cell runtime normalization. When an unapproved candidate needs generative cleanup, retain the original and version the edit; never claim the edit preserved exact pixels or inherited approval.

## Special F3 acceptance / larger explosive VFX confirmation — 2026-10-17

Player10:58 explicitly accepts P1 Special F3 v2 and confirms later effects must be clearly visible, larger and more explosive under the existing Basic<Heavy<Special<Awakening rule. Save accepted pose/hash separately from future pose/effect/GIF review. Continue individual remaining poses first; do not bake effects into them or infer unseen VFX approval. Outgoing effect and actual-hit burst must each be reviewed independently at equal actor scale; maintain reduced-mode static cues and finite cleanup.

## Utility protection preview case — P2 Special2026-10-21

All four poses approved at45be0c0; exact receipt `docs/art/approved/botuo/special/poses-v1/acceptance.json`. Source-preserving packaging, separate activation/state PNGs and five GIFs in `docs/art/candidates/botuo/special/composite-review-v1/`; visual approval remains pending. This utility has no damaging contact; cast hit=true means mitigation applied. Do not copy damage-only VFX or force bracing/complete F1–F4 before a legal next skill. Actual status and body animation ownership are separate: status follows source/target/key lifetime and actor root/world movement, not a pose image's layout offset. Instant-chain and T1 recipient art studies explicitly name recorded production-path evidence and are not browser/gameplay recordings. Prior approval of body art does not approve these effects, timing or runtime. Existing no-gameplay-change/finite-budget/reduced-motion/scene-cleanup gates remain mandatory.

## 2026-10-23 — 被動呈現與Tier成長修訂

玩家明確要求戰場被動文字不要出現：不使用被動文字牌、被動HUD數字或指向連線。Collection角色說明保留。後續獨立被動須明示T0–T3實際機制/增益成長，不能以基礎Tier數值成長代替；數值依角色方案，不直接複製P1。被動需有可辨識的實際效果，不能僅靠文字證明。P1本次實作值35/50/65/80%、3秒/CD6秒，仍待新版玩家驗收。一般移速buff/outgoing上限15%保持，明確資料驅動movementBonusCap可提供較高移速額度，上限須驗證，無角色ID判斷；參見2026-10-23-passive-visibility-tier-revision decision。
