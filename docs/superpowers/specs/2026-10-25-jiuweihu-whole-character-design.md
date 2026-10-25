# P4 九尾狐整角色規格提案 v1 — 2026-10-25

狀態：**PROPOSED / PLAYER REVIEW PENDING**。新設計未核准、未實作；本文件不是 acceptance。權威現況 b7d696a56c1547de43b09afbe21e7a0e3f24c384。精確機器資料見 `docs/verification/P4_CHARACTER_PREFLIGHT/baseline.json`、`proposal.json`、`current-source-probes.json`。本次原生單人自審，不是獨立 reviewer。

## 1. 目的、方案與範圍

讓九尾狐成為可辨認的中遠距靈火爆發角色：靈火點射、狐焰集中重擊、九焰散華範圍爆破、青丘幻火單體大爆發、惑心獨立被動。既有四主動玩法保留，逐招補正式動作與獨立 VFX；被動必須有真正事件觸發、四 Tier 效果、冷卻及真受影響者視覺。

設計者建議方案 A：保留四主動，獨立被動增加短暫控制。方案 B 為新增跟身灼燒，需額外狀態週期傷害與刷新規則，且與現有固定餘焰容易混淆；方案 C 為魅惑轉隊，需改敵我、鎖定、勝負與所有權，超過此角色所需範圍。本次完整提案採 A 供玩家審核，**玩家尚未選定或核准 A**。

不新增普遍 Hit reaction、不重畫已核准形象，不更動存檔、Type 剋制、角色尺度、TD 或 P1–P3。P4 完成前不做 P5。整角規格一次審，製作及部署固定逐招；不得恢復整包發布。

## 2. current / proposed / approved / implemented

| 項目 | current / implemented | proposed | approved |
|---|---|---|---|
| Type / Role | Blast / Attacker；中遠距爆發 | 保留 | 既有內容接受保持 |
| portrait / Collection / Idle / Move / KO | 已有正式來源與既有核准 | 原 bytes、尺度、anchor、地面保持 | 已核准，不重審 |
| 四主動傷害、範圍、CD、模式時序、Tier 特性 | 已存在，32 個本次現況施放檢查 | 保留；新增觀察式 action lifecycle 與正式素材 | 新動作/VFX/GIF未核准 |
| P4 actionDescriptors | 無 | 每次只整合當前已過 Gate 的一招 | 未核准、未實作 |
| 獨立惑心 | implemented:false，effect:{}，尚未開放 | 正傷害後對一名存活真受擊者短暫 control | 未核准、未實作 |
| T2 惑心追獵 | 既有條件 +8% 傷害 modifier，不是 passive | 顯示名改「孤焰追獵」，ID/條件/8%保持，與被動區分 | 僅顯示名新提案待審 |
| Collection | 四主動短文、被動尚未開放 | 本文件第 9 節正式玩法文案 | 未實作部分不得提前上線 |

現況來源：`src/roster/{catalog,abilities,tierEffects,tierScalingProfiles,aiProfiles}.js`；`src/assets/{manifest,battleDescriptors}.js`；實際共用 combat 與 runtime 呼叫詳 REPORT。未找到 P4 專屬技能核准收據；本次不得代建核准。

## 3. 已核准形象與呈現契約

既有形象入口 `docs/art/M5C_B_JIUWEIHU_VISUAL_SPEC.md`、`docs/verification/M5C_B_JIUWEIHU_{STATIC_RUNTIME,LOCOMOTION,KO}.md`，較新 roadmap 已確認全 P1–P5 base 玩家核准；舊 PENDING 是歷史。

右向 canonical、左向 mirror，維持狐形臉、乳白/暖紅/焰橙/深色對比與九尾分組，簡化 2D cel shading。不能重新隨機設計武器或配件。後續 F3 必須先實際檢視核准 identity / Idle，依真圖核對左右配件，不能拿概念文件的可選道具當已核准裝備。

Catalog 邏輯 Idle 為 160×160、origin [.5,151/160]、scale 2；Move 四邏輯格 160×160、10fps，同 origin / scale。實際 manifest 是經無損 packing 的 Idle 160×137、Move 475×133，**不是壞圖或尺度差異**；必須沿用 `runtimePacking` 的 frame/trim 契約。KO 邏輯 512×512、origin [.5,397/512]、scale2，實際 512×438、top47。所有本體新姿勢按同一解剖尺度/地標/ground 正規化，不能按尾焰最大外框自動 fit 放大。

