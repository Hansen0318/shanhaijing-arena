# P2 守群 — Runtime 前檢與共用執行契約 v1

2026-10-21，Asia/Taipei。**契約審核待玩家核准；未整合 Runtime／未部署。**

恢復 HEAD `9e685823c892843132b53c36ca897cdb625fc76c`；分支 `feat/m0-combat-core-20260927`；PR #1 open/unmerged；初始 working tree clean。重新 fetch 後 HEAD 相同。main 僅讀取 `16f73932a0399979ba79b92f93f5ce1c1d1909b9`，沒有 merge／新分支。

## 1. 審核摘要

建議核准下列**純呈現契約及無損包裝方向**，不修改真實戰鬥規則：

1. 守群成功施放的同一個 simulation clock 已有減傷；短姿勢最多播放 640ms（四張各160ms），合法下一技能或實際移動立即取代短姿勢。不是額外前搖、技能冷卻或移動鎖。
2. 施放紋章最多320ms；持續防護依每一筆真實狀態顯示，兩者有獨立 owner。施放動作結束或被接技取代，不消除減傷或持續防護圖。`hit=true` 不產生攻擊接觸、傷害數字或敵方爆炸。
3. 共用 status provenance 指向實際來源技能／Tier effect，受益者不必是猼訑。每次刷新換 status 身份並清除舊呈現；來源與受益者的存活／可見性、到期與場景所有權控制生命週期。
4. 維持現有16MiB及131072-byte reserve。候選素材由核准像素忠實派生；32個既有貼圖僅候選移除零RGBA空白，42個既有必要key全保留，新增3個守群key。離線45-key同時駐留＋reserve為16,693,408 bytes，額外餘裕83,808 bytes。

本文件是本次**唯一新的契約審核材料**。已核准的 F3／四姿勢／視覺包不重問。沒有把本文件、離線量測或候選PNG標示為玩家已核准或實機工程通過。

## 2. 權威及既有證據沿用

三份核准：`docs/art/approved/botuo/special/{f3-v1,poses-v1,composite-v1}/acceptance.json`。舊候選 README/manifest 中 pending 是歷史，不改寫原檔。PNG／prompt／QA／GIF／SHA256 原檔保留。

`P2_SPECIAL_PREFLIGHT/source-reuse.json`：mechanics-snapshot 所列12個來源 hash 全相同。沿用32 direct、8 lifecycle、2 AI、4 paired damage，不重跑。覆蓋 abilities/catalog/Tier/status/battleSession/AI/statusPresentation/ArenaScene/AssetPresenter。額外本次读取 actionPlayback/descriptors/battleDescriptors/runtimePacking/framePacking、castVfx、cache/residency/sceneAssetGate；無 production 修改。

| Tier | 自身減傷 | 持續秒數 | CD秒數 | 額外一名隊友減傷 | 選取半徑 |
| --- | ---: | ---: | ---: | ---: | ---: |
| T0 | 25% | 4 | 8 | 無 | 無 |
| T1 | 27.5% | 4.32 | 7.552 | 16.5% | 2.52 |
| T2 | 30% | 4.6 | 7.104 | 18% | 2.64 |
| T3 | 33.75% | 5 | 6.432 | 20.25% | 2.832 |

coef0、windup0、self-target不變。T1+實際 post_cast `boyi.ally` 選一名附近存活隊友；不是全隊。套用後離開選取半徑不移除。沒有適合隊友時仍有自身防護。AI既有敵人距離條件與手動可空場施放、readiness/control/KO/pending-action仲裁不變。

同 source/target/key 替換；不同key/source可共存，數值取最強減傷MAX，不相加、不吸收。刷新與替換依真實新record；換一名受益者不憑空清除前一人的獨立有效record。到期判定 `now + 1e-9 >= expiryTime`；來源KO清除其自保與隊友狀態；受益者KO只清除相關record。ordinary damage、接技、移動、套用後控制不刪除已存在的減傷。

