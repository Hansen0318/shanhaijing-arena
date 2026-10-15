# M5C — Art / Animation / VFX Integration

## Status
**M5C-A PLAYER VERIFIED / M5C-B BATCH PREPARATION ACTIVE**

**2026-10-15 current action authoring gate:** `docs/CHARACTER_ACTION_ART_WORKFLOW.md` records the player-approved F3→four-pose→independent VFX/composite GIF→player approval→future runtime/deploy→iPhone process. First P1 Basic slice is art-review pending, not production-proven. Required: approved GitHub identity only, no weapon loss/redesign, deterministic safe packaging of exact accepted pixels, and GIF approval before runtime changes. No re-upload of our retained outputs is required; versioned canonical files + manifest/checksums + ZIP support zero-context handoff.

Gameplay/progression through M6C is PLAYER VERIFIED. M5C now focuses on visual integration without changing accepted combat, progression, AI, Tier, reward, or save semantics.

The goal is to avoid one-image-at-a-time integration. Build one reusable asset contract/pipeline, then integrate complete character/environment/VFX batches.

## 1. Principles

- visual assets are data, not character-specific engine code;
- placeholder fallback must remain valid until a final asset exists;
- missing optional art must never break gameplay;
- normal battle logic must not depend on asset availability;
- all asset references come from character/stage/ability data or manifest records;
- no character-ID-specific loading branches;
- preserve mobile landscape performance and lazy battle loading.

## 2. Standard character asset contract

Each playable character may provide:
- portraitSquare
- collectionArt
- battleIdle (currently static presentation)
- battleMove / locomotion descriptor when authored
- battleHit
- battleKo
- battleCast / per-ability action descriptor when authored
- basicVfx
- heavyVfx
- specialVfx
- awakeningVfx
- optional status/skill-specific overlays

The contract must support placeholders for every missing slot.

Do not require all slots before a character remains playable.

## 3. Animation contract

Animation should be lightweight and reusable.

Current production direction:
- idle presentation remains static unless explicitly reopened;
- locomotion animation is authored by reusable archetype: grounded step/run, aerial flight, or aquatic/hover float;
- short attack/cast action motion is paired with the matching ability VFX;
- hit reaction and KO state remain later bounded reaction gates.

Do not begin skeletal rigs or complex frame-heavy animation unless later approved.

Locomotion descriptors must be presentation-only and consume the same authoritative actor position/facing as the existing Arena. They must never alter movement speed or combat geometry. Aquatic/fish-derived humanoids may intentionally hover above the ground; winged characters may intentionally fly. The runtime should select an archetype through character data rather than character-ID branching.

Animation metadata should define:
- source asset;
- frame count / frame region when relevant;
- fps or duration;
- loop policy;
- anchor/origin;
- scale;
- optional reduced-motion/static fallback.

## 3A. Runtime-safe sprite strip normalization

Multi-frame battle art must be safe to slice before it is safe to integrate.

If a generated/authored strip has uncertain spacing, touches a frame boundary, or can expose neighboring-frame body parts during playback, it must first be converted into a **runtime-safe normalized derivative**.

Authoritative process:
1. start only from the player-approved source strip / frames;
2. isolate each intended frame silhouette independently;
3. remove neighboring-frame pixels and other unintended carryover;
4. use a consistent scale policy across the sequence;
5. place each frame in a fixed runtime cell with transparent side/top/bottom safety padding appropriate to the asset;
6. preserve the approved frame order and shared anchor/baseline family;
7. inspect per-frame alpha bounds / cell margins rather than judging only the whole strip;
8. confirm no neighboring-frame bleed from horns, fins, hair, fur, cloth, weapons, limbs, effects, or accessories;
9. build animation previews from the normalized strip, not the unsafe raw strip;
10. only after this passes may runtime integration begin.

This applies to locomotion / `battleMove`, action/cast, hit reaction, KO, and any later flipbook-like battle animation.

Runtime-safe normalization is not art redesign. It must not change identity, invent poses, alter gameplay position/speed/collision/AI/targeting/combat timing, or reorder approved frames.

## 4. VFX contract

Each ability references generic VFX descriptors rather than rendering code inside character definitions.

Possible generic forms:
- sprite/flipbook;
- burst;
- trail;
- ring/area;
- projectile;
- impact;
- persistent-area loop.

Metadata may define:
- asset key;
- duration;
- scale;
- anchor;
- facing/rotation behavior;
- target/source attachment;
- layer;
- loop;
- cleanup timing.

