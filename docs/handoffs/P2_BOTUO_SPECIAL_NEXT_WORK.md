# P2 Special — VISUAL PACKAGE APPROVED / Runtime 前檢接續

```text
【角色任務】
接手 Hansen0318/shanhaijing-arena 的 P2 猼訑 Special「守群」。完成下一個未完成 Gate：Runtime 前檢、共用可執行 presentation/status ownership 契約、忠實素材包裝與容量方案；提出具體材料，停在契約審核 Gate。

【背景資訊】
GitHub是唯一權威。唯一分支 feat/m0-combat-core-20260927；PR #1維持open/unmerged。先fetch最新remote，確認HEAD/branch/PR/working tree。素材checkpoint d1deccff2e4337af71995bb2901ad99052012fd5；核准與交接是後續commit，恢復SHA不是永遠最新。
2026-10-21 Asia/Taipei玩家：「目前這個我approved，紀錄流程進度規則在github，我要開新的work，要讓他無縫接軌，要跟他說什麼」。
Special F3、四姿勢及目前VFX/五GIF視覺包已核准；不重畫、不重問相同Gate。不捏造逐檔播放、實機或裝置驗收。
權威receipt：docs/art/approved/botuo/special/{f3-v1,poses-v1,composite-v1}/acceptance.json。
素材在docs/art/candidates/botuo/special/{key-pose-v1,poses-v1,composite-review-v1}/；包含透明PNG、prompt、五GIF、雙向/收勢/接技/到期/T1受益者QA、review-manifest.json、verification-summary.json、SHA256SUMS.json，已保存GitHub。舊pending及候選manifest為歷史，以最新receipt為準。
P1 COMPLETE / PLAYER VERIFIED；P2 Idle/Move/Basic尺度CLOSED；Basic/KO/Heavy已核准。Heavy COMPLETE / PLAYER VERIFIED，已驗收部署acf454741757f58efa980fdcd03f028a472e87a3：
https://hansen0318.github.io/shanhaijing-arena/?v=acf454741757f58efa980fdcd03f028a472e87a3
Special只有docs/art/probe/preview，尚無Runtime整合、部署、手機或整個P2驗收。

【具體指令】
1. 必讀AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/M5C_ART_ANIMATION_VFX.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_P2_BOTUO_HEAVY_ACTION.md、docs/M5C_P2_BOTUO_SPECIAL_ACTION.md、docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md、上述三份Special receipt與素材manifest。
讀docs/art/approved/botuo/heavy/runtime-v1/acceptance.json與manifests，及docs/verification/P2_HEAVY_RUNTIME/下release.json、engineering.json、player-acceptance.json、public-fingerprint.json、ci-build-inventory.json；沿用已驗收證據。

2. 核對已存mechanics-snapshot及source hash；相同即沿用32direct/8lifecycle/2AI/4paired damage證據，不無故重跑。程式權威：src/roster/{abilities,catalog,tierEffects,tierScalingProfiles}.js、src/combat/{battleSession,statuses}.js、src/runtime/statusPresentation.js及共用action/VFX/AssetPresenter/residency路徑。
T0 self25%減傷4s/CD8/coef0/windup0；T1/T2/T3 self27.5/30/33.75%、4.32/4.6/5s、CD7.552/7.104/6.432。T1+既有post_cast選附近一名存活隊友16.5/18/20.25%，半徑2.52/2.64/2.832，不能移除或改全隊。
Special立即生效，可同clock接ready Heavy/其他合法技能及移動，減傷不因接技消失。cast.hit=true代表utility生效，不是攻擊接觸。同source/target/key替換、最強減傷MAX；刷新身份、到期、來源/受益者KO、離場、Restart、clearTransientCombat及場景清理依真實生命週期，保留控制與AI。

3. 提出共用資料驅動契約：短防護動作可被下一合法動作取代，施放特效與持續受益者特效分開。效果按實際source/target/status身份及Tier受益者建立/刷新/銷毀，跟actor root/world movement，不跟Heavy圖片layout offset。現有status overlay以recipient catalog/type為主，需解決source-ability ownership，禁止P2身份特例。
GIF各姿勢160ms只是美術節奏，不能變成windup、全域CD、延後生效至F3或鎖攻擊/移動。任何真實機制/時序更動先列差異取得核准。Special存在感以防護形狀/層次/節奏達成。

4. 忠實runtime packing/尺度/容量前檢：review .126raw density、400x320cell、1600x320strip不是最終Runtime證明。用多個身體/護臂/腰/角/蹄/接地標記校準，核對雙向、Idle/Move/攻擊切換、anchor，不用外框高度fit或單一臉標記。沿用核准像素不重新生成，必要派生包裝保留source、邏輯canvas、scale/origin/FPS/鏡射及可追溯manifest。
16MiB decoded texture/cache cap、131072bytes reserve、Shared Dynamic Asset Residency固定。42required keys16622164bytes，reserve外23980bytes。提出實際尺寸與完整required集合/同時駐留/cache/upload/reserve容量證據；不得提高cap、偷偷排除required或擅降清晰度。

5. 完成具體契約與packing/容量證據、限定必要檢查，更新流程/規則/進度/來源/審核紀錄，commit+push同分支。docs/art-only用[skip ci]；程式未變不重跑build/full suite或P1/Basic/Heavy。停在新可執行契約審核，不先整合Runtime/部署。回報remote HEAD、完成內容/證據、限制、下一Gate及實際審核材料。

【約束條件】
禁止merge main、另開替代分支、引入shanhaijing-td、開始P2 Awakening/P3或重做核准素材。淘汰稿/JPEG不能替換正式透明PNG。
Heavy A契約不變：戰術650ms依Tier縮放F1/F2→真resolve→F3/F4；即時命中/落空0ms從F3/source開始；不改傷害/CD/Range/Tier/AI/命中/取消/VFX語義。
保護身份/配色/服裝/角/護臂/尺度/ground/anchor/鏡射；不放大角色、不重現攻擊放大/移動縮小。普通Hit動作CANCELLED，普通傷害不打斷攻擊/施法/移動，合法控制/KO保留。
P3/P4/P5 Move無損透明裁切完成，不重做；Portrait/Idle/Move/KO及required資產保護照既有規則。
不新增全隊防護、吸收盾、無敵、嘲諷、傷害、AoE、前搖或假傷害爆炸。GIF不是實機錄影/Runtime/手機證據。既有五個suite failures照記，不宣稱全suitePASS，不捏造FPS/GPU/device/玩家逐項結果。
所有未來接手指令維持單一完整、自足、可一鍵複製code block。按最新receipt/條目判歷史，不重開舊pending Gate。
```
