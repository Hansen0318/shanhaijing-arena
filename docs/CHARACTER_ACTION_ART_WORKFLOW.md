# Character action art, VFX and animation review workflow

Status: **PLAYER-APPROVED PROCESS / FIRST P1 SLICE VALIDATION PENDING — 2026-10-15**.

The player explicitly approved this sequence after reviewing its explanation: key contact pose → four poses → composite GIF with independent effects → player approval → shared runtime integration/tests/deploy → iPhone acceptance. This approves the **process**, not any generated image, VFX design, runtime change or claim that the method is already production-proven. First implementation is P1 Lushu Basic only. Broader-character reuse follows successful validation or explicit player direction.

## 1. Recover before acting

Read current GitHub branch/PR/HEAD, AGENTS, DEVELOPMENT_PLAYBOOK, PROJECT_BOUNDARIES, CURRENT HANDOFF POINTER, docs/STATE, accepted character presentation and the relevant action spec/data. GitHub is authoritative; do not reconstruct identity from conversation. Keep feature branch feat/m0-combat-core-20260927 / PR#1; never merge main without explicit approval.

Identify exact approved art paths and hashes before editing. For current Lushu only identity sources are public/assets/characters/lushu/identity.png and battleIdle-4f.png. Prior rejected drafts are not identity references. A generated candidate is not automatically an approved reference.

## 2. Pose review gates

1. **F3 contact key pose first**: one complete transparent figure. Preserve approved head/face/antlers, body proportions, clothing/colors, markings, tail and the exact compact weapon/equipment. Articulate joints/torso/legs for a real grounded attack; do not substitute whole-sprite wobble. Inspect, show to player and **wait for explicit identity/weapon/pose acceptance** before extending to remaining poses.
2. **F1/F2/F4**: author individual complete poses from the approved identity and accepted F3 visual solution. F1 anticipation/load, F2 clearly intermediate strike, F3 contact/follow-through, F4 recovery/return. Check each against the same source; preserve scale and ground family. Show full four-pose sequence for player review. Do not classify four similar idle positions as attack animation.
3. Keep each candidate's revision/hash/status. Do not guarantee generated edits lock original pixels; actual segmentation/layered editing requires real layer extraction and occlusion/joint repair. If image identity is wrong, correct the affected pose before packing or VFX.

## 3. Character and VFX are separate assets

Author the character without baked-in slash light/particles. Blade arc/trail and contact flash/shards are separate transparent effects with independent origin/attachment, lifetime, scale and layers. The player requests visually elaborate effects; exact shape/color/strength still needs review. Effects must retain character/HUD/ally-enemy readability and reflect the actual weapon/ability.

Four character key poses do not force VFX to four frames. Add a needed character in-between only after preview evidence and art review, not by inventing interpolated anatomy. Reduced-motion behavior must be considered before integration. No new damage, extra hits, projectiles or attack range may be inferred from visual effects.

## 4. Deterministic packaging of accepted art

After pose acceptance, retain exact accepted source PNGs. Extract each entire silhouette, remove neighboring fragments or unintended background without erasing character colors, then place on equal transparent cells with one uniform scale policy and common anchor/ground family. Preserve weapon tips, antlers, tail, hands and feet. Inspect alpha, all cell bounds and light/dark backgrounds. Do not simply slice arbitrary four-up collages.

**Do not regenerate approved art to fix packing.** Use reproducible layout/crop/padding operations on the accepted pixels. This is packaging, not permission for new poses or character redesign. No frame may contain neighboring-frame bleed or clipped anatomy/equipment.

## 5. GIF approval BEFORE runtime integration/deployment

Create a composite GIF/animation preview from the safely packed accepted character poses and independent VFX. Give the player a readable attack sequence, checking windup/strike/contact/recovery, weapon continuity, ground, tail, left/right presentation and ending back in the correct Idle/Move pose. Assign frame timing for the preview and label it preview timing, not an approved combat-timing change.

**WAIT for explicit player GIF acceptance before integrating or deploying.** Earlier identity/static/locomotion/KO approval and a process approval are not GIF approval. If player requests correction, preserve accepted work and correct only the affected pose/effect/timing. The game consumes PNG/frame metadata and shared engine playback; GIF is a review artifact.

## 6. Future engineering gate

After approved GIF and explicitly scoped engineering authorization: implement data-driven shared action/VFX playback, match actual cast/hit events without shifting damage or cadence to fit the preview, preserve movement/gameplay/AI/Tier/rewards, protect KO/interruptions/pause/mirroring/reduced motion/return-to-Idle-or-Move, and use shared dynamic residency. Run appropriate checks, build/CI/Pages/public fingerprint, then stop for player iPhone acceptance. Never treat a nice GIF as proof of actual event sync or phone readability.

## 7. Durable handoff contract

No need for the player to re-upload our own retained materials. Save candidate/accepted versions to distinct GitHub art paths; never overwrite approved/runtime art with a candidate. Keep source PNGs, each accepted frame, normalized sheet, independent VFX, composite GIF, manifest/checksums, frame geometry/anchors/preview timing, origin/reference paths and revision/status history. A future Work package must contain START_HERE.md and WORK_HANDOFF.md plus those assets and explicit acceptance evidence, no reliance on transient scratch or conversation images.

Update WORK_PROGRESS and STATE at meaningful checkpoints: exact active revision, what was accepted/rejected, checks actually done, next one unfinished gate, protected scope and stop boundary. Any new Chat/Work prompt must be one complete self-contained copyable code block. Chat finishes safe preparation first; Work receives only the remaining executable delta.

## Current first slice

P1 Lushu Basic. **All four character poses are PLAYER APPROVED** (full-sequence acceptance2026-10-15T21:43:37+08:00), archived unchanged at docs/art/approved/lushu/basic/. Accepted source hashes and approval statement are in docs/art/candidates/lushu/basic/Basic-four-pose-review-v1.json. Do not regenerate these poses.

Safe full-canvas uniform packaging, independent blade/contact VFX candidates and normal/slow composite GIFs are prepared in docs/art/candidates/lushu/basic/review-v1/. REVIEW_NOTES.md records actual checks and limitations; review-manifest.json records complete geometry/hashes/timing and SHA256SUMS.json covers checkpoint contents. Four384-square cells, common visible baseline320, minimum39px nonzero-alpha clearance; normal GIF8frames/1600ms includes400ms action plus Idle holds, mirroring and actual approved Idle F1 return. Timing is preview-only.

**Update2026-10-15T22:12:13+08:00: VFX + composite GIF explicitly PLAYER APPROVED.** Accepted files and hashes are under docs/art/approved/lushu/basic/review-v1/acceptance.json. Runtime preflight identified P1.basic immediate damage versus approved GIF F3 at+180ms. **STOP for player timing-contract choice before implementation:** preserve instant combat with accepted visual lag, or explicitly authorize shared actual windup. Neither is yet selected; see docs/verification/M5C_B_LUSHU_BASIC_PREFLIGHT.md. No silent damage/HP/number delay, predicted hit, discarded accepted frame or synchronization claim. No code/tests/build/deploy/main merge at this paused checkpoint. GIF approval is not runtime/phone validation. Do not call this workflow production-proven until the first complete slice has passed the relevant art/GIF/runtime/iPhone gates.