Existing M6B telegraph/threat geometry remains authoritative for gameplay. Formal VFX may visually replace or decorate placeholder warnings, but cannot alter hit geometry/timing by itself.

## 5. Asset manifest and validation

Create one manifest/index that:
- resolves asset keys to files;
- validates supported formats;
- records dimensions/metadata where useful;
- provides fallback mapping;
- prevents duplicate or orphaned keys;
- supports future characters without loader changes.

A missing optional asset should log/fallback, not crash.

## 6. Loading/performance

Preserve current fast non-battle entry.

Rules:
- Landing/Collection/INFO must not preload all battle animation/VFX;
- battle assets load only when needed for the selected encounter/roster where practical;
- avoid loading every future character's full combat assets at app start;
- reuse/caching across repeat/retry;
- keep texture dimensions and file weights bounded;
- use static fallback if a device/runtime cannot play an optional animation smoothly.

## 7. First batch

Chapter1 first formal visual batch:
- 鹿蜀
- 猼訑
- 赤鱬
- 九尾狐
- 狌狌

The same pipeline must support future characters.

First integration order:
1. portraits / Collection art;
2. battle idle/static sprite replacement;
3. locomotion animation when that character's locomotion gate opens;
4. Basic/Heavy/Special/Awakening action micro-animation + matching VFX;
5. hit + KO reactions when authorized;
6. persistent-area/status visual treatment;
7. Chapter1 battlefield/background and stage preview art.

Do not block earlier steps on later assets.

## 7A. Player-approved short-term production order — 2026-10-07

The current short-term M5C order is intentionally motion-first for the already accepted static characters:

1. 鹿蜀 locomotion;
2. 猼訑 locomotion;
3. 赤鱬 locomotion;
4. verify reusable locomotion state architecture and player-facing motion quality;
5. Basic action micro-animation + matching Basic VFX vertical slice;
6. after Basic is proven, extend the same pipeline to Heavy / Special / Awakening;
7. resume 九尾狐 and 狌狌 static production afterward.

Rationale: validate movement/action state transitions and reusable animation architecture before multiplying art across the remaining roster.

Idle remains static. Hit/KO remain later gates. Locomotion/action/VFX must never alter gameplay state, coordinates, speed, collision, targeting, AI, telegraph geometry, ability timing or combat math.

## 8. Battle presentation

Preserve:
- current portrait/HUD geometry;
- damage text;
- critical text;
- telegraph gameplay geometry;
- joystick/HSA layout;
- selected-character behavior.

Formal art may require bounded scale/origin adjustments, but should not redesign the HUD in the same slice unless a specific clipping/readability defect appears.

## 9. Tier visual policy

M5C does not create a separate visual model for every Tier.

T0–T3 combat differences remain mechanic-driven.

Optional later polish may add:
- subtle aura/accent;
- Tier-specific small VFX enhancement;
- Collection border treatment.

Do not require four complete sprite sets per character.

## 10. Reduced motion / fallback

Every animation/VFX slot must have a static or reduced-motion fallback where practical.

Gameplay information must remain readable without decorative motion.

Telegraph readability cannot depend only on animation.

## 11. Developer Battle Lab

Use Battle Lab for visual smoke:
- choose character/team;
- all skills ready;
- skip countdown;
- Tier override;
- telegraph/status/persistent-area presets.

Do not create a second visual test runtime.

## 12. Integration batching

Future Work should receive asset batches, not single files.

Recommended batch unit:
- one complete character pack, or
- one complete category across all five characters.

Examples:
- all five portraits;
- all five battle idle sprites;
- all five Heavy VFX.

Work should integrate an entire coherent batch, run targeted validation, then continue unless player review is genuinely needed.

## 13. Player review gates

Player review is best reserved for:
- character likeness/style;
- scale/readability;
- animation feel;
- VFX clarity;
- telegraph vs decorative effect separation;
- battlefield visual hierarchy.

Do not stop for every file rename or manifest insertion.

## 14. M5C-A — Asset Pipeline

First implementation slice:
- standard asset schema/manifest;
- fallback behavior;
- lazy loading hooks;
- animation/VFX descriptor schema;
- validation/tests;
- Battle Lab preview hooks where useful.

Use existing placeholder assets to validate the pipeline.

No final art is required for M5C-A.

## 15. M5C-B — Formal Asset Batch Integration

