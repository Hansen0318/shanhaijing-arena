# P1 Special 迴蹄 — runtime integration

Status: DEPLOYED / ENGINEERING PASS / PLAYER PHONE PENDING.

## Authorization and contract

2026-10-17T14:22:27+08:00 accepted four poses, normal/slow/character-only GIFs and independent VFX, authorizing scoped deployment. At14:45:48 player explicitly accepted proposed REAL320ms startup:「好，我確認， 繼續，並紀錄進度和流程 如果要整合到硬規則相關資料，就整合」. Binding receipt: approved/lushu/special/review-v2/acceptance.json. Previous timing-pending preflight is historical. Do not regenerate approved art or request the same approvals again.

Shared ability schema accepts Special windup; P1 data opts into320ms, using existing pendingActions. No BattleSession character branch. Real displacement, single HP/RNG hit, F3, damage number, target contact and Tier post_cast effects use the same resolve actionId. No early movement/HP/RNG. Cooldown starts on cast; T0 CD6, displacement.65, coefficient1.3 preserved. Existing Tiers retain cooldown6/5.52/5.04/4.32 and displacement.65/.689/.728/.78; all windups320ms. Basic180/Heavy280 and accepted originals unchanged. Whiff spends cooldown and shows source sweep without fabricated target impact; interrupt/KO/clear remove pending hit. No extra hits/AoE/DoT or hitbox changes.

## Assets and presentation

Reproduce `python scripts/prepareLushuSpecialRuntime.py`. Runtime-v1/runtime-manifest.json records source hashes, alpha bounds, dimensions, transforms and output hashes. Four approved640x480 review cells use transparent-only crop then uniform.2 scale into80x80 cells, at least4px alpha margins. Independent source96x80 and impact112x72 PNGs; no runtime GIF. Common skull-based actor scale, fixed ground family. Actual effect display336x280 and350x245 exceeds Heavy actual240x240 and255x170; authored coordinate sizes differ and must not be compared directly. Golden rotational sweep and shell burst preserve accepted design.

All five required art including Basic/Heavy/Special totals16,775,432 bytes against unchanged16,777,216 cap (1784 headroom). To fit, only P1 Move/KO outer fully transparent rows are removed. Full width and every visible pixel remain; Move96x91 scale1.5 and adjusted origin reproduce old96x128 scale2 world positions exactly, KO512x472 adjusts top10px origin. Originals immutable. Further assets need another proven residency solution; headroom is not sufficient for arbitrary additions.

Independent review found Special noncentral origin. Test reproduced left52.2px drift (2 failed of10), then shared authored-action flip-aware origin fixed it. Existing non-action origin policy remains intact, including P5 KO. Exact mirrored support alignment is asserted against real presenter output.

## Verification

- New windup test initially RED; final specialWindup11, specialActionIntegration10 and lushuSpecialAssets3 cases PASS.
- Full `npm test`:828/828 PASS; `npm run build`:PASS, asset guard71files/3,799,939 bytes.
- Existing tests updated for real resolve timing and runtime crop dimensions, retaining original-source hashes, world geometry, bounds, full cache/scene lifecycle and Tier behavior assertions. Heavy cancellation now verifies pending Special resolves once after its own320ms.
- Independent final review: no remaining Critical/Important; focused13/13 PASS.
- `node scripts/captureLushuSpecialRuntime.mjs` then `python scripts/renderLushuSpecialRuntime.py`: real production simulation/presenter commands reconstructed and visually inspected right/left and reduced motion. Source/target layers visible, no panel clipping, support mirrored. This is NOT browser recording or phone acceptance.
- Runtime evidence: docs/art/candidates/lushu/special/runtime-v1/{runtime-manifest.json,presenter-trace.json,contact-proof.png}.

## Release and stop

Push only feat/m0-combat-core-20260927 / PR#1; require Actions test/build/deploy and exact public fingerprint. Record source SHA/run/jobs/public files after success. Then player owns phone review of Special right/left, visibly distinct larger sweep and real-target burst,320ms synchronization, empty swing, actor size and return to Idle/Basic. Engineering evidence is not device PASS. No Awakening/other-character work or main merge.

## Release evidence — 2026-10-17T14:59+08:00

Source67c45ebb5e09fe0e70d3d271bc2c1b0322a50dc6, tree3f9862db513d541ec883bf3f299aff537a49f03f. Authorized GitHub connector publication recreated the exact local tree (local checkpointf890c42); native push lacked credentials, no credential extraction or force push. Readback PR#1 remains OPEN/unmerged, correct branch/head.

Actions#1034 https://github.com/Hansen0318/shanhaijing-arena/actions/runs/39011872100: Test/Build job117335937679 and Pages job117336027166 SUCCESS. Public HTTP16files match local build bytes/SHA256: runtime-v1/PUBLIC_FINGERPRINT.json. Bundles index-8JGZpf69.js / battleRuntime-Bb3b-o-u.js / index-DcqtNRF0.css. This closure is documentation only and skips duplicate CI.

Player phone review URL: https://hansen0318.github.io/shanhaijing-arena/?v=67c45eb . Check left/right source sweep + actual-target burst, clear Special-vs-Heavy distinction,320ms contact/HP synchronization, empty swing, unchanged body scale and return to Idle/Basic. Phone outcome remains UNVERIFIED. No main merge or next-skill production.
