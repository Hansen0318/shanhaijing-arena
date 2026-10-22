# P2 鎮岳已驗收 — 整角色結案核對交接

```text
【山海經聯盟 — 新 Work：P2 猼訑整角色結案核對】
[角色任務]
從最新GitHub恢復；鎮岳已COMPLETE／PLAYER VERIFIED，不重做或重問。第一個未完成Gate是依現有收據完成P2整角色結案核對，只處理真正缺少的非Hit義務。

[背景資訊]
Repository Hansen0318/shanhaijing-arena；唯一branch feat/m0-combat-core-20260927；PR#1保持open/unmerged。GitHub唯一權威，先fetch核對完整remote HEAD/tree/branch/PR/working tree與最近commits。參考89ca19bf80eaf7de31e5a440d61e6948db8ae7be是核准前docs，必須取得包含runtime-v1新receipt的最新HEAD，不能把舊SHA當最新。
先讀AGENTS.md、WORK_PROGRESS.md、docs/STATE.md、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/DEVELOPMENT_ROADMAP.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、docs/M5C_P2_BOTUO_AWAKENING_ACTION.md、docs/verification/P2_CHARACTER_CLOSURE.md、docs/art/approved/botuo/awakening/runtime-v1/acceptance.json及docs/verification/P2_AWAKENING_RUNTIME/{REPORT.md,release-evidence.json,continuation/closure.json}。
玩家本次原文：「好確認OK核准，紀錄GITHUB規則流程進度，我要開新的work，要讓他無縫接軌，給我prompts我要跟他說的」。對應release66e6c3c640c546ec90dbd5a79da06814db15d02f/tree5a818dac7b2596a0379ebe4240a422125b7d314f、呈交URL https://hansen0318.github.io/shanhaijing-arena/?awakening=66e6c3c 。鎮岳玩家審核已關閉，不再問相同核准。舊PHONE PENDING是歷史，不是待辦；不捏造逐項裝置/Tier/FPS/GPU結果。
P1 COMPLETE。P2Idle/Move/KO/尺度、Basic角擊、Heavy震嶺、Special守群既有核准保護；Awakening鎮岳現在COMPLETE/PLAYER VERIFIED，四招皆有runtime收據。Basic/Heavy/Special/awakening/runtime-v1/acceptance.json與P2_MOVE_BODY/player-acceptance.json為核對來源；不是要求重做。
既有normal Actions1097/run39779770526完整1014/1014、Build/Pages SUCCESS；native4/built-mobile2、native scale10/50標記、8雙向姿勢採樣證據、149/149新公開檔案SHA256一致。來源未變就沿用，切勿重跑全部測試、Special164、Browser、部署或公開比對。過去29/28/25fail原TAP保留，25項已依來源重建明示遷移，非目前失敗；SIGKILL舊根因不稱OOM。
全局素材管理已無固定16MiB總decoded/required數量/131072reserve拒絕，cache maxBytes null；64僅inactive entry回收、12MiB僅未pin回收。保留每檔4MiB/2048dimension/4194304pixels、兩下載、完整required pins/ready、真載入與Phaser allocation失敗、回收/scene destroy；不為單角色例外。赤鱬KO十一片方案superseded不可實作。

[具體指令]
1. 對照P2_CHARACTER_CLOSURE.md、最新roadmap與各既有收據做最小結案核對；一般Hit永久取消，不是缺口。不重製角色/姿勢/VFX/GIF，不重開已關閉Gate。
2. 若目前義務已齊，依證據整理P2結案狀態與下一合法Gate；若仍有真正未滿足條件，列清楚文件依據與最小必要工作再執行。只有明確缺少的整角玩家sign-off才提出一次聚焦確認，不要求重驗全部技能或所有Tier。
3. 未另獲明確範圍前，不開始P3/TD或其他新角色；完成本Gate不等於自動開始下一里程碑。保留現有玩法、傷害/Tier/AI/Targeting/移動/控制，不加統一前搖。
4. 鎮岳保護：instant0直接F3、tacticalT0 900/T3 819ms；實際正damage目標才命中爆破；對空無假命中/保護。T3真存活附近受益者radius2.832/13.5%/3.75s，與守群獨立到期且MAX不相加；T0 coefficient1.70/radius2.2/CD14/windup0不改。GROUND274/crop(100,80)/root(100,194)/origin(.5,.97)保留，不改回錯誤舊184。
5. 每完整切片更新WORK_PROGRESS/STATE/AGENTS/spec/report/handoff，同分支commit/push。docs/art-only skip ci；只有真Runtime變更才按影響測試/CI/發布，不繞過來源證據guard。報告完整HEAD/tree/PR、實際變動與剩餘Gate。所有後續Chat/Work/Codex指令放單一完整自足可一鍵複製code block。

[約束條件]
禁止merge main、替代分支、TD、P3、角色ID特例、重畫/重問核准成果。保護P1/P2全部master/receipt/GIF/尺度/anchor/ground/mirror。Native single-agent，不自行開子代理。兩歷史指定未追蹤暫存檔不加不刪；目前另有docs/art/candidates/botuo/special/composite-review-v1/.botuo-special-instant-chain.gif.CDsyyy、docs/art/candidates/lushu/awakening/composite-review-v1/.lushu-awakening-character-only.gif.5SQmfQ、docs/art/candidates/lushu/awakening/vfx-review-v1/.C-pair-raw.png.0ssrYD，均保留排除。
```