After player-provided/approved assets exist:
- integrate full batches through the pipeline;
- no loader redesign;
- no new character-specific renderer branches;
- preserve accepted gameplay.

## 16. Acceptance

M5C-A is complete when:
- future character art can be added through data/manifest;
- missing assets safely fall back;
- non-battle load remains fast;
- battle only loads relevant heavy assets where practical;
- placeholder Battle Lab proves portrait/sprite/animation/VFX slot routing;
- no combat/progression behavior changes.

## 17. Stop

Do not start:
- audio;
- Chapter2 formal content;
- new progression/economy;
- star/rarity/level systems;
- complex skeletal animation pipeline;
unless separately approved.

## M5C-A engineering implementation
Central manifest and all9 standard slots, safe menu/battle fallback, encounter-only decode cache, generic animation/VFX playback and Arena/Lab adapter are implemented. Exact authoring contract and budgets: `ASSET_PIPELINE.md`. Targeted56/56, impacted375/375, full542/542/build/diff PASS; independent5 Important resolved RED→GREEN. Exact deployment/public evidence: `verification/M5C_A_ASSET_PIPELINE.md`. No production character/art batch/audio/Chapter2 or gameplay change; M5C-B is separately authorized future work.

Release source d3ed2bf0bad01e0a4d055fb4b89f49362c868ef8; Actions #399 / 37107284909 SUCCESS (build111158185887, Pages deploy111158232597). Public entry index-iHgeqczB.js matches tested build; CSS index-CuxsJ6uc.css, deferred battleRuntime-KzZEk5yG.js. Public normal Landing has BATTLE/COLLECTION/INFO, no Lab/canvas/modulepreload. Collection and Chapter/Stage preview navigation verified; six preview images complete640×300, zero canvas. Dev Visual inspection battleIdle shows two-frame graybox in real Arena; Pause/Restart/Exit→Lab verified, inspection/countdown settings retained, canvas removed. Cloud1363×936 has no horizontal overflow. Physical phone visual acceptance remains player smoke.


## M5C-A player visual smoke

Player verified the current dev visual-inspection presentation on device and accepted the pipeline behavior. The labels/placeholders are dev-only. Formal asset integration remains deferred until the newly authorized M6C-B Tier Power Curve Rebalance is accepted, so battle pacing is stabilized before production art/VFX timing is tuned.


## M5C-B activation

M6C-B balance is now player verified, so formal visual integration may proceed. Follow `M5C_B_FORMAL_ASSET_BATCH.md`: Batch1 first prepares all five Chapter1 portraitSquare, collectionArt and battleIdle/static assets, then Work integrates the approved batch through the existing M5C-A pipeline.


## M5C-B idle-motion clarification

M5C-B Batch1 now explicitly includes battlefield idle micro-animation for all five Chapter1 characters in addition to portraitSquare, collectionArt and battleIdle. Idle motion must be lightweight, loopable, Pause-safe, position-neutral, compatible with static fallback and implemented through the existing M5C-A animation descriptor path. Hit/KO/cast remain the following battle-state batch.


## Player direction — Team Preview / Detail future presentation (2026-10-04)
Team Select upper selected3v3 is a full-body lineup preview, distinct from lower head/bust roster cards. Use static collectionArt through the shared resolver now; future idle micro-animation may inhabit the same identity container only after separate approval. Other characters retain procedural placeholders until their own approved assets exist; do not generate their art in the鹿蜀 slice.
Character Detail/Info stays static in this correction. Future directions only: accepted breathing animation on the larger identity surface; character-specific Shanhaijing scenic background. Neither animation system nor scenic production is authorized now.
Small cards use a shared dark-top/light-bottom gradient and read-only Tier border rule (T0white,T1green,T2blue,T3purple). Player smoke and Chat post-acceptance review precede promoting the whole visual workflow to a future-character hard rule. Battle side-card character names removed; HP/selection/KO states remain. Optional missing state art must keep a loaded idle static identity visible without changing state timing or combat geometry.


### Reduced-motion locomotion correction — 2026-10-08

Player phone smoke exposed that treating locomotion like decorative animation and freezing it to `staticFrame` produces visibly incorrect one-frame sliding. Locomotion is a state-readability cue and must remain animated even when the OS requests reduced motion. Under reduced-motion, locomotion should use a lower-intensity / slower cadence rather than static freeze. Decorative VFX, nonessential idle motion and other optional effects may still use static or simplified fallback. This remains presentation-only and must not alter authoritative movement coordinates, speed, collision, targeting, AI, telegraph geometry or combat timing.


