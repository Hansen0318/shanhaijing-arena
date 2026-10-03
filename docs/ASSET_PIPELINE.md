# Arena Asset Pipeline

M5C-A infrastructure; placeholder validation only. Gameplay does not depend on art.

## Add a pack through data
1. Add approved files under public/ (SVG/PNG/WebP/JPEG). Add unique records in src/assets/manifest.js: key, type:image, path relative to public/, exact width/height, bytes as file-size ceiling, fallback key. Procedural terminal records have path:null.
2. Character data exposes assets with portraitSquare, collectionArt, battleIdle, battleHit, battleKo, basicVfx, heavyVfx, specialVfx, awakeningVfx. Inherit defaultCharacterAssets for absent slots. Optional assets.statusOverlays maps generic status type→key; assets.skillOverlays maps category→key. No loader ID branch.
3. Optional character.animationDescriptors maps battleIdle/battleHit/battleKo/battleCast to source, frames (pixel regions {x,y,width,height}), fps or duration, loop, origin:[0..1,0..1], scale, staticFrame. battleIdle defaults to an owner-lived loop; short states return to idle. Reduced motion selects staticFrame.
4. Optional character.vfxDescriptors maps basic/heavy/special/awakening to descriptors. Ability createAbilityDefinition(input) also retains optional immutable input.presentation.vfx; its override wins. Stage data may expose battleAssetKey; preview paths resolve through the same central manifest. Current stage/reward data is unchanged.
5. Run npm run build: actual files/dimensions/byte ceilings/references/orphan keys are checked before Vite. Missing optional network art falls back at runtime; malformed/orphaned authoring references fail build visibly.

## Descriptor example (existing engineering strip)
```js
animationDescriptors: {
  battleIdle: {
    source: 'placeholder.actor-strip',
    frames: [{x:0,y:0,width:32,height:32},{x:32,y:0,width:32,height:32}],
    fps:2, loop:true, origin:[.5,.5], scale:1, staticFrame:0,
  },
}
```
This two-frame graybox strip is a pipeline probe, not character production art.

## VFX forms/lifetime
sprite, flipbook, burst, trail, ring, projectile, impact, persistent-area. Fields: assetKey, duration seconds (.01–10), scale (.05–4), origin, attach:source/target/fixed, rotation:none/facing, layer1–19, loop (bounded persistent-area only), optional animation descriptor. Duration is cleanup timing; owner/target KO removes the instance sooner. Target attachment follows the presentation target identity. Frames/duration only animate pixels; they never execute hits.
Persistent-area form is decorative. M6C area records and M6B threat records still own geometry/eligibility/impact/expiry and keep their existing authoritative renderer. Asset descriptors do not adjust warning dimensions, effect intervals, damage or ability cooldown.

## Loading/ownership
Menu image binding requests only visible portrait/Collection/preview files. No menu dependency on Phaser/AssetPresenter/cache/playback. Selected six actor definitions, their actual ability references and current stage determine battle load plan; never scan the future roster for loads. Optional loads start after Arena exists with playable procedural fallback; START never waits for art. Failed downloads remain retryable. Cache shares concurrent requests/decode and survives Retry. Scene-owned textures, sprites, graphics and records are destroyed on shutdown; stale async completion cannot reattach them. No art state is persisted.

## Budgets
- File≤4MiB, exact dimensions≤2048×2048 and≤4194304 pixels; source regions≤128.
- Shared cache≤64 entries/16MiB decoded RGBA; at most2 parallel transports/decode. Eviction permits future reload rather than unbounded residency.
- Scene textures≤64/16MiB decoded-equivalent; overflow keeps procedural fallback.
- Active VFX≤64, capped10s; no real-time animation timer. Arena battle clock freezes with Pause.
- Actor image fit uses48px maximum base dimension; VFX80px; descriptor scale modifies presentation only. HUD keeps accepted portrait geometry; stage1120×540.

## Focused Lab verification
Dev-only Visual inspection selector OFF/portrait/idle/hit/KO/Basic/H/S/A. START uses the existing Arena and isolated Lab config. Idle exercises cached two-frame strip; other slots exercise resolver or generic procedural fallback. Hit/KO inspection is cosmetic and does not injure/KO actors. Normal URL does not show Lab. Physical phone readability/style remains player smoke; final art/audio production and asset batching are separate milestones.