## 4. 四 Tier 屬性及傷害基數（保留）

| 屬性 | T0 | T1 | T2 | T3 |
|---|---:|---:|---:|---:|
| HP | 230 | 345 | 517.5 | 862.5 |
| ATK 原始基數 | 19 | 19 | 19 | 19 |
| DEF | 4 | 4 | 4 | 4 |
| 移速 | 1.7 | 1.7884 | 1.8768 | 2.0094 |
| 攻速 / 秒 | 1.05 | 1.134 | 1.2348 | 1.386 |
| Basic 間隔 / 秒 | .952381 | .881834 | .809848 | .721501 |
| 主動傷害 Tier 倍率 | 1 | 1.45 | 2.05 | 3.2 |
| 餘焰傷害 Tier 倍率 | 1 | 1.45 | 2.05 | 3.2 |

表中小數顯示六位，machine-readable 保留 JS 原精度。ATK 不先乘 Tier 後再重乘：`max(1,19×技能係數×傷害Tier倍率×outgoing×Type倍率−敵DEF) × 暴擊倍率 × (1−有效減傷)`。Type 倍率同類1、Blast對Power1.15、對Speed.85；減傷取有效 MAX。暴擊在扣 DEF 後乘，沿用 seeded RNG，不為畫面或被動重擲。

T2/T3 既有 pressure 在**該次傷害前**檢查目標 HP≤35%，或目標1.4內沒有其他存活同隊敵人，滿足任一 +8%。與 outgoing 狀態加總後上限15%；被動控制本身不加傷。條件由 `matchesTierCondition` 判定，不是必定常駐加成。

## 5. 五招完整數值與結算契約

### 5.1 靈火 Basic

自動普通攻擊，無玩家專用按鈕。單一存活敵人；最大射程4.2/4.41/4.62/4.956，AI最小間距 .8/.84/.88/.944、偏好2.8/2.94/3.08/3.304；最小間距是 AI 走位帶，非近身免傷限制。係數1；中性、未扣DEF/未暴擊/無條件加成傷害19/27.55/38.95/60.8。暴擊10%、1.5倍。CD0，依上表攻速 cadence。

**兩模式真命中皆0ms，沒有真飛行時間。** 保留即時結算，不能為了先播蓄力而延遲傷害，也不能假稱途中可閃。正式畫面使用瞬發手部靈火與真接觸火花；路徑只可做同刻短閃，不演成有飛行物的玩法。無目標/超距不傷害，不取得新目標補打；沿用現有 Basic 空放/cadence行為，不自行改成主動技CD。

### 5.2 狐焰 Heavy

單目標，係數1.5，原始中性傷害28.5/41.325/58.425/91.2；暴擊20%、1.75倍。CD3.5/3.22/2.94/2.52秒，**施放即開始CD**。最大射程4.6/4.83/5.06/5.428；AI最小1/1.05/1.1/1.18，偏好3/3.15/3.3/3.54。

戰術模式鎖定施放時 origin/目標點之 lane capsule，半寬 .45/.468/.486/.5175。蓄勢450/427.5/405/369ms＋飛行200ms，總真結算650/627.5/605/569ms。**lane僅檢查原單一target，不是穿透/群傷**；目標結算時仍在 capsule 才中，其他敵人走入不代吃，不追加出射後追蹤。非戰術模式仍0ms即時單體，不挪用戰術延遲。不得以美術改成赤鱬 locked-line 新機制。

### 5.3 九焰散華 Special

選一敵人作中心，範圍內每個存活敵人各1.35係數，原始中性每人25.65/37.1925/52.5825/82.08；各目標獨立15%暴擊、1.75倍，不把「九焰」做成九次扣血。CD7/6.44/5.88/5.04秒，施放起算。最大射程4.6/5.313/5.566/5.9708；AI最小1/1.155/1.21/1.298、偏好3.2/3.696/3.872/4.1536。

