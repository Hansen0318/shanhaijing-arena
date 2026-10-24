# 最新工作checkpoint：2026-10-25 pre-art ACTIVE

恢復紀錄見docs/verification/P3_PASSIVE_RUNTIME/readability-revision/recovery.json；尚未新素材/GIF，直接接以下指令的來源盤點及修正版預覽。產品不變，不重跑原測試。

# 2026-10-25 修正方向已核准；新Work接續

```text
【山海經聯盟｜P3 游息可讀性修正＋正式VFX取代示意｜無縫接手】
[角色任務]
從GitHub最新狀態恢復，完成本次視覺修正。玩家已核准「薄荷綠亮邊＋亮白雙魚」方向，要求已開發招式的對應示意VFX由正式VFX取代。直接執行第一未完成Gate，不重問是否開始。

[背景與先讀]
Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927；PR#1保持open/unmerged。
先fetch最新remote並核對本機未push工作；禁止用舊checkpoint覆蓋成果。
讀AGENTS.md、WORK_PROGRESS.md與docs/STATE.md最上方最新段、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/decisions/2026-10-23-restore-sequential-skill-workflow.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md，以及：
- docs/verification/P3_PASSIVE_RUNTIME/{CURRENT.json,player-feedback-2026-10-25.md,REPORT.md,WORK_LOG.md}
- docs/handoffs/P3_CHIRU_PASSIVE_NEXT_WORK.md
- docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md第5/6節
- docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json
- docs/art/approved/chiru/passive/{style-v2,composite-review-v1}/acceptance.json
最新玩家回覆：「好，薄荷綠亮邊＋亮白雙魚。還有若招式開發 對應的示意圖的vfx要被取代，這些我會給新的work做」。

[已完成與缺口]
P1/P2 COMPLETE；P3四主動已核准。游息原STYLE/9GIF已核准，Runtime已實作並部署；release b414e9f079a985e4bf23283ffa5067abf5af9ac3僅供定位。正常Pages40105519923 SUCCESS；1221測試、游息native32/built4、四主動及P1/P2相容、source guard與CI/local/public168檔一致都有真證據。沿用精確相同來源證據，不重做整套前檢。
最新玩家認為混戰中游息不明顯；本次核准僅是修正方向，未核准尚未呈交的修正版素材/GIF或實際遊戲。P3未COMPLETE，禁止提前建Runtime玩家acceptance。

[執行順序]
1. 保存coherent checkpoint。沿用P3_PASSIVE_PREFLIGHT、P3_PASSIVE_GIF、P3_PASSIVE_RUNTIME紀錄，只確認最新差異。
2. 盤點已開發技能的施法/命中/狀態/預警及場地輔助來源。正式VFX成功解析時，必須取代同招同階段的示意VFX，不疊加；沒有正式來源才保留fallback。採共用資料/來源判斷，不加角色ID特例。ArenaScene固定褐色橢圓屬場地輔助；TelegraphPresenter幾何與正式狀態盾須逐來源辨識，不能憑截圖一律刪除。必要命中預警資訊由正式呈現完整承接後退掉對應示意層，不擴大為場地重設計。
3. 沿核准PNG做可追溯新衍生/顯示方案：真受益者短暫薄荷綠亮邊＋亮白雙魚，保留水系感；避免全身染色被誤認持續護盾。保存來源/hash/腳本，不覆寫原approved masters或收據、不重生整套、不從合成GIF擷取Runtime素材。
4. 先呈交原版/修正版同尺度手機混戰對照與必要修正版GIF：四Tier同尺度1/2/3/4組短紋、左右、normal/reduced、自療/他療/zero、650ms與清理。明示美術模擬不是Runtime。完成即checkpoint並停待本次修正版視覺/GIF核准，不重問已核准的方向或數值。
5. 收到修正版視覺/GIF核准後，沿同一任務整合最小Runtime差異及正式VFX退示意修正，完成必要真驗證、正常CI/Pages及CI-local-public fingerprint；此階段部署已授權，不再問允許部署。提供實際網址與最小玩家步驟後，停待玩家遊戲核准。只改已實作玩法文案，不虛寫新效果。

[不可變契約]
游息：戰鬥中caster存活可行動且未受控、有活敵且最近敵距≥2.0；固定4.2內活同隊含自身HP≤60%，最低HP/maxHp優先、同值穩定instanceId；治療一人當前maxHp×8/12/16/20%，缺血封頂；正amount才起獨立8秒CD，各instance獨立、不排隊；不吃主動healing scale/回流/清流，不復活/暴擊/循環。同刻傷害KO→主動→被動。
只在真正受益者顯示，650ms內收散去；reduced同Tier原位靜態紋片淡出，沒有持續治療/減傷。recipientKO清附著、casterKO清所擁殘留；end/Restart/destroy清狀態/token/VFX，Restart全新ready、重複destroy安全、已結算治療不回滾。
保護P1/P2/P3四主動、全部approved bytes、Idle尺度/chestX158/hoverY203/懸浮下緣、右canonical左mirror。不新增被動F1–F4/文字牌/角色連線；普通Hit永久取消。T2 chiru.rear-heal僅顯示名清流，ID/條件/幅度不變。

[最小必要真驗證與保存]
新視覺與退示意需真native/built證據：正式來源取代且不雙疊、缺來源fallback、四Tier/敵我/多instance、左右/normal/reduced、自療/他療/zero、Pause/KO/到期/end/Restart/destroy與手機Collection。依共用來源影響補P1/P2與四主動相容；未改來源用精確reuse proof，不拿舊證據冒稱新行為PASS。保留既有匿名資料opt-in/選人/門檻/當前maxHp/CD/排序測試；產品改動須相符測試、Build/source guard及正常CI/Pages/public指紋。
素材處理及長驗證前checkpoint；每Gate更新WORK_PROGRESS、STATE、本招WORK_LOG與單一自足handoff，同分支commit/push。CLI無認證用connected GitHub API，逐blob Git SHA及完整tree核對。阻擋時先保存成果與真失敗證據，留唯一下一步，不靜默重做。
原生單人、不委派、不新branch/worktree、不動TD、不merge main、不重置存檔、不動無關untracked。無固定16MiB總額；逐檔安全、兩下載、required完整就緒及所有權回收保持。維持逐招完整開發流程，不啟動下一角色。
```
