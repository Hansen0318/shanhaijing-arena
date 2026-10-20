# P2 residual actor-scale investigation — executable evidence

Status: OPEN FIELD DEFECT / NOT PLAYER VERIFIED. Heavy remains paused.

## Recovery and release provenance

- Recovery HEAD: `2f538d5cacb85c0779b72373eb19985973371745`; feature branch `feat/m0-combat-core-20260927`, PR1 open/unmerged. Initial tree clean.
- Existing static correction is already deployed from `2d83ef6c2a753a77a92b2c2379dace4663866dee`: Actions [39247774008](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/39247774008), build118043815756 and deploy118044737486 SUCCESS. Earlier pending-deployment notes are historical.
- Public target: https://hansen0318.github.io/shanhaijing-arena/?v=2d83ef6 . Actual homepage→Chapter1→Team(P2/P1/P3)→battle→Exit→stage-preview observed in cloud browser. This does not establish sustained touch/FPS or iOS actor geometry.
- Downloaded actual CI Pages artifact12183069507. All104 local built files equal CI bytes. Public index + JS/CSS +11 prior runtime PNGs +canonical Botuo Idle =16 complete files byte-exact equal local/CI SHA256. See `P2_STATIC_SCALE/public-fingerprint.json`. No proxy BLOCKED result in this run.
- The release SHA actually loaded in the player's earlier phone report was not supplied: **資料不足，無法確認**. Public current-byte verification does not prove which code that earlier tab had loaded.
- This work changes diagnostic scripts/evidence only. No production source, approved art, VFX, combat, timing, KO descriptors, cache cap or reserve changes. No replacement branch/main merge, and no new Pages deployment.

## Existing root cause and correction, reused

The established earlier defect was binding Idle to the smaller strip F1 instead of the originally approved static PNG, together with differing authored densities. The corrected static binding is exact SHA256 `27c65e3f1633f4e5959e62b2fbb72df7bf47e6e8324425af24943b53d8a0d2b8`. The static correction and its prior RED→GREEN evidence are reused, not reimplemented.

Current expected source geometry (world units, not silhouette heights):

| State | Frame | Display canvas | Authored facial span | Ground offset |
|---|---|---|---|---|
| Idle |160×160|144×144|25×0.9=22.5|0|
| Move |160×155|112.5×108.984375|32×0.703125=22.5|0|
| Basic |158×143|177.75×160.875|20×1.125=22.5|0|

Before the existing correction, retired Idle F1 did not match the original static body; Move used28.8-world facial span and Basic ground was−16.2. Current canvas sizes intentionally differ because source drawings and poses differ. Matching one author-selected facial span is not an independent proof that torso, bracer/equipment or every limb has identical authored proportions. No arbitrary silhouette-height fitting or speculative new scale patch was applied.

## Diagnostic method

`scripts/checkActorScaleBrowser.mjs` launches Vite preview of the actual `dist` entry. It exposes an existing Arena scene only by replacing one marker in the compiled-runtime **test response**; checked-in/deployed built files are unchanged. It navigates actual campaign buttons, stage selection, three owned starter cards and battle/countdown. Existing `campaignDev=unlock-all` unlocks stages1-1/1-3 in disposable profiles so all five characters are present, not a different Arena fixture. P4/P5 are inspected as enemy actors.

After Pause through the actual UI, positions/ability availability/time are controlled for reproducibility. Basic executes through the real session; retreat uses `holdPlayerControl`/`setPlayerMovement`, forty50ms steps, and records actual distance>2 arena units (outside P2 Basic1.4 range). It is not evidence of joystick/touch ergonomics or unrestricted AI play. Both signs and normal/reduced motion are sampled. P1 completed Heavy/Special/Awakening are not replayed or modified; prior accepted raster evidence remains in force for unchanged source.

Each sample records actor/catalog identity, animation state, texture/frame/source dimensions, region, display size, scale, origin, parent, full world transform, authoritative/projected position and facing. P2 also records the existing authored face and foot calibration. All characters are checked against their own descriptors, not equal roster sizes. This checks transform restoration and selected source contracts; it cannot independently validate arbitrary anatomy from the same descriptor values.

Real `CharacterState.damage()` drives KO after living-state studies. The probe checks actual KO source/state, frozen geometry, actual canvas result RETRY, in-battle Restart/Exit and old-presenter zero-byte cleanup. Existing real-browser Game.destroy evidence and affected unit regressions are reused; this new probe does not claim to rerun direct Game.destroy or physical iOS.

## Test development history (do not promote partial runs)

