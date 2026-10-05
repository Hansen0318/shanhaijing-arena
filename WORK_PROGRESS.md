# Work Progress

## CURRENT HANDOFF POINTER
- **猼訑 STATIC ASSET PACK — 3/3 PASS / PLAYER APPROVED (2026-10-05).** `portraitSquare`, `collectionArt`, and one static `battleIdle` direction are approved. Next gate is Static Runtime Readability: prepare runtime derivatives + integrate these three static assets only, then test Team/Collection/HUD/Arena at real scale. Idle micro-animation remains BLOCKED until runtime PASS. No Hit/KO/Cast/VFX.
- **PROCESS CORRECTION — ONE ASSET PER GATE.** The repeated 猼訑 composite sheet containing future 4-frame Idle imagery is invalid as production evidence. Preserve approved `portraitSquare` + `collectionArt`; static `battleIdle` remains NOT AUTHORED / NOT APPROVED. Next exact action is one single static battleIdle image only, derived from the approved 猼訑 identity. No composite board, Idle frames, Hit/KO/Cast or VFX. Canonical hard rule added to `AGENTS.md` and `docs/M5C_B_FORMAL_ASSET_BATCH.md`.
- **猼訑 STATIC ASSET PACK — collectionArt PASS / PLAYER APPROVED (2026-10-05).** Static pack is now 2/3 direction-approved: portraitSquare + collectionArt. Next exact item is one static `battleIdle` still only, derived from the approved identity with stronger mobile readability and fewer details. Do not create breathing frames, Idle animation, Hit/KO/Cast or VFX yet.
- **猼訑 STATIC ASSET PACK — portraitSquare PASS / PLAYER APPROVED (2026-10-05).** Approved square portrait uses face-first head + slight neck/upper-shoulder framing; horn/tassel edge crop is allowed while facial morphology stays fully readable. Next exact item is `collectionArt` full-body identity only, preserving the approved sheep/goat face, curved horns, dark shoulder mantle, planted Power/Tank silhouette and protective bracer. Do not start static battleIdle, Idle animation, Hit/KO/Cast or VFX until collectionArt is approved.
- **鹿蜀 / SHARED PORTRAIT + OVERHEAD HP — PASS / PLAYER VERIFIED (2026-10-05).** Deployed source `89429fc5c8573001d235907d41ed92c67352666d` passed Work engineering validation and player device smoke. Accepted baseline now includes face-first compact portraits on Battle HUD / Team lower roster / Collection, ally-canonical + enemy-mirrored HUD orientation, and synchronized in-arena overhead HP bars (ally blue gradient / enemy red gradient / KO hidden) sourced from the same live hp/maxHp state as side HUD. Preserve this roster-wide contract. Next exact art step: continue 猼訑 Static Asset Pack only (`portraitSquare`, `collectionArt`, static `battleIdle`); do not start Idle animation yet.
- **鹿蜀 / SHARED PORTRAIT + OVERHEAD HP — ENGINEERING PASS / PLAYER SMOKE PENDING.** Chat `1e14b025d5ed559a9ee2c86e8dd570d976ba5623`; deployed source `89429fc5c8573001d235907d41ed92c67352666d`; original feature branch /PR #1, no main merge. Impacted72/72, guard40files148075bytes/build/diff PASS. Updated stale lineup-scale assertion and idle HP mock/offset only. Proven runtime fixes: Phaser HUD crop fits visible .82 region into square; Canvas WebGL-only gradient fallback uses bounded16 seam-free color strips, same HP ratio. No assets/combat/AI/progression changes. Actions #627 /37247750569 Test/Build/Pages SUCCESS. Public index-C6kJVdIb.js /index-DcqtNRF0.css /battleRuntime-BRrwb49l.js +3PNG byte/hash match. Actual compact Team/Collection crop, independent Detail identity, HUD ally canonical/enemy mirror, all six living blue/red bars, half-HP/heal and real damage synchronization, KO hiding/placeholder+formal stability, canvas0 cleanup/no outer scroll verified. Next: focused phone portrait/HP smoke only; STOP. Evidence `docs/verification/M5C_B_PORTRAIT_OVERHEAD_HP.md`.
- **CHAT STATIC REVIEW COMPLETE FOR 鹿蜀 PORTRAIT / OVERHEAD-HP CORRECTION.** Source, docs and static contracts are aligned: Team + Collection compact cards use the same face-first crop intent; battle HUD applies a shared face crop plus existing enemy mirror; Arena overhead HP derives from live actor HP/maxHP with ally blue-gradient / enemy red-gradient and hides on KO. No stale current-state instruction remains for 猼訑. Executable delta is complete; see the latest verification pointer above. Production should change only if executable/runtime evidence exposes a real defect.
- **ROSTER PORTRAIT + OVERHEAD HP RULES IMPLEMENTED FOR CURRENT ACCEPTED SURFACES.** New hard rules: compact square cards are face-first (head/face + slight neck/upper shoulder; small peripheral ear/horn/accessory crop allowed); Arena living actors have ally blue-gradient / enemy red-gradient overhead HP derived from the same live HP/maxHP as side HUD. Current source applies the presentation immediately to 鹿蜀/shared compact-card/HUD surfaces. 猼訑 remains in development: record the same requirements, but apply them only when its Static Asset Pack/runtime gate is reached. Source: `src/runtime/ArenaScene.js`, `src/runtime/assetPresenter.js`, `src/roster/style.css`, `src/collection/style.css`; static contract tests updated. Executable validation/deploy pending.
- **猼訑 BATTLE SIMPLIFICATION — PASS / PLAYER APPROVED.** The simplified battle direction is now locked: broad planted Power/Tank silhouette, mythic sheep/goat face, large curved horns, dark shoulder-fur mantle, dominant forward protective bracer, stronger large color/value separation and reduced line/detail density. Next exact action: author the Static Asset Pack (`portraitSquare`, `collectionArt`, static `battleIdle`) only. Do not start idle micro-animation, Hit/KO/Cast, VFX, or another character until the static runtime gate passes.
- **STATIC-FIRST CHARACTER PRODUCTION HARD RULE.** Current/future characters must follow: Concept → Battle Simplification → static portrait/collection/battleIdle → real-runtime static readability PASS → Idle micro-animation → roster comparison → Hit/KO/Cast → Skill VFX. Do not animate before static PASS; do not use motion/VFX or per-character scale inflation to rescue unreadable art. This supersedes older Batch1 history that grouped static art + idle animation. Canonical: `AGENTS.md`, `docs/M5C_B_FORMAL_ASSET_BATCH.md`, `docs/art/M5C_B_CHAPTER1_VISUAL_DIFFERENTIATION.md`, `docs/M5C_B_ACCEPTED_PRESENTATION_BASELINE.md`.
- **ROSTER ART STYLE HARD RULE ADDED.** Future playable-character formal art must preserve the accepted simplified 2D cel-shaded roster language across portrait/collection/battle assets; no one-off photorealistic, 3D-rendered, painterly, watercolor, sketch-only or incompatible rendering style without explicit player-approved project-wide direction change. Character silhouette/face/equipment/palette diversity remains required. Canonical: `AGENTS.md`, `docs/M5C_B_FORMAL_ASSET_BATCH.md`, `docs/M5C_B_ACCEPTED_PRESENTATION_BASELINE.md`.
- **M5C-B NEXT CHARACTER — 猼訑 CONCEPT SPEC READY.** `docs/art/M5C_B_BOTUO_VISUAL_SPEC.md` is refined to a production-review level. Locked direction: Power/Tank/front_guard, broad planted humanoid, mythic sheep/goat face, large curved horns, shoulder-fur mantle, clear separation from 狌狌. Current recommended but not yet player-locked equipment direction: shield/bracer-led protector with compact secondary impact gear. No formal 猼訑 portrait/identity/battleIdle/idle frames exist yet. Next exact action is one concept-image review only; do not start production assets, Hit/KO/Cast, VFX, another character, or gameplay changes.
- **RECOVERY AUTHORITY:** Use the latest `PASS / PLAYER VERIFIED` pointer and `docs/M5C_B_ACCEPTED_PRESENTATION_BASELINE.md` as the current product contract. Older correction/checkpoint entries below are retained only for traceability and must not resurrect superseded layouts or pending statuses.
- **M5C-B PRESENTATION BASELINE — PASS / PLAYER VERIFIED (2026-10-04).** Player confirmed the latest deployed Stage Select / Team Select / Battle presentation behavior. Canonical zero-context snapshot is `docs/M5C_B_ACCEPTED_PRESENTATION_BASELINE.md`. Preserve the accepted Stage details/START/BACK layout, Team ally-left/enemy-right full-body sizing + formal-caption retirement + bottom horizontal roster, no-outer-scroll contract, battle placeholder retirement, attack/cast-first facing, enemy HUD mirroring, and 鹿蜀 accepted portrait/identity/4-frame idle. Do not redo these. Current art progress: only 鹿蜀 has accepted formal portrait/identity/battleIdle; 猼訑/赤鱬/九尾狐/狌狌 remain placeholder runtime art despite canonical gameplay/data + written visual direction. 鹿蜀 Hit/KO/Cast are not authored. Next action: recover baseline, then define/execute the next explicit bounded M5C-B art slice; no automatic new art in this handoff.
- **STAGE DETAILS / LOWER-RIGHT START / HUD MIRROR — ENGINEERING PASS / PLAYER SMOKE PENDING.** Chat `223ca5b899392d170b94ff6888fbf7798185c840` preserved; test-only source `0ee341e5df066eb7312c53231a5b3fad989f11f1`. Impacted78/78, guard40files/148075bytes, build/diff PASS. Actions #576 /37204231115 Test/Build/Pages SUCCESS. Public index-b1hadBZG.js /index-Dx6h4tHE.css /battleRuntime-BKb1rtoD.js byte/hash match. Actual1363×936 Stage right details, lower-right START/lower-left BACK unobscured and root936=scrollHeight936; Team refresh one page/no formal captions or remnants, placeholders retained; enemy HUD portrait mirrored/ally canonical visually confirmed. Exit cleanup canvas0/root936. No production/art/gameplay changes. Original feature branch / PR #1; no main merge. Next: focused player iPhone Stage controls/Team refresh/HUD direction smoke, then STOP. Evidence `docs/verification/M5C_B_STAGE_DETAILS_HUD_MIRROR.md`.
- **CHAT ALSO UPDATED STATIC CONTRACT TESTS.** `tests/boundedCorrections.test.js` now locks the text-free Stage preview + right-column chapter/stage/reward stack + lower-right START contract; `tests/assetPresenter.test.js` locks side-based enemy HUD mirroring and rejects character-specific flip logic. Chat test commits: `7acf5a43`, `59e61b5e`. Remaining work is now strictly executable: run impacted tests/build/runtime/deploy and fix only defects revealed there.
- **CHAT IMPLEMENTED STAGE DETAILS / START REPOSITION.** Stage Select now uses the right details column for a universal `chapter title` + `stage id/name` + reward stack (e.g. `南山初境`, `1-1 山麓試煉`, then Shard rows). Reward font sizing is unchanged; chapter/stage labels are larger. The large preview image no longer carries text. START is removed from the details column and positioned at lower-right, horizontally paired with lower-left BACK. This applies to every stage through shared stage data, not a 1-1 special case. Source commits: `9ac5ef2c`, `dae70c3b`. Executable validation/deploy remains pending.
- **CHAT IMPLEMENTED BATTLE HUD SIDE MIRRORING.** Battle HUD portrait views now carry explicit `side`; formal HUD portrait rendering mirrors only `enemy` cards with `setFlipX(true)` while ally cards keep canonical orientation. This is shared side-based presentation logic for all current/future characters, independent from in-arena movement/attack facing. Source commits: `6ba63e81`, `394c1527`; hard rule: `AGENTS.md`. Executable validation/deploy remains pending.
- **FORMAL SLOTS / CHAPTER-STAGE TITLE / REFRESH — ENGINEERING PASS / PLAYER SMOKE PENDING.** Chat `46cafe4b3035a2069b17a57ed597d2e11d17117f` production preserved; only stale test expectations updated. Deployed source `32b846937a7bfaff15d3d77f76baa021e0fc225a`; original feature branch / PR #1; no main merge. Impacted71/71, guard/build/diff PASS; Actions #563 /37201222388 Test/Build/Pages SUCCESS. Public index-DM75iJjG.js /index-BFUQEjl4.css /battleRuntime-BdWZaRMP.js byte/hash match. Actual1363×936: formal allied/enemy images both262.59375×734, no visible formal SLOT/E/front/name scaffolding, placeholders retained; chapter+stage overlay only/no independent heading, unobscured rewards/START; refresh re-entry has one page/no formal background/text remnants, no outer scroll; Team BACK root0. Next exact action: focused player iPhone equal-size/caption/Stage/refresh smoke, then STOP. Evidence: `docs/verification/M5C_B_FORMAL_SLOTS_STAGE_REFRESH.md`.
- **FORMAL SLOTS / CHAPTER-STAGE TITLE / REFRESH — executable checkpoint; runtime/deploy pending.** Recovered Chat `46cafe4b3035a2069b17a57ed597d2e11d17117f` on original branch / PR #1; production preserved. Updated four stale expectations (campaign CSS hash, Stage two-line children, formal caption retirement, initially hidden loading text) and checked shared equal-size/mirror CSS. Impacted64/64, guard/build/diff PASS. Next exact step: Pages deployment, public fingerprints and actual refresh/layout smoke; only fix proven runtime defects. Evidence: `docs/verification/M5C_B_FORMAL_SLOTS_STAGE_REFRESH.md`.
- **CHAT IMPLEMENTED TEAM FORMAL-SLOT / STAGE TITLE / REFRESH ARTIFACT CORRECTION.** Team Select now hides `SLOT n` / `E1` / `E2 · FRONT` / `E3` captions whenever that slot resolves formal full-body art; placeholder-only slots keep captions. Ally/enemy formal full-body scale now uses the same shared size, fixing the ally-only oversize caused by transform override; enemy mirroring remains. Stage Select removes the separate chapter heading and reuses that space for a larger preview; the preview top-left now shows two lines: chapter title (e.g. `南山初境`) and stage id+name (e.g. `1-1 山麓試煉`). Shared formal menu-image loading no longer renders the temporary placeholder label while the formal image is loading, eliminating refresh-time graybox/text flash; fallback text is revealed only if the image actually fails. Chat commits: `09eafb93`, `e4ea0f1c`, `4dec2166`, `b9f96cfd`, `b908d9a6`. Next Work is execution-only: targeted DOM/CSS/menu-image tests, build, runtime refresh/layout smoke, deploy/public fingerprint; modify production only for proven runtime defects.
- **STAGE / TEAM / ACTION FACING — ENGINEERING PASS / PLAYER SMOKE PENDING.** Chat `cee00e5e024a8a5fbc758e65a3ebd3b2468f5386` validated; only proven runtime defect fixed: shared padding cascade prevented Team roster/control bottom alignment. Deployed source `c8fd8b4ec7b60e7bd2781a35491358b49b33c93c`, original feature branch / PR #1; no main merge. Targeted71/71, asset guard/build/diff PASS; Actions #551 /37198834715 Test/Build/Pages SUCCESS. Public JS index-CAIw_s5b.js /CSS index-DapD6M69.css /battleRuntime-Dxl519vC.js byte fingerprints match. Public Stage overlay/rewards/START, Team full-body/portrait/filters/same bottom band/no outer scroll and Team BACK verified at1363×936. Battle formal/placeholder/Pause/Resume/Exit observed; cloud clock stays at countdown3, so physical action-facing/idle and iPhone landscape remain player smoke. Next exact action: player checks Stage overlay, Team bottom horizontal roster/layout and left/right attack/cast facing; STOP. Evidence: `docs/verification/M5C_B_STAGE_TEAM_FACING.md`.
- **STAGE / TEAM / ACTION FACING — bounded runtime CSS correction ready for deployment.** Actions #550 /37198636741 Test/Build/Pages SUCCESS for `2cc78902527109702342098ce93a61d36f144fa5`. Actual public Stage overlay/rewards/START/no-outer-scroll PASS. Runtime Team revealed shared 66px padding overriding intended bottom-band roster; corrected only three Team selector specificities, after a failing cascade test. Targeted 71/71, asset guard/build/diff PASS. Next: deploy this correction, verify public fingerprints/Team bottom alignment and BACK; player smoke pending. Evidence: `docs/verification/M5C_B_STAGE_TEAM_FACING.md`.
- **STAGE / TEAM / ACTION FACING — executable checkpoint; deployment/runtime inspection pending.** Recovered Chat `cee00e5e024a8a5fbc758e65a3ebd3b2468f5386` on original feature branch / PR #1. Production source preserved. Updated stale campaign CSS fingerprint and three-row/overlap expectations; added Stage overlay and bounded action-facing/motion/rest/clock/cleanup tests. Targeted 64/64, asset guard, build and diff check PASS. Next exact step: existing Pages workflow, public fingerprints and actual Stage/Team render inspection; fix only a proven runtime defect. No main merge or new art. Evidence: `docs/verification/M5C_B_STAGE_TEAM_FACING.md`.
- **CHAT IMPLEMENTED STAGE/TTEAM/FACING CORRECTION.** Stage Select now overlays `stageId + stage name` (e.g. `1-1 南山初境`) at the large preview image top-left and removes the duplicate id/name from the right details column; preview layout is widened/rebalanced so overlay, image, rewards and START do not overlap. Team Select lower roster is now a bottom horizontal scroll strip with BACK left / BATTLE right reserved at the same bottom band, while the upper ally-left/enemy-right 3v3 full-body lineup is enlarged further and packed tighter with slight overlap. Battle facing now follows `attack/cast direction > movement direction > last/default facing` via a bounded action-facing window tied to cast/VFX duration, so a character no longer faces right while firing left. Chat source commits: `746d0bd1`, `96c9c85b`, `f44c6566`, `784539ff`. Next Work is execution-only: targeted layout/facing tests, build, runtime render verification, deploy/public fingerprint; production code changes only if executable validation exposes a defect.
- **GLOBAL BACK / TEAM LAYOUT — ENGINEERING PASS / PLAYER SMOKE PENDING.** Recovered `ae1a90f216a0de54958ac1e7ed6266670e503370`; Chat production source unchanged. Work tests/docs only. Impacted 87/87 plus CI-identified CSS fingerprint test file 9/9; guard/build/diff PASS. Source `b80597621fd66256ee7e5ff5fbfcce2fe32eb40e`; tested tree `2ec81c5f449f997894845d4b6aa25a7dde92478e`. Actions `37193707005` SUCCESS / Pages deployed. Public index-DAMFDu9B.js and index-BKlCRJc6.css byte/hash match. Actual Chapter/Stage/Team/Collection/Detail/Info BACK lower-left, title upper-left, root 1363×936 with equal scroll dimensions and scrollTop 0. Intended grid/detail/Info internal auto scroll preserved; Detail BACK focuses original card. Team square 56×56 contain portrait/name/Type, no READY text, 112×40 right BATTLE, filters/selection/full-body VS preview verified. No runtime production defect found. Feature branch / PR #1 retained, no main merge. Next: focused phone smoke only, then STOP. Evidence `docs/verification/M5C_B_GLOBAL_BACK_TEAM_LAYOUT.md`.
- **CHAT IMPLEMENTED GLOBAL BACK / TEAM SELECT LAYOUT CORRECTION.** All relevant non-landing BACK controls are now marked for a shared lower-left placement; campaign root is overflow-hidden so previously non-scrolling screens cannot gain outer scroll from the relocation. Titles remain in the upper-left information area because BACK is removed from normal header flow. Team Select removes `3 / 3 READY`, restores the lower roster card to a square portrait + name/Type information-card proportion, narrows BATTLE to content-fit (~112px min) and keeps it right-aligned, slightly reduces filters, and reflows the full-height screen without outer scroll. Collection/Detail and Info reserve lower safe-area space for the shared BACK while preserving only their intentional internal scroll regions. Chat commits: `02d0825c`, `6fd43b42`, `6db1a4ae`, `cd77bd39`, `362377a6`, `7dee9d45`, `78549d99`, `14fa6e91`. Next Work is execution-only: targeted layout/no-scroll tests, build, runtime render check, deploy/public fingerprint; production source changes only if execution exposes a defect.
- **M5C-B THIRD CORRECTION — ENGINEERING PASS / PLAYER SMOKE PENDING.** Recovered `db5e52bf`; preserved `e0b227f3`/`3909e46f`/`e72bb33b` and docs checkpoints. Work changed tests/docs only: three stale 72×96 expectations plus label mock updated; production source/art/gameplay unchanged. Targeted 136/136, asset guard 40 files/148075 bytes, build/diff PASS. Source `bcb8758dc66d8121f23f716155a8c76d81b8ef8f`, tested tree `7ddf3add45ed54ec48b4128e33c93678797971ec`; Actions `37186983907` build/deploy SUCCESS. Public index-CwYMc66v.js / index-C8gqOBF1.css / battleRuntime-BjvHkh0h.js and all three PNGs exactly match build. Actual Team contain/.98 centered head/horns/name/Type and BACK root scroll 0 verified. Real Arena allied/enemy formal sprites complete and enlarged, no circle/ring/identity labels; graybox actors retain circles/labels; Hit inspection fallback, Pause/Resume, Exit canvas/host cleanup verified. Four-frame/facing/actual KO/missing state/future KO replacement/viewport/cache contracts PASS; cloud clock remained initial, continuous motion and iPhone acceptance not claimed. Original feature branch / PR #1, no main merge. Next: focused phone smoke and STOP; no new art/animation/characters or global hard-rule promotion. Evidence: `docs/verification/M5C_B_LUSHU_THIRD_CORRECTION.md`.
- **CHAT IMPLEMENTED THIRD 鹿蜀 PRESENTATION CORRECTION.** Latest player correction is now in source: Team Select lower roster portrait framing no longer uses aggressive cover/1.28 crop; it uses contain/~0.98 centered framing so the full head/horns remain visible while preserving the existing portrait+name+Type information-card contract. In Arena, actors with a visible formal sprite now also hide the graybox/debug floating identity label (A/E instance + name/status text); placeholder-only actors keep that label. Formal actor presentation size is increased 1.5× from the prior 72×96 baseline to approximately 108×144 for 鹿蜀, with actor gameplay coordinates/hitbox/range/AI geometry unchanged. Chat source commits: `e0b227f3`, `3909e46f`, `e72bb33b`. Next Work is execution-only: run/update impacted tests if stale expectations reference the old crop/labels/72×96 size, build, deploy, public fingerprint, then stop for player smoke.
- **M5C-B LATEST CHAT CORRECTION — ENGINEERING PASS / PLAYER SMOKE PENDING.** Recovered81b44d33; preserved49bb9617/69a35700/41b56f1d and docs625ec991/31e511b1/131721b3/81b44d33. Formal sprite fully hides placeholder circle/ring; no-art actors retain circles. Lower roster retains portrait/name/Type. Initial131/134: stale name/marker API/layout expectations. Updated tests also reproduced real320px+safe-area overflow (357px required); bounded CSS adds4% symmetric team inset to contain negative-margin boxes and <=356px rule keeps132px upper,44px BACK,36px filters,44px information cards,36px BATTLE; zero outer gaps/1px top. No gameplay/art/state-engine change. Targeted136/136, guard40files148075bytes/build/diff PASS. New test proves future loadable KO image slot and KO descriptor replace missing-art static idle, with no new PNG. Active feat/m0-combat-core-20260927 /PR#1; no main merge. Source b1db04d1502a81a8df886c60cc4c773f7b953131; tested tree92542d1516f4bf22b476f074856a8ed7614f3b29. Actions37184314359 Test/Build/Pages SUCCESS. Public index-BNDdqiq-.js /index-DFhPSr0Y.css /battleRuntime-9VYJw6kg.js and all3PNG fingerprints match. Actual Team root1363=scrollWidth1363 /height936=scrollHeight936, full-body/VS/lower name+Type/3READY/BATTLE190×40 verified. Public formal actor no dot/ring, graybox circles retained, Hit fallback/Pause/Resume/Exit cleanup verified. Cloud clock remained01:30; continuous facing/idle/iPhone acceptance not claimed. Next: latest10-item player smoke and STOP. Evidence docs/verification/M5C_B_LUSHU_LATEST_CHAT_VALIDATION.md.
- **CHAT IMPLEMENTED SECOND 鹿蜀 PRESENTATION CORRECTION.** Latest player correction is now in source: Team Select lower roster cards again always retain portrait + character name + Type (formal art does NOT remove these informational labels); lower card width/content ratio restored near the earlier 64px information-card layout. Team Select upper selected lineup now gets substantially more visual priority: short-landscape collapse raised from ~82px to >=132px, figures scale to ~1.34 within larger overlapping slots, central VS column is narrower, filters are reduced to 36px controls, and BATTLE is reduced to a right-aligned ~150–190px control so more area remains for full-body lineup. In battle, a visible formal actor sprite now fully hides the old graybox actor circle including its white stroke/ring; placeholder-only actors still use circles. Existing animation pipeline already provides the future KO replacement contract: when a character supplies a loadable formal battleKo asset/descriptor it is selected for KO state; until then missing KO art falls back to static idle identity. No 鹿蜀 KO art exists yet and none was authored. Chat commits: `49bb9617`, `69a35700`, `41b56f1d`. Next Work is execution-only validation/build/deploy and may change source only if executable checks expose a defect.
- **M5C-B CHAT PRESENTATION VALIDATION — ENGINEERING PASS / PLAYER SMOKE PENDING.** Recovered ff21825d and preserved all five Chat source corrections. Targeted initial129/133: three intended DOM/API expectation changes; one real short-landscape180px minimum overflow. Only product correction: max-height420px flexible min82 upper; preserve tall180/overlap/largeVS/portrait crop/conditional retirement/marker fill0 with ring. Updated targeted contracts verify fallback names, real fill0/1 and selected stroke6/3. Targeted134/134, guard40files148,075bytes/build/diff PASS. Branch feat/m0-combat-core-20260927 /PR#1; no main merge. Source38ad5f1ff84414428a14d8b5e44021ab709308a4; Actions37182024611 Test/Build/Pages SUCCESS. Public index-QpyFtDel.js /index-Vxiu-TWO.css /battleRuntime-CkGuotXl.js and all3PNG fingerprints match. Actual Team/Collection/Detail/Hit fallback/empty rings/placeholder dots/Pause/Exit cleanup/BACK inspected. Cloud clock stayed initial; continuous motion/iPhone smoke not claimed. Next:10-item player smoke and STOP. Evidence `docs/verification/M5C_B_LUSHU_CHAT_PRESENTATION_VALIDATION.md`.
- **CHAT IMPLEMENTED 鹿蜀 PLACEHOLDER→FORMAL REPLACEMENT / TEAM PREVIEW CORRECTION.** Chat directly updated source before any further Work: `src/roster/view.js` now conditionally retires visible name placeholders when `collectionArt`/`portraitSquare` resolves to an image, keeps names only for placeholder-only characters, and separates formal upper-lineup identity from compact-card meta; `src/roster/style.css` makes the selected 3v3 full-body lineup the dominant Team Select visual with larger figures, slight overlap, larger central VS, while lower roster cards remain secondary and use larger portrait crops; `src/collection/view.js`/`style.css` retire collection-card names once formal portrait art exists and enlarge the portrait crop; `src/runtime/ArenaScene.js` now retires the solid placeholder body dot when a formal actor sprite is visible, retaining only the ring/stroke for selection/team feedback. These are provisional 鹿蜀 corrections, not yet global hard rules. Chat commits: b1ca7f48, b0582d07, 6ab67d70, 8b5b4588, eebf53a8. Next Work scope is execution-only: targeted tests/build/diff/deploy/public fingerprint + device smoke; only make code changes if executable validation exposes a defect.
- **M5C-B 鹿蜀 TEAM PREVIEW / BATTLE CORRECTION — ENGINEERING PASS / PLAYER SMOKE PENDING.** Latest upper3v3 direction supersedes portrait selected-slots: static full identity through collectionArt, central large VS; lower bench/Collection enlarged head/bust, shared gradient/T0–T3 borders. Actual hit-event disappearance reproduced: absent Hit texture hid idle; current-state fallback now keeps static idle visible at current actor position/facing without changing state/gameplay. Side HUD names removed; HP/states protected. Canonical/runtime PNGs unchanged; previous72×96/4-frame/facing/BACK retained. Targeted/impacted133/133, guard/build/diff PASS. Detail breathing/scenic background and upper preview animation are future directions only. Branch feat/m0-combat-core-20260927 /PR#1; no main merge. Source81225bd4246a4a069d2e3932ed7f787f575afb59; Actions37180242361 Test/Build/Pages SUCCESS; public index-Dt9Ugafq.js /index-B8U1ulZy.css and battleRuntime-DH_haGrv.js fingerprints match. Public full鹿蜀 lineup/VS/gradient/border/Detail/BACK/Hit inspection fallback/HUD no names/Pause/Exit clean verified. Cloud clock stayed initial; continuous motion/iPhone smoke not claimed. Next:13-item player smoke and STOP, then Chat post-acceptance review. Evidence `docs/verification/M5C_B_LUSHU_TEAM_BATTLE_CORRECTION.md`.
- **M5C-B 鹿蜀 PRESENTATION CORRECTION — ENGINEERING PASS / PLAYER SMOKE PENDING.** P1 static head/bust128×128 and identity144×192 reuse approved F1; idle384×128 /4×96×128 /scale2 /72×96display /fixed origin and1.6s loop retained. Shared dx-facing mirror, fallback-safe menu image layering, Detail internal scroll/focus restoration + separate same-route viewport resync, repeated route-root normalization; no gameplay/master change. Targeted/impacted127/127, guard40files/148,075bytes, build/diff PASS. Original branch/PR#1; no main merge. Source f70d000756a96e9c6be41c3a4342d75e5bf25680; Actions37177955359 Test/Build/Pages SUCCESS. Public index-B8O6ruyy.js /index-CRRPzIng.css and idle hash match; menu/Detail/Team BACK/battle initial scale and mirror/Pause/Exit verified. Cloud initial clock is static; physical breathing/facing/Safari remain player smoke. Next: eight-item player smoke and STOP; Chat post-acceptance review before any global hard-rule promotion. Evidence: `docs/verification/M5C_B_LUSHU_PRESENTATION_CORRECTION.md`.
- **CHAT STATIC ROOT-CAUSE NARROWING COMPLETE FOR 鹿蜀 CORRECTION.** Exact presentation paths identified before Work: `src/roster/catalog.js` P1 currently overrides only `battleIdle`, leaving `portraitSquare`/`collectionArt` on procedural defaults; Team Select uses `src/roster/view.js` + `decoratePortrait`, Collection/Character Detail use `src/collection/view.js` + `decoratePortrait`, and `src/assets/menuImage.js` is the shared menu-image adapter. Battle undersizing is directly caused by `src/runtime/assetPresenter.js` fixed `48*descriptor.scale` fit with 鹿蜀 scale1 (~36×48); actor sprites have no horizontal flip/facing application in the same render path. BACK issue spans `src/runtime/viewportSync.js` route-level root scroll reset plus Collection's own internal grid/detail scroll containers; Character Detail opens/closes inside the same route and does not trigger `viewport.routeChanged()`. Work should start from these exact paths, not rediscover architecture.
- **鹿蜀 PRESENTATION CORRECTION — PROVISIONAL PLAYER DIRECTION.** Before promoting any new global rule, correct鹿蜀 using this bounded presentation model: small cards/Team Select/Collection grid use a head-or-bust portrait treatment; Character Detail/Info uses a larger 3/4/full-body identity image; battle first validates static size/facing before judging idle motion; battle visual scale should first increase from current ~36×48 toward roughly 2.0–2.2× visual size (about 64×86 to 72×96 equivalent target range), without changing hitbox/range/AI spacing/gameplay geometry; BACK viewport restoration remains part of the same correction. These are provisional鹿蜀 acceptance targets, not yet global hard rules. Promote only after player smoke passes.
- **鹿蜀 IDLE PLAYER SMOKE — FAIL / CORRECTION REQUIRED.** iPhone smoke found four concrete issues after source `c213e81a6364381554d0bb8e51451378bd25f46a`: (1) formal 鹿蜀 image is missing from Character Detail / Collection-related presentation and Team Select cards; placeholder text/color tiles remain, (2) battle sprite is too small at current ~36×48 stage fit, (3) battle sprite does not mirror/face movement direction, and (4) BACK navigation across menu/detail/team flows often fails to restore/normalize viewport scroll position. Do not advance to Hit/KO/Cast or other characters. Next Work slice is a bounded correction of these four issues only, preserving accepted idle motion, gameplay, progression, AI and M5C-A architecture.
- **M5C-B 鹿蜀 IDLE — ENGINEERING PASS / PLAYER SMOKE PENDING.** Source `c213e81a6364381554d0bb8e51451378bd25f46a`, original `feat/m0-combat-core-20260927` /PR#1; no main merge. Runtime192×64 /4×48×64 /22,010bytes /49,152 decodedbytes /fps2.5 /1.6s /fixed origin[.5,691/724] /36×48 stage fit. Targeted/impacted44/44, guard/build/diff PASS; Actions#488 /37174412653 Test/Build/Pages SUCCESS; public JS/CSS and PNG fingerprints match. Public formal allied/enemy 鹿蜀, Pause/Resume controls and Exit→Lab host cleanup observed. Cloud countdown stayed3; sustained cloud motion is not claimed, four-frame/frozen-clock/resume contracts tested automatically. Next exact action: player iPhone8-item idle/readability/load smoke, then STOP for Chat post-acceptance review. Evidence: `docs/verification/M5C_B_LUSHU_IDLE.md`.
- **RUNTIME ASSET OPTIMIZATION HARD RULE RECORDED.** High-resolution generated/master art is archival/editing source only; shipped gameplay assets must be optimized derivatives sized to actual runtime footprint, with encoded size + decoded RGBA impact checked against existing M5C-A lazy-load/cache guards. Equal animation frames retain one common canvas/origin and must not be independently tight-cropped if that causes anchor drift. This applies to every current/future character.
- **NEXT WORK DELTA — 鹿蜀 IDLE ONLY.** Use the player-accepted 4-frame master (2172×724, 4×543×724) to create an optimized runtime derivative, bind only 鹿蜀 battleIdle through the existing M5C-A manifest/animation descriptors, preserve fixed anchor, run only targeted asset/animation/build checks, deploy a focused build, then stop for player motion/readability smoke. Do NOT create/integrate Hit/KO/Cast, redesign art, alter combat/progression/AI, or broaden regression scope unless a targeted failure requires it.
- **鹿蜀 4-FRAME PNG TECHNICAL VALIDATION PASS.** Accepted idle source is RGBA PNG 2172×724, four deterministic equal horizontal cells at 543×724. Ground baseline is stable (~y690–691) across frames; 48px preview preserves visible inhale/exhale differences. Use one fixed origin for all frames and do not trim cells independently. Source candidate is ready for the smallest Work integration smoke through the existing M5C-A animation pipeline; integrate idle only first, then player checks motion/readability before Hit/KO/Cast.
- **鹿蜀 IDLE MICRO-ANIMATION — PLAYER ACCEPTED DIRECTION.** Latest 4-frame PNG breathing pass accepted: no glow/VFX; fixed feet/ground anchor; visible body rise/lower; tail follows the body's breathing with vertical up/down motion (no left/right wag, no brush-like sweep); head/weapon hand may follow subtly; amplitude increased to ~1.3× the earlier subtle pass for battle-scale readability. Next: technical source validation/slicing/anchor check, then smallest possible Work integration through existing M5C-A animation pipeline.
- **鹿蜀 FINAL BATTLE-DETAIL CLEANUP LOCKED.** Conditional-pass corrections are now converted into a fixed authoring contract: remove weapon tassel/extra red waist cloth/long teal-black-red hip strips/small charms/fine engravings/dense mane and tail strands; keep one white head mass, compact horns, tall lean body, one clean vermilion tail, 2–3 broad tiger-marking groups, one short curved blade and slim guards. Battle mane resolves to ~3 major masses, garment uses one compact waist panel, and runtime validation remains ~48px. No fundamental redesign remains. Next step: author one battleIdle source and validate it at runtime scale before Hit/KO/Cast. No Work needed yet.
- **鹿蜀 SIMPLIFIED BATTLE CONCEPT — CONDITIONAL PASS.** Current simplified sheet is materially readable at ~48px: white head, long-leg silhouette, one red tail, compact weapon and leg negative space survive. Before battle asset lock, reduce competing red waist/tassel elements, remove/reduce weapon tassel, collapse mane to ~3 major masses, keep only 2–3 broad tiger-marking groups and simplify weapon guard. No fundamental redesign required. Next Chat step: final battle-detail cleanup direction, then battleIdle source/runtime-size validation; no Work yet.
- **鹿蜀 BATTLE READABILITY SIMPLIFICATION PASS RECORDED.** `docs/art/M5C_B_LUSHU_BATTLE_READABILITY_PASS.md` now translates Concept B into a mobile-first battle design: ordered identity hierarchy, reduced hair/cloth/ornament detail, single clean red-tail axis, 2–3 broad tiger-marking groups, compact blade/guards, negative-space requirements, ~48px readability gate, idle/state simplification and explicit fail conditions. Concept sheet remains richer presentation reference; no battle asset is production-approved yet. Next optional Chat-owned step is one simplified battle-readable concept/battleIdle exploration only after review; no Work needed.
- **鹿蜀 CURRENT CONCEPT REVIEWED AGAINST NEW HARD RULES.** Existing Concept B sheet remains valid as identity/collection reference, but is too detailed for direct battle use. Face is still slightly natural-deer-leaning and should gain modest anthropomorphic acting without returning to a human-face template. Battle pass must simplify loose hair, cloth/tassels, waist hardware, armor trim, weapon ornament and tail texture; preserve white head, long-legged lean silhouette, one clean red tail, 2–3 broad tiger markings, compact horns, simple blade and slim guards. Next Chat-owned step is a simplified battle-readable design pass; no Work required.
- **GLOBAL BATTLE READABILITY SIMPLIFICATION HARD RULE — PLAYER APPROVED / RECORDED.** Concept/portrait/collection assets may remain richer, but battle sprites for every current/future character must be intentionally simplified rather than directly downscaled. All characters now require a reusable mobile detail budget, ordered battle identity hierarchy and small-runtime silhouette/readability gate before battle asset lock. Micro-lines/accessories cannot carry identity; if head/body/weapon/appendages collapse into a blob, simplify before integration. Canonical rule lives in AGENTS §15 and `docs/M5C_B_FORMAL_ASSET_BATCH.md`; Chapter1 approval/differentiation and 鹿蜀 spec are aligned.
- **SPECIES-DERIVED MYTHIC FACE HARD RULE — PLAYER APPROVED / RECORDED.** Humanoid/anthropomorphic remains the shared playable body plan, but Arena must not standardize a reusable human-face template. Heads/faces derive from source species morphology and are stylized for expression; repeated families (snake/bovine/boar/deer-horse/bird/fox-canine etc.) require structural skull/muzzle/eye/ear/horn/jaw differentiation, not costume/color swaps. This rule is now in AGENTS §15, M5C-B batch spec, Chapter1 approval/differentiation docs and 鹿蜀 specs. Body animation reuse and face morphology diversity are separate constraints.
- **鹿蜀 CONCEPT B PRE-IMAGE REVIEW PASS.** Silhouette/equipment collision review completed. Corrective controls: head horns own the primary horn identity; handheld weapon becomes a compact curved skirmisher blade rather than a literal horn duplicate; forearm/shin rush guards stay slim so 鹿蜀 does not drift toward 猼訑/狌狌 Power mass; single red tail remains the only trailing motion axis. Concept B is now safe for next concept-image exploration but is NOT production approved. No image generated automatically.
- **鹿蜀 CONCEPT B — 角擊游擊型 SPEC RECORDED.** `docs/art/M5C_B_LUSHU_CONCEPT_B_HORN_SKIRMISHER.md` defines the bounded humanoid exploration: white mythic horse/deer-derived head, compact rear-swept horn language, tall lean long-legged proportions, light garments, rush-oriented forearm/shin guards, single horn-blade-first weapon direction, broad tiger markings and one vermilion tail. It remains exploration only; face/horn/weapon/clothing/accent choices still require player approval. No image generated; no Work needed.
- **CHAPTER1 CONCEPT APPROVAL MATRIX RECORDED.** `docs/art/M5C_B_CHAPTER1_CONCEPT_APPROVAL_MATRIX.md` now separates locked identity/body-plan/Type/Role/silhouette rules from optional equipment/clothing/face exploration for all five characters, records collision controls, and defines the five-character comparison gate. No production art is approved. Next Chat-owned step remains 鹿蜀 humanoid concept review; generic `continue` must not auto-generate images.
- **FUTURE CHARACTER VISUAL ONBOARDING RULE RECORDED.** Current Agile/Guard/Ranged Caster/Bruiser families are starter reusable archetypes, not a closed list. Future characters reuse or compose from them when natural; genuinely new motion patterns add a new reusable archetype once, never a one-character-only animation architecture. Canonical flow recorded in `docs/art/M5C_B_CHAPTER1_VISUAL_DIFFERENTIATION.md` and `docs/M5C_B_FORMAL_ASSET_BATCH.md`.
- **CHAPTER1 VISUAL DIFFERENTIATION REVIEW COMPLETE.** Five written humanoid directions were cross-checked for silhouette/Type/Role collision. Key separations are now explicit: 猼訑 guard mass vs 狌狌 forward bruiser; 赤鱬 restorative aquatic caster vs 九尾狐 offensive nine-tail burst; 鹿蜀 earthy tiger-marked mobility silhouette vs 九尾狐 ivory multi-tail caster. Canonical matrix: `docs/art/M5C_B_CHAPTER1_VISUAL_DIFFERENTIATION.md`. No production art locked.
- **FOUR REMAINING CHAPTER1 HUMANOID VISUAL SPECS DRAFTED.** 猼訑 / 赤鱬 / 九尾狐 / 狌狌 now each have non-image concept specs under `docs/art/`. These define humanoid body plan, creature traits, role/type equipment language, portrait/collection/battleIdle and idle-motion direction. No images or production assets are approved; player can compare written directions before any further generation.
- **鹿蜀 alternate humanoid exploration B/C in progress.** Player has not locked the first humanoid sheets; continue comparing distinct humanoid interpretations while preserving white head, tiger markings, red tail, Speed/Attacker role language and shared-animation body plan. No asset is production-approved yet.
- **鹿蜀 visual exploration remains UNLOCKED.** First humanoid concept sheet is only an exploration sample; player has not approved likeness, equipment or final visual language yet. Continue comparing alternative humanoid directions before locking Batch1 assets or handing anything to Work.
- **ART HARD-RULE CORRECTION RECORDED.** Player caught a visual-spec drift: playable characters must default to humanoid/anthropomorphic bodies for shared animation/ability production, with creature traits preserved and gameplay-driven clothing/props/weapons allowed. AGENTS §15 and M5C-B spec now make this explicit. The previous quadruped 鹿蜀 concept is rejected; `docs/art/M5C_B_LUSHU_VISUAL_SPEC.md` is corrected before any production asset lock.
- **鹿蜀 FORMAL VISUAL SPEC — CONCEPT REVIEW PENDING.** First Batch1 character direction recorded at `docs/art/M5C_B_LUSHU_VISUAL_SPEC.md`: lean humanoid / anthropomorphic Speed-Attacker body plan with white head, broad tiger markings and a single vermilion tail; portrait/collection/battleIdle + 4-frame lightweight idle direction. Previous literal quadruped direction is rejected. Player visual approval precedes production asset lock.
- **M5C-B FORMAL ASSET INTEGRATION — CHAT ASSET AUTHORING / BATCH PREPARATION.** M5C-A pipeline and M6C-B balance are player verified. Next is Batch1 across all five Chapter1 characters: `portraitSquare` + `collectionArt` + `battleIdle` + lightweight idle micro-animation source/frames. Prepare/approve the full visual batch first; Work only integrates approved files through the existing pipeline. Canonical: `docs/M5C_B_FORMAL_ASSET_BATCH.md`.
- **M6C-B TIER POWER CURVE REBALANCE — PASS / PLAYER VERIFIED.** Player accepted the current Tier power-curve feel on device. Current global curve / TierScalingProfile is the working balance baseline and may be tuned later without changing progression costs/accounting or shared architecture.
- **M6C-B TIER POWER CURVE REBALANCE — ENGINEERING PASS / PLAYER SMOKE PENDING.** A–E complete. A f825dc00 / B c6714f61 / C fbfa160b / D fae09e0f; final source 0b34bfdd41edc88b7528a64d0db63b6f2fbbcd28. Targeted28/28, impacted221/221, full570/570/build/diff PASS. Independent review three findings reproduced RED→GREEN, none unresolved. Twelve paired deterministic fixtures terminate3.80–28.65s, max13 statuses/1 area/6 threats.
- Actions #409 /37113178973 Test/Build/Pages SUCCESS (build111174878460/deploy111174926343). Public index-BID405J0.js matches tested build. Normal Landing BATTLE/COLLECTION/INFO, no Lab/canvas/modulepreload; dev summary T3 stats/T0 baseline preserves enemy Tier. Real Arena scaled HP/Tier/heal/warning presentation, Pause/Restart/Exit→Lab verified; config retained and canvas detached. Cloud1363×936 no overflow.
- Entry87,939 bytes (+6,721 vs accepted M5C-A); CSS19,407 (+274), battle1,444,469 deferred (+729); asset guard37 files/17,703 unchanged, no dependency. No acquisition/reward/cost/AI architecture/asset pipeline changes. Generic curve/weights/exact seeds in docs/M6C_B_TIER_POWER_CURVE.md; plan M6C_B_IMPLEMENTATION_PLAN.md; evidence verification/M6C_B_TIER_POWER_CURVE.md.
- Active original feature/PR1, no main merge. Next exact action: player fixed teams/enemy/seed/scenario comparesT0/T1/T2/T3 HP/damage/heal/tempo/range/AoE/mobility/buff/mitigation and telegraph readability once. Engineering work complete. STOP before final art/audio/Chapter2/new progression.