Heavy資料完整沿用：runtime-v1 acceptance/runtime-manifest/vfx-manifest、`P2_HEAVY_RUNTIME/{engineering,release,player-acceptance,public-fingerprint,ci-build-inventory}.json`。136 affected、8 WebGL、24 native-trim、2 built-entry、110 CI-local檔案、15 public完整檔案屬原有證據，本次未重跑。Heavy COMPLETE／PLAYER VERIFIED、live `acf454741757f58efa980fdcd03f028a472e87a3` 不變。

## 3. 共用觀察式執行契約（提案，尚未實作）

### 3.1 新資料種類與來源歸屬

既有 `actionDescriptor` 強制 impactFrame=2及blade/contact；`ActionPlayback` 只有 staged／hit-resolve語義。**不可把utility偽裝為hit action。** 新增 opt-in `kind: utility` 呈現descriptor與獨立驗證分支，未opt-in的所有技能照原路徑。

技能定義的presentation資料宣告：`actionLifecycle: utility-observed`、gesture descriptor、activation descriptor、status visual rules。此字串是新schema提案，不能直接當現有可執行配置貼進src。角色catalog僅登錄美術descriptor；共用執行器不出現P2、botuo或boyi身份條件。

成功utility施放完成效果與post_cast後，既有recordCast觀察事件附加 `presentationId`（session內遞增）、`eventAt`（simulation seconds）、`abilityId`。既有actorId/category/source/targetId/hit保留；不新增一次效果呼叫或額外damage/resolve事件。不成功的技能沒有gesture/activation。source==='player'或'ai'是控制來源，**不等同技能來源身份**。

BattleStatuses.apply增加**可選且不可變的呈現來源** `presentationSource: {abilityId, category, effectId}`。主技能效果在applyAbilityEffects的mitigation apply傳入definition.id/category及主效果識別；TierEffectRuntime傳入同一真實ability id/category與`e.id`。這是來源標註，不能改sourceId/targetId/key/magnitude/startTime/expiryTime/policy/tags/data或取代規則。`applyMitigation`舊呼叫維持相同default；未提供標註的歷史狀態走既有fallback，不能按名稱猜來源。

source definition由status.sourceId解析，再用presentationSource.abilityId選擇資料規則。主mitigation與`boyi.ally`在資料表綁相同防護style；此effect id僅存在資料，不能在renderer寫分支。來源角色KO/離場時不猜受益者是哪個catalog。record來源對不上其已註冊技能／規則時不播放守群圖，保留既有fallback/diagnostic。

### 3.2 短姿勢、施放與接技

| 通道 | 起點／時間 | 取代／結束 | 所有權 |
| --- | --- | --- | --- |
| 普通gesture | 成功事件t；F1[t,t+.16)、F2至+.32、F3至+.48、F4至+.64 | 下一合法動作start、實際Move、合法取消／KO／場景清理；最晚t+.64 | session + actor + presentationId |
| reduced gesture | t起F3單張，最多160ms | 同上；沒有強制完成 | 同上 |
| activation | t起，最多320ms；320×260 logical footprint | 保留跨接技；來源KO／離場／scene clear或到時結束 | session + caster + presentationId + activation |
| recipient state | 真實record.startTime起至實際record消失／到期 | refresh/replace、source或target KO/離場、scene clear；與gesture無關 | session + status.id + sourceId + targetId + abilityId + effectId |

160ms/320ms為**此次新提案的視覺窗口**，不是戰鬥時間改動。減傷t就生效，t即可接ready Heavy/其他合法技能或移動。若同clock有Special→Heavy，按真實事件順序讓Heavy body立即取得ownership；不能等Special四張播完，也不能在Heavy結束後補播Special。施放紋章可繼續其原320ms獨立窗口，狀態圖繼續到真實expiry。沒有後續動作時才完整展示四張。