- `cc5c7d3` /39345419728: first4-case trace passed912 samples; review found its attempted assignment to getter-only hp did not create KO. Living-state traces are informative; **KO assertion was invalid and is not acceptance evidence**.
- `8a97142` /39345908918: actual damage correctly opened result UI. Test then waited for in-battle Exit, which is correctly hidden at result; timeout in script, subsequently superseded/cancelled. This was a harness navigation error, not a production scale or result-UI defect. Logs independently read.
- `f8c82a9` /39346143324: uses actual result RETRY before in-battle Restart/Exit; superseded/cancelled by the final retreat probe. Do not claim its overall success from partial artifacts.
- Final probe adds real input-system retreat beyond P2 melee range rather than a small artificial position nudge. Final measured outcomes are recorded below only after artifact inspection.

## Verification boundaries

Fresh local115/115 affected tests PASS; `npm run build` PASS; Asset Guard81files PASS. Full suite was not rerun: the five preexisting failures documented in `P2_STATIC_SCALE_FIX.md` remain historical/open, not silently fixed or claimed green. Prior published cache evidence39required keys16,639,660bytes plus131,072reserve is retained;16MiB cap unchanged.

No new production failure was reproduced from the measured fields so far. In particular, a passing transform probe is not a declaration that the player-reported visual proportion defect is fixed. Full facial/trunk/equipment/limb proportions and physical phone conditions remain separate from descriptor equality. Do not mark PLAYER VERIFIED or resume Heavy from this engineering report. If the phone still shows growth/shrink at this exact release, next isolate the time-aligned frame and at least face/trunk/bracer/foot landmarks against the static source; do not guess a uniform multiplier or regenerate approved art.

## Final measured outcome

Final diagnostic source `403176fb5a864fde538c4f8a916d8be99d68e247`; Actions [39346391924](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/39346391924), build118380181357 **SUCCESS**, deploy118381262712 **SKIPPED**. Artifact12231516514 ZIP SHA256 `3068fc4ea6786eccb304f438dcf2ccf272ca36e5e370ca576d18e81451c29aa9` independently matched downloaded archive. Actor JSON **PASS**,4cases,32actor-sequences,880samples,24actual KO actors; no page errors. Minimum measured retreat3.4775 arena units, well outside P2 Basic1.4. Four real result-Retry and four in-battle-Restart cleanup checks each report old presenter closed/0bytes; all four actual Exit routes return to preview. Normal/reduced ×both directions included. Full trace retained compressed with SHA256 in `P2_STATIC_SCALE/executable-summary.json`; selected unscaled actual raster crops in `P2_STATIC_SCALE/p2-built-continuity.png`.

| Character | New measured scope | Result and limit |
|---|---|---|
| P1 鹿蜀 |Idle/Move/Basic/return/retreat, actual KO, mirror/reduced/restart|No residual actor/parent scale found. Protected completed Heavy/Special/Awakening use existing unchanged engineering/player evidence; no reimplementation or new art review.|
| P2 猼訑 |Original Idle/Move/Basic/return/retreat, non-action casts, actual KO, mirror/reduced/restart|Idle-before/Idle-away exact texture144×144/origin equality; face22.5 and foot0 under existing authored convention in all applicable samples. No additional post-action multiplier found. Full body visual/phone defect remains OPEN.|
| P3 赤鱬 |Idle/Move/non-action attacks/return/retreat/KO/mirror/reduced/restart|Body returns to own static descriptor; no residual inherited scale. No newly authored attack-body animation exists to approve.|
| P4 九尾狐 |Same shared scope, in enemy team of real1-3|No residual scale; own descriptors retained. Golden art/KO unchanged.|
| P5 狌狌 |Same shared scope, in enemy team of real1-1|No residual scale; own descriptors retained. No same-size normalization across roster.|

This reproduces the intended source/state changes, **not an extra lasting actor multiplier** in this tested build. It does not establish that the reported phone appearance is corrected. Root of any remaining *subjective or physical-device* discrepancy is **資料不足，無法確認**; no speculative production correction, new RED regression, art edit or release was manufactured. Prior static-fix RED→GREEN remains the existing correction evidence. Test/diagnostic pass is deliberately separate from field-defect closure.

**NEXT / STOP:** provide the exact tested release URL for scoped P2 phone review: approach→Basic→return→move clearly away→stop. Keep Heavy paused and FIELD DEFECT OPEN until explicit player confirmation. If it still fails at this release, capture those time-aligned rendered frames and compare face/trunk/bracer/limb/foot landmarks together; single-canvas or single-face equality cannot close that anatomy question. Do not repeat approved art/P1/full-suite/deployment without a new supported delta. No main merge.
