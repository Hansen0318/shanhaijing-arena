# P5 Xingxing Static Runtime Integration — 2026-10-14

Status: ENGINEERING CHECKS PASS / PAGES RELEASE PENDING / PLAYER PHONE SMOKE PENDING.
Branch: `feat/m0-combat-core-20260927`; PR #1; recovery HEAD `6409faa5be09b8a821131a94fb44bfa1b1cf975f`.

## Assets
Approved ZIP SHA256 `d226826c472da8618f450a35d92ce0a98304af9cb31f5077eae2493664b5f702`; all six checksum entries verified. PNG decode/RGBA/dimensions/bounds verified; no redraw or alpha cleanup. Exact PNG bytes copied into `public/assets/characters/xingxing/portrait.png`, `identity.png`, `battleIdle.png`.

| Slot | Dimensions | Bytes | SHA256 |
| --- | --- | --- | --- |
| portraitSquare | 128×128 | 45021 | `ae9c7a38628bca93a419335d8c59e6ba583176a966d85a74571eae53b4f54651` |
| collectionArt | 160×192 | 56234 | `2886b52e91f2c2f839f9ccba415e5453c90cda105e5377dd371cd042658dbc21` |
| battleIdle | 160×160 | 37808 | `1004c76a0ea3e5e942a60137cee5628752220edcfb8cd4c453a43df7e54e3c26` |

## Runtime contract
Only `src/assets/manifest.js` and `src/roster/catalog.js` production registration changed. Shared Team Select/Collection use collectionArt; compact cards/HUD use portraitSquare; Arena uses battleIdle. Descriptor: one160×160 frame, duration1, loopfalse, staticFrame0, fps1, origin[.5,148/160], scale2. The full alpha silhouette ends at y148; its stronger alpha>64 bottom is y146, within1.8 display pixels of the ground. Display footprint144×144, visible full-alpha height118.8, same accepted scale family, no enlargement. Right canonical / shared dynamic mirror and side-based HUD mirror remain untouched.

No P5 Move/KO/Hit/Cast descriptor; existing shared missing-state fallback retained. P1–P4 presentation and all gameplay catalog source compare byte-for-byte unchanged after removing the new P5 presentation block. No AI/combat/ability/Tier/shard/reward/persistence/layout change. Approved art remains byte-identical.

## Verification
- Red: new P5 integration tests initially5 failures on missing formal resolution/presenter, one gameplay purity pass.
- Targeted asset/presenter/menu/HUD/Collection/P1-P4 Move/KO/P5 checks83/83; Team view/matchup/flow6/6.
- Required CI-equivalent `npm test`:673/673 locally. Historical P5 placeholder assertions in lushuIdle/teamLayout and guard inventory totals updated to actual formal assets; no production workaround.
- Asset guard:60 files,2500838 encoded bytes.
- Build PASS; fingerprints `index-DNXaYJny.js`, `battleRuntime-C4KSh6sl.js`, `index-DcqtNRF0.css`.
- All five character assets remain loaded in actual shared cache/presenter under forward/reverse roster order, decoded peak12704400 bytes; unchanged16777216-byte budget. No texture dropped. Destroy releases scene textures.
- Presenter time/reduced-motion/movement keep static F0; actor/HUD mirror, ground origin, real BattleSession snapshot purity verified.
- `git diff --check` PASS. Review and Pages/public verification pending at this checkpoint.
- Existing tooling warnings: npm http-proxy configuration and Vite large runtime chunk warning; no build failure.

## Release / stop
Pages URL https://hansen0318.github.io/shanhaijing-arena/ . Push/CI/deployment/public byte-match not yet claimed at this checkpoint.
After release, STOP for player iPhone checks: Team Select and Collection full-body fit; HUD face/canonical ally vs mirrored enemy; Arena primate face/two fists/tail/feet, size/ground/transparent edges; P1–P4 unchanged. Static Runtime Readability remains unaccepted until player confirms. Do not begin locomotion/KO/actions/VFX or merge main.
