# 被動VFX／玩家文案修正

## 2026-10-23 — VFX與文案修正已發布；P2整角結案／只待新增P1風痕確認

Release32424075b5c91844187fc80a566a9140c7e955d6／treeab0a6733ff312d48fef3979e1e0697aaaf74a6de，正常Pages#1105/run39902216798 build120246115913+deploy120246346745 SUCCESS；CI完整1070/1070、Build、585guard PASS。驗證workflow39902216942 SUCCESS，精確沿用本次新來源Browser證據；既有P2覺醒workflow39902216764被src/**自動觸發且SUCCESS，非手動重跑。artifact12479621205 SHA256b5c8ed9085784394daa83a9ebc42d1c41dbdaed3dcd95028efb696a28e9df058、ZIP CRC與CI/local149逐bytes一致；公開149/149（3新取+146相同path/bytes/hash指紋沿用）PASS，證據docs/verification/PASSIVE_VFX_COPY_REVISION/。

Collection已直接修正P1/P2及尚未開放被動來源，只呈現玩法效果/Tier數字/持續CD，移除開發規則/安全額度/已實裝。所有玩家介面禁止工程規則混入文案；全現有與未來被動完成必須有對應真status VFX、獨立Tier成長/辨識、reduced-motion可讀與到期/KO/end/Restart/destroy清理。厚甲琥珀護甲保持；疾行新增青色風痕1/2/3/4組，全部既有數值/時序/MAX/美術尺度不變。新decision為全局硬規則，不只適用P2，未來未知效果仍須擴充共用系統及實證，不宣稱已實裝。

玩家「確認好我就approved目前」之厚甲VFX/全局規則前提已確認並存精確收據docs/art/approved/botuo/passive/runtime-v1/acceptance.json，要求文案修正亦已部署。14/14既有base/四招/新被動收據與證據hash一致，P2行政整角結案docs/verification/P2_CHARACTER_CLOSURE_WITH_PASSIVE.json；不重問厚甲、P2四招/裝置或捏造逐Tier量測。原P1機制/四招/美術核准保留；新增青色風痕尚未被玩家看到/核准，只此新增呈現Gate待觀察，不能寫新VFX PLAYER APPROVED。P3仍BLOCKED，不自行展開P3/TD。

遊戲https://hansen0318.github.io/shanhaijing-arena/?passive=3242407 。下一合法步驟只呈交新增P1風痕與精簡文案供觀察；有新缺陷才修受影響範圍，來源未變不重跑測試/Browser/Build/部署/公開下載。此次為發布後行政文件[skip ci]；原分支/PR#1open-unmerged、原生單人、保留所有核准masters/收據/GIF/scale/anchor/ground/mirror/無關untracked、普通Hit永久取消與素材政策保持。固定Basic→Heavy→Special→Awakening→Passive(真效果+Tier+VFX+清理+驗證+發布+玩家驗收)→整角結案，所有handoff單一完整自足code block。下方舊PENDING/發布NEXT為歷史，以本節和最新收據為準。



切片2完成：疾行native16/built8、厚甲native16/built8、Collectionnative5/built5 PASS，手機截圖已檢視。所有舊數值/時序/美術/尺度保持。切片3新guard585檔與真實來源/VFX/文案竄改負向測試PASS；完整1070/1070、Build PASS。guard首次綁定當下持續寫入的完整測試log造成自我雜湊變動，保留guard-log-binding-attempt.log；改為綁定穩定的來源/Browser JSON/截圖/授權，完整test原始log仍保存但不作正在寫入的輸入。修正後完整1070/1070與guard均PASS，並未刪除Browser/來源綁定。

目前正常CI/Pages/public NEXT，P2既有機制/護甲VFX核准已記錄但文案修正須發布；新P1風痕尚未玩家確認，原P1已核准數值/動作不重開。原生單人static/diff自審，沒有獨立review，P3保持BLOCKED。

基線42bcb73f33ee0d380028c3cb51e7da250573f628/treecdf24956a8b8cf1500aac7839a147330f7682717；fetch一致、工作目錄乾淨。
根因：roster/abilities.description混入開發規則，Collection直接呈現；model額外注入工程用已實裝標籤。既有測試甚至要求出現「無文字」與移速安全額度，需改成玩家效果資訊測試，而不是保留錯誤契約。厚甲確有VFX；疾行沒有獨立VFX是本次全局要求的補完缺口。
範圍：直接修正來源文案與狀態用語；data-driven movement speed-streaks + 真snapshot/presenter，保護所有既有數值與美術；新增全角色資料測試以確保每個已啟用被動有相符VFX。原生單人，不重問設計/執行；這是玩家直接要求的既有流程修訂，不造未展示新VFX核准。
實作切片：1文案與VFX資料/共用呈現RED→GREEN；2真native/built P1/P2受影響驗證與Collection；3新source guard、正常發布/公開比對、核准及進度規則。

切片1：RED4失敗符合缺口；共用呈現/Collection修正後target12/12。完整首次1069/1068/1fail為舊formalChapter要求未開放被動仍提供虛構描述；改為要求description或誠實尚未開放，未移除名稱/真效果斷言。最新1069/1069、Build PASS，原始log均保留。