真半徑1.6/1.8304/1.9008/2.024，包含 T1 狐火增幅10%射程及範圍，不再多乘。戰術模式在施放時鎖定目標點，900/855/810/738ms結算當時在圈內的敵人；原target後來KO不阻止其他合法圈內敵人受擊。非戰術0ms，以當時目標位置為中心。AI至少2個當前合法敵人；手控可只打1個或空放。命中列表與原傷害/RNG順序保持，不為新被動重排。

### 5.4 青丘幻火 Awakening

原單體係數2.5，原始中性傷害47.5/68.875/97.375/152；不暴擊。CD13/11.96/10.92/9.36秒，施放起算。最大射程5/5.25/5.5/5.9；AI最小1.2/1.26/1.32/1.416、偏好3.5/3.675/3.85/4.13。

戰術模式650/617.5/585/533ms蓄勢＋250ms，總900/867.5/835/783ms。原target須仍在施放點半徑.7內；**大場面仍是單體，.7不隨Tier放大**。非戰術0ms單體結算。

T3原「青丘餘焰」：正主命中後在target當時位置建固定場域，半徑1.035，持續3秒，間隔.5秒；在+.5/+1/+1.5/+2/+2.5秒共5次，+3秒到期不補第6次。每脈衝當時在內的敵人各係數.12，不暴擊；原始中性T3基數7.296/次，仍扣DEF、Type、pressure/outgoing及減傷。不是保證每人總36.48實損。離圈停止受脈衝，進圈可受之；場地固定不跟 target，source KO即清除，主target KO本身不抹掉已建場。殘焰不觸發 `hit` Tier回呼、不遞迴生成場域。不同施放可有獨立areaId並分別結算，不自行刷新合併；沿用現行每Session最多12場域、滿時移除最舊。T0–T2無餘焰。

### 5.5 獨立被動「惑心」（全新提案）

| 項目 | T0 | T1 | T2 | T3 |
|---|---:|---:|---:|---:|
| 迷惑 / 無法行動持續秒數 | .20 | .30 | .40 | .50 |
| 獨立冷卻秒數 | 8 | 8 | 8 | 8 |
| 同次觸發對象上限 | 1 | 1 | 1 | 1 |
| 真target狐焰瓣提示 | 1 | 2 | 3 | 4 |

觸發：自身四主動任一發出 `amount>0` 的真直接傷害，傷害/KO同刻處理後，source和被擊target皆存活、source可行動且被動ready，才嘗試施加 control。不要求暴擊，不額外擲機率；不含餘焰、被動或其它間接傷害，不對隊友/自身觸發。開戰ready，無需主動按鈕，手控/AI相同。

每個來源 instance 各有 `readyAt`，每次最多成功控制一人。按 eventAt、原 actionSequence、targetInstanceId 選取**本次實際正傷害受擊者**；AoE打中多人時取此序第一個合法者，不能場外重選。原傷害事件及RNG順序不改，只排序被動候選。擊殺、閃避、零傷、空放不消耗被動CD。`steadfast`拒絕 control 時無CD，可檢查同次其他實際受擊者；成功建立真status才從該刻+8秒。成功後其餘候選作廢，不延後儲存到CD到期。

效果是短暫既有 `control`（magnitude1），不是永久轉隊、混亂攻友或新增傷害；禁止普通Hit動畫替代。控制期間不能一般行走或開始新技能。已完成的即時傷害不回滾；pendingActions在下一個共用結算邊界讀到source controlled即取消，CD不退；已發射的delayedImpacts在真impact時若source仍controlled則取消該未結算命中，若控制已到期則照原geometry結算，不在控制開始時回溯刪除。pending多段後續命中同樣依共用source可行動檢查取消；已存在persistent area不因control消失或停跳，source KO才清除。這採用現有啟用被動後的planned-motion共用控制路徑，不新增按角色ID的中斷規則。`telegraph.interruptible:false`目前不是對status.control的免疫承諾，不得把它宣稱為免疫惑心；真正control免疫只有有效steadfast。新Passive實作須對這些具體規則做受影響驗證，若發現既有路徑不一致，記錄差異並以本提案明定的惑心契約實作，禁止偷偷把其它既有控制/角色改版。

