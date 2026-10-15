# P1 Basic runtime execution evidence

## 最新玩家回饋與接手狀態 — 2026-10-16

玩家於 2026-10-16T07:18:49+08:00 回覆：「這樣不錯，有吧這些正確製作攻擊動畫效果歷程，紀錄在github相關文件嗎？才可確保未來其他chat和work無縫接軌」。記錄為 **P1 Basic 攻擊動畫／效果正面回饋與流程保存要求**。未從這句話推定裝置、KO／Pause／Restart 已逐項驗收。工程測試、Build、CI、Pages、public fingerprint 已完成；既有證據沿用，不重新部署。本次只有文件／核准狀態 metadata 更新，沒有修改圖片、程式或戰鬥規則。

接手者先讀 WORK_PROGRESS.md CURRENT HANDOFF POINTER、docs/STATE.md 最新 AUTHORITATIVE CURRENT STATE，再讀 docs/CHARACTER_ACTION_ART_WORKFLOW.md 與 docs/verification/M5C_B_LUSHU_BASIC_RUNTIME.md。已核准角色姿勢、VFX、GIF、B 時序設計與實作均不得重做。下一步仍為玩家尚未逐項回報的實機項目；沒有新角色／招式授權，不開始新攻擊或 VFX，不 merge main。


Status: **ENGINEERING PASS / PLAYER IPHONE SMOKE PENDING — 2026-10-15**.

## Final deployed result

Tested/deployed source **7e7ae7371bbcade8434fe4e3771ebb5c65eab7a3**, final HEAD is docs-only closure. Native implementation checkpoints a6db06e/aad9ea8/668aa48/3dd4acb. Targeted94/94; local final751/751 and CI751/751; guard65files3674128bytes; Build/diff/protected-baseline PASS. Shared simulation owns180ms P1 Basic/F3 damage; other abilities remain legacy0. Approved exact art/GIF unchanged; runtime resize-only derivatives and exact-pixel Idle F1, existing Move/KO/Collection/stats/AI/Tier/reward protected. Cache and scene full-required16763144bytes, unchanged16MiB,20Restart cycles/no missing required textures. Self-review only, not independent or iPhone acceptance.

Actions **#1004 /38758231891**, build116502273046 and Pages116502490526 **SUCCESS**. Actual deploy log environment URL https://hansen0318.github.io/shanhaijing-arena/ ; deployment reported success2026-10-15T15:14:43Z. CI logs confirm751tests/751pass/0fail and same build asset names. Public33files downloaded after deployment and byte-compared against tested dist: HTML, both JS, CSS, all28manifest character images including new4derivatives/all-five Portrait/Idle/Move/KO/Collection, plus old protected Lushu Idle strip. **All exact-byte PASS**. Full sizes/SHA256/source/run IDs: `M5C_B_LUSHU_BASIC_PUBLIC_FINGERPRINT.json`.

Public fingerprint: index-DvSMU-Ie.js SHA256b103bd6e0af031358d50e565f8b7ab6285d192d1a36d6f71de35b1596f034b20; battleRuntime-CXDlB1v9.js SHA256fa393bf0237eae0259f6ee926d8e79407df27f7da6a27e1f1f6ea20767b69a94; index-DcqtNRF0.css SHA256a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da. HTML SHA2568cf66807b65ad5c2d7b94c6a9ab35b2dd75ee53d397b708aead21592b2ef2447.

### Exact next action — player iPhone only

Open https://hansen0318.github.io/shanhaijing-arena/?v=7e7ae73 . Check first attack has no blank HUD/art; distinct four poses and single true impact/blade/contact; mirrored moving attacks/ground/Idle-or-Move return; KO interruption; Pause/Restart no disappearing art or old spark. Do not claim phone PASS until player reports it. **STOP: no next character/attack art, new VFX or main merge.** PR#1 remains open/unmerged; main unchanged16f73932a0399979ba79b92f93f5ce1c1d1909b9. Existing build chunk/action-Node deprecation warnings are nonfatal and unrelated; thresholds/workflow untouched.

