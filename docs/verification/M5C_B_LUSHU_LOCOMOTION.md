# Lushu Locomotion — 2026-10-08

## Player-approved cadence increase — 2026-10-09

After the reduced-motion single-frame defect was fixed and the four-frame locomotion visibly cycled on the player's phone, the player judged the limb/stride cadence too slow and explicitly approved the proposed ~2× presentation-speed adjustment.

Authoritative source delta:
- P1 `battleMove` descriptor fps: **9 → 18**.
- Shared reduced-motion locomotion policy remains time×0.5, so effective reduced cadence becomes **4.5 → 9fps**.
- Gameplay `moveSpeed` remains **2.05**.
- Move PNG, frame order, origin, scale, actor coordinates, AI, collision, targeting, telegraph geometry, ability timing and combat math remain unchanged.

This is a presentation-cadence correction only. Executable verification/build/deploy remain pending at this entry.

## Authoritative reduced-motion correction — 2026-10-09
Player iPhone repro supersedes the prior release's reduced-motion expectation: Move was selected but held F1 while coordinates moved. Recovered feature HEAD `db0d7442b3db53e4bb3716743d8190182ecefd85`, PR #1 open/unmerged, latest preceding Actions37776285485 SUCCESS. Confirmed exact Arena matchMedia→AssetPresenter.reducedMotion→animationFrame.staticFrame chain agrees with Chat; no asset correction is needed.

Execution ledger: user handoff is the complete bounded plan/spec; no design rediscovery. Existing isolated worktree reused, clean baseline19/19. Tests first: explicit policy, forced-presenter cycle and real-session reduced cycle all FAILED with only F1, then PASS after implementation. New tests use actual playback/presenter/session; only external renderer/decoder doubled. Impacted48/48 PASS: assetDescriptors (playback included), assetPresenter, lushuMove, assetIntegration, lushuIdle, lushuPresentationCorrection, battleHud, arenaProjection. Asset guard47files428346bytes PASS; build PASS with existing chunk-size advisory and environment npm proxy warning. No unrelated local full-suite run.

Exact runtime fix: animationFrame adds optional fourth argument playbackMode (default decorative). Explicit locomotion uses time×0.5 only under reduced-motion, normal cadence otherwise; ordinary reduced animation still chooses staticFrame. AssetPresenter derives mode from resolved presentation state (loaded state or living base fallback), passes the same mode to texture frame selection AND frame-size calculation. Only battleMove opts in; loaded Hit/Cast/KO/inspection and VFX remain ordinary. P1 descriptor/catalog/manifest/PNGs unchanged:9fps normal,4.5fps reduced, same four frames, origin/scale and hoof baseline. Stop selection remains immediate single static idle. No character-ID branch and no gameplay/AI/coordinates/speed/projection/HUD change.

Runtime regression evidence: both modes use real BattleSession22×.05s moving ticks and actual AssetPresenter; all four frame keys observed in order with repetition; unchanged-position tick restores idle. Snapshot and definition moveSpeed compare unchanged around every presenter render. Forced reduced presenter additionally proves slower first transition, complete F1→F2→F3→F4→F1 cycle, Y-only motion, negative-X mirror, exact108×144/origin/position, and same-source decorative playback remains static. P2/P3 moving in both modes stay accepted static idle. Normal equivalent contracts remain green. Runtime PNG unchanged SHA256 `6ecceda53ceb1ed23fbbe2c75166c65b365af2ee23f3122d7531165ed1beff74`; same isolated cell rectangles and transparent margins reuse accepted bleed/baseline evidence.

Release result: ENGINEERING PASS / PLAYER PHONE SMOKE PENDING. Tested/deployed source `40384c0303752fc2f50eeaf087892490846dbf92`, tree `2471ebfca926eb1f967aa600278779fb9584d866`; preserves authoritative parentdb0d744 with expected-head fast-forward lease. Final HEAD is containing docs-only closure commit (resolve active feature ref); no runtime bytes change in closure. PR #1 open/unmerged. Actions #825 /37895173738 SUCCESS: Build113704788440 (CI615/615, guard/build PASS), Pages113704911716 SUCCESS.

