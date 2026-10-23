# Project Boundaries — Shanhaijing Arena

## 2026-10-23 — 玩家確認VFX／Collection OK，P1與P2整角完成

玩家最新原文「好我確認OK繼續是什麼」「我確認OK，紀錄進度流程規則 接下來是什麼」直接驗收release32424075b5c91844187fc80a566a9140c7e955d6/treeab0a6733ff312d48fef3979e1e0697aaaf74a6de之新增疾行風痕與Collection修正文案；新收據docs/art/approved/lushu/passive/runtime-v3-vfx/acceptance.json，10項證據hash綁定，原收據不改。最新決定docs/decisions/2026-10-23-passive-vfx-copy-player-acceptance.md，整合結案docs/verification/P1_P2_PASSIVE_VFX_CLOSURE.json。P1/P2 COMPLETE／PLAYER VERIFIED，新增呈現Gate CLOSED，不重問同版本風痕/文案/厚甲或已核准四招。下方PENDING/須確認風痕為歷史。

全現有及未來被動完成必須有相符真狀態VFX、獨立Tier真成長/可辨識、reduced-motion提示與expiry/KO/end/Restart/destroy清理；戰場不放被動文字牌/HUD數字/連線或放大角色。所有玩家介面只寫玩法效果/必要數字及世界觀，不混入開發規則。固定Basic→Heavy→Special→Awakening→Passive→整角結案。既有masters/收據/GIF/尺度/anchor/ground/右向canonical左向mirror/數值/MAX/時序保持；普通Hit永久取消、全局素材無固定總量/數量/reserve拒絕門檻，逐檔安全/兩下載/required/所有權/回收/真失敗/destroy保持。

下一路線圖項目P3赤鱬Basic「水矢」，P1/P2被動先決條件已解除；建議下一任務是核對已核准P3形象與真機制/命中/射程/時序/Tier→差異化動作設計→單張本體F3審核，再依流程其餘姿勢/VFX/GIF/Runtime/驗證/正常發布/玩家驗收。本次只有紀錄核准及回報下一步，未開始P3實作/製圖，不能把進度詢問當成未展示設計或新素材核准。

純文件/收據[skip ci]，新來源guard585靜態核對、核准證據hash通過；Runtime未變沿用1070/1070、Build、P1native16/built8、P2native16/built8、Collection5+5、正常Pages39902216798及公開149/149，不重跑/重部署/重下載。原生單人、同feat/m0-combat-core-20260927、PR#1open/unmerged、保留無關untracked，不main merge/新分支/TD/角色ID特例；所有handoff仍單一完整自足code block。



## 2026-10-23 — 全角色被動VFX／玩家文案硬規則，呈現修正驗證ACTIVE

玩家確認厚甲既有護甲VFX並要求全現有/未來角色遵守；精確原文與規則在docs/decisions/2026-10-23-passive-vfx-player-copy.md，P2既有release1f6b47b之條件核准收據docs/art/approved/botuo/passive/runtime-v1/acceptance.json。仍必須完成本次Collection文案修正發布；不冒稱未展示的新P1風痕/新文案已經玩家驗收。舊P1機制/四招/美術核准不重開。

所有現有與未來被動完成必須含符合技能、真status同步、Tier可辨、reduced-motion可讀、到期/KO/end/Restart/destroy清除的VFX；禁止戰場被動文字/HUD/數字/連線或放大角色。所有玩家介面只寫世界觀、玩法與必要效果資訊，工程限制/審核/包裝/安全額度/「不顯示文字」等只放docs與測試。直接修正來源，不做文字過濾。已提供技能不顯示「已實裝」，未開放顯示「尚未開放」。

已修正P1/P2及未開放被動Collection文案，新增通用movement/speed-streaks，P1青色風痕1/2/3/4組；P2琥珀護甲維持。數值/時序/MAX/美術尺度保持、無角色ID特例。RED4→GREEN12，完整1069/1069、Build PASS；真native/built P1/P2與手機Collection驗證進行中，細節docs/verification/PASSIVE_VFX_COPY_REVISION/WORK_LOG.md。新來源guard/正常CI與Pages/公開核對NEXT；這是中間checkpoint，尚未發布。