### Grounded locomotion validated baseline — 2026-10-09

Player verification of 鹿蜀 establishes the shared grounded-terrestrial humanoid production method: multi-frame leg-driven travel, arm counter-motion, torso/weight transfer, restrained appendage/equipment follow-through, common ground anchor, runtime facing mirror, stop→static idle, and presentation-only playback that follows authoritative actor coordinates. Later grounded characters reuse this method structurally while preserving role/species-specific cadence and weight; they do not copy 鹿蜀's exact poses or fps by default.

The proposed global +50% battlefield movement-speed change was explicitly abandoned before implementation. Existing and future gameplay moveSpeed values remain on the current design scale unless separately approved.


## 3A. Runtime-safe sprite-strip normalization hard rule

For any authored multi-frame locomotion or action sprite strip, **neighboring-frame bleed is forbidden**.

Before runtime integration, if any authored frame reaches or nearly reaches a cell boundary, Chat must perform a runtime-safe normalization pass before handoff:
1. isolate each approved frame/silhouette independently from the source sheet;
2. remove all pixels belonging to neighboring frames;
3. place every isolated frame into its own fixed-size transparent cell;
4. use one uniform scale across the sequence unless the approved action explicitly requires otherwise;
5. preserve the approved frame order and pose content;
6. keep a common anchor/baseline appropriate to the locomotion archetype;
7. provide explicit transparent padding on all cell sides sufficient to prevent horns, fins, fur, cloth, weapons, tails, water shapes or other appendages from crossing into adjacent cells;
8. verify the per-cell alpha bounds before animation preview or repo integration;
9. preview the exact normalized cells in direct runtime frame order;
10. only the normalized derivative may be handed to Work for manifest/catalog/runtime integration.

This normalization is an asset-packaging operation, **not a redraw or redesign**. It must not invent new poses, change identity, or alter gameplay coordinates.

If any frame still touches a side boundary after normalization, the strip is not runtime-ready and must not be integrated.

The same rule applies to future grounded, hover/aquatic, aerial and other reusable locomotion archetypes.

## 3B. Runtime derivative size discipline

Player-approved source art is not required to remain at authoring resolution when the runtime only displays it at a much smaller size. If an approved static battle source would exceed the shared decoded texture/cache budget, Chat should prepare a lossless-content-equivalent runtime derivative by resizing only the approved source; this is packaging/optimization, not redesign.

Hard rules:
- preserve the approved composition, transparency, facing and character identity;
- no crop, redraw, pose change or added/removed content;
- choose the smallest runtime dimension that remains comfortably above the actual display requirement;
- prefer asset optimization over raising shared cache/texture budgets;
- record the runtime derivative dimensions/bytes/SHA separately from the approved master source;
- only change the global cache budget when bounded asset optimization cannot satisfy the existing budget and player explicitly authorizes the shared-system change.

## 7B. KO gate closure and next active gate — 2026-10-12

Status: **P1/P2/P3 STATIC KO PASS / PLAYER VERIFIED**.

The player accepted the deployed static KO presentation for 鹿蜀, 猼訑 and 赤鱬. Preserve the accepted right-facing canonical KO art, shared last-facing mirror, grounded/static persistence, P1/P2 runtime-sized derivatives, P3 KO baseline and existing 16MiB shared cache/scene texture budgets.

Process correction after re-reading the Chapter1 concept-control documents:
1. the KO gate is closed;
2. the next unfinished Chapter1 character gate is **九尾狐 Concept direction**;
3. Chat must create/review one 九尾狐 Concept image first under the existing creature-first, humanoid, simplified cel-shaded, mobile-readability hard rules;
4. do not author 九尾狐 portraitSquare / collectionArt / battleIdle / locomotion / KO until the Concept is explicitly player-approved;
5. after 九尾狐 reaches the same base presentation pipeline, continue 狌狌;
6. Basic action micro-animation + matching Basic VFX is deferred until the unfinished Chapter1 base character presentation is completed, unless the player explicitly reorders again.

Do not reopen 鹿蜀 / 猼訑 / 赤鱬 locomotion, idle breathing, KO, shared texture budgets, gameplay mechanics, AI, targeting, telegraph geometry, ability timing or combat math while producing 九尾狐 Concept.