Everything below is chronological execution history, not unresolved current gates.

## Latest release evidence

Final targeted plan command94/94 PASS; npm test751/751 PASS,0skip/cancel/todo; npm run build exit0, guard65files3674128bytes,Vite99modules; git diff --check exit0. Existing large Phaser chunk warning nonfatal, threshold unchanged. Dist:index-DvSMU-Ie.js,battleRuntime-CXDlB1v9.js,index-DcqtNRF0.css. Source checkpoint3dd4acb; CI/Pages/public pending.

Executable protected-baseline comparison against4160621: all catalog fields except added P1.actionDescriptors deep-equal; all ability fields except new windupMs deep-equal; P1.basic180,others0; no AI/Tier/campaign/Collection diff; only4new public PNGs, all originals unchanged. Asset tests confirm approved PNG/GIF hashes and Idle F1 RGBA equality. Move/KO geometry/fps remain unchanged.

Self-review, not independent: full implementation range4160621..3dd4acb checked against accepted spec, all5 Review Focus cases, required failures, cast/hit ordering, tokens/KO/control/coarse steps. No Critical/Important finding or deferred minor. Existing simulation-clock result overlay freezes final snapshot including legitimate winning contact; no post-result damage, shutdown/Restart destroys records. No new wall-clock timer.

### Execution rulings and limitations

1. Approved native feature checkout retained instead of another worktree; cost if wrong: unpushed changes local until checkpoint.
2. Cloud secondary skill resources unavailable; exact installed6.4.2 scripts used and briefs checked; cost: tooling-version mismatch risk.
3. Image transport double reads actual PNG IHDR/encoded bytes; all PNGs Pillow-decoded,new RGBA exact; cost: browser decoder still requires device acceptance.
4. Terminal cleanup preserves real winning events for same render; explicit clear/Exit drops queues; cost: terminal feedback loss if wrong, tested.
5. No production ArenaScene edit: existing phases/copy-identity enrichment already work, actual-method regression covers it; cost: future routing changes must keep tests.
6. Accepted plan prohibits automatic subagents, so honest self-review only; cost: no independent second reviewer.
7. Review BASE4160621 bounds current authorized implementation, not unrelated earlier feature history; protected diff/deep-equality/full tests cover baseline; cost: not a fresh audit of earlier accepted work.

Release/phone acceptance not claimed until actual external gates. No main merge.

Player approved implementation plan at2026-10-15T22:43:03+08:00 with「好繼續」. BASE4160621453626071e6ec2b13e282336794df549c, active feature/PR#1, no main merge. Canonical design/plan under docs/superpowers/{specs,plans}/2026-10-15-shared-basic-windup*.md. Native execution here, no new approval gate between tasks.

## Task1: approved-art derivatives and finite residency

Baseline npm test708/708 PASS. Asset TDD RED observed missing derivative/manifest assertions (4 expected failures, approved-master check already green). First green run caught test-only PNG decoder rejecting indexed-color Botuo Idle; verified ALL public character PNGs fully decode with Pillow, then used actual PNG IHDR dimensions at the external-browser transport boundary. No production failed image was ignored. New derivative RGBA tests still decode/unfilter actual pixels.

New4 files: Idle96x128/18033bytes, action512x128/51713bytes, blade97x81/5050bytes, contact85x57/2300bytes. Exact SHA256/alpha/geometry: docs/art/approved/lushu/basic/review-v1/runtime-manifest.json. Old Idle file and all accepted masters/GIF unchanged; new Idle RGBA equals old F1 pixel-for-pixel. All4action cells checked on light/dark backgrounds at computed display size, blade/antlers/hands/tail/feet complete. Measured shared action scale2.4731182795698925, origin[.5,.8369846715109296], same visible F4 height/foot offset as old Idle, no gameplay coordinate change.