固定Basic→Heavy→Special→Awakening→Passive(真效果+Tier+VFX+清理+驗證+發布+玩家驗收)→整角結案。P3技能仍BLOCKED。原生單人、原分支feat/m0-combat-core-20260927、PR#1open/unmerged，保護所有既有收據/master/GIF/anchor/ground/mirror與無關untracked；普通Hit永久取消，全局素材政策與兩下載/required/安全/回收保持。來源未變沿用其範圍、不重做既有四招/尺度驗證；新呈現來源不能用舊guard掩蓋。所有handoff單一完整自足code block。


## 2026-10-23 — 厚甲已部署／CI與公開149核對PASS／只待厚甲玩家驗收

Release1f6b47b4e30a867b1b8d294c69fdeaedc51f0b98／tree33fb1eab6d61b3f419e812de97b38fd19e651aa8，正常Pages#1104/run39881533879 build+deploySUCCESS，CI完整1065/1065、Build、599guard PASS；verification39881533921SUCCESS、來源完全相同Browser證據沿用。artifact12470144586 SHA25627f047b593a84a0e0de67729e7742fc4692c1f1f6c37e3d44e4faa1de7b0dc4e/ZIPCRC及CI/local149檔逐bytes一致；公開149/149（3新取+146相同指紋沿用）PASS。全部證據docs/verification/P2_PASSIVE_RUNTIME/。

厚甲真實自身減傷T0/T1/T2/T3=20/30/40/50%、4秒/CD8秒；敵人≤2.2，或隊友≤2.4且其敵人≤2.2；MAX不加算、各自到期，無文字護甲1/2/3/4組。匿名/重新命名角色與被動真Session已證明通用資料驅動，不看P2 ID。未來角色仍需自己的真效果/Tier/清理/來源驗證/發布/玩家驗收才完整，不得只新增文案或假稱未知效果已支援。

遊戲https://hansen0318.github.io/shanhaijing-arena/?passive=1f6b47b 。**唯一剩餘Gate：厚甲玩家驗收**，只看接敵護甲/耐打感與Tier成長；未收到本版本核准，不寫PLAYER VERIFIED或P2整角色COMPLETE。P1已結案與P2四招/所有已核准美術尺度/時序/MAX/素材政策保持，不重驗；普通Hit取消，P3技能仍BLOCKED。原分支/PR#1open-unmerged、原生單人自審、無main merge/新分支/TD/角色ID特例。此次純發布紀錄[skip ci]、Runtime來源未變，不重跑測試/Build/Browser/部署/公開下載。


## 2026-10-23 — 厚甲本機工程PASS／正常發布ACTIVE

完整1065/1065、Build/149檔、厚甲真native16/built8、P1新來源native16/built8、P2受影響native4/built2/scale10與新來源guard599/真篡改負向/恢復均PASS。共用空間減傷/四Tier/無文字護甲真實生效，future-guardian與重新命名被動的真Session仍減HP20%，無角色ID特例。未來每角仍需自己真效果/Tier/清理/發布/玩家驗收，不能只靠文案或基礎數值。

工程報告docs/verification/P2_PASSIVE_RUNTIME/REPORT.md及WORK_LOG.md保留7項初始失敗的來源遷移與Browser fixture修正，最新全PASS；原生單人自審非獨立review。已核准四招/美術/尺度/ground/anchor/mirror、P1疾行/既有MAX與素材政策保持，普通Hit取消。正常發布採新guard，不拿舊P1來源證據覆蓋厚甲。

目前CI/Pages/public尚待實際完成，玩家厚甲驗收PENDING、P2整角色未完整、P3技能BLOCKED。下一合法步驟：原分支正常CI/Build/Pages與149公開比對，不重跑來源未變的本機測試/Browser或重審美術。PR#1保持open/unmerged；不merge main/新分支/TD。此Runtime發布候選走正常CI，非skip/bounded繞過。


## 2026-10-23 — 厚甲方向確認／共用防禦被動已實作，真Browser與發布NEXT

