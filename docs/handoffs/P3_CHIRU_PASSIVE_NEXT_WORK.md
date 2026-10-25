```text
【山海經聯盟｜P3 游息修正版 Runtime＋正式VFX退示意至正常部署｜新Work無縫接手】
所有後續交接指令必須維持單一完整、自足、可一鍵複製的code block。

[角色與GitHub恢復]
接續 Hansen0318/shanhaijing-arena；GitHub最新remote是唯一權威。唯一分支 feat/m0-combat-core-20260927；PR#1保持open/unmerged，禁止merge main。交接定位checkpoint e750c6e0444000a0a3ef2476eff3619a07e9f23a，但先fetch最新remote HEAD、核對本機未push工作及tree，不能用舊SHA覆蓋新成果。原生單人執行，不委派、不開新branch/worktree、不動TD、不重置存檔、不動無關untracked。

先讀最新AGENTS.md、WORK_PROGRESS.md與docs/STATE.md最上方、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/decisions/2026-10-23-restore-sequential-skill-workflow.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、docs/verification/P3_PASSIVE_RUNTIME/{CURRENT.json,REPORT.md,WORK_LOG.md,player-feedback-2026-10-25.md}、docs/verification/P3_PASSIVE_RUNTIME/readability-revision/{SOURCE_AUDIT.md,source-audit.json,reuse-proof.json}、docs/art/candidates/chiru/passive/readability-review-v1/{REVIEW.md,manifest.json,encoded-verification.json,SHA256SUMS.json,prepare_review.py}、docs/art/approved/chiru/passive/{style-v2,composite-review-v1,readability-review-v1}/acceptance.json，以及核准整角spec docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md第5/6節。來源盤點是唯讀，不是已修復證據；若有新遠端差異，按實際差異恢復。

[最新Runtime checkpoint]
真CI40145248296第一案因Phaser4移除setTintFill失敗；已改現行API且真Tint元件RED→GREEN。讀runtime/ci-40145248296-native-failure.json；續新來源正常CI，不沿用首輪假PASS。
安全remote e0b4b87；本機1224/1224與Build110素材PASS。正常CI新native/built/相容/Pages及public fingerprint為第一未完Gate；先修實際失敗，不重做PNG/Runtime或已通過suite。
Runtime修正已在同分支checkpoint；不要重做已完成程式/PNG。先讀readability-revision/runtime/下實際RED/GREEN/初次suite及Chromium失敗，完成新來源驗證與正常發布。舊證據僅舊來源有效。

[玩家已核准與第一未完成Gate]
玩家本次明確：「我核准，我要給新的work做，妳確認有紀錄，提供prompts，讓她接手修改被動的vfx和已開發多於的vfx到部署」。本次修正版薄荷綠亮邊＋亮白雙魚、同尺度混戰對照與11支GIF已核准；精確SHA256收據 docs/art/approved/chiru/passive/readability-review-v1/acceptance.json。原STYLE／原9GIF亦有各自核准收據。不要重審方向、重生已核准來源、重做GIF或前檢。P1/P2 COMPLETE，P3四主動已核准；舊游息Runtime release b414e9f079a985e4bf23283ffa5067abf5af9ac3，正常Pages40105519923 SUCCESS、1221測試、native32/built4、四主動/P1/P2相容、CI/local/public168都有原來源真證據。來源未改部分用精確reuse proof；新視覺與退示意絕不可拿舊證據冒稱PASS。當前第一未完成Gate＝最小Runtime實作，之後必要真驗證、正常CI/Pages/public指紋及供玩家遊戲測試；部署已授權，不再問允許部署。P3尚未COMPLETE，沒有修新版玩家遊戲acceptance。

[Runtime修正]
1. 游息真amount>0的受益者當前可見pose/frame生成短暫薄荷綠外輪廓亮邊，魚印亮白，青綠短紋四Tier同尺度1/2/3/4組；參照核准review包中可追溯PNG與顯示方案。不能把idle-rim-reference-only.png當固定Runtime sprite：必須跟隨任意真受益者姿勢、Move/Action、左右mirror及敵我多instance。角色本體像素、尺度、anchor、懸浮下緣不變；魚印前景、低於預警與HP，不加全身遮罩/文字牌/連線。normal沿0–200ms清楚顯示、200–650ms內收淡出；reduced原位靜態同Tier淡出，650ms清空。只在真正受益者顯示；self/other/zero、Pause、recipientKO/casterKO、到期、end/Restart/destroy和重複destroy正確。遊戲直接讀PNG及metadata，不讀合成GIF。必要時先用針對性失敗測試定位，再做共用來源修正；無角色ID特例。
2. 已開發正式技能同一招同一階段/狀態的正式VFX成功解析時取代多餘示意，不能雙疊；正式資源未成功解析才保留對應fallback。按來源與事件資料共用判斷，不憑角色ID、截圖或僅有assetKey判斷。盤點涵蓋caster startup/飛行/真命中/持續狀態/命中預警/場地：source-audit列出20招、12個有正式action。P1/P2已核准程式化被動、P2正式盾與P3正式水膜不得當示意刪除。ArenaScene固定褐色橢圓及中線是場地輔助，保留。TelegraphPresenter目前無正式warning涵蓋判斷；對必要circle/lane capsule端點/範圍、敵我色與impact進度，必須讓正式呈現完整承接後才退掉對應示意幾何；缺正式預警來源時保留必要gameplay warning。不可把正式cast/blade/contact存在直接當作預警已覆蓋，也不擴大成場地重設計。檢查src/runtime/{assetPresenter,telegraphs,ArenaScene,statusEffects,passivePresenter}.js與src/assets/battleDescriptors.js，保護既有戰鬥命中時序。

[不可變游息契約／保護]
戰鬥中caster存活可行動未受控、有活敵且最近敵距≥2.0；固定4.2內存活同隊含自身HP≤60%，最低HP/maxHp優先，同值穩定instanceId；一次治療一人，恢復受益者當前maxHp×8/12/16/20%，缺血封頂。正amount才起各instance獨立8秒CD，不排隊；不吃主動healing scale/回流/清流、不復活/暴擊/循環。同刻傷害/KO→主動→重新檢查被動。已結算治療不回滾。保護P1/P2/P3四主動、全部approved masters/收據原bytes、Idle尺度chestX158/hoverY203/懸浮下緣、右canonical/左mirror；普通Hit永久取消。T2 chiru.rear-heal維持顯示名清流，ID/條件/幅度不動。無固定16MiB總額；逐檔安全、兩下載、required完整就緒及所有權回收保持。Collection只寫已實作玩法，不虛寫新效果。維持Basic→Heavy→Special→Awakening→Passive逐招完整流程，不啟動下一角色。

[最低必要真驗證與部署]
新來源先做針對性RED→GREEN，之後真native與built檢查正式VFX成功取代同階段示意/無雙疊、正式來源缺失fallback、真warning覆蓋/保留資訊；游息四Tier/敵我/多instance/左右/normal-reduced、自療/他療/zero、Pause/KO/650ms到期/end/Restart/destroy與手機Collection。依共用來源影響補P1/P2及P3四主動相容；保留既有匿名資料opt-in、選人、門檻、當前maxHp、CD、同刻排序的相符測試。產品來源改動須跑必要測試、Build/source guard、正常CI/Pages（不得skip部署）及CI-local-public精確fingerprint；記錄任何真失敗與修復，不拿美術模擬當Runtime驗證。提供實際網址及橫向→HEAL TEST→Ally Tier T3→START→觀察真受益者標記及正式VFX、Restart/T0最小測試步驟後停待玩家遊戲核准，不提前標P3 COMPLETE。

[保存]
在長驗證前保存coherent checkpoint；每Gate更新WORK_PROGRESS、STATE、本招WORK_LOG與此單一自足handoff，同分支commit/push。CLI無認證時用connected GitHub API，每個blob核Git SHA、完整tree核對、非force更新ref。若被阻擋，先保存成果及真失敗證據，留下唯一下一步，不靜默重做原STYLE/GIF/產品舊驗證。修新版玩家遊戲核准前不建立Runtime acceptance。
```
