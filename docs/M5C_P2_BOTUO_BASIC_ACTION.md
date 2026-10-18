# P2 猼訑 Basic「角擊」— recovered contract / first art gate

## 2026-10-18 — P2 Basic composite GIF CANDIDATE / PLAYER REVIEW PENDING

Player at2026-10-18T17:22:42+08:00:「好接下來是做gif給我確認嗎，是的話就給我連結看」, following「未完成就繼續」, explicitly authorizes advancing the presented pose set into a GIF preview. This supersedes the prior stop-before-GIF pointer for **preview production only**. Do not fabricate a separate per-pose approval statement: F3 remains explicitly PLAYER ART APPROVED; F1/F2v2/F4 are authorized preview inputs, with their final visual acceptance pending composite review. No runtime/deploy authority inferred.

Completed at recovered feature `dec02b2786b8d3829a5b4cb0b01350e62023a9bd`: two new independent Basic horn-force/source and crushed-stone/contact VFX; deterministic full-canvas safe cells using author-selected skull-height density/common XY scaling and hoof baseline; normal/3×slow composite, character-only normal/slow, static reduced-cue preview, both directions and approved Idle return. Sources/prompts/QA/manifest/checksums: `docs/art/candidates/botuo/basic/composite-review-v1/`; reproduce `python scripts/prepareBotuoBasicReview.py`. Normal GIF SHA256 `55c70c31141da605ee16f558bc6c9629c1ceeab73acb3314a2b3066d1c98ae9d`; slow `8f9fd7662e54565ff6fdfe5e709fd4862f0e3b819a85bfe7c777dec4829ab553`. Normal2800ms/slow8400ms include both directions and Idle; decoded minimum holds40/120ms, exact paletted pixel/timeline roundtrip PASS. Character cells preserve every resized source pixel with >=35px alpha padding; masters/approved sources unchanged.

**GIF/VFX CANDIDATE / PLAYER REVIEW PENDING. NEXT: player reviews linked normal/slow GIF for obvious body articulation, independent outgoing/contact visibility, identity/scale/grounding, left/right and Idle return.** Preview F1/F2/F3/F4=160/80/160/160ms, contact240ms after visual action start, is not an approved gameplay delay; real Basic remains windup0ms. Neutral marker is schematic, no real HP/damage/collision proof. No runtime integration/ENGINEERING PASS/build/deploy/phone acceptance. Existing16MiB limits/reserve and accepted P1/P2 base/Move/KO remain protected, generic Hit stays CANCELLED. Source-to-Idle scaling/visible-ground alignment are review transforms, not runtime descriptor edits. Checkpoint `[skip ci]`, no main merge/P3. Updated successor: `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`. Always fetch latest containing feature commit on recovery.

## 2026-10-18 — P2 Basic F3 PLAYER APPROVED / F1-F2-F4 CANDIDATES

Player at2026-10-18T15:36:06+08:00:「好f3我approved，繼續，要確保未來動畫東西要足夠明顯」. **F3 PLAYER ART APPROVED**, exact immutable source19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36; receipt `docs/art/approved/botuo/basic/f3-v1/acceptance.json`, checkpoint `cfd2b22c56e995a528909af08a5a491e490c3afa`. F1 rear load, F2v2 forward release, F4 guarded recovery now **ART CANDIDATES / PLAYER REVIEW PENDING** at `docs/art/candidates/botuo/basic/phase-poses-v1/`. Static four-pose light/dark/small-size comparison, individual prompts, originals, rejected F2v1 history, reproducible PNG/alpha/bounds/hash report retained. Latest feature checkpoint is the containing commit; fetch remote again.

