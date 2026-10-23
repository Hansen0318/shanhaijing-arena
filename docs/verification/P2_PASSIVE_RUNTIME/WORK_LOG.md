# 厚甲實作 ledger — docs/superpowers/plans/2026-10-23-botuo-passive.md

2026-10-23：玩家確認方向且要求繼續實作，原文/範圍見decision。基線2f855f7721d787c43636b8f34fd633db345e71c2。單分支原生單人原目錄，無新worktree/分支；既有來源證據不重跑當baseline。
Pre-flight Task1→2：kind分流、nextSpatialBoundary與snapshot effectType接口一致；Task2→3：active.effective/presentation讀真status；Task3→4：Graphics無文字與真Browser可觀測。無接口矛盾。
直接執行授權優先預設spec/plan再問程序；不聲稱玩家逐項核准新文件。最終仍要真玩家體感驗收。

Task1 complete: RED unsupported trigger→GREEN22/22；schema/匿名角色/完整Tier/MAX/KO核心。Task2主要真Session22/22與P1精確距離回歸通過。
完整first1060/1053pass/7fail原log保留。根因：Collection/roster兩處仍預期P2false；windup/staged3項fixture原本沒有厚甲，其1HP目標被新甲減傷且非staged步進變化；tierStatus期望無status但新甲真存在；tacticalCD6.100000000000003 vs6.1。
Ruling: 舊windup與tierStatus fixture明確移除P2 passive以隔離原單位契約，原有傷害/時序/排序/空status斷言保留；新整合專測包含厚甲。tactical CD改1e-9數值容差，保留原期望；不改產品時序/放寬玩法。代價：隔離fixture不代表厚甲組合，該組合由新Session/Browser涵蓋。metadata只遷移P2真實implemented。
Task2 complete:68/68受影響PASS；Task3 complete:15/15PASS。最新完整suite1063/1063PASS（full-second.log.gz），全部原7fail已按上述明示原因遷移，未改已核准四招。
工程checkpoint before Task4：src真實實作已完成，Browser/Build/來源guard/部署/玩家驗收未完成，不冒稱release。接下來scripts/checkBotuoPassiveBrowser.mjs與新來源guard；normal Pages不得使用舊P1 source guard覆蓋新來源。
Task4本機工程完成：完整1065/1065、Build/149檔、厚甲native16/built8、P1native16/built8、P2native4/built2/scale10、新guard599及真src篡改負向/恢復PASS。完整報告REPORT.md，未宣稱CI/Pages/public/玩家PASS。
Browser observation ruling: 新session fixture清空facings/states以避免舊Move/KO殘留；原產品呈現/素材不變，代價是測試fixture需自行模擬真正場景重建。實際場景Restart另有真Browser驗證。
Final review: 原生單人依code-reviewer模板做分離diff/規格/流程自審；使用者禁止委派，非獨立審查。檢查五個Review Focus（kind隔離、同時刻排序、instance、MAX、未來ID）均有測試/真Browser；無待修Critical/Important。沒有推遲minor變更或私自擴張P3。
下一步：正常發布提交/CI→Pages→CI/local/public149對照，source unchanged不重跑本機Browser。玩家厚甲驗收仍PENDING。

Task4 complete: 正常Pages39881533879完整1065/1065、Build/599guard/build+deploySUCCESS，verification39881533921SUCCESS。artifact12470144586 ZIPdigest/CRC與CI/local149逐bytes一致；public149/149（3fresh+146相同指紋沿用）PASS。release1f6b47b4e30a867b1b8d294c69fdeaedc51f0b98/tree33fb1eab6d61b3f419e812de97b38fd19e651aa8。唯一下一Gate=厚甲玩家驗收，P1與原四招不重驗，P3仍blocked。此行政docs-only不重發版本。