Tier秒數是獨立明確表，不再乘 controlDuration / buffDuration，最高.5秒。相同source/target/key採replace；CD8長於持續，正常不會自行連續刷新。不同source保留獨立status/expiry；`controlled()`為任一有效control即true，持續時間不相加，最晚有效到期為實際解除點。每個instance自己承擔CD，不能共用P4 definition級計時器。

## 6. 對象、排序、空放與取消（共同規則）

敵我用teamId，所有權用instanceId/actionId/statusId/areaId，不用P4角色ID分支。軟鎖沿用最近存活敵人，等距優先目前target，再保留既有陣列序；AI非Basic優先Awakening40→Special30（需2人）→Heavy20→Basic。既有ranged_burst走位/撤退/閃避維持，不強迫AI等待被動CD。玩家有效輸入立即接手、釋放0秒回AI，Basic無專用按鈕；手控可空放，所有效果仍按真受擊/真status出現。

主動最大射程施放判定與現行手控超距空放保持；AI最小/偏好帶不是額外碰撞。戰術延遲招鎖定geometry，結算不憑畫面追人或重選；非戰術即時路徑保持。技能開始扣CD、空放不退；KO/控制/取消依現有路徑，不把視覺收招時間當新技能鎖。普通傷害不播放普通Hit、不打斷核准動作。

同刻處理保留既有時間/來源穩定順序，先真傷害與KO，後候選被動；控制成功後才記CD與VFX。多個被動依source instanceId穩定排序，前一個控制導致後一source不能行動時，後者候選失效且不花CD。對方同刻已完成的傷害不被控制回溯撤銷。所有候選消費一次，用事件唯一token去重。

## 7. Pause、KO、結束與清理

Pause凍結simulation clock、CD、status/area時鐘及VFX播放，不用wall-clock到期；恢復不追補暫停期間傷害。source KO：依現行清掉其未完動作/延遲與場域；惑心候選、該source建立的status及VFX移除。target KO：不觸發新惑心、其status/VFX清除；已成立餘焰獨立按source所有權保持。control到期：當刻移除該status提示；多source仍有有效status時只留對應有效視覺，不延長已到期的record。

end / Restart / scene destroy清除候選queue、去重token、各instance被動CD/entries、statuses、areas、action/utility/passive sprites、pending impact、asset pins與owned textures；新session CD初始ready，不能沿舊epoch觸發。destroy冪等，視覺讀取snapshot而非改動傷害。兩次下載、required完整就緒、逐檔安全、所有權/回收不變；無16MiB總量門檻。

## 8. 動作與獨立VFX需求（只規劃，不生成）

| 招式 | 無FX本體辨識與F3方向 | 獨立VFX組 | 真事件要求 |
|---|---|---|---|
| Basic | 單手短促前點、另一臂收身，九尾低幅偏後；禁止雙手蓄球 | 手部瞬發、真target小型狐火裂花（2組） | 真命中0ms；無假飛行/延遲 |
| Heavy | 前後腳開立、雙臂前後拉開後向前送出，尾群後掠；輪廓橫向 | caster壓縮火團、粗狐焰飛行、target重火爆（3組） | 依兩模式/四Tier release與真damage；miss無target爆花 |
| Special | 單臂橫向大掃、另一臂向側後展、扭腰，尾群向側開扇；禁止Heavy推射輪廓 | caster扇掃、目標區九瓣焰陣、每個真受擊者爆花（3組） | 九瓣只是圖案，一次AoE；真circle縮放，非九連擊 |
| Awakening | 軀幹後展、雙臂高舉大V後下壓，九尾高冠包圍；最大縱向輪廓 | caster九尾焰冠、集中幻火柱、真target主爆、T3獨立固定餘焰（4組） | 單體主爆不誤演全屏傷害；餘焰按areaId/真脈衝 |
| Passive | 沿用真Idle/Move/Action，不強制跳回施法姿勢 | 真target迷惑狐焰瓣，四Tier同尺度1/2/3/4瓣（1組四變體） | 只在control成功record存在時；跟target、精確到期 |

四主動各F1–F4共16姿勢，13組獨立FX族（含被動四變體），只是需求，不是已產出或固定檔數。Basic即時玩法不可假演先蓄勢：0ms先顯示釋放/真命中，後續姿勢為跟隨與收勢；F3是待審視覺key pose，不自動等於命中時刻。其餘招按真預警蓄勢/release/impact映射，非戰術瞬發縮至真時點；未核准的frame hold分配留待該招GIF審，不能擅加實際windup。身體純視覺收勢可被後續合法動作覆蓋，不拖CD/cadence或控制角色。