同clock以遞增presentation/event序號仲裁，不按毫秒去重不同施放；同一presentationId重送只處理一次。非法／未ready的按鍵不產生新動作。Move取代依複製的實際movement狀態／世界位移，不能因讀取畫面讓simulation停住；已在移動時本次gesture讓位給Move。普通受傷不取消，普通Hit仍CANCELLED；合法控制／KO依原有規則。既有Heavy延遲真resolve仍依其A契約處理，不因utility丟失或改傷害。

presentation只能讀事件／複製的狀態與frame；不得呼叫executeAbility、改clock、施加控制、改CD、HP、位移或觸發Tier effect。成功utility `hit=true`不走offensive contact。守群沒有contact descriptor與攻擊目標爆炸。

### 3.3 持續狀態與清理

現有AssetPresenter.renderOverlays是recipient catalog + type、id=`actor.type`；一個mitigation來源可以誤選另一來源的圖，且不能區分refresh。新共用reconciler用上表完整record身份追蹤，每render從實際statuses.forActor(target,now)重建有效集合；只有來源與受益者都存在／存活且受益者有可見actor root才建立圖。

同recipient同style多筆狀態共用一個顯示（style group保留全部record身份集合），強度選同style的最大magnitude、同值用startTime及record id穩定排序；數值仍由原damageMultiplier的MAX決定，renderer不參與。刷新新record接手，舊實例撤下；另一來源仍有效就不閃掉。不同style沿用真實類型，按資料priority穩定排序，最多4個不同style/recipient；超額只降視覺層次，不能刪狀態／資產或影響傷害。此上限是呈現提案，非新增遊戲效果。

持續圖固定224×234、origin(.5,.5)、root offset(0,-88)、depth4（actor前景depth5）；activation同root offset／depth。這沿用主要GIF的畫面位置；原比較板的196px中心不覆蓋主要GIF的186px中心。每render anchor=`project(actual actor world XY)`，鏡射圍繞各自actor root。source與target各跟自己的facing；**不使用Heavy圖片origin或F3排版的30px平移**。normal state alpha=.9、reduced=.78，固定圖無pulse／strobe；activation normal沿既有preview fade，reduced固定alpha=.8至結束。沒有隨機跳動或假傷害脈衝。

pause只讀相同simulation clock：不延伸expiry、不走牆鐘；恢復後讀真實狀態。慢frame第一次看到已過期狀態不補播一幀，不把Heavy的late-contact保留規則套到減傷。refresh不沿用舊expiry。clearTransientCombat／scene shutdown/destroy清空呈現owner；Restart新session namespace防止status-1重名沿用。

目前無任意actor-array移除／cleanse API：離場時reconciler只撤下圖，不自行修改BattleStatuses；若同source/target仍活著的真實record重新可見且未到期，可恢復其圖，不重放activation。正式cleanse事件不在本次範圍，不聲稱已存在。

### 3.4 真實機制差異表

| 項目 | 現況 → 提案 |
| --- | --- |
| 效果、傷害/CD/range/Tier/AI/控制/KO | 全部不變 |
| onset／下一技能／移動 | 同clock立即 → 同clock立即 |
| 狀態刷新、MAX、到期、source/target KO | 全部不變 |
| 事件與record | 增加可選觀察id/time與來源metadata；不新增效果或resolve |
| 姿勢與特效 | 增加可被取代utility gesture、獨立activation、真實狀態呈現 |
| 素材 | 新3個key及共用lossless frame metadata候選；原source檔案不變 |

真實戰鬥機制／時序差異為零。實作若發現無法保持此表，必須列實際差異回到玩家審核，不能借本契約更動機制。

## 4. 尺度、像素及包裝前檢

實物：`docs/art/candidates/botuo/special/runtime-pack-v1/packing-manifest.json`與同目錄PNG；量測/QA在`P2_SPECIAL_PREFLIGHT/`。

