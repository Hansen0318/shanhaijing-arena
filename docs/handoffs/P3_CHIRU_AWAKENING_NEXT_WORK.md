# 潤澤 Awakening — F3 first unfinished gate

Special 回瀾已獲玩家遊戲核准，精確收據見 docs/art/approved/chiru/special/runtime-v1/acceptance.json。下一 Work 直接執行以下單招工作。

```text
【山海經聯盟｜P3 赤鱬 Awakening「潤澤」無縫接手】

[角色任務]
從 GitHub 最新權威狀態恢復，直接執行潤澤第一個未完成 Gate：必要機制差異核對 → 動作差異設計 → 一張角色本體 F3 候選圖 → 呈交玩家審核。不要重問是否開始，不停在接手報告。

[背景資訊]
Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927
PR #1 保持 open／unmerged，禁止 merge main。
參考 checkpoint：01e11afbdcb5b57be0a44ce2360d8c4834568157；僅定位，必須先 fetch 最新 remote，讀取包含後續 Special 遊戲核准收據的最新提交，不用舊 SHA 覆蓋進度。
P1／P2 COMPLETE／PLAYER VERIFIED；P3 Basic、Heavy、清晰版及 Special「回瀾」已獲玩家遊戲核准。
Special 核准版本：de1b442414e09307dfc36c509bb533f0059f055d。
收據：docs/art/approved/chiru/special/runtime-v1/acceptance.json。
Special 已結案，不重審、不重畫、不重做其 Runtime／測試／部署；P3 整角尚未完成。

[具體指令]
1. 先核對遠端 HEAD、分支、PR 與可恢復本機工程。讀取 AGENTS.md、WORK_PROGRESS.md／docs/STATE.md 最新段落、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/handoffs/P3_CHIRU_AWAKENING_NEXT_WORK.md、docs/decisions/2026-10-23-restore-sequential-skill-workflow.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md、docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json、Special 新收據，以及 docs/verification/P3_AWAKENING_PREFLIGHT/ 的 WORK_LOG.md、candidate-recovery.json、runtime-readonly.json。舊整角批次發布／PENDING／Special 待驗收文字屬歷史，以最新逐招決策與收據為準；整角數值規格核准仍有效，不重問。
2. 潤澤舊候選 docs/art/candidates/chiru/whole-character/f3-batch-v1/awakening-f3.png 及 originals/awakening-f3.png 均已嚴格解碼失敗，證據已保存。保留原檔與 manifest，不用截斷解碼、不要求玩家審壞圖。先確認最新遠端是否已有後續有效候選；若沒有，直接依核准 identity／battleIdle、原 prompt 及數值規格重建「一張」潤澤 F3，存新版本目錄，不重生其他已核准素材。
3. 實際查看 public/assets/characters/chiru/identity.png、battleIdle.png，以及依 Basic／Heavy／Special 核准收據定位的 F3／姿勢圖。保護臉型、物種特徵、配件左右、耳飾、配色、體型、右 canonical／左 mirror、共同尺度／anchor／懸浮下緣。潤澤採雙臂高 V 托水冠／展鰭輪廓，必須在無獨立 FX 時就與 Basic 水平前射、Heavy 雙手前推、Special 單高托／單低展明顯不同。Basic < Heavy < Special < Awakening 同尺度場面遞增；不能靠放大角色或只換技能特效冒充動作差異。
4. 沿既有核准規格設計，必要差異核對沿用已保存證據並讀實際來源：兩模式 600ms 對當時全體存活同隊（含自身）各治療一次；目標當前 maxHp × 16／20／24／30%，封頂缺血、不乘舊 healing scale、不復活／暴擊。CD 14／12.88／11.76／10.08 秒；T2 起既有後排 2.0–4.2 條件治療 +5%，T1 低血 +10% 僅回瀾、不套潤澤。T3 澤被在 600ms 對範圍20內存活隊員給10.8%減傷2.5秒，既有 MAX／各自到期保持；施法前取消不得提前給治療或保護。AI 至少兩位存活隊員 HP≤80% 才偏好施放。F1／F2／F3／F4＝360／240／300／300ms。caster 水冠扇幕、真正正治療 recipient 泉花、真澤被保護水膜為後續獨立 VFX；滿血者可只有真保護而無治療花，不畫傷害爆炸或角色間連線。
5. 此 Work 只做到單張 F3。使用內建 imagegen，先依技能指引載入有效核准參考，不把損壞 PNG 當參考。保存原圖、完整 prompt、來源 hash、透明安全 padding／manifest／可重建 QA；嚴格完整解碼、alpha／像素反貼、深淺底、左右配件與核准 Idle／三招共同尺度核對。展示可正常觀看的 F3 候選後，停待玩家美術核准。
6. 更新 WORK_PROGRESS／STATE／本招 WORK_LOG／handoff，commit／push 同分支 checkpoint；純美術／文件用 [skip ci]，未改產品不重跑已通過 suite／Build／Browser／Pages。長步驟前先保存 coherent checkpoint；遇阻擋保留成果與具體唯一下一步，不反覆重生素材。

[約束條件]
原生單人，不委派、不新 branch／worktree、不動 TD、不 merge main、不重置玩家存檔。
只開始 Awakening，不做 Passive；未獲潤澤 F3 核准不生成其餘姿勢／獨立 VFX／GIF、不整合 Runtime／部署、不建未獲核准 acceptance。
後續仍逐 Gate：F3核准 → 其餘動作／獨立VFX → GIF核准 → Runtime／必要真驗證／正常Pages → 玩家遊戲核准 → Passive。
保護全部 approved masters／收據、P1／P2／Basic／Heavy／Special、尺度／anchor／懸浮下緣／mirror；普通 Hit 永久取消。無固定16MiB總門檻，逐檔安全／兩下載／required就緒／所有權回收／destroy保持。共用機制資料 opt-in，禁止角色 ID 特例；Collection只寫實際玩法。所有後續交接必須維持單一、自足、可一鍵複製 code block。
```
