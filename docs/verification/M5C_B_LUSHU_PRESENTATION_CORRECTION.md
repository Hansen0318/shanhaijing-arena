# M5C-B — 鹿蜀 presentation / scale / facing / viewport correction

Status: local engineering PASS; safe checkpoint / deployment verification pending.
Baseline: d92b194084baa9ec61cdb23a47f58e11c2606ad5, original feat/m0-combat-core-20260927 / PR#1. Baseline Actions37177421392 SUCCESS. No main merge.

## Scope / provisional decisions
Player smoke failed missing menu art, undersized battle art, no horizontal facing and BACK viewport restoration. Accepted four-frame breathing source is protected. These correction choices are provisional鹿蜀 targets, not new global art hard rules. Stop after deployment for eight-item device smoke; Chat owns post-acceptance review.

## Existing source reuse and budgets
Unchanged canonical master SHA256 b6270ec433a1e35a6d9075ed3b6a860a1032ab0ab9e06099227fc78fea60a49b;2172×724 /4×543×724 /1,508,262encoded /6,290,112decoded bytes. No generated/redesigned image, individual animation trimming or duplicated left/right PNG.

| Static/runtime asset | Geometry | Encoded bytes | Decoded RGBA bytes | Source operation |
|---|---:|---:|---:|---|
| portraitSquare |128×128|23,816|65,536|F1 crop x140–439,y0–299; fixed head/bust composition|
| collectionArt |144×192|35,708|110,592|F1 entire543×724 equal cell, static resize|
| battleIdle |384×128,4×96×128|70,848|196,608|whole master proportional resample, same equal-frame geometry|

Old battle192×64 /22,010encoded /49,152decoded→new384×128 /70,848encoded /196,608decoded;delta+48,838encoded /147,456decoded. Battle texture doubled in linear dimensions because old64px texture would be upscaled1.5× at96px display; new128px texture provides the same1.33× sampling margin as the original64→48 presentation. Alpha retained, PNG lossless encoding, no metadata/palette quantization. Master never shipped.
Three formal files total130,372encoded /372,736decoded bytes. Battle encounter loads idle plus portrait through existing planning: two entries /262,144decoded bytes (256KiB,1.5625% of16MiB); collectionArt is menu-only and excluded from battle plan. Landing does not request them; visible Team/Collection bind static menu images, never the animated sheet. Existing transport/cache/texture limits, concurrency, retry and procedural fallback unchanged.

## Presentation
- P1 slots portraitSquare→lushu.portrait, collectionArt→lushu.identity, battleIdle→lushu.battleIdle. Others retain procedural fallback.
- Shared decoratePortrait now overlays image and fallback label in one grid cell. Successful image hides placeholder text; terminal load failure restores it. No P1 DOM/image loader branch. Team ally/enemy/bench, Collection grid/detail use existing resolver. Battle HUD naturally consumes the same portrait slot; no card geometry redesign.
- Detail identity column is bounded96–144px; formal static art uses3:4 proportion instead of squeezing into a square. Stats/Tier/abilities/lore retained.
- Battle descriptor scale2 →72×96 versus36×48. Both teams identical. Origin[.5,691/724], staticFrame0, four equal cells, fps2.5 /400ms per cell /1.6s loop remain. Source amplitude/motion unchanged. Static-first presenter test uses reduced-motion/staticFrame0 to validate dimensions/origin/mirroring, then reenables the same four-frame loop before shipping.
- Shared presenter retains per-instance previous x and flipX. dx>1e-6 faces right, dx<−1e-6 faces left, otherwise retains last direction; initial enemy defaults left/ally right. Phaser flipX mirrors around center originX. No combat vector/position/targeting change; no duplicated art. Facing survives Hit/idle and clears on scene destroy.
- Actor name label sits above the actual rendered sprite footprint (max of existing42px or displayHeight×originY+16), preventing enlarged art from being covered by its own name. HUD/joystick/skill/damage/critical depths/geometry untouched.

## Viewport contracts
Route BACK calls existing onRender→routeChanged; immediate/rAF/80ms/240ms settlement now repeatedly normalizes only root.scrollTop/Left, so delayed focus/Safari restoration cannot reintroduce prior-route scroll during settlement. VisualViewport dimensions/offsets still shared with battle host.
Detail open/close is same-route: CollectionView→CampaignView.onViewportChange→viewport.surfaceChanged, without full route render or battle teardown. Focus uses preventScroll:true. Close restores remembered grid scroll AFTER focus, clears inert, and resyncs root/visualViewport. Detail content scroll never copies to root; grid does not reset to top. No global window.scrollTo.

## Engineering evidence
- Six new focused contracts: static menu resolver/fallback; static-first2× and both-team facing/stop/origin/no actor mutation/four mirrored frames/cleanup; same-route Detail grid/focus/root restoration; late route root restoration; real Team→Stage→Chapter BACK and overlay callback wiring; selected ally/enemy/bench plus grid/detail image bindings.
- All missing behaviors reproduced RED before implementation. Added RED→GREEN actor-name offset check in actual Arena applyFrame test.
- Command: node --test tests/lushu*.test.js tests/asset*.test.js tests/collection*.test.js tests/team*.test.js tests/viewportSync.test.js tests/routeOwnership.test.js tests/lazyBattleRuntime.test.js tests/battleLabRuntime.test.js tests/preBattleGate.test.js tests/appRouteReset.test.js →127/127 PASS.
- Asset guard40 files /148,075encoded bytes PASS; npm run build PASS; git diff --check PASS. Existing deferred-chunk size advisory unchanged. No dependency/build policy modification.
- Initial Team DOM test failures reflected newly used replaceChildren unavailable in their minimal boundary. Shared adapter uses ordinary textContent+append, then all impacted Team tests pass; no wider gameplay coupling. Old asset-size/geometry expectations updated to approved correction sizes.
- Diff review: presentation/asset data, shared image/facing/navigation adapters, CSS and tests only; combat stats/abilities/AI/types/Tier/shards/rewards/progression/save schemas unchanged. Master SHA unchanged. Full local regression not run; existing unchanged Pages workflow may run its standard suite.

## Pending release closure
Save remote checkpoint; verify Actions/Pages/public fingerprints, menu image surfaces and focused battle/exit cleanup. Status after completion: ENGINEERING PASS / PLAYER SMOKE PENDING.

## Player smoke / stop
1. Team Select 鹿蜀 head/bust on small cards.
2. Collection grid image.
3. Character Detail complete identity.
4. Battle scale clearly readable.
5. Left/right motion mirrors correctly.
6. Feet/common anchor stable.
7. Original breathing/tail/no-VFX motion remains correct.
8. Detail→Collection and Team Select→previous page restore correct viewport (Detail remembers grid position).
Stop; do not start Hit/KO/Cast/Run/other characters/final portrait/collection generation/VFX/audio/Chapter2/balance/AI/progression. Promote practices only after actual player PASS and Chat review.
