# M5C-B — 鹿蜀 battleIdle integration

Status: implementation checkpoint; local engineering PASS, deployment/runtime inspection pending.
Branch: feat/m0-combat-core-20260927; PR #1; baseline 9adf43d72e4b7a9b50cbe9c42ca8d890da5e0293.

## Source and optimization
Canonical unmodified PNG is archived at art/source/lushu/lushu_battleIdle_idle_4f.png (outside public, never shipped).
SHA256 b6270ec433a1e35a6d9075ed3b6a860a1032ab0ab9e06099227fc78fea60a49b.
Supporting ZIP master is byte-identical; separate ZIP frames were not used.

| Measure | Master | Runtime |
|---|---:|---:|
| RGBA sheet | 2172×724 | 192×64 |
| Equal horizontal cells | 4 × 543×724 | 4 × 48×64 |
| Encoded PNG bytes | 1,508,262 | 22,010 |
| Decoded width×height×4 bytes | 6,290,112 | 49,152 |

Encoded reduction 98.54%; decoded reduction 99.22%. Runtime adds one shared cache entry (48 KiB, 0.293% of the 16 MiB budget), one scene texture shared by all 鹿蜀 instances. Existing limits/concurrency/eviction/retry/fallback unchanged.
Whole-sheet proportional Lanczos resample, then lossless RGBA PNG compression; no palette quantization, metadata, independent crop/trim, per-frame translation, redraw or VFX. Runtime alpha spans0–255. Candidates48/64/96/128px tall encoded13,707/22,010/43,693/70,848 bytes. 48px is exactly the base fit with no sampling margin; 64px is the smallest candidate above display fit, retaining white head/red tail, weapon/legs and markings with modest1.33× texture sampling margin. Larger96/128 derivatives were unnecessary for the existing48px renderer. This is intentional downsampling; PNG encoding itself is lossless.

## Playback contract
Manifest lushu.battleIdle; P1 battleIdle only. Descriptor fps2.5 (400ms per cell), duration1.6s, F1→F2→F3→F4 loop, staticFrame0, scale1. Equal source cells; common origin[.5,691/724], so ground anchor y61.083 in64px cells. Actual stage display36×48; common anchor stage y45.812 from top. Actor projection/gameplay x/y unchanged. No tail transforms or procedural body motion added; source motion preserved.
Hit/KO/Cast stay procedural placeholders; Hit finishes after existing0.4s and re-enters idle. Movement behavior unchanged. Existing battle elapsedSeconds owns playback; Pause freezes elapsed time, Resume does not apply wall-time jumps; cleanup destroys scene images/frames/textures/states, bounded shared cache retains reusable decode.

## Necessary integration corrections
1. Existing combat snapshots intentionally omit definitionId. Arena now enriches presentation-only copies through actorById before rendering art/overlays. Combat snapshot/model/save schema unchanged. Previously this silently selected default placeholder descriptors even for authored character art.
2. Dev idle inspection now selects an authored idle descriptor if available; characters without one retain graybox inspection. No loader ID branch/new animation engine.

## Verification
- Five new contracts: four cells/origin/static fallback/state scope; actual PNG/encounter/menu/cache isolation; real presenter frame loop/frozen clock/resume/Hit/KO/cleanup; authored Lab inspection; actual Arena identity projection preserving snapshot. RED reproduced before each behavior fix; GREEN.
- Targeted/impacted: node --test tests/lushuIdle.test.js tests/asset*.test.js tests/lazyBattleRuntime.test.js tests/battleLabRuntime.test.js →44/44 PASS.
- Asset guard38 files /39,713 encoded bytes PASS; npm run build PASS; git diff --check PASS.
- Initial failures were stale37-file inventory expectation and test snapshot identity lookup; updated to38 files and actorById; no combat failure/shared-system regression indicated. No automatic local full regression.
- Diff review: only presentation manifest/catalog/Arena adapter/inspection, assets/tests/docs changed. Combat stats/abilities/movement/AI/type/Tier/cooldown/reward/shards/progression/persistence untouched.
- Existing deferred battle chunk size advisory remains; no dependency/build policy changes.

## Remaining before release closure
Push checkpoint, verify Actions build/Pages and public fingerprints, perform focused runtime asset/anchor/pause/cleanup inspection; then status ENGINEERING PASS / PLAYER SMOKE PENDING.

## Player smoke / stop
At iPhone landscape check only: size/readability; visible vertical breathing; tail follows body vertically; no sideways wag; feet fixed; no glow/aura/trail; natural idle rather than attack wind-up; no noticeable battle-load slowdown. Stop at idle. Chat post-acceptance review owns deciding reusable future-character hard rule after actual player PASS.
