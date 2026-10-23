# P2 厚甲：真實機制前檢與方向候選

2026-10-23 Asia/Taipei。**MECHANISM PREFLIGHT COMPLETE / NEW DESIGN REVIEW PENDING**。
恢復 HEAD `d6c18d8280adba78962eadb21e38dcb5e6e49962`，tree `c6209eb16fe5e7aa9ac9a7ee9294e3477a3d202c`；fresh fetch 一致，原 feature 分支、PR #1 open/unmerged，初始工作目錄乾淨。沒有觀測到無關 untracked；沒有清理、刪除或納入其他工作。

## 已核對實際來源

| 接點 | 事實與厚甲所需差額 |
|---|---|
| roster/abilities、catalog | P2.passive 為 implemented:false / effect:{}，catalog 透過 abilities.passives 引用。HP320/DEF9 與四招不算獨立厚甲。 |
| passiveDefinition、passiveRuntime | 定義僅 ordinary-distance → movement，四Tier完整倍率表；settle/nextBoundary/appendOrdinary/snapshot 皆假定距離與移速，不能只把 effect.type 改成 mitigation。需依 trigger.kind 分流共用條件，保留距離路徑原行為。 |
| statuses、statusSchema | mitigation/incoming magnitude 接受0–1；傷害乘數是1−MAX，不加算、不連乘。一般movement/outgoing上限15%、疾行顯式movement cap95%與減傷無關。厚甲候選須在被動定義限制0–50%；不全局收窄現有status schema、不提高既有安全值。 |
| tierEffectRuntime、tierEffects、tierScaling | 守群自身25/27.5/30/33.75%，4/4.32/4.6/5秒；T1護群延伸至受壓隊友，T3鎮守團隊13.5%/3.75秒。實際四Tier投影見 numerical-projection.json。厚甲的完整Tier表直接解析，不再乘defenseEffect/buffDuration/CD曲線。 |
| combatResolver、BattleSession | DEF先扣除，再套crit與status MAX乘數；所有實際傷害共用此路徑。session時鐘、KO清理、end clear已存在；planning/swept路徑目前與distance passive耦合，新trigger不得誤進distance分支。 |
| Collection model/view | 詳細頁由實際implemented與description顯示已實裝/尚未實裝；實作後才更新厚甲資料，描述完整四Tier、觸發、時間與MAX共存，無新增戰場HUD。 |
| PassivePresenter、statusEffects、assetPresenter | PassivePresenter現為無文字no-op；statusEffectGroups以四招category/ability provenance取素材，不能假造Special來源。新無文字護甲須使用獨立資料與真passive status身分，不改守群/鎮岳素材或冒用其效果事件。 |
| 既有審核與發布 | P1新收據/整角色結案/P1_PASSIVE_V2與P2鎮岳收據有效；原1014或1047/Browser/149公開資料僅涵蓋其原來源，不證明新厚甲。當前無需重部署。 |

沒有佔領點/佔領進度這項既有玩法可供厚甲直接掛接；「前線」須定義成角色相對位置，而非新增TD/地圖佔領系統。來源指紋見 status.json。

## 方案比較與推薦

- **A（推薦）：接敵／近接敵隊友 → 自身限時厚甲。** 真正回應站位；有固定防禦窗口與空窗，沿用MAX，無須修改四招。
- B：上述條件成立期間常駐減傷，離開立即失效。站位直接但邊界抖動、長期50%減傷與技能覆蓋較強，另需防抖規則。
- C：受傷後觸發限時減傷。實作接點簡單，但第一擊無防禦、站位定位弱，故不推薦。

以下為**未核准的A方向候選**，不是PLAYER APPROVED、正式已核准spec、實作計畫或Runtime PASS。

## A：具體條件、對象、數值

戰鬥running且自身存活、未受control、冷卻已好時，只要符合任一條件便自動觸發：
1. 有存活敵人與自身中心的平面距離 **≤2.2 arena units**；或
2. 自身 **≤2.4單位**內有另一名存活隊友，且該隊友 **≤2.2單位**內有存活敵人。

第二條排除自己；不要求隊友正在施放、指定敵人目標或已掉血。單純出生時站在隊友旁、周圍沒有敵人，不觸發。友敵陣營對稱，手控/AI共用；敵方P2同樣可觸發。這是本候選明確選擇的「接近正在接敵的隊友」定義，尚待玩家審核。

| Tier | 厚甲自身減傷 | 持續 | 從觸發起冷卻 | 無其他減傷、原100傷害時實扣HP |
|---|---:|---:|---:|---:|
| T0 | 20% | 4秒 | 8秒 | 80 |
| T1 | 30% | 4秒 | 8秒 | 70 |
| T2 | 40% | 4秒 | 8秒 | 60 |
| T3 | 50% | 4秒 | 8秒 | 50 |

只保護自己，沒有回血、護盾HP、嘲諷、輸出、位移或隊友被動減傷。四Tier值為獨立表，半徑/持續/CD不另隨Tier擴張。啟動時CD記t+8，效果t+4到期；期間不疊層、不刷新、不累積觸發。離開範圍仍保留餘下4秒窗口。CD好且條件仍成立，下一模擬檢查即再觸發，不必先離開重入；持續接敵時為4秒有甲/4秒空窗。

## 共存與真實收益限制