## Previous M5C-A pipeline handoff (accepted; historical)

- **M5C-A ASSET PIPELINE — PLAYER VISUAL SMOKE ACCEPTED FOR PIPELINE BEHAVIOR.** Player observed the dev visual labels/placeholders and accepted current pipeline behavior; formal art is still deferred. Preserve asset pipeline baseline.
- **M6C-B TIER POWER CURVE REBALANCE — IMPLEMENTATION READY.** Player wants Tier growth to feel substantially stronger across a reusable parameter pool. Canonical curve now includes HP, damage/heal, move/attack speed, cooldown, scalable windup, attack range, AoE radius, dash/reposition distance, buff/debuff duration and shield/mitigation strength. A generic `TierScalingProfile` controls per-character weighting; current five characters are validation only, future characters use the same contract. Preserve M6C mechanics and all progression costs/accounting. Canonical: `docs/M6C_B_TIER_POWER_CURVE.md`.
- **M5C-A ASSET PIPELINE — ENGINEERING PASS / PLAYER SMOKE PENDING.** Generic manifest/resolver/menu fallback, encounter-only lazy cache, animation/VFX descriptor playback and Arena/Lab adapter complete. No final art integrated; M0–M6C accepted gameplay/AI/Tier/progression preserved.
- Active feat/m0-combat-core-20260927 / PR1 per AGENTS13A, main untouched. Recovery015618fa; A700f72b6/B0de99b3f/Cdcb1d6cf/Df646c545 safe pushes complete. E targeted56/56, impacted375/375, full542/542/build/diff PASS.
- Independent review0 Critical/5 Important; all RED→GREEN fixed. Late graphics→image replacement, decoded fallback chain, ability-only load plan, target attachment/KO, reference guard coverage. No unresolved findings/deferred minors.
- Actual asset guard37 files/17,703 bytes; cache64 entries/16MiB decoded RGBA/2 parallel loads; scene textures64/16MiB, VFX64/10s. Entry81,218 bytes vs M6C76,859 (+4,359); CSS19,133 unchanged, battle1,443,740 deferred. No deps; normal menu graph excludes heavy pipeline/Phaser.
- Canonical docs/M5C_ART_ANIMATION_VFX.md; authoring docs/ASSET_PIPELINE.md; plan docs/M5C_A_IMPLEMENTATION_PLAN.md; evidence docs/verification/M5C_A_ASSET_PIPELINE.md. Lab Visual inspection is cosmetic/session-only, formal save untouched.
- Release source d3ed2bf0bad01e0a4d055fb4b89f49362c868ef8; Actions #399 / 37107284909 SUCCESS (build111158185887, Pages deploy111158232597). Public entry index-iHgeqczB.js matches tested build; CSS index-CuxsJ6uc.css, deferred battleRuntime-KzZEk5yG.js. Public normal Landing has BATTLE/COLLECTION/INFO, no Lab/canvas/modulepreload. Collection and Chapter/Stage preview navigation verified; six preview images complete640×300, zero canvas. Dev Visual inspection battleIdle shows two-frame graybox in real Arena; Pause/Restart/Exit→Lab verified, inspection/countdown settings retained, canvas removed. Cloud1363×936 has no horizontal overflow. Physical phone visual acceptance remains player smoke.
- Next: one focused player visual smoke only. STOP before M5C-B final art/VFX/audio/Chapter2/new economy.

