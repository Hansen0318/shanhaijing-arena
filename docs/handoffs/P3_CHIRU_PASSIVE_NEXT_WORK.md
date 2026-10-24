# 游息9GIF已玩家核准；直接接Runtime／部署

```text
【山海經聯盟｜P3 赤鱬 Passive「游息」無縫接續 Runtime 至部署】

[角色任務]
從 GitHub 最新權威狀態恢復，直接完成游息 Runtime、必要真驗證與正常 Pages 部署，提供遊戲網址供玩家測試。玩家已核准 STYLE 與完整9GIF，並授權新 Work 接續；不重問是否開始或允許部署，不停在接手報告。

[背景資訊]
Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927；PR #1 保持 open／unmerged，禁止 merge main。
GIF呈交 checkpoint：7b61fec5e84f478b0d3cc1572c0c1cadfb9a93ce；核准 checkpoint 以本收據所在最新 remote commit 為準。先 fetch 最新 remote，核對並恢復本機未 push 工作，不以舊 checkpoint 覆蓋最新成果。
核准收據：
- docs/art/approved/chiru/passive/style-v2/acceptance.json
- docs/art/approved/chiru/passive/composite-review-v1/acceptance.json
P1／P2 COMPLETE；P3四主動已玩家核准。Passive GIF Gate CLOSED，Runtime／部署／玩家遊戲驗收未完成，P3整角未完成。舊manifest／REVIEW的PENDING僅歷史，保留原檔。

[具體指令]
1. 先讀 AGENTS.md、WORK_PROGRESS.md／docs/STATE.md 最新段落、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/decisions/2026-10-23-restore-sequential-skill-workflow.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、docs/handoffs/P3_CHIRU_PASSIVE_NEXT_WORK.md、docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md 第5／6節、docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json及上述收據。
2. 沿用 docs/verification/P3_PASSIVE_PREFLIGHT/ 的 WORK_LOG、runtime-readonly、candidate-recovery、style-verification；以及 docs/verification/P3_PASSIVE_GIF/ 紀錄。只確認最新產品差異，不重做整套前檢。
3. 逐hash核對並沿用 docs/art/candidates/chiru/passive/style-v2/ 與 composite-review-v1/ 的核准來源、9GIF、manifest、timeline、SHA256SUMS、verification及準備腳本。不重生、不覆寫、不重審STYLE／GIF／原數值；不從合成GIF擷取Runtime素材。沿核准PNG製作可追溯的必要Runtime衍生，保留來源與hash。維持Idle尺度、chestX158、hoverY203、懸浮下緣、右canonical／左mirror。
4. 最小工程缺口：以共用資料opt-in擴充rear-support條件選人、instant-heal效果與獨立CD、真heal事件受益者雙魚呈現及所有權清理；沿用現有當前maxHp治療、正heal event與生命週期模式，不新增P3 ID特例。
5. 精確契約：戰鬥中caster存活可行動未受控、有存活敵人、距最近敵人≥2.0；固定4.2內存活同隊HP≤60%含自身，最低HP/maxHp優先，同值按穩定instanceId。一次治療一位當前maxHp×8／12／16／20%，缺血封頂；不吃主動healing scale／回流／清流、不復活／暴擊／循環。真正amount>0才開始獨立8秒CD並畫真受益者印記。同刻先傷害／KO→主動效果→重檢被動；各instance獨立，冷卻不排隊補發。
6. 真受益者VFX沿核准雙魚與四Tier同尺度1／2／3／4組短紋；正常650ms內收散去，reduced為同Tier原位靜態淡出。650ms只是視覺，沒有持續治療或減傷。受益者KO清附著印記、casterKO清其擁有殘留；end／Restart／destroy清狀態／token／VFX，Restart新ready，反覆destroy安全，已結算治療不回滾。不得把腳本GIF清理當工程PASS。
7. 真實作完成才更新Collection純玩法文案；T2 chiru.rear-heal modifier僅將顯示名改為「清流」，保持ID／條件／幅度，不能冒充獨立被動。
8. 驗證當前改動及真受影響範圍：匿名／重新命名資料opt-in、四Tier／敵我／多instance、距離與HP門檻／穩定選人、當前maxHp／缺血封頂／正零治療／獨立CD、同刻排序、控制／KO／Pause與各生命週期；真native及built呈現核准PNG、左右、normal／reduced、真他療／自療／zero與清理，手機Collection。依共用來源影響取得必要P1／P2及四主動相容證據；相同來源已通過部分沿用並保存精確reuse proof，不重跑無關suite／Build／Browser／Pages。產品來源變更必須有相符必要測試、Build／source guard、正常CI／Pages與CI-local／公開fingerprint，不能拿舊證據代替新行為。
9. 完成後提供實際遊戲網址與最小玩家測試步驟，停待玩家遊戲核准；不提前建立Runtime玩家acceptance或標P3 COMPLETE。長工作與素材處理前保存coherent checkpoint，更新WORK_PROGRESS／STATE／WORK_LOG／handoff，同分支commit／push；CLI無認證用已連線GitHub API，逐blob Git SHA與完整tree核對，避免截斷素材。遇阻擋保存成果、真失敗證據及唯一下一步，不靜默重做。

[約束條件]
原生單人，不委派、不新branch／worktree、不動TD、不merge main、不重置存檔。保護全部approved masters／收據bytes、P1／P2與P3四主動的核准行為、尺度與anchor。普通Hit永久取消；無固定16MiB總額，逐檔安全、兩下載、required完整就緒、真失敗處理及所有權回收保持。不新增被動施法F1–F4、不加戰場被動文字牌或角色間連線。GIF核准不等於Runtime／部署／玩家遊戲核准。所有後續交接維持單一、自足、可一鍵複製code block。
```