Fresh final review: no Critical/Important/Minor findings; reviewer independently10/10 PASS. Reviewer declined to reconstruct historical RED or executor48/48/guard/build evidence; actual RED/GREEN logs and fresh targeted/build/Actions outputs were read by executor, so no unsupported acceptance substituted. Reviewer declined phone subjective judgment; remains explicitly player-owned. Skill reference resources unavailable through provider; main skill instructions read, reviewer used exact user requirements/diff instead. No implementation scope expansion.

Public HTML and browser DOM select index-CHrQCTBp.js /index-DcqtNRF0.css. Fresh responses byte-identical to tested local dist:

| File | Bytes | SHA256 |
| --- | ---: | --- |
| index-CHrQCTBp.js | 93944 | bd9b4ff33aec789d65454f15ae6c59e961a09e5e17d0fa165c9f8774d0c9bc2d |
| battleRuntime-ZT6rAN8g.js | 1445032 | dcf00a61414a1fc4c55c7877b3398ac207f564da624f910f5d8efef8fcd5b440 |
| index-DcqtNRF0.css | 22943 | a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da |
| characters/lushu/battleMove-4f.png | 54317 | 6ecceda53ceb1ed23fbbe2c75166c65b365af2ee23f3122d7531165ed1beff74 |

Public Battle Lab normal lineup/skip countdown loaded actual Phaser and unchanged P1/P2/P3/HUD/overhead HP/control layout. After selecting P1 and rightward input, moving ally/enemy Lushu showed a different run pose from initial idle, with enemy horizontal mirror and no observed frame bleed/size discontinuity. Continuous exact four-frame order/cadence, vertical input, immediate stop and snapshot/speed purity are verified by exact deployed-source runtime tests above, not inferred from isolated screenshots. Forced reduced runtime uses explicit reducedMotion=true on the real presenter/session; browser tooling has no OS media-emulation capability, so this is NOT a claim of forced browser preference or iPhone visual acceptance. No code/test/build/deploy blocker; phone-only smoke remains: move P1 in four directions, confirm changing run poses rather than single-pose sliding (including current phone reduced-motion setting), then stop→static idle and check stable ground/readability. No next gate/main merge.

## Executable checkpoint
Recovered latest authoritative feature HEAD `864007fc6fd75cf77a1446521f47d30d407c5b4d` (newer than handoff959f0b1), PR #1 open. Latest explicit player handoff approves `lushu_move_clean_strip.png` and authorizes only P1 runtime integration; it supersedes pending-art-review pointers. No main merge.

Source transparent RGBA PNG2652×626,1176581bytes, SHA256 `d67fffa5662dacf8cfa94af3e3a16e44518a0b9f2c18204b9b5305b72d2b70a8`.
Four663×626 cells retain approved order. All share hoof bottom593. One common crop(37,34,630,593), uniform resize94×89 and offset(1,36) into each96×128 cell. No per-frame tight crop/translation, redraw, new pose, interpolation or GIF. Transparent cell side columns prevent neighboring frame bleed. Runtime hoof bottom125 matches accepted idle F1; small authored compression in F2 preserved. Common crop union retains head/horns/face/weapon/single tail. Wide, leaned locomotion silhouette is preserved rather than distorted to imitate upright idle proportions.

Runtime `public/assets/characters/lushu/battleMove-4f.png`:384×128 RGBA,54317bytes,196608decoded bytes; SHA256 `6ecceda53ceb1ed23fbbe2c75166c65b365af2ee23f3122d7531165ed1beff74`.
P1 `lushu.battleMove` descriptor:4×96×128,9fps,loop,staticFrame0,origin[.5,691/724],scale2. Frame canvas display108×144 is unchanged from idle. Idle PNG/descriptor, portraits, identity and all P2/P3 assets unchanged.

## Ledger / contract
Preflight: manifest/catalog descriptor supplies optional battleMove; encounterAssetKeys must load it before presenter can select it. Existing nine required slots stay unchanged; battleMove is optional like authored battleCast. Shared renderer selects authored data, never character ID.
Movement is derived from copied authoritative X/Y displacement only. Duplicate simulation time retains previous moving state/stride (sub-step/paused render); a subsequent unchanged-position simulation tick returns idle. KO never plays move; loaded reaction/inspection priority remains existing behavior; missing move falls back to authored static idle. Current reduced-motion locomotion cycles all Move frames at half cadence; the old F1 freeze was defective and is superseded by the correction above. No combat coordinate/speed/state mutation.