## Previous M6C accepted handoff (historical)
- M5C-A IN PROGRESS / A complete: validated immutable manifest, standard nine slots, central existing previews and placeholders; future-character data refs. Targeted14/14 PASS. B resolver/cache/menu integration complete; targeted/impacted98/98 PASS. Cache requested-only/concurrent decode sharing, missing/failed metadata-safe fallback and bounded residency. C immutable animation/VFX descriptors and battle-clock playback complete; targeted13/13 PASS. D shared Arena/Lab presentation integration complete: encounter-only assets, optional state/HUD/stage/status/skill overlays, cast descriptor playback, dev Visual inspection and scene-owned cleanup. Targeted52/52/full532/532 PASS. E guard/review/release next. Active feature/PR1, no gameplay/economy changes.
- **M5C-A ASSET PIPELINE — IMPLEMENTATION READY.** Build one generic manifest/fallback/lazy-loading/animation/VFX descriptor pipeline using existing placeholders; do not integrate final art one file at a time. Canonical: `docs/M5C_ART_ANIMATION_VFX.md`. M5C-B later consumes approved asset batches.
- **M6C TIER COMBAT EFFECTS / SHARED STATUS PRIMITIVES — PASS / PLAYER VERIFIED.** Player accepted current T0–T3 mechanic differentiation as the working balance baseline. Exact Tier magnitudes/timings/coverage may be tuned later without changing shard costs/accounting or the shared generic status/effect architecture.
- **NEXT: M5C ART / ANIMATION / VFX INTEGRATION — CHAT SPEC / IMPLEMENTATION PLANNING.** Define reusable asset contracts and batching so portraits, battle sprites, idle/hit/KO states and skill VFX can be integrated without one-image-at-a-time Work loops. Preserve all accepted combat/progression systems.
- **M6C TIER COMBAT EFFECTS / SHARED STATUS PRIMITIVES — ENGINEERING PASS / PLAYER SMOKE PENDING.** Cumulative read-only Tier projection, generic statuses/control/conditions/protection/persistent areas, five formal kits and Lab Tier A/B complete. No economy/reward/schema/Chapter changes; M6B remains PLAYER VERIFIED.
- Recovery remote5733a246; original feat/m0-combat-core-20260927 / PR1 retained per AGENTS13A. A f6f24591, B bf808779, C35245514 (geometry-copy fix), D8b694c52 pushed. E final targeted119/119, impacted369/369, full512/512, build/diff PASS. Actions/Pages/public verification complete.
- Independent read-only review:0 Critical,1 Important schema gap,1 angle finding; all addressed RED→GREEN. Angle regraded as generic functional gap and fixed; no unresolved findings. Root integration tests also fixed shutdown cleanup, full-HP secondary support, naturally useful Lab area fixture and fractional expiry (no sixth pulse).
- Lab ally/enemy TierT0–T3, T0 ally baseline keeps teams/enemy Tier/seed41,3 new presets; zero persistence capability. Campaign receives authoritative detached Tier snapshot. Exact seeds/limits documented in docs/M6C_TIER_COMBAT_EFFECTS.md; plan M6C_IMPLEMENTATION_PLAN.md; evidence verification/M6C_TIER_COMBAT_EFFECTS.md.
- Bounded collections:64 statuses/12 areas/5 tactical candidates; areas200ms minimum, maximum10s. Same-seed12 comparisons reproducible; natural new presets terminate17.15–50.9s, max11 statuses/1 area. Entry76,859 bytes; deferred battle1,431,411; no new dependencies or eager battle imports.
- Release source be46c92e59139a92bcff89cecbd95accf553d4a6; Actions #391 / 37099650309 completed SUCCESS (build111136525373, deploy111136573373). Public entry index-CP8sRNpJ.js matches build; normal Landing has BATTLE/COLLECTION/INFO, no Lab/canvas/modulepreload. Dev menu has13 presets/Tier selectors; real Arena allyT3/enemyT1 and T0 baseline labels, residual-area ring, Pause/Restart/Exit→Lab verified; settings retained, canvas detached. Cloud1363×936 no horizontal overflow. Physical phone feel/readability remains player smoke.
- Next: one focused T0 vs T1/T2/T3 Lab smoke only. Engineering A–E complete. STOP before art/audio/Chapter2/new economy.

