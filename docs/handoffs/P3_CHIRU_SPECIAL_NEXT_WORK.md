# Special GIF approved — Runtime to deployment

## 2026-10-24 — Special 回瀾 GIF PLAYER APPROVED；新Work接Runtime／驗證／部署

玩家：「我確定approved，妳紀錄，我要給新的work部署讓我測試，妳提供prompts，要他無縫接軌至部署」。明確核准呈交12bb3e839a0fdba793c390124cc99315a1f9288a的Special動作／兩類獨立VFX／11GIF；精確hash收據 docs/art/approved/chiru/special/composite-review-v1/acceptance.json。GIF Gate CLOSED，直接授權新Work完成Special Runtime、必要真驗證、正常CI/Pages部署，供玩家測試。未把GIF核准當成遊戲PLAYER VERIFIED；P3整角未完成，不開始Awakening/Passive。

唯一下一工作：依核准spec做資料opt-in共用延遲治療／真受益者事件與核准本體/VFX整合；兩模式320ms重選最低合法HP比例受益者、當前maxHp Tier比例／CD／modifier／AI契約保持。先讀 docs/handoffs/P3_CHIRU_SPECIAL_NEXT_WORK.md。核准素材與原manifest/REVIEW歷史原封保留，舊PENDING由新收據覆蓋，不重畫或重問動畫核准。本次只收據/文件[skip ci]，未改產品、不重跑suite/Build/Browser/Pages；新來源工程需必要驗證。原分支、單人、PR#1open/unmerged，無main merge/新branch/worktree/委派/TD；全部既有保護與逐招流程保持。

```text
【山海經聯盟｜P3 赤鱬 Special「回瀾」已核准，接續整合至部署】

[角色任務]
從GitHub最新權威狀態恢復，直接完成回瀾Runtime整合、必要驗證與正常Pages部署，提供可玩網址讓玩家測試。不停在接手報告，不重問是否開始或是否授權部署。

[背景資訊]
Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927；PR #1保持open/unmerged，禁止merge main。
已呈交美術checkpoint：12bb3e839a0fdba793c390124cc99315a1f9288a；此SHA僅定位，先fetch最新remote，包含後續核准收據的最新提交才是恢復入口。
玩家已明確核准Special動作／兩類獨立VFX／11GIF，並直接授權部署供測試。
收據：docs/art/approved/chiru/special/composite-review-v1/acceptance.json；F3原收據亦保持。
P1/P2 COMPLETE；P3 Basic/Heavy與清晰版PLAYER VERIFIED；Special遊戲尚未玩家驗收。

[先讀]
AGENTS.md、WORK_PROGRESS.md與docs/STATE.md最新段落；docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md；本handoff；docs/decisions/2026-10-23-restore-sequential-skill-workflow.md；docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md；docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md與docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json；docs/verification/P3_SPECIAL_PREFLIGHT/WORK_LOG.md；Special composite-review-v1的REVIEW/manifest/checksums/prepare_preview.py與新acceptance；既有Heavy Runtime與Clarity發布證據及實際共用治療/動作/VFX/loader來源。
舊spec的整角批次發布及REVIEW/PENDING/禁止Runtime文字是歷史，由最新逐招decision及本次收據覆蓋；數值規格核准保持。

[具體指令]
1. 檢查最新HEAD及本機可恢復工程，接第一未完Gate。GIF/F3 Gate已CLOSED，不重畫、不重做已通過前檢或美術QA。核對收據hash；approved masters、原圖、原manifest、收據保持不可變。
2. 使用現有Phaser與資料驅動架構整合本招；需要的延遲utility治療、按當前maxHp百分比及真受益者事件用共用schema opt-in，其他角色沿既有default，禁止角色ID特例。只實作Special，不順帶套用Awakening/Passive新規格。記錄最小實作計畫與新來源驗證ledger，無新設計阻擋即直接執行。
3. 兩模式均在320ms真結算；從當時範圍20內、含自身的存活同隊成員重選最低HP比例，同值按穩定instanceId。T0–T3按受益者當前maxHp恢復25/30/35/40%，封頂缺血，不再乘舊healing scale。CD7/6.44/5.88/5.04秒；T1起目標結算前HP≤35%加10%，T2起既有後排條件距最近存活敵人2.0–4.2加5%，加算上限15%。AI最低HP≤65%才嘗試；滿血手控可耗CD但amount=0沒有recipient泉花。不新增復活/護盾/攻擊命中。
4. F1/F2/F3/F4=200/120/200/240ms；沿核准safe cells／共同尺度／anchor／懸浮下緣／右canonical左mirror，安全打包Runtime derivatives，保持核准像素與可辨大場面。caster施法水環與真amount>0受益者泉花分離，真事件決定受益者與效果；KO/控制取消、Pause、end/Restart/destroy與所有權清理遵守既有契約，避免幽靈治療/延遲殘留。normal/reduced都清楚，不額外降主體透明。動畫結束回核准Idle；允許走位，不新增操作鎖。Collection本招文案與真Tier資料同步，只寫玩法；其他未實作效果不提前宣稱。
5. 最小必要驗證：真Session以匿名角色/技能ID涵蓋四Tier與兩模式、319/320ms邊界、重選/距離/同值/自身/KO、缺血封頂/滿血零量、modifier/CD/AI、取消與清理；必要完整suite、Build/素材與新來源guard。真native及built app Browser驗證本體/真治療事件與recipient VFX、左右/normal-reduced/移動/Idle返回/手機尺度與Collection/Pause/Restart/destroy；按共用改動影響驗證Basic/Heavy、P1/P2相容，未受影響舊證據沿用。保存真失敗與修正證據，不用GIF模擬或舊來源PASS代替新工程。
6. 通過後直接正常CI/Pages部署，驗證對應release SHA、build/deploy成功及CI-local/公開素材fingerprints；不跳過正常發布。完成WORK_PROGRESS/STATE/WORK_LOG/handoff、精確來源與發布證據，commit/push同分支。長步驟前先push coherent checkpoint；若有具體阻擋，保存已完成工程及唯一下一步，不重新生成素材。
7. 最後提供正式遊戲網址、隔離Lab（如適用）、如何選赤鱬施放Special與本版變更、驗證結果。停止等待玩家遊戲驗收；工程PASS不等於PLAYER VERIFIED，不建立未授權Runtime核准收據、不開始Awakening/Passive。

[約束條件]
原生單人，不委派/新branch/worktree/TD/main merge。不重置玩家存檔。保護所有approved masters/收據與P1/P2/Basic/Heavy、尺度/anchor/懸浮下緣/mirror；普通Hit永久取消。無固定16MiB總門檻，逐檔安全/兩次下載/required就緒/所有權回收/destroy保持。Basic→Heavy→Special→Awakening→Passive逐招；所有後續交接維持單一、自足、可一鍵複製code block。
```
