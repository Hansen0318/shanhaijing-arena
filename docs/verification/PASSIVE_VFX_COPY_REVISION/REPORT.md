# 被動VFX／玩家文案修正 — LOCAL VERIFIED / NORMAL RELEASE NEXT

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
