# 潤澤 GIF 已核准；Runtime／部署接手

```text
【山海經聯盟｜P3 赤鱬 Awakening「潤澤」無縫接手至部署】

[角色任務]
從 GitHub 最新權威狀態恢復，直接完成潤澤 Runtime 整合、必要驗證與正常 Pages 部署，提供遊戲網址供玩家測試。玩家已核准動作／獨立 VFX／13 GIF 並明確授權部署，不重問是否開始或是否允許部署，不停在接手報告。

[背景資訊]
Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927；PR #1 保持 open／unmerged，禁止 merge main。
美術呈交 checkpoint：a9fc973418c68e1e808d81d998e529cb81e13b6e，僅供定位；先 fetch 最新 remote，讀取其後新增的 GIF 核准收據，不用舊 SHA 覆蓋最新進度。先核對並恢復本機未 push 成果。
P1／P2 COMPLETE；P3 Basic／Heavy／清晰版／Special 已遊戲核准，不重做。潤澤 GIF 已核准，尚未 Runtime／部署／遊戲驗收；P3 整角未完成。
精確收據：docs/art/approved/chiru/awakening/composite-review-v1/acceptance.json
核准素材：docs/art/candidates/chiru/awakening/composite-review-v1/
F3 既有收據：docs/art/approved/chiru/awakening/f3-v2/acceptance.json
候選 manifest／REVIEW 內 PENDING 僅是呈交歷史，由上述新收據覆蓋；不重畫、不重審、不重建已有效素材。

[具體指令]
1. 核對最新 HEAD／分支／PR；讀 AGENTS.md、WORK_PROGRESS.md／docs/STATE.md 最新段落、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/handoffs/P3_CHIRU_AWAKENING_NEXT_WORK.md、docs/decisions/2026-10-23-restore-sequential-skill-workflow.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md、docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json、本招兩份核准收據、素材 manifest／checksums／prepare_preview.py，以及 docs/verification/P3_AWAKENING_PREFLIGHT/{WORK_LOG.md,runtime-readonly.json}。沿用已保存前檢，只查實際工程差異，不重審數值表或重建回瀾已有的共用治療能力。
2. 只補必要 generic data opt-in：兩模式於 600ms 對當時全體存活同隊含自身各結算一次；按各 recipient 當前 maxHp×16／20／24／30%，缺血封頂，不用舊 healing scale、不復活、不暴擊。CD14／12.88／11.76／10.08 秒。T2 起距最近敵人 2.0–4.2 的既有條件治療 +5%；回瀾 T1 低血 +10% 不套潤澤。T3 於 600ms 對範圍20內存活同隊給10.8%減傷2.5秒，保持 MAX／各自到期。AI至少兩位存活隊員HP≤80%才偏好施放。600ms前取消不得提前治療或保護；按核准 spec 保持取消／KO／冷卻／時序規則，禁止角色ID特例。
3. 整合核准 F1–F4 與獨立 caster 水冠扇幕／真正正治療 recipient 泉花／真 T3 澤被水膜。F1/F2/F3/F4=360/240/300/300ms，1200ms回原核准靜態Idle；正治療 amount>0才出泉花，滿血可只有真保護，保護以真狀態起訖，回Idle後仍持續到期。左右、走位、normal/reduced、Pause、中斷、KO、Restart、end、destroy及資源所有權清理保持。不要把 GIF 腳本當遊戲實作；用真事件驅動真受益者效果。
4. 保護全部核准 masters／收據 bytes。Runtime只取確定性衍生檔，保留共同320×260、chestX158／hoverY203／F3 .13解剖密度、懸浮下緣、右canonical／左mirror與全技能共同尺度。依既有工程方式做必要裁切／lossless packing及穩定pivot，不放大角色、不按最高水冠fit、不烘焙FX到本體。記錄來源／衍生hash、尺寸、decoded footprint、required就緒與回收；無固定16MiB總額門檻，逐檔安全／兩下載／真失敗處理保持。
5. 完成最小充分驗證：新增真治療／T0–T3／兩模式／600ms邊界／滿血／取消／結算時同隊存活狀態／T2條件／T3 MAX與各自到期／AI的機制覆蓋；本招真 native與built Browser驗證左右、減動、動作返回、真受益者、保護到期與生命週期清理，核對手機橫向Collection純玩法文案。跑受影響回歸、必要完整suite／Build／source與素材guard；共用改動涵蓋Basic／Heavy／Special及P1／P2必要相容，來源相同的已存證據可附精確reuse proof，勿無差別重測。真Browser不能用靜態圖或headless邏輯冒稱；遇實際失敗先修復並保存證據。
6. 依既有正常CI／Pages流程部署，不繞過gate；核對Actions build/deploy成功、發布SHA與公開指紋符合本次產物。提供可點擊遊戲網址及最短測試步驟。部署已獲授權，不再問一次；未測裝置／FPS不可宣稱完成。
7. 開始工程前及長驗證／部署前保存coherent checkpoint；同分支commit/push，更新WORK_PROGRESS／STATE／本招WORK_LOG／handoff，清楚區分工程PASS／已部署／玩家遊戲驗收PENDING。Git CLI無認證時用已連線GitHub API，逐blob核對Git SHA及完整tree，不讓截斷輸出損壞素材；具體阻擋時先保存成果與唯一下一步。完成部署後停待玩家遊戲核准，不開始Passive，不建立未獲核准的Runtime acceptance。

[約束條件]
原生單人，不委派、不新branch／worktree、不動TD、不merge main、不重置玩家存檔。普通Hit永久取消。保護P1／P2／Basic／Heavy／Special全部已核准行為、素材、尺度、anchor、mirror及收據。Collection只寫實際玩法，不混入開發文字。逐招流程維持：本招GIF核准→Runtime／必要真驗證／正常Pages→玩家遊戲核准→Passive。所有後續交接必須單一、自足、可一鍵複製code block。
```
