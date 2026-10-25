```text
【山海經聯盟｜P3玩家核准／整角結案；P4九尾狐直接接續開發】
所有後續交接指令必須是一個完整、自足、可一鍵複製的code block。

[角色任務]
接續 Hansen0318/shanhaijing-arena。玩家已核准最新d346798修正版，要求新Work無縫接軌、直接往下個開發。P1/P2/P3 COMPLETE；下一角色P4九尾狐。原生單人，直接完成P4第一個未完Gate，不重問是否開始，不只回報已讀規則。

[GitHub恢復]
GitHub最新remote唯一權威。唯一分支feat/m0-combat-core-20260927；PR#1保持open/unmerged，禁止merge main。前核准呈交checkpoint135faebbb1170105b308a504d92597d0fd250c12，產品發布d346798cadf12efeada0f11e15f72c62a4d78eb6；核准/結案純文件HEAD更新在後，必須先fetch最新remote HEAD，核對本機未push工作/tree，不用定位SHA覆蓋新成果。
不委派、不開新branch/worktree、不動TD、不重置存檔、不動無關untracked。CLI無認證可用connected GitHub API，每blob核Git SHA、完整tree核對、expected-SHA非force更新ref。
先讀最新：AGENTS.md、WORK_PROGRESS.md、docs/STATE.md頂端、docs/DEVELOPMENT_ROADMAP.md、DEVELOPMENT_PLAYBOOK.md、PROJECT_BOUNDARIES.md、CHARACTER_ACTION_ART_WORKFLOW.md、M5C_ART_ANIMATION_VFX.md；docs/decisions/2026-10-23-restore-sequential-skill-workflow.md與2026-10-25-retire-schematic-under-formal-actions.md；docs/verification/P3_CHARACTER_CLOSURE.json/.md、P3_CHARACTER_CLOSURE/acceptance-audit.json；docs/verification/SCHEMATIC_RETIREMENT/player-acceptance.json；docs/art/approved/chiru/passive/runtime-v1/acceptance.json；本handoff。

[已結案，禁止重做]
玩家原文：「我確認核准，紀錄 我要創新的work，提供prompts，讓她無縫接軌，直接繼續往下個開發」。已核准呈交d346798最後游息/辨識與真正退示意Runtime Gate。P3 base/Idle/Move/KO、Basic/Heavy/Special/Awakening既有核准保持，加上本次Passive核准完成P3整角行政結案；普通Hit永久取消。不要重問同版玩家核准、重畫P3或重開其Gate。
原1229/1229、Build110素材、96+96真WebGL零示意、8張Heavy四時段真圖、20招/游息/四主動/P1P2相容、正常Pages40163995446及guard657/692/589、CI/local/public172均PASS。公開3fresh＋169相同path/bytes/hash證據沿用。全部原來源不變，直接沿用，不重跑suite/Build/Browser/Pages/public。
17份既有收據的314項綁定：313當前相符；1舊整包流程已從原presentedCheckpoint精確恢復hash，當前檔刻意加SUPERSEDED標記，已由逐招決策取代。原receipt與當前逐招流程不改、不回滾；不是未解決差異，也不是P3重測理由。詳closure audit。

[P4第一未完Gate：機制前檢＋整角色規格提案]
先核對最新remote是否已有後續P4 spec/候選/核准；若已存在，沿用有效成果，從第一個真正未完Gate接續，不重做。
本次交接時P4九尾狐既有形象/portrait/Collection/靜態Idle/Move/KO已核准，沿用真圖片與尺度/anchor/mirror；不要重生或重審base。依據docs/art/M5C_B_JIUWEIHU_VISUAL_SPEC.md、docs/verification/M5C_B_JIUWEIHU_{STATIC_RUNTIME,LOCOMOTION,KO}.md與roadmap較新的全P1–P5 base玩家核准紀錄，舊個別文件的歷史PENDING不能重開已核准Gate。
來源：src/roster/{catalog,abilities,tierEffects,tierScalingProfiles,aiProfiles}.js；src/assets/{manifest,battleDescriptors}.js；src/combat/{ability,battleSession,persistentAreas,passiveDefinition,passiveRuntime}.js（依實際檔案/呼叫追蹤，不假設路徑）。P4目前formal actionDescriptors為空、P4.passive未實作；既有四招資料是現況，不代表新動作/VFX或獨立被動已完成。核對HP/ATK/DEF/移速/攻速與T0–T3、火系單體/AoE/預警/暴擊/狀態/AI/手控契約及目前「惑心」實際狀態，分開current/proposed/approved/implemented。
直接產出P4角色專屬完整五招規格及machine-readable baseline/proposal，建議入口docs/verification/P4_CHARACTER_PREFLIGHT/與docs/superpowers/specs/2026-10-25-jiuweihu-whole-character-design.md。使用docs/templates/CHARACTER_SPEC_TEMPLATE.md欄位，但其舊整包F3/GIF/一次發布文字由最新逐招決策覆蓋；保留整角數值規格一次審，實際逐招完成/發布/玩家驗收。
規格需含：定位與保留base；T0–T3屬性與五招實數/基數/對象/排序/射程範圍/真結算時序/CD/持續/刷新/疊加/MAX/取消/空放/KO/Pause/Restart/destroy；獨立被動的真觸發、獨立Tier成長、真效果及對應VFX，不能拿既有Tier modifier或文案代替；同隊/敵我/多instance/同刻事件/AI與手控；現有共用能力與真正需擴充的差異、無角色ID特例；Collection完整玩法文案與實作同版本；每招動作/VFX素材需求與驗收點。
本體四招無FX也要立即可辨：輪廓、施力方向、節奏各異；同角色同手機尺度Basic<Heavy<Special<Awakening，施法/飛行/真命中或持續狀態清楚、明顯、華麗且符合火系真機制。持續傷害/狀態若被提案且核准，VFX需跟隨真正受影響target及真狀態生命週期，不能只在caster假演。不得放大角色或改命中範圍製造場面。
完成具體規格提案、保存baseline/proposal/必要差異與進度後，呈交玩家審新數值/機制，這是第一個真正需玩家處理的新設計Gate。不要在規格未核准前做F3/其餘姿勢/GIF/Runtime/部署或捏造acceptance；不要再問「要不要開始P4」。此Chat僅核准/結案/交接，未核准尚未展示的P4設計。

[核准後固定逐招流程]
Basic→Heavy→Special→Awakening→Passive；每招F3/key pose（被動為樣式）玩家核准→其他姿勢/獨立VFX→GIF玩家核准→Runtime/必要真驗證→正常CI/Pages/public→玩家遊戲核准→記錄收據，才下一招。不能等五招一起部署，不同時產四招F3，不跳玩家Gate。P4未整角完成不開始P5。
全部approved masters/收據/GIF/原PNG/尺度/anchor/ground/右canonical左mirror保持。無固定16MiB總額，但逐檔安全/兩下載/required完整就緒/所有權回收仍必須。Collection只寫實際玩法，不放工程/審核字眼；被動戰場無文字牌/HUD/連線。
已核准正式action完整真貼圖已載入且TextureManager存在時，撤同record整層示意；缺真來源才fallback。禁止恢復已撤回的ground-sigil膠囊/箭頭/方塊換皮。獨立場域/正式盾水膜/固定場地各按來源處理，不誤刪；真threat ledger/時序/範圍/傷害不受呈現影響。

[保存與最低必要驗證]
每次接續先讀最新規則/進度；每個短Gate更新WORK_PROGRESS、STATE、角色WORK_LOG與handoff，同分支commit/push。純文件/收據/設計[skip ci]，不跑Build/Browser/Pages。只為新來源、實際機制疑點或真受影響範圍做必要核對；來源未變沿用精確證據，不反覆驗證P1/P2/P3。長工作前存coherent checkpoint，Work容量不足就保留第一未完Gate，避免下一Work重做。
```
