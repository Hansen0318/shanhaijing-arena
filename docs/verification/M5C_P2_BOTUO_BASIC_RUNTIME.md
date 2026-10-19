# P2 猼訑 Basic「角擊」— ENGINEERING PASS / NOT DEPLOYED

## 2026-10-19 — Basic body-scale correction ENGINEERING PASS / NOT DEPLOYED

Heavy F3 is PLAYER ART APPROVED; receipt docs/art/approved/botuo/heavy/f3-v1/acceptance.json and approval/priority remote07a51545853796a0cf69e52cecfd1bf835d99344. Continue to protect it; do not repeat F3 review. Player-reported Basic shrinking took priority over remaining Heavy art.

Root: accepted action review used20px skull span without matching accepted Idle22.5px world landmark. Explicit opt-in shared data calibration now matches22.5px, keeps foot−16.2px and both-facing support, and preserves independent source/contact world size/position/timing. No regenerated source/GIF/receipt, no combat/CD/250ms/Tier/collision change. Other four character definitions and P2 Idle/Move/KO/stats deep-equal baseline. Future actions must calibrate stable body landmarks in actual renderer units before runtime, never infer size from frame dimensions or fit crouched height to Idle. Full workflow lesson and evidence: docs/verification/M5C_P2_BOTUO_BASIC_BODY_SCALE_FIX.md.

RED4/4 reproduced density defect; GREEN4/4; affected67/67 PASS, Build/guard81/81 PASS; six residency cases39keys/16,630,060bytes +131,072reserve retained. Static descriptor comparison inspected, not gameplay capture. Updated real Chromium checker NOT RUN here (executable absent); old browser/phone acceptance is not size-fix evidence. **FIX IMPLEMENTED / ENGINEERING CHECKS PASS / NOT DEPLOYED / PLAYER SIZE FIX REVIEW PENDING.** Current publicdb451cd unchanged. Next: scoped real-browser verification/release authorization, deploy/fingerprint then targeted size review before Heavy continuation. No full P1 rerun/new art/P3/main merge or accidental art/docs deployment; [skip ci]. Latest checkpoint is containing feature commit, fetch again. Current successor docs/handoffs/P2_BOTUO_BASIC_SCALE_NEXT_WORK.md; all successor instructions one complete copyable block.

Recovered d40abb0e4b19a7b6471387934167df6b95334194; feature branch feat/m0-combat-core-20260927, PR1 open/unmerged. Main remains16f73932a0399979ba79b92f93f5ce1c1d1909b9. Packing checkpoint2f1de8669d183653dcf0ab4f75bc92489266a02c; final integration checkpoint is the containing feature commit, fetch latest.

| Gate | Status |
| --- | --- |
| Four poses, F2 v2, independent VFX, normal/slow GIF | PLAYER ART APPROVED — composite-v1 receipt unchanged |
| Fixed250ms true windup T0–T3 | PLAYER EXECUTABLE CONTRACT APPROVED — executable-v1 receipt unchanged |
| Packing, integration, affected tests/build | ENGINEERING PASS |
| Deployment/public fingerprint/phone | NOT DEPLOYED / NOT PLAYER VERIFIED |

P1 remains COMPLETE by existing evidence; ordinary Hit CANCELLED. No Heavy/P3/new content, repeated player approval or regeneration. Existing deployed8e2f5e0 is prior evidence only, not freshly checked or replaced. All checkpoints use [skip ci].

## Shared integration

P2 opts in through ability/catalog data only; engine/presenter have no character-ID branch. Existing windup machinery owns locked original target, actual250ms due time, projected-range recheck and one real resolve. No engine clock, coefficient/range/crit/Tier/cadence/displacement edits. Cadence charges at start, no refund on KO/control/new-skill cancel. Ordinary damage and engine movement continue.

Normal F1/F2/F3/F4=160/90/160/160ms. F3 starts at real resolve, F4 after160ms, current Idle/Move after recovery. Reduced motion follows existing static preparation/contact policy and returns after F3; no F3 extension or damage delay. Generic blade.startMs160 enables a static reduced release cue; holdAfterResolveMs200 ends source at resolve+200. Generic contact.durationMs200 creates independent, confirmed target-attached effects without the legacy body-retaining pendingImpactViews. P1 defaults stay absent/unchanged; directly affected default regressions pass.

