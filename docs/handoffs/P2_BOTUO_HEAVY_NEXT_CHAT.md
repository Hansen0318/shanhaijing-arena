# Heavy PLAYER VERIFIED — successor is Special 守群

```text
【山海經聯盟 — P2 Heavy 已驗收，接續 Special「守群」】

你的任務：從 GitHub 最新狀態恢復，沿用已核准成果，開始 P2 猼訑 Special「守群」的既有機制核對、動作設計與第一個美術審核 Gate。

一、專案與權威來源
Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927
既有 PR：#1，維持 open / unmerged。
GitHub 是唯一權威，先 fetch 並確認最新 remote HEAD、分支、PR、working tree。
最新驗收與交接 checkpoint 是本接手文件所在 commit；不得把文件 HEAD 當成新的部署 SHA。
禁止 merge main、另開替代開發分支或引入 shanhaijing-td 玩法。
所有後續接手指令放在單一完整、自足、可一鍵複製的 code block。

二、必讀
AGENTS.md
WORK_PROGRESS.md
docs/STATE.md
docs/DEVELOPMENT_PLAYBOOK.md
docs/PROJECT_BOUNDARIES.md
docs/DEVELOPMENT_ROADMAP.md
docs/M5C_ART_ANIMATION_VFX.md
docs/CHARACTER_ACTION_ART_WORKFLOW.md
docs/M5C_P2_BOTUO_HEAVY_ACTION.md
docs/M5C_P2_BOTUO_SPECIAL_ACTION.md
docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md
docs/art/approved/botuo/heavy/runtime-v1/acceptance.json
docs/art/approved/botuo/heavy/runtime-v1/ 下的 runtime / VFX / GIF manifests
docs/verification/P2_HEAVY_RUNTIME/ 下的 release、engineering、public-fingerprint、ci-build-inventory 與 player-acceptance 紀錄。
以最新驗收條目及其證據解讀舊歷史；不要依舊 pending 文字重開已關閉工作。

三、玩家驗收已完成
玩家於2026-10-21（Asia/Taipei）明確表示：
「我確認完成ok，進度流程規則紀錄github，然後或要新創一個work，要他無縫接軌，開發後續，要跟他說什麼」

這已關閉 Heavy 的玩家手機驗收 Gate。
P1 鹿蜀 COMPLETE / PLAYER VERIFIED。
P2 Idle / Move / Basic 比例問題 CLOSED / PLAYER VERIFIED。
P2 Basic「角擊」、既有 KO 及 Heavy「震嶺」已核准。
Heavy F1–F4、正常／慢速 GIF、Source / Contact VFX、工程／部署／玩家驗收全部沿用。
不得重畫、重新生成或要求重新審核這些已核准成果。
這是 Heavy 整體技能驗收，不可捏造未逐項回報的裝置／測項／FPS／GPU-memory 結果，也不代表整個 P2 完成。

四、已驗收部署與既有證據
部署 SHA：acf454741757f58efa980fdcd03f028a472e87a3
測試連結：https://hansen0318.github.io/shanhaijing-arena/?v=acf454741757f58efa980fdcd03f028a472e87a3
Actions：https://github.com/Hansen0318/shanhaijing-arena/actions/runs/39438531259
既有136affected tests、Build／84file Asset Guard、8WebGL動作、24native-trim對照、2built入口案例通過。
110個CI／本機輸出相同，15個公開完整檔案SHA256吻合。
這次驗收紀錄沒有修改 Runtime、重跑測試或重新部署。
程式未變時沿用證據；不重跑完整P1、不重做P2Basic，不宣稱全suite通過；既有五個suite失敗保留原紀錄。

五、Heavy 與資產保護
Heavy A 已核准：戰術650ms依Tier縮放，F1/F2→真resolve→F3/F4；即時命中／落空0ms從F3/source開始。
維持Range1.8、CD4秒、coefficient1.30、既有命中／Tier／AI／控制與取消語義。
Contact只在真hit出現；落空保留動作與Source。
核准原始PNG、GIF與SHA256以各acceptance為準；JPEG不能替換PNG，淘汰F4不得使用。
保持同一身體尺度、接地、Anchor及左右鏡射；不可用外框高度或角色放大製造強度。
16MiB decoded texture/cache cap、131072bytes reserve及Shared Dynamic Asset Residency不變。
目前42required keys／16622164bytes，reserve之外23980bytes。
P3/P4/P5Move已完成無損透明裁切；保留原圖、邏輯canvas／scale／origin／FPS／mirror，不重做。

六、下一個技能：Special「守群」
先讀src/roster/abilities.js、catalog.js、tierEffects.js、tierScalingProfiles.js，
以及src/combat/battleSession.js、statuses.js和src/runtime/statusPresentation.js，
核對真實的施放、生效、減傷、Tier、刷新／到期／KO／清理及AI路徑。

目前T0既有契約：
targetingRule=self
自身25%減傷，持續4秒
Cooldown8秒
damage coefficient0
windup0
所有Tier與實際狀態語義以程式為準。

不得因技能名稱自行改成保護全隊、吸收護盾、無敵、嘲諷、傷害／AoE或新增前搖。
不得複製Basic250ms或Heavy650ms到Special。
需要改變實際機制或時間時，先提出具體差異讓玩家核准；不得由GIF倒推Gameplay。

七、Special製作順序
1. 完成既有機制與事件／狀態生命週期核對。
2. 對照已核准Basic低角擊、Heavy前方護臂重擊，以及未製作Awakening的保留方向，
   設計可在關閉VFX時辨識的Special防護動作。
3. 依既有角色美術流程，先定清楚關鍵防護成立姿勢，再製作第一個獨立角色姿勢供玩家審核。
   此處是防護關鍵姿勢，不是假造命中。
4. 姿勢核准後才依序做其餘姿勢、獨立施放／受益者狀態VFX、正常／慢速／無VFX／雙向／收勢預覽。
5. 每個未核准Gate照既有流程取得實際審核，之後才做必要的共用Runtime整合、限定測試、發布與手機驗收。

防護VFX要跟隨真實受益者及實際減傷狀態，
在實際到期、取消、KO／離場／重開時正確清理。
Special的視覺層次與存在感應高於Heavy，使用清楚防護形狀與節奏，不以假傷害爆炸或角色放大達成。
Source與受益者持續狀態須分清楚，不讓身體姿勢為了維持狀態而鎖住既有移動／攻擊。

八、本次新Work的範圍與停止點
現在已授權開始Special的下一個既有流程Gate，不要再次詢問是否可以開始。
先完成恢復、機制核對、動作差異設計，推進至第一個需玩家審核的Special關鍵姿勢，提供實際審核材料後等待玩家。
目前尚無Special姿勢／GIF／新時序／Runtime／手機驗收核准，不能自行標記通過或越過Gate。
本段「開發後續」僅將下一項Special流程解鎖；不代表其他技能或角色已被核准。
不得開始P2Awakening或P3，不得重做P1／P2Basic／Heavy，不得merge main。

完成coherent slice後commit + push，更新進度、流程規則、來源與審核紀錄。
報告最新remote HEAD、實際完成內容、證據、尚未完成Gate與需玩家審核材料。
現在直接開始GitHub Recovery，沿用Heavy已驗收狀態並接續Special。
```