玩家「確認其他未來整體角色開發真的會有效果，就繼續實作」確認厚甲方向並直接授權實作，精確原文/範圍見docs/decisions/2026-10-23-botuo-passive-execution.md、P2_PASSIVE_RUNTIME/authorization.json；不重問開始/執行方式或額外流程核准，不冒稱未展示文件逐項獲准。正式spec/原生單人plan已補齊。

共用spatial-pressure→mitigation、匿名角色/雙陣營/多instance/Tier表、P2厚甲20/30/40/50%、4秒/CD8秒、MAX/各自到期與無文字琥珀護甲弧片已實作；來源kind/data驅動、沒有角色ID特例。未來每角必須真效果、獨立Tier、狀態/清理、來源驗證、發布與玩家驗收才算完成；未支援的新類型必須擴充共用系統，不承諾未來角色已生效。P1/P2核准四招/美術/比例/時序/素材政策、普通Hit取消、原分支PR#1open/unmerged、P3技能BLOCKED保持。

Task1 RED→GREEN22/22；Task2真Session/P1距離22/22，原fixture遷移後受影響68/68；Task3無文字Graphics/cleanup15/15。完整first1060/1053/7fail原始保留，已按來源定位metadata/舊fixture/浮點斷言遷移，未刪除原遊戲斷言。最新完整測試與下一步以docs/verification/P2_PASSIVE_RUNTIME/WORK_LOG.md為準。尚未Browser/Build/新來源guard/Pages/公開比對/玩家驗收PASS；checkpoint不是發布。下一步完成Task4必要真驗證與正常發布，不重做前檢或重審四招/美術。


## 2026-10-23 — P2厚甲真機制前檢完成／新方案審核待回覆

恢復/fetch HEAD d6c18d8280adba78962eadb21e38dcb5e6e49962／tree c6209eb16fe5e7aa9ac9a7ee9294e3477a3d202c；原分支feat/m0-combat-core-20260927、PR#1 open/unmerged、初始working tree乾淨。已完成roster/獨立passive/status/Tier/combat/Collection/呈現真來源核對與四Tier減傷投影，詳 `docs/verification/P2_PASSIVE_PREFLIGHT/REPORT.md`（docs內相對路徑按repo root解析）。

新A候選：自身與敵人≤2.2單位，或隊友≤2.4單位且該隊友有敵人≤2.2；自身減傷T0/T1/T2/T3=20/30/40/50%，4秒、觸發起CD8秒；MAX不加算、各自到期、隊友保護與四招契約不改。無文字琥珀護甲弧片1/2/3/4組、比例不變。這些為未核准候選，P2.passive仍implemented:false；不是Runtime/體感/發布PASS。**目前唯一Gate：玩家審閱新觸發、數值、共存與無文字呈現方向。** 不再重做前檢，不重問能否開始P2；核准後依既有規格/計畫/原生單人流程推進。

P1整角色COMPLETE與既有P2四招/美術/尺度/anchor/ground/mirror/全部收據保持，普通Hit永久取消；P2被動PLAYER VERIFIED前P3技能BLOCKED。此切片只有docs/純數值probe，[skip ci]，無src/public/tests/scripts/依賴/workflow修改；舊來源證據沿用其原範圍、不重跑測試/Build/Browser/部署/公開比對。來源靜態檢查見P2_PASSIVE_PREFLIGHT/audit.json。最新checkpoint為含本條目之commit，必須fetch取得完整HEAD/tree。handoff：docs/handoffs/P2_BOTUO_PASSIVE_NEXT_WORK.md。


## 2026-10-23 — P1疾行v2 PLAYER VERIFIED／P1整角色COMPLETE；P2厚甲 ACTIVE

玩家直接回覆已部署疾行v2「好我approved 紀錄github進度規則流程後。我創新的work 給我我要給新的work的prompts，讓她確認進度流程規則後 直接讓她繼續往下執行下一步 讓她無縫接軌開發，」。新收據 `docs/art/approved/lushu/passive/runtime-v2/acceptance.json` 綁定release d1a39397562f2345bec0243ede82b6376f89684d/tree981276199ebe572d0481decfaff76349c8bb9a3d與呈交文件feb3c1182f0fd76c28c211aef232da21cf022511。P1獨立被動Gate CLOSED，不再要求相同實機/數值/文字/四招核准。既有base/四招核准加上本次新被動核准完成P1角色補完；行政結案 `docs/verification/P1_CHARACTER_CLOSURE.json`，不是新造整角裝置測試。原生自動化physicalPhone:false仍代表自動化來源，不能據此重開已接受玩家Gate。

