# P2 猼訑 Basic「角擊」— recovered contract / first art gate

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