已核准400×320 review cell／1600×320 strip完整保存。新Runtime候選用四個共同200×200邏輯格，等同review各格的[100,90,300,290]，裁下部分**四通道全部為零**，反貼完整review格的RGBA逐byte相等。root(200,274)→(100,184)、origin(.5,.92)、scale200/72=2.7777777778；密度為1 world unit/review texel，原master→review的.126不再縮小。四姿勢來源hash／完整LANCZOS review raster逐一相等。新frame metadata保留共同邏輯格，不以獨立緊框當作display size。

既有Idle、Move、Basic、Heavy的logical canvas/scale/origin/FPS完全不變。Special FPS6.25／160ms×4僅供此utility gesture；loop=false、staticFrame2。不把Move的原12fps改成GIF示意10fps。

`landmarks.json`及`landmarks-QA.png`以角／吻、肩／腰、腰／衣襬、護臂、雙蹄多點共同檢查，**手動投影標註約±2px**，不是自動解剖或單一臉尺。`body-scale-QA.png`去標記；`transitions-QA.png`以現有descriptor投影Idle→四Move→四Basic→四Heavy→四Special→Idle，同root、雙向，完整數值在transition-measurements.json。Special直立抬高上身、蹄距與護臂投影不同；不能將外框高度fit到Idle，也不從單一span導出全身乘數。保留原review密度是本次候選決策，最終game raster與玩家尺寸驗收尚未發生。

打包使用每張frame的all-channel非零範圍，無threshold、清色、刪alpha1或resampling；2D shelf atlas不旋轉，以原frame序號映射，不改播放順序。若舊frame已有native trim，compose原logical size及offset，不能把trim後矩形視為新logical canvas。所有被裁空白可完整補回RGBA；正向／鏡向整張logical frame與root座標相同。

**無gutter物理atlas是容量方案的一部分**（現有native trim也用相鄰region）；200×200等寬邏輯格與原寬裕透明邊保留。CPU roundtrip不保證Phaser的linear sampling無縫。本次未聲稱browser無bleed／native quad raster相等；核准後必須比較original-native-trim與候選native-trim、both-facing、所有repacked regions，若有取樣污染則先修包裝／共用取樣，不能降清晰度或放寬比較容差蒙混通過。

## 5. 完整容量及駐留方案

| 項目 | bytes／尺寸 |
| --- | ---: |
| 目前42 required | 16,622,164 |
| cap | 16,777,216 |
| reserve | 131,072 |
| 目前reserve外餘裕 | 23,980 |
| 候選32個舊貼圖零RGBA空白回收 | 946,948 |
| 守群姿勢 atlas | 538×162，348,624 |
| activation atlas | 320×259，331,520 |
| state atlas | 224×231，206,976 |
| 新3key合計 | 887,120 |
| 新45 required（未改key仍保留） | 16,562,336 |
| required + reserve | 16,693,408 |
| reserve外餘裕 | **83,808** |

每個key的實際PNG尺寸、encoded bytes、SHA256、decoded bytes與完整45-key集合見`capacity.json.fullRequired`；每個舊key的前後尺寸／邏輯frame／零RGBA反貼證據見packing-manifest。含全部portrait/Idle/Move/KO/P1/Basic/Heavy，不排除任何required，也不提高cap。P3/P4/P5既有Move packs列為excludedCompletedMovePacks，完全不重做。

這32份是**候選物理表示**，沒有安裝到public、沒有改核准source，沒有重新製作P1／Basic／Heavy美術或重開驗收。其修改面為通用frame/trim metadata與region-aware static effect繪製；當前effect renderer會依實體texture尺寸fit，不能只換PNG就宣稱等價。未來共用region-aware helper必須用原logical canvas/size/origin，涵蓋Idle/KO、action body、blade/contact、afterglow/independent contact；已trim frame須合成offset。P1等舊技能只驗證受包裝影響的等價性，原玩家接受繼續有效。

目前實際prepare重新量測兩種載入次序：42key／16,622,164、0fail、清理0。候選`candidate-residency.json`以**真實cache/residency guard**載入實際候選PNG header，全45keys同時pin，正／逆兩種次序：scene已載入／待upload reservations high-water及cache high-water皆16,562,336；0fail/0evict；destroy及cache.trim(0)後0bytes。decoder／Phaser texture manager邊界用double，非真GPU記憶體證據。