P1 COMPLETE／PLAYER VERIFIED；P2只有獨立被動厚甲尚未完成，現在ACTIVE／MECHANISM PREFLIGHT NEXT。新Work須先fetch確認後直接做厚甲真機制核對與具體T0–T3方案，不能停在恢復報告或重問能否開始。P2厚甲原定位是前線/近隊友防禦收益，未展示的新觸發/減傷/時間/CD/非文字呈現尚無設計數值核准；依現有流程只在真正新設計Gate停下，不冒稱厚甲已實作。入口 `docs/M5C_P2_BOTUO_PASSIVE.md`、新決定 `docs/decisions/2026-10-23-lushu-passive-player-acceptance.md`、完整handoff `docs/handoffs/P2_BOTUO_PASSIVE_NEXT_WORK.md`（共享P1_P2入口同步）。P2被動PLAYER VERIFIED前P3技能BLOCKED。

流程固定Basic→Heavy→Special→Awakening→Passive→整角結案。被動須有明確且夠可辨識的T0–T3實際成長，不拿基礎Tier數值或既有四招Tier效果代替；戰場不顯示被動文字牌/被動HUD/連線，Collection保留說明。P1疾行35/50/65/80%、3秒/CD6秒及全部已核准P1/P2masters/收據/GIF/尺度/anchor/ground/mirror保持，普通Hit永久取消，鎮岳真傷害真狀態/instant/tactical/MAX契約保持。原分支/PR#1open-unmerged、原生單人、無角色ID特例與全局素材政策不變。

此切片純文件/新核准收據[skip ci]，來源guard549靜態雜湊通過；沿用已保存1047/1047、Build、P1native16/built8、P2受影響相容與正常Pages39875078049、公開149項核對（3新取+146相同指紋沿用），未重跑測試/Browser/Build/部署/公開下載。舊PLAYER PENDING、PHONE PENDING、歷史失敗/容量規則與P2舊範圍整角COMPLETE不得覆蓋最新核准/獨立被動義務。所有交接維持單一完整自足可複製code block。


## 2026-10-22 — Latest scope: independent passive catch-up

Player decision `decisions/2026-10-22-passive-character-completion.md` supersedes the older P1/P2 full-character closure: preserve accepted base/four skills, but P1疾行 is active at design review, P2厚甲 is queued until P1 passive player acceptance; P3 skills blocked until both complete. Permanent order is Basic→Heavy→Special→Awakening→Passive→whole-character closure. Shared data-driven passives only, never character-ID runtime exceptions; existing Tier effects do not substitute for independent passives. Current pointer `handoffs/P1_P2_PASSIVE_NEXT_WORK.md`. This slice is docs-only; all existing asset policy and accepted gameplay/art contracts remain protected.

## 2026-10-22 — Current policy / P2 closure

P2 current character scope is CLOSED by the existing accepted base/scale/four-skill evidence; see `verification/P2_CHARACTER_CLOSURE.md` and `.json`. No P3/TD scope is authorized. Current global asset policy has no fixed total decoded-byte/required-count/131072-reserve admission gate; cache maxBytes is null. Keep per-file safety, two concurrent downloads, complete required pins/readiness, ownership/reclamation/actual failures/scene destruction. The older28-failure/Browser-blocked/design-only entries below are historical, superseded by the accepted66e6c3c release and current closure; do not restore their pending gates or caps. No runtime changes in this docs-only audit.

## 2026-10-22 — Global dynamic policy implementation checkpoint

