# M5C — Art / Animation / VFX Integration

## Status
**CHAT SPEC / PIPELINE IMPLEMENTATION READY**

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
- battleIdle
- battleHit
- battleKo
- basicVfx
- heavyVfx
- specialVfx
- awakeningVfx
- optional status/skill-specific overlays

The contract must support placeholders for every missing slot.

Do not require all slots before a character remains playable.

## 3. Animation contract

Animation should be lightweight and reusable.

Preferred first formal pass:
- idle loop;
- hit reaction;
- KO state;
- short cast/action motion hook.

Do not begin skeletal rigs or complex frame-heavy animation unless later approved.

Animation metadata should define:
- source asset;
- frame count / frame region when relevant;
- fps or duration;
- loop policy;
- anchor/origin;
- scale;
- optional reduced-motion/static fallback.

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
3. hit + KO;
4. Basic/Heavy/Special/Awakening VFX;
5. persistent-area/status visual treatment;
6. Chapter1 battlefield/background and stage preview art.

Do not block earlier steps on later assets.

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
