# 玩家決定：被動納入角色完整交付

## 2026-10-23 — P1疾行v2 PLAYER VERIFIED／P1整角色COMPLETE；P2厚甲 ACTIVE

玩家直接回覆已部署疾行v2「好我approved 紀錄github進度規則流程後。我創新的work 給我我要給新的work的prompts，讓她確認進度流程規則後 直接讓她繼續往下執行下一步 讓她無縫接軌開發，」。新收據 `docs/art/approved/lushu/passive/runtime-v2/acceptance.json` 綁定release d1a39397562f2345bec0243ede82b6376f89684d/tree981276199ebe572d0481decfaff76349c8bb9a3d與呈交文件feb3c1182f0fd76c28c211aef232da21cf022511。P1獨立被動Gate CLOSED，不再要求相同實機/數值/文字/四招核准。既有base/四招核准加上本次新被動核准完成P1角色補完；行政結案 `docs/verification/P1_CHARACTER_CLOSURE.json`，不是新造整角裝置測試。原生自動化physicalPhone:false仍代表自動化來源，不能據此重開已接受玩家Gate。

P1 COMPLETE／PLAYER VERIFIED；P2只有獨立被動厚甲尚未完成，現在ACTIVE／MECHANISM PREFLIGHT NEXT。新Work須先fetch確認後直接做厚甲真機制核對與具體T0–T3方案，不能停在恢復報告或重問能否開始。P2厚甲原定位是前線/近隊友防禦收益，未展示的新觸發/減傷/時間/CD/非文字呈現尚無設計數值核准；依現有流程只在真正新設計Gate停下，不冒稱厚甲已實作。入口 `docs/M5C_P2_BOTUO_PASSIVE.md`、新決定 `docs/decisions/2026-10-23-lushu-passive-player-acceptance.md`、完整handoff `docs/handoffs/P2_BOTUO_PASSIVE_NEXT_WORK.md`（共享P1_P2入口同步）。P2被動PLAYER VERIFIED前P3技能BLOCKED。

流程固定Basic→Heavy→Special→Awakening→Passive→整角結案。被動須有明確且夠可辨識的T0–T3實際成長，不拿基礎Tier數值或既有四招Tier效果代替；戰場不顯示被動文字牌/被動HUD/連線，Collection保留說明。P1疾行35/50/65/80%、3秒/CD6秒及全部已核准P1/P2masters/收據/GIF/尺度/anchor/ground/mirror保持，普通Hit永久取消，鎮岳真傷害真狀態/instant/tactical/MAX契約保持。原分支/PR#1open-unmerged、原生單人、無角色ID特例與全局素材政策不變。

此切片純文件/新核准收據[skip ci]，來源guard549靜態雜湊通過；沿用已保存1047/1047、Build、P1native16/built8、P2受影響相容與正常Pages39875078049、公開149項核對（3新取+146相同指紋沿用），未重跑測試/Browser/Build/部署/公開下載。舊PLAYER PENDING、PHONE PENDING、歷史失敗/容量規則與P2舊範圍整角COMPLETE不得覆蓋最新核准/獨立被動義務。所有交接維持單一完整自足可複製code block。


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