The approved shared policy is now implemented in schema/cache/residency: no fixed total decoded-byte or required-count admission ceiling, no131072reserve gate. Existing cache16MiB/64 defaults are only inactive retention targets; scene12MiB is soft unpinned reclamation. Per-file4MiB/2048/4194304 and every required image, real failure handling and teardown stay mandatory. Do not restore old caps from history, create per-character exceptions or revive Chiru KO splitting. Evidence and current28full-suite failures/Browser blocker are in `verification/P2_AWAKENING_PREFLIGHT/global-residency-runtime/REPORT.md`; this is not Awakening integration, native/mobile acceptance or deployment. Preserve branch/PR and all approved artwork/gameplay.

## 2026-10-22 — Global decoded-byte limit direction (design only)

Player explicitly selected a game-wide shared dynamic-residency policy without a fixed **total decoded-byte hard ceiling**, superseding the character-specific Chiru KO split proposal, and wants a verified deployment for in-game skill review. Written design `docs/superpowers/specs/2026-10-22-global-dynamic-asset-residency-design.md` awaits independent review. Existing 16MiB/cache/scene/64-entry/131072-reserve code remains unchanged until an approved plan and tested implementation; earlier fixed-cap rules below document historical releases, not the new policy. Preserve per-asset limits, all required presentation keys, error handling, scene cleanup, approved art/gameplay and the same feature branch/PR. No immediate deployment or phone acceptance is inferred.

## Purpose
Prevent accidental contamination from other Shanhaijing projects, especially `shanhaijing-td`.

## Reusable across projects
Only project-governance practices may be reused by default:
- Chat-first delegation;
- Work-minimization;
- safe checkpoints;
- zero-context recovery;
- progress/state documentation;
- risk-based testing;
- player-owned smoke;
- release/status discipline;
- asset approval/reuse discipline where it is generic.

## Forbidden by default
Do **not** import, assume, or copy any tower-defense-specific gameplay contract unless the user explicitly approves it for Arena.

Examples of forbidden implicit carry-over:
- tower slots / build pads;
- tower placement;
- path-following enemies;
- Spawn -> Base path progression;
- Wave composition / wave timers;
- tower projectile rules;
- Blessing eligibility/filter logic;
- TD Boss HUD geometry/contracts;
- TD lineup progression rules;
- TD level numbering or level-folder conventions;
- TD-specific anchor/geometry transforms;
- TD-specific asset-loading assumptions;
- TD balance values, enemy spacing rules, or tower upgrade rules;
- TD-specific dev query parameters or release URLs.

## Code isolation
- Do not copy source files from `shanhaijing-td` into this repository by default.
- Reusing a generic algorithm/pattern is allowed only after rewriting it against Arena's own contracts and tests.
- Any deliberate cross-project code reuse must be documented in an ADR with source, reason, compatibility review, and tests.

## Arena-native architecture
Arena owns its own:
- Character model;
- Team model;
- Controller arbitration;
- AI decision system;
- Ability system;
- Targeting;
- free-movement arena rules;
- Camera;
- HUD;
- progression/campaign rules;
- data schemas;
- tests and release criteria.

## Conflict rule
If a developer/agent notices a TD rule appearing in an Arena task or implementation without an explicit Arena decision:
1. stop treating it as inherited truth;
2. compare against Arena canonical docs;
3. remove or quarantine the assumption;
4. ask for a decision only if Arena docs do not resolve it.

## Naming rule
Avoid TD-specific terminology in Arena code/specs unless describing an explicit non-runtime comparison. Prefer Arena-native terms such as character, team, arena, encounter, ability, target, camera, roster, chapter.

## 2026-10-23 — 被動呈現與Tier成長修訂

玩家明確要求戰場被動文字不要出現：不使用被動文字牌、被動HUD數字或指向連線。Collection角色說明保留。後續獨立被動須明示T0–T3實際機制/增益成長，不能以基礎Tier數值成長代替；數值依角色方案，不直接複製P1。被動需有可辨識的實際效果，不能僅靠文字證明。P1本次實作值35/50/65/80%、3秒/CD6秒，仍待新版玩家驗收。一般移速buff/outgoing上限15%保持，明確資料驅動movementBonusCap可提供較高移速額度，上限須驗證，無角色ID判斷；參見2026-10-23-passive-visibility-tier-revision decision。