TDD RED: new move slot resolved placeholder and real presenter remained idle while moving (3/3 failed). GREEN:3/3 move tests pass. Direct61/61 PASS: assetManifest, formalCatalog, teamBattle, assetPresenter, lushuIdle, battleHud, arenaProjection, assetGuard, lushuMove, assetResolver, assetDescriptors, assetIntegration. Only stale guard inventory46→47 updated. Guard47files428346bytes PASS; build/diff PASS. Existing bundle-size advisory only; no unrelated local full suite.

Independent bounded code review: no Critical/Important finding. Minor deferred: descriptor-only future Move sources are not loaded unless also supplied through assets.battleMove; current P1 supplies both, so no current blocker. Pixel/source fidelity and hoof bounds verified by executor; deployed/browser evidence remains the next release step; subjective art review stays player-owned.

## Release / public verification
Tested and deployed source SHA `6639367ca114d02f696f37b49d6a361d3291c237`; tree `f892d0a1a99800492d9f4ad759d9e6b177b57f2d`. Local verified checkpoint797db28 has the identical tree; connector commit preserves authoritative parent864007f and was fast-forward pushed with expected-head lease. PR #1 stays open; no main merge.

Actions #821 /37768071556 SUCCESS: Build job113280502721, Pages job113280642721; configured CI612/612, asset guard47files428346bytes PASS, build PASS. No additional unrelated local full regression run.

Public `https://hansen0318.github.io/shanhaijing-arena/` HTML selects index-CCyvbPQ8.js and index-DcqtNRF0.css. Fresh public responses for all three bundles + Move PNG were byte-identical to local tested dist:

| File | Bytes | SHA256 |
| --- | ---: | --- |
| index-CCyvbPQ8.js | 93944 | 348cafccc6dd653f8ed42b567746381ee16c5d89798a8b33d571a9a5ecafb307 |
| battleRuntime-C2UEmRw8.js | 1444866 | 8036132ae5f4deff909b793a39a5f814ecbce34e681d9bc9e2d869ddf434fcaf |
| index-DcqtNRF0.css | 22943 | a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da |
| characters/lushu/battleMove-4f.png | 54317 | 6ecceda53ceb1ed23fbbe2c75166c65b365af2ee23f3122d7531165ed1beff74 |

Public Battle Lab normal lineup / skip countdown loaded actual Phaser Arena. Screenshots showed original static Lushu plus changing run silhouettes on moving ally/enemy, shared enemy mirror, P2/P3 static sprites, HUD/overhead HP/telegraph/damage intact; no missing Move texture or adjacent-cell artifact observed. Cloud rendering advances slowly around UI interactions; screenshots are not claimed as frame-by-frame continuous timing/stop proof or iPhone final art acceptance.

Historical release evidence (superseded for reduced-motion policy): real createStageBattleSession with P1/P2/P3, shared arenaToStage and AssetPresenter (external renderer/decoder doubled) traversed cells0→96→192→288→repeat in NORMAL mode; zero movement/held control restored idle and negative-X mirrored Move. Snapshots stayed unchanged. The old reduced-motion static-frame test accepted the exact defect later reproduced by the player; it is replaced by the current all-four-frame regression above. Frame canvas108×144/origin, transparent side columns and common hoof-bottom125 remain unchanged. No gameplay-owned animation flags/coordinates/speed/AI/collision/targeting/telegraph edits; no GIF or breathing integration.

Final HEAD is the docs-only closure commit containing this note; resolve active feature ref. It changes no runtime/build bytes, so tested source and public fingerprints above remain authoritative. No technical blocker. Final subjective phone acceptance remains player-owned.
Player smoke after release: P1 moves left/right/up/down, visibly cycles four poses, stops to static idle, keeps ground anchor and expected readability. Do not start P2/P3 motion/action/VFX/next character.