- 每個厚甲以獨立passive status key保存，不能寫base-mitigation或boyi.ally/boyi.team，不覆寫任何四招status；同角色獨立到期，複數P2也不共享CD。
- 實際總減傷 = MAX(厚甲、守群自身、護群、鎮守、其他合法mitigation/incoming)。不加算，不另套乘法，不把movement額度當成減傷額度。
- 同Tier守群與厚甲同時存在，實際總減傷依序 **25%／30%／40%／50%**。T0守群25%壓過厚甲20%，因此重疊時沒有額外5%或20%收益；守群先到期而厚甲未到期，才回到20%。T1–T3厚甲壓過守群自身，其隊友保護仍有效；厚甲到期後守群剩餘時間自然接續。
- 鎮岳傷害/幾何/instant0與tactical900/819ms、真命中/真受益者、T3鎮守13.5%/3.75秒不變；厚甲不擴大鎮守受益範圍，T0–T2不憑空取得鎮守。
- 此候選**不要求修改既有MAX/四招契約**，代價是強被動窗口會蓋過較弱自身減傷；Collection須如實說明。
- 表格為既有resolver的純算術投影，不是已接上新被動的Session、Browser或玩家體感驗證。固定攻擊方/防禦方/crit/其他status比較同Tier有甲與無甲，不能拿不同Tier基礎HP混比。未承諾整場減傷20–50%。

## 無文字呈現候選

使用共用資料宣告的 **琥珀色分節護甲弧片**，貼在身體兩側，不是頭頂牌、地面圈、數字、文字、連線或新按鈕。T0/T1/T2/T3分別1/2/3/4組短弧片，固定外框尺寸/actor scale/anchor/ground/mirror；增加段數而非放大角色。程序繪製，不重畫已核准角色、四招或新增PNG/GIF；色塊靜態、無閃爍，reduced-motion也可辨識。

弧片由真status id/expiry與現在MAX貢獻判斷：厚甲是有效最高減傷（含同值並列）才顯示；若被更強減傷覆蓋則隱藏，不能暗示疊加。更強效果到期且厚甲尚有效時再顯示，時鐘不重啟。既有守群/鎮岳VFX依原真status壽命保持。無任何passive badge/HUD文字或倒數條；Collection保留完整說明。

新幾何樣式尚未展示/驗收；正式實作後須以真Browser截圖確認與現有防護VFX可區分、HP條不被遮、角色比例不變，不能在此聲稱已肉眼可辨。若實作需要新美術，先明示並走該美術Gate，不自動四幀/GIF。

## 共用實作邊界與時序要求（候選方向，非實作計畫）

- generic spatial-pressure trigger攜帶enemyRadius/allyRadius/allyEnemyRadius；effect為self mitigation、完整tierMagnitudes。runtime只看kind、effect、teamId、存活與座標，不能判斷P2 ID或被動名稱。
- 定位條件在權威模擬取樣邊界判斷，使用現有≤50ms步進；不增加UI計時器、不做逐像素碰撞或捏造中途必定觸發。兩次取樣之間短暫穿越不保證啟動。固定起點/路徑在不同外部frame delta下結果須一致於既有步進精度。
- t=0或CD邊界已滿足可啟動；control中不新觸發，解除後符合條件再啟動；已生效厚甲不因control取消。施放/普通受傷不打斷或延後厚甲，不佔主動技能槽。
- 不變更既有同時刻damage優先於passiveTick的排序；已結算傷害不可回溯減免。需覆蓋到期、CD、傷害同時刻及非staged/staged兩路，避免開始step的resolveActions先後造成一個frame偏差。正式spec須明確固定每個入口的此順序。
- P1 ordinary-distance精確分段與已核准數值不動；空間trigger不能進distanceAt、ordinary append或movement專用snapshot。snapshot需分辨effect類型，不能把減傷顯示為移速。
- KO立刻清除自身passive record、CD/條件狀態與視覺。觸發後作為條件的隊友/敵人KO不取消已取得的4秒自身效果，不留下指向該角色的綁定。戰鬥結束clear；Restart建立新runtime/新epoch、CD歸零再按新局條件檢查；destroy釋放graphics/records/引用。Pause凍結session時間及剩餘時間。

## 後續最小驗證與Gate

本切片只做來源前檢/投影/文件，未修改src/public/tests/scripts/依賴/workflows或既有收據。不重跑舊1047/Browser/Build/部署/公開149比對。

新設計審核後：記錄精確核准範圍→依既有流程形成正式書面規格與原生單人實作計畫→共用實作→必要驗證→正常發布→玩家只驗厚甲體感與無文字可辨識效果→被動收據→P2整角色結案。新方案核准不是已完成Runtime/發布/玩家驗收；不重問開始P2或既有授權。

必要驗證範圍：兩觸發分支/邊界/自身排除/KO/敵我/手控AI/4Tier數值、CD/時間/Pause、MAX與獨立到期、來源隔離、兩P2、control/空間取樣/同時刻傷害、P1距離被動回歸、四招時序與受益者相容、KO/end/Restart/destroy。真native與built手機入口確認HP實扣/形狀/無文字/尺度，守群與鎮岳受影響範圍確認，其他已核准美術與招式不重審。Runtime變動後正常完整CI/Build、新來源guard/Pages及公開比對；舊P1證據不覆蓋新來源。

## 實際檢查紀錄

- `projection.mjs` 使用現有CharacterState/BattleStatuses/resolveDamage與Tier投影，四Tier輸出已保存於 numerical-projection.json。初版一次性probe用僅含hp的假物件，因缺damage()而失敗；修正為實際createCharacterState後通過。這是觀測fixture錯誤，產品沒有修改，沒有把此結果寫成厚甲Runtime PASS。
- 來源雜湊、舊guard、diff與文件一致性檢查結果見 audit.json（提交前產生）。原生單人自審，非獨立審查。
- **唯一目前玩家Gate：審閱本A方向的新觸發/數值/無文字呈現。** P1 COMPLETE；P2四招與全部已核准美術保持；厚甲未實作；P3技能BLOCKED；普通Hit永久取消。