## 7B. Character-first temporary completion order — 2026-10-13
**2026-10-14 player acceptance update:** P4 九尾狐 static identity/runtime, locomotion, and shared static KO were all verified on the player's phone; P4 is **temporarily complete**. This supersedes older entries saying P4 locomotion/KO pending. Next character-first gate is **P5 狌狌 Concept image / player approval only**, then follow the same sequential static→move→KO pipeline. Action/Hit/VFX remain deferred; no main merge.



Player-authoritative production order for the remaining Chapter1 roster:

For each character, finish the following before starting the next character:
1. Concept → portraitSquare → collectionArt → Battle Simplification → static battleIdle → Static Runtime Readability;
2. locomotion authoring → runtime-safe normalization if required → integration/deploy → player verification;
3. static death/KO art → shared `battleKo` integration/deploy → player verification.

After these three stages are player-verified, that character is **temporarily complete** and the next unfinished roster character may begin.

Basic / Heavy / Special / Awakening action micro-animation, Hit and VFX remain later gates and are not required for temporary character completion.

Current application:
- P1 鹿蜀: temporarily complete;
- P2 猼訑: temporarily complete;
- P3 赤鱬: temporarily complete;
- P4 九尾狐: static identity/runtime complete; locomotion is next; KO follows locomotion;
- P5 狌狌: blocked until P4 locomotion + KO are player-verified.

## Approved multi-frame normalization — required pre-GIF process (player verified 2026-10-14)
When a player approves four poses as the art source, preserve that exact image and do not regenerate it merely to repair layout. A visually good four-pose collage is NOT automatically a sprite strip. Never create GIFs from naïve equal-width slices. **Chat owns the full safe preparation whenever available**: (1) identify each independent entire silhouette and its source bounds, separating any neighboring components/pixels; (2) remove background or fringe only by a color-faithful process that never deletes character colors; (3) individually extract the four frames, preserving fists, claws, tail, accessories and outline; (4) normalize into exactly four equal-sized transparent RGBA cells with generously clear horizontal/vertical safety padding; (5) align a common grounded baseline while keeping each full actor inside cell bounds; (6) inspect per-cell nonzero-alpha bbox, compare on light/dark backgrounds and ensure no neighboring-frame bleed/clipping/discolored fringe; (7) only then derive an animated GIF preview from the normalized cells, and obtain explicit player approval before Work integration. Runtime must animate `battleMove` only while moving, return to previously approved single-frame `battleIdle` when stopped, use the existing mirror contract, and preserve gameplay/stat/collision coordinates. Do not mistake alpha mode or even a successful crop for visual/no-bleed proof. Record exact approved source, normalized derivative hashes/cell geometry and PASS boundaries in progress/state. A Chat→Work package must include approved source, four separated PNGs, normalized strip, review GIF, manifest/checksums and complete START_HERE/WORK_HANDOFF; Work gets only integration/tests/deploy and phone-smoke handoff.

## Shared asset readiness / first-entry HUD correction — 2026-10-15
**Status: BOUNDED SHARED ENGINEERING INVESTIGATION REQUIRED; PLAYER VISUAL DEFECT CONFIRMED, ROOT CAUSE NOT YET CONFIRMED.** First battle entry on phone may show blank colored side-HUD portraits; portraits load after waiting or on Restart. P5 locomotion remains PLAYER VERIFIED. Apply the fix to the shared loading/presenter infrastructure for ALL roster entries, not xingxing-specific code or visual downsizing.

Required investigation: trace the current asset-loader cache/network/decode lifecycle, initial route transition and Arena HUD portrait texture binding, async ready notifications, render refresh and Restart cache behavior. Compare cold first entry versus warmed Restart with measurable readiness/first-painted timestamps. Fix confirmed root cause at shared data-driven layer: deduplicated/cache-aware essential current-encounter assets, explicit readiness and retry/fallback, notification-driven portrait updates, and bounded battle-start gating only for essential assets. Avoid globally blocking on unrelated Chapter/Collection art or all roster images; preserve playable interactions and avoid blank permanent slots. Changes must not alter approved images, battleMove/battleIdle/KO descriptors, 16MiB budget, gameplay stats, AI, reward, gameplay timing, or roster special cases.

Acceptance: first cold load either displays each active combatant portrait or an intentional loading/fallback state that resolves as its image becomes ready without Restart; warmed Restart remains correct; no duplicate unnecessary downloads/decode churn; all roster share the same contract. Targeted loader/HUD/scene tests, asset guard, build and iPhone player smoke. Chat-first analysis and bounded safe edits before any Work handoff. No main merge.
