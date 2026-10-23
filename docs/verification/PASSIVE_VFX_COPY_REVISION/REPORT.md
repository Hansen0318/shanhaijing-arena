# 被動VFX／玩家文案修正 — DEPLOYED / ENGINEERING PASS

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



玩家直接要求全現有/未來角色被動有相符VFX、Collection僅呈現玩法介紹，精確原文與硬規則見 `../../decisions/2026-10-23-passive-vfx-player-copy.md`。

厚甲既有琥珀護甲保留；疾行補上真movement狀態驅動的青色風痕，依Tier為1/2/3/4組，跟隨朝向。共用style資料與真statusId/expiryTime，不以角色ID判斷。所有效果數值、時序、MAX、既有美術/比例/anchor/ground/mirror均未更動。Collection直接修正來源文案，移除工程規則與已實裝標籤；未開放被動明示尚未開放。

## 證據與範圍

- RED4→GREEN12，完整測試1070項（含新增guard負向測試）及Build，最新結果見full-final.log與build-final.log。
- 疾行native16/built8：四Tier、雙陣營（native）、normal/reduced-motion、真速度/距離/時間/CD、真status對應VFX、Tier組數、expiry/KO/end/Restart/destroy、無被動文字，全部PASS。
- 厚甲native16/built8：真HP受傷差異20/30/40/50%、MAX覆蓋與恢復、Tier護甲、尺度穩定、expiry/KO/end/Restart/destroy，全部PASS。
- Collection原生5/built5：真app路由、852×393手機viewport，P1/P2數值介紹正確，未開放被動誠實標示，沒有開發規則或已實裝，全部PASS。初次容器缺中文字型，補裝僅QA環境NotoSansCJKtc後重取Collection截圖並檢視，未加產品依賴。
- 舊P2四招native4/built2/尺度10僅沿用不變的戰鬥計算、技能呈現/素材/scale範圍；reuse-proof.json列出不變SHA與修改來源。此次共用被動呈現另有新48案，沒有拿舊599來源證據覆蓋新來源。
- 新guard綁定全部src/public/scripts/tests/依賴/兩workflow、此次核准規則與Browser證據。負向測試驗證來源竄改、假VFX同步、混入工程文案均拒絕，還原後PASS。原生單人自審，沒有獨立review宣稱。

## 核准與剩餘Gate

P2已部署既有厚甲機制/護甲VFX的條件核准收據為 `../../art/approved/botuo/passive/runtime-v1/acceptance.json`，保留玩家要求修正文案。不是未展示的新P1風痕或新文案已被玩家驗收；原P1機制/四招/美術核准不重開。待正常CI/Pages與公開版本核對後，完成P2行政整角結案；只交付新P1風痕觀察。P3仍BLOCKED，不開發P3或TD。