## Previous M6B accepted handoff (historical)
- **M6C — IN PROGRESS / D COMPLETE.** Read-only cumulative Tier projection/schema and Campaign detached snapshot; T0 no effects, enemy defaultT0. Targeted21/21 RED→GREEN. B generic records/status/control/condition/post-cast shared runtime done;152/152 targeted PASS. C bounded persistent area/protection primitives integrated; 143/143 targeted PASS after RED fixed geometry copied actor/control ownership; copy x/y only. D formal cumulative seeds/Lab A/B/3 presets/clock area and generic status indicators complete. Targeted108/108/full501/501 PASS. E review/build/deploy pending. Recovery5733a246; existing feature/PR1, no progression writes.
- **M6B COMBAT TACTICAL AI / TELEGRAPH / DODGE BATCH — PASS / PLAYER VERIFIED.** Player accepted current tactical behavior/telegraph readability as a working baseline and explicitly allows future tuning of warning size/style/timing if problems appear. Preserve shared/profile-driven AI and generic telegraph/threat architecture.
- **NEXT: M6C TIER COMBAT EFFECTS / SHARED STATUS PRIMITIVES — IMPLEMENTATION READY.** Make existing T0→T3 progression affect combat through reusable data-driven modifiers/status/control/area primitives. Current five characters are validation content only; architecture must support future characters without ID-specific branches.
- **M6B RELEASE EVIDENCE (historical pre-acceptance):** Profiles/scoring, bounded intent states, clock-owned telegraph threats/delayed shared impacts, circle/capsule warnings, four tactical Lab presets complete. M6A remains PLAYER VERIFIED; no accounting/progression/Chapter data changes.
- Active feat/m0-combat-core-20260927 / PR1 / original Pages flow. Recoverye36abeb9; checkpoints A a8e3d3d0, B2106b152, Cce76e985, Dca9160c5 tested/committed/pushed; E release verified.
- E targeted50/50, impacted308/308, full475/475, build/diff PASS. Independent review found4 Important,0 Critical; all4 RED→GREEN fixed: lane endpoint caps, stop clearance, urgent threat before held ordinary destination, target/area eligibility. Added held-evade regression. No unresolved review findings.
- Performance: bounded250ms/5 candidates/700ms destination; seed41 four scenarios terminate15.60–34.70s with319/576/307/377 evaluations, maximum3–4 threats; no pathfinding/render tactical search. Entry68,623 bytes (M6A79,192); battle1,422,246 deferred. Pure demo definitions split removes existing preview→BattleSession import leak; no numerical data change.
- Release source `38cbac78b9aa6aaabcfa7de87c6202e13b984341`; [Actions #379 / 37096413415](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37096413415) Test/Build/Pages SUCCESS (build111127158627, deploy111127221878). Public Landing index--RrIFyks.js matches build, no modulepreload/host/canvas; normal URL Lab absent. Dev menu has10 presets; TELEGRAPH TEST START uses real Arena; capsule warnings visible; Pause, Restart, Exit→Lab verified, configuration retained and host/canvas removed. Cloud1363×936 no menu horizontal overflow. Physical iPhone feel/readability remains player smoke; automated storage snapshot contracts cover isolation.
- M6B player smoke is complete/accepted. Canonical `docs/M6B_COMBAT_TACTICAL_AI.md`; evidence `docs/verification/M6B_COMBAT_TACTICAL_AI.md`. Current next is M6C.

## Previous M6A accepted handoff (historical)
- **M6A DEVELOPER BATTLE LAB — PASS / PLAYER VERIFIED.** Player accepted the dev-only lab flow and authorized continuation. Preserve isolated `?battleLab=1`, formal shared runtime, six presets, quick options, retry/back, and zero progression/save mutation as baseline.
- **NEXT: M6B COMBAT TACTICAL AI / TELEGRAPH / DODGE BATCH — IMPLEMENTATION READY.** One coherent batch: declarative telegraphs/dodgeable metadata, shared threat detection, safe-position scoring, sidestep/backstep/diagonal evasion, healer retreat/recover/re-engage, ranged spacing/kite, bruiser/tank differentiation, and formal Chapter1 AI profiles. Use M6A Lab for focused smoke. No character-ID AI branches.
- **M6A DEVELOPER BATTLE LAB — ENGINEERING PASS / PLAYER SMOKE PENDING.** Explicit ?battleLab=1 menu, six immutable presets, formal roster duplicate slots, HP100/50/25, Type three cases, skip countdown, ready override, AI-only/manual. Shared formal BattleSession/Arena; reward-free RETRY/BACK TO LAB.
- Strict isolation: dev entry bypasses Campaign/reset/persistence/migration; Lab controller has no save capability and adapter has null campaignActions. Automated app result/retry/back storage snapshot identical. Normal URL remains Landing; battle runtime deferred until START.
- Active feat/m0-combat-core-20260927 / PR1. Recovery65e159913cf731e546774b2d38adf75e5a7b75dd. A f1db5b78; B9db76a68; C10da7909; D0e3e85e4 pushed independently with targeted5/32/29/39 PASS. Intermediate checkpoints skip CI; E release runs CI/Pages.
- E targeted41/41, impacted205/205, full448/448, build/diff PASS. Independent review39/39, no actionable Major/Minor findings. Entry79,192 bytes (accepted INFO71,960; +7,232); deferred battle1,395,576 bytes; no Phaser/preload in Lab menu. Physical touch/device acceptance remains pending.
- Release source1b6975da853dd4a8cff900b617a620322d5401f6; Actions#373/37092896323 Test/Build/Pages SUCCESS (build111116800181, deploy111116861094). Public entry/CSS fingerprints match local; normal Lab absent, dev menu no host/canvas/preload, live heal/type AI-only/exit/reload verified.
- Exact next: one short player smoke: dev URL→teams→HEAL TEST→TYPE ADVANTAGE→Skip countdown→Retry→Back→normal save unchanged. docs/M6A_DEVELOPER_BATTLE_LAB.md and docs/verification/M6A_DEVELOPER_BATTLE_LAB.md. STOP before M6B/art/animation/audio.

## Previous acceleration / accepted INFO handoff (historical)
- **DEVELOPMENT ACCELERATION RULES — PLAYER APPROVED.** Future Chat/Work should prefer coherent batch milestones with internal checkpoints, continue automatically between checkpoints when no player decision is needed, rely on automated regression for accepted systems, and reserve player smoke for subjective/cross-system completion. Canonical: `docs/DEVELOPMENT_ACCELERATION.md`.
- **NEXT APPROVED SEQUENCE:** M6A Developer Battle Lab → M6B Combat Tactical AI / Telegraph / Dodge Batch. M6A is dev-only and must never write Campaign clear, shards, unlocks, Tier, saved team, or progression receipts. M6B groups telegraphs, threat detection, dodge, healer retreat, ranged spacing/kite and profile-driven tactics into one larger milestone.
- **INFO HUB IMPLEMENTATION — PASS / PLAYER VERIFIED.** Player completed device smoke and accepted Landing INFO, GAME GUIDE / WORLD / TYPE MATCHUP, icon-triangle presentation and navigation. Preserve as baseline.
- **INFO HUB IMPLEMENTATION — ENGINEERING PASS / PLAYER SMOKE PENDING.** Landing sibling INFO opens exactly GAME GUIDE / WORLD / TYPE MATCHUP. Subpage BACK→Hub; Hub BACK→Landing. Read-only content model and scoped view/CSS; live controls/world premise, ◆/✦/➤ icon-only triangle and exact live multipliers, three placeholder media slots.
- Active feat/m0-combat-core-20260927 / PR1 retained. Canonical recovery abe131de3ca45e783524510fed8ad6534a68357f; previous overlay/lazy loading PASS / PLAYER VERIFIED. No combat/type/accounting/Tier/team/Chapter changes; no animation/art/audio/AI.
- RED missing INFO contracts→GREEN targeted40/40, impacted152/152, full431/431; build/diff PASS. Independent review: no blockers; three Minor copy/language/focus items resolved and tests pass. Entry71,960 bytes (previous67,234; +4,726); deferred battle chunk1,393,903 bytes unchanged in size; no battle preload. Source fingerprints index-BdiMi8Tk.js / index-CCHQa3nv.css / battleRuntime-DhqO-uAr.js.
- Final tested/deployed source39561844877136940fcb09a3270d1bd35327f511; [Actions#365 /37088162820](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37088162820) SUCCESS: CI431/431; Build111102623655/Pages111102788768 success. Public/local/CI entry index-BdiMi8Tk.js/CSSindex-CCHQa3nv.css match; no modulepreload. Hub/three subpages/BACK/reload, heading and Landing INFO focus, existing Collection/Chapter observed; host absent/zero canvases throughout, no horizontal overflow at cloud1363×936. No reset/battle/rewards/upgrade performed.
- Exact next: normal URL https://hansen0318.github.io/shanhaijing-arena/ INFO→each subpage→BACK→Hub→Landing; check iPhone landscape/short-height text/icons/BACK/scroll/safe areas and rotation/reload only. Evidence: docs/verification/INFO_HUB.md. STOP after release; do not start future features.

## Previous INFO-ready / accepted overlay handoff (historical)
- **M5B OVERLAY / PERFORMANCE — PASS / PLAYER VERIFIED.** Player completed phone smoke after the lifecycle/lazy-load correction and continued development. Treat the detached non-battle host + deferred battle runtime as accepted baseline. Preserve the 67KB-class entry bundle/lazy battle loading behavior.
- **NEXT: INFO HUB IMPLEMENTATION — READY.** Landing adds sibling INFO entry. INFO Hub contains GAME GUIDE / WORLD / TYPE MATCHUP only. Type Matchup uses icon-only triangle (Power top, Blast bottom-left, Speed bottom-right) with arrows Power>Speed>Blast>Power; text and live multipliers x1.15/x0.85/x1.00 below. Media slots reserved for future images/micro-animation. Do not implement AI dodge here.
- **INFO HUB / TYPE MATCHUP SPEC RECORDED:** future Landing sibling INFO -> GAME GUIDE / WORLD / TYPE MATCHUP. Type page uses icon-only triangle (Power top, Blast bottom-left, Speed bottom-right) with arrows Power>Speed>Blast>Power; explanatory text below keeps live x1.15/x0.85/x1.00 values. Each page reserves future illustration/micro-animation space. Canonical spec: `docs/INFO_HUB.md`. Not implemented yet.
- **FUTURE AI DODGE / TELEGRAPH DESIGN RECORDED:** AI may later react only to dodgeable telegraphed projectiles/AoE/high-threat attacks using sidestep/backstep/diagonal safe positions, never perfect evasion. Player manual movement already enables natural dodging. Shared declarative ability metadata/profile-driven logic required; no character-ID branches. Canonical: `docs/AI_SYSTEM.md`. Deferred from current slice.
- **M5B FOLLOW-UP OVERLAY / PERFORMANCE PASS — ENGINEERING PASS / PLAYER SMOKE PENDING.** Bounded lifecycle correction: non-battle host detached, renderer asleep; no hidden-canvas viewport refresh. Cold battle runtime lazy-loads; loading menu inert, failed/stale entry safe. No progression/combat/Chapter data changes.
- Active branch feat/m0-combat-core-20260927 / PR#1 retained; no main merge. Targeted29/29, impacted136/136, full419/419, build/diff PASS; independent review findings resolved, no remaining blockers.
- Initial JS1,458,758→67,234 bytes (95.39% reduction). Battle1,393,903-byte chunk deferred to first battle. SVG36 total17,454 bytes/max495; no oversized images. Physical phone load timing and exact blue compositor artifact remain player smoke; desktop did not reproduce it.
- Type advantage ALREADY exists in typeMultiplier/combatResolver (+15%/-15%, Power>Speed>Blast>Power); not modified. INFO unimplemented. Full evidence/checklist: docs/verification/M5B_OVERLAY_PERFORMANCE.md.
- Final tested/deployed sourcedc6ddc418f04e3a65126f6cb425218ad0793ca6d; [Actions#357 /37025457468](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37025457468) SUCCESS: CI419/419, Build110898825524 and Pages110899002199. Public JSindex-DfDphhuN.js/CSSindex-082fIvTy.css match local/CI; no battle preload. Public Landing/Collection/Chapter/Stage host absent, images complete; cold runtime canvas/HUD and EXIT→Stage→Chapter→Landing/reload observed. No reset/rewards/full replay.
- Exact next: normal-URL phone smoke of reload, both BACK routes, preview images, first battle/EXIT, rotation; check mask and load wait separately. STOP. No type/INFO/art/animation/AI or broader features.

## Previous Result correction handoff (historical)
- **M5B RESULT SHARD PROGRESS CORRECTION — ENGINEERING PASS / PLAYER SMOKE PENDING.** Universal Result now uses transaction.state + characterProgress().progressLabel, shared with Collection: locked/T0 available/5; T1/10; T2/15; T3MAX. Exact acquisition5 shows post-spend0/5 + UNLOCKED. No character/stage/reward-mode special cases.
- Active branch feat/m0-combat-core-20260927 / PR#1 retained. Final tested/deployed source7555c0b4de3485cce0cb5f271f1fb456c8b92392; subsequent closure docs-only. Only production edits presentation.js/controller.js; lifetime shardCounts/earned/spent, accounting/Tier cost/reward quantities/combat/Chapter1–6/Collection unchanged.
- RED2/10→GREEN targeted17/17; impacted126/126; full407/407; build/diff PASS; independent read-only55/55, no Critical/Important/Minor findings. All Tier denominators/MAX, surplus, unlock, multi-character, repeat farming, Collection agreement and protected contracts covered.
- [Actions#356 /37020221225](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37020221225) SUCCESS: Test407/407; Build110881098046/Pages Deploy110881223571 success. Public normal URL Landing and loaded JSindex-Db98qSff.js/CSSindex-082fIvTy.css match local/CI. No reset/save injection/full-game replay.
- Exact next: normal URL https://hansen0318.github.io/shanhaijing-arena/ without reset. One relevant victory/replay: compare Result and Collection for the same character; check current Tier denominator/MAX or natural new-unlock0/5+UNLOCKED. No need to manufacture Tier states or replay all chapters. Evidence/checklist: docs/verification/M5B_FORMAL_CONTENT_INTEGRATION.md.
- **STOP.** No M5C/AI/art or unrelated changes. Original M5B kit/device acceptance remains player-owned; this correction changes Result presentation only.

## Previous M5B integration handoff (historical; correction above supersedes)
- **M5B FORMAL CONTENT DATA INTEGRATION — ENGINEERING PASS / PLAYER SMOKE PENDING.** M5A content approved; M0–M4 remain accepted baselines.
- Active branch `feat/m0-combat-core-20260927` / PR#1 retained. Final tested/deployed source `a692e2357639c99a36aab196026ec9d358c02575`; subsequent closure docs-only. Recover remote latest before new work. Existing feature-branch Pages release retained; no main merge.
- P1鹿蜀/P2猼訑/P3赤鱬/P4九尾狐/P5狌狌; formal stats/unique skill IDs/cooldowns/ranges, five T0 active kits, generic heal/ally/team/AoE/mitigation/cast movement/timed hits; threshold/AoE/range AI only. Catalog-powered Collection/Team/HUD/reward names, exact Chapter1 lineups/rewards.
- Stable IDs/save keys/schema, earned/spent/Tier/ownership/team/stage/reward and upgrade receipts preserved. Acquisition/Tier/persistence engines untouched. Chapter2–6 data and Landing view/CSS fixed-baseline checks PASS. Named conditional passive modifiers remain honestly deferred without numerical seeds; advanced Tier effects remain spec.
- Final full397/397 (includes targeted/impacted/combat regression), build/diff PASS. Independent whole-change112/112 plus follow-ups75/75 and34/34; no remaining findings. Prepared AoE/support target issues reproduced and corrected; reward prose uses catalog names.
- [Actions#352 /37015761111](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37015761111) final source: CI397/397 zero failures, Build and Pages Deploy SUCCESS; jobs110866095038/110866226090. Public/local/CI JSindex-DJGeqONb.js and unchanged CSSindex-082fIvTy.css match.
- Public normal reload/Landing/Collection/five names/赤鱬 Detail/Chapter1 formal reward preview/Team enemy identities observed; initial battle HUD/countdown/Pause UI observed, no page-origin errors. Sustained cloud countdown/animation progression was not established (observed3); do not claim cloud gameplay completion. Deterministic real-scene clock/Pause tests pass; physical battle/touch/readability remains player-owned smoke.
- Exact next: player targeted normal-URL smoke in `docs/verification/M5B_FORMAL_CONTENT_INTEGRATION.md`: existing data on reload; formal Collection/Team/reward names; countdown→battle; healer/AoE/mitigation/mobility/multi-hit and Pause/Restart. Do not reset player progression.
- **STOP.** No final art/idle animation/formal VFX/audio/advanced Tier/full tactical AI/Chapter2 formal content. First-playtest balance unchanged; further balance requires player feedback.

## Previous M5A / M4C handoff (historical; superseded by M5B above)
- **M5A FORMAL CHAPTER1 CONTENT — PASS / CONTENT APPROVED.** Player authorized the complete Chapter1 content sheet in `docs/M5A_CHAPTER1_CONTENT_DRAFT.md`: 鹿蜀/猼訑/赤鱬 initial, 九尾狐/狌狌 unlocks, skill identities, T0 stat/cooldown baselines, 1-1..1-5 lineups/rewards, Tier mechanic direction, and shared-combat primitive boundaries.
- **NEXT: M5B FORMAL CONTENT DATA INTEGRATION — IMPLEMENTATION READY.** Integrate approved identities/data into the existing catalog/stages/Collection and add only the minimum reusable combat primitives required for T0 kits. Do not start formal art/animation/VFX or AI tactical variation yet.
- **M5A STAT / COOLDOWN / TIER MECHANIC DRAFT READY.** Chapter1 content draft now includes distinct T0 HP/ATK/DEF/move/attack-speed baselines, per-character H/S/A cooldown directions, relative coefficient/heal targets, and T1/T2/T3 mechanic identities for all five approved characters. It also records shared combat primitives M5B may need (heal/ally-target/AoE/mitigation/control/status) and forbids one-off character engines. Await player content approval before Work integration.
- **M5A FORMAL CONTENT — CHARACTER DIRECTION APPROVED / DETAIL DRAFT READY.** Player approved continuing with initial 鹿蜀/猼訑/赤鱬 and unlock 九尾狐/狌狌 direction. `docs/M5A_CHAPTER1_CONTENT_DRAFT.md` now contains named Basic/Heavy/Special/Awakening/Passive identities, range/AI-profile intent, formal 1-1..1-5 lineups, and a concrete firstClear/repeatable reward draft. Await player approval before M5B runtime integration.
- **M4C MAIN MENU / LANDING VISUAL POLISH — PASS / PLAYER VERIFIED.** Player completed the deployed Landing smoke and reported it OK. Preserve BATTLE/COLLECTION sibling navigation and current route behavior as baseline.
- **NEXT PHASE: M5A FORMAL CONTENT DEFINITION — CHAT-FIRST.** Before more Work implementation, define Chapter1 formal content: real character identities, Type/Role, ability concepts/ranges/AI tendencies, stage enemy lineups, firstClear/repeatable rewards, finale identity, and required art/animation asset slots. Do not replace placeholders or invent balance until this content sheet is approved.
- **M4C MAIN MENU / LANDING VISUAL POLISH — ENGINEERING PASS / PLAYER SMOKE PENDING.**
- Active branch `feat/m0-combat-core-20260927` / PR#1 retained; no main merge. Recovery base `23c311120c97bdc9853954d9be831c02c9a8bd30`; first implementation checkpoint `c91ac3ed3d2814fb0d8f65122c973223fab5e3db`; final safe tested/deployed source `0a17954f6766ff79c68e825e942e6fb6a995bb06`. Later closure is documentation-only; recover remote latest.
- Existing Landing view + scoped CSS now have a full-screen static mountain/sun background, title identity, gold primary BATTLE and outlined secondary COLLECTION. Same sibling routes and BACK behavior. No motion, transition, timer, new asset or progression/controller/combat change.
- Actual checks: Landing RED0/4 → GREEN4/4; final targeted27/27, impacted188/188, build/diff PASS. Independent review24/24, no Critical/Important findings. Four actual-main viewport restoration cases568×320/667×300/844×390/932×430 cover pageshow/orientation/window+visualViewport resize/scroll, route owner and unchanged saves; these are executable contract tests, not physical readability acceptance.
- [Actions#332 /37009391394](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37009391394): CI357/357, zero failures, Build and Pages deploy SUCCESS; jobs110845215683/110845344569. Public/local/CI JS `index-nO1VZ07x.js` and CSS `index-082fIvTy.css` match.
- Public normal launch, BATTLE→Chapter Select→BACK, COLLECTION→Collection→BACK, and reload→Landing observed. Non-battle #game hidden; no horizontal overflow at cloud1363×936; buttons310×58px. Static hero screenshot inspected. No reset, save injection or upgrade performed. Physical Safari safe-area/toolbar/touch and shorter-screen visual acceptance remain player-owned.
- Protected M4B T0 is **PASS / PLAYER VERIFIED**: baseT0, costs5/10/15, T3MAX. Universal Chapter1–6 rewards, M3 earned/spent/acquisition, Collection, team, combat and explicit reset remain unchanged.
- Known limitations: placeholder/static art; existing large Phaser bundle advisory. No new blocker. Verification commands, source evidence and exact player checklist: `docs/verification/M4C_MAIN_MENU_LANDING.md`.
- Exact next action: player short Landing visual/navigation smoke (normal URL; do not reset): title/buttons on iPhone landscape including short viewport and safe areas; both modes and BACK; reload/rotation/Safari toolbar no stale rectangle; existing shards/Tier/lineup unchanged. Await acceptance, then STOP.
- **STOP:** no formal content/art/animation, AI tactical variation, Tier combat bonuses, Level/stars/rarity/shop/gacha/audio.
## Previous M4B T0 release (historical; now PLAYER VERIFIED)
- **M4B T0 BASE TIER CORRECTION — PASS / PLAYER VERIFIED.** Player acceptance supersedes the historical pending status. Latest canonical baseT0; T0→T1cost5,T1→T2cost10,T2→T3cost15,T3MAX. No player acceptance claim.
- Active branch `feat/m0-combat-core-20260927` / PR#1 retained. Recoverybase `e511df93e3d1e0d608244cb4133cf7297ab8559d`; domain checkpoint `76b7c0a4fa065ca4dff165d523ddc7aaa338ca13`; UI/final deployed source `7bb3802a72392ed175e08ffd170a09305a5b3fc9`. Later closure is docs-only; remote latest authoritative.
- Acquisition schema3 in existing v1 key. v1/v2 owned→T0; lifetime earned and existing valid spent/receipts preserved. v2 valid old Tier implied cumulative cost also retained if funded. No refund/free promotion. BaselineP1/2/3 recruitment0; shard-unlocked IDs recruitment5 once. Normalization floors prevent reload charge; v3 advanced Tier needs recorded consumed costs. Denied write session-memory fallback, Campaign/team untouched.
- Collection/Detail T0/fractions/MAX share existing state; dev-owned fixture baseT0. UPGRADE expectedTier/request-ID/500ms gesture guard unchanged. All three costs persist/refresh immediately; surplus retained atMAX. No reward/content/combat/layout/navigation/route changes.
- Actual checks: baseline relevant57 tests clean; correction RED0/18→GREEN18/18; domain55/55; UI RED9/10→GREEN; final relevant95/95; impacted180/180; combat93/93; build/diff PASS. Independent focused review50/50/no findings.
- Domain checkpoint Actions#323 /37006182297 failed346/348 due two old UI/Campaign Tier assertions not yet updated; no deployment. Final [Actions#324 /37006321807](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37006321807): CI349/349, Build/Pages success, jobs110835341645/110835456958. Public/local/CI JS `index-B5Rq6VE2.js`, CSS `index-CXWSf6fJ.css` match. Public Landing→Collection T0 and Detail nextT1/5/disabled observed; gameHidden=true, no save reset/injection.
- Historical player checklist (completed/accepted): `docs/verification/M4B_T0_CORRECTION.md`: normalreload migrationT0/available, eligible T0→T1 consumes5/card+detail refresh, next denominators10/15, rapidtap/reload/lineup retained. Optional higher-tier deliberate upgrades/MAX when sufficient. Physical player smoke accepted; no need reset/replay unrelated combat.
- **STOP.** Do not start Tier combat bonuses/Level/stars/rarity/shop/gacha/formal animation.

## Previous M4B release (historical; superseded Tier model)
- Source `af56523791fc59eaecaa7657e82197bb4f003ec9` used T1-base/5/10, superseded before acceptance. Universal Chapter1–6 reward content remains protected/unchanged. Previous Actions#316 CI330/330; details in `docs/verification/M4B_TIER_UNIVERSAL_REWARDS.md`.

## Previous universal farming checkpoint (historical)
- **M3 PREVIEW PRESENTATION CORRECTION — RELEASE CHECKS IN PROGRESS**. Branch feat/m0-combat-core-20260927 / PR#1 retained. Recoverybase0636172132c2719f68d5a154039a1f34e30aac7e. Preview labels FIRST CLEAR/CLAIMED/REPEATABLE removed; available/repeatable rows normal contrast, claimed non-repeatable muted+50%opacity. Existing reward/acquisition/persistence/config/TeamSelect/combat unchanged.
- Actual checks: RED presentation5/7 then GREEN28/28 (rewardPresentation, universalRewards, campaignNavigation, teamFlowView); build/diff PASS. Local JSindex-BLZigtQP.js /CSSindex-CtA1vGg1.css. Next exactaction: Actions/Pages deployment/source verification then targeted player readability smoke. No full local suite or unrelated historical smoke.
- Design record only: future Team Select idle/micro-animation retains name below character (docs/CHARACTER_SYSTEM.md); no current Team Select changes, no M4. Previous farming release evidence below remains historical.

- **M3 UNIVERSAL REWARD / FARMING FOLLOW-UP — ENGINEERING PASS / PLAYER SMOKE PENDING**. Branch feat/m0-combat-core-20260927 / PR#1 open, no main merge. Safe implementation/deployed checkpoint1f5ef823d18d424dc4ffe97f16a0f08ab48fbeab; later closure docs-only. Recovery base31c8344174cd5f08647864a94bdbf455881eb0f3. Prior originalM3 player accepted; latest follow-up not accepted yet.
- Current Chapter1 live config:1-1firstP4×3/P2×2,replayP2×1;1-2firstP4×2/P1×2,replayP1×1;1-3firstP5×2/P3×2,replayP3×1;1-4firstP5×2/P2×2,replayP5×1;1-5firstP5×3/P1×2,replayP5×2. P4 unlocksafter1-2at5; P5after1-5at7. All five cleared stages remain farmable. Canonical docs updated; former single-item fixture superseded.
- Reward engine/presentation/persistence untouched. All stages share reward.items; syntheticChapter2three first/two replay items verifies future data-only content. Owned shards/duplicate UUID/unlock5/migration/Team Select/protectedcombat unchanged.
- Route visibility owner introduced: Campaign render hides game; battle launch shows game; viewport/pageshow/visualViewport callbacks reassert after Phaser refresh. Initial #game hidden + display:none rule, geometry unchanged.
- Explicit consumed ?resetProgress=1 clears only Campaign/acquisition/team keys before loading state, opens freshChapter1. Normal URL preserves saves; denied storage gives fresh memory-only mode, history failure prevents clearing. No automatic wipe.
- Checks actually run: universal fixture RED1/7 (six expected failures); route/reset RED0/7; targeted16/16 GREEN incl actual main.js VM; final impacted126/126 including actual app integration. Seven old fixture/app harness regressions corrected. Independent review39/39/no findings, build/diff PASS. [Actions#289 /36881481144](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36881481144) CI288/288, Build/Pages success; jobs110434055193/110434260343. Public/local/CI JSindex-fgF_0oLa.js; CSSindex-Da2FpEU1.css unchanged. Public cleared1-1 shows twoCLAIMED+REPEATABLE; reload Campaign gameHidden=true/campaignHidden=false. PhysicalSafari touch/readability not replayed.
- Exact next action: PLAYER SMOKE then STOP. Use explicit?resetProgress=1 once to start fresh;1-1 firstP4+3/P2+2,replayP2+1; verify every1-2→1-5 cleared Preview still hasREPEATABLE, first-runP4unlocks1-2/P5unlocks1-5, shards survive normalreload. Check Safari reload/route/toolbar/rotation has no rectangle, battlestillvisible and multi-rowbuttonsreadable. No repeated unrelatedcombat testing. Evidence docs/verification/M3_UNIVERSAL_FARMING.md. Existing denied-storage/receipt-growth/bundle limitations preserved; explicitreset changes only authorized3keys, never normalURL. STOP before M4; no PLAYER VERIFIED claim.

## M3 implementation history (superseded checkpoint notes)
### Earlier checkpoints
- Integration safe remote: 2c0b9e3953ecac0e899ccbfbdc72b4226257a003. Release first full run 265/266: sole stale criticalDamage Restart fixture assumed P5 initially owned. Explicit prototypeOwnership fixture correction GREEN targeted19/19 then full266/266. Build PASS (index-CYcU_UMN.js); existing Phaser bundle advisory only. Independent review pending; final deployment not yet claimed.

- Domain/persistence safe remote: a0e83010cfc1ea8f42658e70b4fe014b749c6ec8. UI/controller integration now coherent: canonical Chapter 1 rewards; current normal ownership; per-round UUID rejects stale callbacks; authoritative Result; Preview policies/CLAIMED; ownership refresh preserves empty slots/order.
- RED integration 9 tests + presentation 4 tests; slot-order regression reproduced then fixed. GREEN impacted 106/106. Historical M2 tests now explicitly inject unlock-all ownership fixtures; no normal Campaign bypass. Test harness filter lookup corrected to data-filter (nested icon labels).
- Remaining release review/build/CI/deploy/public source confirmation. Next: checkpoint integration remotely BEFORE long release verification.

- Safe preflight checkpoint: 5b32c8e47aae630a63f1ca132f4e86fe83616eec. Domain + acquisition persistence now complete: RED 13 + 9 expected missing behavior failures; GREEN targeted/impacted 37/37. Dedicated acquisition.v1 key, universal inventory, retained unlock shards, durable receipts, pre-M3 CLAIMED initialization, denied-storage in-memory fallback. No Campaign/team save rewrite.
- Remaining: metadata/controller/UI integration, release checks/review/deploy. Next: RED Campaign reward integration tests.

- M3 implementation IN PROGRESS; direct Work authorized. Recovery baseline b40a3fd58a1dee16c580ac2d4b10177cf60f509b, branch feat/m0-combat-core-20260927 / PR #1. Remote latest confirmed unchanged; Actions #275 / 36868292806 success.
- Spec/docs recovery complete; execution plan docs/M3_IMPLEMENTATION_PLAN.md. No product code changed yet. Next: RED acquisition/persistence contracts then pure model; preserve M0/M1/M2; STOP before M4.

- **M2 impact-text / prototype movement pacing — PASS / PLAYER VERIFIED**. Player accepted the final larger 40/45/50/55px impact-text tuning, in-place fade/CRITICAL hierarchy, and current faster prototype movement. Actions#269 / 36866538530 completed successfully. Original `feat/m0-combat-core-20260927` / PR#1 remains active.
- Final implementation/deployed source `9ad74e6f9b93a85451f9cf09552243530274f35a`; Actions#265 /36865286592 Test, Build, Pages Deploy success. Public bundle `index-CI9O6wHr.js` matches local build; Chapter Select renders after reload. Closure following source is documentation only [skip ci].
- Changed only damageNumbers presentation + roster/runtime enemy speed data and their tests. Normal32/36/40/44px; critical1.25×, CRITICAL! another6px larger;80ms yoyo pop then in-place fade,840–1040ms total, no x/y tween. P1–P5 moveSpeed1.8, runtime enemy1.6, headless4/3.5 unchanged. Crit/RNG/resolver/cooldown/attackSpeed/AI/input/Campaign/Restart untouched.
- Actual checks: targeted17/17, impacted battle/AI98/98, check230/230, build and bounded whole-diff review/check PASS. RED6 expected contract failures; stale Restart pop count1→3 updated to cover normal + critical number + label. No known engineering failures. Existing Phaser bundle/npm proxy advisories remain. No unnecessary Campaign browser replay.
- Player acceptance closes the M2 combat-feedback/pacing correction. **M3 — Shard / Reward / Character Unlock Loop is now authorized for implementation planning.** Canonical spec: `docs/M3_SHARD_REWARD_UNLOCK.md`. Exact next step: Work implements M3 only after reading that spec; stop before M4.

- Second player size correction: normal damage text was still too small on iPhone. Authorized direct presentation-only tuning: normal Basic/Heavy/Special/Awakening sizes 40/45/50/55px (approximately the previous critical-number scale); critical number remains slightly larger at 1.12×; `CRITICAL!` remains largest at critical+12px. No combat/RNG/movement/cooldown changes. Deploy and re-smoke only this visual size delta.

## Previous release / correction checkpoints
- Current bounded correction: **M2 impact-text / prototype movement pacing — LOCAL VERIFIED, DEPLOY PENDING**. Recovery remote `7428d34661df2b453b83d9f777519e830380b682`, PR#1 original branch, Actions#263 success. No crit/RNG/resolver reimplementation.
- Implemented: normal32/36/40/44px; critical1.25× and CRITICAL! another6px larger; all text80ms yoyo pop,120ms hold then in-place fade (840–1040ms total), no x/y tween. P1–P5 moveSpeed1.8, actual runtime enemy1.6; headless4/3.5 untouched.
- Tests RED6 expected failures → targeted17/17, impacted98/98 PASS. One stale Restart assertion expected only1 pop; now3 (normal + critical number + label), corrected without lifecycle change. Remaining build/diff/Pages; exact next: build then push verified source/deploy and record release. No M3.
- Milestone: **M2 CRITICAL / DAMAGE-NUMBER POLISH — ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**. M0/M1/M2/layout/filter/Restart/3-5-10 pacing remain PLAYER VERIFIED.
- Branch `feat/m0-combat-core-20260927`, PR#1 open; no alternate branch/main merge. Canonical `docs/M2_CRITICAL_DAMAGE_POLISH.md`. Final deployed source `80054aea902a3bc48a726509ca3f70aa9897b397`.
- Checkpoints:1 `9c696717deedeb733824934b2b129066af17d680`;2 `ea7bf1db2e09fead0cfa2f3a547a602efa20b6b1`;3 `238cd00bb459f95cf84415aba8be5318e28a79dc`;4/finalsource above. Closure following this source is docs/evidence only [skip ci].
- Completed: immutable per-ability crit validation; fresh session Mulberry32 seeded RNG; shared AI/player final damage/event critical flag; runtime prototype values with untouched headless no-crit fixture; normal category emphasis + warm larger CRIT!/pop; existing pause/shutdown/reset pipeline.
- Actual checks: targeted31/31, impacted168/168, full check227/227, build/diff PASS. Independent whole-diff reviewer no findings,30/30 independent tests + same-category/overkill probes. Actions#260 /36861577213 Test227/227, Build, Pages Deploy success; public JS `index-CTo9sRxy.js` matches local/CI.
- Public engineering smoke: selected P1/P3/P5 into1-1 Arena; real damage numbers/HP/CD observed at01:26/01:25; Pause freezes the visible numbers/timer; X/RESTART from damaged/KO paused state restores full same-team scene and clears text. No page-origin errors. Cloud clock initially slow; live critical/iPhone readability not claimed. Critical style/freeze/cleanup verified using deterministic tests and real Phaser tween manager. Screenshots are normal-damage/Pause + fresh Arena evidence, not iPhone proof.
- Player smoke completed and found presentation tuning still needed: damage numbers should be larger; critical number larger than normal; CRITICAL! larger than the critical number; text should flash/pop then fade in place with no upward drift. Prototype movement pacing should also increase while keeping moveSpeed per-character data-driven.
- Authorized bounded correction: roster P1–P5 moveSpeed 1.4→1.8; runtime placeholder enemy 1.2→1.6. Crit probabilities/multipliers, 3/5/10 cooldowns, AI spacing, attackSpeed and combat formulas stay unchanged.
- Limitations: prototype visibility tuning, integer displayed rounding with exact/overkill event amounts, default seed repeats fresh rounds; no formal balance/art/audio/M3. Exact next step: implement this bounded player correction, targeted/impacted verification, build/deploy, then repeat only the short player smoke. STOP before M3.

## Earlier checkpoint notes / accepted baseline
- Critical checkpoint3 remote `238cd00bb459f95cf84415aba8be5318e28a79dc`. Integration verification: targeted31/31; impacted168/168; `npm run check` full227/227; Vite build PASS (bundle `index-CTo9sRxy.js`); whole-diff whitespace check PASS. Existing large-Phaser bundle/npm proxy advisories only. Fresh independent review running; Pages/current-source public smoke not yet claimed. Exact next: resolve review findings, confirm latest Actions build/deploy, minimal public crit/pause/restart smoke, then closure docs + STOP.
- Critical checkpoint2 remote `ea7bf1db2e09fead0cfa2f3a547a602efa20b6b1`. Checkpoint3: normal category sizes24/28/32/36px and lifetimes900/1000/1050/1100ms; critical1.25× size, warm outline, CRIT! label,100ms yoyo scale-pop. All use protected tween clock and scene shutdown cleanup. Presentation/lifecycle26/26 PASS after RED5 failures; actual fresh Arena Restart now covers normal/critical labels/pop cleanup and seed reset. Remaining: final targeted/impacted/check/build/review/Pages/public smoke and closure docs.
- Latest critical checkpoint1 remote: `9c696717deedeb733824934b2b129066af17d680`. Checkpoint2 now implements one shared structured resolver + legacy numeric wrapper, session-owned seeded RNG and boolean critical damage events; runtime prototype crit data separated from unchanged no-crit headless fixture. Targeted/core impacted88/88 PASS, diff PASS. Test setup error (empty default team) corrected with explicit valid saved-team fixture; no product failure remaining. Next: category/CRIT text and tween cleanup tests, then release verification/deploy.
- Current work: **M2 CRITICAL / DAMAGE-NUMBER POLISH — IN PROGRESS**, existing branch/PR#1. Recovery HEAD `07416754954be1f337f929bfb0f133cbf96fb033`, Actions#256 success. Prior M0/M1/M2/layout/filter/Restart and 3/5/10 pacing are player verified; do not redo.
- Checkpoint1: immutable optional crit fields + isolated uint32 seeded RNG. Definition tests RED7/7 (missing contract), GREEN targeted21/21 with existing ability tests; diff check PASS. Remaining resolver/events, presentation, integrated checks/deploy. Exact next step: shared resolver with injected session RNG; no M3.
- Milestone: **M2 TEAM SELECT LAYOUT / ROSTER FILTER / BATTLE RESTART CORRECTION — PASS / PLAYER VERIFIED** (2026-10-01).
- M0/M1/M2 remain **PASS / PLAYER VERIFIED**. Prior polish AI/damage implementation retained; no M3/M4.
- Active branch / PR: `feat/m0-combat-core-20260927` / #1; no replacement branch or main merge. Recovery baseline `d13252799e933f66b425035ddcc03335387b6d86`, main inspected `16f73932a0399979ba79b92f93f5ce1c1d1909b9`.
- Canonical spec: `docs/M2_TEAM_SELECT_LAYOUT_CORRECTION.md`.
- Deployed final source: `3e1063bb61455438a9cf5e707cbd05a1e2114410`; Actions #249 / 36818638073, CI204/204, Build, Pages Deploy success. Public bundle `index-Dp67u527.js` matched local final build. Later closure commit is docs/evidence only [skip ci].
- Checkpoints: layout `d3cbf1707ed1c385522d9037be0755a5a9a36bf3`; bench/filter `84c0b438604e6fbdbdb4cf5172278b97b02169df`; Restart `290d5f48974dad7896f3649b68ffea4c91eec307`; integration `85e9df78389c7f98260cfc9b99e72cd60f7d0a16`; safe-area follow-up/final source `3e1063bb61455438a9cf5e707cbd05a1e2114410`.
- Completed: viewport rows with safe-area bottom; compact64×64 bench and ALL/Power/Speed/Blast display-only filters; clean actual-enemy matchup without upper type marks; shared Restart/Retry fresh scene pipeline. No ownership/catalog/combat/input/AI/damage refactor.
- Actual local verification: targeted11/11, impacted130/130, build and whole-diff check PASS. Independent review no remaining Critical/Important/Minor. Forced long label compacted; reduced viewport844×320+21px bottom inset reproduced then passed CSS budget regression.
- Public final-source smoke: Team Select/filter rendered; P1/P3/P5 preserved across Blast/Speed/ALL; exact3 BATTLE; bench64×64, upper type marks0; root scrollHeight=clientHeight936 and BATTLE visible in1363×936 cloud viewport. BATTLE and X/RESTART returned same lineup/full HP/01:30/fresh3/defaultA2. CONTINUE retained manual Pause; EXIT returned1-1 Preview with1-2locked. No page-origin errors (extension metadata messages excluded).
- Geometry limit: mobile dimensions are covered by static CSS row-budget contracts (667×320,844×320+21pxbottom,740×360,844×390,932×430), not real-device/browser emulation. Cloud local-file probe blocked by browser URL policy; no resize capability. `scripts/team-layout-probe.mjs` remains reproducible for a normal browser. Screenshot `docs/verification/m2-layout-correction-public.jpg` is cloud desktop evidence only.
- Player acceptance: real-device smoke reported OK for the layout/filter/Restart correction. Preserve this verified UI/flow baseline unless a later change can materially affect it.
- Prototype combat pacing follow-up authorized: shared placeholder Heavy/Special/Awakening cooldowns are reduced from 5/10/15s to 3/5/10s for faster testing only. This is not a formal balance decision; future characters keep per-ability cooldown definitions.
- Existing Phaser bundle advisory unchanged; 5 prototypes contain fewer than3 of each Type, so same-type3 remains covered by future-catalog fixtures without expanding the prototype catalog.
- Prototype 3/5/10 cooldown pacing is deployed and player verified.
- **Authorized next bounded slice before M3:** `docs/M2_CRITICAL_DAMAGE_POLISH.md` — per-ability deterministic critical-hit data/resolution plus stronger normal/critical floating damage presentation. No M3 yet.
- Exact next step: Work implements only the critical/damage-number polish spec with deterministic tests, impacted regression, build/deploy, then player performs the short feedback smoke.

- Prototype cooldown deployment correction: source had already changed Heavy/Special/Awakening to 3/5/10, but Actions #252 failed 203/204 because `tests/demoBattle.test.js` still asserted 5/10/15, so Build/Pages Deploy were skipped and the public site stayed on the prior 5/10/15 bundle. Stale regression expectations were corrected in `125341ff177a539c6fee584f1bf09d1a871e3355`. Actions #253 / 36856525782: Test 204/204 PASS, Build PASS, Pages Deploy PASS. This is now the deployed prototype cooldown source.
- Player confirmed the deployed 3/5/10 prototype cooldowns are visible/working on the public build. Preserve these only as test pacing values, not formal balance.

## Historical M0 handoff
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Current slice: **final graybox closure complete**. **GREYBOX ENGINEERING PASS / iPhone FINAL PLAYER SMOKE PENDING**. No formal art work started.
- Graybox prototype baseline: implementation `64ba9652b17654d49c6b31e0df9f6222cd807121`; Actions [run #212](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36585956592) Test/Build/Pages Deploy success. The 90-second battle, cast feedback, result/Restart, protected mobile input, and immediate AI takeover remain intact.
- HUD correction checkpoint (2026-09-30): removed top enemy team-total HP; enemy E1/E2/E3 now have non-interactive right-side portrait/individual HP cards; timer is larger at top center. Both sides dim KO cards; existing ally KO selection guard/fallback remains. Card columns use compact mirrored placement above the joystick/skill zones. Only `ArenaScene` presentation and `battleHud` view data changed, plus HUD regression tests. Targeted 3/3 PASS; full local 107/107 PASS; Vite build PASS. Source commit `6e4f1e294c27f1165dd95a1885b3b4ff4d5d6d66`; Actions [run #213](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36647151726) Test/Build/Pages Deploy success.
- Public browser smoke: default shows mirrored cards, centered larger 01:30 timer, no enemy total HP; A1/A2/A3 portrait selection and enemy-card no-op observed. Individual ally/enemy HP changes during combat. In `?fixture=ko`, A2 shows dim 0/260, cannot be reselected, A1 receives selection; E3 later shows dim 0/240. VICTORY/RESTART returns to 5 countdown, all cards full HP/bright and A2 selected. Skill button showed cooldown; joystick pointer drag completed. No blocking page-origin errors (browser extension metadata error excluded). No real iPhone touch or visual acceptance was performed. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**.
- Player follow-up (2026-09-30): real iPhone screenshots showed all six portrait squares smaller than the previous 68x68 ally version, and the first row nearly touched the stage top. The previous HUD commit changed portrait size 68→58 and first row y72→32 to fit E3 above the fixed Special ring. Source commit `36b7822185608c227f07ffc9ab47fde601d526be` restores 68x68 squares on both sides and places rows at y56/148/240, with selected scale 1.08, selected top margin >18 logical px, and E3 lower edge above the Special ring. Only portrait card geometry changed; timer, HP/KO, joystick, skills, and battle are untouched. Targeted layout/HUD tests 4/4 and local Vite build PASS; Actions [run #214](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36649387516) Test/Build/Pages Deploy success. Public browser smoke: six larger mirrored cards, visible top gap and E3/Special gap, A1 portrait selection/highlight; no blocking page-origin errors. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**.
- Player follow-up (2026-09-30): six cards showed dark strips inside the portrait area. Root cause: dark backing 86px wide while the colored placeholder was only 68px, exposing 9px per side. Source commit `68a9ffe922f5c265a5c7adefde602b34a8057592` makes both the backing and colored square 84x84, centers its label, and keeps the existing card centers/row pitch, HP bar/text coordinates, KO alpha, and input unchanged. Selected portrait keeps a visible white border. Targeted HUD/layout tests 4/4 and local Vite build PASS; Actions [run #215](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36650652173) Test/Build/Pages Deploy PASS. Public default browser smoke shows A1/A2/A3 and E1/E2/E3 fully colored without inner side bars, including enlarged A1/A3 selection. Enemy card click remains no-op; ally and enemy HP text/bars stay aligned. `?fixture=ko` shows dim A2 and E2/E3 KO cards without side bars. No page-origin console/runtime error (browser extension metadata messages excluded). **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**.
- New player feedback (2026-09-30): the prior 84x84 portrait was square in data, but the HP bar painted over its bottom 18px, making the visible colored area appear flattened. Source `68f8c9012862f6f4574037f77d16e27aaac47e69` changes the portrait and backing to a 70x70 square and places a 70x14 HP bar beneath it, with a 1px gap. Existing card x/y centers and 92px row pitch remain fixed; selected scale 1.08, KO alpha, input, timer, and combat are untouched. Targeted HUD/layout tests 4/4 and local build PASS; Actions [run #216](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36652583515) Test/Build/Pages Deploy PASS. Public default page shows six complete square portraits and independent red HP bars with centered white numbers; A1 selected enlargement remains square, E1 click no-op. KO fixture shows A2 and E2/E3 dim with square portraits and separate 0/max HP bars. No page-origin runtime error. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**.
- Player confirms six portrait/HP cards, selected scale and KO state on iPhone: **PASS / PLAYER VERIFIED** for that HUD slice.
- Final graybox checkpoint 1 (2026-09-30): countdown 3→2→1 uses a fresh `PreBattleGate` on each scene start; runtime A2/E2 spawn 1.2 simulation units toward center while A1/A3/E1/E3 remain mirrored upper/lower rear. Canonical headless fixture unchanged. Tests first failed on prior 5-second/default and aligned spawn, then targeted countdown/session/projection 8/8 PASS. Source checkpoint `4d40ab0ca67e8c6566ca6cc1d19a9c7f9293b7aa`; input, camera, bounds, HUD, combat rules unchanged.
- Final graybox checkpoints 2–5 (verification of existing implementation): targeted AI/ability/session/HUD/VFX/battle-rules/targeting tests 76/76 PASS. Existing nearest-target/multi-chaser/range spacing/Basic fallback, per-actor H/S/A cooldowns, HP/KO/HUD, VFX, 90-second win/lose/draw and Restart were retained; no reimplementation or combat rebalance. Full `npm test` 110/110 PASS, `npm run check` 110/110 PASS, `npm run build` PASS. Actions [run #217](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36670386117) Test/Build/Pages Deploy success for the source checkpoint.
- Final graybox checkpoint 6 public browser smoke: default Pages showed the frozen mirrored 3→2→1 formation, full HP and 01:30 timer; after countdown AI moved freely, HP and cooldowns changed with visible Basic/H/S/A placeholder effects. A1 portrait selection worked. A full auto round ended VICTORY with enemy cards at 0/max and dimmed; Restart returned to 3, the same mirrored spawn, full HP, bright cards, A2 selected and 01:30 without page refresh. The `?fixture=ko` page showed A2 at dim 0/260 with automatic selected fallback to A1; enemy portrait click did not change selection. Joystick drag visibly displaced its thumb. No blocking page-origin console error; a Chrome extension metadata error is external to the page. Defeat, exact Draw/90-second timeout, air-cast range/no damage, immediate joystick-release handoff and per-actor cooldown independence rely on automated tests here; cloud browser drag does not establish iPhone multitouch behavior.
- Final state: **GREYBOX ENGINEERING PASS / iPhone FINAL PLAYER SMOKE PENDING**. No regression found in the tested scope. Next exact step: player completes one full round on iPhone landscape, including touch selection, joystick plus second-finger skill, KO fallback, readability and Restart; then decide whether to proceed with formal assets. Do not begin art/progression work before that player review.

## Protected mobile input baseline
Player confirmed this path works on iPhone Chrome:
- fixed 1120x540 Phaser surface (previous player-confirmed 960x540 input architecture retained);
- `Phaser.Scale.NONE`;
- outer DOM performs visual contain/positioning;
- A1/A2/A3 use Phaser GameObject `setInteractive()`;
- joystick base uses Phaser GameObject input;
- joystick movement converts pointer client coordinates through canvas `getBoundingClientRect()` back to the fixed logical stage (now 1120x540).

Do not migrate this input/display architecture again without a separate regression-safe experiment.

## Regression bisect result
Exact baseline restore recovered:
- ally selection;
- joystick drag;
- selected ally movement.

Step 1 slow runtime demo initially froze because runtime character definition IDs were changed to `ally_runtime/enemy_runtime` while `BattleSession` looked up `ally/enemy`.
That defect was fixed by preserving canonical definition IDs while changing only runtime stats.

Player then confirmed movement works again with the slower runtime fixture.

## Current runtime smoke pacing
- runtime ally move speed: 1.4;
- runtime enemy move speed: 1.2;
- increased runtime HP;
- reduced runtime attack pacing;
- canonical deterministic headless fixture remains unchanged.

## New canonical control handoff
Player judged the 1.0s grace period unnecessary.

Shared `ControlHandoff` is now:
- valid manual input overrides immediately;
- while joystick input remains active, player control is refreshed every simulation step;
- when valid player input stops, AI resumes on the **next simulation step** with **0s intentional delay**;
- selected character remains selected;
- no AUTO/MANUAL UI.

Implementation detail: timeout is 0ms and the active-input comparison is inclusive (`<=`) so the exact frame receiving player input is still owned by the player.

## Next gate
After automated tests/build/deploy PASS, player smoke:
1. select A1/A2/A3;
2. move selected ally;
3. release joystick;
4. release joystick and observe AI resume immediately;
5. confirm camera/viewport remain unchanged.

After PASS, next isolated feel change can be joystick position only.


## Zero-delay deployment correction
The first zero-delay attempts did not reach Pages because an older AI unit test still asserted the retired 2-second boundary.
Therefore player smoke performed during those failed runs was still exercising the previous successful deployment, not the intended immediate-handoff build.

The stale AI test is now updated to the canonical behavior:
- valid input instant => player override;
- immediately after input stops => AI.

## Arena sand color A (2026-09-28)
- `src/runtime/ArenaScene.js`: field rectangle fill `#8E7B5A`, center line and ellipse stroke `#5F513B`; camera/outer background remains `#253648`.
- Source commit `9b9fe641848a412e2b10e26493a73532ba4551bc` (pushed to active branch); GitHub Actions run `36436079695`: Test, Build, Pages Deploy all success. No separate local test/build repeated.
- Public preview https://hansen0318.github.io/shanhaijing-arena/ observed sand field, dark markings, and dark exterior in browser. This verifies deployed appearance only; player device/size-ratio assessment is pending.
- Exact next action: player evaluates field, actors, and empty-space proportions from the preview; then return to the separately pending joystick position/sensitivity decisions. Do not start those changes as part of the color slice.


## Arena horizontal widening — Chat implementation
Chat-side minimal implementation prepared for a wider logical stage while preserving the protected mobile input architecture.

Changes:
- logical stage width: 960 -> 1120;
- logical stage height remains 540;
- horizontal projection padding: 120 -> 200, preserving the original 720px actor projection span and adding 80px visible space on each side;
- Phaser remains Scale.NONE;
- outer DOM still performs contain/centering;
- pointer mapping still uses ARENA_STAGE.width / canvas rect width, so it follows the new logical width without an input-architecture change;
- center ellipse remains 280x170;
- simulation coordinates, battle logic, character stats, joystick logic, and AI handoff are unchanged.

Player/runtime smoke is still required after deploy; visual proportion is not pre-marked PASS.

## Arena 1120x540 widening verification (2026-09-29)
- Chat widening checkpoint `4d13321a660ea25a4cedddb96eb7a7857b4827fa`: stage/canvas/DOM width 1120, height 540, projection padding 200 (720px actor span), sand fill and center line track stage width, ellipse 280x170. No joystick/input architecture or battle logic change.
- Initial Actions run `36499677507` failed only because `tests/arenaProjection.test.js` still asserted 960 width and old projected x coordinates (59/61 pass); build/deploy skipped. Work changed only that stale test's expected width and x values in commit `23c4e759551c24d149203c2574ee0109e5921046`.
- Actions run `36500167030` for that commit: 61/61 tests PASS, Vite build PASS, Pages deploy PASS.
- Public browser smoke: stage visually wider with unchanged height, sand fill covers visible canvas, line spans the wider stage, center ellipse and actor markers preserve logical size, actor horizontal projection span remains 720 per code/test. No observed clipping, overflow, anomalous black borders, or camera shift. A1/A2/A3 selection highlight worked. Pointer drag on joystick moved selected A3 left; after release knob recentered and A3 moved right under AI. No browser pointer regression observed.
- Cloud browser pointer drag does not prove real iPhone touch. Real-device touch alignment and visual proportion remain PLAYER SMOKE PENDING. Do not label either as player verified.
- Exact next step: player opens https://hansen0318.github.io/shanhaijing-arena/ on device and checks widened field proportion and touch selection/joystick movement. No joystick position/sensitivity changes in this slice.


## Arena movement-range widening after player smoke
Player real-device smoke showed that the 1120x540 stage widened visually while the role projection/movement range still matched the old field.

Correction:
- shared simulation x bounds expand from 0..10 to -1.1..11.1;
- runtime projection uses the same -1.1..11.1 range;
- horizontal projection padding returns from 200 to 120, exposing the newly added left/right field as actual movement space;
- original spawn coordinates x=0 and x=10 remain visually near the same locations as before widening;
- all six actors share the same BattleSession arena bounds;
- AI moveToward is explicitly clamped to the same arena bounds;
- stage stays 1120x540; vertical bounds, joystick, input architecture, camera, combat stats, and zero-delay AI handoff are unchanged.

Player real-device smoke is required after deploy to verify both allies and enemies can occupy the added horizontal space.


## Arena full-width movement correction
Player real-device smoke showed the previous expanded bounds still rendered movement extremes near the horizontal line limits rather than near the visible sand-field edges.

Geometry correction:
- stage remains 1120x540;
- horizontal actor-safe screen margin becomes 32px on each side;
- shared simulation x bounds expand to approximately -2.3333333333..12.3333333333;
- mapping is chosen so the original spawn coordinates x=0 and x=10 remain at approximately screen x=200 and x=920;
- new movement extremes render at approximately screen x=32 and x=1088, allowing the actor circles to approach the sand-field edges without clipping;
- all six actors still share the same BattleSession arena bounds;
- enemy AI and ally/player movement remain governed by the same shared bounds;
- vertical range, joystick, input architecture, camera, combat logic, and zero-delay AI handoff are unchanged.

Player smoke after deploy should drag an ally to both horizontal extremes and observe enemies following into the same expanded space.


## Joystick feel / direction correction
Player reported three real-device symptoms after Arena widening:
- drag direction can disagree with the visible knob direction;
- joystick may require a second tap to acquire reliably;
- small drags feel insufficiently responsive.

Chat-side minimal correction keeps the protected input architecture:
- still Phaser GameObject setInteractive + scene pointermove/up;
- no document/canvas touch adapter;
- pointerToStage now reads TouchEvent changedTouches/touches client coordinates before falling back to mouse/pointer coordinates, avoiding double-scaling ambiguity on iPhone CSS-scaled canvas;
- visual joystick radius remains 54;
- acquisition radius increases to 76 without changing visual size;
- full input magnitude is reached at 30 logical px with dead zone 0.03;
- joystick center remains x=70, y=435 in this slice;
- AI handoff, camera, Arena bounds, battle logic, and viewport architecture unchanged.

Real-device player smoke is required for direction fidelity and acquisition feel.


## Ally tap-target tolerance
Player real-device smoke reported ally selection sometimes requires a second, more precise tap.

Minimal correction:
- ally visual marker radius remains 24;
- invisible ally selection hit radius increases to 36;
- enemy interaction remains unchanged/no-op;
- joystick, pointer mapping, camera, Arena geometry, AI handoff, and battle logic are unchanged.

Player smoke should confirm A1/A2/A3 are easier to select without noticeable ambiguous selection when allies are close.


## Player skill controls — Chat implementation
Chat implemented the first real Heavy / Special / Awakening control slice.

Combat:
- BattleSession exposes usePlayerAbility(instanceId, category) for Heavy/Special/Awakening only;
- player abilities use the existing startAbility -> resolveDirectDamage -> finishAbility pipeline;
- targeting reuses existing soft-target behavior: retain living current target, otherwise nearest living enemy;
- out-of-range, KO, invalid, or cooling abilities fail cleanly;
- cooldown remains the canonical ability slot state, not a UI-only timer.

Runtime UI:
- three circular skill buttons sit near the bottom-right edge, visually balancing the left joystick;
- Heavy and Special use 42px radius; Awakening uses 50px radius;
- current placeholders are H / S / A; final art can replace labels later without changing layout;
- ready state uses normal color;
- cooldown/disabled state dims the button/icon;
- remaining whole seconds render over the button;
- outer radial ring renders the same cooldown state's remaining fraction and disappears/shrinks with the timer;
- cooldown completion restores normal color/full ready ring;
- button state always follows the currently selected living ally.

Input:
- Phaser Scale.NONE and current protected mobile input path remain unchanged;
- activePointers is increased to 4 so joystick + skill presses can coexist for multitouch;
- no touch adapter or pointer-coordinate architecture change.

Automated player-ability tests were added for real damage/cooldown, cooldown rejection, and out-of-range rejection.

Remaining requirement after CI/deploy: real-device smoke for multitouch joystick+skill, button placement, cooldown readability, and correct selected-character binding.


## Battle start / manual skill ownership correction
Player clarified the intended control contract after first skill-button smoke:

- every round has a 5-second pre-battle countdown;
- during countdown, all six actors are frozen and no skill may be used;
- after countdown, untouched actors run fully automatic AI;
- touching/holding the selected ally's joystick establishes player ownership even if the stick vector is centered or inside the dead zone;
- while joystick is held, that ally's AI cannot auto-cast Heavy/Special/Awakening;
- skill cooldown reaching zero means READY only; while player ownership is held it must stay ready until the player presses it;
- releasing the joystick ends player ownership immediately and AI resumes full automatic movement/ability use on the next simulation step;
- each ally owns independent abilityState/cooldowns; switching A1/A2/A3 reads that ally's own slots;
- Heavy/Special/Awakening layout spacing was widened to prevent cooldown-ring overlap.

Chat added tests for joystick-hold AI suppression, independent ally cooldowns, ready-state persistence under manual control, and AI auto-cast resumption after release.


## Manual skill immediate-cast rule
Player smoke showed manual skill buttons were blocked at battle start because the shared ability start check required the target to already be inside the same range used by AI.

Canonical split:
- AI keeps the existing approach/range behavior and may only cast after entering ability range;
- player manual Heavy/Special/Awakening may cast immediately after the 5-second battle countdown if the selected ally is alive, the slot is ready, and a living target exists;
- manual cast uses the existing soft target selection but bypasses the AI range gate;
- manual cast still uses the same damage/cooldown pipeline;
- pressing a manual skill registers player input for that instant; with zero-delay handoff, AI may resume next simulation step when joystick is not held.

This is a control-rule difference, not a second combat implementation.


## Air-cast + nearest-target + continuous runtime sandbox
Player clarified the next control/testing contract:

Manual skill cast:
- after the 5-second countdown, a selected living ally may press Heavy/Special/Awakening immediately when the slot is ready;
- manual cast does not require a target and may visibly cast into empty space;
- if the nearest living target is inside the skill's real range, normal damage applies;
- if the target is outside real hit range, the skill still casts and enters cooldown but deals no remote damage;
- AI still requires range before auto-casting.

AI targeting:
- both allied and enemy AI now reevaluate the currently nearest living opponent on each decision;
- moving one side closer to a different opponent can change the target;
- this applies symmetrically to all six actors.

Runtime test sandbox:
- the public runtime fixture uses very high HP and a 24-hour maxSeconds value so the prototype does not stop during ordinary manual testing;
- canonical deterministic/headless battle rules, including the formal 90-second limit and normal HP/balance fixture, remain unchanged.


## Continuous nearest-opponent pursuit invariant
Player clarified the intended AI movement contract:

- all uncontrolled allies and all enemies continuously reevaluate the nearest living opponent;
- manual control of one allied actor must not pause AI movement for the other five actors;
- while the nearest opponent is outside usable attack range, AI must keep moving toward that opponent every simulation step;
- AI may hold position only when the nearest opponent is already inside attack range and the actor is attacking / waiting for its next attack cadence;
- if that opponent moves back outside range, pursuit resumes on the next decision;
- if another opponent becomes nearer, target switches immediately.

Regression tests now cover enemy pursuit while one ally is manually controlled, allied pursuit while another ally is manual, and resuming pursuit when a target leaves range.


## Pursuit while casting
Player device smoke showed that nearest-target retargeting existed, but movement still appeared to stop too early.

Root cause:
- AI intent was exclusive: either move OR ability.
- Entering a longer-range Heavy/Special/Awakening range produced an ability intent and suppressed movement even while still far from the opponent.

Correction:
- Basic attack range is now the pursuit stop distance for the M0 prototype.
- If the nearest opponent is outside Basic range, AI keeps moving toward it every simulation step.
- Heavy/Special/Awakening may be cast while that pursuit movement is happening.
- Once the nearest opponent is inside Basic range, AI may hold position and attack.
- If the nearest opponent changes, pursuit immediately follows the new nearest target.
- Manual joystick ownership remains unchanged; releasing returns to this pursuit behavior immediately.

This applies symmetrically to allied and enemy AI.


## Close engage-distance correction
Player smoke still showed AI failing to follow a nearby manually moved opponent.

Exact root cause:
- ranged skills had been changed to pursue while casting;
- Basic ability intents still hard-coded pursue=false;
- therefore entering Basic range (~1.8 simulation units) still stopped movement too early.

Correction:
- pursuit stop distance is now independent from all ability ranges;
- M0 uses AI_ENGAGE_DISTANCE = 0.75;
- outside 0.75, AI keeps moving toward the currently nearest living opponent even when Basic/Heavy/Special/Awakening are being used;
- inside 0.75, AI may stop and attack;
- moveToward now respects this stop distance instead of moving actor centers into each other;
- applies symmetrically to allied and enemy AI.

Regression coverage includes being inside Basic range but outside engage distance, and an enemy following a manually controlled nearest ally.


## Multi-chaser pursuit regression
Player clarified that pursuit is not one-to-one:
- one ally may be pursued by two or three enemy AI actors at the same time;
- one enemy may be pursued by two or three allied AI actors at the same time;
- there is no target reservation or exclusive pairing;
- each AI independently chooses its nearest living opponent and may share that target with teammates.

Chat added direct BattleSession regressions for two enemies simultaneously pursuing one nearest ally and two allies simultaneously pursuing one nearest enemy. If these pass but device behavior differs, investigate runtime geometry/engage-distance presentation rather than adding target reservation logic.


## Near-overlap engage distance correction
Player screenshot confirmed that the previous M0 engage distance (0.75 simulation units) stopped pursuit while actor circles were merely adjacent.

Updated rule:
- AI_ENGAGE_DISTANCE reduced from 0.75 to 0.20 simulation units;
- actors continue pursuing until their centers are visually very close / nearly overlapping;
- ability ranges remain independent and do not stop pursuit;
- multi-chaser targeting remains nonexclusive;
- applies symmetrically to allied and enemy AI.

Regression coverage now checks that the former ~edge-touch distance still pursues and only near-overlap distance permits stopping.


## Skill-driven combat spacing foundation
Basic / Heavy / Special / Awakening remain slot names only; they do not imply melee or ranged behavior.

Ability definitions now support an optional range profile:
- minRange: if a Ready skill's target is closer than this, AI retreats;
- preferredRange: desired spacing used while approaching/retreating;
- maxRange: maximum cast/hit range;
- legacy range remains an alias of maxRange for compatibility;
- legacy abilities without preferredRange retain the prior near-overlap pursuit behavior.

AI planning:
- evaluates the highest-priority Ready non-Basic skill first;
- too close for that profiled skill => retreat toward preferredRange;
- too far => approach toward preferredRange;
- inside minRange..maxRange => cast;
- after the skill enters cooldown, another Ready skill can drive spacing on following decisions;
- Basic is evaluated as the fallback using its own independent profile.

Manual player casts keep the existing air-cast behavior and are not blocked by AI spacing decisions.

The demo fixture now deliberately exercises mixed ranges:
- Basic close;
- Heavy close;
- Special medium;
- Awakening longer-range.
These are prototype fixture values, not final character balance.


## Basic fallback + prototype cooldowns
Player clarified that Basic is the unlimited automatic fallback, not a cooldown button.

Locked prototype behavior:
- Basic has no cooldown button and remains automatic/unlimited, paced only by attack cadence;
- if Heavy/Special/Awakening are all cooling down, AI must not idle;
- AI continues approaching the nearest opponent using the Basic range profile and attacks once Basic is usable;
- Heavy / Special / Awakening remain the three manual buttons in the current M0 prototype;
- prototype cooldowns are now Heavy 5s, Special 10s, Awakening 15s.

Awakening progression/unlock is not implemented in M0 yet; future progression may gate the slot without changing the combat API.


## Playable graybox integration checkpoint (2026-09-29)
- Portrait cards at upper left are the selection entry for A1/A2/A3; actor markers retain selected highlight but no longer receive selection clicks. Selected card scales 1.12 with white frame. KO cards are dim and cannot select a KO ally.
- Each card has centered white current/max HP over a red bar; upper center shows sum of enemy HP, upper right countdown timer. Both bind directly to BattleSession snapshots.
- Public runtime fixture now has finite 90-second rounds and moderate test HP, retaining the canonical headless fixture and 90-second HP% tie rule. Existing AI spacing, shared targeting, no-reservation pursuit, Basic fallback, joystick ownership, and protected 1120x540 input/viewport code remain in place.
- Shared BattleSession cast events drive distinct lightweight local/ranged placeholder Basic, Heavy, Special, Awakening feedback, including a non-damaging out-of-range manual air-cast. Result text and clickable Restart are displayed after resolution.
- Regression added for HP data, timer, finite/replayable runtime, cast events, VFX direction/range clamp including overlapping caster, countdown freeze, and future Awakening unlockTier metadata. Full local suite: 107/107 PASS; Vite build PASS. Public Pages and player device smoke still pending.

## Public Pages engineering smoke — graybox (2026-09-29)
- Source `64ba9652b17654d49c6b31e0df9f6222cd807121`, Actions run #212: Test, Build, Deploy Pages all PASS. Public URL: https://hansen0318.github.io/shanhaijing-arena/ .
- Browser observed 5→1 countdown with six actors frozen; after battle starts, all six converge and automatically cast. Portrait A1/A2/A3 selection enlarges/highlights the card; clicking an actor marker did not steal selection. Upper enemy HP and all three ally HP bars/numbers decrease; timer counts down from 01:30.
- At battle start, manual Special was pressed while enemies were far: selected cooldown displayed 10, enemy team HP stayed 720/720. Basic/Heavy/Special/Awakening placeholder effects were visible during battle. The default round reached VICTORY, and RESTART reset HP/timer and returned to 5 countdown without page reload.
- `?fixture=ko`: A2 started selected, then displayed 0/260 and dimmed; selection automatically moved to A1. Clicking A2's KO portrait left A1 selected. Joystick pointer drag still moved the knob. No blocking page-origin console error; recorded console errors came only from the browser extension.
- No real iPhone multitouch or player visual/game feel acceptance was performed. **ENGINEERING PASS / PLAYER SMOKE PENDING**. Do not claim real-device touch or visual readability PASS.

## M1 bounded correction — portrait gate / START / exit confirmation (2026-09-30)
- Portrait visual viewport uses a full-page ROTATE DEVICE gate. Campaign and Arena are hidden/inert, and a live battle pauses countdown/simulation/cooldown/VFX. Landscape resumes the same route and round with viewport remeasurement; manual Pause and Exit confirmation remain independent interruption reasons.
- Stage Preview CTA is START only. Battle X opens an EXIT BATTLE? overlay: CONTINUE restores the prior running or manually paused state; EXIT uses existing unfinished-exit route without a new completion write. Earlier CLEAR persists.
- Protected 1120×540 stage, fixed camera, joystick/skills/HUD, formation, AI and save schema. Release/browser evidence belongs to this checkpoint; real iPhone acceptance remains pending.

## Polish damage checkpoint (2026-10-01)
- AI checkpoint remote: `e83dd34b738b7dcd7561e872e9e88da32d284b56`.
- Real resolved-damage events and 1s outlined floating numbers integrated; air/invalid/KO hits excluded, rapid hits offset, same tween pause clock, shutdown cleanup.
- Damage + Pause/tween targeted tests 13/13 PASS; earlier BattleSession impacted tests PASS.
- Remaining: VS/type and integration/deploy. Exact next action: shared encounter definition lookup and VS view.

## Polish VS/type checkpoint (2026-10-01)
- Damage checkpoint remote: `30c6419e61c6de8594515af418b611fa49f8e54c`.
- VS ally/enemy placeholders; preview and battle share immutable encounter definition lookup. Power/Speed/Blast replaceable marks derive from definition type. Battle HUD geometry unchanged.
- Roster/team/VS impacted tests 26/26 PASS.
- Remaining: whole-diff review, targeted/impacted checks, build/deploy and minimum public runtime smoke. Exact next action: inspect integrated diff and verify impacted surfaces.
