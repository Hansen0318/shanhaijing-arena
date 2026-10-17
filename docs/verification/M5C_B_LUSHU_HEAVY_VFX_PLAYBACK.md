# Heavy VFX playback failure and evidence — 2026-10-17 Asia/Taipei

## Player report and reproduced defect

Player reports unchanged battlefield presentation: motions visible, attack effects absent. Prior source51c62ad / closure4a7615daafd67ec11c18662d36ec562a2e43e368 only established larger effect data and static/isolated checks; it is not a visual acceptance. No new size increase is attempted here.

scripts/probeHeavyVfx.mjs and captureHeavyVfxReview.mjs use the actual campaign factory (selected P1/P2/P3, enemy P2/P5/P3), normal initially-ready skills, actual280ms Heavy and0s AI resume. Immediately after Heavy resolves, AI uses Awakening then Special. The nonphased presenter path previously called clearAction, deleting pendingImpactViews before a batched paint. In a20ms sampled trace Heavy contact existed for only one sample; a .25→.35 two-step batch erased it entirely before the first paint. Earlier helpers held manual control or cooled down other skills, hiding this real sequence.

## Bounded fix

Add validated optional contact.retainOnNextCast presentation data. Only Heavy opts in. Preserve its confirmed real-hit sample/F3 through the ORIGINAL frameDurationsMs[2]=140ms window across action replacement/cancellation; fade against simulation time, freeze repeated Pause paints, retain one late first paint and clear on KO/destroy. No source art, PNG bytes, actor scale, damage, RNG, HP, cooldown3,280ms windup, hit range, input or AI commitment changed. No invented contact on empty swings. Existing Basic data/policy remains unchanged.

Tradeoff: Heavy F3 visual priority can cover the next Basic's early anticipation frames until the original140ms endpoint; Basic simulation and damage continue on schedule. This is not a guarantee that all subsequent poses are visible.

## Evidence actually obtained

- Four new heavyVfxContinuity cases failed against the old presenter, then passed. Covers actual campaign AI chaining before one paint,140ms lifetime/expiration, reduced motion, Pause, KO/destruction and opt-in validation/Basic default.
- Full798/798, build/asset guard68files3749260bytes and git diff --check PASS. Existing Vite chunk warning remains. All-five required decoded16748808bytes remains within16MiB. Approved F3 A SHA remains bd58b7bb4aa4758735d1ec74e65c5ca206836e39b397b6ce38fd4af02cacc5e2. Runtime PNG/source masters unchanged.
- Independent reviewer: no Critical/Important findings;48 focused tests and additional stale/cancel/later-hit probes passed. Reviewer identified the recorded visual-priority tradeoff.
- playback-proof-v1/manifest.json: supplied original effects board, composite-only normal+slow, character-only/VFX-only/composite normal+slow with both facings, actual AI release before/after GIF, before/current traces and hashes. Each GIF decoded pixel-for-pixel against quantized input at every timeline point; no disposal/ghosting mismatch. Heavy contact samples1→7 at20ms, with identical core events/damage/positions.
- These GIFs rasterize REAL production simulation/presenter commands through a doubled external Phaser boundary. They are NOT browser/screen recordings; later skills' generic procedural graphics are not rasterized. Isolated rows deliberately hold manual control, while the before/after releases to real AI.
- Public game opened through cloud browser and selected actual P1/P2/P3; observed battlefield/countdown, no page TypeError. This cloud session did not advance the countdown normally, even after waiting and Pause/Resume, so it cannot establish live attack/VFX visibility. No browser/phone PASS is claimed. Player's device report remains authoritative.

## Release and remaining gate

Source f391491a1b85d4f5cdcfa1c5629b0615505c01ac is deployed. Actions #1032 / run38989980988: build117269993007 and deploy117270107611 SUCCESS, including Test/Build steps. Public15 local/dist files match exact bytes and SHA256; details M5C_B_LUSHU_HEAVY_VFX_PLAYBACK_PUBLIC_FINGERPRINT.json. Current bundles index-_IpubPvB.js, battleRuntime-BGvMlBLQ.js, index-DcqtNRF0.css. Main remains16f73932a0399979ba79b92f93f5ce1c1d1909b9; no merge performed. GIFs were shown directly in chat; browser/phone attack visibility remains unverified. Deliver the explicit GIF evidence and corrected build, then ask for only Heavy left/right empty sweep and real-target impact visibility. If the phone still shows no VFX, preserve FAIL status and capture the actual device/game sequence rather than attempting another speculative size change. No main merge, new art or Special/Awakening production.
