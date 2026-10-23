# 被動VFX／玩家文案修正

切片2完成：疾行native16/built8、厚甲native16/built8、Collectionnative5/built5 PASS，手機截圖已檢視。所有舊數值/時序/美術/尺度保持。切片3新guard585檔與真實來源/VFX/文案竄改負向測試PASS；完整1070/1070、Build PASS。guard首次綁定當下持續寫入的完整測試log造成自我雜湊變動，保留guard-log-binding-attempt.log；改為綁定穩定的來源/Browser JSON/截圖/授權，完整test原始log仍保存但不作正在寫入的輸入。修正後完整1070/1070與guard均PASS，並未刪除Browser/來源綁定。

目前正常CI/Pages/public NEXT，P2既有機制/護甲VFX核准已記錄但文案修正須發布；新P1風痕尚未玩家確認，原P1已核准數值/動作不重開。原生單人static/diff自審，沒有獨立review，P3保持BLOCKED。

基線42bcb73f33ee0d380028c3cb51e7da250573f628/treecdf24956a8b8cf1500aac7839a147330f7682717；fetch一致、工作目錄乾淨。
根因：roster/abilities.description混入開發規則，Collection直接呈現；model額外注入工程用已實裝標籤。既有測試甚至要求出現「無文字」與移速安全額度，需改成玩家效果資訊測試，而不是保留錯誤契約。厚甲確有VFX；疾行沒有獨立VFX是本次全局要求的補完缺口。
範圍：直接修正來源文案與狀態用語；data-driven movement speed-streaks + 真snapshot/presenter，保護所有既有數值與美術；新增全角色資料測試以確保每個已啟用被動有相符VFX。原生單人，不重問設計/執行；這是玩家直接要求的既有流程修訂，不造未展示新VFX核准。
實作切片：1文案與VFX資料/共用呈現RED→GREEN；2真native/built P1/P2受影響驗證與Collection；3新source guard、正常發布/公開比對、核准及進度規則。

切片1：RED4失敗符合缺口；共用呈現/Collection修正後target12/12。完整首次1069/1068/1fail為舊formalChapter要求未開放被動仍提供虛構描述；改為要求description或誠實尚未開放，未移除名稱/真效果斷言。最新1069/1069、Build PASS，原始log均保留。