同手機尺度 Basic＜Heavy＜Special＜Awakening，依輪廓、密度、明暗與獨立源分級；不能放大角色/真命中範圍。青丘幻火主爆視覺壓縮至真target；周邊裝飾不得冒充額外受擊。被動不放文字牌/HUD/連線。四Tier、normal/slow/noFX、左右mirror、Idle-return、miss、reduced-motion與多instance須在該招GIF提供；持續場域另示走入/走出/expiry/sourceKO。reduced使用較少動態/靜態狐焰瓣但不延長真status。

正式action完整PNG已載入且TextureManager存在才撤同record整層示意；任一缺真來源保留一份fallback。禁止ground-sigil膠囊/箭頭/方塊換皮。餘焰是獨立真area，須正式來源承接後只替換其對應fallback；不得因主動已正式化誤刪餘焰、盾、水膜或固定場地。

## 9. Collection文案草案（實作時逐招同版本同步）

定位：「操使青丘靈火的中遠距攻擊者，擅長集中爆發與區域壓制。」

靈火：「以靈火攻擊一名敵人，可造成暴擊。」

狐焰：「集中狐焰重擊一名敵人，可造成暴擊。冷卻依T0／T1／T2／T3為3.5／3.22／2.94／2.52秒。」

九焰散華：「在目標周圍綻放九瓣狐焰，對範圍內敵人各造成一次傷害，可造成暴擊。T1起擴大射程與範圍。冷卻7／6.44／5.88／5.04秒。」

青丘幻火：「以幻火對一名敵人造成強力傷害。T3命中後留下3秒餘焰，持續傷害區域內敵人。冷卻13／11.96／10.92／9.36秒。」

孤焰追獵（T2特性顯示名提案）：「目標生命不高於35%，或周圍1.4單位內沒有其存活隊友時，傷害提高8%。」

惑心：「直接攻擊命中後，使一名仍存活的受擊敵人短暫迷惑、無法行動。依T0／T1／T2／T3持續0.2／0.3／0.4／0.5秒，冷卻8秒；成功迷惑才進入冷卻。餘焰不觸發此效果。」

未完成Passive Runtime之前仍顯示「尚未開放」，不能先把草案寫進玩家介面。不寫工程/審核/素材限制。

## 10. 共用能力差異與最低驗收

既有：傷害/暴擊/Type、Tier投影、control/steadfast/status所有權、原敵我與AI/手控、fixed persistent area、action/utility/passive presenter、整層示意退休、Pause/清理。新需求：(1)不改時序的觀察式P4四主動事件與正式descriptor opt-in；Basic瞬發也須有start/resolve/actionId，但不可把0ms改成延遲；(2)generic positive-direct-hit 被動候選queue及精確同刻消費；(3)passiveDefinition接受event-hit→target control與明確Tier duration；(4)snapshot攜真target/statusId與四Tier VFX，拒絕/零傷/KO無視覺；(5)餘焰areaId/脈衝正式VFX來源，保留原geometry、5脈衝與多area行為；(6)同版本Collection。禁止 `if P4` 特例。

本次32 cast probes僅驗現況傷害事件/兩模式時序、T3area建立及clear，不是新被動、真Browser或手機驗證。後續每招只測新變更及直接受影響契約；只有共享queue/status或lifecycle有真變動時補必要受影響相容。控制與不同行動路徑的互動屬明確風險，Passive實作須依5.5明定規則覆蓋pending/已發射/到期先後/area/steadfast/同刻KO，不拿舊P1–P3 PASS冒稱新控制證據。

規格核准後唯一下一步：Basic靈火單張F3。其餘姿勢/FX→單招GIF核准→Runtime/必要headless與native+built真圖→正常CI/Pages/公開指紋→玩家遊戲核准並保存收據，才Heavy，再Special、Awakening、Passive。每短Gate更新WORK_PROGRESS、STATE、本角色WORK_LOG、handoff，同分支commit/push。**目前停點僅為這份新設計的玩家審核，未授權任何未見新美術或Runtime。**
