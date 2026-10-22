# 玩家決定：被動納入角色完整交付

日期：2026-10-22 Asia/Taipei；精確時間未提供。狀態：**PLAYER DECIDED / EFFECTIVE**。

## 玩家原文

> 那開發的角色技能順序應該要有被動技能，所以在P1 P2目前的狀態，要進行P1的被動技能，完成後做P2的被動技能，這算是彌補，以後的角色技能應該要有basic heavy special awakening 被動技能，這樣的順序，你把規則流程進度github，更新，並繼續P1 P2的被動技能，然後才能開發P3的角色技能，確認OK我說的沒錯，就執行

## 生效規則與範圍

1. 每名正式可玩角色完成已核准base/static/Idle/Move/KO後，技能製作依序為 **Basic → Heavy → Special → Awakening → Passive → 整角色結案**。前四招各包含已核准動作/VFX與Runtime；被動完成條件是可驗收的真實機能，不能用名字、描述、基礎屬性或同名Tier效果替代。
2. 被動有明確觸發條件、對象、效果/數值、時序、持續時間、刷新/疊加、Tier互動、KO/戰鬥結束/場景銷毀規則；依所需範圍完成資料驅動實作、驗證、發布與玩家驗收。被動若不需要四姿勢/攻擊GIF，不新增虛構主動施放動作或重做舊美術；確需新視覺才依既有素材審核流程。
3. 補完P1「疾行」直到被動PLAYER VERIFIED，才開P2「厚甲」具體設計/實作，P2同樣驗收後才能展開P3角色技能。這是本次已授權工作順序，不需要再次詢問是否補完。
4. P1/P2已完成四招與base所有原核准維持；目前完整角色狀態改為INCOMPLETE / PASSIVE PENDING。舊COMPLETE結案只代表舊四招與呈現範圍，不能推論獨立被動完成。普通Hit永久取消。
5. 任務授權與機制設計核准分開；本決定未指定疾行/厚甲觸發和數字。未展示的候選不能寫PLAYER APPROVED，設計審核不重問已定的順序或既有核准。
6. Shared passive definitions/runtime must route by ability references and generic condition/effect data, never branch on P1/P2 identity. Allies/enemies/manual/AI use one authoritative simulation clock. No independent UI timers or presentation-driven gameplay. Existing Tier scaling and damage/status policies remain unless a separately approved new passive explicitly adds a defined modifier.
7. 原feature分支/PR#1 open/unmerged；不main merge、不替代分支、不TD。保持全局無固定16MiB/required數量/reserve拒絕及逐檔安全/兩下載/完整required/ownership/reclaim/fail/destroy。來源未變的舊Gate沿用；真Runtime修改依影響驗證，不冒充舊證據仍涵蓋新行為。

## 已完成／下一步

- 完成：GitHub恢復、規則/流程/進度修正、五個被動未實作事實核對、P1共用引擎接點與候選方案整理。
- P1：`../M5C_P1_LUSHU_PASSIVE.md` 的方案A供玩家審核；非已核准數值、非正式書面規格、非Runtime PASS。
- P2：QUEUED，現有厚甲方向只有設計文字；不虛構被動減傷數字。
- P3：BLOCKED BY P1/P2 PASSIVE COMPLETION；不在本切片展開。