**Permanent visibility requirement:** articulated load/release/contact/recovery must be clearly different with effects OFF; review normal-speed and small/mobile-scale playback later, never assume a large still proves battlefield visibility. Caster/source effects and real-target impact must each be unmistakable, with Basic<Heavy<Special<Awakening escalation and distinct signatures; reduced motion retains readable static cues. Achieve this with pose/silhouette/value/independent FX and appropriate existing event-owned finite holds, not actor enlargement, invented hits/range, or unapproved HP/cast timing changes. Current static QA is a uniform source-scale study, not actual phone proof.

**NEXT ONLY: player reviews F1/F2v2/F4; F3 is closed.** Then accepted-pixel safe normalization + independent VFX + normal/slow/effects-off/mirrored/Idle-return GIF review. No VFX/GIF/runtime/deploy acceptance inferred. Basic still windup0ms/one real immediate hit; any timing change needs separate exact approval. P1 COMPLETE, generic Hit CANCELLED, all P1 and P2 base/Move/KO assets protected. Actual checks: PNG decode, visible-edge/border-alpha/hash/opaque QA, whitespace/protected paths; raw alpha1 border noise preserved/reported, no full-alpha-clear or runtime-ready claim. No suite/build/Pages rerun. `[skip ci]`, no main merge/P3. Current spec `docs/M5C_P2_BOTUO_BASIC_ACTION.md`; successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`.

Date: 2026-10-18 Asia/Taipei. Recovered feature HEAD: `39f7d2b50202c93798ef7d3cf38a57ee8388fcaa`.
Branch `feat/m0-combat-core-20260927`, PR #1 open/unmerged. Resolve containing checkpoint from Git history; always fetch again.
Status: **DESIGN PROPOSED / F3 ART CANDIDATE / PLAYER REVIEW PENDING**.
No new runtime integration, ENGINEERING PASS, deployment or player acceptance is claimed.

## Protected baseline / recovery
P1 **COMPLETE BY EXISTING ACCEPTANCE EVIDENCE**; ordinary Hit **PLAYER CANCELLED / NOT REQUIRED**, including P2–P5 by default. No P1 repeat art/tests/deploy/device review. Explicit skill-defined control remains legal.

| P2 gate | Recovered status / authority |
| --- | --- |
| Concept / Battle Simplification / portraitSquare / collectionArt / static battleIdle | PLAYER ART APPROVED; static runtime PLAYER VERIFIED, 2026-10-05; visual spec §26 and STATE static acceptance |
| Idle | Static only; breathing withdrawn 2026-10-06; do not animate historical four-frame Idle |
| Move | PLAYER VERIFIED 2026-10-10, STATE locomotion acceptance; 640×160 four-frame source, normal12/reduced6fps, speed1.45 unchanged |
| KO | PLAYER VERIFIED 2026-10-12, verification/M5C_B_LUSHU_BOTUO_KO.md final acceptance |
| Basic action / independent VFX / GIF | No prior approved action/VFX assets or acceptance found; first missing gate F3 |
| Heavy / Special / Awakening action art | Not yet produced/approved; current gameplay abilities already exist |

Runtime catalog P2 has no actionDescriptors; four VFX slots remain placeholders. This does not mean gameplay skills are unimplemented.
References and exact SHA256 are in `art/candidates/botuo/basic/key-pose-v1/verification.json`.
Actual approved pictures override older unaccepted gray/plain-guard recommendations: white goat face, thick gold-banded brown curled horns, dark brown mantle, gold beast-face bracer, red sash, gold/orange center panel, cloven hooves.
Manifest currently resolves Idle to `public/assets/runtime-packing-v1/botuo-battleIdle.png`, KO to `public/assets/characters/botuo/battleKo-trimmed.png`; these existing derivatives are protected too.

## Current T0 executable contract (read-only)
Authority: `src/roster/abilities.js`, `src/roster/catalog.js`, `src/combat/ability.js`, `src/combat/battleSession.js`.
Imported definitions inspected directly; no gameplay execution/test was performed.

| Skill | Existing T0 behavior | Proposed body / VFX differentiation, NOT approved |
| --- | --- | --- |
| Basic 角擊 | Enemy single melee; min0/preferred0.7/max1.4; coefficient1.00; one hit; CD0 with attackSpeed0.85 cadence; windup0ms; crit10%, multiplier1.5; no displacement/projectile/status | Low compact planted horn/neck-forward press; short horn-edge release cue and small true-target contact burst |
| Heavy 震嶺 | Enemy single; max1.8; coefficient1.30; CD4s; tactical telegraph650ms, dangerRadius0.7 | Torso rises behind guarded arm then forceful forward guard/shoulder shove; broad angular impact, distinct from Basic head press |
| Special 守群 | Self mitigation25% for4s, coefficient0, CD8s; no damage | Upright inward protective brace; enveloping guard outline attached to actual protected recipients for actual status duration |
| Awakening 鎮岳 | Caster-centered areaRadius2.2, coefficient1.70 per eligible target; CD14s; tactical telegraph900ms | Wide low stance and downward whole-body release; largest radial earth/pressure rings, no invented extra damage/stomp hit |

These proposals describe stance/center, anticipation, limb path, contact, follow-through and rhythm; they authorize no future-pose production now. Relative spectacle Basic<Heavy<Special<Awakening does not turn defensive Special into damage.
Tier effects also remain authoritative: P2 T1 threatened-ally protection on Special, T2 actual Heavy hit control0.35s, T3 team protection on Awakening; inspect projection/scaling/event recipients before any later effect authoring. Do not erase control under the generic Hit cancellation or fabricate durations from T0.
Basic resolution currently applies the one real hit immediately on accepted in-range cast (no windup/telegraph), cadence 1/0.85 seconds at T0 before projection. F3 pose approval is **not** permission to import P1 180ms windup. Before GIF/runtime, settle how visual preparation fits real events; any changed combat timing requires separate exact player approval. Never postpone HP/numbers alone.

## Current deliverable / self-review
Built-in imagegen, references approved identity + static Idle + Move; one new character-only F3 master:
`docs/art/candidates/botuo/basic/key-pose-v1/F3-contact-master.png`.
SHA256 `19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36`.
1447×1087 RGBA,1,018,592bytes. Prompt and reproducible inspection script retained beside it.
New generation is **not pixel-identical** to references and does not inherit approval.

Visual self-review: two arms/two legs, full hooves/horns/bracer inside canvas, rightward lowered head, braced legs, no extra weapon or baked VFX. White muzzle/brown mantle/gold guard/red sash remain readable on opaque light/dark backgrounds. Pose is wider/lower than Idle; head proportions, horn thrust readability and guard prominence require player judgment. It is not an engine collision diagram.
Alpha nonzero bbox(39,23)-(1419,1042); alpha>64 bbox(228,144)-(1282,995); transparent outer borders. 13,017 low-alpha1–8 pixels preserved/reported, not cleaned. QA small samples are **144px silhouette-height studies, not calibrated game scale or phone evidence**. No normalization/runtime-ready claim.

## Actual verification / next gate
`python docs/art/candidates/botuo/basic/key-pose-v1/inspect_candidate.py`: PNG decode, alpha/bounds/reference SHA256 and QA composites. Inspect QA visually; `git diff --check` and protected-path comparison before checkpoint.
No suite/build/browser/Pages/public fingerprint rerun; docs/candidate changes cannot invalidate accepted runtime bytes. Existing deployed runtime remains `8e2f5e049095017d7350b1d0d61e96527ab21e44`, prior public evidence reused, not freshly checked.
**STOP: player reviews ONE F3 identity/horns/equipment/grounded compact horn strike.** Only after explicit acceptance produce F1/F2/F4, then independent VFX and normal/slow/effects-off/both-facing GIF approval, separately authorized runtime/minimum tests/release/phone verification. No P3/main merge.
Chat owns remaining art/review preparation; Work has no runtime task before those gates.
