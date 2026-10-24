# 正式VFX／示意來源盤點（2026-10-25）

狀態：唯讀來源盤點完成；尚未Runtime退示意，不宣稱新行為PASS。

以3d156f6及核准收據為基線。機器清單`source-audit.json`列出20招，12招有正式action descriptor（P1/P2/P3各四招），其引用PNG均存在；8招無正式動作（P4/P5），維持fallback。完整技能階段、assetKey、path、SHA256、預警metadata與來源55檔均保存。重建：從repo root執行 `node docs/verification/P3_PASSIVE_RUNTIME/readability-revision/audit.mjs`。

|來源|現況證據|後續最小處理|
|---|---|---|
|施法／飛行／真命中|`AssetPresenter.cast`依action descriptor處理後return；utility、healing、staged、area-observed各有正式分支，不走後面的generic `characterVfx`。P1覺醒三段分別有blade/contact。|沿資料/實際loaded texture判斷正式階段成功解析；真native/built檢查該階段只畫一份、缺正式來源才fallback。不能只看角色是否有正式本體。|
|未正式招式fallback|`characterVfx`接`resolveCharacterAsset`；render依texture決定image或graphics；預設有burst/ring/projectile。|P4/P5與沒有對應來源的階段保留fallback；不加角色ID條件。另檢查generic skillOverlays成功時不能與同階段base示意共存。|
|主動狀態|`statusEffectGroups`由真status的presentationSource→caster ability/category/effectId→正式statusVisuals；`renderOverlays`已有authored集合避開同status的通用overlay。P2守群/鎮岳與P3潤澤均有正式狀態。|保護正式盾/水膜。確認「style存在但實際texture缺少」與「成功解析」區別；採loaded-source事實，未解析時須有可用fallback，不可提前移除。|
|被動狀態|P1 speed-streaks、P2 guard-plates屬已實作的正式程式化被動效果；P3 paired-fish PNG屬正式被動來源。|不把Graphics一律視為示意。P1/P2已核准正式被動保護；P3只改本次待審顯示方案。|
|命中預警|`TelegraphPresenter.render`每次將areas+threats直接畫幾何，沒有接收正式來源解析資訊。`ThreatLedger`有sourceId/category/真geometry/impactAtMs，沒有asset ownership；ArenaScene每幀無條件傳入。|這是獨立於正式cast的疊層風險。必須新增共用來源/階段解析與呈現涵蓋契約：正式warning須完整承接真lane capsule端點、circle範圍、敵我與impact進度；成功承接後幾何退場，未承接不能僅以有blade/contact刪除。不可改ThreatLedger命中資料或傷害時序。|
|持續場地|TelegraphPresenter將area轉為persistent circle/lane；P1/P2/P3 effect.areaRadius並不等於存在持續場地。|按實際area record/source/category確認來源與有效期，不把瞬間AoE誤算為持續buff；來源未覆蓋完整場地資訊前不擅刪。|
|固定褐色橢圓／中線|`ArenaScene.create`固定280×170、0x5F513B，與技能無關。|保留本次範圍，不做場地重設計。|
|本體示意|`ArenaScene.applyFrame`依實際可見正式actor sprite隱藏marker及label。|已是共用asset-driven替代，不因本次VFX要求重改本體/HUD。|

## 可讀性顯示候選

新衍生在`docs/art/candidates/chiru/passive/readability-review-v1/`，不更改approved masters或原收據。原雙魚PNG保留alpha、大小與構圖，確定性色映射為亮白雙魚/薄荷綠短紋。真受益者當前可見frame的alpha外輪廓加3 logical px薄荷綠亮邊；非全身mask，不更改原角色像素/scale/anchor。該亮邊不得在Runtime綁死此Idle候選PNG；須跟隨真受益者目前姿勢/方向/幀，使用共用frame/texture來源。

候選魚印由原depth4（本體後）改depth6（本體前、低於預警8與HP12）；亮邊在本體周圍。normal沿原0–200ms完整顯示、200–650ms內收淡出；輪廓只淡出、不縮角色。reduced同Tier同位置靜態淡出。正amount受益者才有，caster未受益無標記；650ms與KO/end/Restart/destroy立即清理均是必須由後續真Runtime證明的契約。

## 下一Gate與證據界線

先呈交11 GIF及同尺度手機混戰比較，等待本次修正版視覺/GIF明確核准；此時沒有產品差異、不Build/Browser/CI/Pages。核准後才實作新顯示與正式warning退示意、補必要source-binding真native/built（resolved vs missing fallback/不雙疊/敵我/多instance/四Tier/左右/normal-reduced/自療他療zero/Pause/KO/expiry/end/Restart/destroy/手機Collection），以及P1/P2/四主動受影響相容，正常CI/Pages/public指紋。

舊1221／native32+built4／168檔證據只對其來源有效；本次source unchanged proof保留於`reuse-proof.json`，不視為未實作新行為PASS。沒有玩家Runtime acceptance，P3未COMPLETE。