HP, damage/critical text and contact share real event/action identity. Miss causes no HP/contact/RNG/retarget. Confirmed contact survives next cast without taking over body. Lethal actual hit retains valid feedback on KO target for its finite window; source KO clears immediately. Existing late-first-paint one-cue policy remains presentation only, never replaying HP. Pause repeats the same clock and freezes sampling. Shutdown/destroy/Restart cleanup is exercised through directly affected existing lifecycle tests.

## Source fidelity and geometry

Reproduce python scripts/prepareBotuoBasicRuntime.py. Four158×143 cells preserve every accepted safe-cell RGBA pixel, with no additional pose downsample. F2 binds to release-master-v2; rejected v1 unused. Origin35/158,142.2/143 retains visible foot at actorY−16.2px, skull density20px and both-facing noncentral pivot. Independent FX retain exact accepted180×134/142×126 full-canvas review resize, then remove only zero-RGBA edges to146×114/105×115 with compensated offsets.

Seven legacy animation derivatives remove only proven empty per-frame outer rows; two-row P5 Move packs rows per frame, preserving order, density, pivots and scale. One P1 C-source effect removes blank outer rows, retaining original rows36..62 and compensating effect coordinates; no art/timing redesign. Originals, GIFs and receipts retained. P2_BASIC_PACKING_INPUTS.json + P2_BASIC_RUNTIME_ASSETS.json bind source hashes and metadata. tests/botuoBasicPacking.test.js proves exact RGBA reconstruction and both-facing world placement. Existing approved-original hash assertions remain; only runtime derivative metadata/frame and measured-set totals changed.

## Complete required residency

| Measurement | Bytes |
| --- | ---: |
| Old preflight baseline | 16,552,840 |
| Lossless savings | −399,160 |
| New accepted-density pack | +476,380 |
| Actual required scene/cache | **16,630,060** |
| Hard limit | 16,777,216 |
| Headroom | 147,156 |
| Preserved optional reserve | 131,072 |
| Extra above reserve | **16,084** |

node scripts/verifyBotuoBasicResidency.mjs measures two load orders ×3 cold/warm/Restart scenes. All39 required keys remain in cache/scene, zero failure/eviction, reservations and scene/cache peaks under unchanged cap, destroy zero. PNG headers are real; decoder/draw boundary doubles are not GPU/FPS/device measurements. No PLANNING texture, budget increase or silent required-art eviction.

## Actual verification

220/220 PASS across30 directly affected files; exact command, source/build SHA256 and limitations in M5C_P2_BOTUO_BASIC_RUNTIME.json. Full output P2_BASIC_RUNTIME_TESTS.txt; new P2 runtime34 + packing3 tests. Covers T0–3, eight actual AI decision cases (tactical on/off ×ally/enemy ×both facings), actual player skill API cancel, real status control, ordinary damage/KO/escape/locked target, actual Arena critical-number event bridge, repeat cadence, normal/reduced/mirror/Pause, independent contact after F3/next skill, Idle/Move return, Restart/shutdown/destroy/readiness/cache/schema and source pixels. Arena bridge runs in VM, not browser; old direct-call preflight is not relabeled as actual AI.

npm run build PASS; asset guard81files/4,083,312 encoded bytes. P2_BASIC_RUNTIME_BUILD.txt records existing Vite chunk-size/npm environment advisories; dependencies/config unchanged. git diff --check PASS. Independent read-only reviewer found0 Critical/Important; pending packing-report label corrected. Scoped shared-module regressions only, no full P1 or whole-project suite replay.

CLI push lacked credentials. Connected GitHub published exact checked blobs/tree using non-force same-branch updates. Local packing a88a39e and canonical2f1de86 have identical trees. No replacement branch or lost user modification.

## Stop and next gate

This Work is complete for packaging/integration/necessary verification/build only. STOP, await explicit scoped release authorization. Future release performs only required bounded render/browser gate, feature-branch Pages deployment/public index/JS/CSS/new runtime PNG fingerprints, then targeted P2 phone acceptance. Do not deploy a docs-only checkpoint, merge main, reopen visual/GIF/250ms gates, repeat full P1 or start Heavy/P3.
