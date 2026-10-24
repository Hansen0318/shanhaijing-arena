# P3 赤鱬 Awakening 潤澤 — Engineering PASS / DEPLOYED / PLAYER GAME REVIEW PENDING

Release `f886207aeaba1f12f6598ffc8fc54b03c8c46646` on `feat/m0-combat-core-20260927`; PR1 remains open/unmerged. Normal Pages [40088794102](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/40088794102), build120857037423/deploy120857587430 SUCCESS. Independent P1 [40088794098](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/40088794098) and P2 [40088794115](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/40088794115) SUCCESS at the same release SHA.

## Implemented contract

Generic reselect-allies now supports delayed team_ally utility. Both modes settle once at600ms for then-living same-team recipients including self, using each recipient's current maxHp×16/20/24/30%, capped at missingHP, no old healing scale/revive/crit. Existing CD14/12.88/11.76/10.08s retained. T2 rear-band2.0–4.2 adds5%; Special-only low-HP10% stays Special-only. AI requires at least2 living recipients HP≤80%. Unresolved effects cancel on sourceKO/control/end/new ability without CD refund; ordinary movement remains legal.

T3 protection settles at600ms independently of positive healing, within radius20:10.8% mitigation for2.5s. Shared MAX and per-source expiry preserved. Real status provenance selects water membranes, including full-health protected recipients; no fabricated healing blossom. No actor-ID branch.

Accepted F1/F2/F3/F4=360/240/300/300ms,1200ms returns original staticIdle. True positive-recipient events own individual springs; real statuses own membrane lifetime after Idle. Source water-crown/fan uses separately loaded art, no body enlargement/baked FX. Shared320×260/chestX158/hoverY203 anatomy normalized .13 and .9 display density retained; reversible common empty-padding crop[60,40,224,216], packed164×176 cells, pivot[98,163], right canonical/left mirror. Four new rasters445803 encoded/1318624 decoded bytes; all-five required64 textures22583244 decoded bytes, no fixed total ceiling. Existing two downloads/required readiness/ownership/release/retry retained.

## Verification and original evidence

- Full suite1198/1198, Build and106-file asset guard PASS. Source guard664 files PASS.
- Anonymous mechanics cover T0–T3/two modes599/600ms, current maxHp, missingHP cap/fullHP, living/team settlement, T2 band boundaries, T3 radius/MAX/independent expiry, cancellation/CD, movement/coarse steps, dual sources, AI and schema.
- Actual real Chromium Phaser/WebGL: Awakening native32/built4 PASS at94b0d6a (run40087764606); left/right, normal/reduced, exact timing, positive recipients, full-health protection-only, real status expiry after Idle, movement/Pause/cancel/KO/end/Restart/destroy and phone-landscape Collection. Not static mock or logic-only proof; physicalPhone=false.
- Same run Special/Heavy clarity/Basic each native32/built4 PASS; P1 native16/built8 PASS. Only P2 old inventory expectation64≠60 failed before cases; Pages correctly skipped. Failure retained p2-first-failure.json; repaired only driver inventory.
- Release reuses completed P3 Browser groups only through exact complete input/hash and raw report gates: special289 inputs/6 reports, awakening287 inputs/2 reports, recorded browser/reuse-proof.json. All src/public/package/lock/index/vite and relevant unchanged drivers/imported validators match. Any change/missing input runs fresh Chromium. Negative tests reject source/report/key-set alteration. This is byte-identical product evidence reuse, not an omitted gate or a claim that tests were rerun on a docs-only head.
- Release runs P1 native16/built8 and P2 native4/built2 freshly; separate P1/P2 workflows also SUCCESS. Original failed-run full screenshots: artifacts12557947601 and12558141351 in run40087764606; archive SHA256 and ZIP CRC verified. Raw P3 reports are committed. Existing Special archived screenshots are not relabeled as new captures. Author visually inspected actual nativeT3, built-left action and built-phone Collection captures.
- Normal release artifacts github-pages12557608387 and chiru-awakening-evidence12557309499 have exact SHA256/ZIP CRC PASS (release.json). CI tar and local164 files match every byte (ci-build-inventory.json). All public164 files freshly downloaded,164/164 bytes/SHA256 match (public-fingerprints.json). P1/P2/raw status proof is in the release workflow artifact. Full screenshots stay available in checksum-bound original workflow archives; fetch those by artifact ID before restoring local screenshot-dependent evidence guards.
- All approved masters/receipts and P1/P2/Basic/Heavy/Special art/scale/anchors remain unchanged. Collection describes actual implemented gameplay; Passive remains unopened. Author-only self-review, no delegated or independent reviewer claimed.

## Player test / stop

Game: https://hansen0318.github.io/shanhaijing-arena/?awakening=f886207
Isolated Lab: https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&awakening=f886207

Landscape → LOW HP → Ally Tier T3 → START → select 赤鱬 portrait → A. Observe crown/fan, individual positive-heal springs, body returning to Idle and membranes remaining until real protection expiry. T0–T2 have no T3 membrane; full-health T3 can protect without springs.

Engineering PASS / Pages DEPLOYED / player game approval PENDING. No Runtime acceptance created; no Passive started; no physical-device/FPS/all-tier player testing claimed. Next action: present this exact release and wait for player approval/correction. Do not redo approved art or restart integration.
