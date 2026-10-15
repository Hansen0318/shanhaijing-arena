# P1 Basic runtime execution evidence

Status: **TASKS1–4 PASS / FINAL REGRESSION+RELEASE PENDING / NOT DEPLOYED**.

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