load plan：只在新場景cold ownership建立時換表示；舊presenter dispose→紋理清空→cache.trim(0)→新manifest/prepare。**禁止同場景先保留舊42貼圖再上傳32替代圖**。32替代表示沿用相同key，不共存；critical portraits/Idle先、其餘required再；只要本場有提供守群style的來源，就預載/保護其3個key，受益者換人只新增sprite不重傳texture。全roster45-key集合是最壞包絡；實際encounter仍只載本場所需，包含重複P2的6actor共用相同貼圖。manifest根據來源技能包含state圖，不能以「受益者是別的角色」漏載。

decoded cache與scene cap**各自**16MiB，不能相加宣稱整個browser只用16MiB；PNG壓縮大小不等於decoded。所有45required包括pending reservations都已入帳，並留reserve。Image decoder工作記憶體／driver／framebuffer／裝置GPU未量測；沒有捏造FPS或GPU數字。熱更新與跨scene共存不在核准方案內。

## 6. 實作後最小必要驗證（本次不執行）

- 新generic utility/來源metadata與schema測試；成功／失敗施放、重送去重、same-clock兩事件順序、合法接技/Move、reduced與非法輸入、ordinary damage不打斷、control/KO/到期。
- 新status reconciler：T0／T1–T3正確單一隊友／非P2受益者、換人不清舊record、refresh新id、重複來源MAX、可見性離場/回場、Pause/Restart/shutdown/destroy；activation與status獨立，無false contact。
- 受影響source-to-pack CPU RGBA/雙向/root契約；所有32替代key及3新key的實際Phaser native-trim取樣、shared renderer變動所影響的body/FX/KO/afterglow。用原native-trim control而非任意full quad容差；不得把離線投影當browser結果。
- 全required cache/residency真實整合、cold/warm/Restart、不失敗/不evict pinned／清理0；shared presenter/action、Heavy A與直接受影響Tier/機制配對差異、build/asset guard。無關全suite不例行重跑。
- 實際built入口/雙向/reduced的守群→立即Heavy/Move、expiry、source及recipient KO、Pause/Restart；成功後另經scope release／Pages／公開fingerprint／玩家手機Gate。此契約審核不等於部署授權。

五個既有suite failures保留，見`P2_STATIC_SCALE_FIX.md`：basicWindup兩項、formalChapter一項、heavyWindup一項、lushuBasicAssets一項；本次不稱已修復或全suite通過。

## 7. 本次實際檢查與停止條件

可重現命令（不改production）：

```sh
node docs/verification/P2_SPECIAL_PREFLIGHT/measure.mjs
python docs/verification/P2_SPECIAL_PREFLIGHT/pack.py
python docs/verification/P2_SPECIAL_PREFLIGHT/qa.py
node docs/verification/P2_SPECIAL_PREFLIGHT/residency.mjs
```

檢查涵蓋來源hash、既有美術inventories、原review→新邏輯格／atlas RGBA反貼、鏡像／coordinate等價、完整required集合與真實guards的候選載入；結果見source-reuse／packing-checks／candidate-residency。QA是離線圖而非遊戲錄影。只修改docs/art，使用[skip ci]；無src/public/workflow/approved修改，無build／全suite／瀏覽器／部署／手機驗收。

**STOP：玩家審核本文件§1／§3契約與§4–5候選包裝方案。** 尚無executable acceptance receipt，不以此次交接文字自行核准。核准後先記錄精確文件／packing-manifest hash及玩家原文，再做必要共用Runtime整合；不重問視覺Gate。P1 COMPLETE、P2 Idle/Move/Basic尺寸CLOSED及Heavy PLAYER VERIFIED保持；不開Awakening/P3、不merge main、不另開分支、不引入TD。若需後續handoff，維持單一完整自足code block。
