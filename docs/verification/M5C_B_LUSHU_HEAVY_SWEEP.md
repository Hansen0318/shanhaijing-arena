# Heavy sweep readability correction — 2026-10-17 Asia/Taipei

Player09:30:13 reports target contact now visible, source sweep absent; authorizes fix and immediate deployment. Remote recovered4e766884420413f97502354b4e3328dc94d71602, feature branch/PR1 open, main untouched.

## Reproduced cause and bounded correction

Previous ActionPlayback suppressed bladeOpacity to0 for ALL reduced-motion samples, including actual release. Normal F2 was only80ms at.55 opacity, followed by140ms contact-synchronized fade. Target-contact visibility does not prove source-blade visibility. The device reduced-motion preference was not observed; no claim that the player enabled it.

Only Heavy opts into validated blade.holdAfterResolveMs260. F2 sweep is now full opacity in normal motion. After actual resolve, normal mode holds then fades over the final80ms; reduced motion displays one static sweep with no moving trail or opacity animation for260ms. Normal maximum sweep duration is80+260=340ms. Use the exact existing supplied wind PNG,345x345 coordinate size and unchanged offsets/actor scale. Independent owner/token-scoped afterglow survives action replacement, reuses live blade when available to avoid double draw, does not prolong F3 or target impact, and expires at the real resolve endpoint+260ms. Air swings show blade only; cancellation before resolve cannot create an afterglow. Owner KO, absence and scene destruction clean up. No core, AI, cooldown, input, hit range, HP or RNG changes; original280ms hit and140ms contact unchanged. Basic opt-in absent and original behavior retained.

## Verification

Six new heavySweepVisibility cases fail against prior implementation (normal alpha.55 vs1, reduced sweep absent, missing validated option), then pass. Both facings, normal/reduced, next cast, pose/contact ending independently, Pause, finite expiry, whiff/KO/destroy, Basic default and invalid metadata tested. Focused38/38 and full804/804 tests PASS. Build/asset guard PASS with existing Vite chunk warning; git diff --check PASS. Required decoded memory16748808bytes remains under16MiB. Source/public PNGs and combat code have no diff. Approved F3 A SHA256bd58b7bb4aa4758735d1ec74e65c5ca206836e39b397b6ce38fd4af02cacc5e2 unchanged. No browser/phone visual PASS or new art approval claimed.

## Release

Independent review: no Critical/Important findings;42 focused checks plus stale/cancel/duplicate ownership probes PASS. Source33a0f219ead1e8b758854aa9a2568c305952385c deployed. Actions #1033 / run38991438086 build117274483217 and deploy117274573059 SUCCESS. Public15 local/dist files match exact bytes/SHA256; M5C_B_LUSHU_HEAVY_SWEEP_PUBLIC_FINGERPRINT.json records bundles index-CC1n-uam.js, battleRuntime-B0YAtIxP.js and index-DcqtNRF0.css plus protected PNGs. Browser opened normal landing at https://hansen0318.github.io/shanhaijing-arena/?v=33a0f21 successfully; this does not verify actual attack visibility. Phone retest remains required. Main remains16f73932a0399979ba79b92f93f5ce1c1d1909b9. Existing approved playback-proof-v1 files and acceptance remain immutable. Stop after deployed correction and report link; no main merge or new skill production.