Asset tests include20Restart/destroy cycles in alternating all-five load orders, real cache+residency with actual PNG dimensions, optional identity eviction, all required texture presence, each new key failing explicitly, and late completion after shutdown. Required cache/scene set16763144bytes, below unchanged16777216 hard guard;12MiB soft and separate16MiB cache remain unchanged. This is decoded-equivalent accounting, not total browser RAM/GPU measurement. No full runtime action/phone PASS claimed.

Asset guard65files3674128bytes PASS. Original production behavior remains unchanged at this intermediate checkpoint except exact-pixel static Idle source optimization; Basic timing/animation wiring still pending. Intermediate commits skip CI to avoid releasing a partial integration.

## Task2: actual Basic windup core

TDD RED11/12 (missing windup/default field, immediate damage, pending/cancel API); legacy immediate ability already passed. GREEN55/55 for new14 windup cases plus existing ability/BattleSession tests. Covers fixed180ms T0–T3, no early damage/RNG, start-to-start cadence, miss/locked target, source/target KO/control/new-ability cancellation/no refund, movement, coarse step, independent tokens and terminal killing-hit feedback. Actual hit/cast records share actionId. Renderer remains unintegrated; no release yet.

Full diagnostic regression729 tests:722PASS/7FAIL. Named failures preserved for follow-up: current runtime inventory guard; five-unique-character repeated warm restarts; old runtime Idle PNG dimensions; future formal KO test's immediate Basic; delayed mobile Basic/telegraph fixture; direct Tier damage immediate Basic expectation; all-five texture metadata expectation. These require root-cause verification and direct expectation/fixture updates, not weakened assertions. No full regression PASS or deploy claim.

## Task3: pure phased action playback

New action/descriptor tests RED5/5 for absent API. GREEN10/10 with existing descriptor/playback regression. Validated immutable P1-only action metadata, explicit120/60/100/120 timing, real-event-gated F3, delayed/coarse resolve, miss/no spark, cancellation/stale token isolation, captured facing/copied events, bounded64 records and reduced-motion static contact. Asset guard remains PASS. Presenter is still pending, so no on-screen engine synchronization PASS yet.

## Task4: real presenter/readiness bridge

Initial integration RED13/16: missing phase routing, required action textures, explicit failures and new inventory. GREEN17/17 integration,28/28 with Arena readiness/residency. Actual Arena.renderCastEvents executes with real session/presenter and records damage-number delivery only on F3. No production ArenaScene edit needed: existing phase-forwarding and identity-enriched copied snapshots already satisfy contract. New test helper initially used raw identity-less combat snapshots; corrected it to mirror actual Arena.applyFrame enrichment, not change production. Lethal contact, miss/cancel without generic burst, higher ability replacement, ordinary hit priority, KO, coarse resolve, captured mirror, <=1px ground offset, Pause/reduced validated.

Readiness retains Portrait/Idle first, then required action/effects. Each new-key failure explicitly rejects with ready=false, preserves existing actor/portrait and retries. All5roster20Restart cycles in reversed orders include optional Collection cache art, concurrent shared-key actions and legacy VFX; required inventory16763144, scene/cache peaks<=16777216, no required allocation failure, destruction leaves zero textures/pins/displays. Decoded accounting is not total device RAM.

Initial integrated full regression750/750 PASS before extra actual-Arena bridge test (targeted PASS); final full run due. Seven stale failures corrected at cause: inventory65files3674128bytes; required16763144/23pins; exactF1Idle96width/cachebytes; future multiframe KO fixture uses unchanged Move source rather than single-cell Idle; legacy telegraph fixture explicitlywindup0; Tier assertion advances180ms with other actors isolated, retains exact damage math; P5 all-five peaks now action-inclusive. No failure suppressed/guard raised. Mistyped optional npm assets:check script absent; supported node scripts/checkAssets.js PASS.
